# Cụm 3: Forwarder, booking quốc tế, hãng tàu và hãng bay

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để hiểu lớp vận hành nằm giữa chủ hàng và các nhà vận chuyển quốc tế: **forwarder**, **NVOCC**, **hãng tàu**, **hãng bay**, co-loader, đại lý nước ngoài và các nền tảng booking/tracking quốc tế.

Nếu Cụm 2 trả lời câu hỏi "vì sao lô hàng tồn tại và chủ hàng cần gì", thì Cụm 3 trả lời câu hỏi:

> Ai thực sự đặt chỗ vận chuyển quốc tế, theo dõi lịch tàu/lịch bay, xử lý cut-off, cập nhật delay, làm việc với carrier và trả lời khách khi lịch thay đổi?

Các câu hỏi chính cần trả lời:

1. Forwarder vừa và nhỏ tại Việt Nam đang quản lý booking quốc tế bằng hệ thống nào?
2. Một booking đường biển/đường hàng không đi qua những bước nào?
3. Dữ liệu booking nằm ở đâu: email, website hãng tàu, portal booking, Excel, phần mềm forwarder, Zalo hay hệ thống khách hàng?
4. Pain lớn nhất của forwarder là báo giá, booking, cập nhật lịch, cut-off, chứng từ, tracking hay trả lời khách?
5. Hãng tàu/hãng bay và nền tảng quốc tế đã giải quyết được phần nào, còn khoảng trống nào ở Việt Nam?
6. Agentify nên bán cho forwarder như một "trợ lý CS/Ops", hay bán cho chủ hàng như một lớp visibility gom dữ liệu từ forwarder?
7. Use case nào đủ hẹp để làm MVP nhưng đủ đau để có giá trị thương mại?

Kết luận cần kiểm chứng:

> Forwarder không thiếu hoàn toàn phần mềm nghiệp vụ, nhưng nhiều doanh nghiệp vừa và nhỏ vẫn bị kẹt ở lớp điều phối rời rạc giữa email, Excel, website hãng tàu, Zalo, file chứng từ và yêu cầu cập nhật của khách. Cơ hội của Agentify không phải là thay thế CargoWise, Magaya, Winta hay portal hãng tàu, mà là tạo một lớp điều phối và trả lời trạng thái shipment nhanh hơn, dễ dùng hơn, phù hợp với thói quen làm việc tại Việt Nam.

---

## 2. Vì sao cụm forwarder và booking quốc tế quan trọng?

### 2.1. Forwarder là điểm gom thông tin tự nhiên của lô hàng

Trong logistics B2B/XNK, forwarder thường là bên phải nói chuyện với nhiều phía cùng lúc:

- Chủ hàng hoặc bộ phận logistics nội bộ của chủ hàng.
- Hãng tàu, hãng bay, co-loader hoặc NVOCC.
- Đại lý nước ngoài.
- Bộ phận chứng từ.
- Bộ phận khai hải quan.
- Trucking nội địa.
- Kho, cảng, depot, ICD.
- Kế toán nội bộ và kế toán khách hàng.

Vì vậy, forwarder thường là nơi gom rất nhiều thông tin: lịch tàu, booking confirmation, cut-off, container number, seal number, SI, VGM, B/L, arrival notice, D/O, local charge, trạng thái delay, thông tin phát sinh và câu hỏi của khách.

Vấn đề là thông tin này hiếm khi nằm trong một nơi sạch sẽ. Một lô hàng có thể có:

```text
Email báo giá
  -> Email booking với hãng tàu/co-loader
  -> Booking confirmation PDF
  -> Excel theo dõi shipment nội bộ
  -> Zalo nhóm với khách
  -> Website hãng tàu để track container
  -> Email SI/VGM/document deadline
  -> File B/L draft
  -> Arrival notice
  -> Phiếu thu local charge
  -> Tin nhắn báo delay
```

Đây là lý do forwarder là một cụm nghiên cứu rất quan trọng cho Agentify: họ vừa có pain vận hành thật, vừa có nhiều dữ liệu lô hàng, vừa có nhu cầu trả lời khách liên tục.

### 2.2. Thị trường XNK Việt Nam tạo áp lực lớn cho forwarder

Theo National Statistics Office of Vietnam, tổng kim ngạch xuất nhập khẩu hàng hóa của Việt Nam năm 2025 đạt **930,05 tỷ USD**, tăng **18,2%** so với năm trước. Quy mô này cho thấy lượng giao dịch thương mại quốc tế rất lớn, kéo theo nhu cầu vận tải biển, vận tải hàng không, forwarder, chứng từ, hải quan, trucking và kho bãi.

Bộ Công Thương cũng nhấn mạnh logistics Việt Nam cần chuyển đổi số, tăng hiệu quả vận hành và kết nối tốt hơn với sản xuất, xuất nhập khẩu. Điều này tạo cơ hội cho các sản phẩm không nhất thiết thay thế toàn bộ phần mềm logistics, mà giải quyết điểm nghẽn dữ liệu và phối hợp giữa các bên.

Ý nghĩa cho Agentify:

- Nhu cầu visibility không chỉ đến từ chủ hàng lớn, mà còn từ forwarder vừa và nhỏ phải phục vụ nhiều khách.
- Forwarder có thể là kênh đi thị trường tốt hơn chủ hàng, vì một forwarder phục vụ nhiều chủ hàng.
- Nếu Agentify giúp forwarder trả lời khách nhanh hơn, giảm miss cut-off, giảm lỗi handover, giảm thời gian cập nhật trạng thái, giá trị ROI dễ chứng minh hơn.

### 2.3. Booking quốc tế là nơi nhiều rủi ro xảy ra sớm

Nhiều rủi ro logistics không bắt đầu ở cảng đích, mà bắt đầu từ lúc booking:

- Không lấy được chỗ tàu/chuyến bay đúng ngày cần.
- Lịch tàu thay đổi nhưng khách chưa được cập nhật.
- Hàng bị roll sang chuyến sau.
- Sai cut-off SI/VGM.
- Sai thông tin shipper/consignee/notify party.
- Sai cảng đi/cảng đến.
- Chưa có container rỗng.
- LCL không kịp vào kho CFS.
- Air cargo bị offload hoặc đổi chuyến.
- B/L draft bị sai nhưng phát hiện muộn.

Nếu phát hiện rủi ro sớm, forwarder có thể xử lý trước khi phát sinh chi phí lớn hoặc ảnh hưởng cam kết giao hàng.

---

## 3. Thuật ngữ cần giải thích

### 3.1. Forwarder là gì?

**Forwarder** hay **freight forwarder** là công ty giao nhận vận tải. Forwarder không nhất thiết sở hữu tàu, máy bay, xe tải hay kho, nhưng đứng ra tổ chức vận chuyển hàng hóa cho chủ hàng.

Forwarder thường làm các việc sau:

- Tư vấn tuyến vận chuyển.
- Báo giá cước.
- Đặt chỗ với hãng tàu, hãng bay, NVOCC hoặc co-loader.
- Theo dõi lịch tàu/lịch bay.
- Phối hợp trucking, kho, hải quan, chứng từ.
- Làm hoặc phối hợp làm B/L, AWB, chứng từ XNK.
- Cập nhật trạng thái cho khách.
- Thu hộ/chi hộ một số chi phí logistics.

Hiểu đơn giản:

> Forwarder giống như "người điều phối chuyến đi" cho hàng hóa quốc tế. Họ không phải lúc nào cũng là người vận chuyển trực tiếp, nhưng là người giúp lô hàng đi từ điểm A đến điểm B qua nhiều bên khác nhau.

### 3.2. Carrier là gì?

**Carrier** là nhà vận chuyển thực tế hoặc nhà vận chuyển ký hợp đồng vận chuyển. Trong cụm này, carrier thường là:

- Hãng tàu container như Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE.
- Hãng bay chở hàng hoặc hãng bay thương mại có khoang hàng hóa.
- NVOCC phát hành vận đơn riêng nhưng mua chỗ lại từ hãng tàu.

Carrier là nguồn chính của các thông tin như lịch tàu, booking confirmation, container tracking, ETD, ETA, cut-off, arrival notice, local charge và vận đơn.

### 3.3. NVOCC là gì?

**NVOCC** là viết tắt của **Non-Vessel Operating Common Carrier**. Đây là nhà vận chuyển đường biển không sở hữu tàu nhưng phát hành vận đơn riêng và mua chỗ vận chuyển từ hãng tàu.

Ví dụ dễ hiểu:

```text
Chủ hàng/forwarder đặt dịch vụ với NVOCC.
NVOCC phát hành House B/L hoặc vận đơn của mình.
NVOCC mua chỗ thực tế từ hãng tàu.
Hàng vẫn đi trên tàu của hãng tàu.
```

NVOCC thường hữu ích khi chủ hàng/forwarder cần gom hàng, tuyến linh hoạt hoặc giá cạnh tranh.

### 3.4. Co-loader là gì?

**Co-loader** là bên gom hoặc chia sẻ chỗ vận chuyển với forwarder khác, thường gặp trong hàng LCL hoặc các tuyến mà forwarder nhỏ không có hợp đồng trực tiếp với carrier.

Ví dụ:

