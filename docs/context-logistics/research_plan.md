# Kế hoạch khảo sát thị trường logistics công nghiệp, B2B và xuất nhập khẩu

## 1. Mục tiêu của kế hoạch khảo sát

Tài liệu này dùng để lên kế hoạch khảo sát thị trường logistics công nghiệp, B2B và xuất nhập khẩu tại Việt Nam. Mục tiêu không chỉ là hiểu thị trường nói chung, mà là tìm ra:

1. Doanh nghiệp đang vận hành một lô hàng B2B/XNK như thế nào.
2. Dữ liệu của một lô hàng đang nằm ở những hệ thống, file và con người nào.
3. Nhóm người dùng nào đang gặp nhiều khó khăn nhất.
4. Vấn đề nào xảy ra thường xuyên, gây tốn thời gian hoặc phát sinh chi phí.
5. Vấn đề nào đủ đau để khách hàng sẵn sàng trả tiền cho phần mềm mới.
6. Agentify có thể trở thành lớp trung gian kết nối dữ liệu, tóm tắt trạng thái, cảnh báo rủi ro và hỗ trợ trả lời khách ở đâu.
7. Use case nào khả thi nhất để làm MVP.

Kết quả cuối cùng của khảo sát phải trả lời được câu hỏi:

> Có nên phát triển Agentify theo hướng trợ lý vận hành logistics B2B/XNK hay không? Nếu có, nên bắt đầu từ nhóm khách hàng nào, use case nào, tính năng nào và cách triển khai nào?

---

## 2. Phạm vi khảo sát

### 2.1. Thị trường cần khảo sát

Phạm vi chính là logistics công nghiệp, B2B và xuất nhập khẩu tại Việt Nam, gồm:

- Hàng nhập khẩu đường biển.
- Hàng xuất khẩu đường biển.
- Hàng đường hàng không nếu có liên quan đến B2B/XNK.
- Vận tải container nội địa sau khi hàng về cảng.
- Kho, ICD, depot và 3PL warehouse.
- Dịch vụ forwarder, đại lý hải quan, trucking và logistics thuê ngoài.
- Hoạt động chăm sóc khách hàng, cập nhật trạng thái lô hàng và đối soát chi phí.

Không tập trung vào logistics thương mại điện tử giao hàng chặng cuối như giao đồ ăn, giao đơn lẻ B2C, ship COD nội địa, fulfillment nhỏ lẻ cho shop online.

### 2.2. Nhóm doanh nghiệp cần khảo sát

| Nhóm doanh nghiệp | Mục tiêu khảo sát | Lý do cần khảo sát |
|---|---|---|
| Forwarder vừa và nhỏ | Hiểu cách họ quản lý booking, chứng từ, tracking và trả lời khách | Đây có thể là nhóm ICP tốt vì phải điều phối nhiều bên và thường dùng nhiều công cụ rời rạc |
| 3PL | Hiểu cách họ quản lý vận tải, kho, khách hàng B2B và đối soát | 3PL có nhiều layer vận hành, dễ phát sinh nhu cầu hệ thống trung gian |
| Chủ hàng xuất nhập khẩu | Hiểu nhu cầu nhìn thấy trạng thái lô hàng và kiểm soát chi phí | Đây là bên chịu tác động cuối cùng khi hàng trễ hoặc thiếu thông tin |
| Công ty trucking container | Hiểu trạng thái xe, tài xế, GPS, Zalo và POD | Đây là nguồn dữ liệu quan trọng cho trạng thái giao hàng nội địa |
| Kho/ICD/depot | Hiểu dữ liệu inbound, gate-in/gate-out, nhập kho, trả container | Đây là layer thường gây đứt gãy thông tin sau cảng |
| Đại lý hải quan | Hiểu quy trình khai báo, thông quan, chứng từ và rủi ro pháp lý | Đây là layer quan trọng nhưng cần xác định rõ phần nào AI không nên tự động làm |
| Người mua dịch vụ logistics | Hiểu ngân sách, tiêu chí mua phần mềm, khả năng trả phí | Cần xác định ai có quyền quyết định mua hoặc pilot |

### 2.3. Vai trò người dùng cần phỏng vấn

| Vai trò | Cần tìm hiểu điều gì |
|---|---|
| Customer Service logistics | Mỗi ngày phải trả lời bao nhiêu câu hỏi trạng thái, phải check bao nhiêu nguồn |
| Operations staff | Cách điều phối thực tế, điểm nghẽn, thông tin nào hay thiếu |
| Documentation staff | Chứng từ nào thường thiếu, sai, trễ hoặc khó kiểm soát |
| Trucking coordinator | Cách cập nhật trạng thái xe, tài xế, POD và lịch giao hàng |
| Warehouse coordinator | Cách xác nhận hàng đã vào kho, nhập kho, thiếu/sai/hư hỏng |
| Kế toán logistics | Cách ghi nhận chi phí, hóa đơn, phí phát sinh và đối soát |
| Operations manager | Pain nào ảnh hưởng đến năng suất, SLA, chất lượng dịch vụ |
| Chủ doanh nghiệp/giám đốc | Ngân sách, ưu tiên mua phần mềm, khả năng pilot và kỳ vọng ROI |
| IT/Admin hệ thống | Dữ liệu có thể lấy từ đâu, có API/export không, có rào cản bảo mật không |

