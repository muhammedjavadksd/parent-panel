
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface HeatmapCalendarProps {
  data: Array<{
    date: string;
    value: number;
    level: number;
  }>;
}

const HeatmapCalendar = ({ data }: HeatmapCalendarProps) => {
  const getColorIntensity = (level: number) => {
    const colors = ["bg-gray-100", "bg-green-100", "bg-green-200", "bg-green-300", "bg-green-400", "bg-green-500"];
    return colors[Math.min(level, colors.length - 1)];
  };

  // Generate last 12 weeks of calendar data
  const weeks = [];
  for (let week = 0; week < 12; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date();
      date.setDate(date.getDate() - (week * 7 + day));
      const dateStr = date.toISOString().split('T')[0];
      const dayData = data.find(d => d.date === dateStr) || {
        date: dateStr,
        value: 0,
        level: 0
      };
      weekData.push(dayData);
    }
    weeks.push(weekData);
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className="p-4 rounded-2xl bg-white border-2 border-blue-200 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-800 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Activity Heatmap
        </h3>
      </div>
      
      <div className="space-y-2">
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
          {dayLabels.map((day, index) => (
            <div key={index} className="text-center">{day}</div>
          ))}
        </div>
        
        {/* Heatmap grid */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-4 h-4 rounded-sm ${getColorIntensity(day.level)} border border-gray-200`}
                title={`${day.date}: ${day.value} activities`}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HeatmapCalendar;
