# Cụm 5: Trucking nội địa

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để hiểu lớp **trucking nội địa** trong logistics B2B/XNK: book xe, điều xe, lấy container tại cảng/depot/ICD, giao hàng về kho/nhà máy, trả container rỗng, cập nhật trạng thái, lưu POD và xử lý chi phí phát sinh.

Nếu Cụm 1 trả lời "hàng đã đủ điều kiện qua hải quan/cảng chưa", Cụm 4 trả lời "bộ chứng từ đã đủ chưa", thì Cụm 5 trả lời câu hỏi:

> Sau khi chứng từ và điều kiện cảng/hải quan đã sẵn sàng, xe có thực sự lấy được container, giao đúng giờ, trả rỗng đúng hạn và cập nhật đủ bằng chứng giao hàng không?

Các câu hỏi chính cần trả lời:

1. Ai book xe và ai điều xe trong một lô hàng B2B/XNK?
2. Trạng thái trucking đang được cập nhật qua đâu: TMS, GPS, app tài xế, Zalo, điện thoại, Excel hay email?
3. Khi xe trễ, ai biết đầu tiên và mất bao lâu để khách biết?
4. Những trạng thái nào quan trọng nhất: xe nhận lệnh, vào cảng, lấy container, rời cảng, đến kho, đang chờ bốc/dỡ, giao xong, trả rỗng?
5. POD, EIR, ảnh giao hàng, biên bản bất thường đang được lưu ở đâu?
6. Trễ trucking có làm phát sinh phí lưu bãi, lưu container, phí chờ xe, phạt lịch kho hoặc trễ cam kết khách không?
7. Các sản phẩm TMS/freight platform/GPS hiện tại giải quyết phần nào, còn khoảng trống gì?
8. Agentify có nên làm TMS mới không, hay làm lớp trung gian gom trạng thái trucking từ TMS/GPS/Zalo/Excel/email?
9. MVP trucking nào đủ hẹp để thử nhanh nhưng đủ đau để chứng minh ROI?

Kết luận cần kiểm chứng:

> Trucking nội địa là một cụm có pain vận hành rất rõ vì đây là đoạn mà khách hàng hay hỏi nhất: "xe tới đâu rồi?", "đã lấy container chưa?", "bao giờ tới kho?", "POD đâu?", "đã trả rỗng chưa?". Cơ hội của Agentify không phải là thay thế TMS hoặc GPS, mà là tạo lớp visibility và exception management cho CS/Ops: gom trạng thái từ nhiều nguồn, nhắc cập nhật, cảnh báo trễ, lưu POD theo shipment và soạn nháp trả lời khách.

---

## 2. Vì sao trucking nội địa quan trọng?

### 2.1. Trucking là đoạn nối giữa cảng và doanh nghiệp

Trong hàng nhập khẩu, trucking thường là đoạn đưa hàng từ cảng/ICD/depot về kho hoặc nhà máy. Trong hàng xuất khẩu, trucking đưa container rỗng đến kho đóng hàng, sau đó kéo container hàng ra cảng trước cut-off.

Trên giấy tờ, trucking có thể chỉ là "kéo container từ A đến B". Trong vận hành thực tế, nó liên quan đến nhiều điều kiện:

- Container đã được release chưa.
- Tờ khai đã thông quan hoặc đủ điều kiện làm thủ tục chưa.
- D/O đã có chưa.
- Phí cảng/local charge đã thanh toán chưa.
- Cảng có cho xe vào không.
- Có cần đặt lịch hẹn vào cảng hoặc kho không.
- Tài xế có đủ thông tin lệnh, số container, số seal, mã PIN/eDO, booking, depot trả rỗng không.
- Kho/nhà máy có slot bốc dỡ không.
- Container rỗng phải trả ở đâu và trước hạn nào.

Vì vậy, trucking là điểm nối giữa nhiều cụm trước:

```text
Chứng từ đủ
  -> Hải quan/cảng đủ điều kiện
  -> Book xe
  -> Điều tài xế
  -> Lấy container/giao hàng/trả rỗng
  -> POD/EIR/biên bản
  -> Đối soát phí
```

Nếu một điều kiện bị thiếu, xe có thể vẫn được điều đi nhưng không lấy/giao được hàng. Đây là nguồn lãng phí rất lớn.

### 2.2. Trucking là nơi khách hàng đòi cập nhật gần thời gian thực

Khách hàng thường không hỏi chi tiết "SI cut-off là mấy giờ" hay "C/O đang ở bước nào" nếu họ không làm trực tiếp. Nhưng họ rất hay hỏi:

- Xe đến cảng chưa?
- Đã lấy container chưa?
- Container đã rời cảng chưa?
- Mấy giờ xe tới kho?
- Tại sao xe chưa vào được cổng?
- Giao xong chưa?
- Cho xin POD.
- Đã trả rỗng chưa?

Các câu hỏi này thường đến qua Zalo, điện thoại, email hoặc nhóm chat khách hàng. Nếu CS/Ops không có dữ liệu sẵn, họ phải gọi điều phối, điều phối gọi tài xế, tài xế gửi ảnh/chụp màn hình, rồi CS mới trả lời khách. Đây là workflow lặp lại hằng ngày.

### 2.3. Đường bộ vẫn là mode vận tải rất lớn tại Việt Nam

Theo National Statistics Office of Vietnam, năm 2025 nhóm **transportation and storage** tăng 10,99% và đóng góp đáng kể vào tăng trưởng kinh tế. Trong quý IV/2025, khối lượng hàng hóa vận chuyển đạt 799,6 triệu tấn, tăng 10,8% so với cùng kỳ; luân chuyển hàng hóa đạt 160,2 tỷ tấn-km, tăng 9,9%.

Các nguồn tổng hợp từ dữ liệu thống kê cũng cho thấy vận tải đường bộ vẫn chiếm tỷ trọng lớn trong khối lượng hàng hóa vận chuyển tại Việt Nam. Điều này phù hợp với thực tế logistics nội địa: nhiều khu công nghiệp, cảng biển, ICD, depot và kho hàng vẫn phụ thuộc vào xe tải/đầu kéo để kết nối chặng đầu và chặng cuối.

Ý nghĩa cho Agentify:

- Trucking không phải thị trường nhỏ.
- Pain trucking xuất hiện ở forwarder, 3PL, chủ hàng, công ty vận tải và kho.
- Visibility ở trucking có thể là use case dễ hiểu với người mua hơn các nghiệp vụ hải quan/chứng từ phức tạp.

### 2.4. Chuyển đổi số logistics tạo cơ hội cho lớp trung gian

Chiến lược phát triển dịch vụ logistics Việt Nam giai đoạn 2025-2035 đặt mục tiêu phát triển hạ tầng logistics, hạ tầng vận tải và hạ tầng công nghệ, đồng thời thúc đẩy chuyển đổi số trong doanh nghiệp logistics.

Tuy nhiên, chuyển đổi số không có nghĩa là tất cả doanh nghiệp đều dùng một hệ thống duy nhất. Thực tế thường là:

- Một công ty dùng TMS.
- Một đội xe dùng GPS riêng.
- Tài xế dùng Zalo.
- Cảng dùng ePort/SmartGate/TAS.
- Forwarder dùng Excel tracking.
- Khách hàng hỏi qua email/Zalo.
- Kế toán dùng phần mềm riêng.

Khoảng trống của Agentify nằm ở lớp "gom và hiểu" dữ liệu từ nhiều nguồn này.

---

## 3. Thuật ngữ cần giải thích

### 3.1. Trucking là gì?

**Trucking** là vận chuyển hàng hóa bằng xe tải hoặc đầu kéo container trên đường bộ.

Trong logistics XNK, trucking thường gồm:

- Kéo container rỗng từ depot về kho đóng hàng.
- Kéo container hàng từ kho ra cảng xuất.
- Kéo container hàng nhập từ cảng về kho/nhà máy.
- Trả container rỗng sau khi rút hàng.
- Vận chuyển hàng lẻ từ kho CFS hoặc kho 3PL.

### 3.2. Đầu kéo, mooc và container là gì?

**Đầu kéo** là phần xe có động cơ. **Mooc** là rơ-mooc phía sau để chở container. **Container** là thùng tiêu chuẩn dùng để chứa hàng, phổ biến là 20 feet và 40 feet.

Trong vận hành, cần phân biệt:

