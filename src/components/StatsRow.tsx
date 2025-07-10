
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useChildren } from "@/hooks/useChildren";
import { useCoins } from "@/contexts/CoinContext";

const StatsRow = () => {
  const { selectedChild } = useChildren();
  const { getTotalCoins } = useCoins();

  // Default stats for family view or when no child is selected
  const defaultStats = {
    progress: { completed: 12, total: 20, percentage: 60 },
    streak: { days: 5, name: "Family" },
    rank: 5
  };

  const currentStats = defaultStats;
  const totalCoins = getTotalCoins(selectedChild?.id.toString() || "family");

  return (
    <Card className="p-4 rounded-2xl bg-white border-2 border-blue-200 shadow-lg">
      <div className="grid grid-cols-4 gap-3">
        {/* Learning Progress */}
        <div className="text-center">
          <div className="text-xl mb-1">📚</div>
          <h3 className="text-xs font-bold text-blue-800 mb-2">Progress</h3>
          <div className="w-full bg-blue-100 rounded-full h-1.5 mb-1">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${currentStats.progress.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-700">{currentStats.progress.percentage}%</p>
        </div>

        {/* Streak */}
        <div className="text-center">
          <div className="text-xl mb-1">🔥</div>
          <h3 className="text-xs font-bold text-blue-800 mb-2">Streak</h3>
          <p className="text-sm font-bold text-yellow-600">{currentStats.streak.days}</p>
          <p className="text-xs text-blue-700">Days</p>
        </div>

        {/* Coins */}
        <div className="text-center">
          <div className="text-xl mb-1">🪙</div>
          <h3 className="text-xs font-bold text-blue-800 mb-2">Coins</h3>
          <p className="text-sm font-bold text-yellow-600">{totalCoins}</p>
          <p className="text-xs text-blue-700">Total</p>
        </div>

        {/* Rank */}
        <div className="text-center">
          <div className="text-xl mb-1">🏆</div>
          <h3 className="text-xs font-bold text-blue-800 mb-2">Rank</h3>
          <p className="text-sm font-bold text-yellow-600">#{currentStats.rank}</p>
          <p className="text-xs text-blue-700">Weekly</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsRow;
