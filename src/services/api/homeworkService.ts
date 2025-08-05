import { apiClient } from '@/services/api';
import axios from 'axios';
import { HomeworkResponse, HomeworkFilters } from '@/lib/interface/homework';

/**
 * Interface for the single homework data structure.
 */
export interface SingleHomeworkData {
  type: string;
  embed_url: string;
  download_url: string;
}

/**
 * Interface for submitted homework files response.
 */
export interface SubmittedHomeworkFilesResponse {
  status: string;
  message: string;
  data: Array<{
    homework_file: string;
  }>;
}

/**
 * Interface for homework feedback response.
 */
export interface HomeworkFeedbackResponse {
  status: string;
  message: string;
  data: {
    classschedulebooking_id: string;
    homeworks: Array<{
      homework_file: string;
      comment: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      teacher_comment: string | null;
      teacher_file: string | null;
      teacher_recording: string | null;
      faculty_id: number | null;
    }>;
  };
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

  /**
   * Fetches submitted homework files for a specific class schedule booking ID.
   */
  static async getSubmittedHomeworkFiles(classschedulebookingId: number): Promise<{
    status: boolean;
    msg: string;
    data?: SubmittedHomeworkFilesResponse;
  }> {
    try {
      // Use VITE_BASE_URL for this specific endpoint
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/homework/get-homework/${classschedulebookingId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      return {
        status: response.data.status === 'success',
        msg: response.data.message || '',
        data: response.data
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to fetch submitted homework files'
      };
    }
  }

  /**
   * Fetches homework feedback for a specific class schedule booking ID.
   */
  static async getHomeworkFeedback(classschedulebookingId: number): Promise<{
    status: boolean;
    msg: string;
    data?: HomeworkFeedbackResponse;
  }> {
    try {
      // Use VITE_BASE_URL for this specific endpoint
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/homework/get-feedback/${classschedulebookingId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      return {
        status: response.data.status === 'success',
        msg: response.data.message || '',
        data: response.data
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to fetch homework feedback'
      };
    }
  }
}

export const homeworkService = new HomeworkService();