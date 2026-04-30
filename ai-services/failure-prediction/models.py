"""
Ensemble failure prediction model: XGBoost + LightGBM with stacking.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import mlflow.sklearn
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score, precision_score, recall_score, f1_score
from sklearn.ensemble import VotingClassifier
import xgboost as xgb
import lightgbm as lgb
import joblib
import structlog

logger = structlog.get_logger()


class FailurePredictionModel:
    """XGBoost + LightGBM voting ensemble for failure probability prediction."""

    def __init__(self):
        self.pipeline: Pipeline | None = None
        self.version = "bootstrap-v1"
        self.confidence = 0.7
        self._trained = False

    @classmethod
    def load_from_registry(cls, model_name: str) -> "FailurePredictionModel":
        model = cls()
        client = mlflow.tracking.MlflowClient()
        latest = client.get_latest_versions(model_name, stages=["Production"])
        if not latest:
            raise ValueError(f"No Production model found: {model_name}")
        model.pipeline = mlflow.sklearn.load_model(f"models:/{model_name}/Production")
        model.version = latest[0].version
        model._trained = True
        logger.info("Model loaded from MLflow", version=model.version)
        return model

    @classmethod
    def bootstrap(cls) -> "FailurePredictionModel":
        """Create a bootstrap model with synthetic training data for cold start."""
        model = cls()
        rng = np.random.default_rng(42)
        n = 500

        X = pd.DataFrame({
            "days_since_last_failure": rng.exponential(120, n),
            "total_failures_12m": rng.poisson(1.5, n),
            "total_npt_hours_12m": rng.exponential(20, n),
            "component_age_days": rng.uniform(0, 3000, n),
            "availability_score": rng.uniform(60, 100, n),
            "sensor_anomaly_score": rng.uniform(0, 1, n),
        })

        # Generate labels: failure more likely with high failure count + low availability
        y = (
            (X["total_failures_12m"] > 2).astype(int) * 0.4 +
            (X["availability_score"] < 75).astype(int) * 0.3 +
            (X["sensor_anomaly_score"] > 0.6).astype(int) * 0.3
        )
        y = (y + rng.uniform(0, 0.3, n) > 0.5).astype(int)

        model.train(pd.concat([X, pd.Series(y, name="label")], axis=1))
        model.version = "bootstrap-v1"
        logger.info("Bootstrap model created")
        return model

    def train(self, df: pd.DataFrame) -> dict:
        feature_cols = [
            "days_since_last_failure", "total_failures_12m", "total_npt_hours_12m",
            "component_age_days", "availability_score", "sensor_anomaly_score",
        ]

        available_cols = [c for c in feature_cols if c in df.columns]
        X = df[available_cols].fillna(df[available_cols].median())
        y = df["label"] if "label" in df.columns else self._create_labels(df)

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        xgb_model = xgb.XGBClassifier(
            n_estimators=200, max_depth=6, learning_rate=0.05,
            subsample=0.8, colsample_bytree=0.8, min_child_weight=3,
            scale_pos_weight=sum(y == 0) / max(sum(y == 1), 1),
            random_state=42, eval_metric="logloss", verbosity=0,
        )
        lgb_model = lgb.LGBMClassifier(
            n_estimators=200, max_depth=6, learning_rate=0.05,
            subsample=0.8, colsample_bytree=0.8,
            is_unbalance=True, random_state=42, verbose=-1,
        )

        ensemble = VotingClassifier(
            estimators=[("xgb", xgb_model), ("lgb", lgb_model)],
            voting="soft",
            weights=[0.6, 0.4],
        )

        self.pipeline = Pipeline([
            ("scaler", StandardScaler()),
            ("ensemble", ensemble),
        ])
        self.pipeline.fit(X_train, y_train)

        y_pred_proba = self.pipeline.predict_proba(X_test)[:, 1]
        y_pred = (y_pred_proba >= 0.5).astype(int)

        metrics = {
            "roc_auc": round(float(roc_auc_score(y_test, y_pred_proba)), 4),
            "precision": round(float(precision_score(y_test, y_pred, zero_division=0)), 4),
            "recall": round(float(recall_score(y_test, y_pred, zero_division=0)), 4),
            "f1": round(float(f1_score(y_test, y_pred, zero_division=0)), 4),
            "train_samples": len(X_train),
            "test_samples": len(X_test),
        }
        self.confidence = metrics["roc_auc"]
        self._trained = True
        logger.info("Model trained", **metrics)
        return metrics

    def predict_proba(self, feature_vector: np.ndarray, horizons: list[int]) -> list[float]:
        if not self._trained or self.pipeline is None:
            return [0.1, 0.2, 0.3]

        fv = feature_vector.reshape(1, -1)
        base_prob = float(self.pipeline.predict_proba(fv)[0][1])

        # Scale probabilities across horizons using exponential growth model
        results = []
        for days in horizons:
            scale = 1.0 - np.exp(-days / 90.0)
            adj_prob = min(base_prob * (1 + scale * 0.5), 0.99)
            results.append(round(float(adj_prob), 4))
        return results

    def predict_rul(self, feature_vector: np.ndarray) -> float | None:
        """Estimate remaining useful life in days (simplified model)."""
        if not self._trained:
            return None
        fv = feature_vector.reshape(1, -1)
        base_prob = float(self.pipeline.predict_proba(fv)[0][1])
        if base_prob <= 0:
            return None
        # RUL ≈ -ln(1 - p) * mean_time_to_failure
        try:
            rul = -np.log(max(1 - base_prob, 1e-6)) * 180
            return round(float(rul), 1)
        except Exception:
            return None

    def get_params(self) -> dict:
        return {"model_type": "xgb_lgb_ensemble", "version": self.version}

    def _create_labels(self, df: pd.DataFrame) -> pd.Series:
        """Create binary labels from historical failure data."""
        return (df.get("failures12m", pd.Series(0, index=df.index)) > 0).astype(int)
