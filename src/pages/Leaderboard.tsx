import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Trophy, Medal, Award, TrendingUp, TrendingDown, Users, Clock, Star, Crown, Zap } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Leaderboard from '@/components/Leaderboard/Leaderboard';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useChildren } from '@/contexts/ChildrenContext';

const LeaderboardPage = () => {
  const { loading, error, top3, allData, fetchTop3 } = useLeaderboard();
  const { selectedChild } = useChildren();


  // Get remaining users (ranks 4+) from API data
  const otherUsers = React.useMemo(() => {
    return allData.slice(3).map((user, index) => ({
      id: user.child_id,
      name: user.child_name,
      avatar: '👦', // Default avatar since API doesn't provide this
      points: user.total_points,
      rank: user.position,
      trend: 'up', // Default trend since API doesn't provide this
      country: user.country,
      age: user.child_age,
      streak: 0, // Default since API doesn't provide this
      badges: [], // Default since API doesn't provide this
      recentActivity: 'Active Learner', // Default since API doesn't provide this
      level: 'Intermediate', // Default since API doesn't provide this
    }));
  }, [allData])

  const pointsBreakdown = [
    { category: 'Classes Attended', points: 1200, icon: '📚' },
    { category: 'Homework Completed', points: 800, icon: '📝' },
    { category: 'Quiz Performance', points: 600, icon: '🧠' },
    { category: 'Daily Challenges', points: 240, icon: '🎯' },
    { category: 'Bonus Activities', points: 160, icon: '⭐' },
  ];

  const achievements = [
    { name: 'Perfect Attendance', description: 'Attend 30 classes in a row', progress: 85, icon: '🎓' },
    { name: 'Quiz Master', description: 'Score 100% on 10 quizzes', progress: 70, icon: '🧠' },
    { name: 'Helper', description: 'Help 5 classmates', progress: 40, icon: '🤝' },
    { name: 'Early Bird', description: 'Join 20 classes early', progress: 90, icon: '🌅' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-600" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-500" />;
    if (rank === 3) return <Award className="w-6 h-6 text-yellow-700" />;
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-blue-600">#{rank}</span>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4" />;
  };

  useEffect(() => {
    if (selectedChild) {
      fetchTop3(selectedChild.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChild]);

  return (
    <div className="min-h-screen bg-white flex w-full">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 space-y-8 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">🏆 Leaderboard</h1>
              <p className="text-blue-700 text-lg">Celebrate achievements and friendly competition among our young learners!</p>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-3 space-y-8">
              {/* Top 3 Podium - Champions of the Week */}
              <Leaderboard top3={top3} loading={loading} error={error} />

              {/* Rankings 4-10+ */}
              <Card className="p-6 bg-white border-2 border-blue-100 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-blue-900">Rankings</h3>
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">248 active learners</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {otherUsers.map((user) => (
                    <div key={user.id} className="flex items-center p-5 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors hover:shadow-md">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(user.rank)}
                          {getTrendIcon(user.trend)}
                        </div>
                        <div className="text-3xl">{user.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="font-semibold text-blue-900 text-lg">{user.name}</h4>
                            <span className="text-xl">{user.country}</span>
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-blue-800 border-yellow-200">Age {user.age}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-blue-700 mb-1">
                            <span className="font-medium">{user.level}</span>
                            <div className="flex items-center space-x-1">
                              <Zap className="w-4 h-4" />
                              <span className="text-sm">{user.streak} day streak</span>
                            </div>
                          </div>
                          <p className="text-sm text-blue-600">{user.recentActivity}</p>
                        </div>
                        <div className="flex space-x-2">
                          {user.badges.map((badge, i) => (
                            <span key={i} className="text-xl">{badge}</span>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-900">{user.points}</div>
                          <div className="text-sm text-blue-700">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Points Breakdown */}
              <Card className="p-5 bg-white border-2 border-yellow-200 shadow-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-5 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-600" />
                  Your Points
                </h3>
                <div className="space-y-3">
                  {pointsBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium text-blue-900">{item.category}</span>
                      </div>
                      <span className="font-bold text-blue-900">{item.points}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-yellow-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-900">Total Points</span>
                    <span className="text-2xl font-bold text-blue-900">3,000</span>
                  </div>
                </div>
              </Card>

              {/* Achievement Progress */}
              <Card className="p-5 bg-white border-2 border-blue-200 shadow-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-5 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-blue-600" />
                  Next Achievements
                </h3>
                <div className="space-y-5">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{achievement.icon}</span>
                          <span className="text-sm font-medium text-blue-900">{achievement.name}</span>
                        </div>
                        <span className="text-sm text-blue-700 font-medium">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-blue-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-5 bg-white border-2 border-blue-200 shadow-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-5">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-700 font-medium">Your Rank</span>
                    <span className="font-bold text-blue-900 text-lg">#12</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-blue-700 font-medium">Points to Next</span>
                    <span className="font-bold text-blue-900 text-lg">150</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-700 font-medium">Learning Streak</span>
                    <span className="font-bold text-blue-900 text-lg">🔥 15 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-blue-700 font-medium">Classes This Week</span>
                    <span className="font-bold text-blue-900 text-lg">5/7</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeaderboardPage;
