import { useState, useCallback } from 'react';
import { LoginCredentials, ResetPasswordRequest, Parent, LoginOtpCredentials } from '@/lib/interface/auth';
import { authService } from '@/services';

export const useAuth = () => {
    const [user, setUser] = useState<Parent | null>(() => {
        // Initialize user from localStorage if available
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!user;

    const login = useCallback(async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.login(credentials);

            if (result.status) {
                setUser(result.data.user);
                // Use window.location for navigation to avoid dependency issues
                window.location.href = '/';
                return result;
            } else {
                setError(result.msg);
                return result;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            return { status: false, msg: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loginWithOtp = useCallback(async (credentials: LoginOtpCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.loginWithOtp(credentials);

            if (result.status) {
                setUser(result.data.user);
                // Use window.location for navigation to avoid dependency issues
                window.location.href = '/';
                return result;
            } else {
                setError(result.msg);
                return result;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'OTP login failed';
            setError(errorMessage);
            return { status: false, msg: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const sendOtp = useCallback(async (mobileNumber: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.forgotPassword(mobileNumber);

            if (!result.status) {
                setError(result.msg);
            }

            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
            setError(errorMessage);
            return { status: false, msg: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resetPassword = useCallback(async (data: ResetPasswordRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.resetPassword(data);

            if (result.status) {
                setUser(result.data.user);
                // Use window.location for navigation to avoid dependency issues
                window.location.href = '/';
                return result;
            } else {
                setError(result.msg);
                return result;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
            setError(errorMessage);
            return { status: false, msg: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);

        try {
            authService.logout();
            setUser(null);
            setError(null);
            // Use window.location for navigation to avoid dependency issues
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout error:', err);
            setUser(null);
            setError(null);
            // Use window.location for navigation to avoid dependency issues
            window.location.href = '/login';
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        loginWithOtp,
        sendOtp,
        resetPassword,
        logout,
        clearError,
    };
}; 