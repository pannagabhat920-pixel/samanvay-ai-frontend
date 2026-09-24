import { apiClient } from './client';
import { BlockProposal } from '../types';

export const getBlocks = () => apiClient.get<BlockProposal[]>('/blocks');
export const reviewBlock = (
  id: string,
  action: 'APPROVE' | 'REJECT',
  reason: string,
  officer: string,
  officerKey: string
) => apiClient.post<BlockProposal>(
  `/blocks/${id}/review`,
  { decision: action, reason, officer },
  { 'X-Officer-Key': officerKey }
);
