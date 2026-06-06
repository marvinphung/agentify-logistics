# Cụm 6: Kho, WMS và 3PL warehouse

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để nghiên cứu lớp **kho, WMS và 3PL warehouse** trong logistics công nghiệp, B2B và xuất nhập khẩu tại Việt Nam.

Nếu các cụm trước trả lời:

- Cụm 1: hàng đã qua được hải quan/cảng/depot/ICD chưa?
- Cụm 4: bộ chứng từ xuất nhập khẩu đã đủ và đúng chưa?
- Cụm 5: xe đã lấy/giao/trả container đúng kế hoạch chưa?

thì Cụm 6 trả lời câu hỏi:

> Sau khi xe đến kho, hàng đã thật sự được nhận, kiểm, nhập kho, ghi nhận tồn, xử lý lệch thiếu/sai/hư hỏng và báo trạng thái cho các bên chưa?

Đây là một cụm quan trọng vì trong thực tế, trạng thái "xe đã giao" không đồng nghĩa với "hàng đã nhập kho thành công". Kho có thể chưa nhận, chưa kiểm, thiếu hàng, sai mã, hư hỏng, thiếu chứng từ, chưa tạo GRN, chưa cập nhật tồn hoặc chưa gửi xác nhận cho khách.

Các câu hỏi chính cần trả lời:

1. Kho thuộc chủ hàng, nhà máy, forwarder, 3PL hay ICD/CFS?
2. Kho đang dùng WMS, ERP, module inventory, Excel, Google Sheet, giấy hay kết hợp nhiều công cụ?
3. Ai là người xác nhận hàng đã đến kho, đã dỡ hàng, đã kiểm hàng và đã nhập tồn?
4. Trạng thái inbound/outbound của kho đang được cập nhật cho ai và qua kênh nào?
5. Khi có lệch thiếu, sai mã, hư hỏng, quá hạn, thiếu chứng từ hoặc thiếu slot, ai phát hiện và ai chịu trách nhiệm báo?
6. WMS hiện tại có API/export/report không?
7. Dữ liệu kho có được nối với shipment timeline, trucking timeline, chứng từ và báo cáo khách hàng không?
8. Agentify nên làm WMS mới, hay làm lớp trung gian gom trạng thái kho vào shipment timeline và exception inbox?
9. Use case kho nào đủ hẹp để làm MVP nhưng đủ đau để khách hàng muốn thử?

Kết luận cần kiểm chứng:

> Kho/WMS là lớp dữ liệu quan trọng nhưng thường bị tách khỏi shipment visibility. Cơ hội của Agentify không phải là thay thế WMS, mà là làm lớp "warehouse visibility and exception copilot": gom trạng thái inbound/outbound từ WMS, Excel, email, Zalo, ảnh POD/GRN; phát hiện bất thường như xe đã giao nhưng kho chưa nhập; tóm tắt tình trạng cho CS/Ops; và tự động soạn báo cáo cho khách.

---

## 2. Vì sao kho/WMS/3PL warehouse quan trọng?

### 2.1. Kho là điểm xác nhận hàng đã thật sự đi vào chuỗi cung ứng nội địa

Trong logistics B2B/XNK, rất nhiều lô hàng chỉ được xem là "xong" khi kho đã xác nhận hàng đã nhận và nhập tồn. Với hàng nhập khẩu, quá trình thường là:

```text
Tàu đến
  -> thông quan
  -> lấy container khỏi cảng/ICD
  -> xe giao về kho/nhà máy
  -> kho dỡ hàng
  -> kiểm số lượng/chất lượng
  -> nhập tồn
  -> phát hiện lệch nếu có
  -> gửi xác nhận cho chủ hàng/3PL/forwarder
```

Nếu lô hàng bị chậm ở kho, hậu quả không chỉ là chậm một bước nội bộ. Nó có thể kéo theo:

- Không có hàng để sản xuất.
- Không có tồn để bán.
- Không giao được đơn B2B tiếp theo.
- Không đóng được container xuất khẩu.
- Không có bằng chứng để đối soát với nhà vận tải.
- Không có cơ sở để tính phí kho/3PL.
- CS/Ops không trả lời được khách.

Vì vậy, trạng thái kho là một phần quan trọng của shipment timeline.

### 2.2. Kho không chỉ là nơi chứa hàng

Người ngoài ngành thường nghĩ kho chỉ là nơi để hàng. Trong vận hành logistics, kho là nơi thực hiện nhiều nghiệp vụ:

- Nhận hàng inbound.
- Kiểm đếm.
- Kiểm chất lượng.
- Phân loại hàng.
- Dán nhãn.
- Chụp ảnh tình trạng hàng.
- Nhập tồn theo SKU/batch/lot/serial.
- Cất hàng vào vị trí.
- Lấy hàng theo đơn.
- Đóng gói.
- Bàn giao cho xe outbound.
- Lưu bằng chứng giao nhận.
- Gửi báo cáo tồn kho.
- Tính phí lưu kho, bốc xếp, handling, VAS.

Với 3PL warehouse, độ phức tạp cao hơn vì một kho có thể phục vụ nhiều khách hàng, nhiều SKU, nhiều loại hàng, nhiều quy định SLA và nhiều kiểu phí.

### 2.3. Thị trường kho hiện đại tại Việt Nam đang mở rộng

Theo các báo cáo thị trường bất động sản công nghiệp và logistics, nhu cầu kho hiện đại tại Việt Nam tiếp tục được thúc đẩy bởi FDI sản xuất, thương mại điện tử, 3PL, FMCG, công nghiệp điện tử và chuỗi cung ứng khu vực.

Một số tín hiệu đáng chú ý:

- CBRE ghi nhận điều kiện thị trường logistics và warehousing tại Việt Nam cải thiện trong các quý gần đây, với nhu cầu hỏi thuê kho hiện đại tăng từ nhà sản xuất, nền tảng e-commerce và 3PL.
- Cushman & Wakefield cho biết đến cuối Q4/2025, nguồn cung ready-built warehouse tại miền Bắc đạt khoảng 3,575,000 m2 NLA, tập trung mạnh ở Bắc Ninh, Hải Phòng, Hưng Yên và Hà Nội.
- Vietnam News dẫn báo cáo JLL cho thấy ready-built warehouse vẫn tăng trưởng ổn định, net absorption Q4/2025 đạt 125,000 m2, cao hơn tổng ba quý đầu năm cộng lại.
- VnEconomy ghi nhận nguồn cung ready-built warehouse tại miền Nam đến cuối Q4/2025 đạt khoảng 2.4 triệu m2, tăng 11.2% so với 2024.

Ý nghĩa cho Agentify:

- Khi hạ tầng kho hiện đại tăng, dữ liệu vận hành kho cũng tăng.
- Doanh nghiệp sẽ cần nhiều visibility hơn giữa kho, xe, chứng từ, khách hàng và kế toán.
- WMS sẽ ngày càng phổ biến, nhưng không giải quyết hết bài toán kết nối liên phòng ban và liên doanh nghiệp.

### 2.4. Chuyển đổi số logistics tạo nhu cầu cho lớp trung gian

Chiến lược phát triển dịch vụ logistics Việt Nam giai đoạn 2025-2035 đặt trọng tâm vào chuyển đổi số, nền tảng số, dữ liệu logistics, AI và big data.

Tuy nhiên, trong vận hành thật, chuyển đổi số thường diễn ra theo từng mảng riêng:

- Kho dùng WMS.
- Đội xe dùng TMS hoặc GPS.
- Chủ hàng dùng ERP.
- Kế toán dùng phần mềm kế toán.
- CS dùng email/Zalo.
- Ops dùng Excel tracking.
- 3PL gửi báo cáo định kỳ bằng file.

Kết quả là công ty có nhiều phần mềm hơn, nhưng người trả lời câu hỏi "hàng đang ở đâu, đã nhập kho chưa, có lệch không?" vẫn phải mở nhiều nguồn.

Đây là khoảng trống của Agentify.

---

## 3. Thuật ngữ cần giải thích

### 3.1. Warehouse là gì?

**Warehouse** là kho hàng, nơi lưu trữ, xử lý, kiểm đếm, phân loại và bàn giao hàng hóa.

Trong logistics B2B/XNK, warehouse có thể là:

- Kho của nhà máy.
- Kho của chủ hàng.
- Kho thuê ngoài của 3PL.
- Kho ngoại quan.
- Kho CFS xử lý hàng lẻ.
- Kho tại ICD.
- Kho trung tâm phân phối.
- Kho thành phẩm.
- Kho nguyên vật liệu.

### 3.2. 3PL warehouse là gì?

**3PL warehouse** là kho do bên thứ ba cung cấp dịch vụ logistics vận hành cho khách hàng.

3PL có thể làm:

- Nhận hàng.
- Lưu kho.
- Quản lý tồn.
- Pick/pack.
- Dán nhãn.
- Đóng gói lại.
- Cross-docking.
- Giao hàng.
- Báo cáo tồn kho.
- Tính phí kho và phí xử lý.

Ví dụ dễ hiểu:

Một công ty nhập linh kiện từ nước ngoài về Việt Nam nhưng không muốn tự thuê kho và tuyển đội kho. Công ty thuê 3PL quản lý kho. 3PL nhận container, kiểm hàng, nhập tồn, xuất hàng cho nhà máy theo lịch sản xuất và gửi báo cáo tồn kho hằng ngày.

### 3.3. WMS là gì?

**WMS** là viết tắt của **Warehouse Management System**, tức hệ thống quản lý kho.

WMS thường quản lý:

- Hàng nào đang ở kho nào.
- Hàng nằm ở vị trí nào trong kho.
- Số lượng tồn.
- Batch/lot/serial.
- Hạn sử dụng nếu có.
- Phiếu nhập.
- Phiếu xuất.
- Lệnh pick hàng.
- Putaway.
- Kiểm kê.
- Điều phối nhân sự kho.
- Báo cáo tồn.

WMS khác Excel ở chỗ WMS thường có quy trình, mã vạch, phân quyền, lịch sử thao tác và cập nhật theo vị trí kho.

### 3.4. ERP là gì trong bối cảnh kho?

**ERP** là hệ thống quản trị nguồn lực doanh nghiệp. ERP có thể quản lý mua hàng, bán hàng, sản xuất, kế toán, tồn kho và tài chính.

Trong nhiều doanh nghiệp, ERP là nơi ghi nhận tồn kho ở mức kế toán hoặc quản trị. Nhưng ERP không phải lúc nào cũng đủ chi tiết để điều hành kho theo vị trí kệ, mã vạch, lệnh pick, putaway và năng suất nhân viên.

Do đó, một doanh nghiệp có thể dùng cả ERP và WMS:

```text
ERP: đơn hàng, mua hàng, bán hàng, kế toán, tồn tổng
WMS: thao tác thực tế trong kho, vị trí hàng, nhập/xuất, pick/pack
```

### 3.5. Inbound là gì?

**Inbound** là luồng hàng đi vào kho.

Ví dụ:

- Container nhập khẩu về kho.
- Nhà cung cấp giao nguyên vật liệu vào nhà máy.
- Hàng từ một kho khác chuyển đến.
- Hàng trả lại từ khách hàng.

