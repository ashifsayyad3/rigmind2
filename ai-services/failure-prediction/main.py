"""
RigMind AI™ — Failure Prediction Service
XGBoost + LightGBM ensemble for component failure probability prediction.
"""

from __future__ import annotations

import os
import logging
from contextlib import asynccontextmanager
from typing import Optional

import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd
import structlog
import uvicorn
from fastapi import FastAPI, BackgroundTasks, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings
from prometheus_fastapi_instrumentator import Instrumentator

from .db import get_db_connection
from .models import FailurePredictionModel
from .features import extract_features

logger = structlog.get_logger()


class Settings(BaseSettings):
    database_url: str = Field(..., env="DATABASE_URL")
    mlflow_tracking_uri: str = Field("http://mlflow:5000", env="MLFLOW_TRACKING_URI")
    model_name: str = "rigmind-failure-predictor"
    min_train_samples: int = 50
    prediction_horizon_days: list[int] = [30, 60, 90]
    api_key: str = Field(..., env="AI_SERVICE_API_KEY")

    class Config:
        env_file = ".env"


settings = Settings()
predictor: Optional[FailurePredictionModel] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model on startup, cleanup on shutdown."""
    global predictor
    mlflow.set_tracking_uri(settings.mlflow_tracking_uri)
    try:
        predictor = FailurePredictionModel.load_from_registry(settings.model_name)
        logger.info("Model loaded from MLflow registry", model=settings.model_name)
    except Exception as exc:
        logger.warning("Could not load model from registry, bootstrapping", error=str(exc))
        predictor = FailurePredictionModel.bootstrap()
    yield
    logger.info("Failure prediction service shutting down")


app = FastAPI(
    title="RigMind AI™ — Failure Prediction Service",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)


# ─── Request/Response Models ──────────────────────────────────────────────────

class ComponentFeatures(BaseModel):
    rig_id: int
    component_id: int
    days_since_last_failure: Optional[float] = None
    days_since_last_maintenance: Optional[float] = None
    total_failures_12m: Optional[int] = 0
    total_npt_hours_12m: Optional[float] = 0.0
    availability_score: Optional[float] = 100.0
    sensor_anomaly_score: Optional[float] = 0.0
    component_age_days: Optional[float] = None
    failure_mode_category: Optional[str] = "unknown"
    bop_type: Optional[str] = "unknown"
    rig_category: Optional[str] = "unknown"


class PredictionRequest(BaseModel):
    component_features: ComponentFeatures
    horizons_days: list[int] = Field(default=[30, 60, 90])


class PredictionResult(BaseModel):
    rig_id: int
    component_id: int
    failure_probability_30d: float
    failure_probability_60d: float
    failure_probability_90d: float
    remaining_useful_life_days: Optional[float]
    risk_level: str  # critical / high / medium / low
    risk_factors: list[str]
    confidence_score: float
    model_version: str


class FleetPredictionRequest(BaseModel):
    rig_ids: Optional[list[int]] = None  # None = all rigs


class AnomalyResult(BaseModel):
    rig_id: int
    sensor_tag: str
    value: float
    anomaly_score: float
    is_anomaly: bool
    threshold: float


# ─── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": predictor is not None,
        "model_version": predictor.version if predictor else None,
    }


@app.post("/predict", response_model=PredictionResult)
async def predict(request: PredictionRequest):
    """Predict failure probability for a single component."""
    if predictor is None:
        raise HTTPException(503, "Model not yet loaded")

    features = request.component_features.model_dump()
    feature_vector = extract_features(features)

    probs = predictor.predict_proba(feature_vector, request.horizons_days)
    rul = predictor.predict_rul(feature_vector)
    risk_level, risk_factors = _classify_risk(probs, features)

    return PredictionResult(
        rig_id=request.component_features.rig_id,
        component_id=request.component_features.component_id,
        failure_probability_30d=round(float(probs[0]), 4),
        failure_probability_60d=round(float(probs[1]), 4),
        failure_probability_90d=round(float(probs[2]), 4),
        remaining_useful_life_days=rul,
        risk_level=risk_level,
        risk_factors=risk_factors,
        confidence_score=round(float(predictor.confidence), 3),
        model_version=predictor.version,
    )


@app.post("/predict/fleet")
async def predict_fleet(request: FleetPredictionRequest):
    """Batch predict failure probabilities for all rig components."""
    if predictor is None:
        raise HTTPException(503, "Model not yet loaded")

    conn = await get_db_connection()
    query = """
        SELECT
            rc.rigId,
            rc.componentId,
            c.name as componentName,
            r.name as rigName,
            r.category as rigCategory,
            r.bopType,
            DATEDIFF(DAY, MAX(f.dateOfFailure), GETDATE()) as daysSinceLastFailure,
            DATEDIFF(DAY, MAX(rc.installDate), GETDATE()) as componentAgeDays,
            COUNT(DISTINCT f.id) as failures12m,
            ISNULL(SUM(CAST(n.nptHours AS FLOAT)), 0) as nptHours12m
        FROM rigComponents rc
        JOIN rigs r ON r.id = rc.rigId
        JOIN components c ON c.id = rc.componentId
        LEFT JOIN failures f ON f.componentId = rc.componentId
            AND f.rigId = rc.rigId
            AND f.isRemoved = 0
            AND f.dateOfFailure >= DATEADD(MONTH, -12, GETDATE())
        LEFT JOIN nonProductionTimes n ON n.rigId = rc.rigId
            AND n.isRemoved = 0
            AND n.dateOfNPT >= DATEADD(MONTH, -12, GETDATE())
        WHERE rc.isActive = 1
    """
    if request.rig_ids:
        ids_str = ",".join(str(i) for i in request.rig_ids)
        query += f" AND rc.rigId IN ({ids_str})"

    query += " GROUP BY rc.rigId, rc.componentId, c.name, r.name, r.category, r.bopType"

    df = pd.read_sql(query, conn)

    results = []
    for _, row in df.iterrows():
        features = {
            "rig_id": int(row.rigId),
            "component_id": int(row.componentId),
            "days_since_last_failure": row.daysSinceLastFailure,
            "component_age_days": row.componentAgeDays,
            "total_failures_12m": int(row.failures12m),
            "total_npt_hours_12m": float(row.nptHours12m),
            "bop_type": row.bopType or "unknown",
            "rig_category": row.rigCategory or "unknown",
        }
        fv = extract_features(features)
        probs = predictor.predict_proba(fv, [30, 60, 90])
        risk_level, risk_factors = _classify_risk(probs, features)

        results.append({
            "rigId": int(row.rigId),
            "rigName": row.rigName,
            "componentId": int(row.componentId),
            "componentName": row.componentName,
            "failureProbability30d": round(float(probs[0]), 4),
            "failureProbability60d": round(float(probs[1]), 4),
            "failureProbability90d": round(float(probs[2]), 4),
            "riskLevel": risk_level,
            "riskFactors": risk_factors,
        })

    return {
        "predictions": sorted(results, key=lambda x: x["failureProbability30d"], reverse=True),
        "totalComponents": len(results),
        "criticalCount": sum(1 for r in results if r["riskLevel"] == "critical"),
        "modelVersion": predictor.version,
        "generatedAt": pd.Timestamp.now().isoformat(),
    }


@app.post("/anomaly/detect")
async def detect_anomalies(payload: dict):
    """Isolation Forest anomaly detection on sensor readings."""
    from sklearn.ensemble import IsolationForest
    from sklearn.preprocessing import StandardScaler

    readings = payload.get("readings", [])
    if len(readings) < 10:
        raise HTTPException(400, "Need at least 10 readings for anomaly detection")

    df = pd.DataFrame(readings)
    features = df[["value"]].values
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(features)

    iso = IsolationForest(contamination=0.05, random_state=42)
    iso.fit(X_scaled)

    scores = iso.score_samples(X_scaled)
    predictions = iso.predict(X_scaled)
    threshold = np.percentile(scores, 5)

    results = []
    for i, row in df.iterrows():
        results.append({
            "rigId": int(row.get("rig_id", 0)),
            "sensorTag": str(row.get("sensor_tag", "")),
            "value": float(row["value"]),
            "anomalyScore": round(float(scores[i]), 4),
            "isAnomaly": bool(predictions[i] == -1),
            "threshold": round(float(threshold), 4),
        })

    return {
        "anomalies": [r for r in results if r["isAnomaly"]],
        "allResults": results,
        "anomalyRate": round(sum(1 for r in results if r["isAnomaly"]) / len(results), 3),
    }


@app.post("/train")
async def trigger_training(background_tasks: BackgroundTasks):
    """Trigger background model retraining from production data."""
    background_tasks.add_task(_retrain_model)
    return {"status": "training_started", "message": "Model retraining triggered in background"}


async def _retrain_model():
    """Full model retraining pipeline with MLflow tracking."""
    global predictor
    logger.info("Starting model retraining")

    with mlflow.start_run(run_name="rigmind-failure-prediction"):
        conn = await get_db_connection()
        df = pd.read_sql("""
            SELECT
                f.id, f.rigId, f.componentId, f.failureModeId,
                f.severity, f.dateOfFailure, f.isNPT,
                f.availability, f.equipmentType,
                DATEDIFF(DAY, prev_f.dateOfFailure, f.dateOfFailure) as daysBetweenFailures,
                c.type as componentType,
                r.category as rigCategory, r.bopType,
                COUNT(DISTINCT prev_f.id) as priorFailures12m
            FROM failures f
            JOIN rigs r ON r.id = f.rigId
            JOIN components c ON c.id = f.componentId
            LEFT JOIN failures prev_f ON prev_f.componentId = f.componentId
                AND prev_f.rigId = f.rigId
                AND prev_f.dateOfFailure < f.dateOfFailure
                AND prev_f.dateOfFailure >= DATEADD(MONTH, -12, f.dateOfFailure)
                AND prev_f.isRemoved = 0
            WHERE f.isRemoved = 0 AND f.componentId IS NOT NULL
            GROUP BY f.id, f.rigId, f.componentId, f.failureModeId,
                     f.severity, f.dateOfFailure, f.isNPT, f.availability,
                     f.equipmentType, prev_f.dateOfFailure,
                     c.type, r.category, r.bopType
        """, conn)

        if len(df) < settings.min_train_samples:
            logger.warning("Insufficient training samples", count=len(df))
            return

        new_model = FailurePredictionModel()
        metrics = new_model.train(df)

        mlflow.log_params(new_model.get_params())
        mlflow.log_metrics(metrics)
        mlflow.sklearn.log_model(new_model.pipeline, "model",
                                 registered_model_name=settings.model_name)

        predictor = new_model
        logger.info("Model retrained successfully", metrics=metrics)


def _classify_risk(probs: list[float], features: dict) -> tuple[str, list[str]]:
    """Classify risk level and generate human-readable risk factors."""
    p30 = probs[0]
    risk_factors = []

    if features.get("total_failures_12m", 0) > 3:
        risk_factors.append(f"High failure frequency: {features['total_failures_12m']} failures in 12 months")
    if features.get("days_since_last_failure") and features["days_since_last_failure"] < 30:
        risk_factors.append("Recent failure detected within 30 days")
    if features.get("total_npt_hours_12m", 0) > 50:
        risk_factors.append(f"Elevated NPT: {features['total_npt_hours_12m']:.0f} hours in 12 months")
    if features.get("component_age_days") and features["component_age_days"] > 1825:
        risk_factors.append("Component age exceeds 5 years")
    if features.get("sensor_anomaly_score", 0) > 0.5:
        risk_factors.append("Sensor anomaly detected")

    if p30 >= 0.7:
        risk_level = "critical"
    elif p30 >= 0.45:
        risk_level = "high"
    elif p30 >= 0.25:
        risk_level = "medium"
    else:
        risk_level = "low"

    return risk_level, risk_factors


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=False)
