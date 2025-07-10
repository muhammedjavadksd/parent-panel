import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText, BookOpen, Star, MessageSquare, ClipboardCheck, Brain, Loader2 } from "lucide-react";

interface PastClassesProps {
  bookings: any[];
  isLoading: boolean;
  error: string | null;
}

const PastClasses = ({ bookings, isLoading, error }: PastClassesProps) => {
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
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

  // Helper function to get grade based on points
  const getGradeFromPoints = (points: string) => {
    const numPoints = parseFloat(points);
    if (numPoints >= 8) return "A+";
    if (numPoints >= 7) return "A";
    if (numPoints >= 6) return "B+";
    if (numPoints >= 5) return "B";
    if (numPoints >= 4) return "C+";
    if (numPoints >= 3) return "C";
    return "D";
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
            <p className="text-sm">No past classes</p>
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

  // If error indicated 'no data', don't show any class cards, even if bookings is non-empty
  if (error && isNoDataError(error)) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No past classes</p>
          </div>
        </div>
      </div>
    );
  }

  // Only show class cards if there is no error and bookings are present
  const pastClasses = (!error && bookings && bookings.length > 0) ? bookings.slice(0, 2) : [];

// const pastClasses = (!error && bookings?.length)
//   ? bookings
//       .filter(b => {
//         const dateTimeStr = `${b.class_date}T${b.start_time}:00`;
//         const bookingDate = new Date(dateTimeStr);
//         const now = new Date();
//         return bookingDate < now;
//       })
//       .sort((a, b) => {
//         const aDate = new Date(`${a.class_date}T${a.start_time}:00`);
//         const bDate = new Date(`${b.class_date}T${b.start_time}:00`);
//         return bDate.getTime() - aDate.getTime(); // most recent past class first
//       })
//       .slice(0, 2)
//   : [];


  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {pastClasses.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No past classes</p>
          </div>
        ) : (
          pastClasses.map((classItem, index) => {
            const emoji = getEmojiFromClassName(classItem.admin_class_name);
            const grade = getGradeFromPoints(classItem.points);
            const hasRecording = true; // Assuming all past classes have recordings
            const hasPPT = true; // Assuming all past classes have PPTs
            const hasHomework = true; // Assuming all past classes have homework
            const hasEvaluation = true; // Assuming all past classes have evaluations
            const feedbackGiven = false; // This would need to come from API
            const aiEvaluationDone = true; // This would need to come from API

            return (
              <div key={classItem.id} className="p-4 hover:bg-yellow-50 rounded-xl transition-all duration-200 border border-yellow-200 bg-white shadow-sm">
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

                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200 shadow-sm flex-shrink-0">
                    <Star className="text-yellow-600 w-3 h-3 mr-1" />
                    <span className="text-xs font-semibold text-yellow-700">{grade}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {hasRecording && (
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1.5 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 font-medium">
                      <Video className="w-3 h-3 mr-1" />
                      Recording
                    </Button>
                  )}
                  {hasPPT && (
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1.5 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 font-medium">
                      <FileText className="w-3 h-3 mr-1" />
                      PPT
                    </Button>
                  )}
                  {hasHomework && (
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1.5 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 font-medium">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Homework
                    </Button>
                  )}
                  {hasEvaluation && (
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1.5 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 font-medium">
                      <ClipboardCheck className="w-3 h-3 mr-1" />
                      Evaluation
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className={`text-xs px-2 py-1.5 h-auto font-semibold shadow-sm ${aiEvaluationDone
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    disabled={aiEvaluationDone}
                  >
                    <Brain className="w-3 h-3 mr-1" />
                    {aiEvaluationDone ? 'Done' : 'AI Evaluation'}
                  </Button>
                  <Button
                    size="sm"
                    className={`text-xs px-2 py-1.5 h-auto font-semibold shadow-sm ${feedbackGiven
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      }`}
                    disabled={feedbackGiven}
                    onClick={() => !feedbackGiven && window.open(classItem.feedback_url, '_blank')}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {feedbackGiven ? 'Done' : 'AI Feedback'}
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default React.memo(PastClasses);
