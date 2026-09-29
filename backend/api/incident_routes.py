import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ingestion.alert_simulator import simulate_alert
from ingestion.incident_normalizer import normalize_alert

router = APIRouter()

DATA_FILE = Path(__file__).resolve().parent.parent / 'data' / 'incidents.json'


class Incident(BaseModel):
    title: str
    description: str | None = None
    severity: str | None = None
    status: str = 'open'
    source: str | None = None
    id: str | None = None
    created_at: str | None = None
    updated_at: str | None = None
    alert_type: str | None = None
    service: str | None = None
    metric_value: float | None = None


class IncidentUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    severity: str | None = None
    status: str | None = None


class ApprovalDecision(BaseModel):
    decision: Literal['approved', 'rejected']


@router.get('/incidents')
def list_incidents():
    with DATA_FILE.open('r', encoding='utf-8') as f:
        incidents = json.load(f)
    return incidents


@router.get('/incidents/{incident_id}')
def get_incident(incident_id: str):
    with DATA_FILE.open('r', encoding='utf-8') as f:
        incidents = json.load(f)

    incident = next(
        (item for item in incidents if str(item.get('id') or item.get('incident_id')) == str(incident_id)),
        None,
    )
    if incident is None:
        raise HTTPException(status_code=404, detail='Incident not found')
    return incident


@router.patch('/incidents/{incident_id}')
def update_incident(incident_id: str, update: IncidentUpdate):
    with DATA_FILE.open('r', encoding='utf-8') as f:
        incidents = json.load(f)

    incident = next(
        (item for item in incidents if str(item.get('id') or item.get('incident_id')) == str(incident_id)),
        None,
    )
    if incident is None:
        raise HTTPException(status_code=404, detail='Incident not found')

    changes = update.model_dump(exclude_unset=True)
    if 'status' in changes and changes['status'] not in {'open', 'investigating', 'resolved'}:
        raise HTTPException(status_code=422, detail='Unsupported incident status')
    if 'severity' in changes and changes['severity'] not in {'low', 'medium', 'high', 'critical'}:
        raise HTTPException(status_code=422, detail='Unsupported incident severity')

    incident.update(changes)
    incident['updated_at'] = datetime.now(timezone.utc).isoformat()
    with DATA_FILE.open('w', encoding='utf-8') as f:
        json.dump(incidents, f, indent=2)
    return incident


@router.post('/incidents/{incident_id}/approval')
def decide_approval(incident_id: str, decision: ApprovalDecision):
    with DATA_FILE.open('r', encoding='utf-8') as f:
        incidents = json.load(f)

    incident = next(
        (item for item in incidents if str(item.get('id') or item.get('incident_id')) == str(incident_id)),
        None,
    )
    if incident is None:
        raise HTTPException(status_code=404, detail='Incident not found')

    incident['action_status'] = decision.decision
    incident['action_decided_at'] = datetime.now(timezone.utc).isoformat()
    incident['updated_at'] = incident['action_decided_at']
    with DATA_FILE.open('w', encoding='utf-8') as f:
        json.dump(incidents, f, indent=2)
    return {'incident_id': incident_id, 'decision': decision.decision, 'decided_at': incident['action_decided_at']}


@router.post('/incidents')
def create_incident(incident: Incident):
    with DATA_FILE.open('r', encoding='utf-8') as f:
        incidents = json.load(f)

    created = incident.model_dump(exclude_none=True)
    created['id'] = created.get('id') or f"INC-{len(incidents) + 1:03d}"
    created['incident_id'] = created.get('incident_id') or created['id']
    created['status'] = created.get('status', 'open')
    created['source'] = created.get('source') or 'manual'
    created['title'] = created.get('title') or 'Untitled incident'
    created['description'] = created.get('description') or 'No description provided.'
    created['severity'] = created.get('severity') or 'medium'
    created['created_at'] = created.get('created_at') or datetime.now(timezone.utc).isoformat()
    created['updated_at'] = created['created_at']

    incidents.append(created)

    with DATA_FILE.open('w', encoding='utf-8') as f:
        json.dump(incidents, f, indent=2)

    return created


@router.post('/incidents/simulate')
def ingest_simulated_alert():
    alert = simulate_alert()
    normalized = normalize_alert(alert)
    incident = Incident(
        id=f"INC-{normalized['incident_id'][:8].upper()}",
        title=f"{alert['alert_type'].replace('_', ' ').title()} on {alert['service']}",
        description=f"Alert simulator reported {alert['value']} for {alert['service']}.",
        severity=alert['severity'],
        source='alert simulator',
        created_at=normalized['created_at'],
        alert_type=alert['alert_type'],
        service=alert['service'],
        metric_value=alert['value'],
    )
    return create_incident(incident)