- Xe/đầu kéo nào nhận lệnh.
- Mooc nào đi cùng.
- Container số nào.
- Seal số nào.
- Tài xế nào phụ trách.

Nếu chỉ biết "xe đã đi" nhưng không biết container/seal/POD, CS vẫn chưa thể trả lời đầy đủ cho khách.

### 3.3. FCL và LCL liên quan gì đến trucking?

**FCL** là hàng nguyên container. Trucking thường kéo nguyên container từ cảng/depot/kho.

**LCL** là hàng lẻ. Hàng có thể được rút tại kho CFS rồi giao bằng xe tải nhỏ hơn, hoặc gom từ nhiều điểm để đưa vào CFS.

Pain của FCL thường nằm ở container, seal, cảng, depot, free time, trả rỗng. Pain của LCL thường nằm ở lịch kho, kiện hàng, số kiện, POD và biên bản thiếu/sai/hư hỏng.

### 3.4. Pickup và delivery là gì?

**Pickup** là lấy hàng/container. **Delivery** là giao hàng/container đến điểm nhận.

Ví dụ hàng nhập:

```text
Pickup: xe vào cảng lấy container hàng.
Delivery: xe giao container về kho khách.
Return empty: xe trả container rỗng về depot.
```

### 3.5. POD là gì?

**POD** là **Proof of Delivery**, tức bằng chứng giao hàng.

POD có thể là:

- Phiếu giao hàng có chữ ký.
- Ảnh chụp hàng đã giao.
- Biên bản giao nhận.
- File PDF có xác nhận.
- Dữ liệu xác nhận trên app tài xế.

POD rất quan trọng vì dùng để:

- Chứng minh đã giao hàng.
- Trả lời khách.
- Làm căn cứ tính phí.
- Đối soát với nhà xe/3PL.
- Xử lý khiếu nại thiếu/sai/hư hỏng.

### 3.6. EIR là gì?

**EIR** là **Equipment Interchange Receipt**, tức phiếu giao nhận container/thiết bị.

EIR thường xuất hiện khi:

- Lấy container tại cảng/depot.
- Trả container rỗng.
- Ghi nhận tình trạng container.

EIR giúp chứng minh container đã được nhận/trả, thời điểm nhận/trả và tình trạng container. Nếu EIR thất lạc, việc đối soát với hãng tàu/depot/khách có thể khó hơn.

### 3.7. Free time, demurrage và detention là gì?

**Free time** là thời gian miễn phí mà hãng tàu/cảng cho phép trước khi phát sinh phí.

**Demurrage** thường liên quan đến thời gian container còn nằm trong cảng/terminal quá hạn miễn phí.

**Detention** thường liên quan đến việc giữ container ngoài cảng quá thời hạn cho phép, ví dụ lấy container về kho nhưng trả rỗng muộn.

Trong trucking nhập khẩu, rủi ro detention rất thực tế:

```text
Container được lấy khỏi cảng ngày 05.
Free time trả rỗng đến ngày 08.
Kho bốc dỡ chậm, xe trả rỗng ngày 10.
=> Có thể phát sinh detention.
```

### 3.8. Depot là gì?

**Depot** là nơi lưu giữ, cấp phát hoặc nhận trả container rỗng. Sau khi giao hàng nhập và rút hàng xong, container rỗng thường phải được trả về depot được chỉ định.

Pain thường gặp:

- Tài xế không biết depot trả rỗng đúng.
- Depot đổi địa điểm trả rỗng.
- Depot quá tải.
- Trả rỗng muộn phát sinh phí.

### 3.9. ICD là gì?

**ICD** là cảng cạn hoặc điểm thông quan nội địa. ICD có thể xử lý container, hải quan, kho bãi và kết nối với cảng biển.

Trucking có thể chạy:

- Cảng biển -> ICD.
- ICD -> kho/nhà máy.
- Kho/nhà máy -> ICD/cảng.

### 3.10. TAS là gì?

**TAS** là **Truck Appointment System**, tức hệ thống đặt lịch xe vào cảng/terminal. Một số cảng/terminal áp dụng đặt lịch để giảm ùn tắc và kiểm soát dòng xe.

Ví dụ: HHIT/Hateco Hải Phòng đã công bố hệ thống Truck Appointment Application System. Theo thông báo của Maersk về HHIT, từ ngày 16/06/2025, xe container vào HHIT cần có lịch TAS được xác nhận.

Ý nghĩa cho Agentify:

- Trạng thái trucking không chỉ là GPS.
- Còn phải biết xe đã có appointment chưa.
- Nếu chưa có slot vào cảng, việc điều xe sớm cũng không giải quyết được.

### 3.11. Gate-in và gate-out là gì?

**Gate-in** là xe/container vào cổng cảng/depot/kho. **Gate-out** là xe/container ra khỏi cổng.

Các mốc này rất quan trọng vì chứng minh:

- Xe đã vào cảng lấy hàng.
- Container đã rời cảng.
- Container đã vào depot trả rỗng.
- Xe đã vào kho khách.

### 3.12. Slot kho là gì?

**Slot kho** là khung giờ kho/nhà máy cho phép xe vào bốc/dỡ hàng.

Nếu xe đến sai slot:

- Xe phải chờ.
- Tài xế bị kẹt.
- Phát sinh phí chờ xe.
- Giao hàng trễ.
- Có thể trễ trả rỗng.

---

## 4. Workflow trucking hàng nhập khẩu

### 4.1. Nhận yêu cầu giao hàng

Yêu cầu giao hàng có thể đến từ:

- Chủ hàng.
- Forwarder.
- 3PL.
- Đại lý hải quan.
- CS/Ops nội bộ.

Thông tin cần có:

- Số HBL/MBL hoặc shipment ID.
- Container number.
- Seal number nếu có.
- Cảng/ICD lấy hàng.
- Kho/nhà máy giao hàng.
- Ngày/giờ cần giao.
- Loại container.
- Trọng lượng hàng.
- D/O/eDO/PIN nếu cần.
- Tờ khai, tình trạng thông quan.
- Thông tin thanh toán phí cảng/local charge.
- Hạn free time/lưu container.

Điểm đau:

- Yêu cầu giao hàng đến qua Zalo/email, thiếu trường quan trọng.
- CS book xe trước khi docs/hải quan/cảng sẵn sàng.
- Điều phối không biết container đã release chưa.

### 4.2. Kiểm tra điều kiện lấy hàng

Trước khi điều xe, cần kiểm tra:

- Container đã dỡ xuống bãi chưa.
- Đã có D/O/eDO chưa.
- Đã thanh toán phí cần thiết chưa.
- Tờ khai đã đủ điều kiện chưa.
- Container có bị giữ do kiểm hóa/kiểm dịch không.
- Cảng có yêu cầu đăng ký ePort/SmartGate/TAS không.

Nếu thiếu bước này, xe có thể vào cảng nhưng không lấy được hàng.

### 4.3. Book xe và phân tài xế

Điều phối chọn:

- Nhà xe hoặc đội xe.
- Đầu kéo.
- Mooc.
- Tài xế.
- Lịch lấy hàng.
- Lộ trình.

Công cụ đang dùng có thể là:

- TMS.
- Excel/Google Sheet.
- Zalo nhóm tài xế.
- Điện thoại.
- GPS/fleet management.
- App tài xế.

Điểm đau:

- Không biết xe nào rảnh thật.
- Tài xế nhận lệnh qua Zalo nhưng không cập nhật lại.
- Thay tài xế/xe nhưng CS không biết.
- Booking xe không gắn rõ với shipment/PO/container.

### 4.4. Xe vào cảng lấy container

Trạng thái cần ghi nhận:

- Tài xế đã nhận lệnh.
- Xe đang đến cảng.
- Xe đã vào cổng cảng.
- Xe đang chờ lấy container.
- Xe đã lấy container.
- Xe đã rời cảng.

Điểm đau:

- Xe chờ lâu nhưng không ai cập nhật.
- Container chưa sẵn sàng.
- Sai thông tin lệnh.
- Cảng yêu cầu bổ sung thủ tục.
- CS chỉ biết khi khách gọi hỏi.

### 4.5. Xe giao hàng về kho/nhà máy

Trạng thái cần ghi nhận:

- Xe đang di chuyển.
- ETA tới kho.
- Xe đã đến kho.
- Xe đang chờ vào cổng.
- Xe đang bốc/dỡ.
- Giao xong.
- Có bất thường: thiếu hàng, hư hàng, seal bất thường, kho từ chối nhận, thiếu chứng từ.

