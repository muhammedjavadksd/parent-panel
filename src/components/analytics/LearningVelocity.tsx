
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Zap, TrendingUp, Clock } from "lucide-react";

interface LearningVelocityProps {
  data: Array<{
    week: string;
    tasksCompleted: number;
    averageTime: number;
    efficiency: number;
  }>;
}

const LearningVelocity = ({ data }: LearningVelocityProps) => {
  const currentWeek = data[data.length - 1];
  const previousWeek = data[data.length - 2];
  const velocityChange = currentWeek ? ((currentWeek.efficiency - (previousWeek?.efficiency || 0)) / (previousWeek?.efficiency || 1)) * 100 : 0;

  return (
    <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Zap className="text-yellow-500 mr-3" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Learning Velocity</h3>
        </div>
        <div className="flex items-center space-x-2">
          {velocityChange >= 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
          <span className={`text-sm font-semibold ${velocityChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {velocityChange > 0 ? '+' : ''}{velocityChange.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{currentWeek?.averageTime || 0}</p>
          <p className="text-xs text-gray-600">Avg Time/Task (min)</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{currentWeek?.tasksCompleted || 0}</p>
          <p className="text-xs text-gray-600">Tasks Completed</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{currentWeek?.efficiency || 0}%</p>
          <p className="text-xs text-gray-600">Efficiency Score</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="week" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="tasksCompleted" fill="#3b82f6" name="Tasks Completed" />
          <Bar dataKey="efficiency" fill="#f59e0b" name="Efficiency %" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LearningVelocity;
