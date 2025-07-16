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
import LeaderboardGuideCard from '@/components/Leaderboard/LeaderboardGuideCard';

const LeaderboardPage = () => {
  const { loading, error, top3, allData, fetchTop3, childData, childScor } = useLeaderboard();
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
    if (rank === 1) return <Crown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-600" />;
    if (rank === 2) return <Medal className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-500" />;
    if (rank === 3) return <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-700" />;
    return <span className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs sm:text-sm font-bold text-blue-600">#{rank}</span>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />;
    return <div className="w-3 h-3 sm:w-4 sm:h-4" />;
  };

  // useEffect(() => {
  //   if (selectedChild) {
  //     fetchTop3(selectedChild.id);
  //     childData && console.log('Child Data:', childData);
  //     childScor && console.log('Child Score:', childScor);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedChild]);

  useEffect(() => {
    if (childData.length > 0) {
      console.log('✅ Child Data:', childData);
      console.log('Child Score:', childScor);
    }
  }, [childData]);

  useEffect(() => {
    if (selectedChild) {
      fetchTop3(selectedChild.id);
    }
  }, [selectedChild]);


  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => { }} />
        <main className="flex-1 p-2 sm:p-3 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 bg-gray-50 pb-20 sm:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-1 sm:mb-2">🏆 Leaderboard</h1>
              <p className="text-blue-700 text-sm sm:text-base lg:text-lg">Celebrate achievements and friendly competition among our young learners!</p>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Top 3 Podium - Champions of the Week */}
              <Leaderboard top3={top3} loading={loading} error={error} />

              {/* Rankings 4-10+ */}
              <Card className="p-3 sm:p-4 lg:p-6 bg-white border-2 border-blue-100 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900">Rankings</h3>
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">248 active learners</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {otherUsers.map((user) => (
                    <div key={user.id} className="flex items-center p-3 sm:p-4 lg:p-5 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors hover:shadow-md">
                      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-1 min-w-0">
                        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
                          {getRankIcon(user.rank)}
                          {getTrendIcon(user.trend)}
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">{user.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-1 space-y-1 sm:space-y-0">
                            <h4 className="font-semibold text-blue-900 text-sm sm:text-base lg:text-lg truncate">{user.name}</h4>
                            <span className="text-lg sm:text-xl flex-shrink-0">{user.country}</span>
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-blue-800 border-yellow-200 w-fit">Age {user.age}</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-blue-700 mb-1 space-y-1 sm:space-y-0">
                            <span className="font-medium text-xs sm:text-sm">{user.level}</span>
                            <div className="flex items-center space-x-1">
                              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="text-xs sm:text-sm">{user.streak} day streak</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-blue-600 truncate">{user.recentActivity}</p>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                          {user.badges.map((badge, i) => (
                            <span key={i} className="text-lg sm:text-xl">{badge}</span>
                          ))}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">{user.points}</div>
                          <div className="text-xs sm:text-sm text-blue-700">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Points Breakdown */}
              {/* <Card className="p-3 sm:p-4 lg:p-5 bg-white border-2 border-yellow-200 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-5 flex items-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-600" />
                  Your Points
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {pointsBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-lg sm:text-xl">{item.icon}</span>
                        <span className="text-xs sm:text-sm font-medium text-blue-900">{item.category}</span>
                      </div>
                      <span className="font-bold text-blue-900 text-sm sm:text-base">{item.points}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-yellow-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-900 text-sm sm:text-base">Total Points</span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-900">3,000</span>
                  </div>
                </div>
              </Card> */}

              {/* Achievement Progress */}
              {/* <Card className="p-3 sm:p-4 lg:p-5 bg-white border-2 border-blue-200 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-5 flex items-center">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                  Next Achievements
                </h3>
                <div className="space-y-3 sm:space-y-5">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-lg sm:text-xl">{achievement.icon}</span>
                          <span className="text-xs sm:text-sm font-medium text-blue-900">{achievement.name}</span>
                        </div>
                        <span className="text-xs sm:text-sm text-blue-700 font-medium">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2 sm:h-3">
                        <div
                          className="bg-blue-600 h-2 sm:h-3 rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-blue-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </Card> */}

              {/* Quick Stats */}
              <Card className="p-3 sm:p-4 lg:p-5 bg-white border-2 border-blue-200 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-5">Quick Stats</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <span className="text-xs sm:text-sm text-blue-700 font-medium">
                      {selectedChild?.name ? `${selectedChild.name}'s Rank` : `${childScor?.children[0]?.name}'s Rank`}
                    </span>

                    <span className="font-bold text-blue-900 text-base sm:text-lg">{childScor?.children[0]?.position}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
                    <span className="text-xs sm:text-sm text-blue-700 font-medium">Total Points</span>
                    <span className="font-bold text-blue-900 text-base sm:text-lg">{childData[0]?.total_points}</span>
                  </div>
                </div>
              </Card>


              {/* Leaderboard Guide Card */}
              <LeaderboardGuideCard/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeaderboardPage;
