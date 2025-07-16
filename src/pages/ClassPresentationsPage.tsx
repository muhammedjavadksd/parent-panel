import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePresentation } from '@/hooks/usePresentation';
import Presentation from '@/components/Presentation/Presentation';

const ClassPresentationsPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const { data, isLoading, error, getPresentation } = usePresentation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      getPresentation(classId);
    }
    // eslint-disable-next-line
  }, [classId]);

  const handleRetry = () => {
    if (classId) {
      getPresentation(classId);
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
              Class Presentations
            </h1>
            <p className="text-blue-600 text-sm sm:text-base">View and download presentation materials</p>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col items-center w-full">
            <Card className="w-full max-w-4xl p-0 sm:p-2 lg:p-4 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-yellow-200 overflow-visible">
              <div className="w-full flex flex-col">
                <Presentation
                  data={data}
                  isLoading={isLoading}
                  error={error}
                  onRetry={handleRetry}
                />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassPresentationsPage;
