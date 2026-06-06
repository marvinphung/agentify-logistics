# Context prototype Agentify Logistics

Thư mục này chứa các tài liệu nền được chuyển từ repo `agentify` sang để bắt đầu build prototype theo hướng đề xuất v3.

## File nên đọc trước

1. `de_xuat_agentify_v3.md`
   - File định hướng sản phẩm hiện tại.
   - Trọng tâm: Agentify là kho dữ liệu tập trung cho shipment/container, tự thu thập dữ liệu từ Email, Zalo và tài liệu upload, hỗ trợ tra cứu thời gian thực.

2. `de_xuat_huong_di_agentify_bao_cao_hoan_thien.md`
   - File đề xuất hướng đi dạng báo cáo hoàn chỉnh hơn.
   - Dùng để lấy bối cảnh thị trường, đối thủ, khoảng trống và luận điểm sản phẩm khi cần viết prompt/spec cho prototype.

3. `de_xuat_huong_di_agentify_viet_lai_de_hieu.md`
   - Bản viết lại dễ hiểu hơn.
   - Dùng để lấy cách diễn đạt đơn giản cho màn hình demo, README, pitch nội bộ hoặc prompt vibe code.

4. `bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md`
   - Báo cáo khảo sát thị trường logistics B2B/XNK tổng hợp.
   - Dùng để hiểu quy trình lô hàng từ A đến B, 9 cụm nghiệp vụ, workflow thực tế, pain và khoảng trống thị trường.

5. `cum_9_excel_email_zalo_file_thu_cong.md`
   - Cụm quan trọng nhất cho prototype v3.
   - Dùng để hiểu vì sao dữ liệu vận hành đang nằm rải rác trong Email, Zalo, Excel, file export và Drive.

6. `cum_8_cs_ops_account_tra_loi_khach.md`
   - Cụm người dùng trực tiếp của prototype.
   - Dùng để hiểu nhu cầu tra cứu shipment/container, trả lời khách, phối hợp CS/Ops/Account.

7. `cum_4_chung_tu_xuat_nhap_khau.md`
   - Dùng để hiểu nhóm chứng từ cần đọc, upload, trích xuất và liên kết vào shipment/container profile.

## File research theo từng cụm

- `cum_1_hai_quan_cang_depot_icd.md`
- `cum_2_chu_hang_po_hop_dong_cam_ket_giao_hang.md`
- `cum_3_forwarder_booking_quoc_te_hang_tau_hang_bay.md`
- `cum_4_chung_tu_xuat_nhap_khau.md`
- `cum_5_trucking_noi_dia.md`
- `cum_6_kho_wms_3pl_warehouse.md`
- `cum_7_ke_toan_chi_phi_hoa_don_doi_soat.md`
- `cum_8_cs_ops_account_tra_loi_khach.md`
- `cum_9_excel_email_zalo_file_thu_cong.md`

## File bổ trợ

- `de_xuat_agentify.md`, `de_xuat_agentify_v2.md`: các bản đề xuất trước, dùng để tham chiếu quá trình thu hẹp phạm vi.
- `de_xuat_huong_di_agentify.md`: bản đề xuất hướng đi ban đầu.
- `de_xuat_huong_di_agentify_bao_cao_hoan_thien.md`: bản đề xuất hướng đi đã hoàn thiện theo format báo cáo.
- `de_xuat_huong_di_agentify_viet_lai_de_hieu.md`: bản diễn đạt dễ hiểu, phù hợp để chuyển thành UI copy/prototype narrative.
- `bao_cao_thi_truong_logistics_viet_nam.md`: market research logistics Việt Nam cấp tổng quan.
- `research_logistics_orchestration_opportunity_vi.md`: research về cơ hội lớp orchestration/kết nối logistics.
- `business_plan_agentify_logistics.md`: bản business plan cũ, chỉ dùng tham khảo, không phải định hướng chính của prototype v3.
- `research_plan.md`, `plan_bao_cao_khao_sat_thi_truong_logistic_b2b_xnk.md`, `tong_hop.md`: plan và ghi chú tổng hợp research.

## Hướng prototype nên bám

Prototype nên ưu tiên 5 luồng:

1. Connect hoặc ingest dữ liệu từ Email/Zalo/file upload.
2. Nhận diện shipment/container từ nội dung chat, email, Excel, PDF, ảnh chứng từ.
3. Gom dữ liệu vào một `shipment/container profile`.
4. Cho phép nhân viên hỏi/tra cứu bằng ngôn ngữ tự nhiên.
5. Hiển thị timeline, nguồn dữ liệu và cảnh báo thiếu/chậm chứng từ.
