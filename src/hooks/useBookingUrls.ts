import { useState, useCallback } from 'react';
import { apiClient } from '@/services/api';

interface BookingUrls {
  demo_booking_url?: string;
  masterclass_booking_url?: string;
  hw_room_booking?: string;
}

interface UseBookingUrlsReturn {
  bookingUrls: BookingUrls | null;
  isLoading: boolean;
  error: string | null;
  fetchBookingUrls: (childId: number) => Promise<void>;
  clearError: () => void;
}

export const useBookingUrls = (): UseBookingUrlsReturn => {
  const [bookingUrls, setBookingUrls] = useState<BookingUrls | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingUrls = useCallback(async (childId: number) => {
    if (!childId) {
      setError('Child ID is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔍 useBookingUrls: Fetching booking URLs for child:', childId);
      
      const response = await apiClient.get(`/parent-panel/classes?child_id=${childId}`);
      
      console.log('🔍 useBookingUrls: API response:', response.data);

      if (response.data.success && response.data.data) {
        const urls: BookingUrls = {
          demo_booking_url: response.data.data.demo_booking_url,
          masterclass_booking_url: response.data.data.masterclass_booking_url,
          hw_room_booking: response.data.data.hw_room_booking,
        };
        
        setBookingUrls(urls);
        console.log('🔍 useBookingUrls: Booking URLs set:', urls);
      } else {
        setError(response.data.message || 'Failed to fetch booking URLs');
        console.error('🔍 useBookingUrls: API error:', response.data.message);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Failed to fetch booking URLs';
      setError(errorMessage);
      console.error('🔍 useBookingUrls: Exception:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    bookingUrls,
    isLoading,
    error,
    fetchBookingUrls,
    clearError,
  };
}; 