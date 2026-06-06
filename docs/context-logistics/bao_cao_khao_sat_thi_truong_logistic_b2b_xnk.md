# Báo cáo khảo sát thị trường logistics B2B/XNK Việt Nam

- Phiên bản: v1 - bản hoàn chỉnh sau rà soát
- Ngày: 04/06/2026
- Phạm vi: logistics B2B, logistics công nghiệp, xuất nhập khẩu tại Việt Nam
- Mục đích: khảo sát thực trạng thị trường, quy trình vận hành và các nhóm nghiệp vụ chính trong hành trình một lô hàng từ điểm A đến điểm B
- Nguồn nền: 9 file research theo cụm trong thư mục `docs/khao-sat-thi-truong-logistic/` và các nguồn công khai được liệt kê ở cuối báo cáo

## 1. Executive Summary

Logistics B2B/XNK là phần hạ tầng vận hành đứng sau hoạt động sản xuất, thương mại và xuất nhập khẩu của doanh nghiệp. Ở góc nhìn người ngoài ngành, logistics thường bị hiểu đơn giản là "vận chuyển hàng". Trong thực tế, một lô hàng B2B/XNK không chỉ cần xe, tàu, máy bay hay kho. Lô hàng phải đi qua một chuỗi bước liên quan đến PO, hợp đồng, booking quốc tế, chứng từ, hải quan, cảng, trucking nội địa, kho, hóa đơn, đối soát chi phí và giao tiếp cập nhật trạng thái giữa nhiều bên.

Quy mô thị trường Việt Nam cho thấy đây là một mảng vận hành lớn. Theo National Statistics Office of Vietnam, năm 2025 kim ngạch xuất khẩu hàng hóa của Việt Nam đạt 475,04 tỷ USD, nhập khẩu đạt 455,01 tỷ USD, tổng kim ngạch hàng hóa đạt khoảng 930,05 tỷ USD và thặng dư thương mại hàng hóa đạt 20,03 tỷ USD. Cũng trong năm 2025, khối lượng hàng hóa vận chuyển cả năm ước đạt 3.027,7 triệu tấn, tăng 14,1% so với năm trước. Các con số này cho thấy mỗi tăng trưởng thương mại đều kéo theo tăng nhu cầu về vận tải, chứng từ, thông quan, kho bãi, cập nhật trạng thái và đối soát chi phí.

Thị trường đã có nhiều hệ thống và công cụ theo từng điểm nút. Các hệ thống chính thức như VNACCS/VCIS, National Single Window, VASSCM, hệ thống ePort của cảng, hệ thống đặt lịch/ra vào cảng và các nền tảng của hãng tàu giúp xử lý các nghiệp vụ quan trọng về pháp lý, cảng biển và vận tải quốc tế. Các sản phẩm thương mại như ERP, TMS, WMS, phần mềm forwarding, phần mềm kế toán, GPS/fleet management, OCR/document AI, CRM/helpdesk cũng được dùng tùy quy mô doanh nghiệp.

Tuy nhiên, điểm đáng chú ý là nhiều hệ thống chỉ giải quyết một phần của quy trình. Hệ thống hải quan quản lý tờ khai và kết quả thông quan. Hệ thống cảng quản lý lệnh giao nhận và điều kiện qua cảng. TMS quản lý xe. WMS quản lý kho. ERP quản lý PO, tồn kho, tài chính. Phần mềm forwarder quản lý job, booking, chứng từ và billing. Khi một câu hỏi thực tế cần dữ liệu từ nhiều nơi, nhân viên vẫn phải mở nhiều hệ thống, đọc email, hỏi Zalo, xem file Excel và tổng hợp thủ công.

Do đó, khoảng trống lớn nhất của thị trường không nằm ở việc "chưa có phần mềm nào". Khoảng trống nằm ở việc dữ liệu vận hành bị phân mảnh giữa nhiều bên, nhiều hệ thống và nhiều kênh giao tiếp. Trong thực tế, Excel, email, Zalo, file PDF, ảnh chụp POD/EIR, ảnh chụp màn hình và ghi chú cá nhân vẫn là lớp vận hành phổ biến, đặc biệt ở doanh nghiệp vừa và nhỏ, forwarder nội địa, trucking vendor, kho thuê ngoài và các đội CS/Ops cần trả lời khách nhanh.

Báo cáo này chia toàn bộ hành trình logistics B2B/XNK thành 9 cụm/layer. Cách chia này giúp nhìn thị trường theo luồng vận hành thực tế của một lô hàng, thay vì chỉ nhìn theo danh mục dịch vụ rời rạc. Chín cụm gồm: hải quan/cảng/depot/ICD; chủ hàng/PO/hợp đồng/cam kết giao hàng; forwarder/booking quốc tế/hãng tàu/hãng bay; chứng từ XNK; trucking nội địa; kho/WMS/3PL warehouse; kế toán/chi phí/hóa đơn/đối soát; CS/Ops/Account trả lời khách; và lớp Excel/email/Zalo/file thủ công.

Các phần sau của báo cáo sẽ lần lượt đi sâu từng cụm theo cùng một cấu trúc: mục tiêu khảo sát, vai trò của cụm trong hành trình A->B, thuật ngữ cần biết, workflow thực tế, thực trạng hiện tại, pain, công cụ/sản phẩm đang dùng và khoảng trống thị trường.

## 2. Phạm vi và định nghĩa

### 2.1. Logistics là gì?

Logistics là việc lập kế hoạch, tổ chức, điều phối và kiểm soát dòng chảy của hàng hóa, thông tin và chứng từ từ điểm xuất phát đến điểm cần giao. Logistics không chỉ là vận tải. Nó bao gồm cả kho bãi, đóng gói, chứng từ, hải quan, điều phối nhà cung cấp, theo dõi trạng thái, xử lý phát sinh, thanh toán chi phí và đối soát.

Ví dụ dễ hiểu: một công ty Việt Nam nhập linh kiện điện tử từ Trung Quốc về nhà máy ở Bắc Ninh. Để lô hàng về được nhà máy, doanh nghiệp phải làm việc với nhà cung cấp, forwarder, hãng tàu, cảng, hải quan, trucking, kho, ngân hàng và kế toán. Tất cả các bước đó là một phần của logistics.

### 2.2. Logistics B2B là gì?

Logistics B2B là logistics phục vụ giao dịch giữa doanh nghiệp với doanh nghiệp. Khách hàng trong chuỗi này thường là nhà máy, công ty thương mại, nhà phân phối, doanh nghiệp xuất khẩu, doanh nghiệp nhập khẩu, 3PL, forwarder hoặc tập đoàn FDI.

Logistics B2B khác logistics giao hàng thương mại điện tử nội địa ở một số điểm:

- Đơn hàng thường có giá trị cao hơn và liên quan đến hợp đồng/PO.
- Lô hàng có thể đi bằng container, hàng lẻ LCL, air cargo hoặc xe tải liên tỉnh.
- Chứng từ phức tạp hơn, có thể gồm invoice, packing list, B/L, C/O, tờ khai hải quan, giấy phép chuyên ngành.
- Chậm giao có thể ảnh hưởng đến sản xuất, doanh thu, tiền phạt hợp đồng hoặc uy tín với khách hàng B2B.
- Chi phí logistics thường cần đối soát theo shipment, PO, container, nhà cung cấp, khách hàng và kỳ kế toán.

### 2.3. Xuất nhập khẩu là gì?

Xuất nhập khẩu, viết tắt là XNK, là hoạt động đưa hàng hóa ra khỏi Việt Nam để bán cho thị trường nước ngoài hoặc đưa hàng hóa từ nước ngoài vào Việt Nam. Xuất khẩu và nhập khẩu không chỉ là giao dịch mua bán, mà còn liên quan đến quy định hải quan, thuế, chứng từ, kiểm tra chuyên ngành, vận tải quốc tế và thanh toán quốc tế.

Ví dụ:

- Xuất khẩu: một nhà máy may mặc ở Bình Dương xuất container hàng sang Mỹ.
- Nhập khẩu: một nhà máy ở Hải Phòng nhập máy móc từ Nhật Bản.
- Tạm nhập tái xuất, gia công, sản xuất xuất khẩu: các mô hình XNK đặc thù, liên quan nhiều hơn đến quy định hải quan và quản lý định mức/nguyên phụ liệu.

### 2.4. Bảng thuật ngữ nền

| Thuật ngữ | Giải thích ngắn | Ví dụ dễ hiểu |
|---|---|---|
| Logistics | Tổ chức dòng chảy hàng hóa, thông tin và chứng từ từ điểm xuất phát đến điểm nhận | Điều phối hàng từ nhà cung cấp Trung Quốc về nhà máy Việt Nam |
| Logistics B2B | Logistics phục vụ giao dịch giữa doanh nghiệp với doanh nghiệp | Nhà máy nhập linh kiện, công ty xuất khẩu hàng thành phẩm |
| XNK | Xuất nhập khẩu | Xuất hàng may mặc sang Mỹ, nhập máy móc từ Nhật |
| Lô hàng/shipment | Một đơn vị vận hành logistics có lịch trình, chứng từ và trạng thái riêng | 1 container 40 feet nhập từ Shanghai về Cát Lái |
| PO | Purchase Order, đơn đặt hàng của bên mua gửi bên bán | PO mua 10.000 linh kiện cần giao trước ngày 15/07 |
| Sales Order | Đơn bán hàng do bên bán tạo sau khi nhận PO | Nhà cung cấp tạo SO để sản xuất và giao hàng theo PO |
| Container | Thùng tiêu chuẩn dùng để chứa hàng vận chuyển, phổ biến 20 feet và 40 feet | 1 container 40HC hàng nội thất |
| FCL | Full Container Load, hàng nguyên container | Một chủ hàng dùng trọn một container |
| LCL | Less than Container Load, hàng lẻ ghép container | Nhiều chủ hàng ghép hàng vào chung một container |
| Booking | Đặt chỗ vận chuyển với hãng tàu, hãng bay, NVOCC hoặc co-loader | Đặt chỗ tàu đi Hải Phòng - Los Angeles |
| ETD | Estimated Time of Departure, thời gian dự kiến khởi hành | Tàu dự kiến rời cảng ngày 10/07 |
| ETA | Estimated Time of Arrival, thời gian dự kiến đến | Tàu dự kiến đến Cát Lái ngày 18/07 |
| B/L | Bill of Lading, vận đơn đường biển | Chứng từ vận tải do hãng tàu/forwarder phát hành |
| AWB | Air Waybill, vận đơn hàng không | Chứng từ vận tải cho lô hàng air cargo |
| Customs clearance | Thông quan hải quan | Khai tờ khai, nộp thuế, kiểm tra và được phép xuất/nhập |
| Incoterms | Bộ quy tắc phân chia chi phí, rủi ro và trách nhiệm giao hàng trong thương mại quốc tế | FOB, CIF, EXW, DAP |
| Warehouse inbound | Quá trình nhận hàng vào kho | Xe giao container về kho, kho đếm và nhập tồn |
| Warehouse outbound | Quá trình xuất hàng ra kho | Kho lấy hàng theo lệnh và bàn giao cho xe |
| POD | Proof of Delivery, bằng chứng giao hàng | Biên bản giao nhận, ảnh giao hàng, chữ ký người nhận |
| DEM/DET | Demurrage/Detention, phí lưu container hoặc giữ container quá hạn | Chậm lấy hàng hoặc trả rỗng bị tính phí |

## 3. Quy trình một lô hàng đi từ A đến B

### 3.1. Cách đọc hành trình A->B

Trong logistics B2B/XNK, "A đến B" không chỉ là từ địa điểm này sang địa điểm khác. A->B là hành trình của cả hàng hóa, thông tin và trách nhiệm.

Một lô hàng có ít nhất ba dòng chảy song song:

1. Dòng hàng hóa: hàng đi từ nhà cung cấp, qua kho/cảng/tàu/xe, đến kho hoặc nhà máy của người nhận.
2. Dòng chứng từ: PO, hợp đồng, invoice, packing list, booking, B/L/AWB, C/O, tờ khai hải quan, D/O, POD, hóa đơn chi phí.
3. Dòng thông tin: trạng thái booking, cut-off, ETD/ETA, thông quan, xe đến đâu, kho đã nhận chưa, chi phí phát sinh, ai cần xử lý bước tiếp theo.

Nếu một trong ba dòng này bị đứt, lô hàng có thể chậm hoặc bị "kẹt" dù hàng hóa vẫn đang nằm trong container. Ví dụ, tàu đã đến cảng nhưng chưa có D/O, chưa nộp local charge hoặc tờ khai chưa thông quan thì container vẫn chưa lấy ra được. Ngược lại, xe có thể đã giao hàng về kho nhưng kho chưa nhập tồn, nên phòng kế hoạch sản xuất vẫn chưa thấy hàng sẵn sàng.

### 3.2. Case 1: Nhập khẩu B2B đường biển FCL

Đây là case phổ biến với doanh nghiệp Việt Nam nhập nguyên vật liệu, linh kiện, máy móc hoặc hàng thành phẩm bằng container.

1. Doanh nghiệp Việt Nam phát sinh nhu cầu mua hàng từ nhà cung cấp nước ngoài.
2. Hai bên thống nhất PO, hợp đồng, giá, điều kiện thanh toán, Incoterms và ngày cần giao.
3. Tùy Incoterms, bên bán, bên mua hoặc forwarder sẽ đặt booking với hãng tàu/NVOCC/co-loader.
4. Hàng được sản xuất, đóng gói và đóng vào container tại nước xuất khẩu.
5. Bộ chứng từ ban đầu được tạo: commercial invoice, packing list, booking confirmation, B/L draft, C/O nếu có.
6. Container hạ cảng tại nước xuất khẩu, hoàn tất thủ tục xuất khẩu và lên tàu.
7. Tàu chạy từ cảng xuất đến cảng nhập tại Việt Nam.
8. Trước khi tàu đến, forwarder hoặc đại lý gửi arrival notice, local charge, hướng dẫn lấy D/O và bộ chứng từ liên quan.
9. Bộ phận chứng từ/đại lý hải quan kiểm tra invoice, packing list, B/L, C/O, HS code, trị giá, điều kiện nhập khẩu.
10. Doanh nghiệp hoặc đại lý khai tờ khai hải quan trên phần mềm khai báo, truyền dữ liệu lên VNACCS/VCIS.
11. Hệ thống trả kết quả phân luồng: xanh, vàng hoặc đỏ. Tùy kết quả, hồ sơ có thể được thông quan nhanh, kiểm tra hồ sơ hoặc kiểm hóa thực tế.
12. Doanh nghiệp hoàn thành nghĩa vụ thuế và các điều kiện chuyên ngành nếu có.
13. Làm thủ tục với hãng tàu/forwarder để lấy D/O hoặc eD/O; thanh toán local charge nếu cần.
14. Làm thủ tục cảng/ePort, kiểm tra điều kiện container được lấy ra khỏi cảng.
15. Đơn vị trucking nhận lệnh, điều xe vào cảng lấy container.
16. Xe giao container về kho, nhà máy hoặc ICD/kho 3PL theo lịch hẹn.
17. Kho dỡ hàng, kiểm đếm, ghi nhận lệch thiếu/hỏng nếu có, tạo GRN/phiếu nhập và cập nhật tồn kho.
18. Container rỗng được trả về depot theo chỉ định và trong hạn free time.
19. Các bên đối soát chi phí: cước quốc tế, local charge, phí cảng, trucking, kho, khai báo, DEM/DET nếu có.
20. CS/Ops/Account cập nhật trạng thái cho khách hàng hoặc các phòng ban nội bộ trong suốt quá trình.

Điểm dễ đứt gãy trong case nhập khẩu:

- PO/hợp đồng không map rõ với shipment/container.
- Chứng từ sai giữa invoice, packing list, B/L và tờ khai.
- Thông tin ETA thay đổi nhưng không được cập nhật cho kho/trucking.
- Chưa thanh toán local charge hoặc chưa có D/O nên xe không lấy được hàng.
- Tờ khai bị luồng vàng/đỏ nhưng CS không nắm rõ lý do.
- Xe đã giao nhưng kho chưa nhập tồn, khách vẫn xem như hàng chưa sẵn sàng.
- Chi phí phát sinh chỉ được phát hiện khi đối soát cuối kỳ.

### 3.3. Case 2: Xuất khẩu B2B đường biển FCL

Đây là case phổ biến với nhà máy Việt Nam xuất hàng thành phẩm sang khách hàng nước ngoài.

1. Doanh nghiệp Việt Nam nhận PO hoặc hợp đồng từ khách nước ngoài.
2. Bộ phận sales, planning và sản xuất thống nhất ngày sẵn sàng hàng, ngày đóng container và ngày cần giao.
3. Tùy Incoterms, doanh nghiệp Việt Nam, khách hàng nước ngoài hoặc forwarder đặt booking với hãng tàu/NVOCC/co-loader.
4. Forwarder/hãng tàu xác nhận booking, ETD, ETA, cut-off CY, cut-off SI, cut-off VGM và thông tin cảng hạ.
5. Doanh nghiệp chuẩn bị hàng, chứng từ thương mại và kế hoạch đóng container.
6. Trucking lấy container rỗng từ depot, kéo về kho/nhà máy để đóng hàng.
7. Kho/nhà máy đóng hàng, kiểm container, ghi số container, số seal, trọng lượng và thông tin kiện hàng.
8. Doanh nghiệp hoặc forwarder gửi SI, khai báo VGM và chuẩn bị B/L draft.
9. Đại lý hải quan khai tờ khai xuất khẩu, xử lý giấy phép/chứng nhận chuyên ngành nếu cần.
10. Trucking kéo container hàng ra cảng trước cut-off.
11. Container qua cổng cảng, được xếp lên tàu nếu đáp ứng điều kiện.
12. Hãng tàu/forwarder phát hành B/L theo thông tin đã duyệt.
13. Doanh nghiệp gửi bộ chứng từ cho khách, ngân hàng hoặc bên liên quan: invoice, packing list, B/L, C/O, chứng nhận chất lượng nếu có.
14. CS/Ops tiếp tục theo dõi ETD/ETA, delay, roll cargo hoặc thay đổi lịch tàu.
15. Sau khi hoàn tất, các bên đối soát chi phí trucking, local charge, cước quốc tế, phí chứng từ, phí kho/đóng hàng và các phí phát sinh.

Điểm dễ đứt gãy trong case xuất khẩu:

- Kế hoạch sản xuất thay đổi nhưng booking/cut-off không được điều chỉnh kịp.
- Lấy rỗng muộn, kho đóng hàng trễ, container hạ cảng trễ.
- SI/VGM gửi trễ hoặc sai, dẫn đến sửa B/L, chậm phát hành vận đơn.
- Hàng bị roll sang chuyến sau nhưng khách không được báo sớm.
- C/O hoặc chứng từ ngân hàng bị sai, ảnh hưởng thanh toán.
- Chi phí phát sinh từ trucking, cảng, sửa chứng từ hoặc lưu container không được ghi nhận kịp.