---

## 3. Các giả thuyết cần kiểm chứng

### 3.1. Giả thuyết về thị trường

1. Logistics B2B/XNK tại Việt Nam đang có nhiều phần mềm theo từng mảng riêng, nhưng thiếu một lớp trung gian gom trạng thái lô hàng từ nhiều nguồn.
2. Doanh nghiệp vừa và nhỏ vẫn phụ thuộc nhiều vào Excel, email, Zalo, ảnh chụp màn hình và file scan.
3. Người trả lời khách thường không có sẵn một bức tranh đầy đủ về lô hàng, mà phải hỏi nhiều người và check nhiều hệ thống.
4. Các hệ thống như hải quan, ePort, TMS, WMS, kế toán đang phục vụ từng nghiệp vụ riêng, nhưng không tự động tạo ra một timeline thống nhất cho từng shipment.
5. Pain lớn nhất không nằm ở việc thiếu một TMS/WMS mới, mà nằm ở việc dữ liệu bị phân tán, cập nhật chậm và khó trả lời khách nhanh.

### 3.2. Giả thuyết về nhu cầu người dùng

1. CS/Ops là nhóm đau nhất vì phải trả lời khách trong khi dữ liệu nằm rải rác.
2. Operations manager muốn giảm thời gian tra cứu, giảm lỗi handover và nhìn thấy lô hàng có rủi ro.
3. Chủ doanh nghiệp/giám đốc chỉ sẵn sàng trả tiền nếu sản phẩm giảm được thời gian nhân sự, giảm phạt trễ, giảm phí phát sinh hoặc tăng chất lượng dịch vụ.
4. Người dùng sẽ chấp nhận AI nếu AI đóng vai trò hỗ trợ, tóm tắt và nhắc việc; nhưng vẫn cần con người duyệt các hành động quan trọng như khai hải quan, thanh toán, duyệt chi phí và gửi thông tin nhạy cảm cho khách.

### 3.3. Giả thuyết về sản phẩm Agentify

1. Agentify nên bắt đầu như một trợ lý trạng thái lô hàng, không nên bắt đầu bằng việc thay thế TMS, WMS, ERP hay phần mềm khai hải quan.
2. MVP nên tập trung vào container nhập khẩu đường biển vì luồng này có nhiều bên tham gia, nhiều trạng thái, nhiều chứng từ và nhiều rủi ro phát sinh phí.
3. Giá trị đầu tiên của Agentify là tạo shipment timeline, tóm tắt trạng thái, phát hiện lô hàng có vấn đề và soạn nháp câu trả lời cho khách.
4. Nguồn dữ liệu ban đầu nên bắt đầu từ Excel/Google Sheet, email, file chứng từ và cập nhật thủ công, trước khi tích hợp sâu bằng API.

---

## 4. Phương pháp khảo sát

### 4.1. Desk research

Desk research là nghiên cứu tài liệu có sẵn trước khi đi phỏng vấn thực tế.

Nội dung cần nghiên cứu:

- Quy mô và xu hướng thị trường logistics Việt Nam.
- Vai trò của forwarder, 3PL, chủ hàng, trucking, kho, hải quan và cảng.
- Các hệ thống phổ biến: VNACCS/VCIS, ECUS, VASSCM, ePort, SmartGate, PORTNET/PCS, TMS, WMS, ERP, phần mềm kế toán.
- Các đối thủ/sản phẩm hiện có trong từng mảng.
- Những vấn đề phổ biến trong logistics B2B/XNK: thiếu chứng từ, trễ tàu, trễ xe, kẹt cảng, lưu bãi, lưu container, đối soát phí, cập nhật khách chậm.

Đầu ra cần có:

- Product map theo từng layer.
- Competitor map.
- Workflow map của một lô hàng nhập khẩu/xuất khẩu.
- Danh sách thuật ngữ cần giải thích khi phỏng vấn và khi viết báo cáo.

### 4.2. Phỏng vấn định tính

Phỏng vấn định tính dùng để hiểu sâu workflow, pain, bối cảnh ra quyết định và cách người dùng đang làm việc thật.

Quy mô đề xuất:

- 15-25 cuộc phỏng vấn trong giai đoạn đầu.
- Mỗi cuộc 45-60 phút.
- Ưu tiên phỏng vấn người làm trực tiếp trước, sau đó mới phỏng vấn cấp quản lý.

Phân bổ mẫu đề xuất:

| Nhóm | Số cuộc phỏng vấn đề xuất |
|---|---:|
| Forwarder vừa và nhỏ | 5-7 |
| 3PL | 3-5 |
| Chủ hàng XNK | 3-5 |
| Trucking container | 2-3 |
| Kho/ICD/depot | 2-3 |
| Đại lý hải quan | 2-3 |
| Quản lý/giám đốc có quyền mua | 3-5 |

### 4.3. Khảo sát định lượng

Khảo sát định lượng dùng để kiểm chứng tần suất, mức độ đau và khả năng trả tiền sau khi đã có insight từ phỏng vấn định tính.

Quy mô đề xuất:

