# Cụm 9: Excel, email, Zalo và file thủ công

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để nghiên cứu lớp **Excel, email, Zalo và file thủ công** trong logistics công nghiệp, B2B và xuất nhập khẩu tại Việt Nam.

Nếu Cụm 8 là nơi CS/Ops/Account phải trả lời khách, thì Cụm 9 là nơi cần trả lời câu hỏi:

> Dữ liệu thật để trả lời khách đang nằm ở đâu, được cập nhật như thế nào, có đáng tin không, và Agentify có thể lấy dữ liệu đó bằng cách nào trong MVP?

Đây là cụm đặc biệt quan trọng vì Agentify muốn làm "lớp trung gian kết nối tất cả" thì không thể chỉ nghĩ đến API của TMS/WMS/ERP. Ở thị trường Việt Nam, đặc biệt là doanh nghiệp logistics vừa và nhỏ, dữ liệu vận hành thường nằm trong:

- Excel tracking file.
- Google Sheet.
- Email thread.
- File PDF.
- Ảnh chụp màn hình.
- Ảnh POD/EIR/biên bản.
- Nhóm Zalo.
- Tin nhắn riêng.
- Folder Google Drive/OneDrive.
- File scan chứng từ.
- Ghi chú cá nhân.
- "Trong đầu" nhân viên phụ trách.

Câu hỏi nghiên cứu chính:

1. Có file tracking chung không?
2. Ai cập nhật file tracking?
3. Bao lâu cập nhật một lần?
4. File tracking gồm những cột nào?
5. Có bị sai version file không?
6. Thông tin nào chỉ nằm trong email?
7. Thông tin nào chỉ nằm trong Zalo?
8. Thông tin nào chỉ nằm trong đầu nhân viên?
9. Có phải copy dữ liệu từ app này sang app khác không?
10. Nếu Agentify đọc email, import Excel và tạo timeline, người dùng có chấp nhận không?

Kết luận cần kiểm chứng:

> Cụm 9 là nền tảng dữ liệu ban đầu khả thi nhất cho MVP Agentify. Thay vì đợi tích hợp API sâu với mọi hệ thống, Agentify nên bắt đầu bằng import Excel/Google Sheet, đọc email/file chứng từ, nhận manual update và tạo shipment timeline. Zalo là nguồn dữ liệu rất quan trọng nhưng rủi ro quyền riêng tư cao hơn, nên MVP cần xử lý thận trọng: ưu tiên copy/paste, upload evidence, Zalo OA/API có consent, hoặc chỉ tạo nháp để người dùng gửi.

---

## 2. Vì sao Excel/email/Zalo/file thủ công vẫn tồn tại?

### 2.1. Vì logistics có quá nhiều bên tham gia

Một shipment B2B/XNK không chỉ nằm trong một công ty.

Một lô hàng nhập khẩu có thể liên quan đến:

- Chủ hàng.
- Forwarder.
- Đại lý nước ngoài.
- Hãng tàu.
- Cảng.
- Hải quan.
- Đại lý khai báo.
- Trucking vendor.
- Tài xế.
- Kho.
- Depot.
- Kế toán.
- Ngân hàng.
- Bảo hiểm nếu có.

Mỗi bên có hệ thống riêng. Không có một phần mềm duy nhất bắt tất cả cùng dùng.

Vì vậy, Excel/email/Zalo/file thủ công trở thành "keo nối" giữa các bên.

### 2.2. Vì phần mềm nghiệp vụ thường chỉ quản lý một phần

Các phần mềm hiện có thường tốt trong phạm vi riêng:

- Phần mềm khai hải quan xử lý tờ khai.
- ePort xử lý giao dịch cảng.
- TMS xử lý vận tải.
- WMS xử lý kho.
- ERP xử lý PO/tài chính/kế toán.
- Forwarding software xử lý job/booking/chứng từ/billing.
- CRM/help desk xử lý ticket/khách hàng.

Nhưng câu hỏi vận hành thường xuyên là câu hỏi xuyên hệ thống:

```text
Container đã thông quan chưa, đã có D/O chưa, xe đã lấy chưa, kho nhận mấy giờ, có phát sinh phí không?
```

Khi một câu hỏi cần dữ liệu từ 5-7 nơi, nhân viên thường tạo một file tracking riêng để nhìn nhanh.

### 2.3. Vì Excel linh hoạt hơn phần mềm khi quy trình thay đổi

Excel/Google Sheet có lợi thế lớn:

- Tạo file nhanh.
- Thêm cột nhanh.
- Copy/paste nhanh.
- Chia sẻ nhanh.
- Không cần training nhiều.
- Không cần IT triển khai.
- Dễ phù hợp với từng khách hàng.

Ví dụ một khách yêu cầu thêm cột:

```text
PO number
SKU group
Factory
Required delivery date
Vessel delay reason
PIC
Next update time
```

CS/Ops có thể thêm ngay vào file tracking mà không cần sửa phần mềm core.

### 2.4. Vì email là nơi lưu bằng chứng chính thức

Email vẫn là kênh chính thức trong B2B.

Nhiều thông tin quan trọng nằm trong email:

- Booking confirmation.
- Rate confirmation.
- Shipping instruction.
- Arrival notice.
- Debit note.
- D/O instruction.
- Thông báo đổi lịch tàu.
- Pre-alert từ agent.
- Chứng từ bản scan.
- Xác nhận giao hàng.
- Khiếu nại hoặc claim.

Email có tính chính thức hơn chat, nhưng lại khó biến thành timeline nếu không có công cụ đọc và phân loại.

### 2.5. Vì Zalo phù hợp giao tiếp nhanh tại Việt Nam

Ở Việt Nam, Zalo là kênh rất phổ biến cho giao tiếp công việc. Báo cáo Digital 2025 Vietnam của DataReportal ghi nhận Việt Nam có 76,2 triệu social media user identities vào tháng 01/2025. Một số nguồn thị trường năm 2025 ghi nhận Zalo đạt khoảng 78,3 triệu người dùng hoạt động hằng tháng.

Trong logistics, Zalo thường được dùng để:

- Hỏi nhanh trucking vendor.
- Nhận ảnh POD/EIR.
- Nhận ảnh seal/container.
- Nhận ảnh phiếu cân.
- Cập nhật tài xế đã tới kho/cảng.
- Gửi file/ảnh chứng từ nhanh.
- Tạo group với khách, forwarder, kho, trucking.

Zalo nhanh và tiện, nhưng có điểm yếu:

- Dữ liệu phân tán theo nhóm.
- Tin nhắn có thể nằm ở tài khoản cá nhân.
- Khó audit.
- Khó search theo shipment nếu không có mã chuẩn.
- Khó handover khi người phụ trách nghỉ.
- Rủi ro quyền riêng tư và bảo mật nếu ingest tự động.

### 2.6. Vì file thủ công là nơi chứa "bằng chứng mềm"

Nhiều bằng chứng logistics không phải dữ liệu API đẹp.

Ví dụ:

- Ảnh container.
- Ảnh seal.
- Ảnh phiếu giao nhận.
- Ảnh EIR.
- Ảnh hàng hư hỏng.
- File scan C/O.
- File PDF invoice.
- File Excel packing list.
- Ảnh chụp màn hình carrier tracking.
- Ảnh chụp màn hình ePort.

Những thứ này có thể đủ để CS/Ops trả lời khách, nhưng không tự động đi vào TMS/WMS/ERP.

---

## 3. Thuật ngữ cần giải thích

### 3.1. File tracking

File tracking là file dùng để theo dõi trạng thái shipment/container/PO.

Nó có thể là:

- Excel file trên máy cá nhân.
- Excel file gửi qua email.
- Google Sheet dùng chung.
- OneDrive/SharePoint file.
- File nội bộ xuất từ phần mềm.

Một file tracking thường có các cột:

```text
Customer
Shipment/Job No.
PO No.
Container No.
MBL/HBL
POL/POD
Vessel/Voyage
ETD
ETA
Current status
Customs status
D/O status
Truck status
Warehouse status
POD/GRN status
Free time
Risk/Remark
PIC
Next action
Last update
```

### 3.2. Version file

Version file là phiên bản của file.

Vấn đề thường gặp:

- Người A gửi file `tracking_final.xlsx`.
- Người B sửa file thành `tracking_final_update.xlsx`.
- Người C lại sửa file cũ.
- Khách nhận một bản khác với bản nội bộ.

Khi có nhiều version, không ai chắc đâu là dữ liệu mới nhất.

### 3.3. Email thread

Email thread là chuỗi email qua lại về cùng một chủ đề.

Ví dụ một shipment có thread:

