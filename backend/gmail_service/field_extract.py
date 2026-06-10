import json
from typing import Any

from gmail_service.config import GEMINI_API_KEY, GEMINI_MODEL

PROMPT = """You are a logistics document extractor. Return ONLY a valid JSON object (no markdown, no explanation) with these fields:

{{
  "doc_type": one of [arrival_notice, booking_confirmation, bill_of_lading, invoice, packing_list, debit_note, delivery_order, certificate_of_origin, other],
  "doc_type_confidence": float 0..1,
  "doc_date": document date as YYYY-MM-DD or null,
  "reference_no": Our Reference / Job No / Ref No / File No or null,
  "payment_term": e.g. "Prompt payment" or null,
  "number_of_originals": e.g. "THREE (3)" or null,
  "carrier": shipping line / airline name or null,
  "customer_name": main customer name or null,
  "identifiers": {{
    "container_no": array of container numbers e.g. ["TLLU4872435"],
    "seal_no": array of seal numbers e.g. ["C4123088", "ITEK02640722"],
    "booking_no": null,
    "bl_no": MBL / Bill of Lading Number or null,
    "hbl_no": House BL number or null,
    "sb_no": Shipping Bill number or null,
    "awb_no": Air Waybill number or null,
    "po_no": Purchase Order number or null,
    "job_no": Job number or null,
    "invoice_no": Invoice number or null,
    "hs_code": HS Code or null
  }},
  "issuer": {{
    "name": issuing company name or null,
    "address": full address or null,
    "contact_person": contact person name or null,
    "email": email address or null,
    "phone": phone number or null
  }} or null,
  "shipper": {{
    "name": ..., "address": ..., "contact_person": null, "email": null, "phone": null
  }} or null,
  "consignee": {{
    "name": ..., "address": ..., "contact_person": null, "email": null, "phone": null
  }} or null,
  "notify_party": {{
    "name": ..., "address": ..., "contact_person": null, "email": null, "phone": null
  }} or null,
  "route": {{
    "pol": Port of Loading / Cang xep,
    "pod": Port of Discharge / Cang do,
    "place_of_receipt": Place of Receipt,
    "final_destination": Final Destination / Place of Delivery,
    "cfs_terminal": CFS Terminal or null,
    "vessel": vessel name,
    "voyage": voyage number,
    "etd": YYYY-MM-DD or null,
    "eta": YYYY-MM-DD or null,
    "ata": YYYY-MM-DD or null
  }},
  "cargo": {{
    "description": goods description,
    "packages": quantity and unit,
    "gross_weight_kg": float kg or null,
    "tare_weight_kg": tare weight float kg or null,
    "volume_cbm": float CBM or null,
    "marks_numbers": Marks & Numbers or null
  }},
  "charges": array of charge items, each:
    {{"description": ..., "quantity": ..., "currency": ..., "amount": float, "vat_rate": e.g. "10%"}}
    (empty array if no charge table)
}}

Rules: unknown fields set to null; arrays empty if no values; dates as YYYY-MM-DD.

--- SUBJECT ---
{subject}
--- SENDER ---
{sender}
--- PDF TEXT ---
{pdf_text}"""


def extract_fields(subject: str, sender: str, pdf_text: str) -> dict[str, Any]:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is required for Gmail service extraction")

    from google import genai

    client = genai.Client(api_key=GEMINI_API_KEY)
    prompt = PROMPT.format(subject=subject, sender=sender, pdf_text=pdf_text[:8000])
    response = client.models.generate_content(model=GEMINI_MODEL, contents=prompt)
    raw = response.text.strip().removeprefix("```json").removesuffix("```").strip()
    return json.loads(raw)
