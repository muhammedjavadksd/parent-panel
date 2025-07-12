
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
  const [iframeLoading, setIframeLoading] = useState(false);
  const { selectedChild } = useChildren();
  const { data: homeworkData, isLoading, error, loadHomework, clearError } = useHomework();
  
  // Filter homework data to show only the specific class if API doesn't support filtering
  const filteredHomeworkData = homeworkData?.homework?.data?.filter(
    assignment => assignment.classschedulebooking_id === parseInt(classId || '0')
  );

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
      loadHomework({ 
        child_id: selectedChild.id
      });
    }
  }, [selectedChild, loadHomework]);

  const handleViewHomework = (assignment: HomeworkAssignment) => {
    setSelectedHomework(assignment);
    setIsHomeworkModalOpen(true);
    setIframeLoading(true);
  };

  const getHomeworkHtmlContent = (assignment: HomeworkAssignment) => {
    const homeworkContent = assignment.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.homework;
    const topicContent = assignment.classschedule?.facultyclassschedulecurriculum?.curriculumtopic?.topic;
    
    if (!homeworkContent) {
      return `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; background: #f8f9fa; }
              .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { border-bottom: 2px solid #e9ecef; padding-bottom: 20px; margin-bottom: 30px; }
              .title { color: #1e40af; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
              .subtitle { color: #6b7280; font-size: 16px; }
              .content { line-height: 1.6; color: #374151; }
              .no-content { text-align: center; color: #6b7280; font-style: italic; padding: 40px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="title">${assignment.admin_class_name}</div>
                <div class="subtitle">${assignment.category_name} • ${formatDate(assignment.class_date)}</div>
              </div>
              <div class="no-content">No homework content available for this class.</div>
            </div>
          </body>
        </html>
      `;
    }

    return `
      <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              padding: 20px; 
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              margin: 0;
              min-height: 100vh;
            }
            .container { 
              max-width: 800px; 
              margin: 0 auto; 
              background: white; 
              padding: 40px; 
              border-radius: 12px; 
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              border: 1px solid #e9ecef;
            }
            .header { 
              border-bottom: 3px solid #3b82f6; 
              padding-bottom: 25px; 
              margin-bottom: 35px; 
              position: relative;
            }
            .header::after {
              content: '';
              position: absolute;
              bottom: -3px;
              left: 0;
              width: 60px;
              height: 3px;
              background: #f59e0b;
            }
            .title { 
              color: #1e40af; 
              font-size: 28px; 
              font-weight: 700; 
              margin-bottom: 12px;
              letter-spacing: -0.025em;
            }
            .subtitle { 
              color: #6b7280; 
              font-size: 16px; 
              margin-bottom: 20px;
              font-weight: 500;
            }
            .topic-section { 
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); 
              border: 1px solid #bae6fd; 
              border-radius: 8px; 
              padding: 20px; 
              margin-bottom: 30px;
              box-shadow: 0 2px 8px rgba(3, 105, 161, 0.1);
            }
            .topic-title { 
              color: #0369a1; 
              font-weight: 700; 
              margin-bottom: 12px;
              font-size: 16px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .homework-section { 
              background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
              border: 1px solid #fbbf24; 
              border-radius: 8px; 
              padding: 25px;
              box-shadow: 0 2px 8px rgba(251, 191, 36, 0.1);
            }
            .homework-title { 
              color: #92400e; 
              font-weight: 700; 
              font-size: 20px; 
              margin-bottom: 18px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .content { 
              line-height: 1.7; 
              color: #374151; 
              white-space: pre-wrap;
              font-size: 15px;
            }
            .meta { 
              margin-top: 30px; 
              padding: 20px;
              background: #f8fafc;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
              color: #64748b; 
              font-size: 14px;
              font-weight: 500;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin-left: 8px;
            }
            .status-submitted {
              background: #dcfce7;
              color: #166534;
              border: 1px solid #bbf7d0;
            }
            .status-pending {
              background: #fef2f2;
              color: #dc2626;
              border: 1px solid #fecaca;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="title">${assignment.admin_class_name}</div>
              <div class="subtitle">${assignment.category_name} • ${formatDate(assignment.class_date)} • ${formatTime(assignment.start_time)} - ${formatTime(assignment.end_time)}</div>
            </div>
            
            ${topicContent ? `
              <div class="topic-section">
                <div class="topic-title">📚 Class Topic</div>
                <div class="content">${topicContent}</div>
              </div>
            ` : ''}
            
            <div class="homework-section">
              <div class="homework-title">📝 Homework Assignment</div>
              <div class="content">${homeworkContent}</div>
            </div>
            
            <div class="meta">
              <strong>Status:</strong> 
              <span class="status-badge status-submitted">${assignment.submitted_hw_count} submitted</span>
              <span class="status-badge status-pending">${assignment.pending_hw_count} pending</span>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleDownloadHomework = (assignment: HomeworkAssignment) => {
    const htmlContent = getHomeworkHtmlContent(assignment);
    if (htmlContent) {
      // Create a blob and download the homework content as HTML
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `homework_${assignment.admin_class_name}_${assignment.class_date}.html`;
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
                <p className="text-blue-600">View and download homework assignment for this specific class</p>
              </div>
              
              {filteredHomeworkData && selectedChild && classId && (
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {filteredHomeworkData.reduce((sum, assignment) => sum + assignment.submitted_hw_count, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Submitted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {filteredHomeworkData.reduce((sum, assignment) => sum + parseInt(assignment.pending_hw_count), 0)}
                    </div>
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
                    onClick={() => selectedChild?.id && loadHomework({ 
                      child_id: selectedChild.id
                    })}
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
          ) : !classId ? (
            <Card className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Class Selected</h3>
              <p className="text-gray-500">Please select a class to view its homework assignment.</p>
            </Card>
          ) : isLoading ? (
            renderSkeleton()
          ) : filteredHomeworkData?.length ? (
            <div className="space-y-6">
              {filteredHomeworkData.map(renderHomeworkCard)}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Homework Found</h3>
              <p className="text-gray-500">There are no homework assignments available for this specific class.</p>
            </Card>
          )}
        </main>
      </div>

      {/* Homework View Modal */}
      <Dialog open={isHomeworkModalOpen} onOpenChange={(open) => {
        setIsHomeworkModalOpen(open);
        if (!open) {
          setIframeLoading(false);
        }
      }}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold text-blue-800">
              {selectedHomework?.admin_class_name} - Homework Assignment
            </DialogTitle>
          </DialogHeader>
          
          {selectedHomework && (
            <div className="flex flex-col h-full">
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 px-6 pb-4">
                <Button
                  variant="outline"
                  onClick={() => handleDownloadHomework(selectedHomework)}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Homework
                </Button>
              </div>
              
              {/* Iframe Container */}
              <div className="flex-1 px-6 pb-6">
                <div className="w-full h-[70vh] border border-gray-200 rounded-lg overflow-hidden relative">
                  {iframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">Loading homework...</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    srcDoc={getHomeworkHtmlContent(selectedHomework)}
                    className="w-full h-full"
                    title={`Homework - ${selectedHomework.admin_class_name}`}
                    sandbox="allow-same-origin"
                    onLoad={() => setIframeLoading(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassHomeworkPage;
