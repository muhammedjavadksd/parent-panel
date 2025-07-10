
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle, Clock, Calendar, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ClassHomeworkPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
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

  const homework = {
    title: "Ancient Indian Stories - Homework Assignment",
    description: "Write a short story inspired by the ancient Indian tales we discussed in class",
    assignedDate: "Jun 20, 2024",
    dueDate: "Jun 25, 2024",
    status: "Submitted",
    submittedDate: "Jun 24, 2024",
    grade: "A+",
    feedback: "Excellent work! Your story captures the essence of ancient Indian storytelling beautifully.",
    submission: {
      title: "My Story: The Wise Elephant",
      content: "Once upon a time, in a beautiful forest...",
      wordCount: 450,
      submittedFile: "my_story.pdf"
    }
  };

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
              Class Homework
            </h1>
            <p className="text-blue-600">View homework assignment and submission</p>
          </div>

          <div className="space-y-6">
            {/* Assignment Details */}
            <Card className="p-6 rounded-2xl bg-white shadow-lg border-2 border-yellow-200">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{homework.title}</h3>
                  <p className="text-gray-700 mb-4">{homework.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Assigned: {homework.assignedDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-600">Due: {homework.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700 font-semibold">{homework.status}</span>
                </div>
              </div>
            </Card>

            {/* Submission Details */}
            <Card className="p-6 rounded-2xl bg-white shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Your Submission</h3>
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{homework.submission.title}</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{homework.submission.wordCount} words</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-semibold">
                      Grade: {homework.grade}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{homework.submission.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600">{homework.submission.submittedFile}</span>
                  </div>
                  <span className="text-sm text-gray-600">Submitted: {homework.submittedDate}</span>
                </div>
              </div>
              
              {/* Teacher Feedback */}
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-blue-800 mb-2">Teacher Feedback</h4>
                <p className="text-gray-700">{homework.feedback}</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassHomeworkPage;
