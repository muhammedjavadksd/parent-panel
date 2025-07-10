
import { Card } from "@/components/ui/card";
import { Clock, BookOpen, TrendingUp } from "lucide-react";

interface WeeklyAnalyticsProps {
  childName: string;
}

const WeeklyAnalytics = ({ childName }: WeeklyAnalyticsProps) => {
  const weeklyData = {
    totalMinutes: 285,
    classesAttended: 4,
    homeworkCompleted: 6,
    averageScore: 87,
    improvement: 12
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          {childName}'s Week Summary
        </h3>
        <span className="text-sm text-blue-600 font-medium">Jun 14-20</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-xl font-bold text-blue-800">{weeklyData.totalMinutes}m</p>
          <p className="text-sm text-blue-700">Learning Time</p>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm">
          <BookOpen className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-xl font-bold text-blue-800">{weeklyData.classesAttended}</p>
          <p className="text-sm text-blue-700">Classes Done</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyAnalytics;
