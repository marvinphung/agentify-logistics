# Cụm 8: Customer Service, Operations và Account trả lời khách

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để nghiên cứu nhóm **Customer Service, Operations và Account** trong logistics công nghiệp, B2B và xuất nhập khẩu tại Việt Nam.

Nếu các cụm trước trả lời từng mảng nghiệp vụ:

- Cụm 1: hàng đã qua hải quan, cảng, depot/ICD chưa?
- Cụm 2: shipment này gắn với PO, hợp đồng và cam kết giao hàng nào?
- Cụm 3: booking quốc tế, hãng tàu/hãng bay, lịch tàu/chuyến bay ra sao?
- Cụm 4: chứng từ xuất nhập khẩu đủ và đúng chưa?
- Cụm 5: trucking nội địa đã lấy/giao/trả container đúng hạn chưa?
- Cụm 6: kho đã nhận, kiểm, nhập tồn và có bằng chứng chưa?
- Cụm 7: chi phí, hóa đơn, phí phát sinh và đối soát có khớp không?

thì Cụm 8 trả lời câu hỏi:

> Khi khách hỏi "lô hàng đang ở đâu, có vấn đề gì không, khi nào giao được?", ai là người phải trả lời, họ phải kiểm tra những nguồn nào, mất bao lâu, và vì sao câu trả lời thường chậm hoặc thiếu chắc chắn?

Đây là cụm rất quan trọng cho Agentify vì CS/Ops/Account thường là nơi toàn bộ sự rời rạc của hệ thống đổ về. Khách hàng không quan tâm dữ liệu nằm ở VNACCS, ePort, carrier portal, Excel, WMS, TMS, Zalo hay email. Khách chỉ muốn một câu trả lời rõ:

```text
Hàng hiện đang ở bước nào?
Có đang bị kẹt không?
Nếu kẹt, vì sao?
Ai đang xử lý?
Khi nào có cập nhật tiếp theo?
Có rủi ro giao trễ hoặc phát sinh phí không?
```

Các câu hỏi chính cần trả lời:

1. Ai nhận câu hỏi trạng thái từ khách: CS, Ops, Account, Sales hay quản lý?
2. Khách hỏi qua kênh nào: email, Zalo, điện thoại, WhatsApp, portal, group chat hay ticket?
3. Một ngày/tuần có bao nhiêu câu hỏi trạng thái?
4. Một câu hỏi trung bình mất bao lâu để trả lời?
5. Người trả lời phải kiểm tra những nguồn nào?
6. Có phải hỏi nội bộ nhiều người trước khi trả lời khách không?
7. Có template trả lời không, hay mỗi người tự viết?
8. Có từng trả lời sai, thiếu, chậm hoặc hứa quá chắc khi dữ liệu chưa chắc không?
9. Khi đổi ca, nghỉ phép hoặc đổi người phụ trách, handover đang làm như thế nào?
10. Nếu có AI tóm tắt trạng thái, cảnh báo exception và soạn nháp câu trả lời, người dùng có muốn dùng không?

Kết luận cần kiểm chứng:

> Cụm CS/Ops/Account là ứng viên MVP rất mạnh cho Agentify vì đây là lớp tiếp xúc trực tiếp với khách hàng, chịu pain hằng ngày, có workflow lặp lại, và có thể tạo giá trị mà không cần thay thế TMS/WMS/ERP/phần mềm hải quan. Agentify nên bắt đầu như một "Logistics CS/Ops Copilot": gom trạng thái shipment, tóm tắt tình hình, cảnh báo exception, soạn nháp câu trả lời, và tạo handover summary cho con người duyệt.

---

## 2. Vì sao CS/Ops/Account trả lời khách là trọng tâm của MVP?

### 2.1. Đây là nơi thị trường cảm nhận chất lượng dịch vụ logistics

Trong logistics B2B/XNK, chất lượng dịch vụ không chỉ là hàng có đến đúng hạn hay không. Chất lượng dịch vụ còn nằm ở việc khách có được cập nhật kịp thời hay không.

Một shipment có thể vẫn đang được xử lý đúng quy trình, nhưng nếu khách không nhận được cập nhật, họ sẽ cảm thấy nhà cung cấp thiếu kiểm soát.

Ví dụ:

- Hàng đã đến cảng nhưng khách chưa biết.
- Tờ khai đang chờ bổ sung chứng từ nhưng không ai báo cho chủ hàng.
- Container đã lấy khỏi cảng nhưng kho chưa xác nhận giờ nhận.
- Hàng bị roll tàu nhưng account chưa báo sales/chủ hàng.
- DEM/DET sắp phát sinh nhưng khách chỉ biết khi đã bị tính phí.

Trong các tình huống này, người chịu áp lực thường là CS/Ops/Account.

### 2.2. CS/Ops là "lớp tích hợp thủ công" của thị trường

Nhiều doanh nghiệp đã có phần mềm theo từng mảng:

- Phần mềm khai hải quan.
- ePort/cổng cảng.
- Carrier portal.
- TMS.
- WMS.
- Phần mềm kế toán.
- CRM hoặc ticketing.
- Excel tracking sheet.
- Email và Zalo.

Nhưng khi khách hỏi trạng thái, dữ liệu không tự biến thành một câu trả lời hoàn chỉnh.

Người CS/Ops thường phải làm các bước thủ công:

1. Tìm shipment/container/PO trong Excel hoặc TMS.
2. Mở email để tìm booking, arrival notice, D/O, thông báo hãng tàu.
3. Hỏi bộ phận chứng từ xem đã đủ chứng từ chưa.
4. Hỏi khai hải quan xem tờ khai đã thông quan chưa.
5. Hỏi trucking xem xe đã lấy container chưa.
6. Hỏi kho xem đã nhận hàng chưa.
7. Hỏi kế toán xem đã thanh toán phí cảng/hãng tàu chưa.
8. Tự viết câu trả lời cho khách.
9. Tự đặt nhắc việc để follow-up lần sau.

Về bản chất, CS/Ops đang làm công việc mà một lớp phần mềm trung gian nên làm: gom dữ liệu, hiểu ngữ cảnh, xác định bước tiếp theo, và truyền đạt lại bằng ngôn ngữ dễ hiểu.

### 2.3. Pain xảy ra hằng ngày và dễ đo ROI

So với các cụm có rủi ro pháp lý hoặc yêu cầu tích hợp sâu, Cụm 8 có lợi thế là ROI có thể đo bằng thời gian.

Ví dụ cách tính đơn giản:

```text
Số câu hỏi trạng thái mỗi ngày
x Số phút trung bình để trả lời một câu
x Số ngày làm việc mỗi tháng
= Tổng số giờ CS/Ops mất cho việc tra cứu và trả lời trạng thái
```

Nếu một công ty có:

- 4 nhân viên CS/Ops.
- Mỗi người nhận 25 câu hỏi trạng thái/ngày.
- Mỗi câu hỏi mất trung bình 8 phút để kiểm tra và trả lời.
- 22 ngày làm việc/tháng.

thì thời gian tiêu tốn là:

```text
4 x 25 x 8 x 22 = 17.600 phút/tháng
= khoảng 293 giờ/tháng
```

Nếu Agentify giảm 40% thời gian này, doanh nghiệp tiết kiệm khoảng 117 giờ/tháng, chưa tính giảm lỗi, giảm missed follow-up và tăng chất lượng dịch vụ.

### 2.4. Đây là use case AI phù hợp hơn tự động hóa nghiệp vụ nhạy cảm

AI không nên tự khai hải quan, tự sửa chứng từ pháp lý, tự duyệt chi phí, tự xuất hóa đơn hoặc tự cam kết ETA với khách.

Nhưng AI có thể làm tốt các việc:

- Đọc dữ liệu shipment.
- Tóm tắt trạng thái từ nhiều nguồn.
- Nêu rõ dữ liệu nào chắc, dữ liệu nào chưa chắc.
- Tạo checklist việc còn thiếu.
- Soạn nháp email/Zalo trả lời khách.
- Nhắc người phụ trách follow-up.
- Tóm tắt handover khi đổi ca hoặc nghỉ phép.

Vì vậy, Cụm 8 là điểm vào hợp lý cho Agentify theo hướng **human-in-the-loop**: AI hỗ trợ, con người duyệt.

---

## 3. Thuật ngữ cần giải thích

### 3.1. Customer Service trong logistics

Customer Service, viết tắt là CS, là người phụ trách giao tiếp thường xuyên với khách hàng.

Trong logistics, CS không giống tổng đài chăm sóc khách hàng B2C. CS logistics thường phải hiểu shipment, container, booking, chứng từ, ETA, ETD, cảng, hải quan, trucking và kho.

Việc của CS có thể gồm:

- Nhận yêu cầu booking từ khách.
- Cập nhật lịch tàu/chuyến bay.
- Báo trạng thái shipment.
- Nhắc khách gửi chứng từ.
- Báo delay hoặc phát sinh phí.
- Gửi báo cáo trạng thái định kỳ.
- Nhận khiếu nại và chuyển cho Ops xử lý.

### 3.2. Operations

Operations, viết tắt là Ops, là người điều phối thực tế.

Ops thường làm việc với:

- Hãng tàu/hãng bay.
- Đại lý nước ngoài.
- Cảng.
- Hải quan.
- Trucking vendor.
- Kho.
- Depot/ICD.
- Bộ phận chứng từ.
- Bộ phận kế toán.

Ops biết việc đang chạy thật ở đâu, nhưng không phải lúc nào Ops cũng có thời gian viết câu trả lời dễ hiểu cho khách.

### 3.3. Account

Account là người phụ trách quan hệ khách hàng.

Trong nhiều công ty logistics, Account có thể là:

- Account manager.
- Sales account.
- Key account.
- Customer success/account executive.

