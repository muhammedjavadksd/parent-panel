export interface SupportTicket {
    id: number;
    subject: string;
    description: string;
    status: 'open' | 'closed' | 'pending';
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
    ticket_number: string;
    category?: string;
    assigned_to?: string;
    last_reply?: string;
}

export interface TicketFilters {
    status?: 'open' | 'closed' | 'pending';
    priority?: 'low' | 'medium' | 'high';
    page?: number;
    limit?: number;
}

export interface TicketsResponse {
    tickets: SupportTicket[];
    total: number;
    page: number;
    limit: number;
}

export interface TicketHistoryState {
    tickets: SupportTicket[];
    total: number;
    currentPage: number;
    limit: number;
    isLoading: boolean;
    error: string | null;
    filters: TicketFilters;
}

export interface CreateTicketRequest {
    issue: 'Booking Related' | 'Account Related' | 'Payment Related';
    title: string;
    description: string;
    attachment?: File;
}

export interface CreateTicketResponse {
    success: boolean;
    message: string;
    ticket_id: number;
}

// Ticket Chat Interfaces
export interface TicketMessage {
    id: number;
    supportticket_id: number;
    admin_id: number | null;
    faculty_id: number | null;
    parent_id: number;
    message: string;
    attachment: string | null;
    file_name: string | null;
    readby_admin: 'yes' | 'no';
    readby_teacher: 'yes' | 'no';
    readby_parent: 'yes' | 'no';
    internal_message: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    parent: {
        id: number;
        parent_name: string;
        father_name: string | null;
        mother_name: string | null;
        country_code: string;
        mobile_number: string;
        email: string;
        photo: string | null;
        available_points: number;
        relationship: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        whatsapp_number: string;
        whatsapp_country_code: string;
        prime_customer: string;
        booking_discount: string;
        currency: string;
        country: string;
        mobile_real: string;
        alternate_mobile: string;
        upgrade_panel: number;
        whatsapp_validation: number;
        is_premium: number;
        mail_subscription: number;
        masterclass: number;
        books: number;
        city: string;
        ssm: number;
        email_verified: number;
        mobile_verified: number;
        low_cost: number;
        masterclass_counter: number;
        unsubscribe_whatsapp: number;
        demo_block: number;
        active: number;
    };
    admin: any | null;
}

export interface TicketChatResponse {
    success: boolean;
    messages: TicketMessage[];
}

export interface TicketChatState {
    messages: TicketMessage[];
    isLoading: boolean;
    error: string | null;
    ticketId: number | null;
}

export interface SendMessageRequest {
    ticket_id: number;
    message: string;
    attachment?: File;
}

export interface SendMessageResponse {
    success: boolean;
    message: string;
    data?: {
        message_id: number;
    };
} 