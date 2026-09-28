import json

from ingestion.alert_simulator import simulate_alert
from ingestion.incident_normalizer import normalize_alert

from agents.hypothesis_engine import generate_hypotheses
from agents.recommendation_agent import recommend_actions

from hindsight.retain import retain_memory
from hindsight.recall import recall_memory


INCIDENT_FILE = "data/incidents.json"


def create_incident():
    alert = simulate_alert()

    incident = normalize_alert(alert)

    with open(INCIDENT_FILE, "r", encoding="utf-8") as f:
        incidents = json.load(f)

    incidents.append(incident)

    with open(INCIDENT_FILE, "w", encoding="utf-8") as f:
        json.dump(incidents, f, indent=2)

    return incident


def analyze_incident(incident):
    similar_incidents = recall_memory(
        incident["alert_type"]
    )

    hypotheses = generate_hypotheses(
        incident
    )

    recommendations = recommend_actions(
        hypotheses
    )

    result = {
        "incident": incident,
        "similar_incidents": similar_incidents,
        "hypotheses": hypotheses,
        "recommendations": recommendations
    }

    retain_memory({
        "incident_id": incident["incident_id"],
        "alert_type": incident["alert_type"],
        "lesson": f"Investigated {incident['alert_type']}"
    })

    return result