Account thường chịu trách nhiệm giữ khách, xử lý escalation và đảm bảo khách hài lòng. Khi khách lớn hỏi trạng thái hoặc phàn nàn, Account thường phải vào cuộc dù dữ liệu vận hành nằm ở Ops/CS.

### 3.4. Status update

Status update là cập nhật trạng thái shipment.

Ví dụ:

```text
Container đã discharge tại cảng Cát Lái.
Tờ khai đang chờ phân luồng.
D/O đã có, đang chờ thanh toán local charges.
Xe đã lấy container lúc 10:30.
Kho dự kiến nhận hàng lúc 15:00.
Container rỗng cần trả trước ngày 12/06 để tránh detention.
```

### 3.5. Exception

Exception là tình huống bất thường cần xử lý.

Ví dụ:

- Trễ tàu.
- Roll booking.
- Chưa có D/O.
- Chưa thông quan.
- Thiếu chứng từ.
- Xe không vào cảng kịp.
- Kho không nhận hàng đúng lịch.
- Hàng thiếu/hư hỏng.
- Sắp phát sinh DEM/DET.
- Invoice vendor không khớp.

Exception quan trọng vì khách thường không hỏi khi mọi thứ bình thường; khách hỏi nhiều nhất khi có rủi ro.

### 3.6. SLA

SLA là Service Level Agreement, tức cam kết mức dịch vụ.

Trong CS logistics, SLA có thể là:

- Trả lời email trong 2 giờ làm việc.
- Gửi daily status report trước 10:00 mỗi ngày.
- Báo delay trong vòng 30 phút sau khi phát hiện.
- Cập nhật POD trong vòng 24 giờ sau khi giao hàng.

### 3.7. ETA, ETD, ATA, ATD

Các thuật ngữ thời gian thường gặp:

| Thuật ngữ | Nghĩa | Giải thích dễ hiểu |
|---|---|---|
| ETD | Estimated Time of Departure | Dự kiến rời cảng/sân bay |
| ETA | Estimated Time of Arrival | Dự kiến đến cảng/sân bay/kho |
| ATD | Actual Time of Departure | Thời gian rời thực tế |
| ATA | Actual Time of Arrival | Thời gian đến thực tế |

CS/Ops phải cẩn thận khi trả lời khách vì ETA là dự kiến, không phải cam kết chắc chắn.

### 3.8. Handover

Handover là bàn giao công việc.

Ví dụ:

- Nhân viên CS nghỉ phép, người khác phải tiếp quản shipment.
- Ca ngày bàn giao cho ca tối.
- Account A chuyển khách sang Account B.
- Ops phụ trách container nhập khẩu nghỉ, người khác phải theo tiếp.

Nếu handover kém, người mới không biết:

- Shipment nào đang có vấn đề.
- Ai đã hứa gì với khách.
- Việc nào cần follow-up hôm nay.
- Chứng từ nào còn thiếu.
- Phí nào sắp phát sinh.

### 3.9. Customer portal

Customer portal là cổng để khách tự đăng nhập xem thông tin.

Một số phần mềm logistics quốc tế như GoFreight, Magaya, CargoWise hoặc các visibility platform như project44/FourKites có portal hoặc dashboard cho khách xem tracking.

Tuy nhiên, trong thực tế Việt Nam, portal không tự loại bỏ email/Zalo vì:

- Khách không phải lúc nào cũng đăng nhập portal.
- Dữ liệu trong portal có thể không đầy đủ với từng nghiệp vụ địa phương.
- Khách vẫn muốn người phụ trách xác nhận và giải thích.
- Nhiều công ty SME chưa có portal.

### 3.10. AI copilot

AI copilot là trợ lý AI hỗ trợ nhân viên, không tự quyết định thay nhân viên.

Trong Cụm 8, AI copilot phù hợp hơn AI chatbot tự động nói chuyện trực tiếp với khách.

Lý do:

- Trạng thái logistics có thể nhạy cảm.
- Trả lời sai ETA có thể gây thiệt hại.
- Có thông tin nội bộ không nên gửi ra ngoài.
- Nhiều câu trả lời cần cân nhắc quan hệ khách hàng.

---

## 4. Workflow "khách hỏi: hàng đang ở đâu?"

### 4.1. Workflow hiện tại thường thấy

Một tình huống phổ biến:

```text
Khách gửi Zalo/email:
"Bên em check giúp chị container ABCU1234567 đã lấy khỏi cảng chưa? Khi nào giao kho?"
```

CS/Ops có thể phải làm như sau:

1. Xác định khách đang hỏi shipment/container/PO nào.
2. Mở Excel tracking sheet hoặc TMS để tìm shipment.
3. Kiểm tra ETA/ATA và trạng thái hàng đến.
4. Kiểm tra D/O đã có chưa.
5. Kiểm tra tờ khai đã thông quan chưa.
6. Kiểm tra phí cảng/local charges đã thanh toán chưa.
7. Kiểm tra xe đã được điều chưa.
8. Hỏi trucking qua Zalo: "xe đã vào cảng chưa?"
9. Hỏi kho: "kho nhận được slot giao lúc mấy giờ?"
10. Xem lại email xem có thông báo delay hoặc phí phát sinh không.
11. Tự tổng hợp câu trả lời.
12. Gửi lại khách.
13. Ghi nhớ phải follow-up nếu chưa đủ thông tin.

Vấn đề là nhiều bước không nằm trong một hệ thống. Người CS/Ops phải nhớ ngữ cảnh và tự kết nối dữ liệu.

### 4.2. Workflow theo góc nhìn dữ liệu

Cùng một câu hỏi của khách có thể cần dữ liệu từ nhiều nguồn:

| Câu hỏi của khách | Nguồn cần kiểm tra | Người/bộ phận liên quan |
|---|---|---|
| Hàng đã đến cảng chưa? | Carrier portal, arrival notice, terminal/ePort, tracking sheet | CS/Ops |
| Đã thông quan chưa? | Phần mềm khai hải quan, chứng từ, broker | Docs, customs broker |
| Khi nào kéo container về kho? | TMS, trucking vendor, driver update, cảng | Ops, trucking coordinator |
| Có phát sinh phí chưa? | Free time, D&D tariff, invoice, cost sheet | Ops, kế toán |
| Hàng có thiếu/hư không? | POD, GRN, ảnh kho, biên bản | Kho, 3PL, CS |
| Vì sao trễ? | Lịch tàu, customs, port, truck, warehouse, documents | Nhiều bộ phận |

Agentify có cơ hội lớn nếu biến những nguồn rời rạc này thành một timeline và một câu trả lời có dẫn nguồn.

### 4.3. Workflow trạng thái lý tưởng với Agentify

Khi có Agentify, workflow mong muốn:

```text
Khách hỏi qua email/Zalo
  -> CS nhập hoặc chọn shipment trong Agentify
  -> Agentify gom trạng thái mới nhất từ shipment timeline
  -> Agentify phát hiện exception nếu có
  -> Agentify tạo câu trả lời nháp
  -> CS kiểm tra, sửa giọng văn nếu cần
  -> CS gửi khách
  -> Agentify đặt follow-up/reminder nếu câu trả lời chưa đóng
```

Điểm quan trọng: Agentify không cần tự gửi ngay cho khách trong MVP. Chỉ cần giảm thời gian tra cứu và giảm lỗi trong câu trả lời đã đủ giá trị.

### 4.4. Workflow daily status report

Nhiều khách B2B không chỉ hỏi từng shipment. Họ muốn nhận báo cáo định kỳ:

- Daily shipment status.
- Weekly container status.
- PO tracking report.
- Exception report.
- D&D risk report.
- Pending document report.

Workflow thủ công:

1. CS mở Excel.
2. Cập nhật từng dòng shipment.
3. Copy status từ email/Zalo.
4. Kiểm tra shipment nào có delay.
5. Viết note cho từng shipment.
6. Gửi file Excel hoặc email summary cho khách.

Workflow với Agentify:

1. Agentify đọc shipment list.
2. Gom trạng thái theo shipment/container/PO.
3. Tự phân nhóm: on track, cần chú ý, đang lỗi, cần khách phản hồi.
4. Soạn daily report.
5. CS duyệt và gửi.

---

## 5. Thực trạng tại Việt Nam

### 5.1. Thị trường logistics lớn, nhưng vận hành thông tin vẫn phân mảnh

Việt Nam là thị trường xuất nhập khẩu lớn. Theo Tổng cục Thống kê, tổng kim ngạch xuất nhập khẩu hàng hóa năm 2025 đạt 930,05 tỷ USD, tăng 18,2% so với năm trước. Quy mô giao dịch này tạo ra lượng shipment, chứng từ, container, booking, invoice và câu hỏi trạng thái rất lớn.

Chính phủ cũng đã phê duyệt chiến lược phát triển dịch vụ logistics Việt Nam đến 2035, tầm nhìn 2050, nhấn mạnh chuyển đổi số, nâng cao năng lực logistics và tăng tính cạnh tranh.

Nhưng với doanh nghiệp vừa và nhỏ, thực tế thường chưa phải là một hệ thống end-to-end hoàn chỉnh. Dữ liệu vẫn bị chia theo từng bên:

- Forwarder có file tracking riêng.
- Chủ hàng có PO/ERP riêng.
- Broker có dữ liệu khai hải quan.
- Hãng tàu có portal riêng.
- Cảng có ePort riêng.
- Trucking có nhóm Zalo/Excel/GPS riêng.
- Kho có WMS hoặc Excel riêng.
- Kế toán có phần mềm kế toán riêng.

Câu hỏi của khách lại không đi theo ranh giới hệ thống. Vì vậy CS/Ops phải nối các mảnh này bằng thao tác thủ công.

### 5.2. Email và Zalo là kênh vận hành thực tế, không chỉ là kênh giao tiếp phụ

