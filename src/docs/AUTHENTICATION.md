# Authentication System Documentation

## Overview

This document describes the authentication system implemented for the Parent Panel application. The system uses JWT tokens for authentication and provides login, forgot password (OTP), and logout functionality.

## Features

- **Login with Mobile Number**: Users can login using their mobile number and 4-digit password
- **Country Code Support**: Multiple country codes supported for international users
- **Forgot Password Flow**: 4-digit OTP-based password reset
- **JWT Token Management**: Automatic token storage and refresh handling
- **Route Protection**: Protected routes with automatic redirect to login
- **Logout Functionality**: Secure logout with token cleanup

## API Endpoints

### 1. Login
- **URL**: `GET /api/parent-panel/login` 
- **Parameters**: 
  - `mobile_number` (string): User's mobile number
  - `password` (string): 4-digit password
  - `country_code` (string, optional): Country code (default: +91)
- **Response**: Returns access token, refresh token, and user data

### 2. Send OTP
- **URL**: `GET /api/parent-panel/send-otp`
- **Parameters**:
  - `mobile_number` (string): Mobile number to send OTP to
- **Response**: Confirmation of OTP sent

### 3. Reset Password
- **URL**: `POST /api/parent-panel/reset-password`
- **Body**:
  - `mobile_number` (string): User's mobile number
  - `otp` (string): 4-digit OTP
  - `new_password` (string): New 4-digit password
- **Response**: Returns access token and user data (user is logged in)

## File Structure

```
src/
├── lib/
│   └── types/
│       └── auth.ts                 # Authentication type definitions
├── services/
│   └── api/
│       └── authService.ts          # API service for authentication
├── hooks/
│   └── useAuth.ts                  # Custom hook for authentication logic
├── components/
│   ├── LoginForm.tsx               # Login form component
│   ├── ForgotPassword.tsx          # Forgot password flow component
│   ├── LogoutButton.tsx            # Logout button component
│   └── AuthGuard.tsx               # Route protection component
├── schemas/
│   └── authSchemas.ts              # Form validation schemas
└── pages/
    └── Login.tsx                   # Login page
```

## Components

### LoginForm
- Handles mobile number and password input
- Country code selection
- 4-digit password input using OTP-style input
- Form validation using Zod schemas

### ForgotPassword
- Multi-step flow: Mobile → OTP → New Password
- OTP resend functionality
- Form validation for each step
- Error handling and user feedback

### LogoutButton
- Reusable logout button component
- Loading states during logout
- Customizable styling and variants

### AuthGuard
- Protects routes requiring authentication
- Automatic redirect to login for unauthenticated users
- Loading states during authentication check

## Usage Examples

### Using the useAuth Hook

```typescript
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    sendOtp, 
    resetPassword,
    isLoading,
    error 
  } = useAuth();

  const handleLogin = async () => {
    const result = await login({
      mobile_number: '9835742944',
      password: '2222',
      country_code: '+91'
    });
    
    if (result.success) {
      // Navigate to dashboard
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.parent_name}!</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
};
```

### Protecting Routes

```typescript
import AuthGuard from '@/components/AuthGuard';

const ProtectedPage = () => {
  return (
    <AuthGuard>
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  );
};
```

### Adding Logout Button

```typescript
import LogoutButton from '@/components/LogoutButton';

const Header = () => {
  return (
    <header>
      <LogoutButton 
        variant="outline" 
        size="sm" 
        className="text-red-600"
      />
    </header>
  );
};
```

## Token Management

The authentication system automatically handles:

1. **Token Storage**: Access and refresh tokens are stored in localStorage
2. **Request Interceptors**: Automatically adds Authorization header to API requests
3. **Response Interceptors**: Handles 401 errors and token refresh
4. **Token Cleanup**: Removes tokens on logout or authentication failure

## Security Features

- **4-digit OTP**: Secure OTP generation and validation
- **JWT Tokens**: Secure token-based authentication
- **Automatic Logout**: Token expiration handling
- **Route Protection**: Prevents unauthorized access to protected routes
- **Form Validation**: Client-side validation using Zod schemas

## Error Handling

The system provides comprehensive error handling:

- **API Errors**: Network and server errors are caught and displayed
- **Validation Errors**: Form validation errors are shown to users
- **Authentication Errors**: Invalid credentials and token errors are handled
- **User Feedback**: Clear error messages and loading states

## Testing

To test the authentication system:

1. **Login**: Use mobile number `9835742944` with password `2222`
2. **Forgot Password**: 
   - Enter mobile number
   - Use OTP `3443` (or any 4-digit code for testing)
   - Set new password
3. **Logout**: Click logout button to clear session

## Configuration

The API base URL is configured in `src/services/api/authService.ts`:

```typescript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

Update this URL for different environments (development, staging, production). 