import { apiClient } from './client';
import { DashboardStats, SectionStatus } from '../types';

export const getDashboardStats = () => apiClient.get<DashboardStats>('/dashboard/stats');
export const getDashboardSections = () => apiClient.get<SectionStatus[]>('/dashboard/sections');
