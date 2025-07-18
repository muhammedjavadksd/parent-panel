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



// Add these new interfaces to src/lib/interface/booking.ts

export interface TimeSlot {
  start_time: string;
  end_time: string;
}

export interface DailySlots {
  class_date: string;
  slots: TimeSlot[];
}

export interface Teacher {
  faculty_id: number;
  first_name: string;
  last_name: string;
  photo: string;
  bio: string;
}

export interface TeacherSlots {
  teacher: Teacher;
  available_slots: DailySlots[];
}

export interface GetReschedulingSlotsResponse {
  success: boolean;
  message: string;
  data: TeacherSlots[];
}