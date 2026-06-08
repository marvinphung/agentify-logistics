# Search-First UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the prototype so `CS/Ops` lands on a search-first home page, reaches container detail in one lookup flow, and uses setup pages only when they need to manage Gmail/sync data.

**Architecture:** Keep the current container-centric backend and add one lightweight aggregate endpoint for the homepage. On the frontend, replace the admin-style sidebar flow with a compact top-bar layout, a new search-first home page, a consolidated setup page, and a simplified container detail hierarchy that emphasizes summary and source evidence.

**Tech Stack:** FastAPI, SQLAlchemy async, Pydantic, React, React Router, Vite, TypeScript, Tailwind CSS, Vitest, React Testing Library

---

## File Structure

### Backend

- Create: `backend/api/routes/app_home.py`
- Create: `backend/services/app_home_service.py`
- Modify: `backend/api/models.py`
- Modify: `backend/api/routes/api_main.py`
- Test: `backend/tests/test_app_home_service.py`

### Frontend

- Create: `frontend/src/app/pages/SearchHome.tsx`
- Create: `frontend/src/app/pages/Setup.tsx`
- Create: `frontend/src/app/components/search/SearchHero.tsx`
- Create: `frontend/src/app/components/search/RecentContainerList.tsx`
- Create: `frontend/src/app/components/layout/TopNav.tsx`
- Create: `frontend/src/app/components/setup/SetupStateCards.tsx`
- Create: `frontend/src/app/lib/home-state.ts`
- Create: `frontend/src/app/test/setup.ts`
- Create: `frontend/src/app/lib/agentify-api.test.ts`
- Create: `frontend/src/app/lib/home-state.test.ts`
- Create: `frontend/src/app/pages/SearchHome.test.tsx`
- Create: `frontend/src/app/pages/Setup.test.tsx`
- Create: `frontend/src/app/pages/ShipmentDetail.test.tsx`
- Create: `frontend/src/app/routes.test.tsx`
- Modify: `frontend/package.json`
- Modify: `frontend/vite.config.ts`
- Modify: `frontend/src/app/routes.tsx`
- Modify: `frontend/src/app/components/RootLayout.tsx`
- Modify: `frontend/src/app/lib/agentify-api.ts`
- Modify: `frontend/src/app/types/api.ts`
- Modify: `frontend/src/app/pages/ShipmentDetail.tsx`
- Modify: `frontend/src/app/pages/EmailDetail.tsx`
- Test: `frontend/src/app/lib/agentify-api.test.ts`
- Test: `frontend/src/app/lib/home-state.test.ts`

### Cleanup

- Delete or stop routing to: `frontend/src/app/pages/GmailConnection.tsx`
- Delete or stop routing to: `frontend/src/app/pages/EmailSync.tsx`
- Delete or stop routing to: `frontend/src/app/pages/AIChat.tsx`
- Delete or stop routing to: `frontend/src/app/pages/AdvancedSearch.tsx`
- Delete or stop routing to: `frontend/src/app/pages/ReviewQueue.tsx`
- Delete or stop routing to: `frontend/src/app/pages/SyncSettings.tsx`
- Modify: `frontend/README.md`

## Task 1: Add Homepage Aggregate API

**Files:**
- Create: `backend/services/app_home_service.py`
- Create: `backend/api/routes/app_home.py`
- Modify: `backend/api/models.py`
- Modify: `backend/api/routes/api_main.py`
- Test: `backend/tests/test_app_home_service.py`

- [ ] **Step 1: Write the failing backend test for homepage aggregate**