- 50-100 phản hồi ở giai đoạn đầu.
- Người trả lời nên là CS, Ops, chứng từ, điều phối trucking, quản lý vận hành, chủ doanh nghiệp logistics hoặc chủ hàng XNK.

Nhóm câu hỏi cần đo:

- Số shipment/container xử lý mỗi tháng.
- Số câu hỏi trạng thái nhận mỗi ngày/tuần.
- Số nguồn dữ liệu phải kiểm tra để trả lời một câu hỏi.
- Thời gian trung bình để trả lời một câu hỏi trạng thái.
- Tần suất xảy ra delay, thiếu chứng từ, phát sinh phí.
- Mức độ phụ thuộc vào Excel, email, Zalo.
- Mức độ sẵn sàng thử sản phẩm.
- Mức sẵn sàng trả phí pilot.

### 4.4. Shadowing workflow

Shadowing là quan sát người dùng làm việc thật trong một khoảng thời gian ngắn.

Mục tiêu:

- Quan sát cách CS/Ops trả lời một câu hỏi “hàng đang ở đâu?”.
- Ghi lại họ mở những app nào, hỏi ai, mất bao lâu, copy dữ liệu như thế nào.
- Xác định phần nào có thể tự động hóa, phần nào cần người duyệt.

Quy mô đề xuất:

- 3-5 buổi shadowing.
- Mỗi buổi 1-2 giờ.
- Ưu tiên CS/Ops tại forwarder hoặc 3PL.

Đầu ra cần có:

- Workflow thực tế từng bước.
- Danh sách hệ thống/file/kênh giao tiếp được dùng.
- Thời gian cho từng bước.
- Điểm gây chậm, sai, lặp lại hoặc phụ thuộc người.

### 4.5. Prototype test

Sau khi có insight ban đầu, nên test nhanh một bản mô phỏng sản phẩm.

Prototype có thể là:

- Một màn hình shipment timeline.
- Một màn hình exception inbox, tức danh sách lô hàng có vấn đề.
- Một mẫu AI status summary.
- Một mẫu câu trả lời khách do AI soạn nháp.
- Một bảng checklist chứng từ.

Mục tiêu test:

- Người dùng có hiểu sản phẩm không.
- Người dùng có thấy đúng pain của họ không.
- Người dùng có muốn dùng thử trong công việc thật không.
- Tính năng nào nên làm trước, tính năng nào chưa cần.
- Người dùng có chấp nhận trả phí pilot không.

---

## 5. Kế hoạch khảo sát theo từng cụm

## Cụm 1: Hải quan, cảng, depot và ICD

### Mục tiêu

Hiểu quá trình hàng đi qua hải quan, cảng, depot/ICD; trạng thái nào quan trọng; dữ liệu nằm ở đâu; điểm nào thường làm hàng bị kẹt hoặc phát sinh phí.

### Đối tượng cần phỏng vấn

- Nhân viên khai báo hải quan.
- Đại lý hải quan.
- Forwarder phụ trách chứng từ/hải quan.
- Operations staff của 3PL.
- Nhân viên làm việc với cảng/ePort.
- Trucking coordinator có xử lý lấy/trả container.

### Câu hỏi nghiên cứu chính

1. Một lô hàng nhập khẩu đi qua những bước hải quan/cảng/depot nào?
2. Ai kiểm tra trạng thái thông quan?
3. Ai biết container đã sẵn sàng lấy khỏi cảng hay chưa?
4. Đang dùng hệ thống nào: VNACCS/VCIS, ECUS, VASSCM, ePort, SmartGate, PORTNET/PCS, hệ thống depot/ICD?
5. Trạng thái nào cần báo cho khách?
6. Khi hàng chưa lấy được khỏi cảng, nguyên nhân thường là gì?
7. Có thường phát sinh phí lưu bãi/lưu container không?
8. Có dữ liệu nào xuất được ra file hoặc API không?
9. Nhân viên có phải chụp màn hình, tải file, copy dữ liệu sang Excel hoặc gửi Zalo không?
10. Agentify có thể cảnh báo gì mà không đụng vào thao tác pháp lý nhạy cảm?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Hệ thống đang dùng | Tên hệ thống, ai dùng, dùng cho bước nào |
| Trạng thái quan trọng | Thông quan, phân luồng, kiểm hóa, container release, lệnh giao hàng, phí cảng |
| Kênh cập nhật | Web, email, Excel, Zalo, điện thoại, file PDF |
| Pain | Chậm cập nhật, thiếu dữ liệu, thao tác lặp lại, phát sinh phí |
| Rủi ro | Phần nào không nên để AI tự làm |
| Cơ hội Agentify | Cảnh báo, tóm tắt, nhắc deadline, gom trạng thái |

### Output của cụm

- Bản đồ trạng thái hải quan/cảng/depot.
- Danh sách dữ liệu có thể lấy được và không lấy được.
- Danh sách rủi ro pháp lý không nên tự động hóa.
- Đề xuất tính năng Agentify phù hợp: cảnh báo chưa thông quan, sắp hết free time, thiếu lệnh giao hàng, chưa thanh toán phí cảng, container chưa release.

---

## Cụm 2: Chủ hàng, PO, hợp đồng và cam kết giao hàng

### Mục tiêu

