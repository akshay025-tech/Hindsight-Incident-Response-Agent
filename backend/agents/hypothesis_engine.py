def generate_hypothesis():
    return 'cpu overload'


def generate_hypotheses(incident):
    alert_type = (incident or {}).get('alert_type') or (incident or {}).get('title', '')
    normalized = str(alert_type).lower()

    if 'cpu' in normalized:
        alert_type = 'high_cpu'
    elif 'database' in normalized or 'timeout' in normalized or 'db' in normalized:
        alert_type = 'database_timeout'
    elif '5xx' in normalized or 'http' in normalized:
        alert_type = 'http_5xx_spike'

    mapping = {
        'high_cpu': [
            {'cause': 'high_cpu', 'confidence': 0.92},
            {'cause': 'memory_leak', 'confidence': 0.70},
        ],
        'database_timeout': [
            {'cause': 'database_timeout', 'confidence': 0.95},
            {'cause': 'slow_query', 'confidence': 0.75},
        ],
        'http_5xx_spike': [
            {'cause': 'http_5xx_spike', 'confidence': 0.90},
            {'cause': 'bad_deployment', 'confidence': 0.72},
        ],
    }

    return mapping.get(alert_type, [{'cause': 'unknown', 'confidence': 0.50}])
