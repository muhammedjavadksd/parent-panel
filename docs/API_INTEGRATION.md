# API Integration Guide

## Overview

This document provides comprehensive information about how the frontend application integrates with the backend API. The application uses a service-based architecture with custom hooks for state management.

## API Client Configuration

### Base Configuration
```typescript
// src/services/api.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Service Layer Architecture

### Service Pattern
Each API endpoint has a corresponding service class that handles:
- API calls
- Error handling
- Data transformation
- Response formatting

```typescript
// Example: src/services/api/dashboardService.ts
export class DashboardService {
  async getProgressOverview(child_id: number): Promise<ApiResponse<DashboardData>> {
    try {
      const response = await apiClient.get('/parent-panel/dashboard', {
        params: { child_id }
      });
      
      return {
        status: response.data.success,
        msg: response.data.message || 'Success',
        data: response.data
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to fetch dashboard data',
        data: undefined
      };
    }
  }
}

export const dashboardService = new DashboardService();
```

## Available Services

### 1. Authentication Service
```typescript
// src/services/authService.ts
export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Login implementation
  }
  
  async logout(): Promise<void> {
    // Logout implementation
  }
  
  async refreshToken(): Promise<AuthResponse> {
    // Token refresh implementation
  }
}
```

**Endpoints:**
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token

### 2. Dashboard Service
```typescript
// src/services/api/dashboardService.ts
export class DashboardService {
  async getProgressOverview(child_id: number): Promise<ApiResponse<DashboardData>> {
    // Implementation
  }
}
```

**Endpoints:**
- `GET /parent-panel/dashboard` - Get dashboard data
- `GET /parent-panel/progress` - Get progress overview

### 3. Booking Service
```typescript
// src/services/bookingService.ts
export class BookingService {
  async getBookings(filters: BookingFilters): Promise<ApiResponse<BookingsData>> {
    // Implementation
  }
  
  async changeBooking(params: ChangeBookingParams): Promise<ApiResponse<any>> {
    // Implementation
  }
}
```

**Endpoints:**
- `GET /parent-panel/get-bookings` - Get bookings list
- `POST /parent-panel/change-booking` - Change booking
- `GET /parent-panel/get-shifting-date` - Get available dates

### 4. Support Service
```typescript
// src/services/supportService.ts
export class SupportService {
  async getTickets(filters: TicketFilters): Promise<ApiResponse<TicketsData>> {
    // Implementation
  }
  
  async createTicket(data: CreateTicketRequest): Promise<ApiResponse<CreateTicketResponse>> {
    // Implementation
  }
  
  async getTicketChat(ticketId: number): Promise<ApiResponse<TicketChatData>> {
    // Implementation
  }
}
```

**Endpoints:**
- `GET /parent-panel/support/tickets` - Get support tickets
- `POST /parent-panel/support/store` - Create new ticket
- `GET /parent-panel/support/ticket/{id}` - Get ticket chat
- `POST /parent-panel/support/sendmessage/{id}` - Send message

### 5. Transaction Service
```typescript
// src/services/transactionService.ts
export class TransactionService {
  async getTransactions(filters: TransactionFilters): Promise<ApiResponse<TransactionsData>> {
    // Implementation
  }
}
```

**Endpoints:**
- `GET /parent-panel/transactions` - Get transactions

### 6. Leaderboard Service
```typescript
// src/services/api/leaderboard.ts
export class LeaderboardApiService {
  async getLeaderboard(child_id: number): Promise<ApiResponse<LeaderboardData>> {
    // Implementation
  }
}
```

**Endpoints:**
- `GET /parent-panel/leaderboard` - Get leaderboard data

### 7. Class Services
```typescript
// Join Class Service
export class JoinClassService {
  static async joinClass(schedulebooking_id: string): Promise<JoinClassResponse> {
    // Implementation
  }
}

// Presentation Service
export class PresentationService {
  static async getPresentation(schedulebooking_id: string): Promise<PresentationResponse> {
    // Implementation
  }
}

