# Plan viết báo cáo: Khảo sát thị trường logistics B2B/XNK Việt Nam

File đích dự kiến: `bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md`

Thư mục: `docs/khao-sat-thi-truong-logistic/`

## 1. Mục tiêu của báo cáo

Báo cáo này dùng để gửi sếp, mục tiêu là trình bày một bức tranh thị trường logistics B2B/XNK tại Việt Nam theo góc nhìn vận hành thực tế của một lô hàng từ điểm A đến điểm B.

Báo cáo chỉ tập trung vào market research và thực trạng thị trường. Không đưa nội dung đề xuất sản phẩm, MVP, business plan, go-to-market hoặc bất kỳ phần nào liên quan đến Agentify.

Báo cáo cần trả lời được các câu hỏi:

1. Logistics B2B/XNK là gì?
2. Một lô hàng B2B/XNK đi từ A đến B qua những bước nào?
3. Trong toàn bộ quá trình đó có những nhóm nghiệp vụ/layer nào?
4. Mỗi cụm nghiệp vụ đang vận hành thực tế ra sao tại Việt Nam?
5. Pain lớn của từng cụm là gì?
6. Thị trường đang dùng những công cụ/hệ thống/sản phẩm nào?
7. Công cụ nào là hệ thống chính thức do cơ quan/tổ chức chung phát triển, công cụ nào là sản phẩm thương mại của doanh nghiệp tư nhân?
8. Khoảng trống thị trường hiện tại của từng cụm là gì?

## 2. Nguyên tắc biên tập

### 2.1. Không nhắc Agentify

Khi viết file đích, phải loại bỏ toàn bộ các phần sau trong 9 file research cũ:

- "Cơ hội sản phẩm cho Agentify"
- "MVP đề xuất"
- "Ví dụ hoạt động cụ thể của Agentify"
- "Tính khả thi cho Agentify"
- "Willingness to pilot" nếu ngữ cảnh đang nói về pilot sản phẩm Agentify
- Các câu như "Agentify nên...", "Agentify không nên...", "MVP nên..."

Nếu một ý trong phần Agentify thực ra là insight thị trường có giá trị, chỉ được giữ lại khi đã viết lại theo ngôn ngữ trung lập, ví dụ:

- Không viết: "Agentify có thể làm lớp trung gian gom dữ liệu."
- Viết lại: "Thị trường đang thiếu một lớp tổng hợp dữ liệu vận hành giữa các hệ thống rời rạc."

### 2.2. Viết cho người ngoài ngành đọc được

Phong cách mong muốn:

- Dễ hiểu, có giải thích thuật ngữ.
- Có ví dụ workflow cụ thể.
- Không quá học thuật.
- Không dùng quá nhiều acronym mà không giải thích.
- Mỗi cụm nên có phần "nói ngắn gọn" hoặc đoạn mở đầu giải thích cụm này là gì.

### 2.3. Viết như báo cáo gửi sếp

Báo cáo cần có:

- Executive summary ở đầu.
- Bảng tổng hợp 9 cụm.
- Mỗi cụm có cấu trúc thống nhất.
- Pain viết đủ chi tiết, không chỉ liệt kê.
- Sản phẩm/công cụ hiện tại phải phân loại rõ.
- Có nguồn tham khảo cuối báo cáo.
- Có ghi chú nơi nào là ước tính hoặc cần kiểm chứng thêm.

### 2.4. Cách xử lý số liệu chưa chắc chắn

Với các thông tin như thị phần, số lượng đơn vị sử dụng, mức độ phổ biến:

- Chỉ ghi con số cụ thể nếu có nguồn đáng tin.
- Nếu không có số chính thức, ghi là "chưa có số liệu công khai đáng tin cậy".
- Có thể dùng mức ước tính định tính: "phổ biến cao", "phổ biến ở nhóm SME", "chủ yếu ở doanh nghiệp lớn/FDI", "phổ biến tại một số cảng lớn", nhưng phải nói rõ đây là nhận định từ nguồn công khai và logic thị trường.
- Không tự bịa thị phần.

## 3. Cấu trúc file đích

### 3.1. Tiêu đề

```markdown
# Báo cáo khảo sát thị trường logistics B2B/XNK Việt Nam
```

Thông tin metadata nên có:

- Phiên bản: `v1`
- Ngày: ngày viết báo cáo
- Phạm vi: logistics B2B, xuất nhập khẩu, Việt Nam
- Nguồn nền: 9 file research cụm trong thư mục này và nguồn công khai được trích dẫn

### 3.2. Executive summary

Mục tiêu: giúp sếp nắm nhanh trong 1-2 trang.

Nội dung cần có:

1. Logistics B2B/XNK tại Việt Nam là thị trường lớn, nhiều bên tham gia, quy trình dài và nhiều điểm đứt gãy thông tin.
2. Quy trình một lô hàng không chỉ là "vận chuyển", mà gồm mua bán, booking, chứng từ, hải quan, cảng, trucking, kho, đối soát chi phí, trả lời khách và quản lý dữ liệu thủ công.
3. Thị trường đã có nhiều hệ thống chuyên biệt, nhưng mỗi hệ thống thường chỉ quản lý một phần nghiệp vụ.
4. Các hệ thống chính thức/chuẩn chung như VNACCS/VCIS, National Single Window, ePort/cảng, PCS giải quyết các điểm nút pháp lý/hạ tầng, nhưng không thay thế workflow nội bộ của doanh nghiệp.
5. Các sản phẩm thương mại như ERP, TMS, WMS, forwarding software, accounting software, fleet/GPS, OCR, helpdesk đang được dùng tùy phân khúc, nhưng mức độ tích hợp còn không đồng đều.
6. Excel, email, Zalo, file PDF/ảnh chụp vẫn là lớp vận hành thực tế ở nhiều doanh nghiệp.
7. Khoảng trống lớn nhất của thị trường là dữ liệu vận hành bị phân mảnh giữa nhiều bên, nhiều hệ thống và nhiều kênh giao tiếp.

### 3.3. Phạm vi và định nghĩa

Phần này cần giải thích:

- Logistics là gì?
- Logistics B2B là gì?
- Xuất nhập khẩu là gì?
- B2B/XNK khác gì logistics thương mại điện tử nội địa?
- "Lô hàng" là gì?
- "Shipment", "container", "booking", "customs clearance", "warehouse inbound/outbound" là gì?

Nên có bảng:

| Thuật ngữ | Giải thích ngắn | Ví dụ dễ hiểu |
|---|---|---|
| Logistics B2B | Dịch vụ logistics phục vụ giao dịch giữa doanh nghiệp với doanh nghiệp | Nhà máy nhập linh kiện từ Trung Quốc về Việt Nam |
| XNK | Xuất nhập khẩu | Xuất hàng may mặc sang Mỹ, nhập máy móc từ Nhật |
| Lô hàng/shipment | Một đơn vị vận hành logistics có chứng từ, lịch vận chuyển và trạng thái riêng | 1 container 40 feet nhập từ Shanghai về Cát Lái |

### 3.4. Quy trình một lô hàng đi từ A đến B

Phần này là nền để người đọc hiểu 9 cụm.

Nên viết theo 2 case chính:

#### Case 1: Nhập khẩu B2B đường biển FCL

Luồng đề xuất:

1. Doanh nghiệp Việt Nam đặt hàng với nhà cung cấp nước ngoài.
2. Hai bên thống nhất PO/hợp đồng/Incoterms.
3. Nhà cung cấp hoặc forwarder đặt booking với hãng tàu/co-loader.
4. Hàng được đóng container ở nước xuất khẩu.
5. Bộ chứng từ được chuẩn bị: invoice, packing list, B/L, C/O nếu có.
6. Tàu chạy từ cảng xuất đến cảng nhập tại Việt Nam.
7. Doanh nghiệp/forwarder nhận arrival notice, chuẩn bị khai hải quan.
8. Khai hải quan, nộp thuế, kiểm tra chuyên ngành nếu có.
9. Làm thủ tục cảng/ePort, lấy D/O, thanh toán phí local/cảng.
10. Trucking vào cảng lấy container.
11. Giao container về kho/nhà máy.
12. Kho nhận hàng, kiểm đếm, nhập tồn hoặc đưa vào sản xuất.
13. Trả container rỗng về depot.
14. Đối soát chi phí, hóa đơn, chứng từ.
15. CS/Ops/Account trả lời trạng thái cho khách hoặc phòng ban nội bộ trong suốt quá trình.
16. Dữ liệu thực tế được lưu ở nhiều nơi: hệ thống, Excel, email, Zalo, PDF, ảnh chụp.

