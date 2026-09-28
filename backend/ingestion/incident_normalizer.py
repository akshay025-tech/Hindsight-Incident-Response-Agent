from datetime import datetime
import uuid


def normalize_alert(alert: dict):
    return {
        "incident_id": str(uuid.uuid4()),
        "created_at": datetime.utcnow().isoformat(),
        "status": "open",
        "alert_type": alert["alert_type"],
        "service": alert["service"],
        "severity": alert["severity"],
        "metric_value": alert["value"]
    }