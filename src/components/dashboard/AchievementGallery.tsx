
import { Card } from "@/components/ui/card";
import { Award, Star, Trophy } from "lucide-react";

interface Child {
  id: string;
  name: string;
  avatar: string;
  recentAchievements: Array<{
    title: string;
    date: string;
    emoji: string;
  }>;
}

interface AchievementGalleryProps {
  children: Child[];
}

const AchievementGallery = ({ children }: AchievementGalleryProps) => {
  const allAchievements = children.flatMap(child =>
    child.recentAchievements.map(achievement => ({
      ...achievement,
      childName: child.name,
      childAvatar: child.avatar
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const familyMilestones = [
    { title: "100 Classes Completed", emoji: "🎓", unlocked: true },
    { title: "30-Day Family Streak", emoji: "🔥", unlocked: true },
    { title: "1000 Coins Earned", emoji: "💰", unlocked: true },
    { title: "All Subjects Mastered", emoji: "⭐", unlocked: false },
    { title: "Perfect Week", emoji: "🏆", unlocked: false }
  ];

  return (
    <div className="space-y-4 mt-6">
      <Card className="premium-card p-4 rounded-2xl glass-card bg-gradient-to-br from-warm-orange-50/90 via-amber-glow-50/90 to-warm-orange-100/90 dark:from-slate-800/95 dark:via-slate-700/95 dark:to-slate-800/95 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
        <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200 mb-3 flex items-center">
          <Award className="w-4 h-4 mr-2 text-warm-orange-600 dark:text-orange-400" />
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {allAchievements.slice(0, 6).map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-warm-orange-50/70 to-amber-glow-50/70 dark:from-orange-900/40 dark:to-amber-900/40 backdrop-blur-sm rounded-lg border border-warm-orange-200/50 dark:border-orange-500/40 shadow-sm">
              <div className="text-lg bg-gradient-to-r from-warm-orange-500/20 to-amber-glow-500/20 dark:from-orange-500/30 dark:to-amber-500/30 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm border border-warm-orange-300/50 dark:border-orange-400/50">{achievement.emoji}</div>
              <div className="flex-1">
                <p className="text-xs font-medium text-warm-orange-800 dark:text-orange-200">{achievement.title}</p>
                <p className="text-xs text-warm-orange-600 dark:text-orange-300">{achievement.childName} • {achievement.date}</p>
              </div>
              <div className="text-lg">{achievement.childAvatar}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="premium-card p-4 rounded-2xl glass-card bg-gradient-to-br from-warm-orange-50/90 via-amber-glow-50/90 to-warm-orange-100/90 dark:from-slate-800/95 dark:via-slate-700/95 dark:to-slate-800/95 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
        <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200 mb-3 flex items-center">
          <Trophy className="w-4 h-4 mr-2 text-warm-orange-600 dark:text-orange-400" />
          Family Milestones
        </h3>
        <div className="space-y-2">
          {familyMilestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-3 p-3 rounded-lg backdrop-blur-sm border shadow-sm ${
                milestone.unlocked 
                  ? 'bg-gradient-to-r from-amber-glow-50/80 to-warm-orange-50/80 dark:from-amber-900/50 dark:to-orange-900/50 border-amber-glow-200/60 dark:border-amber-500/40' 
                  : 'bg-gray-50/80 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-600/40'
              }`}
            >
              <div className={`text-lg ${milestone.unlocked ? '' : 'grayscale opacity-50'}`}>
                {milestone.emoji}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-medium ${
                  milestone.unlocked ? 'text-warm-orange-800 dark:text-orange-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {milestone.title}
                </p>
              </div>
              {milestone.unlocked && (
                <Star className="w-4 h-4 text-amber-glow-500 dark:text-amber-400 fill-current" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AchievementGallery;
