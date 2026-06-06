# Cụm 4: Chứng từ xuất nhập khẩu

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để hiểu toàn bộ lớp **chứng từ xuất nhập khẩu** trong logistics B2B: chứng từ thương mại, chứng từ vận tải, chứng từ hải quan, chứng từ xuất xứ, chứng từ thanh toán và các giấy phép/chứng nhận chuyên ngành.

Nếu Cụm 1 trả lời câu hỏi "hàng có qua được hải quan, cảng, depot/ICD không", Cụm 2 trả lời "chủ hàng cần giao đúng PO/hợp đồng nào", và Cụm 3 trả lời "ai booking vận chuyển quốc tế", thì Cụm 4 trả lời câu hỏi:

> Bộ chứng từ nào quyết định lô hàng có được khai báo, thông quan, nhận hàng, thanh toán và giao đúng cam kết hay không?

Các câu hỏi chính cần trả lời:

1. Một bộ chứng từ XNK thực tế gồm những giấy tờ nào?
2. Dữ liệu nào hay bị sai lệch giữa invoice, packing list, B/L, booking, tờ khai, C/O và PO?
3. Người làm chứng từ đang kiểm tra sai lệch bằng cách nào: mắt thường, Excel, email, checklist hay phần mềm?
4. Sai chứng từ gây hậu quả gì: chậm thông quan, sửa manifest, sửa B/L, mất ưu đãi thuế, phát sinh lưu bãi/lưu container, bị khách phạt hay bị ngân hàng từ chối bộ chứng từ?
5. Công cụ hiện tại đã giải quyết phần nào: VNACCS/VCIS, ECUS, National Single Window, eCO, ERP, phần mềm forwarder, DMS/OCR?
6. Agentify có thể làm gì mà không đụng vào vùng pháp lý nhạy cảm như quyết định HS code, ký chứng từ, khai chính thức hoặc nộp hồ sơ thay người có trách nhiệm?
7. Use case nào đủ hẹp để làm MVP nhưng có giá trị rõ với forwarder, đại lý hải quan, docs team và chủ hàng?

Kết luận cần kiểm chứng:

> Chứng từ XNK là một trong những cụm có ROI rõ nhất cho Agentify vì lỗi nhỏ trong dữ liệu có thể gây hậu quả lớn. Cơ hội không phải là thay thế ECUS, VNACCS, National Single Window hay hệ thống eCO, mà là tạo lớp trung gian kiểm tra, so khớp, nhắc hạn và tóm tắt bộ chứng từ trước khi con người khai báo, ký, nộp hoặc gửi cho khách/ngân hàng.

---

## 2. Vì sao cụm chứng từ XNK quan trọng?

### 2.1. Chứng từ là "ngôn ngữ chính thức" của lô hàng

Trong logistics B2B, hàng hóa không chỉ di chuyển bằng container, xe tải, tàu hoặc máy bay. Hàng hóa còn "di chuyển" qua một chuỗi giấy tờ:

- Hợp đồng hoặc PO để chứng minh giao dịch.
- Invoice và packing list để mô tả hàng hóa, giá trị, số lượng, trọng lượng.
- Booking confirmation để xác nhận chỗ vận chuyển.
- B/L hoặc AWB để chứng minh vận tải.
- Tờ khai hải quan để làm thủ tục xuất nhập khẩu.
- C/O để chứng minh xuất xứ và có thể hưởng ưu đãi thuế.
- Giấy phép/chứng nhận chuyên ngành nếu hàng thuộc diện kiểm tra đặc biệt.
- Bộ chứng từ thanh toán nếu dùng L/C hoặc điều khoản thanh toán yêu cầu chứng từ.

Một sai lệch nhỏ giữa các chứng từ có thể làm cả luồng bị chậm. Ví dụ:

```text
Invoice ghi: 1,000 cartons
Packing List ghi: 990 cartons
B/L draft ghi: 1,000 packages
Tờ khai hải quan dự kiến ghi: 990 packages
```

Nếu phát hiện sau khi đã khai, đã phát hành B/L hoặc hàng đã đến cảng, việc sửa có thể mất thời gian, phát sinh phí và ảnh hưởng lịch giao.

### 2.2. Chứng từ là nơi rủi ro pháp lý và tài chính tập trung

Không giống việc cập nhật trạng thái "tàu delay" hay "xe đã tới kho", chứng từ XNK liên quan trực tiếp đến:

- Trị giá tính thuế.
- Mã HS và thuế suất.
- Xuất xứ hàng hóa.
- Điều kiện giao hàng theo Incoterms.
- Quyền nhận hàng.
- Nghĩa vụ thanh toán.
- Quy định kiểm tra chuyên ngành.
- Hồ sơ lưu trữ sau thông quan.

Vì vậy, AI không nên được thiết kế như một hệ thống "tự khai, tự ký, tự nộp". Cách tiếp cận phù hợp hơn là:

```text
AI đọc dữ liệu -> so khớp -> phát hiện bất thường -> giải thích rủi ro -> soạn nháp xử lý -> con người kiểm tra và quyết định
```

### 2.3. Việt Nam có quy mô XNK lớn nên lỗi chứng từ có tần suất cao

Theo National Statistics Office of Vietnam, tổng kim ngạch xuất nhập khẩu hàng hóa của Việt Nam năm 2025 đạt **930,05 tỷ USD**, tăng **18,2%** so với năm trước. Quy mô này kéo theo khối lượng lớn bộ chứng từ, tờ khai, vận đơn, C/O, invoice, packing list, giấy phép và email trao đổi giữa chủ hàng, forwarder, đại lý hải quan, hãng tàu/hãng bay, ngân hàng và cơ quan quản lý.

Ý nghĩa cho Agentify:

- Nhu cầu không nằm ở vài doanh nghiệp lớn, mà có thể xuất hiện ở rất nhiều forwarder, chủ hàng, nhà máy, công ty thương mại và đại lý hải quan.
- Lỗi chứng từ lặp lại theo mẫu, nên có khả năng chuẩn hóa checklist và rule kiểm tra.
- Dữ liệu chứng từ thường nằm trong PDF, email, file scan, Excel và ảnh chụp, rất phù hợp với bài toán trích xuất và so khớp bằng AI.

---

## 3. Thuật ngữ cần giải thích

### 3.1. Commercial Invoice là gì?

**Commercial Invoice** là hóa đơn thương mại. Đây là chứng từ do người bán phát hành cho người mua, thể hiện thông tin giao dịch hàng hóa.

Invoice thường có:

- Số invoice và ngày invoice.
- Người bán, người mua.
- Mô tả hàng hóa.
- Số lượng, đơn giá, tổng giá trị.
- Loại tiền tệ.
- Điều kiện giao hàng, ví dụ FOB, CIF, EXW.
- Điều kiện thanh toán.
- Nước xuất xứ nếu có ghi.

Invoice là chứng từ rất quan trọng vì liên quan đến trị giá hàng hóa, thanh toán và khai báo hải quan.

### 3.2. Packing List là gì?

**Packing List** là phiếu đóng gói. Chứng từ này mô tả cách hàng được đóng trong kiện, carton, pallet hoặc container.

Packing list thường có:

- Số kiện/carton/pallet.
- Trọng lượng gross weight và net weight.
- Kích thước, CBM.
- Số container, seal nếu đã có.
- Mô tả hàng theo từng dòng.

Packing list giúp hải quan, kho, forwarder và người nhận kiểm tra hàng thực tế.

### 3.3. Sales Contract và Purchase Order là gì?

**Sales Contract** là hợp đồng mua bán. **Purchase Order (PO)** là đơn đặt hàng.

Trong nhiều doanh nghiệp, PO là điểm bắt đầu của lô hàng. PO cho biết:

- Mua hàng gì.
- Số lượng bao nhiêu.
- Giá và điều kiện thanh toán.
- Ngày cần giao.
- Điều kiện giao hàng.
- Địa điểm giao/nhận.

Vấn đề thường gặp: chứng từ logistics lại không được map rõ về PO, nên khi lô hàng có nhiều PO hoặc một PO tách nhiều chuyến, người theo dõi khó biết shipment nào đang phục vụ cam kết nào.

### 3.4. Bill of Lading là gì?

**Bill of Lading (B/L)** là vận đơn đường biển. B/L vừa là bằng chứng hợp đồng vận chuyển, vừa là biên nhận hàng hóa, và trong một số trường hợp còn là chứng từ sở hữu hàng hóa.

Một B/L thường có:

- Shipper.
- Consignee.
- Notify party.
- Vessel/voyage.
- Port of loading, port of discharge.
- Place of receipt, place of delivery nếu có.
- Container number, seal number.
- Description of goods.
- Gross weight, measurement, packages.
- Freight term.
- B/L number.

Trong thực tế có thể gặp:

- **MBL**: Master Bill of Lading, thường do hãng tàu phát hành.
- **HBL**: House Bill of Lading, thường do forwarder/NVOCC phát hành.
- **Draft B/L**: bản nháp vận đơn để kiểm tra trước khi phát hành chính thức.

