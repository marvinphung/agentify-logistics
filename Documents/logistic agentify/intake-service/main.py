import json

from extractor.pipeline import process_pdf
from gmail_client.auth import get_gmail_service
from gmail_client.fetcher import get_email, list_new_messages
from gmail_client.state import load_processed, mark_processed


def run_once():
    service = get_gmail_service()
    done = load_processed()
    records = []
    for msg_id in list_new_messages(service):
        if msg_id in done:
            continue
        email = get_email(service, msg_id)
        for filename, pdf_bytes in email["pdfs"]:
            record = process_pdf(email, filename, pdf_bytes)
            records.append(record.model_dump())
            print(json.dumps(record.model_dump(), ensure_ascii=False, indent=2))
        done.add(msg_id)

    mark_processed(done)
    return records


if __name__ == "__main__":
    run_once()
