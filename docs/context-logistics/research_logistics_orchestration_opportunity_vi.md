# Nghiên cứu cơ hội: Agentify như lớp điều phối trung gian cho logistics Việt Nam

**Cập nhật:** 02/06/2026
**Mục tiêu:** đánh giá gợi ý mở rộng Agentify sang logistics công nghiệp, nơi doanh nghiệp đang dùng nhiều hệ thống rời rạc cho hải quan, cảng, vận tải, kho bãi và kế toán.

**Phạm vi nghiên cứu:**

- Thị trường Việt Nam, ưu tiên dữ liệu công bố tới ngày 02/06/2026.
- Trọng tâm là logistics B2B, xuất nhập khẩu, forwarder và 3PL; e-commerce last-mile được dùng như một demand driver phụ.
- Nguồn ưu tiên: Chính phủ, Bộ Công Thương, Cục Thống kê, World Bank, báo cáo ngành và website chính thức của nhà cung cấp.
- TAM/SAM/SOM phần mềm là mô hình bottom-up theo giả định, không phải số liệu doanh thu ngành.

## 1. Kết luận ngắn

Hướng đi này có cơ sở thực tế, nhưng cần định vị chính xác:

> Agentify không nên xây thêm một ERP/TMS/WMS thay thế các hệ thống hiện có. Agentify nên là lớp orchestration và AI execution nằm phía trên stack logistics hiện tại: kết nối dữ liệu, hợp nhất trạng thái lô hàng, phát hiện ngoại lệ và kích hoạt workflow xuyên hệ thống với human approval khi cần.

Nhu cầu tồn tại vì ba lý do:

1. **Ngành lớn và còn dư địa tối ưu chi phí.** Chi phí logistics tại Việt Nam vẫn khoảng 16-17% GDP; Chiến lược quốc gia 2025-2035 đặt mục tiêu giảm xuống 12-15% GDP.[1][2]
2. **Doanh nghiệp đã số hóa từng phần nhưng chưa đạt mức điều phối đầu-cuối.** Báo cáo Logistics Việt Nam 2025 ghi nhận 90,5% doanh nghiệp logistics trong khảo sát vẫn ở cấp độ 1-2; chỉ 9,5% đạt từ mức trực quan hóa trở lên.[3]
3. **Các module đã tồn tại và tiếp tục phân mảnh.** Hải quan, cảng, kho, vận tải, hóa đơn và kế toán có hệ thống riêng. Nhu cầu không đơn thuần là mua thêm phần mềm, mà là làm cho các hệ thống trao đổi dữ liệu và biến sự kiện thành hành động.

Tuy nhiên, cơ hội **không phải thị trường trống**. Việt Nam đã có VASSCM/VNACCS, ePort, Port Community System, các nền tảng OMS/WMS/TMS và các nhà cung cấp tích hợp. Agentify chỉ có lợi thế nếu chọn một workflow hẹp, triển khai nhanh hơn và chứng minh ROI rõ hơn so với dự án tích hợp truyền thống.

## 2. Bối cảnh thị trường

### 2.1. Logistics là bài toán đủ lớn

- Bộ Công Thương cho biết chi phí logistics ở Việt Nam trung bình ở mức **16-17% GDP**, cao hơn Singapore (8%), Nhật Bản (11%), Malaysia và Indonesia (13%).[1]
- Tại Diễn đàn Logistics Việt Nam 2025, Bộ trưởng Bộ Công Thương nhận định chi phí còn cao, liên kết vùng và kết nối hạ tầng chưa đồng bộ; chuyển đổi số mới ở giai đoạn đầu và còn thiếu cơ sở dữ liệu dùng chung.[4]
- Quyết định 2229/QĐ-TTg ngày 09/10/2025 đặt mục tiêu giai đoạn 2025-2035:

| Chỉ tiêu | Mục tiêu 2025-2035 |
|---|---:|
| Tỷ trọng giá trị tăng thêm của logistics trong GDP | 5-7% |
| Tăng trưởng ngành hằng năm | 12-15% |
| Doanh nghiệp thuê ngoài dịch vụ logistics | 70-80% |
| Chi phí logistics/GDP | 12-15% |
| Doanh nghiệp logistics dùng giải pháp chuyển đổi số | 80% |

Nguồn: Quyết định 2229/QĐ-TTg và bản tổng hợp nội dung quyết định.[2][5]

### 2.2. E-commerce là động lực, nhưng không phải toàn bộ cơ hội

Thương mại điện tử tiếp tục tạo áp lực lớn lên fulfillment và last-mile:

- Bộ Công Thương ghi nhận thị trường thương mại điện tử Việt Nam năm 2024 vượt **25 tỷ USD**, tăng khoảng **20%**, chiếm **9%** tổng mức bán lẻ hàng hóa và doanh thu dịch vụ tiêu dùng.[6]
- Theo VCCI dẫn dữ liệu Metric, GMV năm 2025 trên Shopee, TikTok Shop, Lazada và Tiki đạt khoảng **16,35 tỷ USD**, tăng **34,75%** so với năm trước.[7]

Nhưng gợi ý trong ảnh nhắm tới một bài toán rộng hơn: logistics phục vụ doanh nghiệp sản xuất, xuất nhập khẩu và 3PL/4PL. Đây là nơi có nhiều điểm giao giữa chứng từ, hải quan, cảng, trucking, kho bãi và tài chính. Agentify có thể mở rộng từ DNA “AI execution layer” hiện tại sang nhóm workflow này mà không bị giới hạn vào e-commerce.

### 2.3. Market snapshot

Số liệu thị trường cần được đọc theo hai lớp:

- **Thị trường dịch vụ logistics:** doanh thu từ vận tải, kho bãi, giao nhận, fulfillment và các dịch vụ liên quan.
- **Thị trường phần mềm orchestration:** phần ngân sách mà doanh nghiệp sẵn sàng chi để giảm chi phí vận hành và nâng chất lượng dịch vụ. Đây mới là thị trường trực tiếp của Agentify.

