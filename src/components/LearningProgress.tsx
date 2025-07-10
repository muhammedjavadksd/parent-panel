
import { Card } from "@/components/ui/card";

const progressData = [
  {
    emoji: "📚",
    value: "28",
    label: "Classes Completed",
    gradient: "from-sky-blue to-blue-400"
  },
  {
    emoji: "🔥",
    value: "15 days",
    label: "Learning Streak",
    gradient: "from-red-400 to-red-600"
  },
  {
    emoji: "🏆",
    value: "Gold",
    label: "Achievement",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    emoji: "🎯",
    value: "78%",
    label: "Weekly Goal",
    gradient: "from-green-400 to-green-600"
  }
];

const LearningProgress = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-lg">📊</span>
        <h2 className="text-lg font-bold text-gray-800">Learning Progress</h2>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {progressData.map((item, index) => (
          <Card 
            key={index}
            className={`bg-gradient-to-r ${item.gradient} p-4 text-white rounded-xl hover:scale-105 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-lg font-bold mb-1">{item.value}</div>
              <div className="text-xs opacity-90">{item.label}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningProgress;
