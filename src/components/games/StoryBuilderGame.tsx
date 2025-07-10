
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Star, RotateCcw, Sparkles } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

interface StoryPrompt {
  theme: string;
  words: string[];
  minWords: number;
}

const storyPrompts: StoryPrompt[] = [
  {
    theme: "Adventure in the Forest",
    words: ["brave", "mysterious", "ancient", "treasure", "journey"],
    minWords: 3
  },
  {
    theme: "Magical Kingdom",
    words: ["princess", "dragon", "castle", "magic", "friendship"],
    minWords: 3
  },
  {
    theme: "Space Exploration",
    words: ["astronaut", "planet", "stars", "spaceship", "discovery"],
    minWords: 3
  }
];

export const StoryBuilderGame = ({ onComplete }: { onComplete: (score: number, stars: number) => void }) => {
  const { gameState, startGame, endGame, incrementScore, resetGame } = useGameState('story-builder', 300);
  const [currentPrompt, setCurrentPrompt] = useState<StoryPrompt | null>(null);
  const [story, setStory] = useState('');
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (gameState.isActive && !currentPrompt) {
      generateNewPrompt();
    }
  }, [gameState.isActive]);

  useEffect(() => {
    if (gameState.isCompleted) {
      onComplete(gameState.score, gameState.stars);
    }
  }, [gameState.isCompleted, gameState.score, gameState.stars, onComplete]);

  const generateNewPrompt = () => {
    const randomPrompt = storyPrompts[Math.floor(Math.random() * storyPrompts.length)];
    setCurrentPrompt(randomPrompt);
    setStory('');
    setUsedWords([]);
    setSubmitted(false);
  };

  const handleWordClick = (word: string) => {
    if (usedWords.includes(word) || submitted) return;
    
    const newStory = story ? `${story} ${word}` : word;
    setStory(newStory);
    setUsedWords([...usedWords, word]);
  };

  const handleSubmitStory = () => {
    if (!currentPrompt || story.trim().length < 20) return;
    
    setSubmitted(true);
    
    // Calculate score based on story length and word usage
    const wordCount = story.trim().split(/\s+/).length;
    const requiredWordsUsed = currentPrompt.words.filter(word => 
      story.toLowerCase().includes(word.toLowerCase())
    ).length;
    
    const baseScore = Math.min(wordCount * 2, 50);
    const bonusScore = requiredWordsUsed * 10;
    const totalScore = baseScore + bonusScore;
    
    incrementScore(totalScore);
    
    setTimeout(() => {
      endGame();
    }, 3000);
  };

  const handleRestart = () => {
    resetGame();
    generateNewPrompt();
  };

  const clearStory = () => {
    setStory('');
    setUsedWords([]);
  };

  return (
    <div className="p-3 sm:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center">
          <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 mr-2 text-coral" />
          Story Builder
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
          <p className="text-sm sm:text-base text-gray-600 mb-4">Create amazing stories using the given words!</p>
          <Button onClick={startGame} className="bg-coral hover:bg-coral/90">
            Start Creating
          </Button>
        </div>
      )}

      {gameState.isActive && currentPrompt && (
        <div className="space-y-4 sm:space-y-6">
          <Card className="p-3 sm:p-4 bg-purple-50 border-purple-200">
            <h3 className="text-base sm:text-lg font-bold text-purple-700 mb-2">Story Theme:</h3>
            <p className="text-sm sm:text-base text-purple-600 mb-3">{currentPrompt.theme}</p>
            <div className="flex flex-wrap gap-2">
              {currentPrompt.words.map((word, index) => (
                <Button
                  key={index}
                  variant={usedWords.includes(word) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleWordClick(word)}
                  disabled={usedWords.includes(word) || submitted}
                  className={`text-xs sm:text-sm ${
                    usedWords.includes(word) 
                      ? "bg-purple-500 hover:bg-purple-500" 
                      : "hover:bg-purple-100"
                  }`}
                >
                  {word}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-700">Your Story:</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearStory}
                  disabled={submitted}
                  className="text-xs sm:text-sm"
                >
                  Clear
                </Button>
                <Button
                  onClick={handleSubmitStory}
                  disabled={story.trim().length < 20 || submitted}
                  className="bg-green-500 hover:bg-green-600 text-xs sm:text-sm"
                >
                  Submit Story
                </Button>
              </div>
            </div>
            
            <div className="min-h-[120px] sm:min-h-[150px] p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              {story ? (
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{story}</p>
              ) : (
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  Click the words above to build your story, or type your own...
                </p>
              )}
            </div>
            
            <div className="mt-2 text-xs sm:text-sm text-gray-500">
              Words: {story.trim() ? story.trim().split(/\s+/).length : 0} | 
              Required words used: {currentPrompt.words.filter(word => 
                story.toLowerCase().includes(word.toLowerCase())
              ).length}/{currentPrompt.words.length}
            </div>
          </Card>

          {submitted && (
            <Card className="p-3 sm:p-4 bg-green-50 border-green-200">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-2">📚</div>
                <h3 className="text-base sm:text-lg font-bold text-green-700 mb-2">Story Submitted!</h3>
                <p className="text-sm sm:text-base text-green-600">
                  Great creativity! Your story will be evaluated...
                </p>
              </div>
            </Card>
          )}
        </div>
      )}

      {gameState.isCompleted && (
        <Card className="p-4 sm:p-6 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">✨</div>
            <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">Story Complete!</h3>
            <p className="text-sm sm:text-base text-green-600 mb-4">
              Final Score: {gameState.score} points
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
              Create Another Story
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
