import { apiClient } from './api';

export interface ProfileData {
  classes_this_month: number;
  subject_time_distribution: Record<string, number>;
  weekly_activity: {
    Mon: number;
    Tue: number;
    Wed: number;
    Thu: number;
    Fri: number;
    Sat: number;
    Sun: number;
  };
}

export interface ProfileResponse {
  status: string;
  data: ProfileData;
}

export const profileService = {
  async getProfile(childId: number | null): Promise<ProfileResponse> {
    try {
      const url = childId ? `parent-panel/profile?child_id=${childId}` : `parent-panel/profile`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Profile service error:', error);
      throw error;
    }
  }
};

