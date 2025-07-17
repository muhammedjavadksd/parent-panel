import { useState, useCallback, useRef, useEffect } from 'react';
import { JoinClassService } from '@/services/api/joinClass';
import { JoinClassServiceResponse } from '@/lib/interface/joinClass';

export const useJoinClass = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pollingMessage, setPollingMessage] = useState<string>('');
    const [classStatusMessage, setClassStatusMessage] = useState<string>('');
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const currentScheduleBookingIdRef = useRef<string | null>(null);

    const doJoinClass = useCallback(async (schedulebooking_id: string) => {
        setIsLoading(true);
        setError(null);
        setPollingMessage('');
        setClassStatusMessage('');
        currentScheduleBookingIdRef.current = schedulebooking_id;

        try {
            // Step 1: Check if class has started
            const checkResponse = await JoinClassService.checkIfClassStarted(schedulebooking_id);
            
            if (!checkResponse.status) {
                // Class has not started yet - show the message and start polling
                setClassStatusMessage(checkResponse.msg);
                setPollingMessage(checkResponse.msg);
                setIsPolling(true);
                setIsLoading(false);
                startPolling(schedulebooking_id);
                return;
            }

            // Step 2: Class has started, now try to join
            const joinResponse = await JoinClassService.joinClass(schedulebooking_id);

            if (joinResponse.status && joinResponse.data) {
                // Success - user can join immediately
                setData(joinResponse.data);
                setIsLoading(false);
            } else {
                // Join failed - show error message
                setError(joinResponse.msg || 'Failed to join class');
                setIsLoading(false);
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
                // Step 1: Check if class has started
                const checkResponse = await JoinClassService.checkIfClassStarted(schedulebooking_id);
                
                if (checkResponse.status) {
                    // Class has started, now try to join
                    const joinResponse = await JoinClassService.joinClass(schedulebooking_id);
                    
                    if (joinResponse.status && joinResponse.data) {
                        // Success - stop polling and allow join
                        stopPolling();
                        setData(joinResponse.data);
                        setPollingMessage('Class is now available! You can join.');
                    } else {
                        // Join failed - update message
                        setPollingMessage(joinResponse.msg || 'Failed to join class');
                    }
                } else {
                    // Still not ready - update message
                    setPollingMessage(checkResponse.msg || 'Checking class availability...');
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
        setClassStatusMessage('');
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
        classStatusMessage,
        doJoinClass,
        clearError,
        clearData,
        cancelPolling,
    };
}; 