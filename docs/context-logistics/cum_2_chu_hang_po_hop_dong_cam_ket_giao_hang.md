# Cụm 2: Chủ hàng, PO, hợp đồng và cam kết giao hàng

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để hiểu logistics từ góc nhìn của **chủ hàng**: doanh nghiệp sản xuất, thương mại, xuất khẩu, nhập khẩu hoặc phân phối B2B. Đây là nhóm không nhất thiết trực tiếp khai hải quan, đặt tàu, điều xe hay làm chứng từ từng bước, nhưng là bên chịu áp lực cuối cùng khi hàng trễ, thiếu chứng từ, sai cam kết giao hàng hoặc phát sinh chi phí.

Các câu hỏi chính cần trả lời:

1. Một đơn hàng B2B/XNK bắt đầu từ đâu: PO, sales order, hợp đồng hay forecast?
2. Ai trong doanh nghiệp chủ hàng chịu trách nhiệm theo dõi lô hàng?
3. Khi hàng bị trễ, ai bị khách hỏi và ai phải giải trình nội bộ?
4. Dữ liệu của một lô hàng nằm ở ERP, Excel, email, Zalo, forwarder portal hay hệ thống nào?
5. Chủ hàng đang nhìn trạng thái theo đơn hàng, theo PO, theo container hay theo invoice?
6. Cam kết giao hàng được quản lý như thế nào?
7. Khi Incoterms thay đổi, trách nhiệm logistics chuyển từ bên bán sang bên mua ở đâu?
8. Pain nào đủ lớn để chủ hàng trả tiền cho một lớp visibility trung gian?
9. Agentify nên phục vụ chủ hàng trực tiếp, hay phục vụ forwarder/3PL để họ bán visibility tốt hơn cho chủ hàng?

Kết luận cần kiểm chứng:

> Chủ hàng B2B/XNK không thiếu một hệ thống ERP mới, mà thiếu một lớp nhìn xuyên suốt từ PO/hợp đồng đến shipment/container/chứng từ/chi phí/cam kết giao hàng. Nếu Agentify giúp họ biết "đơn hàng nào đang rủi ro, vì sao, ai cần làm gì tiếp theo", sản phẩm có cơ hội rõ hơn so với việc chỉ làm một dashboard tracking đơn thuần.

---

## 2. Vì sao cụm chủ hàng quan trọng?

### 2.1. Chủ hàng là bên chịu tác động kinh doanh cuối cùng

Trong logistics B2B/XNK, forwarder, hãng tàu, hãng bay, cảng, hải quan, trucking, kho và 3PL đều tham gia xử lý một phần nghiệp vụ. Nhưng khi hàng đến chậm, thiếu hàng, sai chứng từ hoặc phát sinh chi phí, tác động kinh doanh thường rơi về chủ hàng.

Ví dụ:

- Nhà máy nhập nguyên liệu trễ có thể phải dừng chuyền sản xuất.
- Công ty xuất khẩu giao hàng trễ có thể bị khách hàng phạt hoặc mất đơn hàng tiếp theo.
- Nhà phân phối thiếu hàng có thể mất doanh số hoặc phải giao bù bằng chi phí cao hơn.
- Doanh nghiệp bán B2B không cập nhật được lịch giao có thể bị đánh giá thấp về độ tin cậy.

Vì vậy, chủ hàng là nhóm có động lực mạnh để cải thiện visibility, nhưng họ không phải lúc nào cũng có đủ dữ liệu trực tiếp.

### 2.2. Thị trường XNK Việt Nam đủ lớn để pain này có quy mô

Theo National Statistics Office of Vietnam, tổng kim ngạch xuất nhập khẩu hàng hóa của Việt Nam năm 2025 đạt **930,05 tỷ USD**, tăng **18,2%** so với năm trước. Quy mô này cho thấy logistics XNK không phải là một mảng nhỏ, mà là hạ tầng vận hành của một nền kinh tế phụ thuộc mạnh vào thương mại quốc tế.

Ý nghĩa cho Agentify:

- Mỗi USD tăng trưởng thương mại kéo theo thêm nhu cầu vận chuyển, chứng từ, hải quan, kho bãi, điều phối, đối soát và cập nhật trạng thái.
- Khi số lượng lô hàng tăng, cách quản lý bằng Excel/email/Zalo sẽ nhanh chóng chạm giới hạn.
- Nếu chuỗi cung ứng dịch chuyển sang Việt Nam, nhiều doanh nghiệp sản xuất và FDI sẽ yêu cầu visibility cao hơn, báo cáo nhanh hơn, chuẩn dữ liệu tốt hơn.

Nguồn VLF 2025 của Bộ Công Thương cũng nhấn mạnh logistics cần gắn chặt với sản xuất và xuất nhập khẩu, đồng thời khuyến khích chuyển đổi số để nâng hiệu quả vận hành và năng lực cạnh tranh.

### 2.3. Chủ hàng thường không mua phần mềm theo cách của forwarder

Forwarder hoặc 3PL thường cần phần mềm để vận hành nghiệp vụ logistics: báo giá, booking, chứng từ, khai báo, trucking, kho, hóa đơn.

Chủ hàng thì khác. Họ thường quan tâm:

- Đơn hàng có giao đúng hạn không?
- Hàng nhập có kịp cho sản xuất không?
- Hàng xuất có kịp cut-off, ETD, ETA không?
- Có rủi ro bị phạt trễ hoặc mất doanh thu không?
- Chi phí logistics thực tế có vượt dự toán không?
- Forwarder/3PL nào đang phục vụ tốt hoặc kém?
- Bộ phận sales, procurement, production, finance và logistics có cùng nhìn một thông tin không?

Vì vậy, nếu bán cho chủ hàng, Agentify không nên được định vị là "phần mềm logistics nghiệp vụ" quá nặng. Cách định vị dễ hiểu hơn:

> Agentify là lớp theo dõi và cảnh báo lô hàng B2B/XNK, giúp chủ hàng biết PO/đơn hàng nào đang rủi ro, nguyên nhân là gì và bước tiếp theo cần ai xử lý.

---

## 3. Thuật ngữ cần giải thích

### 3.1. Chủ hàng là gì?

**Chủ hàng** là bên sở hữu hoặc có quyền lợi trực tiếp với hàng hóa. Trong bối cảnh khảo sát này, chủ hàng thường là:

- Doanh nghiệp sản xuất nhập nguyên liệu, máy móc, linh kiện.
- Doanh nghiệp xuất khẩu hàng thành phẩm.
- Công ty thương mại nhập hàng về bán lại.
- Nhà phân phối B2B.
- Doanh nghiệp FDI có hoạt động xuất nhập khẩu thường xuyên.

Chủ hàng có thể tự làm logistics, hoặc thuê forwarder/3PL/đại lý hải quan/trucking làm thay.

### 3.2. PO là gì?

**PO** là viết tắt của **Purchase Order**, tức đơn đặt hàng. Đây là tài liệu bên mua gửi cho bên bán để xác nhận muốn mua hàng hóa/dịch vụ với các điều kiện cụ thể.

Một PO thường có:

- Mã PO.
- Tên nhà cung cấp.
- Danh sách hàng hóa.
- Số lượng.
- Đơn giá.
- Ngày giao hàng mong muốn.
- Địa điểm giao hàng.
- Điều kiện thương mại, có thể gồm Incoterms.
- Điều kiện thanh toán.

Trong logistics B2B, PO rất quan trọng vì nó là "gốc kinh doanh" của lô hàng. Nhưng trạng thái logistics thực tế thường lại nằm ở shipment, booking, container, bill of lading, tờ khai, delivery order hoặc phiếu giao hàng. Đây là lý do dữ liệu dễ bị đứt đoạn.

### 3.3. Sales Order là gì?

**Sales Order** là đơn bán hàng do bên bán tạo ra sau khi nhận PO hoặc xác nhận đơn hàng với khách.

Nếu nhìn từ phía người mua, họ theo dõi PO. Nếu nhìn từ phía người bán, họ theo dõi Sales Order. Một giao dịch B2B có thể có cả hai mã:

```text
PO của khách hàng
  -> Sales Order của nhà cung cấp
  -> Production plan hoặc picking plan
  -> Shipment/booking
  -> Invoice
  -> Delivery/POD
```

Agentify cần hiểu rằng một lô hàng có thể được gọi bằng nhiều mã khác nhau tùy phòng ban.

### 3.4. Hợp đồng mua bán là gì?

**Hợp đồng mua bán** là thỏa thuận pháp lý giữa bên bán và bên mua. Trong xuất nhập khẩu, hợp đồng thường quy định:

- Hàng hóa.
- Số lượng/chất lượng.
- Giá.
- Điều kiện giao hàng.
- Điều kiện thanh toán.
- Chứng từ cần cung cấp.
- Trách nhiệm bảo hiểm, vận chuyển, hải quan.
- Mốc giao hàng.
- Phạt chậm giao hoặc bồi thường nếu có.

Nếu PO là đơn đặt hàng cụ thể, hợp đồng là khung pháp lý và thương mại rộng hơn. Có doanh nghiệp dùng hợp đồng khung rồi phát hành nhiều PO con.

