import { useState } from 'react';
import { bookingApiService } from '@/services/api/booking';
import { ChangeBookingParams, GetShiftingDateParams } from '@/lib/interface/booking';
import { BookingRescheduleFormValues } from '@/lib/interface/booking';

export function useBooking() {
    const [shiftingDate, setShiftingDate] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const getShiftingDate = async ({ schedulebooking_id }: { schedulebooking_id: number }) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await bookingApiService.getShiftingDate({ schedulebooking_id });
            if (result.status) {
                setShiftingDate(result.msg || '');
            } else {
                setError(result.msg || 'Failed to fetch shifting date');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch shifting date');
        } finally {
            setLoading(false);
        }
    };

    const changeBooking = async ({ schedulebooking_id, reason, action }: { schedulebooking_id: number; reason: string; action: 'shift' | 'cancel'; }) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const params: ChangeBookingParams = { schedulebooking_id, reason, action };
            const result = await bookingApiService.changeBooking(params);
            if (result.status) {
                setSuccess(result.msg || (action === 'shift' ? 'Class rescheduled successfully.' : 'Class cancelled successfully.'));
            } else {
                setError(result.msg || (action === 'shift' ? 'Failed to reschedule class.' : 'Failed to cancel class.'));
            }
        } catch (err: any) {
            setError(err.message || (action === 'shift' ? 'Failed to reschedule class.' : 'Failed to cancel class.'));
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setShiftingDate(null);
        setError(null);
        setSuccess(null);
    };

    return {
        shiftingDate,
        loading,
        error,
        success,
        getShiftingDate,
        changeBooking,
        reset,
    };
} 