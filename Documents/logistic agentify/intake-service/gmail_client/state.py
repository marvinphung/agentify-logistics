import json
import os

from config import STATE_FILE


def load_processed() -> set:
    if os.path.exists(STATE_FILE):
        try:
            return set(json.load(open(STATE_FILE)))
        except (json.JSONDecodeError, ValueError):
            return set()
    return set()


def mark_processed(ids: set):
    json.dump(list(ids), open(STATE_FILE, "w"))
