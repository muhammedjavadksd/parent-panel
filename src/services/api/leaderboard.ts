import { apiClient } from '@/services/api';
import { LeaderboardResponse } from '@/lib/interface/leaderboard';

export class LeaderboardApiService {
    async getLeaderboard(child_id: number): Promise<{ status: boolean; msg: string; data?: LeaderboardResponse }> {
        try {
            const response = await apiClient.get('/parent-panel/leaderboard', {
                params: { child_id },
            });
            return {
                status: response.data.success,
                msg: response.data.success ? 'Leaderboard fetched successfully' : (response.data.message || 'Failed to fetch leaderboard'),
                data: response.data,
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || error.message || 'Failed to fetch leaderboard',
            };
        }
    }
}

export const leaderboardApiService = new LeaderboardApiService(); 