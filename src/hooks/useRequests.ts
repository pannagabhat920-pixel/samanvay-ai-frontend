import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/requests';
import { MaintenanceRequest, CreateRequestPayload, CreateRequestResponse } from '../types';

export const useRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getRequests();
      setRequests(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRequest = async (payload: CreateRequestPayload): Promise<CreateRequestResponse> => {
    const response = await api.createRequest(payload);
    await fetchRequests();
    return response;
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return { requests, loading, error, fetchRequests, createRequest };
};