Hiểu vì sao có lô hàng, ai là người chịu trách nhiệm giao hàng, ai bị khách hỏi trạng thái và hậu quả nếu giao trễ.

### Đối tượng cần phỏng vấn

- Chủ hàng xuất nhập khẩu.
- Sales admin.
- Logistics nội bộ của nhà máy/công ty thương mại.
- Customer service của chủ hàng.
- Quản lý chuỗi cung ứng.
- Forwarder phụ trách account của chủ hàng.

### Câu hỏi nghiên cứu chính

1. Đơn hàng bắt đầu từ PO, hợp đồng, sales order, email hay ERP?
2. Ai là bên chịu trách nhiệm logistics theo Incoterms?
3. Có cam kết giao hàng hoặc phạt giao trễ không?
4. Bên mua hỏi trạng thái qua kênh nào?
5. Ai là người phải trả lời bên mua?
6. Chủ hàng đang dùng ERP, Excel, email hay phần mềm nội bộ?
7. Khi thuê forwarder/3PL, chủ hàng có nhìn thấy trạng thái lô hàng theo thời gian gần thực không?
8. Chủ hàng có hài lòng với cách forwarder/3PL cập nhật trạng thái không?
9. Chủ hàng có muốn portal/timeline chung cho từng lô hàng không?
10. Chủ hàng có sẵn sàng trả tiền cho visibility không, hay kỳ vọng forwarder/3PL cung cấp miễn phí?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Nguồn tạo đơn | PO, hợp đồng, ERP, email |
| Điều kiện giao hàng | Incoterms, deadline, SLA, phạt trễ |
| Người chịu trách nhiệm | Chủ hàng, forwarder, 3PL, bên mua |
| Kênh hỏi trạng thái | Email, Zalo, điện thoại, portal |
| Pain | Không nhìn thấy trạng thái, bị động, trả lời chậm, không biết hàng kẹt ở đâu |
| Khả năng trả tiền | Chủ hàng trả riêng hay yêu cầu nhà cung cấp logistics chịu |

### Output của cụm

- Bản đồ nhu cầu visibility từ phía chủ hàng.
- Phân tích ai là người mua: chủ hàng, forwarder hay 3PL.
- Danh sách tình huống chủ hàng có thể trả tiền cho Agentify.

---

## Cụm 3: Forwarder, booking quốc tế, hãng tàu và hãng bay

### Mục tiêu

Hiểu cách forwarder quản lý booking, ETA/ETD, tracking quốc tế, agent nước ngoài và thông tin delay.

### Đối tượng cần phỏng vấn

- Forwarder operations.
- Forwarder customer service.
- Nhân viên booking.
- Nhân viên chứng từ.
- Account manager phụ trách khách B2B.
- Quản lý vận hành forwarder.

### Câu hỏi nghiên cứu chính

1. Booking được tạo qua hệ thống hãng tàu, email, forwarder system hay Excel?
2. Ai check ETA, ETD, vessel, voyage, container status?
3. Web tracking của hãng tàu/hãng bay có dễ dùng không?
4. Có API không hay phải check thủ công?
5. Khi tàu delay, ai biết đầu tiên?
6. Arrival Notice được nhận qua đâu?
7. Có giao tiếp với agent nước ngoài qua email, WhatsApp, Zalo không?
8. Có file tracking riêng cho từng khách không?
9. Bao lâu phải cập nhật tracking một lần?
10. Agentify có thể tự động tạo status summary từ email, tracking file và thông tin hãng tàu không?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Booking source | Hãng tàu, email, forwarder system, Excel |
| Tracking source | Web hãng tàu, email, file, agent nước ngoài |
| Trạng thái quan trọng | Booking confirmed, ETD, ETA, vessel departed, arrived, delay |
| Pain | Check thủ công, nhiều hãng tàu, cập nhật khách chậm, thông tin delay muộn |
| Cơ hội Agentify | Tự gom trạng thái, phát hiện delay, soạn email/Zalo cập nhật khách |

### Output của cụm

- Workflow booking và tracking quốc tế.
- Danh sách nguồn dữ liệu có thể dùng cho MVP.
- Đánh giá có nên tích hợp hãng tàu ngay hay bắt đầu bằng email/Excel.

---

## Cụm 4: Chứng từ xuất nhập khẩu

### Mục tiêu

Hiểu các loại chứng từ cần có, cách lưu trữ, cách kiểm tra thiếu/sai/trễ chứng từ và tác động của chứng từ tới tiến độ lô hàng.

### Đối tượng cần phỏng vấn

- Documentation staff.
- Forwarder chứng từ.
- Đại lý hải quan.
- Logistics nội bộ của chủ hàng.
- Kế toán logistics nếu liên quan tới hóa đơn/chứng từ phí.

### Câu hỏi nghiên cứu chính

