
import { Card } from "@/components/ui/card";
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from "lucide-react";

interface AreaChartProps {
  data: Array<{
    date: string;
    math: number;
    science: number;
    english: number;
    hindi: number;
  }>;
  title: string;
}

const AreaChart = ({ data, title }: AreaChartProps) => {
  return (
    <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
      <div className="flex items-center mb-6">
        <TrendingUp className="text-blue-500 mr-3" size={24} />
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <RechartsAreaChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            labelFormatter={(label) => `Date: ${label}`}
            formatter={(value: number, name: string) => [`${value} hours`, name.charAt(0).toUpperCase() + name.slice(1)]}
          />
          <Area type="monotone" dataKey="math" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Area type="monotone" dataKey="science" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          <Area type="monotone" dataKey="english" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
          <Area type="monotone" dataKey="hindi" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
        </RechartsAreaChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Math</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Science</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-600">English</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Hindi</span>
        </div>
      </div>
    </Card>
  );
};

export default AreaChart;
