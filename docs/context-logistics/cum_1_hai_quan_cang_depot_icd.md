# Cụm 1: Hải quan, cảng, depot/ICD và PCS/PORTNET

## 1. Mục tiêu khảo sát cụm này

Cụm này dùng để hiểu các điểm chạm quan trọng khi một lô hàng xuất nhập khẩu đi qua hải quan, cảng, depot/ICD và các nền tảng cộng đồng cảng.

Các câu hỏi chính cần trả lời:

1. Hàng đã thông quan chưa?
2. Container đã đủ điều kiện lấy khỏi cảng chưa?
3. Có đang kẹt ở hải quan, cảng, depot hoặc ICD không?
4. Nếu hàng chưa lấy được, đang vướng ở điều kiện nào?
5. Dữ liệu trạng thái nằm ở hệ thống nào?
6. Nhân viên đang phải tra cứu, copy, chụp màn hình, gửi Zalo/email thủ công ở đâu?
7. Agentify có thể hỗ trợ tóm tắt, cảnh báo hoặc nhắc việc ở bước nào?
8. Bước nào có rủi ro pháp lý/tài chính, không nên để AI tự động làm?

---

## 2. Hải quan

### 2.1. VNACCS/VCIS là gì?

VNACCS/VCIS là hệ thống thông quan điện tử quốc gia của Việt Nam, gồm hai khối chính:

- **VNACCS**: Vietnam Automated Cargo Clearance System. Đây là khối thông quan tự động, dùng để nhận và xử lý tờ khai, phân luồng, giải phóng hàng.
- **VCIS**: Vietnam Customs Intelligence Information System. Đây là khối thông tin tình báo, dùng để thu thập và phân tích dữ liệu phục vụ quản lý rủi ro, giám sát nghiệp vụ của cơ quan Hải quan.

Điểm cần nhớ:

- Doanh nghiệp, forwarder hoặc đại lý hải quan chủ yếu tương tác với **VNACCS**.
- **VCIS** là phần nội bộ của Hải quan, doanh nghiệp gần như không thao tác trực tiếp.
- Hệ thống VNACCS/VCIS do Nhật Bản viện trợ không hoàn lại, chạy thử từ tháng 11/2013 và bắt buộc áp dụng từ tháng 4/2014.
- Phần mềm khai báo gốc của Tổng cục Hải quan có thể dùng miễn phí, nhưng khó dùng vì người thao tác phải nhớ nhiều mã nghiệp vụ.
- Đây là lý do các phần mềm thương mại như ECUS xuất hiện và được dùng rộng rãi.

Hiểu đơn giản:

> VNACCS là "đường ray" thông quan điện tử của nhà nước. Các phần mềm như ECUS là "đầu máy" giúp doanh nghiệp chạy trên đường ray đó dễ hơn.

### 2.2. ECUS5-VNACCS là gì?

ECUS5-VNACCS là phần mềm khai báo hải quan điện tử phổ biến tại Việt Nam, do **Công ty TNHH Phát triển Công nghệ Thái Sơn** phát triển.

Lưu ý:

- Một số nguồn có thể viết nhầm rằng ECUS do Cục Hải quan phát triển. Cách hiểu này không chính xác.
- ECUS là phần mềm của Thái Sơn, được Tổng cục Hải quan thẩm định, cấp chứng nhận đạt chuẩn và cho phép kết nối trao đổi thông tin với VNACCS/VCIS.

Vai trò thực tế của ECUS:

- Hỗ trợ doanh nghiệp, forwarder, đại lý hải quan khai báo tờ khai.
- Giúp người dùng thao tác dễ hơn so với phần mềm gốc.
- Cho phép truyền dữ liệu khai báo lên VNACCS.
- Có thể xuất dữ liệu phục vụ theo dõi nội bộ.
- Là một trong các phần mềm khai báo hải quan được sử dụng phổ biến nhất.

Ngoài ECUS, thị trường còn có một số phần mềm khác như CDS Live, FPT.eCustoms, GOL.

### 2.3. VASSCM là gì?

VASSCM là hệ thống quản lý, giám sát hải quan tự động tại cảng biển, cảng hàng không, kho và bãi.

Vai trò của VASSCM:

- Kết nối dữ liệu giữa Hải quan và doanh nghiệp cảng/kho/bãi.
- Giám sát hàng hóa qua khu vực cảng, kho, bãi.
- Cho phép kho/cảng xác nhận lô hàng đã đủ điều kiện ra khỏi khu vực giám sát hay chưa.
- Giảm việc dùng giấy tờ xác nhận thủ công.
- Hạn chế rủi ro làm giả chứng từ.

Ý nghĩa thực tế:

> VASSCM là lớp nối giữa Hải quan và cảng/kho/bãi. Với bài toán "hàng đã được phép ra khỏi cảng chưa?", đây là một nguồn dữ liệu rất quan trọng.

### 2.4. Hệ thống hải quan nằm ở bước nào trong lô hàng nhập khẩu?

Luồng điển hình của một lô hàng nhập khẩu:

```text
Khai tờ khai trên ECUS
  -> truyền dữ liệu lên VNACCS
  -> VNACCS trả kết quả phân luồng
  -> nếu luồng vàng/đỏ thì kiểm tra hồ sơ hoặc kiểm hóa
  -> hoàn thành nghĩa vụ thuế
  -> thông quan hoặc giải phóng hàng
  -> đối chiếu qua VASSCM
  -> hàng đủ điều kiện qua khu vực giám sát
  -> cảng/kho cho phép lấy hàng
```

