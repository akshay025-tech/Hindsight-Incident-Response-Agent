import json
from pathlib import Path

MEMORY_FILE = Path("data/memory.json")


def retain_memory(record: dict):
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        memory = json.load(f)

    memory.append(record)

    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(memory, f, indent=2)

    return record