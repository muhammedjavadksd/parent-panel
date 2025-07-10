import { apiClient } from '@/services/api';
import { TransactionsResponse, TransactionFilters } from '@/lib/interface/transactions';

export class TransactionService {
    async getTransactions(filters: TransactionFilters = {}): Promise<{ status: boolean; msg: string; data?: TransactionsResponse }> {
        try {
            // Clean up filters - only send non-empty values
            const cleanFilters: any = {};

            if (filters.type) {
                cleanFilters.type = filters.type;
            }
            if (filters.start_date && filters.start_date !== '') {
                cleanFilters.start_date = filters.start_date;
            }
            if (filters.end_date && filters.end_date !== '') {
                cleanFilters.end_date = filters.end_date;
            }
            if (filters.page) {
                cleanFilters.page = filters.page;
            }
            if (filters.limit) {
                cleanFilters.limit = filters.limit;
            }

            console.log('Sending filters to API:', cleanFilters);
            const response = await apiClient.get('/parent-panel/transactions', { params: cleanFilters });
            console.log('API Response:', response.data);

            return {
                status: true,
                msg: 'Transactions retrieved successfully',
                data: response.data
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || 'Failed to retrieve transactions'
            };
        }
    }
}

export const transactionService = new TransactionService(); 