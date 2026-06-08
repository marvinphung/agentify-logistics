Tạo giao diện web app SaaS tiếng Việt cho sản phẩm “Agentify Shipment Data Hub”.

Bối cảnh sản phẩm:
Agentify là prototype cho doanh nghiệp logistics B2B/XNK, đặc biệt là forwarder/3PL. Sản phẩm kết nối Gmail read-only, tự động sync email logistics, parse tiêu đề + nội dung email + file PDF có text, trích xuất thông tin shipment/container, lưu vào database theo từng lô hàng, sau đó hiển thị danh sách để user search/filter/sort. Nếu có thể, thêm màn hình AI hỏi đáp để user hỏi thông tin về một lô hàng.

Quan trọng:
- UI phải bằng tiếng Việt.
- Đây là giao diện prototype mock data, chưa cần backend thật.
- Không làm OCR trong prototype này. Nếu PDF là scan/ảnh thì hiển thị trạng thái “Chưa hỗ trợ OCR trong prototype”.
- Không có Zalo integration trong prototype này.
- Không có ePort/hải quan/TMS/WMS integration trong prototype này.
- Không tự động gửi email cho khách.
- AI chỉ trả lời dựa trên dữ liệu đã sync, nếu thiếu dữ liệu thì nói “Chưa thấy dữ liệu trong Agentify”.

Style giao diện:
- Desktop web app 1440px.
- B2B SaaS chuyên nghiệp, sạch, hiện đại.
- Light theme.
- Màu chính: xanh navy/deep blue.
- Màu phụ: xanh teal cho trạng thái hoàn tất.
- Màu cảnh báo: vàng amber.
- Màu lỗi/rủi ro: đỏ.
- Dùng sidebar, topbar, card, bảng dữ liệu, badge trạng thái, timeline.
- Giao diện giống sản phẩm vận hành logistics thật, không phải landing page.
- Không dùng minh họa vui nhộn; ưu tiên bảng, form, timeline, dashboard.

Thông tin mock data:
Khách hàng:
- ABC Manufacturing Vietnam
- Delta Electronics
- Viet Auto Parts
- Green Textile
- Mekong Furniture

Container:
- MSCU1234567
- ONEU9988776
- TGHU7654321
- CMAU1122334
- TEMU5566778

Booking:
- BKG-88921
- ONE-77231
- CMA-55290
- TEM-88201

B/L:
- HLCUSHA250601234
- ONEYSHA25067721
- CMDUCN2509981

PO:
- PO 450012345
- PO 450078900
- PO 450045678

Tuyến:
- Shanghai → Hải Phòng
- Ningbo → Cát Lái
- Busan → Hải Phòng
- Shenzhen → Cát Lái

Trạng thái mẫu:
- Đã nhận Booking Confirmation
- Đã nhận B/L Draft
- ETA thay đổi
- Đã nhận Arrival Notice
- Chưa thấy D/O
- Đã giao kho
- Thiếu POD
- Cần review matching
- PDF không đọc được vì cần OCR

Tạo các màn hình sau:

MÀN HÌNH 1: Kết nối Gmail

Mục tiêu:
User kết nối Gmail logistics mailbox.

Layout:
- Sidebar trái có logo “Agentify” và các bước:
  1. Kết nối Gmail
  2. Sync email
  3. Trích xuất dữ liệu
  4. Xem danh sách lô hàng
  5. Hỏi AI nếu cần
- Main panel:
  Tiêu đề: “Kết nối hộp thư logistics”
  Mô tả: “Agentify đọc email logistics ở chế độ read-only để trích xuất container, booking, B/L, PO, ETA và chứng từ PDF.”
  Button lớn: “Kết nối Gmail”
  Badge: “Read-only”
  Card giải thích quyền:
    - Đọc tiêu đề email
    - Đọc nội dung email
    - Đọc file PDF đính kèm có text
    - Không gửi email
    - Không xóa email
    - Không đọc Zalo trong prototype này
- Card preview:
  “Ví dụ dữ liệu sẽ được trích xuất”
  Container: MSCU1234567
  Booking: BKG-88921
  B/L: HLCUSHA250601234
  ETA: 12/06/2026
  Loại tài liệu: Arrival Notice

MÀN HÌNH 2: Dashboard Sync Email

Mục tiêu:
Hiển thị trạng thái sync email và pipeline xử lý.

Layout:
- Sidebar:
  Tổng quan
  Sync Email
  Lô hàng
  Email đã xử lý
  Review Queue
  Hỏi AI
  Cài đặt
