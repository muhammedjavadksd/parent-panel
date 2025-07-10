import * as Yup from 'yup';
import { TRANSACTION_CONSTANTS } from '@/shared/constants/transactions';

export const transactionFiltersSchema = Yup.object().shape({
    type: Yup.string().oneOf(['withdraw', 'deposit', ''], 'Invalid transaction type').optional(),
    start_date: Yup.string().optional(),
    end_date: Yup.string().optional(),
    page: Yup.number().min(1, 'Page must be at least 1').optional(),
    limit: Yup.number().min(1, 'Limit must be at least 1').max(50, 'Limit cannot exceed 50').optional(),
});

export const transactionFiltersInitialValues = {
    type: '',
    start_date: '',
    end_date: '',
    page: TRANSACTION_CONSTANTS.DEFAULT_PAGE,
    limit: TRANSACTION_CONSTANTS.DEFAULT_LIMIT,
}; 