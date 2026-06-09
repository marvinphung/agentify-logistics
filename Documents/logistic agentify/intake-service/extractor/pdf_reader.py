import io

import fitz  # PyMuPDF
import pdfplumber
from PIL import Image


def read_pdf_text(pdf_bytes: bytes) -> str:
    # Thử pdfplumber trước
    text = ""
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    if len(text.strip()) > 30:
        return text

    # Fallback: PyMuPDF extract text (không cần Tesseract)
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    parts = [page.get_text() for page in doc]
    text = "\n".join(parts)
    if len(text.strip()) > 30:
        return text

    # Bản scan thật sự: thử OCR nếu Tesseract có sẵn
    try:
        import pytesseract

        doc2 = fitz.open(stream=pdf_bytes, filetype="pdf")
        ocr_parts = []
        for page in doc2:
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            ocr_parts.append(pytesseract.image_to_string(img, lang="eng+vie"))
        return "\n".join(ocr_parts)
    except Exception:
        return text
