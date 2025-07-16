import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Calendar, Clock, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecording } from '@/hooks/useRecording';
import Recording from '@/components/Recording/Recording';

const ClassRecordingsPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { data, isLoading, error, getRecording, clearError } = useRecording();

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

  useEffect(() => {
    if (classId) {
      getRecording(classId);
    }
    // eslint-disable-next-line
  }, [classId]);

  const handleDownload = async () => {
    if (!data?.download_url) return;
    setIsDownloading(true);
    try {
      // Open download in new tab (secure, avoids direct link in DOM)
      window.open(data.download_url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRetry = () => {
    if (classId) {
      getRecording(classId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => {}} />

        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="outline"
              onClick={() => navigate("/past-classes")}
              className="mb-3 sm:mb-4 border-2 border-yellow-300 text-blue-700 hover:bg-yellow-50 shadow-sm text-sm sm:text-base"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Past Classes
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-1 sm:mb-2">
              Class Recording
            </h1>
            <p className="text-blue-600 text-sm sm:text-base">Watch and download the class recording</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-yellow-200">
              <Recording
                data={data}
                isLoading={isLoading}
                error={error}
                onDownload={handleDownload}
                onRetry={handleRetry}
                isDownloading={isDownloading}
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassRecordingsPage;
