import json
from pathlib import Path

MEMORY_FILE = Path(__file__).resolve().parent.parent / 'data' / 'memory.json'


def recall_memory(query: str | None = None):
    with MEMORY_FILE.open('r', encoding='utf-8') as f:
        memory = json.load(f)

    if not query:
        return memory

    needle = str(query).lower()
    return [
        item for item in memory
        if needle in str(item.get('incident_id', '')).lower()
        or needle in str(item.get('lesson', '')).lower()
        or needle in str(item.get('alert_type', '')).lower()
    ]
