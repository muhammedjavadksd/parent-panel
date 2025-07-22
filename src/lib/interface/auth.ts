export interface Parent {
    id: number;
    parent_name: string;
    mobile_number: string;
    email?: string;
    address?: string;
    available_points?: number;
    [key: string]: string | number | undefined;
}

export interface LoginCredentials {
    mobile_number: string;
    password: string;
}

export interface LoginOtpCredentials {
    mobile_number: string;
    otp: string;
}

export interface LoginResponse {
    success: boolean;
    error: string;
    message: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    parent: Parent;
    refresh_token: string;
}

// export interface LoginOtpResponse {
//     access_token: string;
// }

export interface LoginOtpResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
  };
}

export interface SendOtpResponse {
    success: boolean;
    message: string;
}

export interface ResetPasswordRequest {
    mobile_number: string;
    otp: string;
    new_password: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    error?: string;
    message: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    parent: Parent;
    refresh_token: string;
}

export interface FeedbackSubmission {
    classschedule_id: number;
    class_id: number;
    parent_id: number;
    classschedulebooking_id: number;
    type: "class_feedback";
    engagement: "Yes" | "No"|null;
    learning: "Yes" | "No"|null;
    instructor: "Yes" | "No"|null;
    classroom_platform: "Yes" | "No"|null;
    low_on_learning: "Yes" | "No"|null;
    low_on_engagement: "Yes" | "No"|null;
    instructor_not_prepared: "Yes" | "No"|null;
    system_issues: "Yes" | "No"|null;
    other: string;
    rating: number;
    ready_to_enroll: "Yes" | "No" | "Need_Details"|null;
}

export interface FeedbackResponse {
    success: boolean;
    message: string;
    data?: FeedbackData;
}

export interface FeedbackData {
    id: string;
    classschedule_id: string;
    class_id: string;
    parent_id: string;
    classschedulebooking_id: string;
    type: string;
    engagement: string | null;
    learning: string | null;
    instructor: string | null;
    classroom_platform: string | null;
    low_on_learning: string | null;
    low_on_engagement: string | null;
    instructor_not_prepared: string | null;
    system_issues: string | null;
    other: string | null;
    rating: number;
    ready_to_enroll: string | null;
    [key: string]: any;
}

export interface AuthState {
    user: Parent | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
} 