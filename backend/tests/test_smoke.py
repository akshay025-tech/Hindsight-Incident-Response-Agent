import sys
from pathlib import Path

# Add backend folder to Python path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import json

from fastapi.testclient import TestClient

from app import app
from agents.incident_agent import incident_agent
from agents.hypothesis_engine import generate_hypothesis
from agents.recommendation_agent import recommend_action

from ingestion.alert_simulator import simulate_alert
from ingestion.incident_normalizer import normalize_alert

from hindsight.recall import recall_memory
from hindsight.reflect import reflect_memory


client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_incident_ping():
    response = client.get("/incidents/ping")

    assert response.status_code == 200
    assert response.json() == {
        "message": "incident router working"
    }


def test_agent_ping():
    response = client.get("/agents/ping")

    assert response.status_code == 200
    assert response.json() == {
        "message": "agent router working"
    }


def test_memory_ping():
    response = client.get("/memory/ping")

    assert response.status_code == 200
    assert response.json() == {
        "message": "memory router working"
    }


def test_json_files_load():
    files = [
        "data/incidents.json",
        "data/memory.json",
        "data/runbooks.json"
    ]

    for file in files:
        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)

        assert isinstance(data, list)


def test_placeholder_functions():
    assert incident_agent() == "incident agent placeholder"
    assert generate_hypothesis() == "cpu overload"
    assert recommend_action() == "restart service"

    assert isinstance(simulate_alert(), dict)
    assert isinstance(normalize_alert(), dict)

    assert isinstance(recall_memory(), list)
    assert isinstance(reflect_memory(), dict)