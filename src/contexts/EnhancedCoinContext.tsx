
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

interface CoinTransaction {
  id: string;
  type: 'class' | 'homework' | 'game' | 'streak' | 'achievement' | 'bonus' | 'purchase';
  points: number;
  description: string;
  timestamp: Date;
  childId: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'digital' | 'physical' | 'privilege' | 'experience';
  icon: string;
  available: boolean;
}

interface CoinBalance {
  priya: number;
  arjun: number;
  sara: number;
}

interface EnhancedCoinContextType {
  balances: CoinBalance;
  transactions: CoinTransaction[];
  rewards: Reward[];
  addCoins: (childId: string, type: CoinTransaction['type'], description: string, bonus?: number) => void;
  spendCoins: (childId: string, amount: number, description: string) => boolean;
  getTotalCoins: (childId: string) => number;
  getRecentTransactions: (childId: string, limit?: number) => CoinTransaction[];
  purchaseReward: (childId: string, rewardId: string) => boolean;
  getFamilyTotalCoins: () => number;
  getWeeklyEarnings: (childId: string) => number;
}

const EnhancedCoinContext = createContext<EnhancedCoinContextType | undefined>(undefined);

const ENHANCED_POINTS_MAP = {
  class: 5,
  homework: 5,
  game: 5,
  streak: 10,
  achievement: 15,
  bonus: 0, // Variable
  purchase: 0 // Negative
};

const DEFAULT_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Extra Screen Time',
    description: '30 minutes of extra screen time',
    cost: 50,
    category: 'privilege',
    icon: '📱',
    available: true
  },
  {
    id: '2',
    name: 'Choose Dinner',
    description: 'Pick the family dinner for tonight',
    cost: 75,
    category: 'privilege',
    icon: '🍽️',
    available: true
  },
  {
    id: '3',
    name: 'New Storybook',
    description: 'Pick a new book from the store',
    cost: 100,
    category: 'physical',
    icon: '📚',
    available: true
  },
  {
    id: '4',
    name: 'Movie Night',
    description: 'Family movie night with your choice',
    cost: 150,
    category: 'experience',
    icon: '🎬',
    available: true
  },
  {
    id: '5',
    name: 'Digital Badge Pack',
    description: 'Unlock special avatar decorations',
    cost: 80,
    category: 'digital',
    icon: '🏆',
    available: true
  }
];

export const EnhancedCoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balances, setBalances] = useState<CoinBalance>({
    priya: 125,
    arjun: 180,
    sara: 95
  });

  const [transactions, setTransactions] = useState<CoinTransaction[]>([
    {
      id: '1',
      type: 'class',
      points: 5,
      description: 'Completed Little Yogi Class',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      childId: 'priya'
    },
    {
      id: '2',
      type: 'homework',
      points: 5,
      description: 'Math Practice Completed',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      childId: 'arjun'
    },
    {
      id: '3',
      type: 'game',
      points: 5,
      description: 'Memory Palace Game',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      childId: 'sara'
    }
  ]);

  const [rewards] = useState<Reward[]>(DEFAULT_REWARDS);
  const { addNotification } = useNotifications();

  const addCoins = (childId: string, type: CoinTransaction['type'], description: string, bonus = 0) => {
    const basePoints = ENHANCED_POINTS_MAP[type];
    const totalPoints = basePoints + bonus;
    
    const newTransaction: CoinTransaction = {
      id: Date.now().toString(),
      type,
      points: totalPoints,
      description,
      timestamp: new Date(),
      childId
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalances(prev => ({
      ...prev,
      [childId]: prev[childId as keyof CoinBalance] + totalPoints
    }));

    // Add notification for significant earnings
    if (totalPoints >= 10) {
      addNotification({
        type: 'achievement',
        title: 'Coins Earned!',
        message: `${childId} earned ${totalPoints} coins for ${description}`,
        childId
      });
    }
  };

  const spendCoins = (childId: string, amount: number, description: string): boolean => {
    const currentBalance = balances[childId as keyof CoinBalance];
    if (currentBalance < amount) return false;

    const newTransaction: CoinTransaction = {
      id: Date.now().toString(),
      type: 'purchase',
      points: -amount,
      description,
      timestamp: new Date(),
      childId
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalances(prev => ({
      ...prev,
      [childId]: prev[childId as keyof CoinBalance] - amount
    }));

    return true;
  };

  const getTotalCoins = (childId: string) => {
    return balances[childId as keyof CoinBalance] || 0;
  };

  const getRecentTransactions = (childId: string, limit = 5) => {
    return transactions
      .filter(t => t.childId === childId)
      .slice(0, limit);
  };

  const purchaseReward = (childId: string, rewardId: string): boolean => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || !reward.available) return false;

    const success = spendCoins(childId, reward.cost, `Purchased: ${reward.name}`);
    
    if (success) {
      addNotification({
        type: 'achievement',
        title: 'Reward Purchased!',
        message: `${childId} bought ${reward.name}!`,
        childId
      });
    }
    
    return success;
  };

  const getFamilyTotalCoins = () => {
    return Object.values(balances).reduce((sum, balance) => sum + balance, 0);
  };

  const getWeeklyEarnings = (childId: string) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return transactions
      .filter(t => t.childId === childId && t.timestamp >= weekAgo && t.points > 0)
      .reduce((sum, t) => sum + t.points, 0);
  };

  return (
    <EnhancedCoinContext.Provider value={{
      balances,
      transactions,
      rewards,
      addCoins,
      spendCoins,
      getTotalCoins,
      getRecentTransactions,
      purchaseReward,
      getFamilyTotalCoins,
      getWeeklyEarnings
    }}>
      {children}
    </EnhancedCoinContext.Provider>
  );
};

export const useEnhancedCoins = () => {
  const context = useContext(EnhancedCoinContext);
  if (context === undefined) {
    throw new Error('useEnhancedCoins must be used within an EnhancedCoinProvider');
  }
  return context;
};
