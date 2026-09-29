import json
from pathlib import Path

MEMORY_FILE = Path(__file__).resolve().parent.parent / 'data' / 'memory.json'


def retain_memory(record: dict):
    with MEMORY_FILE.open('r', encoding='utf-8') as f:
        memory = json.load(f)

    memory.append(record)

    with MEMORY_FILE.open('w', encoding='utf-8') as f:
        json.dump(memory, f, indent=2)

    return record