### 2.5. Ai thao tác trên hệ thống hải quan?

Về mặt pháp lý, chủ hàng có thể tự khai hải quan. Nhưng trong thực tế, người thao tác trên ECUS/VNACCS thường là:

- Nhân viên chứng từ của forwarder.
- Đại lý hải quan.
- Nhân viên khai báo hải quan.
- Bộ phận logistics nội bộ của một số chủ hàng lớn.

Người dùng cuối thực sự của hệ thống thường không phải là chủ hàng, mà là nhân viên chứng từ hoặc đại lý hải quan. Chủ hàng thường chỉ nhận kết quả.

Ý nghĩa cho Agentify:

> Nếu làm sản phẩm hỗ trợ hải quan, cần hiểu workflow của nhân viên chứng từ và đại lý hải quan trước, thay vì chỉ nhìn từ góc độ chủ hàng.

### 2.6. Các trạng thái hải quan thường gặp

Các trạng thái quan trọng cần theo dõi:

| Trạng thái | Ý nghĩa |
|---|---|
| Đã đăng ký/truyền tờ khai | Tờ khai đã được gửi lên hệ thống |
| Đã có kết quả phân luồng | Hệ thống đã xác định luồng kiểm tra |
| Luồng xanh | Miễn kiểm tra hồ sơ và hàng hóa, có thể thông quan tự động nếu đủ điều kiện |
| Luồng vàng | Kiểm tra hồ sơ, không kiểm hóa thực tế hàng |
| Luồng đỏ | Kiểm tra hồ sơ và kiểm hóa thực tế hàng |
| Đã/chưa nộp thuế | Trạng thái nghĩa vụ thuế |
| Đã thông quan | Hàng đã hoàn tất thủ tục thông quan |
| Giải phóng hàng | Hàng được giải phóng trong một số trường hợp đủ điều kiện |
| Đã qua khu vực giám sát | Hàng/container đã được xác nhận ra khỏi khu vực giám sát |

Khi tra cứu, nhân viên thường quan tâm đến:

- Số tờ khai.
- Luồng phân kiểm.
- Trạng thái thuế.
- Trạng thái thông quan/giải phóng hàng.
- Trạng thái qua khu vực giám sát.
- Ngày giờ cập nhật.

### 2.7. Dữ liệu có export hoặc API không?

Cần tách thành hai lớp:

**Lớp phần mềm khai báo**

- Các phần mềm như ECUS có thể hỗ trợ xuất Excel/PDF nội bộ.
- Có thể có cơ chế tích hợp với phần mềm quản lý doanh nghiệp.
- Đây là nguồn dữ liệu khả thi hơn nếu Agentify muốn lấy dữ liệu ở giai đoạn đầu.

**Lớp kết nối với Hải quan**

- Kênh kết nối tới VNACCS/VCIS là kênh đóng, dùng chuẩn message riêng.
- Chỉ các phần mềm được chứng nhận mới được kết nối.
- Không có API mở công khai kiểu REST để một bên thứ ba tự lấy trạng thái lô hàng theo thời gian thực.
- Muốn lấy dữ liệu thường phải đi qua phần mềm khai báo hoặc tra cứu thủ công trên cổng.

Kết luận:

> Agentify không nên bắt đầu bằng việc cố tích hợp trực tiếp vào VNACCS. Cách khả thi hơn là lấy dữ liệu qua file export, email, màn hình nghiệp vụ, dữ liệu người dùng nhập, hoặc tích hợp với phần mềm khai báo nếu có đối tác.

### 2.8. Có phải copy dữ liệu sang Excel/file tracking không?

Có. Đây là một pain phổ biến.

Vì không có một API trạng thái thống nhất, nhân viên chứng từ thường phải:

- Mở ECUS để xem trạng thái.
- Copy số tờ khai.
- Copy luồng phân kiểm.
- Copy ngày thông quan.
- Ghi lại trạng thái thuế.
- Cập nhật vào Excel hoặc Google Sheet theo dõi shipment.
- Gửi kết quả cho CS/Ops hoặc khách qua email/Zalo.

Đây là dạng công việc thủ công, lặp lại, dễ sai và phù hợp để Agentify hỗ trợ.

### 2.9. Khi khách hỏi "đã thông quan chưa?", nhân viên check bằng cách nào?

Thường có ba cách:

1. Mở ECUS để xem trạng thái tờ khai.
2. Tra cứu trên cổng tra cứu tờ khai trực tuyến.
3. Với khâu ra cổng, kiểm tra trạng thái trên VASSCM hoặc hệ thống cảng.

Pain ở đây:

- Mỗi câu hỏi của khách thường kéo theo một lần tra cứu thủ công.
- Nếu CS không trực tiếp thao tác ECUS, họ phải hỏi nhân viên chứng từ.
- Nếu chưa có file tracking cập nhật, người trả lời phải kiểm tra lại từ đầu.
- Câu trả lời cho khách có thể bị chậm hoặc thiếu thông tin.

### 2.10. Chỗ gây chậm hoặc dễ sai

Các điểm thường gây chậm:

- Luồng đỏ phải kiểm hóa, cần chờ lịch và chờ cán bộ xử lý.
- Luồng vàng phải kiểm tra hồ sơ.
- Sai mã HS.
- Sai trị giá tính thuế.
- Thiếu chứng từ.
- Cần sửa hoặc hủy tờ khai.
- Chưa hoàn thành nghĩa vụ thuế.
- Hàng chưa được xác nhận qua khu vực giám sát.

