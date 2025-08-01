import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Calendar, Award, Clock, BookOpen, Target, Brain, Trophy, Star, Zap, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useState } from 'react';
import AnalyticsFilters from "@/components/analytics/AnalyticsFilters";
import GaugeChart from "@/components/analytics/GaugeChart";
import BubbleChart from "@/components/analytics/BubbleChart";
import AreaChart from "@/components/analytics/AreaChart";
import LearningVelocity from "@/components/analytics/LearningVelocity";
import PersonalizedInsights from "@/components/analytics/PersonalizedInsights";
import LearningProgress from "@/components/dashboard/LearningProgress";
import { useDashboard } from '@/hooks/useDashboard';
import { useBookings } from '@/hooks/useBookings';
import { useChildren } from "@/contexts/ChildrenContext";
import { useCallback } from "react";
import WebsiteTour from '@/components/WebsiteTour';




const StudentAnalytics = () => {
  const [timeRange, setTimeRange] = useState('1m');
  // 👇 ADD THIS STATE VARIABLE
  const [period, setPeriod] = useState('month');

  const handlePeriodChange = useCallback((newPeriod: string) => {
    setPeriod(newPeriod);
  }, []);

  const { progressOverview, isLoading: isProgressLoading, loadProgressOverview } = useDashboard();

  const { bookings, isLoading, error: bookingsError, loadAllBookings, loadUpcomingClasses, loadPastClasses, clearBookingData } = useBookings();

  const { selectedChild } = useChildren();
  useEffect(() => {
    const childId = selectedChild?.id || null;
    // Create params object based on the current period
    const params = period === 'overall' ? { period: 'overall' } : {};
    console.log('Loading progress overview for:', childId ? `child ${childId}` : 'family level');
    // loadProgressOverview(childId);

    loadProgressOverview(childId, params);
  }, [selectedChild, loadProgressOverview, period]);

  const analyticsData = {
    weeklyProgress: [
      { day: "Mon", hours: 2.5, completed: 3 },
      { day: "Tue", hours: 1.8, completed: 2 },
      { day: "Wed", hours: 3.2, completed: 4 },
      { day: "Thu", hours: 2.1, completed: 3 },
      { day: "Fri", hours: 2.8, completed: 3 },
      { day: "Sat", hours: 4.1, completed: 5 },
      { day: "Sun", hours: 3.5, completed: 4 }
    ],
    subjects: [
      { name: "Mathematics", progress: 85, grade: "A", trend: "+5%", timeSpent: 45, lastWeekScore: 80 },
      { name: "English", progress: 92, grade: "A+", trend: "+8%", timeSpent: 38, lastWeekScore: 84 },
      { name: "Science", progress: 78, grade: "B+", trend: "+3%", timeSpent: 42, lastWeekScore: 75 },
      { name: "Hindi", progress: 88, grade: "A", trend: "+6%", timeSpent: 35, lastWeekScore: 82 }
    ],
    monthlyStats: {
      totalHours: 68,
      classesAttended: 24,
      homeworkCompleted: 22,
      averageScore: 87
    },
    performanceTrend: [
      { month: 'Jan', score: 75, hours: 45 },
      { month: 'Feb', score: 78, hours: 52 },
      { month: 'Mar', score: 82, hours: 58 },
      { month: 'Apr', score: 85, hours: 61 },
      { month: 'May', score: 87, hours: 68 }
    ],
    learningGoals: [
      { goal: "Complete 30 Math exercises", progress: 85, target: 30, current: 25 },
      { goal: "Read 5 English books", progress: 60, target: 5, current: 3 },
      { goal: "Science project submission", progress: 40, target: 1, current: 0 },
      { goal: "Improve Hindi vocabulary", progress: 75, target: 100, current: 75 }
    ],
    subjectBreakdown: [
      { subject: 'Math', value: 35, color: '#3777FF' },
      { subject: 'English', value: 25, color: '#FEE155' },
      { subject: 'Science', value: 25, color: '#FFB5C2' },
      { subject: 'Hindi', value: 15, color: '#FFBE86' }
    ],
    skillsRadar: [
      { skill: 'Problem Solving', score: 85 },
      { skill: 'Communication', score: 92 },
      { skill: 'Creativity', score: 78 },
      { skill: 'Critical Thinking', score: 88 },
      { skill: 'Collaboration', score: 82 },
      { skill: 'Time Management', score: 75 }
    ],
    achievements: [
      { title: "Math Wizard", description: "Solved 100 math problems", date: "2 days ago", icon: "🧮" },
      { title: "Reading Champion", description: "Read for 10 days straight", date: "1 week ago", icon: "📚" },
      { title: "Science Explorer", description: "Completed all experiments", date: "2 weeks ago", icon: "🔬" },
      { title: "Perfect Attendance", description: "Attended all classes this month", date: "3 weeks ago", icon: "🎯" }
    ],
    weakAreas: [
      { area: "Geometry", score: 65, improvement: "+8%" },
      { area: "Essay Writing", score: 72, improvement: "+5%" },
      { area: "Hindi Grammar", score: 68, improvement: "+12%" }
    ],
    studyRecommendations: [
      { subject: "Mathematics", recommendation: "Focus on geometry concepts", priority: "High" },
      { subject: "English", recommendation: "Practice creative writing", priority: "Medium" },
      { subject: "Science", recommendation: "Review physics formulas", priority: "Low" }
    ]
  };

  const handleExport = () => {
    console.log('Exporting analytics data...');
    // TODO: Implement export functionality
  };

  const handleShare = () => {
    console.log('Sharing analytics...');
    // TODO: Implement share functionality
  };

  // New data for enhanced analytics
  const bubbleData = [
    { subject: 'Mathematics', difficulty: 8, timeSpent: 45, score: 94 },
    { subject: 'English', difficulty: 6, timeSpent: 35, score: 88 },
    { subject: 'Science', difficulty: 7, timeSpent: 40, score: 91 },
    { subject: 'Hindi', difficulty: 5, timeSpent: 30, score: 85 }
  ];

  const areaChartData = [
    { date: 'Week 1', math: 8, science: 6, english: 5, hindi: 4 },
    { date: 'Week 2', math: 10, science: 8, english: 6, hindi: 5 },
    { date: 'Week 3', math: 12, science: 9, english: 7, hindi: 6 },
    { date: 'Week 4', math: 15, science: 11, english: 9, hindi: 7 }
  ];

  const velocityData = [
    { week: 'Week 1', tasksCompleted: 12, averageTime: 25, efficiency: 75 },
    { week: 'Week 2', tasksCompleted: 15, averageTime: 22, efficiency: 82 },
    { week: 'Week 3', tasksCompleted: 18, averageTime: 20, efficiency: 88 },
    { week: 'Week 4', tasksCompleted: 22, averageTime: 18, efficiency: 93 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-white">
      <Sidebar />

      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">

        <Header onStartTour={() => window.dispatchEvent(new Event('startTour'))} />

        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">Enhanced Analytics Dashboard</h1>
            <p className="text-gray-700 text-sm sm:text-base">Comprehensive AI-powered analysis of your learning journey with advanced insights</p>
          </div>

          {/* Analytics Filters */}
          <div className="mb-6 sm:mb-8">
            <AnalyticsFilters
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              onExport={handleExport}
              onShare={handleShare}
            />
          </div>

          {/* 👇 UPDATE THIS COMPONENT */}
          <LearningProgress
            progressOverview={progressOverview}
            learningProgress={progressOverview?.learning_progress ?? null}
            isLoading={isProgressLoading && !progressOverview}
            period={period}             // Pass the current state
            onPeriodChange={setPeriod}  // Pass the function to update the state
          />

          {/* //replaced with learning progress for uniformity  */}

          {/* Overview Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-semibold mb-2">Total Hours</p>
                  <p className="text-3xl font-bold text-blue-800">{analyticsData.monthlyStats.totalHours}</p>
                  <p className="text-xs text-blue-600 mt-1">+12% from last month</p>
                </div>
                <Clock className="text-blue-500" size={32} />
              </div>
            </Card>

            <Card className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-semibold mb-2">Classes Attended</p>
                  <p className="text-3xl font-bold text-green-800">{analyticsData.monthlyStats.classesAttended}</p>
                  <p className="text-xs text-green-600 mt-1">96% attendance rate</p>
                </div>
                <Calendar className="text-green-500" size={32} />
              </div>
            </Card>

            <Card className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 font-semibold mb-2">Homework Done</p>
                  <p className="text-3xl font-bold text-purple-800">{analyticsData.monthlyStats.homeworkCompleted}</p>
                  <p className="text-xs text-purple-600 mt-1">92% completion rate</p>
                </div>
                <BookOpen className="text-purple-500" size={32} />
              </div>
            </Card>

            <Card className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  
                  <p className="text-yellow-600 font-semibold mb-2">Streak</p>
                  <p className="text-3xl font-bold text-yellow-800">{0} Days</p>
                  <p className="text-xs text-yellow-600 mt-1">0 Day longer than previous</p>
                </div>
                <Target className="text-yellow-500" size={32} />
              </div>
            </Card>
          </div> */}

          {/* Gauge Charts Row */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <GaugeChart value={68} max={100} label="Monthly Goal" color="#3b82f6" unit="h" />
            <GaugeChart value={24} max={30} label="Classes Done" color="#10b981" />
            <GaugeChart value={87} max={100} label="Average Score" color="#f59e0b" unit="%" />
            <GaugeChart value={12} max={15} label="Current Streak" color="#ef4444" />
          </div> */}

          {/* Advanced Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 mt-6 sm:mt-8">
            <AreaChart data={areaChartData} title="Weekly Subject Time Distribution" />
            <BubbleChart data={bubbleData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <LearningVelocity data={velocityData} />

            {/* Performance Trend */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <TrendingUp className="text-blue-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Performance Trend</h3>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={analyticsData.performanceTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="score" stroke="#3777FF" strokeWidth={3} dot={{ fill: '#3777FF', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Personalized AI Insights */}
          <div className="mb-6 sm:mb-8">
            <PersonalizedInsights />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Skills Radar */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Brain className="text-purple-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Skills Assessment</h3>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={analyticsData.skillsRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis tick={{ fontSize: 8 }} />
                  <Radar name="Skills" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Learning Goals */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Target className="text-green-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Learning Goals</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {analyticsData.learningGoals.map((goal, index) => (
                  <div key={index} className="p-2 sm:p-3 bg-white rounded-lg shadow border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm">{goal.goal}</h4>
                      <span className="text-xs text-gray-500">{goal.current}/{goal.target}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">{goal.progress}% Complete</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Trophy className="text-orange-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Recent Achievements</h3>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {analyticsData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg shadow">
                    <div className="text-lg sm:text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Weekly Activity */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <BarChart3 className="text-blue-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Weekly Activity</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {analyticsData.weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <span className="font-semibold text-blue-800 w-8 sm:w-12 text-xs sm:text-sm">{day.day}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                          <span className="text-blue-700">{day.hours}h studied</span>
                          <span className="text-blue-700">{day.completed} completed</span>
                        </div>
                        <Progress value={(day.hours / 5) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Subject Performance */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <BookOpen className="text-green-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Subject Performance</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {analyticsData.subjects.map((subject, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-white rounded-xl shadow border">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{subject.name}</h4>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                          {subject.grade}
                        </span>
                        <span className="text-green-600 text-xs sm:text-sm font-medium">{subject.trend}</span>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>{subject.progress}% Complete</span>
                      <span>{subject.timeSpent}h this month</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Areas for Improvement */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-red-50 border-red-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Zap className="text-red-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Areas for Improvement</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {analyticsData.weakAreas.map((area, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-white rounded-lg shadow border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">{area.area}</h4>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <span className="text-sm font-bold text-gray-700">{area.score}%</span>
                        <span className="text-green-600 text-xs">{area.improvement}</span>
                      </div>
                    </div>
                    <Progress value={area.score} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Study Recommendations */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-indigo-50 border-indigo-200 shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Star className="text-indigo-500 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Study Recommendations</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {analyticsData.studyRecommendations.map((rec, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-white rounded-lg shadow border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">{rec.subject}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">{rec.recommendation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Website Tour */}
      <WebsiteTour />
    </div>
  );
};

export default StudentAnalytics;
