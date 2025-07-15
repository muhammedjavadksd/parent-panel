import { useState, useEffect, useCallback } from 'react';
import { profileService, ProfileData } from '@/services/profileService';
import { useChildren } from '@/contexts/ChildrenContext';

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedChild } = useChildren();

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const childId = selectedChild?.id ?? null;
      console.log('Fetching profile for child:', childId);

      const response = await profileService.getProfile(childId);
      
      if (response.status === 'success') {
        setProfileData(response.data);
        console.log('Profile data fetched:', response.data);
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile data';
      setError(errorMessage);
      console.error('Profile fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedChild?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    profileData,
    isLoading,
    error,
    fetchProfile,
    clearError,
  };
};
