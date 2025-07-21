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

export interface LoginOtpResponse {
    access_token: string;
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

export interface AuthState {
    user: Parent | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
} 