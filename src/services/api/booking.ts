import { apiClient } from '@/services/api';
import {
    GetShiftingDateParams,
    GetShiftingDateResponse,
    ChangeBookingParams,
    ChangeBookingResponse,
} from '@/lib/interface/booking';

export class BookingApiService {
    async getShiftingDate(params: GetShiftingDateParams): Promise<{ status: boolean; msg: string; data?: GetShiftingDateResponse }> {
        try {
            const response = await apiClient.get('/parent-panel/get-shifting-date', {
                params: { schedulebooking_id: params.schedulebooking_id },
            });
            return {
                status: response.data.success,
                msg: response.data.message,
                data: response.data,
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || error.message || 'Failed to get shifting date',
            };
        }
    }

    async changeBooking(params: ChangeBookingParams): Promise<{ status: boolean; msg: string; data?: ChangeBookingResponse }> {
        try {
            const response = await apiClient.post('/parent-panel/change-booking', params);
            return {
                status: response.data.success,
                msg: '',
                data: response.data,
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || error.message || 'Failed to change booking',
            };
        }
    }







    async getReschedulingSlots(schedulebooking_id: number): Promise<{ status: boolean; msg: string; data?: any }> {
        try {
            const response = await apiClient.get(`/parent-panel/get-reschedule-teachers-and-slots/${schedulebooking_id}`
            );
            if (!response.data.success) {       
                throw new Error(response.data.message || 'Failed to get rescheduling slots');
            }
            return {
                status: response.data.success,
                msg: response.data.message,
                data: response.data,
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || error.message || 'Failed to get rescheduling slots',
            };
        }
    }




    async rescheduleToOtherSlot(faculty_id : number,schedulebooking_id: number, dates: [string]): Promise<{ status: boolean; msg: string; data?: any }> {
        try {
            const response = await apiClient.post('/parent-panel/reschedule-class-to-another-slot', {
                faculty_id,
                schedulebooking_id,
                dates,
            });
            return {
                status: response.data.success,
                msg: response.data.message,
                data: response.data,
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || error.message || 'Failed to reschedule booking',
            };
        }
    }




}

export const bookingApiService = new BookingApiService(); 