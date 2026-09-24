import { apiClient } from './client';
import { PriorityRule } from '../types';

export const getPriorityRules = () => apiClient.get<PriorityRule[]>('/priority/rules');