| Chỉ số | Số liệu gần nhất tìm được | Hàm ý |
|---|---:|---|
| Quy mô thị trường dịch vụ logistics Việt Nam | 45-50 tỷ USD | Ngành đủ lớn để một lớp tối ưu vận hành tạo giá trị đáng kể |
| Tăng trưởng logistics bình quân | 14-16%/năm | Nhu cầu xử lý volume và độ phức tạp tăng nhanh |
| Tỷ lệ so với GDP | Khoảng 10% GDP | Logistics là hạ tầng kinh tế, không phải một ngách phần mềm nhỏ |
| Kim ngạch xuất nhập khẩu hàng hóa 2025 | 930,05 tỷ USD, tăng 18,2% | Luồng hàng quốc tế tăng tạo nhu cầu customs, port, trucking và visibility |
| Giá trị tăng thêm của vận tải và kho bãi 2025 | Tăng 10,99% | Hoạt động vận hành thực tế tiếp tục mở rộng |
| Tổng số doanh nghiệp logistics | Khoảng 34.000-35.000 | Có một customer universe đủ rộng |
| SME trong ngành | Khoảng 95% | Phần lớn khách hàng không phù hợp với dự án IT nặng |
| Doanh nghiệp logistics trong nước | Khoảng 88-90% | Nhu cầu giải pháp phù hợp quy trình và ngân sách Việt Nam |
| Tỷ lệ có năng lực 3PL | Khoảng 25-30% | Nhóm bắt đầu có nhu cầu điều phối đa dịch vụ |
| Tỷ lệ phát triển tới 4PL | Khoảng 3-5% | Năng lực tích hợp và điều phối chuỗi còn hiếm |

Nguồn: Bộ Công Thương, Cục Thống kê và Báo cáo Logistics Việt Nam 2025.[3][4][17]

Điểm cần lưu ý: **45-50 tỷ USD không phải TAM của Agentify**. Đây là tổng quy mô dịch vụ logistics. TAM phần mềm phải được ước lượng từ số lượng tài khoản mục tiêu và mức chi tiêu phần mềm hằng năm.

### 2.4. Cấu trúc doanh nghiệp: thị trường lớn nhưng phân mảnh

Báo cáo Logistics Việt Nam 2025 ước tính Việt Nam có khoảng **34.000-35.000 doanh nghiệp logistics**. Trong đó:

- khoảng **95%** là SME;
- khoảng **88-90%** là doanh nghiệp trong nước;
- SME thường tập trung vào các khâu đơn lẻ như vận tải nội địa, kho bãi nhỏ và đại lý giao nhận;
- dịch vụ tích hợp quy mô lớn vẫn chủ yếu do doanh nghiệp lớn hoặc doanh nghiệp FDI đảm nhiệm.[3]

Trong 10 tháng đầu năm 2025, nhóm vận tải và kho bãi có **9.343 doanh nghiệp thành lập mới**, vốn đăng ký **91.466 tỷ đồng**; vốn đăng ký tăng **215,7%** so với cùng kỳ năm trước.[3]

Cấu trúc này tạo ra hai sự thật đồng thời:

1. **Thị trường đủ phân mảnh để xuất hiện nhu cầu kết nối.** Nhiều bên tham gia một lô hàng, mỗi bên dùng một công cụ và quy trình riêng.
2. **Không thể bán một triển khai enterprise đắt đỏ cho toàn thị trường.** Phần lớn doanh nghiệp cần onboarding ngắn, connector tái sử dụng được và giá trị đo được trong vài tuần.

### 2.5. Động lực nhu cầu

#### Xuất nhập khẩu và sản xuất

Tổng kim ngạch xuất nhập khẩu hàng hóa năm 2025 đạt **930,05 tỷ USD**, tăng **18,2%** so với năm 2024. Xuất khẩu đạt 475,04 tỷ USD; nhập khẩu đạt 455,01 tỷ USD.[18]

FDI tiếp tục củng cố vai trò manufacturing hub của Việt Nam:

- tổng vốn FDI đăng ký năm 2025 đạt **38,42 tỷ USD**;
- vốn FDI thực hiện đạt **27,62 tỷ USD**, cao nhất trong 5 năm;
- chế biến, chế tạo chiếm **56,5%** vốn đăng ký mới và **82,8%** vốn thực hiện.[17]

**Hàm ý:** nhu cầu không chỉ nằm ở last-mile. Các luồng B2B xuất nhập khẩu, nguyên vật liệu, linh kiện và thành phẩm tạo ra nhiều workflow liên quan tới chứng từ, customs, cảng, trucking và kho.

#### Outsourcing

Chiến lược quốc gia đặt mục tiêu nâng tỷ lệ doanh nghiệp thuê ngoài dịch vụ logistics lên **70-80%** trong giai đoạn 2025-2035.[2]

Báo cáo Logistics Việt Nam 2025 cho thấy 3PL là mô hình phổ biến nhất trong mẫu doanh nghiệp sản xuất-thương mại được khảo sát, chiếm **30,8%**; trong khi 4PL và 5PL mới lần lượt ở mức **10,3%** và **5,1%**.[3]

**Hàm ý:** khi shipper thuê ngoài nhiều hơn, nhu cầu visibility và SLA monitoring tăng. Shipper không chỉ cần biết ai vận chuyển hàng mà còn cần biết lô hàng đang ở đâu, ngoại lệ nào chưa được xử lý và bên nào chịu trách nhiệm.

#### Chuyển đổi số

Chiến lược quốc gia đặt mục tiêu **80%** doanh nghiệp logistics sử dụng giải pháp chuyển đổi số trong giai đoạn 2025-2035.[2]

Báo cáo Logistics Việt Nam 2025 dẫn khảo sát của Bộ Công Thương năm 2024: doanh nghiệp ứng dụng công nghệ số có hiệu suất giao hàng cao hơn **25%** và tiết kiệm khoảng **15-20%** chi phí vận hành so với doanh nghiệp truyền thống.[3]

