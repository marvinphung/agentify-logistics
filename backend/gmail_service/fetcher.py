import base64
from datetime import UTC, datetime
from email.utils import getaddresses, parsedate_to_datetime
from typing import Any

from gmail_service.config import GMAIL_QUERY
from gmail_service.models import GmailAttachmentPayload, GmailEmailPayload


def list_new_messages(
    service: Any, query: str | None = None, max_results: int = 100
) -> list[str]:
    effective_query = query or GMAIL_QUERY
    response = (
        service.users()
        .messages()
        .list(userId="me", q=effective_query, maxResults=max_results)
        .execute()
    )
    return [message["id"] for message in response.get("messages", [])]


def get_email(service: Any, msg_id: str) -> GmailEmailPayload:
    message = (
        service.users().messages().get(userId="me", id=msg_id, format="full").execute()
    )
    headers = {
        header["name"]: header["value"]
        for header in message["payload"].get("headers", [])
    }
    attachments: list[GmailAttachmentPayload] = []
    body_text, body_html = _collect_body_parts(message["payload"])
    _collect_pdfs(service, msg_id, message["payload"], attachments)

    return GmailEmailPayload(
        gmail_message_id=msg_id,
        gmail_thread_id=message.get("threadId"),
        subject=headers.get("Subject", ""),
        from_email=_extract_single_address(headers.get("From", "")),
        to_emails=_extract_addresses(headers.get("To", "")),
        cc_emails=_extract_addresses(headers.get("Cc", "")),
        sent_at=_normalize_datetime(headers.get("Date")),
        snippet=message.get("snippet"),
        body_text=body_text,
        body_html=body_html,
        raw_labels=message.get("labelIds", []),
        attachments=attachments,
    )


def _collect_pdfs(
    service: Any,
    msg_id: str,
    part: dict[str, Any],
    out: list[GmailAttachmentPayload],
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
            gmail_attachment_id = body["attachmentId"]
        else:
            data = base64.urlsafe_b64decode(body["data"])
            gmail_attachment_id = None
        out.append(
            GmailAttachmentPayload(
                gmail_attachment_id=gmail_attachment_id,
                filename=filename,
                mime_type=part.get("mimeType", "application/pdf"),
                size_bytes=body.get("size"),
                attachment_bytes=data,
            )
        )

    for child_part in part.get("parts", []):
        _collect_pdfs(service, msg_id, child_part, out)


def _collect_body_parts(part: dict[str, Any]) -> tuple[str | None, str | None]:
    body_text: list[str] = []
    body_html: list[str] = []
    _walk_body_parts(part, body_text, body_html)
    text = "\n".join(fragment for fragment in body_text if fragment.strip()) or None
    html = "\n".join(fragment for fragment in body_html if fragment.strip()) or None
    return text, html


def _walk_body_parts(
    part: dict[str, Any], body_text: list[str], body_html: list[str]
) -> None:
    mime_type = part.get("mimeType", "")
    body = part.get("body", {})
    data = body.get("data")
    if data and not part.get("filename"):
        decoded = base64.urlsafe_b64decode(data).decode("utf-8", errors="replace")
        if mime_type == "text/plain":
            body_text.append(decoded)
        elif mime_type == "text/html":
            body_html.append(decoded)
    for child_part in part.get("parts", []):
        _walk_body_parts(child_part, body_text, body_html)


def _extract_addresses(value: str) -> list[str]:
    return [email for _, email in getaddresses([value]) if email]


def _extract_single_address(value: str) -> str:
    addresses = _extract_addresses(value)
    return addresses[0] if addresses else value


def _normalize_datetime(value: str | None) -> datetime:
    if not value:
        return datetime.now(UTC)
    try:
        return parsedate_to_datetime(value).astimezone(UTC)
    except (TypeError, ValueError, IndexError):
        return datetime.now(UTC)
