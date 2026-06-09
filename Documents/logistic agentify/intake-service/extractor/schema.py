from typing import List, Literal, Optional

from pydantic import BaseModel

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
    attachment_name: Optional[str] = None


class Identifiers(BaseModel):
    container_no: List[str] = []
    seal_no: List[str] = []
    booking_no: Optional[str] = None
    bl_no: Optional[str] = None          # MBL / Bill of Lading Number
    hbl_no: Optional[str] = None         # House BL
    sb_no: Optional[str] = None          # Shipping Bill Number
    awb_no: Optional[str] = None
    po_no: Optional[str] = None
    job_no: Optional[str] = None
    invoice_no: Optional[str] = None
    hs_code: Optional[str] = None


class Party(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None


class Route(BaseModel):
    pol: Optional[str] = None            # Port of Loading
    pod: Optional[str] = None            # Port of Discharge
    place_of_receipt: Optional[str] = None
    final_destination: Optional[str] = None
    cfs_terminal: Optional[str] = None
    vessel: Optional[str] = None
    voyage: Optional[str] = None
    etd: Optional[str] = None
    eta: Optional[str] = None
    ata: Optional[str] = None


class Cargo(BaseModel):
    description: Optional[str] = None
    packages: Optional[str] = None       # e.g. "2 Package", "2855 CARTONS", "42 CTNS"
    gross_weight_kg: Optional[float] = None
    tare_weight_kg: Optional[float] = None
    volume_cbm: Optional[float] = None
    marks_numbers: Optional[str] = None


class Charge(BaseModel):
    description: Optional[str] = None
    quantity: Optional[str] = None       # e.g. "4.85 x Cbm", "1 x Shipment"
    currency: Optional[str] = None
    amount: Optional[float] = None
    vat_rate: Optional[str] = None


class ExtractedRecord(BaseModel):
    source: Source
    doc_type: DocType
    doc_type_confidence: float
    doc_date: Optional[str] = None
    reference_no: Optional[str] = None
    number_of_originals: Optional[str] = None
    payment_term: Optional[str] = None
    identifiers: Identifiers
    carrier: Optional[str] = None
    issuer: Optional[Party] = None
    shipper: Optional[Party] = None
    consignee: Optional[Party] = None
    notify_party: Optional[Party] = None
    customer_name: Optional[str] = None
    route: Route
    cargo: Optional[Cargo] = None
    charges: List[Charge] = []
    extraction_status: Literal["ok", "partial", "failed"] = "ok"
