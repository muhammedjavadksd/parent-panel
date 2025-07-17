import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Paperclip, Download, User, MessageCircle, FileText } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { sendMessageSchema, sendMessageInitialValues } from '@/lib/schemas/supportSchemas';
import { TicketMessage } from '@/lib/interface/support';
import { TICKET_CHAT_CONSTANTS } from '@/shared/constants/support';
import { format } from 'date-fns';



// ✅ Add this new helper component inside your TicketChat.tsx file
const AttachmentDisplay = ({ message }: { message: TicketMessage }) => {
    if (!message.attachment || !message.file_name) return null;

    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(message.file_name);

    const isSentByUser = message.parent_id && !message.admin_id;
    const textColorClass = isSentByUser ? 'text-blue-100' : 'text-gray-600';

    // Image Preview
    if (isImage) {
        return (
            <div className="mt-2">
                <a href={`https://bambinos.live/${message.attachment}`} target="_blank" rel="noopener noreferrer">
                    <img
                        src={`https://bambinos.live/${message.attachment}`}
                        alt={message.file_name}
                        className="max-w-[200px] h-auto rounded-lg object-cover cursor-pointer border border-black/10 hover:opacity-90 transition-opacity"
                    />
                </a>
            </div>
        );
    }

    // Fallback for other file types
    return (
        <div className={`mt-2 p-2 flex items-center justify-between rounded-md bg-black/10 ${textColorClass}`}>
            <div className="flex items-center gap-2 truncate">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{message.file_name}</span>
            </div>
            <a
                href={`https://bambinos.live/${message.attachment}`}
                download={`https://bambinos.live/${message.attachment}`}
                title={`Download ${message.file_name}`}
                className="p-1 rounded-full hover:bg-black/20 transition-colors"
            >
                <Download className="w-4 h-4" />
            </a>
        </div>
    );
};



interface TicketChatProps {
    messages: TicketMessage[];
    isLoading: boolean;
    error: string | null;
    ticketId: number;
    onSendMessage: (data: { ticket_id: number; message: string; attachment?: File }) => Promise<any>;
    onClearError: () => void;
}

