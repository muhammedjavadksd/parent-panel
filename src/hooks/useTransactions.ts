import { useCallback, useEffect, useState } from 'react';
import { transactionService } from '@/services/transactionService';
import { TransactionFilters, TransactionsResponse, TransactionStats } from '@/lib/interface/transactions';
import { TRANSACTION_CONSTANTS } from '@/shared/constants/transactions';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [stats, setStats] = useState<TransactionStats | null>(null);
    const [pagination, setPagination] = useState<any>(null);
    const [filters, setFilters] = useState<TransactionFilters>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Local state for filtered transactions
    const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

    // Filtering method
    const filterTransactions = useCallback((filterValues: Partial<TransactionFilters>) => {
        let filtered = [...transactions];
        if (filterValues.type) {
            filtered = filtered.filter(tx => tx.type === filterValues.type);
        }
        if (filterValues.start_date) {
            filtered = filtered.filter(tx => new Date(tx.created_at) >= new Date(filterValues.start_date!));
        }
        if (filterValues.end_date) {
            filtered = filtered.filter(tx => new Date(tx.created_at) <= new Date(filterValues.end_date!));
        }
        setFilteredTransactions(filtered);
    }, [transactions]);

    // Keep local state in sync with transactions state
    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    const loadTransactions = useCallback(async (filters: TransactionFilters = {}) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await transactionService.getTransactions(filters);

            if (response.status && response.data) {
                const transactionsData = response.data.transactions?.data || [];

                // Calculate pagination details
                const currentPage = response.data.transactions?.current_page || 1;
                const perPage = response.data.transactions?.per_page || 10;
                const total = response.data.transactions?.total || transactionsData.length;
                const totalPages = Math.ceil(total / perPage);

                // Set transactions and pagination
                setTransactions(transactionsData);
                setPagination({
                    currentPage,
                    perPage,
                    total,
                    totalPages,
                });

                // Extract and set stats
                const statsData: TransactionStats = {
                    total_booked: response.data.total_booked || 0,
                    total_attended: response.data.total_attended || 0,
                    total_pending: response.data.total_pending || 0,
                    total_missed: response.data.total_missed || 0,
                    total_cancelled: response.data.total_cancelled || 0,
                    masterclasses_left: response.data.masterclasses_left || 0,
                    masterclasses_attended: response.data.masterclasses_attended || 0,
                    available_balance: response.data.available_balance || 0,
                    parent_currency: response.data.parent_currency || '',
                };
                setStats(statsData);
            }
            else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load transactions');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadTransactionsWithPagination = useCallback(async (
        page: number = TRANSACTION_CONSTANTS.DEFAULT_PAGE,
        limit: number = TRANSACTION_CONSTANTS.DEFAULT_LIMIT,
        filters: Omit<TransactionFilters, 'page' | 'limit'> = {}
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await transactionService.getTransactions({ ...filters, page, limit });

            if (response.status && response.data) {
                setTransactions(response.data.transactions?.data || []);
                setPagination(response.data.transactions || null);

                // Extract stats from response
                const statsData: TransactionStats = {
                    total_booked: response.data.total_booked || 0,
                    total_attended: response.data.total_attended || 0,
                    total_pending: response.data.total_pending || 0,
                    total_missed: response.data.total_missed || 0,
                    total_cancelled: response.data.total_cancelled || 0,
                    masterclasses_left: response.data.masterclasses_left || 0,
                    masterclasses_attended: response.data.masterclasses_attended || 0,
                    available_balance: response.data.available_balance || 0,
                    parent_currency: response.data.parent_currency || '',
                };
                setStats(statsData);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load transactions');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateFilters = useCallback((newFilters: Partial<TransactionFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Reset local filtered state to transactions state
    const resetFilters = useCallback(() => {
        setFilters({});
        setFilteredTransactions(transactions);
    }, [transactions]);

    const changePage = useCallback((page: number) => {
        setFilters(prev => ({ ...prev, page }));
    }, []);

    const handleClearError = useCallback(() => {
        setError(null);
    }, []);

    // Load transactions on mount
    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    return {
        // Data
        transactions: filteredTransactions,
        stats,
        pagination,
        filters,
        isLoading,
        error,

        // Actions
        loadTransactions,
        loadTransactionsWithPagination,
        updateFilters,
        resetFilters,
        changePage,
        clearError: handleClearError,
        filterTransactions, // expose the filter method
    };
}; 