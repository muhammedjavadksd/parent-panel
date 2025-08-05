import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Zap, ArrowLeft, BookOpen, Clock, HelpCircle, CheckCircle2, AlertCircle, CalendarIcon, Download, Upload, X, Loader2, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useHomework } from "@/hooks/useHomework";
import { useChildren } from "@/hooks/useChildren";
import CameraCaptureModal from "@/components/CameraCaptureModal";
import { apiClient } from "@/services/api";

const HomeworkRoom = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File[] }>({});
  const [homeworkComments, setHomeworkComments] = useState<{ [key: number]: string }>({});
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isViewSubmissionDialogOpen, setIsViewSubmissionDialogOpen] = useState(false);
  const [isViewFeedbackDialogOpen, setIsViewFeedbackDialogOpen] = useState(false);
  const [currentHomeworkId, setCurrentHomeworkId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { children: childrenData, selectedChild, isLoading: childrenLoading } = useChildren();
    const { 
    data, 
    isLoading: homeworkLoading, 
    error, 
    loadHomework, 
    clearError,
    submittedFiles,
    isSubmittedFilesLoading,
    submittedFilesError,
    loadSubmittedHomeworkFiles,
    clearSubmittedFiles,
    clearSubmittedFilesError,
    feedbackData,
    isFeedbackLoading,
    feedbackError,
    loadFeedback,
    clearFeedback,
    clearFeedbackError
  } = useHomework();

  // Combined loading state
  const isLoading = childrenLoading || homeworkLoading;

  // Get the selected child's ID for API calls, or use first child if no specific child is selected
  const currentChildId = selectedChild?.id || childrenData?.[0]?.id || 1;

  // Debug log for child ID
  useEffect(() => {
    console.log('🔍 HomeworkRoom: Using child ID:', currentChildId, 'for child:', selectedChild?.name || 'Family');
  }, [currentChildId, selectedChild]);

  useEffect(() => {
    // Reset to first page when child selection changes
    if (selectedChild !== undefined) {
      console.log('🔍 HomeworkRoom: Child selection changed to:', selectedChild?.name || 'Family');
      setCurrentPage(1);
    }
  }, [selectedChild]);

  useEffect(() => {
    // Load homework data when component mounts or child selection changes
    loadHomework({
      child_id: currentChildId,
      page: currentPage,
      limit: 10
    });
  }, [currentChildId, currentPage, loadHomework]);

  // Filter homework based on selected date/range
  const filteredHomework = data?.homework?.data?.filter(homework => {
    if (!selectedDate && !dateRange.from && !dateRange.to) {
      return true; // Show all if no date filter is applied
    }

    const homeworkDate = parseISO(homework.class_date);

    if (isRangeMode && dateRange.from && dateRange.to) {
      return homeworkDate >= dateRange.from && homeworkDate <= dateRange.to;
    } else if (selectedDate) {
      return homeworkDate.toDateString() === selectedDate.toDateString();
    }

    return true;
  }) || [];

  const getPriorityColor = (pendingCount: string) => {
    const count = parseInt(pendingCount);
    if (count > 0) return 'bg-red-50 text-red-700 border border-red-200';
    return 'bg-green-50 text-green-700 border border-green-200';
  };

  const getStatusIcon = (pendingCount: string) => {
    const count = parseInt(pendingCount);
    if (count > 0) return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />;
    return <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />;
  };

  const getPriorityText = (pendingCount: string) => {
    const count = parseInt(pendingCount);
    if (count > 0) return 'high priority';
    return 'completed';
  };

  const handleSingleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleRangeDateSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    setDateRange(range || { from: undefined, to: undefined });
  };

  const [homeworkAvailable, setHomeworkAvailable] = useState(true);

  useEffect(() => {
    console.log("-------------------Homework available: ", homeworkAvailable);

  }, [homeworkAvailable]);

  const handleDownloadHomework = (homework: any) => {
    const homeworkFile = homework.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.homework;
    if (homeworkFile === "") {
      toast({
        title: "No Homework File",
        description: "No homework file available for this assignment.",
        variant: "destructive"
      });
      setHomeworkAvailable(false);
      return;
    }

    const downloadUrl = `https://admin.bambinos.live/storage/${homeworkFile}`;
    window.open(downloadUrl, '_blank');
    toast({
      title: "Download Started",
      description: "Homework materials are being downloaded.",
    });
  };

  const handleViewHomework = (homework: any) => {
    const homeworkFile = homework.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.homework;
    if (!homeworkFile) {
      toast({
        title: "No Homework File",
        description: "No homework file available for this assignment.",
        variant: "destructive"
      });
      return;
    }

    const viewUrl = `https://admin.bambinos.live/storage/${homeworkFile}`;
    window.open(viewUrl, '_blank');
    toast({
      title: "Opening Homework",
      description: "Homework is opening in a new tab.",
    });
  };

  const handleFileSelect = (homeworkId: number, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setSelectedFiles(prev => ({
      ...prev,
      [homeworkId]: [...(prev[homeworkId] || []), ...fileArray]
    }));
  };

  const removeFile = (homeworkId: number, fileIndex: number) => {
    setSelectedFiles(prev => ({
      ...prev,
      [homeworkId]: prev[homeworkId]?.filter((_, index) => index !== fileIndex) || []
    }));
  };



  const handleSubmitWork = async (homeworkId: number) => {
    const files = selectedFiles[homeworkId] || [];
    const comment = homeworkComments[homeworkId] || '';
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to submit.",
        variant: "destructive"
      });
      return;
    }

    // Check if files exceed the maximum limit
    if (files.length > 10) {
      toast({
        title: "Too many files",
        description: "Maximum 10 files allowed per submission.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();

      // Add the classschedulebooking_id
      formData.append('classschedulebooking_id', homeworkId.toString());

      // Add comment if provided
      if (comment.trim()) {
        formData.append('comment', comment.trim());
      }

      // Add all files to the form data with unique names
      files.forEach((file, index) => {
        // Create unique filename by appending classschedulebooking_id
        const fileExtension = file.name.split('.').pop();
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
        const uniqueFileName = `${fileNameWithoutExtension}_${homeworkId}.${fileExtension}`;

        // Create new File object with unique name
        const renamedFile = new File([file], uniqueFileName, { type: file.type });
        formData.append('files', renamedFile);
      });

      const response = await apiClient.post(
        `${import.meta.env.VITE_BASE_URL}/api/homework/submit`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
              console.log(`Upload Progress: ${percentCompleted}%`); // For debugging
            }
          },
        }
      );

      const result = response.data;

      if (result.status === 'success') {
        toast({
          title: "Homework Submitted Successfully!",
          description: `${files.length} file(s) uploaded successfully.`,
        });

        // Refresh homework data
        loadHomework({
          child_id: currentChildId,
          page: currentPage,
          limit: 10
        });

        // Cleanup
        setSelectedFiles(prev => ({
          ...prev,
          [homeworkId]: []
        }));
        setHomeworkComments(prev => ({
          ...prev,
          [homeworkId]: ''
        }));
        setIsSubmitDialogOpen(false);
        setCurrentHomeworkId(null);
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
      setIsSubmitting(false);
      // Optionally reset progress to 0 after a short delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };



  const openSubmitDialog = (homeworkId: number) => {
    setCurrentHomeworkId(homeworkId);
    setIsSubmitDialogOpen(true);
  };

  const openCameraModal = (homeworkId: number) => {
    setCurrentHomeworkId(homeworkId);
    setIsCameraModalOpen(true);
  };

    const openViewSubmissionDialog = async (homeworkId: number) => {
    setCurrentHomeworkId(homeworkId);
    setIsViewSubmissionDialogOpen(true);
    
    // Load submitted homework files
    await loadSubmittedHomeworkFiles(homeworkId);
  };

  const openViewFeedbackDialog = async (homeworkId: number) => {
    setCurrentHomeworkId(homeworkId);
    setIsViewFeedbackDialogOpen(true);
    
    // Load homework feedback
    await loadFeedback(homeworkId);
  };

  const handleCommentChange = (homeworkId: number, comment: string) => {
    setHomeworkComments(prev => ({
      ...prev,
      [homeworkId]: comment
    }));
  };

  const handleCameraImagesCaptured = (images: File[]) => {
    if (currentHomeworkId) {
      // Add captured images to the selected files (they already have unique names from camera capture)
      setSelectedFiles(prev => ({
        ...prev,
        [currentHomeworkId]: [...(prev[currentHomeworkId] || []), ...images]
      }));

      // Close camera modal and open file upload dialog
      setIsCameraModalOpen(false);
      setIsSubmitDialogOpen(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
          <Header onStartTour={() => { }} />
          <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Homework</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => clearError()}>Try Again</Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => { }} />

        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="outline"
              onClick={() => navigate("/classes")}
              className="mb-3 sm:mb-4 border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Classes
            </Button>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-1 sm:mb-2">
                  Homework Room
                  {selectedChild && (
                    <span className="text-lg sm:text-xl lg:text-2xl text-blue-600 ml-2 sm:ml-3">
                      - {selectedChild.name}
                    </span>
                  )}
                </h1>
                <p className="text-blue-600 text-sm sm:text-base">
                  {selectedChild
                    ? `Complete assignments for ${selectedChild.name}`
                    : "Complete assignments and get help from teachers"
                  }
                </p>
              </div>

              {/* Date Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={!isRangeMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsRangeMode(false)}
                    className="text-xs"
                  >
                    Single Date
                  </Button>
                  <Button
                    variant={isRangeMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsRangeMode(true)}
                    className="text-xs"
                  >
                    Date Range
                  </Button>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="text-xs sm:text-sm min-w-[150px] sm:min-w-[200px]">
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {isRangeMode ? (
                        dateRange.from && dateRange.to ? (
                          `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                        ) : "Select Date Range"
                      ) : (
                        selectedDate ? format(selectedDate, "PPP") : "Select Date"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white shadow-xl border" align="start">
                    {isRangeMode ? (
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={handleRangeDateSelect}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    ) : (
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleSingleDateSelect}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    )}
                  </PopoverContent>
                </Popover>

                {(selectedDate || (isRangeMode && dateRange.from && dateRange.to)) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedDate(undefined);
                      setDateRange({ from: undefined, to: undefined });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                  >
                    Clear Filter
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-700 font-semibold mb-1 text-xs sm:text-sm">Pending</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800">
                    {data?.pending_hw_count || 0}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600" />
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 font-semibold mb-1 text-xs sm:text-sm">Submitted</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">
                    {data?.submitted_hw_count || 0}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-700 font-semibold mb-1 text-xs sm:text-sm">Total Classes</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800">
                    {data?.homework?.total || 0}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-600 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-lg text-gray-600">Loading homework...</span>
            </div>
          )}

          {/* Homework List */}
          {!isLoading && (
            <div className="space-y-4 sm:space-y-6">
              {homeworkAvailable && filteredHomework.map((homework) => (
                <Card key={homework.classschedulebooking_id} className={`p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300 ${parseInt(homework.pending_hw_count) === 0 && 'border-2 border-green-200'}`}>
                  <div className="flex flex-col  lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-yellow-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md">
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2 space-y-1 sm:space-y-0">
                            <h3 className="text-sm sm:text-base lg:text-xl font-bold text-blue-800 truncate">
                              {homework.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.topic || 'Homework Assignment'}
                            </h3>
                            {getStatusIcon(homework.pending_hw_count)}
                            <Badge className={`${getPriorityColor(homework.pending_hw_count)} font-medium text-xs sm:text-sm w-fit`}>
                              {getPriorityText(homework.pending_hw_count)}
                            </Badge>
                          </div>
                          <p className="text-blue-600 font-semibold text-sm sm:text-base lg:text-lg">{homework.admin_class_name}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          <span className="font-medium">
                            Class: {format(parseISO(homework.class_date), "MMM dd, yyyy")} at {homework.start_time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            Pending: {homework.pending_hw_count} | Submitted: {homework.submitted_hw_count}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-full gap-7 pt-5 lg:flex-row lg:flex-wrap lg:w-auto lg:justify-start">
                      {parseInt(homework.pending_hw_count) > 0 ? (
                        <>

                          <Button
                            className="w-48 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 lg:px-6 py-2 shadow-md border-0 transition-all duration-200 text-xs sm:text-sm"
                            onClick={() => openSubmitDialog(homework.classschedulebooking_id)}
                          >
                            <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Upload Files
                          </Button>
                          <Button
                            className="w-48 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 lg:px-6 py-2 shadow-md border-0 transition-all duration-200 text-xs sm:text-sm"
                            onClick={() => openCameraModal(homework.classschedulebooking_id)}
                          >
                            <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Camera Capture
                          </Button>
                          <Button
                            variant="outline"
                            className="w-48 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                          >
                            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Ask Doubt
                          </Button>
                          <Button
                            variant="outline"
                            className="w-48 border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleViewHomework(homework)}
                          >
                            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View Homework
                          </Button>
                          <Button
                            variant="outline"
                            className="w-48 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            // onClick={() => handleDownloadHomework(homework)}
                            onClick={() => window.open(`https://www.bambinos.live`, '_blank')}
                          >
                            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Asses My Work
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="w-48 border-2 border-green-300 text-green-700 hover:bg-green-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            disabled
                          >
                            Submitted ✨
                          </Button>
                          <Button
                            variant="outline"
                            className="w-48 border-2 border-green-400 text-green-700 hover:bg-blue-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => openViewSubmissionDialog(homework.classschedulebooking_id)}
                          >
                            View Submission
                          </Button>
                          <Button
                            variant="outline"
                            className="w-48 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => openViewFeedbackDialog(homework.classschedulebooking_id)}
                          >
                            View Feedback
                          </Button>
                          <Button
                            variant="outline"
                            className="w-48 border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleViewHomework(homework)}
                          >
                            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View Homework
                          </Button>
                          {/* <Button
                            variant="outline"
                            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleDownloadHomework(homework)}
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Download
                          </Button> */}

                          <Button
                            variant="outline"
                            className="w-48 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            // onClick={() => handleDownloadHomework(homework)}
                            onClick={() => window.open(`https://www.bambinos.live`, '_blank')}
                          >
                            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Asses My Work
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {filteredHomework.length === 0 && !isLoading && (
                <div className="text-center py-6 sm:py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-2">📚</div>
                  <p className="font-medium text-sm sm:text-base">No homework found for the selected date range.</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Try adjusting your date filter.</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {data?.homework && data.homework.last_page > 1 && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <div className="flex space-x-1 sm:space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  Previous
                </Button>

                {Array.from({ length: Math.min(5, data.homework.last_page) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNum)}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === data.homework.last_page}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Submit Work Dialog */}
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl font-bold text-blue-800">
                  Submit Homework
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Select Files to Upload
                  </label>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => currentHomeworkId && handleFileSelect(currentHomeworkId, e.target.files)}
                    className="cursor-pointer text-xs sm:text-sm"
                    accept=".jpeg,.jpg,.png,.gif,.webp,.bmp,.tiff,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.mp4,.avi,.mov,.wmv,.flv,.webm,.mkv,.mpeg,.wav,.mp3,.ogg,.aac,.zip,.rar,.7z,.json,.xml"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, MP4, DOC, DOCX, JPG, PNG, TXT (Max 10 files)
                  </p>
                </div>

                {/* Comment Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Comment (Optional)
                  </label>
                  <textarea
                    placeholder="Add a comment about your homework submission..."
                    value={currentHomeworkId ? homeworkComments[currentHomeworkId] || '' : ''}
                    onChange={(e) => currentHomeworkId && handleCommentChange(currentHomeworkId, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-xs sm:text-sm resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add any notes or comments about your submission
                  </p>
                </div>

                {/* Selected Files Display */}
                {currentHomeworkId && selectedFiles[currentHomeworkId]?.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
                      Selected Files ({selectedFiles[currentHomeworkId].length})
                    </label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {selectedFiles[currentHomeworkId].map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs sm:text-sm text-gray-700 truncate flex-1">
                            {file.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => currentHomeworkId && removeFile(currentHomeworkId, index)}
                            className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isSubmitting && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 my-3">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                    <p className="text-center text-xs text-gray-600 mt-1">{uploadProgress}% Complete</p>
                  </div>
                )}

                <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitDialogOpen(false)}
                    className="flex-1 text-xs sm:text-sm"
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={() => currentHomeworkId && handleSubmitWork(currentHomeworkId)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                    disabled={!currentHomeworkId || !selectedFiles[currentHomeworkId]?.length || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>

              </div>
            </DialogContent>
          </Dialog>

          {/* Camera Capture Modal */}
          <CameraCaptureModal
            isOpen={isCameraModalOpen}
            onClose={() => setIsCameraModalOpen(false)}
            onImagesCaptured={handleCameraImagesCaptured}
            homeworkId={currentHomeworkId || 0}
          />

          {/* View Submission Dialog */}
          <Dialog open={isViewSubmissionDialogOpen} onOpenChange={setIsViewSubmissionDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl font-bold text-blue-800">
                  Your Submitted Homework Files
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {isSubmittedFilesLoading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Loading submitted files...</span>
                  </div>
                )}

                {submittedFilesError && (
                  <div className="text-center py-4">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-600 text-sm">{submittedFilesError}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        clearSubmittedFilesError();
                        if (currentHomeworkId) {
                          loadSubmittedHomeworkFiles(currentHomeworkId);
                        }
                      }}
                      className="mt-2"
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {!isSubmittedFilesLoading && !submittedFilesError && submittedFiles?.data && (
                  <div className="space-y-3">
                    {submittedFiles.data.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">No submitted files found</p>
                        <p className="text-sm text-gray-400 mt-1">No homework files have been submitted for this assignment yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 mb-3">
                          Found {submittedFiles.data.length} submitted file(s):
                        </p>
                        {submittedFiles.data.map((file, index) => {
                          const fullUrl = `https://bambinos.live/${file.homework_file}`;
                          const fileName = file.homework_file.split('/').pop() || 'Unknown File';

                          return (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {fileName}
                                </p>

                                {/* No need to show file path */}

                                {/* <p className="text-xs text-gray-500 truncate">
                                  {file.homework_file}
                                </p> */}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(fullUrl, '_blank')}
                                className="ml-3 flex-shrink-0"
                              >
                                <BookOpen className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsViewSubmissionDialogOpen(false);
                      clearSubmittedFiles();
                      clearSubmittedFilesError();
                    }}
                    className="text-sm"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* View Feedback Dialog */}
          <Dialog open={isViewFeedbackDialogOpen} onOpenChange={setIsViewFeedbackDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl font-bold text-blue-800">
                  Teacher Feedback
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {isFeedbackLoading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Loading feedback...</span>
                  </div>
                )}

                {feedbackError && (
                  <div className="text-center py-4">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-600 text-sm">{feedbackError}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        clearFeedbackError();
                        if (currentHomeworkId) {
                          loadFeedback(currentHomeworkId);
                        }
                      }}
                      className="mt-2"
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {!isFeedbackLoading && !feedbackError && feedbackData?.data && (
                  <div className="space-y-4">
                    {feedbackData.data.homeworks.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">No feedback available</p>
                        <p className="text-sm text-gray-400 mt-1">No feedback has been provided for this assignment yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-3">
                          Feedback for {feedbackData.data.homeworks.length} submission(s):
                        </p>
                        {feedbackData.data.homeworks.map((homework, index) => {
                          const fileName = homework.homework_file.split('/').pop() || 'Unknown File';
                          const hasTeacherFeedback = homework.teacher_comment || homework.teacher_file || homework.teacher_recording;
                          
                          return (
                            <div key={index} className="border rounded-lg p-4 bg-gray-50">
                              {/* Student Submission */}
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Your Submission</h4>
                                <div className="flex items-center justify-between p-3 bg-white rounded border">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                      {fileName}
                                    </p>
                                    {homework.comment && (
                                      <p className="text-xs text-gray-600 mt-1">
                                        <span className="font-medium">Your comment:</span> {homework.comment}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`https://bambinos.live/${homework.homework_file}`, '_blank')}
                                    className="ml-3 flex-shrink-0"
                                  >
                                    <BookOpen className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                </div>
                              </div>

                              {/* Teacher Feedback */}
                              {hasTeacherFeedback ? (
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Teacher Feedback</h4>
                                  
                                  {/* Teacher Comment */}
                                  {homework.teacher_comment && (
                                    <div className="mb-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                                      <p className="text-sm text-gray-800">
                                        <span className="font-medium">Comment:</span> {homework.teacher_comment}
                                      </p>
                                    </div>
                                  )}

                                  {/* Teacher File */}
                                  {homework.teacher_file && (
                                    <div className="mb-3 flex items-center justify-between p-3 bg-white rounded border">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                          Teacher's File: {homework.teacher_file.split('/').pop() || 'Unknown File'}
                                        </p>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(`https://bambinos.live/${homework.teacher_file}`, '_blank')}
                                        className="ml-3 flex-shrink-0"
                                      >
                                        <Download className="w-3 h-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  )}

                                  {/* Teacher Recording */}
                                  {homework.teacher_recording && (
                                    <div className="mb-3 p-3 bg-white rounded border">
                                      <p className="text-sm font-medium text-gray-800 mb-2">Audio Feedback</p>
                                      <audio controls className="w-full">
                                        <source src={`https://bambinos.live/${homework.teacher_recording}`} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                      </audio>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(`https://bambinos.live/${homework.teacher_recording}`, '_blank')}
                                        className="mt-2"
                                      >
                                        <Download className="w-3 h-3 mr-1" />
                                        Download Audio
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-gray-500">
                                  <p className="text-sm">No feedback provided yet</p>
                                  <p className="text-xs text-gray-400 mt-1">Your teacher will provide feedback soon.</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsViewFeedbackDialogOpen(false);
                      clearFeedback();
                      clearFeedbackError();
                    }}
                    className="text-sm"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default HomeworkRoom;
