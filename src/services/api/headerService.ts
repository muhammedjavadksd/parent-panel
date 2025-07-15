import { apiClient } from '@/services/api';
import { ProgressOverview } from '@/lib/interface/dashboard';

interface RenewalSection {
  classes_left: number;
  customer_type: string;
  developer_note: string;
}

interface HeaderData {
  progress_overview: ProgressOverview;
  renewal_section: RenewalSection;
}

interface HeaderStatsResponse {
  status: boolean;
  msg: string;
  data?: HeaderData;
}

class HeaderService {
  async getHeader(child_id: number): Promise<HeaderStatsResponse> {
    try {
      const params: Record<string, any> = {};

      if (child_id > 0) {
        params.child_id = child_id;
      }

      const response = await apiClient.get(`/parent-panel/header`, { params });
      console.log('Header response:', response.data);

      return {
        status: response.data.success,
        msg: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to fetch header info',
      };
    }
  }
}

export const headerService = new HeaderService();
