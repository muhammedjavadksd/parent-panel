
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProgressAnalytics = () => {
  const progressData = [
    { subject: "Mathematics", progress: 85, color: "bg-orange-500" },
    { subject: "Science", progress: 72, color: "bg-yellow-500" },
    { subject: "English", progress: 90, color: "bg-amber-500" },
    { subject: "History", progress: 68, color: "bg-orange-400" }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-orange-800">Progress Analytics</h2>
        <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
          View Detailed Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressData.map((item, index) => (
          <Card key={index} className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-orange-800">{item.subject}</h3>
              <span className="text-sm font-bold text-orange-700">{item.progress}%</span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div 
                className={`${item.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-orange-200">
        <h3 className="font-bold text-orange-800 mb-2">Weekly Achievement</h3>
        <p className="text-orange-700 text-sm">Great progress this week! You've completed 8 out of 10 assigned tasks.</p>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
