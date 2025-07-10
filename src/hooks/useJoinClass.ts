import { useState, useCallback } from 'react';
import { JoinClassService } from '@/services/api/joinClass';
import { JoinClassServiceResponse } from '@/lib/interface/joinClass';

export const useJoinClass = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const doJoinClass = useCallback(async (schedulebooking_id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await JoinClassService.joinClass(schedulebooking_id);

            if (response.status && response.data) {
                setData(response.data);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to join class');
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
        doJoinClass,
        clearError,
        clearData,
    };
}; 