- Forwarder A có khách gửi hàng LCL đi Đức.
- Forwarder A không tự gom đủ hàng hoặc không có tuyến trực tiếp.
- Forwarder A đặt qua co-loader B.
- Co-loader B gom hàng của nhiều forwarder để đóng chung container.

Điểm cần chú ý: Khi qua co-loader, thông tin có thêm một lớp trung gian, nên cập nhật trạng thái có thể chậm hơn.

### 3.5. Booking là gì?

**Booking** là việc đặt chỗ vận chuyển với carrier, NVOCC, co-loader hoặc hãng bay. Booking xác nhận rằng lô hàng có chỗ trên một chuyến tàu/chuyến bay/tuyến vận chuyển nhất định.

Một booking thường có:

- Booking number.
- Tên tàu/chuyến bay.
- Voyage/flight number.
- Cảng đi/cảng đến.
- ETD/ETA.
- Cut-off chứng từ.
- Cut-off hạ container/hàng.
- Số lượng container hoặc khối lượng hàng.
- Loại container.
- Điều kiện nhiệt độ nếu là hàng lạnh.
- Thông tin shipper/consignee/notify party.

### 3.6. Booking confirmation là gì?

**Booking confirmation** là xác nhận booking từ carrier/NVOCC/co-loader/hãng bay. Đây là tài liệu rất quan trọng vì nó cho biết lô hàng đã có chỗ hay chưa và các mốc cần tuân thủ.

Nếu không đọc kỹ booking confirmation, forwarder có thể bỏ sót:

- Cut-off SI.
- Cut-off VGM.
- Cut-off hạ container.
- Nơi lấy container rỗng.
- Depot trả container.
- Yêu cầu đặc biệt với hàng nguy hiểm, hàng lạnh, hàng quá khổ.
- Chuyến tàu feeder/mother vessel.

### 3.7. FCL và LCL là gì?

| Thuật ngữ | Nghĩa | Hiểu đơn giản |
|---|---|---|
| FCL | Full Container Load | Một chủ hàng dùng nguyên container |
| LCL | Less than Container Load | Hàng của nhiều chủ hàng ghép chung container |

FCL thường có container number rõ từ khi lấy container rỗng/đóng hàng. LCL thường phụ thuộc kho CFS và co-loader nhiều hơn.

Ý nghĩa với Agentify:

- FCL cần theo dõi container, seal, free time, demurrage/detention, gate-in/gate-out.
- LCL cần theo dõi warehouse cut-off, CFS, consolidation, deconsolidation, HBL/MBL và thông báo hàng đến.

### 3.8. POL, POD, POR, DEL là gì?

| Thuật ngữ | Nghĩa | Ví dụ |
|---|---|---|
| POR | Place of Receipt | Nơi nhận hàng đầu tiên |
| POL | Port of Loading | Cảng xếp hàng lên tàu |
| POD | Port of Discharge | Cảng dỡ hàng khỏi tàu |
| DEL | Place of Delivery | Nơi giao hàng cuối cùng |

Một shipment có thể không chỉ là cảng đến cảng. Ví dụ:

```text
POR: Khu công nghiệp VSIP Bình Dương
POL: Cát Lái
POD: Los Angeles
DEL: Kho khách tại Texas
```

Nếu Agentify chỉ nhìn POL/POD mà không hiểu POR/DEL, hệ thống sẽ bỏ sót các bước vận tải nội địa trước và sau chặng quốc tế.

### 3.9. ETD, ETA, ATD, ATA là gì?

| Thuật ngữ | Nghĩa | Vai trò |
|---|---|---|
| ETD | Estimated Time of Departure | Dự kiến tàu/chuyến bay khởi hành |
| ETA | Estimated Time of Arrival | Dự kiến tàu/chuyến bay đến |
| ATD | Actual Time of Departure | Thời điểm khởi hành thực tế |
| ATA | Actual Time of Arrival | Thời điểm đến thực tế |

Điểm quan trọng: ETD/ETA có thể thay đổi nhiều lần. CS/Ops thường phải cập nhật thay đổi này cho khách.

### 3.10. Cut-off là gì?

**Cut-off** là hạn chót cho một hành động. Trong xuất khẩu đường biển, có nhiều loại cut-off:

| Loại cut-off | Nghĩa | Nếu trễ thì sao |
|---|---|---|
| SI cut-off | Hạn gửi Shipping Instruction | Có thể trễ phát hành B/L hoặc không kịp khai manifest |
| VGM cut-off | Hạn nộp trọng lượng container đã xác nhận | Container có thể không được xếp lên tàu |
| CY cut-off | Hạn hạ container vào bãi cảng | Có thể rớt tàu |
| CFS cut-off | Hạn đưa hàng LCL vào kho CFS | Hàng LCL không kịp đóng container |
| Customs cut-off | Hạn hoàn tất thủ tục hải quan/xác nhận cần thiết | Hàng có thể không được xếp |

Cut-off là một trong những điểm Agentify có thể tạo giá trị rõ vì đây là deadline cụ thể, dễ cảnh báo và dễ đo ROI.

### 3.11. SI là gì?

**SI** là viết tắt của **Shipping Instruction**. Đây là hướng dẫn lập vận đơn do shipper/forwarder gửi cho carrier/NVOCC.

SI thường chứa:

- Shipper.
- Consignee.
- Notify party.
- Mô tả hàng.
- Số kiện, trọng lượng, thể tích.
- Cảng đi, cảng đến.
- Điều khoản cước trả trước/trả sau.
- Yêu cầu phát hành vận đơn.

Sai SI có thể dẫn đến sai B/L. Sai B/L có thể gây chậm thông quan, chậm thanh toán hoặc tranh chấp chứng từ.

### 3.12. VGM là gì?

**VGM** là viết tắt của **Verified Gross Mass**, tức trọng lượng toàn bộ container đã được xác nhận. Theo quy định SOLAS, container phải có VGM trước khi được xếp lên tàu.

Với người ngoài ngành, có thể hiểu:

> VGM là cân nặng chính thức của container đã đóng hàng. Nếu không có VGM đúng hạn, container có thể không được xếp lên tàu.

Đây là một deadline quan trọng trong booking đường biển.

### 3.13. B/L là gì?

**B/L** là viết tắt của **Bill of Lading**, tức vận đơn đường biển. Đây là chứng từ rất quan trọng trong vận tải biển, có thể đóng vai trò:

- Biên nhận hàng.
- Bằng chứng hợp đồng vận chuyển.
- Chứng từ sở hữu hàng hóa trong một số trường hợp.

Trong forwarder, thường có:

| Loại B/L | Nghĩa |
|---|---|
| MBL | Master Bill of Lading do carrier/NVOCC phát hành cho forwarder hoặc shipper |
| HBL | House Bill of Lading do forwarder phát hành cho khách |

### 3.14. AWB, MAWB, HAWB là gì?

Trong vận tải hàng không:

- **AWB** là Air Waybill, vận đơn hàng không.
- **MAWB** là Master Air Waybill, vận đơn chính do hãng bay hoặc đại lý hàng không phát hành.
- **HAWB** là House Air Waybill, vận đơn nhà do forwarder phát hành cho khách.

Khác với B/L đường biển, AWB thường không phải chứng từ sở hữu hàng hóa theo cách truyền thống như vận đơn đường biển gốc.

### 3.15. Roll cargo là gì?

**Roll cargo** là tình huống hàng đã được booking nhưng không được xếp lên chuyến tàu/chuyến bay dự kiến và bị chuyển sang chuyến sau.

Nguyên nhân có thể là:

- Tàu quá tải.
- Carrier đổi lịch.
- Hàng hạ bãi muộn.
- Thiếu SI/VGM/chứng từ.
- Container chưa được release.
- Vấn đề hải quan.

Roll cargo là pain rất lớn vì forwarder phải giải thích với khách, cập nhật ETA mới và xử lý rủi ro trễ giao.

### 3.16. Transshipment là gì?

**Transshipment** là chuyển tải. Hàng không đi thẳng từ cảng đi đến cảng đến, mà qua một cảng trung chuyển.

Ví dụ:

```text
Cát Lái -> Singapore -> Rotterdam
```

Nếu tàu feeder trễ ở Cát Lái hoặc tàu mẹ đổi lịch ở Singapore, ETA cuối cùng có thể bị ảnh hưởng.

### 3.17. Blank sailing là gì?

**Blank sailing** là khi hãng tàu hủy một chuyến tàu hoặc bỏ một cảng trong lịch trình. Điều này thường xảy ra do điều chỉnh năng lực vận tải, biến động nhu cầu, tắc nghẽn cảng hoặc thay đổi mạng tuyến.

Với forwarder, blank sailing tạo ra nhiều việc:

- Tìm chuyến thay thế.
- Báo khách.
- Cập nhật ETA.
- Điều chỉnh kế hoạch trucking/kho.
- Cập nhật lại chứng từ nếu cần.

### 3.18. Demurrage, detention và free time là gì?

| Thuật ngữ | Hiểu đơn giản | Ví dụ |
|---|---|---|
| Free time | Số ngày được miễn phí lưu container/bãi theo điều kiện hãng tàu/cảng | Được miễn 5 ngày sau khi tàu đến |
| Demurrage | Phí lưu container trong cảng/bãi sau khi hết free time | Hàng chưa lấy khỏi cảng, container vẫn nằm trong bãi |
| Detention | Phí giữ container ngoài cảng quá hạn | Đã kéo container về kho nhưng trả container rỗng muộn |

