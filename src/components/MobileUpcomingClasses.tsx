import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useBookings } from "@/hooks/useBookings";
import { useNavigate } from "react-router-dom";


const MobileUpcomingClasses = () => {
  const { bookings, isLoading, error, loadUpcomingClasses } = useBookings();
  const navigate = useNavigate();

  useEffect(() => {
    loadUpcomingClasses();
  }, [loadUpcomingClasses]); // Re-run when loadUpcomingClasses changes

  // Handle join class button click
  const handleJoinClick = useCallback((classItem: any) => {
    navigate(`/join-class/${classItem.schedulebooking_id}`);
  }, [navigate]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Helper function to get emoji based on class name
  const getEmojiFromClassName = (className: string) => {
    if (className.toLowerCase().includes('english')) return "📚";
    if (className.toLowerCase().includes('math')) return "🔢";
    if (className.toLowerCase().includes('science')) return "🔬";
    if (className.toLowerCase().includes('yoga') || className.toLowerCase().includes('gita')) return "🧘‍♀️";
    if (className.toLowerCase().includes('art')) return "🎨";
    if (className.toLowerCase().includes('music')) return "🎵";
    return "📖";
  };

  // Helper function to check if class is starting soon
  const isStartingSoon = (classDate: string, startTime: string) => {
    const now = new Date();
    const classDateTime = new Date(`${classDate}T${startTime}`);
    const diffMs = classDateTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    return diffMins <= 30 && diffMins > 0;
  };

  if (isLoading) {
    return (
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg">📅</span>
          <h3 className="text-lg font-bold text-blue-800">Upcoming Classes</h3>
        </div>
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-blue-600 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg">📅</span>
          <h3 className="text-lg font-bold text-blue-800">Upcoming Classes</h3>
        </div>
        <div className="text-center text-red-600 text-sm">
          <p>Error loading classes</p>
          <Button
            onClick={() => loadUpcomingClasses()}
            size="sm"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const upcomingClasses = bookings.slice(0, 2);

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg">📅</span>
          <h3 className="text-lg font-bold text-blue-800">Upcoming Classes</h3>
        </div>

        <div className="space-y-4">
          {upcomingClasses.length === 0 ? (
            <Card className="p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-100/50 shadow-2xl">
              <div className="text-center text-gray-500">
                <p className="text-sm">No upcoming classes</p>
              </div>
            </Card>
          ) : (
            upcomingClasses.map((classItem, index) => {
              const emoji = getEmojiFromClassName(classItem.admin_class_name);
              const status = isStartingSoon(classItem.class_date, classItem.start_time) ? "starting-soon" : "upcoming";

              return (
                <Card key={classItem.id} className="p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-16 h-16 bg-blue-50/80 rounded-2xl flex items-center justify-center text-2xl shadow-xl border border-yellow-200/50 backdrop-blur-sm">
                        {emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base text-blue-800 mb-1">{classItem.admin_class_name}</h4>
                        <p className="text-sm text-blue-700 mb-1">{classItem.child_name}</p>
                        <p className="text-sm text-blue-600">{formatDate(classItem.class_date)}, {classItem.start_time}</p>
                      </div>
                    </div>

                    {status === "starting-soon" ? (
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 h-12 shadow-xl rounded-2xl font-semibold transition-all duration-300 border border-blue-500/30 backdrop-blur-sm"
                        onClick={() => handleJoinClick(classItem)}
                      >
                        Join
                      </Button>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 h-10 shadow-xl rounded-2xl font-semibold transition-all duration-300 border border-blue-500/30 backdrop-blur-sm"
                          onClick={() => handleJoinClick(classItem)}
                        >
                          Join
                        </Button>
                        <Button variant="outline" className="text-sm px-4 py-2 h-10 bg-white/80 border border-yellow-200/60 text-yellow-700 hover:bg-yellow-50/80 rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-sm">
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>


    </>
  );
};

export default MobileUpcomingClasses;