- Header: “Sync Email”
- Card kết nối:
  Gmail đã kết nối: ops@forwarder-demo.com
  Quyền: Read-only
  Lần sync gần nhất: 5 phút trước
  Trạng thái hook: Đang lắng nghe email mới
- Metrics cards:
  248 email đã quét
  37 lô hàng đã tạo
  86 file PDF đã đọc
  12 mục cần review
  5 PDF cần OCR nên chưa xử lý
- Pipeline ngang:
  Email mới → Parse title/body → Parse PDF text → Extract field → Match shipment → Lưu DB
- Button:
  “Sync thủ công”
  “Xem email mới”
- Bảng “Email xử lý gần đây”
  Cột:
  Thời gian
  Người gửi
  Tiêu đề
  Mã nhận diện tìm thấy
  Loại tài liệu
  Trạng thái
  Hành động
  Dữ liệu mẫu:
  09:12 | Maersk | Arrival Notice - MSCU1234567 - ETA 12 Jun | MSCU1234567, BKG-88921 | Arrival Notice | Đã match | Xem
  08:45 | ABC Customer | Re: PO 450012345 delivery update | PO 450012345 | Customer Email | Cần review | Review
  08:30 | ONE Line | ETA Change Notice - ONEU9988776 | ONEU9988776 | ETA Update | Đã match | Xem
  07:55 | Trucking Team | POD attached - TGHU7654321 | TGHU7654321 | POD | Đã match | Xem
  07:20 | Unknown Agent | Scan document attached | Không rõ | PDF Scan | Cần OCR | Xem

MÀN HÌNH 3: Danh sách lô hàng

Mục tiêu:
User xem danh sách shipment/container đã được tạo từ email và PDF.

Layout:
- Header: “Danh sách lô hàng”
- Search bar lớn:
  Placeholder: “Tìm container, booking, B/L, PO, khách hàng...”
- Filter chips:
  Tất cả
  ETA tuần này
  Thiếu D/O
  Thiếu POD
  Cần review
  ETA thay đổi
  Đã giao kho
  PDF cần OCR
- Sort dropdown:
  Cập nhật mới nhất
  ETA gần nhất
  Rủi ro cao nhất
  Tên khách hàng
- Bảng chính:
  Cột:
  Lô hàng
  Khách hàng
  Container
  Booking
  B/L
  Tuyến
  ETA
  Trạng thái mới nhất
  Thiếu thông tin
  Confidence
  PIC
  Cập nhật cuối
- Dữ liệu mẫu:
  SHP-2026-001 | ABC Manufacturing Vietnam | MSCU1234567 | BKG-88921 | HLCUSHA250601234 | Shanghai → Hải Phòng | 12/06/2026 | Đã nhận Arrival Notice | D/O, POD | 94% | Lan CS | 09:12 hôm nay
  SHP-2026-002 | Delta Electronics | ONEU9988776 | ONE-77231 | ONEYSHA25067721 | Ningbo → Cát Lái | 15/06/2026 | ETA thay đổi | Cần update khách | 91% | Minh Ops | 08:30 hôm nay
  SHP-2026-003 | Viet Auto Parts | TGHU7654321 | CMA-55290 | CMDUCN2509981 | Busan → Hải Phòng | 10/06/2026 | Đã giao kho | Không thiếu | 96% | Huy Ops | Hôm qua
  SHP-2026-004 | Green Textile | CMAU1122334 | BKG-77520 | Chưa có | Shenzhen → Cát Lái | 18/06/2026 | Thiếu B/L Draft | B/L Draft | 78% | Trang Docs | Hôm qua
  SHP-2026-005 | Mekong Furniture | TEMU5566778 | TEM-88201 | Chưa rõ | Shanghai → Cát Lái | 20/06/2026 | Cần review matching | PDF scan cần OCR | 52% | Chưa gán | 2 ngày trước
- Badge màu:
  Xanh: Đã match, Đã giao kho
  Vàng: Cần review, Thiếu D/O
  Đỏ: Thiếu POD, ETA thay đổi chưa update
  Xám: PDF cần OCR

MÀN HÌNH 4: Chi tiết lô hàng / Shipment Profile

Mục tiêu:
Một trang hồ sơ duy nhất cho mỗi shipment/container.

Layout:
- Header:
  SHP-2026-001
  Khách hàng: ABC Manufacturing Vietnam
  Status badge: Đã nhận Arrival Notice
  Risk badge: Thiếu D/O
  PIC: Lan CS
- Card định danh:
  Container: MSCU1234567
  Seal: SL998811
  Booking: BKG-88921
  B/L: HLCUSHA250601234
  PO: 450012345
  Vessel/Voyage: MAERSK HANOI / 126E
