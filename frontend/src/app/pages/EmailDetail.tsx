import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, FileText, Mail, Paperclip } from 'lucide-react';
import { getEmail } from '../lib/agentify-api';
import type { EmailDetail as EmailDetailResponse } from '../types/api';
import { formatDateTime, toTitleCase } from '../lib/format';

export function EmailDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<EmailDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadEmail() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getEmail(id);
        setDetail(response);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Không tải được email.');
      } finally {
        setIsLoading(false);
      }
    }

    loadEmail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-[#f7f7f1] p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl rounded-[24px] border border-slate-200 bg-white p-6 text-slate-500">
          Đang tải email...
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-[100dvh] bg-[#f7f7f1] p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl rounded-[24px] border border-slate-200 bg-white p-6">
          <p className="text-rose-700">{error || 'Không tìm thấy email.'}</p>
          <Link to="/setup" className="mt-4 inline-flex text-slate-900 hover:underline">
            Quay lại setup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f1] p-5 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Link
          to="/setup"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại setup
        </Link>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">Chi tiết email nguồn</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Màn này dùng để drill-down khi user muốn kiểm tra email gốc, attachment PDF và các
            field đã extract.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <Mail className="h-5 w-5 text-slate-500" />
                Email metadata
              </h2>
              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-slate-500">From</p>
                  <p className="mt-1 font-medium text-slate-900">{detail.email.from_email}</p>
                </div>
                <div>
                  <p className="text-slate-500">Subject</p>
                  <p className="mt-1 font-medium text-slate-900">{detail.email.subject}</p>
                </div>
                <div>
                  <p className="text-slate-500">Sent at</p>
                  <p className="mt-1 text-slate-900">{formatDateTime(detail.email.sent_at)}</p>
                </div>
                <div>
                  <p className="text-slate-500">To</p>
                  <p className="mt-1 text-slate-900">
                    {detail.email.to_emails.length > 0 ? detail.email.to_emails.join(', ') : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Snippet</p>
                  <p className="mt-1 text-slate-900">{detail.email.snippet || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-500">Body text</p>
                  <div className="mt-2 whitespace-pre-wrap rounded-[20px] border border-slate-200 bg-[#fcfbf8] p-4 text-slate-900">
                    {detail.email.body_text || 'Không có body_text trong DB.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <Paperclip className="h-5 w-5 text-slate-500" />
                Attachments
              </h2>
              <div className="mt-5 space-y-3">
                {detail.attachments.map((attachment) => (
                  <div key={attachment.id} className="rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-900">{attachment.filename}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {attachment.mime_type} • {attachment.document_type || 'Unknown type'}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                        {attachment.text_extract_status}
                      </span>
                    </div>
                  </div>
                ))}
                {detail.attachments.length === 0 ? (
                  <div className="rounded-[22px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Email này chưa có attachment.
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <FileText className="h-5 w-5 text-slate-500" />
                Extracted facts
              </h2>
              <div className="mt-5 space-y-3">
                {detail.extracted_facts.map((fact) => (
                  <div key={fact.id} className="rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-500">{toTitleCase(fact.field_name)}</p>
                        <p className="mt-1 font-medium text-slate-900">{fact.field_value}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                        {fact.document_type || fact.source_type}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate-500">
                      <p>Source: {fact.source_label || fact.source_type}</p>
                      <p>Observed: {formatDateTime(fact.source_sent_at)}</p>
                    </div>
                  </div>
                ))}
                {detail.extracted_facts.length === 0 ? (
                  <div className="rounded-[22px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Email này chưa có extracted facts.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Linked containers</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {detail.linked_containers.map((containerNo) => (
                  <Link
                    key={containerNo}
                    to={`/containers/${containerNo}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-700"
                  >
                    {containerNo}
                  </Link>
                ))}
                {detail.linked_containers.length === 0 ? (
                  <div className="rounded-[22px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Email này chưa link vào container nào.
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
