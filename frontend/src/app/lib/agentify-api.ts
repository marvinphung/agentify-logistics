import { apiRequest, buildQueryString } from './api';
import type {
  AppHomeResponse,
  ContainerDetailResponse,
  ContainerFactsResponse,
  ContainerListResponse,
  EmailDetail,
  EmailListResponse,
  GmailConnection,
  HealthResponse,
  SyncJob,
  SyncJobListResponse,
} from '../types/api';

export function getHealth() {
  return apiRequest<HealthResponse>('/health');
}

export function getAppHome() {
  return apiRequest<AppHomeResponse>('/api/v1/app-home');
}

export function listGmailConnections() {
  return apiRequest<GmailConnection[]>('/api/v1/gmail-connections');
}

export function upsertGmailConnection(payload: {
  account_email: string;
  display_name?: string;
  google_account_id?: string;
  encrypted_refresh_token?: string;
  access_scope?: string;
  status?: string;
}) {
  return apiRequest<GmailConnection>('/api/v1/gmail-connections', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function createSyncJob(payload: {
  gmail_connection_id: string;
  query?: string;
  date_from?: string;
  date_to?: string;
  max_results?: number;
}) {
  return apiRequest<SyncJob>('/api/v1/sync-jobs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listSyncJobs(params?: {
  gmail_connection_id?: string;
  page?: number;
  page_size?: number;
}) {
  return apiRequest<SyncJobListResponse>(
    `/api/v1/sync-jobs${buildQueryString({
      gmail_connection_id: params?.gmail_connection_id,
      page: params?.page ?? 1,
      page_size: params?.page_size ?? 10,
    })}`,
  );
}

export function listContainers(params?: { q?: string; page?: number; page_size?: number }) {
  return apiRequest<ContainerListResponse>(
    `/api/v1/containers${buildQueryString({
      q: params?.q,
      page: params?.page ?? 1,
      page_size: params?.page_size ?? 20,
    })}`,
  );
}

export function getContainer(containerNo: string) {
  return apiRequest<ContainerDetailResponse>(
    `/api/v1/containers/${encodeURIComponent(containerNo)}`,
  );
}

export function getContainerFacts(containerNo: string) {
  return apiRequest<ContainerFactsResponse>(
    `/api/v1/containers/${encodeURIComponent(containerNo)}/facts`,
  );
}

export function listEmails(params?: {
  gmail_connection_id?: string;
  page?: number;
  page_size?: number;
}) {
  return apiRequest<EmailListResponse>(
    `/api/v1/emails${buildQueryString({
      gmail_connection_id: params?.gmail_connection_id,
      page: params?.page ?? 1,
      page_size: params?.page_size ?? 20,
    })}`,
  );
}

export function getEmail(emailId: string) {
  return apiRequest<EmailDetail>(`/api/v1/emails/${encodeURIComponent(emailId)}`);
}