1. Một lô hàng cần những chứng từ nào?
2. Ai tạo, ai gửi, ai kiểm tra từng chứng từ?
3. Chứng từ được lưu ở email, Drive, Zalo, phần mềm hay bản giấy?
4. Có checklist chứng từ không?
5. Thiếu chứng từ nào thường gây trễ nhất?
6. Có thường xảy ra sai version file không?
7. Có deadline cho chứng từ không?
8. Ai nhắc deadline?
9. Có thể dùng AI để đọc file PDF/ảnh/email và tạo checklist không?
10. Phần nào cần người duyệt trước khi gửi hoặc sử dụng?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Danh sách chứng từ | Invoice, Packing List, B/L, AWB, C/O, Arrival Notice, D/O, tờ khai |
| Nơi lưu | Email, Drive, Zalo, phần mềm, bản giấy |
| Deadline | Khi nào cần chứng từ, ai nhắc |
| Lỗi thường gặp | Thiếu, sai thông tin, sai version, đến muộn |
| Tác động | Kẹt hải quan, kẹt cảng, trễ giao, phát sinh phí |
| Cơ hội Agentify | Checklist, nhắc hạn, đọc file, tóm tắt tình trạng chứng từ |

### Output của cụm

- Checklist chứng từ chuẩn cho một số loại shipment.
- Danh sách chứng từ nên đưa vào MVP.
- Đánh giá khả thi của AI document assistant trong logistics.

---

## Cụm 5: Trucking nội địa

### Mục tiêu

Hiểu quá trình book xe, điều xe, lấy container, giao kho, trả container rỗng và cập nhật POD.

### Đối tượng cần phỏng vấn

- Trucking coordinator.
- Điều phối tài xế.
- Forwarder/3PL phụ trách trucking.
- Tài xế hoặc đội trưởng tài xế nếu có thể.
- Chủ hàng nhận hàng tại kho/nhà máy.

### Câu hỏi nghiên cứu chính

1. Ai book xe và ai điều xe?
2. Đang dùng TMS, GPS, app tài xế hay Zalo/điện thoại?
3. Trạng thái xe được cập nhật như thế nào?
4. Khi xe trễ, ai biết đầu tiên?
5. Khi khách hỏi “xe đã lấy container chưa?”, nhân viên check ở đâu?
6. POD được lưu ở đâu?
7. Có trường hợp xe trễ làm phát sinh phí lưu container/lưu bãi không?
8. Có lịch hẹn kho hoặc lịch vào cảng không?
9. Có thể lấy dữ liệu GPS/TMS không?
10. Nếu chưa tích hợp được GPS/TMS, có thể cho nhân viên cập nhật thủ công theo mốc trạng thái không?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Nguồn điều xe | TMS, Excel, Zalo, điện thoại |
| Trạng thái xe | Booked, vào cảng, lấy container, rời cảng, đến kho, giao xong, trả rỗng |
| Bằng chứng giao hàng | POD, ảnh, biên bản, chữ ký |
| Pain | Không biết xe đang ở đâu, tài xế cập nhật chậm, POD thất lạc |
| Cơ hội Agentify | Timeline trucking, nhắc cập nhật, cảnh báo trễ, lưu POD theo shipment |

### Output của cụm

- Workflow trucking nội địa.
- Bộ trạng thái trucking chuẩn cho MVP.
- Đánh giá khả năng Agentify hỗ trợ cập nhật trạng thái xe.

---

## Cụm 6: Kho, WMS và 3PL warehouse

### Mục tiêu

Hiểu cách kho xác nhận hàng đã về, kiểm hàng, nhập kho, xử lý thiếu/sai/hư hỏng và cập nhật trạng thái cho các bên.

### Đối tượng cần phỏng vấn

- Warehouse coordinator.
- Nhân viên kho.
- Quản lý kho.
- 3PL warehouse operations.
- Chủ hàng có kho riêng.
- Forwarder/3PL cần nhận xác nhận từ kho.

### Câu hỏi nghiên cứu chính

1. Kho thuộc chủ hàng, 3PL hay nhà máy?
2. Kho dùng WMS, ERP, Excel hay giấy?
3. Ai xác nhận hàng đã vào kho?
4. Trạng thái nhập kho được cập nhật cho ai?
5. Có lịch hẹn inbound không?
6. Có hay lệch giữa trạng thái xe báo đã giao và kho chưa nhập không?
7. Khi thiếu/sai/hư hỏng hàng, ai được báo?
8. Có API/export từ WMS không?
9. Có cần Agentify đóng shipment timeline sau khi kho xác nhận nhập hàng không?
10. Agentify có thể phát hiện bất thường như “xe đã giao nhưng kho chưa nhập” không?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Hệ thống kho | WMS, ERP, Excel, giấy |
| Trạng thái kho | Chưa nhận, đã nhận, đang kiểm, đã nhập, thiếu, sai, hư hỏng |
| Kênh cập nhật | WMS, email, Zalo, file |
| Pain | Cập nhật chậm, lệch trạng thái, không biết hàng đã nhập chưa |
| Cơ hội Agentify | Kết nối trạng thái kho vào shipment timeline |

### Output của cụm

- Workflow inbound kho.
- Bộ trạng thái kho cần đưa vào timeline.
- Đánh giá khả thi tích hợp WMS/Excel/email.

---

## Cụm 7: Kế toán, chi phí, hóa đơn và đối soát

### Mục tiêu

Hiểu cách doanh nghiệp ghi nhận chi phí theo shipment, phát hiện phí phát sinh, đối soát hóa đơn và liên kết giữa vận hành với kế toán.

### Đối tượng cần phỏng vấn