#### Case 2: Xuất khẩu B2B đường biển FCL

Luồng đề xuất:

1. Doanh nghiệp Việt Nam nhận PO/hợp đồng từ khách nước ngoài.
2. Lên kế hoạch sản xuất/đóng hàng.
3. Booking tàu với forwarder/hãng tàu.
4. Chuẩn bị container rỗng, trucking kéo rỗng về kho/nhà máy.
5. Đóng hàng, cân VGM, hạ container hàng ra cảng.
6. Gửi SI, khai hải quan xuất khẩu, xin C/O nếu cần.
7. Hàng lên tàu, phát hành B/L.
8. Gửi bộ chứng từ cho khách/ngân hàng.
9. Theo dõi ETA/arrival tại nước nhập.
10. Đối soát chi phí logistics và billing.

### 3.5. Bản đồ 9 cụm/layer trong logistics B2B/XNK

Tạo bảng tổng hợp:

| Cụm | Tên cụm | Vai trò trong hành trình A->B | Bên liên quan chính | Hệ thống/công cụ thường gặp |
|---|---|---|---|---|
| 1 | Hải quan, cảng, depot/ICD | Điểm nút pháp lý và hạ tầng để hàng được thông quan, lấy khỏi cảng/trả rỗng | Hải quan, cảng, depot, forwarder, trucking | VNACCS/VCIS, ECUS, ePort, SmartGate, VASSCM |
| 2 | Chủ hàng, PO, hợp đồng, cam kết giao hàng | Nơi phát sinh nhu cầu kinh doanh và cam kết thời gian | Importer/exporter, procurement, sales, planning | ERP, Excel, email, forwarder portal |
| 3 | Forwarder, booking quốc tế, hãng tàu/hãng bay | Tổ chức vận tải quốc tế và quản lý booking | Forwarder, carrier, co-loader, shipper, consignee | Carrier portal, CargoWise, Magaya, Winta, INTTRA/e2open |
| 4 | Chứng từ XNK | Bộ hồ sơ pháp lý/thương mại để vận chuyển, thông quan, thanh toán | Docs team, forwarder, hải quan, ngân hàng, chủ hàng | VNACCS, ECUS, NSW, eCO, PDF/email |
| 5 | Trucking nội địa | Kết nối cảng/kho/nhà máy trong nội địa | Nhà xe, tài xế, forwarder, kho, chủ hàng | TMS, GPS, LOGIVAN, EcoTruck, Vietmap, Zalo |
| 6 | Kho/WMS/3PL warehouse | Nhận hàng, kiểm đếm, lưu kho, xuất kho, báo cáo tồn | Kho, 3PL, chủ hàng, forwarder | WMS, ERP, TigerWMS, Smartlog, Infolog, Odoo |
| 7 | Kế toán, chi phí, hóa đơn, đối soát | Kiểm soát chi phí, doanh thu, margin, hóa đơn | Kế toán, Ops, Sales, nhà cung cấp, khách hàng | MISA, FAST, BRAVO, ERP, forwarding accounting |
| 8 | CS/Ops/Account trả lời khách | Trả lời trạng thái và xử lý thông tin giữa nhiều bên | CS, Ops, Account, khách hàng | Email, Zalo, CRM/helpdesk, portal |
| 9 | Excel/email/Zalo/file thủ công | Lớp vận hành không chính thức nhưng rất phổ biến | Tất cả các bên vận hành | Excel, Google Sheet, email, Zalo, Drive, PDF/ảnh |

## 4. Template cho từng cụm

Mỗi cụm trong file đích phải theo đúng 8 mục sau.

### 4.1. Mục tiêu khảo sát cụm này

Cần trả lời:

- Cụm này là gì?
- Cụm này bao gồm những bên nào?
- Cụm này quản lý loại dữ liệu/quy trình nào?
- Cụm này nằm ở đoạn nào trong hành trình A->B?

Độ dài gợi ý: 3-6 đoạn.

### 4.2. Tại sao khảo sát cụm này?

Cần trả lời:

- Cụm này có vai trò gì trong quá trình logistics?
- Nếu cụm này vận hành kém thì ảnh hưởng gì?
- Tác động đến thời gian, chi phí, rủi ro pháp lý, chất lượng dịch vụ như thế nào?
- Vì sao cụm này quan trọng trong bối cảnh Việt Nam?

Độ dài gợi ý: 4-8 đoạn.

### 4.3. Bảng thuật ngữ

Mỗi cụm cần có bảng thuật ngữ riêng:

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|

Yêu cầu:

- Không chỉ copy danh sách thuật ngữ từ file cũ; cần rút gọn, gom trùng.
- Ưu tiên thuật ngữ người ngoài ngành khó hiểu.
- Mỗi cụm nên có 8-15 thuật ngữ, cụm chứng từ/kho có thể nhiều hơn.

### 4.4. Workflow thực tế hiện tại

Cần mô tả luồng hiện tại theo case.

Yêu cầu:

- Viết theo từng bước.
- Ghi rõ ai làm, dùng công cụ gì, dữ liệu đi qua đâu.
- Nêu các điểm dễ đứt gãy trong workflow.
- Nếu có nhiều case, tách case rõ ràng.

Ví dụ format:

```markdown
#### Case: Nhập khẩu FCL

1. Forwarder nhận pre-alert từ đại lý nước ngoài qua email.
2. Docs kiểm tra B/L, invoice, packing list.
3. Nhân viên khai báo nhập dữ liệu lên ECUS/VNACCS.
4. Khi có kết quả phân luồng, Ops báo CS để cập nhật khách.
...
```

### 4.5. Thực trạng hiện tại

Cần tổng hợp:

- Mức độ số hóa hiện tại.
- Những hệ thống chính đang tồn tại.
- Doanh nghiệp nào thường dùng hệ thống nào.
- Phần nào vẫn làm thủ công.
- Điểm khác nhau giữa doanh nghiệp lớn/FDI và SME.
- Điểm khác nhau giữa hệ thống chính thức và công cụ vận hành nội bộ.

### 4.6. Pain của cụm này

Đây là phần phải viết chi tiết nhất.

Mỗi cụm nên có 5-8 pain chính. Mỗi pain cần có:

- Tên pain.
- Mô tả tình huống thực tế.
- Nguyên nhân gốc.
- Tác động vận hành.
- Tác động chi phí/rủi ro nếu có.
- Ai là người chịu đau trực tiếp?
- Tần suất hoặc dấu hiệu để khảo sát định lượng.

Format đề xuất:

```markdown
#### Pain 1: [Tên pain]

Tình huống thực tế:
...

Nguyên nhân:
...

Tác động:
...

Người chịu ảnh hưởng:
...

Dấu hiệu cần khảo sát thêm:
...
```

### 4.7. Công cụ, sản phẩm hiện tại đang được sử dụng

Phần này cần viết kỹ hơn các file cụm cũ. Với mỗi sản phẩm/hệ thống, cần phân loại theo bảng:

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|

Trong đó:

- `Loại` gồm:
  - Hệ thống nhà nước/chính thức.
  - Hệ thống cộng đồng/chuẩn chung ngành.
  - Hệ thống do cảng/hãng tàu/3PL tự phát triển.
  - Sản phẩm thương mại của nhà cung cấp phần mềm.
  - Công cụ ngang ngành.
  - Công cụ thủ công/phổ thông.
- `Bên phát triển/vận hành` phải ghi rõ nếu biết:
  - Ví dụ: VNACCS/VCIS thuộc hệ thống hải quan; ePort do từng cảng phát triển/vận hành; PCS/PORTNET là mô hình hệ thống cộng đồng cảng; MISA/FAST/BRAVO là doanh nghiệp phần mềm; Excel/Google Sheet là công cụ ngang ngành.