Inbound thường gồm các bước:

```text
Thông báo hàng đến
  -> xe đến cổng
  -> kiểm chứng từ
  -> dỡ hàng
  -> kiểm số lượng/chất lượng
  -> ghi nhận lệch nếu có
  -> nhập kho
  -> cất hàng vào vị trí
```

### 3.6. Outbound là gì?

**Outbound** là luồng hàng đi ra khỏi kho.

Ví dụ:

- Xuất hàng giao cho khách B2B.
- Xuất nguyên vật liệu cho sản xuất.
- Xuất hàng ra cảng để xuất khẩu.
- Xuất hàng chuyển sang kho khác.

Outbound thường gồm:

```text
Nhận lệnh xuất
  -> tạo pick list
  -> lấy hàng
  -> kiểm hàng
  -> đóng gói
  -> staging
  -> bốc lên xe
  -> bàn giao chứng từ
  -> cập nhật xuất kho
```

### 3.7. Receiving là gì?

**Receiving** là bước nhận hàng vào kho. Nhân viên kho kiểm xe, chứng từ, số kiện, mã hàng, tình trạng hàng và xác nhận đã nhận.

Receiving là bước rất quan trọng vì nó tạo cơ sở cho:

- Nhập tồn.
- Xác nhận giao hàng.
- Khiếu nại thiếu/sai/hư hỏng.
- Đối soát với nhà vận tải.
- Báo cáo cho khách.

### 3.8. Putaway là gì?

**Putaway** là bước đưa hàng đã nhận vào vị trí lưu trữ trong kho.

Ví dụ:

- Hàng A đưa vào kệ K01-B03.
- Pallet B đưa vào khu hàng nặng.
- Hàng gần hết hạn đưa vào khu ưu tiên xuất trước.

Nếu putaway không được ghi nhận đúng, WMS có thể báo có hàng nhưng nhân viên không tìm thấy hàng.

### 3.9. Picking là gì?

**Picking** là bước lấy hàng khỏi vị trí lưu trữ để chuẩn bị giao.

Ví dụ:

Khách đặt 10 thùng mã SKU-001. WMS tạo pick list, nhân viên đi đến vị trí hàng, scan mã và lấy đúng 10 thùng.

Picking sai có thể gây:

- Giao thiếu.
- Giao nhầm mã.
- Giao sai batch.
- Khiếu nại từ khách.
- Tốn thời gian đổi trả.

### 3.10. Packing là gì?

**Packing** là bước đóng gói hàng sau khi pick.

Trong kho B2B, packing có thể bao gồm:

- Đóng thùng.
- Quấn màng pallet.
- Dán nhãn.
- Đóng kiện.
- In packing slip.
- Chụp ảnh trước khi bàn giao.

### 3.11. Staging là gì?

**Staging** là khu vực tập kết hàng trước khi xuất kho hoặc sau khi dỡ hàng.

Ví dụ:

- Hàng đã pick xong được đưa ra khu staging chờ xe.
- Hàng inbound dỡ khỏi container được đặt tạm ở staging trước khi kiểm và putaway.

Staging giúp kho kiểm soát hàng đang chuyển trạng thái, nhưng nếu quản lý kém sẽ dễ nhầm lẫn.

### 3.12. GRN là gì?

**GRN** là viết tắt của **Goods Receipt Note**, tức phiếu ghi nhận hàng đã nhận.

GRN thường thể hiện:

- Ngày nhận hàng.
- Mã hàng.
- Số lượng nhận.
- Tình trạng hàng.
- Người nhận.
- Lệch thiếu/sai/hư hỏng nếu có.

Với Agentify, GRN là một dữ liệu quan trọng để đóng trạng thái inbound: "hàng đã được kho xác nhận".

### 3.13. ASN là gì?

**ASN** là viết tắt của **Advanced Shipping Notice**, tức thông báo trước về lô hàng sắp đến kho.

ASN thường có:

- Số PO hoặc shipment.
- Danh sách SKU.
- Số lượng dự kiến.
- Ngày giờ xe đến.
- Số container/xe.
- Chứng từ đi kèm.

Nếu kho có ASN trước, kho có thể chuẩn bị nhân sự, cửa dock, khu staging và kế hoạch nhận hàng.

### 3.14. SKU là gì?

**SKU** là viết tắt của **Stock Keeping Unit**, tức mã hàng dùng để quản lý tồn kho.

Ví dụ:

- Cùng là áo sơ mi, size M và size L có thể là hai SKU khác nhau.
- Cùng là linh kiện, màu đỏ và màu xanh có thể là hai SKU khác nhau.
- Cùng một loại hàng nhưng batch khác nhau có thể cần theo dõi riêng.

### 3.15. Batch, lot và serial là gì?

**Batch/lot** là lô sản xuất hoặc lô hàng. Một batch có thể gồm nhiều sản phẩm cùng đặc tính.

**Serial** là số định danh riêng cho từng sản phẩm hoặc thiết bị.

Ví dụ:

- Thuốc, thực phẩm, hóa chất thường cần batch/lot.
- Máy móc, thiết bị điện tử thường cần serial.

### 3.16. Inventory accuracy là gì?

**Inventory accuracy** là độ chính xác tồn kho, tức mức độ khớp giữa tồn trên hệ thống và tồn thực tế.

Nếu WMS báo còn 100 thùng nhưng kho thực tế chỉ còn 96 thùng, inventory accuracy có vấn đề.

### 3.17. Cycle count và stocktake là gì?

**Cycle count** là kiểm kê định kỳ theo từng nhóm hàng hoặc khu vực, không nhất thiết dừng toàn bộ kho.

**Stocktake** là kiểm kê toàn kho, thường làm theo kỳ lớn hơn.

### 3.18. Cross-docking là gì?

**Cross-docking** là mô hình hàng vào kho rồi đi ra gần như ngay, không lưu kho lâu.

Ví dụ:

Xe A chở hàng từ cảng về kho trung chuyển. Kho phân loại nhanh, sau đó chuyển sang xe B, C, D để giao cho các nhà máy khác nhau.

### 3.19. Dock appointment là gì?

**Dock appointment** là lịch hẹn xe vào cửa bốc/dỡ hàng tại kho.

Nếu xe đến mà không có lịch, kho có thể không có cửa trống hoặc không có nhân sự dỡ hàng.

### 3.20. Discrepancy là gì?

**Discrepancy** là sai lệch giữa kế hoạch/chứng từ và thực tế.

Trong kho, discrepancy thường gồm:

- Nhận thiếu hàng.
- Nhận dư hàng.
- Sai mã hàng.
- Sai batch/lot.
- Hàng hư hỏng.
- Thùng móp, rách, ướt.
- Chứng từ không khớp.

### 3.21. POD và POR là gì?

**POD** là **Proof of Delivery**, bằng chứng giao hàng. POD có thể là phiếu giao hàng có ký nhận, ảnh chụp, biên bản hoặc xác nhận điện tử.

**POR** là **Proof of Receipt**, bằng chứng nhận hàng. Trong bối cảnh kho, POR có thể là xác nhận của kho rằng hàng đã được nhận.

---

## 4. Workflow inbound kho

### 4.1. Workflow inbound chuẩn

Một luồng inbound kho B2B/XNK thường đi theo các bước:

```text
1. Chủ hàng/forwarder/3PL gửi kế hoạch hàng về kho
2. Kho nhận ASN hoặc thông báo trước
3. Kho kiểm lịch xe, dock, nhân sự và khu staging
4. Xe đến cổng kho
5. Bảo vệ/kho kiểm thông tin xe, tài xế, container, seal, chứng từ
6. Xe vào dock hoặc khu chờ
7. Kho dỡ hàng
8. Kho kiểm số kiện, SKU, batch, tình trạng hàng
9. Kho ghi nhận thiếu/sai/hư hỏng nếu có
10. Kho tạo receiving record hoặc GRN
11. Hàng được putaway vào vị trí
12. Tồn kho được cập nhật trong WMS/ERP/Excel
13. Kho gửi xác nhận cho khách/CS/Ops
14. Nếu có lệch, tạo biên bản và chờ xử lý
```

Nhìn từ phía khách hàng, họ chỉ muốn biết:

- Xe đã đến kho chưa?
- Kho đã nhận hàng chưa?
- Hàng có đủ không?
- Có hư hỏng không?
- Đã nhập tồn chưa?
- Khi nào có thể xuất tiếp?

Nhưng để trả lời được, CS/Ops phải gom dữ liệu từ nhiều bước.

### 4.2. Các trạng thái inbound cần đưa vào timeline

Agentify nên chuẩn hóa bộ trạng thái inbound như sau:

| Nhóm trạng thái | Trạng thái đề xuất | Ý nghĩa |
|---|---|---|
| Trước khi xe đến | ASN received | Kho đã nhận thông báo hàng đến |
| Trước khi xe đến | Appointment confirmed | Kho đã xác nhận lịch nhận hàng |
| Cổng kho | Truck arrived | Xe đã đến cổng kho |
| Cổng kho | Waiting for dock | Xe đang chờ dock/cửa dỡ |
| Dỡ hàng | Unloading started | Bắt đầu dỡ hàng |
| Dỡ hàng | Unloading completed | Dỡ hàng xong |
| Kiểm hàng | Receiving in progress | Kho đang kiểm nhận |
| Kiểm hàng | Discrepancy found | Có sai lệch |
| Kiểm hàng | Damage found | Có hư hỏng |
| Nhập kho | GRN issued | Đã tạo xác nhận nhận hàng |
| Nhập kho | Putaway completed | Đã cất hàng vào vị trí |
| Nhập kho | Inventory available | Tồn đã sẵn sàng để dùng/xuất |
| Ngoại lệ | On hold | Hàng bị giữ để xử lý vấn đề |

### 4.3. Điểm hay đứt gãy trong inbound

Các điểm dễ đứt gãy:

1. Xe đã đến nhưng kho chưa có ASN.
2. Xe đến sai giờ hoặc kho không có slot.
3. Tài xế thiếu chứng từ.
4. Số container/seal không khớp.
5. Kho dỡ hàng xong nhưng chưa kiểm.
6. Kho kiểm xong nhưng chưa tạo GRN.
7. WMS đã nhập nhưng CS/Ops chưa được báo.
8. Có hư hỏng nhưng ảnh/biên bản nằm trong Zalo.
9. Hàng đã nhận nhưng chưa putaway nên chưa available.
10. Chủ hàng hỏi tồn nhưng dữ liệu chưa đồng bộ từ WMS sang ERP.

### 4.4. Vì sao "đã giao" chưa đủ?

Trong trucking, tài xế có thể báo:

> Em giao hàng xong rồi.

Nhưng với kho, "giao xong" có nhiều mức:

- Xe đã đến cổng.
- Xe đã vào dock.
- Hàng đã dỡ xuống.
- Kho đã ký nhận tạm.
- Kho đã kiểm hàng.
- Kho đã tạo GRN.
- Kho đã nhập tồn.
- Hàng đã available để xuất tiếp.

Nếu Agentify chỉ lấy trạng thái từ trucking, timeline có thể kết luận sai. Cần thêm trạng thái kho để biết lô hàng đã thật sự hoàn tất.

