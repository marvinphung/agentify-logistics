# Đề xuất Agentify v3: Kho dữ liệu shipment/container cho logistics B2B/XNK

- Ngày viết: 05/06/2026
- Phạm vi: đề xuất hướng đi sản phẩm Agentify sau khảo sát 9 cụm logistics B2B/XNK
- Định hướng chính: **Agentify nên bắt đầu bằng một kho dữ liệu tập trung cho shipment/container, tự lấy dữ liệu từ email, Zalo và file upload, sau đó hỗ trợ nhân viên tra cứu trạng thái, chứng từ và lịch sử xử lý theo thời gian thực.**

## 1. Kết luận ngắn

Ý tưởng "kho chuyên tập trung dữ liệu của shipment/container" là hướng **ổn hơn và tập trung hơn** so với việc làm một sản phẩm AI logistics quá rộng.

Lý do:

1. Pain thị trường rõ: dữ liệu shipment/container đang nằm rải rác ở email, Zalo, Excel, PDF, ảnh chụp, file export và nhiều hệ thống nghiệp vụ khác nhau.
2. Người dùng có nhu cầu thật: CS/Ops/Docs/Account phải tra cứu lô hàng nhiều lần mỗi ngày để trả lời khách, xử lý phát sinh, tìm chứng từ và bàn giao nội bộ.
3. MVP khả thi: có thể bắt đầu bằng email integration, file upload, import Excel và forward/copy dữ liệu từ Zalo, chưa cần tích hợp sâu với hải quan, cảng, hãng tàu, TMS, WMS, ERP.
4. Giá trị dễ giải thích: "Tìm một mã container là thấy toàn bộ thông tin liên quan" dễ hiểu hơn "AI agent điều phối logistics".
5. Ít cạnh tranh trực diện hơn: Agentify không cần thay thế phần mềm forwarding, TMS, WMS, ERP hay phần mềm khai hải quan. Agentify đứng ở lớp dữ liệu vận hành nằm giữa các công cụ đó.

Đề xuất một câu:

> **Agentify là kho dữ liệu shipment/container có AI, giúp doanh nghiệp logistics gom email, Zalo, Excel, PDF và chứng từ rời rạc thành một hồ sơ lô hàng duy nhất để tra cứu nhanh, kiểm tra trạng thái và giảm thất lạc thông tin.**

## 2. Bối cảnh thị trường

### 2.1. Logistics B2B/XNK là thị trường có khối lượng dữ liệu lớn

Logistics B2B/XNK không chỉ là vận chuyển hàng từ A đến B. Một lô hàng xuất nhập khẩu thường đi qua nhiều bước:

1. Chủ hàng phát sinh PO, hợp đồng hoặc kế hoạch giao hàng.
2. Forwarder hoặc bộ phận logistics đặt booking với hãng tàu/hãng bay.
3. Nhà cung cấp chuẩn bị hàng và chứng từ thương mại.
4. Hàng được đóng container hoặc gom hàng lẻ.
5. Làm chứng từ XNK: invoice, packing list, B/L, C/O, arrival notice, D/O.
6. Khai báo hải quan và xử lý kiểm tra nếu có.
7. Làm thủ tục cảng/depot/ICD.
8. Trucking lấy/giao container.
9. Kho nhận hàng, kiểm đếm, nhập tồn.
10. Kế toán đối soát chi phí, hóa đơn, phí phát sinh.
11. CS/Ops/Account cập nhật trạng thái cho khách hàng hoặc phòng ban nội bộ.

Mỗi bước tạo ra dữ liệu riêng: mã booking, số container, số seal, số B/L, số tờ khai, ETA/ETD, POD, EIR, debit note, invoice, ảnh giao nhận, email xác nhận, tin nhắn Zalo, file Excel tracking.

Theo National Statistics Office of Vietnam, năm 2025 Việt Nam đạt tổng kim ngạch xuất nhập khẩu hàng hóa khoảng 930,05 tỷ USD; khối lượng hàng hóa vận chuyển đạt 3.027,7 triệu tấn, tăng 14,1% so với năm trước. Điều này cho thấy thị trường logistics không chỉ lớn về giá trị hàng hóa, mà còn lớn về số lượng giao dịch, chứng từ và điểm dữ liệu cần xử lý.

Nguồn tham khảo:

- National Statistics Office of Vietnam, Socio-economic situation in the fourth quarter and 2025: https://www.nso.gov.vn/en/data-and-statistics/2026/01/socio-economic-situation-in-the-fourth-quarter-and-2025/

### 2.2. Thị trường đã có nhiều phần mềm, nhưng dữ liệu vẫn bị phân mảnh

Hiện tại, thị trường không thiếu phần mềm. Mỗi cụm logistics đã có các công cụ riêng:

| Nhóm công cụ | Ví dụ | Vai trò chính | Khoảng trống còn lại |
|---|---|---|---|
| Hải quan/cảng | VNACCS/VCIS, ECUS, VASSCM, ePort | Khai báo, thông quan, thủ tục cảng | Không tạo hồ sơ shipment tổng hợp cho CS/Ops |
| Forwarding software | CargoWise, Magaya, Winta, GoFreight | Quản lý job, chứng từ, booking, billing | Dữ liệu email/Zalo/file ngoài hệ thống vẫn có thể bị rơi |
| TMS | Abivin, TrackAsia, EcoTruck, LOGIVAN, hệ thống nội bộ | Quản lý vận tải, điều xe, tracking chuyến | Chỉ bao phủ phần trucking, không bao phủ toàn bộ shipment |
| WMS | TigerWMS, Smartlog, Infolog, Odoo, SAP EWM | Quản lý kho, inbound/outbound, tồn kho | Không trả lời đầy đủ trạng thái booking, chứng từ, hải quan, trucking |
| ERP/kế toán | SAP, Oracle, Odoo, MISA, FAST, BRAVO | PO, tài chính, hóa đơn, kế toán | Không phải nơi gom email, Zalo, POD, EIR, exception vận hành |
| CRM/helpdesk | Zendesk, Freshdesk, HubSpot, Salesforce | Ticket, SLA, chăm sóc khách hàng | Không tự hiểu container, B/L, PO, D/O, EIR nếu không tích hợp sâu |
| Công cụ phổ thông | Excel, Google Sheet, Outlook, Gmail, Zalo, Drive | Theo dõi linh hoạt, trao đổi nhanh | Không có single source of truth, audit trail, tự matching dữ liệu |

