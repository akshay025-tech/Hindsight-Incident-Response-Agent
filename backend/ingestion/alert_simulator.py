import random
from datetime import datetime


def simulate_alert():
    alerts = [
        {'alert_type': 'high_cpu', 'service': 'api-gateway', 'severity': 'high', 'value': 92},
        {'alert_type': 'database_timeout', 'service': 'billing-db', 'severity': 'critical', 'value': 88},
        {'alert_type': 'http_5xx_spike', 'service': 'checkout-api', 'severity': 'high', 'value': 75},
    ]
    return random.choice(alerts)
