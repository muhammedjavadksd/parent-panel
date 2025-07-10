
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DailyChallengesPreviewProps {
  maxGames?: number;
}

const DailyChallengesPreview = ({ maxGames }: DailyChallengesPreviewProps) => {
  const navigate = useNavigate();

  const handleMoreGames = () => {
    navigate("/games");
  };

  const handlePlayGame = (gameId: string) => {
    navigate(`/games?game=${gameId}`);
  };

  const allGames = [
    {
      id: "math-sprint",
      title: "Math Sprint",
      description: "Quick math challenges",
      icon: "🧮",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "memory-palace",
      title: "Memory Palace",
      description: "Sanskrit word matching",
      icon: "🧠",
      bgColor: "bg-yellow-50",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      id: "number-detective",
      title: "Number Detective",
      description: "Find the pattern",
      icon: "🔍",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: "story-builder",
      title: "Story Builder",
      description: "Create amazing stories",
      icon: "✨",
      bgColor: "bg-yellow-50",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      id: "sanskrit-mantra",
      title: "Sanskrit Mantra",
      description: "Learn sacred sounds",
      icon: "🕉️",
      bgColor: "bg-white",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  const dailyGames = maxGames ? allGames.slice(0, maxGames) : allGames;

  return (
    <Card className="w-full p-6 rounded-3xl bg-white backdrop-blur-xl border border-blue-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <h3 className="text-lg font-bold text-blue-800 mb-6 text-center flex items-center justify-center space-x-2">
        <span className="text-2xl">🎯</span>
        <span>Daily Challenges</span>
      </h3>
      
      <div className="space-y-4">
        {dailyGames.map((game, index) => (
          <div 
            key={game.id}
            className={`p-4 ${game.bgColor} rounded-2xl border border-blue-200/50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg backdrop-blur-sm`}
          >
            <div className="text-center mb-3">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg border border-blue-200/50 backdrop-blur-sm">
                <span className="animate-pulse">{game.icon}</span>
              </div>
            </div>
            <h4 className="font-bold text-base text-blue-800 mb-2 text-center">
              {game.title}
            </h4>
            <p className="text-sm text-blue-700 mb-4 text-center">
              {game.description}
            </p>
            <Button 
              className={`w-full ${game.buttonColor} text-white text-sm py-3 h-12 transition-all duration-300 shadow-xl rounded-2xl font-semibold border border-blue-500/30`}
              onClick={() => handlePlayGame(game.id)}
            >
              Play Now
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button 
          variant="outline" 
          className="text-sm border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50/60 w-full transition-all duration-300 h-12 rounded-2xl shadow-lg backdrop-blur-sm font-semibold bg-white"
          onClick={handleMoreGames}
        >
          More Games
        </Button>
      </div>
    </Card>
  );
};

export default DailyChallengesPreview;