```text
Booking request
Booking confirmation
SI submission
BL draft
BL correction
Arrival notice
D/O instruction
Delay notice
POD
Invoice dispute
```

Vấn đề là một thread có thể dài, nhiều người reply, nhiều file đính kèm và nhiều thông tin bị chôn trong nội dung.

### 3.4. Attachment

Attachment là file đính kèm trong email hoặc chat.

Trong logistics, attachment rất quan trọng:

- Invoice.
- Packing list.
- B/L.
- C/O.
- Arrival notice.
- Debit note.
- POD.
- EIR.
- GRN.
- Booking confirmation.

Nếu attachment không được gắn đúng shipment, rất khó tìm lại khi cần.

### 3.5. Manual update

Manual update là cập nhật thủ công.

Ví dụ:

```text
Ops gõ vào Excel: "Truck booked, pickup 10/06 AM"
CS gõ vào note: "Customer requested update before 3 PM"
Trucking gửi Zalo: "Xe đã vào cảng"
Kho gửi ảnh: "Đã nhận 100 cartons"
```

Manual update không xấu. Vấn đề là nếu không có cấu trúc, nó khó kiểm tra, khó tìm, khó tự động hóa.

### 3.6. OCR

OCR là Optical Character Recognition, tức công nghệ đọc chữ từ ảnh hoặc file scan.

Trong Agentify, OCR có thể dùng để đọc:

- Ảnh EIR.
- Ảnh POD.
- File scan invoice.
- File scan packing list.
- Ảnh chụp màn hình tracking.

OCR không đủ một mình. Sau khi đọc chữ, hệ thống vẫn phải hiểu chữ đó thuộc shipment nào và có ý nghĩa gì.

### 3.7. Data extraction

Data extraction là trích xuất dữ liệu.

Ví dụ từ arrival notice, Agentify cần trích:

- Vessel/voyage.
- ETA.
- Container number.
- MBL.
- Local charges.
- Free time nếu có.
- D/O instruction.

### 3.8. Data matching

Data matching là ghép dữ liệu từ nhiều nguồn vào đúng shipment.

Ví dụ:

- Email có container `ABCU1234567`.
- File Excel có job `SHP-1008`.
- Invoice có HBL `HBL-HCM-9981`.
- Zalo có ảnh POD ghi biển số xe.

Agentify cần ghép các dữ liệu này vào cùng một shipment nếu chúng liên quan.

### 3.9. Source of truth

Source of truth là nguồn dữ liệu được xem là đúng nhất.

Trong logistics SME, nhiều khi không có source of truth rõ. Excel nói một đằng, email nói một đằng, Zalo nói một đằng.

Agentify không nên giả vờ biết nguồn nào đúng nếu chưa có rule. Nên hiển thị:

- Nguồn dữ liệu.
- Thời gian cập nhật.
- Người cập nhật.
- Mức độ tin cậy.
- Dữ liệu đang mâu thuẫn nếu có.

### 3.10. Audit trail

Audit trail là lịch sử thay đổi.

Ví dụ:

```text
09/06 09:10 - Ops A cập nhật: D/O pending
09/06 10:20 - Finance B upload payment proof
09/06 10:45 - Ops A cập nhật: D/O released
09/06 11:00 - CS C gửi khách status update
```

Audit trail giúp biết ai cập nhật gì, khi nào, dựa trên nguồn nào.

---

## 4. Bản đồ dữ liệu thủ công trong logistics

### 4.1. Excel/Google Sheet

Loại dữ liệu thường nằm trong Excel/Sheet:

| Nhóm dữ liệu | Ví dụ |
|---|---|
| Shipment master | Job no., customer, booking, MBL/HBL, PO |
| Container tracking | Container no., seal, size/type, ETA, free time |
| Customs status | Tờ khai, luồng, thông quan, kiểm hóa |
| Port status | Arrived, D/O, port charges, release |
| Trucking status | Xe, tài xế, pickup, delivery, empty return |
| Warehouse status | Inbound, GRN, putaway, POD |
| Document checklist | Invoice, packing list, B/L, C/O, arrival notice |
| Cost tracking | Local charges, trucking, DEM/DET, storage |
| Customer report | Status, risk, remark, next update |

Excel thường là nguồn "nhìn nhanh", nhưng không phải lúc nào cũng là nguồn cập nhật mới nhất.

### 4.2. Email

Loại dữ liệu thường nằm trong email:

| Nhóm dữ liệu | Ví dụ |
|---|---|
| Booking | Booking confirmation, schedule change |
| Chứng từ | SI, B/L draft, invoice, packing list, C/O |
| Arrival/import | Arrival notice, D/O instruction, local charges |
| Agent communication | Pre-alert, overseas agent update |
| Customer request | Yêu cầu status, yêu cầu chứng từ, complaint |
| Billing | Debit note, invoice, payment proof |
| Exception | Delay notice, roll cargo, amendment, claim |

Email có bằng chứng tốt nhưng khó tổng hợp nhanh.

### 4.3. Zalo/WhatsApp/chat

Loại dữ liệu thường nằm trong chat:

| Nhóm dữ liệu | Ví dụ |
|---|---|
| Trucking update | Xe đã vào cảng, xe đang chờ, xe đã giao |
| Driver evidence | Ảnh POD, EIR, seal, container, phiếu cân |
| Quick confirmation | "D/O ok rồi", "Kho nhận 14h", "Tờ khai xong" |
| Internal escalation | Nhờ Ops check, nhờ kế toán thanh toán, nhờ kho xác nhận |
| Customer quick question | Hỏi status, hỏi delay, hỏi chứng từ |

Chat nhanh nhưng rủi ro vì thiếu cấu trúc và khó lưu trữ chính thức.

### 4.4. Drive/OneDrive/folder nội bộ

Loại dữ liệu thường nằm trong folder:

- Folder theo khách.
- Folder theo shipment.
- Folder theo tháng.
- Folder theo nhân viên phụ trách.
- Folder chứng từ gốc.
- Folder invoice/cost.
- Folder POD/GRN.

Vấn đề thường gặp:

- Cách đặt tên file không thống nhất.
- File nằm sai folder.
- Có nhiều bản scan khác nhau.
- Không biết bản nào mới nhất.
- Người mới khó tìm.

### 4.5. Ảnh chụp màn hình

Ảnh chụp màn hình thường dùng khi hệ thống không có export hoặc người dùng cần báo nhanh.

Ví dụ:

- Screenshot carrier tracking.
- Screenshot ePort.
- Screenshot customs status.
- Screenshot bank transfer.
- Screenshot Zalo confirmation.

Rủi ro:

- Dễ lỗi thời.
- Không có metadata rõ.
- OCR có thể đọc sai.
- Không biết ảnh được chụp từ hệ thống nào nếu không ghi chú.

### 4.6. Ghi chú cá nhân và "dữ liệu trong đầu"

Đây là nguồn nguy hiểm nhất.

Ví dụ:

- Chỉ một người biết khách A không muốn nhận email dài.
- Chỉ một người biết shipment B đang có dispute.
- Chỉ một người nhớ tài xế đã báo kẹt cảng.
- Chỉ một người biết khách đã đồng ý trả phí phát sinh.

Khi người đó nghỉ hoặc đổi việc, dữ liệu biến mất.

---

## 5. Workflow thủ công phổ biến

### 5.1. Workflow cập nhật file tracking

Workflow thường thấy:

```text
Email/Zalo/portal có thông tin mới
  -> CS/Ops đọc
  -> Copy thông tin vào Excel
  -> Sửa status/remark
  -> Gửi file hoặc screenshot cho khách/quản lý
```

Vấn đề:

- Dễ copy sai.
- Dễ quên cập nhật.
- Không có nguồn chứng minh.
- Người khác không biết status dựa trên email nào.
- Cập nhật xong Excel nhưng không cập nhật hệ thống khác.

### 5.2. Workflow tìm chứng từ

Khi khách hỏi:

```text
"Gửi giúp chị POD/GRN của lô hôm qua."
```

CS có thể phải:

1. Tìm shipment trong Excel.
2. Hỏi kho hoặc trucking.
3. Tìm ảnh trong Zalo.
4. Tìm file trong Drive.
5. Kiểm tra file có đúng shipment không.
6. Gửi lại khách.
7. Cập nhật note đã gửi.

Vấn đề:

- Nếu ảnh nằm trong Zalo cá nhân của Ops, CS không tự lấy được.
- Nếu file không đặt tên theo shipment/container, tìm rất lâu.
- Nếu không cập nhật đã gửi, khách có thể hỏi lại.

### 5.3. Workflow trả lời khách từ email và Zalo