---

## 5. Workflow outbound kho

### 5.1. Workflow outbound chuẩn

Outbound kho B2B thường đi theo các bước:

```text
1. Khách/chủ hàng gửi lệnh xuất hoặc sales order
2. Kho kiểm tồn khả dụng
3. Kho tạo pick list
4. Nhân viên kho pick hàng
5. Kho kiểm lại số lượng/mã hàng
6. Kho đóng gói hoặc chuẩn bị pallet
7. Hàng đưa ra staging
8. Điều xe hoặc xác nhận xe đến lấy
9. Xe đến kho
10. Kho bốc hàng lên xe
11. Tài xế/kho ký bàn giao
12. Kho cập nhật xuất kho
13. Gửi POD/delivery note cho khách/CS/Ops
```

### 5.2. Các trạng thái outbound cần đưa vào timeline

| Nhóm trạng thái | Trạng thái đề xuất | Ý nghĩa |
|---|---|---|
| Lệnh xuất | Order received | Kho đã nhận lệnh xuất |
| Tồn kho | Stock checked | Đã kiểm tồn |
| Tồn kho | Stock shortage | Không đủ tồn |
| Chuẩn bị | Pick list created | Đã tạo lệnh lấy hàng |
| Chuẩn bị | Picking in progress | Đang lấy hàng |
| Chuẩn bị | Picking completed | Lấy hàng xong |
| Chuẩn bị | Packing completed | Đóng gói xong |
| Chuẩn bị | Staged for dispatch | Hàng đã ra khu chờ xuất |
| Bàn giao | Truck arrived | Xe đến lấy hàng |
| Bàn giao | Loading started | Bắt đầu bốc hàng |
| Bàn giao | Dispatched | Xe đã rời kho |
| Sau giao | POD pending | Chờ bằng chứng giao hàng |
| Sau giao | POD received | Đã có bằng chứng giao hàng |

### 5.3. Điểm hay đứt gãy trong outbound

Các vấn đề thường gặp:

- Lệnh xuất gửi qua email/Zalo nhưng chưa vào WMS.
- WMS báo có tồn nhưng hàng chưa available do chưa putaway.
- Hàng bị hold do kiểm chất lượng.
- Pick nhầm mã hoặc thiếu số lượng.
- Đã đóng hàng nhưng xe chưa đến.
- Xe đến nhưng hàng chưa staging.
- Xe lấy hàng xong nhưng POD chưa gửi.
- Kho xuất xong nhưng khách chưa nhận được báo cáo.
- Phí bốc xếp, lưu kho, handling chưa được ghi nhận đúng để billing.

---

## 6. Workflow 3PL warehouse

### 6.1. Vì sao 3PL warehouse phức tạp hơn kho nội bộ?

Kho nội bộ thường phục vụ một doanh nghiệp. 3PL warehouse phục vụ nhiều khách hàng cùng lúc.

Một 3PL warehouse có thể phải quản lý:

- Nhiều chủ hàng.
- Nhiều loại hàng.
- Nhiều quy định nhận/xuất khác nhau.
- Nhiều SLA.
- Nhiều bảng phí.
- Nhiều format báo cáo.
- Nhiều kênh nhận yêu cầu.
- Nhiều người hỏi trạng thái.

Ví dụ:

- Khách A yêu cầu báo cáo tồn hằng ngày lúc 17:00.
- Khách B yêu cầu ảnh khi hàng hư hỏng.
- Khách C yêu cầu xuất FIFO.
- Khách D yêu cầu theo batch/lot.
- Khách E yêu cầu đối soát phí theo pallet/ngày.

Nếu WMS không có customer portal tốt hoặc khách không dùng portal, CS/Account của 3PL vẫn phải trả lời thủ công.

### 6.2. Nghiệp vụ value-added services trong 3PL

3PL warehouse không chỉ lưu kho. Họ có thể làm **VAS**, tức dịch vụ giá trị gia tăng:

- Dán nhãn phụ.
- Dán tem.
- Đóng gói lại.
- Kitting.
- Bundling.
- Kiểm chất lượng.
- Chụp ảnh hàng.
- Phân loại.
- Rework.
- Dán mã vạch.

Các nghiệp vụ VAS thường phát sinh phí và cần bằng chứng. Nếu không ghi nhận đúng, dễ tranh chấp khi đối soát.

### 6.3. 3PL cần báo cáo gì cho khách?

Báo cáo của 3PL warehouse thường gồm:

- Tồn kho cuối ngày.
- Hàng nhập trong ngày.
- Hàng xuất trong ngày.
- Hàng đang hold.
- Hàng thiếu/sai/hư hỏng.
- Hàng quá hạn lưu kho.
- Aging inventory.
- SLA inbound/outbound.
- Phí lưu kho.
- Phí bốc xếp.
- Phí VAS.
- POD/GRN còn thiếu.

Vấn đề là nhiều báo cáo này vẫn được gửi bằng Excel/PDF/email, dù dữ liệu gốc nằm trong WMS.

---

## 7. Thực trạng quản lý kho tại Việt Nam

### 7.1. Thị trường có nhiều loại kho với mức độ số hóa khác nhau

Không nên giả định mọi kho đều giống nhau. Có thể chia thành các nhóm:

| Nhóm kho | Đặc điểm | Mức độ số hóa thường gặp |
|---|---|---|
| Kho nhà máy lớn | Gắn với ERP/sản xuất | ERP + WMS hoặc module inventory |
| Kho chủ hàng vừa | Quản lý tồn và đơn B2B | ERP/Excel/WMS nhẹ |
| 3PL warehouse chuyên nghiệp | Phục vụ nhiều khách | WMS + báo cáo khách |
| Kho ICD/CFS | Gắn với container/hàng lẻ | Hệ thống nội bộ + chứng từ + Excel |
| Kho thương mại điện tử | Nhiều đơn nhỏ, pick/pack nhanh | WMS/OMS/TMS tích hợp |
| Kho SME | Quy mô nhỏ, ít IT | Excel, giấy, Zalo |

Agentify nên tập trung vào nhóm có nhiều giao tiếp liên doanh nghiệp và nhiều câu hỏi trạng thái, thay vì nhóm chỉ cần kiểm tồn nội bộ.

### 7.2. WMS đang phát triển nhưng chưa phải câu trả lời cho mọi bài toán visibility

WMS làm tốt nghiệp vụ trong kho:

- Nhập hàng.
- Xuất hàng.
- Vị trí hàng.
- Kiểm kê.
- Mã vạch.
- Quy trình pick/pack.

Nhưng WMS thường không tự giải quyết tốt các việc:

- Gom trạng thái shipment từ cảng, trucking, kho và chứng từ.
- Tự giải thích trạng thái cho CS không chuyên kho.
- Tạo customer update bằng ngôn ngữ dễ hiểu.
- Ghép ảnh Zalo/email vào đúng shipment.
- Phát hiện "xe đã giao nhưng kho chưa nhập".
- Nhắc follow-up khi GRN/POD còn thiếu.
- Tạo exception inbox cho toàn bộ lô hàng.
- Chuẩn hóa báo cáo cho từng khách nếu dữ liệu đến từ nhiều nguồn.

Vì vậy, Agentify không nên cạnh tranh trực diện với WMS ở tầng vận hành kho sâu. Agentify nên đứng ở lớp kết nối và diễn giải.

### 7.3. Excel/email/Zalo vẫn giữ vai trò lớn

Ngay cả khi doanh nghiệp có WMS, các kênh thủ công vẫn tồn tại:

- Khách gửi lệnh xuất qua email.
- Tài xế gửi ảnh qua Zalo.
- Kho gửi biên bản thiếu hàng trong group chat.
- CS lưu file tracking riêng.
- Account gửi báo cáo tồn bằng Excel.
- Kế toán đối soát phí bằng file.
- Manager xem dashboard khác.

Nguyên nhân:

- Khách hàng không muốn login portal.
- WMS không tích hợp với hệ thống của khách.
- Mỗi khách có format báo cáo riêng.
- Một số sự kiện phát sinh ngoài quy trình chuẩn.
- Nhân viên cần trao đổi nhanh bằng chat.
- Chi phí tích hợp API cao.

Đây là môi trường phù hợp với một lớp AI/copilot biết đọc, gom, chuẩn hóa và tóm tắt.

### 7.4. Kho là nơi có nhiều bằng chứng vật lý

Khác với booking hoặc chứng từ, kho có nhiều dữ liệu dạng hình ảnh và bằng chứng:

- Ảnh container.
- Ảnh seal.
- Ảnh kiện hàng hư hỏng.
- Ảnh pallet.
- Ảnh phiếu giao nhận.
- Ảnh biên bản.
- Video receiving/packing nếu kho có hệ thống camera.
- Chữ ký nhận hàng.

Các bằng chứng này thường không nằm gọn trong WMS hoặc không được gắn đúng shipment/customer/order. Agentify có thể tạo giá trị bằng cách:

- Nhận ảnh từ email/mobile form.
- OCR thông tin trên phiếu.
- Gắn ảnh vào shipment/order.
- Tạo summary cho discrepancy.
- Tạo bằng chứng cho đối soát.

---

## 8. Pain ranking sơ bộ của Cụm 6

### 8.1. Pain 1: Xe đã giao nhưng kho chưa xác nhận nhập

Đây là pain rất phổ biến và dễ hiểu.

Tình huống:

- Trucking báo đã giao.
- Tài xế gửi ảnh POD.
- CS báo khách "hàng đã giao".
- Nhưng kho chưa tạo GRN hoặc chưa nhập tồn.
- Khách hỏi "vì sao hệ thống chưa có hàng để xuất/sản xuất?"

Nguyên nhân có thể là:

- Kho chưa kiểm xong.
- Thiếu chứng từ.
- Hàng đang hold.
- WMS chưa cập nhật.
- Nhân viên kho chưa gửi report.
- Có lệch/hư hỏng đang chờ xử lý.

Tác động:

- CS trả lời sai hoặc thiếu.
- Chủ hàng không có tồn để sử dụng.
- Tranh cãi giữa trucking và kho.
- Handover nội bộ bị rối.

Mức phù hợp với Agentify: rất cao.

### 8.2. Pain 2: Thiếu/sai/hư hỏng không được báo đủ và đúng người

Khi kho phát hiện sai lệch, thông tin cần đi đến nhiều bên:

- Chủ hàng.
- Forwarder.
- 3PL account.
- Ops.
- Kế toán nếu ảnh hưởng phí.
- Nhà cung cấp nếu cần khiếu nại.
- Bảo hiểm nếu có hư hỏng lớn.

Nhưng thực tế có thể là:

- Ảnh nằm trong Zalo.
- Biên bản nằm trong email.
- WMS chỉ ghi note ngắn.
- CS không được tag.
- Manager biết muộn.

Mức phù hợp với Agentify: rất cao.

### 8.3. Pain 3: Báo cáo tồn kho cho khách vẫn thủ công

3PL warehouse thường phải gửi báo cáo tồn cho khách theo ngày/tuần/tháng.

Vấn đề:

- Mỗi khách một format.
- Dữ liệu nằm trong WMS nhưng phải export ra Excel.
- Có khách yêu cầu thêm aging, batch, hold, inbound/outbound pending.
- CS/Account phải kiểm tra thủ công trước khi gửi.
- Nếu sai tồn, ảnh hưởng niềm tin rất mạnh.

Mức phù hợp với Agentify: cao.

### 8.4. Pain 4: Inbound không có lịch hẹn rõ ràng

Nếu xe đến kho mà không có appointment hoặc ASN, kho có thể bị quá tải.

Hậu quả:

- Xe chờ lâu.
- Phát sinh phí chờ xe.
- Kho không có nhân sự.
- Cửa dock bị nghẽn.
- Hàng lạnh/hàng nhạy cảm có rủi ro cao.

Mức phù hợp với Agentify: trung bình đến cao.

Agentify không nhất thiết làm Yard Management System đầy đủ, nhưng có thể nhắc thiếu appointment/ASN và cảnh báo rủi ro.

### 8.5. Pain 5: Tồn WMS, tồn ERP và tồn báo cáo khách không khớp

Một doanh nghiệp có thể có nhiều "phiên bản sự thật":

- WMS báo tồn thực tế.
- ERP báo tồn kế toán.
- Excel báo tồn gửi khách.
- Nhân viên kho biết thực tế có hàng đang hold.

Khi các nguồn không khớp, CS/Ops không biết trả lời theo nguồn nào.

Mức phù hợp với Agentify: cao, nhưng cần cẩn trọng. Agentify nên phát hiện và giải thích lệch, không tự sửa tồn.

### 8.6. Pain 6: POD/GRN/biên bản thiếu hoặc không gắn đúng shipment

POD và GRN là bằng chứng quan trọng để:

- Xác nhận hoàn tất giao/nhận.
- Đối soát với nhà xe.
- Đối soát với 3PL.
- Trả lời khách.
- Khiếu nại nếu thiếu/hư hỏng.

Nếu bằng chứng bị thất lạc hoặc nằm trong chat, rất khó audit.

Mức phù hợp với Agentify: rất cao.

### 8.7. Pain 7: Phí kho/handling/VAS khó đối soát

3PL warehouse tính nhiều loại phí:

- Phí lưu kho.
- Phí nhập.
- Phí xuất.
- Phí bốc xếp.
- Phí pallet.
- Phí kiểm đếm.
- Phí dán nhãn.
- Phí đóng gói.
- Phí chờ.
- Phí xử lý hàng hư hỏng.

Nếu không gắn phí vào sự kiện vận hành, cuối tháng dễ tranh cãi.

Mức phù hợp với Agentify: trung bình đến cao. Đây là bridge sang Cụm 7 kế toán/đối soát.

### 8.8. Pain ranking theo điểm ưu tiên sơ bộ

| Pain | Tần suất | Mức độ nghiêm trọng | Khả năng trả tiền | Khả thi dữ liệu | Phù hợp Agentify | Tổng |
|---|---:|---:|---:|---:|---:|---:|
| Xe đã giao nhưng kho chưa nhập | 5 | 4 | 4 | 4 | 5 | 22 |
| Thiếu/sai/hư hỏng không báo đủ | 4 | 5 | 4 | 4 | 5 | 22 |
| POD/GRN/biên bản thất lạc | 5 | 4 | 4 | 5 | 5 | 23 |
| Báo cáo tồn thủ công | 4 | 4 | 4 | 4 | 4 | 20 |
| Tồn WMS/ERP/Excel không khớp | 3 | 5 | 4 | 3 | 4 | 19 |
| Inbound thiếu appointment/ASN | 3 | 4 | 3 | 4 | 4 | 18 |
| Phí kho/VAS khó đối soát | 3 | 4 | 4 | 3 | 4 | 18 |

Kết luận sơ bộ:

- Use case nên ưu tiên không phải "làm WMS".
- Use case nên ưu tiên là **warehouse confirmation, discrepancy and document evidence layer**.
- Điểm đau mạnh nhất nằm ở việc xác nhận hàng đã nhập/xuất, phát hiện lệch và lưu bằng chứng theo shipment.

---

## 9. Phân khúc nên khảo sát

### 9.1. 3PL warehouse phục vụ B2B/import-export

Đây là phân khúc nên ưu tiên.

Lý do:

- Phục vụ nhiều khách nên áp lực báo cáo lớn.
- Có nhiều inbound/outbound liên quan cảng, xe, chứng từ.
- Có nhiều câu hỏi trạng thái.
- Có nhu cầu chứng minh SLA.
- Có thể có ngân sách phần mềm nếu pain rõ.

Vai trò cần phỏng vấn:

- Warehouse manager.
- Warehouse coordinator.
- 3PL account manager.
- CS phụ trách khách hàng kho.
- Billing/accounting phụ trách phí kho.
- IT/admin hệ thống WMS.

### 9.2. Chủ hàng có kho riêng và nhiều lô XNK

Nhóm này có pain về tồn, sản xuất và cam kết giao hàng.

Nên khảo sát:

- Công ty sản xuất nhập nguyên vật liệu.
- Công ty thương mại nhập hàng phân phối B2B.
- Nhà máy xuất khẩu có kho thành phẩm.
- Công ty có nhiều kho/kho thuê.

Vai trò cần phỏng vấn:

- Logistics manager.
- Warehouse manager.
- Supply chain manager.
- Sales admin.
- Production planning nếu là nhà máy.

### 9.3. Forwarder/3PL không vận hành kho nhưng cần xác nhận từ kho

Nhóm này không sở hữu kho nhưng vẫn bị khách hỏi.

Ví dụ:

- Forwarder giao container về kho khách.
- 3PL thuê kho ngoài.
- Trucking vendor giao hàng vào kho nhà máy.

Pain:

- Không biết kho đã nhận chưa.
- Không lấy được POD/GRN nhanh.
- Bị khách hỏi nhưng phải chờ kho.
- Không biết thiếu/sai/hư hỏng đã được báo chưa.

### 9.4. Kho ICD/CFS

Kho ICD/CFS có liên quan nhiều đến hàng XNK, container và hàng lẻ.

Nên khảo sát nếu Agentify muốn mở rộng sang:

- Hàng LCL.
- CFS receiving/release.
- Container stuffing/unstuffing.
- Hàng lưu tại ICD.

Nhưng đây có thể phức tạp hơn vì gắn với quy trình cảng/hải quan. Không nên là MVP đầu tiên nếu chưa có partner.

### 9.5. Kho thương mại điện tử/fulfillment

Kho e-commerce có nhiều sản phẩm WMS/OMS/TMS sẵn và pain khác B2B công nghiệp.

Nên xem là phân khúc tham khảo, không phải trọng tâm ban đầu.

Lý do:

- Đơn hàng nhỏ, tần suất cao.
- Tích hợp marketplace nhiều.
- Cạnh tranh phần mềm mạnh.
- Bài toán khác với shipment B2B/XNK.

Agentify có thể học cách họ làm visibility và exception, nhưng MVP nên tránh bị kéo sang last-mile/e-commerce.

---

## 10. Product map: công cụ hiện tại và khoảng trống

### 10.1. Product map theo tầng

| Tầng công cụ | Ví dụ | Giải quyết tốt | Khoảng trống còn lại |
|---|---|---|---|
| WMS | TigerWMS, Smartlog SWM, Infolog WMS, Logitrack WMS, SAP EWM, Oracle WMS, Infor WMS, Manhattan, Blue Yonder | Quản lý quy trình trong kho, tồn, vị trí, receiving, picking | Không luôn gom được shipment status từ cảng/trucking/chứng từ/email/Zalo |
| ERP/Inventory | SAP, Oracle, Odoo Inventory, ERP nội bộ | Đơn hàng, mua/bán, tồn tổng, kế toán | Không đủ chi tiết vận hành kho hoặc khó dùng cho CS |
| TMS/GPS | TMS nội bộ, GPS, app tài xế | Trạng thái xe, vị trí, giao hàng | Không biết kho đã nhập, kiểm, GRN hay discrepancy |
| Customer portal | Portal của 3PL/WMS | Khách tự xem một số dữ liệu | Khách vẫn hỏi qua email/Zalo; portal không gom dữ liệu ngoài kho |
| Excel/Google Sheet | File tracking, báo cáo tồn | Linh hoạt, quen thuộc | Sai version, thủ công, không real-time, khó audit |
| Email/Zalo | Trao đổi khách/kho/tài xế | Nhanh, phổ biến | Dữ liệu rời rạc, khó tìm, không thành timeline |
| BI/dashboard | Power BI, dashboard WMS | Báo cáo tổng quan | Không xử lý exception hội thoại và follow-up hằng ngày |

### 10.2. Khoảng trống chính

Khoảng trống không nằm ở việc thị trường thiếu WMS.

Khoảng trống nằm ở chỗ:

- WMS nhìn từ bên trong kho.
- TMS nhìn từ bên vận tải.
- ERP nhìn từ bên quản trị/kế toán.
- Email/Zalo nhìn từ bên giao tiếp.
- Khách hàng muốn một câu trả lời đơn giản: hàng đã đến đâu, có vấn đề gì, ai đang xử lý, khi nào xong.

Agentify nên là lớp chuyển dữ liệu vận hành thành câu trả lời và cảnh báo.

### 10.3. "Single source of truth" thực tế có thể không tồn tại

Nhiều doanh nghiệp nói muốn một nguồn dữ liệu duy nhất. Nhưng trong logistics B2B, điều này khó vì:

- Nhiều công ty cùng tham gia một shipment.
- Mỗi bên dùng hệ thống riêng.
- Không phải bên nào cũng mở API.
- Dữ liệu phát sinh trong chat/email.
- Một phần dữ liệu là ảnh, file, biên bản.
- Khách hàng có format riêng.

Vì vậy, Agentify không nên hứa "thay thế toàn bộ hệ thống". Nên định vị:

> Agentify tạo một lớp trạng thái hợp nhất đủ dùng cho CS/Ops/manager, dựa trên dữ liệu lấy từ hệ thống hiện có và nguồn thủ công.

---

## 11. Đối thủ và sản phẩm liên quan

### 11.1. TigerWMS

TigerWMS là nền tảng fulfillment/WMS tại Việt Nam, xuất phát từ kinh nghiệm e-fulfillment quy mô lớn. Website của TigerWMS mô tả các module WMS, TMS, OMS và Workforce Management, với các năng lực như inventory theo location, wave picking, video capture tại receiving/packing và quản lý return.

Điểm mạnh:

- Có định vị rõ về fulfillment và vận hành thực tế.
- Có module nhiều lớp: WMS, TMS, OMS, WFM.
- Phù hợp với doanh nghiệp cần quản lý kho hiện đại, đặc biệt e-commerce/omnichannel.
- Có kinh nghiệm thị trường Việt Nam.

Điểm yếu/khoảng trống cho Agentify:

- Nếu Agentify tập trung B2B/XNK, TigerWMS là WMS/fulfillment layer, không nhất thiết giải quyết toàn bộ shipment visibility xuyên cảng, trucking, chứng từ, kho, email và Zalo.
- Khách hàng đã có WMS khác vẫn cần lớp gom trạng thái.
- Agentify có thể tích hợp/xuất nhập dữ liệu từ WMS thay vì thay thế.

