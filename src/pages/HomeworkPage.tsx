
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";

const homeworkResources = [
  { type: "Homework", title: "Math Practice", subject: "Math", dueDate: "Tomorrow" },
  { type: "Assignment", title: "Science Project", subject: "Science", dueDate: "Jun 25" },
  { type: "Recording", title: "English Class", subject: "English", date: "Yesterday" },
  { type: "PPT", title: "History Lesson", subject: "History", date: "Jun 19" },
];

const HomeworkPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 pb-20">
      <MobileHeader />
      
      <main className="pt-16 px-4">
        <Button variant="outline" onClick={handleBack} className="mb-3 text-xs">
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back
        </Button>
        <h2 className="text-sm font-bold text-gray-800 mb-3">Homework</h2>
        
        <div className="space-y-2">
          {homeworkResources.map((item, index) => (
            <Card key={index} className="p-3 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                    item.type === 'Homework' ? 'bg-orange-100 text-orange-600' :
                    item.type === 'Assignment' ? 'bg-red-100 text-red-600' :
                    item.type === 'Recording' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {item.type === 'Homework' ? '📝' :
                     item.type === 'Assignment' ? '📋' :
                     item.type === 'Recording' ? '🎥' : '📊'}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.subject}</p>
                    <p className="text-xs text-gray-400">
                      {item.dueDate ? `Due: ${item.dueDate}` : item.date}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  {item.type === 'Recording' || item.type === 'PPT' ? 'View' : 'Open'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default HomeworkPage;
