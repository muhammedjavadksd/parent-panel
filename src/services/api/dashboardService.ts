import { apiClient } from '@/services/api';
import { DashboardHeaderStatsResponse } from '@/lib/interface/dashboard';
import { DASHBOARD_CONSTANTS } from '@/shared/constants/dashboard';

export class DashboardService {
    async getProgressOverview(
  child_id: number,
  period: string, 
): Promise<{ status: boolean; msg: string; data?: DashboardHeaderStatsResponse }> {
  try {
    const params: Record<string, any> = {};

    if (child_id > 0) {
      params.child_id = child_id;
    }

    if (period) {
      params.period = period;
    }

    const response = await apiClient.get(`/parent-panel/dashboard`, { params });

    return {
      status: response.data.success,
      msg: response.data.message,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: false,
      msg: error.response?.data?.message || 'Failed to fetch progress overview',
    };
  }
}

}

export const dashboardService = new DashboardService(); 