### 3.4. Các bên liên quan trong một lô hàng B2B/XNK

| Bên liên quan | Vai trò chính | Dữ liệu họ nắm giữ |
|---|---|---|
| Chủ hàng/importer/exporter | Phát sinh nhu cầu mua/bán, chịu tác động kinh doanh cuối cùng | PO, hợp đồng, invoice, kế hoạch giao/nhận, yêu cầu khách hàng |
| Nhà cung cấp/khách nước ngoài | Bán/mua hàng, cung cấp chứng từ và cam kết giao dịch | Invoice, packing list, booking, thông tin hàng, điều kiện giao hàng |
| Forwarder | Điều phối vận tải, booking, chứng từ, cập nhật trạng thái | Booking, ETD/ETA, B/L, arrival notice, job file, email với carrier |
| Hãng tàu/hãng bay/NVOCC | Vận chuyển quốc tế | Booking confirmation, lịch tàu/chuyến bay, B/L/AWB, tracking, local charge |
| Đại lý hải quan/docs team | Khai báo và xử lý chứng từ thông quan | Tờ khai, mã HS, trị giá, C/O, giấy phép, kết quả phân luồng |
| Hải quan | Quản lý nhà nước về XNK | Tờ khai, kết quả phân luồng, thông quan, giám sát |
| Cảng/depot/ICD | Điểm hạ, lấy, trả, lưu giữ container/hàng | Lệnh giao nhận, trạng thái qua cổng, phí cảng, EIR, depot trả rỗng |
| Trucking vendor/tài xế | Vận tải nội địa | Lệnh xe, biển số, tài xế, container/seal, POD, EIR, ảnh giao nhận |
| Kho/3PL warehouse | Nhận, kiểm, lưu, xuất hàng | GRN, POD, tồn kho, lệch thiếu, hình ảnh, phiếu nhập/xuất |
| Kế toán/tài chính | Thanh toán, billing, đối soát chi phí | Hóa đơn, debit note, vendor invoice, chi phí thực tế, margin |
| CS/Ops/Account | Trả lời khách và điều phối thông tin | Trạng thái tổng hợp, ghi chú phát sinh, follow-up, email/Zalo |

## 4. Bản đồ 9 cụm/layer trong logistics B2B/XNK

Báo cáo này chia hành trình logistics B2B/XNK thành 9 cụm. Một cụm không nhất thiết là một phòng ban độc lập; nó là một nhóm nghiệp vụ và dữ liệu có liên quan với nhau. Cách chia này phù hợp với thực tế vận hành vì một lô hàng thường bị tắc ở điểm giao nhau giữa các cụm, chứ không chỉ tắc bên trong một hệ thống.

| Cụm | Tên cụm | Vai trò trong hành trình A->B | Bên liên quan chính | Hệ thống/công cụ thường gặp |
|---|---|---|---|---|
| 1 | Hải quan, cảng, depot/ICD | Điểm nút pháp lý và hạ tầng để hàng được thông quan, lấy khỏi cảng, hạ cảng, qua giám sát hoặc trả rỗng | Hải quan, cảng, depot, ICD, forwarder, đại lý hải quan, trucking | VNACCS/VCIS, ECUS, VASSCM, National Single Window, ePort, SmartGate/TAS |
| 2 | Chủ hàng, PO, hợp đồng, cam kết giao hàng | Nơi phát sinh nhu cầu kinh doanh, thời hạn giao hàng và áp lực đúng cam kết | Importer, exporter, procurement, sales, planning, nhà máy, nhà phân phối | ERP, Excel, email, forwarder portal, supplier/customer portal |
| 3 | Forwarder, booking quốc tế, hãng tàu/hãng bay | Tổ chức vận tải quốc tế, quản lý booking, cut-off, ETD/ETA và thay đổi lịch | Forwarder, carrier, NVOCC, co-loader, agent nước ngoài, shipper, consignee | Carrier portal, CargoWise, Magaya, Winta, INTTRA/e2open, WebCargo/Freightos, email |
| 4 | Chứng từ XNK | Bộ hồ sơ pháp lý/thương mại giúp khai báo, thông quan, nhận hàng, thanh toán và lưu trữ | Docs team, đại lý hải quan, chủ hàng, forwarder, hải quan, ngân hàng, cơ quan cấp C/O | VNACCS/VCIS, ECUS, NSW, eCO, DMS/OCR, PDF/email, forwarding software |
| 5 | Trucking nội địa | Kết nối cảng/depot/ICD với kho, nhà máy, CFS và điểm giao nhận nội địa | Nhà xe, tài xế, forwarder, kho, cảng, depot, chủ hàng | TMS, GPS/fleet, LOGIVAN, EcoTruck, Vietmap, ePort/SmartGate, Zalo/điện thoại |
| 6 | Kho, WMS, 3PL warehouse | Nhận, kiểm, lưu, nhập tồn, xuất kho, xử lý lệch thiếu và cập nhật tồn/trạng thái | Kho chủ hàng, kho nhà máy, 3PL, ICD/CFS, forwarder, trucking | WMS, ERP inventory, TigerWMS, Smartlog, Infolog, Odoo, SAP EWM, Excel |
| 7 | Kế toán, chi phí, hóa đơn, đối soát | Kiểm soát cost, revenue, margin, hóa đơn, phí phát sinh và thanh toán theo shipment/container/PO | Kế toán, Ops, Sales, vendor, khách hàng, manager | MISA, FAST, BRAVO, ERP, CargoWise accounting, Winta, Excel, e-invoice |
| 8 | CS/Ops/Account trả lời khách | Lớp giao tiếp và tổng hợp thông tin để trả lời "hàng đang ở đâu, có vấn đề gì, khi nào giao?" | CS, Ops, Account, Sales, khách hàng, các team nội bộ, vendor | Email, Zalo, CRM/helpdesk, portal, Excel tracking, TMS/WMS/ERP report |
| 9 | Excel, email, Zalo, file thủ công | Lớp vận hành không chính thức nhưng phổ biến, nơi dữ liệu thật thường được cập nhật nhanh nhất | Gần như tất cả các bên vận hành | Excel, Google Sheets, email, Zalo, Drive/OneDrive, PDF, ảnh chụp, ghi chú cá nhân |

### 4.1. Tại sao phải tách thành 9 cụm?

Nếu chỉ nói "thị trường logistics" thì quá rộng và khó khảo sát. Mỗi nhóm người dùng có workflow, công cụ, pain và cách mua phần mềm khác nhau. Người khai hải quan quan tâm tờ khai, luồng kiểm tra và thông quan. Người trucking quan tâm xe, tài xế, lệnh cảng, POD và trả rỗng. Người kho quan tâm inbound, outbound, tồn kho và lệch thiếu. Người kế toán quan tâm hóa đơn, đối soát, chi phí phát sinh và margin. Người CS/Ops lại quan tâm cách trả lời khách nhanh và đúng.

Chia theo cụm giúp báo cáo trả lời được ba câu hỏi:

1. Cụm này có vai trò gì trong hành trình lô hàng?
2. Cụm này đang được số hóa bằng hệ thống nào và phần nào vẫn thủ công?
3. Khoảng trống thị trường nằm ở đâu: thiếu công cụ, thiếu tích hợp, thiếu chuẩn dữ liệu, thiếu quy trình hay thiếu khả năng cập nhật trạng thái liên doanh nghiệp?

### 4.2. Quan hệ giữa 9 cụm trong một shipment

Một shipment nhập khẩu FCL có thể đi qua 9 cụm theo thứ tự gần đúng như sau:

```text
PO/hợp đồng của chủ hàng
  -> booking quốc tế với forwarder/hãng tàu
  -> chứng từ XNK
  -> khai hải quan và thủ tục cảng
  -> trucking lấy container
  -> kho nhận và nhập tồn
  -> đối soát chi phí/hóa đơn
  -> CS/Ops cập nhật cho khách
  -> dữ liệu phụ trợ nằm trong Excel/email/Zalo/file
```

Trong thực tế, các cụm không chạy hoàn toàn tuần tự. Chúng chạy song song và lặp lại. Ví dụ, chứng từ được chuẩn bị trước khi tàu đến; trucking phải đặt lịch trước khi tờ khai thông quan; kế toán có thể phải thanh toán local charge trước khi lấy D/O; CS/Ops phải cập nhật khách trong khi tất cả các bước con đang diễn ra.

Do đó, khi research từng cụm, cần nhìn cả hai lớp:

- Lớp nghiệp vụ riêng của cụm: trong cụm đó ai làm gì, dùng công cụ nào, có pain nào.
- Lớp liên kết liên cụm: dữ liệu của cụm đó có được đưa sang các cụm khác đúng lúc, đúng định dạng và đúng người không.

## 5. Hướng dẫn đọc các phần research từng cụm

Mỗi cụm trong các phần sau của báo cáo sẽ được viết theo cùng một cấu trúc:

1. Mục tiêu khảo sát cụm này: giải thích cụm là gì, gồm những bên nào, quản lý loại dữ liệu/quy trình nào.
2. Tại sao khảo sát cụm này: vai trò của cụm trong hành trình A->B, tác động đến thời gian, chi phí, rủi ro pháp lý và chất lượng dịch vụ.
3. Bảng thuật ngữ: giải thích các từ chuyên ngành để người ngoài ngành có thể tra cứu nhanh.
4. Workflow thực tế hiện tại: mô tả luồng theo case, ai làm, dùng công cụ gì, dữ liệu đi qua đâu.
5. Thực trạng hiện tại: mức độ số hóa, hệ thống đang có, phần nào vẫn thủ công, khác biệt giữa doanh nghiệp lớn/FDI và SME.
6. Pain của cụm: các điểm đau lớn, tình huống thực tế, nguyên nhân gốc và hậu quả.
7. Công cụ, sản phẩm hiện tại đang được sử dụng: phân biệt hệ thống chính thức/chuyên ngành, hệ thống do một bên tự phát triển, sản phẩm thương mại và công cụ phổ thông.
8. Tổng hợp khoảng trống của cụm: những phần thị trường chưa được giải quyết tốt hoặc cần khảo sát sau bằng phỏng vấn/thực địa.

## 6. Cụm 1: Hải quan, cảng, depot/ICD

### 6.1. Mục tiêu khảo sát cụm này

Cụm hải quan, cảng, depot/ICD là lớp pháp lý và hạ tầng vật lý quan trọng nhất khi hàng xuất nhập khẩu đi qua biên giới. Cụm này trả lời các câu hỏi rất thực tế: hàng đã được khai báo chưa, tờ khai đã phân luồng chưa, đã thông quan chưa, container đã đủ điều kiện ra khỏi cảng chưa, xe có lấy được container không, container rỗng phải trả ở đâu và có đang phát sinh phí lưu bãi/lưu container không.

Các bên chính trong cụm này gồm cơ quan Hải quan, doanh nghiệp cảng, depot, ICD, hãng tàu/đại lý hãng tàu, forwarder, đại lý hải quan, trucking vendor và chủ hàng. Dữ liệu của cụm nằm rải rác ở nhiều hệ thống: VNACCS/VCIS, phần mềm khai báo hải quan như ECUS, VASSCM, National Single Window, ePort của cảng, hệ thống thanh toán điện tử hải quan, hệ thống đặt lịch vào cổng, barcode container, EIR và các kênh email/Zalo nội bộ.

Nói ngắn gọn: đây là cụm quyết định một lô hàng có được phép đi qua các điểm kiểm soát chính thức hay không. Nếu cụm này bị chậm, các cụm sau như trucking, kho, giao hàng, kế toán và CS đều bị ảnh hưởng dây chuyền.

### 6.2. Tại sao khảo sát cụm này?

Hải quan và cảng là nơi rủi ro vận hành chuyển thành chi phí rất nhanh. Một tờ khai bị luồng vàng/đỏ, một chứng từ thiếu, một khoản phí cảng chưa thanh toán, một lệnh giao hàng chưa release hoặc một container chưa qua trạng thái giám sát đều có thể khiến xe không lấy được hàng. Khi xe đã điều ra cảng nhưng container chưa đủ điều kiện lấy, doanh nghiệp có thể mất phí chờ xe, trễ slot kho, phát sinh lưu bãi/lưu container và phải trả lời khách nhiều lần.

Đây cũng là cụm có mức số hóa chính thức cao hơn nhiều cụm khác. Việt Nam có hệ thống thông quan điện tử VNACCS/VCIS, Cổng thông tin một cửa quốc gia, hệ thống thanh toán điện tử và thông quan 24/7, VASSCM và nhiều cổng cảng điện tử. Tuy nhiên, số hóa ở đây không đồng nghĩa với việc doanh nghiệp có một timeline thống nhất. Mỗi hệ thống thường phục vụ một mục đích riêng, có quyền truy cập riêng, dữ liệu riêng và cách xuất/tra cứu riêng.

Điểm cần nhìn rõ: hệ thống chính thức giúp xử lý thủ tục, nhưng không thay thế workflow điều phối nội bộ của doanh nghiệp. Nhân viên vẫn phải copy số tờ khai, chụp màn hình phân luồng, gửi trạng thái thông quan cho CS, báo trucking khi được lấy hàng, theo dõi lịch trả rỗng và cập nhật file tracking.

### 6.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| VNACCS | Hệ thống thông quan tự động của Hải quan Việt Nam | Nhận và xử lý tờ khai điện tử | Nhân viên truyền tờ khai nhập khẩu lên VNACCS |
| VCIS | Hệ thống thông tin phục vụ quản lý rủi ro hải quan | Hỗ trợ phân tích và quản lý nghiệp vụ của Hải quan | Doanh nghiệp không thao tác trực tiếp nhiều trên VCIS |
| ECUS | Phần mềm thương mại dùng để khai hải quan điện tử | Giao diện nghiệp vụ để doanh nghiệp/đại lý khai báo lên VNACCS | Nhân viên chứng từ nhập dữ liệu invoice, packing list, HS code trên ECUS |
| VASSCM | Hệ thống quản lý, giám sát hải quan tự động | Kết nối dữ liệu giám sát giữa Hải quan và cảng/kho/bãi | Xác nhận hàng/container đã đủ điều kiện qua khu vực giám sát |
| National Single Window | Cổng thông tin một cửa quốc gia | Gửi hồ sơ điện tử đến các bộ/ngành liên quan | Xin giấy phép/chứng nhận chuyên ngành qua một cổng |
| Tờ khai hải quan | Hồ sơ khai báo hàng xuất/nhập khẩu | Cơ sở để thông quan và tính thuế | Tờ khai nhập khẩu linh kiện điện tử |
| Phân luồng | Kết quả kiểm tra của Hải quan | Xác định mức độ kiểm tra: xanh, vàng, đỏ | Luồng vàng phải kiểm tra hồ sơ |
| Luồng xanh | Miễn kiểm tra hồ sơ và hàng hóa nếu đủ điều kiện | Giúp thông quan nhanh | Lô hàng được thông quan tự động |
| Luồng vàng | Kiểm tra hồ sơ | Có thể chậm nếu chứng từ thiếu/sai | Hải quan yêu cầu bổ sung C/O |
| Luồng đỏ | Kiểm tra hồ sơ và kiểm hóa thực tế | Rủi ro chậm cao hơn | Container phải mở kiểm thực tế |
| D/O hoặc eD/O | Delivery Order, lệnh giao hàng | Điều kiện để nhận hàng từ hãng tàu/cảng | Forwarder lấy eD/O sau khi thanh toán local charge |
| EIR | Equipment Interchange Receipt | Biên nhận tình trạng container khi giao/nhận | Tài xế nhận EIR khi lấy container khỏi cảng |
| Depot | Bãi container rỗng | Nơi lấy/trả container rỗng | Sau khi rút hàng, xe trả rỗng về depot chỉ định |
| ICD | Inland Container Depot, cảng cạn | Điểm thông quan/lưu container nội địa | Container chuyển từ cảng biển về ICD để xử lý |
| DEM/DET | Phí lưu bãi/lưu container quá hạn | Chi phí phát sinh khi lấy/trả container trễ | Chậm thông quan làm phát sinh detention |

### 6.4. Workflow thực tế hiện tại

#### Case: Nhập khẩu FCL qua cảng biển

1. Forwarder hoặc chủ hàng nhận arrival notice, B/L, invoice, packing list và các chứng từ liên quan.
2. Nhân viên chứng từ kiểm tra dữ liệu: shipper, consignee, mô tả hàng, số kiện, trọng lượng, trị giá, điều kiện giao hàng, HS code, C/O nếu có.
3. Nhân viên khai báo tạo tờ khai trên phần mềm khai hải quan, thường là ECUS hoặc phần mềm tương đương.
4. Dữ liệu được truyền lên VNACCS/VCIS để lấy số tờ khai và kết quả phân luồng.
5. Nếu luồng xanh, hồ sơ có thể đi nhanh hơn sau khi hoàn thành nghĩa vụ thuế và các điều kiện liên quan. Nếu luồng vàng, nhân viên phải nộp/giải trình hồ sơ. Nếu luồng đỏ, phải phối hợp kiểm hóa.
6. Nếu hàng thuộc diện kiểm tra chuyên ngành hoặc giấy phép, hồ sơ có thể đi qua National Single Window hoặc hệ thống chuyên ngành.
7. Khi tờ khai đủ điều kiện, nhân viên kiểm tra trạng thái giám sát hải quan/cảng để biết container có được phép qua khu vực giám sát không.
8. Forwarder/chủ hàng thanh toán local charge, lấy D/O hoặc eD/O từ hãng tàu/đại lý.
9. Nhân viên làm thủ tục cảng/ePort, thanh toán phí cảng, tạo lệnh giao container.
10. Trucking nhận lệnh, tài xế vào cảng lấy container, lấy EIR và kéo hàng về kho.
11. Sau khi rút hàng, xe trả container rỗng về depot đúng địa điểm và trong hạn free time.
12. CS/Ops cập nhật khách: thông quan chưa, hàng đã ra cảng chưa, xe đã lấy chưa, dự kiến giao kho khi nào.

Điểm dữ liệu dễ bị đứt: kết quả phân luồng nằm ở phần mềm khai báo; điều kiện qua cổng nằm ở hệ thống cảng/VASSCM; D/O nằm ở hãng tàu/forwarder; lệnh xe nằm ở trucking; file tracking lại do CS/Ops cập nhật thủ công.

#### Case: Xuất khẩu FCL

1. Chủ hàng hoặc forwarder nhận booking và cut-off từ hãng tàu/NVOCC.
2. Trucking lấy container rỗng từ depot, kéo về kho/nhà máy đóng hàng.
3. Kho/nhà máy đóng hàng, ghi số container, seal, trọng lượng và thông tin kiện hàng.
4. Forwarder/chủ hàng khai VGM, gửi SI và chuẩn bị chứng từ xuất khẩu.
5. Nhân viên khai báo tạo tờ khai xuất khẩu trên phần mềm khai hải quan và truyền lên VNACCS/VCIS.
6. Container được kéo ra cảng trước cut-off, làm thủ tục hạ cảng/ePort.
7. Hệ thống cảng và hải quan xác nhận container đủ điều kiện xếp tàu.
8. Nếu có vướng mắc về tờ khai, VGM, SI, cut-off hoặc phí cảng, container có thể bị lỡ chuyến.