Điểm đau:

- Kho có slot nhưng xe đến sớm/trễ.
- Xe chờ nhiều giờ.
- Khách hỏi ETA liên tục.
- Tài xế gửi ảnh/POD qua Zalo riêng, CS không nhận được.

### 4.6. Trả container rỗng

Sau khi rút hàng, container rỗng phải trả về depot/địa điểm chỉ định.

Thông tin cần kiểm soát:

- Depot trả rỗng.
- Hạn trả rỗng.
- Tình trạng container sau khi rút.
- EIR trả rỗng.
- Phí phát sinh nếu trả muộn.

Điểm đau:

- Tài xế trả sai depot.
- Depot đổi địa điểm/không nhận.
- Trễ trả rỗng do kho dỡ hàng chậm.
- EIR trả rỗng không được lưu theo shipment.

### 4.7. Lưu POD/EIR và đối soát

Sau khi hoàn tất, cần lưu:

- POD.
- EIR lấy/trả container.
- Ảnh giao hàng.
- Biên bản bất thường nếu có.
- Chi phí chờ xe/phát sinh.
- Hóa đơn/phiếu thu nếu liên quan.

Điểm đau:

- POD nằm trong Zalo của tài xế.
- EIR thất lạc.
- Kế toán hỏi chứng từ đối soát nhưng Ops phải tìm lại nhiều nơi.
- Khách yêu cầu POD nhưng CS chưa có.

---

## 5. Workflow trucking hàng xuất khẩu

### 5.1. Nhận kế hoạch đóng hàng

Thông tin cần có:

- Booking number.
- Container type/quantity.
- Kho/nhà máy đóng hàng.
- Ngày/giờ đóng hàng.
- CY/CFS cut-off.
- SI/VGM deadline nếu liên quan.
- Cảng hạ container.
- Yêu cầu container rỗng.
- Hàng thường, hàng lạnh, hàng nguy hiểm hay hàng quá khổ.

Điểm đau:

- Lịch đóng hàng đổi nhưng điều phối chưa biết.
- Booking thay đổi vessel/voyage/cut-off.
- Thiếu thông tin lấy container rỗng.

### 5.2. Lấy container rỗng

Xe đến depot lấy container rỗng.

Trạng thái cần ghi nhận:

- Đã cấp container rỗng chưa.
- Số container.
- Tình trạng container.
- EIR lấy rỗng.
- Xe rời depot.

Điểm đau:

- Depot hết container phù hợp.
- Container rỗng không đạt yêu cầu.
- Tài xế gửi số container muộn, docs không kịp SI/VGM.

### 5.3. Đóng hàng tại kho/nhà máy

Trạng thái cần ghi nhận:

- Xe đến kho.
- Đang chờ vào cổng.
- Đang đóng hàng.
- Đóng hàng xong.
- Seal number.
- Gross weight/VGM.
- Có bất thường về hàng/container.

Điểm đau:

- Kho đóng hàng chậm.
- Thiếu nhân sự bốc xếp.
- Seal gửi muộn.
- VGM gửi muộn.
- Xe trễ làm miss cut-off.

### 5.4. Hạ container hàng ra cảng

Trạng thái cần ghi nhận:

- Xe rời kho.
- ETA tới cảng.
- Xe vào cổng cảng.
- Container đã hạ bãi.
- EIR hạ hàng.
- Container đã vào danh sách xuất.

Điểm đau:

- Xe đến cảng sát cut-off.
- Sai thông tin booking/tờ khai.
- Hạ nhầm cảng/khu vực.
- Container bị từ chối do chưa đủ điều kiện.

---

## 6. Thực trạng quản lý trucking tại Việt Nam

### 6.1. TMS và GPS có tồn tại, nhưng dữ liệu vẫn bị đứt đoạn

Thị trường đã có nhiều công cụ:

- TMS để quản lý lệnh vận chuyển, đội xe, tài xế, chi phí.
- GPS/fleet management để theo dõi vị trí xe.
- Freight platform để đặt xe hoặc kết nối chủ hàng với nhà xe.
- App tài xế để cập nhật pickup/delivery/POD.
- ePort/SmartGate/TAS tại cảng để làm thủ tục và đặt lịch.

Nhưng dữ liệu trucking vẫn thường bị đứt đoạn vì:

- Forwarder thuê nhiều nhà xe, mỗi nhà xe dùng hệ thống khác nhau.
- Chủ hàng không có quyền vào TMS/GPS của nhà xe.
- GPS biết xe ở đâu nhưng không biết shipment đang thiếu chứng từ gì.
- TMS biết lệnh vận chuyển nhưng không biết khách đang hỏi gì trong Zalo/email.
- POD/EIR vẫn gửi qua ảnh chụp riêng lẻ.
- Một shipment có nhiều mã: PO, booking, container, HBL, trucking order, invoice.

### 6.2. Zalo và điện thoại là "control tower" thực tế của nhiều đội trucking

Một workflow rất phổ biến:

```text
CS nhận yêu cầu khách
  -> Gửi thông tin cho điều phối qua Zalo
  -> Điều phối gọi tài xế
  -> Tài xế gửi ảnh container/EIR/POD qua Zalo
  -> Điều phối cập nhật Excel
  -> CS hỏi lại điều phối
  -> CS trả lời khách qua Zalo/email
```

Cách làm này linh hoạt nhưng có nhiều nhược điểm:

- Không có timeline tự động.
- Không có audit rõ theo shipment.
- Dữ liệu nằm trong nhiều nhóm chat.
- Người khác khó thay ca.
- Quản lý không thấy lô nào có rủi ro.
- Khó tìm lại POD/EIR sau vài tuần.

### 6.3. Cảng và terminal đang số hóa, nhưng mỗi nơi một hệ thống

Một số ví dụ:

- Saigon Newport ePort hỗ trợ đăng ký/thủ tục giao nhận container qua mạng và tra cứu thông tin container.
- Cảng Hải Phòng có SmartGate cho giao nhận container.
- HHIT/Hateco Hải Phòng có Truck Appointment System, yêu cầu xe có lịch hẹn xác nhận để vào terminal.

Điều này giúp tăng số hóa ở cấp cảng, nhưng với forwarder/3PL/chủ hàng, vấn đề vẫn là phải gom thông tin từ nhiều cổng khác nhau vào một timeline shipment.

### 6.4. Pain lớn nhất không phải lúc nào cũng là "không có GPS"

Nhiều người nghĩ trucking visibility nghĩa là gắn GPS. Nhưng trong logistics XNK, biết xe đang ở đâu chưa đủ.

Ví dụ:

```text
GPS cho thấy xe đang ở gần cảng.
Nhưng CS vẫn chưa biết:
- Xe đã có appointment chưa?
- Container đã release chưa?
- Tài xế đã lấy được EIR chưa?
- Xe đang chờ do kẹt cổng hay do thiếu lệnh?
- Free time còn bao lâu?
- Nếu trễ thì khách nào bị ảnh hưởng?
```

Vì vậy, Agentify nên nhìn trucking như một bài toán **status + condition + exception**, không chỉ là bản đồ GPS.

---

## 7. Pain ranking sơ bộ của Cụm 5

| Pain | Ai đau nhất | Tần suất | Tác động | Cơ hội cho Agentify |
|---|---|---:|---:|---|
| CS/Ops không biết xe/container đang ở trạng thái nào | CS, Ops, chủ hàng | Cao | Cao | Rất cao |
| Tài xế/nhà xe cập nhật chậm qua Zalo/điện thoại | Điều phối, CS | Cao | Cao | Rất cao |
| POD/EIR thất lạc hoặc nằm rải rác | CS, kế toán, khách hàng | Cao | Cao | Rất cao |
| Xe được điều đi khi container/chứng từ chưa sẵn sàng | Điều phối, nhà xe, forwarder | Trung bình-cao | Cao | Cao |
| Trễ giao/trễ trả rỗng phát sinh phí | Chủ hàng, forwarder, 3PL | Trung bình | Rất cao | Cao |
| Không biết lô nào sắp hết free time | Ops, quản lý | Trung bình | Rất cao | Cao |
| Không có ETA đáng tin cho khách/kho | CS, kho, chủ hàng | Cao | Trung bình-cao | Cao |
| Lịch hẹn cảng/kho không được quản lý tập trung | Điều phối, tài xế | Trung bình | Cao | Cao |
| Nhiều nhà xe, mỗi bên một cách cập nhật | 3PL, forwarder | Cao | Trung bình-cao | Cao |
| Đối soát phí chờ xe/phát sinh khó | Kế toán, Ops | Trung bình | Trung bình-cao | Trung bình-cao |

