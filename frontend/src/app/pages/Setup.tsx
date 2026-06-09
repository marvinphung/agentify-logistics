import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Mail, RefreshCw } from 'lucide-react';

import { SetupStateCards } from '../components/setup/SetupStateCards';
import {
  createSyncJob,
  getAppHome,
  getHealth,
  listEmails,
  listGmailConnections,
  listSyncJobs,
  runSyncJob,
  startGmailOAuth,
} from '../lib/agentify-api';
import { formatDateTime } from '../lib/format';
import {
  getConnectionStatusLabel,
  getSyncJobStatusLabel,
} from '../lib/logistics-labels';
import type {
  AppHomeResponse,
  EmailListItem,
  GmailConnection,
  HealthResponse,
  SyncJob,
} from '../types/api';

export function Setup() {
  const [searchParams] = useSearchParams();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [home, setHome] = useState<AppHomeResponse | null>(null);
  const [connections, setConnections] = useState<GmailConnection[]>([]);
  const [jobs, setJobs] = useState<SyncJob[]>([]);
  const [emails, setEmails] = useState<EmailListItem[]>([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState('');
  const [query, setQuery] = useState('newer_than:30d');
  const [maxResults, setMaxResults] = useState(200);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
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

    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Không tải được dữ liệu setup.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    const oauthStatus = searchParams.get('gmail_oauth');
    const message = searchParams.get('message');
    if (oauthStatus === 'success') {
      setSuccess('Đã kết nối Gmail thành công.');
    } else if (oauthStatus === 'error') {
      setError(message || 'Kết nối Gmail không thành công.');
    }
  }, [searchParams]);

  const stats = useMemo(() => {
    const latestJob = jobs[0];
    return {
      attachmentsFound: latestJob?.attachments_found || 0,
      pdfExtracted: latestJob?.pdf_text_extracted || 0,
      containersUpserted: latestJob?.containers_upserted || 0,
    };
  }, [jobs]);

  async function handleConnectGmail() {
    setIsConnecting(true);
    setError(null);
    setSuccess(null);
    try {
      const redirectTo = `${window.location.origin}/setup`;
      const response = await startGmailOAuth(redirectTo);
      window.location.href = response.authorization_url;
    } catch (connectError) {
      setError(connectError instanceof Error ? connectError.message : 'Không khởi tạo được kết nối Gmail.');
    } finally {
      setIsConnecting(false);
    }
  }

  async function handleCreateJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedConnectionId) {
      setError('Cần chọn hộp thư trước khi tạo lần đồng bộ.');
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
      const executedJob = await runSyncJob(job.id);
      setSuccess(`Đã chạy đồng bộ ${executedJob.id}.`);
      await loadPage(selectedConnectionId);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Không chạy được lần đồng bộ.');
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
                Màn thiết lập kỹ thuật
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                Thiết lập dữ liệu
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Toàn bộ phần kỹ thuật được gom vào đây: hộp thư Gmail, lần đồng bộ, email đã đưa
                vào hệ thống và trạng thái backend. Người dùng hằng ngày không cần ở màn này lâu.
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
                <h2 className="text-xl font-semibold text-slate-900">Kết nối Gmail</h2>
              </div>
              <div className="mt-5 space-y-4">
                <p className="text-sm leading-7 text-slate-600">
                  Hộp thư Gmail bây giờ được kết nối bằng OAuth thật. Backend sẽ lưu refresh token
                  và dùng nó để chạy sync job thay vì form demo nhập tay như trước.
                </p>
                <button
                  type="button"
                  onClick={handleConnectGmail}
                  disabled={isConnecting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
                >
                  {isConnecting ? 'Đang chuyển hướng...' : 'Kết nối Gmail với Google'}
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {connections.map((connection) => (
                  <div key={connection.id} className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{connection.account_email}</p>
                        <p className="text-sm text-slate-500">
                          {connection.display_name || 'Chưa có tên hiển thị'}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                        {getConnectionStatusLabel(connection.status)}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                      Đồng bộ gần nhất: {formatDateTime(connection.last_synced_at)}
                    </p>
                  </div>
                ))}
                {!isLoading && connections.length === 0 ? (
                  <div className="rounded-[20px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Chưa có hộp thư nào trong backend.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">Tạo lần đồng bộ</h2>
              <form className="mt-5 space-y-4" onSubmit={handleCreateJob}>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Hộp thư</label>
                  <select
                    value={selectedConnectionId}
                    onChange={(event) => setSelectedConnectionId(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#fcfbf8] px-4 text-slate-900 outline-none focus:border-slate-900"
                  >
                    <option value="">Chọn hộp thư</option>
                    {connections.map((connection) => (
                      <option key={connection.id} value={connection.id}>
                        {connection.account_email}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Bộ lọc Gmail</label>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#fcfbf8] px-4 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Số email tối đa</label>
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
                  {isCreatingJob ? 'Đang chạy...' : 'Tạo và chạy đồng bộ'}
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                  <p className="text-sm text-slate-500">Tệp đính kèm</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {stats.attachmentsFound}
                  </p>
                </div>
                <div className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                  <p className="text-sm text-slate-500">PDF đọc được chữ</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {stats.pdfExtracted}
                  </p>
                </div>
                <div className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                  <p className="text-sm text-slate-500">Container đã cập nhật</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {stats.containersUpserted}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">Các lần đồng bộ gần đây</h2>
              <div className="mt-5 space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{job.query || 'Không có bộ lọc'}</p>
                        <p className="text-sm text-slate-500">
                          {formatDateTime(job.created_at)} • {job.emails_fetched} email
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                        {getSyncJobStatusLabel(job.status)}
                      </span>
                    </div>
                  </div>
                ))}
                {!isLoading && jobs.length === 0 ? (
                  <div className="rounded-[20px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Chưa có lần đồng bộ nào.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Email đã đưa vào hệ thống</h2>
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
                        {email.fact_count} dữ liệu
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
                    Chưa có email nào được đưa vào hệ thống.
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