### 3.5. AWB, MAWB và HAWB là gì?

**Air Waybill (AWB)** là vận đơn hàng không. Với hàng air, thường gặp:

- **MAWB**: Master Air Waybill, do hãng bay hoặc đại lý cấp master phát hành.
- **HAWB**: House Air Waybill, do forwarder phát hành cho khách.

Khác với B/L đường biển, AWB thường không phải chứng từ sở hữu hàng hóa theo cách B/L gốc có thể là chứng từ sở hữu.

### 3.6. Certificate of Origin là gì?

**Certificate of Origin (C/O)** là giấy chứng nhận xuất xứ hàng hóa. C/O chứng minh hàng được sản xuất hoặc có xuất xứ từ một quốc gia/khu vực nhất định.

C/O có thể ảnh hưởng đến thuế nhập khẩu. Nếu hàng đủ điều kiện theo hiệp định thương mại và C/O hợp lệ, người nhập khẩu có thể được hưởng thuế ưu đãi.

Ví dụ một số form C/O thường gặp:

- Form D: trong khu vực ASEAN.
- Form E: ASEAN - Trung Quốc.
- Form AK: ASEAN - Hàn Quốc.
- Form AJ/VJ: liên quan Nhật Bản tùy hiệp định.
- Form EUR.1 hoặc chứng từ xuất xứ theo EVFTA nếu phù hợp.

Điểm cần khảo sát: doanh nghiệp đang xin C/O bằng cách nào, ai kiểm tra tính khớp giữa C/O, invoice, packing list, B/L và tờ khai.

### 3.7. HS code là gì?

**HS code** là mã phân loại hàng hóa theo Hệ thống hài hòa mô tả và mã hóa hàng hóa. HS code ảnh hưởng đến:

- Thuế nhập khẩu.
- Thuế GTGT.
- Chính sách quản lý chuyên ngành.
- Yêu cầu kiểm tra chất lượng, an toàn, kiểm dịch, công bố hợp quy.

Đây là vùng rủi ro cao. Agentify có thể gợi ý tài liệu tham khảo, phát hiện mâu thuẫn hoặc nhắc câu hỏi cần kiểm tra, nhưng không nên tự quyết định HS code cuối cùng.

### 3.8. Customs Declaration là gì?

**Customs Declaration** là tờ khai hải quan. Tại Việt Nam, doanh nghiệp/đại lý thường khai báo điện tử qua hệ thống VNACCS/VCIS hoặc phần mềm khai hải quan kết nối như ECUS.

Tờ khai thường liên quan đến:

- Người xuất khẩu, người nhập khẩu.
- Loại hình xuất nhập khẩu.
- Mã HS.
- Mô tả hàng hóa.
- Trị giá, số lượng, đơn vị tính.
- C/O nếu có.
- Thuế và phí.
- Cảng/cửa khẩu.
- Container/vận đơn.

Sai dữ liệu trên tờ khai có thể dẫn đến sửa tờ khai, chậm thông quan hoặc rủi ro sau thông quan.

### 3.9. Incoterms là gì?

**Incoterms** là bộ điều kiện thương mại quốc tế do ICC phát hành, dùng để xác định trách nhiệm, chi phí và rủi ro giữa người bán và người mua.

Ví dụ:

- **EXW**: người mua chịu nhiều trách nhiệm từ kho người bán.
- **FOB**: người bán giao hàng lên tàu tại cảng đi.
- **CFR/CIF**: người bán trả cước đến cảng đích; CIF có thêm bảo hiểm.
- **DAP/DDP**: người bán chịu trách nhiệm giao đến địa điểm đích; DDP gồm cả nghĩa vụ thuế nhập khẩu theo thỏa thuận.

Incoterms phải khớp giữa hợp đồng, invoice, booking, khai báo và cách tính chi phí.

### 3.10. Delivery Order là gì?

**Delivery Order (D/O)** là lệnh giao hàng. Trong hàng nhập đường biển, D/O là chứng từ/hồ sơ cần thiết để người nhận hoặc đại lý được lấy hàng từ cảng/kho sau khi hoàn tất các điều kiện liên quan.

Nếu thiếu D/O hoặc thông tin D/O chưa khớp, hàng có thể đã đến cảng nhưng vẫn chưa lấy được.

### 3.11. Arrival Notice là gì?

**Arrival Notice** là thông báo hàng đến. Hãng tàu, NVOCC hoặc forwarder gửi arrival notice để báo lô hàng sắp đến cảng/điểm đích, thường kèm thông tin ETA, vessel/voyage, container, phí local charge, thông tin nhận D/O.

### 3.12. Letter of Credit là gì?

**Letter of Credit (L/C)** là thư tín dụng. Đây là phương thức thanh toán trong đó ngân hàng cam kết thanh toán cho người bán nếu bộ chứng từ xuất trình phù hợp với điều kiện của L/C.

Rủi ro lớn của L/C là **discrepancy**, tức sai biệt chứng từ. Ví dụ:

- Tên hàng trên invoice khác L/C.
- Ngày shipment trễ hơn ngày cho phép.
- B/L ghi sai cảng.
- Thiếu chứng từ bảo hiểm.
- Số bản gốc không đúng yêu cầu.

Agentify có thể hỗ trợ checklist L/C và so khớp dữ liệu, nhưng quyết định chấp nhận hoặc sửa discrepancy vẫn phải do người phụ trách và ngân hàng xử lý.

### 3.13. Manifest là gì?

**Manifest** là bản khai thông tin hàng hóa vận chuyển, thường do hãng tàu/hãng bay hoặc đại lý gửi đến cơ quan liên quan. Sai manifest có thể làm chậm thủ tục nhập khẩu hoặc phát sinh yêu cầu sửa.

---

## 4. Workflow thực tế của chứng từ xuất khẩu

Luồng xuất khẩu có thể khác nhau theo ngành hàng, tuyến vận chuyển và điều kiện thương mại, nhưng thường đi qua các bước sau.

### 4.1. Nhận PO/hợp đồng và kiểm tra điều kiện giao hàng

Người phụ trách chứng từ hoặc logistics nhận thông tin từ sales/procurement/customer:

- PO hoặc hợp đồng.
- Tên hàng, mã hàng, quy cách.
- Số lượng, trọng lượng, đóng gói.
- Ngày cần giao.
- Điều kiện Incoterms.
- Yêu cầu chứng từ của người mua.
- Yêu cầu thanh toán, ví dụ T/T hay L/C.

Điểm đau:

- PO/hợp đồng nằm trong ERP nhưng docs team không có đủ quyền truy cập.
- Điều kiện giao hàng thay đổi qua email nhưng chưa cập nhật vào file theo dõi.
- Người mua yêu cầu chứng từ đặc biệt nhưng không được đưa vào checklist.

### 4.2. Chuẩn bị invoice và packing list

Docs team hoặc sales/logistics tạo commercial invoice và packing list.

Thông tin cần kiểm tra:

- Tên buyer/seller.
- Mô tả hàng.
- HS code nếu invoice có ghi.
- Số lượng.
- Đơn giá, trị giá.
- Currency.
- Gross weight, net weight, CBM.
- Số kiện.
- Điều kiện giao hàng.

Sai lệch thường gặp:

- Invoice và packing list khác số lượng.
- Mô tả hàng không khớp với booking hoặc B/L.
- Gross weight vượt hoặc khác thông tin VGM.
- Sai đơn vị: pcs, cartons, sets, kgs.

### 4.3. Booking và lấy booking confirmation

Forwarder hoặc chủ hàng đặt chỗ với hãng tàu/hãng bay/NVOCC/co-loader. Sau đó nhận booking confirmation.

Thông tin cần map vào bộ chứng từ:

- Booking number.
- Vessel/voyage hoặc flight.
- ETD, ETA.
- Port of loading, port of discharge.
- CY/CFS cut-off.
- SI cut-off.
- VGM cut-off.
- Container type/quantity.

Sai lệch thường gặp:

- Booking đi một cảng, invoice/contract lại ghi cảng khác.
- ETD thay đổi nhưng docs team chưa cập nhật deadline chứng từ.
- Số container hoặc seal cập nhật muộn.

### 4.4. Khai hải quan xuất khẩu

Doanh nghiệp hoặc đại lý hải quan khai tờ khai xuất khẩu dựa trên bộ chứng từ.

Nguồn dữ liệu thường lấy từ:

- Invoice.
- Packing list.
- Contract/PO.
- Booking.
- Thông tin hàng hóa/HS code.
- Giấy phép/chứng nhận nếu cần.

Điểm đau:

- Dữ liệu phải copy từ PDF/Excel/email sang phần mềm khai báo.
- Sai một trường nhỏ có thể phải sửa tờ khai.
- Docs team và khai báo hải quan dùng hai file khác nhau.

### 4.5. Gửi SI và VGM

**Shipping Instruction (SI)** là hướng dẫn lập vận đơn gửi cho hãng tàu/forwarder. **VGM** là khối lượng toàn bộ container đã được xác minh.

Thông tin SI thường dùng để tạo B/L draft:

- Shipper/consignee/notify party.
- Mô tả hàng.
- Số kiện.
- Trọng lượng.
- Cảng đi/cảng đến.
- Freight term.
- Số container/seal.

Điểm đau:

- SI cut-off bị quên.
- SI gửi đúng hạn nhưng thông tin chưa khớp invoice/packing list.
- VGM sai hoặc gửi muộn.

### 4.6. Kiểm tra B/L draft

Sau khi hãng tàu/forwarder tạo B/L draft, docs team phải kiểm tra trước khi phát hành.

Các trường cần so khớp:

- Shipper/consignee/notify.
- Port of loading/discharge.
- Place of receipt/delivery nếu có.
- Description of goods.
- Packages.
- Gross weight.
- Container/seal.
- Freight term.
- Số bản gốc/telex release/seaway bill nếu có.

Sai lệch thường gặp:

- Tên consignee khác L/C hoặc hợp đồng.
- Notify party thiếu mã số thuế/địa chỉ.
- Gross weight khác packing list.
- Mô tả hàng bị viết tắt sai.
- Freight prepaid/collect sai.

### 4.7. Xin C/O và chứng từ chuyên ngành

Nếu khách cần C/O hoặc hàng cần chứng nhận, docs team phải chuẩn bị hồ sơ.

Rủi ro:

- C/O không kịp trước deadline gửi chứng từ.
- Invoice, B/L và C/O không khớp mô tả hàng hoặc trị giá.
- Hàng không đủ điều kiện xuất xứ nhưng sales đã hứa với khách.
- Thiếu chứng từ nguyên phụ liệu/chứng minh xuất xứ.

### 4.8. Gửi bộ chứng từ cho khách hoặc ngân hàng

Sau khi hoàn tất, bộ chứng từ có thể được gửi cho:

- Buyer.
- Consignee.
- Ngân hàng nếu thanh toán L/C.
- Forwarder/agent nước ngoài.
- Bộ phận kế toán.

Điểm đau:

- Không biết chứng từ nào là bản mới nhất.
- Gửi nhầm bản draft thay vì bản final.
- Thiếu một chứng từ trong bộ chứng từ.
- Chứng từ gửi qua nhiều email/Zalo, khó audit.

---

## 5. Workflow thực tế của chứng từ nhập khẩu

### 5.1. Nhận pre-alert từ shipper/forwarder nước ngoài

Với hàng nhập, người nhận hoặc forwarder Việt Nam thường nhận pre-alert gồm:

- Invoice.
- Packing list.
- B/L hoặc AWB.
- Arrival notice nếu gần đến.
- C/O nếu có.
- Giấy chứng nhận chuyên ngành nếu cần.
- HBL/MBL nếu qua forwarder.

Điểm đau:

- Pre-alert đến muộn.
- Thiếu C/O hoặc C/O sai form.
- HBL và MBL khác thông tin.
- Invoice/packing list không đủ dữ liệu để khai.

### 5.2. Kiểm tra quyền nhận hàng và chứng từ vận tải

Trước khi lấy hàng, cần kiểm tra:

- Consignee trên B/L/AWB có đúng không.
- B/L gốc, telex release, seaway bill hoặc surrendered B/L.
- D/O có thể lấy chưa.
- Local charge đã thanh toán chưa.

Điểm đau:

- Hàng đã đến nhưng B/L chưa release.
- Consignee sai nên phải sửa chứng từ.
- Hãng tàu/forwarder chưa phát D/O.

### 5.3. Chuẩn bị khai hải quan nhập khẩu

Khai nhập khẩu thường dựa trên:

- Invoice.
- Packing list.
- B/L/AWB.
- C/O nếu có.
- Contract/PO.
- Giấy phép/chứng nhận.
- Thông tin mã HS, trị giá, thuế.

Sai lệch hay gặp:

- Invoice ghi điều kiện CIF nhưng khai trị giá lại xử lý như FOB.
- Số lượng trên packing list khác invoice.
- Mã hàng nội bộ không map được sang mô tả hàng khai báo.
- C/O ghi mô tả hàng không đủ khớp với invoice.

### 5.4. Nộp/chờ kết quả kiểm tra chuyên ngành nếu có

Một số hàng cần kiểm tra hoặc giấy phép chuyên ngành, ví dụ:

- Kiểm dịch thực vật/động vật.
- An toàn thực phẩm.
- Chất lượng sản phẩm.
- Hóa chất, MSDS.
- Thiết bị y tế.
- Hàng nguy hiểm.

Điểm đau:

- Bộ phận mua hàng không báo trước hàng thuộc diện kiểm tra.
- Giấy phép/chứng nhận đến muộn.
- Hàng bị kẹt dù đã có tờ khai vì thiếu bước chuyên ngành.

### 5.5. Hoàn tất thông quan, lấy D/O và giao hàng

Sau khi đủ điều kiện, lô hàng mới có thể đi tiếp qua cảng/kho/trucking.

Điểm quan trọng:

- Chứng từ không chỉ ảnh hưởng hải quan, mà ảnh hưởng cả việc lấy hàng.
- Docs team, ops team và trucking coordinator cần cùng biết "còn thiếu gì để lấy hàng".

---

## 6. Thực trạng quản lý chứng từ tại Việt Nam

### 6.1. Hệ thống chính thức có tồn tại nhưng không gom thành một bộ chứng từ vận hành

Việt Nam đã có các hệ thống như:

- VNACCS/VCIS cho khai báo hải quan điện tử.
- Phần mềm khai hải quan như ECUS kết nối hệ thống hải quan.
- Cổng thông tin một cửa quốc gia để xử lý một số thủ tục liên quan.
- Hệ thống eCO để khai/xin C/O điện tử.
- Portal hãng tàu/hãng bay/forwarder cho booking, B/L, arrival notice.

Nhưng các hệ thống này phục vụ từng mục đích riêng. Chúng không tự động trả lời các câu hỏi vận hành kiểu:

- Bộ chứng từ của shipment này còn thiếu gì?
- Invoice, packing list, B/L draft và tờ khai có khớp nhau không?
- C/O có rủi ro không hợp lệ hoặc không kịp deadline không?
- Chứng từ nào là bản final mới nhất?
- Nếu khách hỏi "có thể thông quan chưa", cần trả lời thế nào?

### 6.2. Excel, email, PDF và Zalo vẫn là lớp vận hành thực tế

Trong nhiều doanh nghiệp, luồng chứng từ thực tế vẫn giống như sau:

```text
Khách gửi invoice/packing list qua email
  -> Nhân viên tải PDF về
  -> Copy một số dữ liệu vào Excel tracking
  -> Gửi file cho đại lý hải quan qua email/Zalo
  -> Đại lý hỏi lại thiếu thông tin
  -> Docs team sửa invoice/packing list
  -> Forwarder gửi B/L draft
  -> Nhân viên so bằng mắt thường
  -> Gửi khách duyệt qua email
  -> Lưu bản final trong folder riêng
```

Rủi ro của cách làm này:

- Dễ dùng nhầm version cũ.
- Không có checklist chung.
- Sai lệch dữ liệu khó phát hiện sớm.
- Người mới khó handover.
- Quản lý không có dashboard "lô nào thiếu chứng từ".
- Khi phát sinh tranh chấp, khó truy vết ai đã gửi gì, lúc nào.

### 6.3. Docs team là nhóm người dùng chịu áp lực cao nhưng thường ít được ưu tiên phần mềm

Trong nhiều công ty, chứng từ được xem là "back office", nhưng thực tế lại ảnh hưởng trực tiếp đến giao hàng và dòng tiền.

Docs team thường phải:

- Nhận dữ liệu từ sales, mua hàng, kho, forwarder, khách, nhà cung cấp.
- Kiểm tra nhiều trường dữ liệu lặp lại.
- Gửi nhắc người khác bổ sung chứng từ.
- Theo dõi deadline SI, VGM, C/O, L/C, arrival, free time.
- Sửa chứng từ khi có sai lệch.
- Trả lời CS/Ops/kế toán khi có câu hỏi.

Đây là nhóm có nhu cầu cao với công cụ "giảm lỗi lặp lại", nhưng sản phẩm phải cực kỳ dễ dùng vì họ không muốn học một ERP/TMS phức tạp mới.

---

## 7. Pain ranking sơ bộ của Cụm 4