Maersk có tài liệu riêng giải thích demurrage/detention và free time. Với Agentify, đây là nhóm cảnh báo rất có giá trị vì phát sinh tiền trực tiếp.

---

## 4. Workflow thực tế của booking quốc tế

## 4.1. Luồng xuất khẩu đường biển FCL

Một lô hàng xuất khẩu FCL thường đi qua các bước sau:

```text
1. Chủ hàng gửi yêu cầu báo giá
2. Forwarder kiểm tra tuyến, lịch tàu, giá cước
3. Forwarder gửi quotation cho khách
4. Khách xác nhận booking
5. Forwarder đặt chỗ với hãng tàu/NVOCC/co-loader
6. Nhận booking confirmation
7. Gửi thông tin booking cho khách và trucking/kho
8. Lấy container rỗng
9. Đóng hàng tại kho/nhà máy
10. Khai hải quan xuất khẩu
11. Hạ container vào cảng trước CY cut-off
12. Gửi SI trước SI cut-off
13. Gửi VGM trước VGM cut-off
14. Container được xếp lên tàu
15. Carrier cập nhật ATD
16. Forwarder kiểm tra B/L draft
17. Phát hành B/L
18. Cập nhật ETA và trạng thái cho khách
```

Điểm dễ lỗi:

- Báo giá xong nhưng không giữ được chỗ.
- Booking confirmation về email nhưng chưa cập nhật vào file theo dõi.
- SI/VGM/cut-off nằm trong PDF hoặc email, không có cảnh báo tự động.
- Trucking không lấy được container rỗng đúng lúc.
- Hàng đóng xong nhưng hạ bãi muộn.
- Container bị roll nhưng CS biết muộn.
- B/L draft sai thông tin.

### 4.2. Luồng xuất khẩu đường biển LCL

Hàng LCL có thêm bước kho CFS và co-loader:

```text
1. Khách gửi yêu cầu báo giá LCL
2. Forwarder kiểm tra lịch consol/co-loader
3. Khách xác nhận
4. Forwarder nhận booking hoặc hướng dẫn nhập kho CFS
5. Khách/trucking đưa hàng vào kho CFS trước CFS cut-off
6. Kho CFS cân đo, xác nhận số kiện/CBM
7. Co-loader gom hàng và đóng container
8. Làm SI/HBL/MBL
9. Container được hạ cảng và xếp tàu
10. Forwarder cập nhật lịch và chứng từ cho khách
```

Điểm dễ lỗi:

- Số CBM thực tế khác khai báo ban đầu, làm thay đổi chi phí.
- Hàng vào kho CFS muộn.
- Hàng thiếu nhãn hoặc sai chứng từ.
- Co-loader cập nhật chậm.
- HBL/MBL mismatch.

### 4.3. Luồng nhập khẩu đường biển

Luồng nhập khẩu thường bắt đầu bằng pre-alert hoặc thông tin hàng sắp đến:

```text
1. Đại lý nước ngoài gửi pre-alert
2. Forwarder nhận MBL/HBL, invoice, packing list, ETA
3. Kiểm tra arrival notice từ carrier/co-loader
4. Thông báo khách chuẩn bị chứng từ nhập khẩu
5. Kiểm tra local charge và D/O
6. Phối hợp khai hải quan
7. Kiểm tra hàng đã đến, đã có D/O, đã thông quan, đã thanh toán phí
8. Điều xe lấy hàng/container
9. Giao hàng về kho khách
10. Trả container rỗng nếu FCL
11. Đối soát chi phí và hóa đơn
```

Điểm dễ lỗi:

- Pre-alert đến muộn.
- ETA thay đổi nhưng khách chưa biết.
- Arrival notice nằm trong email riêng.
- Chưa thanh toán local charge nên chưa lấy được D/O.
- Hết free time nhưng chưa thông quan.
- Không biết rõ điều kiện "hàng đã sẵn sàng lấy" gồm những gì.

### 4.4. Luồng xuất khẩu/nhập khẩu đường hàng không

Hàng air thường nhanh hơn nhưng deadline gắt hơn:

```text
1. Khách gửi yêu cầu air freight
2. Forwarder kiểm tra giá và chuyến bay
3. Khách xác nhận
4. Forwarder đặt booking với hãng bay/GSA/co-loader
5. Nhận booking confirmation hoặc flight plan
6. Khách/trucking giao hàng vào kho hàng không
7. Cân đo, soi chiếu, kiểm tra chứng từ
8. Phát hành HAWB/MAWB
9. Hàng lên chuyến bay
10. Cập nhật flight departure/arrival
11. Làm thủ tục nhập khẩu/giao hàng tại đầu đến
```

Điểm dễ lỗi:

- Sai chargeable weight.
- Hàng không kịp cut-off kho hàng không.
- Bị offload khỏi chuyến bay.
- Chứng từ hàng nguy hiểm/hàng pin/hàng đặc biệt thiếu.
- Flight đổi lịch nhưng khách chưa được cập nhật.

---

## 5. Thực trạng quản lý của forwarder tại Việt Nam

### 5.1. Nhiều forwarder vẫn vận hành bằng email, Excel và Zalo

Qua desk research và kinh nghiệm quan sát thị trường, forwarder vừa và nhỏ thường có nhiều công cụ cùng tồn tại:

| Nghiệp vụ | Công cụ thường dùng |
|---|---|
| Báo giá | Email, Excel rate sheet, file PDF từ carrier/co-loader |
| Booking | Email với carrier/co-loader, website hãng tàu, portal booking |
| Theo dõi shipment | Excel, Google Sheet, phần mềm nội bộ, phần mềm forwarder |
| Cập nhật khách | Email, Zalo, điện thoại |
| Chứng từ | Email, folder nội bộ, Google Drive, phần mềm forwarder |
| Tracking | Website hãng tàu, website co-loader, carrier API nếu có, manual check |
| Kế toán | MISA/FAST/phần mềm kế toán, Excel đối soát |

Điểm đáng chú ý: một số doanh nghiệp có phần mềm nhưng vẫn dùng Excel/Zalo vì phần mềm không bao phủ hết workflow giao tiếp hằng ngày.

### 5.2. Dữ liệu booking thường bị tách khỏi dữ liệu khách hàng

Forwarder thường nhìn lô hàng theo mã booking, container, HBL/MBL hoặc job number. Khách hàng lại hỏi theo PO, invoice, SKU hoặc đơn hàng.

Ví dụ:

```text
Khách hỏi: "PO VN-2458 đi Mỹ tới đâu rồi?"
CS trong forwarder phải nhớ hoặc tra:
  PO VN-2458 thuộc shipment nào?
  Shipment đó đi booking nào?
  Booking đó có container nào?
  Container đó đã lên tàu chưa?
  ETA hiện tại là ngày nào?
  Có bị roll không?
  Câu trả lời nên gửi thế nào để khách hiểu?
```

Nếu các mã này không được nối với nhau, CS mất nhiều thời gian để trả lời một câu hỏi tưởng đơn giản.

### 5.3. Carrier portal giải quyết một phần, nhưng không giải quyết toàn bộ workflow

Hãng tàu lớn hiện có website/portal cho booking, tracking, lịch tàu, chứng từ và thanh toán. Các mạng như INTTRA/e2open cũng giúp kết nối booking và shipping instruction với nhiều hãng tàu.

Nhưng portal hãng tàu thường chỉ giải quyết thông tin của chính hãng đó. Forwarder vẫn phải:

- Làm việc với nhiều hãng tàu khác nhau.
- Làm việc với NVOCC/co-loader không có API tốt.
- Nối booking với PO/invoice của khách.
- Ghi nhận deadline SI/VGM/CY cut-off.
- Gửi thông tin qua email/Zalo theo cách khách muốn.
- Theo dõi chi phí, local charge, chứng từ, D/O, trucking và hải quan.
- Quản lý nhiều người trong nội bộ cùng xử lý một shipment.

Vì vậy, carrier portal là nguồn dữ liệu, không phải lớp điều phối nội bộ hoàn chỉnh cho forwarder vừa và nhỏ.

### 5.4. Phần mềm forwarder mạnh nhưng có rào cản triển khai

Các nền tảng như CargoWise, Magaya, Descartes hoặc phần mềm forwarding nội địa có thể quản lý nhiều nghiệp vụ. Tuy nhiên, với forwarder vừa và nhỏ tại Việt Nam, rào cản thường là:

- Chi phí triển khai và license.
- Độ phức tạp nghiệp vụ.
- Thời gian đào tạo nhân sự.
- Cần nhập liệu kỷ luật.
- Không khớp hoàn toàn với thói quen dùng Zalo/email.
- Tích hợp với hệ thống nội địa như ePort, ECUS, kế toán, file Excel có thể cần tùy biến.
- Nhân sự CS/Ops cần trả lời nhanh, không muốn mở một hệ thống nặng cho mọi câu hỏi nhỏ.

Điều này mở ra cơ hội cho lớp sản phẩm nhẹ hơn:

> Không bắt người dùng thay toàn bộ hệ thống, mà đọc và tổ chức lại dữ liệu hiện có để tạo timeline, deadline, exception và câu trả lời.

---

## 6. Pain ranking sơ bộ của Cụm 3

