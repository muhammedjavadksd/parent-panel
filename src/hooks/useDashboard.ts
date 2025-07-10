import { useState, useCallback } from 'react';
import { dashboardService } from '@/services/api/dashboardService';
import { DashboardHeaderStatsResponse, UpcomingClass, BookingForCalendar } from '@/lib/interface/dashboard';

export const useDashboard = () => {
    const [progressOverview, setProgressOverview] = useState<DashboardHeaderStatsResponse | null>(null);
    const [upcomingClass, setUpcomingClass] = useState<UpcomingClass | null>(null);
    const [bookingsForCalendar, setBookingsForCalendar] = useState<BookingForCalendar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProgressOverview = useCallback(async (child_id: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await dashboardService.getProgressOverview(child_id);

            if (response.status && response.data) {
                setProgressOverview(response.data);

                // Extract upcoming class and bookings from the response
                if (response.data.upcoming_class_parent_level) {
                    setUpcomingClass(response.data.upcoming_class_parent_level);
                }

                if (response.data.bookings_for_calendar) {
                    setBookingsForCalendar(response.data.bookings_for_calendar);
                }
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load progress overview');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const retryLoadProgressOverview = useCallback(async (child_id: number) => {
        clearError();
        await loadProgressOverview(child_id);
    }, [clearError, loadProgressOverview]);

    return {
        progressOverview,
        upcomingClass,
        bookingsForCalendar,
        isLoading,
        error,
        loadProgressOverview,
        retryLoadProgressOverview,
        clearError,
    };
}; 