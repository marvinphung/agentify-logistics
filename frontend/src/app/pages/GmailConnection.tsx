import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Check, Database, Mail, RefreshCw, Shield } from 'lucide-react';
import { getHealth, listGmailConnections, upsertGmailConnection } from '../lib/agentify-api';
import type { GmailConnection, HealthResponse } from '../types/api';
import { formatDateTime } from '../lib/format';

const steps = [
  { num: 1, name: 'Kết nối Gmail' },
  { num: 2, name: 'Tạo sync job' },
  { num: 3, name: 'Ingest email + PDF text' },
  { num: 4, name: 'Tra cứu theo container' },
];

const permissions = [
  'Đọc tiêu đề email',
  'Đọc nội dung email',
  'Đọc file PDF text-based',
  'Không gửi hoặc xóa email',
];

const initialForm = {
  account_email: '',
  display_name: '',
  google_account_id: '',
  access_scope: 'gmail.readonly',
  encrypted_refresh_token: 'prototype-token',
  status: 'connected',
};

export function GmailConnection() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [connections, setConnections] = useState<GmailConnection[]>([]);
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function loadData() {
    setIsLoading(true);
    setError(null);
    try {
      const [healthResponse, connectionsResponse] = await Promise.all([
        getHealth(),
        listGmailConnections(),
      ]);
      setHealth(healthResponse);
      setConnections(connectionsResponse);
      if (connectionsResponse[0]) {
        setForm((current) => ({
          ...current,
          account_email: current.account_email || connectionsResponse[0].account_email,
          display_name: current.display_name || connectionsResponse[0].display_name || '',
        }));
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Không tải được dữ liệu.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await upsertGmailConnection({
        account_email: form.account_email,
        display_name: form.display_name || undefined,
        google_account_id: form.google_account_id || undefined,
        encrypted_refresh_token: form.encrypted_refresh_token,
        access_scope: form.access_scope,
        status: form.status,
      });
      setSuccess('Đã lưu kết nối Gmail vào backend.');
      await loadData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Không lưu được kết nối.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-card-foreground">Kết nối Gmail</h1>
              <p className="mt-2 text-muted-foreground">
                Prototype này lưu mailbox kết nối ở backend, sau đó tạo sync job để service ingest xử lý email và PDF.
              </p>
            </div>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent"
            >
              <RefreshCw className="w-4 h-4" />
              Làm mới
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-medium text-card-foreground">Quy trình</h2>
              <div className="mt-4 space-y-3">
                {steps.map((step, index) => (
                  <div key={step.num} className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${
                        index === 0
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      {step.num}
                    </div>
                    <span className={index === 0 ? 'text-foreground' : 'text-muted-foreground'}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="font-medium text-card-foreground">Quyền truy cập</h2>
              </div>
              <div className="mt-4 space-y-3">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-start gap-3">
                    <Check className="mt-0.5 w-4 h-4 text-success" />
                    <span className="text-foreground">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <h2 className="font-medium text-card-foreground">Trạng thái backend</h2>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-accent/30 p-4">
                  <p className="text-sm text-muted-foreground">API</p>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    {health?.status || (isLoading ? 'Đang kiểm tra...' : 'Chưa rõ')}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-accent/30 p-4">
                  <p className="text-sm text-muted-foreground">Database</p>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    {health?.database || (isLoading ? 'Đang kiểm tra...' : 'Chưa rõ')}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Local dev dùng proxy qua Vite. Production nên để frontend gọi same-origin `/api` và `/health`.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <h2 className="font-medium text-card-foreground">Tạo hoặc cập nhật mailbox</h2>
              </div>
              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">Email Gmail</label>
                  <input
                    required
                    value={form.account_email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, account_email: event.target.value }))
                    }
                    placeholder="ops@forwarder-demo.com"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">Tên hiển thị</label>
                  <input
                    value={form.display_name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, display_name: event.target.value }))
                    }
                    placeholder="Ops Forwarder Demo"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">Google Account ID</label>
                  <input
                    value={form.google_account_id}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, google_account_id: event.target.value }))
                    }
                    placeholder="google-account-id"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Mail className="w-4 h-4" />
                  {isSaving ? 'Đang lưu...' : 'Lưu kết nối Gmail'}
                </button>
              </form>
              {success ? <p className="mt-4 text-sm text-success">{success}</p> : null}
              {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-medium text-card-foreground">Mailbox đã lưu</h2>
                <Link to="/sync" className="text-sm font-medium text-primary hover:underline">
                  Sang màn sync
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {connections.map((connection) => (
                  <div key={connection.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">{connection.account_email}</p>
                        <p className="text-sm text-muted-foreground">
                          {connection.display_name || 'Chưa có display name'}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                        {connection.status}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                      <p>Scope: {connection.access_scope || 'gmail.readonly'}</p>
                      <p>Last sync: {formatDateTime(connection.last_synced_at)}</p>
                    </div>
                  </div>
                ))}
                {!isLoading && connections.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                    Chưa có mailbox nào trong backend.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