| Pain | Ai đau nhất | Tần suất | Tác động | Cơ hội cho Agentify |
|---|---|---:|---:|---|
| Sai lệch dữ liệu giữa invoice, packing list, B/L, tờ khai, C/O | Docs, đại lý hải quan, forwarder, chủ hàng | Cao | Cao | Rất cao |
| Không biết bộ chứng từ còn thiếu gì | CS/Ops, docs, quản lý | Cao | Cao | Rất cao |
| Dùng nhầm bản chứng từ cũ | Docs, sales, forwarder | Trung bình-cao | Cao | Cao |
| Trễ SI/VGM/B/L draft/C/O/L/C deadline | Docs, forwarder | Trung bình-cao | Cao | Cao |
| Copy dữ liệu thủ công từ PDF/email sang Excel/phần mềm | Docs, khai báo hải quan | Cao | Trung bình-cao | Cao |
| Không map được chứng từ với PO/shipment/container | Chủ hàng, CS, docs | Cao | Trung bình-cao | Cao |
| Khó trả lời khách "hồ sơ đã đủ chưa" | CS/Ops, forwarder | Cao | Trung bình | Cao |
| Rủi ro HS code/chính sách chuyên ngành | Đại lý hải quan, chủ hàng | Trung bình | Rất cao | Trung bình, cần giới hạn rõ |
| L/C discrepancy | Export docs, kế toán, sales | Thấp-trung bình | Rất cao | Trung bình-cao nếu đúng phân khúc |
| Lưu trữ sau thông quan rời rạc | Kế toán, compliance, quản lý | Trung bình | Trung bình-cao | Trung bình |

Nhận định sơ bộ:

- Use case dễ bán nhất không phải "AI khai hải quan", vì rủi ro pháp lý cao.
- Use case dễ pilot hơn là "AI kiểm tra bộ chứng từ trước khi gửi/khaibáo".
- Pain có ROI rõ nhất là giảm lỗi chứng từ và giảm thời gian kiểm tra thủ công.

---

## 8. Phân khúc nên khảo sát

### 8.1. Forwarder vừa và nhỏ có team chứng từ riêng

Đặc điểm:

- Xử lý nhiều khách, nhiều tuyến, nhiều bộ chứng từ.
- Dùng email, Excel, phần mềm forwarder hoặc phần mềm kế toán riêng.
- CS/Ops thường phải hỏi docs team để trả lời khách.

Câu hỏi cần kiểm chứng:

- Mỗi nhân viên docs xử lý bao nhiêu shipment/tháng?
- Lỗi chứng từ phổ biến nhất là gì?
- Bao nhiêu lần/tháng phải sửa B/L, invoice, packing list hoặc tờ khai?
- Có checklist chuẩn không?
- Có sẵn sàng dùng AI để rà bộ chứng từ trước khi gửi khách không?

### 8.2. Đại lý hải quan

Đặc điểm:

- Nhận chứng từ từ nhiều chủ hàng/forwarder.
- Phải chuyển dữ liệu vào phần mềm khai báo.
- Đối mặt trực tiếp với sai lệch chứng từ và thiếu thông tin.

Câu hỏi cần kiểm chứng:

- Mất bao lâu để kiểm một bộ chứng từ trước khi khai?
- Thường phải hỏi lại khách những thông tin gì?
- Có chấp nhận công cụ đọc invoice/packing list/B/L và gợi ý trường khai không?
- Phần nào tuyệt đối phải để con người quyết định?

### 8.3. Chủ hàng xuất nhập khẩu

Đặc điểm:

- Chịu hậu quả nếu chứng từ sai: hàng trễ, thuế sai, thanh toán chậm, khách phạt.
- Có thể có ERP nhưng chứng từ logistics vẫn nằm ngoài ERP.

Câu hỏi cần kiểm chứng:

- Bộ phận nào chịu trách nhiệm kiểm chứng từ?
- Có map PO với invoice, packing list, tờ khai, B/L không?
- Có dashboard shipment nào đang thiếu chứng từ không?
- Đã từng bị mất ưu đãi thuế hoặc trễ thông quan do chứng từ chưa?

### 8.4. Công ty xuất khẩu dùng L/C hoặc chứng từ thanh toán chặt

Đặc điểm:

- Rủi ro discrepancy cao.
- Bộ chứng từ cần khớp chặt với điều khoản L/C.
- Giá trị mỗi lỗi có thể lớn.

Câu hỏi cần kiểm chứng:

- Tần suất L/C trong giao dịch là bao nhiêu?
- Ai kiểm discrepancy trước khi gửi ngân hàng?
- Có dùng checklist L/C không?
- Có sẵn sàng trả phí cao hơn cho công cụ kiểm chứng từ không?

---

## 9. Product map: công cụ hiện tại và khoảng trống

| Nhóm công cụ | Ví dụ | Giải quyết tốt | Khoảng trống |
|---|---|---|---|
| Khai hải quan điện tử | VNACCS/VCIS, ECUS | Khai báo, truyền tờ khai, nhận phản hồi hải quan | Không phải workspace quản trị toàn bộ bộ chứng từ |
| Cổng thủ tục nhà nước | National Single Window, eCO | Nộp/xử lý một số thủ tục, C/O, giấy phép | Không gom dữ liệu vận hành từ email, B/L, PO, booking, Excel |
| Phần mềm forwarder | CargoWise, Magaya, Winta | Quản lý nghiệp vụ forwarder, shipment, chứng từ, billing | Có thể nặng, đắt hoặc không phù hợp thói quen SME; dữ liệu ngoài hệ thống vẫn rời rạc |
| ERP | SAP, Oracle, Odoo, Bravo, MISA AMIS | PO, sales, kế toán, tồn kho | Không theo dõi chi tiết chứng từ logistics đa bên |
| DMS/OCR | ABBYY, Microsoft Azure AI Document Intelligence, Google Document AI | Trích xuất dữ liệu từ tài liệu | Không hiểu sâu workflow XNK Việt Nam nếu không cấu hình nghiệp vụ |
| Email/Excel/Zalo | Công cụ phổ biến hàng ngày | Linh hoạt, dễ dùng, phù hợp thói quen | Không có kiểm tra sai lệch tự động, audit yếu, khó dashboard |
| Portal carrier | Maersk, MSC, CMA CGM, hãng bay | Booking, SI, VGM, B/L, tracking theo carrier | Mỗi carrier một portal; không map đủ PO/tờ khai/C/O |

Khoảng trống chính:

> Thiếu một lớp trung gian vừa đọc được chứng từ rời rạc, vừa hiểu checklist nghiệp vụ XNK, vừa so khớp dữ liệu giữa nhiều chứng từ, vừa tạo summary dễ hiểu cho CS/Ops/quản lý.

---

## 10. Đối thủ và sản phẩm liên quan

### 10.1. VNACCS/VCIS

**Vai trò:** Hệ thống khai báo hải quan điện tử và xử lý nghiệp vụ hải quan.

Điểm mạnh:

- Là hạ tầng chính thức trong thủ tục hải quan.
- Kết nối trực tiếp với quy trình khai báo và phản hồi của hải quan.
- Không thể bị thay thế bởi một sản phẩm SaaS thông thường.

Điểm yếu/khoảng trống:

- Không được thiết kế như công cụ quản lý bộ chứng từ đa nguồn cho CS/Ops.
- Không giải quyết việc so khớp invoice, packing list, B/L, PO, C/O trước khi khai.
- Không phải công cụ giao tiếp với khách hàng.

Ý nghĩa cho Agentify:

- Agentify phải đứng trước và xung quanh VNACCS/VCIS, không đứng thay.
- Giá trị là chuẩn bị dữ liệu sạch hơn trước khi con người khai báo.

### 10.2. ECUS và phần mềm khai hải quan

**Vai trò:** Phần mềm hỗ trợ doanh nghiệp khai báo hải quan điện tử, thường dùng để kết nối với hệ thống hải quan.

Điểm mạnh:

- Phù hợp nghiệp vụ khai báo tại Việt Nam.
- Người dùng hải quan/đại lý đã quen.
- Hỗ trợ luồng khai báo thực tế.

Điểm yếu/khoảng trống:

- Tập trung vào khai báo, không phải toàn bộ vận hành chứng từ shipment.
- Dữ liệu đầu vào vẫn phải được người dùng chuẩn bị và kiểm tra.
- Không phải công cụ AI kiểm tra discrepancy giữa nhiều file.

Ý nghĩa cho Agentify:

- Có thể tích hợp ở mức xuất dữ liệu, checklist hoặc chuẩn bị dữ liệu đầu vào.
- Không nên cạnh tranh trực diện bằng một phần mềm khai hải quan mới.

### 10.3. National Single Window

**Vai trò:** Cổng một cửa quốc gia phục vụ thủ tục hành chính điện tử liên quan đến xuất nhập khẩu, quá cảnh, phương tiện vận tải và một số thủ tục chuyên ngành.

Điểm mạnh:

- Là hạ tầng cấp quốc gia.
- Kết nối nhiều thủ tục/cơ quan.
- Có vai trò quan trọng trong số hóa thủ tục XNK.

Điểm yếu/khoảng trống:

- Không phải workspace nội bộ cho doanh nghiệp quản trị từng shipment.
- Không tự động gom email, PDF, B/L, PO, invoice, packing list.
- Không đóng vai trò trợ lý trả lời khách.

Ý nghĩa cho Agentify:

- Agentify có thể nhắc "shipment này còn thiếu giấy phép/chứng nhận cần xử lý qua cổng liên quan", nhưng hành động nộp chính thức cần con người kiểm soát.

### 10.4. eCO/C/O điện tử

**Vai trò:** Hệ thống khai và xử lý chứng nhận xuất xứ điện tử.

