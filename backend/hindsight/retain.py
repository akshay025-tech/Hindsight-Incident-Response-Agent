import json
from pathlib import Path

MEMORY_FILE = Path("data/memory.json")


def retain_memory(record: dict):
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    data.append(record)

    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return record