Kết luận: phần mềm theo từng mảng đã tồn tại, nhưng phần lớn doanh nghiệp vẫn thiếu một lớp trung gian để gom dữ liệu theo shipment/container.

### 2.3. Vì sao email, Zalo và Excel vẫn là lớp dữ liệu thật?

Trong logistics Việt Nam, dữ liệu "thật" thường không chỉ nằm trong hệ thống chính thức.

Email thường chứa:

- Booking confirmation.
- Arrival notice.
- Debit note.
- B/L draft.
- Shipping instruction.
- Xác nhận sửa chứng từ.
- Thông báo delay từ agent/hãng tàu.
- Trao đổi khiếu nại hoặc phí phát sinh.

Zalo thường chứa:

- Ảnh POD/EIR.
- Ảnh container/seal.
- Tin tài xế báo đã đến kho/cảng.
- Tin điều phối xe.
- Tin kho xác nhận đã nhận hàng.
- Tin nhắn nhanh giữa CS, Ops, nhà xe, kho và khách nội địa.

Excel/Google Sheet thường chứa:

- Bảng tracking theo khách.
- Danh sách container.
- Trạng thái từng shipment.
- ETD/ETA.
- Customs status.
- Trucking status.
- Warehouse status.
- PIC, next action, remark.

DataReportal Digital 2026 Vietnam dẫn dữ liệu từ VNG cho biết Zalo có khoảng 78,3 triệu người dùng hoạt động hằng tháng tại Việt Nam tại thời điểm báo cáo. Điều này củng cố nhận định rằng Zalo là kênh giao tiếp rất phổ biến, kể cả trong công việc. Tuy nhiên, chính vì phổ biến và cá nhân hóa, dữ liệu Zalo cũng dễ bị phân tán và khó kiểm soát.

Nguồn tham khảo:

- DataReportal, Digital 2026 Vietnam: https://datareportal.com/reports/digital-2026-vietnam
- Vietnamnet, Zalo's number of users hits 78.3 million: https://vietnamnet.vn/en/zalo-s-number-of-users-hits-78-3-million-putting-telcos-at-pipeline-trap-2436470.html

## 3. Problem cần giải quyết

### 3.1. Problem cốt lõi

Một shipment/container có nhiều mã định danh và nhiều nguồn dữ liệu. Khi dữ liệu bị chia ra nhiều nơi, nhân viên phải tự nhớ, tự tìm, tự hỏi và tự ghép lại.

Problem cốt lõi:

> **Doanh nghiệp logistics có dữ liệu, nhưng không có một hồ sơ shipment/container thống nhất để tra cứu nhanh và tin cậy.**

Điều này dẫn đến các pain cụ thể:

| Pain | Mô tả | Hậu quả |
|---|---|---|
| Tra cứu mất thời gian | Một câu hỏi phải mở email, Excel, Zalo, Drive, phần mềm nghiệp vụ | CS/Ops phản hồi chậm, năng suất thấp |
| Dữ liệu không đồng bộ | Excel ghi một trạng thái, email có trạng thái mới hơn, Zalo có ảnh bằng chứng | Dễ trả lời sai hoặc thiếu chắc chắn |
| Thất lạc chứng từ/bằng chứng | POD, EIR, ảnh seal, debit note nằm trong chat cá nhân hoặc folder rời | Khó claim, khó đối soát, khó bàn giao |
| Phụ thuộc người phụ trách | Người A nhớ lô hàng, người B không biết ngữ cảnh | Nghỉ phép, đổi ca, nghỉ việc gây đứt thông tin |
| Không có timeline | Không biết thông tin nào là mới nhất, nguồn nào đáng tin hơn | Quản lý khó kiểm soát exception |
| Không có audit trail | Không rõ ai upload, ai cập nhật, lấy từ nguồn nào | Khó truy vết khi có tranh chấp |

### 3.2. Câu hỏi thực tế mà nhân viên cần trả lời

Người dùng không cần một AI nói chuyện chung chung. Họ cần trả lời nhanh các câu hỏi như:

- Container `MSCU1234567` đang ở đâu?
- ETA mới nhất là ngày nào?
- Hàng đã thông quan chưa?
- Đã có D/O chưa?
- Xe đã lấy container khỏi cảng chưa?
- Đã giao kho chưa?
- Có POD/EIR chưa?
- B/L draft đã sửa xong chưa?
- Shipment này còn thiếu chứng từ gì?
- Có phí phát sinh nào chưa báo khách không?
- Lần cuối khách được cập nhật là khi nào?
- Ai đang phụ trách lô này?

Hiện tại, mỗi câu hỏi trên có thể cần tra từ 3 đến 7 nguồn. Agentify nên biến những câu hỏi này thành một thao tác search.

## 4. Đề xuất sản phẩm v3

### 4.1. Định vị sản phẩm

Tên mô tả:

> **Agentify Shipment Data Hub**

Mô tả ngắn:

> Agentify Shipment Data Hub là kho dữ liệu tập trung cho shipment/container, tự động lấy dữ liệu từ email, Zalo và file upload, sau đó tạo hồ sơ lô hàng để nhân viên logistics tra cứu trạng thái, chứng từ, timeline và bằng chứng theo thời gian thực.