// Recording Service
export class RecordingService {
  static async getRecording(schedulebooking_id: string): Promise<RecordingResponse> {
    // Implementation
  }
}
```

**Endpoints:**
- `GET /parent-panel/join-class` - Join live class
- `GET /parent-panel/presentation/{id}` - Get presentation
- `GET /parent-panel/recording/{id}` - Get recording

## Custom Hooks Integration

### Hook Pattern
Each service has a corresponding custom hook that manages:
- API calls
- Loading states
- Error handling
- Data caching

```typescript
// Example: src/hooks/useDashboard.ts
export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (child_id: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await dashboardService.getProgressOverview(child_id);
      
      if (response.status && response.data) {
        setData(response.data);
      } else {
        setError(response.msg);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, loadData };
};
```

## Data Types and Interfaces

### Common Response Types
```typescript
// Base API response structure
interface ApiResponse<T> {
  status: boolean;
  msg: string;
  data?: T;
}

// Pagination structure
interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Filter interfaces
interface BaseFilters {
  page?: number;
  limit?: number;
}
```

### Domain-Specific Types
```typescript
// Dashboard types
interface DashboardData {
  progress_overview: ProgressOverview;
  upcoming_class_parent_level: UpcomingClass;
  bookings_for_calendar: BookingForCalendar[];
}

// Booking types
interface Booking {
  id: number;
  schedulebooking_id: number;
  parent_id: number;
  child_id: number;
  classschedule_id: number;
  class_date: string;
  start_time: string;
  end_time: string;
  class_id: number;
  admin_class_name: string;
  is_cancelled: string;
  attended_class: string;
  confirmed: number;
  // ... other properties
}

// Support types
interface SupportTicket {
  id: number;
  subject: string;
  description: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  ticket_number: string;
  // ... other properties
}
```

## Error Handling

### Global Error Handling
```typescript
// src/services/api.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error types
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      handleUnauthorized();
    } else if (error.response?.status === 403) {
      // Forbidden - show access denied
      handleForbidden();
    } else if (error.response?.status >= 500) {
      // Server error - show generic error
      handleServerError();
    }
    
    return Promise.reject(error);
  }
);
```

### Service-Level Error Handling
```typescript
export class ApiService {
  async makeRequest<T>(requestFn: () => Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> {
    try {
      const response = await requestFn();
      
      return {
        status: response.data.success,
        msg: response.data.message || 'Success',
        data: response.data
      };
    } catch (error: any) {
      // Log error for debugging
      console.error('API Error:', error);
      
      return {
        status: false,
        msg: this.getErrorMessage(error),
        data: undefined
      };
    }
  }
  
  private getErrorMessage(error: any): string {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.message) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}
```

### Hook-Level Error Handling
```typescript
export const useApiHook = () => {
  const [error, setError] = useState<string | null>(null);
  
  const handleApiCall = useCallback(async (apiFunction: () => Promise<ApiResponse<any>>) => {
    setError(null);
    
    try {
      const response = await apiFunction();
      
      if (!response.status) {
        setError(response.msg);
        return null;
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to complete operation';
      setError(errorMessage);
      return null;
    }
  }, []);
  
  return { error, handleApiCall };
};
```

## Authentication Flow

### Login Process
```typescript
// 1. User submits login form
const handleLogin = async (credentials: LoginCredentials) => {
  const response = await authService.login(credentials);
  
  if (response.status && response.data) {
    // Store token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // Update context
    setUser(response.data.user);
    
    // Redirect to dashboard
    navigate('/');
  } else {
    setError(response.msg);
  }
};
```

### Token Management
```typescript
// Automatic token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await authService.refreshToken();
        if (refreshResponse.status && refreshResponse.data) {
          localStorage.setItem('token', refreshResponse.data.token);
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);
```

## File Upload

### FormData Handling
```typescript
// Support ticket with attachment
export class SupportService {
  async createTicket(data: CreateTicketRequest): Promise<ApiResponse<CreateTicketResponse>> {
    try {
      const formData = new FormData();
      formData.append('issue', data.issue);
      formData.append('title', data.title);
      formData.append('description', data.description);

      if (data.attachment) {
        formData.append('attachment', data.attachment);
      }

      const response = await apiClient.post('/parent-panel/support/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        status: true,
        msg: 'Ticket created successfully',
        data: response.data
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to create ticket'
      };
    }
  }
}
```

## Real-time Features

### WebSocket Integration (if applicable)
```typescript
// Example WebSocket service
export class WebSocketService {
  private ws: WebSocket | null = null;
  
  connect(url: string) {
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }
  
  private handleMessage(data: any) {
    // Handle different message types
    switch (data.type) {
      case 'notification':
        // Handle notification
        break;
      case 'chat_message':
        // Handle chat message
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  }
  
  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
```

## Testing API Integration

### Mock Service for Testing
```typescript
// src/services/__mocks__/dashboardService.ts
export class MockDashboardService {
  async getProgressOverview(child_id: number): Promise<ApiResponse<DashboardData>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: true,
          msg: 'Mock data loaded successfully',
          data: {
            progress_overview: {
              total_classes: 10,
              past_classes: 8,
              streak: 5,
              coins: 150,
              rank: 3
            },
            upcoming_class_parent_level: {
              id: 1,
              admin_class_name: 'Math Class',
              class_date: '2024-01-15',
              start_time: '10:00:00'
            },
            bookings_for_calendar: []
          }
        });
      }, 1000);
    });
  }
}
```

### Testing Hooks
```typescript
// src/hooks/__tests__/useDashboard.test.ts
import { renderHook, act } from '@testing-library/react';
import { useDashboard } from '../useDashboard';
import { MockDashboardService } from '../../services/__mocks__/dashboardService';

