import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, HelpCircle, LogOut, BookOpen, Target, Award, Bell, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import EditProfileModal from "@/components/EditProfileModal";
import SupportCenter from "@/components/SupportCenter";
import { useChildren } from "@/hooks/useChildren";
import { useCoins } from "@/contexts/CoinContext";

const MobileProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSupportCenter, setShowSupportCenter] = useState(false);
  const { selectedChild } = useChildren();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { getTotalCoins, getRecentTransactions } = useCoins();
  const totalCoins = getTotalCoins(selectedChild?.id.toString() || "family");
  const recentCoinActivity = getRecentTransactions(selectedChild?.id.toString() || "family", 3);

  // Get avatar emoji based on child's age
  const getChildAvatar = (child: any) => {
    if (!child) return "👨‍👩‍👧‍👦";
    if (child.age <= 3) return "👶";
    if (child.age <= 6) return "🧒";
    if (child.age <= 12) return child.name.toLowerCase().includes('boy') ? "👦" : "👧";
    return "👨‍🎓";
  };

  const currentChildName = selectedChild?.name || "Family";
  const currentChildAge = selectedChild?.age || 0;
  const currentChildGrade = selectedChild?.grade || "N/A";

  const subjectData = [
    { name: "Math", percentage: 35, color: "bg-blue-600" },
    { name: "Science", percentage: 25, color: "bg-yellow-500" },
    { name: "Arts", percentage: 20, color: "bg-blue-400" },
    { name: "Yoga", percentage: 20, color: "bg-yellow-400" }
  ];

  const handleViewLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleViewParentDashboard = () => {
    navigate("/parent-dashboard");
  };

  const handleViewAnalytics = () => {
    navigate("/analytics");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (showSupportCenter) {
    return <SupportCenter onBack={() => setShowSupportCenter(false)} />;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader />

      <main className="pt-16 px-3 sm:px-4 max-w-full overflow-x-hidden">
        {/* Profile Card */}
        <Card className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 bg-white border-2 border-blue-200 shadow-xl">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl shadow-lg border-2 border-white">
              {getChildAvatar(selectedChild)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800 truncate">{currentChildName}</h2>
              <p className="text-xs sm:text-sm text-blue-700 font-medium">Age {currentChildAge} • Grade {currentChildGrade}</p>
              <p className="text-xs text-blue-600 truncate">Sunshine Elementary</p>
              <p className="text-xs text-blue-600">India</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="p-2 sm:p-3 bg-white border-2 border-blue-200 hover:bg-blue-50 shadow-lg transition-all duration-300 rounded-lg sm:rounded-xl flex-shrink-0"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-200 shadow-sm">
              <p className="text-lg sm:text-2xl font-bold text-blue-800">28</p>
              <p className="text-xs font-medium text-blue-600">Classes</p>
            </div>
            <div className="p-3 sm:p-4 bg-yellow-50 rounded-xl sm:rounded-2xl border border-yellow-200 shadow-sm">
              <p className="text-lg sm:text-2xl font-bold text-yellow-700">15</p>
              <p className="text-xs font-medium text-yellow-600">Streak</p>
            </div>
            <div className="p-3 sm:p-4 bg-yellow-50 rounded-xl sm:rounded-2xl border border-yellow-200 shadow-sm">
              <p className="text-lg sm:text-2xl font-bold text-yellow-700">{totalCoins}</p>
              <p className="text-xs font-medium text-yellow-600">Coins</p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Button
              onClick={handleViewAnalytics}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 h-10 sm:h-12 border border-blue-500 text-sm sm:text-base px-3 sm:px-4"
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span className="truncate">📊 View Detailed Analytics</span>
            </Button>

            <Button
              onClick={handleViewLeaderboard}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 h-10 sm:h-12 border border-yellow-400 text-sm sm:text-base px-3 sm:px-4"
            >
              <span className="truncate">🏆 View Full Leaderboard</span>
            </Button>

            <Button
              onClick={handleViewParentDashboard}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg rounded-xl sm:rounded-2xl transition-all duration-300 h-10 sm:h-12 border border-blue-400 text-sm sm:text-base px-3 sm:px-4"
            >
              <span className="truncate">👥 View Family Dashboard</span>
            </Button>
          </div>
        </Card>

        {/* Coin Activity Card */}
        <Card className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 bg-white border-2 border-yellow-200 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-600 flex-shrink-0" />
            <span className="truncate">Recent Coin Activity</span>
          </h3>
          {recentCoinActivity.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-blue-600 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-100">
              <p className="text-sm">No recent coin activity</p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {recentCoinActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-yellow-100 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="text-base sm:text-lg bg-yellow-50 rounded-xl w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center border border-yellow-200 shadow-sm flex-shrink-0">
                      {activity.type === 'class' ? '📚' :
                        activity.type === 'homework' ? '📝' : '🎮'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-blue-800 truncate">{activity.description}</p>
                      <p className="text-xs text-blue-600">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-yellow-700 bg-yellow-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-yellow-200 shadow-sm flex-shrink-0">+{activity.points}</span>
                </div>
              ))}
            </div>
          )}
          <Button
            onClick={() => navigate('/coins')}
            variant="outline"
            className="w-full mt-3 sm:mt-4 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm rounded-xl sm:rounded-2xl transition-all duration-300 h-10 sm:h-12 text-sm sm:text-base"
          >
            View Full Coin Directory
          </Button>
        </Card>

        {/* Learning Progress Analytics */}
        <Card className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 bg-white border-2 border-blue-200 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-4 sm:mb-6 flex items-center">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
            <span className="truncate">Learning Progress</span>
          </h3>

          {/* Monthly Classes Progress */}
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-sm font-medium text-blue-700">Classes This Month</span>
              <span className="text-sm font-bold text-blue-800">28/30</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl h-3 sm:h-4 border border-blue-200 shadow-inner">
              <div
                className="bg-blue-600 h-full rounded-xl sm:rounded-2xl shadow-sm transition-all duration-500 border border-blue-400"
                style={{ width: `${(28 / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-sm font-semibold text-blue-800 mb-3 sm:mb-4">Subject Time Distribution</h4>
            <div className="space-y-2 sm:space-y-3">
              {subjectData.map((subject, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3 text-sm p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl border border-blue-100 shadow-sm">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${subject.color} shadow-sm border border-white flex-shrink-0`}></div>
                  <span className="flex-1 text-blue-800 font-medium min-w-0 truncate">{subject.name}</span>
                  <span className="text-blue-700 font-bold flex-shrink-0">{subject.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Streak */}
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-3 sm:mb-4">Weekly Activity</h4>
            <div className="flex justify-between items-end space-x-1 sm:space-x-2 bg-blue-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-100 shadow-inner">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const heights = [40, 60, 80, 70, 50, 65, 30];
                return (
                  <div key={day} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-blue-600 rounded-t-lg mb-1 sm:mb-2 shadow-sm border-t border-blue-300"
                      style={{ height: `${heights[index]}px` }}
                    ></div>
                    <span className="text-xs text-blue-700 font-medium truncate">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Achievements Timeline */}
        <Card className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 bg-white border-2 border-yellow-200 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-600 flex-shrink-0" />
            <span className="truncate">Recent Achievements</span>
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { title: "First Class Complete", date: "Jun 15", emoji: "🎉" },
              { title: "5-Day Streak", date: "Jun 18", emoji: "🔥" },
              { title: "Math Master", date: "Jun 20", emoji: "🏆" }
            ].map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-yellow-50 rounded-xl sm:rounded-2xl border border-yellow-100 shadow-sm">
                <div className="text-xl sm:text-2xl bg-white rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border border-yellow-200 shadow-sm flex-shrink-0">{achievement.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-blue-800 truncate">{achievement.title}</p>
                  <p className="text-xs text-blue-600">{achievement.date}</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm border border-blue-300 flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border-2 border-blue-200 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-3 sm:mb-4">Settings</h3>
          <div className="space-y-2 sm:space-y-3">
            <button className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-blue-100 shadow-sm bg-white">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-800 font-medium truncate">Notifications</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-blue-100 shadow-sm bg-white"
              onClick={() => setShowSupportCenter(true)}
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-800 font-medium truncate">Support</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-red-50 transition-all duration-300 text-red-600 border border-red-100 shadow-sm bg-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm font-medium truncate">Logout</span>
            </button>
          </div>
        </Card>
      </main>

      <BottomNavigation />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default MobileProfile;
