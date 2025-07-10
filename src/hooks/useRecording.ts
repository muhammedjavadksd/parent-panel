import { useState, useCallback } from 'react';
import { RecordingService } from '@/services/api/recording';
import { RecordingServiceResponse } from '@/lib/interface/recording';

export const useRecording = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getRecording = useCallback(async (schedulebooking_id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await RecordingService.getRecording(schedulebooking_id);

            if (response.status && response.data) {
                setData(response.data);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch recording');
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
        getRecording,
        clearError,
        clearData,
    };
}; 