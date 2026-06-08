# Search-First Prototype UI Design

## Goal

Thiết kế lại UI prototype để `CS/Ops` mở vào là có thể tra cứu `container` ngay, không phải hiểu cấu trúc hệ thống trước. UI mới phải làm rõ đây là công cụ tra cứu dữ liệu logistics theo `container`, không phải admin panel cho pipeline ingest.

## Problem With Current UI

UI hiện tại bị tổ chức theo nhóm chức năng hệ thống:

- `Kết nối Gmail`
- `Sync Email`
- `Containers`

Điều này tạo ra 3 vấn đề:

1. Người dùng mới không biết nên vào đâu trước.
2. Flow hằng ngày của `CS/Ops` bị che khuất bởi flow setup kỹ thuật.
3. App trông giống một dashboard vận hành backend hơn là một công cụ tra cứu nhanh.

Prototype hiện tại cần tối ưu cho use case:

> Mở app, nhập `container / booking / B/L / PO`, xem ngay container profile và nguồn dữ liệu liên quan.

## Target User Flow

### Daily Use

1. Người dùng mở app.
2. Người dùng thấy ô search lớn ngay ở trang đầu.
3. Người dùng nhập `container`, `booking`, `B/L`, hoặc `PO`.
4. Nếu khớp chính xác một container, app mở ngay container detail.
5. Nếu có nhiều kết quả, app hiển thị danh sách để chọn.
6. Người dùng xem summary và provenance của từng field.

### First-Time Setup

1. Người dùng mở app.
2. Nếu chưa có dữ liệu, trang chủ hiển thị empty state rõ ràng.
3. Người dùng bấm `Thiết lập dữ liệu`.
4. Người dùng kết nối Gmail và tạo sync job.
5. Sau khi có dữ liệu, quay lại trang chủ để tra cứu.

## Design Direction

Chọn hướng `search-first workspace`.

Lý do:

- Phù hợp nhất với nhu cầu `CS/Ops mở vào là search container ngay`
- Giảm số quyết định ở màn đầu
- Giữ scope prototype hẹp và rõ
- Không ép người dùng đi qua các màn setup nếu họ chỉ muốn tra cứu

Không chọn:

- `dashboard-first`: thừa chỉ số, loãng task chính
- `wizard-first`: tốt cho onboarding nhưng tệ cho usage hằng ngày

## Information Architecture

### Primary Routes

- `/` -> `Search Home`
- `/containers/:containerNo` -> `Container Detail`
- `/setup` -> `Data Setup`
- `/emails/:id` -> `Email Detail`

### Route Intent

`/`

- Là entrypoint chính của toàn app
- Luôn ưu tiên search và lookup
- Có thể hiển thị recent containers và trạng thái dữ liệu ngắn gọn

`/containers/:containerNo`

- Hiển thị container profile
- Trả lời nhanh trạng thái hiện tại và nguồn dữ liệu

`/setup`

- Gom toàn bộ flow kỹ thuật: Gmail connection, sync job, recent syncs, recent emails
- Đây là màn phụ trợ, không phải màn trung tâm

`/emails/:id`

- Màn drill-down để kiểm tra raw email, attachments, extracted facts
- Chỉ đi vào từ detail pages hoặc setup pages

## Navigation

### Proposed Navigation Model

Bỏ sidebar nặng hiện tại. Dùng top bar đơn giản:

- logo `Agentify`
- tab hoặc link `Tra cứu`
- nút/link `Thiết lập dữ liệu`

Lý do:

- sidebar làm app giống admin console
- prototype cần cảm giác là công cụ lookup nhanh
- top bar gọn sẽ giảm nhiễu thị giác

### Navigation Rules

- `Tra cứu` luôn trỏ về `/`
- `Thiết lập dữ liệu` luôn trỏ về `/setup`
- `Email Detail` không xuất hiện như mục điều hướng chính
- `Container Detail` là route deep-link, không cần mục nav riêng

## Search Home Page

### Purpose

Làm rõ ngay lập tức app dùng để tra cứu gì và dùng như thế nào.

### Layout

#### Section 1: Search Hero

Nội dung:

- headline ngắn, trực tiếp
- ô search lớn
- placeholder rõ ràng:
  - `Nhập container / booking / B/L / PO`
- nút `Tra cứu`

Behavior:

- nhấn `Enter` để search
- query exact container thì redirect sang detail
- query nhiều match thì hiện result list ngay trên cùng trang

#### Section 2: Quick Data State

Hiển thị tối giản:

- mailbox đã kết nối
- lần sync gần nhất
- số container đang có trong DB

Mục tiêu:

- user biết app có dữ liệu hay chưa
- không cần mở `/setup` chỉ để kiểm tra trạng thái cơ bản

#### Section 3: Recent Containers or Search Results

Nếu chưa nhập gì:

- hiển thị `containers gần đây`

Nếu đang search:

- hiển thị `search results`

Mỗi item chỉ nên có:

- `container_no`
- `status_text`
- `ETA`
- `POL -> POD`
- `updated_at`

Không đổ quá nhiều field lên list.

#### Section 4: Empty State

Nếu chưa có dữ liệu:

- message rõ:
  - `Chưa có dữ liệu để tra cứu`
- một CTA duy nhất:
  - `Thiết lập dữ liệu`

Không nên hiển thị nhiều nút cạnh tranh nhau.

## Container Detail Page

### Purpose

Trả lời hai câu hỏi trong vài giây:

1. Container này hiện có thông tin gì?
2. Thông tin đó đến từ đâu?

### Layout

#### Section 1: Summary Header

Hiển thị:

- `container_no`
- `status_text`
- `ETA`
- `ETD`
- `POL -> POD`
- `updated_at`

Đây là phần cần nhìn thấy đầu tiên.

