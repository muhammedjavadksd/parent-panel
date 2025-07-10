import { apiClient } from '@/services/api';
import { BookingsResponse, BookingFilters } from '@/lib/interface/dashboard';

export class BookingService {
    async getBookings(filters: BookingFilters, child_id?: number): Promise<{ status: boolean; msg: string; data?: BookingsResponse }> {
        try {
            // Clean up filters - only send non-empty values
            const cleanFilters: any = {
                type: filters.type
            };

            // Add child_id if provided (when a specific child is selected, not family)
            if (child_id) {
                cleanFilters.child_id = child_id;
            }

            if (filters.search_child_id !== undefined && filters.search_child_id !== null) {
                cleanFilters.search_child_id = filters.search_child_id;
            }
            if (filters.search_class_id !== undefined && filters.search_class_id !== null) {
                cleanFilters.search_class_id = filters.search_class_id;
            }
            if (filters.class_date && filters.class_date !== '') {
                cleanFilters.class_date = filters.class_date;
            }
            if (filters.page) {
                cleanFilters.page = filters.page;
            }
            if (filters.limit) {
                cleanFilters.limit = filters.limit;
            }

            // Only use POST as per API docs
            const params = new URLSearchParams(cleanFilters);
            const response = await apiClient.get('/parent-panel/get-bookings', {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return {
                status: true,
                msg: 'Bookings retrieved successfully',
                data: response.data
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || error.message || 'Failed to retrieve bookings'
            };
        }
    }
}

export const bookingService = new BookingService(); 