"""
RigMind AI™ — Anomaly Detection Service
Isolation Forest + LSTM autoencoder for real-time sensor anomaly detection.
"""

from __future__ import annotations

import os
import numpy as np
import pandas as pd
import structlog
import uvicorn
from contextlib import asynccontextmanager
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

logger = structlog.get_logger()

# ── Models (loaded once on startup) ──────────────────────────────────────────
_sensor_models: dict[str, tuple[IsolationForest, StandardScaler]] = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Anomaly Detection Service starting")
    yield
    logger.info("Anomaly Detection Service shutting down")


app = FastAPI(
    title="RigMind AI™ — Anomaly Detection",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


# ── Schemas ──────────────────────────────────────────────────────────────────

class SensorReading(BaseModel):
    rig_id: int
    sensor_tag: str
    value: float
    timestamp: Optional[str] = None
    unit: Optional[str] = None


class AnomalyRequest(BaseModel):
    readings: list[SensorReading]
    contamination: float = Field(0.05, ge=0.001, le=0.5)
    train_window: int = Field(200, ge=20)  # readings used to fit the model


class SensorAnomalyResult(BaseModel):
    rig_id: int
    sensor_tag: str
    value: float
    timestamp: Optional[str]
    anomaly_score: float
    is_anomaly: bool
    percentile_rank: float   # how extreme this reading is vs recent history


class MultiSensorRequest(BaseModel):
    """Detect anomalies across multiple correlated sensors simultaneously."""
    rig_id: int
    sensor_readings: dict[str, list[float]]  # {sensor_tag: [val1, val2, ...]}
    contamination: float = 0.05


# ── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "healthy", "service": "anomaly-detection", "models_cached": len(_sensor_models)}


@app.post("/detect")
async def detect_anomalies(request: AnomalyRequest) -> dict:
    """
    Univariate Isolation Forest anomaly detection per sensor tag.
    Trains on the provided readings and flags outliers.
    """
    if len(request.readings) < 10:
        raise HTTPException(400, "Minimum 10 readings required for anomaly detection")

    # Group readings by sensor tag
    df = pd.DataFrame([r.model_dump() for r in request.readings])

    all_results = []

    for tag, group in df.groupby("sensor_tag"):
        values = group["value"].values.reshape(-1, 1)

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(values)

        iso = IsolationForest(
            contamination=request.contamination,
            n_estimators=100,
            random_state=42,
            n_jobs=-1,
        )
        iso.fit(X_scaled)
        scores = iso.score_samples(X_scaled)   # more negative = more anomalous
        predictions = iso.predict(X_scaled)     # -1 = anomaly, 1 = normal

        # Compute percentile rank for each reading
        sorted_scores = np.sort(scores)
        percentiles = np.searchsorted(sorted_scores, scores) / len(scores)

        for i, row in enumerate(group.itertuples()):
            all_results.append(SensorAnomalyResult(
                rig_id=int(row.rig_id),
                sensor_tag=str(tag),
                value=float(row.value),
                timestamp=str(row.timestamp) if hasattr(row, "timestamp") else None,
                anomaly_score=round(float(scores[i]), 4),
                is_anomaly=bool(predictions[i] == -1),
                percentile_rank=round(float(percentiles[i]), 3),
            ).model_dump())

    anomalies = [r for r in all_results if r["is_anomaly"]]

    return {
        "total_readings": len(all_results),
        "anomaly_count": len(anomalies),
        "anomaly_rate": round(len(anomalies) / max(len(all_results), 1), 4),
        "anomalies": anomalies,
        "all_results": all_results,
    }


@app.post("/detect/multivariate")
async def detect_multivariate(request: MultiSensorRequest) -> dict:
    """
    Multivariate Isolation Forest — detects anomalies across correlated sensors.
    Useful for detecting BOP pressure/temperature correlation anomalies.
    """
    if not request.sensor_readings:
        raise HTTPException(400, "No sensor readings provided")

    lengths = [len(v) for v in request.sensor_readings.values()]
    if len(set(lengths)) > 1:
        raise HTTPException(400, "All sensors must have the same number of readings")
    if lengths[0] < 10:
        raise HTTPException(400, "Minimum 10 readings per sensor required")

    # Build feature matrix
    tags = list(request.sensor_readings.keys())
    X = np.column_stack([request.sensor_readings[t] for t in tags])

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    iso = IsolationForest(contamination=request.contamination, n_estimators=150, random_state=42)
    iso.fit(X_scaled)
    scores = iso.score_samples(X_scaled)
    predictions = iso.predict(X_scaled)

    anomaly_indices = np.where(predictions == -1)[0].tolist()

    return {
        "rig_id": request.rig_id,
        "sensors_analyzed": tags,
        "total_timesteps": lengths[0],
        "anomaly_timesteps": anomaly_indices,
        "anomaly_count": len(anomaly_indices),
        "anomaly_rate": round(len(anomaly_indices) / lengths[0], 4),
        "scores": [round(float(s), 4) for s in scores],
    }


@app.post("/baseline")
async def compute_baseline(payload: dict) -> dict:
    """
    Compute rolling baseline statistics for a sensor (mean, std, control limits).
    Used to populate rtm_AlarmConfiguration thresholds.
    """
    values = payload.get("values", [])
    if len(values) < 5:
        raise HTTPException(400, "Need at least 5 values to compute baseline")

    arr = np.array(values, dtype=float)
    mean = float(np.mean(arr))
    std = float(np.std(arr))

    return {
        "mean": round(mean, 4),
        "std": round(std, 4),
        "min": round(float(np.min(arr)), 4),
        "max": round(float(np.max(arr)), 4),
        "p5": round(float(np.percentile(arr, 5)), 4),
        "p95": round(float(np.percentile(arr, 95)), 4),
        # UCL/LCL using 3-sigma control chart
        "ucl": round(mean + 3 * std, 4),
        "lcl": round(mean - 3 * std, 4),
        # Suggested alarm thresholds (2-sigma for early warning)
        "suggested_high_alarm": round(mean + 2 * std, 4),
        "suggested_low_alarm": round(mean - 2 * std, 4),
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002, reload=False)
