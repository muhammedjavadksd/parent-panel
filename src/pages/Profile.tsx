
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, HelpCircle, LogOut, BookOpen, Target, Award, Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "@/components/EditProfileModal";
import SupportCenter from "@/components/SupportCenter";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileProfile from "./MobileProfile";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const isMobile = useIsMobile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSupportCenter, setShowSupportCenter] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (isMobile) {
    return <MobileProfile />;
  }

  // Desktop profile data using authenticated user
  const profileData = {
    name: user ? `${user.firstName} ${user.lastName}` : "User",
    age: 8,
    grade: 3,
    school: "Sunshine Elementary",
    avatar: "👧",
    classes: 28,
    streak: 15,
    level: "Gold",
    country: "India",
    totalCoins: 2650,
    achievements: [
      { title: "First Class Complete", date: "Jun 15", emoji: "🎉" },
      { title: "5-Day Streak", date: "Jun 18", emoji: "🔥" },
      { title: "Math Master", date: "Jun 20", emoji: "🏆" }
    ]
  };

  const subjectData = [
    { name: "Math", percentage: 35, color: "bg-blue-500" },
    { name: "Science", percentage: 25, color: "bg-yellow-500" },
    { name: "Arts", percentage: 20, color: "bg-blue-400" },
    { name: "Yoga", percentage: 20, color: "bg-yellow-400" }
  ];

  const handleViewLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleViewFamilyDashboard = () => {
    navigate("/family-dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (showSupportCenter) {
    return <SupportCenter onBack={() => setShowSupportCenter(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-64 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Profile</h1>
            <p className="text-blue-600">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1 p-6 rounded-2xl bg-white border-2 border-yellow-200 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                  {profileData.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-800">{profileData.name}</h2>
                  <p className="text-blue-600">Age {profileData.age} • Grade {profileData.grade}</p>
                  <p className="text-sm text-gray-600">{profileData.school}</p>
                  <p className="text-sm text-gray-600">{profileData.country}</p>
                  {user?.email && (
                    <p className="text-sm text-gray-600">{user.email}</p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="p-2 border-yellow-300 hover:bg-yellow-50"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">{profileData.classes}</p>
                  <p className="text-sm text-gray-600">Classes</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-2xl font-bold text-yellow-600">{profileData.streak}</p>
                  <p className="text-sm text-gray-600">Streak</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">{profileData.totalCoins}</p>
                  <p className="text-sm text-gray-600">Coins</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleViewLeaderboard}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-0"
                >
                  🏆 View Full Leaderboard
                </Button>

                <Button
                  onClick={handleViewFamilyDashboard}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg border-0"
                >
                  👥 View Family Dashboard
                </Button>
              </div>
            </Card>

            {/* Learning Progress Analytics */}
            <Card className="lg:col-span-2 p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Learning Progress Analytics
              </h3>

              {/* Monthly Classes Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg text-blue-700 font-medium">Classes This Month</span>
                  <span className="text-lg font-semibold text-blue-800">{profileData.classes}/30</span>
                </div>
                <Progress value={(profileData.classes / 30) * 100} className="h-3" />
              </div>

              {/* Subject Distribution */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-blue-800 mb-4">Subject Time Distribution</h4>
                <div className="grid grid-cols-2 gap-4">
                  {subjectData.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${subject.color} shadow-sm`}></div>
                      <span className="flex-1 text-blue-800 font-medium">{subject.name}</span>
                      <span className="text-blue-700 font-semibold">{subject.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div>
                <h4 className="text-lg font-medium text-blue-800 mb-4">Weekly Activity</h4>
                <div className="flex justify-between items-end space-x-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const heights = [60, 80, 100, 90, 70, 85, 50];
                    const isEven = index % 2 === 0;
                    return (
                      <div key={day} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-full ${isEven ? 'bg-blue-500' : 'bg-yellow-500'} rounded-t-lg mb-2 shadow-sm`}
                          style={{ height: `${heights[index]}px` }}
                        ></div>
                        <span className="text-sm text-blue-600 font-medium">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Achievements and Settings Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Achievements Timeline */}
            <Card className="p-6 rounded-2xl bg-white border-2 border-yellow-200 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-yellow-500" />
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm">
                    <div className="text-3xl bg-white rounded-full w-16 h-16 flex items-center justify-center border border-yellow-300 shadow-sm">{achievement.emoji}</div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-blue-800">{achievement.title}</p>
                      <p className="text-sm text-blue-600">{achievement.date}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-6">Settings & Support</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors border border-blue-200 shadow-sm">
                  <Bell className="w-6 h-6 text-blue-600" />
                  <span className="text-lg text-blue-800 font-medium">Notifications</span>
                </button>
                <button
                  className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-yellow-50 transition-colors border border-yellow-200 shadow-sm"
                  onClick={() => setShowSupportCenter(true)}
                >
                  <HelpCircle className="w-6 h-6 text-yellow-600" />
                  <span className="text-lg text-blue-800 font-medium">Support Center</span>
                </button>
                <button
                  className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-red-50 transition-colors text-red-600 border border-red-200 shadow-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg font-medium">Logout</span>
                </button>
              </div>
            </Card>
          </div>
        </main>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
