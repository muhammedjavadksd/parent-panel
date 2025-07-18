import { useState } from 'react';
import { bookingApiService } from '@/services/api/booking';
import { ChangeBookingParams, GetShiftingDateParams } from '@/lib/interface/booking';
import { BookingRescheduleFormValues } from '@/lib/interface/booking';
import { c } from 'node_modules/framer-motion/dist/types.d-Bq-Qm38R';

export function useBooking() {
    const [shiftingDate, setShiftingDate] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = useState<any>(null);

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


    //New function to get available slots for rescheduling

    const getAvailableSlots = async (schedulebooking_id: number) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await bookingApiService.getReschedulingSlots(schedulebooking_id);
            if (result.status) {
                setAvailableSlots(result.data);
                console.log('Available slots:', result.data);
                setSuccess('Available slots fetched successfully.');
            } else {
                setError(result.msg || 'Failed to fetch available slots');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch available slots');
        } finally {
            setLoading(false);
        }

    }



    // new function to handle rescheduling to another slot

    const handleReschedule = async (faculty_id : number,schedulebooking_id: number, dates: [string]) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {

            const result = await bookingApiService.rescheduleToOtherSlot(
                faculty_id,
                schedulebooking_id,
                dates
            );

            if (result.status) {
                setSuccess('Class rescheduled successfully.');
                setShiftingDate(null); // Clear shifting date after successful reschedule
            } else {
                setError(result.msg || 'Failed to reschedule class.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to reschedule class.');
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
        getAvailableSlots,
        handleReschedule,
        availableSlots

    };
} 