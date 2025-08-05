# Homework Submission and Feedback System

## Overview

This comprehensive system allows parents to submit homework with optional comments and view detailed teacher feedback. The system includes:

1. **Enhanced Homework Submission** - Submit files with optional comments
2. **View Submitted Files** - See all submitted homework files
3. **View Teacher Feedback** - Access detailed feedback including comments, files, and audio recordings

## API Integration

### 1. Enhanced Homework Submission Endpoint
```
POST /api/homework/submit
```

#### Request Body
```json
{
  "classschedulebooking_id": "12345",
  "comment": "Optional student comment for all files",
  "files": [file1, file2, file3]
}
```

#### Headers
- `Authorization: Bearer {access_token}`
- `Content-Type: multipart/form-data`

### 2. View Submitted Files Endpoint
```
GET /api/homework/get-homework/:classschedulebooking_id
```

#### Response Format
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

### 3. View Feedback Endpoint
```
GET /api/homework/get-feedback/:classschedulebooking_id
```

#### Response Format
```json
{
  "status": "success",
  "message": "Feedback retrieved successfully",
  "data": {
    "classschedulebooking_id": "12345",
    "homeworks": [
      {
        "homework_file": "storage/homework/file1.pdf",
        "comment": "Student comment for this homework",
        "created_at": "2024-01-15T10:30:00.000Z",
        "updated_at": "2024-01-15T10:30:00.000Z",
        "deleted_at": null,
        "teacher_comment": "Great work on this assignment!",
        "teacher_file": "storage/feedback/teacher_response.pdf",
        "teacher_recording": "storage/recordings/feedback_audio.mp3",
        "faculty_id": 123
      }
    ]
  }
}
```

### File URL Construction
All file URLs are constructed by prefixing `https://bambinos.live/` to the file paths.

## Implementation Details

### Service Layer
- **File**: `src/services/api/homeworkService.ts`
- **Methods**: 
  - `getSubmittedHomeworkFiles(classschedulebookingId: number)`
  - `getHomeworkFeedback(classschedulebookingId: number)`
- **Interfaces**: 
  - `SubmittedHomeworkFilesResponse`
  - `HomeworkFeedbackResponse`
- **Base URL**: Uses `VITE_BASE_URL` for all endpoints

### Hook Integration
- **File**: `src/hooks/useHomework.ts`
- **New State**: 
  - `submittedFiles`, `isSubmittedFilesLoading`, `submittedFilesError`
  - `feedbackData`, `isFeedbackLoading`, `feedbackError`
- **New Methods**:
  - `loadSubmittedHomeworkFiles(classschedulebookingId: number)`
  - `loadFeedback(classschedulebookingId: number)`
  - Clear methods for all states

### Component Integration
- **File**: `src/pages/HomeworkRoom.tsx`
- **New State**: 
  - `homeworkComments` - stores comments for each homework
  - `isViewFeedbackDialogOpen` - controls feedback modal
- **New Functions**: 
  - `openViewFeedbackDialog(homeworkId: number)`
  - `handleCommentChange(homeworkId: number, comment: string)`

## User Interface Features

### 1. Enhanced Homework Submission Dialog
- **File Selection**: Multiple file upload with progress tracking
- **Comment Input**: Optional textarea for student comments
- **Progress Bar**: Real-time upload progress indication
- **File Management**: Add/remove files before submission

### 2. View Submission Dialog
- **Title**: "Your Submitted Homework Files"
- **Features**:
  - Loading state with spinner
  - Error handling with retry button
  - Empty state for no files
  - File list with clickable "View" buttons
  - Responsive design

### 3. View Feedback Dialog
- **Title**: "Teacher Feedback"
- **Features**:
  - Comprehensive feedback display
  - Student submission details with comments
  - Teacher feedback sections:
    - Text comments in highlighted boxes
    - Downloadable teacher files
    - Audio feedback with player controls
  - Empty state when no feedback available

### File Display Features
Each submitted file shows:
- **File name** (extracted from path)
- **Student comment** (if provided)
- **View/Download buttons** (opens files in new tab)

### Feedback Display Features
Each homework submission shows:
- **Student submission section**:
  - File name and student comment
  - View button for original submission
- **Teacher feedback section**:
  - Text comments in blue-highlighted boxes
  - Teacher files with download buttons
  - Audio recordings with embedded player
  - Download options for all media

## Usage Flow

### Homework Submission
1. User clicks "Upload Files" on pending homework
2. Modal opens with file selection and comment input
3. User selects files and optionally adds comment
4. User clicks "Submit" to upload with progress tracking
5. Success message and homework list refreshes

### View Submissions
1. User clicks "View Submission" on completed homework
2. Modal opens and loads submitted files via API
3. Files are displayed with view buttons
4. User can click "View" to open any file in new tab

### View Feedback
1. User clicks "View Feedback" on completed homework
2. Modal opens and loads feedback data via API
3. Comprehensive feedback is displayed including:
   - Original student submissions with comments
   - Teacher text comments
   - Teacher files for download
   - Audio feedback with player controls
4. User can interact with all feedback elements

## Error Handling

### API Errors
- Network errors are caught and displayed
- 401/403 errors are handled by the API client
- User-friendly error messages are shown
- Retry buttons for failed API calls

### Empty States
- Appropriate messages when no files are found
- Clear indication when no feedback is available
- Helpful guidance for next steps

### Upload Errors
- File validation (max 10 files, supported formats)
- Progress tracking with error recovery
- Clear error messages for upload failures

## Technical Notes

### File URL Handling
- URLs are constructed by prefixing `https://bambinos.live/` to file paths
- Files open in new tabs using `window.open()`
- File names are extracted from paths for display

### State Management
- Separate state for comments, submissions, and feedback
- State is cleared when modals are closed
- Loading states are managed independently
- Progress tracking for uploads

### Responsive Design
- All modals adapt to different screen sizes
- File lists are scrollable for many files
- Audio players are responsive
- Buttons and text are appropriately sized for mobile

### Audio Support
- HTML5 audio player for teacher recordings
- Fallback download button for unsupported browsers
- Direct download links for all audio files

## Testing

### Manual Testing Scenarios
1. **Submit Homework**:
   - Upload files with/without comments
   - Test progress tracking
   - Verify success/error handling

2. **View Submissions**:
   - Check file loading and display
   - Test file viewing in new tabs
   - Verify empty state handling

3. **View Feedback**:
   - Test feedback loading and display
   - Verify audio player functionality
   - Test file downloads
   - Check empty feedback states

### API Testing
- Test all endpoints with valid/invalid IDs
- Verify authentication requirements
- Test error scenarios (network issues, etc.)
- Validate response formats

## Future Enhancements

### Potential Improvements
1. **File Preview**: Show thumbnails for image files
2. **Rich Text Comments**: Support formatting in comments
3. **Feedback Notifications**: Alert when new feedback arrives
4. **Bulk Actions**: Select multiple files for operations
5. **Search/Filter**: Filter files by type or date
6. **Sorting**: Sort files by name, date, or size
7. **Video Support**: Enhanced video player for feedback
8. **Real-time Updates**: WebSocket for live feedback updates

### Performance Optimizations
1. **Lazy Loading**: Load files only when needed
2. **Caching**: Cache submission and feedback data
3. **Pagination**: Handle large numbers of files
4. **Image Optimization**: Compress images for faster loading
5. **Audio Streaming**: Progressive audio loading
6. **File Compression**: Compress uploads for faster transfer 