### 6.5. Thực trạng hiện tại

Mức độ số hóa của cụm này tương đối cao ở lớp thủ tục chính thức, nhưng phân mảnh ở lớp vận hành doanh nghiệp. VNACCS/VCIS là hệ thống lõi cho thông quan điện tử. National Single Window giúp xử lý một số thủ tục liên bộ/ngành. VASSCM hỗ trợ giám sát hải quan tự động tại cảng, kho, bãi. Nhiều cảng lớn có ePort, thanh toán điện tử, đặt lịch xe, tra cứu container và phát hành chứng từ điện tử.

Tuy nhiên, người dùng doanh nghiệp không sống trong một hệ thống duy nhất. Nhân viên khai báo dùng phần mềm khai hải quan. Nhân viên chứng từ dùng email và PDF. Ops dùng ePort/cổng cảng. Điều phối xe dùng điện thoại/Zalo/TMS. Kế toán dùng phần mềm kế toán và cổng thanh toán. CS dùng Excel để trả lời khách. Vì vậy, dù từng điểm đã số hóa, bức tranh tổng thể của shipment vẫn phải được ghép thủ công.

Doanh nghiệp lớn/FDI thường có quy trình rõ hơn, phân quyền tốt hơn và có thể tích hợp ERP/TMS/WMS với một số dữ liệu. Doanh nghiệp vừa và nhỏ thường phụ thuộc nhiều hơn vào đại lý hải quan, forwarder và file tracking thủ công.

### 6.6. Pain của cụm này

**Pain 1: Dữ liệu trạng thái nằm ở nhiều hệ thống khác nhau.** Một câu hỏi đơn giản như "hàng lấy được chưa?" có thể cần kiểm tra tờ khai, thuế, D/O, phí cảng, VASSCM/ePort, lệnh xe và tình trạng tài xế. Không có một màn hình chung cho tất cả các điều kiện này.

**Pain 2: CS/Ops không trực tiếp có quyền vào hệ thống nghiệp vụ.** Người trả lời khách thường không phải người khai ECUS hoặc xử lý hải quan. Họ phải hỏi nhân viên chứng từ, chờ chụp màn hình hoặc chờ cập nhật file. Điều này làm phản hồi chậm và dễ sai ngữ cảnh.

**Pain 3: Chậm một điều kiện nhỏ có thể làm hỏng cả lịch vận hành.** Nếu chưa có D/O, chưa đóng phí cảng, chưa thông quan hoặc chưa đủ điều kiện qua giám sát, xe có thể không lấy được container. Khi đó chi phí không chỉ là chậm hàng, mà còn là phí chờ xe, lỡ slot kho, lưu bãi, detention và áp lực khách hàng.

**Pain 4: Luồng vàng/đỏ tạo bất định cao.** Khi tờ khai bị kiểm tra hồ sơ hoặc kiểm hóa, thời gian xử lý phụ thuộc vào chứng từ, giải trình, hàng thực tế và lịch kiểm tra. Nếu không có cơ chế cập nhật rõ, các bộ phận khác chỉ biết "đang chờ hải quan" nhưng không biết chờ cái gì và ai cần làm tiếp.

**Pain 5: Dữ liệu bị copy thủ công sang Excel.** Số tờ khai, phân luồng, ngày thông quan, trạng thái thuế, số container, số seal, D/O, EIR thường được copy từ nhiều nguồn sang file tracking. Copy thủ công dễ sai số, thiếu timestamp và khó truy vết ai cập nhật.

**Pain 6: Phí phát sinh thường được phát hiện muộn.** DEM/DET, storage, phí sửa chứng từ, phí chờ xe hoặc phí cảng có thể xuất hiện do chậm ở cụm này, nhưng kế toán hoặc account chỉ biết khi nhận hóa đơn/debit note.

### 6.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| VNACCS/VCIS | Hệ thống nhà nước/chính thức | Tổng cục Hải quan, nền tảng VNACCS/VCIS có nguồn gốc từ hỗ trợ của Nhật Bản | Doanh nghiệp XNK, đại lý hải quan, Hải quan | Khai báo và xử lý thông quan điện tử | Bắt buộc/thiết yếu trong thông quan điện tử; không có số thị phần theo phần mềm người dùng | Là hạ tầng lõi, chuẩn chính thức | Không phải dashboard vận hành liên phòng ban; kênh tích hợp không mở kiểu phổ thông |
| ECUS5-VNACCS | Sản phẩm thương mại kết nối hệ thống hải quan | Công ty Thái Sơn | Doanh nghiệp, forwarder, đại lý hải quan | Giao diện khai báo hải quan, truyền dữ liệu lên VNACCS | Phổ biến cao trong nhóm doanh nghiệp/đại lý khai báo; chưa có thị phần công khai đáng tin cậy | Gắn với nghiệp vụ Việt Nam, quen thuộc với nhân viên khai báo | Chủ yếu phục vụ khai báo, không tự giải quyết timeline shipment end-to-end |
| VASSCM | Hệ thống nhà nước/chính thức | Hải quan phối hợp cảng/kho/bãi | Hải quan, cảng, kho, doanh nghiệp liên quan | Giám sát hải quan tự động tại khu vực cảng/kho/bãi | Được triển khai tại nhiều điểm giám sát; số dùng cụ thể cần xác minh theo địa bàn | Giảm giấy tờ, tăng kiểm soát qua khu vực giám sát | Không phải công cụ CS/visibility cho chủ hàng |
| National Single Window | Hệ thống chính thức/chung liên bộ | Cơ chế một cửa quốc gia | Doanh nghiệp XNK, bộ/ngành, Hải quan | Nộp hồ sơ giấy phép/chứng nhận điện tử | Phổ biến với thủ tục thuộc phạm vi một cửa; mức dùng tùy mặt hàng | Tập trung thủ tục liên bộ/ngành | Vẫn tách khỏi workflow nội bộ của doanh nghiệp |
| ePort/cổng cảng | Hệ thống do cảng tự phát triển/vận hành | Từng doanh nghiệp cảng | Forwarder, chủ hàng, trucking, đại lý | Thanh toán phí cảng, tạo lệnh, tra cứu container, đặt dịch vụ | Phổ biến ở các cảng lớn; mỗi cảng có hệ thống riêng | Số hóa giao dịch cảng, giảm phải đến quầy | Không thống nhất giữa các cảng; dữ liệu không tự đi vào file shipment của doanh nghiệp |
| SmartGate/TAS/đặt lịch xe | Hệ thống do cảng/depot phát triển | Cảng/depot/ICD | Trucking, forwarder, tài xế | Quản lý xe ra vào, slot, giao nhận container | Phổ biến ở một số điểm lớn; cần xác minh từng địa bàn | Giảm ùn tắc, chuẩn hóa vào/ra cổng | Không xử lý toàn bộ điều kiện hải quan, D/O, kho, kế toán |
| Excel/email/Zalo | Công cụ phổ thông | Microsoft/Google/Zalo và người dùng tự vận hành | CS, Ops, chứng từ, trucking | Theo dõi trạng thái, gửi ảnh, hỏi nhanh | Rất phổ biến nhưng không có số liệu chính thức | Linh hoạt, nhanh, phù hợp thói quen Việt Nam | Không có cấu trúc, khó kiểm soát version, khó audit |

### 6.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn nhất là thiếu một lớp nhìn tổng hợp các điều kiện để hàng qua được hải quan/cảng/depot. Thị trường có hệ thống chính thức mạnh, nhưng các hệ thống này không được thiết kế để trả lời câu hỏi kinh doanh theo ngôn ngữ của CS/chủ hàng: "hàng đang kẹt ở điều kiện nào, ai cần làm gì, khi nào có thể lấy/giao".

Khoảng trống thứ hai là thiếu chuẩn dữ liệu vận hành giữa hải quan, cảng, trucking, kho và file tracking nội bộ. Doanh nghiệp vẫn cần con người làm cầu nối, nên khả năng sai sót và chậm cập nhật vẫn cao.

Khoảng trống thứ ba là dữ liệu rủi ro chi phí chưa được nối sớm với vận hành. Khi chậm thông quan hoặc chậm lấy container, hệ thống vận hành có thể biết nhưng kế toán/account có thể chưa biết để cảnh báo chi phí phát sinh.

## 7. Cụm 2: Chủ hàng, PO, hợp đồng và cam kết giao hàng

### 7.1. Mục tiêu khảo sát cụm này

Cụm chủ hàng, PO, hợp đồng và cam kết giao hàng khảo sát logistics từ phía doanh nghiệp sở hữu nhu cầu kinh doanh: nhà máy, doanh nghiệp xuất khẩu, doanh nghiệp nhập khẩu, công ty thương mại, nhà phân phối B2B hoặc doanh nghiệp FDI. Đây là bên chịu tác động cuối cùng khi hàng đến chậm, thiếu chứng từ, sai số lượng, phát sinh phí hoặc không đạt cam kết giao hàng.

Cụm này quản lý các dữ liệu như PO, sales order, hợp đồng, forecast, ngày cần hàng, ngày hứa giao, Incoterms, nhà cung cấp, khách hàng, SKU, invoice, shipment/container liên quan, trạng thái giao hàng và chi phí logistics dự kiến/thực tế.

Nói ngắn gọn: nếu các cụm khác trả lời "hàng đang được xử lý thế nào", cụm chủ hàng trả lời "vì sao lô hàng này quan trọng với kinh doanh".

### 7.2. Tại sao khảo sát cụm này?

Chủ hàng là nơi pain logistics chuyển thành hậu quả kinh doanh. Một lô nguyên liệu nhập khẩu chậm có thể làm trễ sản xuất. Một lô xuất khẩu không kịp ETD có thể làm lỡ cam kết với khách nước ngoài. Một container nhập hàng bán lại về muộn có thể làm thiếu hàng ở kênh phân phối. Một bộ chứng từ sai có thể ảnh hưởng thanh toán hoặc ưu đãi thuế.

Điểm quan trọng là chủ hàng thường không nắm toàn bộ dữ liệu logistics trực tiếp. ERP có PO và tồn kho, nhưng trạng thái booking nằm ở forwarder. Tờ khai nằm ở đại lý hải quan. Trạng thái xe nằm ở trucking. Trạng thái kho nằm ở WMS/Excel của kho. Chi phí thực tế nằm ở kế toán và debit note. Vì vậy, nhiều chủ hàng phải dùng Excel/email/Zalo để nối PO với shipment và hỏi forwarder/3PL liên tục.

Khảo sát cụm này giúp phân biệt rõ logistics B2B/XNK với logistics nội địa đơn giản. Với chủ hàng B2B, "tracking" không chỉ là biết container ở đâu, mà là biết PO nào có nguy cơ trễ, đơn hàng nào ảnh hưởng sản xuất/bán hàng, chi phí nào vượt dự toán và ai cần xử lý.

### 7.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| Chủ hàng | Bên sở hữu hoặc chịu quyền lợi trực tiếp với hàng | Bên chịu tác động kinh doanh cuối cùng | Nhà máy nhập nguyên liệu |
| PO | Đơn đặt hàng do bên mua phát hành | Gốc kinh doanh của nhu cầu logistics | PO mua 5 container nguyên liệu |
| Sales Order | Đơn bán hàng do bên bán tạo | Gắn giao hàng với doanh thu | Công ty xuất khẩu tạo sales order cho khách Mỹ |
| Hợp đồng mua bán | Thỏa thuận pháp lý giữa bên bán và bên mua | Quy định giá, điều kiện giao, thanh toán, phạt | Hợp đồng xuất khẩu hàng may mặc |
| Incoterms | Quy tắc phân chia chi phí/rủi ro giao hàng | Xác định bên nào lo vận tải, bảo hiểm, hải quan | FOB, CIF, DAP |
| SLA | Cam kết mức dịch vụ | Dùng để đo đúng hẹn/đúng chất lượng | Giao hàng trong 3 ngày sau thông quan |
| OTIF | On Time In Full, giao đúng hạn và đủ số lượng | Chỉ số đo chất lượng giao hàng | Giao đủ 10.000 sản phẩm đúng ngày |
| Forecast | Dự báo nhu cầu | Đầu vào cho mua hàng/sản xuất/logistics | Dự báo cần nhập linh kiện tháng sau |
| Required delivery date | Ngày cần hàng | Mốc để đánh giá trễ/hay đúng | Nhà máy cần hàng trước 20/07 |
| Landed cost | Tổng chi phí để hàng về tới điểm sử dụng/bán | Gắn logistics với giá vốn | Giá mua + cước + thuế + trucking + kho |
| Control tower | Mô hình nhìn tổng quan chuỗi cung ứng | Theo dõi trạng thái và exception đa bên | Bảng tổng hợp PO, shipment, ETA, rủi ro |

### 7.4. Workflow thực tế hiện tại

#### Case: Nhập khẩu nguyên vật liệu cho nhà máy

1. Procurement hoặc planning xác định nhu cầu mua nguyên liệu.
2. Doanh nghiệp phát hành PO cho nhà cung cấp nước ngoài.
3. Hai bên xác nhận giá, Incoterms, lịch giao và chứng từ cần có.
4. Tùy Incoterms, nhà cung cấp hoặc chủ hàng phối hợp forwarder để đặt booking.
5. Chủ hàng nhận booking/ETD/ETA qua email hoặc portal của forwarder.
6. Khi hàng đi, chủ hàng theo dõi ETA, chứng từ, tình trạng sản xuất và lịch kho.
7. Trước khi hàng đến, bộ phận XNK/logistics phối hợp đại lý hải quan chuẩn bị tờ khai.
8. Nếu thông quan chậm hoặc ETA thay đổi, logistics phải báo planning/sản xuất để điều chỉnh kế hoạch.
9. Khi xe giao về kho, kho kiểm đếm và cập nhật tồn.
10. Kế toán ghi nhận chi phí và landed cost.

Điểm đứt gãy phổ biến: PO nằm trong ERP, booking nằm ở email/forwarder, tờ khai nằm ở phần mềm hải quan, xe nằm ở trucking, kho nằm ở WMS, còn người quản lý lại theo dõi bằng Excel.

#### Case: Xuất khẩu B2B cho khách nước ngoài

1. Sales nhận PO/hợp đồng từ khách.
2. Planning xác định ngày sẵn sàng hàng và lịch đóng hàng.
3. Logistics/forwarder đặt booking phù hợp với ngày cần giao.
4. Nhà máy đóng hàng, chuẩn bị invoice, packing list và chứng từ liên quan.
5. Forwarder xử lý SI, VGM, B/L, tờ khai xuất khẩu và C/O nếu cần.
6. Nếu lịch tàu đổi, hàng bị roll hoặc chứng từ sai, account/sales phải báo khách.
7. Sau khi hàng lên tàu, doanh nghiệp gửi bộ chứng từ và tiếp tục theo dõi ETA.
8. Kế toán đối soát chi phí và ghi nhận doanh thu/chi phí theo đơn hàng.

### 7.5. Thực trạng hiện tại

Doanh nghiệp lớn/FDI thường có ERP như SAP, Oracle, Microsoft Dynamics hoặc hệ thống nội bộ để quản lý PO, sales order, kế hoạch sản xuất và tài chính. Một số doanh nghiệp dùng thêm TMS, WMS, supplier portal hoặc forwarder portal. Tuy nhiên, ngay cả khi có ERP, trạng thái logistics quốc tế thường không tự động cập nhật đầy đủ vào ERP nếu không có tích hợp riêng.

Doanh nghiệp vừa và nhỏ thường dùng phần mềm kế toán/ERP nội địa, Excel, email và Zalo. PO có thể được tạo trong phần mềm kế toán hoặc file Excel. Shipment tracking thường là một file riêng do logistics hoặc XNK quản lý. Sales/procurement/planning muốn biết trạng thái phải hỏi logistics, logistics lại hỏi forwarder/đại lý hải quan/trucking.

Các nền tảng visibility quốc tế như project44 và FourKites cho thấy nhu cầu theo dõi chuỗi cung ứng theo thời gian thực là có thật, đặc biệt ở doanh nghiệp lớn. Tuy nhiên, ở Việt Nam, nhiều workflow địa phương vẫn phụ thuộc vào email tiếng Việt, Zalo, ảnh chụp chứng từ, ePort, ECUS và file Excel nội bộ.

### 7.6. Pain của cụm này

**Pain 1: PO không được nối sạch với shipment/container.** Một PO có thể tách thành nhiều shipment, nhiều container hoặc nhiều đợt giao. Ngược lại, một shipment có thể gom nhiều PO. Nếu không map rõ, doanh nghiệp khó biết đơn hàng nào đang rủi ro.

**Pain 2: ERP có dữ liệu kinh doanh nhưng thiếu dữ liệu vận hành logistics.** ERP biết doanh nghiệp mua gì, từ ai, bao nhiêu tiền, ngày cần hàng. Nhưng ERP thường không tự biết container đang ở đâu, đã thông quan chưa, xe đã giao chưa, có DEM/DET không.

**Pain 3: Cam kết giao hàng được quản lý bằng kinh nghiệm cá nhân.** Nhân viên logistics hoặc sales thường tự nhớ mốc quan trọng, tự đặt nhắc việc, tự tính ngày rủi ro. Khi đổi người phụ trách hoặc nghỉ phép, thông tin dễ bị mất.

**Pain 4: Phụ thuộc vào forwarder/3PL để biết trạng thái.** Chủ hàng không phải lúc nào cũng có quyền truy cập vào carrier portal, ePort, ECUS hoặc TMS của vendor. Do đó, trạng thái thường đến qua email/Zalo và có độ trễ.

**Pain 5: Không thấy sớm tác động kinh doanh của một delay.** ETA trễ 3 ngày có thể không nghiêm trọng với hàng tồn kho cao, nhưng rất nghiêm trọng với nguyên liệu sắp hết hoặc đơn hàng xuất khẩu có phạt. Nếu hệ thống chỉ báo "delay" mà không nối với PO/kế hoạch, quản lý khó ưu tiên.

**Pain 6: Chi phí logistics thực tế khó đối chiếu với dự toán theo PO.** Cước, local charge, trucking, kho, thuế và phí phát sinh thường được tổng hợp sau. Khi đó, chủ hàng mới biết landed cost bị đội lên.