- `Mức phổ biến/thị phần`:
  - Ghi con số nếu có nguồn.
  - Nếu không có, ghi "chưa có số liệu công khai đáng tin cậy", kèm nhận định định tính.

Yêu cầu đặc biệt:

- Không gọi tất cả sản phẩm là "đối thủ cạnh tranh"; trong báo cáo market research nên gọi là "công cụ/sản phẩm/hệ thống đang được sử dụng".
- Nêu rõ sản phẩm nào là chuẩn chung mà nhiều bên phải dùng, sản phẩm nào là phần mềm riêng của từng doanh nghiệp.

### 4.8. Tổng hợp khoảng trống của cụm

Kết luận cụm bằng bảng:

| Khoảng trống | Biểu hiện thực tế | Vì sao công cụ hiện tại chưa giải quyết hết | Mức độ nghiêm trọng |
|---|---|---|---|

Khoảng trống nên viết theo ngôn ngữ trung lập, không gợi ý sản phẩm cụ thể.

Ví dụ:

- Dữ liệu trạng thái bị phân mảnh giữa nhiều hệ thống.
- Không có timeline end-to-end theo shipment.
- Thông tin cập nhật phụ thuộc vào cá nhân.
- Thiếu audit trail khi xử lý ngoại lệ.
- Công cụ chính thức giải quyết giao dịch nghiệp vụ nhưng không giải quyết phối hợp liên phòng ban.

## 5. Kế hoạch nội dung theo từng cụm

### 5.1. Cụm 1: Hải quan, cảng, depot/ICD

Nguồn chính: `cum_1_hai_quan_cang_depot_icd.md`

Trọng tâm viết:

- Vai trò của hải quan/cảng/depot như các điểm nút bắt buộc để hàng được thông quan, lấy khỏi cảng, trả container rỗng.
- Phân biệt rõ:
  - VNACCS/VCIS: hệ thống hải quan chính thức.
  - ECUS/phần mềm khai báo: phần mềm thương mại kết nối nghiệp vụ hải quan.
  - VASSCM: quản lý/giám sát hàng hóa hải quan.
  - ePort/SmartGate: hệ thống do cảng phát triển để làm lệnh, thanh toán, đăng ký xe/cổng.
  - PCS/PORTNET: mô hình hệ thống cộng đồng cảng, phục vụ chia sẻ dữ liệu giữa nhiều bên.
- Pain cần viết kỹ:
  - Một lô hàng chỉ lấy được khỏi cảng khi nhiều điều kiện cùng đủ.
  - Dữ liệu ở hải quan, cảng, hãng tàu, depot không luôn nằm trong một màn hình.
  - CS/Ops phải kiểm tra nhiều nguồn để trả lời "đã thông quan chưa/lấy hàng được chưa".
  - Trễ trả rỗng gây detention.
  - Mỗi cảng/hệ thống có quy trình riêng.

Sản phẩm/hệ thống cần đưa vào:

- VNACCS/VCIS
- ECUS5-VNACCS và phần mềm khai hải quan
- VASSCM
- National Single Window nếu liên quan chứng từ/chuyên ngành
- ePort các cảng lớn
- SmartGate/TAS
- Depot/ICD portal nếu có nguồn
- PCS/PORTNET

### 5.2. Cụm 2: Chủ hàng, PO, hợp đồng, cam kết giao hàng

Nguồn chính: `cum_2_chu_hang_po_hop_dong_cam_ket_giao_hang.md`

Trọng tâm viết:

- Chủ hàng là bên phát sinh nhu cầu kinh doanh và chịu tác động cuối cùng khi hàng trễ/sai/thiếu.
- Logistics với chủ hàng gắn với PO, hợp đồng, kế hoạch sản xuất, cam kết giao hàng, OTIF.
- ERP thường quản lý mua bán/kế toán/tồn kho, nhưng không đủ visibility logistics end-to-end.
- Chủ hàng phụ thuộc vào forwarder/3PL để cập nhật trạng thái.

Pain cần viết kỹ:

- Không biết PO nào đang rủi ro trễ.
- ETA thay đổi nhưng planning/sales/kho không được cập nhật kịp.
- Mỗi forwarder/3PL gửi status theo format riêng.
- ERP có dữ liệu đơn hàng nhưng không có dữ liệu vận chuyển thực tế.
- Cam kết giao hàng được quản lý bằng Excel/kinh nghiệm cá nhân.

Sản phẩm/hệ thống cần đưa vào:

- ERP: SAP, Oracle, Odoo, Bravo, MISA/FAST nếu phù hợp phân khúc.
- Supply chain visibility platforms: project44, FourKites.
- Forwarder/3PL customer portals.
- Excel/email/Zalo.

### 5.3. Cụm 3: Forwarder, booking quốc tế, hãng tàu/hãng bay

Nguồn chính: `cum_3_forwarder_booking_quoc_te_hang_tau_hang_bay.md`

Trọng tâm viết:

- Forwarder là bên tổ chức vận tải quốc tế và là điểm gom thông tin tự nhiên giữa shipper, consignee, carrier, co-loader, trucking, customs, warehouse.
- Booking là bước quyết định chỗ tàu/chuyến bay, lịch ETD/ETA, cut-off, SI/VGM.
- Rủi ro xảy ra sớm ở booking có thể kéo theo trễ toàn bộ lô hàng.

Pain cần viết kỹ:

- Lịch tàu/chuyến bay thay đổi, roll cargo, blank sailing.
- Miss SI/VGM/CY/CFS cut-off.
- Dữ liệu booking không khớp PO/chứng từ/container.
- Carrier portal chỉ cho biết một phần thông tin.
- Forwarder SME vẫn quản lý nhiều bằng email, Excel, Zalo.

Sản phẩm/hệ thống cần đưa vào:

- CargoWise
- Magaya
- Descartes
- INTTRA/e2open
- WebCargo/Freightos
- Winta Logistics
- Carrier portals của hãng tàu/hãng bay
- project44/FourKites nếu xét visibility quốc tế

### 5.4. Cụm 4: Chứng từ xuất nhập khẩu

Nguồn chính: `cum_4_chung_tu_xuat_nhap_khau.md`

Trọng tâm viết:

- Chứng từ là ngôn ngữ chính thức của lô hàng, ảnh hưởng đến vận chuyển, thông quan, thanh toán, quyền nhận hàng.
- Bộ chứng từ thường gồm invoice, packing list, B/L/AWB, C/O, tờ khai, D/O, arrival notice, L/C nếu có.
- Sai chứng từ có thể gây chậm thông quan, sửa B/L, phạt, chậm thanh toán hoặc tranh chấp.

Pain cần viết kỹ:

- Sai lệch giữa invoice, packing list, B/L, PO, tờ khai.
- Version chứng từ thay đổi nhưng không kiểm soát tốt.
- Thiếu chứng từ trước deadline.
- Docs team làm việc áp lực cao nhưng nhiều thao tác vẫn thủ công.
- Chứng từ nằm trong email/PDF/Zalo/folder rời rạc.

Sản phẩm/hệ thống cần đưa vào:

- VNACCS/VCIS
- ECUS/phần mềm khai hải quan
- National Single Window
- eCO/C/O điện tử
- CargoWise/Magaya/Winta
- OCR/document AI ngang ngành
- Email/PDF/Drive

### 5.5. Cụm 5: Trucking nội địa

Nguồn chính: `cum_5_trucking_noi_dia.md`

Trọng tâm viết:

- Trucking là đoạn nối vật lý giữa cảng, depot, kho, nhà máy.
- Đây là nơi khách hàng thường cần cập nhật sát thời gian thực.
- Không có trucking đúng giờ thì hải quan/cảng/booking dù hoàn tất vẫn không tạo ra giao hàng thực tế.

Pain cần viết kỹ:

- Xe đến cảng nhưng chưa lấy được container vì thiếu điều kiện.
- Điều phối xe phụ thuộc Zalo/điện thoại.
- Có GPS nhưng không biết đủ ngữ cảnh shipment/container.
- Thiếu POD/EIR hoặc chứng từ giao nhận.
- Trễ trả container rỗng gây detention.
- Kẹt cổng/kẹt cảng/slot kho không đồng bộ.

Sản phẩm/hệ thống cần đưa vào:

