
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import MobileQuickAccess from "@/components/MobileQuickAccess";
import PersonalizedGreeting from "@/components/PersonalizedGreeting";
import WeeklyAnalytics from "@/components/WeeklyAnalytics";
import DailyChallenges from "@/components/DailyChallenges";
import MoodTracker from "@/components/MoodTracker";
import StatsRow from "@/components/StatsRow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChildren } from "@/hooks/useChildren";
import { useState } from "react";
import { Clock, Calendar } from "lucide-react";
import CoinDisplay from "@/components/CoinDisplay";
import { useAuth } from "@/hooks/useAuth";

const MobileDashboard = () => {
  const isMobile = useIsMobile();
  const { selectedChild } = useChildren();
  const { user } = useAuth();
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  if (!isMobile) {
    return null; // This component is only for mobile
  }

  const currentChildName = selectedChild?.name || user?.parent_name || "Family";

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    const day = new Date().toLocaleDateString('en-US', {
      weekday: 'long'
    });
    if (hour < 12) {
      return {
        message: `Good morning, ${currentChildName}! ☀️`,
        subtitle: `Ready to start this beautiful ${day}?`,
        emoji: "☀️"
      };
    } else if (hour < 17) {
      return {
        message: `Good afternoon, ${currentChildName}! 🌤️`,
        subtitle: `Hope you're having a wonderful ${day}!`,
        emoji: "🌤️"
      };
    } else {
      return {
        message: `Good evening, ${currentChildName}! 🌙`,
        subtitle: `Time to wind down and reflect on today!`,
        emoji: "🌙"
      };
    }
  };

  const greeting = getCurrentGreeting();

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😴", label: "Sleepy", value: "sleepy" },
    { emoji: "🤔", label: "Curious", value: "curious" },
    { emoji: "😎", label: "Confident", value: "confident" },
    { emoji: "😅", label: "Nervous", value: "nervous" }
  ];

  return <div className="min-h-screen bg-white pb-20 safe-area-inset-bottom">
    <MobileHeader />

    <main className="pt-16 px-3 sm:px-4 max-w-full overflow-x-hidden">
      {/* Unified Welcome, Mood & Class Section */}
      <Card className="p-4 sm:p-6 rounded-3xl mb-4 bg-white border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Background decorative elements */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-2xl sm:text-4xl opacity-20">🧘‍♀️</div>
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-xl sm:text-2xl opacity-15">✨</div>

        <div className="relative z-10">
          {/* Greeting Section */}
          <div className="text-center mb-6">
            <div className="text-3xl sm:text-4xl mb-3">{greeting.emoji}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2">{greeting.message}</h2>
            <p className="text-sm sm:text-base text-blue-700 mb-4">{greeting.subtitle}</p>
          </div>

          {/* Mood Tracker Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-blue-800 mb-3 text-center">
              How are you feeling today?
            </h3>

            <div className="flex justify-center space-x-2 sm:space-x-3 overflow-x-auto pb-2">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-3 sm:p-4 rounded-2xl transition-all min-h-[48px] min-w-[48px] flex items-center justify-center flex-shrink-0 shadow-lg border-2 ${selectedMood === mood.value
                    ? 'bg-yellow-500 border-yellow-600 scale-110 text-white shadow-xl'
                    : 'bg-white border-blue-200 hover:bg-blue-50 hover:scale-105 active:scale-95'
                    }`}
                >
                  <div className="text-xl sm:text-2xl">{mood.emoji}</div>
                </button>
              ))}
            </div>

            {selectedMood && (
              <p className="text-xs sm:text-sm text-center text-blue-700 mt-4 px-3 py-2 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
                Great! We'll tailor today's activities for your {moods.find(m => m.value === selectedMood)?.label.toLowerCase()} mood! ✨
              </p>
            )}
          </div>

          {/* Featured Class Section */}
          <div className="bg-blue-600 rounded-2xl p-4 sm:p-6 text-white text-center shadow-2xl border-2 border-blue-700">
            <div className="mb-4">
              <div className="text-3xl sm:text-4xl mb-3">🧘‍♀️</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Little Yogi – Gita for Kids</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm sm:text-base mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">Starts in 2h 30m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">Today, 7:00 PM</span>
                </div>
              </div>
            </div>

            <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-800 px-8 py-3 rounded-2xl font-bold text-lg min-h-[48px] w-full sm:w-auto shadow-xl border-2 border-yellow-400 transition-all duration-300">
              🚀 Join Your Class Now!
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Row - Progress, Streak, Coins, Rank */}
      <div className="mb-4">
        <StatsRow />
      </div>

      {/* Quick Access - Moved above Coin Display */}
      <div className="mb-4">
        <MobileQuickAccess />
      </div>

      {/* Coin Display - Enhanced with premium styling */}
      <div className="mb-4">
        <CoinDisplay />
      </div>

      {/* Weekly Analytics - Enhanced with premium styling */}
      <Card className="p-3 sm:p-4 rounded-3xl mb-4 bg-white border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500">
        <button onClick={() => setShowAnalytics(!showAnalytics)} className="w-full flex items-center justify-between min-h-[44px] p-3 rounded-2xl hover:bg-blue-50 transition-all duration-300">
          <h3 className="text-sm font-bold text-blue-800 flex items-center">
            📊 This Week's Summary
          </h3>
          <span className="text-blue-600 text-xs font-medium px-3 py-1 bg-yellow-100 rounded-xl border border-blue-200 shadow-md">
            {showAnalytics ? '▼ Hide' : '▶ View Details'}
          </span>
        </button>

        {showAnalytics && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <WeeklyAnalytics childName={currentChildName} />
          </div>
        )}
      </Card>

      {/* Daily Challenges - Optimized and Compact */}
      <div className="mb-4">
        <DailyChallenges />
      </div>
    </main>

    <BottomNavigation />
  </div>;
};

export default MobileDashboard;
