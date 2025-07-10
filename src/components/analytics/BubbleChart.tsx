
import { Card } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain } from "lucide-react";

interface BubbleChartProps {
  data: Array<{
    subject: string;
    difficulty: number;
    timeSpent: number;
    score: number;
  }>;
}

const BubbleChart = ({ data }: BubbleChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.subject}</p>
          <p className="text-sm text-gray-600">Difficulty: {data.difficulty}/10</p>
          <p className="text-sm text-gray-600">Time: {data.timeSpent}h</p>
          <p className="text-sm text-gray-600">Score: {data.score}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
      <div className="flex items-center mb-6">
        <Brain className="text-purple-500 mr-3" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Subject Difficulty vs Time Analysis</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart data={data}>
          <XAxis 
            dataKey="difficulty" 
            type="number" 
            domain={[0, 10]}
            tick={{ fontSize: 12 }}
            label={{ value: 'Difficulty Level', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            dataKey="timeSpent" 
            type="number"
            tick={{ fontSize: 12 }}
            label={{ value: 'Time Spent (hours)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            dataKey="score" 
            fill="#8884d8"
            r={8}
          />
        </ScatterChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>💡 <strong>Insight:</strong> Bubble size represents your score. Look for subjects with high difficulty but low time investment for optimization opportunities.</p>
      </div>
    </Card>
  );
};

export default BubbleChart;
