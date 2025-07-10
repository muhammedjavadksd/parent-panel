import { useState, useCallback } from 'react';
import { PresentationService } from '@/services/api/presentation';
import { PresentationServiceResponse } from '@/lib/interface/presentation';

export const usePresentation = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPresentation = useCallback(async (schedulebooking_id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await PresentationService.getPresentation(schedulebooking_id);

            if (response.status && response.data) {
                setData(response.data);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch presentation');
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
        getPresentation,
        clearError,
        clearData,
    };
}; 