Điểm quan trọng:

> Lỗi nhập liệu không chỉ làm chậm lô hiện tại. Việc sửa/hủy tờ khai nhiều lần có thể bị ghi nhận như chỉ số rủi ro, làm tăng khả năng bị phân luồng vàng/đỏ ở các lô sau.

### 2.11. Bước nào không nên để AI tự động làm?

Các hành động nên giữ con người phê duyệt:

1. Ký số và truyền tờ khai chính thức.
2. Quyết định nộp thuế.
3. Sửa hoặc hủy tờ khai.
4. Gửi thông tin pháp lý/tài chính nhạy cảm ra ngoài.

AI nên dừng ở mức:

- Soạn nháp.
- Kiểm tra chéo dữ liệu.
- Cảnh báo sai hoặc thiếu thông tin.
- Nhắc deadline.
- Gợi ý câu trả lời cho khách.
- Tóm tắt tình trạng hải quan của shipment.

### 2.12. Lưu ý cập nhật về timing sản phẩm

Nền tảng VNACCS/VCIS đang ở cuối vòng đời. Hải quan dự kiến thay thế VNACCS/VCIS bằng hệ thống thông quan mới từ ngày 31/12/2026. Luật Hải quan sửa đổi cũng dự kiến được trình Quốc hội trong tháng 10/2026.

Đồng thời, mô hình thông quan tập trung được thí điểm tại Chi cục Hải quan khu vực III từ ngày 1/6/2026, với việc dồn tiếp nhận và kiểm tra hồ sơ về một đầu mối là Đội Thông quan.

Ý nghĩa:

- Đây là rủi ro vì chuẩn tích hợp và quy trình có thể thay đổi.
- Đây cũng là cơ hội vì doanh nghiệp đang phải thích nghi với quy trình và hệ thống mới.
- Agentify nên thiết kế theo hướng linh hoạt nguồn dữ liệu, không phụ thuộc cứng vào một hệ thống hải quan cụ thể.

---

## 3. Cảng, ePort và SmartGate

### 3.1. ePort là gì?

ePort là cổng dịch vụ điện tử của cảng.

Ví dụ phổ biến là ePort của Tổng Công ty Tân Cảng Sài Gòn. Hệ thống này cho phép khách hàng:

- Khai báo thủ tục nâng/hạ container.
- Thanh toán phí nâng/hạ trực tuyến.
- Tra cứu thông tin container.
- Tra cứu thông tin tàu/chuyến.
- Tải EIR điện tử.
- Tải hoặc chuyển đổi hóa đơn điện tử.
- Check-in giao/nhận container.

Điểm cần nhớ:

> ePort không phải là một hệ thống quốc gia. Mỗi nhà khai thác cảng có thể có cổng riêng, tài khoản riêng, giao diện riêng và dữ liệu tách biệt.

Ví dụ:

- Cảng Cát Lái có hệ thống riêng.
- Cụm Tân Cảng có ePort riêng.
- Hải Phòng có hệ thống riêng.
- Các ICD/depot cũng có thể có hệ thống hoặc quy trình riêng.

### 3.2. SmartGate là gì?

SmartGate là hệ thống cổng giao nhận tự động tại cảng.

Khi xe tới cổng, SmartGate có thể:

- Nhận dạng số container.
- Nhận dạng biển số xe đầu kéo/rơ-moóc.
- Chụp và lưu ảnh các bề mặt container.
- Tự động xử lý giao nhận.
- Điều khiển barrier tự động.
- Kết nối với hệ thống khai thác cảng.

Hiểu đơn giản:

- **ePort** là lớp đăng ký, khai báo, thanh toán phía trước.
- **SmartGate** là lớp tự động hóa ở cổng cảng.

### 3.3. Những cảng lớn nào đang số hóa mạnh?

Các cụm cảng số hóa mạnh thường nằm ở:

- Cát Lái.
- Cái Mép.
- Tân Cảng Hiệp Phước.
- Hải Phòng.
- Tân Vũ.

Nhìn chung, cụm Cát Lái/Cái Mép ở phía Nam và Hải Phòng ở phía Bắc là hai khu vực có mức độ số hóa cảng đáng chú ý.

### 3.4. Ai dùng ePort?

Các nhóm thường dùng ePort:

| Nhóm người dùng | Cách sử dụng |
|---|---|
| Forwarder | Đăng ký thủ tục, tra cứu container, lấy chứng từ/phí |
| Nhân viên chứng từ | Tra cứu, tải EIR/hóa đơn, xử lý thủ tục cảng |
| Đơn vị vận tải/hãng xe | Đăng ký lấy/trả container, hỗ trợ xe vào cảng |
| Tài xế | Dùng app hoặc mã đăng ký ở khâu cổng |
| Chủ hàng | Đôi khi dùng để tra cứu hoặc nhận thông tin |
| Nhân viên cảng | Dùng hệ thống vận hành phía cảng |

### 3.5. ePort hỗ trợ việc gì?

Các chức năng phổ biến:

- Đăng ký nâng/hạ container.
- Thanh toán phí cảng online.
- Tải hóa đơn điện tử.
- Check-in giao/nhận.
- Tải EIR điện tử.
- Tra cứu thông tin container.
- Tra cứu thông tin tàu/chuyến.
- Tra cứu tình trạng container hàng xuất.
- Hỗ trợ xe vào cảng qua mã đăng ký hoặc SmartGate.

Lưu ý về D/O:

> Lệnh giao hàng, thường gọi là D/O, thường thuộc về hãng tàu chứ không phải cảng. Đây là một mảnh dữ liệu nằm ngoài ePort và hay gây tắc nếu chưa hợp lệ hoặc chưa có.

### 3.6. Khi container tới cảng, cần check trạng thái nào?

Các điều kiện thực dụng nhất để biết hàng có thể lấy khỏi cảng hay chưa:

1. Container đã được dỡ/hạ bãi chưa.
2. Container đang ở vị trí nào.
3. Tờ khai đã thông quan chưa.
4. Hàng đã đủ điều kiện qua khu vực giám sát chưa.
5. Phí cảng đã thanh toán chưa.
6. Có phát sinh phí lưu container/lưu bãi không.
7. D/O đã có và còn hợp lệ chưa.
8. Tàu đã cập/giải phóng chưa.
9. Xe đã đăng ký vào cảng chưa.
10. Có vướng kiểm hóa hoặc chứng từ chuyên ngành không.

Khi tất cả các điều kiện quan trọng đều "xanh", hàng mới có thể được kéo ra khỏi cảng.

### 3.7. Dữ liệu từ ePort có dễ lấy không?

Phần lớn vẫn là thao tác web thủ công.

Người dùng có thể tải:

- EIR.
- Hóa đơn điện tử.
- Phiếu/chứng từ liên quan.
- Một số thông tin tra cứu từ giao diện web.

Nhưng thường không có API mở phổ biến cho bên thứ ba lấy trạng thái theo thời gian thực.

Ở tầng vận hành cảng, có thể có chuẩn EDI hoặc tích hợp B2B giữa cảng và đối tác lớn. Tuy nhiên, đây không phải loại API công khai mà forwarder nhỏ hoặc một sản phẩm mới có thể dễ dàng dùng ngay.

Ý nghĩa cho Agentify:

> Giai đoạn đầu nên coi ePort là nguồn dữ liệu bán thủ công: người dùng tải file, copy trạng thái, gửi email/Zalo hoặc nhập vào file tracking. Agentify có thể hỗ trợ đọc, gom, tóm tắt và cảnh báo từ các nguồn này trước khi tích hợp sâu hơn.

### 3.8. Có phải tải file/ảnh rồi gửi Zalo/email không?

Có. Đây là một pain rất thực tế.

Các loại thông tin thường được tải hoặc chụp rồi gửi:

- EIR.
- Hóa đơn.
- Ảnh phiếu.
- Screenshot trạng thái container.
- Ảnh/chứng từ phí.
- Kết quả tra cứu.
- Mã đăng ký xe hoặc thông tin check-in.

Vấn đề:

- Mỗi cảng một cổng.
- Mỗi cổng một định dạng.
- Dữ liệu không tự gom vào một shipment timeline.
- Nhân viên phải tự chuyển thông tin qua Zalo/email/Excel.
- Dễ thất lạc context khi đổi ca hoặc đổi người phụ trách.

### 3.9. Pain lớn nhất khi làm việc với ePort/cảng

Các pain chính:

1. Dữ liệu phân mảnh: mỗi cảng, hãng tàu, kho/bãi có hệ thống riêng.
2. Không có nguồn trạng thái hợp nhất cho toàn bộ shipment.
3. Nhân viên phải tra tay nhiều nơi rồi ghép vào Excel.
4. Thiếu API mở để tự động hóa dễ dàng.
5. Có thể ùn tắc cổng hoặc chậm xử lý ở giờ cao điểm.
6. Chứng từ/phí/D/O nằm ở các bên khác nhau.
7. Nếu thiếu một điều kiện nhỏ, container vẫn không lấy được.

### 3.10. Lô hàng chưa lấy được khỏi cảng: nguyên nhân thường gặp

Các nguyên nhân phổ biến:

| Nguyên nhân | Mô tả |
|---|---|
| Chưa thông quan | Tờ khai chưa hoàn tất hoặc chưa đủ điều kiện |
| Chưa nộp thuế | Nghĩa vụ thuế chưa hoàn thành |
| Chưa có D/O | Chưa có lệnh giao hàng từ hãng tàu |
| D/O không hợp lệ | D/O hết hạn, sai thông tin hoặc chưa release |
| Chưa thanh toán phí cảng | Phí nâng/hạ, lưu bãi hoặc phí liên quan chưa thanh toán |
| Thiếu chứng từ | Thiếu giấy phép, kiểm dịch, C/O hoặc chứng từ chuyên ngành |
| Container chưa dỡ/hạ bãi | Hàng chưa sẵn sàng về mặt vận hành cảng |
| Container chưa định vị | Chưa xác định được vị trí trên bãi |
| Bị kiểm hóa | Luồng đỏ hoặc bị giữ kiểm tra |
| Xe chưa đăng ký | Chưa có lịch/mã vào cảng |

Một sản phẩm hữu ích nên phát hiện sớm điều kiện nào đang "đỏ" và cảnh báo trước khi phát sinh phí lưu.

---

## 4. PCS, PORTNET và hệ thống cộng đồng cảng

### 4.1. PCS là gì?

PCS là viết tắt của **Port Community System**, nghĩa là hệ thống cộng đồng cảng.

PCS là nền tảng số trung lập kết nối các bên trong cộng đồng cảng, cho phép chia sẻ dữ liệu theo thời gian gần thực giữa:

- Cảng.
- Hãng tàu.
- Forwarder.
- Chủ hàng.
- Hải quan.
- Kho bãi.
- Depot/ICD.
- Đơn vị vận tải.
- Ngân hàng hoặc đơn vị thanh toán.
- Cơ quan quản lý.

