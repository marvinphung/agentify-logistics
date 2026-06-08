import type { AppHomeResponse } from '../types/api';

export type PrimaryHomeState = 'empty' | 'ready';

export function getPrimaryHomeState(payload: AppHomeResponse): PrimaryHomeState {
  if (payload.container_count > 0 || payload.recent_containers.length > 0) {
    return 'ready';
  }

  if (payload.has_data) {
    return 'ready';
  }

  return 'empty';
}