| Mức độ | Pain | Ai đau nhất | Vì sao quan trọng | Cơ hội cho Agentify |
|---|---|---|---|---|
| Rất cao | Khách hỏi trạng thái liên tục nhưng dữ liệu nằm rải rác | CS forwarder, Account, Ops | Tốn thời gian hằng ngày, dễ trả lời thiếu hoặc sai | Gom trạng thái shipment, tạo summary, soạn nháp trả lời |
| Rất cao | Lịch tàu/lịch bay thay đổi, roll cargo, ETA đổi | CS, Ops, khách hàng | Ảnh hưởng cam kết giao hàng, dễ gây phàn nàn | Cảnh báo thay đổi ETA/ETD, exception inbox |
| Rất cao | Miss cut-off SI/VGM/CY/CFS | Ops, docs, manager | Có thể làm rớt tàu, phát sinh chi phí | Deadline tracker và nhắc việc theo booking |
| Cao | Booking confirmation, SI, B/L draft nằm trong email/PDF | Docs, CS | Dễ bỏ sót thông tin quan trọng | Trích xuất dữ liệu từ email/PDF, checklist chứng từ |
| Cao | Nhiều carrier/co-loader, mỗi bên một portal/cách cập nhật | Ops, manager | Mất thời gian check nhiều nguồn | Shipment workspace gom link, trạng thái, nguồn dữ liệu |
| Cao | Không nối được PO/invoice của khách với booking/container | CS, chủ hàng | Khách hỏi theo ngôn ngữ kinh doanh, forwarder nhìn theo mã vận tải | Mapping PO-shipment-container |
| Trung bình cao | Khó kiểm soát profit/cost theo shipment | Sales, kế toán, manager | Ảnh hưởng biên lợi nhuận | Sau MVP có thể thêm cost alert và margin view |
| Trung bình | Handover giữa sales, CS, docs, ops bị thiếu thông tin | Manager, team lead | Nhân sự nghỉ/đổi ca dễ mất context | Timeline nội bộ và activity log |
| Trung bình | Co-loader/đại lý nước ngoài phản hồi chậm | CS, Ops | Khó tự động hóa hoàn toàn vì phụ thuộc bên ngoài | Reminder và pending owner tracker |

Kết luận pain:

> Pain đáng ưu tiên nhất không phải "tạo thêm một portal booking", mà là giảm thời gian CS/Ops phải gom thông tin để trả lời khách và giảm rủi ro miss deadline booking/chứng từ.

---

## 7. Phân khúc forwarder nên khảo sát

### 7.1. Forwarder vừa và nhỏ chuyên tuyến biển

Đặc điểm:

- Xử lý khoảng 50-500 shipment/tháng.
- Có nhiều khách SME hoặc nhà máy.
- Có sales, CS, docs, ops riêng hoặc bán chuyên.
- Làm việc với nhiều hãng tàu/NVOCC/co-loader.
- Dùng Excel/email/Zalo nhiều.

Lý do nên khảo sát:

- Pain đủ rõ nhưng chưa chắc đã có hệ thống enterprise.
- Người ra quyết định có thể gần vận hành, dễ pilot.
- Nếu Agentify giúp giảm thời gian CS/Ops, ROI dễ chứng minh.

### 7.2. Forwarder có hàng LCL/co-loader nhiều

Đặc điểm:

- Nhiều shipment nhỏ.
- Nhiều HBL/MBL.
- Nhiều cut-off kho CFS.
- Dữ liệu từ co-loader cập nhật không đồng đều.

Pain:

- Cập nhật khách theo từng lô nhỏ rất tốn công.
- Dễ sai CBM, số kiện, thông tin HBL.
- Dễ thiếu trạng thái kho CFS.

### 7.3. Forwarder air freight

Đặc điểm:

- Shipment giá trị cao hoặc cần giao nhanh.
- Deadline gắt.
- Giá và chỗ thay đổi nhanh.
- Nhiều hàng đặc biệt cần chứng từ riêng.

Pain:

- Flight change/offload cần báo khách ngay.
- Chargeable weight ảnh hưởng chi phí.
- Không kịp cut-off có thể mất chuyến.

### 7.4. Forwarder phục vụ chủ hàng FDI/nhà máy

Đặc điểm:

- Khách yêu cầu báo cáo định kỳ.
- Có nhiều PO/invoice/SKU.
- Yêu cầu SLA rõ hơn.
- Có thể cần gửi report theo form khách.

Pain:

- Khách hỏi theo PO hoặc production need date, không hỏi theo booking number.
- Forwarder phải làm báo cáo thủ công.
- Cần visibility nhưng chưa chắc muốn tích hợp enterprise.

---

## 8. Product map: công cụ hiện tại và khoảng trống

### 8.1. Các lớp công cụ trong booking quốc tế

| Lớp | Ví dụ công cụ/sản phẩm | Chức năng chính | Khoảng trống còn lại |
|---|---|---|---|
| Carrier portal | Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE | Booking, tracking, lịch tàu, chứng từ theo từng hãng | Không gom nhiều hãng, không nối với workflow nội bộ Việt Nam |
| Network booking | INTTRA/e2open, WebCargo | Đặt chỗ và trao đổi dữ liệu với nhiều carrier/hãng bay | Phù hợp doanh nghiệp có quy trình số hóa hơn, không tự xử lý Zalo/Excel/local workflow |
| Forwarder ERP/TMS | CargoWise, Magaya, Descartes, Winta | Quản lý nghiệp vụ forwarding, job, chứng từ, kế toán | Có thể nặng, cần nhập liệu kỷ luật, không phải lớp AI trả lời nhanh |
| Visibility platform | project44, FourKites | Tracking và visibility chuỗi cung ứng | Mạnh cho enterprise/global shipper, có thể quá rộng và đắt với SME Việt Nam |
| Local Excel/email/Zalo | Excel, Google Sheet, Gmail/Outlook, Zalo | Công cụ thực tế hằng ngày | Không có cấu trúc, khó cảnh báo, khó tổng hợp |

### 8.2. Khoảng trống sản phẩm

Khoảng trống đáng chú ý nằm giữa hai thái cực:

```text
Một bên: Excel/email/Zalo quá thủ công
Một bên: hệ thống enterprise quá nặng hoặc quá đắt
```

Agentify có thể nằm ở giữa:

- Nhẹ hơn ERP/TMS đầy đủ.
- Dễ triển khai hơn platform enterprise.
- Đọc được dữ liệu từ email/PDF/Excel trước khi cần API.
- Tập trung vào CS/Ops và exception, không thay toàn bộ nghiệp vụ.
- Tạo giá trị nhanh bằng timeline, deadline, summary, draft reply.

---

## 9. Đối thủ và sản phẩm liên quan

### 9.1. CargoWise

**CargoWise** là nền tảng logistics execution của WiseTech Global, phục vụ forwarder, customs broker, warehouse, transport và logistics provider toàn cầu.

Điểm mạnh:

- Rất mạnh về nghiệp vụ forwarding quốc tế.
- Hỗ trợ nhiều quốc gia, nhiều loại hình logistics.
- Phù hợp doanh nghiệp logistics quy mô lớn hoặc có mạng lưới đa quốc gia.
- Có hệ sinh thái dữ liệu và automation sâu.

Điểm yếu/giới hạn với thị trường Agentify đang nhắm:

- Có thể quá nặng với forwarder vừa và nhỏ.
- Chi phí và triển khai có thể là rào cản.
- Cần quy trình nhập liệu và vận hành kỷ luật.
- Không được định vị là AI assistant nhẹ cho CS/Ops dùng cùng email/Zalo/Excel.

Ý nghĩa cho Agentify:

> CargoWise là đối thủ nếu Agentify muốn làm core forwarder ERP. Nhưng nếu Agentify làm lớp trợ lý trạng thái, cảnh báo và trả lời khách trên dữ liệu sẵn có, CargoWise có thể là hệ thống nguồn thay vì đối thủ trực tiếp.

### 9.2. Magaya

**Magaya** cung cấp phần mềm logistics và supply chain cho freight forwarder, warehouse, customs broker và logistics provider.

Điểm mạnh:

- Có các module forwarding, warehouse, tracking, customer portal.
- Phù hợp logistics provider muốn hệ thống nghiệp vụ tương đối đầy đủ.
- Có định vị rõ cho freight forwarding.

Điểm yếu/giới hạn:

- Vẫn là một hệ thống nghiệp vụ cần triển khai.
- Có thể chưa tối ưu cho thói quen vận hành Việt Nam như Zalo, local carrier/co-loader workflow, file Excel tùy biến.
- Với forwarder nhỏ, rào cản thay đổi quy trình có thể cao.

Ý nghĩa cho Agentify:

> Magaya cho thấy nhu cầu quản lý forwarding là thật. Nhưng Agentify nên tránh cạnh tranh bằng cách làm "phần mềm forwarding đầy đủ" ngay từ đầu.

### 9.3. Descartes

**Descartes** có nhiều giải pháp logistics, gồm Global Logistics Network, customs/compliance, transportation management, routing, mobile, warehouse và trade data.

Điểm mạnh:

- Mạng lưới logistics toàn cầu lớn.
- Mạnh về connectivity, compliance, visibility và dữ liệu thương mại.
- Phù hợp enterprise và logistics network phức tạp.

Điểm yếu/giới hạn:

- Có thể quá enterprise so với forwarder SME Việt Nam.
- Không phải sản phẩm "cài nhanh để CS trả lời khách tốt hơn trong 2-4 tuần".

Ý nghĩa cho Agentify:

> Descartes cạnh tranh ở tầng network/connectivity lớn. Agentify nên bắt đầu ở tầng workflow nhẹ và local adoption.

### 9.4. INTTRA/e2open

**INTTRA**, hiện thuộc e2open, là mạng đặt chỗ và trao đổi chứng từ vận tải biển kết nối shipper/forwarder với nhiều ocean carrier.

Điểm mạnh:

- Mạng carrier lớn.
- Giúp chuẩn hóa booking, shipping instruction, tracking và trao đổi dữ liệu.
- Có giá trị rõ với doanh nghiệp có lượng booking lớn.

Điểm yếu/giới hạn:

- Tập trung vào kết nối ocean carrier, không bao phủ toàn bộ workflow nội bộ forwarder.
- Không tự nối PO, Zalo, email nội bộ, trucking, hải quan, local charge, câu trả lời khách.
- Adoption phụ thuộc quy trình số hóa của doanh nghiệp.

Ý nghĩa cho Agentify:

> INTTRA có thể là nguồn dữ liệu hoặc integration về booking/tracking. Agentify không nên làm lại network carrier, mà nên dùng thông tin đó để tạo exception và customer update.

### 9.5. WebCargo by Freightos

**WebCargo** là nền tảng booking và pricing air cargo thuộc Freightos, giúp forwarder tìm giá, kiểm tra chỗ và booking với hãng hàng không.

Điểm mạnh:

- Tập trung mạnh vào air freight.
- Hỗ trợ eBooking, ePricing, cập nhật chỗ và giá.
- Có giá trị cho forwarder air cần phản ứng nhanh.

Điểm yếu/giới hạn:

- Tập trung vào air cargo booking/pricing, không thay thế toàn bộ workflow shipment, chứng từ, nội địa, hải quan và CS.
- Tại Việt Nam, mức độ phù hợp phụ thuộc tuyến, hãng bay, quy trình forwarder.

Ý nghĩa cho Agentify:

> WebCargo giải quyết booking air. Agentify có thể bổ sung bằng cách theo dõi shipment sau booking, cảnh báo thay đổi, gom chứng từ và tạo update cho khách.

### 9.6. Winta Logistics

**Winta Logistics** là phần mềm quản lý logistics/forwarder tại Việt Nam, hướng tới quản lý nghiệp vụ giao nhận, chứng từ, kế toán và báo cáo.

Điểm mạnh:

- Bối cảnh Việt Nam rõ hơn sản phẩm quốc tế.
- Có thể phù hợp với nghiệp vụ forwarder nội địa.
- Có các module quản lý lô hàng, chứng từ, chi phí.

Điểm yếu/giới hạn:

- Vẫn là phần mềm nghiệp vụ chính, không nhất thiết là AI assistant.
- Cần đánh giá thực tế khả năng tích hợp với email/Zalo/API carrier.
- Nếu doanh nghiệp đã quen Excel, rào cản nhập liệu vẫn tồn tại.

Ý nghĩa cho Agentify:

> Winta là đối thủ gần hơn ở thị trường Việt Nam nếu Agentify làm forwarder management system. Agentify nên khác biệt bằng AI workflow, đọc dữ liệu rời rạc và trả lời trạng thái nhanh.

### 9.7. Carrier portals

Các hãng tàu lớn đều có portal riêng cho booking, tracking, lịch tàu, chứng từ, phí và hỗ trợ khách hàng.

Điểm mạnh:

- Dữ liệu gốc từ carrier.
- Chính xác cho booking/container của chính hãng đó.
- Có chức năng booking/tracking trực tiếp.

Điểm yếu/giới hạn:

- Mỗi hãng một portal.
- Không gom dữ liệu giữa nhiều carrier.
- Không hiểu workflow nội bộ của forwarder.
- Không tự tạo báo cáo theo format khách hàng.
- Không xử lý trạng thái từ trucking, hải quan, kho, kế toán.

Ý nghĩa cho Agentify:

> Carrier portal là nguồn dữ liệu cần khai thác, không phải lớp sản phẩm cuối cho CS/Ops.

### 9.8. project44 và FourKites

**project44** và **FourKites** là các nền tảng visibility chuỗi cung ứng toàn cầu, giúp theo dõi shipment, container, vận tải đa phương thức và exception.

Điểm mạnh:

- Mạnh về tracking, visibility và network dữ liệu.
- Phù hợp enterprise shipper và logistics provider lớn.
- Định vị rõ ở supply chain visibility/control tower.

Điểm yếu/giới hạn:

- Có thể quá enterprise và chi phí cao với SME Việt Nam.
- Không nhất thiết xử lý tốt các kênh local như Zalo, Excel, quy trình chứng từ Việt Nam, ePort, ECUS.
- Có thể khó bán nếu khách hàng chỉ cần một lớp "CS/Ops assistant" triển khai nhanh.

Ý nghĩa cho Agentify:

> Hai sản phẩm này chứng minh nhu cầu visibility là thật. Nhưng Agentify nên chọn phân khúc local/mid-market và workflow cụ thể để tránh cạnh tranh trực diện.

---

## 10. Cơ hội sản phẩm cho Agentify trong Cụm 3

### 10.1. Định vị đề xuất

Định vị dễ hiểu nhất:

> Agentify là trợ lý vận hành cho forwarder, giúp gom trạng thái booking/shipment từ email, Excel, portal và file chứng từ; tự phát hiện deadline/rủi ro; soạn nháp cập nhật cho khách; và tạo một timeline dễ hiểu cho mỗi lô hàng.

Không nên định vị ban đầu là:

- Phần mềm thay thế toàn bộ CargoWise/Magaya/Winta.
- Portal booking cạnh tranh với INTTRA/WebCargo.
- Hệ thống khai hải quan tự động.
- Công cụ tự gửi mọi thông tin cho khách không cần duyệt.

### 10.2. Use case 1: Shipment status assistant cho CS forwarder

Vấn đề:

CS phải trả lời khách các câu hỏi như:

- "Hàng đã lên tàu chưa?"
- "ETA mới nhất là ngày nào?"
- "Có bị delay không?"
- "PO này đi booking nào?"
- "B/L đã có draft chưa?"
- "Khi nào hàng đến?"

Agentify làm gì:

- Gom dữ liệu từ Excel shipment tracker, email booking confirmation, email delay, website tracking nếu có.
- Tạo timeline shipment:

```text
Booking confirmed -> Empty pickup -> Loaded -> Gate-in -> SI submitted -> VGM submitted -> On board -> ATD -> ETA updated -> Arrival notice
```

- Tóm tắt trạng thái hiện tại bằng ngôn ngữ dễ hiểu.
- Soạn nháp câu trả lời cho khách.
- Gắn mức độ rủi ro: bình thường, cần chú ý, nguy cơ trễ.

Giá trị:

- Giảm thời gian tra cứu.
- Giảm sai sót khi trả lời khách.
- Giúp nhân sự mới hiểu shipment nhanh hơn.

### 10.3. Use case 2: Deadline and cut-off tracker

Vấn đề:

Booking confirmation thường có nhiều deadline, nhưng deadline nằm trong email/PDF. Nếu nhân sự quên SI/VGM/CY/CFS cut-off, lô hàng có thể rớt tàu.

Agentify làm gì:

- Trích xuất cut-off từ booking confirmation.
- Tạo checklist deadline cho từng booking.
- Gửi cảnh báo trước hạn.
- Gắn owner cho từng việc: sales, docs, ops, khách hàng, trucking.
- Hiển thị lô hàng nào còn thiếu SI, VGM, container number, seal, customs clearance.

Giá trị:

- Giảm miss cut-off.
- Giảm tình huống rớt tàu do lỗi nội bộ.
- Tạo quy trình rõ hơn mà không cần triển khai TMS lớn.

### 10.4. Use case 3: Exception inbox

Vấn đề:

Manager không thể mở từng shipment để biết lô nào đang có vấn đề. CS/Ops thì bị ngập trong email và Zalo.

Agentify làm gì:

- Gom các exception vào một màn hình:

| Exception | Ví dụ |
|---|---|
| ETA changed | ETA Hamburg đổi từ 18/7 sang 21/7 |
| Cut-off risk | Còn 6 giờ tới SI cut-off nhưng chưa có SI |
| Missing docs | Chưa có commercial invoice |
| Roll risk | Container gate-in muộn, nguy cơ không kịp tàu |
| Customer waiting | Khách hỏi trạng thái 2 lần nhưng chưa trả lời |
| Free time risk | Import shipment sắp hết free time |

- Gợi ý việc cần làm tiếp theo.
- Soạn nháp tin nhắn/email nội bộ hoặc gửi khách.

Giá trị:

- Manager nhìn được rủi ro thay vì chỉ nhìn danh sách shipment.
- CS/Ops ưu tiên đúng việc.
- Dễ chứng minh ROI bằng số vụ trễ deadline giảm.

### 10.5. Use case 4: Customer update generator

Vấn đề:

Forwarder thường phải gửi nhiều cập nhật trạng thái lặp lại cho khách.

Agentify làm gì:

- Tạo bản cập nhật theo format khách:

```text
Subject: Update shipment PO VN-2458 / Booking MAEU123456

Dear anh/chị,

Lô hàng PO VN-2458 đã được xác nhận booking.
ETD dự kiến: 12/06/2026
ETA dự kiến: 05/07/2026
SI cut-off: 09/06/2026 12:00
VGM cut-off: 10/06/2026 16:00

Hiện chưa ghi nhận rủi ro delay. Bên em sẽ tiếp tục cập nhật khi container gate-in và tàu chạy.
```

- Chuyển đổi giữa ngôn ngữ nội bộ và ngôn ngữ khách hàng.
- Cho người dùng duyệt trước khi gửi.

Giá trị:

- Tiết kiệm thời gian CS.
- Giữ chất lượng giao tiếp đồng đều.
- Giảm lỗi diễn đạt hoặc thiếu thông tin.

### 10.6. Use case 5: PO-to-booking mapper

Vấn đề:

Khách hỏi theo PO/invoice, nhưng forwarder quản lý theo booking/container/HBL.

Agentify làm gì:

- Lưu mapping giữa PO, invoice, booking, container, HBL, MBL.
- Cho phép tìm bằng bất kỳ mã nào.
- Tạo timeline theo ngôn ngữ khách hàng.

Ví dụ:

```text
Search: PO VN-2458
Agentify trả về:
  Shipment: SHP-2026-086
  Booking: MAEU123456
  Container: MSKU7654321
  HBL: HCMHAM260612
  ETD: 12/06/2026
  ETA: 05/07/2026
  Risk: ETA chậm hơn cam kết giao hàng 1 ngày
```

Giá trị:

- Giảm phụ thuộc vào trí nhớ của CS.
- Hỗ trợ chủ hàng tốt hơn.
- Tạo nền cho control tower nhẹ.

---

## 11. MVP đề xuất cho Cụm 3

### 11.1. MVP nên chọn: CS/Ops copilot cho forwarder xuất nhập khẩu đường biển

MVP đề xuất:

> Một workspace cho forwarder quản lý trạng thái shipment đường biển, đọc dữ liệu từ Excel/email/PDF booking confirmation, tạo deadline SI/VGM/CY/CFS, cảnh báo exception và soạn nháp update cho khách.

Phạm vi nên bắt đầu:

- Forwarder vừa và nhỏ.
- Hàng đường biển FCL trước, sau đó mở sang LCL.
- Shipment export trước nếu muốn tập trung vào booking/cut-off; shipment import nếu muốn nối với Cụm 1 về hải quan/cảng/free time.
- Nguồn dữ liệu ban đầu: Excel/Google Sheet, email, PDF booking confirmation, nhập tay nhanh.

Lý do chọn:

- Pain rõ và xảy ra hằng ngày.
- Không cần tích hợp sâu ngay từ đầu.
- Có thể demo bằng workflow thật.
- Dễ đo hiệu quả: thời gian trả lời khách, số deadline miss, số shipment có risk được phát hiện.

### 11.2. Tính năng MVP

| Tính năng | Mô tả | Giá trị |
|---|---|---|
| Shipment workspace | Một trang cho từng shipment/job | Gom thông tin thay vì rải trong Excel/email |
| Import Excel tracker | Upload hoặc sync file Excel đang dùng | Giảm rào cản nhập liệu |
| Email/PDF parser | Trích xuất booking number, ETD/ETA, cut-off từ email/PDF | Biến dữ liệu rời rạc thành dữ liệu có cấu trúc |
| Deadline checklist | SI, VGM, CY/CFS cut-off, docs deadline | Giảm miss deadline |
| Exception inbox | Danh sách lô hàng có rủi ro | Manager và CS ưu tiên đúng việc |
| AI status summary | Tóm tắt tình trạng hiện tại | Trả lời khách nhanh |
| Draft customer update | Soạn nháp email/Zalo theo ngữ cảnh | Giảm thời gian CS |
| Mapping code | PO, invoice, booking, container, HBL/MBL | Tìm kiếm dễ hơn |

### 11.3. Tính năng chưa nên làm ngay

Không nên làm ngay trong MVP:

- Tự động đặt booking với hãng tàu.
- Tự động gửi SI/VGM.
- Tự động phát hành B/L.
- Tự động gửi email cho khách không cần duyệt.
- Thay thế phần mềm kế toán hoặc phần mềm forwarder hiện có.
- Tích hợp API với tất cả carrier ngay từ đầu.

Lý do:

- Rủi ro pháp lý/nghiệp vụ cao.
- Tốn thời gian tích hợp.
- Dễ làm sản phẩm quá rộng trước khi kiểm chứng pain.
- Forwarder có thể chưa sẵn sàng trao quyền tự động cho AI ở bước nhạy cảm.

### 11.4. Chỉ số đo pilot

| Chỉ số | Cách đo |
|---|---|
| Thời gian trả lời một câu hỏi trạng thái | Trước/sau khi dùng Agentify |
| Số nguồn phải check để trả lời | Trước/sau |
| Số deadline SI/VGM/CY bị miss | Theo tháng |
| Số shipment có ETA/ETD thay đổi được phát hiện sớm | Theo tuần/tháng |
| Số email/tin nhắn update được AI soạn nháp | Theo người dùng |
| Tỷ lệ người dùng duyệt draft mà không sửa nhiều | Đo chất lượng draft |
| Số shipment được mapping PO-booking-container | Đo khả năng gom dữ liệu |

---

## 12. Ví dụ hoạt động cụ thể của Agentify

### 12.1. Ví dụ 1: Khách hỏi "hàng đã lên tàu chưa?"

Bối cảnh:

- Forwarder có khách xuất khẩu hàng đi Hamburg.
- Khách hỏi trên Zalo: "PO VN-2458 đã lên tàu chưa em?"
- CS không nhớ mã booking vì khách hỏi theo PO.

Cách làm hiện tại:

```text
1. CS mở Excel để tìm PO VN-2458.
2. Tìm ra booking number.
3. Mở email để tìm booking confirmation.
4. Mở website hãng tàu để track container.
5. Kiểm tra container đã loaded/on board chưa.
6. Copy ETD/ETA mới nhất.
7. Soạn tin nhắn trả lời khách.
```

Cách Agentify hoạt động:

```text
1. CS gõ PO VN-2458 vào Agentify.
2. Agentify trả về shipment liên quan, booking, container, ETD/ETA.
3. Agentify hiển thị trạng thái: "Container đã gate-in, chưa ghi nhận on board. ETD dự kiến 12/06/2026."
4. Agentify cảnh báo: "Tàu chưa chạy, không nên trả lời là đã lên tàu."
5. Agentify soạn nháp:
   "Dạ anh/chị, lô PO VN-2458 đã hạ container vào cảng. Hiện chưa có xác nhận tàu chạy/on board từ hãng tàu. ETD dự kiến vẫn là 12/06/2026, ETA Hamburg 05/07/2026. Bên em sẽ cập nhật lại khi có xác nhận ATD."
6. CS kiểm tra và gửi cho khách.
```

Giá trị:

- Tránh trả lời sai "đã lên tàu" khi mới chỉ gate-in.
- Giảm thời gian tra cứu.
- Người ngoài ngành cũng hiểu trạng thái thật của lô hàng.

### 12.2. Ví dụ 2: Sắp miss SI cut-off

Bối cảnh:

- Booking confirmation ghi SI cut-off là 10:00 ngày 08/06/2026.
- Đến 16:00 ngày 07/06/2026, Agentify chưa thấy SI submitted.
- Người phụ trách docs đang đợi thông tin consignee từ khách.

Cách làm hiện tại:

```text
Deadline nằm trong PDF booking confirmation.
Docs nhớ thì nhắc khách.
Nếu quên, sáng hôm sau mới phát hiện sắp hết hạn.
CS phải gọi gấp cho khách.
Nguy cơ trễ SI hoặc sai B/L.
```

Cách Agentify hoạt động:

```text
1. Agentify đọc booking confirmation và tạo deadline SI.
2. Trước hạn 18 giờ, hệ thống thấy checklist "SI submitted" chưa hoàn tất.
3. Agentify đưa shipment vào Exception Inbox.
4. Agentify gợi ý owner: Docs cần nhắc khách gửi thông tin consignee.
5. Agentify soạn nháp email:
   "Dạ anh/chị, lô booking MAEU123456 có SI cut-off lúc 10:00 ngày 08/06/2026. Hiện bên em còn thiếu thông tin consignee/notify party để gửi SI đúng hạn. Nhờ anh/chị xác nhận trước 17:30 hôm nay để tránh rủi ro trễ chứng từ."
6. Docs duyệt và gửi.
```

Giá trị:

- Agentify không tự gửi SI và không tự quyết định thông tin pháp lý.
- Agentify giúp phát hiện rủi ro sớm và nhắc đúng người.
- Đây là automation an toàn vì con người vẫn duyệt nội dung.

### 12.3. Ví dụ 3: ETA đổi ảnh hưởng cam kết giao hàng

Bối cảnh:

- Khách yêu cầu hàng đến kho Đức trước 10/07/2026.
- ETA ban đầu Hamburg là 05/07/2026, vẫn còn đủ thời gian.
- Hãng tàu cập nhật ETA mới là 08/07/2026 do transshipment delay.