### 7.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| ERP quốc tế | Sản phẩm thương mại enterprise | SAP, Oracle, Microsoft và nhà cung cấp tương tự | Doanh nghiệp lớn, FDI | Quản lý PO, sales order, tài chính, tồn kho, sản xuất | Phổ biến ở doanh nghiệp lớn/FDI; không có số thị phần công khai riêng cho logistics XNK Việt Nam | Chuẩn quy trình, dữ liệu tài chính mạnh | Không tự có visibility XNK local nếu không tích hợp |
| ERP/phần mềm kế toán nội địa | Sản phẩm thương mại | MISA, FAST, BRAVO, Odoo partner, các nhà cung cấp Việt Nam | SME, doanh nghiệp vừa | Kế toán, mua hàng, bán hàng, kho cơ bản | Phổ biến ở SME; thị phần tùy nhà cung cấp | Chi phí phù hợp, quen với kế toán Việt Nam | Logistics quốc tế thường phải theo dõi ngoài hệ thống |
| Forwarder/3PL portal | Hệ thống do nhà cung cấp dịch vụ tự phát triển | Forwarder, 3PL, hãng tàu | Chủ hàng là khách của nhà cung cấp | Theo dõi shipment và chứng từ theo vendor | Phụ thuộc từng nhà cung cấp | Có dữ liệu từ vendor trực tiếp | Mỗi vendor một portal; khó nhìn toàn bộ nếu dùng nhiều vendor |
| project44 | Sản phẩm thương mại visibility/control tower | project44 | Shipper lớn, 3PL, carrier | Real-time visibility, exception, dữ liệu logistics đa mode | Mạnh ở thị trường enterprise quốc tế; mức dùng ở Việt Nam cần khảo sát | Mạng dữ liệu lớn, visibility sâu | Có thể nặng/đắt với SME, không tối ưu local workflow Việt Nam |
| FourKites | Sản phẩm thương mại visibility/orchestration | FourKites | Shipper lớn, doanh nghiệp chuỗi cung ứng | Real-time visibility, control tower, exception | Mạnh ở enterprise quốc tế; mức dùng ở Việt Nam cần khảo sát | Năng lực visibility và orchestration mạnh | Cần dữ liệu/integration tốt; có thể chưa phù hợp doanh nghiệp nhỏ |
| Excel/email/Zalo | Công cụ phổ thông | Người dùng tự vận hành | Procurement, logistics, sales, planning | Theo dõi PO, shipment, hỏi trạng thái, lưu bằng chứng | Rất phổ biến trong vận hành thực tế | Linh hoạt, triển khai ngay | Dễ sai, khó audit, không tự cảnh báo rủi ro |

### 7.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn nhất là thiếu lớp nối giữa dữ liệu kinh doanh và dữ liệu logistics. Chủ hàng cần biết không chỉ "container đang ở đâu", mà "PO nào, hợp đồng nào, khách nào, dây chuyền nào đang bị ảnh hưởng".

Khoảng trống thứ hai là thiếu cơ chế quản lý cam kết giao hàng theo rủi ro. Các mốc ETD/ETA/cut-off/thông quan/giao kho thường được theo dõi thủ công, chưa được chuyển thành cảnh báo tác động kinh doanh.

Khoảng trống thứ ba là thiếu cách đánh giá hiệu quả vendor logistics theo dữ liệu thống nhất. Khi dùng nhiều forwarder/3PL/trucking, chủ hàng khó so sánh đúng hẹn, số lần delay, số lỗi chứng từ, chi phí phát sinh và chất lượng cập nhật.

## 8. Cụm 3: Forwarder, booking quốc tế, hãng tàu và hãng bay

### 8.1. Mục tiêu khảo sát cụm này

Cụm này khảo sát lớp trung gian tổ chức vận tải quốc tế: forwarder, NVOCC, co-loader, hãng tàu, hãng bay, đại lý nước ngoài và các nền tảng booking/tracking. Đây là nơi lô hàng được đặt chỗ, nhận lịch vận chuyển, quản lý cut-off, xử lý SI/VGM, theo dõi ETD/ETA, cập nhật delay và phối hợp với chủ hàng.

Nếu chủ hàng là nơi phát sinh nhu cầu kinh doanh, forwarder và carrier là nơi biến nhu cầu đó thành hành trình vận tải quốc tế cụ thể. Cụm này quản lý các dữ liệu như booking number, vessel/voyage, flight number, POL/POD, ETD/ETA, cut-off, container number, seal, B/L/AWB, lịch tàu, lịch bay, roll cargo, transshipment và arrival notice.

### 8.2. Tại sao khảo sát cụm này?

Forwarder là điểm gom thông tin tự nhiên của lô hàng. Một forwarder phải làm việc với chủ hàng, carrier, co-loader, agent nước ngoài, đội chứng từ, hải quan, trucking, kho và kế toán. Vì vậy, forwarder thường biết nhiều nhất về trạng thái thực tế của shipment, nhưng thông tin lại phân tán trong email, portal hãng tàu, file booking, Excel, Zalo và phần mềm nội bộ.

Booking quốc tế cũng là nơi nhiều rủi ro xảy ra sớm: không lấy được chỗ đúng ngày, hàng bị roll, lịch tàu đổi, trễ SI/VGM, sai shipper/consignee, sai cảng, thiếu container rỗng, LCL không kịp vào kho CFS hoặc air cargo bị offload. Nếu rủi ro được phát hiện sớm, doanh nghiệp có thể đổi chuyến, đổi tuyến, báo khách hoặc điều chỉnh kho/trucking. Nếu phát hiện muộn, chi phí và thiệt hại dịch vụ tăng nhanh.

### 8.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| Forwarder | Công ty giao nhận vận tải | Điều phối vận tải quốc tế và các bên liên quan | Forwarder đặt chỗ tàu cho chủ hàng |
| Carrier | Nhà vận chuyển | Cung cấp dịch vụ vận tải thực tế hoặc phát hành vận đơn | Hãng tàu MSC, Maersk; hãng bay cargo |
| NVOCC | Nhà vận chuyển biển không sở hữu tàu | Phát hành vận đơn riêng, mua chỗ từ hãng tàu | NVOCC gom nhiều lô hàng trên một tuyến |
| Co-loader | Bên gom/chia sẻ chỗ với forwarder khác | Phổ biến với hàng LCL hoặc tuyến không có hợp đồng trực tiếp | Forwarder nhỏ đặt LCL qua co-loader |
| Booking | Đặt chỗ vận chuyển | Xác nhận lô hàng có chỗ trên chuyến | Booking tàu Hải Phòng - Hamburg |
| Booking confirmation | Xác nhận booking | Chứa số booking, lịch, cut-off, cảng | PDF xác nhận từ hãng tàu |
| POL/POD | Port of Loading/Port of Discharge | Cảng xếp và cảng dỡ | POL: Cát Lái, POD: Los Angeles |
| SI | Shipping Instruction | Hướng dẫn phát hành vận đơn | Forwarder gửi SI trước cut-off |
| VGM | Verified Gross Mass | Khối lượng container đã xác nhận | Điều kiện bắt buộc để xếp container lên tàu |
| Cut-off | Hạn chót cho một nghiệp vụ | Nếu trễ có thể lỡ chuyến | SI cut-off, CY cut-off |
| Roll cargo | Hàng bị chuyển sang chuyến sau | Rủi ro trễ giao | Container không lên chuyến dự kiến |
| Transshipment | Chuyển tải qua cảng trung gian | Ảnh hưởng ETA và tracking | Hàng đi qua Singapore rồi sang châu Âu |
| Blank sailing | Chuyến tàu bị hủy | Làm thiếu chỗ và đổi lịch | Hãng tàu hủy một chuyến trong tuần |
| AWB/MAWB/HAWB | Vận đơn hàng không | Chứng từ vận tải air cargo | HAWB do forwarder phát hành |

### 8.4. Workflow thực tế hiện tại

#### Case: Xuất khẩu đường biển FCL

1. Chủ hàng gửi yêu cầu booking: tuyến, số container, loại container, ngày hàng sẵn sàng, cảng đi/cảng đến.
2. Forwarder kiểm tra giá, lịch tàu, chỗ trống và cut-off qua carrier portal, email hãng tàu/NVOCC hoặc network booking.
3. Forwarder gửi booking request và nhận booking confirmation.
4. Booking được cập nhật vào file tracking hoặc phần mềm forwarder.
5. Forwarder gửi thông tin lấy rỗng, cut-off, SI/VGM cho chủ hàng/trucking.
6. Chủ hàng đóng hàng; forwarder nhận container number, seal, gross weight.
7. Forwarder gửi SI, khai VGM và kiểm tra B/L draft.
8. Container hạ cảng, chờ xếp tàu.
9. Nếu hàng lên tàu, forwarder cập nhật ATD và B/L. Nếu bị roll/delay, forwarder phải báo khách và điều chỉnh ETA.

#### Case: Nhập khẩu đường biển

1. Agent nước ngoài hoặc shipper gửi pre-alert: B/L, invoice, packing list, ETA, vessel/voyage.
2. Forwarder Việt Nam mở job, cập nhật ETA và thông tin consignee.
3. Khi nhận arrival notice/local charge, forwarder chuẩn bị D/O, thu phí và phối hợp chứng từ/hải quan.
4. Nếu ETA thay đổi, local charge thay đổi hoặc có vấn đề B/L, forwarder phải báo chủ hàng.
5. Sau khi hàng thông quan và giao kho, forwarder đóng job và đối soát chi phí.

#### Case: Air freight

1. Chủ hàng gửi yêu cầu: sân bay đi/đến, trọng lượng, kích thước, commodity, ngày cần bay.
2. Forwarder kiểm tra giá và chỗ với airline/GSA/co-loader hoặc nền tảng booking air.
3. Sau khi booking, hàng được giao vào kho hàng không, cân đo và phát hành MAWB/HAWB.
4. Forwarder theo dõi flight, offload, arrival và giao hàng.
5. Air freight có thời gian gấp hơn, nên chậm cập nhật vài giờ cũng có thể ảnh hưởng lớn.

### 8.5. Thực trạng hiện tại

Forwarder lớn hoặc có mạng lưới quốc tế thường dùng phần mềm nghiệp vụ như CargoWise, Magaya, Descartes hoặc hệ thống nội bộ. Các nền tảng này có thể quản lý job, booking, chứng từ, kế toán và báo cáo. Tuy nhiên, chi phí, thời gian triển khai, kỷ luật nhập liệu và tùy biến địa phương là rào cản với nhiều forwarder vừa và nhỏ tại Việt Nam.

Forwarder vừa và nhỏ thường vận hành bằng email, Excel, Zalo, website hãng tàu và phần mềm kế toán riêng. Carrier portal giải quyết một phần như booking, tracking, lịch tàu, chứng từ hoặc thanh toán. Network như INTTRA/e2open giúp đặt chỗ và trao đổi dữ liệu với nhiều ocean carrier. Tuy nhiên, các công cụ này không tự gom workflow nội bộ của forwarder, không tự trả lời khách theo ngữ cảnh PO/chứng từ/hải quan/trucking/kho.

### 8.6. Pain của cụm này

**Pain 1: Booking data phân tán.** Một booking có thể bắt đầu từ email, được xác nhận bằng PDF, cập nhật trên carrier portal, theo dõi bằng Excel và trao đổi với khách qua Zalo. Khi có thay đổi, không chắc tất cả nơi đều được cập nhật.

**Pain 2: Cut-off dễ bị miss.** SI cut-off, VGM cut-off, CY cut-off, document cut-off đều có hậu quả khác nhau. Nhân viên thường tự nhắc bằng lịch cá nhân hoặc Excel, dễ miss khi nhiều shipment.

**Pain 3: Carrier portal không giải quyết workflow nội bộ.** Portal của hãng tàu cho biết thông tin của hãng tàu, nhưng không biết PO nào liên quan, khách nào cần báo, chứng từ đã đủ chưa, trucking đã đặt chưa, kế toán đã thu phí chưa.

**Pain 4: Forwarder SME khó triển khai phần mềm nặng.** Phần mềm forwarding đầy đủ có giá trị nhưng cần thay đổi quy trình, nhập liệu kỷ luật và training. Nhiều công ty nhỏ chọn tiếp tục dùng Excel/email vì nhanh hơn trước mắt.

**Pain 5: Khách yêu cầu cập nhật liên tục.** Forwarder không chỉ cần vận hành đúng, mà còn phải trả lời "hàng lên tàu chưa", "ETA có đổi không", "B/L draft đâu", "có kịp cut-off không". Mỗi câu hỏi kéo theo tra cứu nhiều nguồn.

**Pain 6: Delay quốc tế ảnh hưởng dây chuyền nội địa.** ETA đổi làm thay đổi kế hoạch hải quan, trucking, kho và sản xuất. Nếu cập nhật không kịp, các bên nội địa chuẩn bị sai lịch.

### 8.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| Carrier portals | Hệ thống do hãng tàu/hãng bay tự vận hành | Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE, airlines... | Forwarder, shipper, consignee | Booking, lịch, tracking, chứng từ, local charge | Phổ biến vì mỗi hãng có portal riêng | Dữ liệu trực tiếp từ carrier | Mỗi hãng một cổng, không gom workflow đa carrier |
| INTTRA/e2open | Nền tảng network/chung ngành thương mại | e2open/INTTRA | Shipper, forwarder, carrier | Booking, SI, tracking ocean qua mạng carrier | INTTRA công bố kết nối hàng chục nghìn shipper và nhiều carrier/NVOCC; mức dùng tại Việt Nam cần khảo sát | Network rộng, chuẩn hóa booking ocean | Không xử lý toàn bộ workflow local như Zalo, ECUS, ePort |
| CargoWise | Sản phẩm thương mại enterprise | WiseTech Global | Forwarder, customs broker, logistics provider | Logistics execution, job, booking, chứng từ, tài chính | Mạnh toàn cầu; mức dùng tại Việt Nam cần khảo sát | Rất rộng và sâu cho logistics provider | Nặng với SME, cần triển khai/quy trình tốt |
| Magaya | Sản phẩm thương mại | Magaya | Forwarder, warehouse, customs broker | Quản lý freight forwarding, kho, chứng từ, báo cáo | Mạnh ở nhóm logistics provider quốc tế; mức dùng tại Việt Nam cần khảo sát | Tập trung đúng ngành forwarding | Có thể chưa tối ưu workflow địa phương Việt Nam |
| Descartes | Sản phẩm thương mại/network | Descartes Systems Group | Doanh nghiệp logistics, forwarder, shipper | Logistics, customs, compliance, visibility | Mạnh quốc tế; mức dùng tại Việt Nam cần khảo sát | Nhiều module và network | Có thể phức tạp, thiên enterprise |
| WebCargo/Freightos | Nền tảng booking/rate air/ocean | Freightos/WebCargo | Forwarder, airline, shipper | Rate, booking, eBooking, air cargo | Mạnh trong booking air quốc tế; mức dùng tại Việt Nam cần khảo sát | Tăng tốc tìm giá/chỗ | Không thay thế toàn bộ vận hành forwarder |
| Winta Logistics | Sản phẩm thương mại nội địa | Nhà cung cấp phần mềm Việt Nam | Forwarder/logistics Việt Nam | Quản lý giao nhận, chứng từ, kế toán, báo cáo | Có mặt tại thị trường Việt Nam; chưa có thị phần công khai đáng tin cậy | Hiểu bối cảnh Việt Nam hơn sản phẩm ngoại | Cần khảo sát mức dùng, độ sâu tích hợp và UX thực tế |
| Excel/email/Zalo | Công cụ phổ thông | Người dùng tự vận hành | Forwarder SME, CS, Ops | Tracking, trao đổi booking, gửi chứng từ | Rất phổ biến | Linh hoạt, chi phí thấp | Không chuẩn hóa, khó cảnh báo, khó scale |

### 8.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn nhất là thiếu lớp điều phối nhẹ giữa booking quốc tế và workflow địa phương. Network booking và carrier portal giải quyết kết nối với carrier, phần mềm forwarding giải quyết core operation nếu triển khai tốt, nhưng nhiều forwarder vẫn thiếu cách gom email, PDF booking, Excel, Zalo, trạng thái carrier và yêu cầu khách thành một timeline dễ dùng.

Khoảng trống thứ hai là exception management. Thị trường cần cách phát hiện sớm các vấn đề như sắp miss cut-off, ETA đổi ảnh hưởng giao kho, hàng bị roll, thiếu SI/VGM, B/L draft chưa duyệt hoặc booking chưa có container rỗng.

Khoảng trống thứ ba là cập nhật khách theo ngữ cảnh. Dữ liệu carrier có thể có, nhưng để trả lời khách cần hiểu khách hỏi shipment nào, PO nào, mốc nào, vấn đề nào và bước tiếp theo là gì.

## 9. Cụm 4: Chứng từ xuất nhập khẩu

### 9.1. Mục tiêu khảo sát cụm này

Cụm chứng từ XNK khảo sát toàn bộ lớp hồ sơ thương mại, vận tải, hải quan, xuất xứ, thanh toán và giấy phép/chứng nhận chuyên ngành. Trong logistics B2B/XNK, hàng hóa không chỉ di chuyển bằng container, xe, tàu hoặc máy bay. Hàng hóa còn "di chuyển" qua chứng từ. Nếu chứng từ sai hoặc thiếu, hàng có thể không khai được, không thông quan được, không lấy được, không thanh toán được hoặc mất ưu đãi thuế.

Cụm này liên quan đến docs team, đại lý hải quan, forwarder, chủ hàng, nhà cung cấp, ngân hàng, hãng tàu/hãng bay, cơ quan cấp C/O, cơ quan kiểm tra chuyên ngành và Hải quan.

### 9.2. Tại sao khảo sát cụm này?

Chứng từ là nơi tập trung rủi ro pháp lý và tài chính. Invoice liên quan đến trị giá và thanh toán. Packing list liên quan đến số kiện, trọng lượng, kiểm hàng. B/L/AWB liên quan đến vận tải và quyền nhận hàng. C/O liên quan đến xuất xứ và ưu đãi thuế. Tờ khai liên quan đến HS code, thuế, kiểm tra chuyên ngành và nghĩa vụ pháp lý. Bộ chứng từ ngân hàng liên quan đến thanh toán L/C hoặc collection.

Một sai lệch nhỏ có thể gây hậu quả lớn. Ví dụ invoice ghi 1.000 cartons, packing list ghi 990 cartons, B/L ghi 1.000 packages, còn tờ khai dự kiến ghi 990 packages. Nếu phát hiện sau khi đã khai hoặc đã phát hành vận đơn, việc sửa có thể mất thời gian, phát sinh phí và ảnh hưởng lịch giao.

Khảo sát cụm này quan trọng vì nhiều lỗi chứng từ có tính lặp lại và có thể phòng ngừa bằng checklist, đối chiếu dữ liệu, phân quyền duyệt và quy trình lưu trữ tốt hơn. Tuy nhiên, đây cũng là cụm nhạy cảm, không nên xem nhẹ trách nhiệm pháp lý của con người khi ký, khai, nộp hoặc xác nhận chứng từ.

