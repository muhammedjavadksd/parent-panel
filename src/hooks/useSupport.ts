import { useCallback, useState } from 'react';
import { supportService } from '@/services/supportService';
import { TicketFilters, CreateTicketRequest, SendMessageRequest, TicketsResponse, TicketChatResponse } from '@/lib/interface/support';
import { SUPPORT_CONSTANTS } from '@/shared/constants/support';

export const useSupport = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState<number>(SUPPORT_CONSTANTS.DEFAULT_LIMIT);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<TicketFilters>({});
    const [chat, setChat] = useState<any>(null);

    const loadTickets = useCallback(async (filters: TicketFilters = {}) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await supportService.getTickets(filters);

            if (response.status && response.data) {
                setTickets(response.data.tickets || []);
                setTotal(response.data.total || 0);
                setCurrentPage(response.data.page || 1);
                setLimit(response.data.limit || SUPPORT_CONSTANTS.DEFAULT_LIMIT);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load tickets');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadTicketsWithPagination = useCallback(async (
        page: number = SUPPORT_CONSTANTS.DEFAULT_PAGE,
        limit: number = SUPPORT_CONSTANTS.DEFAULT_LIMIT,
        filters: Omit<TicketFilters, 'page' | 'limit'> = {}
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await supportService.getTickets({ ...filters, page, limit });

            if (response.status && response.data) {
                setTickets(response.data.tickets || []);
                setTotal(response.data.total || 0);
                setCurrentPage(response.data.page || 1);
                setLimit(response.data.limit || SUPPORT_CONSTANTS.DEFAULT_LIMIT);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load tickets');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createNewTicket = useCallback(async (data: CreateTicketRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await supportService.createTicket(data);

            if (response.status && response.data) {
                // Reload tickets after creating new one
                await loadTickets(filters);
                return { success: true, data: response.data };
            } else {
                setError(response.msg);
                return { success: false, error: response.msg };
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create ticket');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    }, [filters, loadTickets]);

    const updateFilters = useCallback((newFilters: Partial<TicketFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({});
    }, []);

    const changePage = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleClearError = useCallback(() => {
        setError(null);
    }, []);

    // Ticket Chat methods
    const loadTicketChat = useCallback(async (ticketId: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await supportService.getTicketChat(ticketId);

            if (response.status && response.data) {
                setChat(response.data);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load ticket chat');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const sendNewMessage = useCallback(async (data: SendMessageRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await supportService.sendMessage(data);

            if (response.status && response.data) {
                // Reload chat after sending message
                await loadTicketChat(data.ticket_id);
                return { success: true, data: response.data };
            } else {
                setError(response.msg);
                return { success: false, error: response.msg };
            }
        } catch (err: any) {
            setError(err.message || 'Failed to send message');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    }, [loadTicketChat]);

    const handleClearChatError = useCallback(() => {
        setError(null);
    }, []);

    const handleClearChat = useCallback(() => {
        setChat(null);
    }, []);

    // Direct service call method (bypasses Redux)
    const callServiceDirectly = useCallback(async (filters: TicketFilters = {}) => {
        return await supportService.getTickets(filters);
    }, []);

    const totalPages = Math.ceil(total / limit);

    return {
        // Ticket list methods
        tickets,
        total,
        currentPage,
        limit,
        totalPages,
        isLoading,
        error,
        filters,
        loadTickets,
        loadTicketsWithPagination,
        createNewTicket,
        updateFilters,
        resetFilters,
        changePage,
        clearError: handleClearError,
        callServiceDirectly,

        // Ticket chat methods
        chat,
        loadTicketChat,
        sendNewMessage,
        clearChatError: handleClearChatError,
        clearChat: handleClearChat,
    };
}; 