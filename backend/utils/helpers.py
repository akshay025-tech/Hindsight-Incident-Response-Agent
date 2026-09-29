import json
from pathlib import Path


def load_json(file_path: str):
    """
    Load JSON data from a file.
    """
    path = Path(file_path)

    if not path.exists():
        return []

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(file_path: str, data):
    """
    Save JSON data to a file.
    """
    path = Path(file_path)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def append_json_record(file_path: str, record: dict):
    """
    Append a record to a JSON list file.
    """
    data = load_json(file_path)

    data.append(record)

    save_json(file_path, data)

    return record