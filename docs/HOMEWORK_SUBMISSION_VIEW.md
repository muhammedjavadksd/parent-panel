# Homework Submission View Feature

## Overview

This feature allows parents to view their submitted homework files for completed assignments. When a homework assignment has been submitted, parents can click the "View Submission" button to see all the files they've uploaded.

## API Integration

### Endpoint
```
GET /api/homework/get-homework/:classschedulebooking_id
```

### Request
- **Method**: GET
- **URL**: `/api/homework/get-homework/{classschedulebooking_id}`
- **Headers**: 
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`

### Response Format
```json
{
  "status": "success",
  "message": "Homework files retrieved successfully.",
  "data": [
    {
      "homework_file": "storage/homework/homework-capture-2025-08-04T14-31-17-560Z_2815418.jpg"
    }
  ]
}
```

### File URL Construction
To get the full URL of each file, prefix the `homework_file` path with:
```
https://bambinos.live/
```

Example:
```
https://bambinos.live/storage/homework/homework-capture-2025-08-04T14-31-17-560Z_2815418.jpg
```

## Implementation Details

### Service Layer
- **File**: `src/services/api/homeworkService.ts`
- **Method**: `getSubmittedHomeworkFiles(classschedulebookingId: number)`
- **Interface**: `SubmittedHomeworkFilesResponse`
- **Base URL**: Uses `VITE_BASE_URL` (different from other endpoints that use `VITE_API_URL`)

### Hook Integration
- **File**: `src/hooks/useHomework.ts`
- **New State**: 
  - `submittedFiles`
  - `isSubmittedFilesLoading`
  - `submittedFilesError`
- **New Methods**:
  - `loadSubmittedHomeworkFiles(classschedulebookingId: number)`
  - `clearSubmittedFiles()`
  - `clearSubmittedFilesError()`

### Component Integration
- **File**: `src/pages/HomeworkRoom.tsx`
- **New State**: `isViewSubmissionDialogOpen`
- **New Function**: `openViewSubmissionDialog(homeworkId: number)`

## User Interface

### Modal Dialog
- **Title**: "Your Submitted Homework Files"
- **Features**:
  - Loading state with spinner
  - Error handling with retry button
  - Empty state for no files
  - File list with clickable links
  - Responsive design

### File Display
Each submitted file shows:
- **File name** (extracted from path)
- **Full path** (for reference)
- **View button** (opens file in new tab)

### States
1. **Loading**: Shows spinner and "Loading submitted files..." message
2. **Error**: Shows error message with retry button
3. **Empty**: Shows "No submitted files found" message
4. **Success**: Shows list of files with view buttons

## Usage Flow

1. User navigates to Homework Room
2. User sees list of homework assignments
3. For completed assignments (pending_hw_count = 0), "View Submission" button is enabled
4. User clicks "View Submission" button
5. Modal opens and API call is made to fetch submitted files
6. Files are displayed in the modal
7. User can click "View" button to open any file in a new tab
8. User can close modal to return to homework list

## Error Handling

### API Errors
- Network errors are caught and displayed
- 401/403 errors are handled by the API client
- User-friendly error messages are shown

### Empty States
- When no files are found, appropriate message is displayed
- Clear indication that no homework has been submitted

### Retry Mechanism
- Error state includes "Try Again" button
- Allows users to retry failed API calls

## Technical Notes

### File URL Handling
- URLs are constructed by prefixing `https://bambinos.live/` to the file path
- Files open in new tabs using `window.open()`
- File names are extracted from the path for display

### State Management
- Submitted files state is separate from main homework data
- State is cleared when modal is closed
- Loading states are managed independently

### Responsive Design
- Modal adapts to different screen sizes
- File list is scrollable for many files
- Buttons and text are appropriately sized for mobile

## Testing

### Manual Testing
1. Navigate to Homework Room
2. Find a completed homework assignment
3. Click "View Submission" button
4. Verify modal opens and files load
5. Click "View" button on a file
6. Verify file opens in new tab
7. Test error scenarios (network issues, etc.)

### API Testing
- Test with valid classschedulebooking_id
- Test with invalid/non-existent ID
- Test with no submitted files
- Test authentication requirements

## Future Enhancements

### Potential Improvements
1. **File Preview**: Show thumbnails for image files
2. **Download Option**: Add download button alongside view
3. **File Metadata**: Show file size, upload date, etc.
4. **Bulk Actions**: Select multiple files for download
5. **Search/Filter**: Filter files by type or date
6. **Sorting**: Sort files by name, date, or size

### Performance Optimizations
1. **Lazy Loading**: Load files only when modal opens
2. **Caching**: Cache submitted files data
3. **Pagination**: Handle large numbers of files
4. **Image Optimization**: Compress images for faster loading 