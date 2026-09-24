import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/dashboard';
import { DashboardStats, SectionStatus } from '../types';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sections, setSections] = useState<SectionStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, sectionsData] = await Promise.all([
        api.getDashboardStats(),
        api.getDashboardSections()
      ]);
      setStats(statsData);
      setSections(sectionsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { stats, sections, loading, error, refresh: fetchData };
};
