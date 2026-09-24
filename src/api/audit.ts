import { apiClient } from './client';
import { AuditEvent } from '../types';

export const getAuditEvents = () => apiClient.get<AuditEvent[]>('/audit');
