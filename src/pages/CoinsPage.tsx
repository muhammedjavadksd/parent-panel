
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coins, Trophy, BookOpen, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChildren } from "@/hooks/useChildren";
import { useCoins } from "@/contexts/CoinContext";

const CoinsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { selectedChild } = useChildren();
  const { getTotalCoins, getRecentTransactions, addCoins } = useCoins();

  const currentChildName = selectedChild?.name || "Family";
  const totalCoins = getTotalCoins(selectedChild?.id.toString() || "family");
  const recentTransactions = getRecentTransactions(selectedChild?.id.toString() || "family", 10);

  const handleEarnCoins = (type: 'class' | 'homework' | 'game') => {
    const descriptions = {
      class: 'Completed Yoga Class',
      homework: 'Finished Math Assignment',
      game: 'Won Memory Game'
    };
    addCoins(selectedChild?.id.toString() || "family", type, descriptions[type]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return <BookOpen className="w-4 h-4" />;
      case 'homework': return <Trophy className="w-4 h-4" />;
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      default: return <Coins className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'text-blue-600 bg-blue-100';
      case 'homework': return 'text-green-600 bg-green-100';
      case 'game': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      {isMobile && <MobileHeader />}

      <main className={`${isMobile ? 'pt-16 pb-20' : 'pt-6'} px-4 max-w-4xl mx-auto`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Coins className="w-6 h-6 mr-2 text-yellow-500" />
                Coin Directory
              </h1>
              <p className="text-sm text-gray-600">{currentChildName}'s coin management</p>
            </div>
          </div>
        </div>

        {/* Current Balance */}
        <Card className="p-6 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-200 mb-6">
          <div className="text-center">
            <div className="text-6xl mb-3">🪙</div>
            <h2 className="text-3xl font-bold text-yellow-700 mb-2">{totalCoins} Coins</h2>
            <p className="text-sm text-yellow-600">Total Balance</p>
          </div>
        </Card>

        {/* Ways to Earn Coins */}
        <Card className="p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-coral" />
            Ways to Earn Coins
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-blue-50 rounded-xl text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800 mb-1">Classes</h4>
              <p className="text-sm text-blue-600 mb-3">Complete any class</p>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">+5 Coins</div>
            </div>

            <div className="p-4 bg-green-50 rounded-xl text-center">
              <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800 mb-1">Homework</h4>
              <p className="text-sm text-green-600 mb-3">Finish assignments</p>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">+5 Coins</div>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl text-center">
              <Gamepad2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800 mb-1">Games</h4>
              <p className="text-sm text-purple-600 mb-3">Play & complete games</p>
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">+5 Coins</div>
            </div>
          </div>

          {/* Demo buttons for testing */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button size="sm" onClick={() => handleEarnCoins('class')} className="bg-blue-600 hover:bg-blue-700">
              Simulate Class Completion
            </Button>
            <Button size="sm" onClick={() => handleEarnCoins('homework')} className="bg-green-600 hover:bg-green-700">
              Simulate Homework Done
            </Button>
            <Button size="sm" onClick={() => handleEarnCoins('game')} className="bg-purple-600 hover:bg-purple-700">
              Simulate Game Win
            </Button>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>

          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Coins className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No coin activity yet!</p>
              <p className="text-sm">Complete classes, homework, or games to earn coins.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getTypeColor(transaction.type)}`}>
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-500">
                        {transaction.timestamp.toLocaleDateString()} at {transaction.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-green-600 font-bold">
                    <Coins className="w-4 h-4 mr-1" />
                    +{transaction.points}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>

      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default CoinsPage;
