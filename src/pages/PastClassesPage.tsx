import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, FileText, BookOpen, MessageSquare, Calendar, Clock, Users, Loader2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBookings } from "@/hooks/useBookings";
import { useChildren } from "@/hooks/useChildren";
import { isAfter, subDays, parseISO } from "date-fns";

const PastClassesPage = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { bookings, isLoading, error, loadPastClasses } = useBookings();
  const { selectedChild } = useChildren();




  // Listen for sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = () => {
      // Check sidebar width to determine if collapsed
      const sidebar = document.querySelector('[class*="w-20"], [class*="w-64"]');
      if (sidebar) {
        setSidebarCollapsed(sidebar.classList.contains('w-20'));
      }
    };

    // Listen for transition end to update layout
    const sidebar = document.querySelector('[class*="transition-all"]');
    if (sidebar) {
      sidebar.addEventListener('transitionend', handleSidebarToggle);
      return () => sidebar.removeEventListener('transitionend', handleSidebarToggle);
    }
  }, []);

  useEffect(() => {
    // Pass the selected child's ID if a specific child is selected, otherwise pass undefined for family view
    const childId = selectedChild?.id;
    loadPastClasses(undefined, childId);
    // eslint-disable-next-line
  }, [selectedChild]); // Re-run when selectedChild changes

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to format time
  const formatTime = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  // Helper function to get subject from class name
  const getSubjectFromClassName = (className: string | null | undefined) => {
    if (!className) return 'General';
    if (className.toLowerCase().includes('english')) return 'English';
    if (className.toLowerCase().includes('math')) return 'Mathematics';
    if (className.toLowerCase().includes('science')) return 'Science';
    if (className.toLowerCase().includes('history')) return 'History';
    if (className.toLowerCase().includes('art')) return 'Art';
    if (className.toLowerCase().includes('music')) return 'Music';
    if (className.toLowerCase().includes('yoga') || className.toLowerCase().includes('gita')) return 'Philosophy';
    return 'General';
  };

  const isNoDataError = (msg: string | null) => {
    if (!msg) return false;
    return (
      msg.toLowerCase().includes('no bookings found') ||
      msg.toLowerCase().includes('no classes found') ||
      msg.toLowerCase().includes('no data found')
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className={`transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Header onStartTour={()=> {}}/>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-blue-600">Loading past classes...</span>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error && isNoDataError(error)) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className={`transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Header onStartTour={()=> {}}/>
          <main className="flex-1 p-6">
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <BookOpen className="w-16 h-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No past classes</h3>
              <p>You don't have any completed classes yet.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className={`transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Header onStartTour={()=> {}}/>
          <main className="flex-1 p-6">
            <div className="text-center text-red-600">
              <p>Error loading past classes: {error}</p>
              <Button
                onClick={() => {
                  const childId = selectedChild?.id;
                  loadPastClasses(undefined, childId);
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Retry
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className={`transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header onStartTour={()=> {}}/>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Past Classes
            </h1>
            <p className="text-blue-600">Review your completed classes and access materials</p>
          </div>

          <div className="space-y-4">
            {bookings.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">No past classes</h3>
                  <p>You don't have any completed classes yet.</p>
                </div>
              </Card>
            ) : (
              bookings.map((classItem) => {

                //Handling past 15 days
                const classDate = new Date(classItem.class_date);
                const fifteenDaysAgo = subDays(new Date(), 15);
                const isOlderThan15Days = isAfter(fifteenDaysAgo, classDate);

                const isOldClass = new Date(classItem.class_date) < new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

                return (<Card key={classItem.id} className="p-6 rounded-2xl bg-white shadow-lg border-2 border-yellow-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-800">{classItem.admin_class_name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600">{formatDate(classItem.class_date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600">{formatTime(classItem.start_time, classItem.end_time)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600">{classItem.child_name}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">Status: {classItem.attended_class === "Yes" ? "Attended" : "Missed"}</span>
                          <span className="ml-4 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                            {getSubjectFromClassName(classItem.admin_class_name)}
                          </span>
                          {classItem.points && parseFloat(classItem.points) > 0 && (
                            <span className="ml-4 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                              {classItem.points} points
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[{
                      title: "Recording",
                      icon: <Play className="w-4 h-4" />,
                      onClick: () => navigate(`/class/${classItem.schedulebooking_id}/recording`),
                      className: `bg-blue-600 hover:bg-blue-700 text-white`,
                      disabled: isOlderThan15Days,
                      titleText: isOlderThan15Days ? "Recordings available for the last 15 days only" : "View Recording"
                    }, {
                      title: "PPTs",
                      icon: <FileText className="w-4 h-4" />,
                      onClick: () => navigate(`/class/${classItem.schedulebooking_id}/presentations`),
                      className: "border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50",
                      variant: "outline"
                    }, {
                      title: "Homework",
                      icon: <BookOpen className="w-4 h-4" />,
                      onClick: () => navigate(`/class/${classItem.schedulebooking_id}/homework`),
                      className: "border-2 border-green-300 text-green-700 hover:bg-green-50",
                      variant: "outline"
                    }, {
                      title: "Review",
                      icon: <Star className="w-4 h-4" />,
                      onClick: () => window.open(classItem.feedback_url, '_blank'),
                      className: "border-2 border-yellow-500 text-yellow-900 hover:bg-yellow-50",
                      variant: "outline"
                    }, {
                      title: "AI Feedback",
                      icon: <MessageSquare className="w-4 h-4" />,
                      onClick: () => window.open(classItem.feedback_url, '_blank'),
                      className: "border-2 border-purple-300 text-purple-700 hover:bg-purple-50",
                      variant: "outline"
                    }].map(({ title, icon, onClick, className, variant = "default", disabled = false, titleText = "" }) => (
                      <div key={title} className="w-full" title={titleText}>
                        <Button
                          onClick={onClick}
                          disabled={disabled}
                          variant={variant as any}
                          className={`w-full flex items-center justify-center space-x-2 ${className} ${disabled ? "cursor-not-allowed" : ""}`}
                        >
                          {icon}
                          <span>{title}</span>
                        </Button>
                      </div>
                    ))}
                  </div>

                </Card>)
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PastClassesPage;
