import random


def simulate_alert():
    alerts = [
        {
            "alert_type": "high_cpu",
            "service": "payment-service",
            "severity": "high",
            "value": random.randint(85, 100)
        },
        {
            "alert_type": "database_timeout",
            "service": "user-service",
            "severity": "critical",
            "value": random.randint(5, 30)
        },
        {
            "alert_type": "http_5xx_spike",
            "service": "api-gateway",
            "severity": "high",
            "value": random.randint(50, 500)
        }
    ]

    return random.choice(alerts)