
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const HomeworkRoomCard = () => {
  return (
    <div className="mt-6 mb-6">
      <Card className="p-4 rounded-2xl bg-white border border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-3">
          <div className="bg-blue-50 rounded-xl w-10 h-10 flex items-center justify-center border border-blue-100 shadow-sm mr-3">
            <MessageSquare className="text-blue-600" size={18} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Homework Room</h2>
        </div>
        <p className="text-sm text-slate-700 mb-4">Share your doubts and get help from teachers</p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-semibold transition-all duration-300 min-h-[48px]">
          Enter Homework Room
        </Button>
      </Card>
    </div>
  );
};

export default HomeworkRoomCard;
