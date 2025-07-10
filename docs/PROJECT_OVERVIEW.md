# Bambinos Learn Live - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Getting Started](#getting-started)
6. [Key Features](#key-features)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Component Architecture](#component-architecture)
10. [Development Guidelines](#development-guidelines)
11. [Deployment](#deployment)

## Project Overview

**Bambinos Learn Live** is a comprehensive learning managenpm run dement system designed for parents and children. It provides a platform for booking classes, tracking progress, managing transactions, and supporting interactive learning experiences.

### Core Functionality
- **Dashboard**: Real-time progress tracking and upcoming class management
- **Class Management**: Booking, rescheduling, and attending live classes
- **Analytics**: Detailed learning progress and performance analytics
- **Support System**: Ticket-based customer support with chat functionality
- **Transaction Management**: Payment tracking and financial history
- **Leaderboards**: Gamification through competitive rankings
- **Mobile Responsive**: Optimized for both desktop and mobile devices

## Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Type-safe development
- **Vite 5.4.1**: Fast build tool and development server
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **Shadcn/ui**: High-quality React components
- **React Router DOM 6.26.2**: Client-side routing
- **React Query (TanStack Query) 5.56.2**: Server state management
- **Axios 1.10.0**: HTTP client for API calls

### UI Components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Recharts 2.12.7**: Data visualization
- **React Hook Form 7.53.0**: Form management
- **Zod 3.23.8**: Schema validation
- **Sonner 1.5.0**: Toast notifications

### Development Tools
- **ESLint 9.9.0**: Code linting
- **TypeScript ESLint 8.0.1**: TypeScript-specific linting
- **PostCSS 8.4.47**: CSS processing
- **Autoprefixer 10.4.20**: CSS vendor prefixing

## Project Structure

```
bambinos-learn-live-1/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (shadcn/ui)
│   │   ├── analytics/       # Analytics and chart components
│   │   ├── games/           # Educational game components
│   │   ├── mobile/          # Mobile-specific components
│   │   └── ...              # Feature-specific components
│   ├── pages/               # Route components
│   ├── hooks/               # Custom React hooks
│   ├── contexts/            # React Context providers
│   ├── services/            # API service layer
│   │   ├── api/             # API client services
│   │   └── ...              # Business logic services
│   ├── lib/                 # Utility libraries
│   │   ├── interface/       # TypeScript interfaces
│   │   ├── schemas/         # Validation schemas
│   │   └── types/           # Type definitions
│   ├── shared/              # Shared utilities and constants
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── docs/                    # Documentation
└── package.json             # Dependencies and scripts
```

## Architecture

### Design Patterns
- **Component-Based Architecture**: Modular, reusable components
- **Custom Hooks Pattern**: Encapsulated business logic
- **Service Layer Pattern**: Centralized API communication
- **Context Pattern**: Global state management
- **TypeScript Interfaces**: Type-safe data contracts

### Data Flow
1. **User Interaction** → Component
2. **Component** → Custom Hook
3. **Custom Hook** → Service Layer
4. **Service Layer** → API Client
5. **API Response** → State Update
6. **State Update** → UI Re-render

### State Management Strategy
- **Local State**: Component-specific state using `useState`
- **Context State**: Global state using React Context
- **Server State**: API data using custom hooks with direct API calls
- **Form State**: Form data using React Hook Form

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd bambinos-learn-live-1

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_NAME=Bambinos Learn Live
```

## Key Features

### 1. Authentication System
- **Login/Logout**: Secure authentication flow
- **Auth Guards**: Protected route components
- **Token Management**: JWT token handling
- **User Context**: Global user state management

### 2. Dashboard System
- **Progress Overview**: Learning progress visualization
- **Upcoming Classes**: Class scheduling and management
- **Quick Actions**: Fast access to common features
- **Analytics Widgets**: Performance metrics display

### 3. Class Management
- **Booking System**: Class reservation functionality
- **Rescheduling**: Flexible class time changes
- **Attendance Tracking**: Class participation monitoring
- **Recording Access**: Post-class content availability

### 4. Support System
- **Ticket Creation**: Issue reporting system
- **Chat Interface**: Real-time support communication
- **File Attachments**: Document upload capabilities
- **Status Tracking**: Ticket lifecycle management

### 5. Analytics & Reporting
- **Progress Tracking**: Learning milestone monitoring
- **Performance Metrics**: Detailed analytics dashboard
- **Family Analytics**: Multi-child progress comparison
- **Export Capabilities**: Data export functionality

## State Management

### Context Providers
```typescript
// App.tsx - Provider hierarchy
<QueryClientProvider>
  <ThemeProvider>
    <CoinProvider>
      <ChildrenProvider>
        <App />
      </ChildrenProvider>
    </CoinProvider>
  </ThemeProvider>
</QueryClientProvider>
```

### Custom Hooks Pattern
Each feature has its own custom hook that manages:
- API calls
- Loading states
- Error handling
- Data transformation

Example:
```typescript
// useDashboard.ts
export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    // API call logic
  }, []);

  return { data, isLoading, error, loadData };
};
```

## API Integration

### Service Layer Architecture
```typescript
// services/api/dashboardService.ts
export class DashboardService {
  async getProgressOverview(child_id: number) {
    // API call implementation
  }
}
```

### API Client Configuration
```typescript
// services/api.ts
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Error Handling
- Centralized error handling in services
- User-friendly error messages
- Retry mechanisms for failed requests
- Loading states for better UX

