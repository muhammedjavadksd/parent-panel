import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText, BookOpen, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useBookings } from "@/hooks/useBookings";

const MobilePastClasses = () => {
  const { toast } = useToast();
  const { bookings, isLoading, error, loadPastClasses } = useBookings();

  useEffect(() => {
    loadPastClasses();
  }, [loadPastClasses]); // Re-run when loadPastClasses changes

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

  const handleAction = (action: string, classTitle: string) => {
    switch (action) {
      case "recording":
        toast({
          title: "Opening Recording",
          description: `Loading ${classTitle} recording...`
        });
        break;
      case "ppt":
        toast({
          title: "Opening PPT",
          description: `Loading ${classTitle} presentation...`
        });
        break;
      case "homework":
        toast({
          title: "Opening Homework",
          description: `Loading ${classTitle} homework...`
        });
        break;
      case "feedback":
        toast({
          title: "Feedback",
          description: `Opening feedback form for ${classTitle}...`
        });
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg">📚</span>
          <h3 className="text-lg font-bold text-blue-800">Past Classes</h3>
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
          <span className="text-lg">📚</span>
          <h3 className="text-lg font-bold text-blue-800">Past Classes</h3>
        </div>
        <div className="text-center text-red-600 text-sm">
          <p>Error loading classes</p>
          <Button
            onClick={() => loadPastClasses()}
            size="sm"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const pastClasses = bookings.slice(0, 2);

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg">📚</span>
        <h3 className="text-lg font-bold text-blue-800">Past Classes</h3>
      </div>

      <div className="space-y-4">
        {pastClasses.length === 0 ? (
          <Card className="p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-100/50 shadow-2xl">
            <div className="text-center text-gray-500">
              <p className="text-sm">No past classes</p>
            </div>
          </Card>
        ) : (
          pastClasses.map((classItem, index) => {
            const emoji = getEmojiFromClassName(classItem.admin_class_name);

            return (
              <Card key={classItem.id} className="p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
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
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-xl rounded-2xl transition-all duration-300 h-12 font-semibold backdrop-blur-sm border border-blue-500/50"
                    onClick={() => handleAction("recording", classItem.admin_class_name)}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Recording
                  </Button>

                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-xl rounded-2xl transition-all duration-300 h-12 font-semibold backdrop-blur-sm border border-blue-500/50"
                    onClick={() => handleAction("ppt", classItem.admin_class_name)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    PPT
                  </Button>

                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-xl rounded-2xl transition-all duration-300 h-12 font-semibold backdrop-blur-sm border border-blue-500/50"
                    onClick={() => handleAction("homework", classItem.admin_class_name)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Homework
                  </Button>

                  <Button
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-800 text-sm shadow-xl rounded-2xl transition-all duration-300 h-12 font-semibold backdrop-blur-sm border border-yellow-400/50"
                    onClick={() => window.open(classItem.feedback_url, '_blank')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Feedback
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MobilePastClasses;
