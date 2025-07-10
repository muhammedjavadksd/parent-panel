import { apiClient } from '@/services/api';
import type { JoinClassServiceResponse } from '@/lib/interface/joinClass';

export class JoinClassService {
    static async joinClass(schedulebooking_id: string): Promise<JoinClassServiceResponse> {
        try {
            const response = await apiClient.get(`/parent-panel/join-class`, {
                params: { schedulebooking_id },
            });
            const data = response.data;
            return {
                status: data.success,
                msg: data.message,
                data: data.success && data.join_url ? { join_url: data.join_url } : undefined,
            };
        } catch (error: any) {
            const errMsg = error?.response?.data?.error || error?.response?.data?.message || 'Failed to join class';
            return {
                status: false,
                msg: errMsg,
            };
        }
    }
} 