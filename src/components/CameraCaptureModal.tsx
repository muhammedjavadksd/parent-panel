import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Camera, X, Upload, RotateCcw, Settings, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { apiClient } from '@/services/api';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImagesCaptured: (images: File[]) => void;
  homeworkId: number;
}

interface CameraDevice {
  deviceId: string;
  label: string;
  isExternal: boolean;
}

const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onImagesCaptured,
  homeworkId
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [capturedImages, setCapturedImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [preferredCamera, setPreferredCamera] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [comment, setComment] = useState<string>('');

  // Load preferred camera from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('preferredCamera');
    if (saved) {
      setPreferredCamera(saved);
    }
  }, []);

  // Detect available cameras
  useEffect(() => {
    if (isOpen) {
      detectCameras();
    }
  }, [isOpen]);

  // Start camera stream when camera is selected
  useEffect(() => {
    if (selectedCamera && isOpen) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [selectedCamera, isOpen]);

  const detectCameras = async () => {
    try {
      // First, request camera permission to get device labels
      await navigator.mediaDevices.getUserMedia({ video: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices.length === 0) {
        toast({
          title: "No Cameras Found",
          description: "No camera devices detected on your system.",
          variant: "destructive"
        });
        return;
      }

      const cameraList: CameraDevice[] = videoDevices.map(device => {
        const label = device.label || `Camera ${device.deviceId.slice(0, 8)}`;
        const lowerLabel = label.toLowerCase();

        // More comprehensive external camera detection
        const isExternal = lowerLabel.includes('usb') ||
          lowerLabel.includes('external') ||
          lowerLabel.includes('webcam') ||
          lowerLabel.includes('logitech') ||
          lowerLabel.includes('hd') ||
          lowerLabel.includes('1080p') ||
          lowerLabel.includes('720p') ||
          (lowerLabel.includes('camera') && !lowerLabel.includes('built-in')) ||
          (lowerLabel.includes('cam') && !lowerLabel.includes('built-in'));

        return {
          deviceId: device.deviceId,
          label: label,
          isExternal: isExternal
        };
      });

      setCameras(cameraList);

      // Auto-select preferred camera or first available camera
      if (cameraList.length > 0) {
        const preferred = cameraList.find(cam => cam.deviceId === preferredCamera);
        const external = cameraList.find(cam => cam.isExternal);
        const defaultCamera = preferred || external || cameraList[0];
        setSelectedCamera(defaultCamera.deviceId);

        // Show success message
        if (external) {
          toast({
            title: "External Camera Detected",
            description: `Found external camera: ${external.label}`,
          });
        }
      }
    } catch (error) {
      console.error('Error detecting cameras:', error);
      toast({
        title: "Camera Access Required",
        description: "Please allow camera access to use this feature.",
        variant: "destructive"
      });
    }
  };

  const startCamera = async () => {
    try {
      stopCamera();

      const constraints = {
        video: {
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error starting camera:', error);
      toast({
        title: "Camera Access Failed",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `homework-capture-${timestamp}_${homeworkId}.jpg`;
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        setCapturedImages(prev => [...prev, file]);

        toast({
          title: "Image Captured!",
          description: `Added to capture stack (${capturedImages.length + 1} images)`,
        });
      }
      setIsCapturing(false);
    }, 'image/jpeg', 0.8);
  };

  const removeImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCameraChange = (deviceId: string) => {
    setSelectedCamera(deviceId);
    // Save as preferred camera
    localStorage.setItem('preferredCamera', deviceId);
    setPreferredCamera(deviceId);
  };

  const handleSubmit = async () => {
    if (capturedImages.length === 0) {
      toast({
        title: "No Images Captured",
        description: "Please capture at least one image before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Check if files exceed the maximum limit
    if (capturedImages.length > 10) {
      toast({
        title: "Too many files",
        description: "Maximum 10 files allowed per submission.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      // Add the classschedulebooking_id (same as homeworkId)
      formData.append('classschedulebooking_id', homeworkId.toString());

      // Add comment if provided
      if (comment.trim()) {
        formData.append('comment', comment.trim());
      }

      // Add all captured images to the form data (already have unique names from capture)
      capturedImages.forEach((file) => {
        formData.append('files', file);
      });

      const response = await apiClient.post(
        `${import.meta.env.VITE_BASE_URL}/api/homework/submit`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      const result = response.data;

      if (result.status === 'success') {
        toast({
          title: "Homework Submitted Successfully!",
          description: `${capturedImages.length} image(s) uploaded successfully.`,
        });

        // Reset and close
        setCapturedImages([]);
        setComment('');
        onClose();
      } else {
        throw new Error(result.message || 'Homework submission failed.');
      }
    } catch (error) {
      console.error('Error submitting homework:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting homework.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmitAndClose = () => {
    // Alternative: Just pass images to parent without direct upload
    if (capturedImages.length > 0) {
      onImagesCaptured(capturedImages);
      setCapturedImages([]);
      setComment('');
      onClose();
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImages([]);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <Camera className="w-6 h-6 text-blue-600" />
            Camera Capture
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Camera Selection */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Camera Device:</span>
            <Select value={selectedCamera} onValueChange={handleCameraChange}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select camera" />
              </SelectTrigger>
              <SelectContent>
                {cameras.map((camera) => (
                  <SelectItem key={camera.deviceId} value={camera.deviceId}>
                    <div className="flex items-center gap-2">
                      {camera.isExternal && <span className="text-blue-600">🔗</span>}
                      {camera.label}
                      {camera.deviceId === preferredCamera && (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Camera Preview */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 sm:h-80 object-cover"
            />
            {!selectedCamera && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No camera selected</p>
                  <p className="text-sm text-gray-400 mt-1">Please select a camera device above</p>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera Status Indicator */}
            {selectedCamera && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Live
              </div>
            )}
          </div>

          {/* Capture Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={captureImage}
              disabled={!selectedCamera || isCapturing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              <Camera className="w-4 h-4 mr-2" />
              {isCapturing ? 'Capturing...' : 'Capture'}
            </Button>

            <Button
              onClick={() => setCapturedImages([])}
              variant="outline"
              disabled={capturedImages.length === 0}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>

          {/* Captured Images */}
          {capturedImages.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Captured Images ({capturedImages.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                {capturedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Capture ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comment Input */}
          {capturedImages.length > 0 && (
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium text-gray-700">
                Add a comment (optional):
              </label>
              <Textarea
                id="comment"
                placeholder="Add any additional notes or comments about your homework submission..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={500}
              />
              <div className="text-xs text-gray-500 text-right">
                {comment.length}/500 characters
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitAndClose}
              disabled={capturedImages.length === 0}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add to Files ({capturedImages.length})
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={capturedImages.length === 0 || isLoading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isLoading ? 'Submitting...' : `Submit Homework (${capturedImages.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraCaptureModal; 