
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Users, TrendingUp } from "lucide-react";

interface FamilyComparisonProps {
  children: Array<{
    name: string;
    grade: string;
    weeklyHours: number;
    monthlyClasses: number;
    averageScore: number;
    streak: number;
    improvement: number;
  }>;
}

const FamilyComparison = ({ children }: FamilyComparisonProps) => {
  const comparisonData = children.map(child => ({
    name: child.name,
    Hours: child.weeklyHours,
    Classes: child.monthlyClasses,
    Score: child.averageScore,
    Streak: child.streak
  }));

  const progressData = [
    { month: 'Jan', [children[0]?.name || 'Child1']: 75, [children[1]?.name || 'Child2']: 78, [children[2]?.name || 'Child3']: 68 },
    { month: 'Feb', [children[0]?.name || 'Child1']: 78, [children[1]?.name || 'Child2']: 82, [children[2]?.name || 'Child3']: 72 },
    { month: 'Mar', [children[0]?.name || 'Child1']: 82, [children[1]?.name || 'Child2']: 88, [children[2]?.name || 'Child3']: 75 },
    { month: 'Apr', [children[0]?.name || 'Child1']: 85, [children[1]?.name || 'Child2']: 92, [children[2]?.name || 'Child3']: 78 },
    { month: 'May', [children[0]?.name || 'Child1']: 87, [children[1]?.name || 'Child2']: 94, [children[2]?.name || 'Child3']: 82 }
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Family Performance Comparison */}
      <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
        <div className="flex items-center mb-6">
          <Users className="text-blue-500 mr-3" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Family Performance Comparison</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Hours" fill={colors[0]} name="Weekly Hours" />
            <Bar dataKey="Classes" fill={colors[1]} name="Monthly Classes" />
            <Bar dataKey="Score" fill={colors[2]} name="Average Score" />
            <Bar dataKey="Streak" fill={colors[3]} name="Current Streak" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Family Progress Trends */}
      <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
        <div className="flex items-center mb-6">
          <TrendingUp className="text-green-500 mr-3" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Family Progress Trends</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {children.map((child, index) => (
              <Line 
                key={child.name}
                type="monotone" 
                dataKey={child.name} 
                stroke={colors[index % colors.length]} 
                strokeWidth={3}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Individual Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children.map((child, index) => (
          <Card key={child.name} className="p-4 rounded-2xl bg-white shadow-lg border">
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-gray-800">{child.name}</h4>
              <p className="text-sm text-gray-600">{child.grade}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Weekly Hours</span>
                <span className="font-semibold">{child.weeklyHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Score</span>
                <span className="font-semibold">{child.averageScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Improvement</span>
                <span className={`font-semibold ${child.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {child.improvement >= 0 ? '+' : ''}{child.improvement}%
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyComparison;
