import { apiClient } from './client';
import { Standard } from '../types';

export interface StandardsResponse {
  INDIAN_RAILWAY_REFERENCES: Array<Omit<Standard, 'type'>>;
  GENERAL_ENGINEERING_REFERENCES: Array<Omit<Standard, 'type'>>;
}

export const getStandards = () => apiClient.get<StandardsResponse>('/standards');
