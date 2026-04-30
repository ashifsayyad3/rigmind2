"""
RigMind AI™ — Remaining Useful Life (RUL) Engine
Weibull survival analysis + linear degradation model for component lifetime estimation.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import structlog
import uvicorn
from contextlib import asynccontextmanager
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("RUL Engine starting")
    yield


app = FastAPI(
    title="RigMind AI™ — RUL Engine",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


# ── Weibull parameters by component category (from historical data) ────────────
# Shape (beta) and scale (eta) parameters for 2-parameter Weibull distribution
# Beta > 1 = wear-out failure; Beta < 1 = infant mortality
WEIBULL_PARAMS: dict[str, dict[str, float]] = {
    "annular_bop":        {"beta": 2.1, "eta": 1825},  # days
    "ram_bop":            {"beta": 1.8, "eta": 2190},
    "hydraulic_system":   {"beta": 1.5, "eta": 1095},
    "seal":               {"beta": 2.4, "eta": 730},
    "valve":              {"beta": 1.9, "eta": 1460},
    "sensor":             {"beta": 1.2, "eta": 900},
    "pump":               {"beta": 2.0, "eta": 1200},
    "electrical":         {"beta": 1.3, "eta": 1095},
    "structural":         {"beta": 3.0, "eta": 3650},
    "default":            {"beta": 1.8, "eta": 1200},
}


class RulRequest(BaseModel):
    component_id: int
    component_type: str = "default"
    age_days: float = Field(..., ge=0)
    failure_history: list[float] = Field(default_factory=list)  # ages at past failures (days)
    maintenance_history: list[float] = Field(default_factory=list)  # ages at past maintenance (days)
    current_health_score: Optional[float] = Field(None, ge=0, le=100)
    sensor_degradation_rate: Optional[float] = None  # % per day


class FleetRulRequest(BaseModel):
    components: list[RulRequest]


class RulResult(BaseModel):
    component_id: int
    component_type: str
    age_days: float
    rul_days: Optional[float]        # median RUL estimate
    rul_days_p10: Optional[float]    # pessimistic (10th percentile)
    rul_days_p90: Optional[float]    # optimistic (90th percentile)
    survival_probability_30d: float
    survival_probability_60d: float
    survival_probability_90d: float
    recommended_maintenance_days: Optional[float]
    risk_level: str
    confidence: str
    model_used: str


# ── Core Weibull calculations ──────────────────────────────────────────────────

def weibull_survival(t: float, beta: float, eta: float) -> float:
    """P(T > t) — probability of surviving to age t."""
    return float(np.exp(-((t / eta) ** beta)))


def weibull_conditional_survival(t: float, t0: float, beta: float, eta: float) -> float:
    """P(T > t | T > t0) — conditional survival given already survived to t0."""
    s_t0 = weibull_survival(t0, beta, eta)
    if s_t0 <= 0:
        return 0.0
    s_t = weibull_survival(t, beta, eta)
    return s_t / s_t0


def weibull_median_rul(t0: float, beta: float, eta: float) -> float:
    """Median remaining life given current age t0."""
    # Median = eta * (-ln(0.5))^(1/beta) is the unconditional median
    # Conditional: find t such that P(T > t0+t | T > t0) = 0.5
    for delta_t in range(1, 10000):
        if weibull_conditional_survival(t0 + delta_t, t0, beta, eta) < 0.5:
            return float(delta_t)
    return 10000.0


def weibull_quantile_rul(t0: float, beta: float, eta: float, quantile: float) -> float:
    """RUL at given survival quantile (e.g. 0.1 = pessimistic, 0.9 = optimistic)."""
    target = 1.0 - quantile
    for delta_t in range(1, 10000):
        if weibull_conditional_survival(t0 + delta_t, t0, beta, eta) < target:
            return float(delta_t)
    return 10000.0


def _compute_rul(req: RulRequest) -> RulResult:
    comp_type = req.component_type.lower().replace(" ", "_")
    params = WEIBULL_PARAMS.get(comp_type, WEIBULL_PARAMS["default"])
    beta, eta = params["beta"], params["eta"]

    # Adjust eta based on failure history (empirical Bayes-like update)
    if len(req.failure_history) >= 2:
        mean_ttf = float(np.mean(np.diff(sorted(req.failure_history))))
        if mean_ttf > 0:
            # Blend observed MTTF with prior
            eta = 0.7 * mean_ttf + 0.3 * eta

    # Health score degrades estimated survival
    health_factor = 1.0
    if req.current_health_score is not None:
        health_factor = (req.current_health_score / 100) ** 0.5

    # Sensor degradation rate model
    sensor_rul = None
    if req.sensor_degradation_rate is not None and req.sensor_degradation_rate > 0:
        # Time until health reaches critical threshold (20%)
        current_health = req.current_health_score or 80.0
        if current_health > 20.0:
            sensor_rul = (current_health - 20.0) / req.sensor_degradation_rate

    # Weibull RUL estimates
    t0 = req.age_days
    rul_median = weibull_median_rul(t0, beta, eta) * health_factor
    rul_p10 = weibull_quantile_rul(t0, beta, eta, 0.9) * health_factor  # pessimistic
    rul_p90 = weibull_quantile_rul(t0, beta, eta, 0.1) * health_factor  # optimistic

    # If sensor model gives a shorter estimate, use that
    if sensor_rul is not None:
        rul_median = min(rul_median, sensor_rul)
        rul_p10 = min(rul_p10, sensor_rul * 0.7)

    # Conditional survival probabilities
    s30 = weibull_conditional_survival(t0 + 30, t0, beta, eta) * health_factor
    s60 = weibull_conditional_survival(t0 + 60, t0, beta, eta) * health_factor
    s90 = weibull_conditional_survival(t0 + 90, t0, beta, eta) * health_factor

    # Recommend maintenance at 80% survival threshold
    maintenance_days = None
    for d in range(1, 1000):
        if weibull_conditional_survival(t0 + d, t0, beta, eta) < 0.80:
            maintenance_days = float(d)
            break

    # Risk classification
    if s30 < 0.7:
        risk_level = "critical"
    elif s30 < 0.85:
        risk_level = "high"
    elif s60 < 0.85:
        risk_level = "medium"
    else:
        risk_level = "low"

    confidence = "high" if len(req.failure_history) >= 3 else "medium" if len(req.failure_history) >= 1 else "low"
    model = "weibull+sensor" if req.sensor_degradation_rate else "weibull"
    if len(req.failure_history) >= 2:
        model += "+empirical"

    return RulResult(
        component_id=req.component_id,
        component_type=req.component_type,
        age_days=req.age_days,
        rul_days=round(rul_median, 1),
        rul_days_p10=round(rul_p10, 1),
        rul_days_p90=round(rul_p90, 1),
        survival_probability_30d=round(min(s30, 1.0), 4),
        survival_probability_60d=round(min(s60, 1.0), 4),
        survival_probability_90d=round(min(s90, 1.0), 4),
        recommended_maintenance_days=round(maintenance_days, 0) if maintenance_days else None,
        risk_level=risk_level,
        confidence=confidence,
        model_used=model,
    )


# ── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "healthy", "service": "rul-engine"}


@app.get("/component-types")
def get_component_types():
    """List supported component types with their Weibull parameters."""
    return {
        "component_types": [
            {"type": k, "beta": v["beta"], "eta_days": v["eta"],
             "mttf_days": round(v["eta"] * np.math.gamma(1 + 1/v["beta"]), 0)}
            for k, v in WEIBULL_PARAMS.items()
        ]
    }


@app.post("/predict", response_model=RulResult)
async def predict_rul(request: RulRequest) -> RulResult:
    """Predict remaining useful life for a single component."""
    return _compute_rul(request)


@app.post("/predict/fleet")
async def predict_fleet_rul(request: FleetRulRequest) -> dict:
    """Batch RUL prediction for multiple components."""
    if not request.components:
        raise HTTPException(400, "No components provided")
    if len(request.components) > 500:
        raise HTTPException(400, "Maximum 500 components per request")

    results = [_compute_rul(c).model_dump() for c in request.components]
    critical = [r for r in results if r["risk_level"] == "critical"]
    high = [r for r in results if r["risk_level"] == "high"]

    return {
        "total_components": len(results),
        "critical_count": len(critical),
        "high_risk_count": len(high),
        "results": sorted(results, key=lambda r: r["rul_days"] or 9999),
        "fleet_summary": {
            "avg_rul_days": round(float(np.mean([r["rul_days"] for r in results if r["rul_days"]])), 1),
            "components_needing_maintenance_30d": sum(
                1 for r in results
                if r["recommended_maintenance_days"] and r["recommended_maintenance_days"] <= 30
            ),
        }
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003, reload=False)
