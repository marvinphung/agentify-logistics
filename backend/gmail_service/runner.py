from gmail_service.auth import get_gmail_service
from gmail_service.fetcher import get_email, list_new_messages
from gmail_service.pipeline import process_pdf_attachment
from gmail_service.state import load_processed, mark_processed


def run_once() -> list[dict]:
    service = get_gmail_service()
    processed_message_ids = load_processed()
    records: list[dict] = []

    for message_id in list_new_messages(service):
        if message_id in processed_message_ids:
            continue

        email = get_email(service, message_id)
        for filename, pdf_bytes in email["pdfs"]:
            record = process_pdf_attachment(email, filename, pdf_bytes)
            records.append(record.model_dump())

        processed_message_ids.add(message_id)

    mark_processed(processed_message_ids)
    return records
