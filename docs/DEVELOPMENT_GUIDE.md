# Development Guide for New Developers

## Quick Start for New Team Members

### 1. Environment Setup

#### Prerequisites
```bash
# Install Node.js (v18 or higher)
# Download from: https://nodejs.org/

# Install Git
# Download from: https://git-scm.com/

# Install VS Code (recommended)
# Download from: https://code.visualstudio.com/
```

#### Project Setup
```bash
# Clone the repository
git clone <repository-url>
cd bambinos-learn-live-1

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### 2. Understanding the Codebase

#### Key Directories
- `src/components/` - Reusable UI components
- `src/pages/` - Route components (screens)
- `src/hooks/` - Custom React hooks
- `src/services/` - API and business logic
- `src/contexts/` - Global state management
- `src/lib/` - Utilities and type definitions

#### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `Dashboard.tsx`)
- Hooks: `camelCase.ts` (e.g., `useDashboard.ts`)
- Services: `camelCase.ts` (e.g., `dashboardService.ts`)
- Types: `camelCase.ts` (e.g., `dashboard.ts`)

### 3. Development Workflow

#### Creating a New Feature
1. **Create the interface** in `src/lib/interface/`
2. **Create the service** in `src/services/`
3. **Create the hook** in `src/hooks/`
4. **Create the component** in `src/components/`
5. **Create the page** in `src/pages/`
6. **Add the route** in `src/App.tsx`

#### Example: Adding a New Dashboard Widget

```typescript
// 1. Interface (src/lib/interface/dashboard.ts)
export interface NewWidgetData {
  id: number;
  title: string;
  value: number;
}

// 2. Service (src/services/newWidgetService.ts)
export class NewWidgetService {
  async getWidgetData(): Promise<NewWidgetData[]> {
    // API call implementation
  }
}

// 3. Hook (src/hooks/useNewWidget.ts)
export const useNewWidget = () => {
  const [data, setData] = useState<NewWidgetData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadData = useCallback(async () => {
    // Implementation
  }, []);
  
  return { data, isLoading, loadData };
};

// 4. Component (src/components/NewWidget.tsx)
export const NewWidget: React.FC = () => {
  const { data, isLoading, loadData } = useNewWidget();
  
  return (
    <Card>
      {/* Widget content */}
    </Card>
  );
};

// 5. Usage in Dashboard
import { NewWidget } from '@/components/NewWidget';
```

### 4. State Management Patterns

#### Local State (useState)
```typescript
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(false);
```

#### Global State (Context)
```typescript
// Context definition
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
```

#### Server State (Custom Hooks)
```typescript
export const useApiData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getData();
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchData };
};
```

### 5. API Integration

#### Service Pattern
```typescript
// src/services/api/dashboardService.ts
export class DashboardService {
  async getProgressOverview(child_id: number) {
    try {
      const response = await apiClient.get('/parent-panel/dashboard', {
        params: { child_id }
      });
      
      return {
        status: response.data.success,
        msg: response.data.message,
        data: response.data
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || 'Failed to fetch data'
      };
    }
  }
}

export const dashboardService = new DashboardService();
```

#### Hook Integration
```typescript
// src/hooks/useDashboard.ts
export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, loadData };
};
```

### 6. Component Development

#### Component Structure
```typescript
import React, { useState, useCallback } from 'react';
import { Card, Button } from '@/components/ui';
import { useCustomHook } from '@/hooks/useCustomHook';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  onAction 
}) => {
  // State
  const [localState, setLocalState] = useState(false);
  
  // Custom hooks
  const { data, isLoading, error } = useCustomHook();
  
  // Event handlers
  const handleClick = useCallback(() => {
    setLocalState(!localState);
    onAction?.();
  }, [localState, onAction]);
  
  // Render
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Button onClick={handleClick}>
        {localState ? 'Active' : 'Inactive'}
      </Button>
    </Card>
  );
};
```

#### Styling Guidelines
```typescript
// Use Tailwind CSS classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// Component variants
<Button variant="primary" size="lg" disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

### 7. Form Handling

#### React Hook Form Pattern
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema definition
const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
});

type FormData = z.infer<typeof formSchema>;

// Form component
export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginService.login(data);
      reset();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        className={errors.email ? 'border-red-500' : ''}
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className={errors.password ? 'border-red-500' : ''}
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
```

### 8. Error Handling

#### Error Boundaries
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }

    return this.props.children;
  }
}
```

#### API Error Handling
```typescript
const handleApiCall = async () => {
  try {
    setIsLoading(true);
    setError(null);
    
    const response = await apiService.getData();
    
    if (response.status && response.data) {
      setData(response.data);
    } else {
      setError(response.msg || 'Operation failed');
    }
  } catch (err: any) {
    setError(err.message || 'An unexpected error occurred');
  } finally {
    setIsLoading(false);
  }
};
```

### 9. Testing Guidelines

#### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockOnAction = jest.fn();
    render(<MyComponent title="Test" onAction={mockOnAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnAction).toHaveBeenCalled();
  });
});
```

#### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles data loading', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    await act(async () => {
      await result.current.loadData();
    });
    
    expect(result.current.isLoading).toBe(false);
  });
});
```

### 10. Performance Optimization

#### React.memo for Components
```typescript
export const ExpensiveComponent = React.memo<ComponentProps>(({ data }) => {
  return <div>{/* Expensive rendering logic */}</div>;
});
```

#### useCallback for Functions
```typescript
const handleClick = useCallback((id: number) => {
  // Expensive operation
}, [dependency]);
```

#### useMemo for Computed Values
```typescript
const expensiveValue = useMemo(() => {
  return data.filter(item => item.active).map(item => item.value);
}, [data]);
```

#### Lazy Loading
```typescript
const LazyComponent = lazy(() => import('./LazyComponent'));

// In route
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### 11. Debugging Tips

#### React DevTools
- Install React DevTools browser extension
- Use Profiler to identify performance issues
- Inspect component props and state

#### Console Logging
```typescript
// Development only logging
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// Structured logging
console.group('API Call');
console.log('Request:', requestData);
console.log('Response:', responseData);
console.groupEnd();
```

#### Network Tab
- Monitor API calls in browser DevTools
- Check request/response payloads
- Identify slow network requests

### 12. Common Pitfalls

#### 1. Missing Dependencies in useEffect
```typescript
// ❌ Wrong
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId dependency

// ✅ Correct
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

#### 2. Not Handling Loading States
```typescript
// ❌ Wrong
return <div>{data.map(item => <Item key={item.id} />)}</div>;

// ✅ Correct
if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <div>{data.map(item => <Item key={item.id} />)}</div>;
```

#### 3. Forgetting Error Boundaries
```typescript
// Always wrap main app components
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

### 13. Code Review Checklist

Before submitting a pull request, ensure:

- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Component is responsive
- [ ] Accessibility features are included
- [ ] Performance optimizations are applied
- [ ] Tests are written (if applicable)
- [ ] Code follows project conventions
- [ ] No console.log statements in production code
- [ ] Environment variables are properly configured

### 14. Useful Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check

# Git workflow
git checkout -b feature/new-feature    # Create feature branch
git add .                              # Stage changes
git commit -m "feat: add new feature"  # Commit changes
git push origin feature/new-feature    # Push to remote
```

### 15. Resources

#### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)

#### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

*This guide should help you get started with the project. For additional questions, reach out to the team lead or refer to the main project documentation.* 