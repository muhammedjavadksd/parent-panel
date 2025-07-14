import { useState, useCallback, useRef, useEffect } from 'react';
import { JoinClassService } from '@/services/api/joinClass';
import { JoinClassServiceResponse } from '@/lib/interface/joinClass';

export const useJoinClass = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pollingMessage, setPollingMessage] = useState<string>('');
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const currentScheduleBookingIdRef = useRef<string | null>(null);

    const doJoinClass = useCallback(async (schedulebooking_id: string) => {
        setIsLoading(true);
        setError(null);
        setPollingMessage('');
        currentScheduleBookingIdRef.current = schedulebooking_id;

        try {
            const response = await JoinClassService.joinClass(schedulebooking_id);

            if (response.status && response.data) {
                // Success - user can join immediately
                setData(response.data);
                setIsLoading(false);
            } else {
                // Not ready yet - start polling
                setPollingMessage(response.msg || 'Checking class availability...');
                setIsPolling(true);
                setIsLoading(false);
                startPolling(schedulebooking_id);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to join class');
            setIsLoading(false);
        }
    }, []);

    const startPolling = useCallback((schedulebooking_id: string) => {
        // Clear any existing interval
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
        }

        // Start polling every 60 seconds
        pollingIntervalRef.current = setInterval(async () => {
            try {
                const response = await JoinClassService.joinClass(schedulebooking_id);
                
                if (response.status && response.data) {
                    // Success - stop polling and allow join
                    stopPolling();
                    setData(response.data);
                    setPollingMessage('Class is now available! You can join.');
                } else {
                    // Still not ready - update message
                    setPollingMessage(response.msg || 'Checking class availability...');
                }
            } catch (err: any) {
                setPollingMessage('Error checking class availability. Retrying...');
            }
        }, 60000); // 60 seconds
    }, []);

    const stopPolling = useCallback(() => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
        setIsPolling(false);
        setPollingMessage('');
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const clearData = useCallback(() => {
        setData(null);
        stopPolling();
    }, [stopPolling]);

    const cancelPolling = useCallback(() => {
        stopPolling();
        setPollingMessage('');
        setError(null);
    }, [stopPolling]);

    // Cleanup polling interval on unmount
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, []);

    return {
        data,
        isLoading,
        isPolling,
        error,
        pollingMessage,
        doJoinClass,
        clearError,
        clearData,
        cancelPolling,
    };
}; 