Agentify không nên được định vị là:

- TMS đầy đủ.
- WMS đầy đủ.
- Phần mềm khai hải quan.
- ERP/kế toán.
- Chatbot logistics chung chung.
- Control tower enterprise cho toàn bộ supply chain.

Agentify nên được định vị là:

> **Lớp dữ liệu vận hành nằm trên email/Zalo/Excel/file và nằm cạnh các hệ thống logistics hiện có.**

### 4.2. Khách hàng đầu tiên nên nhắm đến

Đối tượng đầu tiên nên nhắm đến:

> **Forwarder/3PL SME có 20-300 shipment/tháng, đang dùng email, Excel, Zalo và một vài phần mềm rời rạc để vận hành.**

Lý do chọn nhóm này:

1. Forwarder/3PL là bên phải gom thông tin từ nhiều bên nhất: khách, hãng tàu, agent, hải quan, cảng, trucking, kho, kế toán.
2. Tần suất tra cứu cao vì họ phải trả lời nhiều khách hàng và nhiều shipment cùng lúc.
3. Họ thường có dữ liệu phân mảnh đúng với năng lực MVP của Agentify: email, Excel, PDF, Zalo, ảnh POD/EIR.
4. ROI dễ chứng minh bằng thời gian tiết kiệm cho CS/Ops và giảm thất lạc chứng từ.
5. Quy trình mua phần mềm có thể nhanh hơn doanh nghiệp enterprise lớn.

Đối tượng thứ hai có thể mở rộng:

> **Chủ hàng/importer/exporter có nhiều shipment nhập/xuất mỗi tháng và phải làm việc với nhiều forwarder/nhà xe/kho.**

Nhưng nhóm này nên đi sau vì dữ liệu thường nằm ở nhiều nhà cung cấp bên ngoài, Agentify cần thêm cơ chế lấy thông tin từ forwarder/vendor.

### 4.3. Người dùng hằng ngày

| Nhóm người dùng | Họ dùng Agentify để làm gì? |
|---|---|
| CS/Account | Tra cứu trạng thái lô hàng, trả lời khách, tìm lịch sử trao đổi |
| Ops | Xem việc cần xử lý, cập nhật mốc vận hành, tìm bằng chứng POD/EIR |
| Docs | Tìm chứng từ, kiểm tra thiếu/sai chứng từ, theo dõi B/L draft, invoice, packing list |
| Trucking coordinator | Tìm container, lịch lấy/giao, ảnh EIR/POD, trạng thái trả rỗng |
| Manager | Kiểm tra shipment bị trễ, workload, lô thiếu cập nhật, lô có rủi ro |

### 4.4. Giá trị cốt lõi

Agentify cần tạo ra 4 giá trị rõ:

1. **Tìm nhanh:** nhập container/booking/B/L/PO/job no là thấy hồ sơ lô hàng.
2. **Gom đúng:** email, file, ảnh, Excel row, Zalo message được gắn vào đúng shipment/container.
3. **Biết mới nhất:** timeline cho biết trạng thái mới nhất, nguồn dữ liệu và thời điểm cập nhật.
4. **Không thất lạc:** chứng từ và bằng chứng vận hành không còn nằm rải rác trong tài khoản cá nhân.

## 5. Phạm vi MVP

### 5.1. MVP nên có 5 module

#### Module 1: Data Intake

Mục tiêu: đưa dữ liệu rời rạc vào Agentify.

Nguồn dữ liệu MVP:

- Kết nối email dùng chung của team CS/Ops/Docs.
- Upload Excel/Google Sheet export.
- Upload PDF: booking confirmation, arrival notice, B/L draft, invoice, packing list, debit note.
- Upload ảnh/file: POD, EIR, ảnh container, ảnh seal, ảnh phiếu giao nhận.
- Nhập hoặc forward thủ công nội dung Zalo quan trọng.

Ghi chú về Zalo:

- MVP không nên hứa "đọc toàn bộ Zalo cá nhân tự động" vì rủi ro quyền riêng tư, consent và kỹ thuật.
- Nên bắt đầu bằng 3 cách an toàn hơn: người dùng forward/copy tin quan trọng vào Agentify; upload ảnh/file từ Zalo; tích hợp Zalo OA/API khi doanh nghiệp có kênh chính thức và quyền hợp lệ.

#### Module 2: Shipment/Container Matching

Mục tiêu: tự gắn dữ liệu vào đúng hồ sơ shipment/container.

Các khóa matching:

- Container number.
- Booking number.
- B/L number.
- AWB number nếu có air cargo.
- PO number.
- Job number.
- Invoice number.
- Customer name.
- Vessel/voyage.

Khi AI không chắc:

- Hiển thị 2-3 hồ sơ có khả năng liên quan.
- Cho người dùng chọn đúng hồ sơ.
- Ghi nhớ lựa chọn để cải thiện rule matching.
- Không tự động gắn dữ liệu nhạy cảm nếu confidence thấp.

#### Module 3: Shipment Profile

Mỗi shipment/container cần có một trang hồ sơ duy nhất.

Thông tin nên hiển thị:

| Nhóm thông tin | Ví dụ |
|---|---|
| Định danh | Customer, job no, PO, booking, B/L, container, seal |
| Tuyến vận chuyển | POL, POD, vessel/voyage, ETD, ETA, ATD, ATA |
| Trạng thái vận hành | Booking, customs, D/O, trucking, warehouse, POD, return empty |
| Chứng từ | Invoice, packing list, B/L draft, C/O, arrival notice, debit note |
| Bằng chứng | POD, EIR, ảnh container, ảnh seal, ảnh giao hàng |
| Giao tiếp | Email liên quan, note nội bộ, Zalo message được forward |
| Follow-up | Việc cần làm, deadline, PIC, next update |

Nguyên tắc quan trọng:

> Mọi thông tin hiển thị phải có nguồn: lấy từ email nào, file nào, ai upload, thời điểm nào.

#### Module 4: Search & Ask

Mục tiêu: giúp nhân viên tra cứu bằng ngôn ngữ tự nhiên hoặc mã logistics.

Ví dụ câu hỏi:

- "Tìm container MSCU1234567."
- "Shipment của khách ABC còn thiếu chứng từ gì?"
- "Lô PO 450012345 đã có POD chưa?"
- "Các container ETA tuần này nhưng chưa có D/O."
- "Những shipment chưa update cho khách quá 24 giờ."
- "Tóm tắt lịch sử xử lý lô này."

Nguyên tắc sản phẩm:

- AI trả lời dựa trên dữ liệu trong hồ sơ.
- Nếu không có dữ liệu, AI phải nói "chưa thấy dữ liệu trong Agentify", không đoán.
- Câu trả lời cần kèm link nguồn: email/file/timeline event.

#### Module 5: Alert & Checklist

Mục tiêu: giúp người dùng không quên việc.

Các alert MVP:

- ETA đổi nhưng chưa update khách.
- Shipment đã ATA nhưng chưa thấy D/O.
- Container đã giao nhưng chưa có POD.
- Sắp hết free time nhưng chưa thấy trả rỗng.
- Có debit note/phí phát sinh nhưng chưa gắn vào shipment.
- Shipment quá 24 giờ chưa có cập nhật mới.
- Chứng từ còn thiếu trước cut-off.

Checklist nên theo từng loại shipment:

- Import FCL.
- Export FCL.
- LCL.
- Air cargo.

## 6. Ví dụ hoạt động cụ thể

### 6.1. Use case 1: Khách hỏi "container đã giao kho chưa?"

#### Bối cảnh

Một forwarder đang xử lý container nhập khẩu cho khách hàng sản xuất. Khách nhắn cho CS:

```text
Em check giúp chị container MSCU1234567 đã giao về kho chưa?
```

#### Cách làm hiện tại

CS thường phải:

1. Mở file Excel tracking để tìm container.
2. Search email xem có thông báo thông quan, D/O, lệnh giao hàng không.
3. Nhắn Zalo hỏi điều phối xe hoặc tài xế.
4. Tìm ảnh POD trong nhóm Zalo.
5. Hỏi kho xem đã nhận hàng chưa.
6. Tự tổng hợp câu trả lời cho khách.

Nếu nhiều lô chạy cùng lúc, việc này có thể mất 10-20 phút, thậm chí lâu hơn nếu người phụ trách trucking chưa trả lời.

#### Cách Agentify hoạt động

1. CS nhập `MSCU1234567` vào ô tìm kiếm.
2. Agentify mở hồ sơ container.
3. Agentify hiển thị timeline:
   - 08:20: tờ khai đã thông quan, lấy từ email của Docs.
   - 09:10: D/O đã release, lấy từ file PDF arrival/D/O instruction.
   - 10:35: xe gate-out khỏi cảng, cập nhật từ file tracking.
   - 13:50: tài xế gửi ảnh POD qua Zalo, được Ops upload vào Agentify.
   - 14:05: kho xác nhận đã nhận hàng, lấy từ email kho.
4. Agentify hiển thị trạng thái:

```text
Container MSCU1234567 đã giao kho lúc 13:50 hôm nay. Đã có POD. Kho xác nhận nhận hàng lúc 14:05. Chưa thấy ghi nhận lệch thiếu trong dữ liệu hiện tại.
```

5. Agentify soạn nháp câu trả lời:

```text
Dạ container MSCU1234567 đã giao về kho lúc 13:50 hôm nay. Bên em đã nhận POD và kho đã xác nhận nhận hàng lúc 14:05. Hiện chưa ghi nhận lệch thiếu. Em gửi kèm POD để chị kiểm tra.
```

#### Giá trị tạo ra

- CS không phải hỏi lại nhiều người.
- Khách nhận câu trả lời nhanh hơn.
- POD không bị thất lạc trong Zalo.
- Quản lý có thể kiểm tra nguồn dữ liệu nếu có tranh chấp.

### 6.2. Use case 2: Quản lý kiểm tra shipment có rủi ro trong ngày

#### Bối cảnh

Head of Ops muốn biết hôm nay có lô nào có nguy cơ trễ hoặc phát sinh phí không.

#### Cách làm hiện tại

Quản lý thường phải hỏi từng nhân viên:

- Lô nào tàu đến rồi mà chưa thông quan?
- Lô nào chưa có D/O?
- Lô nào xe chưa lấy?
- Lô nào sắp hết free time?
- Lô nào khách hỏi nhưng chưa trả lời?

Câu trả lời phụ thuộc vào trí nhớ của từng người và độ cập nhật của file Excel.

#### Cách Agentify hoạt động

Quản lý mở dashboard và thấy danh sách:

| Shipment/container | Rủi ro | Dữ liệu gợi ý | Người phụ trách |
|---|---|---|---|
| ABC / MSCU1234567 | ETA đã đổi, chưa thấy email update khách | Carrier email 08:30 báo delay | CS Lan |
| XYZ / TGHU7654321 | ATA 2 ngày, chưa thấy D/O | Arrival notice đã có, chưa có file D/O | Docs Minh |
| DEF / CMAU9988776 | Sắp hết free time | ETA + free time từ file tracking | Ops Huy |
| GHI / ONEU1122334 | Đã giao nhưng chưa thấy POD | Trucking status "delivered", chưa có POD upload | Trucking team |

Quản lý bấm vào từng dòng để xem nguồn dữ liệu và giao việc.

#### Giá trị tạo ra

- Exception được phát hiện trước khi khách phàn nàn.
- Quản lý không phải hỏi thủ công từng người.
- Team có checklist rõ theo shipment.
- Dữ liệu vận hành trở thành dashboard thay vì nằm trong chat/file rời.

