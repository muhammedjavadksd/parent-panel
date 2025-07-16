import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Clock, HelpCircle, CheckCircle2, AlertCircle, CalendarIcon, Download, Upload, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useHomework } from "@/hooks/useHomework";
import { useChildren } from "@/hooks/useChildren";

const HomeworkRoom = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File[] }>({});
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [currentHomeworkId, setCurrentHomeworkId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { children: childrenData } = useChildren();
  const { data, isLoading, error, loadHomework, clearError } = useHomework();

  // Get the first child's ID for API calls
  const currentChildId = childrenData?.[0]?.id || 1;

  useEffect(() => {
    // Load homework data when component mounts
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

  const handleSubmitWork = (homeworkId: number) => {
    const files = selectedFiles[homeworkId] || [];
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to submit.",
        variant: "destructive"
      });
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('homework_id', homeworkId.toString());
    formData.append('child_id', currentChildId.toString());

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    // Upload files to the server
    fetch('https://admin.bambinos.live/api/parent-panel/submit-homework', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast({
            title: "Homework Submitted Successfully!",
            description: `${files.length} file(s) submitted for homework.`,
          });

          // Refresh homework data
          loadHomework({
            child_id: currentChildId,
            page: currentPage,
            limit: 10
          });
        } else {
          toast({
            title: "Submission Failed",
            description: data.message || "Failed to submit homework.",
            variant: "destructive"
          });
        }
      })
      .catch(error => {
        console.error('Error submitting homework:', error);
        toast({
          title: "Submission Failed",
          description: "An error occurred while submitting homework.",
          variant: "destructive"
        });
      });

    // Clear selected files after submission
    setSelectedFiles(prev => ({
      ...prev,
      [homeworkId]: []
    }));

    setIsSubmitDialogOpen(false);
    setCurrentHomeworkId(null);
  };

  const openSubmitDialog = (homeworkId: number) => {
    setCurrentHomeworkId(homeworkId);
    setIsSubmitDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
          <Header onStartTour={()=> {}} />
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
        <Header onStartTour={()=> {}} />

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
                </h1>
                <p className="text-blue-600 text-sm sm:text-base">Complete assignments and get help from teachers</p>
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
                <Card key={homework.classschedulebooking_id} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
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

                    <div className="flex flex-col space-y-2 sm:space-y-3 lg:ml-8">
                      {parseInt(homework.pending_hw_count) > 0 ? (
                        <>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 lg:px-6 py-2 shadow-md border-0 transition-all duration-200 text-xs sm:text-sm"
                            onClick={() => openSubmitDialog(homework.classschedulebooking_id)}
                          >
                            Submit Work
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                          >
                            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Ask Doubt
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleViewHomework(homework)}
                          >
                            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View Homework
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleDownloadHomework(homework)}
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            disabled
                          >
                            ✓ Submitted
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                          >
                            View Feedback
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleViewHomework(homework)}
                          >
                            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View Homework
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-3 sm:px-4 lg:px-6 py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleDownloadHomework(homework)}
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Download
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
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT
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
                    disabled={!currentHomeworkId || !selectedFiles[currentHomeworkId]?.length}
                  >
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Submit
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
