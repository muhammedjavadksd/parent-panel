import { apiClient } from '@/services/api';
import { DashboardHeaderStatsResponse } from '@/lib/interface/dashboard';
import { DASHBOARD_CONSTANTS } from '@/shared/constants/dashboard';

export class DashboardService {
    async getProgressOverview(child_id: number): Promise<{ status: boolean; msg: string; data?: DashboardHeaderStatsResponse }> {
        try {
            // If child_id is 0, don't include it in params (family level)
            const params = child_id > 0 ? { child_id } : {};
            
            const response = await apiClient.get(`/parent-panel/dashboard`, {
                params
            });

            return {
                status: response.data.success,
                msg: response.data.message,
                data: response.data
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || 'Failed to fetch progress overview'
            };
        }
    }
}

export const dashboardService = new DashboardService(); 