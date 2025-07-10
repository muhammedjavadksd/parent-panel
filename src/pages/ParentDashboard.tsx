
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Clock, Award, TrendingUp, Target, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParentDashboard } from "@/hooks/useParentDashboard";
import FamilyOverview from "@/components/dashboard/FamilyOverview";
import ProgressHistory from "@/components/dashboard/ProgressHistory";
import SubjectComparison from "@/components/dashboard/SubjectComparison";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import AchievementGallery from "@/components/dashboard/AchievementGallery";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { getAllChildren, getFamilyStats } = useParentDashboard();
  
  const children = getAllChildren();
  const familyStats = getFamilyStats();

  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader />
      
      <main className="pt-16 px-3 sm:px-4 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 min-h-[44px]">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/profile')}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-blue-50 border border-blue-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 text-blue-600" />
            <span className="hidden sm:inline text-blue-700">Back</span>
          </Button>
          <h1 className="text-base sm:text-lg font-bold text-blue-800 truncate px-2">Family Dashboard</h1>
          <div className="w-[44px]"></div>
        </div>

        {/* Quick Family Stats */}
        <Card className="p-4 sm:p-6 rounded-2xl mb-6 bg-white border-2 border-blue-200 shadow-xl">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="p-3 min-h-[80px] flex flex-col items-center justify-center bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-lg sm:text-xl font-bold text-blue-800">{familyStats.activeChildren}</p>
              <p className="text-xs text-blue-600">Children</p>
            </div>
            <div className="p-3 min-h-[80px] flex flex-col items-center justify-center bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-lg sm:text-xl font-bold text-yellow-800">{Math.round(familyStats.totalMinutes / 60)}h</p>
              <p className="text-xs text-yellow-600">Total Time</p>
            </div>
            <div className="p-3 min-h-[80px] flex flex-col items-center justify-center bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-lg sm:text-xl font-bold text-yellow-800">{familyStats.totalCoins}</p>
              <p className="text-xs text-yellow-600">Family Coins</p>
            </div>
          </div>
        </Card>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="overflow-x-auto -mx-3 sm:mx-0 mb-6">
            <TabsList className="grid w-max min-w-full grid-cols-4 mx-3 sm:mx-0 h-12 bg-white border-2 border-blue-200 shadow-lg">
              <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4 min-h-[44px] data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-700 border-r border-blue-200 last:border-r-0">
                Overview
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs sm:text-sm px-2 sm:px-4 min-h-[44px] data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-700 border-r border-blue-200 last:border-r-0">
                Progress
              </TabsTrigger>
              <TabsTrigger value="compare" className="text-xs sm:text-sm px-2 sm:px-4 min-h-[44px] data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-700 border-r border-blue-200 last:border-r-0">
                Compare
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-xs sm:text-sm px-2 sm:px-4 min-h-[44px] data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-700 border-r border-blue-200 last:border-r-0">
                Timeline
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-w-0">
            <TabsContent value="overview" className="mt-0">
              <FamilyOverview children={children} familyStats={familyStats} />
            </TabsContent>

            <TabsContent value="progress" className="mt-0">
              <ProgressHistory children={children} />
            </TabsContent>

            <TabsContent value="compare" className="mt-0">
              <SubjectComparison />
            </TabsContent>

            <TabsContent value="activity" className="mt-0">
              <ActivityTimeline />
            </TabsContent>
          </div>
        </Tabs>

        {/* Achievement Gallery */}
        <div className="mt-6">
          <AchievementGallery children={children} />
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ParentDashboard;
