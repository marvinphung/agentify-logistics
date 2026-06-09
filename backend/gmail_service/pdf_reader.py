import io

import fitz
import pdfplumber


def read_pdf_text(pdf_bytes: bytes) -> str:
    text = ""
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    if len(text.strip()) > 30:
        return text

    document = fitz.open(stream=pdf_bytes, filetype="pdf")
    parts = [page.get_text() for page in document]
    return "\n".join(parts)