Một câu hỏi khách gửi email:

```text
"Please update status for all containers under PO-8891."
```

CS phải:

1. Tìm PO trong Excel.
2. Lọc ra các container.
3. Check từng container.
4. Đọc email đổi lịch tàu nếu có.
5. Hỏi Ops/trucking/kho.
6. Viết summary.
7. Gửi email.

Nếu khách hỏi cùng lúc qua Zalo, CS có thể trả lời nhanh bằng chat, nhưng email chính thức lại chưa cập nhật. Điều này tạo lệch thông tin giữa kênh.

### 5.4. Workflow handover

Khi handover, người bàn giao thường gửi:

- Một file Excel.
- Một email summary.
- Một tin nhắn Zalo.
- Một danh sách việc cần làm.

Vấn đề:

- File nói một đằng, tin nhắn nói một đằng.
- Người nhận không biết ưu tiên.
- Không biết việc nào đã hứa với khách.
- Không biết shipment nào đang rủi ro cao.

### 5.5. Workflow đối soát cuối tháng

Cụm 7 đã phân tích đối soát chi phí. Với Cụm 9, dữ liệu đối soát thường đi qua:

- Excel cost sheet.
- Vendor invoice PDF.
- Email xác nhận phí.
- Zalo xác nhận phí chờ xe.
- Ảnh POD/EIR.
- Debit note gửi khách.

Nếu dữ liệu vận hành không gắn shipment từ đầu, cuối tháng rất khó đối soát.

---

## 6. Pain ranking sơ bộ

### 6.1. Pain 1: Sai version file

Đây là pain rất phổ biến.

Hậu quả:

- CS trả lời khách bằng bản cũ.
- Ops cập nhật vào file không ai dùng.
- Manager xem report không đúng.
- Khách nhận status khác với trạng thái thật.

### 6.2. Pain 2: Copy/paste thủ công gây sai dữ liệu

Lỗi thường gặp:

- Sai container number.
- Sai ETA.
- Copy nhầm dòng.
- Nhầm khách.
- Nhầm PO.
- Quên update status.
- Dán sai remark.

Trong logistics, một ký tự sai ở container number hoặc B/L number có thể làm mất nhiều thời gian truy vết.

### 6.3. Pain 3: Dữ liệu rải rác không có timeline

Một shipment có thể có đủ thông tin, nhưng nằm ở 10 nơi khác nhau.

Khi cần trả lời khách, người dùng không cần từng mảnh rời rạc. Họ cần timeline:

```text
Việc gì đã xảy ra?
Xảy ra lúc nào?
Nguồn nào xác nhận?
Việc gì còn mở?
Rủi ro là gì?
```

### 6.4. Pain 4: Không biết nguồn nào đáng tin

Ví dụ:

- Excel ghi ETA 10/06.
- Email hãng tàu mới báo ETA 12/06.
- Zalo Ops nói "hình như tàu delay".
- Portal carrier chưa cập nhật.

Nếu không có source và timestamp, CS không biết nên trả lời khách theo nguồn nào.

### 6.5. Pain 5: Handover kém vì dữ liệu nằm trong chat cá nhân

Nếu thông tin quan trọng nằm trong Zalo cá nhân hoặc ghi chú cá nhân, người khác không thể tiếp quản tốt.

Đây là rủi ro vận hành lớn nhưng thường bị xem nhẹ cho đến khi nhân sự nghỉ, bệnh, đổi ca hoặc nghỉ việc.

### 6.6. Pain 6: Không audit được ai cập nhật gì

Nếu file Excel được nhiều người sửa, hoặc status được gửi qua chat, khó biết:

- Ai cập nhật.
- Cập nhật lúc nào.
- Dựa vào nguồn nào.
- Ai đã gửi khách.
- Khách đã xác nhận chưa.

Khi có tranh chấp, thiếu audit trail làm doanh nghiệp yếu thế.

### 6.7. Pain 7: File chứng từ khó tìm

Chứng từ thường nằm ở:

- Email attachment.
- Drive folder.
- Zalo image.
- Máy cá nhân.
- Folder scan.

Nếu không gắn với shipment, mỗi lần tìm lại mất thời gian.

### 6.8. Pain 8: Bảo mật yếu

Khi dùng file thủ công, rủi ro bảo mật gồm:

- Gửi nhầm file cho khách.
- File chứa thông tin khách khác.
- Nhân viên nghỉ nhưng vẫn giữ file.
- Zalo cá nhân chứa dữ liệu công ty.
- Link Google Sheet public hoặc chia sẻ quá rộng.
- Không có phân quyền theo khách/shipment.

---

## 7. Phân khúc nên khảo sát

### 7.1. CS/Ops forwarder

Đây là nhóm cần khảo sát đầu tiên.

Cần hỏi:

- File tracking hiện tại gồm cột nào?
- Ai cập nhật?
- Mỗi ngày cập nhật bao nhiêu lần?
- Thông tin nào lấy từ email?
- Thông tin nào lấy từ Zalo?
- Khi khách hỏi, có dùng file đó làm nguồn chính không?

### 7.2. Documentation staff

Documentation staff biết chứng từ nằm ở đâu và hay sai ở đâu.

Cần hỏi:

- Chứng từ lưu trong folder/email/phần mềm nào?
- Có checklist chứng từ không?
- File scan đặt tên như thế nào?
- Có hay thiếu/sai bản mới nhất không?
- Có phải gửi đi gửi lại chứng từ qua email/Zalo không?

### 7.3. Trucking coordinator

Trucking coordinator là nguồn dữ liệu chat/manual update rất lớn.

Cần hỏi:

- Tài xế cập nhật qua app, Zalo hay điện thoại?
- Ảnh POD/EIR nằm ở đâu?
- Có file điều xe không?
- Có dùng GPS không?
- Khi CS hỏi status, mất bao lâu để trả lời?

### 7.4. Kế toán logistics

Kế toán cần dữ liệu phí và bằng chứng.

Cần hỏi:

- Vendor invoice nhận qua email hay file?
- Có cost sheet theo shipment không?
- Phí phát sinh được báo qua đâu?
- Có tình trạng thiếu chứng từ để đối soát không?
- Có cần export từ Agentify sang kế toán không?

### 7.5. Quản lý vận hành

Quản lý cần nhìn rủi ro hệ thống.

Cần hỏi:

- Có bao nhiêu file tracking khác nhau?
- Có quy chuẩn đặt mã shipment/file không?
- Có ai kiểm soát version file không?
- Có KPI cập nhật dữ liệu không?
- Có từng mất khách/thiệt hại do dữ liệu sai hoặc chậm không?

### 7.6. IT/Admin

IT/Admin giúp đánh giá khả thi tích hợp.

Cần hỏi:

- Công ty dùng Google Workspace hay Microsoft 365?
- Email server là gì?
- Có SharePoint/OneDrive/Google Drive không?
- Có policy cho việc đọc email/file không?
- Có thể tạo mailbox chung để forward email vào Agentify không?
- Có dùng Zalo OA/Zalo Cloud không?
- Có yêu cầu lưu trữ dữ liệu tại Việt Nam không?

---

## 8. Product map hiện tại

### 8.1. Excel và Google Sheet

Đây là công cụ nền tảng.

Điểm mạnh:

- Rẻ.
- Linh hoạt.
- Dễ dùng.
- Dễ chia sẻ.
- Dễ tùy chỉnh theo khách.
- Người dùng đã quen.

Điểm yếu:

- Không tự hiểu logistics.
- Không tự tạo timeline.
- Không tự cảnh báo exception nếu không setup phức tạp.
- Không đọc email/Zalo/file.
- Khó audit.
- Dễ sai version.

### 8.2. Microsoft 365 Copilot

Microsoft 365 Copilot tích hợp trong Outlook, Excel, Word, Teams và các ứng dụng Microsoft 365. Microsoft mô tả Copilot là công cụ AI dùng dữ liệu trong Microsoft Graph và ứng dụng Microsoft 365 để hỗ trợ năng suất, phân tích dữ liệu và soạn thảo.

Điểm mạnh:

- Nằm trong bộ công cụ doanh nghiệp đã dùng.
- Có thể hỗ trợ Excel, Outlook, Teams.
- Có nền tảng bảo mật enterprise.
- Có khả năng summary, draft, phân tích dữ liệu.

Điểm yếu/cửa hẹp cho Agentify:

- Không được thiết kế riêng cho shipment/container/PO/free time/D&O/logistics exception.
- Không tự biết một email arrival notice cần tạo mốc nào trong shipment timeline.
- Không có rule đặc thù logistics Việt Nam.
- Người dùng vẫn phải tự tổ chức dữ liệu logistics.