- Kế toán logistics.
- Kế toán công nợ.
- Operations staff phụ trách cost note.
- Quản lý vận hành.
- Chủ doanh nghiệp/giám đốc.

### Câu hỏi nghiên cứu chính

1. Chi phí lô hàng được ghi ở đâu?
2. Có đối soát theo từng shipment/container không?
3. Ops và kế toán có dùng chung dữ liệu không?
4. Có lệch giữa báo giá ban đầu và chi phí thực tế không?
5. Có phí phát sinh do trễ chứng từ, trễ xe, kẹt cảng không?
6. Có trường hợp chưa thanh toán phí nên không lấy được hàng không?
7. Hóa đơn/chứng từ phí lưu ở đâu?
8. Ai duyệt chi phí?
9. Phần nào AI chỉ nên nhắc/tóm tắt, không nên tự động làm?
10. Nếu Agentify ghi nhận cost exception theo shipment, người dùng có thấy hữu ích không?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Loại phí | Cước quốc tế, local charge, phí cảng, trucking, kho, demurrage, detention |
| Hệ thống | MISA, FAST, Bravo, SAP, Odoo, Excel |
| Quy trình đối soát | Ai nhập, ai duyệt, khi nào đối soát |
| Pain | Thiếu hóa đơn, lệch chi phí, không biết phí phát sinh từ đâu |
| Cơ hội Agentify | Ghi nhận phí phát sinh, nhắc đối soát, gom chứng từ phí |

### Output của cụm

- Bản đồ chi phí theo shipment.
- Danh sách việc không nên tự động hóa trong MVP.
- Đánh giá cost exception có phải use case đáng làm không.

---

## Cụm 8: Customer Service, Operations và Account trả lời khách

### Mục tiêu

Đây là cụm ưu tiên cao nhất. Cần hiểu chính xác khi khách hỏi “lô hàng đang ở đâu?”, ai trả lời, mất bao lâu, phải kiểm tra những nguồn nào và lỗi thường xảy ra ở đâu.

### Đối tượng cần phỏng vấn

- Customer Service logistics.
- Operations staff.
- Account manager.
- Sales admin.
- Documentation staff.
- Operations manager.
- Khách hàng nhận báo cáo trạng thái.

### Câu hỏi nghiên cứu chính

1. Ai nhận câu hỏi từ khách?
2. Khách hỏi qua email, Zalo, điện thoại, portal hay WhatsApp?
3. Một ngày/tuần có bao nhiêu câu hỏi trạng thái?
4. Một câu hỏi mất bao lâu để trả lời?
5. Người trả lời phải check những nguồn nào?
6. Có phải hỏi nội bộ nhiều người không?
7. Có template trả lời không?
8. Có từng trả lời sai, thiếu hoặc chậm không?
9. Khi đổi ca/nghỉ phép, handover thế nào?
10. Nếu có AI tóm tắt trạng thái và soạn nháp câu trả lời, người dùng có muốn dùng không?

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| Tần suất hỏi | Số câu hỏi/ngày hoặc tuần |
| Thời gian xử lý | Phút/câu hỏi |
| Nguồn cần check | Email, Excel, hãng tàu, ePort, hải quan, TMS, WMS, Zalo |
| Lỗi thường gặp | Trả lời chậm, thiếu thông tin, sai trạng thái, quên follow-up |
| Handover | Cách bàn giao khi nghỉ/đổi ca |
| Sẵn sàng trả tiền | Có muốn pilot không, giá trị kỳ vọng là gì |

### Output của cụm

- Workflow “khách hỏi trạng thái”.
- Tính toán sơ bộ thời gian lãng phí mỗi tuần.
- Danh sách tính năng ưu tiên cho Agentify: AI summary, customer reply draft, exception inbox, handover summary.

---

## Cụm 9: Excel, email, Zalo và file thủ công

### Mục tiêu

Hiểu vì sao dù có nhiều phần mềm, doanh nghiệp vẫn phải dùng Excel, email, Zalo và file thủ công để nối dữ liệu.

### Đối tượng cần phỏng vấn

- CS/Ops.
- Documentation staff.
- Trucking coordinator.
- Kế toán.
- Quản lý vận hành.
- IT/Admin nếu có.

### Câu hỏi nghiên cứu chính

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

### Dữ liệu cần thu thập

| Loại dữ liệu | Cần ghi nhận |
|---|---|
| File tracking | Cột dữ liệu, người cập nhật, tần suất |
| Email | Loại thông tin nằm trong email |
| Zalo/WhatsApp | Loại thông tin, ảnh, chứng từ, update tài xế |
| Drive/OneDrive | Chứng từ, file scan, version |
| Pain | Sai version, mất context, khó handover, không audit được |
| Cơ hội Agentify | Import, tóm tắt, timeline, nhắc thiếu dữ liệu |

### Output của cụm

- Bản đồ dữ liệu thủ công.
- Danh sách nguồn dữ liệu dễ tích hợp nhất cho MVP.
- Đánh giá rủi ro bảo mật/quyền riêng tư khi đọc email/Zalo/file.

---

## 6. Bộ chỉ số cần đo trong khảo sát