### 9.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| Commercial Invoice | Hóa đơn thương mại | Chứng minh giá trị, người bán/người mua, điều kiện bán | Invoice 50.000 USD linh kiện |
| Packing List | Phiếu đóng gói | Mô tả số kiện, trọng lượng, cách đóng gói | 500 cartons, 10 pallets |
| Sales Contract | Hợp đồng mua bán | Cơ sở pháp lý của giao dịch | Hợp đồng xuất khẩu đồ gỗ |
| B/L | Vận đơn đường biển | Chứng từ vận tải và quyền nhận hàng | Master B/L, House B/L |
| AWB | Vận đơn hàng không | Chứng từ vận tải air cargo | MAWB/HAWB |
| C/O | Certificate of Origin, chứng nhận xuất xứ | Chứng minh xuất xứ hàng hóa, có thể liên quan ưu đãi thuế | C/O form D, E, AK, AJ |
| HS code | Mã phân loại hàng hóa | Cơ sở xác định thuế và quản lý chuyên ngành | Mã HS cho linh kiện điện tử |
| Tờ khai hải quan | Hồ sơ khai báo với Hải quan | Cơ sở thông quan | Tờ khai nhập khẩu trên VNACCS |
| D/O | Delivery Order | Lệnh giao hàng để nhận hàng | eD/O từ hãng tàu |
| Arrival Notice | Thông báo hàng đến | Báo ETA, phí, chứng từ cần xử lý | Hãng tàu gửi arrival notice |
| SI | Shipping Instruction | Dữ liệu để phát hành B/L | Shipper, consignee, mô tả hàng |
| VGM | Khối lượng container đã xác nhận | Điều kiện xếp container lên tàu | VGM gửi trước cut-off |
| L/C | Letter of Credit, thư tín dụng | Phương thức thanh toán qua ngân hàng | Bộ chứng từ phải khớp điều khoản L/C |
| Manifest | Bản khai hàng hóa của phương tiện vận tải | Dữ liệu hãng tàu/hãng bay khai với cơ quan quản lý | Sửa manifest nếu thông tin B/L sai |
| Giấy phép chuyên ngành | Chứng từ do cơ quan chuyên ngành cấp | Điều kiện nhập/xuất với hàng đặc thù | Kiểm dịch, an toàn thực phẩm, kiểm tra chất lượng |

### 9.4. Workflow thực tế hiện tại

#### Case: Bộ chứng từ nhập khẩu đường biển

1. Chủ hàng/forwarder nhận pre-alert từ nhà cung cấp hoặc agent nước ngoài.
2. Docs team kiểm tra invoice, packing list, B/L, C/O, contract, giấy phép nếu có.
3. Dữ liệu chứng từ được đối chiếu với PO/hợp đồng: tên hàng, số lượng, giá, điều kiện giao hàng, người bán/người mua.
4. Nhân viên xác định hoặc kiểm tra HS code, chính sách thuế, yêu cầu kiểm tra chuyên ngành.
5. Nếu chứng từ sai, docs team yêu cầu nhà cung cấp/agent sửa trước khi khai.
6. Nhân viên khai báo nhập dữ liệu lên phần mềm khai hải quan và truyền tờ khai.
7. Nếu luồng vàng/đỏ hoặc Hải quan yêu cầu bổ sung, docs team chuẩn bị hồ sơ giải trình.
8. Sau khi thông quan, bộ chứng từ được lưu để đối soát, thanh toán và kiểm tra sau thông quan.

#### Case: Bộ chứng từ xuất khẩu đường biển

1. Sales/CS nhận PO/hợp đồng và yêu cầu chứng từ từ khách.
2. Nhà máy/kho cung cấp thông tin hàng thực tế: số kiện, trọng lượng, container, seal.
3. Docs team lập invoice, packing list, SI, VGM, tờ khai xuất khẩu.
4. Forwarder/hãng tàu phát hành B/L draft để kiểm tra.
5. Nếu cần C/O, doanh nghiệp chuẩn bị hồ sơ xin cấp C/O qua hệ thống/cơ quan có thẩm quyền.
6. Sau khi hàng lên tàu, B/L chính thức được phát hành.
7. Bộ chứng từ được gửi cho khách/ngân hàng theo điều kiện thanh toán.
8. Bản mềm/bản giấy được lưu để kế toán, kiểm toán, hải quan sau thông quan hoặc claim.

### 9.5. Thực trạng hiện tại

Chứng từ XNK ở Việt Nam đã có nhiều điểm số hóa: khai hải quan điện tử qua VNACCS/VCIS, phần mềm khai báo thương mại như ECUS, National Single Window cho một số thủ tục liên bộ/ngành, eCO cho chứng nhận xuất xứ điện tử ở một số luồng, eD/O và ePort trong giao dịch cảng/hãng tàu.

Nhưng workflow chứng từ vẫn phụ thuộc nhiều vào file PDF, email, scan, ảnh chụp, Excel checklist và kinh nghiệm nhân viên. Lý do là chứng từ đến từ nhiều bên: nhà cung cấp nước ngoài, forwarder, hãng tàu, ngân hàng, kho, cơ quan cấp C/O, cơ quan kiểm tra chuyên ngành. Mỗi bên dùng định dạng, ngôn ngữ và tốc độ phản hồi khác nhau.

Doanh nghiệp lớn thường có DMS, ERP, phân quyền duyệt và checklist nội bộ rõ hơn. SME và forwarder nhỏ thường lưu chứng từ theo folder, email thread, Google Drive/OneDrive, Zalo và file Excel theo dõi. Rủi ro nằm ở việc thiếu một bản dữ liệu chuẩn duy nhất cho shipment.

### 9.6. Pain của cụm này

**Pain 1: Sai lệch dữ liệu giữa các chứng từ.** Tên hàng, số lượng, trọng lượng, mã hàng, người mua/người bán, Incoterms, số container, số seal có thể khác nhau giữa invoice, packing list, B/L, C/O, booking và tờ khai. Phát hiện muộn làm tăng chi phí sửa và chậm thông quan.

**Pain 2: Kiểm tra bằng mắt thường.** Nhiều docs team vẫn kiểm chứng từ bằng cách mở nhiều file PDF cạnh nhau, dùng checklist giấy/Excel và đọc thủ công. Với số lượng shipment lớn, lỗi nhỏ rất dễ lọt.

**Pain 3: Chứng từ đến từ nhiều bên và nhiều định dạng.** Một phần qua email, một phần qua portal, một phần qua PDF scan, một phần qua ảnh Zalo. Việc gom đủ bộ chứng từ mất thời gian và khó biết đang thiếu gì.

**Pain 4: Rủi ro HS code, xuất xứ và kiểm tra chuyên ngành.** Đây là các nội dung có tác động thuế và pháp lý. Sai HS code hoặc C/O có thể gây truy thu, mất ưu đãi thuế, kiểm tra sau thông quan hoặc tranh chấp với khách.

**Pain 5: Sửa chứng từ có deadline.** Sửa B/L, sửa manifest, bổ sung C/O, bổ sung giấy phép hoặc chỉnh invoice đều có thời hạn và chi phí. Nếu phát hiện sau cut-off hoặc sau khi hàng đến, áp lực cao hơn.

**Pain 6: Lưu trữ và truy xuất sau thông quan yếu.** Khi cần kiểm toán, claim, giải trình hải quan hoặc đối soát với khách, nhân viên phải tìm lại email cũ, folder cũ, file scan và bản giấy. Nếu người phụ trách đã nghỉ, rủi ro mất ngữ cảnh rất cao.

### 9.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| VNACCS/VCIS | Hệ thống nhà nước/chính thức | Tổng cục Hải quan | Đại lý hải quan, doanh nghiệp XNK | Truyền và xử lý tờ khai | Thiết yếu trong thông quan điện tử | Chuẩn pháp lý chính thức | Không tự kiểm tra toàn bộ bộ chứng từ trước khai |
| ECUS và phần mềm khai báo | Sản phẩm thương mại kết nối hải quan | Thái Sơn và các nhà cung cấp khác | Nhân viên khai báo, đại lý hải quan | Nhập dữ liệu tờ khai, truyền VNACCS | Phổ biến; chưa có thị phần công khai đáng tin cậy | Phù hợp nghiệp vụ khai báo Việt Nam | Không phải DMS/quality control tổng thể |
| National Single Window | Hệ thống chính thức/chung liên bộ | Cơ chế một cửa quốc gia | Doanh nghiệp, cơ quan quản lý | Nộp hồ sơ giấy phép/chuyên ngành | Tùy thủ tục/mặt hàng | Giảm nộp hồ sơ rời rạc | Không thay thế quản lý chứng từ nội bộ |
| eCO | Hệ thống/chức năng cấp C/O điện tử | Cơ quan cấp C/O và hệ thống liên quan | Doanh nghiệp xuất khẩu | Xin/cấp chứng nhận xuất xứ | Tùy form, thị trường và cơ quan cấp | Số hóa một phần quy trình C/O | Vẫn cần chuẩn bị hồ sơ và kiểm tra dữ liệu |
| CargoWise/Magaya/Winta | Sản phẩm thương mại logistics/forwarding | Nhà cung cấp phần mềm | Forwarder, logistics provider | Quản lý job, chứng từ, vận đơn, billing | Tùy phân khúc; chưa có số công khai tại Việt Nam | Gắn chứng từ với job/shipment | Cần nhập liệu kỷ luật; có thể không phủ hết email/PDF/Zalo |
| DMS/OCR/document AI | Sản phẩm thương mại ngang ngành | ABBYY, Google, Microsoft, các nhà cung cấp khác | Doanh nghiệp nhiều chứng từ | Lưu trữ, trích xuất, tìm kiếm chứng từ | Đang tăng; mức dùng logistics Việt Nam cần khảo sát | Giảm nhập liệu, tìm kiếm tốt hơn | Cần cấu hình theo nghiệp vụ XNK; không tự quyết định pháp lý |
| Email/PDF/Drive/Zalo | Công cụ phổ thông | Người dùng tự vận hành | Docs team, forwarder, chủ hàng | Nhận, gửi, lưu chứng từ | Rất phổ biến | Nhanh và linh hoạt | Không có kiểm soát dữ liệu chuẩn, dễ thất lạc |

### 9.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn nhất là thiếu lớp kiểm tra và so khớp chứng từ trước khi khai, phát hành hoặc gửi khách/ngân hàng. Thị trường có hệ thống khai báo và hệ thống nộp hồ sơ, nhưng nhiều doanh nghiệp vẫn thiếu một quy trình dữ liệu sạch để phát hiện sai lệch sớm.

Khoảng trống thứ hai là thiếu quản lý checklist chứng từ theo loại hàng, tuyến, Incoterms, khách hàng và điều kiện thanh toán. Một bộ chứng từ nhập máy móc, xuất hàng may, hàng thực phẩm hoặc hàng đi L/C có yêu cầu khác nhau; nếu chỉ dùng checklist chung, dễ thiếu.

Khoảng trống thứ ba là lưu trữ và truy xuất ngữ cảnh. Doanh nghiệp không chỉ cần lưu file, mà cần biết file đó thuộc shipment nào, PO nào, lần sửa nào, ai duyệt, vì sao sửa và còn thiếu gì.

## 10. Cụm 5: Trucking nội địa

### 10.1. Mục tiêu khảo sát cụm này

Cụm trucking nội địa khảo sát đoạn vận chuyển bằng xe tải/đầu kéo trong nước: lấy container tại cảng/depot/ICD, giao về kho/nhà máy, trả container rỗng, hoặc kéo container rỗng từ depot về kho để đóng hàng xuất khẩu rồi hạ cảng.

Nói đơn giản, nếu hải quan và cảng là nơi hàng được phép đi, thì trucking là lớp làm cho hàng thật sự di chuyển trên đường. Cụm này bao gồm forwarder, công ty vận tải, điều phối xe, tài xế, cảng, depot, kho, chủ hàng và đôi khi cả bảo vệ cổng/kho.

Dữ liệu chính của cụm này gồm: lệnh điều xe, số xe, tài xế, số container, số seal, điểm lấy/giao/trả rỗng, thời gian gate-in/gate-out, ảnh POD, EIR, phí chờ xe, phí phát sinh và trạng thái giao hàng.

### 10.2. Tại sao khảo sát cụm này?

Trucking là điểm nối giữa cảng và doanh nghiệp. Trong hàng nhập, xe phải lấy container khỏi cảng sau khi đủ điều kiện chứng từ, hải quan, thanh toán phí và release container. Trong hàng xuất, xe phải lấy rỗng, kéo về kho đóng hàng, hạ container ra cảng trước cut-off. Nếu thiếu một điều kiện nhỏ, xe có thể đã được điều đi nhưng không làm được việc.

Đây cũng là cụm khách hàng hỏi nhiều nhất: "xe tới đâu rồi?", "đã lấy container chưa?", "bao giờ tới kho?", "giao xong chưa?", "POD đâu?", "đã trả rỗng chưa?". Khi không có dữ liệu sẵn, CS/Ops phải gọi điều phối, điều phối gọi tài xế, tài xế gửi ảnh qua Zalo, rồi CS mới trả lời khách.

Trucking vận hành kém sẽ ảnh hưởng trực tiếp đến thời gian giao hàng, phí chờ xe, phí lưu container ngoài cảng, phí detention do trả rỗng muộn, phạt lịch kho và chất lượng dịch vụ. Vì Việt Nam có nhiều khu công nghiệp, cảng biển, ICD/depot và kho phân tán, chặng đường bộ vẫn là một lớp rất lớn trong logistics B2B/XNK.

### 10.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| Trucking | Vận chuyển bằng xe tải/đầu kéo | Chặng nội địa giữa cảng, depot, kho, nhà máy | Kéo container từ Cát Lái về Bình Dương |
| Đầu kéo/mooc | Đầu xe có động cơ và rơ-mooc chở container | Tài sản vận tải được điều phối | Đầu kéo 51C kéo mooc 40 feet |
| POD | Proof of Delivery, bằng chứng giao hàng | Chứng minh hàng đã giao | Phiếu giao hàng có chữ ký kho |
| EIR | Phiếu giao nhận container/thiết bị | Chứng minh nhận/trả container và tình trạng container | EIR trả rỗng tại depot |
| Gate-in/gate-out | Xe/container vào hoặc ra cổng cảng/kho/depot | Mốc trạng thái quan trọng | Container gate-out khỏi cảng lúc 10:30 |
| Free time | Thời gian miễn phí trước khi phát sinh phí | Quản trị rủi ro DEM/DET | Trả rỗng trước ngày 12/06 |
| Detention | Phí giữ container ngoài cảng quá hạn | Chi phí phát sinh do trả rỗng muộn | Kho rút hàng chậm làm trễ trả rỗng |
| Depot | Nơi cấp/nhận container rỗng | Điểm lấy rỗng hoặc trả rỗng | Trả rỗng về depot hãng tàu chỉ định |
| ICD | Cảng cạn/điểm thông quan nội địa | Điểm trung chuyển nội địa | ICD Long Bình, ICD Sóng Thần |
| TAS | Truck Appointment System, đặt lịch xe vào cảng | Giảm ùn tắc và kiểm soát luồng xe | Xe phải có slot trước khi vào terminal |
| Slot kho | Khung giờ kho nhận xe | Tránh xe chờ và ùn tắc kho | Kho chỉ nhận container lúc 14:00-16:00 |

### 10.4. Workflow thực tế hiện tại

#### Case: Nhập khẩu FCL từ cảng về kho/nhà máy

1. CS/Ops xác nhận lô hàng đã có arrival notice, D/O hoặc eD/O, tờ khai đã đủ điều kiện, phí cảng/local charge đã xử lý.
2. Điều phối nhận yêu cầu book xe, thường qua TMS, Excel, email hoặc Zalo.
3. Điều phối phân xe/tài xế và gửi thông tin: số container, số seal, mã lệnh, địa chỉ kho, giờ nhận hàng, depot trả rỗng.
4. Tài xế vào cảng theo lệnh/slot, lấy container và gửi ảnh EIR hoặc trạng thái qua app/GPS/Zalo.
5. Xe rời cảng, chạy về kho. Nếu kẹt đường, thiếu giấy tờ hoặc kho đổi lịch, điều phối xử lý bằng điện thoại/Zalo.
6. Kho nhận container, rút hàng, ký POD/biên bản. Nếu thiếu/sai/hư hỏng, kho lập biên bản hoặc gửi ảnh.
7. Sau khi rút hàng, xe trả container rỗng về depot chỉ định.
8. Điều phối hoặc Ops cập nhật trạng thái cuối, lưu POD/EIR và chuyển dữ liệu cho kế toán đối soát.

#### Case: Xuất khẩu FCL từ kho ra cảng

1. Ops nhận kế hoạch đóng hàng, booking, cut-off, điểm lấy rỗng và điểm hạ container.
2. Điều phối book xe kéo container rỗng từ depot về kho.
3. Kho/nhà máy đóng hàng, niêm seal, cân VGM nếu cần.
4. Xe kéo container hàng ra cảng trước cut-off.
5. Tài xế gửi EIR/gate-in, Ops cập nhật cho CS và docs team.
6. Nếu trễ slot, trễ cut-off hoặc container bị từ chối, Ops phải xử lý với hãng tàu/cảng/kho và báo khách.

### 10.5. Thực trạng hiện tại

Thị trường đã có nhiều nhóm công cụ: TMS, nền tảng kết nối xe và chủ hàng, GPS/fleet management, ePort/cổng cảng, app tài xế, cùng các kênh phổ thông như Excel, điện thoại và Zalo. LOGIVAN tự giới thiệu là mạng vận tải số tại Việt Nam từ 2017, tập trung tối ưu vận tải và giảm chi phí cho chủ hàng. EcoTruck cung cấp dịch vụ trucking FCL/LCL, bộ-biển-bộ, thủ tục hải quan và công bố có hơn 300 doanh nghiệp lớn sử dụng. Abivin vRoute là nền tảng tối ưu vận tải/định tuyến, có web app cho quản lý và mobile app cho tài xế/nhân viên hiện trường.

Tuy nhiên, mức độ số hóa không đồng đều. Doanh nghiệp lớn hoặc 3PL có thể dùng TMS/GPS và app tài xế. Nhà xe nhỏ vẫn điều phối bằng điện thoại, Zalo và file Excel. Nhiều forwarder không sở hữu xe mà thuê vendor, vì vậy dữ liệu trạng thái phụ thuộc vào vendor gửi lại.

Điểm quan trọng là GPS chỉ trả lời "xe đang ở đâu", nhưng không tự trả lời được "hàng đã đủ điều kiện lấy chưa", "tài xế có đúng mã lệnh chưa", "POD đã hợp lệ chưa", "trả rỗng có trước hạn free time không". Vì vậy trucking thường có dữ liệu nhiều nhưng vẫn thiếu bức tranh vận hành hoàn chỉnh theo shipment/container.

### 10.6. Pain của cụm này

**Pain 1: Trạng thái xe bị phân tán.** Một phần nằm trong GPS, một phần trong TMS, một phần trong Zalo tài xế, một phần trong ePort/cảng, một phần trong Excel của CS. Khi khách hỏi, nhân viên vẫn phải tra nhiều nguồn và gọi nhiều người.

**Pain 2: Điều xe khi điều kiện chưa sẵn sàng.** Xe có thể được điều đến cảng trong khi D/O chưa release, phí cảng chưa thanh toán, tờ khai chưa thông quan, chưa có slot hoặc thiếu mã lệnh. Kết quả là xe chờ, tài xế bực, phát sinh phí, nhưng nguyên nhân không nằm ở nhà xe.