### 11.2. Smartlog SWM/WMS

Smartlog là nhà cung cấp giải pháp logistics tại Việt Nam, có các giải pháp liên quan WMS/TMS và logistics ecosystem.

Điểm mạnh:

- Hiểu thị trường logistics Việt Nam.
- Có sản phẩm theo nhiều mảng logistics.
- Có kinh nghiệm triển khai cho doanh nghiệp trong nước.

Điểm yếu/khoảng trống cho Agentify:

- Sản phẩm WMS/TMS thường là hệ thống vận hành chính, cần triển khai quy trình.
- Agentify có thể đi nhẹ hơn ở lớp copilot: đọc dữ liệu, tóm tắt, nhắc việc, tạo exception inbox, không buộc thay đổi toàn bộ quy trình kho.

### 11.3. Infolog WMS

Infolog WMS được giới thiệu là best-of-breed Warehouse Management System cho logistics và distribution.

Điểm mạnh:

- Định vị chuyên sâu WMS.
- Phù hợp kho/distribution có quy trình rõ.
- Có thể đáp ứng nghiệp vụ warehouse chuyên nghiệp hơn Excel.

Điểm yếu/khoảng trống cho Agentify:

- WMS chuyên sâu thường cần triển khai nghiêm túc, dữ liệu master tốt và thay đổi quy trình.
- Không phải tất cả người cần trạng thái shipment đều là người dùng WMS.
- Agentify có thể phục vụ CS/Ops/khách hàng bằng cách diễn giải dữ liệu WMS thành timeline và customer update.

### 11.4. Logitrack

Logitrack giới thiệu nền tảng tích hợp OMS, TMS và WMS, quản lý đơn hàng, kho và vận tải trên một nền tảng.

Điểm mạnh:

- All-in-one giúp giảm phân mảnh nếu doanh nghiệp dùng trọn bộ.
- Có logic quản lý đơn, kho, vận tải và cập nhật khách.
- Phù hợp doanh nghiệp muốn một platform vận hành.

Điểm yếu/khoảng trống cho Agentify:

- All-in-one khó thay thế nếu doanh nghiệp đã có ERP/WMS/TMS khác.
- Với forwarder/3PL/chủ hàng đã có nhiều hệ thống, nhu cầu cấp thiết có thể là lớp trung gian thay vì migrate platform.
- Agentify có thể định vị là "overlay" không ép thay hệ thống.

### 11.5. Odoo Inventory/WMS

Odoo Inventory là module quản lý tồn kho/kho trong hệ sinh thái Odoo, hỗ trợ tồn real-time, serial/lot, cycle counting, picking strategies và barcode.

Điểm mạnh:

- Nằm trong bộ ERP rộng hơn, có sales, purchase, accounting, manufacturing.
- Linh hoạt với SME/mid-market.
- Có hệ sinh thái đối tác và module.
- Chi phí có thể dễ tiếp cận hơn enterprise WMS.

Điểm yếu/khoảng trống cho Agentify:

- Cần cấu hình đúng quy trình kho; nếu setup sai, dữ liệu có thể rối.
- Không phải doanh nghiệp logistics nào cũng dùng Odoo.
- Odoo quản lý nội bộ tốt, nhưng chưa chắc giải quyết giao tiếp đa bên qua email/Zalo/trucking/cảng.

### 11.6. SAP EWM

SAP Extended Warehouse Management là WMS enterprise cho doanh nghiệp có quy mô lớn, vận hành kho phức tạp và tích hợp sâu với SAP S/4HANA.

Điểm mạnh:

- Phù hợp enterprise, sản xuất lớn, distribution lớn.
- Tích hợp mạnh với hệ sinh thái SAP.
- Hỗ trợ quy trình kho phức tạp.
- Mạnh về kiểm soát, chuẩn hóa và governance.

Điểm yếu/khoảng trống cho Agentify:

- Chi phí triển khai và vận hành cao.
- Không phù hợp mọi doanh nghiệp vừa/nhỏ.
- Người dùng CS/Ops bên ngoài SAP vẫn có thể cần tóm tắt dễ hiểu.
- Dữ liệu chat/email/ảnh hiện trường vẫn có thể nằm ngoài SAP.

### 11.7. Oracle Warehouse Management Cloud

Oracle Warehouse Management Cloud là giải pháp WMS cloud trong hệ sinh thái Oracle SCM.

Điểm mạnh:

- Enterprise-grade.
- Phù hợp doanh nghiệp có chuỗi cung ứng lớn.
- Tích hợp với Oracle SCM/ERP.
- Có khả năng quản lý fulfillment phức tạp.

Điểm yếu/khoảng trống cho Agentify:

- Tập trung vào vận hành kho và fulfillment.
- Triển khai enterprise cần nguồn lực.
- Agentify có thể đóng vai trò lớp ngoài cho người dùng không trực tiếp vào Oracle hoặc cho dữ liệu ngoài hệ thống.

### 11.8. Infor WMS

Infor WMS là WMS cloud cho distributors, 3PLs và manufacturers, nhấn mạnh receiving, putaway, dock scheduling, QC, cross-docking, RF/voice, wave, picking, replenishment và value-added services.

Điểm mạnh:

- Rất phù hợp nghiệp vụ 3PL/warehouse chuyên nghiệp.
- Có tính năng sâu cho vận hành kho.
- Hỗ trợ nhiều quy trình warehouse nâng cao.

Điểm yếu/khoảng trống cho Agentify:

- Là hệ thống vận hành chính, không phải lightweight copilot.
- Đòi hỏi dữ liệu và quy trình chuẩn.
- Khách/CS vẫn có thể cần một lớp diễn giải trạng thái shipment và exception.

### 11.9. Manhattan Active Warehouse Management

Manhattan Active Warehouse Management là WMS enterprise, tập trung real-time visibility, fulfillment, labor, slotting và automation.

Điểm mạnh:

- Mạnh ở enterprise fulfillment/warehouse.
- Có single interface cho inbound-to-outbound trong kho.
- Phù hợp kho lớn, nhiều automation.

Điểm yếu/khoảng trống cho Agentify:

- Không phải lựa chọn dễ tiếp cận cho SME/mid-market Việt Nam.
- Không trực tiếp giải quyết dữ liệu ngoài kho nếu doanh nghiệp có hệ sinh thái phân mảnh.
- Agentify nên tránh cạnh tranh với tầng WMS enterprise.

### 11.10. Blue Yonder WMS

Blue Yonder WMS tập trung warehouse management, AI, labor, robotics hub, yard management, warehouse execution và supply chain cloud.

Điểm mạnh:

- Mạnh về AI/supply chain enterprise.
- Có năng lực warehouse orchestration sâu.
- Phù hợp doanh nghiệp lớn, nhiều automation.

Điểm yếu/khoảng trống cho Agentify:

- Enterprise-grade, triển khai nặng.
- Không phải giải pháp nhanh cho forwarder/3PL vừa và nhỏ.
- Agentify có thể tập trung vào thị trường chưa đủ lớn để mua enterprise WMS hoặc đã có WMS nhưng thiếu lớp customer-facing visibility.

### 11.11. Các 3PL warehouse có portal riêng

Các 3PL lớn như FM Logistic và nhiều nhà vận hành kho hiện đại có thể có hệ thống nội bộ/portal riêng cho khách.

Điểm mạnh:

- Gắn trực tiếp với vận hành kho.
- Dữ liệu có thể chính xác hơn vì là nguồn gốc.
- Có quy trình SLA và báo cáo.

Điểm yếu/khoảng trống cho Agentify:

- Mỗi 3PL một portal.
- Chủ hàng dùng nhiều 3PL phải mở nhiều nơi.
- Forwarder/CS vẫn nhận câu hỏi qua email/Zalo.
- Portal không luôn gom trucking, customs, shipment docs và kế toán.

### 11.12. Kết luận competitor map

Các đối thủ/sản phẩm hiện tại mạnh ở từng lớp:

- WMS mạnh trong kho.
- ERP mạnh quản trị doanh nghiệp.
- TMS mạnh điều xe.
- Portal mạnh cho từng nhà cung cấp.
- Excel/email/Zalo mạnh vì linh hoạt.

Khoảng trống của Agentify:

> Không phải làm thêm một WMS, mà là làm lớp hợp nhất trạng thái kho với shipment, chứng từ, trucking, khách hàng và exception.

---

## 12. Cơ hội sản phẩm cho Agentify trong Cụm 6

### 12.1. Định vị sản phẩm

Định vị đề xuất:

> Agentify Warehouse Visibility & Exception Copilot là lớp trung gian giúp CS/Ops/3PL/chủ hàng biết hàng đã đến kho, đã nhận, đã nhập tồn, có lệch gì, bằng chứng nằm ở đâu và nên trả lời khách như thế nào.

Không nên định vị:

- "Agentify thay thế WMS".
- "Agentify tự động sửa tồn kho".
- "Agentify tự động quyết định claim".
- "Agentify tự động xuất/nhập hàng".

Nên định vị:

- Gom dữ liệu.
- Tạo timeline.
- Phát hiện thiếu trạng thái.
- Nhắc follow-up.
- Lưu bằng chứng.
- Tóm tắt cho con người.
- Soạn nháp trả lời khách.
- Tạo báo cáo.

### 12.2. Use case 1: Warehouse confirmation timeline

Agentify tạo timeline cho một shipment/order/container:

```text
Container ABCD1234567
  08:30 Truck arrived at warehouse
  09:10 Unloading started
  10:25 Unloading completed
  11:00 Receiving in progress
  11:40 Discrepancy found: 2 cartons damaged
  13:15 GRN issued
  15:00 Putaway pending
```

Giá trị:

- CS biết trạng thái thật.
- Manager thấy lô nào đang kẹt.
- Chủ hàng có update rõ.
- Trucking không bị xem là "chưa giao" nếu kho đang xử lý.

### 12.3. Use case 2: Discrepancy copilot

Agentify gom thông tin lệch từ:

- WMS note.
- Ảnh hàng hư hỏng.
- Biên bản nhận hàng.
- Packing list.
- Invoice.
- Zalo/email.
- POD/GRN.

Sau đó tạo summary:

```text
Lô PO-2026-048 có sai lệch khi nhận hàng:
- Packing list: 100 cartons
- Kho nhận thực tế: 98 cartons
- 2 cartons bị móp, ảnh đã đính kèm
- Kho đã tạo biên bản lúc 11:42
- Cần CS xác nhận với khách trước 15:00
```

Giá trị:

- Giảm thất lạc bằng chứng.
- Giảm trả lời thiếu thông tin.
- Hỗ trợ khiếu nại/đối soát.

### 12.4. Use case 3: POD/GRN evidence hub

Agentify lưu và gắn bằng chứng vào đúng shipment/order:

- POD.
- GRN.
- Delivery note.
- Biên bản thiếu/sai/hư hỏng.
- Ảnh hàng.
- Ảnh seal/container.

Giá trị:

- Dễ tìm lại.
- Dễ audit.
- Dễ đối soát trucking/kho/khách.
- CS không phải hỏi lại nhiều người.

### 12.5. Use case 4: Inbound readiness checklist

