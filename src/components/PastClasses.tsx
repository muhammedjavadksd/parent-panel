import React from 'react';
import { Button } from "@/components/ui/button";
import { Video, FileText, BookOpen, Star, MessageSquare, ClipboardCheck, Brain, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { subDays, isAfter } from "date-fns";

interface PastClassesProps {
  bookings: any[];
  isLoading: boolean;
  error: string | null;
}

const PastClasses = ({ bookings, isLoading, error }: PastClassesProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEmojiFromClassName = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('english')) return "📚";
    if (lower.includes('math')) return "🔢";
    if (lower.includes('science')) return "🔬";
    if (lower.includes('yoga') || lower.includes('gita')) return "🧘‍♀️";
    if (lower.includes('art')) return "🎨";
    if (lower.includes('music')) return "🎵";
    return "📖";
  };

  const getGradeFromPoints = (points: string) => {
    const p = parseFloat(points);
    if (p >= 8) return "A+";
    if (p >= 7) return "A";
    if (p >= 6) return "B+";
    if (p >= 5) return "B";
    if (p >= 4) return "C+";
    if (p >= 3) return "C";
    return "D";
  };

  const isNoDataError = (msg: string | null) => {
    if (!msg) return false;
    return msg.toLowerCase().includes('no bookings') || msg.toLowerCase().includes('no data');
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600 text-sm">Loading...</span>
      </div>
    );
  }

  if (error && isNoDataError(error)) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-gray-500">No past classes</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-red-600">Error loading classes</p>
      </div>
    );
  }

  const pastClasses = bookings?.slice(0, 2) || [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {pastClasses.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No past classes</p>
          </div>
        ) : (
          pastClasses.map((classItem) => {
            const emoji = getEmojiFromClassName(classItem.admin_class_name);
            const grade = getGradeFromPoints(classItem.points);
            const classDate = new Date(classItem.class_date);
            const fifteenDaysAgo = subDays(new Date(), 15);
            const isOlderThan15Days = isAfter(fifteenDaysAgo, classDate);

            return (
              <div key={classItem.id} className="p-4 hover:bg-yellow-50 rounded-xl border border-yellow-200 bg-white shadow-sm transition-all duration-200">
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
                  {/* Recording Button */}
                  <div title={isOlderThan15Days ? "Recordings available for the last 15 days only" : "View Recording"}>
                    <Button
                      onClick={() => navigate(`/class/${classItem.schedulebooking_id}/recording`)}
                      disabled={isOlderThan15Days}
                      className={`w-full text-xs px-2 py-1.5 h-auto font-medium flex items-center justify-center space-x-1 ${isOlderThan15Days ? "cursor-not-allowed bg-gray-100 text-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                      <Video className="w-3 h-3" />
                      <span>Recording</span>
                    </Button>
                  </div>

                  {/* PPT */}
                  <Button
                    onClick={() => navigate(`/class/${classItem.schedulebooking_id}/presentations`)}
                    variant="outline"
                    className="w-full text-xs px-2 py-1.5 h-auto font-medium border-yellow-300 text-yellow-700 hover:bg-yellow-50 flex items-center justify-center space-x-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span>PPT</span>
                  </Button>

                  {/* Homework */}
                  <Button
                    onClick={() => navigate(`/class/${classItem.schedulebooking_id}/homework`)}
                    variant="outline"
                    className="w-full text-xs px-2 py-1.5 h-auto font-medium border-green-300 text-green-700 hover:bg-green-50 flex items-center justify-center space-x-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Homework</span>
                  </Button>

                  {/* Feedback */}
                  <Button
                    onClick={() => window.open(classItem.feedback_url, '_blank')}
                    variant="outline"
                    className="w-full text-xs px-2 py-1.5 h-auto font-medium border-purple-300 text-purple-700 hover:bg-purple-50 flex items-center justify-center space-x-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Feedback</span>
                  </Button>

                  {/* Evaluation */}
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1.5 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 font-medium"
                  >
                    <ClipboardCheck className="w-3 h-3 mr-1" />
                    Evaluation
                  </Button> */}

                  {/* AI Evaluation */}
                  {/* <Button
                    size="sm"
                    className={`text-xs px-2 py-1.5 h-auto font-semibold shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed`}
                    disabled
                  >
                    <Brain className="w-3 h-3 mr-1" />
                    AI Evaluation
                  </Button> */}
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