Ở thị trường Việt Nam, Zalo có vai trò đặc biệt vì đây là kênh giao tiếp phổ biến trong công việc. Báo cáo Digital 2025 Vietnam của DataReportal ghi nhận Việt Nam có 76,2 triệu social media user identities vào tháng 01/2025. Một số nguồn thị trường năm 2025 cũng ghi nhận Zalo ở mức khoảng 78 triệu người dùng hoạt động hằng tháng.

Ý nghĩa cho logistics:

- Nhiều câu hỏi trạng thái đi qua Zalo cá nhân hoặc nhóm Zalo.
- Driver/trucking vendor thường cập nhật qua Zalo.
- Ảnh POD, EIR, biên bản, bill, phiếu cân có thể được gửi qua Zalo.
- Account/CS thường trả lời nhanh bằng chat trước, sau đó mới cập nhật email/file.

Zalo Cloud/Zalo Official Account cũng có API, ZNS và các dịch vụ nhắn tin doanh nghiệp. Điều này cho thấy kênh Zalo có thể trở thành một phần của customer service stack, nhưng trong MVP logistics, không nên bắt đầu bằng việc tự động gửi tin hàng loạt. Nên bắt đầu bằng việc gom context và soạn nháp để con người gửi.

### 5.3. Portal không đủ giải quyết pain nếu dữ liệu nền không đầy đủ

Nhiều phần mềm quốc tế có customer portal:

- GoFreight có tracking portal, customer portal, automated reports, container tracking và shipment journey.
- Magaya Digital Freight Portal cung cấp quote, booking, tracking, documents và reporting.
- CargoWise có hệ sinh thái quản lý logistics lớn, tracking và customer tools.
- project44 và FourKites cung cấp visibility platform cho supply chain.

Nhưng portal có hai giới hạn khi áp dụng cho nhóm SME/forwarder vừa và nhỏ tại Việt Nam:

1. Nếu dữ liệu vận hành địa phương không được cập nhật vào hệ thống, portal chỉ đẹp nhưng không đủ tin.
2. Khách vẫn cần người giải thích exception, vì logistics không chỉ là "đang ở đâu" mà còn là "vì sao trễ và cần làm gì tiếp".

Vì vậy cơ hội của Agentify không phải là làm một dashboard nữa, mà là làm lớp giúp CS/Ops biến dữ liệu phân mảnh thành câu trả lời có ngữ cảnh.

### 5.4. AI customer service đang tăng mạnh nhưng chưa đặc thù logistics Việt Nam

Các nền tảng customer service như Zendesk, HubSpot Service Hub, Salesforce Service Cloud, Freshdesk và Intercom đều đã đưa AI vào ticketing, help desk, reply suggestion, summarization và automation.

Điều này chứng minh xu hướng thị trường: doanh nghiệp muốn AI hỗ trợ đội ngũ chăm sóc khách hàng.

Tuy nhiên, các nền tảng này thường mạnh ở:

- Ticket routing.
- Omnichannel inbox.
- Knowledge base.
- Chatbot.
- SLA.
- CRM/customer history.
- Summary và reply suggestion tổng quát.

Chúng không được thiết kế riêng cho logic shipment/container/PO, free time, D/O, hải quan, ePort, trucking, warehouse, DEM/DET và chứng từ XNK tại Việt Nam.

Khoảng trống của Agentify nằm ở phần logistics-specific context.

---

## 6. Pain ranking sơ bộ

### 6.1. Pain 1: Mất thời gian tra cứu nhiều nguồn

Đây là pain lớn nhất và xảy ra thường xuyên nhất.

Một câu hỏi tưởng đơn giản như:

```text
"Hàng đã giao kho chưa?"
```

có thể cần kiểm tra:

- Container đã lấy khỏi cảng chưa.
- Xe đang ở đâu.
- Kho có nhận đúng lịch không.
- Hàng đã dỡ xong chưa.
- Có POD/GRN chưa.
- Có thiếu/hư hỏng không.

Nếu mỗi câu hỏi mất 5-15 phút, tổng thời gian mỗi ngày là rất lớn.

### 6.2. Pain 2: Trả lời chậm vì phải hỏi nội bộ

CS thường không trực tiếp nắm tất cả trạng thái. Họ phải hỏi:

- Ops.
- Trucking coordinator.
- Docs.
- Broker.
- Warehouse.
- Kế toán.
- Sales/account.

Nếu người cần hỏi đang bận hoặc không online, khách phải chờ.

### 6.3. Pain 3: Câu trả lời không nhất quán giữa các người phụ trách

Khi không có một source of truth, mỗi người có thể trả lời khác nhau:

- CS nói xe đang chờ vào cảng.
- Ops nói container đã lấy.
- Kho nói chưa nhận được lịch.
- Account nói dự kiến giao chiều nay.

Khách sẽ mất niềm tin nếu thông tin không thống nhất.

### 6.4. Pain 4: Handover kém

Khi người phụ trách nghỉ, đổi ca hoặc nghỉ phép, người tiếp nhận thường phải đọc lại:

- Email thread dài.
- File Excel.
- Nhóm Zalo.
- Tin nhắn riêng.
- Ghi chú cá nhân.

Nếu không đọc kỹ, dễ bỏ sót việc đã hứa với khách hoặc deadline quan trọng.

### 6.5. Pain 5: Quên follow-up

Nhiều câu trả lời không đóng ngay:

```text
"Em đang check với kho, sẽ phản hồi lại chị trong chiều nay."
```

Vấn đề là nếu không có reminder, CS có thể quên phản hồi. Khách phải hỏi lại, tạo cảm giác bị bỏ rơi.

### 6.6. Pain 6: Không biết shipment nào cần ưu tiên

Khi một người phụ trách 50-200 shipment, họ không thể đọc từng dòng mỗi ngày.

Cần hệ thống tự chỉ ra:

- Shipment nào đang trễ.
- Shipment nào sắp hết free time.
- Shipment nào thiếu chứng từ.
- Shipment nào khách VIP đang hỏi.
- Shipment nào đã quá SLA phản hồi.

### 6.7. Pain 7: Trả lời thiếu bằng chứng

Một số câu trả lời cần có bằng chứng:

- Ảnh POD.
- EIR.
- Biên bản giao nhận.
- Email hãng tàu.
- Arrival notice.
- D/O.
- GRN.
- Chứng từ hải quan.

Nếu bằng chứng nằm rải rác, CS mất thời gian tìm lại hoặc gửi thiếu.

### 6.8. Pain 8: Khách hỏi ngoài giờ

Logistics không dừng đúng giờ hành chính. Hãng tàu đổi lịch, xe kẹt cảng, kho đổi slot, khách nước ngoài gửi email lệch múi giờ.

Nếu không có summary và exception inbox, người trực ngoài giờ rất khó biết việc nào cần xử lý ngay.

---

## 7. Phân khúc nên khảo sát

### 7.1. Forwarder vừa và nhỏ

Đây là phân khúc ưu tiên cao nhất.

Lý do:

- Có nhiều khách hỏi trạng thái.
- Phải làm việc với nhiều hãng tàu, co-loader, broker, trucking, kho.
- Thường có CS/Ops riêng.
- Dữ liệu hay nằm ở Excel, email, Zalo và phần mềm rời rạc.
- Có động lực tăng chất lượng dịch vụ để giữ khách.

Nên khảo sát:

- Forwarder 10-100 nhân sự.
- 50-500 shipment/tháng.
- Có hàng sea import/export FCL/LCL.
- Có 2-10 nhân viên CS/Ops.

### 7.2. 3PL

3PL có nhiều lớp dịch vụ hơn forwarder:

- Vận tải.
- Kho.
- Customs brokerage.
- Distribution.
- Value-added service.
- Báo cáo KPI cho khách B2B.

Pain của 3PL là status không chỉ theo shipment mà còn theo order, truck, warehouse task và SLA.

### 7.3. Chủ hàng xuất nhập khẩu

Chủ hàng là bên cần visibility để điều hành kinh doanh.

Nên khảo sát:

- Nhà máy xuất khẩu.
- Công ty thương mại nhập khẩu.
- Distributor nhập hàng từ nhiều quốc gia.
- Doanh nghiệp có nhiều PO/tháng.

Pain của chủ hàng:

- Không biết forwarder đang xử lý đến đâu.
- Phải hỏi nhiều bên.
- Không có một report thống nhất theo PO/shipment.
- Bị động khi hàng trễ.

### 7.4. Trucking coordinator

Trucking là nguồn dữ liệu quan trọng cho câu hỏi "hàng đã đi đến đâu".

Nên khảo sát:

- Điều phối xe container.
- Điều phối xe tải nội địa.
- Nhà xe/vendor logistics.

Mục tiêu là hiểu cách status từ tài xế đi về CS/Ops.

### 7.5. Warehouse CS/Account

Kho cũng có CS/Account riêng cho khách B2B/3PL.

Pain:

- Khách hỏi inbound đã nhận chưa.
- Khách hỏi tồn kho đã cập nhật chưa.
- Khách hỏi POD/GRN.
- Khách hỏi hàng thiếu/hư.
- Khách yêu cầu báo cáo cuối ngày.

### 7.6. Operations manager

Operations manager là người thấy pain ở cấp đội nhóm.

Cần hỏi:

- Đội CS/Ops mất bao nhiêu thời gian trả lời khách.
- Lỗi trả lời chậm/sai xảy ra bao nhiêu lần.
- Khách nào phàn nàn nhiều.
- Có KPI response time không.
- Có ngân sách mua tool không.

---

## 8. Product map hiện tại

### 8.1. Nhóm freight forwarding/TMS/ERP logistics

Các hệ thống này quản lý shipment và nghiệp vụ logistics.

Ví dụ:

- CargoWise.
- Magaya.
- GoFreight.
- Winta Logistics.
- Waka/OrigoLink hoặc các hệ thống logistics nội địa khác.

