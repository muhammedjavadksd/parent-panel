
import { Card } from "@/components/ui/card";
import { Clock, BookOpen, Calendar } from "lucide-react";
import { useParentDashboard } from "@/hooks/useParentDashboard";

const ActivityTimeline = () => {
  const { getActivityTimeline } = useParentDashboard();
  const timeline = getActivityTimeline();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'class': return '📚';
      case 'homework': return '📝';
      case 'game': return '🎮';
      default: return '⭐';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-warm-orange-50/70 text-warm-orange-600 dark:bg-orange-900/40 dark:text-orange-400';
      case 'homework': return 'bg-amber-glow-50/70 text-amber-glow-600 dark:bg-amber-900/40 dark:text-amber-400';
      case 'game': return 'bg-golden-yellow/30 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400';
      default: return 'bg-gray-50/70 text-gray-600 dark:bg-gray-800/40 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return `${diffDays - 1} days ago`;
  };

  return (
    <div className="space-y-4">
      <Card className="premium-card p-4 rounded-2xl glass-card bg-gradient-to-br from-warm-orange-50/90 via-amber-glow-50/90 to-warm-orange-100/90 dark:from-slate-800/95 dark:via-slate-700/95 dark:to-slate-800/95 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
        <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200 mb-3 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-warm-orange-600 dark:text-orange-400" />
          Recent Family Activity
        </h3>
        <div className="space-y-3">
          {timeline.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-warm-orange-50/60 dark:bg-orange-900/30 backdrop-blur-sm rounded-lg border border-warm-orange-200/50 dark:border-orange-500/40 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-warm-orange-500 to-amber-glow-500 dark:from-orange-500 dark:to-amber-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg glow-orange">
                  {activity.childAvatar}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-warm-orange-800 dark:text-orange-200">{activity.childName}</span>
                  <span className={`px-2 py-1 rounded-full text-xs backdrop-blur-sm border ${getActivityColor(activity.type)} border-warm-orange-200/50 dark:border-orange-500/40`}>
                    {getActivityIcon(activity.type)} {activity.type}
                  </span>
                </div>
                <p className="text-xs text-warm-orange-700 dark:text-orange-300 mb-1">{activity.activity}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-warm-orange-600 dark:text-orange-400">{formatDate(activity.date)}</span>
                  <span className="text-xs font-bold text-amber-glow-600 dark:text-amber-400">+{activity.points} coins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Summary */}
      <Card className="premium-card p-4 rounded-2xl glass-card bg-gradient-to-r from-warm-orange-50/90 to-amber-glow-50/90 dark:from-slate-800/95 dark:to-slate-700/95 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
        <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-warm-orange-600 dark:text-orange-400" />
          This Week's Highlights
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-white/60 dark:bg-orange-900/40 backdrop-blur-sm rounded-lg border border-warm-orange-200/50 dark:border-orange-500/40 shadow-sm">
            <p className="text-lg font-bold text-warm-orange-600 dark:text-orange-400">85</p>
            <p className="text-xs text-warm-orange-700 dark:text-orange-300">Total Activities</p>
          </div>
          <div className="text-center p-3 bg-white/60 dark:bg-amber-900/40 backdrop-blur-sm rounded-lg border border-amber-glow-200/50 dark:border-amber-500/40 shadow-sm">
            <p className="text-lg font-bold text-amber-glow-600 dark:text-amber-400">1,250</p>
            <p className="text-xs text-amber-glow-700 dark:text-amber-300">Coins Earned</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-white/60 dark:bg-orange-900/40 backdrop-blur-sm rounded-lg border border-warm-orange-200/50 dark:border-orange-500/40 shadow-sm">
          <p className="text-xs font-medium text-warm-orange-800 dark:text-orange-200">🏆 Family Achievement Unlocked!</p>
          <p className="text-xs text-warm-orange-600 dark:text-orange-300">All children completed their weekly goals</p>
        </div>
      </Card>
    </div>
  );
};

export default ActivityTimeline;
