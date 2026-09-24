import { apiClient } from './client';
import { MaintenanceRequest, CreateRequestPayload, CreateRequestResponse } from '../types';

export const getRequests = () => apiClient.get<MaintenanceRequest[]>('/requests');
export const getRequest = (requestId: string) => apiClient.get<MaintenanceRequest>(`/requests/${requestId}`);
export const createRequest = (data: CreateRequestPayload) => apiClient.post<CreateRequestResponse>('/requests', data);