```python
from datetime import datetime, UTC
from types import SimpleNamespace
from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock
from uuid import uuid4

from services.app_home_service import build_app_home_payload


class AppHomeServiceTest(IsolatedAsyncioTestCase):
    async def test_builds_home_payload_from_connections_jobs_and_containers(self):
        connection = SimpleNamespace(
            id=uuid4(),
            account_email="demo-logistics@agentify.vn",
            status="connected",
        )
        latest_job = SimpleNamespace(completed_at=datetime(2026, 6, 8, 4, 35, tzinfo=UTC))
        recent_container = SimpleNamespace(
            container_no="MSCU1234567",
            status_text="Arrival Notice revised",
            eta=datetime(2026, 6, 14, 0, 0, tzinfo=UTC).date(),
            updated_at=datetime(2026, 6, 8, 4, 35, tzinfo=UTC),
        )

        payload = await build_app_home_payload(
            db=AsyncMock(),
            list_connections=AsyncMock(return_value=[connection]),
            get_latest_completed_job=AsyncMock(return_value=latest_job),
            list_recent_containers=AsyncMock(return_value=[recent_container]),
            count_containers=AsyncMock(return_value=3),
        )

        self.assertTrue(payload.has_data)
        self.assertEqual(payload.container_count, 3)
        self.assertEqual(payload.connected_mailboxes[0].account_email, "demo-logistics@agentify.vn")
        self.assertEqual(payload.recent_containers[0].container_no, "MSCU1234567")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./.venv/bin/python -m unittest tests.test_app_home_service -v`

Expected: FAIL with `ModuleNotFoundError` or missing `build_app_home_payload`

- [ ] **Step 3: Add the new response models**

```python
class AppHomeMailbox(BaseModel):
    id: UUID
    account_email: str
    status: str


class AppHomeRecentContainer(BaseModel):
    container_no: str
    status_text: str | None
    eta: date | None
    updated_at: datetime | None


class AppHomeResponse(BaseModel):
    has_data: bool
    container_count: int
    last_sync_at: datetime | None
    connected_mailboxes: list[AppHomeMailbox]
    recent_containers: list[AppHomeRecentContainer]
```

- [ ] **Step 4: Implement the service and route**

```python
@router.get("/api/v1/app-home", response_model=AppHomeResponse)
async def get_app_home(db: AsyncSession = Depends(get_db_session)) -> AppHomeResponse:
    return await build_app_home_payload(db)
```

```python
async def build_app_home_payload(
    db: AsyncSession,
    list_connections=list_gmail_connections,
    get_latest_completed_job=get_latest_completed_sync_job,
    list_recent_containers=get_recent_containers,
    count_containers=get_container_count,
) -> AppHomeResponse:
    connections = await list_connections(db)
    latest_job = await get_latest_completed_job(db)
    recent_containers = await list_recent_containers(db, limit=6)
    container_count = await count_containers(db)
    return AppHomeResponse(
        has_data=container_count > 0,
        container_count=container_count,
        last_sync_at=latest_job.completed_at if latest_job else None,
        connected_mailboxes=[
            AppHomeMailbox(
                id=connection.id,
                account_email=connection.account_email,
                status=connection.status,
            )
            for connection in connections
        ],
        recent_containers=[
            AppHomeRecentContainer(
                container_no=container.container_no,
                status_text=container.status_text,
                eta=container.eta,
                updated_at=container.updated_at,
            )
            for container in recent_containers
        ],
    )
```

- [ ] **Step 5: Run backend tests and a smoke check**

Run: `cd backend && ./.venv/bin/python -m unittest tests.test_app_home_service -v`

Expected: PASS

Run: `cd backend && ./.venv/bin/python -m compileall api services tests`

Expected: `Compiling ...` with no errors

- [ ] **Step 6: Commit**

```bash
git add backend/api/models.py backend/api/routes/api_main.py backend/api/routes/app_home.py backend/services/app_home_service.py backend/tests/test_app_home_service.py
git commit -m "feat: add app home aggregate endpoint"
```

## Task 2: Add Frontend API Contracts and Test Harness

**Files:**
- Modify: `frontend/package.json`
- Modify: `frontend/vite.config.ts`
- Modify: `frontend/src/app/lib/agentify-api.ts`
- Modify: `frontend/src/app/types/api.ts`
- Create: `frontend/src/app/test/setup.ts`
- Create: `frontend/src/app/lib/agentify-api.test.ts`
- Create: `frontend/src/app/lib/home-state.ts`
- Create: `frontend/src/app/lib/home-state.test.ts`

- [ ] **Step 1: Write failing frontend tests for new API contract and home-state helper**

```ts
import { describe, expect, it } from 'vitest';
import { getPrimaryHomeState } from './home-state';

describe('getPrimaryHomeState', () => {
  it('returns empty when there is no mailbox and no container', () => {
    expect(
      getPrimaryHomeState({
        has_data: false,
        container_count: 0,
        last_sync_at: null,
        connected_mailboxes: [],
        recent_containers: [],
      }),
    ).toBe('empty');
  });
});
```

