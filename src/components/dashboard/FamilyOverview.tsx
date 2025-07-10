
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, BookOpen, Award } from "lucide-react";

interface Child {
  id: string;
  name: string;
  avatar: string;
  classes: number;
  streak: number;
  level: string;
  totalMinutes: number;
  averageScore: number;
  totalCoins: number;
}

interface FamilyOverviewProps {
  children: Child[];
  familyStats: {
    totalClasses: number;
    totalMinutes: number;
    totalCoins: number;
    averageScore: number;
    longestStreak: number;
  };
}

const FamilyOverview = ({ children, familyStats }: FamilyOverviewProps) => {
  return (
    <div className="space-y-4">
      {/* Family Summary */}
      <Card className="premium-card p-4 rounded-2xl glass-card bg-gradient-to-br from-warm-orange-50/90 via-amber-glow-50/90 to-warm-orange-100/90 dark:from-slate-800/95 dark:via-slate-700/95 dark:to-slate-800/95 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
        <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-warm-orange-600 dark:text-orange-400" />
          This Month's Family Progress
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-warm-orange-50/70 dark:bg-orange-900/40 backdrop-blur-sm rounded-lg border border-warm-orange-200/60 dark:border-orange-500/40 shadow-sm">
            <BookOpen className="w-6 h-6 text-warm-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-warm-orange-800 dark:text-orange-200">{familyStats.totalClasses}</p>
            <p className="text-xs text-warm-orange-600 dark:text-orange-300">Total Classes</p>
          </div>
          <div className="text-center p-3 bg-amber-glow-50/70 dark:bg-amber-900/40 backdrop-blur-sm rounded-lg border border-amber-glow-200/60 dark:border-amber-500/40 shadow-sm">
            <Clock className="w-6 h-6 text-amber-glow-600 dark:text-amber-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-amber-glow-800 dark:text-amber-200">{Math.round(familyStats.totalMinutes / 60)}h</p>
            <p className="text-xs text-amber-glow-600 dark:text-amber-300">Learning Time</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-warm-orange-100/80 to-amber-glow-100/80 dark:from-orange-900/50 dark:to-amber-900/50 backdrop-blur-sm rounded-lg border border-warm-orange-300/50 dark:border-orange-500/40 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warm-orange-800 dark:text-orange-200">Family Average Score</p>
              <p className="text-xs text-warm-orange-600 dark:text-orange-300">Across all subjects</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-warm-orange-700 dark:text-orange-300">{familyStats.averageScore}%</p>
              <p className="text-xs text-amber-glow-600 dark:text-amber-400">↗ Great work!</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Individual Child Cards */}
      <div className="space-y-3">
        {children.map((child) => (
          <Card key={child.id} className="premium-card p-4 rounded-2xl glass-card bg-gradient-to-br from-warm-orange-50/80 via-amber-glow-50/80 to-warm-orange-100/80 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-warm-orange-500 to-amber-glow-500 dark:from-orange-500 dark:to-amber-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg glow-orange">
                {child.avatar}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-warm-orange-800 dark:text-orange-200">{child.name}</h4>
                <p className="text-xs text-warm-orange-600 dark:text-orange-300">{child.level} Level</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-amber-glow-700 dark:text-amber-300">{child.totalCoins} 🪙</p>
                <p className="text-xs text-warm-orange-600 dark:text-orange-400">{child.streak} day streak</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 bg-warm-orange-50/70 dark:bg-orange-900/40 backdrop-blur-sm rounded-lg border border-warm-orange-200/50 dark:border-orange-500/40 shadow-sm">
                <p className="text-sm font-bold text-warm-orange-600 dark:text-orange-400">{child.classes}</p>
                <p className="text-xs text-warm-orange-700 dark:text-orange-300">Classes</p>
              </div>
              <div className="p-2 bg-amber-glow-50/70 dark:bg-amber-900/40 backdrop-blur-sm rounded-lg border border-amber-glow-200/50 dark:border-amber-500/40 shadow-sm">
                <p className="text-sm font-bold text-amber-glow-600 dark:text-amber-400">{Math.round(child.totalMinutes / 60)}h</p>
                <p className="text-xs text-amber-glow-700 dark:text-amber-300">Time</p>
              </div>
              <div className="p-2 bg-golden-yellow/30 dark:bg-yellow-900/40 backdrop-blur-sm rounded-lg border border-yellow-200/50 dark:border-yellow-500/40 shadow-sm">
                <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{child.averageScore}%</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">Score</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-warm-orange-600 dark:text-orange-400">Monthly Goal Progress</span>
                <span className="text-xs font-bold text-warm-orange-800 dark:text-orange-200">{child.classes}/30</span>
              </div>
              <Progress value={(child.classes / 30) * 100} className="h-2" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyOverview;
