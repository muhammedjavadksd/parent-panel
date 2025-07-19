import { apiClient } from '@/services/api';
import { HomeworkResponse, HomeworkFilters } from '@/lib/interface/homework';

/**
 * Interface for the single homework data structure.
 */
export interface SingleHomeworkData {
  type: string;
  embed_url: string;
  download_url: string;
}

export class HomeworkService {
  /**
   * Fetches the list of all homework assignments.
   */
  static async getHomework(filters: HomeworkFilters): Promise<{
    status: boolean;
    msg: string;
    data?: HomeworkResponse;
  }> {
    try {
      const response = await apiClient.get('/parent-panel/homework-page', {
        params: filters
      });

      return {
        status: response.data.success,
        msg: response.data.message || '',
        data: response.data
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to fetch homework data'
      };
    }
  }

  /**
   * Fetches a single homework item by its scheduled booking ID.
   */
  static async getSingleHomework(scheduledBookingId: string): Promise<{
    status: boolean;
    msg: string;
    data?: SingleHomeworkData;
  }> {
    try {
      // Note: Corrected the endpoint from 'scheduledbokkkkngaiid' to use the variable.
      const response = await apiClient.get(
        `/parent-panel/single-homework-view/${scheduledBookingId}`
      );

      return {
        status: response.data.success,
        msg: response.data.message || '',
        data: response.data.data // We return the nested 'data' object directly
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to fetch single homework data'
      };
    }
  }
}

export const homeworkService = new HomeworkService();