Các chỉ số này không chứng minh một sản phẩm cụ thể sẽ tạo ra mức cải thiện tương tự. Nhưng chúng cho thấy buyer có lý do kinh tế rõ ràng để thử nghiệm công nghệ nếu pilot đo được ROI.

#### Chuyển đổi xanh và yêu cầu dữ liệu

Green logistics không chỉ là câu chuyện phương tiện điện. Doanh nghiệp xuất khẩu ngày càng cần dữ liệu về tuyến vận chuyển, phương tiện, phát thải và truy xuất để làm việc với đối tác quốc tế. VLA nhận định việc áp dụng CNTT để tối ưu chuỗi cung ứng là thách thức với SME do yêu cầu kỹ năng và công nghệ.[19]

**Hàm ý:** shipment timeline và event model được xây cho operations có thể trở thành nền dữ liệu phục vụ carbon reporting về sau. Đây là expansion path, không nên là MVP.

### 2.6. Vị thế quốc tế và áp lực cạnh tranh

Việt Nam vẫn là một thị trường logistics hấp dẫn, nhưng chưa dẫn đầu khu vực:

| Chỉ số | Kết quả | Diễn giải |
|---|---:|---|
| World Bank LPI 2023 | Hạng 43/139 | Chỉ số đo năng lực customs, hạ tầng, vận chuyển quốc tế, chất lượng dịch vụ, track-and-trace và tính đúng hạn |
| Agility Emerging Markets Index 2025 | Hạng 10/50, điểm 5,52 | Việt Nam thuộc top 10 thị trường mới nổi |
| Agility Emerging Markets Index 2026 | Hạng 11/50, điểm 5,44 | Giảm một bậc; vẫn đứng sau Malaysia, Indonesia và Thái Lan trong nhóm ASEAN được xếp trên |

Nguồn: World Bank và Agility.[20][21][22]

**Hàm ý:** Việt Nam có tăng trưởng và volume, nhưng vẫn có khoảng trống về hiệu quả. Agentify nên định vị là công cụ cải thiện khả năng thực thi ở cấp doanh nghiệp, không claim giải quyết toàn bộ bài toán hạ tầng quốc gia.

### 2.7. Các phân khúc nhu cầu

| Phân khúc | Pain chính | Mức phù hợp với Agentify giai đoạn đầu | Lý do |
|---|---|---:|---|
| Forwarder xuất nhập khẩu tầm trung | Chứng từ, customs, cảng, trucking, deadline và handover | Rất cao | Workflow nhiều bước, dữ liệu phân tán, ROI dễ đo |
| 3PL tầm trung | Theo dõi SLA, điều phối vendor, exception handling, báo cáo cho shipper | Rất cao | Có nhu cầu tiến gần năng lực 4PL nhưng thiếu đội IT lớn |
| Shipper sản xuất và xuất nhập khẩu | Visibility, kiểm soát nhà cung cấp, ETA, chi phí phát sinh | Cao | Có pain rõ nhưng thường cần phối hợp với 3PL để lấy dữ liệu |
| Trucking fleet | Điều xe, GPS, route, chứng từ giao nhận | Trung bình | TMS và route optimization đã có nhiều đối thủ |
| Kho và fulfillment | Nhập-xuất-tồn, picking, packing, SLA | Trung bình | WMS là thị trường riêng; chỉ nên tham gia qua connector |
| Last-mile e-commerce | COD, tracking, giao thất bại, hoàn hàng | Trung bình | Volume cao nhưng cạnh tranh mạnh và margin thấp |
| Doanh nghiệp lớn/FDI | Control tower, tích hợp sâu, compliance | Thấp trong giai đoạn đầu | Deal lớn nhưng chu kỳ bán dài, yêu cầu bảo mật và tích hợp cao |
| Cảng, ICD, depot | Cổng dịch vụ, phương tiện, container, billing | Thấp trong giai đoạn đầu | Tích hợp phức tạp, phụ thuộc quan hệ và hệ thống hiện hữu |

### 2.8. Buyer map và trigger mua hàng

| Vai trò | Điều họ quan tâm | Trigger mua hàng |
|---|---|---|
| Chủ doanh nghiệp / CEO | Biên lợi nhuận, khả năng scale, giữ khách hàng lớn | Volume tăng nhưng không muốn tăng headcount tương ứng |
| Operations manager | SLA, backlog, bàn giao ca, lỗi nhân sự | Trễ lô hàng, phí lưu container hoặc khách hàng phàn nàn lặp lại |
| Customer service / account manager | Trả lời trạng thái nhanh, giảm hỏi nội bộ | Mất nhiều thời gian gọi ops để cập nhật cho shipper |
| Finance / kế toán | Đối soát, invoice, phụ phí, công nợ | Lệch dữ liệu giữa vận hành và hóa đơn |
| IT / chuyển đổi số | API, bảo mật, phân quyền, audit | Đã có nhiều phần mềm nhưng thiếu tích hợp |

Một buyer có khả năng mua sớm thường có các dấu hiệu:

- đội operations từ 5-30 người;
- xử lý hàng trăm lô hàng hoặc container mỗi tháng;
- dùng Excel, email và Zalo song song với phần mềm chuyên dụng;
- có ít nhất 2-3 nguồn dữ liệu cần tra cứu;
- từng phát sinh phí hoặc mất thời gian do chậm xử lý ngoại lệ;
- có một operations manager chịu trách nhiệm KPI và sẵn sàng champion pilot.

## 3. Thực trạng số hóa: có nhiều hệ thống nhưng độ trưởng thành còn thấp

### 3.1. Phần lớn doanh nghiệp mới ở giai đoạn số hóa ban đầu

Báo cáo Logistics Việt Nam 2025 tổng hợp lại mức độ trưởng thành số như sau:[3]