- LOGIVAN
- EcoTruck
- Viettel Logistics/MyGo nếu phù hợp nguồn
- Abivin vRoute
- Smartlog
- Logitrack
- Vietmap/GPS/fleet management
- ePort/SmartGate/TAS liên quan xe vào cảng
- Zalo/điện thoại

### 5.6. Cụm 6: Kho, WMS và 3PL warehouse

Nguồn chính: `cum_6_kho_wms_3pl_warehouse.md`

Trọng tâm viết:

- Kho là nơi xác nhận hàng đã thật sự được nhận, kiểm đếm, nhập tồn hoặc sẵn sàng xuất.
- "Đã giao đến kho" không đồng nghĩa với "đã nhập kho xong".
- WMS giải quyết quản lý vận hành kho, nhưng không luôn giải quyết visibility từ cảng/trucking/chứng từ/khách hàng.

Pain cần viết kỹ:

- Xe đã giao nhưng kho chưa xác nhận GRN/nhập tồn.
- Thiếu/sai/hư hỏng không được báo đủ và đúng người.
- Tồn WMS, tồn ERP, báo cáo khách không khớp.
- Lịch hẹn kho không rõ, xe chờ lâu.
- POD/GRN/biên bản không gắn đúng shipment.
- Báo cáo tồn kho cho khách vẫn thủ công.

Sản phẩm/hệ thống cần đưa vào:

- TigerWMS
- Smartlog SWM/WMS
- Infolog WMS
- Logitrack
- Odoo Inventory/WMS
- SAP EWM
- Oracle WMS Cloud
- Infor WMS
- Manhattan Active WMS
- Blue Yonder WMS
- Portal riêng của 3PL warehouse

### 5.7. Cụm 7: Kế toán, chi phí, hóa đơn và đối soát

Nguồn chính: `cum_7_ke_toan_chi_phi_hoa_don_doi_soat.md`

Trọng tâm viết:

- Logistics B2B/XNK không chỉ cần giao đúng hạn mà còn phải kiểm soát chi phí, doanh thu, margin.
- Một shipment có nhiều loại phí: ocean/air freight, local charges, trucking, warehouse, customs, DEM/DET, phí phát sinh.
- Ops và kế toán thường nhìn cùng lô hàng bằng hai hệ quy chiếu khác nhau.

Pain cần viết kỹ:

- Chi phí phát sinh được biết muộn.
- Không biết shipment nào âm margin.
- Vendor invoice không gắn được vào shipment/container.
- Billing khách thiếu phí phát sinh.
- DEM/DET/storage không được cảnh báo sớm.
- Duyệt phí qua chat, khó audit.
- Hóa đơn điện tử tăng yêu cầu dữ liệu đúng và đúng thời điểm.

Sản phẩm/hệ thống cần đưa vào:

- MISA AMIS/MISA SME/MISA meInvoice
- FAST
- BRAVO ERP
- Odoo Accounting
- SAP/Oracle ERP
- CargoWise Accounting
- Winta Logistics
- GoFreight, WakaAccounting, OrigoLink, Logiverse nếu có nguồn
- Freight audit/reconciliation tools

### 5.8. Cụm 8: CS/Ops/Account trả lời khách

Nguồn chính: `cum_8_cs_ops_account_tra_loi_khach.md`

Trọng tâm viết:

- CS/Ops/Account là nơi khách hàng cảm nhận chất lượng dịch vụ logistics.
- Nhóm này thường phải tổng hợp thông tin từ tất cả các cụm trước để trả lời một câu hỏi đơn giản: "hàng đang ở đâu?"
- Đây là lớp tích hợp thủ công của thị trường.

Pain cần viết kỹ:

- Mất thời gian tra cứu nhiều nguồn.
- Trả lời chậm vì phải hỏi nội bộ.
- Câu trả lời không nhất quán giữa các người phụ trách.
- Handover kém khi người phụ trách nghỉ.
- Quên follow-up.
- Không biết shipment nào cần ưu tiên.
- Trả lời thiếu bằng chứng.
- Khách hỏi ngoài giờ.

Sản phẩm/hệ thống cần đưa vào:

- CRM/helpdesk: Zendesk, Freshdesk, HubSpot, Salesforce, Intercom.
- Forwarding/customer portals: GoFreight, Magaya portal, CargoWise nếu có.
- Logistics visibility: project44, FourKites.
- Zalo OA/Zalo Cloud.
- Email/Zalo/Excel.

Lưu ý biên tập:

- File cũ có nhiều nội dung Agentify; khi viết báo cáo chính chỉ giữ lại phần thực trạng, workflow, pain, product map. Không dùng các phần MVP/use case Agentify.

### 5.9. Cụm 9: Excel, email, Zalo và file thủ công

Nguồn chính: `cum_9_excel_email_zalo_file_thu_cong.md`

Trọng tâm viết:

- Excel/email/Zalo/file thủ công không chỉ là "cách làm cũ", mà là lớp vận hành thực tế ở nhiều doanh nghiệp logistics.
- Lý do tồn tại: nhiều bên tham gia, quy trình thay đổi, hệ thống chuyên biệt không phủ hết, email là bằng chứng, Zalo nhanh và phổ biến tại Việt Nam.
- Cụm này là lớp dữ liệu phi chính thức nhưng ảnh hưởng đến hầu hết các cụm khác.

Pain cần viết kỹ:

- Sai version file.
- Copy/paste thủ công gây sai dữ liệu.
- Dữ liệu rải rác không có timeline.
- Không biết nguồn nào đáng tin.
- Handover kém vì dữ liệu nằm trong chat cá nhân.
- Không audit được ai cập nhật gì.
- File chứng từ khó tìm.
- Bảo mật yếu.

Sản phẩm/hệ thống cần đưa vào:

- Microsoft Excel/Google Sheets.
- Microsoft 365 Copilot.
- Google Workspace Gemini.
- Zalo/Zalo OA/Zalo Cloud.
- OCR/Document AI: Azure AI Document Intelligence, Google Document AI, ABBYY.
- RPA/no-code tools.
- Email/Drive/OneDrive.
- Core logistics systems như ERP/TMS/WMS/forwarding software, nhưng chỉ ở vai trò hệ thống nền khiến người dùng vẫn phải dùng Excel/email/Zalo để nối dữ liệu.

## 6. Nguồn dữ liệu cần sử dụng

### 6.1. Nguồn nội bộ đã có

Các file research cụm:

1. `cum_1_hai_quan_cang_depot_icd.md`
2. `cum_2_chu_hang_po_hop_dong_cam_ket_giao_hang.md`
3. `cum_3_forwarder_booking_quoc_te_hang_tau_hang_bay.md`
4. `cum_4_chung_tu_xuat_nhap_khau.md`
5. `cum_5_trucking_noi_dia.md`
6. `cum_6_kho_wms_3pl_warehouse.md`
7. `cum_7_ke_toan_chi_phi_hoa_don_doi_soat.md`
8. `cum_8_cs_ops_account_tra_loi_khach.md`
9. `cum_9_excel_email_zalo_file_thu_cong.md`

Khi tổng hợp, ưu tiên lấy các phần:

- Mục tiêu khảo sát cụm.
- Vì sao cụm quan trọng.
- Thuật ngữ.
- Workflow.
- Thực trạng.
- Pain ranking.
- Product map/đối thủ/sản phẩm liên quan.
- Kết luận sơ bộ.
- Nguồn tham khảo.

Không lấy các phần Agentify/MVP.

### 6.2. Nguồn công khai cần kiểm chứng thêm khi viết báo cáo chính

Khi viết báo cáo chính, nên kiểm chứng lại các nguồn có thể thay đổi:

- Số liệu xuất nhập khẩu Việt Nam mới nhất từ Tổng cục Thống kê/NSO.
- Số liệu logistics Việt Nam từ Bộ Công Thương/Vietnam Logistics Portal.
- Văn bản/hệ thống hải quan: Tổng cục Hải quan, NSW, VNACCS/VCIS.
- Thông tin ePort/SmartGate từ website các cảng lớn.
- Thông tin sản phẩm từ website chính thức của nhà cung cấp.
- Thông tin người dùng/thị phần nếu nhà cung cấp công bố chính thức.