| Chỉ số | Cách đo | Vì sao quan trọng |
|---|---|---|
| Số shipment/container mỗi tháng | Hỏi trực tiếp doanh nghiệp | Đo quy mô vận hành |
| Số khách hàng B2B đang phục vụ | Hỏi forwarder/3PL | Đo áp lực cập nhật trạng thái |
| Số câu hỏi trạng thái mỗi ngày/tuần | Hỏi CS/Ops | Đo tần suất pain |
| Thời gian trả lời một câu hỏi | Hỏi và shadowing | Đo khả năng tiết kiệm thời gian |
| Số nguồn phải kiểm tra | Liệt kê trong phỏng vấn | Đo mức độ phân tán dữ liệu |
| Tần suất delay | Hỏi theo tuần/tháng | Đo mức độ rủi ro vận hành |
| Tần suất thiếu chứng từ | Hỏi documentation/ops | Đo cơ hội checklist tự động |
| Tần suất phí phát sinh | Hỏi ops/kế toán | Đo tác động tài chính |
| Tỷ lệ dùng Excel/Zalo/email | Hỏi theo workflow | Đo cơ hội nhập dữ liệu thủ công ban đầu |
| Mức sẵn sàng pilot | Hỏi trực tiếp người quyết định | Đo nhu cầu thật |
| Mức sẵn sàng trả phí | Hỏi theo kịch bản giá | Đo khả năng thương mại hóa |

---

## 7. Cách chấm điểm pain và ưu tiên cơ hội

Mỗi pain nên được chấm theo thang 1-5.

| Tiêu chí | 1 điểm | 3 điểm | 5 điểm |
|---|---|---|---|
| Tần suất | Hiếm khi xảy ra | Xảy ra hàng tuần | Xảy ra hàng ngày |
| Mức độ nghiêm trọng | Gây khó chịu nhẹ | Làm chậm xử lý | Gây mất khách, phạt, phí phát sinh |
| Thời gian mất đi | Dưới 1 giờ/tuần | 2-5 giờ/tuần | Trên 5 giờ/tuần |
| Khả năng trả tiền | Không muốn trả | Có thể trả nếu rẻ | Sẵn sàng pilot/trả phí |
| Khả thi dữ liệu | Khó lấy dữ liệu | Có thể lấy một phần | Dữ liệu có sẵn qua file/email/API |
| Phù hợp Agentify | Không phù hợp | Hỗ trợ được một phần | Rất phù hợp với AI/timeline/automation |

Công thức ưu tiên đề xuất:

```text
Điểm ưu tiên = Tần suất + Mức độ nghiêm trọng + Khả năng trả tiền + Khả thi dữ liệu + Phù hợp Agentify
```

Pain nên được ưu tiên nếu:

- Tổng điểm từ 20 trở lên.
- Có ít nhất 5 doanh nghiệp nhắc tới.
- Có người dùng thật sẵn sàng test hoặc pilot.
- Có thể làm MVP trong 4-8 tuần.

---

## 8. Kế hoạch triển khai theo giai đoạn

### Giai đoạn 1: Chuẩn bị và desk research

Thời gian đề xuất: 3-5 ngày.

Việc cần làm:

1. Hoàn thiện danh sách thuật ngữ logistics cần hiểu.
2. Lập product map theo từng layer: hải quan, cảng, TMS, WMS, ERP, kế toán, Excel/Zalo/email.
3. Lập danh sách doanh nghiệp và người cần tiếp cận.
4. Chuẩn bị bộ câu hỏi phỏng vấn theo từng nhóm.
5. Chuẩn bị form khảo sát định lượng.
6. Chuẩn bị template ghi chú phỏng vấn.

Đầu ra:

- `interview_questions.md`
- `survey_form_outline.md`
- `competitor_product_map.md`
- `research_tracker.xlsx` hoặc bảng tracker tương đương.

### Giai đoạn 2: Phỏng vấn định tính

Thời gian đề xuất: 2 tuần.

Việc cần làm:

1. Phỏng vấn 15-25 người.
2. Ghi lại workflow thực tế theo từng cụm.
3. Chấm điểm pain sau mỗi cuộc phỏng vấn.
4. Ghi lại câu nói nguyên văn thể hiện pain mạnh.
5. Xác định người dùng nào đau nhất.
6. Xác định use case nào được nhắc lại nhiều nhất.

Đầu ra:

- Bảng tổng hợp insight theo từng cụm.
- Pain ranking bản đầu.
- Danh sách 3-5 use case tiềm năng.
- Danh sách khách hàng có thể pilot.

### Giai đoạn 3: Khảo sát định lượng

Thời gian đề xuất: 1 tuần.

Việc cần làm:

1. Gửi form khảo sát tới nhóm logistics, forwarder, 3PL, chủ hàng, trucking, kho.
2. Thu ít nhất 50 phản hồi.
3. Đo tần suất pain, thời gian mất đi và mức sẵn sàng dùng thử.
4. So sánh kết quả định lượng với insight định tính.

Đầu ra:

- Bảng số liệu khảo sát.
- Biểu đồ pain ranking.
- Biểu đồ mức độ sẵn sàng pilot/trả phí.
- Kết luận nhóm ICP ưu tiên.

### Giai đoạn 4: Shadowing và workflow validation

Thời gian đề xuất: 1 tuần.

Việc cần làm:

1. Quan sát 3-5 buổi làm việc của CS/Ops.
2. Ghi lại luồng trả lời câu hỏi trạng thái.
3. Đo thời gian từng bước.
4. Chụp lại cấu trúc file tracking nếu được phép.
5. Xác định dữ liệu nào có thể đưa vào Agentify trước.

Đầu ra:

- Workflow thực tế.
- Danh sách automation opportunity.
- Danh sách rào cản dữ liệu/bảo mật.

### Giai đoạn 5: Tổng hợp và đề xuất MVP

Thời gian đề xuất: 3-5 ngày.

Việc cần làm:

1. Tổng hợp insight theo cụm.
2. Chọn ICP ưu tiên.
3. Chọn use case MVP.
4. Đề xuất tính năng MVP.
5. Đề xuất kế hoạch pilot.
6. Đưa ra quyết định Go / No-go / Pivot.

Đầu ra:

- `market_research_report.md`
- `agentify_logistics_mvp_proposal.md`
- `pilot_plan.md`

---

## 9. Timeline đề xuất

| Tuần | Mục tiêu | Hoạt động chính | Đầu ra |
|---|---|---|---|
| Tuần 1 | Chuẩn bị research | Desk research, lập danh sách người phỏng vấn, chuẩn bị câu hỏi | Research setup, interview guide |
| Tuần 2 | Phỏng vấn sâu | 8-12 cuộc phỏng vấn đầu tiên | Insight sơ bộ, pain ranking bản 1 |
| Tuần 3 | Phỏng vấn tiếp và khảo sát form | 7-13 cuộc phỏng vấn tiếp, gửi survey | Pain ranking bản 2, dữ liệu định lượng |
| Tuần 4 | Shadowing và prototype test | Quan sát workflow, test concept Agentify | Workflow validation, feedback MVP |
| Tuần 5 | Tổng hợp báo cáo | Viết báo cáo thị trường, đề xuất MVP, kế hoạch pilot | Market research report, MVP proposal |

---

## 10. Tiêu chí quyết định Go / No-go / Pivot

### Go

Nên tiếp tục nếu đạt các điều kiện:

- Ít nhất 60% người được phỏng vấn xác nhận pain dữ liệu phân tán/cập nhật trạng thái là vấn đề thật.
- Ít nhất 5 doanh nghiệp có workflow phù hợp với Agentify.
- Ít nhất 3 doanh nghiệp sẵn sàng test prototype hoặc pilot.
- Use case MVP có thể làm với dữ liệu email, Excel, file tracking hoặc cập nhật thủ công.
- Người dùng đồng ý rằng AI summary/customer reply draft/exception inbox giúp tiết kiệm thời gian.

### No-go

Nên dừng nếu:

- Pain không đủ lớn hoặc chỉ là vấn đề nhỏ.
- Doanh nghiệp không sẵn sàng trả tiền.
- Dữ liệu không thể lấy được ở mức tối thiểu.
- Người dùng đã có hệ thống giải quyết tốt vấn đề này.
- Use case yêu cầu tích hợp quá sâu hoặc rủi ro pháp lý cao ngay từ đầu.

### Pivot

Nên chuyển hướng nếu:

- Pain lớn nhất không nằm ở shipment status mà nằm ở chứng từ.
- Pain lớn nhất nằm ở đối soát phí.
- Pain lớn nhất nằm ở trucking visibility.
- Người mua không phải forwarder/3PL mà là chủ hàng.
- Sản phẩm nên bán như add-on cho hệ thống có sẵn, không phải platform độc lập.

---

## 11. Deliverables cần hoàn thành sau khảo sát

| Tài liệu | Nội dung |
|---|---|
| `market_research_report.md` | Báo cáo thị trường logistics B2B/XNK Việt Nam |
| `user_research_report.md` | Báo cáo nhu cầu người dùng theo từng vai trò |
| `pain_ranking.md` | Bảng xếp hạng pain theo tần suất, mức độ đau, khả năng trả tiền |
| `competitor_product_map.md` | Bản đồ sản phẩm/đối thủ theo từng layer |
| `workflow_map.md` | Luồng vận hành thực tế của một shipment |
| `agentify_opportunity_map.md` | Cơ hội sản phẩm cho Agentify |
| `mvp_proposal.md` | Đề xuất MVP, tính năng, phạm vi không làm |
| `pilot_plan.md` | Kế hoạch pilot với khách hàng thật |

---

## 12. Kết luận định hướng ban đầu

Khảo sát nên ưu tiên kiểm chứng nhu cầu ở nhóm forwarder và 3PL tầm trung trước, vì đây là nhóm thường phải kết nối nhiều bên: chủ hàng, hãng tàu, hải quan, cảng, trucking, kho, kế toán và khách hàng B2B.

Use case cần kiểm chứng sớm nhất là:

> Agentify giúp CS/Ops gom thông tin từ Excel, email, file tracking và cập nhật thủ công để tạo timeline lô hàng, tóm tắt trạng thái, cảnh báo lô hàng có vấn đề và soạn nháp câu trả lời cho khách.

Nếu use case này được xác nhận là đau thật, có tần suất cao và có người sẵn sàng pilot, Agentify có cơ hội trở thành lớp trung gian vận hành giữa các hệ thống logistics đang rời rạc trên thị trường.
