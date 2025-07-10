export const DASHBOARD_CONSTANTS = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    DEFAULT_PROGRESS_OVERVIEW: {
        total_classes: 0,
        past_classes: 0,
        streak: 0,
        coins: 0,
        rank: 0,
    },
    PROGRESS_BAR_COLORS: {
        classes: 'bg-blue-500',
        hours: 'bg-emerald-500',
        achievements: 'bg-amber-500',
        streak: 'bg-purple-500',
    },
    PROGRESS_BAR_GRADIENTS: {
        classes: 'from-blue-50 via-blue-50 to-blue-100',
        hours: 'from-emerald-50 via-emerald-50 to-emerald-100',
        achievements: 'from-amber-50 via-amber-50 to-amber-100',
        streak: 'from-purple-50 via-purple-50 to-purple-100',
    },
    PROGRESS_BAR_BORDERS: {
        classes: 'border-blue-200',
        hours: 'border-emerald-200',
        achievements: 'border-amber-200',
        streak: 'border-purple-200',
    },
    PROGRESS_BAR_TEXT_COLORS: {
        classes: 'text-blue-600',
        hours: 'text-emerald-600',
        achievements: 'text-amber-600',
        streak: 'text-purple-600',
    },
} as const; 