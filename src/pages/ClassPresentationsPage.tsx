import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, Eye, Calendar } from "lucide-react";
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

  const presentations = [
    {
      id: 1,
      title: "Ancient Indian Stories - Main Presentation",
      slides: 24,
      date: "Jun 20, 2024",
      size: "3.2 MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Activity Slides",
      slides: 8,
      date: "Jun 20, 2024",
      size: "1.8 MB",
      format: "PDF"
    }
  ];

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
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Class Presentations
            </h1>
            <p className="text-blue-600">View and download presentation materials</p>
          </div>


          <div className="mt-6">
            <Presentation
              data={data}
              isLoading={isLoading}
              error={error}
              onRetry={handleRetry}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassPresentationsPage;
