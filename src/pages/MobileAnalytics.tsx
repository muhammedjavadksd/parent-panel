
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Clock, BookOpen, Award, Calendar, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileAnalytics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const analyticsData = {
    overview: {
      totalHours: 68,
      classesAttended: 24,
      averageScore: 87,
      streak: 12
    },
    weeklyProgress: [
      { day: "Mon", hours: 2.5, score: 85 },
      { day: "Tue", hours: 1.8, score: 78 },
      { day: "Wed", hours: 3.2, score: 92 },
      { day: "Thu", hours: 2.1, score: 88 },
      { day: "Fri", hours: 2.8, score: 85 },
      { day: "Sat", hours: 4.1, score: 94 },
      { day: "Sun", hours: 3.5, score: 90 }
    ],
    subjects: [
      { name: "Math", progress: 85, color: "#2563eb" },
      { name: "English", progress: 92, color: "#eab308" },
      { name: "Science", progress: 78, color: "#0ea5e9" },
      { name: "Hindi", progress: 88, color: "#3b82f6" }
    ],
    skills: [
      { skill: 'Problem Solving', score: 85 },
      { skill: 'Communication', score: 92 },
      { skill: 'Creativity', score: 78 },
      { skill: 'Critical Thinking', score: 88 }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-200 px-4 py-4 flex items-center space-x-3 sticky top-0 z-10 shadow-lg">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
          className="p-2 border-2 border-blue-200 hover:bg-blue-50"
        >
          <ArrowLeft className="w-5 h-5 text-blue-600" />
        </Button>
        <h1 className="text-lg font-bold text-blue-800">Analytics Dashboard</h1>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b-2 border-blue-100 px-4 py-3 sticky top-16 z-10 shadow-sm">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'text-blue-700 border-blue-200 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-white border-2 border-blue-200 shadow-xl rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-semibold text-sm">Total Hours</p>
                    <p className="text-2xl font-bold text-blue-800">{analyticsData.overview.totalHours}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-200">
                    <Clock className="text-blue-600" size={24} />
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-white border-2 border-yellow-200 shadow-xl rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 font-semibold text-sm">Classes</p>
                    <p className="text-2xl font-bold text-yellow-800">{analyticsData.overview.classesAttended}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center border border-yellow-200">
                    <Calendar className="text-yellow-600" size={24} />
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-white border-2 border-blue-200 shadow-xl rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-semibold text-sm">Avg Score</p>
                    <p className="text-2xl font-bold text-blue-800">{analyticsData.overview.averageScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-200">
                    <Award className="text-blue-600" size={24} />
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-white border-2 border-yellow-200 shadow-xl rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 font-semibold text-sm">Streak</p>
                    <p className="text-2xl font-bold text-yellow-800">{analyticsData.overview.streak}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center border border-yellow-200">
                    <TrendingUp className="text-yellow-600" size={24} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Weekly Progress Chart */}
            <Card className="p-6 bg-white border-2 border-blue-200 shadow-xl rounded-2xl">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Weekly Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.weeklyProgress}>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#1e40af' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#1e40af' }} />
                  <Bar dataKey="hours" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {activeTab === 'subjects' && (
          <>
            {/* Subject Progress */}
            <div className="space-y-4">
              {analyticsData.subjects.map((subject, index) => (
                <Card key={index} className="p-4 bg-white border-2 border-blue-200 shadow-xl rounded-2xl">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-blue-800">{subject.name}</h4>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      {subject.progress}%
                    </span>
                  </div>
                  <Progress value={subject.progress} className="h-3" />
                </Card>
              ))}
            </div>

            {/* Subject Distribution */}
            <Card className="p-6 bg-white border-2 border-blue-200 shadow-xl rounded-2xl">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Subject Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analyticsData.subjects}
                    dataKey="progress"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                  >
                    {analyticsData.subjects.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {analyticsData.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    ></div>
                    <span className="text-sm text-blue-700">{subject.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeTab === 'skills' && (
          <Card className="p-6 bg-white border-2 border-blue-200 shadow-xl rounded-2xl">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Skills Assessment</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={analyticsData.skills}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#1e40af' }} />
                <PolarRadiusAxis tick={{ fontSize: 8, fill: '#1e40af' }} />
                <Radar name="Skills" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {analyticsData.skills.map((skill, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-semibold text-blue-800">{skill.skill}</p>
                  <p className="text-lg font-bold text-blue-600">{skill.score}%</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MobileAnalytics;
