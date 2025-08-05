import { useState, useCallback } from 'react';
import { HomeworkService } from '@/services/api/homeworkService';
// Make sure to export SingleHomeworkData from your interface file
import { HomeworkResponse, HomeworkFilters, SingleHomeworkData } from '@/lib/interface/homework';
import { SubmittedHomeworkFilesResponse } from '@/services/api/homeworkService';

export const useHomework = () => {
  // --- State for Homework List ---
  const [data, setData] = useState<HomeworkResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- State for Single Homework ---
  const [singleData, setSingleData] = useState<SingleHomeworkData | null>(null);
  const [isSingleLoading, setIsSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);

  // --- State for Submitted Homework Files ---
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedHomeworkFilesResponse | null>(null);
  const [isSubmittedFilesLoading, setIsSubmittedFilesLoading] = useState(false);
  const [submittedFilesError, setSubmittedFilesError] = useState<string | null>(null);

  /**
   * Loads a list of homework based on filters.
   */
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

  /**
   * Loads a single homework item by its ID.
   */
  const loadSingleHomework = useCallback(async (scheduledBookingId: string) => {
    setIsSingleLoading(true);
    setSingleError(null);
    try {
      const response = await HomeworkService.getSingleHomework(scheduledBookingId);
      if (response.status && response.data) {
        setSingleData(response.data);
      } else {
        setSingleError(response.msg);
      }
    } catch (err: any) {
      setSingleError(err.message || 'Failed to load single homework data');
    } finally {
      setIsSingleLoading(false);
    }
  }, []);

  /**
   * Loads submitted homework files for a specific class schedule booking ID.
   */
  const loadSubmittedHomeworkFiles = useCallback(async (classschedulebookingId: number) => {
    setIsSubmittedFilesLoading(true);
    setSubmittedFilesError(null);
    try {
      const response = await HomeworkService.getSubmittedHomeworkFiles(classschedulebookingId);
      if (response.status && response.data) {
        setSubmittedFiles(response.data);
      } else {
        setSubmittedFilesError(response.msg);
      }
    } catch (err: any) {
      setSubmittedFilesError(err.message || 'Failed to load submitted homework files');
    } finally {
      setIsSubmittedFilesLoading(false);
    }
  }, []);

  // --- Utility Functions ---
  const clearError = useCallback(() => setError(null), []);
  const clearData = useCallback(() => setData(null), []);
  const clearSingleError = useCallback(() => setSingleError(null), []);
  const clearSingleData = useCallback(() => setSingleData(null), []);
  const clearSubmittedFilesError = useCallback(() => setSubmittedFilesError(null), []);
  const clearSubmittedFiles = useCallback(() => setSubmittedFiles(null), []);

  return {
    // Homework List properties
    data,
    isLoading,
    error,
    loadHomework,
    clearData,
    clearError,

    // Single Homework properties
    singleData,
    isSingleLoading,
    singleError,
    loadSingleHomework,
    clearSingleData,
    clearSingleError,

    // Submitted Homework Files properties
    submittedFiles,
    isSubmittedFilesLoading,
    submittedFilesError,
    loadSubmittedHomeworkFiles,
    clearSubmittedFiles,
    clearSubmittedFilesError,
  };
};