Điểm mạnh:

- Số hóa một phần quy trình C/O.
- Gắn với nhu cầu hưởng ưu đãi thuế và chứng minh xuất xứ.

Điểm yếu/khoảng trống:

- Không tự kiểm toàn bộ bộ chứng từ logistics.
- Không trả lời được tình trạng PO/shipment/container đang thiếu gì.
- Cần dữ liệu đầu vào đúng từ invoice, packing list, B/L, định mức/xuất xứ.

Ý nghĩa cho Agentify:

- Agentify có thể cảnh báo C/O chưa sẵn sàng, thông tin trên C/O không khớp invoice/B/L, hoặc shipment sắp đến nhưng C/O chưa có.

### 10.5. CargoWise, Magaya và phần mềm forwarder quốc tế

**Vai trò:** Hệ thống quản trị forwarder/logistics end-to-end.

Điểm mạnh:

- Nghiệp vụ logistics sâu.
- Có module shipment, document, accounting, customs ở nhiều thị trường.
- Phù hợp doanh nghiệp logistics lớn hoặc có quy trình chuẩn.

Điểm yếu/khoảng trống:

- Chi phí và độ phức tạp có thể cao với SME Việt Nam.
- Dữ liệu vẫn có thể nằm ngoài hệ thống nếu khách gửi email/Zalo/PDF.
- Cần triển khai, đào tạo và discipline nhập liệu.

Ý nghĩa cho Agentify:

- Agentify nên là lớp bổ trợ nhẹ, có thể dùng trên dữ liệu hiện có.
- Với khách dùng hệ thống lớn, Agentify có thể làm AI layer đọc, tóm tắt và kiểm tra ngoại lệ.

### 10.6. Winta và phần mềm forwarder nội địa

**Vai trò:** Phần mềm logistics/forwarder phù hợp thị trường Việt Nam hơn các hệ thống quốc tế nặng.

Điểm mạnh:

- Hiểu nghiệp vụ forwarder nội địa.
- Gần với nhu cầu vận hành của doanh nghiệp Việt Nam.
- Có thể có module chứng từ, shipment, kế toán.

Điểm yếu/khoảng trống:

- Nếu chỉ là hệ thống nhập liệu, vẫn cần người đưa dữ liệu vào.
- Chưa chắc giải quyết tốt bài toán đọc email/PDF/Zalo và kiểm discrepancy tự động.
- Chưa chắc tạo được AI summary dễ dùng cho CS/Ops.

Ý nghĩa cho Agentify:

- Đây là nhóm đối thủ gần hơn ở thị trường Việt Nam.
- Agentify cần khác biệt bằng AI-native workflow: đọc tài liệu, so khớp, nhắc hạn, tóm tắt và soạn nháp.

### 10.7. OCR/document AI ngang ngành

Ví dụ: ABBYY, Microsoft Azure AI Document Intelligence, Google Document AI.

Điểm mạnh:

- Trích xuất dữ liệu từ PDF/scan tốt.
- Có khả năng xử lý nhiều loại tài liệu.
- Có API, phù hợp tích hợp kỹ thuật.

Điểm yếu/khoảng trống:

- Không tự hiểu workflow logistics Việt Nam nếu không build lớp nghiệp vụ phía trên.
- Không tự biết invoice phải khớp với B/L, C/O, tờ khai và PO như thế nào.
- Không có checklist theo shipment, deadline, vai trò người dùng, trạng thái vận hành.

Ý nghĩa cho Agentify:

- Có thể dùng OCR/document AI làm hạ tầng kỹ thuật, nhưng sản phẩm khác biệt nằm ở workflow XNK và logic kiểm tra.

---

## 11. Cơ hội sản phẩm cho Agentify trong Cụm 4

### 11.1. Document checklist theo shipment

Agentify tạo một checklist chứng từ cho từng shipment dựa trên:

- Loại hàng xuất hay nhập.
- Đường biển hay đường hàng không.
- FCL hay LCL.
- Incoterms.
- Quốc gia đi/đến.
- Yêu cầu khách hàng.
- Có C/O hay không.
- Có L/C hay không.
- Có kiểm tra chuyên ngành hay không.

Ví dụ checklist cho hàng nhập đường biển:

```text
[x] Commercial Invoice
[x] Packing List
[x] B/L hoặc telex release
[ ] Arrival Notice
[ ] D/O
[x] C/O Form E
[ ] Giấy đăng ký kiểm tra chất lượng
[ ] Tờ khai hải quan
```

Giá trị:

- CS/Ops biết ngay còn thiếu gì.
- Quản lý nhìn được shipment có rủi ro.
- Docs team giảm hỏi qua lại.

### 11.2. Discrepancy detector: phát hiện sai lệch chứng từ

Agentify trích xuất các trường quan trọng từ nhiều chứng từ rồi so khớp:

| Trường | So giữa các chứng từ |
|---|---|
| Shipper | Invoice, B/L, C/O, tờ khai |
| Consignee | B/L, invoice, L/C, D/O |
| Description of goods | Invoice, packing list, B/L, C/O, tờ khai |
| Quantity | Invoice, packing list, tờ khai |
| Packages | Packing list, B/L, tờ khai |
| Gross weight | Packing list, B/L, VGM, tờ khai |
| Incoterms | Contract/PO, invoice, tờ khai |
| Port | Booking, B/L, tờ khai, L/C |
| Container/seal | Booking, B/L, packing list, ePort/cảng nếu có |
| Origin | C/O, invoice, tờ khai |

Mức độ cảnh báo nên chia thành:

- **Critical:** có thể chặn thông quan, chặn nhận hàng, ảnh hưởng L/C hoặc thuế.
- **Warning:** cần người kiểm tra vì có thể chỉ là khác cách viết.
- **Info:** khác format, viết tắt, thiếu dữ liệu không nghiêm trọng.

### 11.3. Version control cho chứng từ

Agentify không cần làm DMS phức tạp ngay từ đầu, nhưng cần biết:

- File nào là bản mới nhất.
- File nào là draft.
- File nào đã được khách duyệt.
- File nào đã dùng để khai.
- File nào đã gửi ngân hàng/khách.

Điều này rất quan trọng vì nhiều lỗi thực tế đến từ việc dùng nhầm file cũ.

### 11.4. Deadline tracker cho chứng từ

Agentify có thể gom deadline từ booking, carrier, L/C và workflow nội bộ:

- SI cut-off.
- VGM cut-off.
- CY/CFS cut-off.
- Deadline duyệt B/L draft.
- Deadline phát hành C/O.
- Deadline xuất trình chứng từ L/C.
- Ngày hàng đến và free time liên quan.

Khác với calendar thông thường, deadline này gắn với shipment và rủi ro cụ thể:

```text
Shipment HCM-HAM-2408
ETD: 18/08
SI cut-off: 16/08 12:00
B/L draft chưa được khách duyệt
Invoice và packing list đang lệch gross weight
=> Rủi ro miss SI cut-off nếu chưa sửa trước 15/08 chiều
```

### 11.5. AI status summary cho CS/Ops/quản lý

Thay vì bắt CS/Ops đọc 15 email và 6 file, Agentify tạo một bản tóm tắt:

```text
Lô hàng PO-8891 / Booking MAEU123456:
- Đã có invoice, packing list và booking confirmation.
- Chưa có C/O Form E.
- B/L draft đang chờ khách duyệt.
- Packing list ghi 12,480 kg, B/L draft ghi 12,840 kg. Cần kiểm tra trước khi phát hành.
- SI cut-off còn 18 giờ.
- Khuyến nghị: nhờ shipper xác nhận gross weight và gửi C/O draft trong hôm nay.
```

Giá trị:

- CS trả lời khách nhanh.
- Ops biết việc cần làm tiếp.
- Quản lý nhìn được rủi ro mà không đọc từng file.

### 11.6. Draft email/Zalo message

Agentify có thể soạn nháp tin nhắn yêu cầu bổ sung hoặc xác nhận chứng từ.

Ví dụ:

```text
Em kiểm tra bộ chứng từ lô PO-8891 thấy Packing List đang ghi gross weight 12,480 kg,
trong khi B/L draft ghi 12,840 kg. Nhờ anh/chị xác nhận số đúng trước 15:00 hôm nay
để kịp duyệt B/L trước SI cut-off.
```

Quan trọng: tin nhắn nên ở trạng thái draft, người dùng duyệt rồi mới gửi.

---

## 12. MVP đề xuất cho Cụm 4

### 12.1. Tên MVP

**Agentify Document Copilot for Import-Export**

Tên tiếng Việt dễ hiểu:

> Trợ lý kiểm tra bộ chứng từ xuất nhập khẩu

### 12.2. Khách hàng mục tiêu ban đầu

Nên ưu tiên một trong hai nhóm:

1. Forwarder/đại lý hải quan vừa và nhỏ xử lý nhiều bộ chứng từ cho nhiều khách.
2. Chủ hàng XNK có 30-300 shipment/tháng, nhiều PO, nhiều chứng từ, đang dùng Excel/email/Zalo.