## 7. Đối thủ và sản phẩm liên quan

Agentify không cạnh tranh trực diện với tất cả công cụ logistics. Cần phân biệt rõ:

- Phần mềm core nghiệp vụ quản lý quy trình chính.
- Công cụ giao tiếp/lưu file quản lý kênh trao đổi.
- Agentify quản lý lớp dữ liệu tổng hợp theo shipment/container.

### 7.1. Bảng so sánh theo nhóm sản phẩm

| Nhóm đối thủ/sản phẩm | Ví dụ | Tính năng chính | Điểm mạnh | Điểm yếu/khoảng trống | Cách Agentify khác biệt |
|---|---|---|---|---|---|
| Forwarding software | CargoWise, Magaya, GoFreight, Winta | Quản lý job/shipment; booking; chứng từ; HBL/MBL; quotation; billing; job costing; báo cáo khách hàng | Phù hợp nghiệp vụ forwarder; quản lý job và chứng từ bài bản; có thể nối với billing/costing | Cần nhập liệu đúng quy trình; dữ liệu trong email/Zalo/file rời vẫn có thể nằm ngoài hệ thống; triển khai có thể nặng với SME | Agentify không thay forwarding software; Agentify gom dữ liệu rơi bên ngoài hệ thống và tạo hồ sơ/timeline theo shipment/container |
| TMS/trucking platform | LOGIVAN, Abivin, TrackAsia, EcoTruck, TMS nội bộ | Tạo đơn vận tải; điều xe; quản lý tài xế; theo dõi GPS; tối ưu tuyến; POD; tính cước/chuyến | Mạnh ở vận tải nội địa; giúp quản lý xe và tài xế; theo dõi chuyến theo thời gian thực tốt hơn Excel | Chỉ bao phủ phần trucking; không quản lý đầy đủ booking quốc tế, chứng từ, hải quan, email khách, phí XNK | Agentify lấy trạng thái trucking, POD, EIR như một phần của shipment profile; không đi sâu vào điều xe |
| WMS/warehouse software | TigerWMS, Smartlog, Infolog, Odoo, SAP EWM | Inbound; outbound; putaway; picking/packing; tồn kho; barcode/QR; kiểm kê; báo cáo tồn | Mạnh trong kho; kiểm soát tồn kho và thao tác nhập/xuất tốt | Không phải nơi tổng hợp toàn bộ hành trình lô XNK từ booking, hải quan, trucking đến billing | Agentify chỉ lấy trạng thái kho, GRN/POD/ảnh nhận hàng để hoàn thiện timeline shipment |
| ERP/kế toán | SAP, Oracle, Odoo, MISA, FAST, BRAVO | PO; mua hàng; bán hàng; kế toán; hóa đơn; công nợ; tồn kho tổng; phê duyệt nội bộ | Mạnh về tài chính, kế toán, quản trị doanh nghiệp; phù hợp yêu cầu quản lý chính thức | Không lưu đầy đủ trao đổi vận hành, email, Zalo, ảnh POD/EIR; không sinh ra timeline logistics tự nhiên | Agentify gom chứng từ/bằng chứng/phí phát sinh theo shipment trước khi kế toán đối soát |
| CRM/helpdesk | Zendesk, Freshdesk, HubSpot, Salesforce | Quản lý khách hàng; ticket; SLA; email support; lịch sử tương tác; phân công nhân viên | Mạnh về chăm sóc khách hàng, ticket và SLA; phù hợp support đa kênh | Không tự hiểu container, booking, B/L, D/O, EIR, free time nếu không tích hợp sâu | Agentify search theo mã logistics và hiển thị timeline vận hành, không chỉ ticket khách hàng |
| Document AI/OCR | Google Document AI, Azure AI Document Intelligence, ABBYY | OCR ảnh/PDF; trích xuất trường dữ liệu; phân loại tài liệu; đọc invoice/packing list/B/L | Đọc tài liệu tốt; có nền tảng AI mạnh; dùng được như hạ tầng trích xuất dữ liệu | Chỉ là năng lực đọc tài liệu; không có workflow logistics, không tự tạo shipment profile hoàn chỉnh | Agentify có thể dùng OCR như một thành phần, nhưng sản phẩm chính là kho dữ liệu shipment/container |
| RPA/no-code automation | UiPath, Power Automate, Make, Zapier | Tự động copy dữ liệu; trigger theo email/file; kết nối app; tạo workflow đơn giản | Nhanh để tự động hóa thao tác lặp; linh hoạt với nhiều hệ thống | Dễ vỡ khi format thay đổi; không hiểu sâu logic shipment/container; cần người thiết kế workflow | Agentify tập trung vào hiểu dữ liệu logistics và matching theo shipment, không chỉ tự động thao tác |
| Excel/email/Zalo/Drive | Microsoft Excel, Google Sheets, Outlook, Gmail, Zalo, Google Drive, OneDrive | Gửi nhận thông tin; lưu file; chat; tracking thủ công; chia sẻ chứng từ; tạo report linh hoạt | Rất quen thuộc; triển khai nhanh; chi phí thấp; phù hợp thói quen vận hành Việt Nam | Dữ liệu phân mảnh; khó audit; khó matching; phụ thuộc cá nhân; dễ sai version | Agentify không bắt bỏ các công cụ này, mà biến chúng thành nguồn dữ liệu có cấu trúc |

### 7.2. Nhận định cạnh tranh

Các sản phẩm hiện tại thường tối ưu cho một nghiệp vụ chính:

- Forwarding software tối ưu cho job và chứng từ của forwarder.
- TMS tối ưu cho chuyến xe.
- WMS tối ưu cho kho.
- ERP/kế toán tối ưu cho tài chính, PO và hóa đơn.
- CRM/helpdesk tối ưu cho ticket và quan hệ khách hàng.
- OCR/RPA tối ưu cho đọc dữ liệu hoặc tự động hóa thao tác.
- Excel/email/Zalo tối ưu cho sự linh hoạt hằng ngày.