### 8.3. Google Workspace Gemini

Google Workspace Gemini hỗ trợ Gmail, Docs, Sheets, Drive và các công cụ Google Workspace.

Điểm mạnh:

- Phù hợp doanh nghiệp dùng Gmail/Drive/Sheets.
- Có thể hỗ trợ viết email, tóm tắt, tìm file, xử lý sheet.
- Người dùng không cần rời môi trường Google.

Điểm yếu/cửa hẹp:

- Không phải logistics workflow engine.
- Không có shipment object, exception inbox, handover logistics.
- Không tự chuẩn hóa dữ liệu container/PO/chứng từ.
- Cần lớp nghiệp vụ logistics bên trên.

### 8.4. Zalo OA/Zalo Cloud

Zalo OA/Zalo Cloud cung cấp kênh doanh nghiệp để gửi thông báo, chăm sóc khách hàng và tích hợp API.

Điểm mạnh:

- Phù hợp hành vi giao tiếp Việt Nam.
- Có thể hỗ trợ thông báo khách hàng.
- Có API và các loại tin nhắn doanh nghiệp.
- Có thể dùng cho customer engagement nếu triển khai đúng.

Điểm yếu/cửa hẹp:

- Không quản lý shipment.
- Không tạo timeline.
- Không hiểu trạng thái logistics.
- Không xử lý chứng từ/Excel/email.
- Rủi ro nếu tự động gửi sai thông tin.

### 8.5. Document AI/OCR

Các công cụ như Azure AI Document Intelligence, Google Document AI, ABBYY hoặc OCR nội bộ có thể đọc file/ảnh.

Điểm mạnh:

- Đọc PDF/scan/ảnh tốt hơn nhập tay.
- Hữu ích với invoice, packing list, B/L, POD, EIR.
- Có thể giảm copy/paste.

Điểm yếu/cửa hẹp:

- OCR chỉ đọc chữ, không tự hiểu workflow.
- Cần data matching để gắn đúng shipment.
- Cần rule logistics để biết thông tin nào quan trọng.
- Ảnh chụp không rõ có thể đọc sai.

### 8.6. RPA/no-code automation

RPA hoặc no-code tools có thể tự động hóa thao tác lặp lại:

- Đọc email.
- Tải attachment.
- Cập nhật sheet.
- Gửi thông báo.

Điểm mạnh:

- Có thể tự động hóa nhanh một số bước.
- Không cần thay hệ thống.
- Hữu ích với quy trình ổn định.

Điểm yếu/cửa hẹp:

- Dễ vỡ nếu màn hình/quy trình thay đổi.
- Không hiểu ngữ cảnh sâu.
- Không tạo insight nếu dữ liệu lộn xộn.
- Cần cấu hình riêng cho từng khách/quy trình.

### 8.7. Core logistics systems

Các hệ thống như CargoWise, Magaya, GoFreight, Winta, TMS, WMS, ERP có thể chứa dữ liệu chính.

Điểm mạnh:

- Có cấu trúc nghiệp vụ.
- Có mã shipment/job.
- Có workflow chuyên ngành.

Điểm yếu/cửa hẹp:

- Không phải mọi công ty đều dùng.
- Không phải mọi dữ liệu đều được nhập vào.
- Email/Zalo/file vẫn nằm ngoài.
- Triển khai tích hợp sâu tốn thời gian.

---

## 9. Đối thủ và sản phẩm liên quan

### 9.1. Microsoft Excel/Google Sheet

Đây không phải "đối thủ phần mềm" theo nghĩa truyền thống, nhưng là đối thủ adoption lớn nhất.

Điểm mạnh:

- Người dùng đã quen.
- Không cần mua thêm nếu đã có.
- Linh hoạt cực cao.
- Dễ tạo report cho từng khách.
- Không cần đổi quy trình ngay.

Điểm yếu:

- Không tự động tạo shipment timeline.
- Không đọc được email/Zalo/file.
- Không kiểm soát version tốt nếu dùng sai cách.
- Không tự nhắc follow-up.
- Không có AI logistics-specific.
- Không có audit trail nghiệp vụ đủ mạnh.

Hàm ý cho Agentify:

- Agentify không nên bắt người dùng bỏ Excel ngay.
- Agentify nên import từ Excel, đồng bộ với Sheet, và xuất report ngược lại nếu cần.
- Tư duy đúng là "Excel-in, insight-out" trong MVP.

### 9.2. Microsoft 365 Copilot

Điểm mạnh:

- Tích hợp Outlook/Excel/Teams.
- Có nền tảng enterprise.
- Có thể tóm tắt email, hỗ trợ Excel, tạo draft.
- Phù hợp doanh nghiệp đã dùng Microsoft 365.

Điểm yếu:

- Không có domain model logistics mặc định.
- Không biết shipment lifecycle.
- Không có exception inbox theo container/free time/customs/trucking.
- Không tạo customer status report logistics nếu không có cấu trúc dữ liệu chuẩn.

Hàm ý cho Agentify:

- Copilot có thể là công cụ nền, nhưng Agentify cần thắng bằng logistics workflow và dữ liệu chuyên ngành.
- Sau này có thể tích hợp Microsoft Graph/Outlook/Excel thay vì cạnh tranh trực tiếp.

### 9.3. Google Workspace Gemini

Điểm mạnh:

- Hỗ trợ Gmail, Drive, Sheets.
- Phù hợp doanh nghiệp dùng Google Workspace.
- Có thể giúp viết email, tóm tắt file, làm việc với Sheet.

Điểm yếu:

- Không có logistics exception taxonomy.
- Không biết chứng từ nào cần cho shipment nào.
- Không có handover theo shipment.
- Không tạo audit trail vận hành logistics.

Hàm ý cho Agentify:

- Agentify có thể bắt đầu bằng Google Sheet/Gmail integration cho khách SME.
- Cần layer nghiệp vụ logistics bên trên Gemini/Workspace.

### 9.4. Zalo/Zalo OA/Zalo Cloud

Điểm mạnh:

- Độ phổ biến cao tại Việt Nam.
- Phù hợp trao đổi nhanh.
- Có kênh OA/API cho doanh nghiệp.
- Tốt cho notification và customer interaction.

Điểm yếu:

- Dữ liệu dễ nằm trong tài khoản cá nhân.
- Không có shipment data model.
- Không có workflow logistics.
- Không tự phân loại chứng từ/ảnh.
- Tích hợp tin nhắn cá nhân có rủi ro privacy/compliance.

Hàm ý cho Agentify:

- Zalo là nguồn/kênh cực quan trọng, nhưng phải xử lý thận trọng.
- MVP không nên phụ thuộc vào đọc toàn bộ Zalo cá nhân.
- Nên hỗ trợ copy/paste update, upload ảnh, hoặc tích hợp OA/API khi có consent.

### 9.5. Generic OCR/Document AI

Điểm mạnh:

- Đọc file/ảnh nhanh.
- Giảm nhập liệu.
- Có thể dùng cho invoice, POD, EIR, B/L, arrival notice.

Điểm yếu:

- Không biết nghiệp vụ nếu đứng một mình.
- Cần rule ghép shipment.
- Cần con người duyệt khi confidence thấp.

Hàm ý cho Agentify:

- OCR là năng lực nền, không phải sản phẩm cuối.
- Giá trị của Agentify nằm ở việc biến OCR output thành status event, checklist, exception và reply draft.

### 9.6. RPA/no-code tools

Điểm mạnh:

- Tự động hóa thao tác lặp lại.
- Có thể làm nhanh cho quy trình hẹp.

Điểm yếu:

- Khó scale nếu mỗi khách/quy trình khác nhau.
- Không linh hoạt khi dữ liệu nhập không chuẩn.
- Không tự hiểu nội dung.

Hàm ý cho Agentify:

- Agentify nên dùng automation ở mức nền, nhưng không định vị là RPA.
- Nên định vị là AI workflow copilot cho logistics.

### 9.7. Forwarding software/TMS/WMS/ERP

Điểm mạnh:

- Có dữ liệu cấu trúc nếu được nhập đầy đủ.
- Là hệ thống chính của doanh nghiệp.

Điểm yếu:

- Email/Zalo/file vẫn ở ngoài.
- Nhân viên vẫn dùng Excel để đáp ứng yêu cầu riêng của khách.
- Tích hợp sâu mất thời gian.

Hàm ý cho Agentify:

- Giai đoạn đầu nên lấy dữ liệu từ export file thay vì tích hợp API toàn diện.
- Sau khi chứng minh giá trị, tích hợp sâu theo từng khách lớn.

---