Nhóm dễ pilot nhất có thể là forwarder/đại lý hải quan vì:

- Họ xử lý chứng từ hàng ngày.
- Một khách hàng forwarder tạo ra nhiều shipment.
- ROI nằm ở giảm thời gian check và giảm lỗi.
- Họ hiểu ngay giá trị của việc phát hiện sai lệch trước khi khai/gửi khách.

### 12.3. Phạm vi nghiệp vụ ban đầu

Nên bắt đầu với:

- Hàng nhập đường biển FCL/LCL.
- Hàng xuất đường biển FCL.
- Bộ chứng từ cơ bản:
  - Commercial Invoice.
  - Packing List.
  - Booking Confirmation.
  - B/L draft hoặc B/L final.
  - Arrival Notice.
  - C/O nếu có.
  - Tờ khai hải quan nếu người dùng upload/export.

Chưa nên bắt đầu với:

- Toàn bộ giấy phép chuyên ngành cho mọi ngành.
- Tự phân loại HS code.
- Tự nộp hồ sơ lên hệ thống nhà nước.
- Tự phát hành chứng từ pháp lý.
- Tự xử lý L/C phức tạp ở phiên bản đầu.

### 12.4. Tính năng MVP

| Tính năng | Mô tả | Lý do ưu tiên |
|---|---|---|
| Upload/import chứng từ | Người dùng upload PDF, ảnh, Excel hoặc kéo từ email | Nguồn dữ liệu thực tế đang rời rạc |
| Trích xuất trường chính | AI đọc shipper, consignee, hàng, số lượng, weight, port, container | Giảm copy thủ công |
| Checklist theo shipment | Hiển thị chứng từ đã có/chưa có | Dễ hiểu, dễ dùng |
| So khớp dữ liệu | So invoice, packing list, B/L, booking, C/O | Pain rõ và ROI cao |
| Cảnh báo mức độ rủi ro | Critical/warning/info | Tránh cảnh báo quá nhiều |
| Timeline chứng từ | Theo dõi deadline SI, VGM, B/L, C/O, arrival | Gắn chứng từ với vận hành |
| AI summary | Tóm tắt tình trạng bộ chứng từ | Hữu ích cho CS/Ops/quản lý |
| Draft message | Soạn nháp email/Zalo yêu cầu sửa/bổ sung | Giảm thời gian trả lời |
| Audit trail cơ bản | Ai upload file, bản nào mới nhất, đã xử lý chưa | Giảm dùng nhầm version |

### 12.5. Luồng dùng MVP

```text
1. Người dùng tạo shipment hoặc import từ Excel.
2. Upload invoice, packing list, booking confirmation, B/L draft.
3. Agentify đọc dữ liệu chính từ từng file.
4. Agentify tạo checklist chứng từ.
5. Agentify so khớp các trường quan trọng.
6. Agentify hiển thị lỗi/rủi ro theo mức độ.
7. Người dùng xác nhận lỗi nào cần xử lý.
8. Agentify soạn nháp email/tin nhắn yêu cầu sửa.
9. Khi có file mới, Agentify cập nhật version và kiểm lại.
10. CS/Ops dùng summary để trả lời khách.
```

### 12.6. Không nên làm trong MVP

Không nên để Agentify tự động:

- Quyết định HS code cuối cùng.
- Quyết định trị giá tính thuế.
- Ký hoặc phát hành chứng từ.
- Nộp tờ khai hải quan.
- Nộp C/O hoặc giấy phép chuyên ngành.
- Gửi email nhạy cảm cho khách/ngân hàng mà không cần người duyệt.
- Cam kết ngày thông quan/giao hàng nếu chưa đủ dữ liệu.

Lý do: đây là các hành động có rủi ro pháp lý, tài chính hoặc uy tín. Agentify nên bắt đầu bằng vai trò copilot, không phải autopilot.

---

## 13. Ví dụ hoạt động cụ thể của Agentify

### Ví dụ 1: Phát hiện lệch số lượng trước khi khai hải quan

Bối cảnh:

- Công ty nhập khẩu nhận bộ chứng từ từ nhà cung cấp Trung Quốc.
- Bộ chứng từ gồm invoice, packing list, B/L và C/O Form E.
- Nhân viên chuẩn bị gửi cho đại lý hải quan khai nhập.

Agentify đọc chứng từ và phát hiện:

```text
Invoice: 500 cartons
Packing List: 480 cartons
B/L: 500 packages
C/O: 500 cartons
```

Agentify cảnh báo:

```text
Critical: Packing List đang khác Invoice/B/L/C/O về số kiện.
Nếu dùng Packing List hiện tại để khai, có thể phải sửa chứng từ hoặc giải trình.
Khuyến nghị: xác nhận lại với shipper số kiện đúng trước khi gửi đại lý hải quan.
```

Agentify soạn nháp tin nhắn:

```text
Dear supplier,
We found a discrepancy in the document set for shipment PO-2458:
- Commercial Invoice: 500 cartons
- Packing List: 480 cartons
- B/L and C/O: 500 cartons/packages
Please confirm the correct package quantity and send the revised Packing List if needed.
```

Người ngoài ngành có thể hiểu đơn giản:

> Agentify giống như người kiểm tra chéo bộ hồ sơ trước khi nộp. Nó phát hiện "giấy A nói 500 kiện, giấy B nói 480 kiện" để người làm chứng từ sửa sớm, thay vì để hàng đến cảng mới phát hiện.

### Ví dụ 2: Cảnh báo B/L draft không khớp L/C

Bối cảnh:

- Công ty xuất khẩu bán hàng theo phương thức L/C.
- Ngân hàng yêu cầu B/L phải ghi đúng cảng đích và consignee theo L/C.
- Forwarder gửi B/L draft để duyệt.

Agentify đọc L/C, invoice và B/L draft:

```text
L/C yêu cầu port of discharge: Hamburg, Germany
B/L draft ghi port of discharge: Rotterdam, Netherlands

L/C yêu cầu consignee: To order of issuing bank
B/L draft ghi consignee: Buyer ABC GmbH
```

Agentify cảnh báo:

```text
Critical: B/L draft có 2 điểm không khớp điều kiện L/C.
Nếu phát hành theo bản này, bộ chứng từ có thể bị ngân hàng từ chối hoặc phát sinh discrepancy fee.
Khuyến nghị: chưa duyệt B/L draft; yêu cầu forwarder sửa theo điều kiện L/C.
```

Người ngoài ngành có thể hiểu đơn giản:

> Khi thanh toán bằng L/C, ngân hàng trả tiền dựa trên giấy tờ chứ không nhìn hàng thật. Nếu giấy tờ ghi sai so với L/C, doanh nghiệp có thể bị chậm nhận tiền. Agentify giúp bắt lỗi này trước khi vận đơn được phát hành chính thức.

### Ví dụ 3: CS hỏi "hồ sơ đã đủ để lấy hàng chưa?"

Bối cảnh:

- Khách hỏi forwarder: "Hàng đã đến cảng, lấy được chưa?"
- CS không trực tiếp làm chứng từ, phải hỏi docs team, ops team và kế toán.

Agentify tổng hợp:

```text
Shipment: HBL-VN8891
ETA: 12/09
Đã có: Invoice, Packing List, B/L surrendered, Arrival Notice, tờ khai phân luồng vàng.
Chưa có: D/O, xác nhận thanh toán local charge.
C/O Form E đã có nhưng tên hàng khác nhẹ với invoice, docs team đang kiểm tra.
Kết luận: chưa thể lấy hàng ngay; cần D/O và xác nhận local charge, đồng thời xử lý kiểm tra luồng vàng.
```

Agentify soạn nháp trả lời khách:

```text
Hi anh/chị, hàng đã đến cảng nhưng hiện chưa đủ điều kiện lấy ngay.
Bên em đang chờ D/O và xác nhận local charge từ hãng tàu. Tờ khai đang ở luồng vàng,
docs team cũng đang kiểm tra lại C/O vì mô tả hàng có khác nhẹ với invoice.
Em sẽ cập nhật lại khi D/O sẵn sàng và hồ sơ luồng vàng hoàn tất.
```

Người ngoài ngành có thể hiểu đơn giản:

> "Hàng đến cảng" không có nghĩa là "lấy được hàng". Agentify gom các điều kiện còn thiếu để CS trả lời đúng, thay vì trả lời mơ hồ.

---

## 14. Câu hỏi phỏng vấn cho Cụm 4

### 14.1. Câu hỏi cho docs team

