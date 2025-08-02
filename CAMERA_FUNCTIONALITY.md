# Camera Functionality Implementation

## Overview
This document describes the camera capture functionality implemented in the Homework Room page for submitting homework assignments.

## Features Implemented

### 1. Camera Device Detection
- **Automatic Detection**: Scans for all available camera devices on the system
- **External Camera Priority**: Automatically detects and prioritizes external USB webcams
- **Device Labeling**: Identifies external cameras based on device labels (USB, external, webcam keywords)
- **Fallback**: Falls back to system default camera if no external camera is found

### 2. Camera Selection & Preferences
- **Device Selection**: Dropdown menu to choose from available cameras
- **Visual Indicators**: 
  - 🔗 Icon for external cameras
  - ✓ Checkmark for preferred camera
- **Persistent Preferences**: Saves selected camera to localStorage for future sessions
- **Auto-Selection**: Automatically selects preferred camera or external camera on startup

### 3. Live Camera Preview
- **Real-time Stream**: Shows live camera feed in the modal
- **High Quality**: Optimized for 1280x720 resolution
- **Responsive Design**: Adapts to different screen sizes
- **Error Handling**: Graceful fallback when camera access fails

### 4. Image Capture Stack
- **Multiple Captures**: Capture multiple images in a single session
- **Visual Stack**: Grid display of captured images with thumbnails
- **Individual Removal**: Remove specific images from the stack
- **Clear All**: Option to clear all captured images at once
- **Image Counter**: Shows total number of captured images

### 5. Upload Integration
- **Seamless Integration**: Captured images are added to the existing file upload system
- **API Endpoint**: Uses dummy endpoint `https://admin.bambinos.live/api/parent-panel/submit-homework-camera`
- **FormData**: Properly formats images for server upload
- **Authentication**: Includes Bearer token for API authorization

## Technical Implementation

### Components
1. **CameraCaptureModal.tsx**: Main camera capture component
2. **HomeworkRoom.tsx**: Modified to include camera functionality

### Key Functions
- `detectCameras()`: Enumerates available camera devices
- `startCamera()`: Initializes camera stream
- `captureImage()`: Captures current frame to canvas
- `handleCameraChange()`: Manages camera selection and preferences
- `handleSubmit()`: Uploads captured images to server

### State Management
- Camera device list
- Selected camera device
- Captured images array
- Loading states
- Preferred camera preference

### Browser APIs Used
- `navigator.mediaDevices.enumerateDevices()`: Device detection
- `navigator.mediaDevices.getUserMedia()`: Camera access
- `Canvas API`: Image capture and processing
- `localStorage`: Preference persistence

## User Flow

1. **Access**: User clicks "Camera Capture" button on homework item
2. **Detection**: System automatically detects available cameras
3. **Selection**: User can choose preferred camera (auto-selected if available)
4. **Preview**: Live camera feed is displayed
5. **Capture**: User clicks "Capture" to add images to stack
6. **Review**: User can review, remove, or add more images
7. **Submit**: User submits all captured images
8. **Integration**: Images are added to file upload system for final submission

## Error Handling

- **Camera Access Denied**: Shows toast notification with guidance
- **Device Detection Failed**: Graceful fallback with error message
- **Stream Errors**: Automatic retry and fallback mechanisms
- **Upload Failures**: Proper error messages and retry options

## Security Considerations

- **HTTPS Required**: Camera access requires secure context
- **Permission Handling**: Proper user consent for camera access
- **Data Privacy**: Images are processed locally before upload
- **Token Authentication**: Secure API communication

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **HTTPS Required**: Camera access only works over secure connections
- **Mobile Support**: Responsive design for mobile devices
- **Progressive Enhancement**: Graceful degradation for unsupported browsers

## Future Enhancements

1. **Image Editing**: Basic cropping and rotation
2. **Quality Settings**: Adjustable image quality and resolution
3. **Batch Processing**: Multiple image upload optimization
4. **Offline Support**: Local storage for captured images
5. **Advanced Filters**: Image enhancement and filters

## API Integration

The camera functionality integrates with the existing homework submission system:

```typescript
// API Endpoint
POST https://admin.bambinos.live/api/parent-panel/submit-homework-camera

// Request Body (FormData)
- homework_id: number
- child_id: number
- images[]: File[] (captured images)

// Response
{
  success: boolean,
  message: string,
  data?: any
}
```

## Testing

To test the camera functionality:

1. Ensure you're on HTTPS (required for camera access)
2. Grant camera permissions when prompted
3. Test with multiple camera devices if available
4. Verify image capture and upload process
5. Check localStorage for preference persistence

## Troubleshooting

### Common Issues
- **Camera not detected**: Check browser permissions and HTTPS
- **Stream not starting**: Verify camera is not in use by other applications
- **Upload failures**: Check network connection and API endpoint
- **Permission denied**: Clear browser permissions and retry

### Debug Information
- Check browser console for detailed error messages
- Verify camera device enumeration in browser dev tools
- Monitor network requests for upload status 