Vì thị phần nhiều sản phẩm logistics B2B không công khai, báo cáo cần tránh tự đưa số cụ thể nếu không có nguồn.

## 7. Cách chuyển từ 9 file cũ sang báo cáo mới

### 7.1. Bước 1: Lập skeleton báo cáo

Tạo file `bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md` với các phần:

1. Executive summary.
2. Phạm vi và định nghĩa.
3. Logistics B2B/XNK là gì?
4. Quy trình một lô hàng từ A đến B.
5. Bản đồ 9 cụm.
6. Research chi tiết từng cụm.
7. Tổng hợp khoảng trống toàn thị trường.
8. Phụ lục thuật ngữ nếu cần.
9. Nguồn tham khảo.

### 7.2. Bước 2: Viết phần nền tảng A->B

Viết trước phần giải thích logistics B2B/XNK và workflow nhập/xuất khẩu.

Lý do: phần này giúp người đọc hiểu vì sao 9 cụm tồn tại.

### 7.3. Bước 3: Viết từng cụm theo template 8 mục

Với mỗi cụm:

1. Đọc file cụm cũ.
2. Trích các phần market research.
3. Loại phần Agentify/MVP.
4. Viết lại theo template 8 mục.
5. Chuẩn hóa bảng thuật ngữ.
6. Chuẩn hóa bảng sản phẩm/công cụ.
7. Viết bảng khoảng trống.

### 7.4. Bước 4: Viết tổng hợp toàn thị trường

Sau 9 cụm, cần có phần tổng hợp:

- Điểm chung của các cụm.
- Pattern pain lặp lại.
- Bản đồ hệ thống hiện tại.
- Khoảng trống toàn thị trường.
- Những điểm cần khảo sát thực địa thêm.

Không đề xuất sản phẩm trong phần này. Chỉ nêu khoảng trống thị trường.

### 7.5. Bước 5: Chuẩn hóa nguồn tham khảo

Nguồn tham khảo nên gom cuối báo cáo, nhóm theo:

- Nguồn nhà nước/chính thức.
- Cảng/hải quan/hạ tầng logistics.
- Nhà cung cấp phần mềm quốc tế.
- Nhà cung cấp phần mềm Việt Nam.
- Báo cáo thị trường/số liệu công khai.

Mỗi nguồn cần có:

- Tên nguồn.
- Tổ chức phát hành.
- Năm hoặc ngày truy cập nếu cần.
- Link.
- Ghi chú dùng cho phần nào.

## 8. Checklist chất lượng trước khi hoàn tất file đích

### 8.1. Checklist nội dung

- [ ] Không còn chữ "Agentify".
- [ ] Không còn "MVP", "business plan", "go-to-market" theo nghĩa đề xuất sản phẩm.
- [ ] Có giải thích logistics B2B/XNK.
- [ ] Có mô tả workflow lô hàng nhập khẩu và xuất khẩu từ A đến B.
- [ ] Có bảng tổng hợp 9 cụm.
- [ ] Mỗi cụm đủ 8 mục theo yêu cầu.
- [ ] Mỗi cụm có bảng thuật ngữ.
- [ ] Mỗi cụm có workflow thực tế.
- [ ] Mỗi cụm có pain viết chi tiết.
- [ ] Mỗi cụm có bảng công cụ/sản phẩm hiện tại.
- [ ] Mỗi công cụ/sản phẩm được phân loại rõ: hệ thống chính thức, chuẩn chung, sản phẩm thương mại, hệ thống riêng, công cụ phổ thông.
- [ ] Không bịa thị phần/số lượng đơn vị sử dụng.
- [ ] Có tổng hợp khoảng trống từng cụm.
- [ ] Có tổng hợp khoảng trống toàn thị trường.
- [ ] Có nguồn tham khảo.

### 8.2. Checklist văn phong

- [ ] Người ngoài ngành đọc được.
- [ ] Thuật ngữ được giải thích trước khi dùng sâu.
- [ ] Mỗi pain có tình huống thực tế, nguyên nhân, tác động.
- [ ] Không viết quá thiên về startup/sản phẩm.
- [ ] Không dùng ngôn ngữ quảng cáo.
- [ ] Các nhận định có nguồn hoặc được ghi rõ là nhận định/ước tính.

### 8.3. Checklist kỹ thuật file

Sau khi viết file đích, chạy:

```bash
rg -n "Agentify|MVP|business plan|go-to-market|TODO|TBD|placeholder|contentReference" docs/khao-sat-thi-truong-logistic/bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md
git diff --no-index --check -- /dev/null docs/khao-sat-thi-truong-logistic/bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md
wc -l docs/khao-sat-thi-truong-logistic/bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md
```

Kỳ vọng:

- Lệnh `rg` không trả về nội dung không mong muốn.
- Không có trailing whitespace.
- File đủ dài để làm báo cáo gửi sếp, dự kiến tối thiểu 3000-5000 dòng nếu viết chi tiết theo 9 cụm.

## 9. Dàn ý chi tiết file đích

```markdown
# Báo cáo khảo sát thị trường logistics B2B/XNK Việt Nam

## 1. Executive summary

## 2. Phạm vi báo cáo và cách đọc

## 3. Logistics B2B/XNK là gì?

### 3.1. Logistics là gì?
### 3.2. Logistics B2B là gì?
### 3.3. Xuất nhập khẩu là gì?
### 3.4. Các bên tham gia trong một lô hàng B2B/XNK
### 3.5. Vì sao logistics B2B/XNK phức tạp hơn giao hàng nội địa đơn giản?

## 4. Một lô hàng đi từ A đến B như thế nào?

### 4.1. Case nhập khẩu B2B đường biển FCL
### 4.2. Case xuất khẩu B2B đường biển FCL
### 4.3. Các điểm dữ liệu chính trong hành trình lô hàng
### 4.4. Những điểm thường gây đứt gãy thông tin

## 5. Bản đồ 9 cụm/layer logistics trong hành trình A->B

### 5.1. Bảng tổng hợp 9 cụm
### 5.2. Quan hệ giữa các cụm
### 5.3. Vì sao cần nhìn theo cụm thay vì nhìn theo từng phần mềm riêng lẻ?

## 6. Cụm 1: Hải quan, cảng, depot/ICD

### 6.1. Mục tiêu khảo sát cụm này
### 6.2. Tại sao khảo sát cụm này?
### 6.3. Bảng thuật ngữ
### 6.4. Workflow thực tế hiện tại
### 6.5. Thực trạng hiện tại
### 6.6. Pain của cụm này
### 6.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 6.8. Tổng hợp khoảng trống của cụm

## 7. Cụm 2: Chủ hàng, PO, hợp đồng, cam kết giao hàng

### 7.1. Mục tiêu khảo sát cụm này
### 7.2. Tại sao khảo sát cụm này?
### 7.3. Bảng thuật ngữ
### 7.4. Workflow thực tế hiện tại
### 7.5. Thực trạng hiện tại
### 7.6. Pain của cụm này
### 7.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 7.8. Tổng hợp khoảng trống của cụm

## 8. Cụm 3: Forwarder, booking quốc tế, hãng tàu/hãng bay

### 8.1. Mục tiêu khảo sát cụm này
### 8.2. Tại sao khảo sát cụm này?
### 8.3. Bảng thuật ngữ
### 8.4. Workflow thực tế hiện tại
### 8.5. Thực trạng hiện tại
### 8.6. Pain của cụm này
### 8.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 8.8. Tổng hợp khoảng trống của cụm

## 9. Cụm 4: Chứng từ xuất nhập khẩu

### 9.1. Mục tiêu khảo sát cụm này
### 9.2. Tại sao khảo sát cụm này?
### 9.3. Bảng thuật ngữ
### 9.4. Workflow thực tế hiện tại
### 9.5. Thực trạng hiện tại
### 9.6. Pain của cụm này
### 9.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 9.8. Tổng hợp khoảng trống của cụm

## 10. Cụm 5: Trucking nội địa

### 10.1. Mục tiêu khảo sát cụm này
### 10.2. Tại sao khảo sát cụm này?
### 10.3. Bảng thuật ngữ
### 10.4. Workflow thực tế hiện tại
### 10.5. Thực trạng hiện tại
### 10.6. Pain của cụm này
### 10.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 10.8. Tổng hợp khoảng trống của cụm

## 11. Cụm 6: Kho, WMS và 3PL warehouse

### 11.1. Mục tiêu khảo sát cụm này
### 11.2. Tại sao khảo sát cụm này?
### 11.3. Bảng thuật ngữ
### 11.4. Workflow thực tế hiện tại
### 11.5. Thực trạng hiện tại
### 11.6. Pain của cụm này
### 11.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 11.8. Tổng hợp khoảng trống của cụm

## 12. Cụm 7: Kế toán, chi phí, hóa đơn và đối soát

### 12.1. Mục tiêu khảo sát cụm này
### 12.2. Tại sao khảo sát cụm này?
### 12.3. Bảng thuật ngữ
### 12.4. Workflow thực tế hiện tại
### 12.5. Thực trạng hiện tại
### 12.6. Pain của cụm này
### 12.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 12.8. Tổng hợp khoảng trống của cụm

## 13. Cụm 8: CS/Ops/Account trả lời khách

### 13.1. Mục tiêu khảo sát cụm này
### 13.2. Tại sao khảo sát cụm này?
### 13.3. Bảng thuật ngữ
### 13.4. Workflow thực tế hiện tại
### 13.5. Thực trạng hiện tại
### 13.6. Pain của cụm này
### 13.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 13.8. Tổng hợp khoảng trống của cụm

## 14. Cụm 9: Excel, email, Zalo và file thủ công

### 14.1. Mục tiêu khảo sát cụm này
### 14.2. Tại sao khảo sát cụm này?
### 14.3. Bảng thuật ngữ
### 14.4. Workflow thực tế hiện tại
### 14.5. Thực trạng hiện tại
### 14.6. Pain của cụm này
### 14.7. Công cụ, sản phẩm hiện tại đang được sử dụng
### 14.8. Tổng hợp khoảng trống của cụm

## 15. Tổng hợp khoảng trống toàn thị trường

### 15.1. Khoảng trống về dữ liệu
### 15.2. Khoảng trống về workflow liên phòng ban
### 15.3. Khoảng trống về visibility end-to-end
### 15.4. Khoảng trống về audit trail và trách nhiệm
### 15.5. Khoảng trống về chuẩn hóa trạng thái shipment
### 15.6. Khoảng trống về tích hợp giữa hệ thống chính thức và vận hành nội bộ

## 16. Nhận định cần khảo sát thực địa thêm

### 16.1. Những giả thuyết cần kiểm chứng bằng phỏng vấn
### 16.2. Những số liệu cần kiểm chứng bằng survey
### 16.3. Những thông tin thị phần/số lượng người dùng cần nguồn chính thức

## 17. Nguồn tham khảo
```