1. Một ngày/tuần anh/chị xử lý bao nhiêu bộ chứng từ?
2. Bộ chứng từ cơ bản của công ty gồm những gì?
3. Chứng từ nào hay bị thiếu nhất?
4. Sai lệch nào hay gặp nhất giữa invoice, packing list, B/L, C/O và tờ khai?
5. Anh/chị đang kiểm sai lệch bằng cách nào?
6. Có checklist chuẩn theo loại hàng/khách/tuyến không?
7. Mất bao lâu để kiểm một bộ chứng từ mới?
8. Khi phát hiện sai, anh/chị liên hệ ai và qua kênh nào?
9. Có từng dùng nhầm bản chứng từ cũ không?
10. Chứng từ được lưu ở đâu: folder, email, ERP, phần mềm forwarder, Google Drive, Zalo?
11. Có dashboard nào cho biết shipment nào còn thiếu chứng từ không?
12. Deadline nào hay bị miss: SI, VGM, C/O, B/L draft, L/C?
13. Nếu có AI đọc và so khớp chứng từ, anh/chị muốn nó kiểm những trường nào trước?
14. Phần nào anh/chị không tin AI làm?
15. Nếu dùng thử, dữ liệu đầu vào thực tế sẽ là PDF, scan, Excel hay email?

### 14.2. Câu hỏi cho đại lý hải quan

1. Khách thường gửi chứng từ đủ ngay từ đầu hay thiếu?
2. Những thông tin nào thường phải hỏi lại trước khi khai?
3. Lỗi nào khiến tờ khai phải sửa nhiều nhất?
4. Có trường hợp sai C/O hoặc thiếu chứng từ chuyên ngành không?
5. Anh/chị có muốn công cụ đọc bộ chứng từ và gợi ý dữ liệu khai không?
6. Phần nào bắt buộc người khai phải tự quyết định?
7. Có thể export/import dữ liệu từ phần mềm khai báo không?
8. Anh/chị có chấp nhận upload chứng từ lên một hệ thống bên thứ ba không? Điều kiện bảo mật là gì?

### 14.3. Câu hỏi cho forwarder/CS/Ops

1. Khách hỏi tình trạng chứng từ bao nhiêu lần/ngày?
2. Khi khách hỏi "hàng lấy được chưa", anh/chị phải check những ai?
3. Docs team và CS/Ops dùng chung một file hay mỗi bên một file?
4. Có thường bị khách phàn nàn vì cập nhật chậm không?
5. Nếu có summary tự động cho từng shipment, anh/chị muốn thấy những thông tin gì?
6. Draft email/Zalo do AI soạn có hữu ích không?
7. Ai sẽ duyệt nội dung trước khi gửi khách?

### 14.4. Câu hỏi cho chủ hàng

1. Ai chịu trách nhiệm cuối cùng khi chứng từ sai?
2. Công ty có từng bị trễ thông quan, mất ưu đãi thuế, bị phạt khách hoặc bị ngân hàng từ chối chứng từ không?
3. PO, invoice, packing list, B/L và tờ khai có được map trong cùng một hệ thống không?
4. Có cần quản lý chứng từ theo từng PO hay chỉ theo shipment?
5. Nếu dashboard cho biết bộ chứng từ nào đang thiếu/sai, ai sẽ dùng?
6. Mức phí pilot nào hợp lý nếu công cụ giảm lỗi chứng từ và giảm thời gian kiểm tra?

### 14.5. Câu hỏi cho quản lý/giám đốc

1. Lỗi chứng từ đang gây chi phí gì: nhân sự, lưu bãi, phạt khách, sửa chứng từ, chậm thanh toán?
2. Có đo số lỗi chứng từ/tháng không?
3. Có đo thời gian xử lý một bộ chứng từ không?
4. Đội docs có khó đào tạo người mới không?
5. Nếu triển khai Agentify, tiêu chí thành công trong 1-2 tháng là gì?
6. Dữ liệu chứng từ có yêu cầu lưu tại Việt Nam hoặc chính sách bảo mật riêng không?

---

## 15. Survey định lượng đề xuất cho Cụm 4

Mục tiêu survey: đo tần suất lỗi chứng từ, mức độ phụ thuộc vào thao tác thủ công, khả năng trả phí và use case ưu tiên.

### 15.1. Thông tin phân loại người trả lời

1. Vai trò của anh/chị là gì?
   - Docs/Documentation.
   - CS/Account.
   - Ops.
   - Đại lý hải quan.
   - Logistics manager.
   - Chủ hàng XNK.
   - Kế toán/thanh toán quốc tế.

2. Công ty anh/chị thuộc nhóm nào?
   - Forwarder.
   - Đại lý hải quan.
   - Chủ hàng nhập khẩu.
   - Chủ hàng xuất khẩu.
   - 3PL.
   - Nhà máy sản xuất.
   - Công ty thương mại.

3. Mỗi tháng công ty xử lý khoảng bao nhiêu shipment XNK?
   - Dưới 20.
   - 20-50.
   - 51-100.
   - 101-300.
   - Trên 300.

### 15.2. Câu hỏi đo pain

1. Mỗi bộ chứng từ mất bao lâu để kiểm tra trước khi khai/gửi khách?
   - Dưới 10 phút.
   - 10-30 phút.
   - 30-60 phút.
   - Trên 60 phút.

2. Tần suất phát hiện sai lệch giữa invoice, packing list, B/L, C/O hoặc tờ khai?
   - Hầu như không.
   - 1-2 lần/tháng.
   - 3-5 lần/tháng.
   - Hàng tuần.
   - Gần như hàng ngày.

3. Lỗi nào xảy ra nhiều nhất?
   - Số lượng/số kiện.
   - Trọng lượng/CBM.
   - Tên hàng/mô tả hàng.
   - Shipper/consignee/notify.
   - Cảng đi/cảng đến.
   - Incoterms/freight term.
   - C/O/xuất xứ.
   - HS code/chính sách chuyên ngành.

4. Anh/chị đang dùng công cụ nào để quản lý chứng từ?
   - Excel/Google Sheet.
   - Email.
   - Zalo.
   - Folder/Google Drive/SharePoint.
   - ERP.
   - Phần mềm forwarder.
   - Phần mềm khai hải quan.
   - DMS/OCR.

5. Khi khách hỏi "bộ chứng từ đã đủ chưa", mất bao lâu để trả lời?
   - Dưới 5 phút.
   - 5-15 phút.
   - 15-30 phút.
   - Trên 30 phút.
   - Phải hỏi nhiều người, không đo được.

### 15.3. Câu hỏi đo nhu cầu sản phẩm

1. Tính năng nào hữu ích nhất?
   - Checklist chứng từ theo shipment.
   - AI đọc invoice/packing list/B/L/C/O.
   - So khớp dữ liệu giữa chứng từ.
   - Cảnh báo thiếu/sai chứng từ.
   - Nhắc deadline SI/VGM/C/O/B/L.
   - AI summary để trả lời khách.
   - Draft email/Zalo yêu cầu sửa chứng từ.
   - Version control cho chứng từ.

2. Anh/chị có sẵn sàng dùng AI nếu AI chỉ cảnh báo và soạn nháp, không tự nộp/ký/gửi không?
   - Có.
   - Có nhưng cần người duyệt.
   - Chưa chắc.
   - Không.

3. Dữ liệu nào công ty có thể cho hệ thống đọc trong pilot?
   - File mẫu đã ẩn thông tin nhạy cảm.
   - Bộ chứng từ thật nhưng giới hạn người truy cập.
   - Chỉ Excel tracking.
   - Chưa thể chia sẻ dữ liệu.

4. Mức phí pilot hợp lý trong 1-2 tháng?
   - Dưới 2 triệu VND/tháng.
   - 2-5 triệu VND/tháng.
   - 5-15 triệu VND/tháng.
   - Trên 15 triệu VND/tháng nếu ROI rõ.

---

## 16. Giả thuyết cần kiểm chứng sau Cụm 4

1. **Docs team và đại lý hải quan là nhóm đau rõ nhất.** Họ kiểm chứng từ lặp lại, nhiều lỗi nhỏ, dễ thấy giá trị từ AI so khớp.
2. **Discrepancy detector có ROI rõ hơn chatbot hỏi đáp chung.** Khách hàng sẽ trả tiền nếu công cụ bắt được lỗi trước khi phát sinh chi phí.
3. **File đầu vào thực tế không sạch.** MVP phải xử lý PDF, ảnh scan, email attachment và Excel, không thể chỉ yêu cầu API.
4. **Human approval là bắt buộc.** Người dùng có thể tin AI để cảnh báo, nhưng không tin AI tự khai/tự ký/tự gửi chứng từ nhạy cảm.
5. **Checklist phải tùy biến theo khách/ngành.** Một checklist cứng sẽ không đủ vì mỗi ngành hàng có yêu cầu khác nhau.
6. **Forwarder/đại lý hải quan có thể là ICP tốt hơn chủ hàng ở giai đoạn đầu.** Vì họ xử lý nhiều bộ chứng từ và pain xuất hiện hàng ngày.
7. **Agentify có thể khác biệt so với OCR ngang ngành bằng hiểu biết nghiệp vụ XNK.** Chỉ đọc chữ là chưa đủ; sản phẩm phải biết trường nào cần khớp với trường nào.

---

## 17. Tính khả thi cho Agentify

### 17.1. Khả thi về kỹ thuật

MVP khả thi nếu giới hạn phạm vi:

- Chỉ bắt đầu với 5-7 loại chứng từ phổ biến.
- Chỉ trích xuất các trường có giá trị cao.
- Chỉ cảnh báo discrepancy rõ ràng.
- Cho phép người dùng sửa/confirm dữ liệu AI đọc được.
- Không tự động nộp hồ sơ chính thức.

Kiến trúc dữ liệu gợi ý:

```text
Document file
  -> OCR / document parser
  -> Extracted fields
  -> Shipment document graph
  -> Rule-based + AI discrepancy checks
  -> Risk summary
  -> Human review
```

Nên kết hợp:

- Rule-based checks cho trường rõ ràng như số lượng, weight, port, container.
- AI reasoning cho khác biệt ngôn ngữ/mô tả hàng/cách viết tắt.
- Human confirmation để tăng độ tin cậy và tạo dữ liệu huấn luyện nội bộ.

### 17.2. Khả thi về go-to-market

Khách hàng pilot phù hợp:

- Forwarder 10-80 nhân sự, có team docs/CS rõ.
- Đại lý hải quan xử lý nhiều khách.
- Chủ hàng XNK có nhiều shipment, nhiều nhà cung cấp, nhiều lỗi chứng từ.

Cách bán nên bắt đầu bằng pain cụ thể:

> "Giảm thời gian kiểm bộ chứng từ và phát hiện sai lệch trước khi khai/gửi khách."

Không nên bán quá rộng là "nền tảng logistics AI toàn diện" ở giai đoạn đầu, vì người mua sẽ khó hình dung ROI.

### 17.3. Chỉ số pilot nên đo

| Chỉ số | Cách đo |
|---|---|
| Thời gian kiểm một bộ chứng từ | Trước/sau khi dùng Agentify |
| Số lỗi phát hiện trước khi khai/gửi khách | Ghi nhận theo shipment |
| Số lần dùng nhầm version | Trước/sau |
| Thời gian trả lời khách về tình trạng chứng từ | Trước/sau |
| Số deadline chứng từ bị miss hoặc suýt miss | Trước/sau |
| Mức độ tin tưởng AI extraction | Tỷ lệ field phải sửa |
| Tỷ lệ người dùng quay lại dùng hàng tuần | Product analytics |

### 17.4. Rủi ro triển khai

| Rủi ro | Mức độ | Cách giảm |
|---|---:|---|
| AI đọc sai dữ liệu chứng từ | Cao | Luôn có bước human review, hiển thị confidence, cho sửa field |
| Dữ liệu chứng từ nhạy cảm | Cao | Phân quyền, audit log, NDA, ẩn dữ liệu trong pilot nếu cần |
| Checklist khác nhau theo ngành | Trung bình-cao | Cho phép template theo khách/ngành |
| Người dùng không muốn đổi workflow | Trung bình | Bắt đầu bằng upload/email/Excel, không ép nhập liệu phức tạp |
| Cảnh báo quá nhiều gây mệt | Trung bình | Chia severity, ưu tiên lỗi có tác động cao |
| Không tích hợp được hệ thống hiện tại | Trung bình | MVP dùng file/email trước, API sau |

---

## 18. Kết luận sơ bộ Cụm 4

Cụm chứng từ XNK là một cơ hội mạnh cho Agentify vì có đủ bốn điều kiện:

1. **Pain rõ:** lỗi chứng từ, thiếu chứng từ, sai version, trễ deadline.
2. **Tác động lớn:** chậm thông quan, sửa B/L/tờ khai, mất ưu đãi thuế, chậm thanh toán, phát sinh phí.
3. **Dữ liệu phù hợp với AI:** nhiều PDF, email, file scan, Excel, thông tin lặp lại giữa chứng từ.
4. **Khoảng trống sản phẩm:** hệ thống chính thức và phần mềm nghiệp vụ xử lý từng phần, nhưng thiếu lớp copilot kiểm chứng từ đa nguồn theo shipment.

Đề xuất hướng đi:

> Agentify nên phát triển module "Document Copilot" như một nhánh MVP rất đáng thử, ưu tiên forwarder/đại lý hải quan/chủ hàng XNK có nhiều bộ chứng từ. Sản phẩm bắt đầu bằng checklist, trích xuất dữ liệu, so khớp chứng từ, cảnh báo rủi ro, nhắc deadline và soạn nháp phản hồi. Không nên bắt đầu bằng tự động khai báo, tự ký hoặc tự nộp hồ sơ.

Use case nên test đầu tiên:

```text
Upload invoice + packing list + booking confirmation + B/L draft
-> Agentify đọc trường chính
-> Agentify so khớp số lượng, weight, packages, shipper/consignee, port, Incoterms
-> Agentify cảnh báo discrepancy
-> Agentify soạn nháp email yêu cầu sửa
```

Nếu use case này được người dùng xác nhận là tiết kiệm thời gian và bắt lỗi thật, Agentify có thể mở rộng sang:

- C/O checklist.
- Arrival/D/O checklist.
- Tờ khai hải quan exported data matching.
- L/C discrepancy pre-check.
- Kết nối email inbox.
- Shipment document timeline cho CS/Ops.

---

## 19. Nguồn tham khảo

1. National Statistics Office of Vietnam, "Press release: Social-economic situation in the fourth quarter and 2025".
   https://www.nso.gov.vn/en/data-and-statistics/2026/01/press-release-social-economic-situation-in-the-fourth-quarter-and-2025/

2. Vietnam National Single Window.
   https://vnsw.gov.vn/

3. Vietnam Customs / VNACCS-VCIS information.
   https://www.customs.gov.vn/

4. ECUS electronic customs declaration software.
   https://ecus.vn/

5. eCoSys / electronic Certificate of Origin system.
   https://ecosys.gov.vn/

6. International Chamber of Commerce, Incoterms.
   https://iccwbo.org/business-solutions/incoterms-rules/

7. International Chamber of Commerce, Certificate of Origin guidance.
   https://iccwbo.org/business-solutions/certificates-of-origin/

8. International Chamber of Commerce, UCP 600 / Documentary Credits.
   https://iccwbo.org/business-solutions/trade-finance/ucp-600/

9. Maersk, Shipping Instructions FAQ.
   https://www.maersk.com/support/faqs/shipping-instructions

10. Maersk, Verified Gross Mass FAQ.
    https://www.maersk.com/support/faqs/verified-gross-mass

11. Maersk, Bill of Lading FAQ.
    https://www.maersk.com/support/faqs/bill-of-lading

12. CargoWise.
    https://www.cargowise.com/

13. Magaya.
    https://www.magaya.com/

14. Winta Logistics / Forwarder software in Vietnam.
    https://www.forwarder.vn/

15. Microsoft Azure AI Document Intelligence.
    https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence

16. ABBYY document AI / intelligent document processing.
    https://www.abbyy.com/

---

## 20. Tóm tắt compact sau Cụm 4

Đã hoàn thành research Cụm 4 về chứng từ xuất nhập khẩu.

Insight chính:

- Chứng từ XNK là lớp quyết định lô hàng có khai báo, thông quan, nhận hàng, thanh toán và giao đúng cam kết được không.
- Pain lớn nhất là sai lệch dữ liệu giữa invoice, packing list, B/L, booking, C/O, tờ khai và PO; thiếu chứng từ; dùng nhầm version; trễ deadline SI/VGM/B/L/C/O/L/C.
- Hệ thống chính thức như VNACCS/VCIS, ECUS, National Single Window và eCO xử lý từng nghiệp vụ, nhưng không tạo một workspace vận hành thống nhất để kiểm toàn bộ bộ chứng từ theo shipment.
- Excel, email, PDF, file scan, folder và Zalo vẫn là lớp vận hành thực tế của nhiều doanh nghiệp.
- Agentify không nên thay phần mềm khai hải quan, không tự quyết định HS code, không tự ký/nộp hồ sơ. Nên làm copilot: đọc chứng từ, so khớp dữ liệu, cảnh báo rủi ro, nhắc deadline, tạo summary và soạn nháp yêu cầu sửa/bổ sung.
- MVP đề xuất: "Agentify Document Copilot for Import-Export", ưu tiên forwarder/đại lý hải quan/chủ hàng XNK có 30-300 shipment/tháng.
- Use case đầu tiên nên test: upload invoice + packing list + booking confirmation + B/L draft, Agentify trích xuất trường chính và phát hiện discrepancy về quantity, packages, weight, shipper/consignee, port, Incoterms.
- ICP khả thi: forwarder vừa và nhỏ, đại lý hải quan, chủ hàng XNK có team docs và đang dùng Excel/email/Zalo.
- Chỉ số pilot: thời gian kiểm bộ chứng từ, số lỗi phát hiện trước khi khai/gửi khách, thời gian trả lời khách, số deadline bị miss/suýt miss, tỷ lệ field AI đọc sai.

Khuyến nghị nếu tiếp tục Cụm 5:

- Chuyển sang trucking nội địa.
- Tập trung vào container pickup/delivery, điều phối xe/tài xế, GPS, POD, lệnh lấy/trả container, lịch kho, free time, chi phí phát sinh và cập nhật trạng thái cho CS/khách.
