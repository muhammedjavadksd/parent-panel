import { useState, useCallback } from 'react';
import { homeworkService, HomeworkService } from '@/services/api/homeworkService';
import { HomeworkResponse, HomeworkFilters } from '@/lib/interface/homework';

export const useHomework = () => {
  const [data, setData] = useState<HomeworkResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHomework = useCallback(async (filters: HomeworkFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await HomeworkService.getHomework(filters);

      if (response.status && response.data) {
        setData(response.data);
      } else {
        setError(response.msg);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load homework data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    loadHomework,
    clearError,
    clearData,
  };
}; 