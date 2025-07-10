
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Clock, CheckCircle, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DailyChallenges = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const navigate = useNavigate();

  const challenges = [
    {
      id: 1,
      title: "Morning Mantra",
      description: "Recite one Sanskrit verse",
      points: 10,
      timeEstimate: "2 min",
      icon: "🕉️",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Math Sprint",
      description: "Solve 5 quick problems",
      points: 15,
      timeEstimate: "5 min",
      icon: "🧮",
      difficulty: "Medium"
    }
  ];

  const handleCompleteChallenge = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
  };

  const totalPoints = completedChallenges.reduce((total, id) => {
    const challenge = challenges.find(c => c.id === id);
    return total + (challenge?.points || 0);
  }, 0);

  return (
    <Card className="p-4 rounded-3xl bg-white border border-blue-200 shadow-2xl backdrop-blur-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-blue-800 flex items-center">
          <Trophy className="w-4 h-4 mr-2 text-blue-600" />
          Daily Challenges
        </h3>
        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-yellow-200 px-3 py-1.5 rounded-full border border-yellow-300 shadow-lg">
          <Star className="w-3 h-3 text-yellow-600" />
          <span className="text-xs font-bold text-yellow-700">{totalPoints} pts</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id);
          
          return (
            <div 
              key={challenge.id}
              className={`p-3 rounded-2xl border transition-all backdrop-blur-sm ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-300 shadow-lg' 
                  : 'bg-white/90 border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-yellow-50 hover:border-blue-300 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <div className="text-lg">{challenge.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-blue-800 text-sm mb-1">
                      {challenge.title}
                    </h4>
                    <p className="text-xs text-blue-600 mb-1">{challenge.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-xs text-blue-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {challenge.timeEstimate}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                        challenge.difficulty === 'Easy' 
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300'
                          : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-300'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                {isCompleted ? (
                  <div className="flex items-center text-green-600 ml-2 bg-green-100 px-2 py-1 rounded-lg border border-green-300">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">+{challenge.points}</span>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => handleCompleteChallenge(challenge.id)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1 ml-2 min-h-[32px] shadow-lg border border-blue-400 hover:shadow-xl transition-all"
                  >
                    Start
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* More Games Button */}
      <Button 
        onClick={() => navigate('/games')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Gamepad2 className="w-4 h-4" />
        <span>More Games</span>
      </Button>

      {completedChallenges.length === challenges.length && (
        <div className="mt-3 p-3 bg-gradient-to-r from-yellow-100 via-blue-100 to-green-100 rounded-2xl text-center border border-yellow-300 shadow-lg">
          <div className="text-xl mb-1">🎉</div>
          <p className="text-sm font-bold text-blue-700">All challenges completed!</p>
          <p className="text-xs text-blue-600">You earned {totalPoints} points today!</p>
        </div>
      )}
    </Card>
  );
};

export default DailyChallenges;