- Card tuyến:
  POL: Shanghai
  POD: Hải Phòng
  ETD: 06/06/2026
  ETA: 12/06/2026
  Cập nhật mới nhất: 09:12 hôm nay từ email Maersk
- Main layout 2 cột:
  Cột trái: Timeline
  Cột phải: Tóm tắt + Checklist thiếu thông tin
- Timeline:
  03/06 10:20 | Đã nhận Booking Confirmation | Source: email từ Maersk
  04/06 15:45 | Đã nhận B/L Draft | Source: PDF attachment
  05/06 09:00 | Đã nhận Commercial Invoice | Source: file đính kèm
  06/06 22:10 | Tàu rời Shanghai | Source: email carrier
  10/06 08:30 | ETA cập nhật sang 12/06 | Source: email notice
  11/06 09:12 | Đã nhận Arrival Notice | Source: PDF đính kèm
- Card “Tóm tắt tự động”:
  “Lô hàng nhập FCL của ABC Manufacturing Vietnam. Hệ thống đã tìm thấy Booking Confirmation, B/L Draft và Arrival Notice. ETA hiện tại là 12/06/2026 tại Hải Phòng. Chưa thấy dữ liệu D/O, trucking status hoặc POD trong Agentify.”
- Checklist:
  Booking Confirmation: Đã có
  B/L Draft: Đã có
  Arrival Notice: Đã có
  D/O: Chưa thấy
  Trạng thái hải quan: Chưa thấy
  Trucking status: Chưa thấy
  POD: Chưa thấy
- Card “Nguồn dữ liệu”:
  4 email liên quan
  3 PDF đã đọc
  0 ảnh/OCR
  1 dòng Excel import
- Buttons:
  “Hỏi về lô hàng này”
  “Upload tài liệu”
  “Thêm ghi chú thủ công”
  “Đánh dấu cần review”

MÀN HÌNH 5: Email Detail / Extraction Result

Mục tiêu:
Cho user xem một email đã được parse và field được extract.

Layout:
- Header: “Kết quả trích xuất email”
- Left panel: Email preview
  From: Maersk Import CS
  Subject: Arrival Notice - MSCU1234567 - ETA 12 Jun 2026
  Time: 11/06/2026 09:12
  Body preview:
  “Dear valued customer, please find attached arrival notice...”
  Attachment:
  arrival_notice_MSCU1234567.pdf
- Right panel: Extracted fields
  Loại tài liệu: Arrival Notice
  Container: MSCU1234567
  Booking: BKG-88921
  B/L: HLCUSHA250601234
  Vessel/Voyage: MAERSK HANOI / 126E
  POL: Shanghai
  POD: Hải Phòng
  ETA: 12/06/2026
  Consignee: ABC Manufacturing Vietnam
  Confidence: 94%
- Section “Match vào lô hàng”
  Matched shipment: SHP-2026-001
  Lý do match:
    - Container trùng
    - Booking trùng
    - B/L trùng
- Buttons:
  “Xác nhận đúng”
  “Chọn lô hàng khác”
  “Tạo lô hàng mới”

MÀN HÌNH 6: Review Queue

Mục tiêu:
User xử lý các email/PDF mà AI không chắc match vào shipment nào.

Layout:
- Header: “Hàng đợi review”
- Subtitle: “Các email hoặc file có confidence thấp cần người dùng xác nhận.”
- Filter:
  Tất cả
  Cần chọn shipment
  PDF cần OCR
  Thiếu mã định danh
  Nhiều shipment có thể khớp
- Table:
  Nguồn
  Mã tìm thấy
  Gợi ý match
  Confidence
  Lý do cần review
  Hành động
- Dữ liệu mẫu:
  Email từ ABC Customer | PO 450012345 | SHP-2026-001 hoặc SHP-2026-006 | 62% | PO trùng nhưng không có container | Chọn
  PDF B/L Draft | HLCUSHA250601234 | SHP-2026-001 | 78% | Thiếu container trong PDF | Xác nhận
  PDF Scan | Không rõ | Không có | 0% | Cần OCR, prototype chưa hỗ trợ | Đánh dấu bỏ qua
  Email từ Unknown Agent | BKG-88921 | SHP-2026-001 | 70% | Sender lạ | Review
- Right preview panel:
  Hiển thị nội dung email/file
  Hiển thị extracted text
  Hiển thị các shipment gợi ý
- Buttons:
  “Xác nhận match”
  “Chọn shipment khác”
  “Tạo shipment mới”
  “Bỏ qua”

MÀN HÌNH 7: Search / Filter nâng cao

