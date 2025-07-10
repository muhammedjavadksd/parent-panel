
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart3, Clock, BookOpen, Trophy, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FamilyDashboard = () => {
  const navigate = useNavigate();

  const familyData = {
    children: [
      { id: "priya", name: "Priya", grade: "Grade 3", avatar: "👧", progress: 85, streak: 5, coins: 1250 },
      { id: "arjun", name: "Arjun", grade: "Grade 5", avatar: "👦", progress: 92, streak: 7, coins: 1850 },
      { id: "kavya", name: "Kavya", grade: "Grade 2", avatar: "👧", progress: 78, streak: 3, coins: 950 }
    ],
    totalLearningHours: 127,
    totalClassesCompleted: 45,
    familyRank: 2,
    weeklyGoal: 30,
    weeklyProgress: 24
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Sidebar />
      
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Family Overview Header */}
          <Card className="rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white shadow-xl border-0">
            <div className="p-8 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl filter drop-shadow-sm">👨‍👩‍👧‍👦</span>
                    <h2 className="text-3xl font-bold text-white drop-shadow-sm">Family Learning Journey</h2>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{familyData.totalLearningHours}h</p>
                      <p className="text-white/90">Total Learning</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{familyData.totalClassesCompleted}</p>
                      <p className="text-white/90">Classes Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">#{familyData.familyRank}</p>
                      <p className="text-white/90">Family Rank</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-8xl opacity-30 filter drop-shadow-sm">
                  📚
                </div>
              </div>
            </div>
          </Card>

          {/* Children Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyData.children.map((child) => (
              <Card key={child.id} className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                <div className="text-center mb-4">
                  <Avatar className="h-16 w-16 mx-auto mb-3 border-3 border-blue-300 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-2xl">
                      {child.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                  <p className="text-gray-600">{child.grade}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-bold text-gray-800">{child.progress}%</span>
                    </div>
                    <Progress value={child.progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <p className="text-lg font-bold text-orange-800">{child.streak}</p>
                      <p className="text-xs text-orange-600">Day Streak</p>
                    </div>
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <p className="text-lg font-bold text-yellow-800">{child.coins}</p>
                      <p className="text-xs text-yellow-600">Coins</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Family Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Family Goal */}
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border-orange-200 shadow-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-green-500 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Weekly Family Goal</h3>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Classes This Week</span>
                  <span className="font-bold text-gray-800">{familyData.weeklyProgress}/{familyData.weeklyGoal}</span>
                </div>
                <Progress value={(familyData.weeklyProgress / familyData.weeklyGoal) * 100} className="h-4" />
              </div>
              
              <p className="text-sm text-gray-600">
                Great teamwork! Your family is {familyData.weeklyProgress}/{familyData.weeklyGoal} classes towards the weekly goal.
              </p>
            </Card>

            {/* Family Achievements */}
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-100 border-orange-200 shadow-lg">
              <div className="flex items-center mb-4">
                <Trophy className="text-yellow-500 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Family Achievements</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-semibold text-gray-800">Learning Champions</p>
                    <p className="text-sm text-gray-600">All kids completed weekly goals</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-semibold text-gray-800">Perfect Attendance</p>
                    <p className="text-sm text-gray-600">Zero missed classes this month</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="font-semibold text-gray-800">Top Family</p>
                    <p className="text-sm text-gray-600">Ranked #2 in community</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions for Family */}
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50 border-orange-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Family Quick Actions</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={() => navigate("/classes")}
                className="flex flex-col items-center space-y-2 h-20 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Schedule Classes</span>
              </Button>
              
              <Button 
                onClick={() => navigate("/analytics")}
                className="flex flex-col items-center space-y-2 h-20 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl"
              >
                <BarChart3 className="w-6 h-6" />
                <span className="text-sm">View Analytics</span>
              </Button>
              
              <Button 
                onClick={() => navigate("/leaderboard")}
                className="flex flex-col items-center space-y-2 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl"
              >
                <Trophy className="w-6 h-6" />
                <span className="text-sm">Leaderboard</span>
              </Button>
              
              <Button 
                onClick={() => navigate("/events")}
                className="flex flex-col items-center space-y-2 h-20 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white rounded-xl"
              >
                <Users className="w-6 h-6" />
                <span className="text-sm">Family Events</span>
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default FamilyDashboard;
