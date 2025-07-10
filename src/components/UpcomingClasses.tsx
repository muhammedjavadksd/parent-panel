import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Loader2, Info } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useJoinClass } from '@/hooks/useJoinClass';
import JoinClass from '@/components/JoinClass/JoinClass';
import { useNavigate } from "react-router-dom";


interface UpcomingClassesProps {
  bookings: any[];
  isLoading: boolean;
  error: string | null;
}

const UpcomingClasses = ({ bookings, isLoading, error }: UpcomingClassesProps) => {
  const [showJoinModalId, setShowJoinModalId] = useState<string | null>(null);
  const { data: joinData, isLoading: isJoining, error: joinError, doJoinClass, clearError: clearJoinError, clearData: clearJoinData } = useJoinClass();
 const navigate = useNavigate();
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

  // Helper function to calculate duration
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    return `${diffMins} mins`;
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

  const isNoDataError = (msg: string | null) => {
    if (!msg) return false;
    return (
      msg.toLowerCase().includes('no bookings found') ||
      msg.toLowerCase().includes('no classes found') ||
      msg.toLowerCase().includes('no data found')
    );
  };

  // Handle join class button click
  const handleJoinClick = (schedulebooking_id: string) => {
    setShowJoinModalId(schedulebooking_id);
    clearJoinError();
    clearJoinData();
  };

  // Handle confirm join
  const handleConfirmJoin = (schedulebooking_id: string) => {
    doJoinClass(schedulebooking_id);
  };

  // Effect: redirect to join_url on success
  useEffect(() => {
    if (joinData && joinData.join_url) {
      window.open(joinData.join_url, '_blank');
      setShowJoinModalId(null);
      clearJoinData();
    }
  }, [joinData, clearJoinData]);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-blue-600 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && isNoDataError(error)) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No upcoming classes</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-600 text-sm">
            <p>Error loading classes</p>
          </div>
        </div>
      </div>
    );
  }

  // Only show class cards if there is no error and bookings are present
  const upcomingClasses = (!error && bookings && bookings.length > 0) ? bookings.slice(0, 2) : [];

  // const upcomingClasses = (!error && bookings?.length)
  // ? bookings
  //     .filter(b => {
  //       // Combine class_date and start_time into full ISO string
  //       const dateTimeStr = `${b.class_date}T${b.start_time}:00`; // e.g., "2025-07-11T10:00:00"
  //       const bookingDate = new Date(dateTimeStr);
  //       const now = new Date();
  //       return bookingDate > now;
  //     })
  //     .sort((a, b) => {
  //       const aDate = new Date(`${a.class_date}T${a.start_time}:00`);
  //       const bDate = new Date(`${b.class_date}T${b.start_time}:00`);
  //       return aDate.getTime() - bDate.getTime();
  //     })
  //     .slice(0, 2)
  // : [];

  // console.log("Upcoming Classes Data:", upcomingClasses);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {upcomingClasses.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No upcoming classes</p>
          </div>
        ) : (
          upcomingClasses.map((classItem, index) => {
            const emoji = getEmojiFromClassName(classItem.admin_class_name);
            const status = isStartingSoon(classItem.class_date, classItem.start_time) ? "starting-soon" : "upcoming";

            return (
              <div key={classItem.id} className="p-4 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-blue-200 bg-white shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <span className="text-lg">{emoji}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-blue-800 text-sm leading-tight mb-1 line-clamp-2">
                        {classItem.admin_class_name}
                      </h4>
                      <p className="text-xs text-blue-600 font-medium mb-1">{classItem.child_name}</p>
                      <p className="text-xs text-blue-600">{formatDate(classItem.class_date)}, {classItem.start_time}</p>
                    </div>
                  </div>

                  {status === "starting-soon" && (
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200 shadow-sm flex-shrink-0">
                      <Clock className="text-yellow-600 w-3 h-3 mr-1" />
                      <span className="text-xs font-semibold text-yellow-700">Starting Soon</span>
                    </div>
                  )}
                </div>

                <div className="mb-3 flex items-center space-x-4 text-xs text-blue-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{calculateDuration(classItem.start_time, classItem.end_time)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{classItem.child_name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {classItem.can_join ? (
                    <JoinClass
                      isLoading={isJoining && showJoinModalId === String(classItem.schedulebooking_id)}
                      error={showJoinModalId === String(classItem.schedulebooking_id) ? joinError : null}
                      onJoin={() => handleJoinClick(String(classItem.schedulebooking_id))}
                      onConfirm={() => handleConfirmJoin(String(classItem.schedulebooking_id))}
                      onCancel={() => setShowJoinModalId(null)}
                      showModal={showJoinModalId === String(classItem.schedulebooking_id)}
                    />
                  ) : (
                    <div className="text-xs text-gray-500 font-medium px-2 py-1 rounded bg-gray-50 border border-gray-200">
                      Join button will be visible at the time of joining only.
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1.5 h-auto border-yellow-200 text-yellow-700 hover:bg-yellow-50 font-medium" onClick={() => navigate("/upcoming-classes")}>
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1.5 h-auto border-red-200 text-red-600 hover:bg-red-50 font-medium" onClick={() => navigate("/upcoming-classes")}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default React.memo(UpcomingClasses);
