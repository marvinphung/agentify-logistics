# Khảo sát thị trường Logistics công nghiệp / B2B / Xuất nhập khẩu

## 0. Mục tiêu khảo sát

Mục tiêu của khảo sát này là tìm hiểu nhu cầu thật của thị trường logistics công nghiệp, B2B và xuất nhập khẩu tại Việt Nam.

Cụ thể, cần trả lời các câu hỏi:

1. Một lô hàng từ A → B đang đi qua những layer nào?
2. Mỗi layer đang dùng hệ thống/app/phần mềm gì?
3. Ai là người dùng chính của từng hệ thống?
4. Dữ liệu nằm ở đâu?
5. Khi khách hỏi “lô hàng đang ở đâu?”, ai phải trả lời và phải kiểm tra những nguồn nào?
6. Các vấn đề hiện tại là gì?
7. Vấn đề nào đủ đau để khách hàng sẵn sàng trả tiền?
8. Agentify có thể tự động hóa phần nào?
9. Phần nào khả thi cho MVP, phần nào chưa nên làm?

---

## 1. Luồng tổng quan của một đơn hàng B2B/XNK từ A → B

### 1.1. Vai trò

- **A:** Bên bán / chủ hàng / nhà cung cấp / nhà máy xuất hàng
- **B:** Bên mua / khách hàng doanh nghiệp / nhà nhập khẩu
- **Forwarder:** Bên tổ chức vận chuyển quốc tế, booking, chứng từ, phối hợp các bên
- **3PL:** Bên cung cấp dịch vụ logistics thuê ngoài như kho, vận tải, fulfillment, giao nhận
- **Hải quan:** Bên xử lý khai báo và thông quan
- **Cảng / ICD / Depot:** Nơi container đi qua, lấy/trả container, xử lý cảng
- **Trucking:** Bên vận tải nội địa bằng xe tải/container
- **Kho / Nhà máy:** Nơi nhận hàng, kiểm hàng, nhập kho
- **Kế toán:** Bên xử lý chi phí, hóa đơn, công nợ, đối soát

### 1.2. Luồng hàng cơ bản