Khoảng trống Agentify nhắm tới là phần nằm giữa các nhóm này:

> **Một hồ sơ shipment/container thống nhất, gom dữ liệu từ nhiều nguồn, có thể tra cứu nhanh bằng mã logistics và có timeline rõ nguồn dữ liệu.**

Vì vậy, lợi thế của Agentify không nằm ở việc có nhiều tính năng logistics hơn các phần mềm core. Lợi thế nằm ở khả năng đọc dữ liệu không cấu trúc và gom về đúng shipment/container nhanh hơn cách làm thủ công.

## 8. Target user

### 8.1. Target user ưu tiên

Target user ưu tiên cho Agentify v3 là:

> **CS/Ops/Docs/Account trong forwarder/3PL SME xử lý nhiều shipment/container mỗi tháng và đang phải tra cứu dữ liệu từ email, Excel, Zalo, file PDF, ảnh POD/EIR.**

Đây là nhóm nên nhắm đầu tiên vì họ chạm pain hằng ngày. Họ không cần một hệ thống quản trị lớn ngay từ đầu. Họ cần một nơi để tìm nhanh thông tin của lô hàng.

### 8.2. Chân dung người dùng chính

| User | Công việc hiện tại | Pain lớn nhất | Agentify giúp gì? |
|---|---|---|---|
| CS/Customer Service | Trả lời khách về trạng thái shipment, ETA, giao hàng, chứng từ, phát sinh | Mỗi câu hỏi phải mở nhiều nguồn; dễ trả lời chậm hoặc thiếu chắc chắn | Search container/booking/B/L/PO để thấy timeline, trạng thái mới nhất, nguồn dữ liệu và nháp trả lời |
| Ops/Operations | Điều phối với hải quan, cảng, trucking, kho, forwarder/agent | Dữ liệu phát sinh nằm trong email/Zalo; khó cập nhật kịp cho CS và quản lý | Upload/forward bằng chứng, cập nhật mốc vận hành, tạo checklist việc còn thiếu |
| Docs/Documentation | Xử lý invoice, packing list, B/L, C/O, D/O, arrival notice | Chứng từ nằm rải rác; khó biết bản nào mới nhất; dễ thiếu/sai chứng từ | Gom chứng từ theo shipment, đánh dấu bản mới nhất, cảnh báo chứng từ còn thiếu |
| Account/Sales account | Theo dõi khách hàng lớn, xử lý escalation, giữ cam kết dịch vụ | Không có bức tranh nhanh khi khách hỏi hoặc phàn nàn | Xem hồ sơ shipment để hiểu tình hình trước khi trả lời/escalate |
| Head of Ops/CS | Quản lý team, exception, workload, chất lượng phản hồi | Phải hỏi từng người; không thấy lô nào đang rủi ro | Dashboard lô thiếu cập nhật, thiếu POD/EIR, ETA đổi, sắp hết free time |

### 8.3. ICP công ty nên chọn để pilot

ICP phù hợp nhất:

| Tiêu chí | Mô tả |
|---|---|
| Loại công ty | Forwarder/3PL vừa và nhỏ tại Việt Nam |
| Quy mô shipment | Khoảng 20-300 shipment/tháng |
| Quy mô team | 3-20 nhân sự CS/Ops/Docs/Account |
| Công cụ đang dùng | Email, Excel/Google Sheet, Zalo, Drive/OneDrive, phần mềm kế toán, có thể có forwarding software/TMS/WMS rời |
| Quy trình hiện tại | Có file tracking; nhiều chứng từ gửi qua email; POD/EIR/ảnh giao nhận gửi qua Zalo; cập nhật khách thủ công |
| Pain rõ | Trả lời khách chậm, tìm chứng từ lâu, thất lạc POD/EIR, khó bàn giao khi nhân viên nghỉ, quản lý không thấy exception sớm |
| Điều kiện pilot | Sẵn sàng cung cấp dữ liệu mẫu có consent; có 3-5 người dùng thử thật; có người phụ trách vận hành tham gia feedback |

Nhóm chưa nên ưu tiên ở MVP:

| Nhóm | Lý do chưa ưu tiên |
|---|---|
| Doanh nghiệp enterprise rất lớn | Quy trình mua dài, yêu cầu bảo mật/tích hợp/phân quyền phức tạp |
| Nhà xe thuần trucking | Pain chính là điều xe/tài xế/GPS, dễ kéo Agentify thành TMS |
| Kho thuần warehouse | Pain chính là inbound/outbound/tồn kho, dễ kéo Agentify thành WMS |
| Đại lý khai hải quan thuần túy | Pain chính là tờ khai/luồng/HS code, rủi ro pháp lý cao hơn |
| Chủ hàng có ít shipment | Tần suất pain thấp, ROI khó thấy |

### 8.4. Nhu cầu người dùng cần kiểm chứng khi pilot

Khi pilot, nên phỏng vấn và đo trực tiếp các câu hỏi sau:

- Một CS/Ops phải trả lời bao nhiêu câu hỏi trạng thái mỗi ngày?
- Mỗi câu hỏi hiện mất bao lâu để tra cứu?
- Người dùng thường phải mở bao nhiêu nguồn để trả lời một container?
- File tracking hiện có những cột nào và ai cập nhật?
- POD/EIR/ảnh giao nhận đang được lưu ở đâu?
- Có bao nhiêu lần/tháng bị mất chứng từ hoặc không tìm được bằng chứng?
- Khi nhân viên nghỉ phép, việc bàn giao shipment diễn ra thế nào?
- Quản lý muốn thấy dashboard exception nào đầu tiên?
- Người dùng có chấp nhận forward/upload dữ liệu Zalo quan trọng vào Agentify không?
- Dữ liệu nào bắt buộc phải có nguồn rõ ràng trước khi người dùng tin?