### 3.5. Incoterms là gì?

**Incoterms** là bộ quy tắc thương mại quốc tế do International Chamber of Commerce (ICC) ban hành. Incoterms giúp bên mua và bên bán phân chia trách nhiệm về:

- Ai trả chi phí vận chuyển.
- Ai chịu rủi ro mất mát/hư hỏng hàng ở từng điểm.
- Ai lo thủ tục xuất khẩu/nhập khẩu.
- Ai mua bảo hiểm trong một số điều kiện.
- Hàng được coi là giao ở đâu.

Theo ICC, các quy tắc Incoterms không chỉ là "điều kiện giá", mà còn liên quan đến rủi ro, chi phí, chứng từ, bảo hiểm và thủ tục hải quan.

Một số Incoterms thường gặp:

| Incoterm | Hiểu đơn giản | Ý nghĩa với logistics |
|---|---|---|
| EXW | Bên bán giao tại xưởng/kho của mình | Bên mua chịu gần như toàn bộ vận chuyển, rủi ro và thủ tục sau đó |
| FCA | Bên bán giao cho người chuyên chở tại điểm thỏa thuận | Linh hoạt hơn EXW, thường hợp lý hơn cho hàng container |
| FOB | Bên bán giao hàng lên tàu tại cảng đi | Dùng cho đường biển, nhưng hay bị dùng sai cho container |
| CFR | Bên bán trả cước đến cảng đích, rủi ro chuyển khi hàng lên tàu | Bên mua vẫn chịu rủi ro trong hành trình biển |
| CIF | Giống CFR nhưng bên bán mua bảo hiểm tối thiểu | Người mua cần hiểu mức bảo hiểm có thể chỉ là tối thiểu |
| CPT | Bên bán trả cước đến điểm đến, rủi ro chuyển khi giao cho carrier đầu tiên | Dùng được đa phương thức |
| CIP | Giống CPT nhưng bên bán mua bảo hiểm | Bảo hiểm rộng hơn CIF theo Incoterms 2020 |
| DAP | Bên bán giao tới địa điểm đích, chưa dỡ hàng, chưa nộp thuế nhập khẩu | Bên bán chịu nhiều logistics hơn, bên mua lo nhập khẩu |
| DPU | Bên bán giao và dỡ hàng tại điểm đến | Bên bán chịu thêm trách nhiệm dỡ hàng |
| DDP | Bên bán giao tới nơi và chịu cả thuế/thủ tục nhập khẩu | Trách nhiệm tối đa của bên bán, rủi ro cao nếu không hiểu luật nước nhập |

Ý nghĩa cho Agentify:

> Incoterms quyết định ai cần theo dõi bước nào. Một shipment theo FOB sẽ có "owner" logistics khác với một shipment theo DDP. Nếu Agentify không hiểu Incoterms, hệ thống rất dễ cảnh báo sai người hoặc bỏ sót trách nhiệm.

### 3.6. ETD, ETA, ATD, ATA là gì?

| Thuật ngữ | Nghĩa | Ví dụ |
|---|---|---|
| ETD | Estimated Time of Departure, thời gian dự kiến khởi hành | Tàu dự kiến rời cảng Cát Lái ngày 12/6 |
| ETA | Estimated Time of Arrival, thời gian dự kiến đến | Tàu dự kiến đến cảng Los Angeles ngày 5/7 |
| ATD | Actual Time of Departure, thời gian khởi hành thực tế | Tàu thực tế rời cảng ngày 13/6 |
| ATA | Actual Time of Arrival, thời gian đến thực tế | Tàu thực tế cập cảng ngày 6/7 |

ETD/ETA là dự kiến, ATD/ATA là thực tế. Với chủ hàng, chênh lệch giữa dự kiến và thực tế là nguồn phát sinh rủi ro.

### 3.7. SLA và cam kết giao hàng là gì?

**SLA** là viết tắt của **Service Level Agreement**, tức cam kết mức dịch vụ. Trong logistics, SLA có thể là:

- Phải giao hàng trong X ngày.
- Phải cập nhật trạng thái trong Y giờ.
- Phải xử lý chứng từ trong Z ngày.
- Tỷ lệ giao đúng hạn phải đạt một mức nhất định.

**Cam kết giao hàng** có thể nằm trong hợp đồng, PO, email xác nhận hoặc cam kết nội bộ giữa sales và khách.

Ví dụ:

```text
Khách yêu cầu giao hàng trước 20/7.
Sales xác nhận giao trước 20/7.
Logistics thấy ETA cảng đích là 18/7.
Nếu cần thêm 3 ngày để thông quan và giao nội địa, đơn này thực tế đã có nguy cơ trễ.
```

Pain lớn thường nằm ở chỗ sales nhìn ngày giao cho khách, logistics nhìn ETA/ETD, còn hệ thống không tự động nối hai thứ lại với nhau.

### 3.8. OTIF là gì?

**OTIF** là viết tắt của **On Time In Full**, nghĩa là giao đúng hạn và đủ số lượng/chất lượng.

Một đơn hàng đạt OTIF khi:

- Giao đúng ngày hoặc trong khung thời gian đã cam kết.
- Giao đủ hàng.
- Hàng đúng SKU, đúng quy cách.
- Không thiếu chứng từ quan trọng.

OTIF là chỉ số rất quan trọng với chủ hàng B2B vì nó phản ánh độ tin cậy với khách hàng.

### 3.9. Control tower là gì?

**Control tower** trong supply chain là lớp điều phối và quan sát tập trung. Nó không nhất thiết trực tiếp vận hành tất cả các nghiệp vụ, nhưng gom dữ liệu từ nhiều nguồn để cho người quản lý biết:

- Lô hàng nào đang ở đâu.
- Lô nào có nguy cơ trễ.
- Lô nào thiếu chứng từ.
- Lô nào có chi phí bất thường.
- Ai cần xử lý bước tiếp theo.

Các nền tảng quốc tế như project44 hoặc FourKites định vị mình quanh real-time visibility, control tower, exception management và supply chain orchestration. Điểm này xác nhận rằng nhu cầu "nhìn xuyên suốt chuỗi cung ứng" là có thật ở thị trường toàn cầu.

---

## 4. Workflow thực tế của chủ hàng B2B/XNK

### 4.1. Workflow nhập khẩu điển hình

Luồng nhập khẩu từ góc nhìn chủ hàng:

```text
Nhu cầu mua hàng / kế hoạch sản xuất
  -> tạo PO
  -> nhà cung cấp xác nhận
  -> chuẩn bị hàng
  -> booking vận chuyển quốc tế
  -> nhận booking confirmation
  -> hàng rời cảng/sân bay đi
  -> theo dõi ETD/ATD/ETA
  -> nhận chứng từ: invoice, packing list, bill of lading, C/O nếu có
  -> khai hải quan nhập khẩu
  -> hàng về cảng/sân bay Việt Nam
  -> thanh toán local charges, lấy D/O
  -> thông quan
  -> lấy hàng khỏi cảng/kho
  -> giao về nhà máy/kho
  -> nhập kho/kiểm đếm
  -> đối soát chi phí
  -> đóng PO hoặc ghi nhận hoàn tất
```

Ở mỗi bước, dữ liệu có thể nằm ở một nơi khác nhau:

| Bước | Dữ liệu chính | Nguồn thường gặp |
|---|---|---|
| Tạo PO | Mã PO, SKU, số lượng, ngày cần hàng | ERP, Excel, phần mềm procurement |
| Nhà cung cấp xác nhận | Ngày ready, lịch sản xuất | Email, portal nhà cung cấp, Excel |
| Booking | Booking number, hãng tàu, ETD/ETA | Forwarder, carrier website, email |
| Chứng từ | Invoice, packing list, B/L, C/O | Email, file scan, DMS, ERP |
| Hải quan | Tờ khai, phân luồng, thông quan | ECUS/VNACCS, đại lý hải quan |
| Cảng | Container availability, phí local, lệnh giao hàng | ePort, hãng tàu, cảng |
| Trucking | Xe, tài xế, giờ lấy/giao hàng | TMS, Zalo, GPS, điện thoại |
| Nhập kho | Số lượng nhận, thiếu/dư/hư hỏng | WMS, ERP, phiếu nhập kho |
| Đối soát | Cước, local charge, trucking, lưu bãi | Kế toán, hóa đơn, debit note |

Điểm đứt gãy:

> Chủ hàng nghĩ theo PO và ngày cần hàng. Logistics provider nghĩ theo booking/container/B/L/tờ khai. Nếu không có lớp nối dữ liệu, việc trả lời "PO này đang ở đâu?" phải làm thủ công.

### 4.2. Workflow xuất khẩu điển hình

Luồng xuất khẩu từ góc nhìn chủ hàng:

```text
Nhận PO/hợp đồng từ khách
  -> tạo Sales Order
  -> lên kế hoạch sản xuất/đóng hàng
  -> xác nhận ngày giao/cut-off
  -> đặt booking với forwarder/hãng tàu
  -> chuẩn bị chứng từ xuất khẩu
  -> đóng hàng tại kho/nhà máy
  -> kéo container ra cảng
  -> khai hải quan xuất khẩu
  -> vào cảng trước cut-off
  -> tàu chạy
  -> phát hành B/L
  -> gửi chứng từ cho khách/ngân hàng
  -> theo dõi ETA cảng đích nếu cần
  -> xác nhận giao hàng/hoàn tất
```

Các mốc rủi ro cao:

- Hàng chưa sản xuất xong nhưng đã nhận cam kết ETD.
- Booking bị roll tàu.
- Container chưa vào cảng trước cut-off.
- Tờ khai/chứng từ sai khiến hàng không kịp xuất.
- B/L phát hành trễ, ảnh hưởng thanh toán.
- Khách ở nước ngoài cần cập nhật nhưng sales không có thông tin mới.

### 4.3. Ai trong công ty chủ hàng liên quan đến logistics?

Một lô hàng B2B/XNK thường liên quan nhiều phòng ban:

| Vai trò | Họ quan tâm gì? | Pain thường gặp |
|---|---|---|
| Procurement/Mua hàng | PO, nhà cung cấp, ngày ready, chi phí mua | Không biết hàng có kịp về cho sản xuất không |
| Import/Export staff | Chứng từ, hải quan, booking, forwarder | Phải chase nhiều bên, thiếu dữ liệu tập trung |
| Logistics coordinator | ETD/ETA, trucking, cảng, kho | Cập nhật rời rạc, phải tự tổng hợp |
| Sales/Customer service | Ngày giao cho khách, tình trạng đơn hàng | Không trả lời nhanh được cho khách |
| Production planner | Nguyên liệu có kịp cho kế hoạch sản xuất không | ETA không được nối với lịch sản xuất |
| Warehouse | Khi nào hàng về, số lượng thực nhận | Thiếu thông báo trước, nhập kho bị động |
| Finance/Accounting | Cước, phí local, thuế, hóa đơn | Chi phí phát sinh khó kiểm soát theo PO |
| Management | OTIF, chi phí logistics, rủi ro đơn hàng | Không có dashboard theo ngoại lệ |

Điểm cần khảo sát:

> Trong doanh nghiệp chủ hàng, ai là "owner" thật sự của trạng thái lô hàng? Nếu không có owner rõ ràng, Agentify nên thiết kế workflow phân công và nhắc việc.

---

## 5. Thực trạng quản lý của chủ hàng tại Việt Nam

### 5.1. Hệ thống chính thường là ERP, nhưng ERP không đủ visibility logistics

Doanh nghiệp sản xuất/thương mại thường có ERP hoặc phần mềm kế toán để quản lý:

- PO.
- Sales order.
- Tồn kho.
- Phiếu nhập/xuất.
- Hóa đơn.
- Thanh toán.
- Chi phí.

Nhưng ERP thường không tự động trả lời tốt các câu hỏi vận hành như:

- Container nào đang chờ thông quan?
- PO nào có ETA trễ hơn ngày cần hàng?
- Lô nào đã ATD nhưng chưa có B/L?
- Lô nào thiếu C/O nên có nguy cơ không hưởng ưu đãi thuế?
- Hàng đã thông quan nhưng chưa điều xe lấy?
- Lô nào có phí lưu bãi/lưu container sắp phát sinh?

ERP là hệ thống ghi nhận giao dịch nội bộ. Logistics visibility cần dữ liệu từ bên ngoài: forwarder, hãng tàu, cảng, hải quan, trucking, kho, email và chứng từ.

### 5.2. Excel vẫn là lớp điều phối thực tế

Ngay cả khi doanh nghiệp đã có ERP, nhiều đội logistics vẫn có file Excel/Google Sheet riêng để theo dõi shipment.

Một file theo dõi phổ biến có các cột:

- PO number.
- Supplier/customer.
- SKU/product.
- Quantity.
- Invoice number.
- Booking number.
- Container number.
- B/L number.
- ETD.
- ETA.
- Forwarder.
- Customs declaration.
- Clearance date.
- Trucking status.
- Warehouse receipt date.
- Remark/problem.

Lý do Excel vẫn tồn tại:

- Dễ sửa.
- Dễ thêm cột.
- Dễ gửi nội bộ.
- Không phụ thuộc IT.
- Phù hợp với việc "chắp nối" nhiều dữ liệu rời rạc.

Nhược điểm:

- Dữ liệu nhanh lỗi thời.
- Không có cảnh báo tự động.
- Không biết ai cập nhật cuối cùng.
- Không có audit trail tốt.
- Khó nối PO với nhiều container hoặc nhiều shipment.
- Khó báo cáo ngoại lệ theo thời gian thực.

### 5.3. Email và Zalo là hệ thống vận hành không chính thức

Trong thực tế, nhiều cập nhật logistics đến từ:

- Email của forwarder.
- Email của nhà cung cấp.
- Zalo nhóm với trucking.
- Ảnh chụp màn hình ePort/VNACCS/booking.
- File chứng từ đính kèm.
- Tin nhắn "hàng đã thông quan", "xe đang vào cảng", "tàu delay".

Vấn đề:

- Thông tin nằm trong hội thoại, không tự động vào hệ thống.
- Người mới vào nhóm khó hiểu lịch sử.
- Quản lý không biết thông tin nào là mới nhất.
- Dễ mất thông tin khi nhân sự nghỉ hoặc chuyển việc.
- Không tự động liên kết tin nhắn với PO/shipment/container cụ thể.

Đây là một cơ hội rất rõ cho Agentify: đọc, phân loại, tóm tắt, gắn thông tin vào shipment timeline, nhưng vẫn để con người duyệt các cập nhật quan trọng.

### 5.4. Chủ hàng phụ thuộc nhiều vào forwarder/3PL để biết trạng thái

Với nhiều chủ hàng, trạng thái lô hàng đến từ forwarder hoặc 3PL, không phải từ hệ thống nội bộ.

Các câu hỏi thường phải hỏi forwarder:

- Hàng đã lên tàu chưa?
- Tàu có delay không?
- Container đã về cảng chưa?
- Đã lấy được D/O chưa?
- Đã khai hải quan chưa?
- Tờ khai đang luồng gì?
- Hàng đã thông quan chưa?
- Khi nào giao về kho?
- Có phí phát sinh gì không?

Nếu forwarder trả lời chậm, chủ hàng bị mù thông tin. Nếu forwarder trả lời bằng nhiều email rời rạc, chủ hàng vẫn phải tự tổng hợp.

### 5.5. Cam kết giao hàng thường được quản lý bằng kinh nghiệm cá nhân

Trong nhiều doanh nghiệp, sales hoặc account manager cam kết ngày giao với khách dựa trên:

- Lịch tàu dự kiến.
- Kinh nghiệm transit time.
- Thông tin từ logistics.
- Tồn kho hiện có.
- Lịch sản xuất.
- Khả năng thông quan.
- Khả năng giao nội địa.

Nhưng nếu không có hệ thống nối các dữ liệu này, cam kết dễ bị quá lạc quan.

Ví dụ:

```text
ETA cảng Cát Lái: 18/7
Ngày cần giao cho khách: 20/7
Sales nghĩ còn 2 ngày là đủ.
Nhưng thực tế cần:
- 1 ngày lấy D/O/local charge
- 1-2 ngày thông quan nếu luồng vàng
- 1 ngày book xe/lấy hàng
- 1 ngày giao về kho/kiểm đếm

=> Đơn hàng có nguy cơ trễ từ trước, nhưng không ai thấy cảnh báo sớm.
```

### 5.6. Vấn đề không nằm ở "tracking tàu" đơn thuần

Nhiều người khi nghĩ về visibility sẽ nghĩ tới việc biết tàu/container đang ở đâu. Nhưng với chủ hàng B2B, câu hỏi thật sự rộng hơn:

- Hàng có kịp ngày cần hàng không?
- PO nào đang thiếu chứng từ?
- Lô nào bị chậm do nhà cung cấp, forwarder, hải quan, cảng hay trucking?
- Có cần đổi phương án vận chuyển không?
- Có nên báo khách sớm không?
- Có phát sinh chi phí bất thường không?
- Ai đang giữ việc tiếp theo?

Vì vậy, Agentify không nên chỉ làm "container tracking". Cơ hội tốt hơn là "PO-to-delivery exception management".

---

## 6. Pain ranking sơ bộ

Thang điểm:

- **Tần suất**: xảy ra thường xuyên đến đâu.
- **Tác động**: ảnh hưởng tới chi phí, doanh thu, SLA, sản xuất, uy tín.
- **Khả năng trả tiền**: pain có đủ rõ để doanh nghiệp trả phí không.
- **Khả thi MVP**: có thể làm được bằng dữ liệu ban đầu như Excel, email, file, update thủ công không.