Mục tiêu:
User lọc, sắp xếp danh sách theo tiêu chí vận hành.

Layout:
- Header: “Tìm kiếm nâng cao”
- Form filter:
  Khách hàng
  Container
  Booking
  B/L
  PO
  Tuyến
  ETA từ ngày - đến ngày
  Loại tài liệu đã có
  Loại tài liệu còn thiếu
  Confidence từ 0-100
  Trạng thái review
  PIC
- Sort:
  ETA gần nhất
  Cập nhật mới nhất
  Confidence thấp nhất
  Thiếu nhiều thông tin nhất
- Result summary:
  “Tìm thấy 12 lô hàng phù hợp”
- Table kết quả giống màn hình danh sách.

MÀN HÌNH 8: AI hỏi đáp về lô hàng, nếu kịp build

Mục tiêu:
User hỏi thông tin bằng ngôn ngữ tự nhiên, chỉ dựa trên dữ liệu đã sync.

Layout:
- Header: “Hỏi Agentify”
- Left panel:
  Chọn shipment hiện tại: SHP-2026-001 / MSCU1234567
  Quick facts:
    ETA: 12/06/2026
    Status: Đã nhận Arrival Notice
    Thiếu: D/O, POD, trucking status
- Main chat:
  Suggested questions:
    “Container MSCU1234567 đang tới đâu?”
    “Lô này còn thiếu chứng từ gì?”
    “Có email nào báo ETA thay đổi không?”
    “Tóm tắt lịch sử xử lý lô này.”
    “Soạn nháp trả lời khách bằng tiếng Việt.”
- Conversation sample:
  User: “Container MSCU1234567 đã giao kho chưa?”
  Agentify:
  “Chưa thấy dữ liệu xác nhận đã giao kho trong Agentify. Hiện hệ thống đã có Arrival Notice lúc 09:12 ngày 11/06 và ETA là 12/06/2026. Chưa thấy POD, trucking status hoặc xác nhận kho đã nhận hàng.”
  Source cards:
    - Email: Arrival Notice từ Maersk, 11/06 09:12
    - PDF: arrival_notice_MSCU1234567.pdf
    - Shipment profile: SHP-2026-001
- Input box:
  “Hỏi về container, booking, B/L, PO, ETA, chứng từ...”
- Warning note:
  “AI chỉ trả lời dựa trên dữ liệu đã có trong Agentify. Nếu chưa có dữ liệu, hệ thống sẽ không đoán.”

MÀN HÌNH 9: Cài đặt Sync

Mục tiêu:
Cấu hình email sync và giới hạn prototype.

Layout:
- Header: “Cài đặt Sync”
- Section Gmail:
  Tài khoản: ops@forwarder-demo.com
  Quyền: Read-only
  Trạng thái hook: Đang lắng nghe email mới
  Button: Ngắt kết nối
- Section Query sync:
  Ô nhập Gmail query:
  newer_than:90d (arrival notice OR booking OR "bill of lading" OR "B/L" OR "delivery order" OR container OR ETA OR POD OR EIR)
- Section File support:
  Email subject/body: Đã hỗ trợ
  PDF có text: Đã hỗ trợ
  PDF scan/ảnh: Chưa hỗ trợ OCR trong prototype
  Zalo: Chưa hỗ trợ
  Excel import: Sẽ làm sau
- Section Data policy:
  Không gửi email
  Không xóa email
  Không chỉnh sửa email
  Mỗi field extract đều có source
  User có thể xác nhận hoặc sửa match

Yêu cầu tương tác:
- Các hàng trong bảng shipment có thể click để mở chi tiết.
- Click “Hỏi về lô hàng này” từ Shipment Profile mở màn hình AI hỏi đáp.
- Click “Review” trong bảng email mở Review Queue.
- Click filter chip sẽ thay đổi trạng thái visual của bảng.
- Mock data phải nhất quán giữa các màn hình.

Ngôn ngữ UI:
Tất cả label, button, table header, badge, alert, empty state đều bằng tiếng Việt.

Một số text empty/error state:
- “Chưa thấy dữ liệu trong Agentify”
- “PDF này có vẻ là bản scan. Prototype hiện chưa hỗ trợ OCR.”
- “Không đủ thông tin để tự động match. Vui lòng chọn shipment phù hợp.”
- “Email đã được xử lý nhưng chưa tìm thấy container, booking, B/L hoặc PO.”
- “Không có dữ liệu để trả lời câu hỏi này.”

Ưu tiên:
Tạo UI giống một sản phẩm thật để demo với mentor/khách hàng. Trọng tâm là workflow vận hành, không phải marketing.