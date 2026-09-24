import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/blocks';
import { BlockProposal } from '../types';

export const useBlocks = () => {
  const [blocks, setBlocks] = useState<BlockProposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getBlocks();
      setBlocks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reviewBlock = async (
    id: string,
    action: 'APPROVE' | 'REJECT',
    reason: string,
    officer: string,
    officerKey: string
  ) => {
    await api.reviewBlock(id, action, reason, officer, officerKey);
    await fetchBlocks();
  };

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  return { blocks, loading, error, fetchBlocks, reviewBlock };
};