| Cấp độ | Ý nghĩa | Tỷ lệ doanh nghiệp khảo sát |
|---|---|---:|
| 1-2 | Tin học hóa và kết nối | 90,5% |
| 3 | Trực quan hóa, theo dõi thời gian thực | 5,0% |
| 4 | Minh bạch hóa nguyên nhân và xu hướng | 2,2% |
| 5 | Có khả năng dự báo | 1,9% |
| 6 | Có khả năng thích ứng, tự động ra quyết định | 0,4% |

Báo cáo cũng nhận định doanh nghiệp đạt cấp độ 3 trở lên chủ yếu là doanh nghiệp lớn hoặc FDI; phần lớn doanh nghiệp nội địa vẫn ở giai đoạn đầu.[3]

Đây là tín hiệu phù hợp với một sản phẩm trung gian: nhiều doanh nghiệp đã có dữ liệu số nhưng chưa đủ năng lực xây control tower, tự động hóa ngoại lệ hoặc triển khai AI nội bộ.

### 3.2. Năng lực 3PL đã phát triển, nhưng 4PL còn mỏng

Báo cáo Logistics Việt Nam 2025 ước tính khoảng **25-30%** doanh nghiệp logistics trong nước có khả năng cung cấp dịch vụ 3PL, nhưng chỉ khoảng **3-5%** phát triển tới cấp độ 4PL.[3]

Đây là khoảng trống quan trọng:

- 3PL thực hiện vận tải, kho bãi, fulfillment hoặc giao nhận.
- 4PL điều phối nhiều nhà cung cấp và tối ưu toàn chuỗi.
- Agentify không cần trở thành 4PL vận hành tài sản. Sản phẩm có thể cung cấp một phần năng lực số giúp 3PL vận hành giống 4PL hơn: visibility, workflow orchestration, SLA monitoring và exception handling.

### 3.3. Rào cản chính không chỉ là công nghệ

Nghiên cứu học thuật năm 2023 khảo sát 258 doanh nghiệp logistics tại Việt Nam xác định năm nhóm yếu tố ảnh hưởng đến chuyển đổi số: vai trò quản lý, nhân lực, hạ tầng CNTT, chi phí đầu tư và dịch vụ hỗ trợ chuyển đổi số.[8]

Báo cáo Logistics Việt Nam 2025 cũng ghi nhận:

- chi phí đầu tư ban đầu cao là khó khăn phổ biến;
- SME thường thiếu nhân lực IT;
- doanh nghiệp cần tư vấn chọn công nghệ phù hợp với quy mô và đặc thù;
- lựa chọn đối tác am hiểu vận hành quan trọng hơn chọn giải pháp đắt nhất.[3]

**Suy luận sản phẩm:** Agentify cần bán một lộ trình triển khai ngắn, theo workflow và ROI; không nên bán một chương trình “chuyển đổi số toàn diện” ngay từ đầu.

## 4. Stack hiện tại và điểm đứt gãy

### 4.1. Các lớp hệ thống đã tồn tại

| Lớp nghiệp vụ | Ví dụ hệ thống hiện có | Vai trò |
|---|---|---|
| Hải quan | VNACCS/VCIS, VASSCM | Khai báo, thông quan, giám sát hàng vào-ra-tồn tại cảng/kho/bãi |
| Cảng | ePort, SmartGate, hệ thống khai thác cảng | Đăng ký dịch vụ, giao nhận container, thanh toán, hóa đơn, cổng ra vào |
| Port community | PORTNET PCS, Vietnam Smarthub Logistics | Kết nối doanh nghiệp cảng, hãng tàu, vận tải, kho bãi và dịch vụ liên quan |
| Vận tải | TMS, GPS, app tài xế, nền tảng trucking | Kế hoạch xe, điều phối, theo dõi, tối ưu tuyến |
| Kho | WMS | Nhập-xuất-tồn, vị trí hàng, picking/packing |
| Đơn hàng | OMS, ERP, CRM | Đơn hàng, khách hàng, tồn kho, kế hoạch giao nhận |
| Tài chính | PM kế toán, e-invoice, cổng thanh toán | Chi phí, doanh thu, công nợ, hóa đơn |
| Điều hành | Excel, email, Zalo, điện thoại | Xử lý ngoại lệ và phối hợp liên phòng ban |

Ví dụ:

- Tổng cục Hải quan đã triển khai VASSCM để kết nối và trao đổi thông tin với doanh nghiệp kinh doanh cảng, sân bay, kho, bãi; kế hoạch triển khai yêu cầu đánh giá phần mềm chuyên dụng hay Excel, khả năng nâng cấp và khả năng kết nối hệ thống doanh nghiệp với VASSCM.[9]
- VIMC giới thiệu ePort hỗ trợ giao nhận điện tử, thông quan điện tử, hóa đơn và thanh toán điện tử; công nghệ Vietnam Smarthub Logistics hướng tới kết nối cảng, hãng tàu, doanh nghiệp thương mại và cơ quan nhà nước.[10]
- PORTNET PCS công bố các nhóm dịch vụ trực tuyến cho cảng biển, container, vận tải, hãng tàu, kho bãi, tài chính và bảo hiểm.[11]

### 4.2. Điểm đứt gãy không nằm trong từng module

Một lô hàng có thể đi qua chuỗi:

```text
PO/booking
  -> forwarder / 3PL
  -> hãng tàu hoặc hãng bay
  -> khai báo hải quan
  -> cảng / ICD / depot
  -> trucking
  -> kho
  -> giao nhận
  -> đối soát chi phí, hóa đơn, công nợ
```

Từng bước có thể đã được số hóa. Nhưng đội vận hành vẫn phải:

- nhập lại dữ liệu giữa hệ thống;
- tra cứu nhiều màn hình để biết trạng thái thực;
- gọi điện hoặc nhắn Zalo khi thiếu chứng từ, trễ cut-off, trễ xe hoặc lệch chi phí;
- theo dõi deadline thủ công;
- tổng hợp báo cáo và đối soát từ nhiều nguồn;
- xử lý ngoại lệ bằng kinh nghiệm của từng nhân sự.

