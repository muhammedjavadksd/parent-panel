
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Star, RotateCcw, Search } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

interface Pattern {
  sequence: number[];
  missing: number;
  options: number[];
  rule: string;
}

const generatePattern = (level: number): Pattern => {
  const patterns = [
    // Arithmetic sequences
    () => {
      const start = Math.floor(Math.random() * 10) + 1;
      const diff = Math.floor(Math.random() * 5) + 1;
      const sequence = [start, start + diff, start + 2*diff, start + 3*diff];
      const missing = start + 4*diff;
      return {
        sequence,
        missing,
        options: [missing, missing + diff, missing - diff, missing + 2*diff].sort(() => Math.random() - 0.5),
        rule: `Add ${diff} each time`
      };
    },
    // Geometric sequences
    () => {
      const start = Math.floor(Math.random() * 5) + 2;
      const ratio = 2;
      const sequence = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio];
      const missing = start * Math.pow(ratio, 4);
      return {
        sequence,
        missing,
        options: [missing, missing * 2, missing / 2, missing + start].sort(() => Math.random() - 0.5),
        rule: `Multiply by ${ratio} each time`
      };
    },
    // Fibonacci-like
    () => {
      const a = Math.floor(Math.random() * 3) + 1;
      const b = Math.floor(Math.random() * 3) + 2;
      const sequence = [a, b, a + b, a + 2*b];
      const missing = b + a + 2*b;
      return {
        sequence,
        missing,
        options: [missing, missing + a, missing + b, missing - a].sort(() => Math.random() - 0.5),
        rule: `Add previous two numbers`
      };
    }
  ];

  return patterns[Math.floor(Math.random() * patterns.length)]();
};

export const NumberDetectiveGame = ({ onComplete }: { onComplete: (score: number, stars: number) => void }) => {
  const { gameState, startGame, endGame, incrementScore, incrementAttempts, resetGame } = useGameState('number-detective', 180);
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    if (gameState.isActive && !currentPattern) {
      generateNewPattern();
    }
  }, [gameState.isActive]);

  useEffect(() => {
    if (gameState.isCompleted) {
      onComplete(gameState.score, gameState.stars);
    }
  }, [gameState.isCompleted, gameState.score, gameState.stars, onComplete]);

  const generateNewPattern = () => {
    setCurrentPattern(generatePattern(gameState.level));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answer: number) => {
    if (showFeedback || !currentPattern) return;
    
    setSelectedAnswer(answer);
    incrementAttempts();
    
    const isCorrect = answer === currentPattern.missing;
    
    if (isCorrect) {
      incrementScore(15);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setQuestionsAnswered(prev => prev + 1);
      if (questionsAnswered + 1 >= 10) {
        endGame();
      } else {
        generateNewPattern();
      }
    }, 2000);
  };

  const handleRestart = () => {
    resetGame();
    setCurrentPattern(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuestionsAnswered(0);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Search className="w-6 h-6 mr-2 text-coral" />
          Number Detective
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-600">
            <Timer className="w-4 h-4" />
            <span className="font-mono">{Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}</span>
          </div>
          <div className="flex items-center space-x-1 text-yellow-600">
            <Star className="w-4 h-4" />
            <span className="font-bold">{gameState.score}</span>
          </div>
        </div>
      </div>

      {!gameState.isActive && !gameState.isCompleted && (
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">Find the pattern and complete the sequence!</p>
          <Button onClick={startGame} className="bg-coral hover:bg-coral/90">
            Start Detective Work
          </Button>
        </div>
      )}

      {gameState.isActive && currentPattern && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Question {questionsAnswered + 1} of 10</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg mb-4">What comes next in this sequence?</p>
              <div className="flex items-center justify-center space-x-4 text-2xl font-bold">
                {currentPattern.sequence.map((num, index) => (
                  <span key={index} className="bg-white px-4 py-2 rounded-lg shadow">
                    {num}
                  </span>
                ))}
                <span className="text-coral">→</span>
                <span className="bg-coral/20 px-4 py-2 rounded-lg shadow text-coral">?</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentPattern.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                size="lg"
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`h-16 text-xl ${
                  showFeedback
                    ? option === currentPattern.missing
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
            <div className={`text-center p-4 rounded-lg ${
              selectedAnswer === currentPattern.missing ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`font-bold mb-2 ${
                selectedAnswer === currentPattern.missing ? 'text-green-700' : 'text-red-700'
              }`}>
                {selectedAnswer === currentPattern.missing ? '🎉 Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-sm text-gray-600">Pattern: {currentPattern.rule}</p>
            </div>
          )}
        </div>
      )}

      {gameState.isCompleted && (
        <div className="text-center bg-green-50 p-6 rounded-lg">
          <div className="text-4xl mb-2">🔍</div>
          <h3 className="text-xl font-bold text-green-700 mb-2">Case Closed!</h3>
          <p className="text-green-600 mb-4">
            Score: {gameState.score} | Accuracy: {gameState.attempts > 0 ? Math.round((gameState.correctAnswers / gameState.attempts) * 100) : 0}%
          </p>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3].map(star => (
              <Star
                key={star}
                className={`w-6 h-6 ${star <= gameState.stars ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <Button onClick={handleRestart} className="bg-coral hover:bg-coral/90">
            <RotateCcw className="w-4 h-4 mr-2" />
            Solve More Cases
          </Button>
        </div>
      )}
    </div>
  );
};