**Pain 3: POD/EIR thất lạc hoặc không gắn đúng shipment.** Tài xế gửi ảnh qua Zalo, điều phối lưu trong điện thoại, CS lưu ở email, kế toán cần đối soát thì không tìm được. Nếu có claim hoặc tranh chấp phí, thiếu bằng chứng làm doanh nghiệp yếu thế.

**Pain 4: Quản lý free time và trả rỗng còn thủ công.** Free time/DEM/DET phụ thuộc hãng tàu, tuyến, hợp đồng và thời điểm release. Nếu không có nhắc việc tốt, container giao xong nhưng trả rỗng muộn vẫn phát sinh detention.

**Pain 5: Phụ thuộc tài xế và điều phối viên.** Nhiều trạng thái quan trọng chỉ được biết khi gọi đúng người. Khi điều phối nghỉ, đổi ca hoặc tài xế không nghe máy, CS mất quyền kiểm soát thông tin.

**Pain 6: Khó đo hiệu suất vendor trucking.** Nếu dữ liệu chuyến xe không được chuẩn hóa, doanh nghiệp khó so sánh vendor theo tỷ lệ đúng giờ, tỷ lệ thiếu POD, số lần phát sinh phí chờ, thời gian trả rỗng và chất lượng phản hồi.

### 10.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| LOGIVAN | Nền tảng vận tải số thương mại | LOGIVAN | Chủ hàng, nhà xe, fleet owner | Kết nối/tối ưu vận tải, cải thiện OTIF, lead time, chi phí | Có hiện diện công khai tại Việt Nam; chưa có thị phần chính thức | Tập trung trucking Việt Nam, có mô hình freight network | Không thay thế toàn bộ workflow hải quan/cảng/kho/chứng từ |
| EcoTruck | Nền tảng/dịch vụ logistics thương mại | EcoTruck | Chủ hàng, doanh nghiệp XNK | Trucking FCL/LCL, bộ-biển-bộ, hải quan | Công bố hơn 300 doanh nghiệp lớn sử dụng | Có dịch vụ vận hành thực tế và khách hàng doanh nghiệp | Thông tin trạng thái vẫn cần nối với hệ thống của khách/forwarder |
| Abivin vRoute | TMS/route optimization thương mại | Abivin | Chủ hàng, 2PL/3PL, nhà phân phối | Tối ưu tuyến, quản lý tài xế, theo dõi giao hàng | Có khách hàng doanh nghiệp; chưa có thị phần chính thức | Mạnh về tối ưu tuyến và real-time delivery | Phù hợp phân phối/đội xe; cần cấu hình cho luồng XNK container |
| GPS/fleet management như Vietmap | Sản phẩm thương mại | Nhà cung cấp GPS/bản đồ | Nhà xe, fleet owner | Theo dõi vị trí xe, hành trình, thiết bị | Phổ biến theo nhu cầu quản lý đội xe; chưa có số công khai | Cho biết vị trí và lịch sử di chuyển | Không tự hiểu shipment, POD, D/O, free time, chi phí |
| ePort/SmartGate/TAS | Hệ thống cảng/terminal | Cảng/terminal | Trucking, forwarder, chủ hàng | Giao dịch cảng, đặt lịch xe, gate event | Tùy cảng | Là nguồn trạng thái chính thức tại cảng | Không quản lý toàn bộ chặng từ kho đến cảng và trả rỗng |
| Excel/Zalo/điện thoại | Công cụ phổ thông | Người dùng tự vận hành | Điều phối, tài xế, CS/Ops | Điều xe, gửi ảnh, cập nhật nhanh | Rất phổ biến | Linh hoạt, nhanh, ít chi phí triển khai | Khó audit, khó tìm, khó chuẩn hóa, phụ thuộc cá nhân |

### 10.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn nhất là thiếu một lớp trạng thái theo shipment/container, gom được dữ liệu từ điều kiện hải quan/cảng, lệnh điều xe, GPS, tài xế, kho, POD/EIR và trả rỗng. Thị trường có TMS/GPS/nền tảng trucking, nhưng nhiều doanh nghiệp vẫn thiếu bức tranh "container này đang ở đâu, đã đủ điều kiện gì, còn rủi ro gì".

Khoảng trống thứ hai là quản trị exception và chi phí phát sinh. Trễ xe không chỉ là vấn đề vận tải; nó có thể tạo DEM/DET, phí chờ, trễ slot kho và trễ giao hàng cho khách. Dữ liệu exception cần được nối với cam kết giao hàng và đối soát chi phí.

Khoảng trống thứ ba là chuẩn hóa bằng chứng giao nhận. POD/EIR/ảnh biên bản cần được lưu theo shipment, container, thời gian, người gửi và mục đích sử dụng, thay vì nằm rải rác trong điện thoại hoặc nhóm chat.

## 11. Cụm 6: Kho, WMS và 3PL warehouse

### 11.1. Mục tiêu khảo sát cụm này

Cụm này khảo sát lớp kho hàng trong logistics B2B/XNK: kho của chủ hàng, kho nhà máy, kho thuê ngoài, kho 3PL, kho CFS, kho ngoại quan, kho tại ICD và các hệ thống quản lý kho như WMS/ERP/inventory module.

Câu hỏi cốt lõi là: sau khi xe đến kho, hàng đã thật sự được nhận, kiểm đếm, nhập kho, phát hiện lệch, lưu bằng chứng và cập nhật trạng thái cho các bên chưa? "Xe đã giao" không đồng nghĩa với "kho đã nhập hàng thành công".

### 11.2. Tại sao khảo sát cụm này?

Kho là điểm xác nhận hàng đã đi vào hoặc đi ra khỏi chuỗi cung ứng nội địa. Với hàng nhập, kho xác nhận nguyên vật liệu đã sẵn sàng cho sản xuất hoặc hàng hóa đã có tồn để bán. Với hàng xuất, kho/nhà máy xác nhận hàng đã đóng đủ, đúng mã, đúng số lượng và sẵn sàng hạ cảng.

Khi kho vận hành kém, hậu quả lan sang nhiều bên: xe chờ lâu, trả rỗng trễ, sản xuất thiếu nguyên liệu, tồn kho sai, khách không có thông tin, kế toán không đủ căn cứ tính phí, claim thiếu/hư hỏng khó xử lý.

Thị trường kho hiện đại tại Việt Nam đang mở rộng. Cushman & Wakefield ghi nhận đến cuối Q4/2025 nguồn cung kho xây sẵn tại miền Bắc đạt khoảng 3,575 triệu m2 NLA, tập trung tại các hub logistics như Bắc Ninh, Hải Phòng, Hưng Yên và Hà Nội. Nhu cầu tại khu vực phía Nam tiếp tục đến từ logistics, e-commerce và các tenant cần kho quy mô lớn. Khi kho hiện đại tăng, nhu cầu số hóa WMS, báo cáo tồn và kết nối với vận tải/cảng/chứng từ cũng tăng.

### 11.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| Warehouse | Kho hàng | Nơi nhận, lưu, xử lý và xuất hàng | Kho nguyên liệu của nhà máy |
| 3PL warehouse | Kho do bên thứ ba vận hành | Doanh nghiệp thuê ngoài lưu kho/xử lý hàng | 3PL quản lý tồn cho nhiều khách |
| WMS | Warehouse Management System | Điều hành nghiệp vụ kho chi tiết | Nhập hàng, putaway, pick, pack |
| ERP inventory | Module tồn kho trong ERP | Ghi nhận tồn ở mức quản trị/kế toán | SAP/Odoo quản lý tồn tổng |
| Inbound | Hàng đi vào kho | Nhận hàng nhập khẩu hoặc từ nhà cung cấp | Container nhập về kho |
| Outbound | Hàng đi ra khỏi kho | Xuất cho khách, sản xuất hoặc xuất khẩu | Xuất hàng ra cảng |
| Receiving | Bước nhận hàng | Kiểm xe, chứng từ, số lượng, tình trạng | Kho ký nhận 100 cartons |
| Putaway | Cất hàng vào vị trí | Chuyển hàng từ khu nhận vào vị trí lưu | Putaway lên kệ A-03 |
| Pick/pack | Lấy hàng/đóng gói | Chuẩn bị hàng xuất | Pick theo đơn B2B |
| SKU | Mã hàng | Định danh hàng hóa trong kho | SKU linh kiện A123 |
| Batch/lot/serial | Lô sản xuất/số seri | Truy xuất nguồn gốc | Lot thuốc, serial máy móc |
| GRN | Goods Receipt Note, phiếu nhận hàng | Bằng chứng nhập hàng | GRN sau khi kho kiểm xong |
| Cycle count | Kiểm kê định kỳ từng phần | Giữ độ chính xác tồn kho | Kiểm SKU giá trị cao mỗi tuần |

### 11.4. Workflow thực tế hiện tại

#### Case: Inbound hàng nhập khẩu về kho/nhà máy

1. CS/Ops hoặc chủ hàng gửi thông báo hàng đến kho: container, số seal, ETA xe, chứng từ liên quan.
2. Kho kiểm lịch nhận, xếp slot, chuẩn bị nhân sự và vị trí.
3. Xe đến cổng, bảo vệ/kho kiểm thông tin xe, container, seal và giấy tờ.
4. Kho dỡ hàng, kiểm số lượng, tình trạng bao bì, mã hàng, batch/lot/serial nếu có.
5. Nếu khớp, kho tạo GRN hoặc phiếu nhập, cập nhật WMS/ERP/Excel.
6. Nếu lệch thiếu/sai/hư hỏng, kho lập biên bản, chụp ảnh và báo CS/Ops/chủ hàng.
7. Hàng được putaway vào vị trí lưu hoặc đưa thẳng vào sản xuất/cross-dock.
8. Báo cáo inbound/tồn kho được gửi cho khách nội bộ hoặc khách 3PL.

#### Case: Outbound hàng xuất kho

1. Chủ hàng/sales/planning gửi lệnh xuất hoặc kế hoạch đóng hàng.
2. Kho tạo pick list, lấy hàng theo SKU/batch/lot/serial.
3. Kho kiểm hàng, đóng gói, dán nhãn, staging.
4. Xe đến nhận hàng/container. Kho bàn giao chứng từ và POD.
5. WMS/ERP/Excel cập nhật xuất kho.
6. Nếu thiếu hàng, sai hàng hoặc xe đến sai slot, kho báo exception cho CS/Ops/planning.

### 11.5. Thực trạng hiện tại

Doanh nghiệp lớn, FDI, 3PL và kho hiện đại thường có WMS hoặc module kho trong ERP. Các hệ thống này có thể hỗ trợ mã vạch/RF, quản lý vị trí, batch/lot/serial, pick/pack, kiểm kê, báo cáo tồn, API hoặc export report.

SME, kho nhỏ hoặc kho nhà máy quy trình đơn giản vẫn dùng Excel, Google Sheet, phiếu giấy và module tồn kho của phần mềm kế toán/ERP nội địa. Với 3PL, một kho phục vụ nhiều khách nên yêu cầu phức tạp hơn: phân quyền dữ liệu theo khách, billing theo pallet/ngày/handling/VAS, SLA báo cáo, và truy xuất chứng từ.

Các sản phẩm WMS như Infolog WMS, TigerWMS, Smartlog SWM/WMS, Odoo Inventory, SAP EWM, Oracle WMS Cloud, Infor WMS, Manhattan, Blue Yonder đều giải quyết nghiệp vụ kho ở các phân khúc khác nhau. Nhưng WMS không tự động giải quyết toàn bộ kết nối với shipment, trucking, hải quan, chứng từ, CS và kế toán nếu không có tích hợp hoặc quy trình dữ liệu chặt.

### 11.6. Pain của cụm này

**Pain 1: "Đã giao" nhưng chưa chắc "đã nhập kho".** Xe có thể đã đến kho nhưng hàng chưa dỡ, chưa kiểm, chưa tạo GRN hoặc đang chờ xử lý lệch. CS nhìn trạng thái trucking là "delivered" nhưng chưa có xác nhận tồn kho.

**Pain 2: Tồn kho thực tế và tồn hệ thống lệch nhau.** Nếu inbound/outbound cập nhật muộn, kiểm đếm thiếu hoặc nhập sai SKU/batch, ERP/WMS/Excel sẽ lệch. Lệch tồn làm sai kế hoạch sản xuất, bán hàng và xuất khẩu.

**Pain 3: Lệch thiếu/sai/hư hỏng không được báo đủ ngữ cảnh.** Kho có thể chụp ảnh và gửi Zalo, nhưng ảnh không gắn với shipment, PO, SKU, container, thời điểm và người xử lý. Khi claim, doanh nghiệp phải truy lại thủ công.

**Pain 4: WMS và ERP không phải lúc nào cũng đồng bộ.** WMS ghi nhận thao tác kho chi tiết, ERP ghi nhận tồn và tài chính. Nếu tích hợp chậm hoặc đối soát kém, bộ phận planning/kế toán/CS nhìn các số liệu khác nhau.

**Pain 5: 3PL cần báo cáo theo từng khách nhưng dữ liệu vận hành nằm trong hệ thống nội bộ.** Khách muốn daily report, tồn theo SKU, inbound/outbound, SLA, phí xử lý. 3PL thường phải export và chỉnh file, gây tốn thời gian.

**Pain 6: Slot kho và xe không ăn khớp.** Xe đến khi kho chưa sẵn sàng hoặc kho đổi lịch làm phát sinh phí chờ xe, chậm trả rỗng và trễ kế hoạch giao hàng.

### 11.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| Infolog WMS | WMS thương mại | Infolog | 3PL, kho phân phối, logistics | RF, batch/lot/serial, ASN, putaway, picking, cycle count | Có hiện diện tại Việt Nam; chưa có thị phần công khai | Chuyên sâu WMS, nhiều ngành | Cần triển khai quy trình và tích hợp với hệ thống khác |
| TigerWMS/Tiger platform | WMS/TMS/OMS thương mại | Tiger Technology/Smart Fulfillment | Fulfillment, retail, omni-channel | Tồn theo vị trí, wave picking, video receiving/packing, returns | Có khách hàng thương hiệu tại Việt Nam; chưa có thị phần chính thức | Tích hợp warehouse, transport, omni-channel | Thiên về fulfillment/omni-channel; cần đánh giá fit với XNK công nghiệp |
| Smartlog SWM/WMS | WMS/TMS thương mại | Smartlog | Kho, logistics, phân phối | Quản lý kho, vận tải, QR/barcode | Chưa có thị phần công khai | Nhà cung cấp nội địa, hiểu bối cảnh Việt Nam | Cần kiểm chứng mức phủ trong từng phân khúc |
| Odoo Inventory/WMS | ERP/WMS thương mại mã nguồn mở | Odoo và đối tác | SME, mid-market | Tồn kho, mua bán, sản xuất, kế toán tích hợp | Phổ biến ở SME/mid-market toàn cầu; Việt Nam cần khảo sát thêm | Linh hoạt, chi phí triển khai tương đối mềm | WMS chuyên sâu cần cấu hình/đối tác triển khai |
| SAP EWM/Oracle WMS/Infor/Manhattan/Blue Yonder | WMS/SCM enterprise | Nhà cung cấp quốc tế | FDI, tập đoàn, kho lớn | Điều hành kho quy mô lớn, tích hợp ERP/SCM | Chủ yếu doanh nghiệp lớn; chưa có số công khai tại Việt Nam | Mạnh về chuẩn enterprise, tích hợp, phân quyền | Chi phí cao, triển khai dài, không phù hợp mọi SME |
| Excel/Google Sheet/phiếu giấy | Công cụ phổ thông | Người dùng tự vận hành | Kho nhỏ, SME, đội vận hành | Tracking inbound/outbound, tồn, biên bản | Rất phổ biến | Linh hoạt, dễ dùng | Sai version, không real-time, khó audit |

### 11.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn là trạng thái kho chưa được nối chặt với shipment timeline. Một lô hàng cần biết không chỉ "đã giao tới kho" mà còn "đã nhận đủ chưa, có lệch không, đã nhập tồn chưa, đã sẵn sàng cho sản xuất/xuất bán chưa".

Khoảng trống thứ hai là quản lý exception và bằng chứng kho. GRN, POD, ảnh hư hỏng, biên bản lệch, báo cáo tồn cần được gắn đúng shipment/PO/SKU/container để CS, kế toán và claim team dùng lại.

Khoảng trống thứ ba là báo cáo khách hàng của 3PL. Nhiều WMS có dữ liệu nhưng khách vẫn nhận Excel/report thủ công. Thị trường cần quy trình báo cáo và đối soát dễ dùng hơn giữa 3PL và chủ hàng.

## 12. Cụm 7: Kế toán, chi phí, hóa đơn và đối soát

### 12.1. Mục tiêu khảo sát cụm này

Cụm này khảo sát lớp tài chính vận hành của logistics B2B/XNK: chi phí, doanh thu, hóa đơn, debit note, credit note, thanh toán, đối soát vendor, đối soát khách hàng và margin theo shipment/job/container.

Câu hỏi chính là: một shipment cuối cùng lời hay lỗ bao nhiêu, phí phát sinh từ đâu, hóa đơn/chứng từ phí đã đủ chưa, ai duyệt, và dữ liệu có khớp với báo giá ban đầu không?

### 12.2. Tại sao khảo sát cụm này?

Logistics không chỉ là giao hàng đúng hạn. Với forwarder/3PL, một lô hàng vận hành xong vẫn có thể lỗ nếu báo giá thiếu phí, vendor invoice cao hơn dự kiến, DEM/DET phát sinh nhưng không charge lại được, hoặc account quên đưa phí VAS vào hóa đơn.

Với chủ hàng, chi phí logistics ảnh hưởng trực tiếp đến landed cost, giá vốn và biên lợi nhuận. Nếu chi phí theo PO/container không rõ, procurement và finance khó đánh giá nhà cung cấp, tuyến vận tải và forwarder.

Việt Nam đã triển khai hóa đơn điện tử trên diện rộng. Nghị định 70/2025/NĐ-CP có hiệu lực từ ngày 01/06/2025, sửa đổi quy định về hóa đơn, chứng từ. Điều này làm tăng yêu cầu dữ liệu billing đúng thời điểm, đúng nội dung và có căn cứ đối soát.

### 12.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| Cost | Chi phí phải trả vendor | Cơ sở tính lời/lỗ | Phí trucking trả nhà xe |
| Revenue | Doanh thu thu từ khách | Cơ sở billing | Cước vận chuyển bán cho khách |
| Margin/Gross profit | Chênh lệch revenue - cost | Đánh giá hiệu quả shipment | Lãi 1,5 triệu VND/job |
| Quote | Báo giá ban đầu | Mốc so sánh với chi phí thực tế | Quote gồm cước biển và local charges |
| Job costing | Tính chi phí/doanh thu theo job/shipment | Biết job nào lời/lỗ | Costing theo container |
| Debit note | Giấy báo phí phải thu | Workflow logistics trước/kèm hóa đơn | Debit note local charges |
| Credit note | Chứng từ điều chỉnh giảm | Sửa sai hoặc hoàn phí | Giảm phí do tính nhầm |
| Vendor invoice | Hóa đơn từ nhà cung cấp | Khoản phải trả | Invoice từ hãng tàu |
| Customer invoice | Hóa đơn xuất cho khách | Khoản phải thu | Hóa đơn điện tử dịch vụ logistics |
| AP/AR | Phải trả/phải thu | Quản trị dòng tiền | AP hãng tàu, AR khách hàng |
| Reconciliation | Đối soát dữ liệu | Kiểm tra khớp giữa các bên | Vendor invoice vs rate card |
| DEM/DET/storage | Phí lưu container/lưu bãi/lưu kho | Chi phí phát sinh do trễ | Detention do trả rỗng muộn |