## 10. Cơ hội sản phẩm cho Agentify

### 10.1. Khoảng trống chính

Khoảng trống là:

> Dữ liệu logistics thật đang nằm trong Excel, email, Zalo và file thủ công, nhưng chưa có lớp nào đủ nhẹ để biến chúng thành shipment timeline, exception inbox và câu trả lời khách có nguồn dẫn.

Các phần mềm lớn có thể yêu cầu dữ liệu phải vào hệ thống trước. Nhưng thực tế SME thường chưa làm được điều đó.

Agentify có thể bắt đầu từ nơi dữ liệu đang sống.

### 10.2. Định vị đề xuất

Tên định vị:

```text
Agentify Manual Data-to-Logistics Timeline
```

Hoặc dễ hiểu hơn:

```text
Agentify Logistics Data Intake Copilot
```

Mô tả một câu:

> Agentify đọc file tracking, email, chứng từ và cập nhật thủ công để tự tạo timeline shipment, phát hiện dữ liệu thiếu/mâu thuẫn, gom bằng chứng và hỗ trợ CS/Ops trả lời khách.

### 10.3. Agentify nên làm gì

Agentify nên:

- Import Excel/Google Sheet.
- Chuẩn hóa cột dữ liệu shipment.
- Đọc email được forward vào mailbox chung.
- Trích xuất attachment.
- OCR file/ảnh chứng từ.
- Gợi ý match vào shipment/container/PO.
- Tạo timeline event.
- Gắn source/evidence.
- Phát hiện missing data.
- Phát hiện conflict giữa các nguồn.
- Tạo AI status summary.
- Soạn nháp reply.
- Tạo handover.
- Xuất report lại ra Excel/PDF/email nếu cần.

### 10.4. Agentify không nên làm trong MVP

Agentify không nên:

- Đọc toàn bộ mailbox cá nhân không giới hạn.
- Đọc Zalo cá nhân khi chưa có consent và chính sách rõ.
- Tự gửi thông tin cho khách không qua duyệt.
- Tự kết luận nguồn nào đúng nếu dữ liệu mâu thuẫn mà không có rule.
- Tự sửa file gốc mà không có audit.
- Bắt người dùng bỏ Excel ngay.
- Yêu cầu tích hợp API sâu trước khi có pilot.

### 10.5. Vì sao đây là cơ hội tốt

Lý do:

- Đây là pain thật, xảy ra hằng ngày.
- Không phụ thuộc ngay vào API khó.
- Có thể pilot nhanh với dữ liệu hiện có.
- Có thể tạo giá trị cho Cụm 8 ngay.
- Có thể mở rộng sang chứng từ, trucking, kho, chi phí.
- Có thể chứng minh ROI bằng thời gian tiết kiệm và lỗi giảm.

---

## 11. MVP đề xuất

### 11.1. Tên MVP

```text
Agentify Logistics Intake & Timeline Copilot
```

### 11.2. ICP ưu tiên

ICP:

> Forwarder/3PL vừa và nhỏ tại Việt Nam, đang dùng Excel/Google Sheet để tracking shipment, email để nhận chứng từ/thông báo, Zalo để cập nhật nhanh với trucking/kho/khách, và chưa có hệ thống end-to-end đủ mạnh.

Luồng ưu tiên:

```text
Sea import FCL
```

Lý do:

- Dữ liệu nhiều nhưng có cấu trúc tương đối rõ.
- Có container number làm key tốt.
- Có nhiều chứng từ/email/status cần gom.
- Có nhiều câu hỏi khách.
- Có free time/DEM/DET nên exception có giá trị.

### 11.3. Nguồn dữ liệu MVP

Nguồn dữ liệu nên hỗ trợ trong 4-8 tuần đầu:

1. Excel/Google Sheet import.
2. Email forward vào mailbox chung.
3. Upload PDF/ảnh chứng từ.
4. Manual status update form.
5. Copy/paste Zalo update vào shipment.
6. Upload ảnh POD/EIR từ máy/điện thoại.

Chưa cần:

- Tích hợp API toàn bộ carrier/cảng/hải quan.
- Đọc trực tiếp toàn bộ Zalo cá nhân.
- Tự đồng bộ hai chiều với TMS/WMS/ERP.

### 11.4. Tính năng MVP

#### Tính năng 1: Excel/Sheet importer

Người dùng upload file tracking.

Agentify:

- Nhận diện cột.
- Gợi ý mapping cột.
- Chuẩn hóa dữ liệu.
- Tạo shipment records.
- Cảnh báo dòng thiếu key.

Ví dụ mapping:

| Cột trong file khách | Cột chuẩn Agentify |
|---|---|
| Cont No | Container number |
| ETA Cat Lai | ETA |
| Tờ khai | Customs status |
| Truck note | Trucking status |
| Remark | Internal note |

#### Tính năng 2: Shared email intake

Công ty tạo email như:

```text
ops-intake@company.com
```

Hoặc forward email quan trọng vào Agentify.

Agentify:

- Đọc subject/body.
- Tải attachment.
- Tìm container/job/PO/B/L.
- Gợi ý shipment liên quan.
- Tạo timeline event.

#### Tính năng 3: Document/evidence upload

Người dùng upload:

- Arrival notice.
- D/O.
- POD.
- GRN.
- EIR.
- Invoice.
- Packing list.
- B/L.

Agentify:

- OCR/trích xuất dữ liệu.
- Gắn vào shipment.
- Tạo checklist.
- Hiển thị evidence khi trả lời khách.

#### Tính năng 4: Manual update form

Form đơn giản:

```text
Shipment/container:
Status type:
Status note:
Time:
Source:
Attachment:
Next action:
Follow-up time:
```

Mục tiêu là biến cập nhật thủ công thành dữ liệu có cấu trúc.

#### Tính năng 5: Conflict detection

Agentify phát hiện mâu thuẫn:

```text
Excel ETA: 10/06
Email hãng tàu ETA: 12/06
```

Hệ thống không tự chọn bừa. Nó hiển thị:

```text
Dữ liệu ETA đang mâu thuẫn. Email hãng tàu ngày 08/06 báo ETA mới 12/06, trong khi file tracking vẫn ghi 10/06. Cần xác nhận và cập nhật file/report.
```

#### Tính năng 6: Missing data checklist

Agentify cảnh báo thiếu:

- Thiếu container number.
- Thiếu ETA.
- Thiếu D/O status.
- Thiếu customs status.
- Thiếu truck booking.
- Thiếu POD/GRN.
- Thiếu next update time.

#### Tính năng 7: Timeline builder

Từ Excel/email/file/manual update, Agentify tạo timeline:

```text
Booking confirmed
ETA updated
Arrival notice received
D/O pending
Customs cleared
Truck booked
Container picked up
Delivered
POD received
Empty returned
```

#### Tính năng 8: Source-linked AI summary

Summary luôn kèm nguồn:

```text
Theo email arrival notice ngày 08/06 và file tracking cập nhật 09/06 10:20, container ABCU1234567 đã đến Cát Lái. D/O đang pending local charges. Chưa thấy evidence thông quan trong dữ liệu hiện tại.
```

#### Tính năng 9: Export/report back to Excel/email

Vì người dùng vẫn cần Excel/email, Agentify nên xuất:

- Customer status report.
- Exception report.
- Handover report.
- Missing data report.
- Shipment timeline PDF/Excel.

### 11.5. Màn hình MVP tối thiểu

MVP cần 6 màn hình:

1. Import Excel/Sheet.
2. Email/file intake inbox.
3. Shipment matching review.
4. Shipment timeline.
5. Missing/conflict dashboard.
6. Export/report composer.

---

## 12. Ví dụ hoạt động cụ thể của Agentify

### Ví dụ 1: Import file tracking để tạo timeline

Bối cảnh:

- Forwarder có file `Import_Tracking_June.xlsx`.
- File có 120 dòng container.
- Mỗi dòng có ETA, D/O status, customs status, truck status, remark.
- CS đang dùng file này để trả lời khách.

Cách làm thủ công:

1. CS lọc theo khách.
2. Đọc từng dòng.
3. Tự viết status.
4. Tự nhớ dòng nào cần follow-up.
5. Copy report gửi email.

Cách Agentify hỗ trợ:

1. User upload file.
2. Agentify nhận diện các cột.
3. Agentify hỏi user xác nhận mapping.
4. Agentify tạo 120 shipment/container records.
5. Agentify phát hiện:

```text
15 container thiếu D/O status
8 container ETA đã qua nhưng chưa có arrival status
6 container delivered nhưng chưa có POD
3 container sắp hết free time
```

6. Agentify tạo report cho CS:

```text
Khách ABC có 12 container:
- 8 container on track
- 2 container cần follow D/O
- 1 container thiếu POD
- 1 container có rủi ro detention
```

Giá trị:

- Không bắt khách bỏ Excel.
- Biến Excel thành dashboard/timeline.
- Chỉ yêu cầu CS xử lý exception.

### Ví dụ 2: Email arrival notice tự gắn vào shipment

Bối cảnh:

- Hãng tàu gửi email arrival notice.
- Email có attachment PDF.
- Trong PDF có container number, vessel/voyage, ETA, local charges.
- CS phải cập nhật file tracking.

Cách làm thủ công:

1. Mở email.
2. Tải PDF.
3. Đọc ETA/container.
4. Tìm dòng trong Excel.
5. Copy ETA/local charges/D/O note.
6. Lưu PDF vào folder.

Cách Agentify hỗ trợ:

1. Email được forward vào Agentify.
2. Agentify đọc subject/body/PDF.
3. Agentify trích:

```text
Container: ABCU1234567
Vessel: MAERSK HANOI
ETA: 12/06
Local charges: pending
```

4. Agentify match container vào shipment.
5. Agentify tạo timeline event:

```text
Arrival notice received - source: email from carrier, 09/06 14:22
```

6. Agentify cảnh báo:

```text
File tracking đang ghi ETA 10/06, arrival notice mới ghi ETA 12/06. Cần cập nhật report khách.
```

Giá trị:

- Giảm copy/paste.
- Giảm sai ETA.
- Có evidence gắn vào timeline.

### Ví dụ 3: Zalo update từ tài xế được biến thành status có cấu trúc

Bối cảnh:

- Tài xế gửi Zalo cho điều phối:

```text
Xe 51C-xxx đã giao cont ABCU1234567 tại kho Bình Dương lúc 15h20, gửi ảnh POD.
```

- Điều phối gửi ảnh POD trong nhóm.
- CS cần báo khách và lưu bằng chứng.

Cách làm MVP không cần đọc Zalo tự động:

1. Điều phối copy tin nhắn hoặc upload ảnh vào Agentify.
2. Agentify nhận diện container `ABCU1234567`.
3. Agentify OCR ảnh POD nếu có.
4. Agentify tạo event:

```text
Delivered to warehouse - 15:20 - source: trucking update
POD uploaded
```

5. Agentify soạn nháp:

```text
Chị ơi, container ABCU1234567 đã giao tại kho Bình Dương lúc 15:20 hôm nay. Em gửi kèm POD để chị đối chiếu.
```

Giá trị:

- Không cần truy cập toàn bộ Zalo cá nhân.
- Vẫn lấy được dữ liệu quan trọng.
- Có evidence và audit trail.

### Ví dụ 4: Dữ liệu mâu thuẫn giữa Excel và email

Bối cảnh:

- Excel ghi customs status: "cleared".
- Email broker mới gửi: "Tờ khai đang chờ kiểm hóa".
- CS chuẩn bị báo khách hàng đã thông quan.

Agentify phát hiện:

```text
Conflict detected:
- Excel update 09/06 09:00: Customs cleared
- Email broker 09/06 10:15: Pending inspection
```

Agentify gợi ý:

```text
Không nên báo khách là đã thông quan. Cần xác nhận lại với broker. Nháp trả lời an toàn: "Tờ khai đang được broker xác nhận lại, em sẽ cập nhật status chính xác trước 14:00."
```

Giá trị:

- Giảm rủi ro trả lời sai.
- Tăng trust vì AI không tự suy đoán.
- Giúp CS dùng câu trả lời thận trọng.

---

## 13. Câu hỏi phỏng vấn định tính

### 13.1. Câu hỏi về Excel/Google Sheet

1. Công ty có file tracking chung không?
2. File tracking đang là Excel local, Google Sheet hay OneDrive/SharePoint?
3. Ai là người cập nhật file?
4. Bao lâu cập nhật một lần?
5. File có những cột nào?
6. Có quy chuẩn đặt mã shipment/container/PO không?
7. Có từng bị sai version file không?
8. Có từng gửi nhầm file cho khách không?
9. Có cột "next action" hoặc "PIC" không?
10. Có cột "last update" không?
11. Có ai kiểm tra chất lượng dữ liệu trong file không?
12. Có muốn Agentify import file hiện tại mà không bắt đổi format ngay không?

### 13.2. Câu hỏi về email

1. Loại thông tin nào thường nằm trong email?
2. Email quan trọng có được forward vào mailbox chung không?
3. Attachment có được lưu vào folder riêng không?
4. Có quy chuẩn subject email theo shipment/container không?
5. Khi cần tìm lại chứng từ, mất bao lâu?
6. Có từng bỏ sót email delay/arrival notice/invoice không?
7. Có chấp nhận tạo mailbox chung để Agentify đọc email được forward không?
8. Có yêu cầu bảo mật nào khi AI đọc email không?

### 13.3. Câu hỏi về Zalo/WhatsApp/chat

1. Zalo được dùng cho những nghiệp vụ nào?
2. Dữ liệu quan trọng nào chỉ nằm trong Zalo?
3. Tin nhắn nằm trong nhóm chung hay tài khoản cá nhân?
4. Ảnh POD/EIR/seal/container được gửi qua đâu?
5. Khi người phụ trách nghỉ, người khác có truy cập được lịch sử chat không?
6. Có dùng Zalo OA/Zalo Cloud không?
7. Có chấp nhận copy/paste tin nhắn quan trọng vào Agentify không?
8. Có chấp nhận upload ảnh từ Zalo vào Agentify không?
9. Có lo ngại gì nếu Agentify đọc Zalo tự động?

### 13.4. Câu hỏi về file/chứng từ

1. Chứng từ lưu ở đâu?
2. Cách đặt tên file như thế nào?
3. Có folder theo shipment không?
4. Có biết bản nào là bản mới nhất không?
5. Có file scan/ảnh nào khó đọc không?
6. Có cần OCR không?
7. File nào quan trọng nhất để tạo status?

### 13.5. Câu hỏi về bảo mật và quyền riêng tư

1. Ai được xem dữ liệu của từng khách?
2. Có thông tin chi phí nào không được gửi cho khách không?
3. Có policy về dùng AI với email/chứng từ không?
4. Có cần dữ liệu lưu trong nước không?
5. Có cần audit log không?
6. Có cần xóa dữ liệu theo yêu cầu khách không?
7. Công ty có chấp nhận AI xử lý file nếu không dùng dữ liệu để train model không?

---

## 14. Survey định lượng đề xuất

### 14.1. Mức độ phụ thuộc vào công cụ thủ công

1. Công ty bạn dùng công cụ nào để tracking shipment?
   - Excel local
   - Google Sheet
   - OneDrive/SharePoint Excel
   - TMS/forwarding software
   - WMS/ERP
   - Khác

2. Mức độ phụ thuộc vào Excel/Sheet?
   - Không dùng
   - Dùng ít
   - Dùng song song với phần mềm
   - Dùng làm nguồn chính
   - Gần như toàn bộ tracking nằm trong Excel/Sheet

3. Một shipment thường có dữ liệu nằm ở bao nhiêu nơi?
   - 1 nơi
   - 2-3 nơi
   - 4-5 nơi
   - Trên 5 nơi

### 14.2. Email/Zalo/file

4. Thông tin shipment quan trọng có nằm trong email không?
   - Không
   - Có, một phần
   - Có, phần lớn

5. Thông tin shipment quan trọng có nằm trong Zalo/WhatsApp không?
   - Không
   - Có, một phần
   - Có, phần lớn

6. Ảnh POD/EIR/chứng từ thường nằm ở đâu?
   - Email
   - Zalo
   - Drive/OneDrive
   - TMS/WMS
   - Máy cá nhân
   - Khác

### 14.3. Pain

7. Bạn gặp lỗi sai version file bao nhiêu lần/tháng?
   - 0
   - 1-2
   - 3-5
   - 6-10
   - Trên 10

8. Bạn mất bao lâu để tìm lại một chứng từ/bằng chứng?
   - Dưới 2 phút
   - 2-5 phút
   - 6-10 phút
   - 11-20 phút
   - Trên 20 phút

9. Mức độ đau của việc copy/paste dữ liệu giữa nhiều app?
   - 1: Không đau
   - 2
   - 3
   - 4
   - 5: Rất đau

10. Có từng trả lời khách sai/chậm vì dữ liệu trong file/email/Zalo không đồng bộ không?
   - Chưa từng
   - Có, hiếm
   - Có, thỉnh thoảng
   - Có, thường xuyên

### 14.4. Nhu cầu Agentify

