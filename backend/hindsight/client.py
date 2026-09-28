import os
from dotenv import load_dotenv

load_dotenv()


class HindsightClient:
    def __init__(self):
        self.api_key = os.getenv("HINDSIGHT_API_KEY")
        self.base_url = os.getenv("HINDSIGHT_BASE_URL")
        self.mock_mode = os.getenv("MOCK_MODE", "true").lower() == "true"

    def status(self):
        return {
            "mock_mode": self.mock_mode,
            "base_url": self.base_url,
        }