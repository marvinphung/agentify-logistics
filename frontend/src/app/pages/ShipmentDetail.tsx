import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink, FileText, Mail, Ship } from 'lucide-react';
import { getContainer, getContainerFacts } from '../lib/agentify-api';
import type { ContainerDetailResponse, ContainerFact } from '../types/api';
import { formatDate, formatDateTime } from '../lib/format';
import { buildApiUrl } from '../lib/api';
import {
  LOGISTICS_FIELD_LABELS,
  getDocumentTypeLabel,
  getLogisticsFieldLabel,
} from '../lib/logistics-labels';

export function ShipmentDetail() {
  const { containerNo } = useParams();
  const [detail, setDetail] = useState<ContainerDetailResponse | null>(null);
  const [facts, setFacts] = useState<ContainerFact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerNo) {
      return;
    }

    async function loadContainer() {
      setIsLoading(true);
      setError(null);
      try {
        const [detailResponse, factsResponse] = await Promise.all([
          getContainer(containerNo),
          getContainerFacts(containerNo),
        ]);
        setDetail(detailResponse);
        setFacts(factsResponse.items);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Không tải được container.');
      } finally {
        setIsLoading(false);
      }
    }

    loadContainer();
  }, [containerNo]);

  const groupedFacts = useMemo(() => {
    return facts.reduce<Record<string, ContainerFact[]>>((accumulator, fact) => {
      if (!accumulator[fact.field_name]) {
        accumulator[fact.field_name] = [];
      }
      accumulator[fact.field_name].push(fact);
      return accumulator;
    }, {});
  }, [facts]);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-[#f7f7f1] p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl rounded-[24px] border border-slate-200 bg-white p-6 text-slate-500">
          Đang tải chi tiết container...
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-[100dvh] bg-[#f7f7f1] p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl rounded-[24px] border border-slate-200 bg-white p-6">
          <p className="text-rose-700">{error || 'Không tìm thấy container.'}</p>
          <Link to="/" className="mt-4 inline-flex text-slate-900 hover:underline">
            Quay lại tra cứu
          </Link>
        </div>
      </div>
    );
  }

  const { container, related_attachments: relatedAttachments, related_emails: relatedEmails } = detail;

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f1] p-5 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại tra cứu
        </Link>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Mã container</p>
              <h1 className="mt-3 font-mono text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                {container.container_no}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                {container.status_text || 'Chưa có mô tả trạng thái trong dữ liệu hiện tại.'}{' '}
                Thông tin dưới đây là bản tổng hợp mới nhất từ email và PDF đã đọc vào hệ thống.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
              <div className="rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4">
                <p className="text-xs leading-5 text-slate-500">
                  {LOGISTICS_FIELD_LABELS.eta} / {LOGISTICS_FIELD_LABELS.etd}
                </p>
                <div className="mt-2 space-y-1 text-lg font-semibold text-slate-900">
                  <p>{formatDate(container.eta)}</p>
                  <p>{formatDate(container.etd)}</p>
                </div>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4">
                <p className="text-xs leading-5 text-slate-500">
                  {LOGISTICS_FIELD_LABELS.pol} → {LOGISTICS_FIELD_LABELS.pod}
                </p>
                <div className="mt-2 space-y-1 text-lg font-semibold text-slate-900">
                  <p>{container.pol || '-'}</p>
                  <p>{container.pod || '-'}</p>
                </div>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4">
                <p className="text-sm text-slate-500">Nguồn dữ liệu</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {container.source_count} dữ liệu / {container.attachment_count} tệp
                </p>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4">
                <p className="text-sm text-slate-500">Cập nhật</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {formatDateTime(container.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Thông tin chính</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.booking_no}</p>
                  <p className="mt-1 font-mono text-slate-900">{container.booking_no || '-'}</p>
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.bl_no}</p>
                  <p className="mt-1 font-mono text-slate-900">{container.bl_no || '-'}</p>
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.po_no}</p>
                  <p className="mt-1 font-mono text-slate-900">{container.po_no || '-'}</p>
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.updated_at}</p>
                  <p className="mt-1 text-slate-900">{formatDateTime(container.updated_at)}</p>
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.vessel}</p>
                  <p className="mt-1 text-slate-900">{container.vessel || '-'}</p>
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.voyage}</p>
                  <p className="mt-1 text-slate-900">{container.voyage || '-'}</p>
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.pol}</p>
                  <p className="mt-1 text-slate-900">{container.pol || '-'}</p>
                </div>
                <div>
                  <p className="text-xs leading-5 text-slate-500">{LOGISTICS_FIELD_LABELS.pod}</p>
                  <p className="mt-1 text-slate-900">{container.pod || '-'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <Ship className="h-5 w-5 text-slate-500" />
                Nguồn dữ liệu đã trích xuất
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Mỗi field đều giữ lịch sử nguồn để CS/Ops biết giá trị hiện tại đến từ email hoặc
                PDF nào.
              </p>
              <div className="mt-5 space-y-4">
                {Object.entries(groupedFacts).map(([fieldName, fieldFacts]) => (
                  <div key={fieldName} className="rounded-[24px] border border-slate-200 bg-[#fcfbf8] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs leading-5 text-slate-500">
                          {getLogisticsFieldLabel(fieldName)}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {fieldFacts[0]?.field_value || '-'}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                        {fieldFacts.length} nguồn
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {fieldFacts.map((fact) => (
                        <div key={fact.id} className="rounded-[18px] border border-slate-200 bg-white p-4 text-sm">
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium text-slate-900">{fact.field_value}</span>
                            <span className="text-slate-500">{formatDateTime(fact.source_sent_at)}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-slate-500">
                            <span>{getDocumentTypeLabel(fact.document_type || fact.source_type)}</span>
                            <span>•</span>
                            <span>{fact.source_label || 'Không có nhãn nguồn'}</span>
                            {fact.email_id ? (
                              <>
                                <span>•</span>
                                <Link to={`/emails/${fact.email_id}`} className="font-medium text-slate-900 hover:underline">
                                  Mở email
                                </Link>
                              </>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {facts.length === 0 ? (
                  <div className="rounded-[24px] border border-dashed border-slate-300 p-5 text-sm text-slate-500">
                    Container này chưa có fact provenance.
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <Mail className="h-5 w-5 text-slate-500" />
                Email liên quan
              </h2>
              <div className="mt-5 space-y-3">
                {relatedEmails.map((email) => (
                  <Link
                    key={email.id}
                    to={`/emails/${email.id}`}
                    className="block rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4 transition hover:border-slate-900 hover:bg-white"
                  >
                    <p className="font-medium text-slate-900">{email.subject}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span>{email.from_email}</span>
                      <span>•</span>
                      <span>{formatDateTime(email.sent_at)}</span>
                    </div>
                  </Link>
                ))}
                {relatedEmails.length === 0 ? (
                  <div className="rounded-[22px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Chưa có email liên kết trực tiếp với container này.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <FileText className="h-5 w-5 text-slate-500" />
                Tệp đính kèm liên quan
              </h2>
              <div className="mt-5 space-y-3">
                {relatedAttachments.map((attachment) => (
                  <div key={attachment.id} className="rounded-[22px] border border-slate-200 bg-[#fcfbf8] p-4">
                    <p className="font-medium text-slate-900">{attachment.filename}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span>{getDocumentTypeLabel(attachment.document_type)}</span>
                      <span>•</span>
                      <Link to={`/emails/${attachment.email_id}`} className="font-medium text-slate-900 hover:underline">
                        Email nguồn
                      </Link>
                    </div>
                    {attachment.file_url ? (
                      <div className="mt-3">
                        <a
                          href={buildApiUrl(attachment.file_url)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 hover:underline"
                        >
                          Xem PDF
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    ) : null}
                  </div>
                ))}
                {relatedAttachments.length === 0 ? (
                  <div className="rounded-[22px] border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Chưa có attachment liên kết trực tiếp với container này.
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
