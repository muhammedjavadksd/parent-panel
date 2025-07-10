
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl filter drop-shadow-sm">🧘‍♀️</span>
          <h2 className="text-2xl font-bold text-white drop-shadow-sm">Little Yogi – Gita for Kids</h2>
        </div>
        
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-white/90" />
            <span className="font-medium text-white/95">Starts in 2h 30m</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-white/90" />
            <span className="font-medium text-white/95">Today, 7:00 PM</span>
          </div>
        </div>
        
        <Button 
          className="bg-white/95 text-purple-600 hover:bg-white hover:text-purple-700 px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          🚀 Join Now
        </Button>
      </div>
      
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-6xl opacity-30 filter drop-shadow-sm">
        🧘‍♀️
      </div>
    </div>
  );
};

export default HeroSection;