Hiểu đơn giản:

> PCS cố gắng trở thành trung tâm trao đổi dữ liệu giữa nhiều bên trong chuỗi cảng biển, thay vì mỗi bên giữ một hệ thống riêng.

### 4.2. PCS khác gì TOS và ePort?

| Khái niệm | Phạm vi | Mục đích chính |
|---|---|---|
| TOS | Nội bộ một terminal/cảng | Điều hành khai thác cảng, bãi, cầu tàu, cẩu, container |
| ePort | Cổng dịch vụ của một cảng/nhà khai thác | Cho khách đăng ký, tra cứu, thanh toán, tải chứng từ |
| PCS | Nhiều bên trong cộng đồng cảng | Chia sẻ dữ liệu và phối hợp giữa cảng, hãng tàu, hải quan, logistics, chủ hàng |

Nói ngắn gọn:

- ePort trả lời: "Container của tôi ở cảng X thế nào?"
- PCS hướng tới trả lời: "Lô hàng của tôi đang ở đâu trong toàn chuỗi, ai đang giữ, còn thiếu chứng từ/thanh toán gì?"

### 4.3. PORTNET định vị là gì?

PORTNET.vn được định vị như một nỗ lực xây dựng PCS tại Việt Nam.

Theo các thông tin công bố, PORTNET hướng tới:

- Kết nối hãng tàu, cảng biển, doanh nghiệp logistics, chủ hàng, ngân hàng và cơ quan quản lý.
- Hỗ trợ thanh toán phí cảng vụ/phí hạ tầng cảng biển trực tuyến.
- Kết nối dữ liệu chuẩn hóa giữa hãng tàu, cảng và hải quan.
- Cung cấp dữ liệu thời gian thực hỗ trợ quản lý công nợ và đối soát chứng từ.

Ý nghĩa:

> PORTNET đang cố giải quyết bài toán hạ tầng dữ liệu liên tổ chức. Tuy nhiên, mức độ phổ biến thực tế vẫn cần khảo sát thêm với doanh nghiệp đang vận hành.

### 4.4. PCS giải quyết phần nào của bài toán dữ liệu rời rạc?

PCS có thể giải quyết một phần lớn bài toán:

- Giảm nhập dữ liệu nhiều lần.
- Chuẩn hóa dữ liệu giữa các bên.
- Chia sẻ trạng thái theo thời gian gần thực.
- Tối ưu phối hợp giữa cảng, hãng tàu, hải quan, logistics và chủ hàng.
- Giảm phụ thuộc vào trao đổi giấy tờ thủ công.

Đây là đúng pain "mỗi bên một hệ thống, phải gõ lại và ghép Excel" trong logistics cảng biển.

### 4.5. PCS đã phổ biến chưa?

Chưa thể coi PCS là hạ tầng phổ biến toàn thị trường.

Thực trạng cần kiểm chứng:

- PORTNET mới ở giai đoạn phát triển mạng lưới kết nối.
- Chưa phải mọi cảng, forwarder, chủ hàng đều dùng.
- Dữ liệu vẫn đang nằm rải ở ePort từng cảng, VNACCS, hệ thống hãng tàu, email, Excel và Zalo.
- Doanh nghiệp vừa và nhỏ có thể chưa tiếp cận hoặc chưa tích hợp sâu với PCS.

Đây là khoảng trống thị trường mà Agentify cần quan sát kỹ.

### 4.6. Nếu đã có PCS, Agentify còn cơ hội gì?

PCS giải quyết tầng hạ tầng dữ liệu giữa các tổ chức. Nhưng PCS chưa chắc giải quyết tầng workflow nội bộ của đội vận hành.

Cơ hội còn lại cho Agentify:

1. Gom trạng thái lô hàng từ nhiều nguồn: PCS, ePort, VNACCS, email hãng tàu, Excel, Zalo, TMS, WMS.
2. Tạo shipment timeline thống nhất cho CS/Ops.
3. Tự động tóm tắt tình trạng lô hàng bằng ngôn ngữ dễ hiểu.
4. Cảnh báo sớm điều kiện "đỏ": thiếu D/O, chưa nộp thuế, chưa thông quan, sắp phát sinh phí lưu.
5. Soạn nháp câu trả lời cho khách.
6. Tạo checklist chứng từ.
7. Đọc và bóc tách chứng từ bằng AI để giảm lỗi nhập liệu.
8. Gợi ý kiểm tra chéo mã HS, trị giá, thông tin invoice/packing list trước khi người dùng truyền tờ khai.

### 4.7. Agentify nên cạnh tranh hay tích hợp PCS?

Agentify nên **tích hợp với PCS**, không nên cạnh tranh trực tiếp ở tầng hạ tầng.

Lý do:

- Hạ tầng PCS cần quan hệ với cảng, hải quan, hãng tàu, ngân hàng và cơ quan quản lý.
- Đây là tầng khó cho một sản phẩm mới nếu đi theo hướng cạnh tranh trực diện.
- Agentify có lợi thế hơn nếu đứng ở tầng workflow và AI cho đội vận hành.
- Càng nhiều dữ liệu được PCS chuẩn hóa, Agentify càng dễ hút vào để tóm tắt, cảnh báo và điều phối công việc.

Định vị phù hợp:

> Agentify là lớp trợ lý vận hành nằm bên trên PCS/ePort/VNACCS/TMS/WMS, giúp đội logistics hiểu nhanh tình trạng lô hàng và xử lý ngoại lệ.

