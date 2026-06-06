# Project Brief

## Agentify Logistics là gì?

Agentify Logistics đang được định hướng như một `Shipment Data Hub` cho doanh nghiệp logistics B2B/XNK, đặc biệt là forwarder và `3PL` SME tại Việt Nam.

Ý tưởng cốt lõi:

> Mỗi `shipment/container` nên có một hồ sơ duy nhất, gom dữ liệu đang nằm rải rác trong `email`, `Excel`, `PDF`, ảnh chứng từ và các nguồn thủ công khác để nhân viên tra cứu nhanh và trả lời khách chính xác hơn.

Agentify không nhằm thay thế:

- `TMS`
- `WMS`
- `ERP`
- phần mềm khai hải quan
- ePort
- forwarding software hiện có

Nó là lớp dữ liệu vận hành nằm phía trên các công cụ đó.

## Vấn đề thị trường đang có

Trong logistics B2B/XNK, dữ liệu thật thường bị phân mảnh:

- trạng thái lô nằm trong `Excel` hoặc `Google Sheet`
- booking, arrival notice, delay notice, debit note nằm trong `email`
- `POD`, `EIR`, ảnh seal/container nằm trong `Zalo` hoặc ảnh chụp
- một phần ngữ cảnh chỉ nằm trong đầu người phụ trách

Khi khách hỏi:

- container đang ở đâu
- ETA mới nhất là khi nào
- đã có `D/O` chưa
- đã giao kho chưa
- còn thiếu chứng từ gì

thì `CS/Ops/Docs/Account` thường phải mở nhiều nguồn, hỏi nhiều người, rồi tự ghép lại thành câu trả lời. Đây là pain chính mà prototype đang nhắm tới.

## Prototype hiện tại muốn chứng minh điều gì?

Prototype `v0.1` cần chứng minh một giá trị rất cụ thể:

> Người dùng logistics có thể search `container`, `booking`, `B/L` hoặc `PO` và ngay lập tức thấy email liên quan, chứng từ, timeline, dữ liệu trích xuất, trạng thái hiện tại và thông tin còn thiếu.

Luồng chính của prototype:

1. Kết nối `Gmail` với quyền `read-only`
2. Đồng bộ email logistics và attachment
3. Trích xuất dữ liệu từ email, `PDF`, ảnh, scan
4. Match dữ liệu vào đúng `shipment/container`
5. Tạo `shipment profile` và `timeline`
6. Cho phép search hoặc hỏi bằng ngôn ngữ tự nhiên, kèm nguồn tham chiếu

## Scope đang ưu tiên

Những gì nên tập trung build trước:

- `Gmail API` integration
- email sync có filter/query giới hạn
- parse email body và attachment
- OCR/vision cho ảnh và `PDF` scan
- structured extraction cho mã logistics và status
- matching theo `container`, `booking`, `B/L`, `PO`
- `shipment profile`
- `timeline` có source traceability
- Q&A hoặc search có dẫn nguồn

Những gì chưa nên làm ở giai đoạn này:

- gửi email tự động
- ingest `Zalo` tự động toàn phần
- tích hợp sâu với customs/ePort/`TMS`/`WMS`/`ERP`
- cho `LLM` query database trực tiếp
- biến Agentify thành một logistics platform quá rộng

## Nguyên tắc sản phẩm cần giữ

- Mọi dữ liệu trích xuất phải giữ `source`
- Nếu không có dữ liệu, phải trả lời rõ là chưa thấy trong Agentify
- Không đoán
- Matching phải có `confidence` và đường review khi không chắc
- Ưu tiên `human-in-the-loop`
- Ưu tiên prototype hẹp nhưng chạy được hơn là scope rộng nhưng mơ hồ

## Nên đọc gì trước khi làm việc?

Thứ tự khuyến nghị:

1. `docs/context-logistics/de_xuat_agentify_v3.md`
2. `plan/prototype_implementation_plan.md`
3. `docs/context-logistics/README_CONTEXT.md`
4. `docs/context-logistics/cum_8_cs_ops_account_tra_loi_khach.md`
5. `docs/context-logistics/cum_9_excel_email_zalo_file_thu_cong.md`

## Ưu tiên build ngắn hạn

Thứ tự ưu tiên hiện tại:

1. kết nối và sync `Gmail`
2. ingest email + attachment
3. extraction + classification
4. shipment matching
5. shipment profile + timeline
6. search/Q&A có source

## Một câu mô tả dự án

> Agentify giúp mỗi `shipment/container` có một hồ sơ duy nhất để team logistics tra cứu nhanh trạng thái, chứng từ và bằng chứng vận hành từ dữ liệu đang bị rơi giữa email, file và chat.
