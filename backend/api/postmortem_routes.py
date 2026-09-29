import json
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=['Postmortems'])
DATA_DIR = Path(__file__).resolve().parent.parent / 'data'
INCIDENTS_FILE = DATA_DIR / 'incidents.json'
POSTMORTEMS_FILE = DATA_DIR / 'postmortems.json'


class PostmortemUpdate(BaseModel):
    summary: str | None = None
    root_cause: str | None = None
    impact: str | None = None
    resolution: str | None = None
    follow_up: str | None = None


def _read_postmortems():
    with POSTMORTEMS_FILE.open('r', encoding='utf-8') as file:
        return json.load(file)


def _write_postmortems(postmortems):
    with POSTMORTEMS_FILE.open('w', encoding='utf-8') as file:
        json.dump(postmortems, file, indent=2)


def _find_incident(incident_id):
    with INCIDENTS_FILE.open('r', encoding='utf-8') as file:
        incidents = json.load(file)
    return next(
        (item for item in incidents if str(item.get('id') or item.get('incident_id')) == str(incident_id)),
        None,
    )


@router.get('/postmortems/{incident_id}')
def get_postmortem(incident_id: str):
    postmortem = next(
        (item for item in _read_postmortems() if str(item.get('incident_id')) == str(incident_id)),
        None,
    )
    if postmortem is None:
        raise HTTPException(status_code=404, detail='Postmortem not found')
    return postmortem


@router.post('/postmortems/{incident_id}')
def generate_postmortem(incident_id: str):
    incident = _find_incident(incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail='Incident not found')

    incident_title = incident.get('title') or 'Untitled incident'
    description = incident.get('description') or 'Impact details need review.'
    service = incident.get('service') or 'the affected service'
    postmortem = {
        'incident_id': incident_id,
        'incident_title': incident_title,
        'summary': f'{incident_title} affected {service}. {description}',
        'root_cause': 'Needs investigation',
        'impact': description,
        'resolution': 'Add the mitigation and validation steps taken during response.',
        'follow_up': 'Assign an owner, define a due date, and verify the preventative action.',
        'generated_at': datetime.now(timezone.utc).isoformat(),
    }

    postmortems = _read_postmortems()
    existing_index = next(
        (index for index, item in enumerate(postmortems) if str(item.get('incident_id')) == str(incident_id)),
        None,
    )
    if existing_index is None:
        postmortems.append(postmortem)
    else:
        postmortem['generated_at'] = postmortems[existing_index].get('generated_at', postmortem['generated_at'])
        postmortem['updated_at'] = datetime.now(timezone.utc).isoformat()
        postmortems[existing_index] = postmortem
    _write_postmortems(postmortems)
    return postmortem


@router.put('/postmortems/{incident_id}')
def update_postmortem(incident_id: str, update: PostmortemUpdate):
    postmortems = _read_postmortems()
    postmortem = next(
        (item for item in postmortems if str(item.get('incident_id')) == str(incident_id)),
        None,
    )
    if postmortem is None:
        raise HTTPException(status_code=404, detail='Postmortem not found')

    postmortem.update(update.model_dump(exclude_unset=True))
    postmortem['updated_at'] = datetime.now(timezone.utc).isoformat()
    _write_postmortems(postmortems)
    return postmortem
