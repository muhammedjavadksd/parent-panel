export interface Parent {
    id: number;
    parent_name: string;
    mobile_number: string;
    email?: string;
    address?: string;
    available_points?: number;
    [key: string]: string | number | undefined; // For additional fields
}

export interface LoginResponse {
    success: boolean;
    message: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    parent: Parent;
    refresh_token: string;
}

export interface SendOtpResponse {
    status: string;
    message: string;
}

export interface ResetPasswordRequest {
    mobile_number: string;
    otp: string;
    new_password: string;
}

export interface ResetPasswordResponse {
    success: boolean;
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

export interface LoginCredentials {
    mobile_number: string;
    password: string;
    country_code?: string;
} 