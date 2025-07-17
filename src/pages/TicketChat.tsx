import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useSupport } from '@/hooks/useSupport';
import TicketChat from '@/components/TicketChat/TicketChat';
import { toast } from 'sonner';
import { TICKET_CHAT_CONSTANTS } from '@/shared/constants/support';

const TicketChatPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const {
    chat,
    loadTicketChat,
    sendNewMessage,
    clearChatError,
    clearChat
  } = useSupport();

  useEffect(() => {
    if (ticketId) {
      const numericTicketId = parseInt(ticketId, 10);
      if (!isNaN(numericTicketId)) {
        loadTicketChat(numericTicketId);
      } else {
        toast.error('Invalid ticket ID');
        navigate('/support');
      }
    }
  }, [ticketId, loadTicketChat, navigate]);

  useEffect(() => {
    return () => {
      // Clear chat when component unmounts
      clearChat();
    };
  }, [clearChat]);

  const handleSendMessage = async (data: { ticket_id: number; message: string; attachment?: File }) => {
    try {
      const result = await sendNewMessage(data);

      if (result.success) {
        // Refresh the chat to get the latest messages
        await loadTicketChat(data.ticket_id);
        toast.success(TICKET_CHAT_CONSTANTS.SEND_MESSAGE_SUCCESS_TEXT);
      } else {
        toast.error(TICKET_CHAT_CONSTANTS.SEND_MESSAGE_ERROR_TEXT);
      }

      return result;
    } catch (error) {
      toast.error(TICKET_CHAT_CONSTANTS.SEND_MESSAGE_ERROR_TEXT);
      throw error;
    }
  };

  const handleBack = () => {
    navigate('/support');
  };

  if (!ticketId) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="lg:ml-64 flex flex-col">
          <Header onStartTour={() => {}} />
          <main className="flex-1 p-4 sm:p-6 pb-20 sm:pb-6">
            <div className="text-center py-6 sm:py-8">
              <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-500">Invalid ticket ID</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="lg:ml-64 flex flex-col">
        <Header onStartTour={() => {}} />

        <main className="flex-1 p-4 sm:p-6 pb-20 sm:pb-6">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="mb-3 sm:mb-4 border-blue-300 text-blue-700 hover:bg-blue-50 text-sm sm:text-base"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Support
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1 sm:mb-2">Support Ticket Chat</h1>
            <p className="text-sm sm:text-base text-blue-700">Chat with our support team about your ticket</p>
          </div>

          <div className="h-[calc(100vh-240px)] sm:h-[calc(100vh-200px)]">
            
            <TicketChat
              messages={chat?.messages ?? []}
              isLoading={chat?.isLoading ?? true}
              error={chat?.error ?? null}
              ticketId={parseInt(ticketId, 10)}
              onSendMessage={handleSendMessage}
              onClearError={clearChatError}
            />

          </div>
        </main>
      </div>
    </div>
  );
};

export default TicketChatPage;
