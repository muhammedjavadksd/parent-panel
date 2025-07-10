
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const coursesData = [
  {
    title: "How to become Pro Interaction Designer",
    progress: 35,
    completed: true,
    days: "6/16",
    gradient: "from-purple-400 to-pink-400",
    emoji: "🎨"
  },
  {
    title: "User Interface beginner training Class",
    progress: 65,
    completed: true,
    days: "8/14",
    gradient: "from-pink-400 to-red-400",
    emoji: "💻"
  },
  {
    title: "How to become productive master class",
    progress: 30,
    completed: false,
    days: "6/20",
    gradient: "from-sky-blue to-blue-400",
    emoji: "⚡"
  }
];

const YourCourses = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Courses</h2>
      
      <div className="space-y-4">
        {coursesData.map((course, index) => (
          <Card key={index} className="p-6 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${course.gradient} rounded-xl flex items-center justify-center text-white text-xl`}>
                {course.emoji}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {course.completed ? "Completed" : "In Progress"}
                  </span>
                  <span className="text-sm font-medium text-gray-800">{course.progress}%</span>
                </div>
                
                <Progress value={course.progress} className="mb-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Days</span>
                  <span className="text-sm text-gray-600">{course.days}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YourCourses;
