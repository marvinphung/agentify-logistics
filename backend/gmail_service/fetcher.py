import base64
from typing import Any

from gmail_service.config import GMAIL_QUERY


def list_new_messages(service: Any, query: str | None = None) -> list[str]:
    effective_query = query or GMAIL_QUERY
    response = service.users().messages().list(userId="me", q=effective_query).execute()
    return [message["id"] for message in response.get("messages", [])]


def get_email(service: Any, msg_id: str) -> dict[str, Any]:
    message = (
        service.users().messages().get(userId="me", id=msg_id, format="full").execute()
    )
    headers = {
        header["name"]: header["value"]
        for header in message["payload"].get("headers", [])
    }
    email = {
        "message_id": msg_id,
        "subject": headers.get("Subject", ""),
        "sender": headers.get("From", ""),
        "received_at": headers.get("Date", ""),
        "pdfs": [],
    }
    _collect_pdfs(service, msg_id, message["payload"], email["pdfs"])
    return email


def _collect_pdfs(
    service: Any, msg_id: str, part: dict[str, Any], out: list[tuple[str, bytes]]
) -> None:
    filename = part.get("filename", "")
    body = part.get("body", {})
    if filename.lower().endswith(".pdf"):
        if "attachmentId" in body:
            attachment = (
                service.users()
                .messages()
                .attachments()
                .get(userId="me", messageId=msg_id, id=body["attachmentId"])
                .execute()
            )
            data = base64.urlsafe_b64decode(attachment["data"])
        else:
            data = base64.urlsafe_b64decode(body["data"])
        out.append((filename, data))

    for child_part in part.get("parts", []):
        _collect_pdfs(service, msg_id, child_part, out)
