"""Tests for the Anomaly Detection Service."""

import numpy as np
import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def client():
    from anomaly_detection.main import app
    with TestClient(app) as c:
        yield c


def make_readings(n=30, spike_at=None, rig_id=1, tag="P1"):
    readings = [{"rig_id": rig_id, "sensor_tag": tag, "value": float(100 + np.random.normal(0, 2))} for _ in range(n)]
    if spike_at is not None:
        readings[spike_at]["value"] = 500.0  # clear anomaly
    return readings


class TestAnomalyDetection:
    def test_health(self, client):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "healthy"

    def test_minimum_readings_enforced(self, client):
        resp = client.post("/detect", json={"readings": [{"rig_id": 1, "sensor_tag": "P1", "value": 100.0}]})
        assert resp.status_code == 400

    def test_detects_obvious_anomaly(self, client):
        readings = make_readings(50, spike_at=25)
        resp = client.post("/detect", json={"readings": readings})
        assert resp.status_code == 200
        data = resp.json()
        assert "anomalies" in data
        # The spike should be flagged
        anomaly_values = [a["value"] for a in data["anomalies"]]
        assert 500.0 in anomaly_values

    def test_normal_data_has_low_anomaly_rate(self, client):
        # Tight normal distribution — very few anomalies expected
        readings = [{"rig_id": 1, "sensor_tag": "T1", "value": float(np.random.normal(100, 0.5))} for _ in range(100)]
        resp = client.post("/detect", json={"readings": readings, "contamination": 0.05})
        assert resp.status_code == 200
        assert resp.json()["anomaly_rate"] <= 0.10  # at most 10%

    def test_all_results_returned(self, client):
        n = 40
        readings = make_readings(n)
        resp = client.post("/detect", json={"readings": readings})
        assert resp.status_code == 200
        assert len(resp.json()["all_results"]) == n

    def test_baseline_computation(self, client):
        values = list(np.random.normal(100, 5, 50))
        resp = client.post("/baseline", json={"values": values})
        assert resp.status_code == 200
        data = resp.json()
        assert abs(data["mean"] - 100) < 5
        assert "ucl" in data and "lcl" in data
        assert data["ucl"] > data["lcl"]
        assert data["suggested_high_alarm"] < data["ucl"]

    def test_multivariate_detection(self, client):
        n = 30
        readings = {
            "pressure": [float(100 + np.random.normal(0, 1)) for _ in range(n)],
            "temperature": [float(50 + np.random.normal(0, 0.5)) for _ in range(n)],
        }
        readings["pressure"][10] = 999.0  # inject anomaly
        resp = client.post("/detect/multivariate", json={"rig_id": 1, "sensor_readings": readings})
        assert resp.status_code == 200
        data = resp.json()
        assert "anomaly_timesteps" in data
        assert 10 in data["anomaly_timesteps"]