Cách Agentify hoạt động:

```text
1. Agentify nhận biết ETA đổi từ 05/07 sang 08/07.
2. Hệ thống tính thêm thời gian thông quan/giao nội địa dự kiến 2-3 ngày.
3. Agentify đánh dấu rủi ro: "Có nguy cơ trễ cam kết giao kho ngày 10/07."
4. Agentify đề xuất việc cần làm:
   - Báo khách ETA mới.
   - Kiểm tra phương án giao nhanh sau khi hàng đến.
   - Xác nhận chứng từ nhập khẩu sẵn sàng để giảm thời gian chờ.
5. Agentify soạn nháp update cho khách và note nội bộ cho Ops.
```

Giá trị:

- Không chỉ báo "ETA đổi", mà giải thích tác động đến cam kết giao hàng.
- Kết nối insight của Cụm 2 với workflow của forwarder ở Cụm 3.

---

## 13. Câu hỏi phỏng vấn cho Cụm 3

### 13.1. Câu hỏi cho chủ/manager forwarder

1. Mỗi tháng công ty xử lý khoảng bao nhiêu shipment đường biển/đường hàng không?
2. Tỷ lệ FCL, LCL, air là bao nhiêu?
3. Khách hàng thường hỏi trạng thái qua kênh nào: email, Zalo, điện thoại, portal?
4. Mỗi CS/Ops phụ trách trung bình bao nhiêu shipment?
5. Đang dùng phần mềm nào để quản lý job/shipment?
6. Dù có phần mềm, team có còn dùng Excel/Google Sheet không? Vì sao?
7. Pain lớn nhất hiện tại là báo giá, booking, tracking, chứng từ, kế toán hay chăm sóc khách hàng?
8. Công ty từng bị miss cut-off SI/VGM/CY/CFS chưa? Hậu quả là gì?
9. Có đo thời gian CS trả lời một câu hỏi trạng thái không?
10. Khách có yêu cầu báo cáo định kỳ theo PO/container/shipment không?
11. Có muốn có một màn hình exception để biết lô nào đang rủi ro không?
12. Nếu có AI soạn nháp email/Zalo update cho khách, công ty có cho dùng không? Điều kiện kiểm soát là gì?
13. Ngân sách cho phần mềm vận hành/CS mỗi tháng là khoảng bao nhiêu?
14. Điều kiện để đồng ý pilot 4-8 tuần là gì?

### 13.2. Câu hỏi cho CS/Account forwarder

1. Một ngày bạn nhận bao nhiêu câu hỏi kiểu "hàng đang ở đâu"?
2. Để trả lời một câu hỏi, bạn thường mở những công cụ nào?
3. Bạn mất bao lâu để trả lời nếu shipment bình thường?
4. Bạn mất bao lâu nếu shipment có delay hoặc thiếu thông tin?
5. Khách thường hỏi theo mã gì: PO, invoice, booking, container, HBL?
6. Bạn có hay phải hỏi Ops/docs/kế toán trước khi trả lời khách không?
7. Trạng thái nào khách cần biết nhất?
8. Bạn có dùng template email/tin nhắn không?
9. Điều gì làm bạn sợ trả lời sai?
10. Nếu AI soạn nháp câu trả lời, bạn muốn nó viết theo giọng như thế nào?

### 13.3. Câu hỏi cho Ops/Docs forwarder

1. Booking confirmation thường nhận qua đâu?
2. Cut-off SI/VGM/CY/CFS đang được ghi nhận ở đâu?
3. Ai chịu trách nhiệm nhắc khách gửi thông tin còn thiếu?
4. SI đang gửi qua portal, email hay hệ thống nào?
5. VGM đang gửi qua đâu?
6. B/L draft đang review như thế nào?
7. Lỗi chứng từ nào xảy ra thường xuyên nhất?
8. Khi tàu đổi lịch hoặc hàng bị roll, ai biết đầu tiên?
9. Thông tin roll/delay được cập nhật vào đâu?
10. Có checklist chuẩn cho từng loại shipment không?

### 13.4. Câu hỏi cho khách hàng của forwarder

1. Bạn có hài lòng với tốc độ cập nhật trạng thái của forwarder hiện tại không?
2. Khi cần biết trạng thái lô hàng, bạn hỏi theo mã nào?
3. Bạn muốn nhận cập nhật định kỳ hay chỉ khi có sự cố?
4. Thông tin nào quan trọng nhất: ETD/ETA, đã lên tàu, chứng từ, free time, chi phí phát sinh?
5. Bạn có cần báo cáo theo PO hoặc đơn hàng không?
6. Bạn có sẵn sàng dùng một portal/light dashboard do forwarder cung cấp không?
7. Nếu forwarder trả lời nhanh hơn và có cảnh báo rủi ro sớm hơn, điều đó có ảnh hưởng đến quyết định chọn nhà cung cấp không?

---

## 14. Survey định lượng đề xuất cho Cụm 3

### 14.1. Nhóm câu hỏi đo quy mô vận hành

1. Công ty bạn thuộc nhóm nào?
   - Forwarder
   - NVOCC
   - 3PL
   - Chủ hàng
   - Đại lý hải quan
   - Khác

2. Mỗi tháng công ty xử lý bao nhiêu shipment quốc tế?
   - Dưới 50
   - 50-100
   - 101-300
   - 301-1.000
   - Trên 1.000

3. Loại hình chính là gì?
   - Ocean FCL
   - Ocean LCL
   - Air freight
   - Kết hợp nhiều loại

4. Công ty làm việc với bao nhiêu carrier/NVOCC/co-loader thường xuyên?
   - 1-3
   - 4-10
   - 11-20
   - Trên 20

### 14.2. Nhóm câu hỏi đo mức độ thủ công

1. Công ty có dùng Excel/Google Sheet để theo dõi shipment không?
   - Không dùng
   - Có, nhưng chỉ phụ trợ
   - Có, là công cụ chính

2. Để trả lời một câu hỏi trạng thái, nhân viên thường phải kiểm tra bao nhiêu nguồn?
   - 1
   - 2-3
   - 4-5
   - Trên 5

3. Kênh khách hay dùng để hỏi trạng thái là gì?
   - Email
   - Zalo
   - Điện thoại
   - Portal
   - Khác

4. Booking confirmation/cut-off được quản lý ở đâu?
   - Phần mềm
   - Excel
   - Email/PDF
   - Zalo
   - Không có cách quản lý cố định

### 14.3. Nhóm câu hỏi đo pain

Chấm điểm từ 1 đến 5, trong đó 1 là không đau, 5 là rất đau:

1. Khách hỏi trạng thái nhiều nhưng dữ liệu rải rác.
2. Lịch tàu/lịch bay thay đổi nhưng cập nhật chậm.
3. Miss hoặc suýt miss SI/VGM/CY/CFS cut-off.
4. Không nối được PO/invoice của khách với booking/container.
5. Handover giữa sales/CS/docs/ops thiếu thông tin.
6. Không có dashboard exception cho manager.
7. Phải copy/paste dữ liệu từ email/PDF/portal sang Excel.
8. Khó tạo báo cáo trạng thái theo format khách yêu cầu.

### 14.4. Nhóm câu hỏi đo nhu cầu sản phẩm

1. Bạn có muốn một công cụ tự gom trạng thái shipment từ Excel/email/PDF không?
2. Bạn có muốn hệ thống tự nhắc SI/VGM/CY/CFS cut-off không?
3. Bạn có muốn AI soạn nháp email/Zalo update cho khách không?
4. Bạn có chấp nhận AI đọc email/PDF booking nếu dữ liệu được phân quyền và bảo mật không?
5. Bạn muốn triển khai theo cách nào trước?
   - Upload Excel thủ công
   - Kết nối Google Sheet
   - Kết nối email
   - Kết nối phần mềm đang dùng
6. Công ty có sẵn sàng pilot 4-8 tuần không?
7. Mức phí pilot hợp lý mỗi tháng là bao nhiêu?
   - Dưới 2 triệu VND
   - 2-5 triệu VND
   - 5-15 triệu VND
   - Trên 15 triệu VND
   - Chưa biết

---

## 15. Giả thuyết cần kiểm chứng sau Cụm 3

### 15.1. Giả thuyết về người dùng

1. CS/Account forwarder là nhóm đau nhất vì họ là người phải trả lời khách liên tục.
2. Ops/Docs đau ở deadline và checklist, nhưng ít quan tâm AI nếu không giúp giảm lỗi cụ thể.
3. Manager muốn exception dashboard hơn là shipment list thông thường.
4. Forwarder vừa và nhỏ dễ pilot hơn forwarder lớn vì quyết định nhanh hơn và pain Excel rõ hơn.
5. Forwarder có khách FDI/nhà máy có nhu cầu báo cáo theo PO rõ hơn forwarder chỉ làm spot shipment nhỏ.

### 15.2. Giả thuyết về sản phẩm

1. MVP tốt nhất là shipment status + deadline tracker, không phải booking automation.
2. Email/PDF parser có giá trị cao nếu trích xuất được booking number, ETD/ETA, SI cut-off, VGM cut-off.
3. AI draft update có thể tạo giá trị nhanh, nhưng phải có cơ chế duyệt.
4. Mapping PO-booking-container là điểm khác biệt quan trọng so với tracking portal đơn thuần.
5. Exception inbox là tính năng manager dễ hiểu và dễ mua hơn "AI chatbot logistics" chung chung.