---

## 5. Bảng tổng hợp hệ thống trong cụm này

| Hệ thống | Vai trò | Ai dùng chính | Dữ liệu quan trọng | Điểm mạnh | Điểm yếu | Cơ hội cho Agentify |
|---|---|---|---|---|---|---|
| VNACCS | Thông quan tự động | Nhân viên khai báo, đại lý hải quan | Tờ khai, phân luồng, thông quan | Hệ thống lõi của nhà nước | Không có API mở cho bên thứ ba | Lấy dữ liệu gián tiếp qua phần mềm/file/người dùng |
| VCIS | Quản lý rủi ro nội bộ hải quan | Cơ quan Hải quan | Dữ liệu quản lý rủi ro | Hỗ trợ giám sát nghiệp vụ | Doanh nghiệp không thao tác trực tiếp | Không nên coi là nguồn dữ liệu sản phẩm |
| ECUS | Phần mềm khai báo hải quan | Nhân viên chứng từ, đại lý hải quan | Tờ khai, trạng thái, luồng, thuế | Phổ biến, dễ dùng hơn phần mềm gốc | Dữ liệu vẫn cần copy/export | Đọc file export, hỗ trợ checklist, cảnh báo |
| VASSCM | Giám sát hàng qua cảng/kho/bãi | Hải quan, cảng, kho/bãi | Đủ điều kiện qua khu giám sát | Kết nối hải quan với cảng/kho | Không phải API mở phổ biến | Cảnh báo hàng chưa qua khu giám sát |
| ePort | Cổng dịch vụ điện tử cảng | Forwarder, vận tải, chứng từ | Container, phí, EIR, hóa đơn | Số hóa thủ tục cảng | Mỗi cảng một hệ thống | Gom file, trạng thái, cảnh báo thiếu điều kiện lấy hàng |
| SmartGate | Cổng giao nhận tự động | Cảng, tài xế, vận tải | Biển số, số container, ảnh, gate-in/gate-out | Giảm thời gian qua cổng | Dữ liệu nằm trong hệ thống cảng | Lấy sự kiện gate nếu tích hợp được |
| PCS/PORTNET | Hệ thống cộng đồng cảng | Cảng, hãng tàu, logistics, chủ hàng | Dữ liệu liên tổ chức | Giảm phân mảnh dữ liệu | Chưa phổ biến toàn thị trường | Tích hợp làm nguồn dữ liệu, không cạnh tranh trực tiếp |
| Depot/ICD system | Quản lý depot/ICD | Depot, ICD, trucking, forwarder | Lấy/trả rỗng, gate, vị trí container | Quan trọng cho container nội địa | Hệ thống phân mảnh | Đưa sự kiện depot/ICD vào shipment timeline |

---

## 6. Pain ranking sơ bộ của cụm này

| Pain | Ai bị đau | Tác động | Cơ hội Agentify |
|---|---|---|---|
| Không có trạng thái hợp nhất của lô hàng | CS/Ops, forwarder, chủ hàng | Trả lời khách chậm, phải check nhiều nơi | Shipment timeline |
| Phải copy trạng thái hải quan/cảng sang Excel | Nhân viên chứng từ, CS/Ops | Tốn thời gian, dễ sai | Import/export, auto-summary |
| Không biết điều kiện nào đang làm hàng kẹt | CS/Ops, quản lý vận hành | Chậm xử lý, phát sinh phí | Exception detection |
| Thiếu D/O hoặc D/O chưa hợp lệ | Forwarder, chủ hàng | Không lấy được hàng | Checklist điều kiện lấy hàng |
| Chưa thanh toán phí hoặc chưa nộp thuế | Ops, kế toán | Kẹt hàng, phát sinh phí | Cảnh báo task cần xử lý |
| Sắp hết free time/lưu bãi/lưu container | Ops, chủ hàng, quản lý | Phát sinh chi phí | Deadline monitoring |
| Mỗi cảng một ePort, mỗi hãng tàu một hệ thống | Forwarder, 3PL | Dữ liệu phân mảnh | Gom dữ liệu đa nguồn |
| Handover khó khi thông tin nằm trong Zalo/email | CS/Ops | Mất context, trả lời sai | Handover summary |

---

## 7. Cơ hội sản phẩm cho Agentify trong cụm này

### 7.1. Tính năng nên kiểm chứng sớm

1. **Shipment timeline**
   - Gom các mốc: khai tờ khai, phân luồng, thông quan, qua khu giám sát, container hạ bãi, thanh toán phí, có D/O, xe vào cảng, lấy hàng.

2. **Exception inbox**
   - Danh sách các lô hàng đang có vấn đề, ví dụ: chưa thông quan, thiếu D/O, chưa thanh toán phí, sắp hết free time.

3. **AI status summary**
   - Tóm tắt tình trạng lô hàng bằng tiếng Việt dễ hiểu cho CS/Ops.

4. **Customer reply draft**
   - Soạn nháp câu trả lời cho khách, ví dụ: "Lô hàng đã thông quan nhưng đang chờ D/O từ hãng tàu."

5. **Checklist điều kiện lấy hàng khỏi cảng**
   - Kiểm tra các điều kiện: thông quan, thuế, D/O, phí cảng, container hạ bãi, xe đăng ký.

6. **Deadline/free time monitoring**
   - Nhắc khi sắp hết thời gian miễn phí lưu container/lưu bãi.

7. **Document and screenshot intake**
   - Đọc file PDF, hóa đơn, EIR, ảnh chụp màn hình hoặc email để cập nhật shipment.