```ts
import { describe, expect, it, vi } from 'vitest';
import { getAppHome } from './agentify-api';

describe('getAppHome', () => {
  it('calls the app-home endpoint', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ has_data: false, container_count: 0, last_sync_at: null, connected_mailboxes: [], recent_containers: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await getAppHome();

    expect(fetchSpy).toHaveBeenCalledWith('/api/v1/app-home', expect.anything());
    fetchSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd frontend && npm run test`

Expected: FAIL because `test` script and helper files do not exist yet

- [ ] **Step 3: Add minimal Vitest support and new API types**

```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "test": "vitest run"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.6.3",
    "@testing-library/react": "16.1.0",
    "@testing-library/user-event": "14.5.2",
    "jsdom": "25.0.1",
    "vitest": "2.1.9"
  }
}
```

```ts
export interface AppHomeResponse {
  has_data: boolean;
  container_count: number;
  last_sync_at: string | null;
  connected_mailboxes: Array<{
    id: string;
    account_email: string;
    status: string;
  }>;
  recent_containers: Array<{
    container_no: string;
    status_text: string | null;
    eta: string | null;
    updated_at: string | null;
  }>;
}
```

- [ ] **Step 4: Implement the frontend API call and home-state helper**

```ts
export function getAppHome() {
  return apiRequest<AppHomeResponse>('/api/v1/app-home');
}
```

```ts
import type { AppHomeResponse } from '../types/api';

export function getPrimaryHomeState(home: AppHomeResponse): 'empty' | 'ready' | 'needs_sync' {
  if (home.container_count > 0) {
    return 'ready';
  }
  if (home.connected_mailboxes.length > 0) {
    return 'needs_sync';
  }
  return 'empty';
}
```

- [ ] **Step 5: Run frontend tests**

Run: `cd frontend && npm run test`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add frontend/package.json frontend/vite.config.ts frontend/src/app/lib/agentify-api.ts frontend/src/app/types/api.ts frontend/src/app/test/setup.ts frontend/src/app/lib/agentify-api.test.ts frontend/src/app/lib/home-state.ts frontend/src/app/lib/home-state.test.ts
git commit -m "test: add frontend contract coverage for search home"
```

## Task 3: Replace Sidebar Layout With Search-First Home and Top Nav

**Files:**
- Create: `frontend/src/app/components/layout/TopNav.tsx`
- Create: `frontend/src/app/components/search/SearchHero.tsx`
- Create: `frontend/src/app/components/search/RecentContainerList.tsx`
- Create: `frontend/src/app/pages/SearchHome.tsx`
- Create: `frontend/src/app/pages/SearchHome.test.tsx`
- Modify: `frontend/src/app/components/RootLayout.tsx`
- Modify: `frontend/src/app/routes.tsx`

- [ ] **Step 1: Write the failing search-home behavior test**

```ts
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SearchHome } from '../pages/SearchHome';

it('shows the lookup placeholder on the home page', async () => {
  render(
    <MemoryRouter>
      <SearchHome />
    </MemoryRouter>,
  );

  expect(screen.getByPlaceholderText('Nhập container / booking / B/L / PO')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd frontend && npm run test`

Expected: FAIL because `SearchHome` does not exist yet

- [ ] **Step 3: Build the new top navigation and root layout**

```tsx
export function TopNav() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
            AG
          </div>
          <div>
            <p className="font-semibold text-foreground">Agentify</p>
            <p className="text-xs text-muted-foreground">Container Lookup Prototype</p>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className="text-sm font-medium text-foreground">Tra cứu</Link>
          <Link to="/setup" className="rounded-lg border border-border px-4 py-2 text-sm text-foreground">
            Thiết lập dữ liệu
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Build the search-first home page**

```tsx
export function SearchHome() {
  const [query, setQuery] = useState('');
  const [home, setHome] = useState<AppHomeResponse | null>(null);
  const [results, setResults] = useState<ContainerListItem[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <SearchHero
          query={query}
          onQueryChange={setQuery}
          placeholder="Nhập container / booking / B/L / PO"
        />
        <RecentContainerList
          title={query ? 'Kết quả tra cứu' : 'Container gần đây'}
          containers={query ? results : home?.recent_containers ?? []}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Switch routes to the new IA**

```tsx
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: SearchHome },
      { path: 'setup', Component: Setup },
      { path: 'containers/:containerNo', Component: ShipmentDetail },
      { path: 'emails/:id', Component: EmailDetail },
    ],
  },
]);
```

- [ ] **Step 6: Run tests and build**

Run: `cd frontend && npm run test`

Expected: PASS

Run: `cd frontend && npm run build`

Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add frontend/src/app/components/layout/TopNav.tsx frontend/src/app/components/search/SearchHero.tsx frontend/src/app/components/search/RecentContainerList.tsx frontend/src/app/pages/SearchHome.tsx frontend/src/app/components/RootLayout.tsx frontend/src/app/routes.tsx
git commit -m "feat: add search-first home and top navigation"
```

