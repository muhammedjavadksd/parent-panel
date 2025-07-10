import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction } from '@/lib/interface/transactions';
import { TRANSACTION_TYPE_COLORS, TRANSACTION_TYPE_ICONS, TRANSACTION_CONSTANTS } from '@/shared/constants/transactions';
import { format } from 'date-fns';

interface TransactionListProps {
    transactions: Transaction[];
    isLoading: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, isLoading }) => {
    const formatCurrency = (amount: string, currency: string) => {
        const symbol = TRANSACTION_CONSTANTS.CURRENCY_SYMBOLS[currency as keyof typeof TRANSACTION_CONSTANTS.CURRENCY_SYMBOLS] || currency;
        const numericAmount = parseFloat(amount);
        return `${symbol}${numericAmount.toLocaleString()}`;
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), TRANSACTION_CONSTANTS.DATETIME_FORMAT);
        } catch {
            return dateString;
        }
    };

    const getTransactionTypeDisplay = (type: 'withdraw' | 'deposit') => {
        const icon = TRANSACTION_TYPE_ICONS[type];
        const colorClass = TRANSACTION_TYPE_COLORS[type];
        const label = type === 'withdraw' ? 'Withdrawal' : 'Deposit';

        return (
            <Badge className={colorClass}>
                <span className="mr-1">{icon}</span>
                {label}
            </Badge>
        );
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-gray-500">Loading transactions...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (transactions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <div className="text-gray-400 text-6xl mb-4">📊</div>
                        <p className="text-gray-500">No transactions found</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Token</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Date</TableHead>
                                {/* <TableHead>Currency</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        {getTransactionTypeDisplay(transaction.type)}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {/* {formatCurrency(transaction.amount, transaction.currency)} */}
                                        {transaction.amount}
                                    </TableCell>
                                    <TableCell>
                                        {/* {formatCurrency(transaction.closing_balance, transaction.currency)} */}
                                        {transaction.closing_balance}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate" title={transaction.narration}>
                                        {transaction.narration}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(transaction.created_at)}
                                    </TableCell>
                                    {/* <TableCell>
                                        <Badge variant="outline">
                                            {transaction.currency}
                                        </Badge>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default TransactionList; 