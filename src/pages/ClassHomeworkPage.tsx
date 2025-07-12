
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Calendar, 
  FileText, 
  Download,
  Eye,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHomework } from "@/hooks/useHomework";
import { useChildren } from "@/hooks/useChildren";
import { HomeworkAssignment } from "@/lib/interface/homework";

const ClassHomeworkPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<HomeworkAssignment | null>(null);
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const { selectedChild } = useChildren();
  const { data: homeworkData, isLoading, error, loadHomework, clearError } = useHomework();

  // Listen for sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = () => {
      const sidebar = document.querySelector('[class*="w-20"], [class*="w-64"]');
      if (sidebar) {
        setSidebarCollapsed(sidebar.classList.contains('w-20'));
      }
    };

    const sidebar = document.querySelector('[class*="transition-all"]');
    if (sidebar) {
      sidebar.addEventListener('transitionend', handleSidebarToggle);
      return () => sidebar.removeEventListener('transitionend', handleSidebarToggle);
    }
  }, []);

  // Load homework data when component mounts or child changes
  useEffect(() => {
    if (selectedChild?.id) {
      loadHomework({ child_id: selectedChild.id });
    }
  }, [selectedChild, loadHomework]);

  const handleViewHomework = (assignment: HomeworkAssignment) => {
    setSelectedHomework(assignment);
    setIsHomeworkModalOpen(true);
  };

  const handleDownloadHomework = (assignment: HomeworkAssignment) => {
    const homeworkContent = assignment.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.homework;
    if (homeworkContent) {
      // Create a blob and download the homework content
      const blob = new Blob([homeworkContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `homework_${assignment.admin_class_name}_${assignment.class_date}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusBadge = (assignment: HomeworkAssignment) => {
    const submittedCount = assignment.submitted_hw_count;
    const pendingCount = parseInt(assignment.pending_hw_count) || 0;
    
    if (submittedCount > 0 && pendingCount === 0) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      );
    } else if (submittedCount > 0 && pendingCount > 0) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Partially Submitted
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    }
  };

  const renderHomeworkCard = (assignment: HomeworkAssignment) => (
    <Card key={assignment.classschedulebooking_id} className="p-6 rounded-2xl bg-white shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-800 mb-2">{assignment.admin_class_name}</h3>
            <p className="text-gray-600 mb-2">{assignment.category_name}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">Date: {formatDate(assignment.class_date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-gray-600">
                  {formatTime(assignment.start_time)} - {formatTime(assignment.end_time)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {getStatusBadge(assignment)}
          <div className="text-sm text-gray-600">
            <div>Submitted: {assignment.submitted_hw_count}</div>
            <div>Pending: {assignment.pending_hw_count}</div>
          </div>
        </div>
      </div>

      {assignment.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.homework && (
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Homework Assignment</h4>
          <p className="text-gray-700 text-sm overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {assignment.classschedule.facultyclassschedulecurriculum.curriculumtopic.homework}
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewHomework(assignment)}
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownloadHomework(assignment)}
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </Card>
  );

  const renderSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 rounded-2xl bg-white shadow-lg border-2 border-blue-200">
          <div className="flex items-start space-x-4 mb-4">
            <Skeleton className="w-14 h-14 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-end space-x-3 mt-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className={`transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/past-classes")}
              className="mb-4 border-2 border-yellow-300 text-blue-700 hover:bg-yellow-50 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Past Classes
            </Button>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-blue-800 mb-2">
                  Class Homework
                </h1>
                <p className="text-blue-600">View and download homework assignments</p>
              </div>
              
              {homeworkData && selectedChild && (
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{homeworkData.submitted_hw_count}</div>
                    <div className="text-sm text-gray-600">Submitted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{homeworkData.pending_hw_count}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700">{error}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectedChild?.id && loadHomework({ child_id: selectedChild.id })}
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </div>
            )}
          </div>

          {!selectedChild ? (
            <Card className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Child Selected</h3>
              <p className="text-gray-500">Please select a child to view their homework assignments.</p>
            </Card>
          ) : isLoading ? (
            renderSkeleton()
          ) : homeworkData?.homework?.data?.length ? (
            <div className="space-y-6">
              {homeworkData.homework.data.map(renderHomeworkCard)}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Homework Found</h3>
              <p className="text-gray-500">There are no homework assignments available for this child.</p>
            </Card>
          )}
        </main>
      </div>

      {/* Homework View Modal */}
      <Dialog open={isHomeworkModalOpen} onOpenChange={setIsHomeworkModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800">
              {selectedHomework?.admin_class_name} - Homework Assignment
            </DialogTitle>
          </DialogHeader>
          
          {selectedHomework && (
            <div className="space-y-6">
              {/* Class Details */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">Date: {formatDate(selectedHomework.class_date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-gray-700">
                      Time: {formatTime(selectedHomework.start_time)} - {formatTime(selectedHomework.end_time)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Category: {selectedHomework.category_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">
                      Status: {selectedHomework.submitted_hw_count} submitted, {selectedHomework.pending_hw_count} pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Homework Content */}
              {selectedHomework.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.homework ? (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Homework Assignment</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedHomework.classschedule.facultyclassschedulecurriculum.curriculumtopic.homework}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-700">No homework content available for this class.</p>
                </div>
              )}

              {/* Topic Information */}
              {selectedHomework.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.topic && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Class Topic</h4>
                  <p className="text-green-700">
                    {selectedHomework.classschedule.facultyclassschedulecurriculum.curriculumtopic.topic}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => handleDownloadHomework(selectedHomework)}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Homework
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassHomeworkPage;
