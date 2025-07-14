export const TRANSACTION_CONSTANTS = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_PAGE_SIZE: 50,
    TRANSACTION_TYPES: ['withdraw', 'deposit'] as const,
    CURRENCY_SYMBOLS: {
        INR: '₹',
        USD: '$',
        EUR: '€',
        GBP: '£',
    } as const,
    DATE_FORMAT: 'MMM dd, yyyy',
    TIME_FORMAT: 'HH:mm',
    DATETIME_FORMAT: 'MMM dd, yyyy HH:mm',
} as const;

export const TRANSACTION_TYPE_OPTIONS = [
    { value: 'withdraw', label: 'Booked' },
    { value: 'deposit', label: 'Cancelled' },
] as const;

export const TRANSACTION_TYPE_COLORS = {
    withdraw: 'text-red-600 bg-red-50',
    deposit: 'text-green-600 bg-green-50',
} as const;

export const TRANSACTION_TYPE_ICONS = {
    withdraw: '↓',
    deposit: '↑',
} as const;

export const TRANSACTION_STATS_CARDS = [
    {
        key: 'total_booked',
        label: 'Total Booked',
        color: 'bg-blue-500',
        icon: '📚',
    },
    {
        key: 'total_attended',
        label: 'Total Attended',
        color: 'bg-green-500',
        icon: '✅',
    },
    {
        key: 'total_pending',
        label: 'Total Pending',
        color: 'bg-yellow-500',
        icon: '⏳',
    },
    {
        key: 'total_missed',
        label: 'Total Missed',
        color: 'bg-red-500',
        icon: '❌',
    },
    {
        key: 'total_cancelled',
        label: 'Total Cancelled',
        color: 'bg-gray-500',
        icon: '🚫',
    },
    {
        key: 'available_balance',
        label: 'Available Tokens',
        color: 'bg-purple-500',
        icon: '💰',
    },
] as const;

export const MASTERCLASS_STATS_CARDS = [
    {
        key: 'masterclasses_left',
        label: 'Masterclasses Left',
        color: 'bg-indigo-500',
        icon: '🎓',
    },
    {
        key: 'masterclasses_attended',
        label: 'Masterclasses Attended',
        color: 'bg-teal-500',
        icon: '🎯',
    },
] as const; 