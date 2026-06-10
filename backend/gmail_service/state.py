import json
import os

from gmail_service.config import STATE_FILE


def load_processed() -> set[str]:
    if not os.path.exists(STATE_FILE):
        return set()

    try:
        with open(STATE_FILE, "r", encoding="utf-8") as state_file:
            return set(json.load(state_file))
    except (json.JSONDecodeError, ValueError):
        return set()


def mark_processed(ids: set[str]) -> None:
    with open(STATE_FILE, "w", encoding="utf-8") as state_file:
        json.dump(sorted(ids), state_file)