Nhận định sơ bộ:

- Use case mạnh nhất là **trucking status timeline + exception inbox + POD/EIR capture**.
- GPS integration hữu ích nhưng không nên là điều kiện bắt buộc cho MVP.
- Zalo/email/Excel ingestion và cập nhật thủ công theo mốc trạng thái có thể đủ để pilot.

---

## 8. Phân khúc nên khảo sát

### 8.1. Forwarder có thuê nhiều nhà xe

Đặc điểm:

- Không sở hữu đội xe lớn.
- Thuê nhiều nhà xe theo tuyến/khu vực.
- CS bị khách hỏi trạng thái nhưng không kiểm soát trực tiếp tài xế.

Câu hỏi cần kiểm chứng:

- Mỗi ngày có bao nhiêu lệnh trucking?
- Cập nhật từ nhà xe qua kênh nào?
- Có bắt buộc nhà xe gửi POD/EIR đúng hạn không?
- Có dashboard lô nào trễ/lô nào chưa trả rỗng không?
- Có muốn portal nhẹ để nhà xe cập nhật trạng thái không?

### 8.2. 3PL có vận hành trucking cho khách B2B

Đặc điểm:

- Quản lý nhiều khách và nhiều luồng giao.
- Có thể có TMS/WMS nhưng vẫn cần cập nhật khách.
- Phải phối hợp kho, xe, CS, kế toán.

Câu hỏi cần kiểm chứng:

- TMS hiện tại có trả lời được câu hỏi của khách không?
- POD có tự động gắn với order/shipment không?
- Exception nào gây tốn thời gian nhất?
- Có cần AI summary cho khách không?

### 8.3. Công ty trucking container

Đặc điểm:

- Có đội xe/tài xế.
- Quan tâm hiệu suất xe, thời gian chờ, chi phí nhiên liệu, lịch tài xế.
- Có thể dùng GPS nhưng chưa chắc có workflow CS/khách tốt.

Câu hỏi cần kiểm chứng:

- Đang dùng GPS/TMS/app tài xế nào?
- Tài xế cập nhật trạng thái ra sao?
- Có đo thời gian chờ cảng/kho không?
- Có thể cho khách/forwarder xem trạng thái ở mức nào?
- Có muốn giảm số cuộc gọi hỏi trạng thái không?

### 8.4. Chủ hàng có nhiều container nhập/xuất

Đặc điểm:

- Không trực tiếp điều xe hoặc thuê ngoài.
- Nhưng chịu hậu quả nếu xe trễ, hàng không vào kho đúng lịch, trả rỗng muộn.

Câu hỏi cần kiểm chứng:

- Có nhận tracking trucking từ forwarder/3PL không?
- Có cần biết ETA xe tới kho không?
- Có bị phát sinh phí do trễ trả rỗng/chờ xe không?
- Có muốn dashboard theo PO/container không?

### 8.5. Kho/nhà máy nhận/gửi hàng

Đặc điểm:

- Cần biết xe đến lúc nào để chuẩn bị nhân sự/cửa bốc dỡ.
- Thường có lịch hẹn hoặc slot nội bộ.

Câu hỏi cần kiểm chứng:

- Xe đến sớm/trễ ảnh hưởng thế nào?
- Kho cập nhật "đã nhận hàng" qua đâu?
- POD/biên bản bất thường được gửi cho ai?
- Có muốn nhận ETA và cảnh báo xe trễ không?

---

## 9. Product map: công cụ hiện tại và khoảng trống

| Nhóm công cụ | Ví dụ | Giải quyết tốt | Khoảng trống |
|---|---|---|---|
| TMS | Smartlog, Abivin vRoute, Logitrack, TKELOG TMS | Lệnh vận chuyển, route, fleet, driver, tracking, chi phí | Cần triển khai/nhập liệu; không tự gom Zalo/email/POD từ nhiều nhà xe |
| Freight platform | LOGIVAN, EcoTruck, Viettel Logistics/MyGo | Đặt xe, kết nối chủ hàng-nhà xe, tối ưu vận tải | Tập trung dịch vụ vận tải; không phải layer trung gian cho mọi shipment của forwarder |
| GPS/fleet management | Vietmap, thiết bị GPS khác | Vị trí xe, hành trình, tốc độ, quản lý đội xe | Không hiểu chứng từ, container release, D/O, free time, POD theo shipment |
| ePort/SmartGate/TAS | Saigon Newport ePort, Hai Phong SmartGate, HHIT TAS | Thủ tục/tra cứu/giao nhận container tại cảng | Mỗi cảng một hệ thống; không gom trạng thái khách/PO/trucking |
| Excel/Google Sheet | File điều xe nội bộ | Linh hoạt, rẻ, dễ sửa | Không real-time, dễ sai, khó audit, không tự cảnh báo |
| Zalo/điện thoại | Nhóm tài xế, nhóm khách | Nhanh, quen thuộc | Dữ liệu thất lạc, không có timeline, khó quản lý exception |
| ERP/WMS | SAP/Odoo/Bravo/MISA/WMS nội bộ | PO, kho, kế toán, tồn kho | Không theo dõi chi tiết từng mốc trucking đa bên |

Khoảng trống chính:

> Thiếu một lớp trung gian đủ nhẹ để forwarder/3PL/chủ hàng gom trạng thái trucking từ nhiều nhà xe, nhiều hệ thống và nhiều kênh chat thành một timeline shipment dễ hiểu cho CS/Ops/quản lý/khách hàng.

---

## 10. Đối thủ và sản phẩm liên quan

### 10.1. LOGIVAN

**Vai trò:** Nền tảng vận tải số tại Việt Nam, tập trung kết nối và tối ưu vận tải đường bộ.

Điểm mạnh:

- Định vị rõ là digital freight network tại Việt Nam.
- Có công nghệ FreightOS và tập trung giảm chi phí, tăng service level, OTIF, giảm lead time.
- Phù hợp chủ hàng có nhu cầu vận tải và tối ưu mạng lưới.

Điểm yếu/khoảng trống:

- Là nhà cung cấp/nền tảng vận tải, không phải lớp visibility trung lập gom mọi nhà xe của một forwarder/3PL.
- Nếu doanh nghiệp vẫn dùng nhiều nhà xe khác nhau, cần một lớp tổng hợp trạng thái ngoài từng vendor.
- Không tập trung chính vào việc đọc Zalo/email/POD/EIR và tạo AI summary theo shipment XNK.

Ý nghĩa cho Agentify:

- LOGIVAN là đối thủ nếu Agentify muốn làm freight platform.
- Nhưng nếu Agentify làm trucking visibility copilot cho forwarder/3PL đang dùng nhiều nhà xe, hai hướng có thể khác nhau.

### 10.2. EcoTruck

**Vai trò:** Dịch vụ/nền tảng logistics B2B, có trucking FCL/LCL, bộ-biển-bộ, thủ tục hải quan và hệ sinh thái khách hàng doanh nghiệp.

Điểm mạnh:

- Tập trung B2B logistics.
- Có dịch vụ trucking xuất nhập khẩu.
- Có hệ sinh thái khách hàng doanh nghiệp.

Điểm yếu/khoảng trống:

- Là nhà cung cấp dịch vụ logistics/trucking, không phải công cụ nội bộ trung lập cho mọi forwarder/3PL.
- Khách dùng nhiều vendor vẫn cần visibility tổng hợp.
- Khoảng trống AI nằm ở exception summary, POD/EIR capture và tích hợp dữ liệu rời rạc.

### 10.3. Viettel Logistics / Viettel Post / MyGo

**Vai trò:** Doanh nghiệp logistics lớn, có dịch vụ vận tải, mạng lưới rộng và năng lực công nghệ.

Điểm mạnh:

- Mạng lưới toàn quốc.
- Có năng lực vận tải, kho, chuyển phát, logistics và công nghệ.
- Viettel Logistics công bố có hệ thống hàng nghìn xe/container và điểm giao nhận rộng.

Điểm yếu/khoảng trống:

- Phù hợp vai trò nhà cung cấp dịch vụ lớn hơn là công cụ trung gian cho forwarder nhỏ.
- SME logistics vẫn cần kết nối dữ liệu từ nhiều nhà xe, nhiều cảng, nhiều khách.
- Không giải quyết trực tiếp nhu cầu "CS của forwarder cần trả lời trạng thái mọi shipment dù xe thuộc vendor khác".

### 10.4. Abivin vRoute

**Vai trò:** Nền tảng quản lý logistics/vận tải có tối ưu tuyến và quản lý giao hàng.

Điểm mạnh:

- Tập trung digitalize delivery process, tối ưu route, quản lý vận hành.
- Phù hợp doanh nghiệp phân phối, FMCG, đội xe giao hàng.
- Có câu chuyện tối ưu dịch vụ và service level.

Điểm yếu/khoảng trống:

- Use case mạnh có thể nghiêng về delivery/route optimization hơn là container import-export đa bên.
- Nếu doanh nghiệp không muốn triển khai TMS đầy đủ, nhu cầu lớp copilot nhẹ vẫn còn.
- Không mặc định xử lý mối liên hệ giữa container, hải quan, cảng, D/O, free time và POD/EIR.

### 10.5. Smartlog

**Vai trò:** Hệ sinh thái giải pháp logistics Việt Nam, gồm TMS/WMS và transport exchange platform.

Điểm mạnh:

- Có kinh nghiệm triển khai cho doanh nghiệp lớn.
- Có TMS/WMS, route planning, track and trace, tendering, vehicle/driver management, BI.
- Hiểu thị trường Việt Nam và Đông Nam Á.

Điểm yếu/khoảng trống:

- Với SME/forwarder nhỏ, triển khai TMS đầy đủ có thể nặng hơn nhu cầu ban đầu.
- Dữ liệu ngoài hệ thống như Zalo, email, ảnh POD, EIR vẫn cần discipline nhập liệu.
- Agentify cần khác biệt bằng AI-native layer, không cạnh tranh trực diện bằng TMS đầy đủ.

### 10.6. Logitrack

**Vai trò:** Nền tảng OMS/TMS/WMS tích hợp, có quản lý đơn, kho, vận tải và tracking.

Điểm mạnh:

- Gộp OMS, TMS, WMS.
- Có quản lý trạng thái đơn và tracking real-time.
- Định vị phù hợp cả SME.

Điểm yếu/khoảng trống:

- Vẫn là một hệ thống quản trị cần người dùng đưa đơn/lệnh vào.
- Không tự động gom thông tin từ nhiều nhà xe/hệ thống cảng/Zalo/email nếu không tích hợp.
- Không nhất thiết chuyên sâu vào workflow container XNK.

### 10.7. Vietmap và các giải pháp GPS/fleet management

**Vai trò:** Bản đồ, thiết bị GPS, camera hành trình, theo dõi và quản lý xe.

Điểm mạnh:

- Giải quyết tốt vị trí xe và quản lý đội xe.
- Có dữ liệu bản đồ/địa lý nội địa.
- Phù hợp doanh nghiệp sở hữu đội xe.

Điểm yếu/khoảng trống:

- GPS không biết bộ chứng từ đã đủ chưa.
- GPS không biết D/O, tờ khai, C/O, free time, depot trả rỗng.
- GPS không tự tạo POD/EIR summary theo shipment cho CS/khách.

Ý nghĩa cho Agentify:

- GPS là nguồn dữ liệu, không phải đối thủ trực diện nếu Agentify làm visibility copilot.
- MVP có thể bắt đầu không cần GPS, sau đó tích hợp GPS để tăng độ tự động.

---

## 11. Cơ hội sản phẩm cho Agentify trong Cụm 5

### 11.1. Trucking timeline theo shipment/container

Agentify tạo timeline chuẩn cho từng container hoặc lệnh trucking:

```text
Booked
  -> Driver assigned
  -> Documents ready
  -> Appointment booked
  -> Arrived at port/depot
  -> Container picked up
  -> Departed port/depot
  -> Arrived at warehouse
  -> Unloading/loading
  -> Delivered
  -> Empty returned
  -> POD/EIR completed
```

Giá trị:

- CS/Ops không phải hỏi nhiều người.
- Quản lý nhìn được lô nào đang kẹt.
- Khách hàng nhận được update rõ ràng hơn.

### 11.2. Pre-dispatch readiness check

Trước khi điều xe, Agentify kiểm tra các điều kiện tối thiểu:

- Có container number chưa.
- Có D/O/eDO/PIN chưa.
- Tờ khai đã đủ điều kiện chưa.
- Phí cần thiết đã thanh toán chưa.
- Có appointment cảng/kho chưa.
- Biết free time/last free day chưa.
- Biết depot trả rỗng chưa.
- Có địa chỉ kho và contact nhận hàng chưa.

Nếu thiếu, Agentify cảnh báo:

```text
Không nên điều xe ngay: thiếu D/O và chưa có lịch kho.
Rủi ro: xe vào cảng không lấy được container hoặc đến kho phải chờ.
```

### 11.3. Exception inbox cho trucking

Thay vì dashboard quá nhiều trạng thái, Agentify nên có một inbox vấn đề:

- Xe trễ ETA hơn 30 phút.
- Xe chưa cập nhật sau X giờ.
- Container chưa pickup dù đã quá giờ dự kiến.
- Sắp hết free time.
- Chưa trả rỗng.
- Thiếu POD/EIR sau khi giao xong.
- Tài xế báo bất thường.
- Kho từ chối nhận hàng.

Mỗi exception cần có:

- Shipment/container liên quan.
- Mức độ nghiêm trọng.
- Ai đang phụ trách.
- Hành động đề xuất.
- Draft message cho khách/nhà xe/tài xế.

### 11.4. POD/EIR capture và lưu theo shipment

Agentify có thể cho tài xế/điều phối upload:

- Ảnh POD.
- Ảnh EIR.
- Ảnh seal/container.
- Biên bản bất thường.
- Ghi chú giao hàng.

Sau đó tự gắn vào shipment/container đúng.

MVP không cần app tài xế phức tạp ngay. Có thể bắt đầu bằng:

- Link upload đơn giản.
- Form mobile nhẹ.
- Upload từ CS/Ops.
- Import ảnh từ nhóm/email nếu tích hợp sau.

### 11.5. AI status summary và draft trả lời khách

Agentify tạo summary:

```text
Container MSKU1234567:
- Xe đã vào cảng Cát Lái lúc 09:20.
- Container chưa gate-out do đang chờ hoàn tất phí nâng hạ.
- Free time đến 17/08.
- ETA dự kiến tới kho VSIP: 14:30 nếu rời cảng trước 11:00.
- Rủi ro: giao trễ slot kho 13:00.
```

Draft trả lời khách:

```text
Anh/chị cập nhật giúp em: xe đã vào cảng lúc 09:20 và đang chờ hoàn tất thủ tục phí nâng hạ.
Dự kiến nếu xe rời cảng trước 11:00 thì ETA tới kho VSIP khoảng 14:30.
Em đang theo sát vì có rủi ro trễ slot kho 13:00.
```

### 11.6. Free time và empty return tracker

Agentify cần theo dõi:

- Last free day ở cảng.
- Hạn trả rỗng.
- Depot trả rỗng.
- Trạng thái đã trả rỗng/chưa.
- EIR trả rỗng đã có chưa.

Giá trị:

- Giảm phí detention/demurrage.
- Giúp quản lý ưu tiên lô có rủi ro cao.
- Giúp CS trả lời khách đúng hơn.

### 11.7. Kết nối dữ liệu từng bước

Không nên yêu cầu tích hợp sâu ngay. Lộ trình phù hợp:

```text
Giai đoạn 1: Excel + cập nhật thủ công + upload POD/EIR
Giai đoạn 2: Email/Zalo-like workflow + form tài xế
Giai đoạn 3: Tích hợp TMS/GPS/ePort nếu khách có
Giai đoạn 4: ETA tự động và exception prediction
```

---

## 12. MVP đề xuất cho Cụm 5

### 12.1. Tên MVP

**Agentify Trucking Visibility Copilot**

Tên tiếng Việt dễ hiểu:

> Trợ lý theo dõi xe/container nội địa

### 12.2. Khách hàng mục tiêu ban đầu

Ưu tiên:

1. Forwarder/3PL vừa và nhỏ có 50-500 lệnh trucking/tháng.
2. Chủ hàng XNK có nhiều container nhập/xuất và thường hỏi trạng thái xe.
3. Công ty trucking container muốn giảm cuộc gọi hỏi trạng thái và gom POD/EIR.