Nghiên cứu học thuật cũng nêu rõ: triển khai các phần mềm rời rạc là chưa đủ; doanh nghiệp cần phần mềm quản lý đơn, kho và vận tải kết nối hạ tầng thông tin, cung cấp dữ liệu thời gian thực và cho phép tra cứu trạng thái.[8]

**Suy luận sản phẩm:** giá trị lớn nhất của lớp trung gian là “resolve exceptions across systems”, không chỉ là dashboard gom dữ liệu.

## 5. Thị trường đã có gì và Agentify còn chỗ nào?

### 5.1. Một số nhóm giải pháp hiện có

| Nhóm | Ví dụ | Điểm mạnh công khai | Khoảng trống Agentify cần kiểm chứng |
|---|---|---|---|
| Cảng và PCS | ePort/VIMC, PORTNET, VSL | Dịch vụ cảng, chứng từ, thanh toán, kết nối cộng đồng cảng | Khả năng điều phối xuyên ERP-TMS-WMS-hải quan-kế toán tới đâu? |
| Suite OMS/WMS/TMS | LogiTrack, TigerWMS, Infolog | Một nền tảng quản lý đơn, kho, vận tải; API và tích hợp | Chi phí thay thế stack cũ và thời gian triển khai với SME/3PL vừa? |
| Tối ưu vận tải | Abivin vRoute | TMS, route optimization, theo dõi thời gian thực | Phạm vi ngoài vận tải và xử lý chứng từ/ngoại lệ liên phòng ban? |
| Mạng lưới trucking | LOGIVAN | Freight network, tự động hóa và tối ưu vận tải | Phạm vi ngoài trucking? |
| 3PL tích hợp | VELA và doanh nghiệp logistics lớn | Dịch vụ end-to-end gắn với năng lực vận hành | Có trung lập giữa nhiều nhà cung cấp hay gắn với dịch vụ của chính họ? |

Nguồn sản phẩm: website chính thức của các nhà cung cấp.[10][11][12][13][14][15][16]

### 5.2. Không nên claim “chưa có ai làm”

Thị trường đã có:

- sản phẩm all-in-one;
- module có API;
- nền tảng tích hợp;
- dịch vụ 3PL/4PL;
- giải pháp cảng và hải quan;
- doanh nghiệp lớn tự đầu tư control tower.

Vì vậy, thông điệp “Việt Nam chưa có phần mềm quản lý full các dịch vụ” là quá rộng và dễ bị phản biện.

Thông điệp có cơ sở hơn:

> SME logistics và 3PL tầm trung đã có nhiều công cụ theo module nhưng vẫn thiếu một lớp điều phối nhẹ, triển khai nhanh, làm việc trên stack hiện tại và tự động xử lý các workflow ngoại lệ có tần suất cao.

### 5.3. Market map cạnh tranh

Agentify sẽ cạnh tranh với nhiều cách giải quyết vấn đề, không chỉ với các startup AI:

| Nhóm thay thế | Buyer chọn khi nào? | Điểm mạnh | Điểm yếu tạo cơ hội cho Agentify |
|---|---|---|---|
| Excel + email + Zalo + nhân sự ops | Volume còn thấp hoặc chưa muốn đầu tư | Linh hoạt, quen thuộc, gần như không có chi phí license | Khó audit, phụ thuộc cá nhân, không scale tốt |
| Module riêng lẻ: TMS, WMS, OMS, FMS | Pain nằm rõ trong một phòng ban | Nghiệp vụ sâu, ổn định | Không tự giải quyết handover xuyên hệ thống |
| ERP hoặc suite logistics all-in-one | Doanh nghiệp muốn chuẩn hóa toàn bộ quy trình | Dữ liệu tập trung, phạm vi rộng | Triển khai dài, migration khó, dễ quá nặng với SME |
| Port community và nền tảng công | Workflow gắn với hải quan hoặc cảng | Có tính hệ sinh thái, dữ liệu chuyên ngành | Không thay thế lớp điều phối nội bộ của từng doanh nghiệp |
| Dự án tích hợp custom | Doanh nghiệp lớn có ngân sách | Bám sát hệ thống hiện hữu | Chi phí cao, phụ thuộc đội triển khai, khó productize |
| 3PL/4PL tích hợp | Shipper muốn thuê ngoài cả vận hành | Đầu-cuối, có đội thực thi | Có thể khóa khách hàng vào một nhà cung cấp |
| Agentify Logistics Ops Layer | Doanh nghiệp đã có stack nhưng thiếu orchestration | Overlay nhẹ, tập trung ngoại lệ, có AI execution | Chỉ thắng nếu connector và playbook triển khai đủ nhanh |

### 5.4. Wedge cạnh tranh khả thi

Agentify không nên cạnh tranh ngay ở độ rộng chức năng. Wedge tốt hơn là:

> Cài một lớp exception control tower trong 2-4 tuần, không thay stack hiện tại, giảm thời gian theo dõi và xử lý các lô hàng có vấn đề.

Điểm khác biệt cần chứng minh qua pilot:

1. **Time-to-value:** connector đầu tiên hoạt động trong vài tuần, không phải vài tháng.
2. **Exception-first:** ưu tiên danh sách việc cần xử lý thay vì dashboard nhiều biểu đồ.
3. **Human-in-the-loop:** AI đề xuất và chạy workflow có guardrail; không tạo rủi ro pháp lý.
4. **Vietnam workflow fit:** bám vào Excel, email, Zalo và quy trình customs/cảng thực tế.
5. **Overlay architecture:** không bắt khách hàng bỏ ERP, TMS hoặc WMS đang dùng.

## 6. Ước lượng TAM, SAM và SOM

### 6.1. Phương pháp

Không tìm thấy báo cáo công khai đáng tin cậy tách riêng quy mô thị trường phần mềm logistics orchestration tại Việt Nam. Vì vậy, phần này sử dụng **bottom-up scenario analysis**, không phải số liệu thị trường đã được xác nhận.

Công thức:

```text
Doanh thu thị trường phần mềm hằng năm
  = số tài khoản mục tiêu
  x doanh thu trung bình mỗi tài khoản mỗi năm (ARPA)
```

Mức giá dưới đây là giả định nghiên cứu để kiểm tra độ lớn cơ hội. Chưa phải đề xuất pricing.

### 6.2. TAM: toàn bộ doanh nghiệp cung cấp dịch vụ logistics

Báo cáo Logistics Việt Nam 2025 ước tính có khoảng **34.000-35.000 doanh nghiệp logistics**.[3]

Nếu một sản phẩm logistics operations có ARPA từ **36-240 triệu đồng/năm** tùy quy mô:

| Kịch bản | Số tài khoản | ARPA/năm | TAM ước lượng |
|---|---:|---:|---:|
| Thấp | 34.000 | 36 triệu đồng | 1.224 tỷ đồng |
| Cơ sở | 34.500 | 120 triệu đồng | 4.140 tỷ đồng |
| Cao | 35.000 | 240 triệu đồng | 8.400 tỷ đồng |

Quy đổi thô theo tỷ giá nghiên cứu 25.000 đồng/USD: khoảng **49-336 triệu USD/năm**.

TAM này mang tính trần lý thuyết. Nhiều doanh nghiệp siêu nhỏ không cần orchestration hoặc không đủ ngân sách.

### 6.3. SAM: forwarder và 3PL tầm trung có workflow đa hệ thống

Beachhead thực tế hẹp hơn:

- forwarder hoặc 3PL;
- có operations team;
- dùng nhiều hệ thống hoặc nhiều file;
- xử lý volume đủ lớn;
- có pain về ngoại lệ, SLA hoặc handover;
- có thể tích hợp qua API, file hoặc email mà không cần dự án enterprise.

Chưa có dữ liệu công khai đủ chi tiết để đếm chính xác nhóm này. Tạm giả định **3-8%** trong 34.000-35.000 doanh nghiệp logistics phù hợp với ICP ban đầu, tương đương khoảng **1.000-2.800 tài khoản**.

| Kịch bản | Tài khoản phù hợp ICP | ARPA/năm | SAM ước lượng |
|---|---:|---:|---:|
| Thấp | 1.000 | 60 triệu đồng | 60 tỷ đồng |
| Cơ sở | 1.800 | 120 triệu đồng | 216 tỷ đồng |
| Cao | 2.800 | 180 triệu đồng | 504 tỷ đồng |

Quy đổi thô: khoảng **2,4-20,2 triệu USD/năm**.

### 6.4. SOM: mục tiêu có thể đạt trong 3 năm

SOM phải phản ánh năng lực bán hàng và triển khai của một startup, không chỉ nhu cầu lý thuyết:

| Kịch bản | Khách hàng trả phí sau 3 năm | ARPA/năm | ARR |
|---|---:|---:|---:|
| Thận trọng | 30 | 60 triệu đồng | 1,8 tỷ đồng |
| Cơ sở | 80 | 120 triệu đồng | 9,6 tỷ đồng |
| Tích cực | 150 | 180 triệu đồng | 27 tỷ đồng |

Quy đổi thô: khoảng **72.000-1,08 triệu USD ARR**.

Để đạt kịch bản cơ sở, Agentify cần:

- một playbook lặp lại được;
- connector tái sử dụng được cho phần lớn khách hàng;
- thời gian onboarding không quá 2-4 tuần;
- gross margin phần mềm đủ tốt, tránh biến thành công ty outsourcing integration;
- một kênh phân phối qua hiệp hội, forwarder network hoặc đối tác phần mềm.

### 6.5. Các biến số phải xác minh trước khi dùng TAM/SAM/SOM để gọi vốn

| Biến số | Hiện trạng | Cách xác minh |
|---|---|---|
| Số forwarder/3PL tầm trung thật sự phù hợp | Chưa có thống kê công khai đủ chi tiết | Lập database doanh nghiệp theo thành phố, dịch vụ và headcount |
| Mức chi phần mềm hiện tại | Chưa biết | Hỏi trực tiếp trong customer interview |
| Willingness to pay | Chưa biết | Chào pilot có phí với 2-3 package |
| Thời gian triển khai connector | Chưa biết | Prototype với dữ liệu thật |
| Tần suất và chi phí ngoại lệ | Chưa biết | Shadow operations 1-2 tuần tại doanh nghiệp |
| Khả năng mở rộng sang shipper | Chưa biết | Phỏng vấn song song shipper và 3PL |

## 7. Product thesis cho Agentify

### 7.1. Định vị đề xuất

**Agentify Logistics Ops Layer** là lớp AI orchestration cho đội vận hành logistics:

- kết nối hệ thống hiện có qua API, webhook, file import hoặc email ingestion;
- tạo một shipment record xuyên vòng đời;
- chuẩn hóa event và trạng thái từ nhiều nguồn;
- theo dõi deadline và SLA;
- phát hiện ngoại lệ;
- đề xuất hoặc tự chạy workflow;
- yêu cầu human approval với thao tác tài chính, pháp lý hoặc rủi ro cao;
- ghi audit log cho mọi hành động.

### 7.2. Không nên xây gì trong giai đoạn đầu

- Không xây lại WMS.
- Không xây lại TMS đầy đủ.
- Không thay phần mềm khai báo hải quan.
- Không cố tích hợp mọi cảng, hãng tàu, hãng bay và kế toán ngay từ đầu.
- Không dùng AI để tự quyết các thao tác pháp lý hoặc thanh toán mà không có guardrail.

### 7.3. Beachhead nên thử trước

**Khuyến nghị:** forwarder hoặc 3PL tầm trung phục vụ doanh nghiệp xuất nhập khẩu, có đội operations 5-30 người và đang phối hợp bằng Excel, email, Zalo bên cạnh phần mềm chuyên dụng.

Lý do:

- pain xuất hiện hằng ngày và dễ quan sát;
- nhiều điểm chuyển giao giữa chứng từ, customs, trucking và cảng;
- ROI đo được bằng thời gian xử lý, số lần nhập tay và số case trễ;
- không cần thay toàn bộ stack;
- phù hợp với năng lực Agentify hiện tại: hiểu ngôn ngữ tự nhiên, gọi tool, chạy workflow và chuyển người khi cần.

### 7.4. MVP đề xuất: exception control tower cho lô hàng container nhập khẩu

Chọn một luồng cụ thể, ví dụ container nhập khẩu đường biển qua một cụm cảng:

```text
Nhận booking / bill / arrival notice
  -> tạo shipment record
  -> nhắc và kiểm tra bộ chứng từ
  -> cập nhật trạng thái khai báo hải quan
  -> theo dõi release / lịch lấy container
  -> điều phối trucking
  -> cảnh báo deadline, demurrage/detention risk
  -> xác nhận giao kho
  -> gom chứng từ và dữ liệu phục vụ đối soát
```

Các tính năng MVP:

| Tính năng | Giá trị |
|---|---|
| Unified shipment timeline | Giảm thời gian tra cứu nhiều hệ thống |
| Checklist chứng từ và deadline | Giảm phụ thuộc vào trí nhớ cá nhân |
| Exception inbox | Tập trung case cần người xử lý |
| Alert qua email/Zalo | Bám theo kênh vận hành thực tế |
| AI tóm tắt trạng thái lô hàng | Giảm thời gian handover và hỏi đáp nội bộ |
| Approval workflow | Giữ kiểm soát với hành động rủi ro |
| Audit log | Truy vết ai làm gì, lúc nào |
| Báo cáo SLA và nguyên nhân trễ | Chứng minh ROI và cải tiến quy trình |

Sau MVP, mới mở rộng sang:

1. xuất khẩu;
2. nhiều cảng và depot;
3. đối soát invoice/cost;
4. tích hợp WMS/TMS/ERP sâu hơn;
5. dự báo delay và khuyến nghị điều phối;
6. cổng self-service cho shipper.

## 8. Nhu cầu cần được kiểm chứng bằng phỏng vấn

Desk research cho thấy vấn đề có thật ở cấp ngành. Nó chưa chứng minh khách hàng sẽ trả tiền cho Agentify. Trước khi pivot, cần phỏng vấn tối thiểu 15-20 doanh nghiệp theo ba nhóm:

| Nhóm | Số lượng gợi ý | Mục tiêu |
|---|---:|---|
| Forwarder/3PL tầm trung | 8-10 | Xác định workflow đau nhất và ngân sách |
| Shipper sản xuất/xuất nhập khẩu | 5-7 | Xác định nhu cầu visibility và SLA |
| Cảng, depot, hãng xe hoặc đơn vị phần mềm | 3-5 | Đánh giá khả năng tích hợp và dữ liệu |

Câu hỏi trọng tâm:

1. Một lô hàng đi qua bao nhiêu hệ thống, file Excel và nhóm chat?
2. Nhân sự nhập lại dữ liệu ở bước nào? Mỗi ngày mất bao nhiêu giờ?
3. Ba ngoại lệ tốn thời gian hoặc gây chi phí nhiều nhất là gì?
4. Dữ liệu nào có API, dữ liệu nào chỉ có file, email hoặc thao tác web?
5. Ai chịu trách nhiệm khi container trễ, thiếu chứng từ hoặc phát sinh phí?
6. Công ty đã thử tích hợp chưa? Vì sao chưa triển khai hoặc chưa hiệu quả?
7. Chấp nhận cho AI tự động tới mức nào? Bước nào bắt buộc phê duyệt?
8. ROI tối thiểu để trả phí là bao nhiêu?

Tín hiệu đủ mạnh để tiếp tục:

- ít nhất 5 doanh nghiệp có cùng một workflow đau rõ ràng;
- pain xảy ra hằng tuần hoặc hằng ngày;
- có thể lấy dữ liệu mà không cần dự án tích hợp kéo dài nhiều tháng;
- khách hàng đồng ý chạy pilot trả phí hoặc ký LOI;
- ROI đo được trong 4-8 tuần.

## 9. Rủi ro

| Rủi ro | Ý nghĩa | Cách giảm |
|---|---|---|
| Tích hợp hệ thống cũ khó hơn dự kiến | API thiếu hoặc không ổn định | Chọn một cụm workflow và 2-3 connector đầu tiên |
| Dữ liệu không chuẩn | Cùng một trạng thái có nhiều cách biểu diễn | Xây canonical shipment model và event mapping |
| Chu kỳ bán hàng B2B dài | Khác với SME social commerce hiện tại | Bán pilot có KPI, giới hạn phạm vi |
| Workflow pháp lý rủi ro | Sai customs hoặc invoice gây thiệt hại | Human approval, phân quyền, audit log |
| Cạnh tranh với suite hiện có | Khách hàng có thể chọn thay stack | Định vị overlay, không yêu cầu thay hệ thống |
| Custom project trap | Mỗi khách hàng đòi một luồng riêng | Chỉ nhận custom nếu tái sử dụng được thành connector/playbook |

## 10. Đề xuất quyết định

Không nên pivot toàn bộ Agentify ngay. Nên chạy một track discovery riêng trong 4-6 tuần:

1. Phỏng vấn 15-20 doanh nghiệp.
2. Chọn đúng một workflow có tần suất cao.
3. Dựng prototype exception inbox và shipment timeline.
4. Tích hợp tối đa 2-3 nguồn dữ liệu.
5. Chạy 1-2 pilot có KPI.
6. Chỉ mở rộng nếu chứng minh được giảm thời gian xử lý hoặc giảm chi phí phát sinh.

Nếu pilot thành công, hướng logistics có thể trở thành vertical mới của cùng thesis Agentify:

> Current systems store and manage operations. Agentify coordinates the work across them.

## 11. Nguồn tham khảo

### Nguồn chính sách, báo cáo và nghiên cứu