const TicketChat: React.FC<TicketChatProps> = ({
    messages,
    isLoading,
    error,
    ticketId,
    onSendMessage,
    onClearError,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (error) {
            onClearError();
        }
    }, [error, onClearError]);

    const handleSubmit = async (values: { message: string; attachment?: File }, { setSubmitting, resetForm }: any) => {
        try {
            const result = await onSendMessage({
                ticket_id: ticketId,
                message: values.message,
                attachment: values.attachment,
            });

            if (result.meta.requestStatus === 'fulfilled') {
                resetForm();
            }
        } catch (error) {
            // Error handling is done in the parent component
        } finally {
            setSubmitting(false);
        }
    };

    const formatMessageTime = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
        } catch {
            return dateString;
        }
    };

    const getInitials = (name: string) => {
        if (!name || typeof name !== 'string') {
            return 'U';
        }
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const isParentMessage = (message: TicketMessage) => {
        return message.parent_id && !message.admin_id && !message.faculty_id;
    };

    const isAdminMessage = (message: TicketMessage) => {
        return message.admin_id && !message.parent_id && !message.faculty_id;
    };

    const isFacultyMessage = (message: TicketMessage) => {
        return message.faculty_id && !message.parent_id && !message.admin_id;
    };

    const getMessageSenderName = (message: TicketMessage) => {
        if (isParentMessage(message)) {
            return message.parent?.parent_name || 'Parent';
        } else if (isAdminMessage(message)) {
            return message.admin?.name || 'Admin';
        } else if (isFacultyMessage(message)) {
            return 'Faculty';
        }
        return 'Unknown';
    };

    const getMessageSenderPhoto = (message: TicketMessage) => {
        if (isParentMessage(message)) {
            return message.parent?.photo || undefined;
        } else if (isAdminMessage(message)) {
            return message.admin?.photo || undefined;
        }
        return undefined;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        const file = event.target.files?.[0];
        if (file) {
            setFieldValue('attachment', file);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent, submitForm: () => void, isSubmitting: boolean) => {
        if (event.key === 'Enter' && !event.shiftKey && !isSubmitting) {
            event.preventDefault();
            submitForm();
        }
    };

    const handleFileButtonClick = (fileInputRef: React.RefObject<HTMLInputElement>) => {
        fileInputRef.current?.click();
    };

    const downloadAttachment = (attachment: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = attachment;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading && messages.length === 0) {
        return (
            <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Loading messages...</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Ticket #{ticketId}</h3>
                        <p className="text-sm text-gray-500">
                            {messages.length} message{messages.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                        Support Chat
                    </Badge>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${isParentMessage(message) ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[70%] ${isParentMessage(message) ? 'flex-row-reverse' : 'flex-row'}`}>
                                <Avatar className={`w-8 h-8 ${isParentMessage(message) ? 'ml-2' : 'mr-2'}`}>
                                    <AvatarImage src={getMessageSenderPhoto(message)} />
                                    <AvatarFallback className="text-xs">
                                        {getInitials(getMessageSenderName(message))}
                                    </AvatarFallback>
                                </Avatar>

                                <div className={`flex flex-col ${isParentMessage(message) ? 'items-end' : 'items-start'}`}>
                                    {!isParentMessage(message) && (
                                        <div className="text-xs text-gray-500 mb-1">
                                            {getMessageSenderName(message)}
                                        </div>
                                    )}
                                    <div className={`rounded-lg px-3 py-2 ${isParentMessage(message)
                                        ? 'bg-blue-600 text-white'
                                        : isAdminMessage(message)
                                            ? 'bg-green-600 text-white'
                                            : isFacultyMessage(message)
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-900'
                                        }`}>
                                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>

                                        
                                        <AttachmentDisplay message={message} />
                                    </div>

                                    <div className={`mt-1 text-xs text-gray-500 ${isParentMessage(message) ? 'text-right' : 'text-left'}`}>
                                        {formatMessageTime(message.created_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <Separator />

            {/* Message Input */}
            <div className="p-4">
                <Formik
                    initialValues={sendMessageInitialValues}
                    validationSchema={sendMessageSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched, setFieldValue, values, submitForm }) => {
                        const fileInputRef = React.useRef<HTMLInputElement>(null);

                        return (
                            <Form className="space-y-3">
                                <div className="flex items-end space-x-2">
                                    <div className="flex-1">
                                        <Field
                                            as={Textarea}
                                            name="message"
                                            placeholder={`Type your message... (${TICKET_CHAT_CONSTANTS.KEYBOARD_SHORTCUTS.SEND_MESSAGE} to send, ${TICKET_CHAT_CONSTANTS.KEYBOARD_SHORTCUTS.NEW_LINE} for new line)`}
                                            rows={3}
                                            className={`resize-none ${errors.message && touched.message ? 'border-red-500' : ''
                                                }`}
                                            onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, submitForm, isSubmitting)}
                                        />
                                        <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="hidden"
                                            accept={TICKET_CHAT_CONSTANTS.ALLOWED_ATTACHMENT_TYPES.join(',')}
                                            onChange={(e) => handleFileChange(e, setFieldValue)}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-10 w-10 p-0"
                                            onClick={() => handleFileButtonClick(fileInputRef)}
                                            title="Attach file (Images, PDF, Text files up to 5MB)"
                                        >
                                            <Paperclip className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || isLoading}
                                            className="h-10 w-10 p-0"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {values.attachment && (
                                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                        <Paperclip className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">{values.attachment.name}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs"
                                            onClick={() => setFieldValue('attachment', undefined)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{error}</p>
                                    </div>
                                )}
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Card>
    );
};

export default TicketChat; 