## 10. Rủi ro khi viết báo cáo và cách xử lý

### 10.1. Rủi ro: báo cáo bị lẫn đề xuất sản phẩm

Cách xử lý:

- Kiểm tra bằng `rg "Agentify|MVP"`.
- Viết lại mọi ý theo hướng market gap trung lập.

### 10.2. Rủi ro: phần sản phẩm hiện tại thiếu số liệu thị phần

Cách xử lý:

- Không ép phải có số.
- Ghi rõ "chưa có số liệu công khai đáng tin cậy".
- Dùng phân loại định tính có cơ sở: hệ thống bắt buộc/chính thức, phổ biến ở cảng lớn, phổ biến ở SME, phổ biến ở enterprise/FDI.

### 10.3. Rủi ro: báo cáo quá dài nhưng khó đọc

Cách xử lý:

- Mỗi cụm mở đầu bằng đoạn "nói ngắn gọn".
- Dùng bảng thuật ngữ và bảng công cụ.
- Pain viết theo format thống nhất.
- Executive summary phải đủ mạnh để sếp đọc nhanh.

### 10.4. Rủi ro: thuật ngữ bị trùng giữa các cụm

Cách xử lý:

- Vẫn giải thích lại ở cụm nếu thuật ngữ quan trọng.
- Có thể thêm phụ lục thuật ngữ tổng hợp cuối file nếu báo cáo quá dài.

## 11. Đầu ra mong muốn sau khi viết file đích

Sau khi hoàn tất `bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md`, người đọc phải hiểu được:

1. Logistics B2B/XNK là một chuỗi nhiều nghiệp vụ liên kết, không phải chỉ là giao hàng.
2. Một lô hàng đi từ A đến B cần nhiều bên và nhiều hệ thống cùng vận hành.
3. 9 cụm là 9 lớp thực tế trong hành trình đó.
4. Thị trường đã có nhiều công cụ, nhưng phần lớn giải quyết từng mảng riêng.
5. Khoảng trống lớn nhất nằm ở sự phân mảnh dữ liệu, phối hợp thủ công, thiếu timeline end-to-end và thiếu chuẩn hóa thông tin giữa các bên.

## 12. Task plan thực hiện viết báo cáo

Phần này chia việc viết `bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md` thành các task tuần tự. Mục tiêu là mỗi task tạo ra một phần hoàn chỉnh của báo cáo, có thể review từng phần trước khi ghép thành bản gửi sếp.

Nguyên tắc thực hiện:

- Viết theo thứ tự từ tổng quan đến chi tiết.
- Mỗi task chỉ tập trung vào một phần rõ ràng.
- Sau mỗi task, kiểm tra nhanh để đảm bảo không lẫn nội dung Agentify/MVP.
- Task cuối cùng là review tổng thể, chỉnh logic, văn phong, nguồn và tính nhất quán.

### Task 0: Chuẩn bị skeleton file báo cáo

Đầu ra:

- Tạo file `docs/khao-sat-thi-truong-logistic/bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md`.
- Tạo sẵn toàn bộ heading chính theo dàn ý ở mục 9.
- Thêm metadata: phiên bản, ngày viết, phạm vi, nguồn nền.

Nguồn cần dùng:

- Plan này.

Tiêu chí hoàn thành:

- File đích tồn tại.
- Có đủ các section từ Executive summary đến Nguồn tham khảo.
- Chưa cần viết nội dung chi tiết.

### Task 1: Viết phần Executive summary

Đầu ra:

- Viết phần `Executive summary` ở đầu báo cáo.
- Nêu ngắn gọn quy mô/bối cảnh thị trường, tính phức tạp của logistics B2B/XNK, 9 cụm chính và khoảng trống thị trường.

Nguồn cần dùng:

- Compact summary của 9 cụm.
- Nguồn số liệu lớn: NSO/Tổng cục Thống kê, Vietnam Logistics Portal/Bộ Công Thương nếu cần kiểm chứng lại.

Tiêu chí hoàn thành:

- Sếp đọc 1-2 trang đầu có thể hiểu báo cáo nói gì.
- Không nhắc Agentify.
- Không đưa đề xuất sản phẩm.
- Có phân biệt rõ "thực trạng thị trường" và "khoảng trống thị trường".

### Task 2: Viết phần định nghĩa logistics B2B/XNK

Đầu ra:

- Viết các phần:
  - `Phạm vi báo cáo và cách đọc`
  - `Logistics B2B/XNK là gì?`
  - Bảng thuật ngữ nền tảng cho toàn báo cáo.

Nội dung cần có:

- Logistics là gì.
- Logistics B2B là gì.
- XNK là gì.
- Lô hàng/shipment là gì.
- Các bên tham gia: chủ hàng, forwarder, carrier, hải quan, cảng, depot, trucking, kho, 3PL, kế toán, CS/Ops.
- B2B/XNK khác logistics thương mại điện tử nội địa như thế nào.

Nguồn cần dùng:

- `cum_2_chu_hang_po_hop_dong_cam_ket_giao_hang.md`
- `cum_3_forwarder_booking_quoc_te_hang_tau_hang_bay.md`
- `cum_4_chung_tu_xuat_nhap_khau.md`
- Các nguồn định nghĩa chính thức nếu cần.

Tiêu chí hoàn thành:

- Người ngoài ngành đọc được.
- Thuật ngữ quan trọng được giải thích trước khi đi vào 9 cụm.
- Không dùng acronym mà không giải thích.

### Task 3: Viết workflow một lô hàng đi từ A đến B