### 7.2. Những việc chưa nên làm trong MVP

1. Không tự truyền tờ khai hải quan.
2. Không tự ký số.
3. Không tự nộp thuế.
4. Không tự sửa/hủy tờ khai.
5. Không cố tích hợp trực tiếp VNACCS ngay từ đầu.
6. Không cạnh tranh trực tiếp với PCS.
7. Không thay thế ePort/TMS/WMS.
8. Không hứa lấy dữ liệu thời gian thực từ mọi cảng/hãng tàu nếu chưa có tích hợp chính thức.

### 7.3. MVP khả thi cho cụm này

MVP nên bắt đầu theo hướng:

> Agentify giúp CS/Ops và nhân viên chứng từ theo dõi điều kiện lấy hàng khỏi cảng bằng cách gom dữ liệu từ Excel, email, file export, EIR, hóa đơn, ảnh chụp màn hình và cập nhật thủ công thành một timeline và checklist trạng thái.

Input ban đầu:

- File Excel/Google Sheet tracking.
- Email từ hãng tàu/forwarder/cảng.
- File PDF/EIR/hóa đơn.
- Ảnh chụp màn hình ePort/ECUS nếu người dùng cung cấp.
- Cập nhật thủ công từ nhân viên.

Output ban đầu:

- Trạng thái hải quan.
- Trạng thái cảng.
- Checklist điều kiện lấy hàng.
- Cảnh báo thiếu điều kiện.
- Tóm tắt tình trạng lô hàng.
- Nháp câu trả lời cho khách.
- Task cho người phụ trách.

---

## 8. Câu hỏi phỏng vấn cần dùng cho cụm này

### 8.1. Câu hỏi cho nhân viên chứng từ/đại lý hải quan

1. Anh/chị đang dùng phần mềm nào để khai hải quan?
2. Một lô hàng nhập khẩu thường đi qua những trạng thái hải quan nào?
3. Khi khách hỏi "đã thông quan chưa?", anh/chị kiểm tra ở đâu?
4. Có phải copy trạng thái sang Excel hoặc gửi Zalo/email không?
5. Tần suất phải trả lời câu hỏi trạng thái hải quan là bao nhiêu?
6. Những lỗi nào thường làm tờ khai bị chậm?
7. Thiếu chứng từ nào hay làm hàng bị kẹt?
8. Có thể xuất dữ liệu từ phần mềm khai báo ra file không?
9. Anh/chị có muốn AI tóm tắt tình trạng hải quan theo từng shipment không?
10. Việc nào bắt buộc phải để người duyệt, không cho AI tự làm?

### 8.2. Câu hỏi cho CS/Ops/forwarder

1. Khi khách hỏi "hàng lấy được khỏi cảng chưa?", anh/chị phải kiểm tra những nguồn nào?
2. Mỗi lần trả lời mất bao lâu?
3. Có phải hỏi nhân viên chứng từ, trucking, kế toán hoặc hãng tàu không?
4. Nguyên nhân thường gặp khiến hàng chưa lấy được là gì?
5. Có checklist điều kiện lấy hàng khỏi cảng không?
6. Có thường bị thiếu D/O, chưa thanh toán phí, chưa nộp thuế hoặc chưa qua giám sát không?
7. Có từng phát sinh phí lưu container/lưu bãi vì cập nhật chậm không?
8. Nếu có dashboard hiển thị lô nào đang "đỏ", anh/chị có dùng không?
9. Nếu AI soạn sẵn câu trả lời cho khách, anh/chị có muốn duyệt trước khi gửi không?
10. Anh/chị có sẵn sàng thử pilot 4 tuần không?

### 8.3. Câu hỏi cho trucking/depot/ICD

1. Khi xe lấy/trả container, trạng thái được cập nhật ở đâu?
2. Có hệ thống depot/ICD riêng không?
3. Có gate-in/gate-out event không?
4. Tài xế cập nhật bằng app, Zalo hay điện thoại?
5. Có thường thiếu thông tin khiến xe không vào/lấy được container không?
6. POD/EIR/ảnh giao nhận được lưu ở đâu?
7. Có thể gửi dữ liệu lấy/trả container theo file hoặc API không?
8. Agentify có thể giúp nhắc trạng thái hoặc gom chứng từ giao nhận không?

---

## 9. Kết luận sơ bộ

Cụm hải quan, cảng, depot/ICD là một trong những cụm có cơ hội rõ cho Agentify, nhưng không nên tiếp cận bằng cách thay thế hệ thống lõi như VNACCS, ECUS, ePort hay PCS.

Hướng phù hợp hơn là:

- Đứng ở lớp workflow nội bộ của CS/Ops/chứng từ.
- Gom dữ liệu từ nhiều nguồn rời rạc.
- Tạo timeline theo từng shipment.
- Cảnh báo điều kiện đang thiếu.
- Giảm thao tác copy/check thủ công.
- Soạn nháp câu trả lời cho khách.
- Giữ con người phê duyệt các hành động pháp lý/tài chính.

Nếu khảo sát xác nhận rằng doanh nghiệp thường xuyên mất thời gian trả lời câu hỏi "đã thông quan chưa?" và "hàng lấy được khỏi cảng chưa?", đây có thể là một use case MVP đáng ưu tiên cho Agentify Logistics.

---

## 10. Nguồn tham khảo

Các nguồn dưới đây dùng để kiểm chứng phần mô tả hệ thống, bối cảnh số hóa và thay đổi chính sách/quy trình.

