import { apiClient } from '../api';

export interface ClassInfo {
    pending_homework: number;
    demo_booking_url: string;
    masterclass_booking_url: string;
    hw_room_booking: string;
    enrolled_categories: (string | { id: string | number; name: string })[];
    classes: any[];
    average_score: string;
}

export interface ClassesResponse {
    success: boolean;
    message: string;
    data: ClassInfo;
}

export const getClassesInfo = async (childId: string): Promise<ClassesResponse> => {
    try {
        const response = await apiClient.get(`/parent-panel/classes?child_id=${childId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching classes info:', error);
        throw error;
    }
}; 