// LearningProgress.tsx

import { Card } from "@/components/ui/card";
import { BookOpen, Clock, Target, TrendingUp, LucideIcon } from "lucide-react";
import { DashboardHeaderStatsResponse, LearningProgressData } from "@/lib/interface/dashboard";
import { DASHBOARD_CONSTANTS } from "@/shared/constants/dashboard";
import ToggleViewSelector from "./ToggleViewSelector";
import { useMemo, memo } from "react";

// --- START: ADD TYPE DEFINITIONS ---

// 1. Define the type for a single stat object
interface Stat {
  title: string;
  value: string;
  target: string;
  icon: LucideIcon; // Or React.ElementType if icons can vary
  percentage: number;
  color: string;
  bgGradient: string;
  accentColor: string;
  borderColor: string;
}

// 2. Define the props type for the StatsGrid component
interface StatsGridProps {
  statsData: Stat[];
}

// --- END: ADD TYPE DEFINITIONS ---

interface LearningProgressProps {
  progressOverview: DashboardHeaderStatsResponse | null;
  learningProgress?: LearningProgressData | null;
  isLoading?: boolean;
  period: string;
  onPeriodChange: (newPeriod: string) => void;
}

// 3. APPLY THE TYPE TO THE COMPONENT'S PROPS
const StatsGrid = memo(({ statsData }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="relative group">
            <div className={`bg-gradient-to-br ${stat.bgGradient} p-4 rounded-2xl border-2 ${stat.borderColor} hover:shadow-xl transition-all duration-500 hover:-translate-y-1 premium-card`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.accentColor} p-2.5 rounded-xl shadow-lg text-white`}>
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="text-right">
                  <p className="text-lg lg:text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium">of {stat.target}</p>
                </div>
              </div>
              <h3 className="text-sm lg:text-base font-bold text-gray-800 mb-3 tracking-tight">{stat.title}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 font-medium">Progress</span>
                  <span className={`text-xs font-bold ${stat.color}`}>{stat.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${stat.accentColor} shadow-sm`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});


const LearningProgress = ({ progressOverview, learningProgress, isLoading = false, period, onPeriodChange }: LearningProgressProps) => {
    
    const statsData: Stat[] = useMemo(() => {
        const progress = learningProgress || {
            classes: 0,
            learning_time_hours: 0,
            total_hours: 0,
            achievements: "No achievements yet",
            streak: 0,
            coins: 0,
        };
        
        return [
            {
                title: "Classes",
                value: (progress.classes ?? 0).toString(),
                target: (progressOverview?.bookings_for_calendar?.length ?? 0).toString(),
                icon: BookOpen,
                percentage: Math.round(((progress.classes || 0) / (progressOverview?.bookings_for_calendar?.length || 5)) * 100),
                color: DASHBOARD_CONSTANTS.PROGRESS_BAR_TEXT_COLORS.classes,
                bgGradient: DASHBOARD_CONSTANTS.PROGRESS_BAR_GRADIENTS.classes,
                accentColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_COLORS.classes,
                borderColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_BORDERS.classes
            },
            {
                title: "Hours",
                value: `${Math.floor(progress.learning_time_hours)}h ${Math.round((progress.learning_time_hours % 1) * 60)}m`,
                target: progress.total_hours ? `${Math.floor(progress.total_hours)}h ${Math.round((progress.total_hours % 1) * 60)}m` : "15h 0m",
                icon: Clock,
                percentage: Math.min(100, Math.round(((progress.learning_time_hours || 0) / (progress.total_hours || 15)) * 100)),
                color: DASHBOARD_CONSTANTS.PROGRESS_BAR_TEXT_COLORS.hours,
                bgGradient: DASHBOARD_CONSTANTS.PROGRESS_BAR_GRADIENTS.hours,
                accentColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_COLORS.hours,
                borderColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_BORDERS.hours
            },
            {
                title: "Homework",
                value: progress.achievements && progress.achievements !== "There is no logic defined yet for achievements." ? "1" : "0",
                target: "3",
                icon: BookOpen,
                percentage: progress.achievements && progress.achievements !== "There is no logic defined yet for achievements." ? 33 : 0,
                color: DASHBOARD_CONSTANTS.PROGRESS_BAR_TEXT_COLORS.achievements,
                bgGradient: DASHBOARD_CONSTANTS.PROGRESS_BAR_GRADIENTS.achievements,
                accentColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_COLORS.achievements,
                borderColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_BORDERS.achievements
            },
            {
                title: "Streak",
                value: (progress.streak ?? 0).toString(),
                target: `${(7).toString()} Days`,
                icon: Target,
                percentage: Math.round(((progress.streak || 0) / 7) * 100),
                color: DASHBOARD_CONSTANTS.PROGRESS_BAR_TEXT_COLORS.streak,
                bgGradient: DASHBOARD_CONSTANTS.PROGRESS_BAR_GRADIENTS.streak,
                accentColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_COLORS.streak,
                borderColor: DASHBOARD_CONSTANTS.PROGRESS_BAR_BORDERS.streak
            }
        ];
    }, [learningProgress, progressOverview]);

    if (isLoading) {
        return (
            <Card className="premium-card p-4 lg:p-5 rounded-3xl ...">
                {/* Loading Skeleton */}
            </Card>
        );
    }

    return (
        <Card className="premium-card p-4 lg:p-5 rounded-3xl glass-card border-2 border-blue-100/50 shadow-2xl backdrop-blur-xl bg-white/95">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 rounded-2xl shadow-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">Learning Progress</h2>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl ">
                    <div className="flex justify-center">
                        <ToggleViewSelector
                            selectedPeriod={period}
                            onPeriodChange={onPeriodChange}
                        />
                    </div>
                </div>
            </div>
            
            <StatsGrid statsData={statsData} />
        </Card>
    );
};

export default memo(LearningProgress);