
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";

const stories = [
  { title: "The Adventures of Panchatantra", category: "Moral Stories", duration: "15 min" },
  { title: "Akbar and Birbal Tales", category: "Historical", duration: "12 min" },
  { title: "Science Adventures", category: "Educational", duration: "20 min" },
  { title: "Math Magic Stories", category: "Educational", duration: "10 min" },
];

const StoriesPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen app-gradient from-warm-orange-50/90 via-amber-glow-50/90 to-warm-orange-100/90 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20">
      <MobileHeader />
      
      <main className="pt-16 px-4">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          className="mb-3 text-xs premium-focus bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border-white/20 dark:border-slate-600/50 text-warm-orange-800 dark:text-orange-200 hover:bg-warm-orange-50/20 dark:hover:bg-slate-700/50"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back
        </Button>
        <h2 className="text-sm font-bold text-warm-orange-800 dark:text-orange-200 mb-3">Stories Library</h2>
        
        <div className="space-y-2">
          {stories.map((story, index) => (
            <Card key={index} className="premium-card p-3 rounded-xl glass-card bg-gradient-to-br from-warm-orange-50/90 via-white/90 to-amber-glow-50/90 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-warm-orange-100/90 dark:bg-orange-900/40 text-warm-orange-600 dark:text-orange-400 flex items-center justify-center text-xs backdrop-blur-sm border border-warm-orange-200/70 dark:border-orange-500/40 shadow-sm">
                    📖
                  </div>
                  <div>
                    <p className="text-xs font-medium text-warm-orange-800 dark:text-orange-200">{story.title}</p>
                    <p className="text-xs text-warm-orange-600 dark:text-orange-300">{story.category}</p>
                    <p className="text-xs text-warm-orange-500 dark:text-orange-400">{story.duration}</p>
                  </div>
                </div>
                <Button size="sm" className="text-xs btn-premium shadow-md">
                  Read
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

export default StoriesPage;