### 8.5. Chỉ số thành công của user trong pilot

Không nên chỉ hỏi "người dùng có thích không". Cần đo hành vi thật:

| Chỉ số | Cách đo |
|---|---|
| Thời gian tra cứu trung bình | Trước/sau khi dùng Agentify cho cùng loại câu hỏi |
| Số nguồn phải mở để trả lời | Email, Excel, Zalo, Drive, TMS, WMS |
| Số shipment thiếu POD/EIR | Trước/sau khi dùng checklist |
| Số missed follow-up | Số câu khách hỏi quá SLA hoặc quá 24 giờ chưa update |
| Tỷ lệ dữ liệu gắn đúng shipment | AI matching đúng ngay hoặc cần người sửa |
| Thời gian onboarding nhân viên mới | Mất bao lâu để hiểu lịch sử shipment |

Nếu người dùng mở Agentify hằng ngày để search container, xem timeline và tìm chứng từ, nghĩa là hướng sản phẩm có tín hiệu đúng.

## 9. Roadmap đề xuất

### Giai đoạn 1: Prototype có dữ liệu thật

Thời gian: 2-4 tuần.

Mục tiêu:

- Chọn 1-2 doanh nghiệp forwarder/3PL để lấy dữ liệu mẫu có consent.
- Import file Excel tracking.
- Upload 20-50 email/file/chứng từ/POD/EIR mẫu.
- Tạo shipment profile và search theo container/booking/B/L/PO.
- Demo được 2 use case: "khách hỏi container ở đâu" và "quản lý xem lô rủi ro".

Tiêu chí đạt:

- Người dùng thấy được thông tin shipment nhanh hơn cách tra thủ công.
- AI matching đúng phần lớn trường hợp có mã rõ.
- Người dùng hiểu ngay sản phẩm dùng để làm gì.

### Giai đoạn 2: MVP nội bộ cho pilot

Thời gian: 6-8 tuần.

Mục tiêu:

- Kết nối mailbox.
- Import Excel định kỳ.
- Upload file PDF/ảnh.
- Tạo timeline theo shipment/container.
- Có search & ask.
- Có checklist và alert cơ bản.
- Có phân quyền user/workspace.
- Có nguồn dữ liệu/audit trail cho từng timeline event.

Tiêu chí đạt:

- 3-5 người dùng vận hành thật trong 2-4 tuần.
- Ít nhất 50-100 shipment được quản lý trong Agentify.
- Đo được thời gian tra cứu trước/sau.
- Có feedback rõ về dữ liệu nào cần ưu tiên.

### Giai đoạn 3: Pilot trả phí

Thời gian: 2-3 tháng.

Mục tiêu:

- Chạy với 3-5 khách hàng pilot.
- Chuẩn hóa template theo import/export FCL trước.
- Bổ sung dashboard exception.
- Bổ sung cơ chế review khi AI matching không chắc.
- Bổ sung export report gửi khách.
- Bổ sung quy trình upload/forward Zalo an toàn.

Tiêu chí đạt:

- Khách đồng ý trả phí sau pilot.
- Sản phẩm xử lý được workflow thật hằng ngày.
- Xác định được ICP tốt nhất: forwarder, 3PL, hay chủ hàng.

### Giai đoạn 4: Mở rộng tích hợp

Chỉ nên làm sau khi MVP chứng minh giá trị.

Tích hợp có thể mở rộng:

- Zalo OA/API khi có điều kiện hợp lệ.
- Google Drive/OneDrive/SharePoint.
- TMS/WMS/ERP qua file export hoặc API.
- Carrier tracking API/portal nếu khả thi.
- ePort/cảng qua file export hoặc API nếu có quyền.
- Phần mềm forwarding nội bộ.

Nguyên tắc:

> Không tích hợp rộng trước khi chứng minh Agentify là nơi người dùng muốn tra shipment hằng ngày.

## 10. Rủi ro và cách giảm rủi ro

| Rủi ro | Mô tả | Cách giảm |
|---|---|---|
| Dữ liệu nhạy cảm | Email/chứng từ chứa thông tin khách, giá, hợp đồng | Phân quyền, mã hóa, audit log, consent rõ, không dùng dữ liệu khách để train public model |
| Zalo khó ingest tự động | Dữ liệu nằm trong tài khoản cá nhân, API/consent có giới hạn | Bắt đầu bằng upload/forward thủ công và Zalo OA/API hợp lệ |
| AI matching sai | Gắn nhầm chứng từ vào shipment khác | Confidence score, human review, nguồn dữ liệu rõ, undo/correction |
| Người dùng không nhập liệu | Nếu bắt nhập nhiều, adoption thấp | Tập trung auto intake từ email/file/Excel; manual input tối thiểu |
| Scope phình to | Dễ bị kéo thành TMS/WMS/ERP/control tower | Giữ MVP là shipment data hub, không điều xe/kho/kế toán sâu |
| Khách hỏi dữ liệu chưa có | AI có thể bị kỳ vọng trả lời mọi thứ | Trả lời rõ "chưa có dữ liệu", hiển thị nguồn, không đoán |

## 11. Đề xuất quyết định sản phẩm

Agentify nên chốt hướng v3 như sau:

1. **Đối tượng đầu tiên:** forwarder/3PL SME.
2. **Workflow đầu tiên:** CS/Ops tra cứu trạng thái shipment/container và tìm chứng từ/bằng chứng.
3. **Nguồn dữ liệu đầu tiên:** email, Excel tracking, PDF/ảnh upload, Zalo forward/upload thủ công.
4. **Use case đầu tiên:** nhập container/booking/B/L/PO để xem timeline, trạng thái mới nhất, chứng từ liên quan và việc còn thiếu.
5. **Không làm ở MVP:** TMS, WMS, khai hải quan tự động, ERP/kế toán sâu, tự động gửi tin cho khách không qua người duyệt.

