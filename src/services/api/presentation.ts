import { apiClient } from '@/services/api';
import type { PresentationServiceResponse } from '@/lib/interface/presentation';

export class PresentationService {
    static async getPresentation(schedulebooking_id: string): Promise<PresentationServiceResponse> {
        try {
            const response = await apiClient.get(`/parent-panel/presentation/${schedulebooking_id}`);
            const data = response.data;
            return {
                status: data.success,
                msg: data.message,
                data: data.success && data.data ? data.data : undefined,
            };
        } catch (error: any) {
            const errMsg = error?.response?.data?.error || error?.response?.data?.message || 'Failed to fetch presentation';
            return {
                status: false,
                msg: errMsg,
            };
        }
    }
} 