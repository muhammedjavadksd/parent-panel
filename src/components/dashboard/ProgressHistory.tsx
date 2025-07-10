
import { Card } from "@/components/ui/card";
import { Calendar, Clock, BookOpen, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Child {
  id: string;
  name: string;
  avatar: string;
  classes: number;
  totalMinutes: number;
  averageScore: number;
  weeklyActivity: number[];
}

interface ProgressHistoryProps {
  children: Child[];
}

const ProgressHistory = ({ children }: ProgressHistoryProps) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getWeeklyData = () => {
    return weekDays.map((day, index) => {
      const dayData: any = { day };
      children.forEach(child => {
        dayData[child.name] = child.weeklyActivity[index] || 0;
      });
      return dayData;
    });
  };

  const monthlyProgress = [
    { month: 'Jan', priya: 65, arjun: 78, sara: 55 },
    { month: 'Feb', priya: 72, arjun: 82, sara: 62 },
    { month: 'Mar', priya: 78, arjun: 88, sara: 68 },
    { month: 'Apr', priya: 85, arjun: 92, sara: 75 },
    { month: 'May', priya: 82, arjun: 89, sara: 78 },
    { month: 'Jun', priya: 87, arjun: 95, sara: 83 }
  ];

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D'];

  return (
    <div className="space-y-4">
      {/* Weekly Activity Chart */}
      <Card className="p-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          Weekly Learning Activity
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={getWeeklyData()}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            {children.map((child, index) => (
              <Bar 
                key={child.id}
                dataKey={child.name} 
                fill={colors[index % colors.length]} 
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly Progress Trend */}
      <Card className="p-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <Award className="w-4 h-4 mr-2 text-green-600" />
          Monthly Progress Trends
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyProgress}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            {children.map((child, index) => (
              <Line 
                key={child.id}
                type="monotone" 
                dataKey={child.name.toLowerCase()} 
                stroke={colors[index % colors.length]} 
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-4 mt-3">
          {children.map((child, index) => (
            <div key={child.id} className="flex items-center space-x-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-xs text-gray-600">{child.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Time Breakdown */}
      <Card className="p-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-purple-600" />
          Learning Time This Month
        </h3>
        <div className="space-y-3">
          {children.map((child, index) => (
            <div key={child.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-lg">{child.avatar}</div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{child.name}</p>
                  <p className="text-xs text-gray-600">{child.classes} classes completed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{Math.round(child.totalMinutes / 60)} hours</p>
                <p className="text-xs text-gray-500">{child.totalMinutes} minutes</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgressHistory;
