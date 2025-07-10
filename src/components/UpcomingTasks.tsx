
import { Card } from "@/components/ui/card";

const tasksData = [
  {
    title: "Prototyping Section",
    date: "21 Oct 2020, Friday",
    color: "bg-sky-blue",
    emoji: "🔧"
  },
  {
    title: "Wireframing Section",
    date: "21 Oct 2020, Friday",
    color: "bg-purple-400",
    emoji: "📱"
  },
  {
    title: "Blog Writing Section",
    date: "21 Oct 2020, Friday",
    color: "bg-golden-yellow",
    emoji: "✍️"
  },
  {
    title: "Video Editing Section",
    date: "22 Oct 2020, Friday",
    color: "bg-coral",
    emoji: "🎥"
  }
];

const UpcomingTasks = () => {
  return (
    <Card className="p-6 rounded-2xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Upcoming Task</h3>
        <button className="text-sky-blue text-sm hover:underline">See all</button>
      </div>
      
      <div className="space-y-3">
        {tasksData.map((task, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className={`w-10 h-10 ${task.color} rounded-lg flex items-center justify-center text-white`}>
              {task.emoji}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{task.title}</h4>
              <p className="text-sm text-gray-500">{task.date}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              →
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingTasks;
