# Website Tour Implementation

## Overview

This document describes the implementation of page-specific guided tours for the Bambinos parent panel application. The tour system extends the existing Dashboard tour functionality to all key pages, providing users with contextual guidance based on their current location.

## Implementation Details

### 1. Enhanced WebsiteTour Component

**File:** `src/components/WebsiteTour.tsx`

The main tour component has been enhanced to support page-specific tours:

- **Page Detection**: Uses `useLocation` from React Router to detect the current page
- **Dynamic Steps**: Loads different tour steps based on the current route
- **Consistent Styling**: Maintains the same visual design across all tours
- **Event-Driven**: Responds to manual tour triggers via custom events

### 2. Supported Pages and Tour Content

#### Dashboard (`/`)
- **Targets**: Hero section, upcoming classes, mood tracker
- **Content**: Welcome message, class joining tips, mood tracking benefits

#### Classes (`/classes`)
- **Targets**: Page header, class options grid, learning statistics
- **Content**: Learning hub overview, booking options, progress tracking

#### Roadmap (`/roadmap`)
- **Targets**: Page header, learning journey map
- **Content**: Course structure explanation, module completion tips

#### Experience (`/experience`)
- **Targets**: Page header, premium programs section
- **Content**: Program overview, free trial information

#### Analytics (`/analytics`)
- **Targets**: Page header, performance tracking sections
- **Content**: Analytics overview, progress insights

#### Transactions (`/transactions`)
- **Targets**: Page header, account balance card
- **Content**: Transaction management, wallet features

#### Leaderboard (`/leaderboard`)
- **Targets**: Page header, top performers section
- **Content**: Competition overview, motivation tips

#### Support (`/support`)
- **Targets**: Page header, contact options, FAQ section
- **Content**: Support channels, help resources

### 3. Tour Trigger Mechanism

#### Manual Trigger
- **Button**: "Get Tour" button in the header (desktop only)
- **Event**: Dispatches `startTour` custom event
- **Listener**: WebsiteTour component listens for this event

#### Automatic Trigger
- **Condition**: First-time visit (checks localStorage)
- **Delay**: 1-second delay to ensure page elements are rendered
- **Storage**: Uses `hasSeenTour` flag in localStorage

### 4. Tour Configuration

#### Styling
- **Primary Color**: Blue (#3b82f6)
- **Background**: White with subtle shadows
- **Typography**: Consistent font sizes and weights
- **Responsive**: Adapts to different screen sizes

#### Behavior
- **Continuous**: Users can navigate through steps
- **Skip Option**: Users can skip the tour
- **Progress Indicator**: Shows current step position
- **Auto-scroll**: Scrolls to first step automatically

### 5. Page Integration

Each page includes:

1. **Header Integration**: Updated `onStartTour` prop to dispatch tour event
2. **Component Import**: Added WebsiteTour component import
3. **Component Placement**: Added WebsiteTour component at the end of each page

### 6. Tour Content Guidelines

#### Design Principles
- **Concise**: Keep content brief and focused
- **Actionable**: Provide clear next steps
- **Visual**: Use icons and emojis for engagement
- **Contextual**: Relate to specific page features

#### Content Structure
- **Title**: Clear, descriptive heading with relevant icon
- **Description**: Brief explanation of the feature
- **Pro Tips**: Optional helpful hints in highlighted boxes
- **Emojis**: Strategic use for visual appeal

### 7. Technical Implementation

#### Dependencies
- `react-joyride`: Core tour functionality
- `react-router-dom`: Page detection
- `lucide-react`: Icons for tour content

#### State Management
- **Local State**: Manages tour run status
- **LocalStorage**: Tracks first-time visit
- **Event System**: Handles manual tour triggers

#### Error Handling
- **Fallback**: Defaults to dashboard tour for unknown routes
- **Graceful Degradation**: Tour continues even if some elements are missing

### 8. Files Modified

#### Core Component
- `src/components/WebsiteTour.tsx` - Enhanced with page-specific tours

#### Page Components
- `src/pages/Dashboard.tsx` - Already had tour integration
- `src/pages/Classes.tsx` - Added tour integration
- `src/pages/Roadmap.tsx` - Added tour integration
- `src/pages/Experience.tsx` - Added tour integration
- `src/pages/StudentAnalytics.tsx` - Added tour integration
- `src/pages/Transactions.tsx` - Added tour integration
- `src/pages/Leaderboard.tsx` - Added tour integration
- `src/pages/Support.tsx` - Added tour integration

### 9. Usage Instructions

#### For Users
1. Navigate to any supported page
2. Click the "Get Tour" button in the header (desktop)
3. Follow the guided tour steps
4. Skip or complete the tour as desired

#### For Developers
1. Tour automatically detects current page
2. No additional configuration needed for existing pages
3. To add tours for new pages:
   - Add page route to `getTourSteps` function
   - Define tour steps array
   - Add WebsiteTour component to the page

### 10. Benefits

#### User Experience
- **Onboarding**: Helps new users understand features
- **Discovery**: Reveals hidden or advanced features
- **Confidence**: Reduces user anxiety about complex interfaces
- **Engagement**: Interactive way to explore the application

#### Development
- **Consistent**: Standardized tour implementation across pages
- **Maintainable**: Centralized tour logic and styling
- **Extensible**: Easy to add new pages and tour content
- **Performance**: Lightweight implementation with minimal overhead

## Conclusion

The enhanced tour system provides a comprehensive, page-specific guided experience that helps users understand and navigate the Bambinos parent panel effectively. The implementation maintains consistency with the existing design while offering contextual guidance for each page's unique features and functionality. 