import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Clock, CheckCircle, ArrowLeft, Gamepad2, Brain, BookOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChildren } from "@/hooks/useChildren";
import { useCoins } from "@/contexts/CoinContext";
import { GameModal } from "@/components/GameModal";

const GamesPage = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { selectedChild } = useChildren();
  const { addCoins } = useCoins();

  const dailyChallenges = [
    {
      id: 1,
      title: "Morning Mantra",
      description: "Recite one Sanskrit verse",
      points: 10,
      timeEstimate: "2 min",
      icon: "🕉️",
      difficulty: "Easy",
      category: "Sanskrit",
      gameType: "sanskrit-mantra"
    },
    {
      id: 2,
      title: "Math Sprint",
      description: "Solve 5 quick problems",
      points: 15,
      timeEstimate: "5 min",
      icon: "🧮",
      difficulty: "Medium",
      category: "Math",
      gameType: "math-sprint"
    },
    {
      id: 3,
      title: "Story Time",
      description: "Read for 10 minutes",
      points: 20,
      timeEstimate: "10 min",
      icon: "📚",
      difficulty: "Easy",
      category: "Reading",
      gameType: "story-builder"
    }
  ];

  const miniGames = [
    {
      id: 4,
      title: "Memory Palace",
      description: "Match Sanskrit words with meanings",
      points: 25,
      timeEstimate: "8 min",
      icon: "🧠",
      difficulty: "Hard",
      category: "Memory",
      gameType: "memory-palace"
    },
    {
      id: 5,
      title: "Number Detective",
      description: "Find patterns in sequences",
      points: 20,
      timeEstimate: "6 min",
      icon: "🔍",
      difficulty: "Medium",
      category: "Logic",
      gameType: "number-detective"
    },
    {
      id: 6,
      title: "Story Builder",
      description: "Create stories with given words",
      points: 30,
      timeEstimate: "12 min",
      icon: "✨",
      difficulty: "Hard",
      category: "Creative",
      gameType: "story-builder"
    }
  ];

  const handleCompleteChallenge = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);

      // Find the challenge/game and award coins
      const allChallenges = [...dailyChallenges, ...miniGames];
      const challenge = allChallenges.find(c => c.id === challengeId);
      if (challenge) {
        addCoins(selectedChild?.id.toString() || "family", 'game', challenge.title);
      }
    }
  };

  const handlePlayGame = (gameId: number) => {
    const game = miniGames.find(g => g.id === gameId);
    if (game && game.gameType) {
      setSelectedGame(game.gameType);
      setGameModalOpen(true);
    } else {
      // Fallback for games without full implementation
      handleCompleteChallenge(gameId);
    }
  };

  const handleGameComplete = (score: number, stars: number) => {
    const game = miniGames.find(g => g.gameType === selectedGame);
    if (game) {
      handleCompleteChallenge(game.id);
    }
    setGameModalOpen(false);
    setSelectedGame('');
  };

  const totalPoints = completedChallenges.reduce((total, id) => {
    const allChallenges = [...dailyChallenges, ...miniGames];
    const challenge = allChallenges.find(c => c.id === id);
    return total + (challenge?.points || 0);
  }, 0);

  const GameCard = ({ challenge, isCompleted }: { challenge: any, isCompleted: boolean }) => (
    <Card className={`p-3 sm:p-4 rounded-xl border transition-all ${isCompleted
      ? 'bg-green-50 border-green-200'
      : 'bg-white border-gray-200 hover:shadow-md'
      }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <div className="text-xl sm:text-2xl flex-shrink-0">{challenge.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1 truncate">
              {challenge.title}
            </h4>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2 sm:line-clamp-1">{challenge.description}</p>
            <div className="flex items-center flex-wrap gap-1 sm:gap-2">
              <span className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">{challenge.timeEstimate}</span>
                <span className="sm:hidden">{challenge.timeEstimate.replace(' min', 'm')}</span>
              </span>
              <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${challenge.difficulty === 'Easy'
                ? 'bg-green-100 text-green-700'
                : challenge.difficulty === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
                }`}>
                <span className="hidden sm:inline">{challenge.difficulty}</span>
                <span className="sm:hidden">{challenge.difficulty.charAt(0)}</span>
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                <span className="hidden sm:inline">{challenge.category}</span>
                <span className="sm:hidden">{challenge.category.substring(0, 3)}</span>
              </span>
            </div>
          </div>
        </div>

        {isCompleted ? (
          <div className="flex items-center text-green-600 flex-shrink-0">
            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium">+{challenge.points}</span>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={() => challenge.gameType ? handlePlayGame(challenge.id) : handleCompleteChallenge(challenge.id)}
            className="bg-coral hover:bg-coral/90 text-white text-xs px-2 sm:px-3 py-1 flex-shrink-0"
          >
            Play
          </Button>
        )}
      </div>
    </Card>
  );

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
                <Gamepad2 className="w-6 h-6 mr-2 text-coral" />
                Games & Challenges
              </h1>
              <p className="text-sm text-gray-600">Learn while having fun! Earn 5 coins per game completed.</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full border border-orange-200">
            <Star className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-bold text-orange-600">{totalPoints} pts today</span>
          </div>
        </div>

        {/* Daily Challenges Section */}
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-orange-600" />
              Daily Challenges
            </h2>
            <span className="text-sm text-orange-600 font-medium">Reset in 8h 32m</span>
          </div>

          <div className="space-y-4">
            {dailyChallenges.map((challenge) => (
              <GameCard
                key={challenge.id}
                challenge={challenge}
                isCompleted={completedChallenges.includes(challenge.id)}
              />
            ))}
          </div>
        </Card>

        {/* Mini Games Section */}
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Interactive Mini Games
            </h2>
            <span className="text-sm text-blue-600 font-medium">Play anytime!</span>
          </div>

          <div className="space-y-4">
            {miniGames.map((game) => (
              <GameCard
                key={game.id}
                challenge={game}
                isCompleted={completedChallenges.includes(game.id)}
              />
            ))}
          </div>
        </Card>

        {/* Achievement Summary */}
        {completedChallenges.length > 0 && (
          <Card className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-lg font-bold text-green-700 mb-2">Great Progress!</h3>
              <p className="text-sm text-green-600 mb-4">
                You've completed {completedChallenges.length} challenges and earned {totalPoints} points today!
              </p>
              {completedChallenges.length >= 3 && (
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-700">🏆 Achievement Unlocked: Daily Warrior!</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </main>

      {isMobile && <BottomNavigation />}

      <GameModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
        gameType={selectedGame}
        onGameComplete={handleGameComplete}
      />
    </div>
  );
};

export default GamesPage;