Điểm mạnh:

- Có cấu trúc shipment/job.
- Có nghiệp vụ booking, chứng từ, billing, accounting.
- Một số có customer portal/tracking.
- Phù hợp nếu doanh nghiệp muốn thay core system.

Điểm yếu:

- Triển khai nặng hơn so với một lớp copilot.
- Dữ liệu ngoài hệ thống vẫn nằm ở email/Zalo/file.
- Nếu nhân viên không cập nhật đầy đủ, portal không giải quyết được câu hỏi.
- Không phải công ty SME nào cũng sẵn sàng thay hệ thống.

### 8.2. Nhóm supply chain visibility platform

Ví dụ:

- project44.
- FourKites.
- Shippeo.
- Descartes visibility solutions.

Điểm mạnh:

- Tracking đa phương thức.
- ETA, exception, carrier connectivity.
- Phù hợp enterprise shipper/3PL lớn.
- Có khả năng giảm manual tracking và tăng customer visibility.

Điểm yếu:

- Giá và triển khai thường phù hợp doanh nghiệp lớn hơn.
- Không giải quyết toàn bộ ngữ cảnh địa phương như hải quan Việt Nam, ePort, chứng từ, Zalo, broker, kho SME.
- Không trực tiếp tạo workflow trả lời khách bằng tiếng Việt theo ngữ cảnh từng account.

### 8.3. Nhóm CRM/help desk/customer service platform

Ví dụ:

- Zendesk.
- Freshdesk.
- HubSpot Service Hub.
- Salesforce Service Cloud.
- Intercom.

Điểm mạnh:

- Quản lý ticket tốt.
- Omnichannel inbox.
- SLA, routing, macro/template.
- AI summary/reply suggestion.
- Quản lý lịch sử khách hàng.

Điểm yếu:

- Không hiểu sâu shipment/container/PO.
- Không có sẵn logic free time, DEM/DET, D/O, customs, port release, POD, GRN.
- Cần tích hợp nhiều nguồn logistics trước khi trả lời được câu hỏi vận hành.
- Dễ trở thành một inbox nữa nếu không nối được dữ liệu shipment.

### 8.4. Nhóm messaging và collaboration

Ví dụ:

- Zalo/Zalo OA/Zalo Cloud API.
- Email.
- WhatsApp.
- Microsoft Teams.
- Slack.
- Google Chat.

Điểm mạnh:

- Người dùng đã quen.
- Phản hồi nhanh.
- Phù hợp giao tiếp với driver/vendor/khách.
- Zalo đặc biệt phù hợp tại Việt Nam.

Điểm yếu:

- Dữ liệu phân tán theo nhóm/chat cá nhân.
- Khó search theo shipment nếu không có quy chuẩn.
- Handover kém.
- Không có workflow shipment.
- Không tự tạo timeline hoặc exception.

### 8.5. Nhóm Excel/Google Sheet

Excel/Google Sheet vẫn rất phổ biến.

Điểm mạnh:

- Dễ dùng.
- Linh hoạt.
- Rẻ.
- Không cần triển khai phức tạp.
- Phù hợp tracking ban đầu.

Điểm yếu:

- Dễ sai dữ liệu.
- Không có workflow follow-up.
- Không tự kéo dữ liệu từ email/Zalo/portal.
- Không có AI summary.
- Không có audit trail tốt.
- Khó mở rộng khi volume tăng.

---

## 9. Đối thủ và sản phẩm liên quan

### 9.1. project44

project44 là nền tảng supply chain visibility toàn cầu. Trang Ocean Visibility của project44 nhấn mạnh khả năng kết nối carrier/forwarder, theo dõi ocean shipment, ETA, alert chủ động, và quản lý exception.

Điểm mạnh:

- Mạng lưới dữ liệu lớn.
- Theo dõi ocean freight mạnh.
- Phù hợp enterprise shipper/3PL.
- Có khả năng proactive alert.
- Có định vị rõ về customer experience và supply chain visibility.

Điểm yếu/cửa hẹp cho thị trường Việt Nam SME:

- Có thể quá enterprise cho forwarder vừa và nhỏ.
- Không phải công cụ CS/Ops tiếng Việt chuyên xử lý Zalo/email/Excel.
- Không thay thế được workflow nội bộ với broker, kho, trucking địa phương nếu chưa tích hợp.

Hàm ý cho Agentify:

- Không nên cạnh tranh trực diện ở global visibility network.
- Nên tập trung vào lớp workflow địa phương, CS copilot và dữ liệu phân mảnh.

### 9.2. FourKites

FourKites là nền tảng real-time supply chain visibility. FourKites có ocean freight visibility, exception management, D&D mitigation và customer communication trong platform.

Điểm mạnh:

- Định vị mạnh về end-to-end visibility.
- Có tracking đa phương thức.
- Có exception management.
- Có customer communication.
- Phù hợp doanh nghiệp lớn có chuỗi cung ứng phức tạp.

Điểm yếu/cửa hẹp:

- Cần dữ liệu và quy trình đủ trưởng thành.
- Không phải sản phẩm nhẹ cho đội CS/Ops SME Việt Nam.
- Không tối ưu riêng cho ngữ cảnh Zalo/email/chứng từ/hải quan Việt Nam.

Hàm ý cho Agentify:

- FourKites chứng minh demand visibility + customer communication là thật.
- Agentify có thể làm phiên bản nhẹ hơn, địa phương hóa hơn, human-in-the-loop hơn.

### 9.3. GoFreight

GoFreight là phần mềm freight forwarding cloud/AI. Sản phẩm có shipment tracking, operations, customer portal, automated report, container lifecycle, D&D reminders, email intake và AI document processing.

Điểm mạnh:

- Rất gần với pain của forwarder.
- Có customer portal và automated reports.
- Có AI đọc email/document.
- Có container tracking và D&D reminders.
- Định vị rõ cho forwarder/NVOCC.

Điểm yếu/cửa hẹp:

- Là core freight forwarding platform rộng, không chỉ là copilot.
- Doanh nghiệp đang dùng hệ thống khác có thể không muốn thay.
- Ngữ cảnh Việt Nam như Zalo, ePort, VNACCS/ECUS, broker địa phương cần kiểm chứng mức phù hợp.

Hàm ý cho Agentify:

- Đây là đối thủ đáng học nhất về hướng AI freight operations.
- Agentify cần chọn hướng rõ: không làm full forwarding software trước, mà làm lớp CS/Ops copilot nối vào hệ thống/file hiện có.

### 9.4. Magaya

Magaya cung cấp logistics software và Digital Freight Portal cho logistics service providers. Portal có quote, schedule, booking, tracking, documents và reporting.

Điểm mạnh:

- Hệ thống logistics hoàn chỉnh.
- Có customer portal.
- Có visibility và document/reporting.
- Có tệp khách hàng quốc tế.

Điểm yếu/cửa hẹp:

- Triển khai như core platform, không phải lớp nhẹ.
- Nếu dữ liệu vận hành nằm ngoài Magaya, CS vẫn phải xử lý thủ công.
- Cần kiểm chứng mức hiện diện/phù hợp tại Việt Nam SME.

### 9.5. CargoWise

CargoWise là nền tảng lớn cho logistics execution, forwarding, customs, accounting, tracking và enterprise logistics.

Điểm mạnh:

- Rất mạnh cho forwarder/3PL lớn.
- Hệ sinh thái nghiệp vụ sâu.
- Có khả năng chuẩn hóa vận hành toàn cầu.
- Có tracking, documentation, accounting và nhiều module.

Điểm yếu/cửa hẹp:

- Có thể nặng và đắt với SME.
- Cần triển khai/thay đổi quy trình.
- Không giải quyết ngay dữ liệu nằm ngoài hệ thống nếu người dùng vẫn vận hành qua email/Zalo/Excel.

Hàm ý cho Agentify:

- Không nên làm "CargoWise mới".
- Nên làm lớp hỗ trợ đội CS/Ops đang bị kẹt giữa CargoWise/TMS/Excel/email/Zalo.

### 9.6. Winta Logistics và phần mềm logistics nội địa

Winta Logistics là phần mềm quản lý logistics tại Việt Nam, có các module phục vụ forwarder/logistics như booking, job, chứng từ, chi phí và báo cáo.

Điểm mạnh:

- Hiểu thị trường Việt Nam hơn sản phẩm quốc tế.
- Có khả năng phù hợp nghiệp vụ forwarder trong nước.
- Có thể gần với cách doanh nghiệp Việt Nam vận hành.

Điểm yếu/cửa hẹp:

- Cần kiểm chứng độ hiện đại của UI/UX, AI, automation và tích hợp messaging.
- Nếu là phần mềm nghiệp vụ chính, vẫn có khoảng trống ở lớp AI summary/reply/handover.
- Dữ liệu Zalo/email/file scan vẫn có thể nằm ngoài.

### 9.7. Zendesk/Freshdesk/HubSpot/Salesforce/Intercom

Đây là nhóm customer service platform tổng quát.

Điểm mạnh:

- Quản lý ticket/inbox/SLA tốt.
- Có AI support mạnh.
- Có reply suggestion, ticket summary, routing.
- Có omnichannel.
- Có khả năng scale đội CS.

Điểm yếu/cửa hẹp:

- Không phải logistics-specific.
- Muốn trả lời câu hỏi shipment phải tích hợp dữ liệu logistics trước.
- Nếu không có shipment timeline, AI chỉ tóm tắt hội thoại, không tóm tắt vận hành.
- Không có ngữ cảnh local logistics Việt Nam.

Hàm ý cho Agentify:

- Có thể tích hợp với CRM/help desk sau này.
- MVP nên thắng ở logistics context, không thắng ở generic ticketing.

### 9.8. Zalo OA/Zalo Cloud API

