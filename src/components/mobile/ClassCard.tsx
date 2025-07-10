
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

interface ClassCardProps {
  classItem: {
    title: string;
    teacher: string;
    time: string;
    date: string;
    participants: number;
    emoji: string;
  };
}

const ClassCard = ({ classItem }: ClassCardProps) => {
  return (
    <Card className="p-4 rounded-2xl bg-white border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl bg-blue-50 rounded-xl w-12 h-12 flex items-center justify-center border border-blue-100 shadow-sm">
          {classItem.emoji}
        </div>
        <div className="flex items-center text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-full border border-blue-100 shadow-sm">
          <Users size={12} className="mr-1" />
          {classItem.participants}
        </div>
      </div>
      
      <h3 className="font-bold text-slate-800 mb-1 text-sm leading-tight">{classItem.title}</h3>
      <p className="text-xs text-slate-700 mb-2">{classItem.teacher}</p>
      
      <div className="flex items-center text-xs text-slate-600 mb-3">
        <Clock size={12} className="mr-1" />
        <span>{classItem.time}</span>
      </div>
      
      <div className="text-xs font-semibold text-slate-800 mb-3 bg-yellow-50 px-3 py-1 rounded-xl inline-block border border-yellow-200 shadow-sm">
        {classItem.date}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs py-2 shadow-md font-semibold transition-all duration-300 min-h-[44px]">
          Join
        </Button>
        <Button variant="outline" className="border border-yellow-200 text-yellow-700 hover:bg-yellow-50 rounded-xl text-xs py-2 shadow-sm min-h-[44px] transition-all duration-300">
          Reschedule
        </Button>
        <Button variant="outline" className="border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl text-xs py-2 shadow-sm min-h-[44px] transition-all duration-300">
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default ClassCard;