jest.mock('../../services/api/dashboardService', () => ({
  dashboardService: new MockDashboardService()
}));

describe('useDashboard', () => {
  it('loads dashboard data successfully', async () => {
    const { result } = renderHook(() => useDashboard());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    
    await act(async () => {
      await result.current.loadProgressOverview(1);
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });
});
```

## Performance Optimization

### Request Caching
```typescript
// Simple cache implementation
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes
  
  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  clear() {
    this.cache.clear();
  }
}

export const apiCache = new ApiCache();
```

### Debounced API Calls
```typescript
import { debounce } from 'lodash';

export const useDebouncedApiCall = (apiFunction: Function, delay: number = 300) => {
  const debouncedCall = useMemo(
    () => debounce(apiFunction, delay),
    [apiFunction, delay]
  );
  
  return debouncedCall;
};
```

## Environment Configuration

### Environment Variables
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Bambinos Learn Live (Dev)
VITE_ENABLE_MOCK_API=false

# .env.production
VITE_API_BASE_URL=https://api.bambinoslearn.com
VITE_APP_NAME=Bambinos Learn Live
VITE_ENABLE_MOCK_API=false
```

### API Configuration
```typescript
// src/config/api.ts
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  retryAttempts: 3,
  enableMock: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh'
    },
    dashboard: {
      overview: '/parent-panel/dashboard',
      progress: '/parent-panel/progress'
    },
    // ... other endpoints
  }
};
```

## Troubleshooting

### Common Issues

#### 1. CORS Errors
```typescript
// Ensure backend allows frontend origin
// Backend should include:
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### 2. Authentication Issues
```typescript
// Check token format and expiration
const token = localStorage.getItem('token');
if (token) {
  // Verify token is valid JWT format
  const payload = JSON.parse(atob(token.split('.')[1]));
  const isExpired = payload.exp * 1000 < Date.now();
  
  if (isExpired) {
    localStorage.removeItem('token');
    // Redirect to login
  }
}
```

#### 3. Network Timeouts
```typescript
// Increase timeout for slow connections
apiClient.defaults.timeout = 30000; // 30 seconds

// Add retry logic
const retryRequest = async (fn: Function, retries = 3) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.code === 'ECONNABORTED') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};
```

### Debug Tools
```typescript
// Enable API logging in development
if (import.meta.env.DEV) {
  apiClient.interceptors.request.use(request => {
    console.log('API Request:', request);
    return request;
  });
  
  apiClient.interceptors.response.use(response => {
    console.log('API Response:', response);
    return response;
  });
}
```

---

*This API integration guide provides comprehensive information for working with the backend services. For specific endpoint documentation, refer to the backend API documentation.* 