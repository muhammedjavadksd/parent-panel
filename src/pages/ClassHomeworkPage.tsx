import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  BookOpen,
  Download,
  AlertCircle,
  RefreshCw,
  Loader2
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHomework } from "@/hooks/useHomework";

const ClassHomeworkPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();

  // Destructure only the necessary state and functions for a single homework item
  const {
    singleData,
    isSingleLoading,
    singleError,
    loadSingleHomework,
  } = useHomework();

  // Load the single homework data when the component mounts or the classId changes
  useEffect(() => {
    if (classId) {
      loadSingleHomework(classId);
    }
  }, [classId, loadSingleHomework]);

  const handleRetry = () => {
    if (classId) {
      loadSingleHomework(classId);
    }
  };

  const renderContent = () => {
    // 1. Show a loading state
    if (isSingleLoading) {
      return (
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-[50vh] w-full rounded-xl" />
        </Card>
      );
    }

    // 2. Show an error state
    if (singleError) {
      return (
        <Card className="p-6 sm:p-8 lg:p-12 text-center bg-red-50 border-red-200">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-red-500 mb-2">
            Failed to Load Homework
          </h3>
          <h5 className="text-s  font-semibold text-slate-300 mb-2">
            You may have not attended this class or the homework is not available.
          </h5>
          {/* <p className="text-red-600 mb-6">{singleError}</p> */}
          <Button onClick={handleRetry} variant="destructive">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </Card>
      );
    }

    // 3. Show the homework data
    if (singleData) {
      return (

        <Card className="flex flex-col h-[150vh] shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-blue-50 rounded-t-2xl">
            <h3 className="text-xl font-bold text-blue-800">Homework Viewer</h3>
            <Button
              onClick={() => window.open(singleData.download_url, '_blank')}
              disabled={!singleData.download_url}
              className="border border-green-300 text-green-700 bg-white hover:bg-green-50"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 p-2 md:p-4 bg-white rounded-b-2xl">
            <div className="w-full h-full rounded-xl shadow-inner border border-gray-200 overflow-hidden">
              <iframe
                src={singleData.embed_url}
                title="Homework Assignment Viewer"
                className="w-full h-full min-h-[70vh] rounded-xl"
                frameBorder="0"
              />
            </div>
          </div>
        </Card>

      );
    }

    // 4. Fallback for when no classId is present in the URL
    if (!classId) {
      return (
        <Card className="p-6 sm:p-8 lg:p-12 text-center">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-1 sm:mb-2">Invalid URL</h3>
          <p className="text-gray-500 text-sm sm:text-base">No class ID was provided to view homework.</p>
        </Card>
      );
    }

    return null; // Should not be reached in normal flow
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => { }} />

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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800">
              Class Homework
            </h1>
          </div>

          {renderContent()}

        </main>
      </div>
    </div>
  );
};

export default ClassHomeworkPage;