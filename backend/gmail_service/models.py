from typing import Literal

from pydantic import BaseModel, Field

DocType = Literal[
    "arrival_notice",
    "booking_confirmation",
    "bill_of_lading",
    "invoice",
    "packing_list",
    "debit_note",
    "delivery_order",
    "certificate_of_origin",
    "other",
]


class Source(BaseModel):
    channel: str = "email"
    message_id: str
    sender: str
    subject: str
    received_at: str
    attachment_name: str | None = None


class Identifiers(BaseModel):
    container_no: list[str] = Field(default_factory=list)
    seal_no: list[str] = Field(default_factory=list)
    booking_no: str | None = None
    bl_no: str | None = None
    hbl_no: str | None = None
    sb_no: str | None = None
    awb_no: str | None = None
    po_no: str | None = None
    job_no: str | None = None
    invoice_no: str | None = None
    hs_code: str | None = None


class Party(BaseModel):
    name: str | None = None
    address: str | None = None
    contact_person: str | None = None
    email: str | None = None
    phone: str | None = None


class Route(BaseModel):
    pol: str | None = None
    pod: str | None = None
    place_of_receipt: str | None = None
    final_destination: str | None = None
    cfs_terminal: str | None = None
    vessel: str | None = None
    voyage: str | None = None
    etd: str | None = None
    eta: str | None = None
    ata: str | None = None


class Cargo(BaseModel):
    description: str | None = None
    packages: str | None = None
    gross_weight_kg: float | None = None
    tare_weight_kg: float | None = None
    volume_cbm: float | None = None
    marks_numbers: str | None = None


class Charge(BaseModel):
    description: str | None = None
    quantity: str | None = None
    currency: str | None = None
    amount: float | None = None
    vat_rate: str | None = None


class ExtractedRecord(BaseModel):
    source: Source
    doc_type: DocType
    doc_type_confidence: float
    doc_date: str | None = None
    reference_no: str | None = None
    number_of_originals: str | None = None
    payment_term: str | None = None
    identifiers: Identifiers
    carrier: str | None = None
    issuer: Party | None = None
    shipper: Party | None = None
    consignee: Party | None = None
    notify_party: Party | None = None
    customer_name: str | None = None
    route: Route
    cargo: Cargo | None = None
    charges: list[Charge] = Field(default_factory=list)
    extraction_status: Literal["ok", "partial", "failed"] = "ok"
