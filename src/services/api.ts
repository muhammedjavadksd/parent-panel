import axios from "axios";



// Create axios instance with base configuration
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        console.log('🔍 apiClient: Request interceptor - token:', token ? 'present' : 'missing');
        console.log('🔍 apiClient: Request URL:', config.url);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('🔍 apiClient: Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors without automatic refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Don't automatically refresh on 401 - let the components handle it
        // Just log the error for debugging
        console.error('🔍 apiClient: Response error:', error.response?.status, error.response?.data);

        // Return the error as-is so components can handle backend error messages
        return Promise.reject(error);
    }
);
