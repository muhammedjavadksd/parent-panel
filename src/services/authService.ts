import { apiClient } from '@/services/api';
import { LoginCredentials, LoginResponse, ResetPasswordRequest, ResetPasswordResponse, SendOtpResponse, LoginOtpCredentials, LoginOtpResponse } from '@/lib/interface/auth';

export class AuthService {
    async login(credentials: LoginCredentials): Promise<{ status: boolean; msg: string; data?: any }> {
        try {
            const queryParams = new URLSearchParams({
                mobile_number: credentials.mobile_number,
                password: credentials.password
            });

            const response = await apiClient.get<LoginResponse>(`/parent-panel/login?${queryParams.toString()}`);

            if (response.data.success) {
                // Store token in localStorage
                localStorage.setItem('accessToken', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.parent));

                return {
                    status: true,
                    msg: 'Login successful',
                    data: {
                        access_token: response.data.access_token,
                        user: response.data.parent
                    }
                };
            } else {
                return {
                    status: false,
                    msg: response.data.error || 'Login failed'
                };
            }
        } catch (error: any) {
            if (error.response?.data?.error) {
                return {
                    status: false,
                    msg: error.response.data.error
                };
            }

            return {
                status: false,
                msg: error.message || 'Login failed'
            };
        }
    }

    async loginWithOtp(credentials: LoginOtpCredentials): Promise<{ status: boolean; msg: string; data?: any }> {
        try {
            const response = await apiClient.post<LoginOtpResponse>('http://localhost:3000/verify', credentials);

            if (response.data.access_token) {
                // Store token in localStorage
                localStorage.setItem('accessToken', response.data.access_token);
                
                // Try to get user data from the existing API
                let user = null;
                try {
                    const userResponse = await apiClient.get('/parent-panel/profile', {
                        headers: {
                            Authorization: `Bearer ${response.data.access_token}`
                        }
                    });

                    user = userResponse.data.data || userResponse.data.parent;
                } catch (profileError) {
                    console.warn('Could not fetch user profile, creating minimal user object:', profileError);
                    // Create a minimal user object if profile API is not available
                    user = {
                        id: 0, // This will be updated when profile is fetched
                        parent_name: 'User',
                        mobile_number: credentials.mobile_number,
                        available_points: 0
                    };
                }

                localStorage.setItem('user', JSON.stringify(user));

                return {
                    status: true,
                    msg: 'Login successful',
                    data: {
                        access_token: response.data.access_token,
                        user: user
                    }
                };
            } else {
                return {
                    status: false,
                    msg: 'Login failed - no access token received'
                };
            }
        } catch (error: any) {
            if (error.response?.data?.error) {
                return {
                    status: false,
                    msg: error.response.data.error
                };
            }

            if (error.response?.data?.message) {
                return {
                    status: false,
                    msg: error.response.data.message
                };
            }

            return {
                status: false,
                msg: error.message || 'Login failed'
            };
        }
    }

    async forgotPassword(mobileNumber: string): Promise<{ status: boolean; msg: string; data?: any }> {
        try {
            const queryParams = new URLSearchParams({
                mobile_number: mobileNumber
            });

            const response = await apiClient.get<SendOtpResponse>(`/parent-panel/send-otp?${queryParams.toString()}`);

            // Check if the API response indicates success
            const isSuccess: boolean = response.data.success;

            return {
                status: isSuccess,
                msg: response.data.message,
                data: response.data
            };
        } catch (error: any) {
            if (error.response?.data?.message) {
                return {
                    status: false,
                    msg: error.response.data.message
                };
            }

            return {
                status: false,
                msg: error.message || 'Failed to send OTP'
            };
        }
    }

    async resetPassword(data: ResetPasswordRequest): Promise<{ status: boolean; msg: string; data?: any }> {
        try {
            const response = await apiClient.post<ResetPasswordResponse>('/parent-panel/reset-password', data);

            if (response.data.success) {
                // Store token in localStorage
                localStorage.setItem('accessToken', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.parent));

                return {
                    status: true,
                    msg: 'Password reset successful',
                    data: {
                        access_token: response.data.access_token,
                        user: response.data.parent
                    }
                };
            } else {
                return {
                    status: false,
                    msg: response.data.error || 'Password reset failed'
                };
            }
        } catch (error: any) {
            if (error.response?.data?.error) {
                return {
                    status: false,
                    msg: error.response.data.error
                };
            }

            return {
                status: false,
                msg: error.message || 'Failed to reset password'
            };
        }
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }

    getToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
} 