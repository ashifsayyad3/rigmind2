"""Tests for RigMind AI failure prediction service."""

import numpy as np
import pandas as pd
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient


# ─── Model Tests ──────────────────────────────────────────────────────────────

class TestFailurePredictionModel:
    def test_bootstrap_creates_trained_model(self):
        from failure_prediction.models import FailurePredictionModel
        model = FailurePredictionModel.bootstrap()
        assert model._trained is True
        assert model.pipeline is not None
        assert model.version == "bootstrap-v1"

    def test_predict_proba_returns_valid_probabilities(self):
        from failure_prediction.models import FailurePredictionModel
        from failure_prediction.features import extract_features
        model = FailurePredictionModel.bootstrap()

        features = {
            "days_since_last_failure": 45.0,
            "total_failures_12m": 2,
            "total_npt_hours_12m": 25.0,
            "component_age_days": 900.0,
            "availability_score": 85.0,
            "sensor_anomaly_score": 0.3,
        }
        fv = extract_features(features)
        probs = model.predict_proba(fv, [30, 60, 90])

        assert len(probs) == 3
        for p in probs:
            assert 0.0 <= p <= 1.0
        # Probabilities should be non-decreasing with horizon
        assert probs[0] <= probs[1] <= probs[2]

    def test_predict_rul_returns_positive_or_none(self):
        from failure_prediction.models import FailurePredictionModel
        from failure_prediction.features import extract_features
        model = FailurePredictionModel.bootstrap()
        fv = extract_features({"total_failures_12m": 1, "component_age_days": 500})
        rul = model.predict_rul(fv)
        if rul is not None:
            assert rul > 0

    def test_untrained_model_returns_default_probs(self):
        from failure_prediction.models import FailurePredictionModel
        model = FailurePredictionModel()  # not trained
        fv = np.zeros(6)
        probs = model.predict_proba(fv, [30, 60, 90])
        assert probs == [0.1, 0.2, 0.3]

    def test_train_returns_metrics_dict(self):
        from failure_prediction.models import FailurePredictionModel
        model = FailurePredictionModel()
        # Create minimal training data
        df = pd.DataFrame({
            "days_since_last_failure": np.random.exponential(90, 200),
            "total_failures_12m": np.random.poisson(1.5, 200),
            "total_npt_hours_12m": np.random.exponential(20, 200),
            "component_age_days": np.random.uniform(0, 2000, 200),
            "availability_score": np.random.uniform(60, 100, 200),
            "sensor_anomaly_score": np.random.uniform(0, 1, 200),
            "label": np.random.binomial(1, 0.3, 200),
        })
        metrics = model.train(df)
        assert "roc_auc" in metrics
        assert "precision" in metrics
        assert "f1" in metrics
        assert 0.0 <= metrics["roc_auc"] <= 1.0


# ─── Feature Extraction Tests ──────────────────────────────────────────────────

class TestFeatureExtraction:
    def test_extract_features_returns_correct_length(self):
        from failure_prediction.features import extract_features, FEATURE_ORDER
        fv = extract_features({})
        assert len(fv) == len(FEATURE_ORDER)

    def test_extract_features_uses_defaults_for_missing_keys(self):
        from failure_prediction.features import extract_features, FEATURE_DEFAULTS
        fv = extract_features({})
        assert fv[0] == FEATURE_DEFAULTS["days_since_last_failure"]

    def test_extract_features_handles_none_values(self):
        from failure_prediction.features import extract_features
        fv = extract_features({"days_since_last_failure": None, "total_failures_12m": 3})
        assert fv[1] == 3.0  # total_failures_12m set correctly
        assert fv[0] > 0  # days_since_last_failure uses default

    def test_extract_features_correct_dtype(self):
        from failure_prediction.features import extract_features
        fv = extract_features({"total_failures_12m": 5})
        assert fv.dtype == np.float32


# ─── Risk Classification Tests ─────────────────────────────────────────────────

class TestRiskClassification:
    def _classify(self, probs, features=None):
        import sys
        import os
        sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
        from failure_prediction.main import _classify_risk
        return _classify_risk(probs, features or {})

    def test_critical_risk_high_probability(self):
        risk_level, _ = self._classify([0.75, 0.85, 0.90])
        assert risk_level == "critical"

    def test_high_risk_moderate_probability(self):
        risk_level, _ = self._classify([0.50, 0.65, 0.75])
        assert risk_level == "high"

    def test_medium_risk(self):
        risk_level, _ = self._classify([0.30, 0.45, 0.55])
        assert risk_level == "medium"

    def test_low_risk(self):
        risk_level, _ = self._classify([0.10, 0.15, 0.25])
        assert risk_level == "low"

    def test_risk_factors_generated_for_high_failures(self):
        _, risk_factors = self._classify([0.5, 0.6, 0.7], {"total_failures_12m": 5})
        assert any("failure frequency" in f.lower() for f in risk_factors)

    def test_risk_factors_empty_for_healthy_component(self):
        _, risk_factors = self._classify([0.05, 0.1, 0.15], {
            "total_failures_12m": 0,
            "total_npt_hours_12m": 5.0,
            "component_age_days": 365,
        })
        assert len(risk_factors) == 0


# ─── FastAPI Endpoint Tests ────────────────────────────────────────────────────

class TestApiEndpoints:
    @pytest.fixture
    def client(self):
        from failure_prediction.main import app
        with TestClient(app) as c:
            yield c

    def test_health_endpoint(self, client):
        resp = client.get("/health")
        assert resp.status_code == 200
        data = resp.json()
        assert "status" in data
        assert data["status"] == "healthy"

    def test_predict_endpoint_returns_valid_structure(self, client):
        payload = {
            "component_features": {
                "rig_id": 1,
                "component_id": 42,
                "days_since_last_failure": 60.0,
                "total_failures_12m": 2,
                "total_npt_hours_12m": 30.0,
                "component_age_days": 730.0,
                "availability_score": 88.0,
                "sensor_anomaly_score": 0.2,
            }
        }
        resp = client.post("/predict", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert "failure_probability_30d" in data
        assert "failure_probability_60d" in data
        assert "failure_probability_90d" in data
        assert "risk_level" in data
        assert data["risk_level"] in ["critical", "high", "medium", "low"]
        assert "risk_factors" in data
        assert isinstance(data["risk_factors"], list)

    def test_anomaly_detect_requires_minimum_readings(self, client):
        resp = client.post("/anomaly/detect", json={"readings": [{"value": 100, "rig_id": 1, "sensor_tag": "P1"}]})
        assert resp.status_code == 400

    def test_anomaly_detect_with_sufficient_data(self, client):
        readings = [
            {"value": float(100 + i + (50 if i == 5 else 0)), "rig_id": 1, "sensor_tag": "P1"}
            for i in range(20)
        ]
        resp = client.post("/anomaly/detect", json={"readings": readings})
        assert resp.status_code == 200
        data = resp.json()
        assert "anomalies" in data
        assert "anomalyRate" in data
        assert 0.0 <= data["anomalyRate"] <= 1.0
