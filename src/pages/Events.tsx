import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Download, MessageSquare } from "lucide-react";

const eventsData = [
  {
    title: "Read-A-Thon",
    stage: "Show & Shine",
    ageGroup: "4–6 years",
    dates: "May 1, 2025 – May 25, 2025",
    participation: "Solo",
    coins: 20,
    buttonLabel: "CREATE & CAPTIVATE",
    bgColor: "from-blue-500 to-blue-600",
    status: "ongoing"
  },
  {
    title: "Math Quest",
    stage: "Finale Week",
    ageGroup: "7–9 years",
    dates: "June 1, 2025 – June 15, 2025",
    participation: "Solo",
    coins: 30,
    buttonLabel: "QUIZ QUEST",
    bgColor: "from-yellow-400 to-yellow-500",
    status: "upcoming"
  },
  {
    title: "Science Explorer",
    stage: "Discovery Phase",
    ageGroup: "10–12 years",
    dates: "July 1, 2025 – July 20, 2025",
    participation: "Team",
    coins: 25,
    buttonLabel: "EXPLORE & WIN",
    bgColor: "from-blue-400 to-blue-500",
    status: "upcoming"
  },
  {
    title: "Art & Craft Challenge",
    stage: "Creative Round",
    ageGroup: "6–10 years",
    dates: "August 5, 2025 – August 25, 2025",
    participation: "Solo",
    coins: 35,
    buttonLabel: "CREATE ART",
    bgColor: "from-yellow-500 to-yellow-600",
    status: "upcoming"
  },
  {
    title: "Story Building",
    stage: "Finale Week",
    ageGroup: "8–12 years",
    dates: "September 1, 2025 – September 20, 2025",
    participation: "Solo",
    coins: 40,
    buttonLabel: "FINALE WEEK",
    bgColor: "from-blue-600 to-blue-700",
    status: "upcoming"
  },
  {
    title: "Dance Competition",
    stage: "Performance Stage",
    ageGroup: "5–15 years",
    dates: "October 10, 2025 – October 30, 2025",
    participation: "Solo",
    coins: 50,
    buttonLabel: "DANCE & SHINE",
    bgColor: "from-yellow-400 to-yellow-600",
    status: "upcoming"
  }
];

const leaderboardData = [
  { rank: 1, name: "Emma Wilson", coins: 285 },
  { rank: 2, name: "Liam Chen", coins: 272 },
  { rank: 3, name: "Priya Sharma", coins: 265 },
  { rank: 4, name: "Noah Garcia", coins: 258 },
  { rank: 5, name: "Sofia Williams", coins: 249 }
];

const Events = () => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={()=> {}} />
        
        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          {/* Welcome Section */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-2 sm:mb-4">Welcome Kids,</h1>
            
            {/* Age Filter Tabs */}
            <Tabs defaultValue="all" className="mb-4 sm:mb-6">
              <TabsList className="bg-blue-50 border border-blue-200 shadow-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="6-9" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm">6-9 years</TabsTrigger>
                <TabsTrigger value="10-15" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm">10-15 years</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Main Content - 3/4 width */}
            <div className="lg:col-span-3">
              {/* Learn-A-Thon Section */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800 mb-3 sm:mb-4">Learn-A-Thon 2025</h2>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md text-xs sm:text-sm">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Invite & Earn
                  </Button>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 text-xs sm:text-sm">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 text-xs sm:text-sm">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Join WhatsApp Group
                  </Button>
                </div>

                {/* Event Status Filters */}
                <Tabs defaultValue="upcoming" className="mb-4 sm:mb-6">
                  <TabsList className="bg-blue-50 border border-blue-200 shadow-lg">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm">Upcoming</TabsTrigger>
                    <TabsTrigger value="past" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm">Past</TabsTrigger>
                    <TabsTrigger value="registered" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm">Registered</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="mt-4 sm:mt-6">
                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {eventsData.map((event, index) => (
                        <Card key={index} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-blue-200">
                          <div className={`bg-gradient-to-br ${event.bgColor} p-3 sm:p-4 lg:p-6 text-white`}>
                            <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 text-center">🎯</div>
                            <h3 className="text-sm sm:text-base lg:text-xl font-bold mb-1 sm:mb-2">{event.title}</h3>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                              <p><strong>Stage:</strong> {event.stage}</p>
                              <p><strong>Age:</strong> {event.ageGroup}</p>
                              <p><strong>Dates:</strong> {event.dates}</p>
                              <p><strong>Type:</strong> {event.participation}</p>
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                <span><strong>Reward:</strong></span>
                                <span className="text-yellow-300 font-bold">{event.coins} 🪙</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 sm:p-3 lg:p-4 bg-white">
                            <Button className="w-full bg-white text-blue-700 border-2 border-blue-200 hover:bg-blue-50 font-bold text-xs sm:text-sm">
                              {event.buttonLabel}
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 text-xs sm:text-sm">1</Button>
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 text-xs sm:text-sm">2</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past" className="mt-4 sm:mt-6">
                    <div className="text-center py-8 sm:py-12">
                      <p className="text-blue-600 text-sm sm:text-base">No past events to display</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="registered" className="mt-4 sm:mt-6">
                    <div className="text-center py-8 sm:py-12">
                      <p className="text-blue-600 text-sm sm:text-base">No registered events</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Scoreboard Sidebar - 1/4 width */}
            <div className="lg:col-span-1">
              <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-yellow-50 border-yellow-200 shadow-lg sticky top-6">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Trophy className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-base sm:text-lg font-bold text-blue-800">Scoreboard</h3>
                </div>
                
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  {leaderboardData.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-400 text-yellow-800' :
                          index === 1 ? 'bg-gray-300 text-gray-700' :
                          index === 2 ? 'bg-orange-300 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {user.rank}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-blue-800 truncate">{user.name}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-yellow-600">{user.coins} 🪙</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-xs sm:text-sm">
                  Detailed View
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Events;
