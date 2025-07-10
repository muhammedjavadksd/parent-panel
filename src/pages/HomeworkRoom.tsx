import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Clock, HelpCircle, CheckCircle2, AlertCircle, CalendarIcon, Download, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const HomeworkRoom = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File[] }>({});
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [currentHomeworkId, setCurrentHomeworkId] = useState<number | null>(null);

  const homeworkList = [
    {
      id: 1,
      title: "Math Practice - Addition & Subtraction",
      subject: "Mathematics",
      dueDate: "Tomorrow",
      actualDueDate: new Date(2024, 5, 26),
      priority: "high",
      status: "pending",
      description: "Complete exercises 1-10 from chapter 3",
      doubts: 0
    },
    {
      id: 2,
      title: "Story Writing Assignment",
      subject: "English",
      dueDate: "Jun 25",
      actualDueDate: new Date(2024, 5, 25),
      priority: "medium",
      status: "pending",
      description: "Write a short story about friendship (200 words)",
      doubts: 2
    },
    {
      id: 3,
      title: "Science Project - Solar System",
      subject: "Science",
      dueDate: "Jun 28",
      actualDueDate: new Date(2024, 5, 28),
      priority: "low",
      status: "submitted",
      description: "Create a model of the solar system",
      doubts: 0
    },
    {
      id: 4,
      title: "Hindi Reading Practice",
      subject: "Hindi",
      dueDate: "Jun 24",
      actualDueDate: new Date(2024, 5, 24),
      priority: "medium",
      status: "submitted",
      description: "Read chapter 5 and answer questions",
      doubts: 1
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border border-green-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'submitted': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSingleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleRangeDateSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    setDateRange(range || { from: undefined, to: undefined });
  };

  const handleDownloadHomework = (homeworkId: number) => {
    console.log(`Downloading homework ${homeworkId}`);
    // Implementation for downloading homework
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

    // Here you would typically upload files to your backend
    console.log(`Submitting homework ${homeworkId} with files:`, files);
    
    toast({
      title: "Homework Submitted Successfully!",
      description: `${files.length} file(s) submitted for homework.`,
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

  const filteredHomework = homeworkList.filter(homework => {
    let matchesDate = true;
    
    if (isRangeMode && dateRange.from && dateRange.to) {
      const homeworkDate = homework.actualDueDate;
      matchesDate = homeworkDate >= dateRange.from && homeworkDate <= dateRange.to;
    } else if (selectedDate) {
      const homeworkDate = homework.actualDueDate;
      matchesDate = homeworkDate.toDateString() === selectedDate.toDateString();
    }
    
    return matchesDate;
  });

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className="ml-64 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/classes")}
              className="mb-4 border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Classes
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-blue-800 mb-2">
                  Homework Room
                </h1>
                <p className="text-blue-600">Complete assignments and get help from teachers</p>
              </div>
              
              {/* Date Filter */}
              <div className="flex items-center space-x-3">
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
                    <Button variant="outline" className="text-sm min-w-[200px]">
                      <CalendarIcon className="w-4 h-4 mr-2" />
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
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear Filter
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 rounded-2xl bg-white border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-700 font-semibold mb-1">Pending</p>
                  <p className="text-3xl font-bold text-red-800">
                    {filteredHomework.filter(h => h.status === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 rounded-2xl bg-white border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 font-semibold mb-1">Submitted</p>
                  <p className="text-3xl font-bold text-green-800">
                    {filteredHomework.filter(h => h.status === 'submitted').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-700 font-semibold mb-1">Active Doubts</p>
                  <p className="text-3xl font-bold text-blue-800">
                    {filteredHomework.reduce((sum, h) => sum + h.doubts, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Homework List */}
          <div className="space-y-6">
            {filteredHomework.map((homework) => (
              <Card key={homework.id} className="p-6 rounded-2xl bg-white shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-md">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-blue-800">{homework.title}</h3>
                          {getStatusIcon(homework.status)}
                          <Badge className={`${getPriorityColor(homework.priority)} font-medium`}>
                            {homework.priority} priority
                          </Badge>
                        </div>
                        <p className="text-blue-600 font-semibold text-lg">{homework.subject}</p>
                        <p className="text-gray-600 mt-1">{homework.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Due: {homework.dueDate}</span>
                      </div>
                      {homework.doubts > 0 && (
                        <div className="flex items-center space-x-2 text-blue-700">
                          <HelpCircle className="w-4 h-4" />
                          <span className="font-medium">{homework.doubts} active doubt(s)</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 ml-8">
                    {homework.status === 'pending' ? (
                      <>
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 shadow-md border-0 transition-all duration-200"
                          onClick={() => openSubmitDialog(homework.id)}
                        >
                          Submit Work
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-2 shadow-sm"
                        >
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Ask Doubt
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-2 shadow-sm"
                          onClick={() => handleDownloadHomework(homework.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-6 py-2 shadow-sm"
                          disabled
                        >
                          ✓ Submitted
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-2 shadow-sm"
                        >
                          View Feedback
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-2 shadow-sm"
                          onClick={() => handleDownloadHomework(homework.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredHomework.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">📚</div>
                <p className="font-medium">No homework found for the selected date range.</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your date filter.</p>
              </div>
            )}
          </div>

          {/* Submit Work Dialog */}
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-blue-800">
                  Submit Homework
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Files to Upload
                  </label>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => currentHomeworkId && handleFileSelect(currentHomeworkId, e.target.files)}
                    className="cursor-pointer"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT
                  </p>
                </div>

                {/* Selected Files Display */}
                {currentHomeworkId && selectedFiles[currentHomeworkId]?.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Selected Files ({selectedFiles[currentHomeworkId].length})
                    </label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {selectedFiles[currentHomeworkId].map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-700 truncate flex-1">
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

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => currentHomeworkId && handleSubmitWork(currentHomeworkId)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={!currentHomeworkId || !selectedFiles[currentHomeworkId]?.length}
                  >
                    <Upload className="w-4 h-4 mr-2" />
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
