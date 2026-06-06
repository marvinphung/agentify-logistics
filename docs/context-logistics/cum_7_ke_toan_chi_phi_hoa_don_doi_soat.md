# Cụm 7: Kế toán, chi phí, hóa đơn và đối soát

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để nghiên cứu lớp **kế toán, chi phí, hóa đơn và đối soát** trong logistics công nghiệp, B2B và xuất nhập khẩu tại Việt Nam.

Nếu các cụm trước trả lời:

- Cụm 1: hàng đã qua hải quan/cảng/depot/ICD chưa?
- Cụm 4: chứng từ xuất nhập khẩu đã đủ và đúng chưa?
- Cụm 5: xe đã lấy/giao/trả container đúng hạn chưa?
- Cụm 6: kho đã nhận, kiểm, nhập tồn và có GRN/POD chưa?

thì Cụm 7 trả lời câu hỏi:

> Một shipment/container cuối cùng lời hay lỗ bao nhiêu, chi phí phát sinh từ đâu, hóa đơn/chứng từ phí đã đủ chưa, ai đã duyệt và có đối soát được với báo giá ban đầu không?

Đây là cụm quan trọng vì trong logistics, một lô hàng có thể vận hành xong nhưng tài chính vẫn chưa "xong". Các vấn đề thường gặp:

- Ops biết có phí phát sinh nhưng kế toán chưa biết.
- Kế toán nhận hóa đơn nhưng không biết gắn vào shipment nào.
- Báo giá ban đầu không khớp chi phí thực tế.
- Local charge, DEM/DET, phí cảng, phí trucking, phí kho phát sinh sau.
- Thiếu hóa đơn hoặc chứng từ hỗ trợ.
- Chưa thanh toán phí nên không lấy được D/O, không release hàng, không trả container đúng hạn.
- Cuối tháng mới phát hiện một shipment bị âm margin.

Các câu hỏi chính cần trả lời:

1. Chi phí theo shipment/container đang được ghi ở đâu?
2. Có đối soát theo shipment, container, PO, customer hoặc job không?
3. Ops và kế toán có dùng chung dữ liệu không?
4. Có lệch giữa báo giá ban đầu, debit note, vendor invoice và chi phí thực tế không?
5. Các loại phí phát sinh nào xảy ra nhiều nhất?
6. Phí phát sinh được báo cho khách, duyệt nội bộ và xuất hóa đơn lại như thế nào?
7. Hóa đơn điện tử, debit note, credit note, receipt, bank transfer proof, local charge invoice đang lưu ở đâu?
8. Ai duyệt chi phí, ai duyệt billing, ai chịu trách nhiệm nếu quên charge lại khách?
9. Phần nào AI chỉ nên nhắc/tóm tắt, không nên tự động làm?
10. Agentify có thể trở thành lớp cost exception và reconciliation copilot theo shipment không?

Kết luận cần kiểm chứng:

> Cụm kế toán/chi phí là cơ hội tốt nhưng rủi ro cao hơn các cụm visibility. Agentify không nên tự động hạch toán, tự duyệt chi phí hoặc tự xuất hóa đơn trong MVP. Cơ hội hợp lý là làm lớp "cost exception & reconciliation copilot": gom chi phí theo shipment, phát hiện lệch quote-vs-actual, nhắc thiếu hóa đơn/chứng từ, cảnh báo phí phát sinh như DEM/DET, và soạn summary để Ops/kế toán/manager duyệt.

---

## 2. Vì sao kế toán/chi phí quan trọng trong logistics B2B/XNK?

### 2.1. Logistics không chỉ là giao hàng đúng hạn, mà còn là kiểm soát margin

Một forwarder, 3PL hoặc công ty logistics có thể xử lý shipment đúng hạn nhưng vẫn lỗ nếu:

- Báo giá thiếu một loại phí.
- Vendor invoice cao hơn dự kiến.
- Phí phát sinh không charge lại được cho khách.
- DEM/DET phát sinh nhưng khách không chấp nhận trả.
- Trucking có phí chờ xe nhưng không có bằng chứng.
- Kho tính phí VAS nhưng account quên đưa vào invoice.
- Tỷ giá thay đổi nhưng quote không cập nhật.
- Sales báo giá một mức, Ops mua dịch vụ ở mức cao hơn.

Với chủ hàng, kiểm soát chi phí cũng quan trọng vì logistics cost ảnh hưởng trực tiếp đến landed cost, giá vốn và biên lợi nhuận.

### 2.2. Một shipment có nhiều lớp chi phí

Trong hàng nhập khẩu đường biển FCL, một shipment có thể có các nhóm phí:

```text
Cước quốc tế
  -> local charges hãng tàu/forwarder
  -> phí D/O, THC, CIC, CFS nếu có
  -> phí hải quan/đại lý khai báo
  -> thuế nhập khẩu, VAT nhập khẩu
  -> phí cảng/ePort
  -> trucking
  -> phí kho/handling
  -> demurrage/detention/storage nếu trễ
  -> phí sửa chứng từ nếu sai
  -> phí ngân hàng/L/C nếu có
  -> phí bảo hiểm nếu có
```

Trong hàng xuất khẩu, có thể có:

```text
Cước trucking lấy container rỗng
  -> phí depot
  -> phí đóng hàng/kho
  -> phí VGM
  -> phí SI/B/L
  -> local charges xuất
  -> cước biển/air freight
  -> phí chứng từ
  -> phí sửa B/L hoặc manifest
  -> phí lưu bãi/lưu container nếu trễ cut-off
```

Một shipment càng nhiều bên tham gia thì càng khó biết chi phí cuối cùng có khớp với báo giá ban đầu không.

### 2.3. Hóa đơn điện tử làm tăng yêu cầu về đúng dữ liệu và đúng thời điểm

Việt Nam đã triển khai hóa đơn điện tử trên diện rộng. Nghị định 70/2025/NĐ-CP sửa đổi quy định về hóa đơn, chứng từ và có hiệu lực từ ngày 01/06/2025. Với dịch vụ logistics bán theo kỳ hoặc cần thời gian đối soát dữ liệu giữa các bên, quy định về thời điểm lập hóa đơn gắn với việc hoàn thành đối soát dữ liệu nhưng có giới hạn thời gian.

Ý nghĩa cho logistics:

- Không thể xem hóa đơn là việc làm tùy tiện cuối tháng.
- Dữ liệu vận hành, đối soát và billing cần khớp hơn.
- Nếu thiếu shipment reference, PO, container, mã khách, loại phí, kỳ dịch vụ, việc xuất/nhận/điều chỉnh hóa đơn sẽ rối.
- AI có thể hỗ trợ đọc và nhắc, nhưng không nên tự quyết định nội dung hóa đơn pháp lý.

### 2.4. Chi phí phát sinh thường xuất hiện do exception vận hành

Các cụm trước đều có thể tạo ra cost exception:

| Cụm | Exception vận hành | Chi phí có thể phát sinh |
|---|---|---|
| Hải quan/cảng/depot | Tờ khai chưa thông quan, chưa đóng phí cảng, container chưa release | Lưu bãi, DEM/DET, phí chỉnh chứng từ |
| Booking/hãng tàu | Roll cargo, trễ SI/VGM, đổi lịch tàu | Phí sửa B/L, phí lưu container, phụ phí booking |
| Chứng từ | Sai invoice, packing list, B/L, C/O | Phí sửa chứng từ, trễ thông quan, phí lưu |
| Trucking | Xe chờ, giao trễ, trả rỗng trễ | Phí chờ xe, detention, phí phạt kho |
| Kho | Chưa nhập, thiếu/hư hỏng, VAS phát sinh | Phí handling, lưu kho, claim, phí VAS |

Cơ hội của Agentify là nối exception vận hành với cost impact.

---

## 3. Thuật ngữ cần giải thích

### 3.1. Cost là gì?

**Cost** là chi phí doanh nghiệp phải trả cho vendor/nhà cung cấp để thực hiện shipment.

Ví dụ:

- Trả cho hãng tàu.
- Trả cho cảng.
- Trả cho công ty trucking.
- Trả cho kho.
- Trả cho đại lý hải quan.

### 3.2. Revenue là gì?

**Revenue** là doanh thu doanh nghiệp thu từ khách hàng.

Trong forwarder/3PL, revenue có thể gồm:

- Cước vận chuyển bán cho khách.
- Phí dịch vụ khai báo hải quan.
- Phí trucking charge lại khách.
- Phí handling.
- Phí quản lý.
- Phí kho.
- Phí phát sinh charge lại.

### 3.3. Margin/Gross profit là gì?

**Margin** hoặc **gross profit** trong shipment là phần chênh giữa revenue và cost.

```text
Gross profit = Revenue - Cost
```

Ví dụ:

- Báo khách: 10,000,000 VND.
- Chi phí thực tế: 8,500,000 VND.
- Gross profit: 1,500,000 VND.

Nếu chi phí thực tế tăng lên 11,000,000 VND mà không charge lại được, shipment bị lỗ 1,000,000 VND.

### 3.4. Quote là gì?

**Quote** là báo giá gửi cho khách trước khi làm dịch vụ.

