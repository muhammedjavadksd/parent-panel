export interface GetShiftingDateParams {
    schedulebooking_id: number;
}

export interface GetShiftingDateResponse {
    success: boolean;
    message: string;
}

export interface ChangeBookingParams {
    schedulebooking_id: number;
    reason: string;
    action: 'cancel' | 'shift';
}

export interface ChangeBookingResponse {
    success: boolean;
    data: string;
}

export interface BookingRescheduleFormValues {
    reason: string;
} 