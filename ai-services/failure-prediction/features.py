"""Feature extraction and engineering for failure prediction."""

import numpy as np
import pandas as pd
from typing import Any


FEATURE_ORDER = [
    "days_since_last_failure",
    "total_failures_12m",
    "total_npt_hours_12m",
    "component_age_days",
    "availability_score",
    "sensor_anomaly_score",
]

FEATURE_DEFAULTS = {
    "days_since_last_failure": 365.0,
    "total_failures_12m": 0,
    "total_npt_hours_12m": 0.0,
    "component_age_days": 730.0,
    "availability_score": 90.0,
    "sensor_anomaly_score": 0.0,
}


def extract_features(raw: dict[str, Any]) -> np.ndarray:
    """Convert raw feature dict to ordered numpy array for model input."""
    vector = []
    for col in FEATURE_ORDER:
        val = raw.get(col, FEATURE_DEFAULTS[col])
        if val is None:
            val = FEATURE_DEFAULTS[col]
        vector.append(float(val))
    return np.array(vector, dtype=np.float32)


def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Full feature engineering pipeline for training data."""
    out = df.copy()

    # Recency features
    out["failure_recency_score"] = np.exp(
        -out.get("days_since_last_failure", pd.Series(365, index=df.index)) / 90
    )

    # Frequency features
    out["failure_rate_12m"] = out.get("total_failures_12m", pd.Series(0, index=df.index)) / 12.0

    # Age-degradation interaction
    out["age_failure_interaction"] = (
        out.get("component_age_days", pd.Series(730, index=df.index)) / 365 *
        out.get("total_failures_12m", pd.Series(0, index=df.index))
    )

    # NPT severity
    out["npt_severity"] = pd.cut(
        out.get("total_npt_hours_12m", pd.Series(0, index=df.index)),
        bins=[-1, 10, 50, 200, np.inf],
        labels=[0, 1, 2, 3],
    ).astype(float)

    return out
