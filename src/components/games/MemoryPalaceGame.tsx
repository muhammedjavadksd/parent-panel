
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Star, RotateCcw } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

interface GameCard {
  id: number;
  sanskrit: string;
  meaning: string;
  type: 'sanskrit' | 'meaning';
  matchId: number;
}

const cardPairs = [
  { sanskrit: "नमस्ते", meaning: "Hello/Goodbye" },
  { sanskrit: "धन्यवाद", meaning: "Thank you" },
  { sanskrit: "शांति", meaning: "Peace" },
  { sanskrit: "आनंद", meaning: "Joy" },
  { sanskrit: "प्रेम", meaning: "Love" },
  { sanskrit: "सत्य", meaning: "Truth" }
];

export const MemoryPalaceGame = ({ onComplete }: { onComplete: (score: number, stars: number) => void }) => {
  const { gameState, startGame, endGame, incrementScore, incrementAttempts, resetGame } = useGameState('memory-palace', 120);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  useEffect(() => {
    initializeCards();
  }, []);

  useEffect(() => {
    if (gameState.isCompleted) {
      onComplete(gameState.score, gameState.stars);
    }
  }, [gameState.isCompleted, gameState.score, gameState.stars, onComplete]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      endGame();
    }
  }, [matchedCards.length, cards.length, endGame]);

  const initializeCards = () => {
    const gameCards: GameCard[] = [];
    cardPairs.forEach((pair, index) => {
      gameCards.push({
        id: index * 2,
        sanskrit: pair.sanskrit,
        meaning: pair.meaning,
        type: 'sanskrit',
        matchId: index
      });
      gameCards.push({
        id: index * 2 + 1,
        sanskrit: pair.sanskrit,
        meaning: pair.meaning,
        type: 'meaning',
        matchId: index
      });
    });
    
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameState.isActive || flippedCards.includes(cardId) || matchedCards.includes(cardId) || selectedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    const newSelectedCards = [...selectedCards, cardId];
    
    setFlippedCards(newFlippedCards);
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      incrementAttempts();
      const [firstCard, secondCard] = newSelectedCards.map(id => cards.find(card => card.id === id)!);
      
      if (firstCard.matchId === secondCard.matchId && firstCard.type !== secondCard.type) {
        // Match found!
        setTimeout(() => {
          setMatchedCards(prev => [...prev, ...newSelectedCards]);
          setSelectedCards([]);
          incrementScore(10);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards(prev => prev.filter(id => !newSelectedCards.includes(id)));
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    resetGame();
    setFlippedCards([]);
    setMatchedCards([]);
    setSelectedCards([]);
    initializeCards();
  };

  const isCardVisible = (cardId: number) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Memory Palace</h2>
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
          <p className="text-gray-600 mb-4">Match Sanskrit words with their English meanings!</p>
          <Button onClick={startGame} className="bg-coral hover:bg-coral/90">
            Start Game
          </Button>
        </div>
      )}

      {gameState.isActive && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`h-24 flex items-center justify-center cursor-pointer transition-all transform hover:scale-105 ${
                isCardVisible(card.id) 
                  ? matchedCards.includes(card.id)
                    ? 'bg-green-100 border-green-300'
                    : 'bg-blue-50 border-blue-300'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="text-center p-2">
                {isCardVisible(card.id) ? (
                  <span className="text-sm font-medium">
                    {card.type === 'sanskrit' ? card.sanskrit : card.meaning}
                  </span>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 rounded"></div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {gameState.isCompleted && (
        <div className="text-center bg-green-50 p-6 rounded-lg">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-green-700 mb-2">Game Complete!</h3>
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
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};
