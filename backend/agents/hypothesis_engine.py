def generate_hypotheses(incident):
    alert_type = incident["alert_type"]

    mapping = {
        "high_cpu": [
            {"cause": "high_cpu", "confidence": 0.92},
            {"cause": "memory_leak", "confidence": 0.70}
        ],
        "database_timeout": [
            {"cause": "database_timeout", "confidence": 0.95},
            {"cause": "slow_query", "confidence": 0.75}
        ],
        "http_5xx_spike": [
            {"cause": "http_5xx_spike", "confidence": 0.90},
            {"cause": "bad_deployment", "confidence": 0.72}
        ]
    }

    return mapping.get(
        alert_type,
        [{"cause": "unknown", "confidence": 0.50}]
    )