Thông điệp sản phẩm nên dùng khi trình bày:

> "Agentify giúp mỗi shipment/container có một hồ sơ duy nhất. Nhân viên chỉ cần search mã container, booking, B/L hoặc PO là thấy trạng thái, chứng từ, email, Zalo evidence, timeline và việc còn thiếu. Agentify không thay thế phần mềm logistics hiện có; Agentify gom phần dữ liệu đang bị rơi giữa email, Zalo, Excel và file thủ công."

## 12. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Ví dụ |
|---|---|---|
| Logistics | Hoạt động tổ chức dòng chảy hàng hóa, thông tin, chứng từ và chi phí từ điểm gửi đến điểm nhận | Đưa container hàng từ cảng Cát Lái về nhà máy Bình Dương |
| B2B | Business-to-business, giao dịch giữa doanh nghiệp với doanh nghiệp | Nhà máy thuê forwarder xử lý lô nhập khẩu |
| XNK | Xuất nhập khẩu | Nhập linh kiện từ Trung Quốc, xuất hàng may mặc sang Mỹ |
| Shipment/lô hàng | Một đơn vị vận hành logistics có lịch trình, chứng từ và trạng thái riêng | Một lô nhập khẩu gồm 2 container |
| Container | Thùng tiêu chuẩn dùng để chở hàng bằng tàu/xe, thường 20 feet hoặc 40 feet | Container MSCU1234567 |
| FCL | Full Container Load, hàng nguyên container | Một chủ hàng dùng trọn container 40HC |
| LCL | Less than Container Load, hàng lẻ ghép container | Một pallet hàng ghép chung container với hàng của bên khác |
| PO | Purchase Order, đơn đặt hàng | PO 450012345 của khách ABC |
| Booking | Xác nhận đặt chỗ vận chuyển với hãng tàu/hãng bay | Booking đi tuyến Hải Phòng - Los Angeles |
| B/L | Bill of Lading, vận đơn đường biển | Chứng từ thể hiện việc hãng tàu nhận vận chuyển hàng |
| AWB | Air Waybill, vận đơn hàng không | Chứng từ vận chuyển cho lô air cargo |
| ETD | Estimated Time of Departure, thời gian dự kiến khởi hành | Tàu dự kiến rời cảng ngày 10/06 |
| ETA | Estimated Time of Arrival, thời gian dự kiến đến | Tàu dự kiến đến Cát Lái ngày 18/06 |
| ATD | Actual Time of Departure, thời gian khởi hành thực tế | Tàu rời cảng thực tế lúc 22:00 ngày 10/06 |
| ATA | Actual Time of Arrival, thời gian đến thực tế | Tàu cập cảng thực tế ngày 19/06 |
| D/O | Delivery Order, lệnh giao hàng | Chứng từ/lệnh để lấy hàng nhập khỏi cảng/kho |
| POD | Proof of Delivery, bằng chứng đã giao hàng | Ảnh phiếu giao hàng có ký nhận của kho |
| EIR | Equipment Interchange Receipt, biên nhận giao nhận container | Phiếu ghi tình trạng container khi lấy/trả tại cảng/depot |
| Depot | Bãi container rỗng | Nơi tài xế trả container rỗng sau khi rút hàng |
| ICD | Inland Container Depot, cảng cạn | Điểm thông quan/lưu container trong nội địa |
| Free time | Thời gian miễn phí lưu container/lưu bãi | Hãng tàu cho 7 ngày miễn phí detention |
| DEM/DET | Demurrage/Detention, phí lưu bãi/lưu container quá hạn | Trả rỗng trễ bị tính detention |
| CS | Customer Service | Nhân viên cập nhật trạng thái và trả lời khách |
| Ops | Operations | Nhân viên điều phối vận hành thực tế |
| Docs | Documentation | Nhân viên xử lý chứng từ |
| Forwarder | Công ty giao nhận vận tải, đứng ra tổ chức vận chuyển cho chủ hàng | Forwarder đặt booking, làm chứng từ, phối hợp trucking |
| 3PL | Third-party logistics, nhà cung cấp dịch vụ logistics bên thứ ba | Công ty nhận vận tải, kho, phân phối cho chủ hàng |
| TMS | Transportation Management System, phần mềm quản lý vận tải | Phần mềm điều xe, theo dõi chuyến |
| WMS | Warehouse Management System, phần mềm quản lý kho | Phần mềm nhập/xuất/tồn kho |
| ERP | Enterprise Resource Planning, phần mềm quản trị doanh nghiệp | SAP/Odoo/MISA quản lý PO, tài chính, kế toán |
| Timeline shipment | Dòng thời gian các sự kiện của một lô hàng | Booking confirmed -> ETD -> ATA -> customs cleared -> delivered |
| Single source of truth | Nguồn dữ liệu chuẩn để mọi người cùng tra | Một hồ sơ shipment duy nhất trong Agentify |
| Audit trail | Dấu vết truy vết ai cập nhật gì, lúc nào, từ nguồn nào | POD upload bởi Ops Huy lúc 13:50 từ file ảnh |
| Data matching | Ghép dữ liệu vào đúng shipment/container | Gắn email có container MSCU1234567 vào đúng hồ sơ lô hàng |
| OCR | Optical Character Recognition, công nghệ đọc chữ từ ảnh/PDF | Đọc số container từ ảnh EIR |
| API | Giao diện để hai hệ thống phần mềm trao đổi dữ liệu | Agentify lấy dữ liệu từ hệ thống TMS qua API |
| Zalo OA | Zalo Official Account, tài khoản doanh nghiệp trên Zalo | Doanh nghiệp dùng Zalo OA để gửi thông báo cho khách |