## Task 4: Consolidate Gmail and Sync Into a Single Setup Page

**Files:**
- Create: `frontend/src/app/pages/Setup.tsx`
- Create: `frontend/src/app/pages/Setup.test.tsx`
- Create: `frontend/src/app/components/setup/SetupStateCards.tsx`
- Modify: `frontend/src/app/pages/GmailConnection.tsx`
- Modify: `frontend/src/app/pages/EmailSync.tsx`
- Modify: `frontend/src/app/routes.tsx`

- [ ] **Step 1: Write the failing setup-page test**

```ts
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Setup } from '../pages/Setup';

it('shows both gmail setup and sync setup sections', () => {
  render(
    <MemoryRouter>
      <Setup />
    </MemoryRouter>,
  );

  expect(screen.getByText('Mailbox Gmail')).toBeInTheDocument();
  expect(screen.getByText('Tạo sync job')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npm run test`

Expected: FAIL because `Setup` does not exist yet

- [ ] **Step 3: Reuse the current data flows inside a single setup page**

```tsx
export function Setup() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Thiết lập dữ liệu</h1>
          <p className="text-muted-foreground">
            Kết nối mailbox, chạy sync, và kiểm tra email nguồn ở cùng một nơi.
          </p>
        </header>
        <SetupStateCards />
        <section className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
          <GmailConnectionPanel />
          <SyncJobPanel />
        </section>
        <RecentSyncJobsPanel />
        <RecentEmailsPanel />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Convert existing Gmail and sync pages into internal panels or extract shared sections**

```tsx
export function GmailConnectionPanel() {
  // existing form + mailbox list logic from GmailConnection
}

export function SyncJobPanel() {
  // existing create job + stats logic from EmailSync
}
```

- [ ] **Step 5: Verify setup flow**

Run: `cd frontend && npm run test`

Expected: PASS

Run: `cd frontend && npm run build`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add frontend/src/app/pages/Setup.tsx frontend/src/app/components/setup/SetupStateCards.tsx frontend/src/app/pages/GmailConnection.tsx frontend/src/app/pages/EmailSync.tsx frontend/src/app/routes.tsx
git commit -m "feat: consolidate gmail and sync into setup page"
```

## Task 5: Simplify Container Detail and Reframe Email Detail

**Files:**
- Modify: `frontend/src/app/pages/ShipmentDetail.tsx`
- Create: `frontend/src/app/pages/ShipmentDetail.test.tsx`
- Modify: `frontend/src/app/pages/EmailDetail.tsx`
- Modify: `frontend/src/app/lib/format.ts` (only if a small formatter helper is needed)

- [ ] **Step 1: Write the failing detail-page test**

```ts
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ShipmentDetail } from '../pages/ShipmentDetail';

it('prioritizes source evidence section in the container detail page', async () => {
  render(
    <MemoryRouter>
      <ShipmentDetail />
    </MemoryRouter>,
  );

  expect(screen.getByText('Nguồn dữ liệu')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npm run test`

Expected: FAIL because the new copy and hierarchy do not exist yet

- [ ] **Step 3: Reorder the container detail page around summary, key fields, and evidence**

