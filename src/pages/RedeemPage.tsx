
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coins, Gift, Star, Crown, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChildren } from "@/hooks/useChildren";
import { useCoins } from "@/contexts/CoinContext";
import { useToast } from "@/hooks/use-toast";

const RedeemPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { selectedChild } = useChildren();
  const { getTotalCoins } = useCoins();
  const { toast } = useToast();
  const [redeemedItems, setRedeemedItems] = useState<number[]>([]);

  const currentChildName = selectedChild?.name || "Family";
  const totalCoins = getTotalCoins(selectedChild?.id.toString() || "family");

  const rewards = [
    {
      id: 1,
      title: "Extra Screen Time",
      description: "Get 30 minutes of extra screen time",
      cost: 25,
      icon: "📱",
      category: "Digital",
      color: "from-blue-100/80 to-blue-200/80 dark:from-blue-900/40 dark:to-blue-800/40"
    },
    {
      id: 2,
      title: "Favorite Snack",
      description: "Choose your favorite snack for today",
      cost: 15,
      icon: "🍪",
      category: "Food",
      color: "from-orange-100/80 to-orange-200/80 dark:from-orange-900/40 dark:to-orange-800/40"
    },
    {
      id: 3,
      title: "Stay Up Late",
      description: "Stay up 1 hour past bedtime",
      cost: 30,
      icon: "🌙",
      category: "Time",
      color: "from-purple-100/80 to-purple-200/80 dark:from-purple-900/40 dark:to-purple-800/40"
    },
    {
      id: 4,
      title: "Movie Night Choice",
      description: "Pick the family movie for tonight",
      cost: 20,
      icon: "🎬",
      category: "Entertainment",
      color: "from-red-100/80 to-red-200/80 dark:from-red-900/40 dark:to-red-800/40"
    },
    {
      id: 5,
      title: "Friend Playdate",
      description: "Invite a friend over to play",
      cost: 40,
      icon: "👫",
      category: "Social",
      color: "from-green-100/80 to-green-200/80 dark:from-green-900/40 dark:to-green-800/40"
    },
    {
      id: 6,
      title: "Special Outing",
      description: "Choose a special place to visit",
      cost: 50,
      icon: "🎡",
      category: "Adventure",
      color: "from-pink-100/80 to-pink-200/80 dark:from-pink-900/40 dark:to-pink-800/40"
    },
    {
      id: 7,
      title: "Art Supplies",
      description: "Get new crayons, markers, or paper",
      cost: 35,
      icon: "🎨",
      category: "Creative",
      color: "from-yellow-100/80 to-yellow-200/80 dark:from-yellow-900/40 dark:to-yellow-800/40"
    },
    {
      id: 8,
      title: "Book of Choice",
      description: "Pick a new book from the store",
      cost: 45,
      icon: "📚",
      category: "Learning",
      color: "from-indigo-100/80 to-indigo-200/80 dark:from-indigo-900/40 dark:to-indigo-800/40"
    }
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (totalCoins >= reward.cost && !redeemedItems.includes(reward.id)) {
      setRedeemedItems([...redeemedItems, reward.id]);

      toast({
        title: "Reward Redeemed! 🎉",
        description: `${currentChildName} redeemed: ${reward.title}`,
      });
    } else if (totalCoins < reward.cost) {
      toast({
        title: "Not Enough Coins",
        description: `You need ${reward.cost - totalCoins} more coins for this reward.`,
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Digital': return <Sparkles className="w-4 h-4" />;
      case 'Food': return <Gift className="w-4 h-4" />;
      case 'Time': return <Crown className="w-4 h-4" />;
      case 'Entertainment': return <Star className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen app-gradient dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {isMobile && <MobileHeader />}

      <main className={`${isMobile ? 'pt-16 pb-20' : 'pt-6'} px-4 max-w-4xl mx-auto`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 dark:hover:bg-slate-800/50 backdrop-blur-sm premium-focus"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <Gift className="w-6 h-6 mr-2 text-coral dark:text-orange-400" />
                Redeem Rewards
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">{currentChildName}'s reward store</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100/80 to-amber-100/80 dark:from-yellow-900/40 dark:to-amber-900/40 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-200 dark:border-yellow-700 shadow-lg">
            <Coins className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{totalCoins} coins</span>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {rewards.map((reward) => {
            const isRedeemed = redeemedItems.includes(reward.id);
            const canAfford = totalCoins >= reward.cost;

            return (
              <Card
                key={reward.id}
                className={`premium-card p-4 rounded-2xl border transition-all duration-300 glass-card backdrop-blur-xl shadow-lg ${isRedeemed
                  ? 'bg-green-50/80 dark:bg-green-900/30 border-green-200 dark:border-green-700'
                  : canAfford
                    ? 'bg-white/80 dark:bg-slate-800/80 border-white/30 dark:border-slate-600/30 hover:shadow-xl hover:scale-105 cursor-pointer'
                    : 'bg-gray-50/60 dark:bg-slate-800/40 border-gray-300 dark:border-slate-700 opacity-60'
                  }`}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${reward.color} backdrop-blur-sm mb-3 shadow-inner`}>
                  <div className="text-3xl text-center filter drop-shadow-sm">{reward.icon}</div>
                </div>

                <div className="text-center mb-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">{reward.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{reward.description}</p>

                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center backdrop-blur-sm ${reward.category === 'Digital' ? 'bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                      reward.category === 'Food' ? 'bg-orange-100/80 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' :
                        reward.category === 'Time' ? 'bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' :
                          reward.category === 'Entertainment' ? 'bg-red-100/80 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                            reward.category === 'Social' ? 'bg-green-100/80 dark:bg-green-900/40 text-green-700 dark:text-green-300' :
                              reward.category === 'Adventure' ? 'bg-pink-100/80 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300' :
                                reward.category === 'Creative' ? 'bg-yellow-100/80 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' :
                                  'bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                      }`}>
                      {getCategoryIcon(reward.category)}
                      <span className="ml-1">{reward.category}</span>
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  {isRedeemed ? (
                    <div className="flex items-center justify-center text-green-600 dark:text-green-400 font-medium text-sm">
                      <Gift className="w-4 h-4 mr-1" />
                      Redeemed!
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleRedeem(reward)}
                      disabled={!canAfford}
                      size="sm"
                      className={`w-full text-xs shadow-md ${canAfford
                        ? 'btn-premium backdrop-blur-sm'
                        : 'bg-gray-300/80 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed backdrop-blur-sm'
                        }`}
                    >
                      <Coins className="w-3 h-3 mr-1" />
                      {reward.cost} coins
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Redeemed Items Summary */}
        {redeemedItems.length > 0 && (
          <Card className="premium-card p-6 rounded-2xl bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700 glass-card backdrop-blur-xl shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3 filter drop-shadow-sm">🎁</div>
              <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2">Rewards Redeemed!</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                {currentChildName} has redeemed {redeemedItems.length} reward{redeemedItems.length > 1 ? 's' : ''} today!
              </p>
              <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-white/30 dark:border-slate-600/30">
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  Remember to ask your parents about using your rewards! 🎉
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>

      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default RedeemPage;
