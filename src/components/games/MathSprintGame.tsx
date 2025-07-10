
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Star, RotateCcw, Calculator } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

interface MathProblem {
  question: string;
  answer: number;
  options: number[];
}

const generateProblem = (level: number): MathProblem => {
  const operations = ['+', '-', '×'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1: number, num2: number, answer: number;
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * (10 * level)) + 1;
      num2 = Math.floor(Math.random() * (10 * level)) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * (10 * level)) + 10;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
      break;
    case '×':
      num1 = Math.floor(Math.random() * (5 * level)) + 1;
      num2 = Math.floor(Math.random() * (5 * level)) + 1;
      answer = num1 * num2;
      break;
    default:
      num1 = 1; num2 = 1; answer = 2;
  }
  
  const question = `${num1} ${operation} ${num2}`;
  
  // Generate wrong options
  const options = [answer];
  while (options.length < 4) {
    const wrongAnswer = answer + (Math.floor(Math.random() * 10) - 5);
    if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }
  
  return {
    question,
    answer,
    options: options.sort(() => Math.random() - 0.5)
  };
};

export const MathSprintGame = ({ onComplete }: { onComplete: (score: number, stars: number) => void }) => {
  const { gameState, startGame, endGame, incrementScore, incrementAttempts, resetGame } = useGameState('math-sprint', 120);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (gameState.isActive && !currentProblem) {
      generateNewProblem();
    }
  }, [gameState.isActive]);

  useEffect(() => {
    if (gameState.isCompleted) {
      onComplete(gameState.score, gameState.stars);
    }
  }, [gameState.isCompleted, gameState.score, gameState.stars, onComplete]);

  const generateNewProblem = () => {
    const level = Math.floor(problemsCompleted / 5) + 1;
    setCurrentProblem(generateProblem(Math.min(level, 3)));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answer: number) => {
    if (showFeedback || !currentProblem) return;
    
    setSelectedAnswer(answer);
    incrementAttempts();
    
    const isCorrect = answer === currentProblem.answer;
    
    if (isCorrect) {
      const streakBonus = Math.min(streak, 5);
      const points = 10 + streakBonus;
      incrementScore(points);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setProblemsCompleted(prev => prev + 1);
      if (problemsCompleted + 1 >= 15) {
        endGame();
      } else {
        generateNewProblem();
      }
    }, 1500);
  };

  const handleRestart = () => {
    resetGame();
    setCurrentProblem(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setProblemsCompleted(0);
    setStreak(0);
  };

  return (
    <div className="p-3 sm:p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center">
          <Calculator className="w-5 sm:w-6 h-5 sm:h-6 mr-2 text-coral" />
          Math Sprint
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 text-gray-600">
            <Timer className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="font-mono text-sm sm:text-base">
              {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-yellow-600">
            <Star className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="font-bold text-sm sm:text-base">{gameState.score}</span>
          </div>
        </div>
      </div>

      {!gameState.isActive && !gameState.isCompleted && (
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600 mb-4">Solve math problems as fast as you can!</p>
          <Button onClick={startGame} className="bg-coral hover:bg-coral/90">
            Start Sprint
          </Button>
        </div>
      )}

      {gameState.isActive && currentProblem && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-xs sm:text-sm text-gray-500">Problem {problemsCompleted + 1} of 15</div>
              {streak > 0 && (
                <div className="text-xs sm:text-sm text-orange-600 font-bold">
                  🔥 Streak: {streak}
                </div>
              )}
            </div>
            
            <Card className="p-4 sm:p-6 bg-blue-50 border-blue-200">
              <div className="text-2xl sm:text-4xl font-bold text-blue-700 mb-4 sm:mb-6">
                {currentProblem.question} = ?
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {currentProblem.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                size="lg"
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`h-12 sm:h-16 text-lg sm:text-xl font-bold ${
                  showFeedback
                    ? option === currentProblem.answer
                      ? "bg-green-500 hover:bg-green-500 text-white"
                      : selectedAnswer === option
                        ? "bg-red-500 hover:bg-red-500 text-white"
                        : ""
                    : ""
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {showFeedback && (
            <Card className={`p-3 sm:p-4 text-center ${
              selectedAnswer === currentProblem.answer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <p className={`font-bold mb-2 text-sm sm:text-base ${
                selectedAnswer === currentProblem.answer ? 'text-green-700' : 'text-red-700'
              }`}>
                {selectedAnswer === currentProblem.answer ? '🎉 Correct!' : '❌ Incorrect'}
              </p>
              {selectedAnswer !== currentProblem.answer && (
                <p className="text-xs sm:text-sm text-gray-600">
                  The correct answer was {currentProblem.answer}
                </p>
              )}
            </Card>
          )}
        </div>
      )}

      {gameState.isCompleted && (
        <Card className="p-4 sm:p-6 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">🏃‍♂️</div>
            <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">Sprint Complete!</h3>
            <p className="text-sm sm:text-base text-green-600 mb-4">
              Score: {gameState.score} | Accuracy: {gameState.attempts > 0 ? Math.round((gameState.correctAnswers / gameState.attempts) * 100) : 0}%
            </p>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3].map(star => (
                <Star
                  key={star}
                  className={`w-5 sm:w-6 h-5 sm:h-6 ${star <= gameState.stars ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <Button onClick={handleRestart} className="bg-coral hover:bg-coral/90">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start New Sprint
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