Zalo OA/Zalo Cloud API là hạ tầng messaging/customer engagement tại Việt Nam.

Điểm mạnh:

- Phù hợp hành vi giao tiếp thị trường Việt Nam.
- Có API và các dạng thông báo doanh nghiệp.
- Có thể dùng cho customer notification, tư vấn, ZNS.

Điểm yếu/cửa hẹp:

- Không phải hệ thống logistics.
- Không có shipment timeline.
- Không biết exception, free time, D/O, trucking, warehouse.
- Tự động gửi tin sai có thể làm tăng rủi ro quan hệ khách hàng.

Hàm ý cho Agentify:

- Nên xem Zalo là kênh dữ liệu/giao tiếp, không phải đối thủ trực tiếp.
- Giai đoạn đầu nên dùng Zalo ở mức: lưu nội dung, link evidence, tạo nháp, hoặc đồng bộ qua API khi khách đã có OA.

---

## 10. Cơ hội sản phẩm cho Agentify

### 10.1. Khoảng trống chính

Khoảng trống không phải là "thị trường thiếu phần mềm chat" hoặc "thiếu phần mềm tracking".

Khoảng trống là:

> Thiếu một lớp trung gian hiểu shipment, đọc dữ liệu phân mảnh, phát hiện exception, và giúp CS/Ops trả lời khách nhanh, đúng, có ngữ cảnh.

Lớp này nằm giữa:

- Core logistics systems.
- Excel/Google Sheet.
- Email/Zalo.
- Carrier/port/customs/trucking/warehouse data.
- CRM/help desk.
- Người CS/Ops/Account.

### 10.2. Định vị đề xuất

Tên định vị:

```text
Agentify Logistics CS/Ops Copilot
```

Mô tả một câu:

> Agentify giúp đội CS/Ops logistics gom trạng thái shipment từ Excel, email, Zalo, chứng từ và các hệ thống vận hành; tự tóm tắt tình hình, cảnh báo lô hàng có vấn đề, soạn nháp câu trả lời cho khách và tạo handover summary để không bỏ sót việc.

### 10.3. Agentify nên làm gì

Agentify nên:

- Tạo shipment workspace.
- Tạo timeline theo shipment/container/PO.
- Gom dữ liệu từ Excel, email, file, manual update.
- Gắn evidence vào từng trạng thái.
- Phân loại shipment bình thường và shipment có exception.
- Tóm tắt trạng thái hiện tại bằng tiếng Việt/tiếng Anh.
- Soạn nháp email/Zalo trả lời khách.
- Đặt follow-up reminder.
- Tạo handover summary.
- Tạo daily status report.
- Tạo customer-specific template.

### 10.4. Agentify không nên làm trong MVP

Agentify không nên:

- Tự gửi tin cho khách mà không có người duyệt.
- Tự cam kết ETA/ETD chắc chắn.
- Tự khai hải quan.
- Tự sửa chứng từ pháp lý.
- Tự duyệt chi phí.
- Tự xuất hóa đơn.
- Tự thay thế TMS/WMS/ERP.
- Tự động đọc tin nhắn cá nhân nếu chưa có consent và cơ chế bảo mật rõ.

### 10.5. Vì sao cơ hội này hợp lý

Lý do thị trường:

- Logistics Việt Nam có volume XNK lớn.
- Nhiều bên tham gia trong một shipment.
- Dữ liệu phân mảnh.
- Email/Zalo/Excel vẫn phổ biến.
- Khách hàng ngày càng kỳ vọng cập nhật nhanh hơn.
- AI customer service đang trở thành xu hướng.
- Nhưng sản phẩm AI CS tổng quát không hiểu logistics.

Lý do sản phẩm:

- Use case lặp lại hằng ngày.
- Dữ liệu ban đầu có thể lấy từ file/email/manual update, không cần API sâu ngay.
- Người dùng cuối rõ: CS/Ops/Account.
- ROI đo được bằng thời gian phản hồi và số lỗi/follow-up bỏ sót.
- Có thể mở rộng sang các cụm khác sau khi có shipment timeline.

---

## 11. MVP đề xuất

### 11.1. Tên MVP

```text
Agentify Logistics CS Copilot
```

### 11.2. ICP ưu tiên

ICP đề xuất:

> Forwarder hoặc 3PL vừa và nhỏ tại Việt Nam, xử lý 50-500 shipment/tháng, có 2-10 nhân viên CS/Ops, đang dùng Excel/email/Zalo/phần mềm rời rạc để tracking và trả lời khách.

Ưu tiên luồng:

```text
Sea import FCL
```

Lý do chọn sea import FCL:

- Có nhiều trạng thái dễ gây câu hỏi: arrival, D/O, customs clearance, port release, trucking, warehouse delivery, empty return.
- Có nhiều rủi ro phí: storage, demurrage, detention.
- Có nhiều bên tham gia: hãng tàu, cảng, broker, trucking, kho, kế toán.
- Khách thường hỏi nhiều vì hàng nhập ảnh hưởng sản xuất/bán hàng.

### 11.3. Dữ liệu MVP

Nguồn dữ liệu ban đầu:

- Excel/Google Sheet shipment tracking.
- Email upload/forward vào Agentify.
- File chứng từ: booking, arrival notice, D/O, B/L, invoice, packing list, POD, GRN.
- Manual status update từ CS/Ops.
- Link tracking carrier/port nếu có.
- Ảnh/bằng chứng upload từ Zalo hoặc điện thoại.

Chưa cần:

- API sâu với mọi hãng tàu.
- API VNACCS/ECUS.
- API ePort toàn bộ cảng.
- API TMS/WMS/kế toán trong giai đoạn đầu.

### 11.4. Tính năng MVP

#### Tính năng 1: Shipment workspace

Mỗi shipment có một trang riêng chứa:

- Customer.
- Shipment number/job number.
- PO nếu có.
- Container number.
- MBL/HBL.
- ETA/ETD/ATA/ATD.
- Port of loading/port of discharge.
- Current status.
- Person in charge.
- Documents.
- Evidence.
- Open tasks.
- Customer questions.

#### Tính năng 2: Unified timeline

Timeline hiển thị các mốc:

```text
Booking confirmed
On board
ETA updated
Arrived at port
Arrival notice received
D/O pending/available
Customs pending/cleared
Port charges pending/paid
Truck booked
Container picked up
Delivered to warehouse
POD/GRN received
Empty returned
Closed
```

Mỗi mốc nên có:

- Thời gian.
- Nguồn dữ liệu.
- Người cập nhật.
- Evidence nếu có.
- Mức độ tin cậy.

#### Tính năng 3: AI status summary

Agentify tạo summary như:

```text
Shipment hiện đã đến cảng Cát Lái ngày 08/06. Arrival notice đã nhận, D/O đang chờ thanh toán local charges. Tờ khai chưa có thông tin thông quan trong dữ liệu hiện tại. Xe chưa được book. Rủi ro chính: nếu chưa thông quan và chưa lấy hàng trước 11/06, có thể phát sinh storage/detention. Việc cần làm tiếp: xác nhận tình trạng tờ khai với broker và book xe sau khi có D/O.
```

Summary phải chỉ rõ:

- Trạng thái mới nhất.
- Dữ liệu nào chắc.
- Dữ liệu nào còn thiếu.
- Rủi ro.
- Next action.

#### Tính năng 4: Customer reply draft

Agentify soạn nháp trả lời khách:

```text
Chị ơi, em cập nhật shipment ABC như sau:

- Hàng đã đến cảng Cát Lái ngày 08/06.
- Bên em đã nhận arrival notice.
- D/O hiện đang chờ hoàn tất local charges.
- Tờ khai đang được kiểm tra lại với broker.

Dự kiến sau khi có D/O và xác nhận thông quan, bên em sẽ điều xe lấy container về kho. Em sẽ cập nhật lại cho chị trước 15:00 hôm nay.
```

CS có thể sửa và gửi qua email/Zalo.

#### Tính năng 5: Exception inbox

Exception inbox là danh sách shipment cần chú ý.

Ví dụ rule:

- ETA đã qua nhưng chưa có arrival notice.
- Hàng đã arrived nhưng chưa có D/O.
- D/O có nhưng chưa thanh toán.
- Tờ khai chưa thông quan khi gần hết free time.
- Truck chưa book trước ngày giao.
- POD/GRN chưa có sau khi giao.
- Khách hỏi nhưng quá SLA chưa trả lời.
- Có câu "em check lại" nhưng chưa follow-up.

#### Tính năng 6: Follow-up reminder

Khi CS trả lời:

```text
"Em sẽ cập nhật lại trước 15:00."
```

Agentify tạo reminder tự động:

```text
Follow-up customer A, shipment ABC, trước 15:00.
```

#### Tính năng 7: Handover summary

Cuối ngày hoặc khi nghỉ phép, Agentify tạo:

```text
Handover ngày 08/06

Shipment cần xử lý gấp:
1. ABCU1234567 - chờ D/O, cần follow-up local charges trước 10:00 mai.
2. XYZU7654321 - khách yêu cầu POD, kho chưa gửi GRN.
3. PO-8891 - ETA đổi từ 10/06 sang 12/06, cần báo khách.

Việc đã hứa với khách:
- Khách Minh An: cập nhật tình trạng thông quan trước 15:00.
- Khách Hòa Phát: gửi ảnh POD sau khi kho xác nhận.
```

#### Tính năng 8: Daily status report

Agentify tạo báo cáo theo khách:

| Shipment | Container | Current status | Risk | Next action | Owner |
|---|---|---|---|---|---|
| SHP001 | ABCU1234567 | Arrived, D/O pending | Medium | Pay local charges | Ops A |
| SHP002 | XYZU7654321 | Delivered, POD pending | Low | Request POD from warehouse | CS B |
| SHP003 | DEFU1111111 | Customs pending | High | Follow broker | Ops C |

