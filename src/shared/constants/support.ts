export const SUPPORT_CONSTANTS = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_PAGE_SIZE: 50,
    STATUS_OPTIONS: ['open', 'closed', 'pending'] as const,
    PRIORITY_OPTIONS: ['low', 'medium', 'high'] as const,
} as const;

export const TICKET_STATUS_OPTIONS = [
    { value: 'open', label: 'Open' },
    { value: 'pending', label: 'Pending' },
    { value: 'closed', label: 'Closed' },
] as const;

export const TICKET_PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
] as const;

export const TICKET_STATUS_COLORS = {
    open: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-gray-100 text-gray-800',
} as const;

export const TICKET_PRIORITY_COLORS = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
} as const;

export const TICKET_ISSUE_OPTIONS = [
    { value: 'Booking Related', label: 'Booking Related' },
    { value: 'Account Related', label: 'Account Related' },
    { value: 'Payment Related', label: 'Payment Related' },
] as const;

export const TICKET_FORM_CONSTANTS = {
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'] as const,
} as const;

export const TICKET_CHAT_CONSTANTS = {
    MAX_MESSAGE_LENGTH: 1000,
    MAX_ATTACHMENT_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_ATTACHMENT_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'] as const,
    MESSAGE_REFRESH_INTERVAL: 30000, // 30 seconds
    TYPING_INDICATOR_TIMEOUT: 3000, // 3 seconds
    SEND_MESSAGE_LOADING_TEXT: 'Sending...',
    SEND_MESSAGE_SUCCESS_TEXT: 'Message sent successfully',
    SEND_MESSAGE_ERROR_TEXT: 'Failed to send message',
    KEYBOARD_SHORTCUTS: {
        SEND_MESSAGE: 'Enter',
        NEW_LINE: 'Shift+Enter',
    } as const,
    FILE_UPLOAD: {
        MAX_SIZE_MB: 5,
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'],
        SIZE_ERROR: 'File size must be less than 5MB',
        TYPE_ERROR: 'Invalid file type. Allowed: Images, PDF, Text files',
    } as const,
} as const; 