11. Bạn có muốn Agentify import file tracking hiện tại không?
   - Có
   - Không
   - Chưa chắc

12. Bạn có muốn forward email vào Agentify để tự tạo timeline không?
   - Có
   - Không
   - Chưa chắc

13. Bạn có muốn upload ảnh/PDF để Agentify đọc và gắn vào shipment không?
   - Có
   - Không
   - Chưa chắc

14. Bạn có chấp nhận Agentify đọc Zalo tự động không?
   - Có, nếu qua Zalo OA/API và có consent
   - Chỉ chấp nhận copy/paste/upload thủ công
   - Không
   - Chưa chắc

15. Tính năng nào quan trọng nhất?
   - Import Excel/Sheet
   - Email intake
   - OCR chứng từ/ảnh
   - Shipment matching
   - Conflict detection
   - Missing data checklist
   - Timeline builder
   - Export report

---

## 15. Data readiness checklist cho pilot

Trước khi pilot Agentify, cần kiểm tra doanh nghiệp có dữ liệu tối thiểu không.

### 15.1. Checklist dữ liệu bắt buộc

| Dữ liệu | Có/Không | Ghi chú |
|---|---|---|
| File tracking shipment/container |  |  |
| Container number hoặc job number |  |  |
| Customer name/code |  |  |
| ETA/ETD hoặc mốc chính |  |  |
| Current status/remark |  |  |
| PIC/person in charge |  |  |
| Email/chứng từ mẫu |  |  |
| Ít nhất 20-50 shipment thật |  |  |

### 15.2. Checklist dữ liệu nên có

| Dữ liệu | Lý do |
|---|---|
| D/O status | Quan trọng cho import FCL |
| Customs status | Biết hàng đã thông quan chưa |
| Trucking status | Biết lấy/giao container |
| Warehouse/POD status | Biết hàng đã giao/nhận chưa |
| Free time | Cảnh báo DEM/DET/storage |
| Next action | Biết ai cần làm gì |
| Last update timestamp | Biết dữ liệu mới hay cũ |

### 15.3. Checklist bảo mật

| Câu hỏi | Cần quyết định |
|---|---|
| Ai được upload file? | Role user |
| Ai được xem shipment của khách nào? | Permission |
| Có đọc email cá nhân không? | Nên tránh trong MVP |
| Có mailbox chung không? | Nên có |
| Có ingest Zalo không? | Chỉ khi consent rõ |
| Có lưu log AI summary không? | Nên có |
| Có dùng dữ liệu để train model không? | Nên cam kết không nếu phục vụ B2B |

---

## 16. Mô hình ROI sơ bộ

### 16.1. ROI giảm thời gian nhập liệu

Công thức:

```text
Giờ tiết kiệm/tháng
= số shipment/tháng
x số lần cập nhật thủ công/shipment
x phút copy-paste/lần
x tỷ lệ tự động hóa
/ 60
```

Ví dụ:

```text
300 shipment/tháng
x 5 lần cập nhật thủ công/shipment
x 3 phút/lần
x 50%
/ 60
= 37,5 giờ/tháng
```

### 16.2. ROI giảm thời gian tìm chứng từ

Công thức:

```text
Giờ tiết kiệm/tháng
= số lần tìm chứng từ/tháng
x phút tìm/lần
x tỷ lệ giảm
/ 60
```

Ví dụ:

```text
200 lần/tháng
x 8 phút/lần
x 60%
/ 60
= 16 giờ/tháng
```

### 16.3. ROI giảm lỗi

Lỗi có thể giảm:

- Trả lời status theo file cũ.
- Bỏ sót email delay.
- Gửi thiếu POD.
- Không cập nhật ETA mới.
- Không biết D/O pending.
- Không phát hiện dữ liệu mâu thuẫn.

ROI không chỉ là giờ tiết kiệm, mà còn là tránh phí phát sinh và giảm mất uy tín.

### 16.4. ROI tăng khả năng scale

Nếu Agentify giúp một CS xử lý nhiều shipment hơn mà không tăng lỗi, doanh nghiệp có thể tăng volume mà chưa cần tuyển thêm người.

Đây là ROI hấp dẫn với forwarder/3PL SME vì biên lợi nhuận thường bị áp lực.

---

## 17. Giả thuyết cần kiểm chứng

### 17.1. Giả thuyết về dữ liệu

1. Phần lớn forwarder/3PL SME vẫn có file tracking shipment/container.
2. File tracking có đủ key tối thiểu để tạo shipment timeline.
3. Email chứa nhiều event quan trọng hơn người dùng nghĩ.
4. Zalo chứa nhiều evidence vận hành nhưng khó ingest trực tiếp.
5. Manual update form là cách tốt để biến thông tin miệng/chat thành dữ liệu có cấu trúc.

### 17.2. Giả thuyết về pain

1. Sai version file và copy/paste sai là pain thật.
2. Tìm chứng từ/bằng chứng mất nhiều thời gian.
3. Handover kém chủ yếu vì dữ liệu nằm trong chat/email cá nhân.
4. Người dùng không cần một hệ thống mới phức tạp, họ cần lớp giúp dữ liệu hiện có có ích hơn.

### 17.3. Giả thuyết về sản phẩm

1. Import Excel/Sheet là entry point ít ma sát nhất.
2. Email intake tạo giá trị nhanh nếu có mailbox chung.
3. Conflict detection là tính năng giúp tạo trust.
4. Source-linked summary quan trọng hơn summary hay nhưng không có nguồn.
5. Export report ngược lại Excel/email giúp adoption tốt hơn.

### 17.4. Giả thuyết về bảo mật

1. Doanh nghiệp sẽ ngại cho AI đọc mailbox cá nhân.
2. Doanh nghiệp sẽ dễ chấp nhận mailbox chung hoặc email forward hơn.
3. Zalo tự động là vấn đề nhạy cảm; copy/paste/upload thủ công dễ chấp nhận hơn trong MVP.
4. Cam kết không dùng dữ liệu khách để train model là điều kiện quan trọng khi bán B2B.

---

## 18. Tính khả thi cho Agentify

### 18.1. Khả thi về dữ liệu

Khả thi cao nếu MVP đi từ dữ liệu sẵn có.

Nguồn dễ:

- Excel/Google Sheet.
- Email forward.
- PDF/ảnh upload.
- Manual update.
- Copy/paste từ Zalo.

Nguồn trung bình:

- Google Drive/OneDrive folder sync.
- Shared mailbox.
- Zalo OA/API.
- Export từ TMS/WMS/ERP.

Nguồn khó:

- Zalo cá nhân/nhóm không có consent.
- API cảng/hải quan/hãng tàu chưa chuẩn.
- Dữ liệu không có mã shipment/container.
- File quá lộn xộn hoặc không có owner.

### 18.2. Khả thi về kỹ thuật

Module kỹ thuật cần có:

- File import/mapping engine.
- Email parser.
- Attachment extractor.
- OCR/document extraction.
- Entity extraction: container, B/L, PO, job number.
- Shipment matching.
- Timeline event builder.
- Conflict detection.
- Missing data checklist.
- Source/evidence linking.
- Export/report generator.

Rủi ro kỹ thuật:

- File Excel mỗi khách một format.
- Email subject/body không chuẩn.
- Một email chứa nhiều shipment.
- Một shipment có nhiều container.
- Container number bị gõ sai.
- OCR ảnh chụp không rõ.
- Dữ liệu mâu thuẫn.

Cách giảm rủi ro:

- Cho user xác nhận mapping lần đầu.
- Lưu template mapping theo khách.
- Confidence score cho extraction/matching.
- Human review queue cho dữ liệu không chắc.
- Không tự ghi đè dữ liệu khi conflict.

### 18.3. Khả thi về adoption

Adoption tốt nếu Agentify:

- Không bắt đổi file tracking ngay.
- Không bắt nhập liệu lại.
- Import được file cũ.
- Tạo output dùng ngay cho CS/Ops.
- Cho xuất report theo format khách quen.
- Chỉ yêu cầu xử lý exception/mapping chưa chắc.

Adoption thấp nếu Agentify:

- Bắt đổi toàn bộ quy trình.
- Bắt điền form quá nhiều.
- Không đọc được file hiện tại.
- Không tạo được câu trả lời/report thực tế.

### 18.4. Rủi ro bảo mật/quyền riêng tư

Rủi ro lớn nhất của Cụm 9 là dữ liệu.

Agentify có thể đụng vào:

- Email khách hàng.
- Chứng từ thương mại.
- Giá/chi phí.
- Tin nhắn cá nhân.
- Thông tin tài xế.
- Ảnh chứng từ.
- Thông tin nhà cung cấp.