### 12.4. Workflow thực tế hiện tại

#### Case: Forwarder xử lý costing một shipment nhập khẩu

1. Sales/Account tạo quote hoặc rate sheet gửi khách.
2. Ops thực hiện shipment và ghi nhận chi phí dự kiến: cước, local charge, khai hải quan, trucking, kho.
3. Vendor gửi debit note/invoice qua email/portal.
4. Ops hoặc kế toán gắn chi phí vào job/shipment/container.
5. Nếu có phát sinh như DEM/DET, phí chờ xe, phí sửa chứng từ, Ops xin duyệt và báo khách.
6. Kế toán xuất hóa đơn cho khách theo debit note/contract/rate card.
7. Cuối kỳ, kế toán đối soát AP/AR, payment, invoice và margin.

#### Case: Chủ hàng kiểm soát landed cost

1. Procurement tạo PO và điều kiện Incoterms.
2. Forwarder/3PL gửi báo giá logistics.
3. Khi hàng về, finance nhận invoice từ forwarder, hãng tàu, trucking, kho, bảo hiểm nếu có.
4. Chi phí được phân bổ theo PO/SKU/container.
5. Finance so sánh chi phí thực tế với dự toán và phân tích phát sinh.

### 12.5. Thực trạng hiện tại

Doanh nghiệp Việt Nam dùng nhiều nhóm công cụ khác nhau: phần mềm kế toán nội địa như MISA, FAST, BRAVO; ERP quốc tế như SAP/Oracle/Odoo; phần mềm forwarding có module accounting/job costing như CargoWise, Magaya, Winta; và rất nhiều Excel để đối soát.

Hệ thống kế toán thường mạnh ở chuẩn hóa hóa đơn, sổ sách và báo cáo tài chính, nhưng không phải lúc nào cũng hiểu chi tiết vận hành logistics như container, B/L, free time, POD, EIR, phí chờ xe, phí sửa chứng từ. Ngược lại, Ops biết phí phát sinh nhưng có thể chưa cập nhật đúng lúc vào hệ thống kế toán.

Doanh nghiệp lớn có quy trình duyệt chi phí và phân quyền rõ hơn. SME thường linh hoạt nhưng dễ phụ thuộc vào file Excel, email và trí nhớ nhân viên. Rủi ro lớn nằm ở điểm giao giữa Ops, Sales/Account và Kế toán.

### 12.6. Pain của cụm này

**Pain 1: Chi phí phát sinh không được ghi nhận đúng thời điểm.** Ops biết xe chờ, trả rỗng trễ hoặc sửa B/L, nhưng kế toán chỉ biết khi vendor gửi invoice cuối tháng. Khi đó việc charge lại khách khó hơn.

**Pain 2: Hóa đơn không gắn đúng shipment/container/PO.** Nếu vendor invoice chỉ ghi nội dung chung, kế toán phải hỏi Ops để biết thuộc job nào. Sai mapping làm lệch margin và chậm đối soát.

**Pain 3: Quote và actual cost lệch nhưng phát hiện muộn.** Sales báo giá một mức, Ops mua dịch vụ mức khác, phụ phí thay đổi hoặc tỷ giá biến động. Nếu không so sánh sớm, cuối tháng mới biết shipment âm margin.

**Pain 4: Dữ liệu AP/AR nằm ở hệ thống khác dữ liệu vận hành.** Kế toán nhìn hóa đơn, Ops nhìn shipment, CS nhìn trạng thái khách. Khi tranh chấp phí, mỗi bên phải gom dữ liệu từ hệ thống của mình.

**Pain 5: Phí phát sinh cần bằng chứng nhưng bằng chứng nằm rải rác.** Phí chờ xe cần biên bản/ảnh/thời gian chờ. DEM/DET cần free time và mốc trả rỗng. Nếu bằng chứng nằm trong Zalo/email cá nhân, việc thu phí lại từ khách khó hơn.

**Pain 6: Quy định hóa đơn làm tăng áp lực dữ liệu đúng.** Khi thời điểm lập hóa đơn và dữ liệu hóa đơn có quy định chặt hơn, workflow đối soát thủ công dễ tạo lỗi hoặc trễ.

### 12.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| MISA | Phần mềm kế toán/ERP nội địa | MISA | SME, doanh nghiệp Việt Nam | Kế toán, hóa đơn, tài chính | Phổ biến rộng trong doanh nghiệp Việt; thị phần logistics riêng chưa công khai | Phù hợp quy định Việt Nam, dễ tiếp cận | Không chuyên sâu shipment/job costing nếu không cấu hình thêm |
| FAST | Phần mềm kế toán/ERP nội địa | FAST | SME, mid-market | Kế toán, ERP, quản trị | Phổ biến ở doanh nghiệp Việt; chưa có thị phần logistics riêng | Hiểu nghiệp vụ kế toán Việt Nam | Cần nối với dữ liệu Ops/logistics |
| BRAVO | ERP nội địa | BRAVO | Mid-market, doanh nghiệp sản xuất/thương mại | ERP, kế toán, quản trị | Chưa có thị phần logistics công khai | Tùy biến theo doanh nghiệp | Triển khai cần thời gian, không thay thế TMS/WMS |
| SAP/Oracle/Odoo | ERP quốc tế | Nhà cung cấp quốc tế và đối tác | FDI, tập đoàn, mid-market | Tài chính, mua hàng, bán hàng, tồn kho | Tùy phân khúc | Chuẩn enterprise, tích hợp nhiều module | Chi phí/triển khai phức tạp; cần mapping với local logistics |
| CargoWise/Magaya/Winta | Forwarding/logistics software | Nhà cung cấp phần mềm | Forwarder, 3PL | Job costing, billing, chứng từ, shipment | Tùy phân khúc; chưa có số Việt Nam công khai | Gắn costing với job logistics | Cần nhập liệu đầy đủ; không tự thu thập mọi phí từ email/Zalo/vendor |
| Excel/email | Công cụ phổ thông | Người dùng tự vận hành | Ops, kế toán, sales | Đối soát tạm, rate sheet, bảng phí | Rất phổ biến | Linh hoạt, nhanh | Sai version, khó audit, dễ quên phí |

### 12.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn nhất là đối soát theo shipment/job/container giữa dữ liệu vận hành và dữ liệu kế toán. Thị trường có phần mềm kế toán và phần mềm logistics, nhưng không phải doanh nghiệp nào cũng nối được exception vận hành với cost impact và billing.

Khoảng trống thứ hai là quản trị phí phát sinh sớm. Các khoản phí như DEM/DET, phí chờ xe, sửa chứng từ, VAS kho cần được cảnh báo và có bằng chứng trước khi thành tranh chấp cuối tháng.

Khoảng trống thứ ba là chuẩn hóa dữ liệu phục vụ hóa đơn điện tử. Hóa đơn cần đúng khách, đúng mã số thuế, đúng kỳ dịch vụ, đúng nội dung và đúng căn cứ; nhưng dữ liệu logistics lại nằm rải rác qua nhiều bộ phận.

## 13. Cụm 8: CS/Ops/Account trả lời khách

### 13.1. Mục tiêu khảo sát cụm này

Cụm này khảo sát nhóm người phải trả lời khách hàng hoặc phòng ban nội bộ về trạng thái shipment: Customer Service, Operations, Account, Sales account, Key account và quản lý vận hành.

Câu hỏi chính là: khi khách hỏi "lô hàng đang ở đâu, có vấn đề gì không, khi nào giao được?", người trả lời phải kiểm tra những nguồn nào, mất bao lâu và vì sao câu trả lời thường chậm hoặc thiếu chắc chắn?

### 13.2. Tại sao khảo sát cụm này?

CS/Ops/Account là nơi thị trường cảm nhận chất lượng dịch vụ logistics. Một shipment có thể vẫn đang xử lý đúng quy trình, nhưng nếu khách không được cập nhật kịp thời, họ sẽ cảm thấy nhà cung cấp thiếu kiểm soát.

Đây cũng là lớp "tích hợp thủ công" của thị trường. Dữ liệu nằm ở VNACCS/ECUS, ePort, carrier portal, TMS, WMS, phần mềm kế toán, Excel, email, Zalo, nhưng khách không hỏi theo từng hệ thống. Khách hỏi theo ngữ cảnh kinh doanh: hàng đã về chưa, có kẹt không, có ảnh hưởng cam kết giao hàng không, khi nào cập nhật tiếp.

Nếu cụm này vận hành kém, doanh nghiệp có thể mất niềm tin khách hàng, tăng escalation, mất nhiều giờ làm việc cho tra cứu thủ công, trả lời sai ETA, bỏ sót follow-up hoặc phản ứng chậm với phí phát sinh.

### 13.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| CS | Customer Service logistics | Giao tiếp thường xuyên với khách | Gửi daily status report |
| Ops | Operations | Điều phối vận hành thực tế | Làm việc với cảng, trucking, kho |
| Account | Người phụ trách quan hệ khách | Giữ khách và xử lý escalation | Key account cho khách FDI |
| Status update | Cập nhật trạng thái | Thông tin khách cần | Tờ khai đã thông quan |
| Exception | Sự cố/bất thường | Việc cần xử lý và báo khách | Roll tàu, thiếu chứng từ |
| SLA | Cam kết mức dịch vụ | Tiêu chuẩn phản hồi | Trả lời email trong 2 giờ |
| ETA/ETD/ATA/ATD | Dự kiến/thực tế đến/rời | Mốc thời gian logistics | ETA cảng Cát Lái 10/06 |
| Handover | Bàn giao công việc | Chuyển ca/người phụ trách | CS nghỉ phép bàn giao shipment |
| Customer portal | Cổng khách hàng tự xem | Kênh visibility chính thức | Portal tracking shipment |
| Ticket | Phiếu yêu cầu/hỗ trợ | Quản lý câu hỏi và SLA | Ticket hỏi POD |

### 13.4. Workflow thực tế hiện tại

#### Case: Khách hỏi "hàng đang ở đâu?"

1. Khách hỏi qua email, Zalo, điện thoại, WhatsApp, portal hoặc group chat.
2. CS tìm shipment trong Excel/TMS/forwarding software bằng job no, container no, B/L, PO hoặc tên khách.
3. CS kiểm tra booking/lịch tàu trên carrier portal hoặc email.
4. CS hỏi docs/hải quan về tờ khai, D/O, chứng từ còn thiếu.
5. CS hỏi trucking về xe, tài xế, gate-out, POD, trả rỗng.
6. CS hỏi kho về nhận hàng, nhập kho, lệch thiếu nếu có.
7. Nếu có phí phát sinh, CS hỏi Ops/kế toán/account để thống nhất cách báo khách.
8. CS tự tổng hợp thành câu trả lời và đặt nhắc follow-up.

#### Case: Daily/weekly status report cho khách lớn

1. CS/Ops export hoặc copy dữ liệu từ nhiều nguồn.
2. Cập nhật file tracking theo format khách yêu cầu.
3. Kiểm tra các shipment có rủi ro delay, thiếu chứng từ, chưa có POD.
4. Gửi email/report trước deadline SLA.
5. Khách phản hồi từng dòng, CS tiếp tục truy vấn nội bộ.

### 13.5. Thực trạng hiện tại

Doanh nghiệp lớn có thể dùng CRM/helpdesk như Zendesk, Freshdesk, HubSpot, Salesforce hoặc portal của forwarding/TMS/WMS/visibility platform. Các nền tảng visibility quốc tế như project44 và FourKites tập trung vào theo dõi chuỗi cung ứng và exception ở quy mô lớn.

Tuy nhiên, ở nhiều doanh nghiệp logistics Việt Nam, CS/Ops vẫn dùng email, Excel, Zalo và gọi điện là chính. Lý do không chỉ là thiếu phần mềm, mà là dữ liệu cần trả lời khách nằm ở nhiều bên ngoài công ty: hãng tàu, cảng, hải quan, nhà xe, kho, đại lý nước ngoài, khách hàng.

Portal cũng không loại bỏ hoàn toàn email/Zalo. Khách vẫn muốn người phụ trách giải thích, xác nhận mức độ chắc chắn, nêu nguyên nhân và cam kết bước tiếp theo. Vì vậy, vai trò CS/Ops/Account vẫn rất quan trọng ngay cả khi công ty có hệ thống.

### 13.6. Pain của cụm này

**Pain 1: Trả lời một câu hỏi phải tra nhiều nguồn.** Một câu "container đã giao chưa?" có thể cần kiểm tra trucking, kho, POD, tờ khai, D/O và free time. Thời gian tra cứu lặp lại mỗi ngày.

**Pain 2: Câu trả lời phụ thuộc vào người phụ trách.** Người A nhớ shipment nào đang kẹt, người B không biết. Khi nghỉ phép, đổi ca hoặc nghỉ việc, ngữ cảnh bị mất.

**Pain 3: Khó phân biệt dữ liệu chắc và dữ liệu dự kiến.** ETA là dự kiến, ATA là thực tế. "Xe đang trên đường" khác với "xe đã gate-out". Nếu CS dùng ngôn ngữ quá chắc khi dữ liệu chưa chắc, dễ gây tranh chấp.

**Pain 4: Missed follow-up.** CS hứa "chiều em cập nhật" nhưng không có nhắc việc hệ thống. Khi nhiều shipment chạy song song, việc quên follow-up rất dễ xảy ra.

**Pain 5: Escalation đến muộn.** Khi exception bị chôn trong email/Zalo/Excel, quản lý chỉ biết khi khách phàn nàn. Lúc đó phí đã phát sinh hoặc deadline đã trễ.

**Pain 6: Không đo được chất lượng phản hồi.** Nhiều công ty không biết trung bình mất bao lâu để trả lời khách, câu hỏi nào lặp lại nhiều nhất, khách nào tạo nhiều workload nhất, và bộ phận nào gây nghẽn thông tin.

### 13.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| Zendesk/Freshdesk | Helpdesk thương mại | Nhà cung cấp quốc tế | CS, support team | Ticket, SLA, email support | Phổ biến toàn cầu; logistics Việt Nam cần khảo sát thêm | Quản lý ticket tốt | Không tự hiểu shipment nếu không tích hợp |
| HubSpot/Salesforce | CRM thương mại | Nhà cung cấp quốc tế | Sales, Account, CS | Quản lý khách hàng, pipeline, tương tác | Chủ yếu doanh nghiệp có quy trình CRM | Mạnh về quan hệ khách hàng | Không chuyên sâu vận hành XNK |
| CargoWise/Magaya/GoFreight/Winta portal | Portal/logistics software | Nhà cung cấp phần mềm | Forwarder, khách hàng | Tracking, chứng từ, booking, billing | Tùy phân khúc | Gắn với job/shipment | Dữ liệu địa phương/email/Zalo vẫn có thể nằm ngoài |
| project44/FourKites | Visibility platform thương mại | Nhà cung cấp quốc tế | Enterprise shipper, 3PL | Tracking, ETA, exception, supply chain visibility | Chủ yếu enterprise; thị phần Việt Nam chưa công khai | Mạnh về visibility đa phương thức | Chi phí/tích hợp có thể cao; cần dữ liệu carrier/vendor |
| Zalo OA/Zalo Cloud/API | Kênh giao tiếp/nền tảng nội địa | Zalo/VNG | Doanh nghiệp Việt, CS | Nhắn tin khách hàng, thông báo | Zalo rất phổ biến tại Việt Nam | Phù hợp thói quen giao tiếp Việt Nam | Quyền riêng tư, dữ liệu phân tán, cần consent/API phù hợp |
| Email/Zalo/Excel | Công cụ phổ thông | Người dùng tự vận hành | CS/Ops/Account | Trả lời khách, tracking, báo cáo | Rất phổ biến | Nhanh, linh hoạt | Không quản trị SLA, khó audit, phụ thuộc cá nhân |

### 13.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn là thiếu một lớp trả lời trạng thái theo ngữ cảnh, không chỉ hiển thị dữ liệu thô. CS/Ops cần biết shipment đang ở bước nào, nguồn dữ liệu nào chắc, rủi ro nào đang mở, ai đang xử lý và nên trả lời khách thế nào.

Khoảng trống thứ hai là handover và follow-up. Thị trường cần cách lưu ngữ cảnh vận hành để khi đổi ca/đổi người, người mới vẫn biết lời hứa với khách, việc còn thiếu và mốc phải cập nhật.

Khoảng trống thứ ba là đo workload và chất lượng phản hồi. Nếu không đo được số câu hỏi, thời gian trả lời, nguồn nghẽn và loại exception, doanh nghiệp khó cải thiện dịch vụ một cách hệ thống.

## 14. Cụm 9: Excel, email, Zalo và file thủ công

### 14.1. Mục tiêu khảo sát cụm này

Cụm này khảo sát lớp công cụ không chính thức nhưng rất phổ biến trong logistics B2B/XNK: Excel, Google Sheet, email, Zalo, PDF, ảnh chụp, Drive/OneDrive, file scan, screenshot và ghi chú cá nhân.

Câu hỏi chính là: dữ liệu thật để vận hành và trả lời khách đang nằm ở đâu, được cập nhật như thế nào, có đáng tin không, và vì sao doanh nghiệp vẫn phải dùng các công cụ thủ công dù đã có phần mềm nghiệp vụ?

### 14.2. Tại sao khảo sát cụm này?

Một shipment B2B/XNK có quá nhiều bên tham gia. Mỗi bên có hệ thống riêng, quyền truy cập riêng và cách gửi thông tin riêng. Không có một phần mềm duy nhất bắt tất cả cùng dùng.

Vì vậy, Excel/email/Zalo/file thủ công trở thành lớp kết nối thực tế. Excel linh hoạt để thêm cột theo yêu cầu khách. Email là nơi lưu bằng chứng B2B chính thức. Zalo nhanh, quen thuộc tại Việt Nam và tiện cho tài xế/kho/trucking gửi ảnh. File PDF/scan/screenshot chứa rất nhiều bằng chứng mềm mà hệ thống core không tự lấy được.

DataReportal ghi nhận Việt Nam có 76,2 triệu active social media user identities vào tháng 01/2025. Vietnamnet dẫn thông tin Zalo đạt 78,3 triệu monthly active users sau 6 tháng đầu 2025. Dù cần phân biệt số social identities không đồng nghĩa MAU, các con số này cho thấy kênh chat/social là một phần rất lớn trong hành vi giao tiếp tại Việt Nam.

### 14.3. Bảng thuật ngữ

