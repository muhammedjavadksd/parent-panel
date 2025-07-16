# BookingPopup Component

A reusable booking popup component that handles both demo and masterclass bookings with child selection and the ability to add new children.

## Features

- **Universal Booking Flow**: Handles both demo and masterclass bookings
- **Independent Child Selection**: Local child selection within popup (doesn't affect global context)
- **Dynamic Booking URLs**: Fetches child-specific booking URLs from `/parent-panel/classes?child_id=`
- **Add New Child**: Includes a form to add new children with essential details
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Toast Notifications**: Provides user feedback for actions
- **Mock Child Addition**: Simulates adding children (no actual API call)
- **Visual Indicators**: Shows current global child vs popup-selected child
- **Error Handling**: Graceful handling of booking URL fetch failures

## Usage

```tsx
import BookingPopup from '@/components/BookingPopup';

// In your component
const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
const [bookingType, setBookingType] = useState<'demo' | 'masterclass'>('demo');

const handleBookingComplete = (childId: number, bookingType: string) => {
  // Handle the booking completion
  console.log('Booking completed for child:', childId, 'type:', bookingType);
};

// In your JSX
<BookingPopup
  isOpen={bookingPopupOpen}
  onClose={() => setBookingPopupOpen(false)}
  bookingType={bookingType}
  onBookingComplete={handleBookingComplete}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls whether the popup is visible |
| `onClose` | `() => void` | Yes | Callback when the popup is closed |
| `bookingType` | `'demo' \| 'masterclass'` | Yes | Type of booking to handle |
| `onBookingComplete` | `(childId: number, bookingType: string) => void` | No | Callback when booking is completed |

## Integration Examples

### Dashboard Page
The Dashboard page uses the BookingPopup for the main "Book Demo Classes" button in the hero section.

### Classes Page
The Classes page uses the BookingPopup for both the demo class card and the masterclass booking card.

### Mobile Learning Page
The mobile BookingSection component uses the BookingPopup for all booking actions.

## Child Addition Flow

1. User clicks "Add New Child" button
2. Form opens with fields for:
   - Child's name
   - Grade (1-12)
   - Date of birth (day, month, year)
3. Validation ensures all fields are filled
4. Mock API call simulates adding the child
5. Success toast is shown
6. New child is automatically selected for booking

## Booking Flow

1. **Popup Opens**: Initializes with global selected child (or first available child)
2. **Child Selection**: User can select any child from the list (local state only)
3. **URL Fetching**: Automatically fetches booking URLs for selected child from `/parent-panel/classes?child_id=`
4. **Visual Feedback**: Shows "Current" badge for global selected child
5. **User clicks "Proceed to [Demo/Masterclass] Booking for [Child Name]"**
6. **Booking URL**: Opens child-specific booking URL in new tab
7. **Success toast** is shown
8. **`onBookingComplete` callback** is called with popup child ID and booking type
9. **Popup closes** - global context remains unchanged

## API Integration

The component uses the `useBookingUrls` hook to fetch child-specific booking URLs:

```tsx
// Fetches from: /parent-panel/classes?child_id={childId}
const { bookingUrls, isLoading, error, fetchBookingUrls } = useBookingUrls();

// Returns:
{
  demo_booking_url: "https://bambinos.live/trial-booking/...",
  masterclass_booking_url: "https://bambinos.live/workshop-booking/...",
  hw_room_booking: "https://bambinos.live/homework-booking/..."
}
```

## Key Behavior

- **Local State Management**: Popup manages its own `popupSelectedChild` state
- **Global Context Preservation**: Global `selectedChild` remains unchanged
- **Independent Booking**: Booking uses popup-selected child, not global child
- **Visual Distinction**: "Current" badge shows which child is globally selected

## Styling

The component uses the existing design system with:
- Tailwind CSS classes
- Shadcn/ui components
- Responsive breakpoints
- Consistent color scheme
- Modern card-based layout

## Future Enhancements

- Real API integration for adding children
- More child details (school, interests, etc.)
- Booking date/time selection
- Payment integration
- Email confirmation
- Calendar integration 