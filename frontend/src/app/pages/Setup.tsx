import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Mail, RefreshCw } from 'lucide-react';

import { SetupStateCards } from '../components/setup/SetupStateCards';
import {
  createSyncJob,
  getAppHome,
  getHealth,
  listEmails,
  listGmailConnections,
  listSyncJobs,
  upsertGmailConnection,
} from '../lib/agentify-api';
import { formatDateTime } from '../lib/format';
import type {
  AppHomeResponse,
  EmailListItem,
  GmailConnection,
  HealthResponse,
  SyncJob,
} from '../types/api';

const initialForm = {
  account_email: '',
  display_name: '',
  google_account_id: '',
  access_scope: 'gmail.readonly',
  encrypted_refresh_token: 'prototype-token',
  status: 'connected',
};

export function Setup() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [home, setHome] = useState<AppHomeResponse | null>(null);
  const [connections, setConnections] = useState<GmailConnection[]>([]);
  const [jobs, setJobs] = useState<SyncJob[]>([]);
  const [emails, setEmails] = useState<EmailListItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [selectedConnectionId, setSelectedConnectionId] = useState('');
  const [query, setQuery] = useState('newer_than:30d');
  const [maxResults, setMaxResults] = useState(200);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function loadPage(connectionId?: string) {
    setIsLoading(true);
    setError(null);
    try {
      const [healthResponse, homeResponse, loadedConnections] = await Promise.all([
        getHealth(),
        getAppHome(),
        listGmailConnections(),
      ]);

      const activeConnectionId =
        connectionId || selectedConnectionId || loadedConnections[0]?.id || '';
      const [jobsResponse, emailsResponse] = await Promise.all([
        listSyncJobs({
          gmail_connection_id: activeConnectionId || undefined,
          page_size: 10,
        }),
        listEmails({
          gmail_connection_id: activeConnectionId || undefined,
          page_size: 12,
        }),
      ]);

      setHealth(healthResponse);
      setHome(homeResponse);
      setConnections(loadedConnections);
      setSelectedConnectionId(activeConnectionId);
      setJobs(jobsResponse.items);
      setEmails(emailsResponse.items);

      if (loadedConnections[0]) {
        setForm((current) => ({
          ...current,
          account_email: current.account_email || loadedConnections[0].account_email,
          display_name: current.display_name || loadedConnections[0].display_name || '',
        }));
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Không tải được dữ liệu setup.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  const stats = useMemo(() => {
    const latestJob = jobs[0];
    return {
      attachmentsFound: latestJob?.attachments_found || 0,
      pdfExtracted: latestJob?.pdf_text_extracted || 0,
      containersUpserted: latestJob?.containers_upserted || 0,
    };
  }, [jobs]);

  async function handleSaveMailbox(event: React.FormEvent<HTMLFormElement>) {
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
      setSuccess('Đã lưu mailbox vào backend.');
      await loadPage();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Không lưu được mailbox.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCreateJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedConnectionId) {
      setError('Cần chọn mailbox trước khi tạo sync job.');
      return;
    }

    setIsCreatingJob(true);
    setError(null);
    setSuccess(null);
    try {
      const job = await createSyncJob({
        gmail_connection_id: selectedConnectionId,
        query,
        max_results: maxResults,
      });
      setSuccess(`Đã tạo sync job ${job.id}.`);
      await loadPage(selectedConnectionId);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Không tạo được sync job.');
    } finally {
      setIsCreatingJob(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-8 shadow-[0_16px_60px_rgba(15,23,42,0.04)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                Data setup
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                Thiết lập dữ liệu
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Toàn bộ phần kỹ thuật được gom vào đây: mailbox, sync job, email đã ingest và
                trạng thái backend. User hằng ngày không cần ở màn này lâu.
              </p>
            </div>
            <button
              onClick={() => loadPage(selectedConnectionId)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-[#f6f2ea] px-5 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              <RefreshCw className="h-4 w-4" />
              Làm mới dữ liệu
            </button>
          </div>
        </section>

        <SetupStateCards health={health} home={home} />

        {error ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-slate-500" />
                <h2 className="text-xl font-semibold text-slate-900">Kết nối mailbox</h2>
              </div>
              <form className="mt-5 space-y-4" onSubmit={handleSaveMailbox}>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Email Gmail</label>
                  <input
                    required
                    value={form.account_email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, account_email: event.target.value }))
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#fcfbf8] px-4 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Tên hiển thị</label>
                  <input
                    value={form.display_name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, display_name: event.target.value }))
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#fcfbf8] px-4 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
                >
                  {isSaving ? 'Đang lưu...' : 'Lưu mailbox'}
                </button>
              </form>

              <div className="mt-6 space-y-3">
                {connections.map((connection) => (
                  <div key={connection.id} className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{connection.account_email}</p>
                        <p className="text-sm text-slate-500">
                          {connection.display_name || 'Chưa có display name'}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                        {connection.status}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                      Last sync: {formatDateTime(connection.last_synced_at)}
                    </p>
                  </div>
                ))}
                {!isLoading && connections.length === 0 ? (
                  <div className="rounded-[20px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Chưa có mailbox nào trong backend.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">Tạo sync job</h2>
              <form className="mt-5 space-y-4" onSubmit={handleCreateJob}>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Mailbox</label>
                  <select
                    value={selectedConnectionId}
                    onChange={(event) => setSelectedConnectionId(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#fcfbf8] px-4 text-slate-900 outline-none focus:border-slate-900"
                  >
                    <option value="">Chọn mailbox</option>
                    {connections.map((connection) => (
                      <option key={connection.id} value={connection.id}>
                        {connection.account_email}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Gmail query</label>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#fcfbf8] px-4 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Max results</label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={maxResults}
                    onChange={(event) => setMaxResults(Number(event.target.value))}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#fcfbf8] px-4 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCreatingJob}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#c96d42] px-5 text-sm font-medium text-white transition hover:bg-[#b55f39] disabled:opacity-60"
                >
                  {isCreatingJob ? 'Đang tạo job...' : 'Tạo sync job'}
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                  <p className="text-sm text-slate-500">Attachments</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {stats.attachmentsFound}
                  </p>
                </div>
                <div className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                  <p className="text-sm text-slate-500">PDF text</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {stats.pdfExtracted}
                  </p>
                </div>
                <div className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                  <p className="text-sm text-slate-500">Containers</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {stats.containersUpserted}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">Sync jobs gần đây</h2>
              <div className="mt-5 space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{job.query || 'No query'}</p>
                        <p className="text-sm text-slate-500">
                          {formatDateTime(job.created_at)} • {job.emails_fetched} emails
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
                {!isLoading && jobs.length === 0 ? (
                  <div className="rounded-[20px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Chưa có sync job nào.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Email đã ingest</h2>
                <Link to="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                  Quay lại tra cứu
                </Link>
              </div>
              <div className="mt-5 space-y-3">
                {emails.map((email) => (
                  <Link
                    key={email.id}
                    to={`/emails/${email.id}`}
                    className="block rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4 transition hover:border-slate-900 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{email.subject}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {email.from_email} • {formatDateTime(email.sent_at)}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#f6f2ea] px-3 py-1 text-xs text-slate-600">
                        {email.fact_count} facts
                      </span>
                    </div>
                    {email.linked_containers.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {email.linked_containers.map((containerNo) => (
                          <span
                            key={containerNo}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {containerNo}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </Link>
                ))}
                {!isLoading && emails.length === 0 ? (
                  <div className="rounded-[20px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Chưa có email nào được ingest.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