Nhóm dễ pilot nhất:

> Forwarder/3PL thuê nhiều nhà xe, vì họ đau nhất ở việc gom trạng thái từ nhiều bên và trả lời khách.

### 12.3. Phạm vi nghiệp vụ ban đầu

Nên bắt đầu với:

- Hàng nhập đường biển FCL.
- Container từ cảng/ICD về kho/nhà máy.
- Trả rỗng về depot.
- 5-10 trạng thái trucking chuẩn.
- POD/EIR upload.
- Free time/empty return reminder nhập thủ công hoặc import từ Excel.

Chưa nên bắt đầu với:

- Tối ưu route phức tạp.
- Quản lý nhiên liệu/bảo trì xe.
- Tính lương tài xế.
- Marketplace đặt xe.
- Auto-dispatch.
- Tích hợp mọi GPS/TMS ngay từ đầu.

### 12.4. Tính năng MVP

| Tính năng | Mô tả | Lý do ưu tiên |
|---|---|---|
| Import lệnh trucking từ Excel | PO/container/customer/pickup/delivery/deadline | Phù hợp workflow hiện tại |
| Timeline trạng thái | Chuẩn hóa mốc trucking | Dễ hiểu cho CS/Ops |
| Form cập nhật nhanh | Điều phối/tài xế cập nhật status bằng link | Không cần app phức tạp |
| POD/EIR upload | Upload ảnh/file và gắn theo shipment | Pain rõ, ROI cao |
| Exception inbox | Lô trễ, chưa cập nhật, thiếu POD, sắp hết free time | Giúp quản lý ưu tiên |
| AI status summary | Tóm tắt tình trạng xe/container | Giảm thời gian trả lời khách |
| Draft message | Soạn nháp Zalo/email cho khách/nhà xe | Giảm thao tác lặp |
| Empty return tracker | Theo dõi hạn trả rỗng và EIR trả rỗng | Giảm detention |
| Audit trail cơ bản | Ai cập nhật, lúc nào, bằng chứng gì | Hữu ích khi tranh chấp |

### 12.5. Bộ trạng thái trucking chuẩn cho MVP

#### Hàng nhập FCL

```text
1. Trucking order created
2. Driver assigned
3. Ready for pickup
4. Arrived at port/ICD
5. Container picked up
6. Departed port/ICD
7. Arrived at warehouse
8. Unloading
9. Delivered
10. Empty returned
11. POD/EIR completed
```

#### Hàng xuất FCL

```text
1. Trucking order created
2. Driver assigned
3. Empty container picked up
4. Arrived at shipper warehouse
5. Loading
6. Loaded and sealed
7. Departed warehouse
8. Arrived at port
9. Container gated in
10. EIR completed
```

### 12.6. Luồng dùng MVP

```text
1. CS/Ops import danh sách container từ Excel.
2. Agentify tạo trucking timeline cho từng container.
3. Điều phối gán nhà xe/tài xế.
4. Tài xế hoặc điều phối cập nhật trạng thái bằng form/link.
5. Agentify nhắc nếu quá X giờ chưa cập nhật.
6. Khi giao xong, POD/EIR được upload vào shipment.
7. Agentify cảnh báo lô chưa trả rỗng hoặc sắp hết free time.
8. CS dùng AI summary để trả lời khách.
9. Quản lý xem exception inbox để xử lý lô có rủi ro.
```

---

## 13. Ví dụ hoạt động cụ thể của Agentify

### Ví dụ 1: Xe đã đến cảng nhưng chưa lấy được container

Bối cảnh:

- Khách hỏi forwarder: "Xe đã lấy container chưa?"
- CS chỉ biết xe đã được điều từ sáng.
- Điều phối nói tài xế đang ở cảng nhưng chưa rõ lý do chậm.

Agentify tổng hợp:

```text
Container: MSKU1234567
Xe: 51C-xxx
Tài xế: Anh A
Trạng thái:
- 08:10: tài xế nhận lệnh
- 09:05: xe đến cổng cảng
- 09:20: cập nhật "đang chờ lấy container"
- 10:15: chưa có gate-out

Điều kiện còn thiếu:
- D/O đã có
- Tờ khai đã thông quan
- Phí nâng hạ chưa xác nhận thanh toán

Rủi ro:
- ETA tới kho có thể trễ 1-2 giờ
```

Agentify soạn nháp trả lời khách:

```text
Anh/chị cập nhật giúp em: xe đã vào cảng từ 09:05 nhưng container chưa gate-out.
Hiện đang chờ xác nhận phí nâng hạ, các điều kiện D/O và tờ khai đã đủ.
Em đang xử lý với bộ phận liên quan và sẽ cập nhật ETA mới ngay khi xe rời cảng.
```

Người ngoài ngành có thể hiểu đơn giản:

> Xe đến cảng không có nghĩa là đã lấy được hàng. Agentify chỉ ra còn thiếu điều kiện gì, để CS không phải trả lời mơ hồ.

### Ví dụ 2: Giao hàng xong nhưng thiếu POD

Bối cảnh:

- Xe giao container về kho khách lúc 15:30.
- Khách yêu cầu POD để xác nhận giao hàng và làm đối soát.
- Tài xế gửi ảnh POD vào Zalo riêng của điều phối, CS không thấy.

Agentify cảnh báo:

```text
Shipment: HBL-VN8891
Trạng thái: Delivered lúc 15:30
POD: chưa upload
EIR trả rỗng: chưa có
Hành động đề xuất: nhắc điều phối/tài xế upload POD trong hôm nay
```

Agentify gửi nhắc nội bộ:

```text
Lô HBL-VN8891 đã giao xong nhưng chưa có POD.
Vui lòng upload ảnh POD để CS gửi khách và kế toán đối soát.
```

Người ngoài ngành có thể hiểu đơn giản:

> Giao hàng xong nhưng không có bằng chứng thì vẫn chưa "xong" về mặt dịch vụ. Agentify giúp không thất lạc bằng chứng giao hàng.

### Ví dụ 3: Sắp trễ hạn trả container rỗng

Bối cảnh:

- Container nhập đã giao về kho.
- Kho dỡ hàng chậm.
- Hạn trả rỗng là ngày 12/09.
- Đến chiều 12/09, container vẫn chưa trả depot.

Agentify cảnh báo:

```text
Critical: Container CMAU7654321 sắp quá hạn trả rỗng.
Last free day: 12/09
Hiện trạng: Delivered, chưa Empty returned
Rủi ro: phát sinh detention từ 13/09
Khuyến nghị: ưu tiên dỡ hàng và điều xe trả depot trước 17:00.
```

Agentify soạn nháp gửi khách:

```text
Anh/chị lưu ý container CMAU7654321 có hạn trả rỗng hôm nay 12/09.
Hiện container chưa trả depot, nếu sang ngày mai có rủi ro phát sinh detention.
Nhờ kho ưu tiên dỡ hàng để bên em điều xe trả rỗng trong hôm nay.
```

Người ngoài ngành có thể hiểu đơn giản:

> Container giống như tài sản thuê của hãng tàu. Nếu giữ quá hạn, doanh nghiệp có thể bị tính phí. Agentify nhắc trước khi phí phát sinh.

---

## 14. Câu hỏi phỏng vấn cho Cụm 5

### 14.1. Câu hỏi cho trucking coordinator/điều phối

1. Một ngày anh/chị xử lý bao nhiêu lệnh trucking?
2. Lệnh trucking đến từ đâu: email, Zalo, TMS, Excel hay điện thoại?
3. Anh/chị gán xe/tài xế bằng công cụ nào?
4. Tài xế cập nhật trạng thái qua đâu?
5. Trạng thái nào bắt buộc phải cập nhật?
6. Bao lâu tài xế không cập nhật thì anh/chị phải gọi?
7. Khi xe trễ, nguyên nhân thường là gì?
8. Có checklist trước khi điều xe không?
9. Có biết container nào sắp hết free time/trả rỗng không?
10. POD/EIR được lưu ở đâu?
11. Có bao giờ POD/EIR thất lạc không?
12. Mất bao lâu để trả lời câu hỏi "xe đang ở đâu"?
13. Nếu có form cập nhật nhanh cho tài xế, tài xế có dùng không?
14. Phần nào trong điều phối không thể tự động hóa?