```text
A tạo đơn / PO / hợp đồng với B
  -> chuẩn bị hàng
  -> booking vận chuyển quốc tế
  -> chuẩn bị chứng từ
  -> hàng ra cảng xuất
  -> vận chuyển quốc tế
  -> hàng tới cảng nhập
  -> khai báo hải quan
  -> xử lý tại cảng / ICD / depot
  -> trucking kéo hàng về kho/nhà máy
  -> kho nhận hàng
  -> kế toán đối soát chi phí
  -> cập nhật trạng thái cho B
1.3. Luồng thông tin khi B hỏi trạng thái
B hỏi A:
“Hàng của tôi đang ở đâu?”
“Còn mấy ngày nữa giao?”
“Đã thông quan chưa?”
“Có bị trễ không?”

Nếu A tự điều phối:
B -> A -> A tự check nhiều nguồn -> A trả lời B

Nếu A thuê forwarder/3PL làm đầu mối:
B -> A -> Forwarder/3PL -> check nhiều nguồn -> trả lời A -> A trả lời B

Nếu forwarder/3PL có portal:
B/A -> portal hoặc CS của forwarder/3PL -> nhận trạng thái
1.4. Ghi chú nguồn tham khảo

Freight forwarding thường gồm nhiều bước như booking, pickup, export clearance, international shipping, import clearance và final delivery. Forwarder thường quản lý logistics, chứng từ, customs clearance và shipment coordination.
Nguồn tham khảo: Freight forwarding process, Bismarck World; DHL air cargo shipping process.

2. Cụm 1 — Hải quan + cảng + depot/ICD

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

2.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Hàng đã thông quan chưa? Container đã sẵn sàng lấy chưa? Có đang kẹt ở hải quan, cảng, depot hoặc ICD không?

2.2. Các hệ thống/sản phẩm cần tìm hiểu
VNACCS/VCIS
ECUS / ECUS5VNACCS
VASSCM
ePort
SmartGate
PORTNET / PCS
Vietnam Smarthub Logistics
Hệ thống depot
Hệ thống ICD
Hệ thống thanh toán/phí cảng
2.3. Câu hỏi cần trả lời
Hải quan
VNACCS/VCIS là gì?
ECUS5VNACCS là gì? Ai phát triển?
VASSCM là gì?
Trong một lô hàng nhập khẩu/xuất khẩu, hải quan nằm ở bước nào?
Ai thao tác trên các hệ thống này?
Chủ hàng?
Forwarder?
Đại lý hải quan?
Nhân viên chứng từ?
Trạng thái hải quan thường gồm những gì?
Đã khai tờ khai?
Phân luồng?
Chờ kiểm hóa?
Đã thông quan?
Chưa thông quan?
Dữ liệu hải quan có export/API/file được không?
Nhân viên có phải copy dữ liệu sang Excel/file tracking không?
Khi khách hỏi “đã thông quan chưa?”, hiện tại nhân viên check bằng cách nào?
Bước nào gây chậm hoặc dễ sai nhất?
Có bước nào rủi ro pháp lý, không nên để AI tự làm không?
Agentify có thể đọc/tóm tắt/cảnh báo ở bước nào?
Cảng / ePort / SmartGate
ePort là gì?
SmartGate là gì?
Những cảng lớn nào đang dùng ePort/SmartGate?
Ai dùng ePort?
Forwarder?
Chủ hàng?
Hãng xe?
Nhân viên cảng?
ePort hỗ trợ việc gì?
Đăng ký lấy container?
Thanh toán phí cảng?
Lệnh giao hàng?
Hóa đơn?
Xe vào cảng?
Khi container tới cảng, cần check các trạng thái nào?
Dữ liệu từ ePort có dễ lấy không?
Có API không hay chỉ thao tác web?
Có phải tải file/ảnh/chứng từ rồi gửi qua Zalo/email không?
Nếu lô hàng chưa lấy được khỏi cảng, nguyên nhân thường là gì?
Agentify có thể cảnh báo rủi ro nào?
Chưa thanh toán phí cảng
Chưa có lệnh giao hàng
Container chưa release
Xe chưa đăng ký vào cảng
Sắp hết free time
Nguy cơ lưu bãi/lưu container
PORTNET / PCS / Vietnam Smarthub Logistics
PCS là gì?
PORTNET đang định vị là gì?
PCS kết nối những bên nào?
Cảng
Hãng tàu
Forwarder
Chủ hàng
Hải quan
Kho bãi
Vận tải
PCS khác gì ePort?
PCS giải quyết được phần nào của bài toán dữ liệu rời rạc?
PCS đã phổ biến chưa hay mới đang phát triển?
Nếu đã có PCS, Agentify còn cơ hội gì?
Agentify nên cạnh tranh hay tích hợp PCS như một nguồn dữ liệu?
2.4. Bảng ghi nhận
Hệ thống	Bên phát triển/vận hành	Ai dùng	Dữ liệu có trong hệ thống	Có API/export không	Điểm mạnh	Điểm yếu	Cơ hội cho Agentify
VNACCS/VCIS							
ECUS							
VASSCM							
ePort							
SmartGate							
PORTNET/PCS							
ICD/Depot system							
2.5. Ghi chú khảo sát
Điền ghi chú ở đây.
3. Cụm 2 — Chủ hàng, PO, hợp đồng, cam kết giao hàng

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

3.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Vì sao có lô hàng này? Ai mua, ai bán, ai chịu trách nhiệm cập nhật trạng thái cho người mua?

3.2. Nội dung cần tìm hiểu
Purchase Order / PO
Sales Order
Hợp đồng mua bán
Incoterms
Deadline giao hàng
Điều kiện thanh toán
SLA/cam kết giao hàng
Bên chịu trách nhiệm logistics
Team logistics nội bộ của chủ hàng
Việc thuê forwarder/3PL
3.3. Câu hỏi cần trả lời
A là ai?
Nhà máy?
Nhà cung cấp?
Công ty thương mại?
Importer/exporter?
B là ai?
Khách doanh nghiệp?
Nhà phân phối?
Nhà máy khác?
Đơn hàng bắt đầu từ đâu?
PO?
Hợp đồng?
Sales Order?
Email?
ERP?
Ai là người bị hỏi trạng thái?
Sales?
CS?
Logistics nội bộ?
Forwarder?
3PL?
A tự điều phối logistics hay thuê forwarder/3PL từ A-Z?
Nếu hàng trễ, ai chịu trách nhiệm với B?
B hỏi trạng thái qua kênh nào?
Email?
Zalo?
Điện thoại?
Portal?
Có cam kết giao hàng không?
Có phạt nếu giao trễ không?
A đang dùng hệ thống gì để quản lý đơn?
ERP?
Excel?
Email?
Phần mềm nội bộ?
3.4. Bảng ghi nhận
Nội dung	Kết quả
Loại doanh nghiệp A	
Loại khách hàng B	
Hình thức tạo đơn	
Có PO/hợp đồng không	
Có Incoterms không	
Ai phụ trách logistics	
Ai trả lời B khi hỏi trạng thái	
Kênh B hay hỏi	
Hệ thống đang dùng	
Pain chính	
3.5. Ghi chú khảo sát
Điền ghi chú ở đây.
4. Cụm 3 — Forwarder, booking quốc tế, hãng tàu/hãng bay

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

4.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Ai tổ chức vận chuyển quốc tế? Booking ở đâu? Hàng đang đi bằng tàu/máy bay nào? ETA/ETD là gì?

4.2. Nội dung cần tìm hiểu
Forwarder
Booking
Hãng tàu
Hãng bay
FCL/LCL
Air freight/sea freight
Bill of Lading
Air Waybill
ETA/ETD
Cut-off
Arrival Notice
Delivery Order
Tracking hãng tàu/hãng bay
Agent nước ngoài
4.3. Câu hỏi cần trả lời
Forwarder làm những việc gì trong luồng này?
Forwarder được thuê bởi ai?
A?
B?
3PL?
Booking được tạo ở đâu?
Hệ thống hãng tàu?
Email?
Forwarder internal system?
Excel?
Ai check ETA/ETD?
Ai check vessel/container status?
Web tracking hãng tàu/hãng bay có dễ dùng không?
Có API không hay check thủ công?
Arrival Notice đến qua đâu?
Email?
Portal?
Forwarder?
Khi tàu delay, ai biết đầu tiên?
Khi khách hỏi “tàu tới chưa?”, nhân viên check ở đâu?
Forwarder có file tracking riêng không?
Có phải copy dữ liệu từ hãng tàu/web tracking sang Excel không?
Có giao tiếp với agent nước ngoài qua WhatsApp/Zalo/email không?
Pain lớn nhất là gì?
Agentify có thể tự động hóa phần nào?
4.4. Bảng ghi nhận
Nội dung	Kết quả
Forwarder tham gia ở bước nào	
Ai thuê forwarder	
Hệ thống booking đang dùng	
Tracking hãng tàu/hãng bay	
Có API không	
Dữ liệu quan trọng	
Kênh nhận Arrival Notice	
Kênh trao đổi với agent	
Pain chính	
Cơ hội Agentify	
4.5. Ghi chú khảo sát
Điền ghi chú ở đây.
5. Cụm 4 — Chứng từ xuất nhập khẩu

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

5.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Lô hàng có đủ giấy tờ để đi tiếp chưa? Có đang thiếu chứng từ nào khiến hàng bị chậm không?

5.2. Các loại chứng từ cần tìm hiểu
Commercial Invoice
Packing List
Bill of Lading
Air Waybill
Certificate of Origin / C/O
Arrival Notice
Delivery Order / D/O
Manifest
Tờ khai hải quan
Hợp đồng
Chứng từ kiểm tra chuyên ngành nếu có
Hóa đơn, phiếu thu, biên lai phí cảng
File scan/PDF/ảnh chứng từ
5.3. Câu hỏi cần trả lời
Ai phụ trách chứng từ?
Nhân viên chứng từ?
Forwarder?
Chủ hàng?
Đại lý hải quan?
Chứng từ được nhận qua đâu?
Email?
Zalo?
Portal?
Bản giấy?
Drive?
Có checklist chứng từ không?
Checklist đang quản lý ở đâu?
Excel?
Phần mềm?
Email?
Trí nhớ nhân viên?
Thiếu chứng từ nào thường gây trễ?
Ai phát hiện thiếu chứng từ?
Có deadline cho chứng từ không?
Có ai nhắc deadline không?
Khi thiếu chứng từ, nhân viên xử lý thế nào?
Có thường phải tìm lại email/chứng từ cũ không?
Có xảy ra sai version file không?
Agentify có thể:
Đọc email/chứng từ?
Tạo checklist?
Cảnh báo thiếu chứng từ?
Nhắc deadline?
Tóm tắt tình trạng chứng từ?
5.4. Bảng ghi nhận
Chứng từ	Ai tạo/gửi	Lưu ở đâu	Khi nào cần	Nếu thiếu sẽ gây gì	Có thể tự động check không
Invoice					
Packing List					
B/L					
C/O					
Arrival Notice					
D/O					
Tờ khai					
5.5. Ghi chú khảo sát
Điền ghi chú ở đây.
6. Cụm 5 — Trucking nội địa

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

6.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Xe đã lấy hàng chưa? Hàng đang trên đường về kho chưa? Có trễ xe không?

6.2. Nội dung cần tìm hiểu
Trucking vendor
Điều xe container
TMS
GPS
App tài xế
Zalo tài xế
Gate-in/gate-out
Lịch lấy container
Lịch giao kho
Trả container rỗng
POD / Proof of Delivery
Biên bản giao nhận
6.3. Câu hỏi cần trả lời
Ai book xe?
Chủ hàng?
Forwarder?
3PL?
Hãng xe?
Ai điều phối tài xế?
Đang dùng TMS nào?
Có GPS không?
Tài xế cập nhật bằng app hay Zalo/điện thoại?
Trạng thái trucking quan trọng gồm gì?
Đã book xe
Xe đã vào cảng
Xe đã lấy container
Xe đã rời cảng
Xe đang về kho
Xe đã đến kho
Đã giao hàng
Đã trả container rỗng
Khi xe trễ, ai biết đầu tiên?
Khi khách hỏi “xe lấy hàng chưa?”, nhân viên check thế nào?
POD lưu ở đâu?
Có phải gửi ảnh POD qua Zalo không?
Có trường hợp xe trễ làm phát sinh phí không?
Agentify có thể:
Tạo trạng thái trucking?
Cảnh báo xe chưa vào cảng?
Tóm tắt ETA về kho?
Giao task cho trucking coordinator?
6.4. Bảng ghi nhận
Nội dung	Kết quả
Ai book xe	
Ai điều xe	
TMS/GPS đang dùng	
Kênh tài xế cập nhật	
Trạng thái xe quan trọng	
POD lưu ở đâu	
Pain chính	
Cơ hội Agentify	
6.5. Ghi chú khảo sát
Điền ghi chú ở đây.
7. Cụm 6 — Kho / WMS / 3PL warehouse

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

7.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Hàng đã về kho chưa? Đã nhập kho chưa? Có thiếu/sai hàng không?

7.2. Nội dung cần tìm hiểu
Kho của chủ hàng
Kho thuê ngoài
3PL warehouse
WMS
Inbound appointment
GRN / Goods Received Note
Kiểm hàng
Nhập kho
Tồn kho
Vị trí hàng
Xuất kho
Lệch hàng
Hàng hư hỏng
7.3. Câu hỏi cần trả lời
Kho thuộc ai?
Chủ hàng?
3PL?
Nhà máy?
Kho dùng WMS hay Excel?
WMS nào đang dùng?
Ai xác nhận hàng đã vào kho?
Khi hàng chưa vào kho, kho có biết lý do không?
Kho cập nhật trạng thái cho forwarder/chủ hàng qua kênh nào?
WMS?
Email?
Zalo?
Excel?
Có API/export không?
Trạng thái kho quan trọng gồm gì?
Chưa nhận hàng
Đã nhận hàng
Đang kiểm hàng
Đã nhập kho
Thiếu hàng
Sai hàng
Hư hỏng
Đã xuất kho
Có hay lệch giữa trạng thái kho và trạng thái logistics không?
Agentify có thể:
Lấy trạng thái kho?
Xác nhận hàng đã về kho?
Cảnh báo nếu xe báo đã giao nhưng kho chưa nhập?
Đóng shipment timeline?
7.4. Bảng ghi nhận
Nội dung	Kết quả
Loại kho	
WMS đang dùng	
Kênh cập nhật trạng thái	
Trạng thái kho quan trọng	
Có API/export không	
Pain chính	
Cơ hội Agentify	
7.5. Ghi chú khảo sát
Điền ghi chú ở đây.
8. Cụm 7 — Kế toán, chi phí, hóa đơn, đối soát

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

8.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Lô hàng này tốn bao nhiêu? Có phí nào làm kẹt hàng không? Đã đối soát chưa?

8.2. Nội dung cần tìm hiểu
Cước quốc tế
Local charge
Phí cảng
Phí trucking
Phí khai hải quan
Phí kho
Demurrage
Detention
Phí lưu bãi
Hóa đơn điện tử
Công nợ
MISA
FAST
Bravo
SAP
Odoo
Excel đối soát
8.3. Câu hỏi cần trả lời
Chi phí lô hàng được ghi ở đâu?
Ai đối soát chi phí?
Kế toán có liên kết với ops không?
Có lệch giữa báo giá ban đầu và chi phí thực tế không?
Có phí phát sinh do xử lý trễ không?
Có trường hợp chưa thanh toán phí nên không lấy được hàng không?
Hóa đơn/chứng từ phí lưu ở đâu?
Có đối soát theo từng shipment không?
Ops có biết chi phí phát sinh ngay không?
Kế toán có biết trạng thái vận hành không?
Agentify có thể:
Gom note chi phí theo lô hàng?
Nhắc đối soát?
Cảnh báo phí phát sinh?
Gom hóa đơn/chứng từ theo shipment?
Phần nào không nên tự động hóa?
Duyệt chi phí
Thanh toán
Sửa invoice
Xác nhận công nợ
8.4. Bảng ghi nhận
Loại phí	Ai tạo	Lưu ở đâu	Khi nào phát sinh	Ai đối soát	Có thể đưa vào Agentify không
Cước quốc tế					
Local charge					
Phí cảng					
Phí trucking					
Demurrage					
Detention					
Phí kho					
8.5. Ghi chú khảo sát
Điền ghi chú ở đây.
9. Cụm 8 — Customer Service / Operations / Account trả lời khách

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

9.1. Mục tiêu tìm hiểu

Cụm này là cụm quan trọng nhất cho Agentify.

Cụm này trả lời câu hỏi:

Khi khách hỏi “lô hàng đang ở đâu?”, ai trả lời, mất bao lâu, phải check những hệ thống nào?

9.2. Vai trò cần tìm hiểu
Customer Service logistics
Operations staff
Account manager
Documentation staff
Operations manager
Sales admin
Logistics coordinator
9.3. Câu hỏi cần trả lời
Ai nhận câu hỏi từ khách?
Khách hỏi qua kênh nào?
Email
Zalo
Điện thoại
Portal
WhatsApp
Một ngày/tuần có bao nhiêu câu hỏi trạng thái?
Một câu hỏi mất bao lâu để trả lời?
Người trả lời phải check những nguồn nào?
Email
Excel
Web hãng tàu
ePort
Hải quan
TMS
WMS
Zalo tài xế
Kế toán
Có phải hỏi nội bộ nhiều người không?
Có template trả lời không?
Có hay trả lời chậm không?
Có từng trả lời sai/chưa đủ thông tin không?
Khi đổi ca/nghỉ phép, handover thế nào?
Người nào đau nhất?
Người nào có quyền đề xuất mua phần mềm?
Nếu có AI tóm tắt trạng thái, họ có dùng không?
Nếu AI soạn câu trả lời cho khách, họ có cần duyệt không?
Nếu giảm 30% thời gian trả lời, có đáng trả tiền không?
9.4. Bảng ghi nhận
Nội dung	Kết quả
Người nhận câu hỏi	
Người trả lời cuối	
Kênh khách hỏi	
Số câu hỏi trạng thái/ngày	
Thời gian trả lời trung bình	
Nguồn dữ liệu phải check	
Pain lớn nhất	
Có template trả lời không	
Có nhu cầu AI summary không	
Có sẵn sàng pilot không	
9.5. Ghi chú khảo sát
Điền ghi chú ở đây.
10. Cụm 9 — Excel, email, Zalo, file thủ công

Người phụ trách: [Tên người phụ trách]
Trạng thái: Chưa làm / Đang làm / Đã xong

10.1. Mục tiêu tìm hiểu

Cụm này trả lời câu hỏi:

Vì sao dù đã có nhiều phần mềm, nhân viên vẫn phải dùng Excel, email, Zalo để nối dữ liệu giữa các hệ thống?

10.2. Nội dung cần tìm hiểu
Excel tracking file
Google Sheet
Email
Gmail/Outlook
Zalo group
WhatsApp
Điện thoại
Google Drive
OneDrive
PDF chứng từ
Ảnh chụp màn hình
File scan
Version file
Handover note
10.3. Câu hỏi cần trả lời
Có file tracking chung không?
Ai cập nhật file tracking?
Bao lâu cập nhật một lần?
File tracking gồm những cột nào?
Có bị sai version file không?
Thông tin nào chỉ nằm trong email?
Thông tin nào chỉ nằm trong Zalo?
Thông tin nào chỉ nằm trong đầu nhân viên?
Có nhóm Zalo cho từng lô hàng/khách không?
Có gửi ảnh chứng từ qua Zalo không?
Có phải copy dữ liệu từ app này sang app khác không?
Khi một nhân viên nghỉ, người khác có hiểu context không?
Handover đang làm bằng gì?
Có audit log không?
Có cách nào biết ai cập nhật sai không?
Agentify có thể:
Đọc email?
Import Excel?
Tóm tắt Zalo/email?
Tạo shipment timeline?
Tạo handover summary?
Cảnh báo dữ liệu thiếu?
10.4. Bảng ghi nhận
Nguồn thủ công	Dữ liệu chứa gì	Ai cập nhật	Tần suất cập nhật	Pain	Có thể đưa vào Agentify không
Excel					
Google Sheet					
Email					
Zalo					
Drive/OneDrive					
Điện thoại					
10.5. Ghi chú khảo sát
Điền ghi chú ở đây.
11. Bảng tổng hợp Layer Map
Cụm	Layer	Bước trong luồng hàng	Ai dùng	App/hệ thống	Dữ liệu có	Pain chính	Cơ hội Agentify
1	Hải quan						
1	Cảng/ePort						
1	Depot/ICD						
2	Chủ hàng/PO						
3	Forwarder/Booking						
4	Chứng từ						
5	Trucking						
6	Kho/WMS						
7	Kế toán/Đối soát						
8	CS/Ops trả lời khách						
9	Excel/Zalo/Email						
12. Bảng tổng hợp Product Map
Sản phẩm/hệ thống	Bên phát triển/vận hành	Nhóm nghiệp vụ	Ai dùng	Tính năng chính	Điểm mạnh	Điểm yếu	Agentify nên tích hợp hay cạnh tranh
VNACCS/VCIS		Hải quan					
ECUS		Hải quan					
VASSCM		Hải quan/cảng/kho bãi					
ePort		Cảng					
SmartGate		Cảng					
PORTNET/PCS		Port Community					
Smartlog STM		TMS					
Smartlog SWM		WMS					
Abivin vRoute		TMS/Route					
Infolog TMS		TMS					
Infolog WMS		WMS					
LogiTrack		OMS/TMS/WMS					
TigerWMS		WMS/Fulfillment					
MISA/FAST/Bravo		Kế toán					
Excel/Google Sheet		Manual tracking					
Zalo/Email		Communication					
13. Bảng tổng hợp Workflow hiện tại
Tình huống	Người hỏi	Người phải trả lời	Hệ thống phải check	Thời gian ước tính	Pain	Có thể tự động hóa không
Khách hỏi hàng đang ở đâu						
Hỏi đã thông quan chưa						
Hỏi xe lấy container chưa						
Hỏi hàng đã về kho chưa						
Hỏi có phát sinh phí không						
Handover ca/người phụ trách						
Lô hàng bị delay						
Thiếu chứng từ						
14. Bảng tổng hợp Pain Ranking
Pain	Ai bị đau	Tần suất	Mức độ nghiêm trọng	Chi phí/tác động	Có sẵn sàng trả tiền không	Tính năng Agentify liên quan
Trả lời trạng thái chậm						
Dữ liệu phân tán						
Thiếu chứng từ						
Sót deadline/free time						
Xe trễ/chưa có xe						
Hàng chưa về kho nhưng không rõ lý do						
Handover khó						
Đối soát phí thủ công						
Phụ thuộc Excel/Zalo						
15. Bảng đánh giá cơ hội Agentify
Cơ hội	Mô tả	Dữ liệu cần lấy	Khả thi MVP?	Rủi ro	Ưu tiên
AI shipment status summary	Tóm tắt trạng thái lô hàng	Email, Excel, tracking, manual update			
Unified shipment timeline	Timeline chung cho từng shipment	Nhiều nguồn			
Checklist chứng từ	Kiểm tra thiếu chứng từ	Email, file, checklist			
Exception inbox	Danh sách lô có vấn đề	Rule + timeline			
Deadline monitoring	Cảnh báo cut-off/free time	ETA, deadline, status			
Trucking status update	Theo dõi xe lấy hàng/giao kho	TMS/GPS/Zalo/manual			
Warehouse status update	Hàng đã vào kho chưa	WMS/Excel/manual			
Customer reply draft	Soạn câu trả lời cho khách	Shipment summary			
Handover summary	Tóm tắt cho ca/người sau	Timeline + notes			
Cost exception note	Ghi nhận phí phát sinh	Email/kế toán/manual			
16. Giả thuyết MVP ban đầu
16.1. ICP ban đầu
Forwarder hoặc 3PL tầm trung
Phục vụ khách hàng B2B/XNK
Có đội CS/Ops khoảng 5-30 người
Xử lý nhiều shipment/container mỗi tháng
Đang dùng Excel, email, Zalo song song với phần mềm chuyên dụng
Thường xuyên bị hỏi “lô hàng đang ở đâu?”
16.2. Use case MVP đề xuất
AI Shipment Status Assistant cho container nhập khẩu đường biển
16.3. Input ban đầu
Email
Excel/Google Sheet
File tracking
Manual update
Một vài link/web tracking nếu có
16.4. Output ban đầu
Shipment record
Shipment timeline
AI status summary
Risk/exception
Next action
Draft câu trả lời cho khách
Task cho người phụ trách
16.5. Không làm trong MVP
Không thay TMS
Không thay WMS
Không thay phần mềm khai hải quan
Không tự khai hải quan
Không tự duyệt chi phí
Không scraping mọi website tracking
Không tích hợp tất cả hãng tàu ngay
Không làm route optimization
17. Câu hỏi phỏng vấn khách hàng thật
17.1. Thông tin doanh nghiệp
Công ty anh/chị thuộc loại nào?
Chủ hàng
Forwarder
3PL
Kho
Trucking
Đại lý hải quan
Mỗi tháng xử lý khoảng bao nhiêu shipment/container?
Hàng chủ yếu là nhập khẩu hay xuất khẩu?
Chủ yếu đường biển, đường hàng không hay nội địa?
Đội CS/Ops có bao nhiêu người?
17.2. Luồng vận hành hiện tại
Một lô hàng từ lúc có PO/booking đến lúc giao xong đi qua những bước nào?
Ai là người cập nhật trạng thái cho khách?
Khi khách hỏi “hàng đang ở đâu?”, ai trả lời?
Người đó phải kiểm tra những nguồn nào?
Một lần trả lời thường mất bao lâu?
17.3. App/hệ thống đang dùng
Anh/chị đang dùng phần mềm nào cho khai hải quan?
Có dùng ECUS/VNACCS không?
Có dùng ePort/cảng online không?
Có dùng TMS không?
Có dùng WMS không?
Có dùng ERP/kế toán gì?
Có file Excel/Google Sheet tracking riêng không?
Có dùng Zalo nhóm để cập nhật không?
17.4. Pain
Một câu hỏi trạng thái lô hàng thường mất bao lâu để trả lời?
Một ngày/tuần có bao nhiêu câu hỏi kiểu này?
Thông tin nào khó lấy nhất?
Layer nào hay gây delay nhất?
Hải quan
Cảng
Trucking
Kho
Chứng từ
Kế toán
Có hay thiếu chứng từ không?
Có hay bị phí lưu container/lưu bãi không?
Có khó handover giữa nhân viên không?
17.5. Chi phí và ROI
Một lỗi chậm cập nhật có thể gây thiệt hại gì?
Tháng gần nhất có phát sinh demurrage/detention không?
Mất bao nhiêu giờ/tuần cho việc báo cáo tracking?
Nếu giảm 30% thời gian tra cứu, có đáng trả tiền không?
Ngân sách phần mềm hiện tại khoảng bao nhiêu?
17.6. Kiểm chứng Agentify
Nếu có hệ thống tự gom email, Excel, tracking, hải quan, cảng, trucking, kho thành một timeline, anh/chị có dùng không?
Anh/chị muốn AI tự động làm gì?
Việc gì bắt buộc phải có người duyệt?
Nếu AI soạn câu trả lời cho khách, anh/chị có muốn duyệt trước không?
Anh/chị có sẵn sàng thử pilot 4 tuần không?
Có sẵn sàng trả phí pilot không?
18. Kết luận sau khảo sát
18.1. Pain có thật không?
Điền kết luận.
18.2. Nhóm khách hàng đau nhất là ai?
Điền kết luận.
18.3. Workflow nào lặp lại nhiều nhất?
Điền kết luận.
18.4. Dữ liệu có lấy được không?
Điền kết luận.
18.5. Khách có sẵn sàng trả tiền không?
Điền kết luận.
18.6. Có nên tiếp tục làm Agentify Logistics không?
Go / No-go / Pivot
Lý do:
19. Nguồn tham khảo ban đầu
VNACCS/VCIS: hệ thống thông quan tự động và hệ thống thông tin hải quan của Việt Nam.
VASSCM: hệ thống quản lý/giám sát hàng hóa tự động tại cảng, kho, bãi.
ePort/SmartGate: các hệ thống số hóa giao nhận container và cổng cảng.
PORTNET/PCS: hệ thống cộng đồng cảng, kết nối cảng, hãng tàu, logistics, XNK và cơ quan quản lý.
Freight forwarding process: gồm booking, pickup, export clearance, international shipping, import clearance và final delivery.

Một vài nguồn để bạn để trong phần tham khảo khi hoàn thiện: VNACCS/VCIS được dùng để hiện đại hóa xử lý hải quan điện tử cho hàng nhập/xuất khẩu; VIMC mô tả SmartGate là bước tiếp theo của ePort trong số hóa dịch vụ cảng; PORTNET được định vị là Port Community System kết nối cơ quan quản lý, cảng, hãng tàu, logistics và doanh nghiệp XNK; còn freight forwarding process thường bao gồm booking, pickup, clearance, international shipping và final delivery. :contentReference[oaicite:0]{index=0}
::contentReference[oaicite:1]{index=1}