Quote có thể gồm:

- Cước biển/air freight.
- Local charges.
- Trucking.
- Customs clearance.
- Warehouse.
- Phụ phí.
- Điều kiện giá.
- Thời hạn hiệu lực.

Quote là cơ sở để đối soát revenue dự kiến với revenue thực tế.

### 3.5. Job/Shipment costing là gì?

**Job costing** hoặc **shipment costing** là việc ghi nhận doanh thu và chi phí theo từng job/shipment.

Mục tiêu:

- Biết shipment nào lời/lỗ.
- Biết loại phí nào phát sinh.
- Biết nhân viên/vendor/khách nào tạo margin tốt hoặc rủi ro.
- Hỗ trợ đối soát cuối tháng.

### 3.6. Debit note là gì?

**Debit note** trong logistics thường là chứng từ/ghi chú yêu cầu khách thanh toán một khoản phí.

Ví dụ:

Forwarder gửi debit note cho khách gồm:

- Ocean freight.
- THC.
- D/O.
- Trucking.
- Customs service fee.

Debit note không thay thế hóa đơn điện tử theo nghĩa pháp lý thuế, nhưng thường được dùng trong workflow logistics để báo khoản phải thu trước hoặc kèm hóa đơn.

### 3.7. Credit note là gì?

**Credit note** là chứng từ điều chỉnh giảm khoản phải thu hoặc ghi nhận khoản hoàn/giảm.

Ví dụ:

Khách bị tính nhầm 2 container trucking thay vì 1 container. Forwarder phát hành credit note để điều chỉnh.

### 3.8. Vendor invoice là gì?

**Vendor invoice** là hóa đơn/phiếu tính tiền từ nhà cung cấp.

Ví dụ:

- Hãng tàu gửi invoice local charges.
- Trucking vendor gửi invoice cuối tháng.
- Kho gửi invoice phí lưu kho và handling.

### 3.9. Customer invoice là gì?

**Customer invoice** là hóa đơn doanh nghiệp xuất cho khách hàng.

Trong Việt Nam, đây thường là hóa đơn điện tử theo quy định thuế.

### 3.10. Accounts payable và accounts receivable là gì?

**Accounts payable (AP)** là khoản phải trả cho vendor.

**Accounts receivable (AR)** là khoản phải thu từ khách hàng.

Trong logistics:

- AP: trả hãng tàu, trucking, kho, cảng, agent.
- AR: thu khách hàng/chủ hàng.

### 3.11. Reconciliation/đối soát là gì?

**Đối soát** là kiểm tra dữ liệu giữa các bên có khớp không.

Ví dụ:

- Quote vs customer invoice.
- Vendor invoice vs rate card.
- Trucking trip thực tế vs invoice vendor.
- WMS handling event vs phí kho.
- Bank payment vs invoice.
- Shipment cost estimate vs actual cost.

### 3.12. Cost exception là gì?

**Cost exception** là bất thường liên quan đến chi phí.

Ví dụ:

- Chi phí thực tế cao hơn báo giá.
- Có phí phát sinh chưa được duyệt.
- Có vendor invoice không gắn shipment.
- Có DEM/DET nhưng chưa có người chịu trách nhiệm.
- Có phí chờ xe nhưng thiếu POD/biên bản.
- Có hóa đơn đến hạn thanh toán nhưng chưa xử lý.

### 3.13. Demurrage và detention là gì?

**Demurrage (DEM)** thường là phí phát sinh khi container nằm tại cảng/terminal quá thời gian miễn phí.

**Detention (DET)** thường là phí phát sinh khi container được lấy ra khỏi cảng nhưng chưa trả rỗng đúng hạn.

Các hãng tàu có biểu phí và free time riêng. Vì vậy, cùng một lỗi trễ nhưng mức phí có thể khác theo hãng tàu, loại container, tuyến và ngày quá hạn.

### 3.14. Storage charge là gì?

**Storage charge** là phí lưu bãi/lưu kho tại cảng, terminal, depot hoặc kho.

Storage khác DEM/DET ở chỗ storage thường là phí không gian lưu trữ tại nơi giữ hàng/container.

### 3.15. Local charges là gì?

**Local charges** là nhóm phí địa phương tại cảng đi hoặc cảng đến.

Ví dụ:

- THC.
- D/O fee.
- B/L fee.
- CFS fee.
- CIC.
- Cleaning fee.
- Seal fee.
- VGM fee.
- Handling fee.
- Infrastructure fee nếu có.

### 3.16. Accrual là gì?

**Accrual** là ghi nhận doanh thu/chi phí dự kiến hoặc đã phát sinh theo kỳ, dù chưa thanh toán tiền.

Trong logistics, accrual giúp biết shipment dự kiến lời/lỗ trước khi vendor invoice về đầy đủ.

### 3.17. Landed cost là gì?

**Landed cost** là tổng chi phí để đưa hàng về đến địa điểm sử dụng/bán, gồm giá hàng và các chi phí nhập khẩu/logistics liên quan.

Chủ hàng quan tâm landed cost vì nó ảnh hưởng giá vốn.

### 3.18. Cost allocation là gì?

**Cost allocation** là phân bổ chi phí cho đúng shipment, container, PO, SKU hoặc khách hàng.

Ví dụ:

Một invoice trucking cuối tháng gồm 100 chuyến. Kế toán cần phân bổ từng chuyến vào đúng shipment/container.

---

## 4. Workflow quote-to-cash và procure-to-pay trong logistics

### 4.1. Luồng quote-to-cash

Quote-to-cash là luồng từ báo giá đến thu tiền khách hàng.

```text
1. Sales/CS nhận yêu cầu báo giá
2. Ops kiểm rate/vendor/cước
3. Sales/CS gửi quote cho khách
4. Khách xác nhận booking/shipment
5. Ops thực hiện shipment
6. Phát sinh thêm phí nếu có exception
7. Ops/CS xác nhận khoản charge lại khách
8. Kế toán phát hành debit note/customer invoice
9. Khách thanh toán
10. Kế toán đối soát công nợ
```

Điểm dễ đứt gãy:

- Quote không ghi rõ loại phí bao gồm/không bao gồm.
- Ops phát sinh phí nhưng không báo sales/kế toán.
- Kế toán không biết charge lại khách khoản nào.
- Khách không chấp nhận phí phát sinh vì thiếu bằng chứng.
- Invoice xuất sai mã khách, sai shipment, sai thuế, sai kỳ.

### 4.2. Luồng procure-to-pay

Procure-to-pay là luồng từ mua dịch vụ vendor đến thanh toán vendor.

```text
1. Ops chọn vendor
2. Vendor thực hiện dịch vụ
3. Vendor gửi invoice/debit note/bảng kê
4. Ops xác nhận dịch vụ đã làm đúng
5. Kế toán kiểm invoice và chứng từ
6. Manager duyệt thanh toán nếu cần
7. Kế toán thanh toán
8. Lưu chứng từ và đối soát
```

Điểm dễ đứt gãy:

- Vendor gửi invoice gộp nhiều shipment.
- Thiếu POD/EIR/GRN để xác nhận dịch vụ.
- Rate vendor thay đổi nhưng Ops chưa cập nhật.
- Invoice vendor có phí không nằm trong quote.
- Kế toán không biết hỏi ai để duyệt.

### 4.3. Luồng shipment profitability

Để biết shipment lời/lỗ, cần nối:

```text
Quote/revenue expected
  + customer invoice/revenue actual
  - vendor invoice/cost actual
  - cost accrual/cost pending
  = shipment gross profit
```

Nếu chỉ nhìn kế toán tổng, doanh nghiệp có thể biết tháng này lời/lỗ. Nhưng nếu không nhìn theo shipment, rất khó biết:

- Khách nào đang âm margin.
- Vendor nào thường phát sinh thêm.
- Nhân viên nào hay quên charge phí.
- Loại shipment nào rủi ro.
- Exception nào gây lỗ.

---

## 5. Bản đồ chi phí theo shipment

### 5.1. Nhóm phí hàng nhập khẩu

| Nhóm phí | Ví dụ | Ai thường phát sinh | Dữ liệu/chứng từ cần gom |
|---|---|---|---|
| Cước quốc tế | Ocean freight, air freight | Hãng tàu, airline, agent, forwarder | Booking, invoice, rate confirmation |
| Local charges | D/O, THC, CIC, CFS, B/L, handling | Hãng tàu/forwarder | Local charge invoice, debit note |
| Hải quan | Customs service fee, inspection support | Đại lý hải quan | Tờ khai, service note, invoice |
| Thuế/phí nhà nước | Import duty, VAT import | Chủ hàng/cơ quan nhà nước | Tờ khai, chứng từ nộp thuế |
| Cảng/depot | Lift on/off, storage, infrastructure | Cảng/depot | ePort receipt, payment proof |
| Trucking | Kéo container, phí chờ, phí cầu đường | Trucking vendor | Trip sheet, POD, EIR, invoice |
| Kho | Handling, storage, VAS | 3PL warehouse | GRN, WMS report, invoice |
| DEM/DET/storage | Quá free time | Hãng tàu/cảng/depot | Free time, tariff, invoice |
| Chứng từ | Sửa B/L, sửa manifest, telex release | Hãng tàu/forwarder | Amendment request, invoice |