Trước khi xe đến kho, Agentify kiểm tra:

- Có ASN chưa?
- Có lịch dock chưa?
- Có số container/xe chưa?
- Có packing list chưa?
- Có PO/shipment reference chưa?
- Kho đã biết ETA chưa?
- Ai phụ trách nhận hàng?

Nếu thiếu, Agentify cảnh báo:

```text
Rủi ro inbound: xe dự kiến đến kho 14:00 nhưng chưa có ASN và chưa có dock appointment. Cần Ops xác nhận với kho trước 12:00 để tránh xe chờ.
```

### 12.6. Use case 5: Customer inventory/status summary

Khi khách hỏi:

> Hàng PO-456 đã nhập kho chưa? Có đủ để xuất ngày mai không?

Agentify trả lời nháp:

```text
PO-456 đã được kho nhận lúc 10:25 hôm nay. Kho đã kiểm xong 480/500 cartons; còn 20 cartons đang hold do vỏ thùng bị ướt và chờ xác nhận QC. Tồn khả dụng hiện tại là 480 cartons. Nếu cần xuất ngày mai, có thể xuất phần 480 cartons trước hoặc chờ QC xác nhận 20 cartons còn lại.
```

CS duyệt trước khi gửi.

### 12.7. Use case 6: Warehouse report automation

Agentify tự động tạo báo cáo:

- Hàng nhập hôm nay.
- Hàng xuất hôm nay.
- Hàng đang hold.
- Hàng có discrepancy.
- POD/GRN còn thiếu.
- Aging inventory.
- Lô hàng có SLA risk.

Đây là use case thương mại tốt với 3PL vì tiết kiệm thời gian CS/Account.

---

## 13. MVP đề xuất cho Cụm 6

### 13.1. Tên MVP

Tên làm việc:

> Agentify Warehouse Visibility Copilot

### 13.2. ICP MVP

ICP ưu tiên:

> 3PL warehouse hoặc forwarder/3PL/chủ hàng có 30-300 shipment/container/order inbound mỗi tháng, đang dùng WMS/Excel/email/Zalo rời rạc và có CS/Ops phải trả lời khách về trạng thái nhập kho/xuất kho.

Không nên bắt đầu với:

- Kho quá nhỏ chỉ có vài SKU, ít giao tiếp khách.
- Kho e-commerce last-mile có hàng nghìn đơn nhỏ/ngày.
- Enterprise đã có WMS/portal/BI rất sâu và quy trình IT procurement dài.
- Kho yêu cầu automation robot/RFID phức tạp ngay từ đầu.

### 13.3. Phạm vi MVP

Nên bắt đầu với inbound hàng nhập về kho hoặc outbound B2B đơn giản.

Đề xuất bắt đầu:

> Inbound warehouse confirmation cho hàng nhập khẩu/container giao về kho.

Lý do:

- Gắn trực tiếp với Cụm 1, 4, 5.
- Pain "xe đã giao nhưng kho chưa nhập" rất dễ hiểu.
- Có nhiều bằng chứng: POD, GRN, ảnh hàng.
- Dễ tạo timeline.
- Dễ chứng minh ROI bằng thời gian trả lời khách và giảm thiếu chứng từ.

### 13.4. Tính năng MVP

MVP nên có 8 nhóm tính năng:

1. **Shipment/order workspace**

Mỗi shipment/order/container có một trang riêng:

- Mã shipment.
- PO/order.
- Container/xe.
- Kho nhận.
- ETA.
- Trạng thái inbound/outbound.
- Người phụ trách.
- File/ảnh liên quan.

2. **Warehouse status timeline**

Timeline chuẩn hóa trạng thái:

- Truck arrived.
- Waiting for dock.
- Unloading started.
- Unloading completed.
- Receiving in progress.
- GRN issued.
- Discrepancy found.
- Putaway completed.
- Inventory available.

3. **Manual/mobile update form**

Vì chưa chắc tích hợp WMS ngay, MVP cần form cập nhật nhanh:

- Chọn shipment.
- Chọn trạng thái.
- Upload ảnh/POD/GRN.
- Nhập note.
- Tag người cần xử lý.

4. **Excel/WMS export import**

Cho phép import:

- File inbound list.
- File receiving report.
- File inventory report.
- File GRN.
- File outbound dispatch.

5. **Evidence hub**

Lưu:

- POD.
- GRN.
- Delivery note.
- Ảnh hư hỏng.
- Biên bản lệch.
- Ảnh seal/container.

6. **Exception inbox**

Danh sách lô có vấn đề:

- Xe đã giao nhưng chưa có GRN sau X giờ.
- Có discrepancy.
- Có hàng hold.
- Thiếu POD/GRN.
- ETA kho trễ.
- Tồn WMS và report không khớp.

7. **AI status summary**

AI tóm tắt trạng thái:

```text
Lô hàng đang ở bước receiving. Xe đã đến kho lúc 08:40 và dỡ hàng xong lúc 10:15. Kho phát hiện thiếu 2 cartons so với packing list. GRN chưa phát hành. Cần CS xác nhận với kho trước 15:00.
```

8. **Customer reply draft**

AI soạn nháp:

```text
Dear anh/chị,

Lô hàng PO-456 đã được xe giao đến kho lúc 08:40 và đã dỡ hàng xong lúc 10:15. Hiện kho đang kiểm nhận. Kho ghi nhận có sai lệch 2 cartons so với packing list, bên em đang xác minh lại và sẽ cập nhật biên bản/ảnh trong hôm nay.

Trân trọng,
```

### 13.5. Không nên làm trong MVP

Không nên làm:

- WMS đầy đủ.
- Barcode scanning sâu.
- Slotting optimization.
- Labor management.
- Robot/automation integration.
- Tự sửa tồn.
- Tự approve claim.
- Tự tính phí kho phức tạp.
- Portal khách hàng quá nhiều tính năng.

Lý do:

- Dễ bị kéo thành WMS.
- Cần nhiều triển khai tại hiện trường.
- Khó hoàn thành trong 4-8 tuần.
- Không phải pain đầu tiên của Agentify.

### 13.6. Nguồn dữ liệu MVP

Nguồn dữ liệu khả thi:

| Nguồn | Cách lấy giai đoạn đầu | Mức khả thi |
|---|---|---|
| Excel inbound/outbound list | Upload/import định kỳ | Cao |
| Email báo hàng đến | Forward vào mailbox Agentify hoặc upload | Trung bình cao |
| POD/GRN ảnh/PDF | Upload mobile/web | Cao |
| Zalo ảnh/note | Giai đoạn đầu copy/upload thủ công | Trung bình |
| WMS export | CSV/Excel report | Cao |
| WMS API | Tùy từng khách | Trung bình |
| TMS/trucking status | Import từ cụm 5 hoặc cập nhật thủ công | Trung bình |
| ERP inventory | Export/API nếu có | Trung bình thấp ban đầu |

### 13.7. KPI MVP

KPI cần đo khi pilot:

| KPI | Cách đo | Mục tiêu pilot |
|---|---|---|
| Thời gian trả lời câu hỏi "hàng đã nhập kho chưa" | Trước/sau pilot | Giảm 30-50% |
| Tỷ lệ POD/GRN gắn đúng shipment | Audit file | Đạt 90%+ |
| Số lô có exception được phát hiện sớm | Đếm exception | Tăng phát hiện trước khi khách hỏi |
| Số lần CS phải hỏi kho/trucking lại | Nhật ký thao tác | Giảm 30%+ |
| Thời gian tạo báo cáo inbound/outbound | Trước/sau pilot | Giảm 40%+ |
| Tỷ lệ người dùng chấp nhận AI summary | Survey nội bộ | 70%+ thấy hữu ích |

---

## 14. Ví dụ hoạt động cụ thể của Agentify

### 14.1. Ví dụ 1: Xe đã đến kho nhưng hàng chưa nhập tồn

Bối cảnh:

- Forwarder giao container nhập khẩu về kho khách.
- Tài xế báo đã giao lúc 10:00.
- Khách hỏi lúc 13:00: "Hàng đã nhập kho chưa để bên em lên kế hoạch sản xuất?"

Cách làm hiện tại:

1. CS hỏi Ops.
2. Ops hỏi trucking.
3. Trucking nói tài xế đã giao.
4. CS hỏi kho.
5. Kho nói đang kiểm hàng, chưa nhập WMS.
6. CS trả lời khách sau 30-60 phút.

Cách Agentify hoạt động:

1. Tài xế hoặc điều phối upload POD/ảnh giao hàng lúc 10:05.
2. Agentify cập nhật timeline: `Truck delivered / POD received`.
3. Sau 2 giờ chưa thấy `GRN issued`, Agentify tạo exception: `Delivered but not received in WMS`.
4. Agentify gửi nhắc cho warehouse coordinator: "Vui lòng xác nhận receiving/GRN cho shipment ABC".
5. Khi khách hỏi, CS mở Agentify và thấy:

```text
Xe đã giao hàng đến kho lúc 10:00, POD đã có. Kho đang kiểm nhận, GRN chưa phát hành. Agentify đã nhắc kho xác nhận lúc 12:05. Chưa có ghi nhận thiếu/hư hỏng.
```

6. Agentify soạn nháp:

```text
Anh/chị ơi, xe đã giao hàng đến kho lúc 10:00 và bên em đã nhận được POD. Hiện kho đang trong bước kiểm nhận nên hàng chưa được cập nhật available trên tồn kho. Bên em đã follow up kho và sẽ cập nhật GRN ngay khi kho xác nhận.
```

Giá trị:

- CS không trả lời sai "đã nhập kho".
- Khách hiểu trạng thái thực tế.
- Kho được nhắc đúng lúc.
- POD không bị thất lạc trong Zalo.

### 14.2. Ví dụ 2: Kho phát hiện thiếu hàng so với packing list

Bối cảnh:

- Packing list ghi 1,000 cartons.
- Kho nhận thực tế 992 cartons.
- 8 cartons không thấy khi dỡ hàng.
- Ảnh và biên bản nằm trong nhóm Zalo kho.

Cách làm hiện tại:

1. Kho báo trong Zalo.
2. CS không được tag nên biết muộn.
3. Khách hỏi vì sao thiếu hàng.
4. Ops phải tìm lại ảnh, biên bản, packing list.
5. Kế toán/claim không có bộ bằng chứng đầy đủ.

Cách Agentify hoạt động:

1. Warehouse coordinator upload ảnh/biên bản vào Agentify.
2. Agentify đọc packing list và receiving record.
3. Agentify phát hiện:

```text
Expected: 1,000 cartons
Received: 992 cartons
Shortage: 8 cartons
Evidence: 3 photos + receiving note
```

4. Agentify tạo exception `Short received`.
5. Agentify tag CS, Ops manager và người phụ trách khách.
6. Agentify soạn summary:

```text
Lô PO-789 thiếu 8 cartons so với packing list. Kho nhận 992/1,000 cartons lúc 14:20. Biên bản thiếu hàng đã upload, kèm 3 ảnh hiện trường. Cần xác nhận với chủ hàng/nhà cung cấp hướng xử lý trước 17:00.
```

7. CS duyệt và gửi khách.

Giá trị:

- Không thất lạc bằng chứng.
- Báo đúng người.
- Giảm tranh cãi.
- Hỗ trợ claim/đối soát.

### 14.3. Ví dụ 3: 3PL phải gửi báo cáo tồn cuối ngày cho khách

Bối cảnh:

- 3PL quản lý kho cho 20 khách.
- Mỗi ngày account phải export WMS, chỉnh Excel và gửi báo cáo tồn.
- Khách A muốn format theo SKU/batch.
- Khách B muốn thêm hàng hold.
- Khách C muốn inbound/outbound trong ngày.

Cách làm hiện tại:

1. Export WMS.
2. Copy sang file mẫu.
3. Kiểm tra số liệu.
4. Thêm note thủ công.
5. Gửi email.
6. Nếu khách hỏi thêm, lại mở WMS/Excel để trả lời.

Cách Agentify hoạt động:

1. Agentify nhận WMS export lúc 17:00.
2. Agentify nhận danh sách exception trong ngày.
3. Agentify tạo báo cáo theo format từng khách.
4. Agentify highlight:

```text
- 3 SKU có inbound hôm nay
- 1 SKU đang hold do QC
- 2 lô thiếu GRN
- 1 outbound đang chờ POD
```

5. Account kiểm tra và bấm gửi.

Giá trị:

- Giảm thời gian làm báo cáo.
- Báo cáo có exception rõ hơn.
- Khách nhận thông tin dễ hiểu hơn.
- 3PL tăng chất lượng dịch vụ mà không cần thay WMS.

---

## 15. Câu hỏi phỏng vấn cho Cụm 6

### 15.1. Câu hỏi cho warehouse manager

1. Kho của anh/chị thuộc loại nào: kho nội bộ, 3PL, CFS, ICD, nhà máy hay distribution center?
2. Kho đang dùng WMS, ERP, Excel, giấy hay kết hợp nhiều công cụ?
3. Một tháng kho xử lý bao nhiêu inbound/outbound?
4. Hàng nhập khẩu/container chiếm tỷ trọng bao nhiêu?
5. Quy trình inbound chuẩn gồm những bước nào?
6. Quy trình outbound chuẩn gồm những bước nào?
7. Kho có dùng ASN hoặc appointment không?
8. Xe đến không có lịch hoặc thiếu chứng từ xảy ra thường xuyên không?
9. Khi nhận thiếu/sai/hư hỏng, quy trình báo cho ai?
10. Bao lâu sau khi xe giao thì GRN được tạo?
11. Bao lâu sau khi GRN thì hàng available?
12. Có hay lệch giữa trạng thái tài xế báo và trạng thái kho không?
13. Có hay bị khách/CS hỏi "hàng đã nhập kho chưa" không?
14. Báo cáo tồn kho được gửi bằng gì?
15. Có API/export từ WMS không?
16. Nếu có một hệ thống gom POD/GRN/ảnh/exception vào shipment timeline, anh/chị có muốn thử không?

### 15.2. Câu hỏi cho warehouse coordinator/nhân viên kho

1. Khi xe đến, anh/chị kiểm những thông tin gì?
2. Anh/chị cập nhật trạng thái nhận hàng ở đâu?
3. Nếu thiếu/sai/hư hỏng, anh/chị chụp ảnh/gửi biên bản qua đâu?
4. Có trường hợp quên gửi ảnh/biên bản cho CS không?
5. Có phải cập nhật cả WMS và Excel/Zalo không?
6. Mất bao lâu để tạo GRN?
7. Trạng thái nào hay bị người khác hỏi nhất?
8. Anh/chị có muốn dùng form nhanh để update trạng thái và upload ảnh không?
9. Điều gì làm anh/chị ngại dùng thêm một phần mềm mới?
10. Nếu AI tự tóm tắt discrepancy, anh/chị cần kiểm lại những gì?

### 15.3. Câu hỏi cho CS/Account của 3PL

1. Khách thường hỏi gì về trạng thái kho?
2. Mỗi ngày/tuần anh/chị nhận bao nhiêu câu hỏi "hàng đã nhập/xuất chưa"?
3. Để trả lời một câu hỏi, anh/chị phải check những nguồn nào?
4. Có phải hỏi kho/trucking/Ops lại không?
5. Một câu hỏi mất trung bình bao nhiêu phút?
6. Có từng trả lời sai vì dữ liệu kho chưa cập nhật không?
7. Báo cáo tồn cuối ngày/tuần làm mất bao lâu?
8. Mỗi khách có format báo cáo riêng không?
9. POD/GRN/ảnh hư hỏng đang lưu ở đâu?
10. Nếu Agentify soạn nháp câu trả lời khách, anh/chị muốn nội dung gồm những gì?

### 15.4. Câu hỏi cho chủ hàng/logistics manager

1. Anh/chị có kho riêng hay thuê 3PL?
2. Khi hàng nhập khẩu về kho, ai xác nhận hàng đã nhận?
3. Anh/chị cần biết trạng thái nào trước khi lên kế hoạch sản xuất/bán hàng?
4. Có thường bị chậm cập nhật tồn kho không?
5. Có trường hợp xe giao rồi nhưng kho chưa nhập tồn không?
6. Nếu thiếu/sai/hư hỏng, anh/chị cần báo trong bao lâu?
7. Báo cáo tồn kho hiện tại có đáng tin không?
8. Anh/chị có dùng nhiều 3PL/kho khác nhau không?
9. Có muốn một timeline gom cả cảng, xe, kho, chứng từ không?
10. Pain nào đủ lớn để trả tiền cho một sản phẩm mới?

### 15.5. Câu hỏi cho IT/Admin WMS

1. WMS hiện tại là hệ thống gì?
2. Có API không?
3. Có export CSV/Excel định kỳ không?
4. Có webhook/event log không?
5. Có phân quyền theo khách/shipment không?
6. Có thể lấy trạng thái receiving/GRN/putaway/outbound/POD không?
7. Có dữ liệu ảnh/biên bản trong WMS không?
8. Dữ liệu nào nhạy cảm không được đưa ra ngoài?
9. Nếu tích hợp Agentify, mô hình bảo mật nào chấp nhận được?
10. Có thể pilot bằng export file trước khi API không?

---

## 16. Survey định lượng đề xuất cho Cụm 6

### 16.1. Nhóm câu hỏi thông tin doanh nghiệp

1. Doanh nghiệp của anh/chị thuộc nhóm nào?

- 3PL warehouse.
- Chủ hàng có kho riêng.
- Nhà máy.
- Forwarder/3PL thuê kho ngoài.
- Kho ICD/CFS.
- Khác.

2. Quy mô xử lý hàng tháng?

- Dưới 50 inbound/outbound.
- 50-200.
- 200-1,000.
- Trên 1,000.

3. Công cụ quản lý kho hiện tại?

- WMS.
- ERP.
- Excel/Google Sheet.
- Giấy.
- Kết hợp nhiều công cụ.

### 16.2. Nhóm câu hỏi về pain

Chấm điểm 1-5:

1. Mức độ khó khi biết hàng đã thật sự nhập kho chưa.
2. Tần suất xe đã giao nhưng kho chưa cập nhật.
3. Tần suất thiếu/sai/hư hỏng khi nhận hàng.
4. Mức độ khó khi tìm POD/GRN/biên bản.
5. Mức độ mất thời gian khi làm báo cáo tồn.
6. Mức độ lệch giữa WMS/ERP/Excel.
7. Mức độ chậm khi trả lời khách về trạng thái kho.
8. Mức độ cần một shipment timeline gom cả xe và kho.

### 16.3. Nhóm câu hỏi về tần suất

1. Mỗi ngày có bao nhiêu câu hỏi về hàng đã nhập/xuất kho?

- 0-5.
- 6-20.
- 21-50.
- Trên 50.

2. Một câu hỏi trạng thái kho mất bao lâu để trả lời?

- Dưới 2 phút.
- 2-5 phút.
- 5-15 phút.
- Trên 15 phút.

3. Mỗi tuần có bao nhiêu trường hợp POD/GRN/biên bản khó tìm?

- 0.
- 1-3.
- 4-10.
- Trên 10.

4. Mỗi tháng có bao nhiêu lần xảy ra thiếu/sai/hư hỏng cần xử lý?

- 0.
- 1-5.
- 6-20.
- Trên 20.

### 16.4. Nhóm câu hỏi về willingness to pilot

1. Nếu có hệ thống tự gom trạng thái kho, POD, GRN, ảnh và soạn nháp trả lời khách, anh/chị có muốn dùng thử không?

- Rất muốn.
- Có thể muốn.
- Chưa chắc.
- Không muốn.

2. Doanh nghiệp có sẵn sàng pilot 4-8 tuần không?

- Có.
- Có nếu không cần tích hợp phức tạp.
- Chỉ quan tâm nếu miễn phí.
- Không.

3. Nguồn dữ liệu nào có thể chia sẻ cho pilot?

- Excel tracking.
- WMS export.
- Email.
- POD/GRN PDF.
- Ảnh hàng.
- API.
- Chưa rõ.

4. Giá trị nào thuyết phục nhất?

- Trả lời khách nhanh hơn.
- Giảm thất lạc POD/GRN.
- Phát hiện lệch sớm.
- Giảm thời gian làm báo cáo.
- Giảm tranh cãi đối soát.
- Manager thấy exception rõ hơn.

---

## 17. Giả thuyết cần kiểm chứng sau Cụm 6

### 17.1. Giả thuyết thị trường

1. Kho hiện đại và 3PL warehouse tại Việt Nam đang tăng, tạo nhu cầu quản lý dữ liệu vận hành tốt hơn.
2. WMS có mặt ở nhóm kho chuyên nghiệp, nhưng dữ liệu kho vẫn tách khỏi shipment visibility.
3. SME/mid-market vẫn dùng nhiều Excel/email/Zalo trong reporting và exception handling.
4. Chủ hàng dùng nhiều kho/3PL có nhu cầu gom trạng thái hơn một kho đơn lẻ.
5. Pain lớn nhất không phải "không có WMS", mà là "không biết trạng thái kho đã đủ để báo khách/chốt shipment chưa".

### 17.2. Giả thuyết người dùng

1. CS/Account của 3PL là nhóm đau nhất vì phải trả lời khách nhưng không trực tiếp vận hành kho.
2. Warehouse coordinator muốn update nhanh, nhưng sẽ không thích phần mềm mới nếu nhập liệu trùng WMS.
3. Warehouse manager quan tâm exception, SLA và bằng chứng hơn AI chat chung chung.
4. Chủ hàng quan tâm tồn khả dụng và discrepancy hơn trạng thái chi tiết từng bước.
5. IT/Admin sẽ chấp nhận pilot bằng WMS export trước API nếu không ảnh hưởng dữ liệu nhạy cảm.

### 17.3. Giả thuyết sản phẩm

1. Agentify nên bắt đầu bằng inbound confirmation, GRN/POD và discrepancy.
2. Timeline xe + kho là use case dễ hiểu hơn dashboard WMS tổng quát.
3. Evidence hub có ROI rõ vì giảm thời gian tìm ảnh/POD/GRN.
4. AI summary chỉ có giá trị nếu dựa trên dữ liệu đúng và có link bằng chứng.
5. Customer reply draft sẽ được dùng nếu người dùng có quyền duyệt trước khi gửi.

