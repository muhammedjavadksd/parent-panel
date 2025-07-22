import { useState, useCallback } from 'react';
import { bookingService } from '@/services/bookingService';
import { BookingFilters } from '@/lib/interface/dashboard';
import { useChildren } from './useChildren';

export const useBookings = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null); // still holds pagination from the last fetched type
    const [filters, setFilters] = useState<BookingFilters>({ type: 'upcoming' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { selectedChild } = useChildren();

    const loadBookings = useCallback(async (filters: BookingFilters, child_id?: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await bookingService.getBookings(filters, child_id);

            if (response.status && response.data) {
                console.log('Bookings loaded:', response.data.bookings);
                setBookings(response.data.bookings.data || []);
                setPagination(response.data.bookings);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load bookings');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadUpcomingClasses = useCallback((additionalFilters?: Partial<BookingFilters>, child_id?: number) => {
        const upcomingFilters: BookingFilters = {
            type: 'upcoming',
            ...additionalFilters,
        };
        loadBookings(upcomingFilters, child_id);
    }, [loadBookings]);

    const loadPastClasses = useCallback((additionalFilters?: Partial<BookingFilters>, child_id?: number) => {
        const pastFilters: BookingFilters = {
            type: 'past',
            ...additionalFilters,
        };
        loadBookings(pastFilters, child_id);
    }, [loadBookings]);

    // ✅ NEW: Load both upcoming and past, merge and sort
    const loadAllBookings = useCallback(async (child_id?: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const [upcomingResponse, pastResponse] = await Promise.all([
                bookingService.getBookings({ type: 'upcoming' }, child_id),
                bookingService.getBookings({ type: 'past' }, child_id),
            ]);

            const upcoming = upcomingResponse?.data?.bookings?.data || [];
            const past = pastResponse?.data?.bookings?.data || [];

            const all = [...upcoming, ...past].sort((a, b) => {
                const dateA = new Date(`${a.class_date} ${a.start_time}`).getTime();
                const dateB = new Date(`${b.class_date} ${b.start_time}`).getTime();
                return dateA - dateB;
            });

            setBookings(all);
        } catch (err: any) {
            setError(err.message || 'Failed to load all bookings');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateFilters = useCallback((newFilters: Partial<BookingFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const clearBookingData = useCallback(() => {
        setBookings([]);
        setPagination(null);
        setError(null);
    }, []);

    return {
        bookings,
        pagination,
        filters,
        isLoading,
        error,
        loadBookings,
        loadUpcomingClasses,
        loadPastClasses,
        loadAllBookings, // to load both upcoming and past bookings
        updateFilters,
        clearBookingData,
    };
};