| Nguồn | Nội dung dùng để tham khảo |
|---|---|
| [VNACCS/VCIS](https://www.vnaccs.com/) | Thông tin tổng quan về hệ thống VNACCS/VCIS, chữ ký số và hải quan điện tử |
| [ECUS - giới thiệu ECUS5VNACCS](https://ecus.vn/gioi-thieu) | ECUS5VNACCS do Thái Sơn phát triển, được thẩm định/cấp chứng nhận kết nối VNACCS/VCIS |
| [ECUS - thông báo đáp ứng chuẩn trao đổi dữ liệu](https://ecus.vn/tin-tuc/thong-bao-phan-mem-ecus5-vnaccs-dap-ung-chuan-trao-doi-du-lieu-giua-co-quan-hai-quan) | ECUS5VNACCS đáp ứng chuẩn trao đổi dữ liệu giữa Hải quan và doanh nghiệp cảng/kho/bãi |
| [Báo Chính phủ - VASSCM](https://baochinhphu.vn/giam-sat-hai-quan-tu-dong-vasscm-tiet-kiem-trung-binh-25-gio-lo-hang-102285696.htm) | Hiệu quả triển khai VASSCM và khảo sát tại doanh nghiệp XNK, logistics, kho bãi |
| [VIMC - VASSCM tại cảng biển](https://vimc.co/dua-he-thong-quan-ly-hai-quan-tu-dong-tai-cang-bien-vao-hoat-dong-giam-thoi-gian-thu-tuc-va-chi-phi/) | VASSCM giúp chuẩn hóa quy trình, trao đổi dữ liệu giữa doanh nghiệp và Hải quan |
| [Saigon Newport - tiện ích ePort](https://saigonnewport.com.vn/tin-tuc/hoat-dong-kinh-doanh/tien-ich-cua-dich-vu-eport-va-mobivi-trong-giao-nhan-tai-tong-cong-ty-tan-cang-sai-gon.html) | ePort hỗ trợ đăng ký làm hàng, thanh toán qua mạng tại Tân Cảng - Cát Lái |
| [Logistics.gov.vn - ePort Tân Cảng](https://www.logistics.gov.vn/dich-vu-logistics/dich-vu-khac/tan-cang-sai-gon-se-hoan-thien-eport-cho-cac-cang-cai-mep-hiep-phuoc-va-lach-huyen-hict) | Tình hình sử dụng ePort tại Cát Lái, mở rộng tới Cái Mép, Hiệp Phước, Lạch Huyện |
| [HICT ePort - Container Information](https://eport.hict.net.vn/ContainerInformation) | Ví dụ dữ liệu tra cứu container: thông quan, gate-in/gate-out, booking, seal, tàu, cảng đích |
| [Cảng Hải Phòng - SmartGate](https://haiphongport.com.vn/vi/san-xuat-kinh-doanh/smart-gate-buoc-chuyen-doi-so-quyet-doan-o-cang-tan-vu-cang-hai-phong.html) | SmartGate nhận dạng xe/container, giảm thời gian xử lý qua cổng còn 10-25 giây/xe |
| [PORTNET](https://portnet.vn/) | Trang giới thiệu Port Community System - PCS của PORTNET |
| [Tạp chí Khoa học và Công nghệ Việt Nam - PORTNET](https://vjst.vn/ra-mat-portnet-nen-tang-cong-nghe-cong-dong-doanh-nghiep-cang-71749.html) | PORTNET được định vị là nền tảng cộng đồng cảng, kết nối cơ quan quản lý, cảng, hãng tàu, logistics, XNK |
| [Nhân Dân - thông quan tập trung 2026](https://nhandan.vn/chi-cuc-hai-quan-khu-vuc-iii-chinh-thuc-trien-khai-he-thong-thong-quan-tap-trung-post966046.html) | Chi cục Hải quan khu vực III vận hành thông quan tập trung từ ngày 1/6/2026 |
| [Thời báo Tài chính Việt Nam - thí điểm thông quan tập trung](https://thoibaotaichinhvietnam.vn/thi-diem-thong-quan-tap-trung-tu-16-hai-quan-khu-vuc-iii-tao-cu-hich-rut-ngan-thoi-gian-thong-quan-196009.html) | Bối cảnh thí điểm mô hình thông quan tập trung từ ngày 1/6/2026 |

---

## 11. Tóm tắt compact sau Cụm 1

Cụm 1 đã hoàn thiện research về hải quan, cảng, depot/ICD và PCS/PORTNET. Kết luận chính: Agentify không nên thay VNACCS, ECUS, ePort hay PCS, mà nên đứng ở lớp workflow cho CS/Ops/chứng từ. Pain lớn nhất là dữ liệu phân mảnh, phải tra cứu thủ công nhiều hệ thống, copy trạng thái sang Excel/Zalo/email, khó biết điều kiện nào đang làm hàng kẹt và dễ phát sinh phí lưu container/lưu bãi. MVP phù hợp là shipment timeline + checklist điều kiện lấy hàng khỏi cảng + exception inbox + AI status summary + draft câu trả lời cho khách. Các hành động pháp lý/tài chính như ký số, truyền tờ khai, nộp thuế, sửa/hủy tờ khai phải giữ con người phê duyệt. Bối cảnh 2026 có thay đổi lớn về thông quan tập trung và hệ thống hải quan mới, nên Agentify cần thiết kế linh hoạt theo nguồn dữ liệu, không phụ thuộc cứng vào một hệ thống.