### 5.2. Nhóm phí hàng xuất khẩu

| Nhóm phí | Ví dụ | Ai thường phát sinh | Dữ liệu/chứng từ cần gom |
|---|---|---|---|
| Trucking | Lấy rỗng, kéo hàng ra cảng | Trucking vendor | Lệnh xe, EIR, POD, invoice |
| Depot | Nâng/hạ, vệ sinh container nếu có | Depot | EIR, receipt |
| Kho/đóng hàng | Stuffing, handling, VAS | Kho/3PL | Packing report, invoice |
| Local charges xuất | THC, B/L fee, VGM, seal, SI | Hãng tàu/forwarder | Local charge invoice |
| Cước quốc tế | Ocean freight/air freight | Carrier/agent | Rate, invoice |
| Chứng từ | C/O, B/L amendment, L/C docs | Phòng chứng từ/vendor | Request, invoice |
| DEM/DET/storage | Trễ cut-off, trả rỗng trễ, container nằm lâu | Hãng tàu/cảng/depot | Tariff, invoice, timeline |

### 5.3. Nhóm phí 3PL/kho

| Nhóm phí | Ví dụ | Căn cứ đối soát |
|---|---|---|
| Storage | Pallet/day, CBM/day, sqm/month | WMS inventory aging, hợp đồng |
| Handling inbound | Nhập hàng, dỡ hàng, kiểm hàng | GRN, receiving report |
| Handling outbound | Pick/pack, xuất hàng | Delivery note, dispatch report |
| VAS | Dán nhãn, rework, kitting, chụp ảnh | Work order, ảnh, xác nhận khách |
| Phí phát sinh | Hàng hư hỏng, chờ xe, làm ngoài giờ | Biên bản, ảnh, approval |

### 5.4. Nhóm phí trucking

| Nhóm phí | Ví dụ | Căn cứ đối soát |
|---|---|---|
| Cước chuyến | Cảng -> kho, kho -> cảng | Trip order, POD |
| Phí chờ | Xe chờ tại cảng/kho | Timestamp, biên bản, GPS nếu có |
| Phí trả rỗng | Trả container rỗng | EIR trả rỗng |
| Phí phát sinh | Cầu đường, bốc xếp, đổi điểm giao | Approval, receipt |
| DET do trả rỗng trễ | Container trả sau free time | Timeline, tariff, invoice hãng tàu |

---

## 6. Thực trạng quản lý chi phí logistics tại Việt Nam

### 6.1. Doanh nghiệp thường có nhiều hệ thống tách rời

Một doanh nghiệp logistics vừa và nhỏ có thể dùng:

- Phần mềm nghiệp vụ logistics/forwarding.
- MISA/FAST/BRAVO/Odoo/SAP hoặc phần mềm kế toán riêng.
- Excel để theo dõi cost/revenue theo shipment.
- Email để nhận invoice/debit note.
- Zalo để xin duyệt phí phát sinh.
- Banking app để chuyển khoản.
- e-invoice platform để phát hành/nhận hóa đơn.

Vấn đề không phải là không có phần mềm. Vấn đề là shipment cost nằm rải rác.

### 6.2. Ops và kế toán nhìn cùng một lô hàng theo hai ngôn ngữ khác nhau

Ops nói:

- Container chưa release.
- D/O chưa lấy được.
- Xe chờ kho 5 tiếng.
- Trả rỗng trễ.
- B/L sửa 1 lần.
- Kho phát sinh VAS.

Kế toán nói:

- Hóa đơn vendor nào?
- Mã khách nào?
- Tài khoản chi phí nào?
- Thuế suất nào?
- Có chứng từ hợp lệ không?
- Ai duyệt?
- Có charge lại khách không?

Nếu không có lớp trung gian, hai bên dễ hiểu lệch nhau.

### 6.3. Chi phí phát sinh thường được biết muộn

Trong nhiều workflow, cost exception chỉ được phát hiện khi:

- Vendor gửi invoice cuối tháng.
- Kế toán đối soát bảng kê.
- Khách hỏi vì sao invoice cao hơn quote.
- Manager xem P/L sheet.
- Shipment đã đóng file.

Nếu phát hiện muộn, doanh nghiệp khó:

- Xin khách duyệt phí.
- Thu thập bằng chứng.
- Truy trách nhiệm.
- Charge lại khách.
- Giảm thiểu phí trước khi phát sinh thêm.

### 6.4. Hóa đơn và chứng từ phí có thể không gắn đúng shipment

Một hóa đơn có thể gộp nhiều shipment:

- Invoice trucking cuối tháng.
- Invoice warehouse theo kỳ.
- Invoice local charges nhiều B/L.
- Invoice agent nước ngoài.

Nếu không có reference rõ, kế toán phải hỏi Ops:

- Khoản này của lô nào?
- Container nào?
- Khách nào?
- Có đúng rate không?
- Có phát sinh được duyệt không?

Đây là một pain rất phù hợp với Agentify vì AI có thể hỗ trợ đọc invoice, tìm reference, gợi ý mapping và nhắc người duyệt.

### 6.5. E-invoice làm tăng nhu cầu kiểm tra tính hợp lệ và thời điểm

Các nền tảng như MISA meInvoice nhấn mạnh chức năng phát hành hóa đơn điện tử, kiểm tra tính hợp lệ, kết nối phần mềm kế toán, tự động tải hóa đơn đầu vào và hạch toán tự động. Điều này cho thấy thị trường kế toán Việt Nam đã số hóa khá mạnh ở tầng hóa đơn.

Nhưng với logistics, hóa đơn hợp lệ về thuế chưa chắc đã đủ cho vận hành nếu thiếu:

- Shipment reference.
- Container reference.
- PO reference.
- Loại phí.
- Free time/tariff.
- Biên bản phát sinh.
- Approval.
- Bằng chứng POD/GRN/EIR.

Agentify nên xử lý phần vận hành quanh hóa đơn, không cạnh tranh trực diện với e-invoice provider.

---

## 7. Pain ranking sơ bộ của Cụm 7

### 7.1. Pain 1: Chi phí phát sinh không được ghi nhận sớm

Tình huống:

- Xe chờ kho 6 tiếng.
- Trucking vendor báo sẽ tính phí chờ.
- Ops biết qua Zalo nhưng chưa ghi vào hệ thống.
- Cuối tháng vendor invoice về.
- Khách không chịu trả vì không được báo trước.

Tác động:

- Mất margin.
- Tranh cãi với khách/vendor.
- Manager không thấy rủi ro kịp thời.

Mức phù hợp Agentify: rất cao.

### 7.2. Pain 2: Không biết shipment nào đang âm margin

Tình huống:

- Quote ban đầu có margin tốt.
- Sau đó phát sinh DEM/DET, phí sửa chứng từ, phí chờ xe.
- Kế toán ghi nhận chi phí nhưng Ops/Sales không thấy ngay.
- Cuối tháng mới biết shipment lỗ.

Mức phù hợp Agentify: cao.

Agentify có thể tạo cảnh báo:

```text
Shipment IMP-2026-031 đang có actual cost cao hơn quote 18%. Nguyên nhân chính: detention 2 ngày và trucking waiting fee. Cần kiểm tra khả năng charge lại khách.
```

### 7.3. Pain 3: Vendor invoice không gắn được vào shipment/container

Tình huống:

- Trucking gửi invoice 80 chuyến.
- Mỗi dòng ghi số xe/ngày nhưng thiếu shipment code.
- Kế toán phải hỏi Ops từng dòng.

Mức phù hợp Agentify: rất cao.

AI có thể hỗ trợ match theo:

- Ngày giao.
- Số container.
- Biển số xe.
- Điểm đi/điểm đến.
- Customer.
- Trip order.

Nhưng kết quả cần con người xác nhận.

### 7.4. Pain 4: Thiếu hóa đơn/chứng từ hỗ trợ

Tình huống:

- Ops yêu cầu thanh toán phí cảng.
- Kế toán cần hóa đơn/receipt/payment proof.
- File nằm trong email khác hoặc Zalo.
- Hàng cần release gấp nhưng chứng từ phí chưa đủ.

Mức phù hợp Agentify: cao.

### 7.5. Pain 5: Phí DEM/DET/storage không được cảnh báo trước

Tình huống:

- Container còn 1 ngày free time.
- Tờ khai chưa thông quan hoặc xe chưa book.
- Không ai nhìn chung timeline + free time.
- Sau đó phát sinh DEM/DET.

Mức phù hợp Agentify: rất cao, đặc biệt nếu nối với Cụm 1 và Cụm 5.

### 7.6. Pain 6: Billing khách thiếu phí phát sinh

Tình huống:

- Kho có VAS.
- Trucking có phí chờ.
- B/L có amendment fee.
- Ops ghi note nhưng không đưa vào invoice khách.

Mức phù hợp Agentify: cao.

### 7.7. Pain 7: Duyệt phí phát sinh qua chat, khó audit

Tình huống:

- Ops xin duyệt phí qua Zalo.
- Manager reply "ok".
- Cuối tháng không tìm lại được approval.
- Kế toán không dám thanh toán hoặc khách không chấp nhận.

Mức phù hợp Agentify: cao.

### 7.8. Pain ranking theo điểm ưu tiên sơ bộ

| Pain | Tần suất | Mức độ nghiêm trọng | Khả năng trả tiền | Khả thi dữ liệu | Phù hợp Agentify | Tổng |
|---|---:|---:|---:|---:|---:|---:|
| Chi phí phát sinh không ghi nhận sớm | 5 | 5 | 4 | 4 | 5 | 24 |
| DEM/DET/storage không cảnh báo trước | 4 | 5 | 5 | 4 | 5 | 24 |
| Vendor invoice không gắn shipment | 4 | 4 | 4 | 4 | 5 | 21 |
| Billing khách thiếu phí phát sinh | 4 | 5 | 4 | 3 | 5 | 21 |
| Không biết shipment âm margin | 3 | 5 | 5 | 3 | 4 | 20 |
| Thiếu hóa đơn/chứng từ hỗ trợ | 4 | 4 | 4 | 4 | 4 | 20 |
| Duyệt phí qua chat khó audit | 4 | 4 | 3 | 4 | 4 | 19 |

Kết luận sơ bộ:

- Cụm 7 có pain đủ mạnh để khảo sát sâu.
- Use case nên ưu tiên là cost exception, DEM/DET warning, invoice-to-shipment matching và missing document checklist.
- Không nên bắt đầu bằng full accounting.

---

## 8. Phân khúc nên khảo sát

### 8.1. Forwarder vừa và nhỏ

Đây là phân khúc rất phù hợp vì forwarder phải quản lý cả doanh thu và chi phí theo shipment.

Pain thường gặp:

- Quote nhiều loại phí.
- Vendor invoice từ nhiều nguồn.
- Job costing thủ công.
- P/L sheet theo shipment.
- Debit note/credit note.
- Cost phát sinh do carrier/trucking/customs/warehouse.

Vai trò cần phỏng vấn:

- Kế toán công nợ.
- Kế toán tổng hợp.
- Ops phụ trách cost note.
- Sales/CS báo giá.
- Operations manager.
- Chủ doanh nghiệp.

### 8.2. 3PL có trucking/kho

3PL có nhiều cost center:

- Trucking.
- Kho.
- Handling.
- VAS.
- Vendor subcontractor.
- Phí phát sinh theo SLA.

Pain:

- Đối soát bảng kê theo tháng.
- Tranh cãi phí chờ xe/phí kho.
- Gắn chi phí vào đúng khách/shipment.
- Billing đúng theo hợp đồng.

### 8.3. Chủ hàng xuất nhập khẩu

Chủ hàng quan tâm:

- Landed cost.
- Phí phát sinh do forwarder/3PL báo.
- So sánh quote vs actual.
- Kiểm soát logistics budget.
- Audit invoice từ nhà cung cấp logistics.

Đây có thể là ICP nếu Agentify định vị là freight cost audit/visibility cho shipper.

### 8.4. Công ty trucking container

Trucking có pain về:

- Bảng kê chuyến.
- Phí chờ.
- EIR/POD.
- Thanh toán vendor/subcontractor.
- Đối soát với forwarder/chủ hàng.

Tuy nhiên, nếu chỉ làm trucking accounting thì Agentify dễ bị kéo sang TMS/billing ngách. Nên xem trucking là nguồn cost exception trong shipment timeline.

### 8.5. 3PL warehouse

Warehouse có pain:

- Phí lưu kho.
- Phí handling.
- Phí VAS.
- Phí phát sinh ngoài giờ.
- Báo cáo billing theo pallet/CBM/SKU/order.

Đây là bridge với Cụm 6.

---

## 9. Product map: công cụ hiện tại và khoảng trống

### 9.1. Product map theo tầng

| Tầng công cụ | Ví dụ | Giải quyết tốt | Khoảng trống còn lại |
|---|---|---|---|
| Phần mềm kế toán Việt Nam | MISA, FAST, BRAVO | Sổ sách, công nợ, hóa đơn, báo cáo tài chính, chuẩn thuế | Không tự biết exception vận hành theo shipment |
| E-invoice platform | MISA meInvoice, VNPT, S-Invoice và các nhà cung cấp khác | Phát hành/nhận/kiểm tra hóa đơn điện tử | Không tự gom POD/EIR/GRN/timeline/free time |
| ERP | SAP, Oracle, Odoo, BRAVO | Quản trị doanh nghiệp, kế toán, mua/bán, kho | Triển khai nặng, cần dữ liệu chuẩn, không xử lý chat/email thủ công tốt |
| Forwarding/logistics ERP | CargoWise, Winta, GoFreight, Logiverse, WakaForward/WakaAccounting, OrigoLink | Shipment, billing, job costing, accounting workflow | Có thể đắt/nặng; doanh nghiệp đã dùng hệ khác vẫn cần overlay |
| TMS/WMS | Logitrack, Smartlog, TigerWMS, hệ thống nội bộ | Trip/kho/event vận hành | Không đủ lớp đối soát tài chính cross-system |
| Excel/Google Sheet | P/L sheet, cost tracking, bảng kê | Linh hoạt, dễ dùng | Sai version, khó audit, thiếu cảnh báo |
| Email/Zalo | Invoice, approval, phát sinh | Nhanh, phổ biến | Không có cấu trúc, khó tìm, khó đối soát |

### 9.2. Khoảng trống chính

Khoảng trống không phải là thiếu phần mềm kế toán.

Khoảng trống là:

- Kế toán không nhìn thấy nguyên nhân vận hành của phí phát sinh.
- Ops không nhìn thấy tác động tài chính ngay khi exception xảy ra.
- Manager không có cost exception inbox theo shipment.
- Vendor invoice và customer billing không gắn tự động vào shipment timeline.
- Phí phát sinh không có bằng chứng đủ để charge lại khách.

### 9.3. Agentify nên đứng ở lớp nào?

Agentify nên đứng giữa Ops và kế toán:

```text
Shipment timeline / exception
  -> cost event
  -> evidence
  -> approval
  -> invoice matching
  -> accounting handoff
```

Không nên đứng thay:

- Phần mềm kế toán.
- Nền tảng hóa đơn điện tử.
- Quy trình duyệt pháp lý/tài chính.

---

## 10. Đối thủ và sản phẩm liên quan

### 10.1. MISA AMIS/MISA SME/MISA meInvoice

MISA là hệ sinh thái phần mềm kế toán, quản trị doanh nghiệp và hóa đơn điện tử phổ biến tại Việt Nam. MISA AMIS giới thiệu các phân hệ finance-accounting, purchasing, inventory, e-invoice và kết nối với ngân hàng, thuế, logistics, e-commerce. MISA meInvoice hỗ trợ phát hành hóa đơn điện tử, quản lý hóa đơn đầu vào/đầu ra, kiểm tra tính hợp lệ và kết nối phần mềm kế toán.

Điểm mạnh:

- Thương hiệu rất mạnh tại Việt Nam.
- Phù hợp kế toán, thuế, hóa đơn điện tử.
- Có hệ sinh thái rộng.
- Dễ tiếp cận SME.

Điểm yếu/khoảng trống cho Agentify:

- MISA xử lý tốt accounting/e-invoice, nhưng không phải shipment operation timeline.
- Không tự biết container trễ vì hải quan, xe, kho hay chứng từ.
- Agentify có thể tạo cost event/evidence package trước khi đẩy sang kế toán.

### 10.2. FAST

FAST là nhóm phần mềm kế toán/quản trị được sử dụng tại Việt Nam, thường xuất hiện trong danh sách hệ thống kế toán doanh nghiệp.

Điểm mạnh:

- Quen thuộc với kế toán Việt Nam.
- Phù hợp ghi nhận sổ sách, công nợ, báo cáo.
- Có thể dùng trong doanh nghiệp vừa.

Điểm yếu/khoảng trống cho Agentify:

- Không phải lớp shipment exception.
- Việc match vendor invoice với shipment vẫn có thể phụ thuộc Excel/Ops.
- Agentify nên tích hợp/export dữ liệu thay vì thay thế.

### 10.3. BRAVO ERP

BRAVO cung cấp ERP/kế toán cho doanh nghiệp Việt Nam, có lịch sử triển khai lâu năm và các phân hệ tài chính-kế toán, quản trị.

Điểm mạnh:

- Phù hợp doanh nghiệp có nhu cầu ERP tùy chỉnh.
- Mạnh hơn phần mềm kế toán đơn giản ở khả năng quản trị doanh nghiệp.
- Có kinh nghiệm triển khai trong doanh nghiệp lớn hơn SME nhỏ.

Điểm yếu/khoảng trống cho Agentify:

- ERP không tự gom dữ liệu rời rạc từ email/Zalo/POD/EIR/GRN.
- Triển khai ERP sâu không giải quyết nhanh pain CS/Ops cần biết cost exception theo shipment.

### 10.4. Odoo Accounting/Inventory tại Việt Nam

