import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

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
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json() == {'status': 'ok'}


def test_incident_ping():
    response = client.get('/incidents/ping')
    assert response.status_code == 200
    assert response.json() == {'message': 'incident router working'}


def test_agent_ping():
    response = client.get('/agents/ping')
    assert response.status_code == 200
    assert response.json() == {'message': 'agent router working'}


def test_memory_ping():
    response = client.get('/memory/ping')
    assert response.status_code == 200
    assert response.json() == {'message': 'memory router working'}


def test_json_files_load():
    files = ['data/incidents.json', 'data/memory.json', 'data/runbooks.json', 'data/postmortems.json']
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        assert isinstance(data, list)


def test_placeholder_functions():
    assert incident_agent() == 'incident agent placeholder'
    assert generate_hypothesis() == 'cpu overload'
    assert recommend_action() == 'restart service'
    assert isinstance(simulate_alert(), dict)
    assert isinstance(normalize_alert(), dict)
    assert isinstance(recall_memory(), list)
    assert isinstance(reflect_memory(), dict)


def test_cors_headers_for_frontend():
    response = client.options(
        '/api/incidents',
        headers={
            'Origin': 'http://localhost:5173',
            'Access-Control-Request-Method': 'GET',
        },
    )
    assert response.status_code == 200
    assert response.headers.get('access-control-allow-origin') == 'http://localhost:5173'


def test_analysis_route_accepts_frontend_incident_id():
    with open('data/incidents.json', 'r', encoding='utf-8') as f:
        incidents = json.load(f)

    if incidents:
        incident_id = incidents[0].get('id') or incidents[0].get('incident_id')
        response = client.post(f'/api/agents/analyze/{incident_id}')
        assert response.status_code == 200
        body = response.json()
        assert 'hypotheses' in body
        assert 'recommendation' in body
        assert 'action' in body


def test_interactive_incident_and_postmortem_routes(tmp_path, monkeypatch):
    from api import incident_routes, postmortem_routes

    incident_file = tmp_path / 'incidents.json'
    postmortem_file = tmp_path / 'postmortems.json'
    incident_file.write_text(json.dumps([{
        'id': 'INC-TEST',
        'incident_id': 'INC-TEST',
        'title': 'Test outage',
        'description': 'Checkout requests are failing.',
        'severity': 'high',
        'status': 'open',
    }]), encoding='utf-8')
    postmortem_file.write_text('[]', encoding='utf-8')

    monkeypatch.setattr(incident_routes, 'DATA_FILE', incident_file)
    monkeypatch.setattr(postmortem_routes, 'INCIDENTS_FILE', incident_file)
    monkeypatch.setattr(postmortem_routes, 'POSTMORTEMS_FILE', postmortem_file)

    simulated_response = client.post('/api/incidents/simulate')
    assert simulated_response.status_code == 200
    simulated_incident = simulated_response.json()
    assert simulated_incident['source'] == 'alert simulator'
    assert simulated_incident['alert_type'] in {'high_cpu', 'database_timeout', 'http_5xx_spike'}
    assert simulated_incident['service']
    assert simulated_incident['metric_value'] > 0
    assert simulated_incident['updated_at'] == simulated_incident['created_at']

    create_response = client.post('/api/incidents', json={
        'title': 'Created through the intake form',
        'description': 'A test incident created in temporary storage.',
        'severity': 'medium',
        'source': 'manual',
    })
    assert create_response.status_code == 200
    assert create_response.json()['status'] == 'open'
    created_at = create_response.json()['updated_at']
    assert created_at == create_response.json()['created_at']

    status_response = client.patch('/api/incidents/INC-TEST', json={'status': 'resolved'})
    assert status_response.status_code == 200
    assert status_response.json()['status'] == 'resolved'
    assert status_response.json()['updated_at'] >= created_at

    edit_response = client.patch('/api/incidents/INC-TEST', json={
        'title': 'Updated outage title',
        'severity': 'critical',
    })
    assert edit_response.status_code == 200
    assert edit_response.json()['title'] == 'Updated outage title'
    assert edit_response.json()['severity'] == 'critical'
    assert edit_response.json()['updated_at'] >= status_response.json()['updated_at']

    approval_response = client.post('/api/incidents/INC-TEST/approval', json={'decision': 'approved'})
    assert approval_response.status_code == 200
    assert approval_response.json()['decision'] == 'approved'
    updated_incident = client.get('/api/incidents/INC-TEST').json()
    assert updated_incident['action_status'] == 'approved'
    assert updated_incident['updated_at'] == approval_response.json()['decided_at']

    draft_response = client.post('/api/postmortems/INC-TEST')
    assert draft_response.status_code == 200
    assert draft_response.json()['incident_title'] == 'Updated outage title'

    save_response = client.put('/api/postmortems/INC-TEST', json={'root_cause': 'Bad deploy'})
    assert save_response.status_code == 200
    assert client.get('/api/postmortems/INC-TEST').json()['root_cause'] == 'Bad deploy'
