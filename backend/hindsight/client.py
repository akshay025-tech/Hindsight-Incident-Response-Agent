import os
from dotenv import load_dotenv

load_dotenv()


class HindsightClient:
    def __init__(self):
        self.mock_mode = (
            os.getenv("MOCK_MODE", "true").lower() == "true"
        )

    def generate_insight(self, incident):
        if self.mock_mode:
            return {
                "source": "mock",
                "insight": f"Similar incidents found for {incident.get('alert_type')}"
            }

        return {
            "source": "external",
            "insight": "External provider not configured"
        }