| Pain | Tần suất | Tác động | Khả năng trả tiền | Khả thi MVP | Nhận định |
|---|---:|---:|---:|---:|---|
| Không nối được PO với shipment/container/chứng từ | Cao | Cao | Cao | Cao | Pain lõi của chủ hàng |
| Không biết đơn hàng nào có nguy cơ trễ cam kết giao | Cao | Rất cao | Cao | Cao | Use case tốt nhất cho MVP |
| Phải hỏi forwarder/3PL thủ công để lấy trạng thái | Cao | Trung bình-cao | Trung bình-cao | Cao | Dễ chứng minh tiết kiệm thời gian |
| Cập nhật nằm rải rác trong email/Zalo/Excel | Rất cao | Cao | Cao | Trung bình-cao | Rất phù hợp với AI tóm tắt |
| Thiếu/sai chứng từ làm chậm thông quan/giao hàng | Trung bình-cao | Cao | Cao | Trung bình | Cần workflow checklist |
| Không kiểm soát phí phát sinh theo PO | Trung bình | Cao | Trung bình-cao | Trung bình | Nên nối với cụm kế toán sau |
| Sales cam kết ngày giao nhưng logistics không được cảnh báo | Trung bình-cao | Cao | Cao | Cao | Cần SLA/risk alert |
| Management không có dashboard ngoại lệ | Cao | Cao | Cao | Cao | Hợp với buyer cấp quản lý |
| ERP không tích hợp sâu với forwarder/cảng/hải quan | Cao | Trung bình-cao | Trung bình | Trung bình | MVP nên tránh tích hợp nặng ban đầu |
| Nhà cung cấp cập nhật ngày ready trễ hoặc không chuẩn | Trung bình | Cao | Trung bình | Trung bình | Cần khảo sát thêm theo ngành |

Pain nên ưu tiên:

1. PO-to-shipment mapping.
2. Delivery commitment risk alert.
3. Exception inbox.
4. AI status summary.
5. Checklist chứng từ và mốc bắt buộc.
6. Báo cáo OTIF và nguyên nhân trễ.

---

## 7. Phân khúc chủ hàng nên khảo sát

### 7.1. Doanh nghiệp sản xuất nhập nguyên liệu

Ví dụ:

- Điện tử.
- Dệt may.
- Da giày.
- Gỗ/nội thất.
- Nhựa, hóa chất, bao bì.
- Cơ khí, máy móc.
- Thực phẩm, nguyên liệu nông sản.

Pain chính:

- Nguyên liệu về trễ ảnh hưởng kế hoạch sản xuất.
- PO nhập khẩu nhiều, chia nhiều container/lô.
- Cần nối ETA với production plan.
- Cần biết lô nào phải ưu tiên xử lý hải quan/trucking.
- Chi phí logistics ảnh hưởng giá thành.

Khả năng phù hợp với Agentify:

- Cao nếu doanh nghiệp có nhiều PO/tháng, nhiều nhà cung cấp và nhiều forwarder.
- Rất cao nếu bộ phận logistics đang dùng Excel để nối PO với shipment.

### 7.2. Doanh nghiệp xuất khẩu B2B

Ví dụ:

- Nhà máy xuất hàng cho khách quốc tế.
- Công ty trading xuất hàng theo hợp đồng.
- Doanh nghiệp bán hàng theo đơn hàng dự án.

Pain chính:

- Phải giao đúng lịch cho khách nước ngoài.
- Chứng từ xuất khẩu ảnh hưởng thanh toán.
- Booking/cut-off/roll tàu ảnh hưởng cam kết.
- Sales cần cập nhật khách nhanh, nhưng dữ liệu nằm ở logistics/docs.

Khả năng phù hợp:

- Cao nếu có nhiều khách quốc tế và SLA chặt.
- Đặc biệt phù hợp nếu sales/account thường xuyên hỏi logistics "đơn này đi chưa?".

### 7.3. Doanh nghiệp phân phối B2B nhập khẩu hàng bán lại

Ví dụ:

- Thiết bị công nghiệp.
- Hàng điện tử.
- Vật tư y tế.
- Linh kiện, phụ tùng.
- Hàng tiêu dùng phân phối sỉ.

Pain chính:

- Khách B2B cần ngày giao rõ.
- Hàng về chậm ảnh hưởng doanh số.
- Phải ưu tiên giao cho khách quan trọng.
- Cần biết tồn kho đang về, không chỉ tồn kho hiện có.

Khả năng phù hợp:

- Cao nếu Agentify nối được inbound shipment với sales commitment.

### 7.4. Doanh nghiệp FDI

Pain chính:

- Nhiều quy trình chuẩn tập đoàn.
- Cần báo cáo OTIF, cost, exception.
- Có thể đã dùng ERP lớn như SAP/Oracle/Microsoft Dynamics.
- Nhưng vẫn có local workaround bằng Excel/email vì tích hợp với hệ thống Việt Nam khó.

Khả năng phù hợp:

- Có ngân sách tốt hơn, nhưng chu kỳ bán hàng dài hơn.
- MVP nên dùng làm pilot phòng ban trước, không bán như core ERP replacement.

### 7.5. Doanh nghiệp vừa và nhỏ có XNK thường xuyên

Pain chính:

- Không có IT team mạnh.
- Quy trình phụ thuộc 1-2 nhân sự logistics.
- Thường dùng Excel, email, Zalo.
- Không đủ ngân sách cho hệ thống enterprise lớn.

Khả năng phù hợp:

- Rất tốt cho MVP nếu sản phẩm dễ triển khai.
- Cần pricing đơn giản và onboarding nhanh.

---

## 8. Product map: công cụ hiện tại và khoảng trống

### 8.1. Các hệ thống chủ hàng đang dùng

| Nhóm hệ thống | Ví dụ | Dùng để làm gì | Điểm mạnh | Điểm yếu |
|---|---|---|---|---|
| ERP | SAP, Oracle, Microsoft Dynamics, Odoo, Bravo, Fast, MISA AMIS, phần mềm nội bộ | PO, sales order, tồn kho, kế toán, mua hàng | Ghi nhận giao dịch tốt, quản trị nội bộ tốt | Không tự có dữ liệu vận hành từ forwarder/cảng/hải quan |
| Procurement tool | ERP module, Excel, hệ thống mua hàng nội bộ | Tạo PO, duyệt mua, quản lý nhà cung cấp | Kiểm soát quy trình mua | Ít theo dõi shipment thực tế |
| WMS | SAP EWM, Oracle WMS, TigerWMS, WMS nội bộ | Nhập/xuất/tồn kho | Quản lý kho tốt | Chỉ thấy hàng khi vào kho hoặc gần kho |
| TMS | TrackAsia, Winta, TMS nội bộ, phần mềm của 3PL | Điều phối vận chuyển | Tốt cho xe/chuyến/đơn vận tải | Không tự nối đầy đủ PO, chứng từ, hải quan, cam kết khách |
| Forwarder portal | Portal của forwarder/hãng tàu/3PL | Xem booking/tracking/chứng từ | Có dữ liệu từ nhà cung cấp dịch vụ | Mỗi forwarder một portal, khó gom |
| Visibility platform quốc tế | project44, FourKites | Tracking đa phương thức, ETA, exception | Mạnh về mạng dữ liệu, enterprise-grade | Giá/triển khai có thể nặng, chưa chắc fit SME Việt Nam |
| Excel/Google Sheet | File tự tạo | Theo dõi shipment thực tế | Linh hoạt, rẻ, quen thuộc | Dữ liệu thủ công, dễ sai, không cảnh báo |
| Email/Zalo | Gmail/Outlook/Zalo | Trao đổi trạng thái, gửi chứng từ | Nhanh, phổ biến | Không phải hệ thống dữ liệu |

### 8.2. Khoảng trống sản phẩm

Khoảng trống không phải là "chưa có phần mềm nào cả". Thị trường đã có:

- ERP.
- TMS.
- WMS.
- Forwarder software.
- e-customs.
- ePort.
- Visibility platform quốc tế.
- Portal riêng của từng nhà cung cấp dịch vụ.

Khoảng trống nằm ở chỗ:

> Chủ hàng cần một lớp trung gian nhẹ, dễ triển khai, đọc được dữ liệu rời rạc, nối PO với shipment/container/chứng từ/cam kết giao hàng, và cảnh báo ngoại lệ bằng ngôn ngữ dễ hiểu cho business team.

Nói cách khác, Agentify không nên cạnh tranh trực diện với ERP/TMS/WMS. Agentify nên nằm giữa các hệ thống đó.

```text
ERP / PO / Sales Order
        +
Email / Zalo / Excel / Documents
        +
Forwarder / Carrier / ePort / Customs / Trucking
        |
        v
Agentify
        |
        v
PO timeline + shipment status + exception alert + AI summary + action owner
```

---

## 9. Đối thủ và sản phẩm liên quan

### 9.1. project44

project44 là nền tảng visibility quốc tế lớn, tập trung vào tracking đa phương thức, real-time logistics data, ETA, exception và kết nối carrier/forwarder. Theo thông tin công bố, project44 có độ phủ lớn trong ocean visibility, kết nối nhiều carrier/forwarder, cảng và tàu.

Điểm mạnh:

- Mạng dữ liệu quốc tế mạnh.
- Có tracking ocean, air, truck, rail.
- Có API và UI cho enterprise.
- Có năng lực ETA, exception, analytics.
- Phù hợp doanh nghiệp lớn có chuỗi cung ứng toàn cầu.

Điểm yếu/khoảng trống cho thị trường Việt Nam SME:

- Có thể quá nặng và đắt cho doanh nghiệp vừa và nhỏ.
- Chưa chắc xử lý tốt workflow địa phương như Zalo, Excel nội bộ, ePort Việt Nam, ECUS/VNACCS, chứng từ tiếng Việt.
- Mạnh về tracking/visibility, nhưng không nhất thiết giải quyết ngay việc nối PO/hợp đồng/cam kết giao hàng theo cách doanh nghiệp Việt đang làm.
- Triển khai enterprise có thể cần IT và dữ liệu chuẩn.

Ý nghĩa cho Agentify:

> project44 chứng minh nhu cầu visibility là thật, nhưng Agentify có thể đi vào phân khúc nhẹ hơn, địa phương hóa hơn, nhiều AI workflow hơn cho SME/forwarder/chủ hàng Việt Nam.

### 9.2. FourKites

FourKites là nền tảng real-time supply chain visibility/control tower. FourKites công bố mạng dữ liệu lớn, tracking đa phương thức và định vị mới hơn quanh AI agents/digital workers cho supply chain.

Điểm mạnh:

- Định vị rất gần bài toán Agentify: visibility, control tower, exception, orchestration.
- Có mạng dữ liệu lớn toàn cầu.
- Có kinh nghiệm với doanh nghiệp enterprise.
- Có narrative AI agents trong supply chain.

Điểm yếu/khoảng trống:

- Enterprise-first, có thể không phù hợp với ngân sách và cách triển khai của SME Việt Nam.
- Khó thay thế các luồng làm việc địa phương ngay từ đầu.
- Dữ liệu local như email tiếng Việt, Zalo, ảnh chụp chứng từ, ECUS/ePort có thể không phải trọng tâm.

Ý nghĩa cho Agentify:

> FourKites là đối thủ về tầm nhìn, nhưng chưa chắc là đối thủ trực tiếp ở giai đoạn đầu nếu Agentify chọn thị trường Việt Nam, triển khai nhẹ, local workflow, AI hỗ trợ CS/Ops/chủ hàng.

### 9.3. ERP của chủ hàng

Ví dụ: SAP, Oracle, Microsoft Dynamics, Odoo, Bravo, Fast, MISA AMIS, hệ thống nội bộ.

Điểm mạnh:

- Là hệ thống core của doanh nghiệp.
- Quản lý PO, tồn kho, kế toán, mua hàng, bán hàng.
- Dữ liệu tài chính và vận hành nội bộ đáng tin cậy.
- Có quyền quyết định cao trong doanh nghiệp.

Điểm yếu:

- Không phải lúc nào cũng tích hợp được với forwarder/cảng/hải quan/trucking.
- Tùy chỉnh logistics visibility có thể tốn chi phí.
- Dữ liệu external shipment thường vẫn phải nhập tay.
- ERP thường không phù hợp để xử lý email/Zalo/chứng từ rời rạc theo thời gian thực.

Ý nghĩa cho Agentify:

> Agentify nên tích hợp hoặc đọc dữ liệu từ ERP, không nên bán như sản phẩm thay ERP.

### 9.4. TMS/WMS nội địa và phần mềm logistics

Ví dụ từ thị trường: Winta Logistics, TrackAsia TMS, TigerWMS, Digisys, woka.io và nhiều phần mềm TMS/WMS/ERP logistics khác.

Điểm mạnh:

- Hiểu nghiệp vụ vận tải/kho/logistics Việt Nam.
- Có thể triển khai phù hợp với doanh nghiệp trong nước.
- Một số sản phẩm có module TMS, WMS, forwarder, accounting, customs, customer portal.

Điểm yếu:

- Thường tối ưu cho nhà cung cấp logistics hơn là chủ hàng.
- Có thể vẫn là hệ thống vận hành theo module, chưa phải lớp AI gom dữ liệu từ nhiều hệ thống.
- Nếu doanh nghiệp đã có ERP/TMS/WMS, việc thay thế sẽ khó.
- Khả năng đọc email/Zalo/file/chứng từ và biến thành timeline có thể chưa phải trọng tâm.

Ý nghĩa cho Agentify:

> Agentify nên định vị là lớp bổ sung, có thể ngồi trên TMS/WMS/ERP hiện có, thay vì đòi khách thay hệ thống.

### 9.5. Forwarder portal và portal của 3PL

Một số forwarder/3PL cung cấp portal để khách hàng xem lô hàng, chứng từ, báo giá hoặc booking.

Điểm mạnh:

- Dữ liệu đến từ bên đang vận hành thật.
- Có thể giúp khách giảm hỏi qua email.
- Phù hợp nếu chủ hàng chỉ dùng một forwarder chính.

Điểm yếu:

- Mỗi forwarder có một portal khác nhau.
- Chủ hàng dùng nhiều forwarder sẽ bị phân mảnh.
- Portal thường chỉ hiển thị dữ liệu trong phạm vi nhà cung cấp đó.
- Khó nối với PO, ERP, sales commitment và báo cáo nội bộ của chủ hàng.

Ý nghĩa cho Agentify:

> Agentify có thể làm lớp "multi-forwarder visibility" cho chủ hàng hoặc làm white-label/customer-facing layer cho forwarder nhỏ chưa có portal tốt.

### 9.6. Excel, email, Zalo

Đây không phải đối thủ phần mềm theo nghĩa truyền thống, nhưng là "đối thủ thật" vì người dùng đang quen vận hành bằng chúng.

Điểm mạnh:

- Gần như miễn phí.
- Ai cũng biết dùng.
- Linh hoạt.
- Không cần triển khai.
- Hợp với tình huống thiếu quy trình chuẩn.

Điểm yếu:

- Không có tự động hóa.
- Không cảnh báo.
- Không chuẩn hóa dữ liệu.
- Không phân quyền/audit tốt.
- Không phù hợp khi số shipment tăng.
- Không giúp quản lý nhìn ngoại lệ nhanh.

Ý nghĩa cho Agentify:

> MVP phải thắng Excel bằng một lợi ích rất cụ thể: giảm thời gian cập nhật/trả lời trạng thái, cảnh báo đơn hàng có nguy cơ trễ, và tạo báo cáo mà Excel không làm tốt nếu không tốn nhiều công.

---

## 10. Cơ hội sản phẩm cho Agentify trong Cụm 2

### 10.1. PO-to-shipment timeline

Tính năng:

- Tạo timeline theo PO hoặc sales order.
- Nối PO với invoice, booking, container, B/L, tờ khai, trucking, warehouse receipt.
- Hiển thị trạng thái theo ngôn ngữ business, không chỉ theo mã nghiệp vụ logistics.

Ví dụ hiển thị:

```text
PO-2026-0712 | Supplier: ABC Components | Need-by date: 20/7

Trạng thái hiện tại:
- Hàng đã ATD ngày 8/7
- ETA Cát Lái: 18/7
- Chưa nhận được C/O
- Dự kiến thông quan: 19-20/7 nếu hồ sơ đủ
- Rủi ro: cao, vì ngày cần hàng là 20/7 và chưa có C/O

Việc cần làm:
1. Nhắc supplier gửi C/O bản scan trước 12/7.
2. Nhắc forwarder kiểm tra ETA cập nhật.
3. Cảnh báo production planner về nguy cơ trễ 1-2 ngày.
```

Giá trị:

- Chủ hàng không phải tự nối mã PO với container/B/L.
- Sales/procurement/production cùng nhìn một timeline.
- Dễ giải thích cho sếp hoặc khách hàng.

### 10.2. Delivery commitment risk alert

Tính năng:

- Nhập ngày cam kết giao hàng hoặc ngày cần hàng.
- Hệ thống so sánh với ETA, thời gian thông quan, thời gian trucking, lịch kho.
- Cảnh báo nếu lô hàng có nguy cơ không kịp.

Các mức cảnh báo:

| Mức | Ý nghĩa | Hành động |
|---|---|---|
| Xanh | Đang đúng kế hoạch | Tiếp tục theo dõi |
| Vàng | Có rủi ro nhẹ | Kiểm tra chứng từ/ETA/cut-off |
| Cam | Có rủi ro đáng kể | Báo quản lý, chuẩn bị phương án |
| Đỏ | Gần như chắc trễ | Báo khách/nội bộ, quyết định phương án xử lý |

Giá trị:

- Chuyển từ phản ứng sau khi trễ sang cảnh báo trước khi trễ.
- Hỗ trợ sales/account cập nhật khách sớm.
- Giúp management ưu tiên xử lý lô hàng quan trọng.

### 10.3. Exception inbox cho chủ hàng

Thay vì hiển thị tất cả shipment, Agentify nên có một màn hình "ngoại lệ cần xử lý".

Ví dụ ngoại lệ:

- ETA trễ hơn ngày cần hàng.
- Chưa có chứng từ quan trọng.
- Booking bị roll.
- Container đã về cảng nhưng chưa khai hải quan.
- Hàng đã thông quan nhưng chưa book xe.
- Sắp hết free time.
- Chi phí phát sinh vượt dự toán.
- Forwarder chưa cập nhật quá X giờ.

Mỗi exception cần có:

- PO/shipment liên quan.
- Mức độ nghiêm trọng.
- Nguyên nhân.
- Người phụ trách đề xuất.
- Deadline xử lý.
- Gợi ý hành động.
- Mẫu tin nhắn/email để hỏi bên liên quan.

### 10.4. AI status summary cho business team

Tính năng:

- Tóm tắt trạng thái lô hàng bằng ngôn ngữ dễ hiểu.
- Không bắt người đọc hiểu mã nghiệp vụ.
- Có thể tạo bản tóm tắt theo vai trò: sales, procurement, management, warehouse.

Ví dụ cho sales:

```text
Đơn PO-2026-0712 đang có rủi ro giao trễ 1-2 ngày.
Nguyên nhân chính là ETA cập nhật bị lùi từ 18/7 sang 19/7 và chứng từ C/O chưa nhận.
Logistics đang chờ supplier gửi C/O trong hôm nay.
Nếu khách cần hàng trước 20/7, nên báo trước rằng lịch giao có thể chuyển sang 21-22/7.
```

Ví dụ cho quản lý:

```text
Tuần này có 8 PO nhập khẩu đang rủi ro.
3 PO rủi ro cao do ETA trễ hơn ngày cần hàng.
2 PO thiếu chứng từ C/O.
3 PO chưa có lịch trucking sau khi dự kiến thông quan.
Forwarder X có 5 cập nhật chậm quá 24 giờ.
```

### 10.5. Draft email/Zalo hỏi trạng thái

Agentify không chỉ tóm tắt, mà có thể soạn nháp tin nhắn để hỏi bên liên quan.

Ví dụ hỏi forwarder:

```text
Anh/chị kiểm tra giúp lô PO-2026-0712 / B/L ABCD123456 hiện ETA mới nhất là ngày nào?
Ngoài ra cho em xác nhận giúp:
1. Tàu đã ATD chưa?
2. Dự kiến có bị delay/roll không?
3. Chứng từ nào còn thiếu để khai hải quan nhập?

Em cần cập nhật trước 15:00 hôm nay để báo kế hoạch sản xuất.
```

Ví dụ hỏi nhà cung cấp:

```text
Dear supplier,

For PO-2026-0712, please confirm whether the Certificate of Origin can be sent today.
The shipment is expected to arrive on 19 July, and missing C/O may delay customs clearance and delivery to our factory.

Please send the scanned copy first and confirm courier details for the original document.
```

Nguyên tắc:

- AI chỉ soạn nháp.
- Người phụ trách duyệt trước khi gửi.
- Với thông tin nhạy cảm như phạt, claim, thay đổi cam kết, cần workflow duyệt quản lý.

### 10.6. Supplier/forwarder update intake

Tính năng:

- Nhận email cập nhật từ forwarder/supplier.
- Trích xuất các thông tin như PO, booking, container, ETD, ETA, delay reason.
- Gắn vào shipment timeline.
- Nếu không nhận diện được mã, đưa vào hàng chờ để người dùng map thủ công.

Nguồn đầu vào MVP có thể là:

- File Excel shipment tracking hiện có.
- Email forwarder.
- File chứng từ PDF/ảnh.
- Cập nhật thủ công từ người dùng.
- Sau đó mới tính tới API với ERP/TMS/carrier.

### 10.7. Dashboard cho quản lý

Dashboard nên tập trung vào ngoại lệ, không chỉ số lượng shipment.

Chỉ số đề xuất:

- Số PO/shipment đang mở.
- Số PO có nguy cơ trễ.
- Số PO đã trễ.
- Số PO thiếu chứng từ.
- Số shipment chưa được cập nhật quá X giờ.
- OTIF theo khách hàng/nhà cung cấp/forwarder.
- Nguyên nhân trễ theo nhóm: supplier, production, booking, carrier, customs, trucking, warehouse, document.
- Chi phí phát sinh theo nhóm.

Giá trị:

- Management nhìn được vấn đề thay vì chỉ xem danh sách lô hàng.
- Dữ liệu hỗ trợ đánh giá forwarder/supplier.
- Có thể dùng để chứng minh ROI của Agentify.

---

## 11. MVP đề xuất cho Cụm 2

### 11.1. ICP nên chọn

ICP tốt nhất cho MVP:

> Doanh nghiệp chủ hàng vừa và nhỏ hoặc mid-market có 30-300 shipment/tháng, đang theo dõi bằng Excel/email/Zalo, có nhiều PO XNK và thường xuyên phải cập nhật trạng thái cho sales/production/khách hàng.

Ưu tiên:

- Nhập khẩu nguyên liệu cho sản xuất.
- Xuất khẩu B2B có cam kết giao hàng.
- Phân phối B2B nhập khẩu có sales commitment.
- Doanh nghiệp dùng 2-5 forwarder khác nhau.

Không nên ưu tiên ban đầu:

- Doanh nghiệp quá nhỏ, ít shipment, pain chưa đủ lớn.
- Enterprise quá lớn đòi tích hợp ERP phức tạp ngay.
- Doanh nghiệp chỉ cần tracking container cơ bản.
- Doanh nghiệp không có người owner logistics rõ ràng.

### 11.2. Bộ tính năng MVP

MVP nên gồm 6 khối:

1. **PO/shipment workspace**
   - Tạo PO hoặc import từ Excel.
   - Gắn shipment/container/B/L/invoice/tờ khai vào PO.
   - Có trạng thái tổng quan.

2. **Timeline**
   - Hiển thị các mốc: PO created, supplier ready, booking confirmed, ETD, ATD, ETA, ATA, customs, trucking, warehouse receipt.
   - Cho phép cập nhật thủ công hoặc import từ email/file.

3. **Commitment date**
   - Nhập ngày cần hàng/ngày cam kết giao.
   - Hệ thống tính rủi ro dựa trên ETA và checklist còn thiếu.

4. **Exception inbox**
   - Danh sách PO/shipment cần xử lý.
   - Có severity, reason, owner, deadline.

5. **AI summary and draft message**
   - Tóm tắt trạng thái dễ hiểu.
   - Soạn nháp email/Zalo hỏi forwarder/supplier hoặc báo nội bộ.

6. **Basic dashboard**
   - Số shipment mở.
   - Số shipment rủi ro/trễ.
   - Nguyên nhân trễ.
   - Forwarder/supplier cần follow-up.

### 11.3. Luồng demo MVP dễ hiểu cho sếp/khách hàng

Demo nên xoay quanh câu hỏi:

> "PO này có kịp giao không?"

Luồng demo:

```text
1. Import file Excel shipment tracking hiện tại của khách.
2. Agentify tự nhận diện PO, supplier, ETA, container, forwarder.
3. Người dùng nhập ngày cần hàng/cam kết giao.
4. Agentify phát hiện 5 PO có nguy cơ trễ.
5. Người dùng mở một PO để xem timeline.
6. Agentify chỉ ra lý do: ETA bị lùi + thiếu C/O + chưa book xe.
7. Agentify soạn nháp email hỏi forwarder và supplier.
8. Quản lý xem dashboard biết tuần này nhóm logistics cần ưu tiên PO nào.
```

Điểm ăn tiền:

- Không cần thay ERP.
- Không cần tích hợp sâu ngay.
- Dùng dữ liệu khách đang có.
- Chứng minh giá trị trong 1-2 tuần pilot.

### 11.4. Những thứ không nên làm trong MVP

Không nên:

- Thay ERP.
- Thay TMS/WMS.
- Tự động cam kết ngày giao cho khách.
- Tự động gửi thông báo nhạy cảm mà không có người duyệt.
- Tự động quyết định đổi phương án vận chuyển.
- Tự động claim/phạt nhà cung cấp/forwarder.
- Tích hợp quá nhiều API ngay từ đầu.
- Làm dashboard quá nhiều chỉ số nhưng không giải quyết hành động.

Lý do:

> MVP phải chứng minh được một giá trị hẹp nhưng đau: giảm mù trạng thái, phát hiện trễ sớm, hỗ trợ follow-up và giúp các phòng ban cùng nhìn một sự thật.

---

## 12. Ví dụ hoạt động cụ thể của Agentify

### 12.1. Ví dụ 1: Công ty sản xuất nhập linh kiện bị rủi ro trễ nguyên liệu

Bối cảnh:

- Công ty A sản xuất thiết bị điện.
- PO-1008 nhập linh kiện từ Trung Quốc.
- Ngày nhà máy cần hàng: 20/7.
- Forwarder gửi email báo ETA mới là 19/7.
- Supplier chưa gửi C/O.
- Logistics vẫn đang theo dõi bằng Excel.

Cách làm hiện tại:

```text
Procurement hỏi logistics: "PO-1008 có kịp về không?"
Logistics mở Excel tìm PO.
Sau đó mở email forwarder để xem ETA.
Sau đó hỏi docs xem đã có C/O chưa.
Sau đó hỏi trucking có xe chưa.
Sau đó nhắn lại procurement bằng Zalo.
Nếu bận, việc này có thể mất vài giờ hoặc bị quên.
```

Cách Agentify hoạt động:

```text
1. Agentify đọc file Excel và email forwarder.
2. Hệ thống nhận ra PO-1008 có ETA mới là 19/7.
3. Hệ thống biết ngày cần hàng là 20/7.
4. Hệ thống kiểm tra checklist và thấy thiếu C/O.
5. Hệ thống cảnh báo: Rủi ro cao, có thể trễ 1-2 ngày.
6. Hệ thống gợi ý việc cần làm:
   - Nhắc supplier gửi C/O bản scan.
   - Nhắc forwarder xác nhận ETA mới nhất.
   - Báo production planner chuẩn bị phương án thay thế.
7. Hệ thống soạn nháp email/tin nhắn để người phụ trách duyệt gửi.
```

Giải thích cho người ngoài ngành:

> Agentify giống một trợ lý theo dõi đơn hàng. Nó không tự đi lấy hàng, không tự khai hải quan, nhưng nó đọc các cập nhật rời rạc và chỉ ra đơn nào sắp trễ, vì sao trễ, ai cần làm gì.

### 12.2. Ví dụ 2: Công ty xuất khẩu bị khách hỏi "hàng đã đi chưa?"

Bối cảnh:

- Công ty B xuất khẩu hàng may mặc.
- Khách Mỹ có PO-US-221, yêu cầu giao trước mùa bán hàng.
- Sales cần trả lời khách mỗi ngày.
- Logistics nhận booking từ forwarder nhưng tàu bị roll sang chuyến sau.
- Thông tin roll tàu nằm trong email forwarder, sales chưa biết.

Cách làm hiện tại:

```text
Khách hỏi sales: "Has the shipment departed?"
Sales hỏi logistics.
Logistics tìm email booking.
Docs kiểm tra B/L đã phát hành chưa.
Ops xác nhận container đã vào cảng chưa.
Sales chờ vài giờ mới trả lời khách.
```

Cách Agentify hoạt động:

```text
1. Agentify đọc email forwarder báo booking bị roll.
2. Hệ thống cập nhật timeline của PO-US-221.
3. Hệ thống so sánh ETD mới với ngày khách cần hàng.
4. Hệ thống cảnh báo sales và logistics: shipment bị lùi 3 ngày.
5. Hệ thống tạo bản tóm tắt:
   - Container đã vào cảng.
   - Booking cũ bị roll.
   - ETD mới là ngày 15/7.
   - ETA dự kiến bị lùi 3 ngày.
6. Hệ thống soạn nháp email tiếng Anh cho khách, nhưng sales vẫn duyệt trước khi gửi.
```

Giải thích cho người ngoài ngành:

> Thay vì sales phải hỏi nhiều người, Agentify biến email kỹ thuật của forwarder thành câu trả lời dễ hiểu cho khách. Điều quan trọng là sales biết sớm để không trả lời sai hoặc quá muộn.

---

## 13. Câu hỏi phỏng vấn cho Cụm 2

### 13.1. Câu hỏi cho chủ doanh nghiệp/quản lý

1. Mỗi tháng công ty xử lý khoảng bao nhiêu PO XNK?
2. Có bao nhiêu shipment/container/tháng?
3. Logistics ảnh hưởng đến doanh thu/sản xuất như thế nào?
4. Chỉ số nào đang được theo dõi: OTIF, cost per shipment, delay rate, demurrage/detention, customer complaint?
5. Khi hàng trễ, ai là người chịu trách nhiệm giải trình?
6. Công ty có bị phạt trễ giao hàng hoặc mất đơn vì logistics chưa?
7. Hiện tại quản lý xem tình trạng shipment ở đâu?
8. Có dashboard nào cho PO rủi ro không?
9. Nếu giảm được 30-50% thời gian follow-up trạng thái, giá trị kinh tế là gì?
10. Doanh nghiệp có sẵn sàng pilot sản phẩm trong 4-6 tuần không?

### 13.2. Câu hỏi cho logistics/import-export staff

1. Một ngày bạn phải trả lời bao nhiêu câu hỏi về trạng thái hàng?
2. Để trả lời một câu hỏi, bạn phải mở những hệ thống/file/kênh nào?
3. File tracking hiện tại có những cột gì?
4. Dữ liệu nào bạn phải nhập tay nhiều nhất?
5. Thông tin nào thường bị thiếu hoặc cập nhật trễ?
6. Bạn theo dõi theo PO, shipment, container, B/L hay invoice?
7. Một PO có thể tách thành nhiều shipment/container không?
8. Khi ETA thay đổi, ai cần được báo?
9. Khi thiếu chứng từ, ai chịu trách nhiệm follow-up?
10. Có trường hợp nào hàng về rồi nhưng chưa lấy được vì thiếu bước nào đó không?

### 13.3. Câu hỏi cho sales/customer service của chủ hàng

1. Khách thường hỏi gì về tình trạng đơn hàng?
2. Bạn có tự xem được trạng thái không hay phải hỏi logistics?
3. Mất bao lâu để trả lời khách một câu hỏi "hàng đang ở đâu"?
4. Bạn có từng trả lời khách dựa trên thông tin cũ chưa?
5. Khi shipment có nguy cơ trễ, bạn biết sớm hay chỉ biết khi đã trễ?
6. Bạn có cần một bản tóm tắt dễ hiểu thay vì chi tiết kỹ thuật logistics không?
7. Email/tin nhắn cập nhật khách có cần duyệt quản lý không?

### 13.4. Câu hỏi cho procurement/supply planning

1. Bạn cần hàng về trước ngày nào và ngày đó được lưu ở đâu?
2. Logistics có tự động cảnh báo nếu ETA trễ hơn ngày cần hàng không?
3. Bạn có nhìn được inbound shipment theo PO không?
4. Khi nguyên liệu trễ, có phương án thay thế không?
5. Bạn có đo ảnh hưởng của logistics delay tới production plan không?

### 13.5. Câu hỏi cho finance/accounting

1. Chi phí logistics được gắn theo PO, shipment hay invoice?
2. Có so sánh chi phí dự toán và thực tế không?
3. Phí phát sinh như lưu bãi/lưu container có được cảnh báo trước không?
4. Debit note/hóa đơn từ forwarder được đối soát như thế nào?
5. Khi hàng trễ, chi phí phát sinh được quy trách nhiệm cho ai?

### 13.6. Câu hỏi kiểm chứng khả năng mua

1. Nếu có hệ thống giúp theo dõi PO-to-delivery, ai là người quyết định mua?
2. Ngân sách phần mềm logistics/supply chain hiện tại khoảng bao nhiêu?
3. Công ty thích trả theo user, theo shipment, theo tháng hay theo site?
4. Điều kiện để đồng ý pilot là gì?
5. Dữ liệu nào có thể chia sẻ cho pilot?
6. Có yêu cầu bảo mật hoặc IT approval nào không?
7. Kết quả pilot như thế nào thì được coi là thành công?

---

## 14. Survey định lượng đề xuất cho Cụm 2

Các câu hỏi nên đưa vào form khảo sát 50-100 người:

| Câu hỏi | Loại câu trả lời | Mục đích |
|---|---|---|
| Công ty bạn thuộc nhóm nào? | Sản xuất, thương mại, xuất khẩu, nhập khẩu, phân phối, FDI | Phân khúc mẫu |
| Mỗi tháng xử lý bao nhiêu PO XNK? | Khoảng số | Đo quy mô |
| Mỗi tháng xử lý bao nhiêu shipment/container? | Khoảng số | Đo tần suất logistics |
| Bạn theo dõi lô hàng bằng gì? | ERP, Excel, email, Zalo, forwarder portal, TMS, khác | Đo công cụ hiện tại |
| Để trả lời một câu hỏi trạng thái, bạn phải kiểm tra bao nhiêu nguồn? | 1, 2-3, 4-5, trên 5 | Đo độ phân mảnh |
| Thời gian trung bình để trả lời "hàng đang ở đâu"? | Dưới 5 phút, 5-15 phút, 15-60 phút, trên 1 giờ | Đo pain thời gian |
| Tần suất ETA thay đổi ảnh hưởng tới kế hoạch? | Hiếm, hàng tháng, hàng tuần, gần như hàng ngày | Đo rủi ro |
| Tần suất thiếu chứng từ làm chậm xử lý? | Hiếm, hàng tháng, hàng tuần, thường xuyên | Đo pain chứng từ |
| Công ty có đo OTIF không? | Có/Không/Không rõ | Đo maturity |
| Bạn có muốn hệ thống cảnh báo PO có nguy cơ trễ không? | 1-5 | Đo nhu cầu |
| Bạn có muốn AI tóm tắt trạng thái và soạn nháp email không? | 1-5 | Đo acceptance AI |
| Công ty có sẵn sàng pilot không? | Có/Không/Cần thêm thông tin | Đo sales potential |