Odoo là ERP linh hoạt có accounting, inventory, sales, purchase, CRM và có đối tác triển khai tại Việt Nam. Một số đơn vị localization hỗ trợ chuẩn kế toán Việt Nam và e-invoice.

Điểm mạnh:

- Linh hoạt, có nhiều module.
- Phù hợp doanh nghiệp muốn một nền tảng ERP mở.
- Có thể tích hợp sales, purchase, inventory và accounting.

Điểm yếu/khoảng trống cho Agentify:

- Cần triển khai và cấu hình tốt.
- Không phải mọi forwarder/3PL muốn migrate sang Odoo.
- Agentify có thể phục vụ như lớp nhẹ hơn cho shipment cost exception.

### 10.5. SAP/Oracle ERP

SAP và Oracle là các nền tảng enterprise cho tài chính, kế toán, mua hàng, chuỗi cung ứng và ERP.

Điểm mạnh:

- Mạnh với enterprise.
- Kiểm soát nội bộ, phân quyền, audit tốt.
- Tích hợp sâu nếu doanh nghiệp dùng toàn bộ hệ sinh thái.

Điểm yếu/khoảng trống cho Agentify:

- Triển khai nặng và chi phí cao.
- Không phù hợp MVP cho SME/mid-market logistics.
- Dữ liệu thực tế từ Ops/chat/email/vendor vẫn có thể nằm ngoài ERP.

### 10.6. CargoWise Accounting

CargoWise có module accounting tích hợp sâu với logistics, hỗ trợ accrual-based accounting, transaction history, reporting, customer credit và tài chính vận hành cho freight forwarding/logistics.

Điểm mạnh:

- Rất mạnh cho forwarding/logistics enterprise.
- Shipment và accounting nằm gần nhau hơn so với phần mềm kế toán chung.
- Phù hợp doanh nghiệp logistics quốc tế/quy mô lớn.

Điểm yếu/khoảng trống cho Agentify:

- Chi phí và độ phức tạp có thể cao với doanh nghiệp vừa/nhỏ.
- Nếu doanh nghiệp đã dùng nhiều hệ thống, overlay AI vẫn có cơ hội.
- Agentify có thể tập trung vào thị trường chưa sẵn sàng dùng CargoWise hoặc cần lớp AI ngoài CargoWise.

### 10.7. Winta Logistics

Winta Logistics tại Việt Nam có phân hệ forwarder/logistics và accounting. Tài liệu Winta đề cập P/L sheet, shipment cover page, doanh thu, chi phí, debit note, credit note.

Điểm mạnh:

- Hiểu nghiệp vụ logistics Việt Nam.
- Có phân hệ vận hành và kế toán liên quan shipment.
- Phù hợp doanh nghiệp muốn phần mềm logistics local.

Điểm yếu/khoảng trống cho Agentify:

- Nếu khách đã có Winta, Agentify nên là lớp AI/report/exception thay vì thay phần mềm.
- Nếu khách chưa muốn thay hệ thống, Agentify có thể nhẹ hơn.

### 10.8. GoFreight, WakaAccounting, OrigoLink, Logiverse

Các sản phẩm freight forwarding hiện đại thường nhấn mạnh:

- Shipment management.
- Billing/accounting.
- Invoice từ shipment data.
- AI bill scan.
- Accounting sync với Xero/QuickBooks.
- Financial reconciliation.

Điểm mạnh:

- Tư duy sản phẩm hiện đại.
- Nối shipment với billing/accounting.
- Có nhiều automation cho forwarder.

Điểm yếu/khoảng trống cho Agentify tại Việt Nam:

- Có thể chưa localized sâu cho kế toán/hóa đơn điện tử Việt Nam.
- Không chắc phù hợp quy trình VNACCS/ePort/Zalo/Excel Việt Nam.
- Agentify có thể chọn hướng Vietnam-first và integration-first.

### 10.9. Freight audit/reconciliation tools

Các công cụ freight audit tập trung kiểm invoice vận tải, match rate, phát hiện overcharge và tạo evidence pack.

Điểm mạnh:

- Use case rõ: giảm overbilling.
- ROI dễ chứng minh nếu volume lớn.
- Phù hợp shipper có nhiều invoice vận tải.

Điểm yếu/khoảng trống cho Agentify:

- Thường tập trung freight invoice, không phải toàn bộ shipment operation exception.
- Ở Việt Nam, nhiều phí phát sinh cần bằng chứng từ Zalo/email/POD/EIR/GRN.
- Agentify có thể mở rộng hơn: từ operation exception đến cost exception.

### 10.10. Kết luận competitor map

Các sản phẩm hiện tại mạnh ở từng lớp:

- Phần mềm kế toán mạnh về sổ sách và thuế.
- E-invoice platform mạnh về hóa đơn.
- Forwarding ERP mạnh nếu doanh nghiệp dùng trọn bộ.
- Freight audit mạnh về kiểm invoice.
- Excel/chat mạnh vì linh hoạt.

Khoảng trống của Agentify:

> Làm lớp cost exception theo shipment, nối dữ liệu vận hành với dữ liệu tài chính trước khi kế toán hạch toán hoặc xuất hóa đơn.

---

## 11. Cơ hội sản phẩm cho Agentify trong Cụm 7

### 11.1. Định vị sản phẩm

Định vị đề xuất:

> Agentify Cost Exception & Reconciliation Copilot giúp Ops, kế toán và manager theo dõi chi phí phát sinh theo shipment, đối soát quote-vs-actual, gom hóa đơn/chứng từ, nhắc thiếu bằng chứng và soạn summary để con người duyệt.

Không nên định vị:

- Agentify là phần mềm kế toán.
- Agentify tự động hạch toán.
- Agentify tự xuất hóa đơn điện tử.
- Agentify tự duyệt thanh toán.
- Agentify tự quyết định charge lại khách.

Nên định vị:

- Lớp trước kế toán.
- Lớp nối Ops và Finance.
- Lớp phát hiện exception.
- Lớp gom bằng chứng.
- Lớp chuẩn bị dữ liệu cho billing/accounting.

### 11.2. Use case 1: Shipment cost timeline

Agentify thêm cost event vào shipment timeline:

```text
Shipment IMP-2026-041
  Quote approved: 18,500,000 VND
  Trucking vendor cost expected: 4,200,000 VND
  Port fee paid: 2,100,000 VND
  D/O fee invoice received: 1,450,000 VND
  Detention risk: free time ends tomorrow
  Waiting fee requested by vendor: 800,000 VND, pending approval
```

Giá trị:

- Ops thấy tác động tài chính.
- Kế toán biết khoản nào cần invoice/chứng từ.
- Manager thấy cost risk trước khi shipment đóng.

### 11.3. Use case 2: Quote-vs-actual alert

Agentify so sánh:

- Quote ban đầu.
- Cost estimate.
- Vendor invoice.
- Customer invoice.
- Phí phát sinh.

Ví dụ alert:

```text
Shipment EXP-2026-018 có actual cost cao hơn estimate 22%.
Nguyên nhân:
- Trucking waiting fee: 1,200,000 VND
- B/L amendment fee: 1,300,000 VND
- Storage charge: 850,000 VND
Chưa thấy customer billing cho 2/3 khoản phí này.
```

### 11.4. Use case 3: DEM/DET/free time cost warning

Agentify nối free time với shipment status:

```text
Container ABCD1234567 còn 1 ngày free time.
Trạng thái hiện tại:
- Tờ khai chưa thông quan
- Xe chưa book
- D/O đã có
Rủi ro: phát sinh demurrage/detention từ ngày 05/06/2026.
```

Giá trị:

- Giảm phí phát sinh.
- Cảnh báo trước thay vì đối soát sau.
- Nối Cụm 1, Cụm 5 và Cụm 7.

### 11.5. Use case 4: Invoice-to-shipment matching

Agentify đọc vendor invoice và gợi ý mapping:

```text
Invoice TRK-0526-188 từ Vendor A có 12 dòng.
Gợi ý match:
- Dòng 1: container ABCD1234567 -> Shipment IMP-041, confidence 92%
- Dòng 2: container EFGH7654321 -> Shipment IMP-044, confidence 88%
- Dòng 3: thiếu container, cần Ops xác nhận
```

Người dùng duyệt trước khi ghi nhận.

### 11.6. Use case 5: Missing billing checklist

Trước khi đóng shipment, Agentify kiểm:

- Đã có vendor invoice chưa?
- Đã có customer invoice chưa?
- Có phí phát sinh chưa bill khách không?
- Có POD/EIR/GRN/biên bản không?
- Có approval cho phí phát sinh không?
- Có shipment nào margin âm không?

### 11.7. Use case 6: Cost evidence pack

Khi cần charge lại khách một khoản phát sinh, Agentify gom:

- Timeline nguyên nhân.
- Invoice vendor.
- POD/EIR/GRN.
- Ảnh/biên bản.
- Chat approval nếu được upload.
- Tariff/rate card nếu có.

Sau đó tạo summary:

```text
Khoản phí chờ xe 800,000 VND phát sinh do xe chờ tại kho từ 09:10 đến 14:40 ngày 03/06/2026. Bằng chứng gồm POD, timestamp cập nhật từ điều phối và xác nhận của kho. Khoản phí đang pending charge lại khách.
```