| Thuật ngữ | Giải thích dễ hiểu | Vai trò trong cụm | Ví dụ |
|---|---|---|---|
| File tracking | File theo dõi shipment/container/PO | Bảng nhìn nhanh tình trạng lô hàng | Google Sheet tracking nhập khẩu |
| Version file | Phiên bản file | Rủi ro khi nhiều người sửa nhiều bản | tracking_final_update2.xlsx |
| Email thread | Chuỗi email qua lại | Lưu trao đổi chính thức | Thread booking và B/L correction |
| Attachment | File đính kèm | Chứng từ/bằng chứng | Invoice, packing list, POD |
| Manual update | Cập nhật thủ công | Dữ liệu do người nhập | Ops gõ "truck booked" |
| OCR | Đọc chữ từ ảnh/scan | Trích dữ liệu từ chứng từ | Đọc số container từ EIR |
| Data extraction | Trích xuất dữ liệu | Biến file/email thành trường dữ liệu | Lấy ETA từ arrival notice |
| Data matching | Ghép dữ liệu đúng shipment | Tránh thất lạc ngữ cảnh | Gắn ảnh POD vào container đúng |
| Single source of truth | Nguồn dữ liệu chuẩn duy nhất | Giảm tranh cãi version | Một timeline chính cho shipment |
| Audit trail | Lịch sử ai sửa gì lúc nào | Truy vết trách nhiệm | Ai cập nhật ETA lúc 09:30 |

### 14.4. Workflow thực tế hiện tại

#### Case: Theo dõi shipment bằng Excel/Google Sheet

1. CS/Ops tạo file tracking theo khách, tuyến hoặc tháng.
2. Dữ liệu ban đầu được copy từ booking, email, B/L, PO hoặc phần mềm nội bộ.
3. Mỗi ngày nhân viên cập nhật ETA, customs status, D/O, truck status, warehouse status, POD, remark.
4. Khi khách hỏi, CS đọc file và bổ sung thông tin mới từ email/Zalo.
5. File được gửi lại khách qua email hoặc share link.
6. Nếu nhiều người cùng sửa, có thể phát sinh lệch version hoặc mất dữ liệu.

#### Case: Zalo/email là nguồn dữ liệu vận hành

1. Tài xế gửi ảnh EIR/POD qua Zalo.
2. Kho gửi ảnh hàng hư hỏng hoặc biên bản thiếu.
3. Hãng tàu/agent gửi arrival notice, debit note, booking change qua email.
4. CS/Ops copy thông tin quan trọng vào Excel hoặc forwarding software.
5. Khi cần tìm lại, nhân viên search theo container/job no trong email, Zalo, Drive hoặc hỏi người phụ trách.

### 14.5. Thực trạng hiện tại

Excel, email và Zalo không chỉ là "tạm bợ"; chúng là công cụ vận hành thật ở nhiều doanh nghiệp vì linh hoạt, dễ dùng, chi phí thấp và phù hợp giao tiếp liên công ty. Ngay cả doanh nghiệp có TMS/WMS/ERP vẫn có thể dùng Excel để tạo báo cáo theo format riêng của khách hoặc theo dõi các exception chưa có trong hệ thống.

Các công cụ document AI, OCR, RPA và no-code đã phát triển mạnh hơn, ví dụ Microsoft Azure AI Document Intelligence, Google Document AI, ABBYY, Microsoft 365 Copilot, Google Workspace Gemini. Nhưng để ứng dụng vào logistics Việt Nam, hệ thống không chỉ đọc chữ; nó còn phải hiểu shipment, container, B/L, PO, mã khách, loại phí và ngữ cảnh vận hành.

Vấn đề lớn không phải là Excel hay Zalo "xấu", mà là dữ liệu thiếu cấu trúc, thiếu chuẩn tham chiếu, thiếu audit trail và khó tái sử dụng khi người phụ trách thay đổi.

### 14.6. Pain của cụm này

**Pain 1: Không có nguồn dữ liệu chuẩn duy nhất.** Cùng một shipment có thể có một trạng thái trong Excel, một trạng thái trong email và một trạng thái mới hơn trong Zalo. Khi dữ liệu lệch, không ai chắc đâu là đúng.

**Pain 2: Sai version file.** File tracking gửi qua email hoặc lưu nhiều bản dễ bị sửa chồng, dùng nhầm file cũ hoặc gửi khách bản chưa cập nhật.

**Pain 3: Dữ liệu quan trọng nằm trong tài khoản cá nhân.** Ảnh POD, EIR, tin nhắn tài xế, trao đổi với kho có thể nằm trong Zalo cá nhân. Khi nhân viên nghỉ hoặc đổi việc, ngữ cảnh mất theo người.

**Pain 4: Copy/paste lặp lại và dễ sai.** Nhân viên phải copy số container, ETA, phí, trạng thái từ email/portal/Zalo sang Excel hoặc phần mềm. Lỗi nhập liệu nhỏ có thể làm sai tracking hoặc chứng từ.

**Pain 5: Tìm lại bằng chứng mất thời gian.** Khi có claim, kiểm toán, kiểm tra sau thông quan hoặc tranh chấp phí, doanh nghiệp phải tìm email cũ, file cũ, ảnh cũ. Nếu không có mã chuẩn, việc tìm kiếm rất chậm.

**Pain 6: Khó bảo mật và phân quyền.** File share rộng, nhóm chat nhiều người, attachment gửi qua lại làm dữ liệu nhạy cảm dễ lan ra ngoài phạm vi cần thiết.

### 14.7. Công cụ, sản phẩm hiện tại đang được sử dụng

| Sản phẩm/hệ thống | Loại | Bên phát triển/vận hành | Người dùng chính | Mục đích sử dụng | Mức phổ biến/thị phần | Điểm mạnh | Điểm yếu/khoảng trống |
|---|---|---|---|---|---|---|---|
| Microsoft Excel/Google Sheets | Spreadsheet | Microsoft/Google | Hầu hết bộ phận vận hành | Tracking, báo cáo, đối soát | Rất phổ biến | Linh hoạt, dễ triển khai | Sai version, khó audit, khó tự động hóa nếu thiếu chuẩn |
| Email/Outlook/Gmail | Công cụ giao tiếp | Microsoft/Google và mail server doanh nghiệp | B2B, docs, CS/Ops | Trao đổi chính thức, gửi chứng từ | Rất phổ biến | Có tính chính thức, lưu thread | Khó biến thành timeline nếu không phân loại |
| Zalo/Zalo OA/Zalo Cloud | Chat/nền tảng giao tiếp | Zalo/VNG | CS, tài xế, kho, khách Việt Nam | Nhắn nhanh, gửi ảnh/file | Rất phổ biến tại Việt Nam | Phù hợp thói quen nội địa | Dữ liệu phân tán, quyền riêng tư, phụ thuộc consent/API |
| Drive/OneDrive/SharePoint | Lưu trữ file | Google/Microsoft | Docs, kế toán, CS/Ops | Lưu chứng từ, ảnh, file tracking | Phổ biến | Chia sẻ và phân quyền tốt hơn folder cá nhân | Cần quy tắc đặt tên và mapping shipment |
| Azure AI Document Intelligence/Google Document AI/ABBYY | OCR/document AI thương mại | Microsoft/Google/ABBYY | Doanh nghiệp nhiều chứng từ | Đọc và trích xuất dữ liệu từ file | Đang tăng; ứng dụng logistics Việt Nam cần khảo sát | Giảm nhập liệu thủ công | Cần cấu hình theo nghiệp vụ logistics, không tự hiểu quy trình |
| RPA/no-code tools | Tự động hóa thao tác | UiPath, Power Automate, Make, Zapier và nhà cung cấp khác | Ops/IT/process team | Copy dữ liệu, tạo workflow, nhắc việc | Tùy doanh nghiệp | Tự động hóa nhanh các bước lặp | Dễ vỡ nếu quy trình/format thay đổi, cần quản trị |

### 14.8. Tổng hợp khoảng trống của cụm

Khoảng trống lớn nhất là chuẩn hóa dữ liệu thủ công thành dữ liệu vận hành có cấu trúc. Thị trường không thể bỏ ngay Excel/email/Zalo, nên nhu cầu thực tế là biến các nguồn này thành timeline, checklist, evidence và audit trail theo shipment.

Khoảng trống thứ hai là quản trị quyền riêng tư và quyền truy cập. Dữ liệu logistics có thông tin khách hàng, giá, chứng từ, thuế và hình ảnh hàng hóa; việc gom dữ liệu từ chat/email phải có consent, phân quyền và giới hạn rõ.

Khoảng trống thứ ba là giảm phụ thuộc cá nhân. Khi tri thức vận hành nằm trong đầu người phụ trách hoặc trong tài khoản cá nhân, doanh nghiệp khó mở rộng, khó kiểm soát chất lượng và khó bàn giao.

## 15. Tổng hợp khoảng trống thị trường sau 9 cụm

Qua 9 cụm, có thể thấy thị trường logistics B2B/XNK Việt Nam không thiếu phần mềm theo từng mảng. Ngược lại, thị trường có rất nhiều hệ thống: hải quan, cảng, ePort, carrier portal, forwarding software, ERP, TMS, WMS, kế toán, CRM/helpdesk, GPS, OCR, Excel, email, Zalo.

Khoảng trống chính nằm ở chỗ các hệ thống này không tự ghép thành một bức tranh vận hành thống nhất theo shipment/container/PO. Một lô hàng có nhiều "mã": PO, booking, B/L, container, tờ khai, invoice, job no, truck trip, GRN, customer ticket. Khi các mã này không được map tốt, dữ liệu bị đứt.

Các khoảng trống lặp lại nhiều nhất:

1. Thiếu timeline thống nhất theo shipment/container/PO, nối booking, chứng từ, hải quan, cảng, trucking, kho, chi phí và CS.
2. Thiếu quản trị exception sớm: roll tàu, thiếu chứng từ, chưa thông quan, chưa có D/O, xe chờ, kho chưa nhận, sắp phát sinh DEM/DET, thiếu POD, invoice lệch.
3. Thiếu chuẩn lưu bằng chứng: POD, EIR, GRN, ảnh hàng hư hỏng, debit note, invoice, biên bản cần được gắn đúng ngữ cảnh.
4. Thiếu khả năng đo workload và chất lượng vận hành: thời gian trả lời khách, số lần follow-up, vendor nào hay trễ, cụm nào gây phát sinh phí.
5. Thiếu cầu nối giữa dữ liệu vận hành và dữ liệu tài chính: exception vận hành không tự biến thành cảnh báo cost, billing và margin.
6. Thiếu cách xử lý thực tế với Excel/email/Zalo. Đây là lớp dữ liệu phổ biến nhưng thường bị xem là ngoài hệ thống.

## 16. Các giả định cần kiểm chứng bằng khảo sát thực địa

Báo cáo này dựa trên 9 cụm research nội bộ và nguồn công khai, nên một số nhận định thị trường cần được kiểm chứng bằng phỏng vấn trực tiếp doanh nghiệp. Các câu hỏi nên ưu tiên:

| Nhóm cần khảo sát | Câu hỏi kiểm chứng chính | Dữ liệu cần thu |
|---|---|---|
| Chủ hàng/importer/exporter | Họ theo dõi PO-shipment-container bằng gì? Pain lớn nhất là delay, chi phí hay chứng từ? | Số shipment/tháng, hệ thống đang dùng, thời gian hỏi trạng thái |
| Forwarder/3PL | Job costing, tracking, docs và CS đang dùng phần mềm nào? Phần nào vẫn Excel/Zalo? | Tool stack, số nhân sự Ops/CS, số câu hỏi khách/ngày |
| Công ty trucking | Có TMS/GPS/app tài xế không? POD/EIR gửi qua đâu? | Tỷ lệ chuyến có cập nhật real-time, thời gian trả POD |
| Kho/3PL warehouse | WMS đang dùng gì? GRN/POD/exception kho báo cho khách thế nào? | Thời gian inbound, tỷ lệ lệch tồn, format báo cáo khách |
| Kế toán logistics | Invoice gắn với shipment/job/container ra sao? Lệch quote-vs-actual phát hiện khi nào? | Quy trình AP/AR, loại phí hay tranh chấp, thời gian đối soát |
| CS/Ops/Account | Một câu hỏi trạng thái mất bao lâu để trả lời? Handover làm thế nào? | Số câu hỏi/ngày, số nguồn phải tra, SLA phản hồi |

Cần lưu ý khi khảo sát: không chỉ hỏi "anh/chị có dùng phần mềm không", mà phải hỏi "khi một lô hàng cụ thể bị kẹt, anh/chị mở những màn hình/file/chat nào để xử lý". Cách hỏi theo tình huống thật sẽ cho ra pain vận hành chính xác hơn.

## 17. Ghi chú rà soát cuối báo cáo

Bản báo cáo hiện tại được biên tập theo hướng market research thuần túy. Nội dung không đưa đề xuất thương mại hoặc định hướng cho một công ty cụ thể. Các phần "khoảng trống" được viết như nhận định thị trường trung lập, dùng để hiểu thực trạng và chuẩn bị khảo sát sâu hơn.

Những điểm cần thận trọng khi dùng báo cáo gửi sếp:

1. Các số liệu thị phần phần mềm logistics tại Việt Nam nhìn chung không có nguồn công khai đáng tin cậy. Vì vậy báo cáo chỉ ghi mức phổ biến định tính hoặc dẫn thông tin công bố từ chính nhà cung cấp.
2. Một số sản phẩm quốc tế có hiện diện toàn cầu nhưng mức sử dụng tại Việt Nam cần khảo sát thêm theo phân khúc doanh nghiệp.
3. Các dữ liệu kho xây sẵn, social media/Zalo và quy định hóa đơn được trích từ nguồn công khai cập nhật đến thời điểm viết; nên kiểm tra lại nếu dùng cho quyết định đầu tư hoặc pháp lý.
4. Báo cáo phản ánh workflow phổ biến trong B2B/XNK, nhưng từng ngành hàng như dược, thực phẩm, hóa chất, máy móc, dệt may, điện tử có thêm yêu cầu chuyên ngành riêng.

## Nguồn tham khảo

1. National Statistics Office of Vietnam, "Socio-economic situation in the fourth quarter and 2025", công bố ngày 05/01/2026: https://www.nso.gov.vn/en/data-and-statistics/2026/01/socio-economic-situation-in-the-fourth-quarter-and-2025/
2. Cổng thông tin logistics Việt Nam/Bộ Công Thương, "Vietnam: Gov't approves logistics services development strategy towards 2025", 26/11/2025: https://logistics.gov.vn/vietnam-gov-t-approves-logistics-services-development-strategy-towards-2025
3. Cổng thông tin logistics Việt Nam/Bộ Công Thương, "Logistics service businesses in Vietnam transform digitally to reduce costs", 23/12/2024: https://logistics.gov.vn/logistics-service-businesses-in-vietnam-transform-digitally-to-reduce-costs
4. Cổng thông tin logistics Việt Nam/Bộ Công Thương, "Vietnam charts new course to become regional logistics powerhouse", 03/12/2025: https://logistics.gov.vn/vietnam-charts-new-course-to-become-regional-logistics-powerhouse
5. Bộ Công Thương, "10 sự kiện logistics Việt Nam năm 2024", 29/12/2024: https://moit.gov.vn/tin-tuc/hoat-dong/10-su-kien-logistics-viet-nam-nam-2024.html
6. Viet Nam Logistics Forum 2025, trang giới thiệu diễn đàn: https://vlf.logistics.gov.vn/en
7. Tổng cục Hải quan, "Hệ thống đăng ký người sử dụng VNACCS": https://dknsd.customs.gov.vn/Pages/dn.aspx
8. Tổng cục Hải quan, tài liệu về hệ thống CNTT hải quan và VNACCS/VCIS: https://files.customs.gov.vn/CustomsCMS/TONG_CUC/2024/7/26/2022-18%20VPTC.pdf
9. Tổng cục Hải quan, "Cổng thanh toán điện tử và thông quan 24/7": https://epayment.customs.gov.vn/epaymentportal/login
10. Tài liệu hướng dẫn NSW/ASW trên hệ thống Hải quan: https://files.customs.gov.vn/DA_NANG/haiquandng/UserFiles/file/1cua.pdf
11. Thái Sơn, "ECUS5VNACCS Electronic Customs Software Manual": https://www.thaison.vn/ECUS/ECUS5VNACCS_English.PDF
12. CargoWise, trang giới thiệu nền tảng logistics execution: https://www.cargowise.com/
13. Magaya, trang giới thiệu logistics software: https://www.magaya.com/
14. INTTRA by e2open, "Our Story": https://www.inttra.com/about/our-story/
15. e2open, trang logistics solutions: https://www.e2open.com/logistics/
16. project44, trang giới thiệu nền tảng visibility/decision intelligence: https://www.project44.com/
17. FourKites, trang giới thiệu AI supply chain orchestration & visibility platform: https://www.fourkites.com/
18. SAP Help Portal, "External Procurement with Purchase Order": https://help.sap.com/docs/SAP_ERP/d3a123be3f924c7f897930e5d9bdeed5/ada2cf5d5fd64a0ba24f86e54b5e76fb.html
19. LOGIVAN, trang giới thiệu mạng vận tải số và giải pháp vận tải tại Việt Nam: https://logivan.com/
20. EcoTruck, trang giới thiệu dịch vụ vận tải XNK và hệ sinh thái logistics: https://ecotruck.vn/vi/home
21. Abivin, trang giới thiệu Abivin vRoute logistics management platform: https://www.abivin.com/
22. VIETMAP, trang giới thiệu giải pháp GPS, quản lý xe, bản đồ số và GIS: https://vietmap.vn/
23. Infolog, trang giới thiệu Infolog WMS: https://www.infolog.com.vn/vn/products-vn/infolog-wms-warehouse-management-system/
24. TigerWMS/Smart Fulfillment, trang giới thiệu nền tảng WMS/TMS/OMS: https://tigerwms.vn/
25. Cushman & Wakefield Vietnam, "Northern Vietnam Industrial Market Expands Rapidly in Q4 2025", 01/2026: https://www.cushmanwakefield.com/en/vietnam/news/2026/01/q4-2025-northern-vietnam-industrial-marketbeat-report
26. Cushman & Wakefield Vietnam, "Ho Chi Minh City Industrial MarketBeat", Q1/2026: https://www.cushmanwakefield.com/en/vietnam/insights/ho-chi-minh-city-marketbeat/industrial-marketbeat
27. Decree No. 70/2025/ND-CP summary, Apolat Legal: https://apolatlegal.com/laws/decree-no-70-2025-nd-cp-amends-and-supplements-decree-no-123-2020-nd-cp-on-invoices-and-records/
28. DataReportal, "Digital 2025: Vietnam": https://datareportal.com/reports/digital-2025-vietnam
29. Vietnamnet, "Zalo's number of users hits 78.3 million", 2025: https://vietnamnet.vn/en/zalo-s-number-of-users-hits-78-3-million-putting-telcos-at-pipeline-trap-2436470.html
