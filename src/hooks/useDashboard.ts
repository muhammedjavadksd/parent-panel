import { useState, useCallback, useEffect } from 'react';
import { dashboardService } from '@/services/api/dashboardService';
import { useChildren } from '@/hooks/useChildren';
import { DashboardHeaderStatsResponse, UpcomingClass, BookingForCalendar } from '@/lib/interface/dashboard';

export const useDashboard = () => {
    const { selectedChild } = useChildren();

    const [progressOverview, setProgressOverview] = useState<DashboardHeaderStatsResponse | null>(null);
    const [upcomingClass, setUpcomingClass] = useState<UpcomingClass | null>(null);
    const [bookingsForCalendar, setBookingsForCalendar] = useState<BookingForCalendar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProgressOverview = useCallback(async (child_id?: number | null) => {
        setIsLoading(true);
        setError(null);

        try {
            // If no child is selected, pass null to get family-level data
            const response = await dashboardService.getProgressOverview(child_id || 0, 'overall');

            if (response.status && response.data) {
                setProgressOverview(response.data);
                console.log('Progress overview loaded:', response.data);

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

    const retryLoadProgressOverview = useCallback(async (child_id?: number | null) => {
        clearError();
        await loadProgressOverview(child_id);
    }, [clearError, loadProgressOverview]);

    // ✅ Auto-load when child is selected OR when no child is selected (family level)
    useEffect(() => {
        // Always load data - if child is selected, use child_id, otherwise load family-level data
        const childId = selectedChild?.id || null;
        console.log('Loading progress overview for:', childId ? `child ${childId}` : 'family level');
        loadProgressOverview(childId);
    }, [selectedChild?.id, loadProgressOverview]);

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
