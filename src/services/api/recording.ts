import { apiClient } from '@/services/api';
import type { RecordingServiceResponse } from '@/lib/interface/recording';

export class RecordingService {
    static async getRecording(schedulebooking_id: string): Promise<RecordingServiceResponse> {
        try {
            const response = await apiClient.get(`/parent-panel/recording/${schedulebooking_id}`);
            const data = response.data;
            return {
                status: data.success,
                msg: data.message,
                data: data.success ? data : undefined,
            };
        } catch (error: any) {
            const errMsg = error?.response?.data?.error || error?.response?.data?.message || 'Failed to fetch recording';
            return {
                status: false,
                msg: errMsg,
            };
        }
    }
} 