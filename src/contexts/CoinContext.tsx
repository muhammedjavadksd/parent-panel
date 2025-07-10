
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CoinTransaction {
  id: string;
  type: 'class' | 'homework' | 'game';
  points: number;
  description: string;
  timestamp: Date;
  childId: string;
}

interface CoinBalance {
  priya: number;
  arjun: number;
  sara: number;
}

interface CoinContextType {
  balances: CoinBalance;
  transactions: CoinTransaction[];
  addCoins: (childId: string, type: 'class' | 'homework' | 'game', description: string) => void;
  getTotalCoins: (childId: string) => number;
  getRecentTransactions: (childId: string, limit?: number) => CoinTransaction[];
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

const POINTS_MAP = {
  class: 5,
  homework: 5,
  game: 5
};

export const CoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const addCoins = (childId: string, type: 'class' | 'homework' | 'game', description: string) => {
    const points = POINTS_MAP[type];
    const newTransaction: CoinTransaction = {
      id: Date.now().toString(),
      type,
      points,
      description,
      timestamp: new Date(),
      childId
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalances(prev => ({
      ...prev,
      [childId]: prev[childId as keyof CoinBalance] + points
    }));
  };

  const getTotalCoins = (childId: string) => {
    return balances[childId as keyof CoinBalance] || 0;
  };

  const getRecentTransactions = (childId: string, limit = 5) => {
    return transactions
      .filter(t => t.childId === childId)
      .slice(0, limit);
  };

  return (
    <CoinContext.Provider value={{
      balances,
      transactions,
      addCoins,
      getTotalCoins,
      getRecentTransactions
    }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
};