### 11.5. Màn hình MVP tối thiểu

MVP cần 5 màn hình:

1. Shipment list.
2. Shipment detail/timeline.
3. Exception inbox.
4. AI reply composer.
5. Handover/daily report.

---

## 12. Ví dụ hoạt động cụ thể của Agentify

### Ví dụ 1: Khách hỏi container đã lấy khỏi cảng chưa

Bối cảnh:

- Khách nhập khẩu linh kiện sản xuất.
- Container ABCU1234567 đã đến Cát Lái.
- Khách hỏi qua Zalo: "Container này lấy khỏi cảng chưa em? Mai bên chị cần hàng cho sản xuất."

Cách làm thủ công:

1. CS mở file tracking.
2. Thấy ETA đã qua nhưng status chưa cập nhật.
3. CS hỏi Ops.
4. Ops hỏi trucking.
5. Trucking trả lời xe đang chờ lệnh vào cảng.
6. CS hỏi broker xem đã thông quan chưa.
7. Broker nói tờ khai đã thông quan nhưng D/O chưa thanh toán xong local charges.
8. CS tổng hợp trả lời khách sau 20-30 phút.

Cách Agentify hỗ trợ:

1. CS mở shipment ABCU1234567 trong Agentify.
2. Agentify hiển thị timeline:

```text
08/06 08:20 - Vessel arrived at Cat Lai
08/06 10:15 - Arrival notice uploaded
08/06 14:40 - Customs cleared, source: broker update
09/06 09:10 - D/O pending local charges payment
09/06 09:30 - Truck not yet dispatched
```

3. Agentify cảnh báo:

```text
Container chưa lấy khỏi cảng. Nguyên nhân hiện tại: D/O chưa release do local charges chưa hoàn tất. Rủi ro: nếu không lấy trước 11/06 có thể phát sinh storage/detention. Việc cần làm: xác nhận kế toán thanh toán local charges, sau đó điều xe.
```

4. Agentify soạn nháp:

```text
Chị ơi, container ABCU1234567 hiện chưa lấy khỏi cảng. Hàng đã đến Cát Lái và tờ khai đã thông quan, nhưng D/O đang chờ hoàn tất local charges. Bên em đang follow kế toán/ops để release D/O và sẽ điều xe ngay sau khi release. Em sẽ cập nhật lại cho chị trước 14:00 hôm nay.
```

Giá trị:

- CS không phải hỏi 3 người từ đầu.
- Khách nhận câu trả lời có nguyên nhân, không chỉ "đang check".
- Có reminder follow-up trước 14:00.
- Nếu phí sắp phát sinh, Ops/Account thấy sớm.

### Ví dụ 2: Account nghỉ phép, người khác phải tiếp quản khách lớn

Bối cảnh:

- Account A phụ trách khách lớn có 30 shipment đang chạy.
- Account A nghỉ phép 3 ngày.
- Account B tiếp quản tạm.
- Khách hỏi: "Các lô nào tuần này có rủi ro trễ?"

Cách làm thủ công:

1. Account B đọc Excel tracking.
2. Tìm email cũ của Account A.
3. Hỏi CS/Ops từng shipment.
4. Đọc nhóm Zalo.
5. Dễ bỏ sót việc Account A đã hứa với khách.

Cách Agentify hỗ trợ:

Agentify tạo handover:

```text
Khách: ABC Manufacturing

Tổng quan:
- 30 shipment đang mở.
- 21 shipment bình thường.
- 6 shipment cần theo dõi.
- 3 shipment rủi ro cao.

Rủi ro cao:
1. SHP-1008: ETA đổi từ 10/06 sang 12/06, cần báo kế hoạch sản xuất.
2. SHP-1012: thiếu C/O bản gốc, rủi ro chậm thông quan.
3. SHP-1019: container đã giao kho nhưng chưa có GRN/POD.

Việc đã hứa:
- Gửi status report mỗi ngày trước 10:00.
- Cập nhật SHP-1012 khi có C/O trước 15:00 hôm nay.
```

Agentify soạn nháp trả lời khách:

```text
Anh/chị ơi, em tổng hợp nhanh các lô tuần này:

- Phần lớn shipment đang đi đúng kế hoạch.
- Có 3 lô cần chú ý: SHP-1008 bị đổi ETA sang 12/06, SHP-1012 đang chờ C/O, SHP-1019 đã giao kho nhưng đang chờ GRN/POD.
- Em sẽ gửi bảng status chi tiết trước 10:00 và follow riêng 3 lô này trong ngày.
```

Giá trị:

- Người thay ca không phải đọc lại toàn bộ lịch sử.
- Khách thấy việc bàn giao không làm mất chất lượng dịch vụ.
- Manager giảm rủi ro phụ thuộc cá nhân.

### Ví dụ 3: Khách hỏi vì sao hàng trễ

Bối cảnh:

- Shipment bị trễ giao kho.
- Khách hỏi qua email: "Vì sao lô này trễ? Có phải bên bạn không book xe kịp không?"

Cách Agentify hỗ trợ:

Agentify đọc timeline:

```text
ETA ban đầu: 05/06
ETA cập nhật: 07/06 do vessel delay
Arrival notice nhận: 07/06 11:20
Customs documents submitted: 07/06 15:00
Customs cleared: 08/06 16:30
Truck booked: 08/06 17:00
Warehouse slot available: 09/06 13:00
Delivered: 09/06 15:40
```

Agentify tóm tắt:

```text
Nguyên nhân trễ chính không phải do book xe muộn. Shipment bị trễ 2 ngày do vessel delay từ hãng tàu. Sau khi hàng đến, chứng từ và thông quan hoàn tất trong ngày tiếp theo; xe được book sau khi thông quan. Có thể giải thích cho khách theo timeline và kèm mốc giờ.
```

Nháp trả lời:

```text
Anh/chị ơi, em kiểm tra lại timeline lô này. Nguyên nhân trễ chính đến từ việc tàu cập cảng muộn hơn lịch ban đầu 2 ngày. Sau khi hàng đến ngày 07/06, bên em nộp chứng từ trong ngày, tờ khai thông quan lúc 16:30 ngày 08/06 và xe được book ngay sau đó. Hàng đã giao kho lúc 15:40 ngày 09/06.

Em gửi kèm timeline để anh/chị dễ đối chiếu. Bên em sẽ tiếp tục theo dõi sát các lô còn lại để báo sớm nếu ETA thay đổi.
```

Giá trị:

- Câu trả lời có timeline, giảm tranh cãi cảm tính.
- CS không đổ lỗi mơ hồ.
- Account có dữ liệu để xử lý quan hệ khách hàng.

---

## 13. Câu hỏi phỏng vấn định tính

### 13.1. Câu hỏi cho CS logistics

1. Một ngày bạn nhận khoảng bao nhiêu câu hỏi trạng thái từ khách?
2. Khách thường hỏi qua kênh nào: email, Zalo, điện thoại, portal?
3. Câu hỏi phổ biến nhất là gì?
4. Một câu hỏi "hàng đang ở đâu" thường mất bao lâu để trả lời?
5. Bạn phải mở những hệ thống/file nào để trả lời?
6. Bạn có phải hỏi Ops/trucking/kho/docs/kế toán không?
7. Có câu hỏi nào bạn không trả lời được ngay dù dữ liệu công ty có?
8. Bạn có template trả lời khách không?
9. Có từng trả lời sai status chưa? Nguyên nhân là gì?
10. Có từng quên follow-up sau khi nói "em check lại" không?
11. Khi nghỉ phép, bạn bàn giao shipment như thế nào?
12. Khách có phàn nàn vì cập nhật chậm không?
13. Nếu có AI tóm tắt trạng thái và soạn nháp trả lời, bạn muốn nó hiển thị gì?
14. Bạn sợ AI trả lời sai ở điểm nào?
15. Bạn có sẵn sàng dùng nếu AI chỉ soạn nháp và bạn duyệt trước khi gửi không?

### 13.2. Câu hỏi cho Ops

1. CS thường hỏi bạn những thông tin gì?
2. Bạn cập nhật status cho CS bằng cách nào?
3. Status nào hay bị thiếu hoặc cập nhật muộn?
4. Bạn có dùng Excel/TMS/Zalo/email song song không?
5. Có shipment nào bị trễ vì thông tin không đến đúng người không?
6. Khi có exception, ai là người báo khách?
7. Bạn có muốn hệ thống tự tạo summary cho CS không?
8. Bạn muốn tránh AI làm gì?

### 13.3. Câu hỏi cho Account/Sales

1. Khách lớn thường hỏi gì về shipment?
2. Khi khách phàn nàn, bạn lấy dữ liệu từ đâu để trả lời?
3. Bạn có nhìn được tất cả shipment của một khách không?
4. Bạn có biết shipment nào có rủi ro trước khi khách hỏi không?
5. Bạn có daily/weekly business review với khách không?
6. Status report hiện làm thủ công hay tự động?
7. Việc trả lời chậm ảnh hưởng đến renewal/giữ khách không?
8. Bạn có sẵn sàng trả phí cho công cụ giúp giảm escalation không?

### 13.4. Câu hỏi cho Operations manager

1. Đội CS/Ops có KPI response time không?
2. Một nhân viên CS/Ops quản lý bao nhiêu shipment?
3. Công ty đo lỗi trả lời sai/chậm như thế nào?
4. Có bao nhiêu thời gian bị mất vì tra cứu và hỏi nội bộ?
5. Có khách nào yêu cầu portal/status report không?
6. Có vấn đề handover khi nhân viên nghỉ hoặc đổi ca không?
7. Nếu giảm 30-50% thời gian trả lời status, giá trị với công ty là gì?
8. Điều kiện để công ty pilot một tool mới là gì?

