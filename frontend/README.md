# Agentify Logistics Frontend

Frontend này gọi trực tiếp backend `Agentify Logistics` qua các API:

- `/health`
- `/api/v1/app-home`
- `/api/v1/gmail-connections`
- `/api/v1/sync-jobs`
- `/api/v1/containers`
- `/api/v1/emails`

## Chạy local

1. Cài dependencies:

```bash
npm install
```

2. Chạy backend ở `http://127.0.0.1:8766`

3. Tạo `.env.local` từ `.env.example` nếu cần chỉnh proxy target

4. Chạy Vite dev server:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Local dev nên để `VITE_API_BASE_URL` rỗng. Khi đó `vite.config.ts` sẽ proxy `/api` và `/health` sang `VITE_PROXY_API_TARGET`, mặc định là `http://127.0.0.1:8766`.

## Production

Production nên ưu tiên để frontend gọi same-origin `/api` và `/health`.

- Nếu deploy trên Vercel, giữ `VITE_API_BASE_URL` rỗng và dùng `vercel.json` rewrite sang `http://95.216.142.220:8766`.
- Nếu build static rồi đặt sau reverse proxy riêng, cũng giữ `VITE_API_BASE_URL` rỗng và để proxy ở Nginx/Caddy xử lý `/api` và `/health`.
- Chỉ set `VITE_API_BASE_URL` khi anh thật sự muốn bundle FE với một backend base URL cố định.

## Env files

- `.env.local`: dùng cho máy dev local, không commit
- `.env.production`: dùng cho config production local preview, không commit
- `.env.example`: mẫu cấu hình để copy sang `.env.local`

## Màn hình đã nối BE

- `Tra cứu` (`/`): dùng `app-home` + `containers` để search-first lookup
- `Thiết lập dữ liệu` (`/setup`): list/upsert `gmail_connections`, create/list `sync_jobs`, list `emails`
- `Container detail`: detail + `facts`
- `Email detail`: email raw + attachments + extracted facts