Đầu ra:

- Viết phần `Một lô hàng đi từ A đến B như thế nào?`
- Có ít nhất 2 case:
  - Nhập khẩu B2B đường biển FCL.
  - Xuất khẩu B2B đường biển FCL.

Nội dung cần có:

- Luồng từng bước từ PO/hợp đồng đến booking, chứng từ, hải quan, cảng, trucking, kho, đối soát.
- Ai làm từng bước.
- Dữ liệu/chứng từ nào phát sinh ở từng bước.
- Điểm nào thường gây đứt gãy thông tin.

Nguồn cần dùng:

- Cụm 1 đến cụm 9, ưu tiên workflow trong từng file.

Tiêu chí hoàn thành:

- Người đọc hiểu vì sao báo cáo chia thành 9 cụm.
- Workflow đủ cụ thể, không chỉ mô tả chung chung.
- Không lẫn use case sản phẩm.

### Task 4: Viết bản đồ 9 cụm/layer

Đầu ra:

- Viết phần `Bản đồ 9 cụm/layer logistics trong hành trình A->B`.
- Có bảng tổng hợp 9 cụm.
- Có đoạn giải thích quan hệ giữa các cụm.

Nội dung cần có:

- Tên cụm.
- Vai trò trong hành trình A->B.
- Bên liên quan chính.
- Hệ thống/công cụ thường gặp.
- Vì sao phải nhìn theo cụm thay vì chỉ nhìn theo từng phần mềm.

Nguồn cần dùng:

- Tên và kết luận sơ bộ của 9 file cụm.

Tiêu chí hoàn thành:

- Bảng 9 cụm đủ rõ để làm "map" cho toàn bộ báo cáo.
- Tên cụm thống nhất với 9 file research.
- Không đề cập Agentify.

### Task 5: Viết Cụm 1 - Hải quan, cảng, depot/ICD

Đầu ra:

- Viết đầy đủ section Cụm 1 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_1_hai_quan_cang_depot_icd.md`
- Nguồn hải quan/cảng/ePort/PCS nếu cần kiểm chứng.

Trọng tâm:

- VNACCS/VCIS, ECUS, VASSCM, ePort, SmartGate, PCS/PORTNET.
- Điều kiện để lô hàng được thông quan/lấy khỏi cảng/trả rỗng.
- Pain dữ liệu phân mảnh giữa hải quan, cảng, hãng tàu, depot.

Tiêu chí hoàn thành:

- Có bảng công cụ/hệ thống phân loại rõ hệ thống chính thức, hệ thống cảng, sản phẩm thương mại, chuẩn cộng đồng.
- Pain viết chi tiết, có tình huống thực tế.
- Không còn các đoạn cơ hội/MVP trong file cũ.

### Task 6: Viết Cụm 2 - Chủ hàng, PO, hợp đồng, cam kết giao hàng

Đầu ra:

- Viết đầy đủ section Cụm 2 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_2_chu_hang_po_hop_dong_cam_ket_giao_hang.md`
- Nguồn về XNK Việt Nam, ERP/visibility platform nếu cần kiểm chứng.

Trọng tâm:

- Chủ hàng là bên phát sinh nhu cầu kinh doanh và chịu tác động cuối.
- PO, hợp đồng, Incoterms, OTIF, cam kết giao hàng.
- ERP có dữ liệu đơn hàng nhưng thường thiếu visibility logistics thực tế.

Tiêu chí hoàn thành:

- Làm rõ pain của chủ hàng khác pain của forwarder.
- Có công cụ hiện tại: ERP, visibility platform, forwarder/3PL portal, Excel/email/Zalo.
- Không biến phần khoảng trống thành đề xuất sản phẩm.

### Task 7: Viết Cụm 3 - Forwarder, booking quốc tế, hãng tàu/hãng bay

Đầu ra:

- Viết đầy đủ section Cụm 3 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_3_forwarder_booking_quoc_te_hang_tau_hang_bay.md`
- Website chính thức của CargoWise, Magaya, Descartes, INTTRA/e2open, WebCargo/Freightos, Winta nếu cần kiểm chứng.

Trọng tâm:

- Forwarder là điểm gom thông tin tự nhiên của lô hàng.
- Booking, ETD/ETA, SI, VGM, cut-off, roll cargo, blank sailing.
- Carrier portal và forwarding software giải quyết từng phần nhưng chưa phủ hết workflow SME.

Tiêu chí hoàn thành:

- Workflow export/import biển và air được viết rõ.
- Product map có phân loại carrier portal, nền tảng booking, forwarding software, visibility platform.
- Pain liên quan lịch tàu/chuyến bay, cut-off, mapping PO-booking-container-document được viết chi tiết.

### Task 8: Viết Cụm 4 - Chứng từ xuất nhập khẩu

Đầu ra:

- Viết đầy đủ section Cụm 4 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_4_chung_tu_xuat_nhap_khau.md`
- Nguồn VNACCS/NSW/eCO/OCR nếu cần kiểm chứng.

Trọng tâm:

- Chứng từ là ngôn ngữ chính thức của lô hàng.
- Invoice, packing list, B/L, AWB, C/O, tờ khai, D/O, L/C.
- Sai lệch chứng từ gây rủi ro vận hành, pháp lý, tài chính.

Tiêu chí hoàn thành:

- Có workflow chứng từ xuất và nhập.
- Pain về sai lệch, version, deadline, file rời rạc được viết kỹ.
- Công cụ hiện tại được phân loại: hệ thống nhà nước, phần mềm khai báo, forwarding software, OCR/document AI, email/PDF.

### Task 9: Viết Cụm 5 - Trucking nội địa

Đầu ra:

- Viết đầy đủ section Cụm 5 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_5_trucking_noi_dia.md`
- Nguồn TMS/GPS/trucking platform nếu cần kiểm chứng.

Trọng tâm:

- Trucking là đoạn nối vật lý giữa cảng/depot/kho/nhà máy.
- Case nhập FCL và xuất FCL.
- GPS không đủ nếu thiếu ngữ cảnh shipment/container/document/free time.

Tiêu chí hoàn thành:

- Workflow nhập và xuất container được viết rõ.
- Pain về lấy container, điều phối xe, POD/EIR, trả rỗng, detention được viết chi tiết.
- Công cụ hiện tại gồm TMS, GPS, LOGIVAN/EcoTruck/Abivin/Smartlog/Logitrack/Vietmap, ePort/SmartGate/TAS, Zalo/điện thoại.

### Task 10: Viết Cụm 6 - Kho, WMS và 3PL warehouse

Đầu ra:

- Viết đầy đủ section Cụm 6 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_6_kho_wms_3pl_warehouse.md`
- Nguồn WMS/3PL nếu cần kiểm chứng.

Trọng tâm:

- Kho là nơi xác nhận hàng thật sự đã nhận, kiểm đếm, nhập tồn hoặc sẵn sàng xuất.
- "Đã giao đến kho" khác "đã nhập kho xong".
- WMS giải quyết vận hành kho nhưng không nhất thiết giải quyết visibility end-to-end.

Tiêu chí hoàn thành:

- Có workflow inbound, outbound, 3PL warehouse.
- Pain về GRN, discrepancy, tồn kho không khớp, appointment, POD/biên bản, report thủ công được viết kỹ.
- Product map có nhóm WMS nội địa, WMS quốc tế, portal 3PL, ERP/Excel.

### Task 11: Viết Cụm 7 - Kế toán, chi phí, hóa đơn và đối soát

Đầu ra:

- Viết đầy đủ section Cụm 7 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_7_ke_toan_chi_phi_hoa_don_doi_soat.md`
- Nguồn e-invoice, accounting/ERP/forwarding accounting nếu cần kiểm chứng.

Trọng tâm:

- Logistics phải kiểm soát cost, revenue, margin, invoice, reconciliation.
- Một shipment có nhiều loại phí và phí phát sinh.
- Ops và kế toán thường dùng hai hệ quy chiếu khác nhau.

Tiêu chí hoàn thành:

- Có workflow quote-to-cash, procure-to-pay, shipment profitability.
- Pain về cost phát sinh muộn, âm margin, invoice không gắn shipment, thiếu billing, DEM/DET/storage, duyệt qua chat được viết kỹ.
- Product map có accounting software, ERP, forwarding accounting, freight audit tools.

### Task 12: Viết Cụm 8 - CS/Ops/Account trả lời khách

Đầu ra:

- Viết đầy đủ section Cụm 8 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_8_cs_ops_account_tra_loi_khach.md`
- Nguồn CRM/helpdesk/logistics portal/visibility nếu cần kiểm chứng.