```tsx
<section className="rounded-2xl border border-border bg-card p-6">
  <p className="text-sm text-muted-foreground">Container</p>
  <h1 className="mt-1 font-mono text-3xl font-semibold text-foreground">{container.container_no}</h1>
  <div className="mt-4 grid gap-4 md:grid-cols-4">
    <SummaryMetric label="ETA" value={formatDate(container.eta)} />
    <SummaryMetric label="ETD" value={formatDate(container.etd)} />
    <SummaryMetric label="Tuyến" value={`${container.pol || '-'} -> ${container.pod || '-'}`} />
    <SummaryMetric label="Cập nhật" value={formatDateTime(container.updated_at)} />
  </div>
</section>
```

```tsx
<section className="rounded-2xl border border-border bg-card p-6">
  <h2 className="font-medium text-card-foreground">Nguồn dữ liệu</h2>
  <p className="mt-1 text-sm text-muted-foreground">
    Mỗi field bên dưới cho biết giá trị hiện tại đến từ email hoặc PDF nào.
  </p>
</section>
```

- [ ] **Step 4: Reframe email detail as evidence drill-down**

```tsx
<p className="mt-2 text-muted-foreground">
  Dùng màn này để kiểm tra email nguồn, attachment, và các field đã được trích xuất cho container.
</p>
```

- [ ] **Step 5: Verify the redesigned pages**

Run: `cd frontend && npm run test`

Expected: PASS

Run: `cd frontend && npm run build`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add frontend/src/app/pages/ShipmentDetail.tsx frontend/src/app/pages/EmailDetail.tsx frontend/src/app/lib/format.ts
git commit -m "feat: simplify detail pages around summary and evidence"
```

## Task 6: Remove Dead Routes, Align Copy, and Update Docs

**Files:**
- Modify: `frontend/src/app/routes.tsx`
- Create: `frontend/src/app/routes.test.tsx`
- Delete or stop routing to: `frontend/src/app/pages/AIChat.tsx`
- Delete or stop routing to: `frontend/src/app/pages/AdvancedSearch.tsx`
- Delete or stop routing to: `frontend/src/app/pages/ReviewQueue.tsx`
- Delete or stop routing to: `frontend/src/app/pages/SyncSettings.tsx`
- Modify: `frontend/README.md`

- [ ] **Step 1: Write the failing route regression check**

```ts
import { router } from '../routes';

it('does not expose legacy top-level prototype routes', () => {
  const paths = router.routes[0].children?.map((route) => route.path ?? 'index') ?? [];
  expect(paths).not.toContain('sync');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npm run test`

Expected: FAIL while legacy routes still exist

- [ ] **Step 3: Remove legacy routing and update docs**

```md
## Current UI Flow

1. Open `/`
2. Search by `container / booking / B/L / PO`
3. Open container detail
4. Use `/setup` only when managing Gmail connections or sync jobs
```

- [ ] **Step 4: Run final verification**

Run: `cd frontend && npm run test`

Expected: PASS

Run: `cd frontend && npm run build`

Expected: PASS

Run: `cd backend && ./.venv/bin/python -m unittest tests.test_app_home_service -v`

Expected: PASS

Run: `cd backend && ./.venv/bin/python -m compileall api services tests`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/routes.tsx frontend/README.md frontend/src/app/pages/AIChat.tsx frontend/src/app/pages/AdvancedSearch.tsx frontend/src/app/pages/ReviewQueue.tsx frontend/src/app/pages/SyncSettings.tsx
git commit -m "chore: remove legacy routes from prototype ui"
```

## Self-Review

### Spec coverage

- Search-first landing page: covered by Task 3
- Setup page consolidation: covered by Task 4
- Detail-page hierarchy: covered by Task 5
- Homepage aggregate API: covered by Task 1
- API contract updates on frontend: covered by Task 2
- Removal of admin-style legacy routes: covered by Task 6

### Placeholder scan

- No `TODO` or `TBD` placeholders remain
- Every task lists exact files and concrete commands

### Type consistency

- `AppHomeResponse` is introduced in both backend and frontend tasks
- Routes consistently use `/setup` and `/containers/:containerNo`
- Existing `ContainerListItem` remains the base list/detail summary type

## Notes For Execution

- Implement backend `app-home` first so the new homepage can ship without multi-request orchestration.
- If frontend tests feel too heavy to add broadly, keep them limited to the API contract and home-state helpers; do not skip backend verification.
- Do not expand scope into OCR, AI chat, or review queue during this redesign.