### 14.2. Câu hỏi cho CS/Ops forwarder/3PL

1. Khách hỏi trạng thái xe bao nhiêu lần/ngày?
2. Khi khách hỏi, anh/chị phải check những nguồn nào?
3. Có phải gọi điều phối/tài xế thường xuyên không?
4. Có bao giờ trả lời sai trạng thái vì dữ liệu cập nhật chậm không?
5. Khách cần thông tin gì nhất: ETA, đã lấy container, đã giao, POD, trả rỗng?
6. Có muốn AI summary cho từng container không?
7. Draft trả lời khách có hữu ích không?
8. Ai duyệt nội dung trước khi gửi khách?

### 14.3. Câu hỏi cho tài xế/đội trưởng tài xế

1. Tài xế nhận lệnh qua đâu?
2. Tài xế có sẵn sàng cập nhật trạng thái bằng link/app không?
3. Mỗi chuyến phải gửi những ảnh/chứng từ nào?
4. Việc cập nhật trạng thái có làm mất thời gian không?
5. Lý do nào khiến tài xế không cập nhật?
6. Tài xế cần thông tin gì rõ hơn trước khi đi cảng/kho?

### 14.4. Câu hỏi cho chủ hàng/kho

1. Anh/chị có biết ETA xe đến kho không?
2. Xe đến sớm/trễ ảnh hưởng thế nào đến vận hành kho?
3. Có slot bốc/dỡ không?
4. Ai xác nhận giao hàng xong?
5. POD được gửi trong bao lâu sau khi giao?
6. Có từng phát sinh phí do trả rỗng muộn không?
7. Anh/chị có muốn dashboard theo PO/container không?

### 14.5. Câu hỏi cho quản lý/giám đốc

1. Công ty có đo thời gian trả lời khách về trạng thái xe không?
2. Có đo số lần xe trễ, phí chờ xe, detention/demurrage không?
3. Có biết chi phí do cập nhật chậm hoặc POD thất lạc không?
4. Nếu triển khai Agentify, KPI pilot nên là gì?
5. Dữ liệu GPS/TMS có thể tích hợp không?
6. Nhà xe/tài xế có chấp nhận cập nhật qua hệ thống bên thứ ba không?

---

## 15. Survey định lượng đề xuất cho Cụm 5

### 15.1. Thông tin phân loại người trả lời

1. Vai trò của anh/chị là gì?
   - Trucking coordinator.
   - CS/Account.
   - Ops.
   - Tài xế/đội trưởng tài xế.
   - Logistics manager.
   - Chủ hàng/kho.
   - Kế toán đối soát.

2. Công ty thuộc nhóm nào?
   - Forwarder.
   - 3PL.
   - Công ty trucking.
   - Chủ hàng XNK.
   - Kho/nhà máy.
   - Đại lý hải quan.

3. Mỗi tháng xử lý bao nhiêu lệnh trucking/container?
   - Dưới 50.
   - 50-100.
   - 101-300.
   - 301-1.000.
   - Trên 1.000.

### 15.2. Câu hỏi đo pain

1. Công ty đang cập nhật trạng thái xe bằng công cụ nào?
   - TMS.
   - GPS.
   - App tài xế.
   - Excel/Google Sheet.
   - Zalo.
   - Điện thoại.
   - Email.

2. Khi khách hỏi "xe/container đang ở đâu", mất bao lâu để trả lời?
   - Dưới 3 phút.
   - 3-10 phút.
   - 10-30 phút.
   - Trên 30 phút.
   - Phải hỏi nhiều người, không đo được.

3. Tần suất xe/tài xế cập nhật chậm?
   - Hiếm.
   - 1-2 lần/tuần.
   - Hàng ngày.
   - Nhiều lần/ngày.

4. Tần suất thiếu POD/EIR sau khi giao xong?
   - Hiếm.
   - 1-2 lần/tháng.
   - Hàng tuần.
   - Hàng ngày.

5. Công ty có từng phát sinh phí do trễ lấy hàng/trễ trả rỗng/trễ giao không?
   - Chưa từng.
   - Có nhưng ít.
   - Có hàng tháng.
   - Có thường xuyên.

### 15.3. Câu hỏi đo nhu cầu sản phẩm

1. Tính năng nào hữu ích nhất?
   - Timeline trạng thái xe/container.
   - Form cập nhật nhanh cho tài xế/điều phối.
   - Cảnh báo trễ/không cập nhật.
   - Nhắc hạn free time/trả rỗng.
   - Upload POD/EIR theo shipment.
   - AI summary trả lời khách.
   - Draft email/Zalo cho khách/nhà xe.
   - Dashboard exception cho quản lý.

2. Nếu chưa tích hợp GPS/TMS, anh/chị có chấp nhận cập nhật thủ công theo mốc trạng thái không?
   - Có.
   - Có nếu thao tác dưới 30 giây.
   - Chưa chắc.
   - Không.

3. Ai sẽ là người dùng chính?
   - CS.
   - Ops.
   - Điều phối.
   - Tài xế.
   - Quản lý.
   - Khách hàng.

4. Mức phí pilot hợp lý?
   - Dưới 2 triệu VND/tháng.
   - 2-5 triệu VND/tháng.
   - 5-15 triệu VND/tháng.
   - Trên 15 triệu VND/tháng nếu giảm phí phát sinh và giảm cuộc gọi.

---

## 16. Giả thuyết cần kiểm chứng sau Cụm 5

1. **CS/Ops là nhóm đau nhất về trucking visibility.** Họ không điều xe trực tiếp nhưng phải trả lời khách liên tục.
2. **POD/EIR capture là use case ROI rõ.** Thiếu bằng chứng giao hàng gây chậm đối soát và mất thời gian tìm kiếm.
3. **GPS không đủ để giải quyết pain.** Người dùng cần biết điều kiện, trạng thái nghiệp vụ, deadline và exception, không chỉ vị trí xe.
4. **Forwarder/3PL thuê nhiều nhà xe là ICP tốt.** Họ cần gom trạng thái từ nhiều nguồn hơn công ty trucking chỉ dùng một TMS.
5. **MVP có thể bắt đầu bằng Excel + form cập nhật + upload ảnh.** Không cần tích hợp sâu ngay.
6. **Empty return tracker có giá trị cao nếu khách thường phát sinh detention.** Cần đo tần suất và giá trị phí phát sinh.
7. **Tài xế sẽ chỉ cập nhật nếu thao tác cực nhanh.** Form/link phải đơn giản, mobile-first, không bắt nhập nhiều.

---

## 17. Tính khả thi cho Agentify

### 17.1. Khả thi về kỹ thuật

MVP khả thi nếu giới hạn rõ:

- Không làm TMS đầy đủ.
- Không tối ưu route phức tạp.
- Không cần GPS ngay từ đầu.
- Bắt đầu bằng import Excel, cập nhật trạng thái thủ công, link mobile và upload ảnh.

Kiến trúc dữ liệu gợi ý:

```text
Trucking order
  -> Shipment/container mapping
  -> Status timeline
  -> Deadline/free time tracker
  -> POD/EIR files
  -> Exception rules
  -> AI summary/draft reply
```

Nên dùng rule-based cho:

- Quá X giờ chưa cập nhật.
- ETA trễ hơn slot kho.
- Sắp hết free time.
- Chưa có POD sau trạng thái delivered.
- Chưa empty returned sau ngày hẹn.

Nên dùng AI cho:

- Tóm tắt trạng thái dễ hiểu.
- Soạn nháp tin nhắn.
- Phân loại ghi chú bất thường từ tài xế/điều phối.
- Đọc ảnh/PDF POD/EIR ở giai đoạn sau.

### 17.2. Khả thi về go-to-market

Thông điệp bán nên rất cụ thể:

> "Giảm thời gian hỏi trạng thái xe, giảm thất lạc POD/EIR và cảnh báo lô trucking có nguy cơ trễ/phát sinh phí."

Không nên bán là "AI logistics platform" ngay từ đầu. Với trucking, người mua sẽ hiểu hơn nếu demo được:

- Một timeline container.
- Một exception inbox.
- Một POD upload.
- Một draft trả lời khách.
- Một cảnh báo sắp hết hạn trả rỗng.

### 17.3. Chỉ số pilot nên đo

