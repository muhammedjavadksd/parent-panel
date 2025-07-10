import { GetChildrenResponse } from '@/lib/types/children';
import { apiClient } from './api';

export class ChildrenService {
    /**
     * Get children associated with the parent
     */
    async getChildren(): Promise<GetChildrenResponse> {
        console.log('🔍 ChildrenService: getChildren method called');
        try {
            const response = await apiClient.get<GetChildrenResponse>('/parent-panel/get-children');
            console.log('🔍 ChildrenService: API response received:', response);
            return response.data;
        } catch (error) {
            console.error('🔍 ChildrenService: API call failed:', error);
            throw error;
        }
    }
}

export default ChildrenService; 