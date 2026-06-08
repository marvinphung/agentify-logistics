import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { FileText, Mail, RefreshCw, Search } from 'lucide-react';
import {
  createSyncJob,
  listEmails,
  listGmailConnections,
  listSyncJobs,
} from '../lib/agentify-api';
import type { EmailListItem, GmailConnection, SyncJob } from '../types/api';
import { formatDateTime } from '../lib/format';

export function EmailSync() {
  const [connections, setConnections] = useState<GmailConnection[]>([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState('');
  const [jobs, setJobs] = useState<SyncJob[]>([]);
  const [emails, setEmails] = useState<EmailListItem[]>([]);
  const [query, setQuery] = useState('newer_than:30d');
  const [maxResults, setMaxResults] = useState(200);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function loadPage(connectionId?: string) {
    setIsLoading(true);
    setError(null);
    try {
      const loadedConnections = await listGmailConnections();
      const activeConnectionId = connectionId || selectedConnectionId || loadedConnections[0]?.id || '';
      setConnections(loadedConnections);
      setSelectedConnectionId(activeConnectionId);

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

      setJobs(jobsResponse.items);
      setEmails(emailsResponse.items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Không tải được dữ liệu sync.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (!selectedConnectionId) {
      return;
    }
    loadPage(selectedConnectionId);
  }, [selectedConnectionId]);

  const stats = useMemo(() => {
    const latestJob = jobs[0];
    return {
      totalEmails: emails.length,
      attachmentsFound: latestJob?.attachments_found || 0,
      pdfExtracted: latestJob?.pdf_text_extracted || 0,
      containersUpserted: latestJob?.containers_upserted || 0,
    };
  }, [emails.length, jobs]);

  async function handleCreateJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedConnectionId) {
      setError('Cần chọn một Gmail connection trước khi tạo sync job.');
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
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Sync Email</h1>
            <p className="mt-2 text-muted-foreground">
              Màn này dùng trực tiếp `gmail_connections`, `sync_jobs` và `emails` từ backend.
            </p>
          </div>
          <button
            onClick={() => loadPage(selectedConnectionId)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent"
          >
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-medium text-card-foreground">Tạo sync job</h2>
              <form className="mt-4 space-y-4" onSubmit={handleCreateJob}>
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">Mailbox</label>
                  <select
                    value={selectedConnectionId}
                    onChange={(event) => setSelectedConnectionId(event.target.value)}
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
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
                  <label className="mb-2 block text-sm text-muted-foreground">Query Gmail</label>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">Max results</label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={maxResults}
                    onChange={(event) => setMaxResults(Number(event.target.value))}
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCreatingJob}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <RefreshCw className="w-4 h-4" />
                  {isCreatingJob ? 'Đang tạo job...' : 'Tạo sync job'}
                </button>
              </form>
              {success ? <p className="mt-4 text-sm text-success">{success}</p> : null}
              {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border border-border p-5">
                <p className="text-2xl font-semibold text-card-foreground">{stats.totalEmails}</p>
                <p className="mt-1 text-sm text-muted-foreground">Email đã lưu</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-5">
                <p className="text-2xl font-semibold text-card-foreground">{stats.containersUpserted}</p>
                <p className="mt-1 text-sm text-muted-foreground">Containers upserted</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-5">
                <p className="text-2xl font-semibold text-card-foreground">{stats.attachmentsFound}</p>
                <p className="mt-1 text-sm text-muted-foreground">Attachments found</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-5">
                <p className="text-2xl font-semibold text-card-foreground">{stats.pdfExtracted}</p>
                <p className="mt-1 text-sm text-muted-foreground">PDF text extracted</p>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-medium text-card-foreground">Pipeline prototype</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                {['Gmail mailbox', 'Sync job', 'Email stored', 'PDF text extracted', 'Facts linked', 'Container lookup'].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="rounded-lg bg-primary/10 px-3 py-2 text-primary">{step}</span>
                    {index < 5 ? <span className="text-muted-foreground">→</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="border-b border-border p-6">
                <h2 className="font-medium text-card-foreground">Sync jobs gần đây</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Thời gian</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Query</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Emails</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Containers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-muted/30">
                        <td className="px-4 py-4 text-sm text-foreground">{formatDateTime(job.created_at)}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">{job.query || '-'}</td>
                        <td className="px-4 py-4 text-sm text-foreground">{job.emails_fetched}</td>
                        <td className="px-4 py-4 text-sm text-foreground">{job.containers_upserted}</td>
                      </tr>
                    ))}
                    {!isLoading && jobs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-muted-foreground">
                          Chưa có sync job nào.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="font-medium text-card-foreground">Email gần đây</h2>
                <Link to="/containers" className="text-sm font-medium text-primary hover:underline">
                  Sang trang containers
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Thời gian</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sender</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Subject</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Containers</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Trích xuất</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Xem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {emails.map((email) => (
                      <tr key={email.id} className="hover:bg-muted/30">
                        <td className="px-4 py-4 text-sm text-foreground">{formatDateTime(email.sent_at)}</td>
                        <td className="px-4 py-4 text-sm text-foreground">{email.from_email}</td>
                        <td className="max-w-sm px-4 py-4 text-sm text-foreground">
                          <div className="line-clamp-2">{email.subject}</div>
                          {email.snippet ? (
                            <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                              {email.snippet}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {email.linked_containers.length > 0 ? (
                              email.linked_containers.map((containerNo) => (
                                <Link
                                  key={containerNo}
                                  to={`/containers/${containerNo}`}
                                  className="rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground"
                                >
                                  {containerNo}
                                </Link>
                              ))
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            {email.fact_count} facts / {email.attachment_count} files
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <Link to={`/emails/${email.id}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                            <Search className="w-4 h-4" />
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {!isLoading && emails.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                          Chưa có email nào được ingest vào backend.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
