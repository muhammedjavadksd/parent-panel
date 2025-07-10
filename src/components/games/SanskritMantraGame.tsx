
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Star, RotateCcw, Volume2 } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

interface Mantra {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const mantras: Mantra[] = [
  {
    sanskrit: "ॐ",
    transliteration: "Om",
    meaning: "The sacred sound of the universe",
    difficulty: 'Easy'
  },
  {
    sanskrit: "ॐ गं गणपतये नमः",
    transliteration: "Om Gam Ganapataye Namaha",
    meaning: "Salutations to Lord Ganesha, remover of obstacles",
    difficulty: 'Medium'
  },
  {
    sanskrit: "ॐ नमो भगवते वासुदेवाय",
    transliteration: "Om Namo Bhagavate Vasudevaya",
    meaning: "Salutations to the Supreme Lord Vasudeva",
    difficulty: 'Hard'
  },
  {
    sanskrit: "सत्यम् शिवम् सुन्दरम्",
    transliteration: "Satyam Shivam Sundaram",
    meaning: "Truth, Goodness, Beauty",
    difficulty: 'Medium'
  }
];

export const SanskritMantraGame = ({ onComplete }: { onComplete: (score: number, stars: number) => void }) => {
  const { gameState, startGame, endGame, incrementScore, resetGame } = useGameState('sanskrit-mantra', 180);
  const [currentMantra, setCurrentMantra] = useState<Mantra | null>(null);
  const [currentStep, setCurrentStep] = useState<'learn' | 'practice' | 'recite'>('learn');
  const [recitationText, setRecitationText] = useState('');
  const [mantrasCompleted, setMantrasCompleted] = useState(0);

  useEffect(() => {
    if (gameState.isActive && !currentMantra) {
      loadNextMantra();
    }
  }, [gameState.isActive]);

  useEffect(() => {
    if (gameState.isCompleted) {
      onComplete(gameState.score, gameState.stars);
    }
  }, [gameState.isCompleted, gameState.score, gameState.stars, onComplete]);

  const loadNextMantra = () => {
    const mantra = mantras[mantrasCompleted % mantras.length];
    setCurrentMantra(mantra);
    setCurrentStep('learn');
    setRecitationText('');
  };

  const handleStepComplete = () => {
    if (currentStep === 'learn') {
      setCurrentStep('practice');
      incrementScore(10);
    } else if (currentStep === 'practice') {
      setCurrentStep('recite');
    } else if (currentStep === 'recite') {
      // Check recitation accuracy
      const accuracy = calculateAccuracy(recitationText, currentMantra?.transliteration || '');
      const points = Math.floor(accuracy * 30);
      incrementScore(points);
      
      setMantrasCompleted(prev => prev + 1);
      
      if (mantrasCompleted + 1 >= 3) {
        endGame();
      } else {
        loadNextMantra();
      }
    }
  };

  const calculateAccuracy = (input: string, target: string): number => {
    const inputWords = input.toLowerCase().trim().split(/\s+/);
    const targetWords = target.toLowerCase().trim().split(/\s+/);
    
    let matches = 0;
    const maxLength = Math.max(inputWords.length, targetWords.length);
    
    for (let i = 0; i < Math.min(inputWords.length, targetWords.length); i++) {
      if (inputWords[i] === targetWords[i]) {
        matches++;
      }
    }
    
    return maxLength > 0 ? matches / maxLength : 0;
  };

  const handleRestart = () => {
    resetGame();
    setCurrentMantra(null);
    setCurrentStep('learn');
    setRecitationText('');
    setMantrasCompleted(0);
  };

  const playAudio = () => {
    // Placeholder for audio functionality
    console.log('Playing audio for:', currentMantra?.transliteration);
  };

  return (
    <div className="p-3 sm:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-orange-500 mr-2">🕉️</span>
          Sanskrit Mantra
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
          <p className="text-sm sm:text-base text-gray-600 mb-4">Learn and recite beautiful Sanskrit mantras!</p>
          <Button onClick={startGame} className="bg-coral hover:bg-coral/90">
            Begin Learning
          </Button>
        </div>
      )}

      {gameState.isActive && currentMantra && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500 mb-2">
              Mantra {mantrasCompleted + 1} of 3
            </div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${currentStep === 'learn' ? 'bg-coral' : 'bg-gray-300'}`}></div>
              <div className={`w-2 h-2 rounded-full ${currentStep === 'practice' ? 'bg-coral' : 'bg-gray-300'}`}></div>
              <div className={`w-2 h-2 rounded-full ${currentStep === 'recite' ? 'bg-coral' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {currentStep === 'learn' && (
            <Card className="p-4 sm:p-6 bg-orange-50 border-orange-200">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-orange-700 mb-4">Learn the Mantra</h3>
                <div className="space-y-4">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-800 mb-2">
                    {currentMantra.sanskrit}
                  </div>
                  <div className="text-lg sm:text-xl text-orange-700">
                    {currentMantra.transliteration}
                  </div>
                  <Button
                    onClick={playAudio}
                    variant="outline"
                    className="mb-4"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen
                  </Button>
                  <div className="text-sm sm:text-base text-orange-600 bg-white/60 p-3 rounded-lg">
                    <strong>Meaning:</strong> {currentMantra.meaning}
                  </div>
                </div>
                <Button
                  onClick={handleStepComplete}
                  className="mt-4 bg-coral hover:bg-coral/90"
                >
                  I've Learned It
                </Button>
              </div>
            </Card>
          )}

          {currentStep === 'practice' && (
            <Card className="p-4 sm:p-6 bg-blue-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-4">Practice</h3>
                <div className="space-y-4">
                  <div className="text-xl sm:text-2xl font-bold text-blue-800">
                    {currentMantra.transliteration}
                  </div>
                  <p className="text-sm sm:text-base text-blue-600">
                    Practice pronouncing this mantra. Break it down syllable by syllable.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {currentMantra.transliteration.split(' ').map((word, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-white/60 rounded-lg text-sm sm:text-base font-medium text-blue-700"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleStepComplete}
                  className="mt-4 bg-coral hover:bg-coral/90"
                >
                  Ready to Recite
                </Button>
              </div>
            </Card>
          )}

          {currentStep === 'recite' && (
            <Card className="p-4 sm:p-6 bg-green-50 border-green-200">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-4">Recite the Mantra</h3>
                <p className="text-sm sm:text-base text-green-600 mb-4">
                  Type the mantra as you remember it:
                </p>
                <textarea
                  value={recitationText}
                  onChange={(e) => setRecitationText(e.target.value)}
                  placeholder="Type the mantra here..."
                  className="w-full p-3 border-2 border-green-200 rounded-lg text-center text-sm sm:text-base"
                  rows={3}
                />
                <div className="mt-4 text-xs sm:text-sm text-gray-500">
                  Reference: {currentMantra.transliteration}
                </div>
                <Button
                  onClick={handleStepComplete}
                  disabled={!recitationText.trim()}
                  className="mt-4 bg-coral hover:bg-coral/90"
                >
                  Submit Recitation
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {gameState.isCompleted && (
        <Card className="p-4 sm:p-6 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">🙏</div>
            <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">Mantras Complete!</h3>
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
              Learn More Mantras
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