### 17.4. Giả thuyết thương mại

1. 3PL warehouse có thể trả phí nếu Agentify giúp giảm thời gian CS/account và tăng chất lượng dịch vụ khách hàng.
2. Chủ hàng có thể trả phí nếu Agentify gom trạng thái từ nhiều 3PL/kho.
3. Forwarder có thể trả phí nếu warehouse confirmation giúp họ đóng shipment nhanh và giảm khiếu nại.
4. Giá trị pilot nên được đo bằng tiết kiệm thời gian và giảm exception bị bỏ sót.

---

## 18. Tính khả thi cho Agentify

### 18.1. Khả thi về dữ liệu

Khả thi tương đối cao vì MVP không cần tích hợp sâu ngay từ đầu.

Nguồn dữ liệu giai đoạn đầu:

- Excel inbound/outbound.
- WMS export.
- POD/GRN PDF.
- Ảnh upload.
- Note thủ công.
- Email forward.

API WMS là tốt nhưng không bắt buộc cho pilot đầu tiên.

### 18.2. Khả thi về kỹ thuật

Các module kỹ thuật cần có:

- Entity model cho shipment/order/container/warehouse event.
- File upload và evidence linking.
- OCR đơn giản cho POD/GRN/biên bản.
- Import Excel/CSV.
- Rule engine cho exception.
- AI summary dựa trên event timeline.
- Draft email/Zalo message.
- Role-based access.

Rủi ro kỹ thuật chính:

- Dữ liệu không chuẩn.
- Nhiều format file.
- Ảnh/PDF khó OCR.
- Người dùng nhập thiếu reference.
- WMS export không ổn định.

Cách giảm rủi ro:

- Bắt đầu với 1-2 khách pilot.
- Chuẩn hóa template import.
- Bắt buộc mỗi file/ảnh gắn shipment/order.
- Không hứa tự động 100%.
- Cho phép con người xác nhận AI mapping.

### 18.3. Khả thi về triển khai

MVP có thể triển khai trong 4-8 tuần nếu scope hẹp:

Tuần 1-2:

- Chốt workflow inbound.
- Chốt template dữ liệu.
- Xây workspace shipment/order.
- Xây upload evidence.

Tuần 3-4:

- Import Excel/WMS export.
- Timeline trạng thái kho.
- Exception rule: delivered but no GRN, missing POD, discrepancy.

Tuần 5-6:

- AI summary.
- Draft customer reply.
- Báo cáo inbound/discrepancy.

Tuần 7-8:

- Pilot với dữ liệu thật.
- Đo KPI.
- Chỉnh workflow.

### 18.4. Khả thi về adoption

Adoption phụ thuộc vào việc Agentify có làm tăng nhập liệu không.

Nếu Agentify yêu cầu warehouse coordinator nhập lại tất cả dữ liệu đã có trong WMS, khả năng adoption thấp.

Cách đúng:

- Lấy dữ liệu từ WMS export nếu có.
- Chỉ yêu cầu update thủ công cho exception/bằng chứng.
- Form update phải nhanh hơn gửi Zalo.
- AI summary phải giúp CS trả lời nhanh hơn.
- Manager phải thấy exception rõ hơn.

### 18.5. Rủi ro pháp lý và vận hành

Agentify cần tránh:

- Tự sửa tồn kho.
- Tự xác nhận hàng đã nhận nếu kho chưa xác nhận.
- Tự approve claim.
- Tự gửi thông tin nhạy cảm cho khách không qua người duyệt.
- Tự thay đổi dữ liệu trong WMS/ERP giai đoạn đầu.

Agentify nên:

- Hiển thị nguồn dữ liệu.
- Ghi rõ trạng thái "chưa xác nhận" nếu dữ liệu chưa đủ.
- Cho người dùng duyệt trước khi gửi.
- Lưu audit trail.
- Phân quyền theo khách/shipment.

---

## 19. Kết luận sơ bộ Cụm 6

Cụm kho/WMS/3PL warehouse là một cơ hội tốt cho Agentify, nhưng cần chọn đúng tầng sản phẩm.

Kết luận chính:

1. Thị trường kho hiện đại tại Việt Nam đang tăng cùng với FDI, manufacturing, 3PL, e-commerce và hạ tầng logistics.
2. WMS là sản phẩm đã tồn tại và có nhiều đối thủ mạnh, từ local đến enterprise.
3. Agentify không nên cạnh tranh trực diện bằng cách làm WMS mới.
4. Khoảng trống nằm ở visibility xuyên hệ thống: xe đã giao, kho đã nhận chưa, có GRN chưa, có discrepancy không, bằng chứng ở đâu, khách nên được trả lời thế nào.
5. MVP nên tập trung vào inbound warehouse confirmation cho hàng nhập/container về kho.
6. Tính năng ưu tiên là timeline, evidence hub, exception inbox, AI status summary và customer reply draft.
7. ICP tốt là 3PL warehouse/chủ hàng/forwarder có nhiều giao tiếp B2B, nhiều inbound/outbound và còn phụ thuộc Excel/email/Zalo bên cạnh WMS.

Đề xuất quyết định:

> Tiếp tục khảo sát sâu Cụm 6, nhưng không chọn làm MVP độc lập nếu chưa có khách pilot kho. Nên xem Cụm 6 là phần mở rộng tự nhiên của MVP shipment visibility: sau khi Agentify theo dõi được hải quan, chứng từ và trucking, trạng thái kho là điểm đóng vòng để biết hàng đã thật sự đến đích và available hay chưa.

---

## 20. Nguồn tham khảo

1. National Statistics Office of Vietnam. (2026). Press release: social-economic situation in the fourth quarter and 2025. https://www.nso.gov.vn/en/data-and-statistics/2026/01/press-release-social-economic-situation-in-the-fourth-quarter-and-2025/
2. Vietnam Logistics Portal. Vietnam gov't approves logistics services development strategy towards 2025. https://logistics.gov.vn/vietnam-gov-t-approves-logistics-services-development-strategy-towards-2025
3. LuatVietnam. Decision No. 2229/QD-TTg approving the Strategy for development of Vietnam's logistics services in the 2025-2035 period, with a vision toward 2050. https://english.luatvietnam.vn/decision-no-2229-qd-ttg-dated-october-09-2025-of-the-prime-minister-approving-the-strategy-for-development-of-vietnams-logistics-services-in-the-20-414309-doc1.html
4. CBRE. Asia Pacific Industrial & Logistics Trends Q1 2025. https://www.cbre.com/insights/figures/asia-pacific-industrial-logistics-trends-q1-2025
5. Cushman & Wakefield Vietnam. Northern Vietnam Industrial Market Expands Rapidly in Q4 2025 as Supply Surges and Demand Holds Firm. https://www.cushmanwakefield.com/en/vietnam/news/2026/01/q4-2025-northern-vietnam-industrial-marketbeat-report
6. Vietnam News. Ready-built warehouse market sees stable growth on both supply and demand. https://vietnamnews.vn/Economy/1765319/ready-built-warehouse-market-sees-stable-growth-on-both-supply-and-demand.html
7. VnEconomy. Ready-built warehouse market holds immense potential. https://en.vneconomy.vn/ready-built-warehouse-market-holds-immense-potential.htm
8. VnEconomy. Aggressive expansion of warehousing market. https://en.vneconomy.vn/aggressive-expansion-of-warehousing-market.htm
9. TigerWMS. Smart Fulfillment Technology. https://tigerwms.vn/
10. Smartlog. Logistics eco-system profile. https://gosmartlog.com/wp-content/uploads/2021/03/Smartlog-Profile-2021_VN.pdf
11. Infolog. Infolog WMS - Warehouse Management System. https://www.infolog.com.vn/vn/products-vn/infolog-wms-warehouse-management-system/
12. Logitrack. Professional Logistics Software Solution. https://logitrackvn.com/en?lang=en
13. Odoo. Inventory management software. https://www.odoo.com/app/inventory
14. SAP. Extended Warehouse Management. https://www.sap.com/products/scm/extended-warehouse-management.html
15. Oracle. Warehouse Management Cloud documentation. https://docs.oracle.com/en/cloud/saas/warehouse-management/22a/index.html
16. Infor. Warehouse Management System. https://www.infor.com/solutions/scm/warehousing
17. Manhattan Associates. Warehouse Management Systems & WMS Solutions. https://www.manh.com/products/warehouse-management
18. Blue Yonder. Warehouse Management System. https://blueyonder.com/solutions/warehouse-management
19. FM Logistic Vietnam. Prime Warehouse Space Available in Vietnam. https://www.fmlogistic.vn/en/solutions/prime-warehouse-space-available-in-vietnam/

---

## 21. Tóm tắt compact sau Cụm 6

Đã hoàn thành research Cụm 6: Kho, WMS và 3PL warehouse.

Insight chính:

- Kho là điểm xác nhận hàng đã thật sự được nhận, kiểm, nhập tồn và available.
- Trạng thái "xe đã giao" không đủ; cần biết kho đã nhận, kiểm, tạo GRN, putaway và cập nhật tồn chưa.
- Thị trường kho hiện đại Việt Nam đang tăng nhờ FDI, manufacturing, 3PL, e-commerce và logistics infrastructure. Nguồn cung ready-built warehouse ở cả miền Bắc và miền Nam tiếp tục mở rộng trong 2025.
- WMS đã có nhiều đối thủ: TigerWMS, Smartlog, Infolog, Logitrack, Odoo, SAP EWM, Oracle WMS, Infor WMS, Manhattan, Blue Yonder.
- Các WMS mạnh ở vận hành trong kho, nhưng thường không giải quyết hết shipment visibility xuyên cảng, trucking, chứng từ, email/Zalo và báo cáo khách.
- Agentify không nên làm WMS mới. Nên làm lớp warehouse visibility and exception copilot.
- Pain ưu tiên: xe đã giao nhưng kho chưa nhập, thiếu/sai/hư hỏng không báo đủ, POD/GRN thất lạc, báo cáo tồn thủ công, tồn WMS/ERP/Excel không khớp.
- MVP đề xuất: Agentify Warehouse Visibility Copilot cho inbound warehouse confirmation của hàng nhập/container giao về kho.
- Tính năng MVP: shipment/order workspace, warehouse timeline, evidence hub, exception inbox, import Excel/WMS export, AI status summary, customer reply draft.
- ICP ưu tiên: 3PL warehouse, chủ hàng có kho/thuê kho, forwarder/3PL cần xác nhận từ kho; quy mô 30-300 inbound/outbound mỗi tháng trở lên.
- Không nên làm trong MVP: WMS đầy đủ, barcode sâu, slotting, labor management, robot/RFID, tự sửa tồn, tự approve claim.

Khuyến nghị sau cụm này:

- Tiếp tục Cụm 7: kế toán, chi phí, hóa đơn và đối soát.
- Khi tổng hợp MVP, Cụm 6 nên được xem là điểm đóng vòng của shipment visibility: hàng chỉ thật sự "xong" khi kho xác nhận bằng GRN/POD và không còn discrepancy mở.
