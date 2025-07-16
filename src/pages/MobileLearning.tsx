import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassCard from "@/components/mobile/ClassCard";
import CompletedClassCard from "@/components/mobile/CompletedClassCard";
import BookingSection from "@/components/mobile/BookingSection";
import HomeworkRoomCard from "@/components/mobile/HomeworkRoomCard";
import { useEffect } from "react";
import { useBookings } from "@/hooks/useBookings";
import { Loader2 } from "lucide-react";

const demoCoursesData = [
  {
    name: "Unbox English",
    description: "Fun English learning with stories and games",
    emoji: "📚",
    type: 'demo' as const
  },
  {
    name: "Alpha Math",
    description: "Mathematics made easy with visual learning",
    emoji: "🔢",
    type: 'demo' as const
  }
];

const masterClassData = [
  {
    name: "Little Yogi - Gita for Kids",
    description: "Spiritual wisdom through simple stories",
    emoji: "🧘‍♀️",
    type: 'master' as const
  }
];

const MobileLearning = () => {
  const { bookings, isLoading, error, loadUpcomingClasses, loadPastClasses } = useBookings();

  useEffect(() => {
    loadUpcomingClasses();
    loadPastClasses();
    // eslint-disable-next-line
  }, []); // Only run once on mount

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
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  // Helper function to format time
  const formatTime = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
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

  // Transform upcoming classes for ClassCard component
  const upcomingClassesData = bookings
    .filter(booking => new Date(booking.class_date) >= new Date())
    .slice(0, 3)
    .map(booking => ({
      title: booking.admin_class_name,
      teacher: booking.child_name, // Using child name as teacher for now
      time: formatTime(booking.start_time, booking.end_time),
      date: formatDate(booking.class_date),
      participants: 1, // Default value
      emoji: getEmojiFromClassName(booking.admin_class_name)
    }));

  // Transform past classes for CompletedClassCard component
  const completedClassesData = bookings
    .filter(booking => new Date(booking.class_date) < new Date())
    .slice(0, 2)
    .map(booking => ({
      title: booking.admin_class_name,
      teacher: booking.child_name, // Using child name as teacher for now
      completedDate: formatDate(booking.class_date),
      grade: booking.points ? (parseFloat(booking.points) >= 6 ? "A" : "B+") : "B+",
      emoji: getEmojiFromClassName(booking.admin_class_name)
    }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-yellow-50/30 pb-20">
        <MobileHeader />
        <main className="pt-16 px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-blue-600">Loading classes...</span>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-yellow-50/30 pb-20">
        <MobileHeader />
        <main className="pt-16 px-4">
          <div className="text-center text-red-600">
            <p>Error loading classes: {error}</p>
            <button
              onClick={() => {
                loadUpcomingClasses();
                loadPastClasses();
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-yellow-50/30 pb-20">
      <MobileHeader />

      <main className="pt-16 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">My Classes</h1>
          <p className="text-slate-700 text-sm">Manage your learning schedule and track progress</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border border-blue-100 shadow-lg rounded-2xl">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-sm rounded-xl font-semibold text-slate-700 transition-all duration-300">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-sm rounded-xl font-semibold text-slate-700 transition-all duration-300">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingClassesData.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No upcoming classes</p>
              </div>
            ) : (
              upcomingClassesData.map((classItem, index) => (
                <ClassCard key={index} classItem={classItem} />
              ))
            )}

            <BookingSection 
              title="Book Demo Classes" 
              courses={demoCoursesData} 
              onBookingComplete={(childId, bookingType) => {
                console.log('Mobile Learning: Booking completed for child:', childId, 'type:', bookingType);
                // Handle booking completion - could redirect to external URL or show success message
              }}
            />
            <BookingSection 
              title="Master Classes" 
              courses={masterClassData} 
              onBookingComplete={(childId, bookingType) => {
                console.log('Mobile Learning: Booking completed for child:', childId, 'type:', bookingType);
                // Handle booking completion - could redirect to external URL or show success message
              }}
            />
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedClassesData.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No completed classes</p>
              </div>
            ) : (
              completedClassesData.map((classItem, index) => (
                <CompletedClassCard key={index} classItem={classItem} />
              ))
            )}
          </TabsContent>
        </Tabs>

        <HomeworkRoomCard />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default MobileLearning;
