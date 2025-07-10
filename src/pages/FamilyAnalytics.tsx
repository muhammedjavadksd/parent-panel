
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, TrendingUp, Calendar, Award, Clock, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FamilyComparison from "@/components/analytics/FamilyComparison";
import { useState } from "react";
import AnalyticsFilters from "@/components/analytics/AnalyticsFilters";

const FamilyAnalytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('1m');

  const familyData = {
    children: [
      {
        name: "Priya",
        grade: "Grade 3",
        avatar: "👧",
        weeklyHours: 12.5,
        monthlyClasses: 24,
        averageScore: 87,
        subjects: ["Math", "English", "Science"],
        streak: 7,
        coins: 1250,
        improvement: 8
      },
      {
        name: "Arjun", 
        grade: "Grade 5",
        avatar: "👦",
        weeklyHours: 15.2,
        monthlyClasses: 28,
        averageScore: 92,
        subjects: ["Math", "Science", "History"],
        streak: 12,
        coins: 1580,
        improvement: 12
      },
      {
        name: "Kavya",
        grade: "Grade 2", 
        avatar: "👧",
        weeklyHours: 8.8,
        monthlyClasses: 18,
        averageScore: 89,
        subjects: ["English", "Art", "Music"],
        streak: 5,
        coins: 980,
        improvement: 5
      }
    ],
    familyStats: {
      totalHours: 36.5,
      totalClasses: 70,
      familyCoins: 3810,
      averageScore: 89,
      longestStreak: 12,
      activeSubjects: 7
    }
  };

  const handleExport = () => {
    console.log('Exporting family analytics...');
  };

  const handleShare = () => {
    console.log('Sharing family analytics...');
  };

  return (
    <div className="min-h-screen app-background">
      <Sidebar />
      
      <div className="ml-64 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="mb-4 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Enhanced Family Analytics
            </h1>
            <p className="text-blue-600">AI-powered insights and comprehensive analysis of your family's learning journey</p>
          </div>

          {/* Analytics Filters */}
          <div className="mb-8">
            <AnalyticsFilters 
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              onExport={handleExport}
              onShare={handleShare}
            />
          </div>

          {/* Family Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <Card className="p-4 rounded-xl bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all premium-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-semibold text-sm">Total Hours</p>
                  <p className="text-2xl font-bold text-blue-800">{familyData.familyStats.totalHours}</p>
                </div>
                <Clock className="text-blue-500" size={24} />
              </div>
            </Card>

            <Card className="p-4 rounded-xl bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all premium-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-semibold text-sm">Classes Done</p>
                  <p className="text-2xl font-bold text-blue-800">{familyData.familyStats.totalClasses}</p>
                </div>
                <Calendar className="text-blue-500" size={24} />
              </div>
            </Card>

            <Card className="p-4 rounded-xl bg-white border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all yellow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 font-semibold text-sm">Family Coins</p>
                  <p className="text-2xl font-bold text-yellow-800">{familyData.familyStats.familyCoins}</p>
                </div>
                <Award className="text-yellow-500" size={24} />
              </div>
            </Card>

            <Card className="p-4 rounded-xl bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all premium-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-semibold text-sm">Avg Score</p>
                  <p className="text-2xl font-bold text-blue-800">{familyData.familyStats.averageScore}%</p>
                </div>
                <TrendingUp className="text-blue-500" size={24} />
              </div>
            </Card>

            <Card className="p-4 rounded-xl bg-white border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all yellow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 font-semibold text-sm">Best Streak</p>
                  <p className="text-2xl font-bold text-yellow-800">{familyData.familyStats.longestStreak}</p>
                </div>
                <Star className="text-yellow-500" size={24} />
              </div>
            </Card>

            <Card className="p-4 rounded-xl bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all premium-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-semibold text-sm">Subjects</p>
                  <p className="text-2xl font-bold text-blue-800">{familyData.familyStats.activeSubjects}</p>
                </div>
                <BookOpen className="text-blue-500" size={24} />
              </div>
            </Card>
          </div>

          {/* Enhanced Family Comparison */}
          <div className="mb-8">
            <FamilyComparison children={familyData.children} />
          </div>

          {/* Individual Child Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {familyData.children.map((child, index) => (
              <Card key={index} className="p-6 rounded-2xl bg-white shadow-xl border-2 border-blue-200 premium-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white shadow-lg">
                    {child.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{child.name}</h3>
                    <p className="text-sm text-blue-600">{child.grade}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-600 text-xs font-medium">Weekly Hours</p>
                      <p className="text-blue-800 font-bold">{child.weeklyHours}h</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-600 text-xs font-medium">Classes</p>
                      <p className="text-blue-800 font-bold">{child.monthlyClasses}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="text-yellow-600 text-xs font-medium">Avg Score</p>
                      <p className="text-yellow-800 font-bold">{child.averageScore}%</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="text-yellow-600 text-xs font-medium">Streak</p>
                      <p className="text-yellow-800 font-bold">{child.streak} days</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-blue-600 text-xs font-medium mb-2">Subjects</p>
                    <div className="flex flex-wrap gap-1">
                      {child.subjects.map((subject, subIndex) => (
                        <span key={subIndex} className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full border border-blue-300">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Progress:</span>
                    <Progress value={child.averageScore} className="flex-1" />
                    <span className="text-sm font-medium text-gray-800">{child.averageScore}%</span>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    onClick={() => navigate(`/analytics?child=${child.name.toLowerCase()}`)}
                  >
                    View Detailed Analytics
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Family Achievements & Milestones */}
          <Card className="p-6 rounded-2xl bg-white border-2 border-yellow-300 shadow-xl yellow-card">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Family Achievements</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg border-2 border-blue-200 premium-card">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-lg font-bold text-blue-600">Learning Champions</p>
                <p className="text-sm text-gray-600">All kids maintained 80%+ scores</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg border-2 border-yellow-200 yellow-card">
                <div className="text-4xl mb-3">🔥</div>
                <p className="text-lg font-bold text-yellow-600">Streak Masters</p>
                <p className="text-sm text-gray-600">Family streak of 30+ days</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg border-2 border-blue-200 premium-card">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-lg font-bold text-blue-600">Super Learners</p>
                <p className="text-sm text-gray-600">70+ classes completed this month</p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default FamilyAnalytics;
