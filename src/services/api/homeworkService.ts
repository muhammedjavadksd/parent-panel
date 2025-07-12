import { apiClient } from '@/services/api';
import { HomeworkResponse, HomeworkFilters } from '@/lib/interface/homework';

export class HomeworkService {
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
}

export const homeworkService = new HomeworkService(); 