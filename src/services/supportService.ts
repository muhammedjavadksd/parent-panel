import { apiClient } from '@/services/api';
import { TicketFilters, TicketsResponse, CreateTicketRequest, CreateTicketResponse, TicketChatResponse, SendMessageRequest, SendMessageResponse } from '@/lib/interface/support';
import { SUPPORT_CONSTANTS } from '@/shared/constants/support';

export class SupportService {

    async getTickets(filters: TicketFilters = {}): Promise<{ status: boolean; msg: string; data?: TicketsResponse }> {
        try {
            const response = await apiClient.get(`/parent-panel/support/tickets`, { params: filters });
            return {
                status: true,
                msg: 'Tickets retrieved successfully',
                data: response.data
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || 'Failed to retrieve tickets'
            };
        }
    }

    async createTicket(data: CreateTicketRequest): Promise<{ status: boolean; msg: string; data?: CreateTicketResponse }> {
        try {
            const formData = new FormData();
            formData.append('issue', data.issue);
            formData.append('title', data.title);
            formData.append('description', data.description);

            if (data.attachment) {
                formData.append('attachment', data.attachment);
            }

            const response = await apiClient.post(`/parent-panel/support/store`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                status: true,
                msg: 'Ticket created successfully',
                data: response.data
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || 'Failed to create ticket'
            };
        }
    }

    async getTicketChat(ticketId: number): Promise<{ status: boolean; msg: string; data?: TicketChatResponse }> {
        try {
            const response = await apiClient.get(`/parent-panel/support/ticket/${ticketId}`);
            return {
                status: true,
                msg: 'Ticket chat retrieved successfully',
                data: response.data
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || 'Failed to retrieve ticket chat'
            };
        }
    }

    async sendMessage(data: SendMessageRequest): Promise<{ status: boolean; msg: string; data?: SendMessageResponse }> {
        try {
            const formData = new FormData();
            formData.append('message', data.message);

            if (data.attachment) {
                formData.append('attachment', data.attachment);
            }

            const response = await apiClient.post(`/parent-panel/support/sendmessage/${data.ticket_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                status: true,
                msg: 'Message sent successfully',
                data: response.data
            };
        } catch (error: any) {
            return {
                status: false,
                msg: error.response?.data?.message || 'Failed to send message'
            };
        }
    }
}

export const supportService = new SupportService(); 