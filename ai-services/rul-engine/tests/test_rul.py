"""Tests for the RUL (Remaining Useful Life) Engine."""

import pytest
import math
from fastapi.testclient import TestClient


class TestWeibullCalculations:
    def test_survival_at_zero_is_one(self):
        from rul_engine.main import weibull_survival
        assert weibull_survival(0, beta=2.0, eta=1000) == 1.0

    def test_survival_decreases_with_age(self):
        from rul_engine.main import weibull_survival
        s100 = weibull_survival(100, beta=2.0, eta=1000)
        s500 = weibull_survival(500, beta=2.0, eta=1000)
        s900 = weibull_survival(900, beta=2.0, eta=1000)
        assert s100 > s500 > s900

    def test_survival_at_eta_is_about_37_pct(self):
        from rul_engine.main import weibull_survival
        # At t=eta, Weibull survival = exp(-1) ≈ 0.368
        s = weibull_survival(1000, beta=2.0, eta=1000)
        assert abs(s - math.exp(-1)) < 0.01

    def test_conditional_survival_greater_than_unconditional(self):
        from rul_engine.main import weibull_conditional_survival, weibull_survival
        # Given survived to t0, survival to t should be higher than unconditional
        t0, t = 500, 600
        cond = weibull_conditional_survival(t, t0, beta=2.0, eta=1000)
        uncond = weibull_survival(t, beta=2.0, eta=1000)
        assert cond > uncond

    def test_median_rul_is_positive(self):
        from rul_engine.main import weibull_median_rul
        rul = weibull_median_rul(t0=100, beta=2.0, eta=1000)
        assert rul > 0


class TestRulPrediction:
    @pytest.fixture
    def client(self):
        from rul_engine.main import app
        with TestClient(app) as c:
            yield c

    def test_health_endpoint(self, client):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "healthy"

    def test_predict_returns_valid_structure(self, client):
        resp = client.post("/predict", json={
            "component_id": 1,
            "component_type": "seal",
            "age_days": 400,
            "failure_history": [200, 380],
        })
        assert resp.status_code == 200
        data = resp.json()
        assert "rul_days" in data
        assert "risk_level" in data
        assert data["risk_level"] in ["critical", "high", "medium", "low"]
        assert 0.0 <= data["survival_probability_30d"] <= 1.0
        assert 0.0 <= data["survival_probability_60d"] <= 1.0
        assert 0.0 <= data["survival_probability_90d"] <= 1.0

    def test_older_component_has_lower_survival(self, client):
        resp_young = client.post("/predict", json={"component_id": 1, "component_type": "seal", "age_days": 100})
        resp_old = client.post("/predict", json={"component_id": 2, "component_type": "seal", "age_days": 700})
        assert resp_young.status_code == 200
        assert resp_old.status_code == 200
        assert resp_young.json()["survival_probability_90d"] >= resp_old.json()["survival_probability_90d"]

    def test_fleet_prediction_sorts_by_rul(self, client):
        resp = client.post("/predict/fleet", json={
            "components": [
                {"component_id": 1, "component_type": "seal", "age_days": 700},
                {"component_id": 2, "component_type": "structural", "age_days": 100},
                {"component_id": 3, "component_type": "pump", "age_days": 400},
            ]
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["total_components"] == 3
        results = data["results"]
        ruls = [r["rul_days"] for r in results if r["rul_days"] is not None]
        assert ruls == sorted(ruls)  # sorted ascending

    def test_get_component_types(self, client):
        resp = client.get("/component-types")
        assert resp.status_code == 200
        types = resp.json()["component_types"]
        assert len(types) > 0
        assert all("type" in t and "beta" in t and "eta_days" in t for t in types)