Chỉ số cần rút ra:

- Tỷ lệ doanh nghiệp vẫn dùng Excel/email/Zalo.
- Số nguồn trung bình phải check để trả lời trạng thái.
- Thời gian trung bình trả lời trạng thái.
- Tỷ lệ doanh nghiệp có PO bị trễ do logistics trong 3 tháng gần nhất.
- Tỷ lệ muốn cảnh báo rủi ro theo PO.
- Tỷ lệ sẵn sàng pilot.

---

## 15. Giả thuyết cần kiểm chứng sau Cụm 2

### 15.1. Giả thuyết sản phẩm

1. Chủ hàng muốn theo dõi theo PO/sales order hơn là theo container đơn lẻ.
2. Pain lớn nhất là không biết đơn nào có nguy cơ trễ ngày cần hàng/cam kết giao.
3. Người dùng chấp nhận AI nếu AI tóm tắt và soạn nháp, nhưng không tự gửi thông tin nhạy cảm.
4. Excel là nguồn dữ liệu MVP khả thi nhất.
5. Email forwarder/supplier là nguồn dữ liệu có giá trị cao nhưng cần xử lý mapping tốt.
6. Dashboard ngoại lệ có giá trị hơn dashboard tracking tất cả shipment.

### 15.2. Giả thuyết bán hàng

1. Buyer kinh tế có thể là Logistics Manager, Supply Chain Manager, Operations Director hoặc chủ doanh nghiệp.
2. Người dùng đầu tiên là logistics/import-export staff và sales/customer service.
3. Chủ hàng mid-market có thể mua nhanh hơn enterprise.
4. Forwarder/3PL có thể là kênh bán gián tiếp nếu họ dùng Agentify để cung cấp portal/cập nhật tốt hơn cho chủ hàng.
5. Giá trị ROI phải gắn với giảm thời gian follow-up, giảm trễ, giảm phí phát sinh và tăng chất lượng cập nhật khách.

### 15.3. Giả thuyết dữ liệu

1. Ở giai đoạn đầu, không cần tích hợp ERP sâu nếu có thể import/export Excel.
2. Cần hỗ trợ mapping nhiều mã: PO, SO, invoice, booking, container, B/L, tờ khai.
3. Cần cơ chế confidence score khi AI trích xuất dữ liệu từ email/file.
4. Cần cho người dùng sửa và xác nhận dữ liệu, vì logistics có nhiều ngoại lệ.
5. Cần lưu lịch sử thay đổi để tránh tranh cãi "ai cập nhật gì, lúc nào".

---

## 16. Kết luận sơ bộ Cụm 2

Cụm chủ hàng, PO, hợp đồng và cam kết giao hàng là một cụm rất quan trọng vì nó nối logistics với kết quả kinh doanh. Nếu chỉ nhìn từ forwarder/cảng/hải quan, Agentify có thể bị kéo vào nghiệp vụ vận hành hẹp. Nhưng nếu nhìn từ chủ hàng, bài toán rõ hơn:

> Chủ hàng cần biết đơn hàng nào đang rủi ro, rủi ro do đâu, ảnh hưởng tới ngày giao/ngày cần hàng như thế nào, và ai cần xử lý tiếp theo.

Điểm đáng chú ý:

1. Thị trường XNK Việt Nam có quy mô lớn, tăng trưởng mạnh và có áp lực chuyển đổi số logistics.
2. Chủ hàng thường có ERP nhưng vẫn thiếu visibility thực tế từ forwarder/cảng/hải quan/trucking.
3. Dữ liệu bị phân mảnh giữa PO, shipment, container, B/L, tờ khai, email, Excel và Zalo.
4. Pain của chủ hàng không chỉ là tracking container, mà là quản lý rủi ro giao hàng theo PO/cam kết.
5. Agentify có thể tạo giá trị bằng một lớp trung gian nhẹ: PO-to-shipment timeline, exception inbox, AI summary, draft follow-up, dashboard rủi ro.
6. MVP nên bắt đầu bằng dữ liệu Excel/email/file và cập nhật thủ công có kiểm soát, không nên đòi tích hợp sâu ngay.
7. Đối thủ quốc tế như project44/FourKites chứng minh nhu cầu visibility/control tower, nhưng Agentify có cơ hội ở phân khúc địa phương hóa, nhẹ hơn, workflow Việt Nam hơn.

Kết luận định hướng:

> Agentify nên chọn Cụm 2 làm một trong các use case trung tâm của sản phẩm, vì đây là nơi pain logistics chuyển thành ngôn ngữ kinh doanh: trễ đơn, trễ sản xuất, trễ giao khách, phát sinh chi phí và mất uy tín.

---

## 17. Nguồn tham khảo

1. National Statistics Office of Vietnam, "Press release social-economic situation in the fourth quarter and 2025": https://www.nso.gov.vn/en/data-and-statistics/2026/01/press-release-social-economic-situation-in-the-fourth-quarter-and-2025/

2. Viet Nam Logistics Forum 2025, Ministry of Industry and Trade: https://vlf.logistics.gov.vn/en

3. Logistics.gov.vn, "Viet Nam: Gov't approves logistics services development strategy towards 2035": https://logistics.gov.vn/vietnam-gov-t-approves-logistics-services-development-strategy-towards-2025

4. ICC Digital Library, "What are the Incoterms rules?": https://library.iccwbo.org/clp/clp-incoterms-qa-w1.htm?AGENT=ICC_EST

5. ICC, "Using Incoterms 2020 Rules to Manage Tariff Risk in International Trade": https://iccwbo.org/wp-content/uploads/sites/3/2025/04/2025.04_Using_Incoterms_to-Manage-Tariff-Risks.pdf

6. project44, "Ocean Visibility": https://www.project44.com/platform/visibility/ocean/

7. project44, "Supply Chain Visibility Software": https://www.project44.com/platform/visibility/

8. FourKites, "About FourKites": https://www.fourkites.com/about/

9. Winta Logistics, "Phần mềm Forwarder, Logistics ERP Winta": https://www.forwarder.vn/

10. TrackAsia TMS: https://trackasia.vn/?lang=en

11. TigerWMS: https://tigerwms.vn/

12. Digisys: https://digisys.vn/

13. woka.io: https://woka.io/

---

## 18. Tóm tắt compact sau Cụm 2

Đã hoàn tất Cụm 2: Chủ hàng, PO, hợp đồng và cam kết giao hàng. File đã viết tại `docs/khao-sat-thi-truong-logistic/cum_2_chu_hang_po_hop_dong_cam_ket_giao_hang.md`.

Insight chính:

- Chủ hàng là bên chịu tác động kinh doanh cuối cùng khi hàng trễ, thiếu chứng từ, sai cam kết hoặc phát sinh chi phí.
- Quy mô XNK Việt Nam rất lớn: NSO công bố tổng kim ngạch XNK hàng hóa 2025 đạt 930,05 tỷ USD, tăng 18,2% so với năm trước.
- Chủ hàng thường có ERP để quản lý PO/kế toán/tồn kho, nhưng ERP không tự có visibility từ forwarder, cảng, hải quan, trucking, kho và email/Zalo.
- Pain lõi không phải chỉ là "container đang ở đâu", mà là "PO/đơn hàng này có kịp ngày cần hàng hoặc ngày cam kết với khách không?".
- Dữ liệu bị phân mảnh giữa PO, sales order, invoice, booking, container, B/L, tờ khai, email, Zalo, Excel và portal của forwarder/3PL.
- Incoterms rất quan trọng vì quyết định bên nào chịu trách nhiệm logistics, chi phí, rủi ro, bảo hiểm và thủ tục hải quan.
- Đối thủ quốc tế như project44/FourKites xác nhận nhu cầu visibility/control tower, nhưng có thể quá enterprise/đắt/nặng cho SME Việt Nam và chưa tối ưu local workflow như Zalo, Excel, chứng từ tiếng Việt, ECUS/ePort.
- ERP/TMS/WMS nội địa có nhiều, nhưng thường là hệ thống vận hành theo module; khoảng trống cho Agentify là lớp trung gian nhẹ đọc dữ liệu rời rạc, nối PO với shipment/container/chứng từ/cam kết giao hàng và cảnh báo ngoại lệ.
- MVP đề xuất cho cụm này: PO/shipment workspace, PO-to-shipment timeline, commitment date risk alert, exception inbox, AI status summary/draft message, dashboard rủi ro.
- ICP tốt nhất: chủ hàng mid-market/SME có 30-300 shipment/tháng, nhiều PO XNK, đang dùng Excel/email/Zalo, có nhiều forwarder và thường xuyên bị hỏi trạng thái từ sales/production/khách hàng.
- Agentify không nên thay ERP/TMS/WMS, không tự cam kết ngày giao, không tự gửi thông tin nhạy cảm, không tự quyết định đổi phương án vận chuyển. AI nên hỗ trợ tóm tắt, cảnh báo, nhắc việc và soạn nháp để con người duyệt.
