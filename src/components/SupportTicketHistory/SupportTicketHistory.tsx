import React, { useEffect } from 'react';
import { useSupport } from '@/hooks/useSupport';
import { TICKET_STATUS_OPTIONS, TICKET_PRIORITY_OPTIONS, TICKET_STATUS_COLORS, TICKET_PRIORITY_COLORS } from '@/shared/constants/support';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MessageSquare, Plus, Filter, X } from 'lucide-react';
import { format } from 'date-fns';

interface SupportTicketHistoryProps {
    onRaiseTicket: () => void;
}

export const SupportTicketHistory: React.FC<SupportTicketHistoryProps> = ({ onRaiseTicket }) => {
    const {
        tickets,
        total,
        currentPage,
        totalPages,
        isLoading,
        error,
        filters,
        loadTicketsWithPagination,
        updateFilters,
        resetFilters,
        changePage,
        clearError,
    } = useSupport();

    useEffect(() => {
        loadTicketsWithPagination(currentPage, 10, filters);
    }, [currentPage, filters, loadTicketsWithPagination]);

    const handleStatusChange = (status: string) => {
        updateFilters({ status: (status as "open" | "closed" | "pending") || undefined });
    };

    const handlePriorityChange = (priority: string) => {
        updateFilters({ priority: (priority as "low" | "medium" | "high") || undefined });
    };

    const handlePageChange = (page: number) => {
        changePage(page);
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch {
            return 'Invalid date';
        }
    };

    const isNoDataError = (msg: string | null) => {
        if (!msg) return false;
        return (
            msg.toLowerCase().includes('no tickets found') ||
            msg.toLowerCase().includes('no data found')
        );
    };

    if (error && isNoDataError(error)) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
                    <p className="text-gray-600 text-center mb-6">
                        You haven't created any support tickets yet. Need help? Create your first ticket.
                    </p>
                    <Button onClick={onRaiseTicket} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Raise Your First Ticket
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
                    <p className="text-gray-600">Manage and track your support requests</p>
                </div>
                <Button onClick={onRaiseTicket} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Raise Ticket
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <Select value={filters.status || ''} onValueChange={handleStatusChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Status</SelectItem>
                                    {TICKET_STATUS_OPTIONS.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <Select value={filters.priority || ''} onValueChange={handlePriorityChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Priorities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Priorities</SelectItem>
                                    {TICKET_PRIORITY_OPTIONS.map((priority) => (
                                        <SelectItem key={priority.value} value={priority.value}>
                                            {priority.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button variant="outline" onClick={resetFilters}>
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading tickets...</span>
                </div>
            )}

            {/* No Tickets State */}
            {!isLoading && tickets.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
                        <p className="text-gray-600 text-center mb-6">
                            {total === 0
                                ? "You haven't created any support tickets yet. Need help? Create your first ticket."
                                : "No tickets match your current filters. Try adjusting your search criteria."
                            }
                        </p>
                        <Button onClick={onRaiseTicket} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Raise Your First Ticket
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Tickets List */}
            {!isLoading && tickets.length > 0 && (
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                #{ticket.ticket_number} - {ticket.subject}
                                            </h3>
                                            <Badge className={TICKET_STATUS_COLORS[ticket.status]}>
                                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                            </Badge>
                                            <Badge className={TICKET_PRIORITY_COLORS[ticket.priority]}>
                                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Created: {formatDate(ticket.created_at)}</span>
                                            {ticket.updated_at !== ticket.created_at && (
                                                <span>Updated: {formatDate(ticket.updated_at)}</span>
                                            )}
                                            {ticket.category && <span>Category: {ticket.category}</span>}
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, total)} of {total} tickets
                    </p>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <PaginationItem key={pageNum}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(pageNum)}
                                            isActive={currentPage === pageNum}
                                            className="cursor-pointer"
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {/* Floating Raise Ticket Button */}
            <div className="fixed bottom-6 right-6">
                <Button
                    onClick={onRaiseTicket}
                    size="lg"
                    className="rounded-full shadow-lg"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Raise Ticket
                </Button>
            </div>
        </div>
    );
}; 