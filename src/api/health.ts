import { apiClient } from './client';

export interface HealthStatus {
  status: 'ok' | string;
  service: string;
  database: 'ok' | string;
}

export const getHealth = () => apiClient.get<HealthStatus>('/health');
