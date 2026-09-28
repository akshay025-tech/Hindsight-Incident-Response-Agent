import json
from pathlib import Path

MEMORY_FILE = Path("data/memory.json")


def recall_memory():
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)