Trọng tâm:

- CS/Ops/Account là nơi khách hàng cảm nhận chất lượng dịch vụ logistics.
- Một câu hỏi "hàng đang ở đâu?" buộc nhân viên tổng hợp dữ liệu từ nhiều cụm.
- Nhóm này là lớp tích hợp thủ công của thị trường.

Tiêu chí hoàn thành:

- Loại bỏ toàn bộ phần Agentify/MVP/use case sản phẩm trong file cũ.
- Pain trả lời chậm, tra nhiều nguồn, handover, follow-up, thiếu bằng chứng được viết chi tiết.
- Product map có CRM/helpdesk, logistics portal, visibility platform, email/Zalo/Excel.

### Task 13: Viết Cụm 9 - Excel, email, Zalo và file thủ công

Đầu ra:

- Viết đầy đủ section Cụm 9 theo 8 mục chuẩn.

Nguồn cần dùng:

- `cum_9_excel_email_zalo_file_thu_cong.md`
- Nguồn Microsoft/Google/Zalo/OCR nếu cần kiểm chứng.

Trọng tâm:

- Excel/email/Zalo/file thủ công là lớp vận hành thực tế, không chỉ là "cách làm cũ".
- Dữ liệu thủ công xuất hiện ở hầu hết cụm khác.
- Lý do tồn tại: nhiều bên, quy trình linh hoạt, hệ thống chuyên biệt không phủ hết, email là bằng chứng, Zalo nhanh.

Tiêu chí hoàn thành:

- Loại bỏ toàn bộ phần Agentify/MVP/use case sản phẩm trong file cũ.
- Pain sai version, copy/paste, dữ liệu rải rác, source of truth, handover, audit, bảo mật được viết chi tiết.
- Product map có Excel/Google Sheets, Microsoft 365 Copilot, Google Workspace Gemini, Zalo/Zalo Cloud, OCR/Document AI, RPA/no-code, email/Drive.

### Task 14: Viết phần tổng hợp khoảng trống toàn thị trường

Đầu ra:

- Viết section `Tổng hợp khoảng trống toàn thị trường`.
- Tạo bảng tổng hợp các pattern pain lặp lại qua 9 cụm.

Nội dung cần có:

- Khoảng trống về dữ liệu.
- Khoảng trống về workflow liên phòng ban.
- Khoảng trống về visibility end-to-end.
- Khoảng trống về audit trail.
- Khoảng trống về chuẩn hóa trạng thái shipment.
- Khoảng trống về tích hợp giữa hệ thống chính thức và vận hành nội bộ.

Nguồn cần dùng:

- Bảng khoảng trống của 9 cụm đã viết trong báo cáo.

Tiêu chí hoàn thành:

- Không đề xuất giải pháp/sản phẩm.
- Chỉ tổng hợp khoảng trống thị trường.
- Có bảng mức độ nghiêm trọng hoặc ảnh hưởng theo từng khoảng trống.

### Task 15: Viết phần nhận định cần khảo sát thực địa thêm

Đầu ra:

- Viết section `Nhận định cần khảo sát thực địa thêm`.

Nội dung cần có:

- Những giả thuyết cần kiểm chứng bằng phỏng vấn.
- Những số liệu cần kiểm chứng bằng survey.
- Những thông tin thị phần/số lượng người dùng chưa có nguồn công khai.
- Gợi ý nhóm đối tượng cần phỏng vấn: chủ hàng, forwarder, customs broker, trucking, warehouse/3PL, kế toán, CS/Ops.

Nguồn cần dùng:

- Các điểm chưa chắc chắn trong 9 cụm.
- Các đoạn "chưa có số liệu công khai đáng tin cậy" trong phần product map.

Tiêu chí hoàn thành:

- Phân biệt rõ đâu là insight đã có nguồn và đâu là giả thuyết cần kiểm chứng.
- Không đưa phần này thành plan sản phẩm.

### Task 16: Gom và chuẩn hóa nguồn tham khảo

Đầu ra:

- Viết section `Nguồn tham khảo`.
- Gom nguồn theo nhóm.

Nhóm nguồn nên có:

- Nguồn nhà nước/chính thức.
- Hải quan/cảng/hạ tầng logistics.
- Nhà cung cấp phần mềm logistics quốc tế.
- Nhà cung cấp phần mềm logistics Việt Nam.
- Công cụ ngang ngành: Microsoft, Google, Zalo, OCR/RPA.
- Báo cáo thị trường/số liệu công khai.

Tiêu chí hoàn thành:

- Mỗi nguồn có tên, tổ chức phát hành, link.
- Nguồn dùng cho nhận định quan trọng phải có trong danh sách.
- Không để nguồn dạng placeholder.

### Task 17: Review tổng thể bản báo cáo

Đây là task cuối cùng, thực hiện sau khi viết xong toàn bộ file.

Đầu ra:

- Bản `bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md` đã được review và chỉnh sửa.
- Ghi chú ngắn các điểm đã chỉnh.

Checklist review nội dung:

- [ ] Báo cáo không nhắc Agentify.
- [ ] Báo cáo không có nội dung MVP/business plan/go-to-market.
- [ ] Executive summary phản ánh đúng nội dung 9 cụm.
- [ ] Phần A->B đủ rõ để người ngoài ngành hiểu.
- [ ] 9 cụm có cấu trúc thống nhất.
- [ ] Mỗi cụm đủ 8 mục theo yêu cầu.
- [ ] Pain của từng cụm đủ chi tiết, có tình huống, nguyên nhân, tác động.
- [ ] Bảng công cụ/sản phẩm phân loại rõ nguồn gốc: chính thức, chuẩn chung, hệ thống riêng, thương mại, ngang ngành, thủ công.
- [ ] Không bịa thị phần hoặc số lượng đơn vị sử dụng.
- [ ] Các số liệu không chắc chắn được ghi rõ là chưa có nguồn công khai hoặc cần kiểm chứng.
- [ ] Khoảng trống từng cụm và toàn thị trường viết trung lập, không biến thành đề xuất sản phẩm.

Checklist review văn phong:

- [ ] Dễ hiểu với người ngoài ngành.
- [ ] Thuật ngữ được giải thích.
- [ ] Không quá dài dòng ở phần nền nhưng đủ chi tiết ở phần pain.
- [ ] Không có ngôn ngữ quảng cáo.
- [ ] Cách gọi thuật ngữ thống nhất: lô hàng/shipment, chủ hàng, forwarder, carrier, trucking, WMS, TMS, ERP.

Checklist review kỹ thuật:

```bash
rg -n "Agentify|MVP|business plan|go-to-market|TODO|TBD|placeholder|contentReference" docs/khao-sat-thi-truong-logistic/bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md
git diff --no-index --check -- /dev/null docs/khao-sat-thi-truong-logistic/bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md
wc -l docs/khao-sat-thi-truong-logistic/bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md
```

Kỳ vọng:

- `rg` không trả về nội dung cần loại bỏ.
- Không có lỗi whitespace.
- File đủ dài và đủ chi tiết để gửi sếp.

### Cách thực hiện theo đợt

Nếu muốn chia nhỏ theo phiên làm việc, nên làm theo các đợt:

| Đợt | Task | Kết quả |
|---|---|---|
| Đợt 1 | Task 0-4 | Có skeleton, executive summary nháp, định nghĩa, workflow A->B, bản đồ 9 cụm |
| Đợt 2 | Task 5-8 | Viết xong Cụm 1-4 |
| Đợt 3 | Task 9-13 | Viết xong Cụm 5-9 |
| Đợt 4 | Task 14-16 | Viết tổng hợp khoảng trống, nhận định cần khảo sát thêm, nguồn tham khảo |
| Đợt 5 | Task 17 | Review tổng thể và chỉnh bản gửi sếp |
