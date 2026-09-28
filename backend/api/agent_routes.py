from fastapi import APIRouter, HTTPException
import json

from agents.incident_agent import analyze_incident

router = APIRouter(
    prefix="/agents",
    tags=["Agents"]
)


@router.get("/ping")
def ping():
    return {
        "message": "agent router working"
    }


@router.post("/analyze/{incident_id}")
def analyze(incident_id: str):

    with open(
        "data/incidents.json",
        "r",
        encoding="utf-8"
    ) as f:
        incidents = json.load(f)

    incident = next(
        (
            i for i in incidents
            if i["incident_id"] == incident_id
        ),
        None
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return analyze_incident(
        incident
    )