import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TransactionStats as TransactionStatsType } from '@/lib/interface/transactions';
import { TRANSACTION_STATS_CARDS, MASTERCLASS_STATS_CARDS, TRANSACTION_CONSTANTS } from '@/shared/constants/transactions';

interface TransactionStatsProps {
    stats: TransactionStatsType;
}

const TransactionStats: React.FC<TransactionStatsProps> = ({ stats }) => {
    const formatCurrency = (amount: number, currency: string) => {
        const symbol = TRANSACTION_CONSTANTS.CURRENCY_SYMBOLS[currency as keyof typeof TRANSACTION_CONSTANTS.CURRENCY_SYMBOLS] || currency;
        return `${symbol}${amount.toLocaleString()}`;
    };

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <div className="space-y-6">
            {/* Main Transaction Stats */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TRANSACTION_STATS_CARDS.map((card) => (
                        <Card key={card.key} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{card.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {card.key === 'available_balance'
                                                ? formatCurrency(stats[card.key as keyof TransactionStatsType] as number, stats.parent_currency)
                                                : formatNumber(stats[card.key as keyof TransactionStatsType] as number)
                                            }
                                        </p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center text-white text-xl`}>
                                        {card.icon}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Masterclass Stats */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Masterclass Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MASTERCLASS_STATS_CARDS.map((card) => (
                        <Card key={card.key} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{card.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {formatNumber(stats[card.key as keyof TransactionStatsType] as number)}
                                        </p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center text-white text-xl`}>
                                        {card.icon}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionStats; 