import { useEffect, useState, useCallback } from 'react';
import { headerService } from '@/services/api/headerService';
import { useChildren } from '@/hooks/useChildren';

export interface HeaderProgressOverview {
  total_classes: number;
  past_classes: number;
  streak: number;
  coins: number | null;
  rank: number | null;
}

export interface HeaderResponse {
  success: boolean;
  message: string;
  data: {
    renewal_section: {
      classes_left: number;
      customer_type: string;
      developer_note: string;
    };
    progress_overview: HeaderProgressOverview;
  };
}

export const useHeader = () => {
  const { selectedChild } = useChildren();
  const [headerData, setHeaderData] = useState<HeaderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHeaderData = useCallback(async (childId?: number | null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await headerService.getHeader(childId || 0);
      console.log('useHeader response:', response);
      
      // Check if the response has the expected structure
      if (response.status && response.data) {
        // Transform the HeaderService response to match HeaderResponse interface
        setHeaderData({
          success: response.status,
          message: response.msg,
          data: response.data
        });
      } else {
        setError(response.msg || 'Failed to fetch header data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch header data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeaderData(selectedChild?.id || null);
  }, [selectedChild?.id, fetchHeaderData]);

  return {
    headerData,
    loading,
    error,
  };
};