| Chỉ số | Cách đo |
|---|---|
| Thời gian trả lời câu hỏi trạng thái xe | Trước/sau |
| Số cuộc gọi nội bộ hỏi tài xế/điều phối | Trước/sau |
| Tỷ lệ lệnh trucking có cập nhật đầy đủ | Theo shipment |
| Tỷ lệ POD/EIR được upload trong ngày | Theo shipment |
| Số exception phát hiện sớm | Theo tuần |
| Số lần trễ trả rỗng/sắp trễ trả rỗng | Theo container |
| Số phí phát sinh tránh được | Nếu khách có dữ liệu |
| Tỷ lệ tài xế/điều phối dùng form cập nhật | Product analytics |

### 17.4. Rủi ro triển khai

| Rủi ro | Mức độ | Cách giảm |
|---|---:|---|
| Tài xế không chịu cập nhật | Cao | Form cực ngắn, link mobile, cập nhật bằng 1-2 thao tác |
| Dữ liệu trạng thái không đáng tin | Cao | Hiển thị người cập nhật, thời gian, bằng chứng ảnh |
| Khách đã có TMS/GPS | Trung bình | Định vị Agentify là AI visibility layer, không thay TMS/GPS |
| Cảnh báo quá nhiều | Trung bình | Chỉ cảnh báo exception có tác động SLA/chi phí |
| Không lấy được dữ liệu cảng/GPS | Trung bình | MVP dùng thủ công/Excel trước, tích hợp sau |
| Nhà xe không muốn chia sẻ dữ liệu | Trung bình | Chỉ yêu cầu trạng thái tối thiểu theo lệnh, không mở toàn bộ đội xe |
| POD/EIR ảnh chất lượng kém | Trung bình | Cho phép upload nhiều ảnh, human review, OCR sau |

---

## 18. Kết luận sơ bộ Cụm 5

Cụm trucking nội địa là cơ hội tốt cho Agentify vì pain rất gần với vận hành hàng ngày:

1. **Khách hỏi trạng thái liên tục.** CS/Ops phải mất thời gian gọi điều phối/tài xế.
2. **Dữ liệu rời rạc.** TMS, GPS, Zalo, Excel, ePort, POD/EIR không nằm trong một timeline shipment.
3. **Tác động tài chính rõ.** Trễ giao, trễ trả rỗng, chờ xe, thiếu POD/EIR đều có thể gây chi phí.
4. **MVP có thể làm nhẹ.** Không cần thay TMS hay marketplace; bắt đầu bằng timeline, form cập nhật, exception inbox, POD/EIR capture và AI summary.

Đề xuất hướng đi:

> Agentify nên phát triển module "Trucking Visibility Copilot" cho forwarder/3PL/chủ hàng có nhiều lệnh trucking và nhiều nhà xe. Sản phẩm không cạnh tranh trực diện với LOGIVAN, EcoTruck, Abivin, Smartlog hay GPS; thay vào đó làm lớp trung gian gom trạng thái và ngoại lệ từ nhiều nguồn để CS/Ops trả lời khách nhanh hơn và quản lý giảm rủi ro.

Use case nên test đầu tiên:

```text
Import danh sách container nhập từ Excel
-> Tạo trucking timeline
-> Điều phối/tài xế cập nhật status qua link
-> Upload POD/EIR
-> Cảnh báo chưa cập nhật, sắp hết free time, chưa trả rỗng
-> AI soạn summary trả lời khách
```

Nếu use case này được xác nhận, Agentify có thể mở rộng sang:

- Tích hợp GPS/TMS.
- ETA tự động.
- Cảnh báo slot kho/cảng.
- Đối soát phí trucking.
- Portal khách hàng theo PO/container.
- Kết nối với Cụm 7 kế toán/đối soát.

---

## 19. Nguồn tham khảo

1. National Statistics Office of Vietnam, "Socio-economic situation in the fourth quarter and 2025".
   https://www.nso.gov.vn/en/data-and-statistics/2026/01/socio-economic-situation-in-the-fourth-quarter-and-2025/

2. Vietnam Logistics Portal, "Vietnam: Gov't approves logistics services development strategy towards 2025".
   https://logistics.gov.vn/policy/vietnam/vietnam-gov-t-approves-logistics-services-development-strategy-towards-2025

3. LuatVietnam, Decision 2229/QD-TTg 2025 on Vietnam logistics services development strategy 2025-2035.
   https://english.luatvietnam.vn/decision-no-2229-qd-ttg-dated-october-09-2025-of-the-prime-minister-approving-the-strategy-for-development-of-vietnams-services-in-the-20-414309-doc1.html

4. LOGIVAN.
   https://logivan.com/

5. Abivin vRoute.
   https://www.abivin.com/

6. Smartlog Vietnam LinkedIn profile.
   https://vn.linkedin.com/company/smartlog-vietnam

7. EcoTruck.
   https://ecotruck.vn/vi/home

8. Viettel Logistics, Trucking services.
   https://viettellogistics.com.vn/en/service/transportation/trucking

9. Logitrack.
   https://logitrack.vn/en

10. VIETMAP.
    https://vietmap.vn/

11. Saigon Newport ePort FAQ.
    https://saigonnewport.com.vn/en/faqs

12. Saigon Newport ePort container delivery/receipt guide PDF.
    https://eport.saigonnewport.com.vn/Images/ePort_Huong_dan_dang_ky_giao_nhan_container_v12024.pdf

13. HHIT/Hateco Truck Appointment Application System.
    https://hhit.com.vn/en/hateco-hai-phong-international-container-terminal-officially-released-truck-appointment-application-system-tas-.html

14. Maersk customer advisory on HHIT Automated Gate and TAS.
    https://www.logspath.com/2025/06/18/maersk-customer-advisory-official-launch-of-automated-gate-tas-systemat-hateco-terminal/

15. Maersk, Demurrage and Detention FAQ.
    https://www.maersk.com/support/faqs/demurrage-and-detention

---

## 20. Tóm tắt compact sau Cụm 5

Đã hoàn thành research Cụm 5 về trucking nội địa.

Insight chính:

- Trucking là đoạn nối giữa cảng/ICD/depot và kho/nhà máy, ảnh hưởng trực tiếp đến câu hỏi khách hay hỏi nhất: xe/container đang ở đâu, bao giờ giao, POD đâu, đã trả rỗng chưa.
- Pain lớn nhất không chỉ là thiếu GPS, mà là thiếu timeline trạng thái theo shipment/container, thiếu cập nhật từ tài xế/nhà xe, POD/EIR thất lạc, và không biết lô nào có nguy cơ trễ/phát sinh phí.
- TMS, GPS, freight platform và ePort/SmartGate/TAS đã tồn tại nhưng phục vụ từng lớp riêng. Forwarder/3PL/chủ hàng vẫn cần lớp trung gian gom dữ liệu từ nhiều nhà xe, nhiều cổng cảng, Excel, Zalo, email và POD/EIR.
- Đối thủ/sản phẩm liên quan: LOGIVAN, EcoTruck, Viettel Logistics/MyGo, Abivin vRoute, Smartlog, Logitrack, Vietmap, ePort/SmartGate/TAS.
- Agentify không nên làm TMS/marketplace/GPS mới ở MVP. Nên làm "Trucking Visibility Copilot": timeline trạng thái, pre-dispatch readiness check, exception inbox, POD/EIR capture, free time/empty return tracker, AI summary và draft trả lời khách.
- MVP nên bắt đầu với hàng nhập đường biển FCL: container từ cảng/ICD về kho/nhà máy rồi trả rỗng.
- Nguồn dữ liệu ban đầu có thể là Excel + cập nhật thủ công + form mobile + upload ảnh; tích hợp TMS/GPS/ePort để sau.
- ICP khả thi: forwarder/3PL thuê nhiều nhà xe, xử lý 50-500 lệnh trucking/tháng, CS/Ops phải trả lời khách thường xuyên.
- Chỉ số pilot: thời gian trả lời trạng thái xe, số cuộc gọi hỏi tài xế/điều phối, tỷ lệ POD/EIR upload trong ngày, số exception phát hiện sớm, số lần sắp/trễ trả rỗng được cảnh báo.

Khuyến nghị nếu tiếp tục Cụm 6:

- Chuyển sang kho/WMS/3PL warehouse.
- Tập trung inbound/outbound, lịch xe vào kho, nhập kho/xuất kho, tồn kho, putaway/picking, discrepancy hàng thiếu/sai/hư hỏng, POD/GRN và cập nhật trạng thái cho chủ hàng/forwarder.
