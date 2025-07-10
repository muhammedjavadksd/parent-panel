
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Video, Download, FileText, MessageSquare } from "lucide-react";

interface CompletedClassCardProps {
  classItem: {
    title: string;
    teacher: string;
    completedDate: string;
    grade: string;
    emoji: string;
  };
}

const CompletedClassCard = ({ classItem }: CompletedClassCardProps) => {
  return (
    <Card className="p-4 rounded-2xl bg-white border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl bg-blue-50 rounded-xl w-12 h-12 flex items-center justify-center border border-blue-100 shadow-sm">
          {classItem.emoji}
        </div>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-xl border border-yellow-200 shadow-sm">
          <Star className="text-yellow-600 w-3 h-3 mr-1" />
          <span className="text-xs font-semibold text-yellow-700">{classItem.grade}</span>
        </div>
      </div>
      
      <h3 className="font-bold text-slate-800 mb-1 text-sm leading-tight">{classItem.title}</h3>
      <p className="text-xs text-slate-700 mb-1">{classItem.teacher}</p>
      <p className="text-xs text-slate-600 mb-3">Completed: {classItem.completedDate}</p>
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl text-xs py-2 shadow-sm transition-all duration-300 min-h-[44px]">
          <Video size={12} className="mr-1" />
          Recording
        </Button>
        <Button variant="outline" className="border border-yellow-200 text-yellow-700 hover:bg-yellow-50 rounded-xl text-xs py-2 shadow-sm transition-all duration-300 min-h-[44px]">
          <Download size={12} className="mr-1" />
          PPT
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button variant="outline" className="border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl text-xs py-2 shadow-sm transition-all duration-300 min-h-[44px]">
          <FileText size={12} className="mr-1" />
          Homework
        </Button>
        <Button variant="outline" className="border border-yellow-200 text-yellow-700 hover:bg-yellow-50 rounded-xl text-xs py-2 shadow-sm transition-all duration-300 min-h-[44px]">
          <MessageSquare size={12} className="mr-1" />
          Feedback
        </Button>
      </div>
    </Card>
  );
};

export default CompletedClassCard;