### 13.5. Câu hỏi cho khách/chủ hàng nhận status

1. Bạn muốn nhận status shipment qua kênh nào?
2. Bạn thường hỏi nhà cung cấp logistics những câu gì?
3. Bạn có hài lòng với tốc độ phản hồi hiện tại không?
4. Điều gì làm bạn tin một status update là đáng tin?
5. Bạn muốn thấy timeline hay chỉ cần summary?
6. Bạn có muốn nhận cảnh báo trước khi trễ/phát sinh phí không?
7. Bạn có dùng portal nếu forwarder cung cấp không?
8. Bạn vẫn muốn có người phụ trách xác nhận không?

---

## 14. Survey định lượng đề xuất

### 14.1. Thông tin doanh nghiệp

1. Doanh nghiệp của bạn thuộc nhóm nào?
   - Forwarder
   - 3PL
   - Chủ hàng XNK
   - Trucking
   - Kho/warehouse
   - Đại lý hải quan
   - Khác

2. Số shipment/container xử lý mỗi tháng?
   - Dưới 50
   - 50-100
   - 101-300
   - 301-500
   - Trên 500

3. Đội CS/Ops có bao nhiêu người?
   - 1-2
   - 3-5
   - 6-10
   - Trên 10

### 14.2. Tần suất câu hỏi trạng thái

4. Trung bình mỗi ngày bạn nhận bao nhiêu câu hỏi trạng thái từ khách/nội bộ?
   - Dưới 10
   - 10-30
   - 31-50
   - 51-100
   - Trên 100

5. Một câu hỏi trạng thái mất bao lâu để trả lời?
   - Dưới 2 phút
   - 2-5 phút
   - 6-10 phút
   - 11-20 phút
   - Trên 20 phút

6. Bạn thường phải kiểm tra bao nhiêu nguồn dữ liệu?
   - 1 nguồn
   - 2-3 nguồn
   - 4-5 nguồn
   - Trên 5 nguồn

### 14.3. Kênh giao tiếp

7. Khách thường hỏi qua kênh nào?
   - Email
   - Zalo
   - Điện thoại
   - WhatsApp
   - Portal
   - Khác

8. Driver/vendor nội bộ cập nhật qua kênh nào?
   - Zalo
   - Điện thoại
   - App/TMS
   - Email
   - Excel/Google Sheet
   - Khác

### 14.4. Pain và lỗi

9. Bạn gặp vấn đề nào thường xuyên?
   - Trả lời chậm
   - Không đủ dữ liệu
   - Phải hỏi nhiều người
   - Quên follow-up
   - Trả lời sai status
   - Handover kém
   - Khách phàn nàn vì thiếu cập nhật
   - Không có report tự động

10. Trong 1 tháng gần nhất, có bao nhiêu lần khách phải hỏi lại vì chưa được cập nhật?
   - 0
   - 1-5
   - 6-10
   - 11-20
   - Trên 20

11. Mức độ đau của việc trả lời status thủ công?
   - 1: Không đau
   - 2
   - 3
   - 4
   - 5: Rất đau

### 14.5. Nhu cầu sản phẩm

12. Bạn có muốn AI tóm tắt trạng thái shipment không?
   - Có
   - Không
   - Chưa chắc

13. Bạn có muốn AI soạn nháp câu trả lời khách không?
   - Có, nếu tôi được duyệt trước
   - Có, có thể tự gửi một số trường hợp
   - Không
   - Chưa chắc

14. Tính năng nào quan trọng nhất?
   - Shipment timeline
   - AI status summary
   - Draft email/Zalo trả lời khách
   - Exception inbox
   - Follow-up reminder
   - Handover summary
   - Daily status report
   - Customer portal

15. Công ty có sẵn sàng pilot công cụ này không?
   - Có, trong 1 tháng
   - Có, trong 3 tháng
   - Có thể nếu giá hợp lý
   - Chưa sẵn sàng

16. Mức phí pilot hợp lý/tháng với đội nhỏ?
   - Dưới 2 triệu VND
   - 2-5 triệu VND
   - 5-10 triệu VND
   - 10-20 triệu VND
   - Trên 20 triệu VND nếu ROI rõ

---

## 15. Mô hình ROI sơ bộ

### 15.1. ROI theo thời gian tiết kiệm

Công thức:

```text
Giờ tiết kiệm/tháng
= số nhân viên CS/Ops
x số câu hỏi/người/ngày
x phút xử lý/câu
x số ngày làm việc/tháng
x tỷ lệ giảm thời gian nhờ Agentify
/ 60
```

Ví dụ:

```text
5 nhân viên
x 20 câu hỏi/ngày
x 8 phút/câu
x 22 ngày
x 40%
/ 60
= 117,3 giờ tiết kiệm/tháng
```

Nếu chi phí nhân sự fully loaded là 12-20 triệu VND/người/tháng, tiết kiệm thời gian này có thể tương đương một phần đáng kể chi phí nhân sự, hoặc giúp cùng đội xử lý volume cao hơn.

### 15.2. ROI theo giảm lỗi

Các lỗi có thể giảm:

- Trả lời sai status.
- Quên follow-up.
- Không báo delay kịp.
- Không cảnh báo free time.
- Không gửi POD/GRN.
- Handover thiếu thông tin.

Tác động tài chính:

- Giảm phí phát sinh do xử lý muộn.
- Giảm escalation.
- Giảm thời gian quản lý can thiệp.
- Giữ khách tốt hơn.
- Tăng khả năng nhận thêm shipment từ khách hiện tại.

### 15.3. ROI theo chất lượng dịch vụ

Agentify có thể giúp doanh nghiệp tạo điểm khác biệt:

- Trả lời nhanh hơn.
- Trả lời nhất quán hơn.
- Có timeline và bằng chứng.
- Báo trước rủi ro thay vì đợi khách hỏi.
- Có daily report chuyên nghiệp hơn.

Với forwarder/3PL vừa và nhỏ, đây có thể là lợi thế cạnh tranh khi đấu với nhà cung cấp lớn hơn.

---

## 16. Giả thuyết cần kiểm chứng

### 16.1. Giả thuyết về pain

1. CS/Ops nhận nhiều câu hỏi trạng thái mỗi ngày, đặc biệt với hàng nhập FCL.
2. Một câu hỏi trạng thái thường cần kiểm tra 3-6 nguồn dữ liệu.
3. Thời gian trả lời trung bình đủ lớn để tạo ROI.
4. Zalo/email là kênh chính, portal nếu có vẫn không thay thế hoàn toàn.
5. Handover và follow-up là pain thật, không chỉ là vấn đề phụ.

### 16.2. Giả thuyết về sản phẩm

1. Người dùng muốn AI hỗ trợ soạn nháp nhưng vẫn muốn duyệt trước khi gửi.
2. Shipment timeline + AI summary là cặp tính năng cốt lõi.
3. Exception inbox quan trọng hơn chatbot tự động.
4. Follow-up reminder giúp giảm lỗi rõ rệt.
5. Daily status report là tính năng dễ bán cho manager/account.

### 16.3. Giả thuyết về dữ liệu

1. MVP có thể bắt đầu từ Excel, email upload, file chứng từ và manual update.
2. Không cần tích hợp API sâu ngay để chứng minh giá trị.
3. Nguồn dữ liệu khó nhất là Zalo cá nhân/nhóm và thông tin cập nhật qua miệng.
4. Cần quy tắc đặt mã shipment/container trong chat/email để Agentify match dữ liệu tốt.

### 16.4. Giả thuyết về willingness to pay

1. Forwarder/3PL sẵn sàng trả nếu giảm được thời gian CS/Ops và tăng chất lượng trả lời khách.
2. Manager dễ mua hơn nếu có dashboard đo response time, unresolved exceptions và missed follow-up.
3. Khách hàng lớn có thể yêu cầu forwarder dùng công cụ status report tốt hơn.
4. Giá pilot nên đủ thấp để thử nhanh, nhưng gắn với volume shipment hoặc số user để scale.

---

## 17. Tính khả thi cho Agentify

### 17.1. Khả thi về dữ liệu

Khả thi cao hơn nhiều cụm khác vì MVP không cần ghi vào hệ thống pháp lý.

Nguồn dễ lấy:

- Excel tracking sheet.
- Email forward/upload.
- PDF chứng từ.
- Ảnh POD/GRN/EIR.
- Manual status update.
- Customer question text.

Nguồn khó hơn:

- Zalo cá nhân/nhóm vì vấn đề quyền truy cập, bảo mật và chính sách nền tảng.
- API carrier/port không đồng nhất.
- TMS/WMS/kế toán cũ không có API.
- Dữ liệu shipment thiếu mã chuẩn.

Cách xử lý:

- Bắt đầu bằng file/email/manual update.
- Cho người dùng paste/import tin nhắn quan trọng.
- Khuyến khích dùng shipment code/container number trong mọi update.
- Tích hợp Zalo OA/API sau nếu khách có nhu cầu và consent rõ.

### 17.2. Khả thi về kỹ thuật

Module kỹ thuật cần có:

- Shipment data model.
- Timeline event model.
- Document/evidence linking.
- Status extraction từ email/file.
- Rule engine cho exception.
- AI summarization.
- AI reply drafting.
- Reminder/follow-up.
- Handover summary.
- Basic role/permission.

Rủi ro kỹ thuật:

- Dữ liệu không chuẩn.
- Một shipment có nhiều mã: job, booking, container, MBL, HBL, PO.
- Tin nhắn ngắn, thiếu ngữ cảnh.
- AI có thể suy luận quá mức nếu không ràng buộc nguồn.
- Tiếng Việt logistics có nhiều viết tắt.

Cách giảm rủi ro:

- Mọi câu trả lời phải có source/evidence.
- AI chỉ nói "chưa thấy dữ liệu" nếu thiếu nguồn, không tự đoán.
- Human approval trước khi gửi khách.
- Confidence score cho dữ liệu được trích xuất.
- Bắt đầu với luồng sea import FCL có taxonomy rõ.

### 17.3. Khả thi về adoption

Adoption có thể tốt nếu Agentify giảm việc, không bắt người dùng nhập thêm quá nhiều.

Nguyên tắc:

- Không bắt CS đổi toàn bộ workflow ngay.
- Cho import Excel hiện có.
- Cho upload/forward email.
- Cho copy-paste customer question.
- Trả lại output dùng được ngay: summary, draft reply, follow-up, report.

Nếu sản phẩm chỉ là "thêm một hệ thống để cập nhật", adoption sẽ thấp.

### 17.4. Rủi ro bảo mật và quan hệ khách hàng

Agentify xử lý nhiều thông tin nhạy cảm:

- Tên khách hàng.
- Giá/chi phí.
- Chứng từ xuất nhập khẩu.
- Lịch giao hàng.
- Email nội bộ.
- Tin nhắn khách/vendor.

Cần thiết kế:

- Phân quyền theo customer/shipment.
- Audit log.
- Không tự gửi ra ngoài nếu chưa duyệt.
- Mask thông tin chi phí khi soạn reply cho khách nếu không được phép.
- Không ingest tin nhắn cá nhân nếu chưa có quy trình consent.
- Lưu nguồn dữ liệu để kiểm tra khi có tranh chấp.

### 17.5. Khả thi triển khai 4-8 tuần

Tuần 1-2:

- Chốt ICP pilot.
- Lấy 1-2 file tracking thật.
- Thiết kế shipment workspace.
- Import Excel/Google Sheet.

Tuần 3-4:

- Timeline event model.
- Manual status update.
- Document/evidence upload.
- AI status summary bản đầu.

Tuần 5-6:

- Customer reply draft.
- Exception inbox rule cơ bản.
- Follow-up reminder.
- Handover summary.

Tuần 7-8:

- Pilot với 1 đội CS/Ops.
- Đo thời gian trả lời trước/sau.
- Đo số follow-up không bị bỏ sót.
- Chỉnh template theo giọng văn khách.

---

## 18. Kết luận sơ bộ Cụm 8

Cụm CS/Ops/Account trả lời khách là cụm có tiềm năng MVP cao nhất đến hiện tại.

Kết luận chính:

1. CS/Ops là nơi pain của tất cả cụm trước hội tụ: hải quan, cảng, booking, chứng từ, trucking, kho, chi phí.
2. Vấn đề không chỉ là thiếu tracking, mà là thiếu câu trả lời có ngữ cảnh, có bằng chứng, có next action.
3. Thị trường đã có visibility platform, forwarding software, CRM/help desk và messaging tool, nhưng vẫn có khoảng trống cho logistics-specific CS/Ops copilot tại Việt Nam.
4. Agentify nên tránh cạnh tranh trực diện với TMS/WMS/ERP/CRM. Nên làm lớp trung gian gom dữ liệu, tóm tắt, cảnh báo và soạn nháp.
5. MVP nên bắt đầu với sea import FCL cho forwarder/3PL vừa và nhỏ.
6. Giá trị đầu tiên là giảm thời gian trả lời status, giảm missed follow-up, giảm handover risk và tăng chất lượng status report.
7. Rủi ro lớn nhất là AI trả lời sai hoặc gửi thông tin nhạy cảm. Vì vậy cần human-in-the-loop, source-linked summary và quyền duyệt rõ.

Đề xuất quyết định:

> Ưu tiên Cụm 8 làm hướng MVP chính của Agentify. Các cụm 1-7 nên được xem là nguồn dữ liệu và exception feeding vào Cụm 8. Nói cách khác, Agentify nên bắt đầu từ câu hỏi khách hàng hay hỏi nhất: "lô hàng đang ở đâu và có vấn đề gì không?", sau đó mở rộng dần sang chứng từ, trucking, kho và chi phí.

---

## 19. Nguồn tham khảo

1. Tổng cục Thống kê. Press release on social-economic situation in the fourth quarter and 2025. https://www.nso.gov.vn/en/data-and-statistics/2026/01/press-release-social-economic-situation-in-the-fourth-quarter-and-2025/
2. Vietnam Logistics Portal. Vietnam Government approves logistics services development strategy towards 2035. https://logistics.gov.vn/vietnam-gov-t-approves-logistics-services-development-strategy-towards-2025
3. DataReportal. Digital 2025: Vietnam. https://datareportal.com/reports/digital-2025-vietnam
4. VietnamNet. Zalo's number of users hits 78.3 million. https://vietnamnet.vn/en/zalo-s-number-of-users-hits-78-3-million-putting-telcos-at-pipeline-trap-2436470.html
5. Zalo Cloud. Bảng giá dịch vụ OA. https://zalo.cloud/oa/pricing
6. Zalo Cloud. Phân biệt các hình thức gửi thông báo từ Zalo Official Account. https://zalo.cloud/blog/phan-biet-cac-hinh-thuc-gui-thong-bao-tu-zalo-official-account/kgurdwaed9ynwgp9q
7. project44. Ocean Visibility. https://www.project44.com/platform/visibility/ocean/
8. project44. Supply Chain Visibility Software. https://www.project44.com/platform/visibility/
9. FourKites. Ocean Freight Visibility and Tracking Software. https://www.fourkites.com/platform/ocean-freight-visibility/
10. FourKites. The Rapid Rise of Ocean Freight Visibility. https://www.fourkites.com/blogs/the-rapid-rise-of-ocean-freight-visibility/
11. GoFreight. Shipment Tracking & Operations Software. https://gofreight.com/product/shipment-tracking-operations/
12. GoFreight. Tracking Portal. https://www.gofreight.com/tracking-portal
13. GoFreight. AI-Powered Freight Forwarding Software. https://gofreight.com/
14. Magaya. Logistics Software That Moves Freight Forward. https://www.magaya.com/
15. Magaya. Digital Freight Forwarding Platform. https://www.magaya.com/digital-freight-portal/
16. CargoWise. Centralize global logistics operations on a single platform. https://www.cargowise.com/
17. HubSpot. AI-Powered Help Desk Software. https://www.hubspot.com/products/service/help-desk
18. Salesforce. AI for Customer Service & Support. https://www.salesforce.com/service/ai/
19. Zendesk. 2025 CX Trends Report press release. https://www.zendesk.com/newsroom/press-releases/zendesk-2025-cx-trends-report-human-centric-ai-drives-loyalty/
20. Freshworks. Freshdesk customer service software. https://www.freshworks.com/freshdesk/
21. Intercom. Fin AI customer service. https://www.intercom.com/blog/announcing-fin-apex-the-age-of-vertical-models-is-here/
22. Winta Logistics. Phần mềm quản lý logistics. https://www.winta.com.vn/phan-mem-quan-ly-logistics.html

---

## 20. Tóm tắt compact sau Cụm 8

Đã hoàn thành research Cụm 8: Customer Service, Operations và Account trả lời khách.

Insight chính:

- Cụm 8 là nơi pain của các cụm trước hội tụ. CS/Ops/Account phải trả lời khách dù dữ liệu nằm rải rác ở hải quan, cảng, carrier, trucking, kho, kế toán, Excel, email và Zalo.
- Câu hỏi cốt lõi của khách là: hàng đang ở đâu, có vấn đề gì không, vì sao trễ, ai đang xử lý, khi nào cập nhật tiếp, có phát sinh phí không.
- Pain lớn nhất: mất thời gian tra cứu nhiều nguồn, phải hỏi nội bộ, trả lời chậm, thông tin không nhất quán, handover kém, quên follow-up, thiếu bằng chứng, khó biết shipment nào cần ưu tiên.
- Thị trường đã có nhiều nhóm sản phẩm: forwarding/TMS/ERP logistics, visibility platform, CRM/help desk, messaging platform và Excel/Sheet. Nhưng chưa có lớp logistics-specific CS/Ops copilot nhẹ, địa phương hóa cho Việt Nam.
- Đối thủ/liên quan quan trọng: project44, FourKites, GoFreight, Magaya, CargoWise, Winta Logistics, Zendesk, Freshdesk, HubSpot, Salesforce, Intercom, Zalo OA/Zalo Cloud.
- Agentify không nên thay TMS/WMS/ERP/CRM hoặc tự động gửi thông tin cho khách trong MVP.
- Cơ hội tốt nhất là Agentify Logistics CS/Ops Copilot: shipment workspace, unified timeline, AI status summary, customer reply draft, exception inbox, follow-up reminder, handover summary và daily status report.
- ICP ưu tiên: forwarder/3PL vừa và nhỏ tại Việt Nam, 50-500 shipment/tháng, 2-10 nhân viên CS/Ops, đang dùng Excel/email/Zalo/phần mềm rời rạc.
- Luồng MVP nên bắt đầu với sea import FCL vì có nhiều trạng thái, nhiều bên tham gia, nhiều câu hỏi và nhiều rủi ro phí.
- ROI có thể đo bằng thời gian trả lời status tiết kiệm, số missed follow-up giảm, số escalation giảm, chất lượng status report tăng.
- Rủi ro chính: AI hallucination, trả lời sai ETA, lộ thông tin nhạy cảm, tự gửi cho khách khi chưa duyệt. Cần human-in-the-loop, source-linked answer, audit trail và permission rõ.

Khuyến nghị sau cụm này:

- Ưu tiên Cụm 8 làm hướng MVP chính của Agentify.
- Các cụm 1-7 nên được đưa vào như nguồn dữ liệu/exception feed cho Cụm 8.
- Tiếp tục Cụm 9 để nghiên cứu sâu Excel, email, Zalo và file thủ công, vì đây là nguồn dữ liệu đầu vào quan trọng nhất cho MVP.