#### Section 2: Key Fields

Nhóm các field cốt lõi:

- `booking_no`
- `bl_no`
- `po_no`
- `vessel`
- `voyage`
- `pol`
- `pod`

Layout nên ưu tiên dễ quét hơn là “đẹp kiểu dashboard”.

#### Section 3: Source Evidence

Phần này phải là điểm mạnh của prototype.

Hiển thị theo cấu trúc:

- field name
- latest value
- danh sách sources

Mỗi source entry cần cho thấy:

- `field_value`
- `document_type`
- `source_label`
- `source_sent_at`
- link `Mở email`

Mục tiêu là user biết ngay:

- ETA hiện tại là bao nhiêu
- ETA đó đến từ PDF/email nào
- có revision trước đó không

#### Section 4: Related Emails and Attachments

Đặt cuối trang, không tranh ưu tiên với summary.

Hiển thị:

- danh sách email liên quan
- danh sách attachment liên quan

Các card này nên gọn, ưu tiên link drill-down.

## Setup Page

### Purpose

Tách flow kỹ thuật ra khỏi flow tra cứu hằng ngày.

### Sections

#### Section 1: Gmail Connection

- tạo/cập nhật mailbox
- hiển thị mailbox đã lưu

#### Section 2: Create Sync Job

- chọn mailbox
- nhập query
- nhập max results

#### Section 3: Recent Sync Jobs

- status
- query
- emails fetched
- containers upserted

#### Section 4: Recent Emails

- subject
- sender
- linked containers
- fact count

Setup page có thể reuse phần lớn component/data hiện tại, chỉ đổi vị trí và framing.

## Email Detail Page

### Purpose

Cho người dùng hoặc developer kiểm tra raw evidence khi cần.

### Role In Product

- không phải màn chính
- không cần điều hướng top-level
- chỉ dùng như drill-down từ provenance hoặc setup

## API Impact

### Existing APIs That Still Fit

Giữ nguyên:

- `GET /health`
- `GET /api/v1/gmail-connections`
- `POST /api/v1/gmail-connections`
- `GET /api/v1/sync-jobs`
- `POST /api/v1/sync-jobs`
- `GET /api/v1/containers`
- `GET /api/v1/containers/{container_no}`
- `GET /api/v1/containers/{container_no}/facts`
- `GET /api/v1/emails`
- `GET /api/v1/emails/{email_id}`

### Recommended API Addition

Thêm:

- `GET /api/v1/app-home`

Response gợi ý:

```json
{
  "has_data": true,
  "container_count": 3,
  "last_sync_at": "2026-06-08T04:35:00Z",
  "connected_mailboxes": [
    {
      "id": "gcn_01",
      "account_email": "demo-logistics@agentify.vn",
      "status": "connected"
    }
  ],
  "recent_containers": [
    {
      "container_no": "MSCU1234567",
      "status_text": "Arrival Notice revised",
      "eta": "2026-06-14",
      "updated_at": "2026-06-08T04:35:00Z"
    }
  ]
}
```

Lý do:

- homepage không phải tự ghép nhiều API nhỏ
- giảm loading choreography ở frontend
- giữ component home đơn giản

### Optional Improvement

`GET /api/v1/containers?q=...`

Có thể bổ sung metadata:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "page_size": 20,
  "match_type": "exact"
}
```

`match_type` không bắt buộc cho backend v1, nhưng hữu ích nếu muốn auto-redirect logic sạch hơn.

## Data States To Handle

UI mới phải xử lý rõ các trạng thái:

- chưa có Gmail connection
- đã có Gmail connection nhưng chưa sync
- đã sync nhưng chưa có container
- đang có dữ liệu bình thường
- API hoặc DB unavailable
- search không có kết quả

Mỗi state nên có copy rõ và một CTA chính duy nhất.

## Copy Guidelines

Ngôn ngữ trên UI nên:

- ngắn
- trực tiếp
- ít thuật ngữ kỹ thuật

Ưu tiên:

- `Tra cứu container`
- `Thiết lập dữ liệu`
- `Đã sync lần cuối`
- `Chưa có dữ liệu`
- `Mở email nguồn`

Tránh:

- `containers upserted`
- `fact provenance` ở nơi user-facing chính
- `ingest pipeline` ở màn tra cứu

Các thuật ngữ kỹ thuật có thể giữ ở màn `/setup`.

## Non-Goals

Redesign này không bao gồm:

- thay đổi scope sản phẩm sang chat/Q&A
- thêm OCR
- thêm review queue
- thêm analytics dashboard
- làm routing đa cấp phức tạp

## Implementation Notes

### Reuse Opportunities

Có thể tái sử dụng phần lớn:

- data layer hiện tại
- API client hiện tại
- page `ShipmentDetail`
- page `EmailDetail`
- phần form của `GmailConnection`
- phần list jobs/emails của `EmailSync`

Thay đổi chính là:

- route map
- layout global
- home page mới
- setup page mới
- wording và hierarchy trên detail pages

### Execution Order

1. Đổi IA và routes
2. Đổi layout global từ sidebar sang top bar gọn
3. Build `Search Home`
4. Tối giản `Container Detail`
5. Gom Gmail/sync thành `Setup`
6. Nếu cần, thêm `GET /api/v1/app-home`

## Success Criteria

Redesign này đạt yêu cầu nếu:

1. Người mới mở app nhìn vào là hiểu có thể search `container / booking / B/L / PO`.
2. User hằng ngày có thể đi từ trang đầu đến container detail trong một bước search.
3. Flow setup không chen vào flow tra cứu chính.
4. Container detail cho thấy rõ cả `summary` lẫn `source evidence`.
5. UI bớt cảm giác “admin dashboard”, tăng cảm giác “lookup tool”.