### 15.3. Giả thuyết về bán hàng

1. Forwarder sẵn sàng trả tiền nếu thấy giảm thời gian CS hoặc giảm lỗi miss cut-off.
2. Chủ forwarder sẽ quan tâm nếu sản phẩm giúp giữ khách và nâng chất lượng dịch vụ.
3. Pilot nên bắt đầu với 1-2 team CS/Ops, 50-100 shipment thật, không yêu cầu thay đổi toàn bộ quy trình.
4. Sản phẩm cần đi cùng onboarding dữ liệu Excel/email hiện có, nếu bắt nhập liệu lại từ đầu thì adoption thấp.

---

## 16. Tính khả thi cho Agentify

### 16.1. Khả thi về kỹ thuật

Các tính năng MVP tương đối khả thi nếu bắt đầu từ dữ liệu bán cấu trúc:

- Excel/Google Sheet shipment tracker.
- Email booking confirmation.
- PDF booking confirmation.
- Email delay/update từ carrier/co-loader.
- File B/L draft.
- Link tracking carrier do người dùng nhập.

Không cần tích hợp API toàn bộ carrier ngay ở giai đoạn đầu. Agentify có thể triển khai theo thứ tự:

```text
Giai đoạn 1: Upload/import Excel + nhập tay nhanh
Giai đoạn 2: Đọc email/PDF booking confirmation
Giai đoạn 3: Tạo deadline/checklist/exception
Giai đoạn 4: AI summary và draft reply
Giai đoạn 5: Tích hợp API/portal theo carrier hoặc phần mềm nguồn có nhu cầu cao nhất
```

### 16.2. Khả thi về dữ liệu

Dữ liệu booking có nhiều định dạng, nhưng các trường cốt lõi tương đối lặp lại:

- Booking number.
- Carrier/co-loader.
- Vessel/voyage hoặc flight number.
- POL/POD.
- ETD/ETA.
- Container type/quantity.
- SI cut-off.
- VGM cut-off.
- CY/CFS cut-off.
- Shipper/consignee/notify.

Thách thức:

- Mỗi carrier/co-loader có format booking confirmation khác nhau.
- Email tiếng Việt/tiếng Anh lẫn lộn.
- Người dùng có thể forward thiếu thread.
- File scan kém chất lượng.
- Một shipment có nhiều lần update, cần biết update nào mới nhất.

Cách xử lý:

- Bắt đầu với 3-5 template phổ biến từ khách pilot.
- Cho người dùng xác nhận dữ liệu trích xuất trước khi lưu.
- Luôn lưu nguồn của dữ liệu: lấy từ email nào, file nào, thời điểm nào.
- Không để AI tự quyết định thông tin pháp lý nhạy cảm.

### 16.3. Khả thi về thị trường

Thị trường có dấu hiệu phù hợp vì:

- XNK Việt Nam có quy mô lớn.
- Forwarder SME nhiều và phân mảnh.
- Công cụ hiện tại rải rác.
- Visibility và control tower đã được chứng minh bởi các sản phẩm toàn cầu.
- Sản phẩm local, nhẹ, triển khai nhanh có thể có lợi thế.

Rủi ro:

- Forwarder có thể ngại trả tiền nếu chỉ xem đây là công cụ phụ.
- Dữ liệu không chuẩn làm triển khai tốn công.
- Nếu không tích hợp sâu, người dùng có thể thấy phải nhập liệu thêm.
- Nếu làm quá rộng, sản phẩm dễ thành TMS nửa vời.

Cách giảm rủi ro:

- Chọn một workflow rất cụ thể: export ocean FCL booking + cut-off + customer update.
- Chỉ cần chứng minh giảm thời gian CS và giảm miss deadline.
- Tích hợp vào Excel/email hiện có.
- Pilot ngắn, đo chỉ số rõ.

---

## 17. Kết luận sơ bộ Cụm 3

Cụm 3 là một trong những cụm có cơ hội rõ nhất cho Agentify vì forwarder là nơi dữ liệu shipment tập trung tự nhiên nhưng lại bị phân mảnh mạnh. Forwarder vừa và nhỏ thường phải làm việc với nhiều carrier, co-loader, khách hàng, chứng từ, email, Excel và Zalo. Họ không nhất thiết muốn thay toàn bộ phần mềm nghiệp vụ, nhưng rất cần giảm thời gian tra cứu và giảm lỗi trong các việc lặp lại hằng ngày.

Hướng đi nên ưu tiên:

1. Không làm portal booking cạnh tranh với INTTRA/WebCargo.
2. Không làm core forwarder ERP cạnh tranh trực diện với CargoWise/Magaya/Winta ở giai đoạn đầu.
3. Làm lớp CS/Ops copilot cho forwarder: shipment timeline, deadline tracker, exception inbox, AI status summary, draft customer update.
4. Bắt đầu bằng dữ liệu Excel/email/PDF, sau đó mới tích hợp API theo nhu cầu.
5. Chọn forwarder vừa và nhỏ có nhiều shipment đường biển, nhiều khách hỏi trạng thái, nhiều Excel/email/Zalo làm ICP pilot.

Nếu kiểm chứng được rằng mỗi CS mất nhiều thời gian mỗi ngày để trả lời trạng thái và forwarder từng miss/suýt miss cut-off, Cụm 3 có thể là một hướng MVP mạnh hơn cả việc bán trực tiếp cho chủ hàng.

---

## 18. Nguồn tham khảo

1. National Statistics Office of Vietnam. "Press release: Social-economic situation in the fourth quarter and 2025." https://www.nso.gov.vn/en/data-and-statistics/2026/01/press-release-social-economic-situation-in-the-fourth-quarter-and-2025/
2. Vietnam Logistics Forum 2025, Ministry of Industry and Trade. https://vlf.logistics.gov.vn/en
3. Logistics.gov.vn. "Viet Nam Govt approves logistics services development strategy towards 2025." https://logistics.gov.vn/vietnam-gov-t-approves-logistics-services-development-strategy-towards-2025
4. e2open. "INTTRA by e2open." https://www.e2open.com/network/inttra/
5. CargoWise. "CargoWise logistics software." https://www.cargowise.com/
6. Magaya. "Logistics software for freight forwarders." https://www.magaya.com/
7. Descartes. "Global Logistics Network." https://www.descartes.com/solutions/global-logistics-network
8. Freightos WebCargo. https://www.freightos.com/webcargo/
9. Winta Logistics. https://www.forwarder.vn/
10. Maersk. "Demurrage and detention." https://www.maersk.com/support/faqs/demurrage-and-detention
11. Maersk. "Verified Gross Mass." https://www.maersk.com/support/faqs/verified-gross-mass
12. Maersk. "Shipping instructions." https://www.maersk.com/support/faqs/shipping-instructions
13. project44. "Ocean visibility." https://www.project44.com/platform/visibility/ocean/
14. FourKites. "About FourKites." https://www.fourkites.com/about/

---

## 19. Tóm tắt compact sau Cụm 3

Cụm 3 đã nghiên cứu forwarder, booking quốc tế, hãng tàu và hãng bay. Insight chính: forwarder là điểm gom thông tin tự nhiên của lô hàng nhưng dữ liệu bị phân mảnh giữa email, Excel, Zalo, carrier portal, booking confirmation PDF, co-loader, chứng từ và tracking. Pain lớn nhất là CS/Ops phải trả lời khách liên tục, lịch tàu/lịch bay thay đổi, rủi ro roll cargo, miss SI/VGM/CY/CFS cut-off, và không nối được PO/invoice của khách với booking/container/HBL/MBL.

Các đối thủ/sản phẩm liên quan gồm CargoWise, Magaya, Descartes, INTTRA/e2open, WebCargo/Freightos, Winta Logistics, carrier portals, project44 và FourKites. Điểm chung: các sản phẩm lớn giải quyết booking/network/ERP/visibility nhưng thường nặng, enterprise, hoặc không tối ưu cho forwarder SME Việt Nam dùng Excel/email/Zalo. Khoảng trống cho Agentify là lớp trung gian nhẹ, đọc dữ liệu hiện có, tạo timeline, deadline tracker, exception inbox, AI summary và draft customer update.

MVP đề xuất cho Cụm 3: CS/Ops copilot cho forwarder xuất nhập khẩu đường biển, bắt đầu với FCL export/import, dữ liệu từ Excel/email/PDF booking confirmation. Tính năng chính: shipment workspace, import Excel tracker, email/PDF parser, deadline checklist, exception inbox, AI status summary, draft customer update, mapping PO-booking-container-HBL/MBL. Không nên làm ngay: tự động booking, tự gửi SI/VGM, tự phát hành B/L, tự gửi thông tin nhạy cảm cho khách không cần duyệt, thay thế toàn bộ phần mềm forwarder.

Giả thuyết cần kiểm chứng sau Cụm 3: CS/Account forwarder là nhóm đau nhất; deadline tracker và customer update tạo ROI rõ; forwarder SME dễ pilot hơn forwarder lớn; mapping PO-booking-container là điểm khác biệt quan trọng; pilot nên đo thời gian trả lời khách, số nguồn phải check, số deadline miss/suýt miss và số shipment có risk được phát hiện sớm.