[1] Bộ Công Thương, Trang thông tin logistics Việt Nam. [Tối ưu cho logistics](https://logistics.gov.vn/dich-vu-logistics/toi-uu-cho-logistics), 11/03/2024.
[2] Cổng Thông tin điện tử Chính phủ. [Quyết định số 2229/QĐ-TTg](https://chinhphu.vn/?classid=0&docid=215568&pageid=27160), 09/10/2025.
[3] Bộ Công Thương. [Báo cáo Logistics Việt Nam 2025](https://proship.vn/wp-content/uploads/2026/03/Bao-cao-Logistics-Viet-Nam-2025.pdf), bản PDF được lưu trữ lại trên Proship. Xem đặc biệt tr. 82-83, 131-132 và 171-177.
[4] Bộ Công Thương. [Phát biểu khai mạc Diễn đàn Logistics Việt Nam 2025](https://moit.gov.vn/tin-tuc/hoat-dong/hoat-dong-cua-lanh-dao-bo/bo-truong-bo-cong-thuong-nguyen-hong-dien-khai-mac-dien-dan-logistics-viet-nam-2025.html), 28/11/2025.
[5] Thư Viện Pháp Luật. [Toàn văn và tóm tắt mục tiêu Quyết định 2229/QĐ-TTg](https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/toan-van-quyet-dinh-2229qdttg-2025-chien-luoc-phat-trien-dich-vu-logistics-viet-nam-thoi-ky-2025--2-236107.html), 10/10/2025.
[6] Bộ Công Thương. [Xúc tiến hàng Việt: Động lực từ chuyển đổi số logistics và thương mại điện tử](https://moit.gov.vn/tin-tuc/xuc-tien-thuong-mai/xuc-tien-hang-viet-dong-luc-tu-chuyen-doi-so-logistics-va-thuong-mai-dien-tu.html), 22/09/2025.
[7] VCCI. [Online retail sales in Vietnam jump 35% to over $16 bln in 2025](https://en.vcci.com.vn/vcci-news/online-retail-sales-in-vietnam-jump-35-to-over-16-bln-in-2025-report-114817), 06/02/2026.
[8] Ha Le Viet, Huu Dang Quoc. [The Factors Affecting Digital Transformation in Vietnam Logistics Enterprises](https://www.mdpi.com/2079-9292/12/8/1825), *Electronics*, 2023.
[9] Trang thông tin logistics Việt Nam. [Kế hoạch triển khai hệ thống hải quan tự động tại các cảng, kho, bãi](https://logistics.gov.vn/dich-vu-logistics/kho-bai/ke-hoach-trien-khai-he-thong-hai-quan-tu-dong-tai-cac-cang-kho-bai), 18/06/2018.

### Nguồn sản phẩm và bối cảnh cạnh tranh

[10] VIMC. [VIMC accelerates digital transformation](https://vimc.co/en/vimc-accelerates-digital-transformation/).
[11] PORTNET. [Port Community System - PCS](https://portnet.vn/).
[12] LogiTrack. [Integrated logistics management software](https://logitrack.vn/en).
[13] TigerWMS. [Smart Fulfillment Technology](https://tigerwms.vn/).
[14] Abivin. [Abivin vRoute](https://www.abivin.com/).
[15] LOGIVAN. [Vietnam's Leading Digital Freight Network](https://logivan.com/).
[16] VELA. [Digital platform for all logistics needs](https://vela.com.vn/).

### Nguồn dữ liệu bổ sung

[17] Cục Thống kê. [Socio-economic situation in the fourth quarter and 2025](https://www.nso.gov.vn/en/data-and-statistics/2026/01/socio-economic-situation-in-the-fourth-quarter-and-2025/), 05/01/2026.
[18] VOV dẫn dữ liệu Cục Thống kê. [Vietnam's foreign trade hits record over US$930 billion in 2025](https://english.vov.vn/en/economy/vietnams-foreign-trade-hits-record-over-us930-billion-in-2025-post1259053.vov), 05/01/2026.
[19] Trang thông tin logistics Việt Nam dẫn thông tin VLA. [Doanh nghiệp xuất khẩu Việt trước thách thức chuyển đổi logistics xanh](https://logistics.gov.vn/doanh-nghiep/doanh-nghiep-xuat-khau-viet-truoc-thach-thuc-chuyen-doi-logistics-xanh), 17/10/2025.
[20] World Bank. [Connecting to Compete 2023: Trade Logistics in an Uncertain Global Economy](https://lpi.worldbank.org/sites/default/files/2023-04/LPI_2023_report_with_layout.pdf), 2023.
[21] Agility. [Agility Emerging Markets Logistics Index 2025](https://emli.agility.com/wp-content/uploads/2025/02/Agility-Emerging-Markets-Logistics-Index-2025.pdf), 2025.
[22] Agility. [Agility Emerging Markets Index 2026](https://emli.agility.com/wp-content/uploads/2026/02/Agility-Emerging-Markets-Index-2026-Final.pdf), 2026.

## Phụ lục: ghi chú về độ tin cậy

- Các chỉ tiêu chính sách được ưu tiên lấy từ Cổng Thông tin điện tử Chính phủ và Bộ Công Thương.
- Báo cáo Logistics Việt Nam 2025 được dùng qua một bản PDF lưu trữ lại trên website doanh nghiệp vì chưa tìm thấy URL PDF ổn định trên tên miền Bộ Công Thương. Khi dùng cho pitch deck hoặc hồ sơ đầu tư, nên thay bằng URL xuất bản chính thức nếu có.
- Các mô tả đối thủ chỉ phản ánh nội dung công khai trên website của nhà cung cấp, không phải đánh giá qua triển khai thực tế.
- Các đề xuất MVP, beachhead và positioning là suy luận từ nguồn thứ cấp; cần kiểm chứng bằng phỏng vấn và pilot trước khi cam kết roadmap.
- TAM, SAM và SOM là mô hình bottom-up theo kịch bản. Không được trình bày như số liệu thị trường đã xác nhận nếu chưa có phỏng vấn, pricing test và customer database.
