
import { Card } from "@/components/ui/card";
import { Coins, TrendingUp } from "lucide-react";
import { useCoins } from "@/contexts/CoinContext";
import { useChildren } from "@/hooks/useChildren";
import { useNavigate } from "react-router-dom";

const CoinDisplay = () => {
  const { getTotalCoins, getRecentTransactions } = useCoins();
  const { selectedChild } = useChildren();
  const navigate = useNavigate();

  const totalCoins = getTotalCoins(selectedChild?.id.toString() || "family");
  const recentTransactions = getRecentTransactions(selectedChild?.id.toString() || "family", 3);
  const todayEarned = recentTransactions
    .filter(t => new Date(t.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, t) => sum + t.points, 0);

  return (
    <Card
      className="p-3 sm:p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-yellow-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer active:scale-95 min-h-[44px]"
      onClick={() => navigate('/coins')}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="text-xs sm:text-sm font-bold text-blue-800 flex items-center">
          <Coins className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-600" />
          My Coins
        </h3>
        <div className="flex items-center space-x-1 text-xs text-green-600 bg-gradient-to-r from-green-50/80 to-white/90 px-2 py-1 rounded-xl border border-green-200/50 shadow-md backdrop-blur-sm">
          <TrendingUp className="w-3 h-3" />
          <span className="hidden xs:inline">+{todayEarned} today</span>
          <span className="xs:hidden">+{todayEarned}</span>
        </div>
      </div>

      <div className="text-center mb-2 sm:mb-3">
        <div className="text-xl sm:text-2xl mb-1 bg-gradient-to-br from-yellow-50/80 to-blue-50/80 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-xl border border-yellow-200/50 backdrop-blur-sm filter drop-shadow-sm">🪙</div>
        <p className="text-xl sm:text-2xl font-bold text-yellow-700">{totalCoins}</p>
        <p className="text-xs text-blue-600">Total Balance</p>
      </div>

      <div className="text-center">
        <p className="text-xs text-blue-500 bg-gradient-to-r from-blue-50/60 to-white/80 px-3 py-2 rounded-xl border border-blue-100/50 shadow-lg backdrop-blur-sm">Tap to view coin directory</p>
      </div>
    </Card>
  );
};

export default CoinDisplay;