Cần thiết kế:

- Consent rõ.
- Role-based access.
- Audit log.
- Data retention policy.
- Không train model bằng dữ liệu khách nếu chưa được phép.
- Tách customer data.
- Mask dữ liệu nhạy cảm khi tạo reply.
- Human approval trước khi gửi ra ngoài.

### 18.5. Khả thi triển khai 4-8 tuần

Tuần 1-2:

- Lấy 3-5 file tracking thật.
- Thiết kế schema shipment tối thiểu.
- Làm Excel importer và column mapping.

Tuần 3-4:

- Làm shipment timeline.
- Làm manual update form.
- Làm file/evidence upload.

Tuần 5-6:

- Làm email forward intake.
- Làm extraction container/PO/B/L.
- Làm matching review.

Tuần 7-8:

- Làm conflict/missing data dashboard.
- Làm AI summary có nguồn.
- Làm export report.
- Pilot với 1 đội CS/Ops.

---

## 19. Kết luận sơ bộ Cụm 9

Cụm Excel, email, Zalo và file thủ công là cụm dữ liệu quan trọng nhất để triển khai MVP Agentify nhanh.

Kết luận chính:

1. Excel/email/Zalo/file thủ công không phải chỉ là "cách làm cũ", mà là hạ tầng vận hành thực tế của nhiều doanh nghiệp logistics SME.
2. Lý do chúng tồn tại là vì logistics có nhiều bên tham gia, nhiều hệ thống rời rạc, nhiều ngoại lệ, và yêu cầu cập nhật nhanh.
3. Agentify không nên chống lại Excel ngay. Nên bắt đầu bằng cách import Excel và biến nó thành timeline/exception/report.
4. Email là nguồn bằng chứng chính thức quan trọng, nên email intake qua mailbox chung hoặc forward email là hướng MVP khả thi.
5. Zalo là nguồn cập nhật nhanh rất quan trọng tại Việt Nam, nhưng phải xử lý thận trọng vì privacy. MVP nên ưu tiên copy/paste, upload ảnh, hoặc Zalo OA/API có consent.
6. Giá trị lớn nhất là biến dữ liệu rời rạc thành shipment timeline có nguồn, phát hiện dữ liệu thiếu/mâu thuẫn, và hỗ trợ Cụm 8 trả lời khách.
7. Rủi ro lớn nhất là bảo mật dữ liệu, quyền riêng tư, AI đọc sai hoặc match sai shipment. Cần human review, confidence score, audit log và permission rõ.

Đề xuất quyết định:

> Cụm 9 nên là nền tảng kỹ thuật đầu tiên của Agentify MVP. Nếu Cụm 8 là use case bán hàng chính, thì Cụm 9 là cách lấy dữ liệu ban đầu: Excel/Sheet import, shared email intake, file/evidence upload, manual update và source-linked timeline. Không nên chờ API sâu trước khi pilot.

---

## 20. Nguồn tham khảo

1. Tổng cục Thống kê. Press release on social-economic situation in the fourth quarter and 2025. https://www.nso.gov.vn/en/data-and-statistics/2026/01/press-release-social-economic-situation-in-the-fourth-quarter-and-2025/
2. Vietnam Logistics Portal. Vietnam Government approves logistics services development strategy towards 2035. https://logistics.gov.vn/vietnam-gov-t-approves-logistics-services-development-strategy-towards-2025
3. Vietnam Logistics Portal. Vietnam leads charge towards data-driven logistics future. https://logistics.gov.vn/technology/vietnam-leads-charge-towards-data-driven-logistics-future
4. Ministry of Industry and Trade. Digital Transformation Forum 2025. https://moit.gov.vn/en/news/latest-news/ministry-of-industry-and-trade-hosts-digital-transformation-forum-2025.html
5. DataReportal. Digital 2025: Vietnam. https://datareportal.com/reports/digital-2025-vietnam
6. VietnamNet. Zalo's number of users hits 78.3 million. https://vietnamnet.vn/en/zalo-s-number-of-users-hits-78-3-million-putting-telcos-at-pipeline-trap-2436470.html
7. Zalo Cloud. Bảng giá dịch vụ OA. https://zalo.cloud/oa/pricing
8. Zalo Cloud. Phân biệt các hình thức gửi thông báo từ Zalo Official Account. https://zalo.cloud/blog/phan-biet-cac-hinh-thuc-gui-thong-bao-tu-zalo-official-account/kgurdwaed9ynwgp9q
9. Microsoft Learn. Microsoft 365 Copilot service description. https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-platform-service-description/microsoft-365-copilot
10. Microsoft Support. Copilot in Excel. https://support.microsoft.com/en-us/office/edit-with-copilot-in-excel-a2fd6fe4-97ac-416b-b89a-22f4d1357c7a
11. Google Workspace. Gemini in Gmail. https://workspace.google.com/intl/en/products/gmail/ai/
12. Google Blog. Gemini is now available for Google Workspace customers. https://blog.google/products/workspace/google-gemini-workspace/
13. Azure AI Document Intelligence. https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence
14. Google Cloud Document AI. https://cloud.google.com/document-ai
15. ABBYY. Intelligent Document Processing. https://www.abbyy.com/
16. GoFreight. AI-Powered Freight Forwarding Software. https://gofreight.com/
17. GoFreight. Shipment Tracking & Operations Software. https://gofreight.com/product/shipment-tracking-operations/
18. Magaya. Digital Freight Forwarding Platform. https://www.magaya.com/digital-freight-portal/
19. CargoWise. Centralize global logistics operations on a single platform. https://www.cargowise.com/
20. Winta Logistics. Phần mềm quản lý logistics. https://www.winta.com.vn/phan-mem-quan-ly-logistics.html

---

## 21. Tóm tắt compact sau Cụm 9

Đã hoàn thành research Cụm 9: Excel, email, Zalo và file thủ công.

Insight chính:

- Cụm 9 là data layer thực tế của logistics SME tại Việt Nam. Nhiều doanh nghiệp vẫn vận hành shipment qua Excel/Google Sheet, email, Zalo, Drive/OneDrive, ảnh chụp màn hình, file scan và ghi chú cá nhân.
- Excel tồn tại vì linh hoạt, rẻ, dễ đổi cột theo khách và không cần triển khai IT. Nhưng nó gây pain về sai version, copy/paste sai, thiếu audit, thiếu timeline và khó handover.
- Email là nguồn bằng chứng chính thức: booking, arrival notice, D/O instruction, chứng từ, debit note, delay notice, claim. Nhưng email thread dài và attachment rời rạc nên khó biến thành status nhanh.
- Zalo là nguồn cập nhật nhanh đặc thù Việt Nam: trucking update, ảnh POD/EIR, xác nhận kho/cảng, hỏi nhanh nội bộ/khách. Nhưng Zalo cá nhân/nhóm có rủi ro privacy và khó audit.
- File thủ công/ảnh scan/screenshot là bằng chứng vận hành quan trọng nhưng không tự đi vào TMS/WMS/ERP.
- Đối thủ/liên quan quan trọng: Excel/Google Sheet, Microsoft 365 Copilot, Google Workspace Gemini, Zalo OA/Zalo Cloud, OCR/Document AI, RPA/no-code, forwarding software/TMS/WMS/ERP.
- Agentify không nên bắt người dùng bỏ Excel ngay. Nên bắt đầu bằng import Excel/Sheet, shared email intake, document/evidence upload, manual update form, copy/paste Zalo update.
- Cơ hội sản phẩm: Agentify Logistics Intake & Timeline Copilot. Nhiệm vụ là biến dữ liệu rời rạc thành shipment timeline có nguồn, phát hiện missing/conflict data, và tạo AI summary/reply cho Cụm 8.
- MVP nên bắt đầu với sea import FCL, vì có container number làm key, nhiều email/chứng từ/status, nhiều exception và nhiều câu hỏi khách.
- Rủi ro chính: AI match sai shipment, đọc sai OCR, tự kết luận khi dữ liệu mâu thuẫn, lộ dữ liệu nhạy cảm, ingest email/Zalo không có consent. Cần confidence score, human review, audit log, role permission và source-linked summary.

Khuyến nghị sau cụm này:

- Chọn Cụm 8 làm use case bán hàng chính: CS/Ops trả lời khách.
- Chọn Cụm 9 làm data ingestion foundation: Excel/email/file/manual update.
- Các cụm 1-7 là domain event/exception library để Agentify hiểu shipment và cảnh báo đúng.
- MVP không nên đợi API sâu. Pilot nhanh bằng file tracking thật, email forward, upload chứng từ và manual update.
