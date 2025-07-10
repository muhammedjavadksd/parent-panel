
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  color: string;
  unit?: string;
}

const GaugeChart = ({ value, max, label, color, unit = "" }: GaugeChartProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const data = [
    { name: 'completed', value: percentage },
    { name: 'remaining', value: 100 - percentage }
  ];

  const COLORS = [color, '#f3f4f6'];

  return (
    <Card className="p-4 rounded-2xl bg-white shadow-lg border">
      <div className="relative">
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={30}
              outerRadius={50}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-800">{value}{unit}</div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-xs text-gray-400">of {max}{unit}</div>
        </div>
      </div>
    </Card>
  );
};

export default GaugeChart;
