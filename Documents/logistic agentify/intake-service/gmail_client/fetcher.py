import base64

from config import GMAIL_QUERY


def list_new_messages(service, query=None):
    if query is None:
        query = GMAIL_QUERY
    res = service.users().messages().list(userId="me", q=query).execute()
    return [m["id"] for m in res.get("messages", [])]


def get_email(service, msg_id):
    msg = (
        service.users().messages().get(userId="me", id=msg_id, format="full").execute()
    )
    headers = {h["name"]: h["value"] for h in msg["payload"]["headers"]}
    email = {
        "message_id": msg_id,
        "subject": headers.get("Subject", ""),
        "sender": headers.get("From", ""),
        "received_at": headers.get("Date", ""),
        "pdfs": [],  # list of (filename, bytes)
    }
    _collect_pdfs(service, msg_id, msg["payload"], email["pdfs"])
    return email


def _collect_pdfs(service, msg_id, part, out):
    filename = part.get("filename", "")
    body = part.get("body", {})
    if filename.lower().endswith(".pdf"):
        if "attachmentId" in body:
            att = (
                service.users()
                .messages()
                .attachments()
                .get(userId="me", messageId=msg_id, id=body["attachmentId"])
                .execute()
            )
            data = base64.urlsafe_b64decode(att["data"])
        else:
            data = base64.urlsafe_b64decode(body["data"])
        out.append((filename, data))
    for sub in part.get("parts", []):  # email lồng nhiều phần → đệ quy
        _collect_pdfs(service, msg_id, sub, out)