---

## 12. MVP đề xuất cho Cụm 7

### 12.1. Tên MVP

Tên làm việc:

> Agentify Cost Exception Copilot

### 12.2. ICP MVP

ICP ưu tiên:

> Forwarder/3PL vừa và nhỏ xử lý 50-500 shipment/tháng, có nhiều vendor invoice, dùng Excel hoặc phần mềm logistics/kế toán rời rạc, và thường bị lệch quote-vs-actual hoặc quên charge phí phát sinh.

ICP phụ:

- Chủ hàng nhập khẩu có nhiều invoice logistics và muốn audit chi phí.
- 3PL warehouse/trucking cần đối soát bảng kê.

### 12.3. Phạm vi MVP

MVP nên bắt đầu với:

> Cost exception theo shipment cho hàng nhập khẩu container: local charges, trucking, DEM/DET, phí cảng, phí kho và phí phát sinh.

Lý do:

- Gắn chặt với Cụm 1, 5, 6.
- Pain dễ hiểu và có tiền thật.
- Dữ liệu có thể bắt đầu từ Excel, invoice PDF, timeline và upload thủ công.
- Không cần thay kế toán.

### 12.4. Tính năng MVP

1. **Shipment cost workspace**

Mỗi shipment có:

- Quote/revenue expected.
- Cost expected.
- Cost actual.
- Vendor invoices.
- Customer billing status.
- Cost exception.
- Evidence.

2. **Cost item table**

Các dòng phí:

- Loại phí.
- Vendor.
- Amount.
- Currency.
- Tax/VAT nếu cần ghi chú.
- Shipment/container.
- Status: expected, actual, approved, billed, paid.
- Evidence link.

3. **Invoice upload and AI extraction**

Upload invoice/debit note PDF/ảnh/Excel:

- OCR số invoice.
- Vendor.
- Ngày.
- Amount.
- Loại phí.
- Container/shipment reference nếu có.
- Gợi ý mapping.

4. **Quote-vs-actual rules**

Rule cảnh báo:

- Actual cost vượt estimate X%.
- Có cost actual nhưng chưa bill khách.
- Có invoice vendor nhưng chưa gắn shipment.
- Có shipment closing nhưng thiếu cost.

5. **DEM/DET/free time alert**

Rule cảnh báo:

- Sắp hết free time.
- Đã quá free time.
- Chưa có người chịu trách nhiệm.
- Có D&D invoice nhưng không có timeline giải thích.

6. **Approval note**

Không cần approval workflow phức tạp ở MVP, nhưng cần ghi:

- Ai đề xuất phí.
- Ai duyệt.
- Ngày giờ.
- Ghi chú.
- Bằng chứng.

7. **Cost summary**

AI tóm tắt cho manager:

```text
Tuần này có 12 cost exceptions. 5 shipment có actual cost vượt estimate trên 10%. Tổng phí phát sinh chưa bill khách: 8,400,000 VND. Nguyên nhân chính: detention và phí chờ xe.
```

8. **Accounting handoff export**

Xuất file cho kế toán:

- Shipment.
- Customer.
- Vendor.
- Cost item.
- Amount.
- Invoice number.
- Evidence URL.
- Billing status.

### 12.5. Không nên làm trong MVP

Không nên làm:

- Hạch toán kế toán đầy đủ.
- Tự xuất hóa đơn điện tử.
- Tự thay thế MISA/FAST/BRAVO/Odoo/SAP.
- Tự duyệt thanh toán.
- Tự quyết định thuế suất.
- Tự sửa invoice.
- Tự gửi invoice cho khách không qua người duyệt.
- Tích hợp ngân hàng sâu ngay từ đầu.

Lý do:

- Rủi ro pháp lý/tài chính cao.
- Dễ làm sai phạm vi.
- Cần kế toán/manager kiểm soát.
- MVP nên chứng minh ROI bằng giảm mất margin và giảm thời gian đối soát trước.

### 12.6. Nguồn dữ liệu MVP

| Nguồn | Cách lấy giai đoạn đầu | Mức khả thi |
|---|---|---|
| Excel cost sheet | Upload/import | Cao |
| Quote/debit note | Upload PDF/Excel | Cao |
| Vendor invoice | Upload PDF/email forward | Cao |
| Customer invoice status | Import từ kế toán hoặc nhập thủ công | Trung bình |
| Shipment timeline | Từ các cụm 1/5/6 hoặc nhập tay | Trung bình cao |
| POD/EIR/GRN | Upload/evidence hub | Cao |
| Free time/tariff | Nhập tay hoặc import rate card | Trung bình |
| Accounting software | Export/import, API sau | Trung bình |
| E-invoice platform | Không tích hợp sâu trong MVP | Trung bình thấp |

### 12.7. KPI MVP

| KPI | Cách đo | Mục tiêu pilot |
|---|---|---|
| Thời gian đối soát vendor invoice | Trước/sau pilot | Giảm 30-50% |
| Tỷ lệ invoice gắn đúng shipment | Audit mẫu | Đạt 90%+ |
| Số phí phát sinh được phát hiện trước khi invoice về | Đếm exception | Tăng rõ rệt |
| Tổng phí phát sinh chưa bill khách được phát hiện | Số tiền | Có giá trị tiền cụ thể |
| Tỷ lệ shipment có cost summary trước khi đóng file | Audit shipment | Đạt 80%+ |
| Số lần kế toán phải hỏi Ops | Nhật ký đối soát | Giảm 30%+ |

---

## 13. Ví dụ hoạt động cụ thể của Agentify

### 13.1. Ví dụ 1: Phí detention sắp phát sinh

Bối cảnh:

- Container nhập khẩu về cảng.
- Free time còn 1 ngày.
- Tờ khai chưa thông quan.
- Xe chưa được book.
- Khách chưa biết rủi ro phí.

Cách làm hiện tại:

1. Ops theo dõi bằng Excel.
2. Có thể quên free time vì đang xử lý nhiều shipment.
3. Sau khi quá hạn, hãng tàu/cảng báo phí.
4. Khách hỏi vì sao phát sinh.
5. Forwarder khó charge lại nếu không báo trước.

Cách Agentify hoạt động:

1. Agentify đọc free time và ETA container.
2. Agentify thấy container chưa thông quan và chưa có trucking plan.
3. Agentify tạo cảnh báo:

```text
Container ABCD1234567 còn 1 ngày free time. Nếu chưa thông quan và book xe trước 16:00 hôm nay, rủi ro phát sinh detention từ ngày mai.
```

4. Agentify soạn nháp cho CS:

```text
Anh/chị lưu ý container ABCD1234567 sắp hết free time vào ngày mai. Hiện tờ khai chưa hoàn tất thông quan và xe chưa thể lấy hàng. Bên em đề xuất ưu tiên hoàn tất chứng từ/thanh toán để tránh phát sinh phí lưu container.
```

Giá trị:

- Phòng tránh phí thay vì chỉ ghi nhận sau.
- Có bằng chứng đã cảnh báo khách.
- Ops/CS/manager nhìn cùng một rủi ro.

### 13.2. Ví dụ 2: Vendor trucking gửi invoice gộp cuối tháng

Bối cảnh:

- Vendor trucking gửi invoice 80 chuyến.
- Một số dòng chỉ có ngày, biển số xe, điểm giao, container.
- Kế toán không biết dòng nào thuộc shipment nào.

Cách làm hiện tại:

1. Kế toán gửi file cho Ops.
2. Ops dò Excel tracking.
3. Một số dòng thiếu container phải hỏi điều phối.
4. Mất 1-2 ngày để đối soát.

Cách Agentify hoạt động:

1. Kế toán upload invoice Excel/PDF vào Agentify.
2. Agentify đọc từng dòng.
3. Agentify match với shipment timeline theo container, ngày, điểm giao, vendor.
4. Agentify tạo kết quả:

```text
80 dòng invoice:
- 72 dòng match confidence > 90%
- 5 dòng match confidence 60-90%, cần Ops xác nhận
- 3 dòng không match vì thiếu container/reference
```

5. Ops chỉ xử lý 8 dòng ngoại lệ thay vì dò toàn bộ 80 dòng.

Giá trị:

- Giảm thời gian đối soát.
- Tăng độ chính xác mapping.
- Kế toán ít phải hỏi Ops hơn.

### 13.3. Ví dụ 3: Quên charge lại phí sửa B/L cho khách

Bối cảnh:

- Khách yêu cầu sửa B/L sau khi hãng tàu phát hành draft.
- Hãng tàu tính phí amendment 1,300,000 VND.
- Ops trả phí để kịp lịch tàu.
- CS quên đưa phí này vào customer invoice.

Cách Agentify hoạt động:

1. Agentify thấy trong timeline có event `B/L amendment requested`.
2. Agentify thấy vendor invoice `B/L amendment fee`.
3. Agentify kiểm customer billing và phát hiện chưa có dòng charge tương ứng.
4. Agentify cảnh báo:

```text
Shipment EXP-2026-055 có B/L amendment fee 1,300,000 VND từ vendor nhưng chưa thấy customer billing. Cần Sales/CS xác nhận có charge lại khách không.
```

5. Agentify soạn evidence summary:

```text
Phí sửa B/L phát sinh do thay đổi consignee theo yêu cầu khách ngày 02/06/2026. Hãng tàu đã xuất debit note 1,300,000 VND. Đề xuất charge lại khách theo điều khoản phí phát sinh ngoài quote.
```

Giá trị:

- Giảm mất doanh thu.
- Có bằng chứng rõ.
- Manager thấy khoản chưa bill.

---

## 14. Câu hỏi phỏng vấn cho Cụm 7

### 14.1. Câu hỏi cho kế toán logistics

1. Anh/chị đang dùng phần mềm kế toán nào?
2. Chi phí theo shipment/container có được ghi trong phần mềm kế toán không, hay nằm ở Excel/phần mềm logistics?
3. Vendor invoice thường gửi qua đâu?
4. Có invoice nào gộp nhiều shipment không?
5. Khi invoice thiếu shipment reference, anh/chị xử lý thế nào?
6. Mỗi tháng mất bao lâu để đối soát trucking/kho/local charges?
7. Loại phí nào hay bị thiếu chứng từ nhất?
8. Có thường phải hỏi Ops để xác nhận chi phí không?
9. Có trường hợp hóa đơn về nhưng không biết ai duyệt không?
10. Anh/chị cần thông tin gì trước khi hạch toán/thanh toán?
11. Hóa đơn điện tử đầu vào được kiểm tra tính hợp lệ bằng công cụ nào?
12. Nếu AI đọc invoice và gợi ý shipment mapping, anh/chị có dùng không?

### 14.2. Câu hỏi cho Ops phụ trách cost

1. Khi phát sinh phí ngoài quote, anh/chị ghi nhận ở đâu?
2. Ai duyệt phí phát sinh?
3. Có quy định phí nào cần báo khách trước không?
4. Có trường hợp phí phát sinh nhưng quên bill khách không?
5. Khi vendor gửi invoice sai, anh/chị phát hiện bằng cách nào?
6. Anh/chị có theo dõi shipment profit không?
7. DEM/DET/free time đang được theo dõi ở đâu?
8. Có alert trước khi phát sinh DEM/DET không?
9. Khi kế toán hỏi một dòng invoice, anh/chị mất bao lâu để trả lời?
10. Nếu có cost exception inbox, anh/chị muốn thấy những gì?

### 14.3. Câu hỏi cho Sales/CS

1. Quote gửi khách gồm những loại phí nào?
2. Điều khoản phí phát sinh được ghi rõ không?
3. Khi Ops báo phát sinh phí, ai báo khách?
4. Khách có hay tranh cãi phí phát sinh không?
5. Loại phí nào khách hay không chấp nhận?
6. Anh/chị có cần bằng chứng trước khi charge lại khách không?
7. Có từng bị mất margin vì quote thiếu phí không?
8. Nếu Agentify soạn summary giải thích phí phát sinh cho khách, anh/chị có dùng không?

### 14.4. Câu hỏi cho manager/chủ doanh nghiệp

1. Anh/chị có xem P/L theo shipment không?
2. Bao lâu sau khi shipment hoàn tất mới biết lời/lỗ?
3. Loại phí phát sinh nào ảnh hưởng margin nhiều nhất?
4. Có biết tổng phí phát sinh chưa bill khách mỗi tháng không?
5. Có quy trình duyệt cost exception không?
6. Có muốn dashboard cảnh báo shipment âm margin không?
7. Nếu Agentify giảm thất thoát phí phát sinh, ROI kỳ vọng là gì?
8. Ngưỡng tiền nào đủ lớn để ưu tiên xử lý exception?

---

## 15. Survey định lượng đề xuất cho Cụm 7

### 15.1. Thông tin doanh nghiệp

1. Doanh nghiệp thuộc nhóm nào?

- Forwarder.
- 3PL.
- Chủ hàng XNK.
- Trucking.
- Warehouse/ICD/CFS.
- Khác.

2. Số shipment/container xử lý mỗi tháng?

- Dưới 50.
- 50-200.
- 200-500.
- Trên 500.

3. Hệ thống kế toán đang dùng?

- MISA.
- FAST.
- BRAVO.
- Odoo.
- SAP/Oracle.
- Phần mềm nội bộ.
- Excel.
- Khác.

### 15.2. Mức độ pain

Chấm điểm 1-5:

1. Mức độ khó khi biết shipment lời/lỗ.
2. Mức độ khó khi đối soát vendor invoice.
3. Tần suất phí phát sinh ngoài quote.
4. Tần suất quên bill lại phí phát sinh cho khách.
5. Mức độ khó khi tìm hóa đơn/chứng từ phí.
6. Mức độ khó khi gắn invoice vào shipment.
7. Mức độ rủi ro DEM/DET/storage.
8. Mức độ mất thời gian giữa Ops và kế toán.

### 15.3. Tần suất và tác động

1. Mỗi tuần có bao nhiêu invoice/vendor statement cần đối soát?

- 0-5.
- 6-20.
- 21-50.
- Trên 50.

2. Một invoice gộp nhiều shipment mất bao lâu để đối soát?

- Dưới 15 phút.
- 15-60 phút.
- 1-4 giờ.
- Trên 4 giờ.

3. Mỗi tháng có bao nhiêu shipment phát sinh phí ngoài quote?

- 0.
- 1-5.
- 6-20.
- Trên 20.

4. Tổng phí phát sinh chưa bill khách trong tháng thường khoảng bao nhiêu?

- Không biết.
- Dưới 5 triệu VND.
- 5-30 triệu VND.
- 30-100 triệu VND.
- Trên 100 triệu VND.

### 15.4. Willingness to pilot

1. Nếu có hệ thống cảnh báo cost exception theo shipment, anh/chị có muốn dùng thử không?

- Rất muốn.
- Có thể muốn.
- Chưa chắc.
- Không muốn.

2. Tính năng nào có giá trị nhất?

- DEM/DET warning.
- Invoice-to-shipment matching.
- Quote-vs-actual alert.
- Missing billing checklist.
- Evidence pack cho phí phát sinh.
- Shipment P/L summary.

3. Dữ liệu nào có thể cung cấp cho pilot?

- Excel cost sheet.
- Vendor invoice.
- Quote.
- Debit note.
- Shipment tracking.
- POD/EIR/GRN.
- Free time/rate card.

---

## 16. Giả thuyết cần kiểm chứng sau Cụm 7

### 16.1. Giả thuyết thị trường

1. Doanh nghiệp logistics Việt Nam đã số hóa kế toán/hóa đơn ở mức nhất định, nhưng dữ liệu cost theo shipment vẫn phân mảnh.
2. Forwarder/3PL vừa và nhỏ vẫn phụ thuộc nhiều vào Excel để theo dõi P/L shipment.
3. Phí phát sinh như DEM/DET, storage, waiting fee, amendment fee là pain tài chính thực tế.
4. Hóa đơn điện tử làm tăng nhu cầu dữ liệu billing đúng và kịp thời.

### 16.2. Giả thuyết người dùng

1. Kế toán đau vì invoice thiếu reference và phải hỏi Ops.
2. Ops đau vì phải giải thích cost sau khi vendor invoice về.
3. Manager đau vì biết shipment lỗ quá muộn.
4. Sales/CS đau vì khách tranh cãi phí phát sinh nếu thiếu bằng chứng.

### 16.3. Giả thuyết sản phẩm

1. Agentify nên bắt đầu với cost exception, không phải full accounting.
2. DEM/DET warning là use case có ROI rõ nhất nếu có dữ liệu free time và timeline.
3. Invoice-to-shipment matching tiết kiệm thời gian rõ cho kế toán.
4. Missing billing checklist giúp giảm thất thoát doanh thu.
5. AI summary có giá trị nếu gắn link bằng chứng và không tự duyệt.

### 16.4. Giả thuyết thương mại

1. Khách hàng sẵn sàng trả nếu Agentify giúp thu hồi/không bỏ sót phí phát sinh.
2. ROI có thể đo bằng số tiền phí phát sinh được phát hiện và thời gian đối soát giảm.
3. ICP tốt nhất là forwarder/3PL có volume đủ lớn nhưng chưa dùng forwarding ERP mạnh.

---

## 17. Tính khả thi cho Agentify

### 17.1. Khả thi về dữ liệu

Khả thi ở mức trung bình đến cao nếu MVP không đòi tích hợp kế toán sâu.

Nguồn dễ lấy:

- Excel cost sheet.
- Vendor invoice PDF/Excel.
- Quote/debit note.
- Shipment timeline.
- POD/EIR/GRN.
- Manual approval note.

Nguồn khó hơn:

- API phần mềm kế toán.
- API e-invoice platform.
- Bank payment data.
- Full chart of accounts.

MVP nên bắt đầu bằng upload/import và export handoff.

### 17.2. Khả thi về kỹ thuật

Module kỹ thuật cần có:

- Cost item model.
- Invoice upload/OCR/extraction.
- Shipment matching engine.
- Rule engine cho cost exception.
- Evidence linking.
- Approval note/audit trail.
- AI summary.
- Export cho kế toán.

Rủi ro kỹ thuật:

- Invoice format đa dạng.
- Reference thiếu hoặc sai.
- Multi-currency.
- VAT/tax treatment phức tạp.
- Một invoice gộp nhiều shipment.

Cách giảm rủi ro:

- Chỉ làm gợi ý mapping, không tự ghi nhận cuối cùng.
- Cho người dùng xác nhận confidence thấp.
- Bắt đầu với 2-3 loại phí dễ chuẩn hóa: trucking, local charges, DEM/DET.
- Không xử lý thuế/hạch toán trong MVP.

### 17.3. Khả thi về adoption

Adoption phụ thuộc vào việc Agentify có giảm việc cho cả Ops và kế toán không.

Nếu chỉ bắt Ops nhập thêm cost, adoption thấp.

Cách đúng:

- Tận dụng file/invoice hiện có.
- Tự gợi ý mapping.
- Chỉ yêu cầu xử lý dòng exception.
- Tạo summary hữu ích cho manager.
- Xuất dữ liệu cho kế toán thay vì bắt kế toán đổi hệ thống.

### 17.4. Rủi ro pháp lý/tài chính

Agentify cần tránh:

- Tự xuất hóa đơn điện tử.
- Tự quyết định thuế suất.
- Tự hạch toán vào sổ cái.
- Tự duyệt thanh toán.
- Tự sửa invoice.
- Tự gửi debit note/customer invoice không qua người duyệt.

Agentify nên:

- Hiển thị nguồn dữ liệu.
- Ghi audit trail.
- Gắn trạng thái "AI suggested" và "human approved".
- Cho phép export dữ liệu để kế toán xử lý trong hệ thống chính.

### 17.5. Khả thi triển khai 4-8 tuần

Tuần 1-2:

- Chốt cost item taxonomy.
- Tạo shipment cost workspace.
- Tạo upload invoice/evidence.

Tuần 3-4:

- Import Excel cost sheet.
- Rule quote-vs-actual.
- Rule missing billing.

Tuần 5-6:

- OCR/gợi ý invoice mapping.
- DEM/DET/free time alert nếu có dữ liệu.
- AI cost summary.

Tuần 7-8:

- Pilot dữ liệu thật.
- Đo thời gian đối soát.
- Đo số phí phát sinh phát hiện.
- Chỉnh rule.

---

## 18. Kết luận sơ bộ Cụm 7

Cụm kế toán, chi phí, hóa đơn và đối soát là một cụm có giá trị thương mại rõ vì pain gắn trực tiếp với tiền.

Kết luận chính:

1. Thị trường đã có nhiều phần mềm kế toán/e-invoice/ERP mạnh, nên Agentify không nên cạnh tranh trực diện.
2. Vấn đề thực tế nằm ở khoảng trống giữa vận hành và tài chính: phí phát sinh do exception không được ghi nhận, chứng từ phí rải rác, invoice không gắn shipment, và margin được biết muộn.
3. Cơ hội tốt nhất là cost exception theo shipment.
4. MVP nên tập trung vào DEM/DET warning, invoice-to-shipment matching, quote-vs-actual alert, missing billing checklist và cost evidence pack.
5. Agentify phải giữ vai trò copilot: nhắc, gợi ý, tóm tắt, gom bằng chứng; không tự duyệt hoặc tự hạch toán.

Đề xuất quyết định:

> Tiếp tục khảo sát sâu Cụm 7 vì đây là cụm có ROI dễ chứng minh. Tuy nhiên, không nên chọn Cụm 7 làm MVP độc lập nếu chưa có shipment timeline từ các cụm trước. Cụm 7 nên là lớp thương mại hóa mạnh cho MVP visibility: khi Agentify đã biết lô hàng bị trễ, thiếu chứng từ, chờ xe hoặc chưa nhập kho, hệ thống có thể gắn ngay tác động chi phí và cảnh báo người chịu trách nhiệm.

---

## 19. Nguồn tham khảo

1. Văn bản Chính phủ. Nghị định số 70/2025/NĐ-CP sửa đổi, bổ sung một số điều của Nghị định số 123/2020/NĐ-CP về hóa đơn, chứng từ. https://vanban.chinhphu.vn/?docid=213179&pageid=27160
2. LuatVietnam. Decree 70/2025/ND-CP invoices and documents. https://english.luatvietnam.vn/tai-chinh/decree-70-2025-nd-cp-invoices-and-documents-394682-d1.html
3. KPMG. Vietnam: Amendments to regulations on electronic invoices. https://kpmg.com/us/en/taxnewsflash/news/2025/04/tnf-vietnam-amendments-to-regulations-on-electronic-invoices.html
4. MISA meInvoice. Electronic invoice software. https://www.meinvoice.vn/en/
5. MISA AMIS. Enterprise management platform. https://amis.misa.vn/en/
6. BRAVO. About us. https://www.bravo.com.vn/en/about-us/
7. Portcities. Odoo Partner Vietnam and localization. https://portcities.net/odoo-partner-vietnam
8. CargoWise. Supply Chain and freight forwarding accounting tools. https://www.cargowise.com/solutions/cargowise-enterprise/accounting/
9. Winta Logistics. Phần mềm quản lý logistics. https://www.winta.com.vn/phan-mem-quan-ly-logistics.html
10. Winta Logistics detailed introduction PDF. https://www.winta.com.vn/Winta_Download/File/Gioi_Thieu_Chi_Tiet_Winta_Logistics.pdf
11. GoFreight. Freight Billing & Accounting Software. https://gofreight.com/product/freight-billing-accounting/
12. WakaAccounting. Accounting Software for Logistics & Transport. https://www.wakatech.com/waka-accounting
13. OrigoLink. Freight Forwarding Software for Modern Teams. https://www.origolink.com/
14. ONE Vietnam. Local Charges and Demurrage/Detention Tariff. https://vn.one-line.com/standard-page/local-charges-and-tariff
15. Hapag-Lloyd. Vietnam local charges/service fees. https://www.hapag-lloyd.com/content/dam/website/downloads/detention_demurrage/Vietnam_local_charges_service_fees_Apr2025.pdf
16. Maersk. Demurrage and detention. https://www.maersk.com/support/faqs/demurrage-and-detention
17. Logwin. Vietnam local charges 2026. https://www.logwin-logistics.com/fileadmin/user_upload/images/unternehmen/service/16_Service_Vietnam_local_charges/Local_charges_publishing_VN_EN_2026.pdf

---

## 20. Tóm tắt compact sau Cụm 7

Đã hoàn thành research Cụm 7: Kế toán, chi phí, hóa đơn và đối soát.

Insight chính:

- Cụm 7 gắn trực tiếp với tiền: shipment có thể vận hành xong nhưng vẫn lỗ nếu phí phát sinh không được ghi nhận, không có bằng chứng hoặc không bill lại khách.
- Một shipment/container có nhiều lớp chi phí: cước quốc tế, local charges, phí hải quan, cảng, trucking, kho, DEM/DET, storage, phí sửa chứng từ, phí ngân hàng, bảo hiểm.
- Việt Nam có hệ thống e-invoice/kế toán đã số hóa mạnh; Nghị định 70/2025/NĐ-CP có hiệu lực từ 01/06/2025 làm tăng yêu cầu đúng dữ liệu, đúng thời điểm, đúng chứng từ.
- Đối thủ/sản phẩm hiện tại gồm MISA, FAST, BRAVO, Odoo, SAP/Oracle, CargoWise, Winta, GoFreight, WakaAccounting, OrigoLink, freight audit tools.
- Agentify không nên làm phần mềm kế toán, không nên tự hạch toán, tự xuất hóa đơn, tự duyệt thanh toán hoặc tự quyết định thuế.
- Khoảng trống của Agentify là lớp cost exception nối Ops và Finance: biết phí phát sinh từ exception nào, shipment nào, ai duyệt, bằng chứng ở đâu, có bill lại khách chưa.
- Pain ưu tiên: phí phát sinh không ghi nhận sớm, DEM/DET không cảnh báo trước, vendor invoice không gắn shipment, billing khách thiếu phí, không biết shipment âm margin, thiếu chứng từ phí.
- MVP đề xuất: Agentify Cost Exception Copilot.
- Tính năng MVP: shipment cost workspace, cost item table, invoice upload/OCR, quote-vs-actual alert, DEM/DET warning, approval note, cost summary, accounting handoff export.
- ICP ưu tiên: forwarder/3PL vừa và nhỏ xử lý 50-500 shipment/tháng, có nhiều vendor invoice và còn dùng Excel/phần mềm rời rạc để theo dõi shipment P/L.

Khuyến nghị sau cụm này:

- Tiếp tục Cụm 8: Customer Service, Operations và Account trả lời khách.
- Khi tổng hợp MVP, Cụm 7 nên là lớp ROI tài chính cho Agentify visibility: không chỉ biết shipment đang lỗi, mà biết lỗi đó có thể làm phát sinh bao nhiêu tiền và cần ai xử lý.
