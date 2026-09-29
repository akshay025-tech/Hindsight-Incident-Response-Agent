import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

from agents.incident_agent import analyze_incident

router = APIRouter(prefix='/agents', tags=['Agents'])
DATA_FILE = Path(__file__).resolve().parent.parent / 'data' / 'incidents.json'


@router.get('/ping')
def ping():
    return {'message': 'agent router working'}


@router.post('/analyze/{incident_id}')
def analyze(incident_id: str):
    with DATA_FILE.open('r', encoding='utf-8') as f:
        incidents = json.load(f)

    incident = next(
        (i for i in incidents if str(i.get('id') or i.get('incident_id')) == str(incident_id)),
        None,
    )

    if incident is None:
        raise HTTPException(status_code=404, detail='Incident not found')

    if 'incident_id' not in incident and 'id' in incident:
        incident['incident_id'] = incident['id']

    return analyze_incident(incident)
