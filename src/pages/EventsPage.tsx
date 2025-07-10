
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";

const upcomingEvents = [
  { title: "Science Fair", date: "Jun 25", time: "10:00 AM", canRegister: true },
  { title: "Art Competition", date: "Jun 28", time: "2:00 PM", canRegister: true },
  { title: "Math Learnathon", date: "Jul 2", time: "4:00 PM", canRegister: true },
  { title: "Reading Workshop", date: "Jul 5", time: "3:00 PM", canRegister: true },
];

const pastEvents = [
  { title: "Math Olympiad", date: "Jun 15", time: "3:00 PM" },
  { title: "Story Telling", date: "Jun 12", time: "4:00 PM" },
  { title: "Science Readathon", date: "Jun 10", time: "2:00 PM" },
];

const EventsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 pb-20">
      <MobileHeader />
      
      <main className="pt-16 px-4">
        <Button variant="outline" onClick={handleBack} className="mb-3 text-xs">
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back
        </Button>
        <h2 className="text-sm font-bold text-gray-800 mb-3">Events</h2>
        
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Upcoming Events</h3>
          <div className="space-y-2">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="p-3 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-800">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}, {event.time}</p>
                  </div>
                  {event.canRegister && (
                    <Button size="sm" className="text-xs bg-purple-500 hover:bg-purple-600 text-white">
                      Register
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Past Events</h3>
          <div className="space-y-2">
            {pastEvents.map((event, index) => (
              <Card key={index} className="p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-800">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}, {event.time}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default EventsPage;
