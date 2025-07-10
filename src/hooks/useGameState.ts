
import { useState, useEffect, useCallback } from 'react';

export interface GameState {
  score: number;
  level: number;
  attempts: number;
  correctAnswers: number;
  timeRemaining: number;
  isActive: boolean;
  isCompleted: boolean;
  stars: number;
}

export interface GameStats {
  totalTime: number;
  accuracy: number;
  bestScore: number;
}

export const useGameState = (gameName: string, initialTime: number = 60) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    attempts: 0,
    correctAnswers: 0,
    timeRemaining: initialTime,
    isActive: false,
    isCompleted: false,
    stars: 0
  });

  const [gameStats, setGameStats] = useState<GameStats>({
    totalTime: 0,
    accuracy: 0,
    bestScore: 0
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isActive && gameState.timeRemaining > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (gameState.timeRemaining === 0 && gameState.isActive) {
      endGame();
    }

    return () => clearInterval(interval);
  }, [gameState.isActive, gameState.timeRemaining]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isActive: true,
      isCompleted: false,
      timeRemaining: initialTime
    }));
  }, [initialTime]);

  const endGame = useCallback(() => {
    const accuracy = gameState.attempts > 0 ? (gameState.correctAnswers / gameState.attempts) * 100 : 0;
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
    
    setGameState(prev => ({
      ...prev,
      isActive: false,
      isCompleted: true,
      stars
    }));

    setGameStats(prev => ({
      ...prev,
      accuracy,
      totalTime: initialTime - gameState.timeRemaining,
      bestScore: Math.max(prev.bestScore, gameState.score)
    }));
  }, [gameState.attempts, gameState.correctAnswers, gameState.score, gameState.timeRemaining, initialTime]);

  const incrementScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      correctAnswers: prev.correctAnswers + 1,
      attempts: prev.attempts + 1
    }));
  }, []);

  const incrementAttempts = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      attempts: prev.attempts + 1
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      score: 0,
      level: 1,
      attempts: 0,
      correctAnswers: 0,
      timeRemaining: initialTime,
      isActive: false,
      isCompleted: false,
      stars: 0
    });
  }, [initialTime]);

  return {
    gameState,
    gameStats,
    startGame,
    endGame,
    incrementScore,
    incrementAttempts,
    resetGame
  };
};
