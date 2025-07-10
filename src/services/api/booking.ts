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
}

export const bookingApiService = new BookingApiService(); 