export interface Transaction {
    id: number;
    parent_id: number;
    type: 'withdraw' | 'deposit';
    amount: string;
    closing_balance: string;
    classpackage_id: number | null;
    class_id: number | null;
    narration: string;
    created_at: string;
    updated_at: string;
    updated_by: number | null;
    deleted_at: string | null;
    currency: string;
    classschedulebooking_id: number | null;
}

export interface TransactionStats {
    total_booked: number;
    total_attended: number;
    total_pending: number;
    total_missed: number;
    total_cancelled: number;
    masterclasses_left: number;
    masterclasses_attended: number;
    available_balance: number;
    parent_currency: string;
}

export interface TransactionFilters {
    type?: 'withdraw' | 'deposit' | '';
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedTransactions {
    current_page: number;
    data: Transaction[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface TransactionsResponse {
    success: boolean;
    total_booked: number;
    total_attended: number;
    total_pending: number;
    total_missed: number;
    total_cancelled: number;
    transactions: PaginatedTransactions;
    masterclasses_left: number;
    masterclasses_attended: number;
    type: string | null;
    start_date: string | null;
    end_date: string | null;
    available_balance: number;
    parent_currency: string;
}

export interface TransactionsState {
    transactions: Transaction[];
    stats: TransactionStats;
    pagination: {
        currentPage: number;
        totalPages: number;
        total: number;
        perPage: number;
    };
    filters: TransactionFilters;
    isLoading: boolean;
    error: string | null;
} 