## Component Architecture

### Component Categories

#### 1. UI Components (`src/components/ui/`)
- Base components from shadcn/ui
- Consistent design system
- Accessible by default
- Customizable through props

#### 2. Feature Components
- **Dashboard Components**: Progress widgets, analytics
- **Class Components**: Booking, scheduling, attendance
- **Support Components**: Tickets, chat interface
- **Analytics Components**: Charts, reports, metrics

#### 3. Layout Components
- **Header**: Navigation and user controls
- **Sidebar**: Main navigation menu
- **Mobile Components**: Responsive design elements

### Component Structure
```typescript
// Example component structure
interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State management
  const [state, setState] = useState();

  // Custom hooks
  const { data, isLoading } = useCustomHook();

  // Event handlers
  const handleClick = useCallback(() => {
    // Event logic
  }, []);

  // Render
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};
```

## Development Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Enforced code quality rules
- **Prettier**: Consistent code formatting
- **Component Naming**: PascalCase for components
- **File Naming**: kebab-case for files

### Best Practices
1. **Type Safety**: Always define TypeScript interfaces
2. **Error Boundaries**: Implement error handling
3. **Performance**: Use React.memo and useCallback
4. **Accessibility**: Follow WCAG guidelines
5. **Testing**: Write unit tests for critical functions

### File Organization
```
feature/
├── components/          # Feature-specific components
├── hooks/              # Feature-specific hooks
├── services/           # Feature-specific services
├── types/              # Feature-specific types
└── utils/              # Feature-specific utilities
```

### Naming Conventions
- **Components**: PascalCase (e.g., `DashboardWidget`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useDashboard`)
- **Services**: PascalCase with 'Service' suffix (e.g., `DashboardService`)
- **Interfaces**: PascalCase with 'Interface' suffix (e.g., `DashboardInterface`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_LIMIT`)

## Deployment

### Build Process
```bash
# Development build
npm run build:dev

# Production build
npm run build

# Preview build
npm run preview
```

### Environment Configuration
- **Development**: `.env.development`
- **Production**: `.env.production`
- **Staging**: `.env.staging`

### Deployment Platforms
- **Vercel**: Recommended for React applications
- **Netlify**: Alternative deployment option
- **AWS S3**: Static hosting option

### Build Optimization
- **Code Splitting**: Dynamic imports for route-based splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Code and asset compression
- **Caching**: Static asset caching strategies

## Troubleshooting

### Common Issues
1. **TypeScript Errors**: Check interface definitions
2. **API Errors**: Verify API endpoints and authentication
3. **Build Errors**: Check dependency versions
4. **Performance Issues**: Monitor bundle size and lazy loading

### Debug Tools
- **React DevTools**: Component inspection
- **Network Tab**: API call monitoring
- **Console Logs**: Error tracking
- **Lighthouse**: Performance auditing

## Support and Resources

### Documentation
- **API Documentation**: Backend API specifications
- **Component Library**: UI component documentation
- **Design System**: Visual design guidelines

### Development Resources
- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shadcn/ui**: https://ui.shadcn.com/

### Team Communication
- **Code Reviews**: Pull request guidelines
- **Issue Tracking**: Bug reporting process
- **Feature Requests**: Enhancement proposals
- **Knowledge Sharing**: Team documentation updates

---

*This documentation is maintained by the development team. For questions or updates, please contact the team lead.* 