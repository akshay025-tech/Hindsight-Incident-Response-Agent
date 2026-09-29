from datetime import datetime, timezone
import uuid


def normalize_alert(alert: dict | None = None):
    alert = alert or {
        'alert_type': 'cpu_high',
        'service': 'api-gateway',
        'severity': 'high',
        'value': 95,
    }
    return {
        'incident_id': str(uuid.uuid4()),
        'created_at': datetime.now(timezone.utc).isoformat(),
        'status': 'open',
        'alert_type': alert['alert_type'],
        'service': alert['service'],
        'severity': alert['severity'],
        'metric_value': alert['value'],
    }
