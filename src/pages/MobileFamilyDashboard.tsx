
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, TrendingUp, BookOpen, Trophy, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MobileFamilyDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('all');

  const familyData = {
    children: [
      { id: "priya", name: "Priya", grade: "Grade 3", avatar: "👧", progress: 85, streak: 5, coins: 1250, classes: 12 },
      { id: "arjun", name: "Arjun", grade: "Grade 5", avatar: "👦", progress: 92, streak: 7, coins: 1850, classes: 15 },
      { id: "sara", name: "Sara", grade: "Grade 2", avatar: "👧", progress: 78, streak: 3, coins: 950, classes: 8 }
    ],
    familyStats: {
      totalHours: 127,
      totalClasses: 35,
      totalCoins: 4050,
      averageScore: 85,
      familyRank: 2
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-blue-200/50 px-4 py-4 flex items-center space-x-3 sticky top-0 z-10 shadow-sm">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5 text-blue-600" />
        </Button>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-bold text-blue-800">Family Dashboard</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Family Overview */}
        <Card className="p-4 bg-white border border-blue-200 shadow-lg rounded-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">👨‍👩‍👧‍👦</span>
            <div>
              <h2 className="text-lg font-bold text-blue-800">Family Learning Journey</h2>
              <p className="text-sm text-blue-600">Ranked #{familyData.familyStats.familyRank} in community</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-xl font-bold text-blue-800">{familyData.familyStats.totalHours}h</p>
              <p className="text-xs text-blue-600">Total Learning</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <p className="text-xl font-bold text-yellow-800">{familyData.familyStats.totalClasses}</p>
              <p className="text-xs text-yellow-600">Classes Done</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-xl font-bold text-blue-800">{familyData.familyStats.totalCoins}</p>
              <p className="text-xs text-blue-600">Family Coins</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <p className="text-xl font-bold text-yellow-800">{familyData.familyStats.averageScore}%</p>
              <p className="text-xs text-yellow-600">Avg Score</p>
            </div>
          </div>
        </Card>

        {/* Children Cards */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-blue-800 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Family Members
          </h3>
          
          {familyData.children.map((child) => (
            <Card key={child.id} className="p-4 bg-white border border-blue-200 shadow-lg rounded-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                  {child.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-800">{child.name}</h4>
                  <p className="text-sm text-blue-600">{child.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-800">{child.coins} 🪙</p>
                  <p className="text-xs text-blue-600">{child.streak} day streak</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-bold text-blue-800">{child.classes}</p>
                  <p className="text-xs text-blue-600">Classes</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-bold text-yellow-800">{child.progress}%</p>
                  <p className="text-xs text-yellow-600">Progress</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-bold text-blue-800">{child.streak}</p>
                  <p className="text-xs text-blue-600">Streak</p>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-blue-600">Monthly Goal</span>
                  <span className="text-xs font-bold text-blue-800">{child.classes}/20</span>
                </div>
                <Progress value={(child.classes / 20) * 100} className="h-2" />
              </div>

              <Button 
                size="sm" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                onClick={() => navigate(`/analytics?child=${child.name.toLowerCase()}`)}
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-4 bg-white border border-blue-200 shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="flex flex-col items-center space-y-2 h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              onClick={() => navigate("/classes")}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Schedule Classes</span>
            </Button>
            
            <Button 
              className="flex flex-col items-center space-y-2 h-20 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl"
              onClick={() => navigate("/mobile-analytics")}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">View Analytics</span>
            </Button>
            
            <Button 
              className="flex flex-col items-center space-y-2 h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              onClick={() => navigate("/leaderboard")}
            >
              <Trophy className="w-5 h-5" />
              <span className="text-xs">Leaderboard</span>
            </Button>
            
            <Button 
              className="flex flex-col items-center space-y-2 h-20 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl"
              onClick={() => navigate("/events")}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Family Events</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MobileFamilyDashboard;
