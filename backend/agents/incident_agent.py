import json

from agents.hypothesis_engine import generate_hypotheses
from agents.recommendation_agent import recommend_actions
from hindsight.recall import recall_memory
from hindsight.retain import retain_memory

INCIDENT_FILE = 'data/incidents.json'


def incident_agent():
    return 'incident agent placeholder'


def create_incident():
    return {'incident_id': 'demo-incident'}


def analyze_incident(incident):
    incident = incident or {}
    alert_type = incident.get('alert_type') or incident.get('title') or 'database_timeout'
    similar_incidents = recall_memory(alert_type)

    hypotheses = generate_hypotheses({
        'alert_type': alert_type,
        'title': incident.get('title', alert_type),
    })

    recommendations = recommend_actions(hypotheses)
    primary_recommendation = recommendations[0] if recommendations else 'Restart the affected dependency and verify service recovery.'

    result = {
        'incident': incident,
        'similar_incidents': similar_incidents,
        'hypotheses': [
            {
                'title': hypothesis.get('cause', 'Likely cause').replace('_', ' ').title(),
                'description': f"This hypothesis matches the observed {alert_type} pattern and the recommended runbook.",
                'confidence': float(hypothesis.get('confidence', 0.6)),
                'validated': True,
            }
            for hypothesis in hypotheses
        ],
        'recommendation': {
            'title': 'Immediate Response',
            'description': primary_recommendation,
            'expected_impact': 'Service recovery and reduced incident blast radius',
            'risk': 'Low',
            'rollback': 'Revert the latest change, then validate service health before re-enabling traffic.',
        },
        'recommendations': recommendations,
        'memories': [
            {
                'title': memory.get('incident_id', 'Previous incident'),
                'summary': memory.get('lesson', 'Historical review'),
                'similarity': 0.88,
                'outcome': 'Mitigated',
            }
            for memory in similar_incidents[:3]
        ],
        'evidence': [
            {
                'title': 'Service signal',
                'description': f"The incident pattern for {alert_type} strongly matches the local runbook and recent historical recall.",
                'source': 'Runbook + memory matching',
                'type': 'metric',
                'supports': True,
            }
        ],
        'action': {
            'id': f"ACT-{str(incident.get('id') or incident.get('incident_id') or '000')}",
            'title': 'Apply recommended mitigation',
            'description': primary_recommendation,
            'status': incident.get('action_status', 'pending_approval'),
        },
    }

    retain_memory({
        'incident_id': incident.get('incident_id') or incident.get('id') or 'unknown',
        'alert_type': alert_type,
        'lesson': f"Investigated {alert_type}",
    })

    return result
