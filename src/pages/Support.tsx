import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, Ticket, Clock, CheckCircle, AlertCircle, MessageSquare, HelpCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSupport } from "@/hooks/useSupport";

const faqData = [
  {
    question: "How do I join a class?",
    answer: "Click on the 'Join Now' button on your dashboard or go to the Classes page and select the class you want to join. Make sure to test your camera and microphone before joining."
  },
  {
    question: "Can I reschedule my classes?",
    answer: "Yes, you can reschedule classes up to 2 hours before the scheduled time. Go to Upcoming Classes and click on the reschedule option. Please note that last-minute cancellations may incur charges."
  },
  {
    question: "How do I access recorded classes?",
    answer: "Recorded classes are available in the Past Classes section after the session ends. Click on 'Recording' to watch. Recordings are available for 30 days after the class."
  },
  {
    question: "What if I miss a class?",
    answer: "Don't worry! You can watch the recorded session and complete the homework. The class will still count towards your progress. Contact support if you need additional help."
  },
  {
    question: "How do I add money to my wallet?",
    answer: "Go to the Transactions page and click on 'Add Money'. You can use various payment methods including UPI, cards, and net banking. All transactions are secure and encrypted."
  },
  {
    question: "How can I contact my teacher?",
    answer: "You can contact your teacher through the Homework Room section where you can ask doubts. For urgent matters, use the support ticket system."
  }
];

const Support = () => {
  const navigate = useNavigate();
  const {
    tickets,
    isLoading,
    error,
    loadTickets,
    total,
    currentPage,
    changePage
  } = useSupport();

  useEffect(() => {
    loadTickets({ page: currentPage, limit: 5 });
  }, [loadTickets, currentPage]);

  const handleCall = () => {
    // window.location.href = "tel:+919403890176";
    window.location.href = "https://api.whatsapp.com/send/?phone=919403890176&text=Hello&type=phone_number&app_absent=0";
  };

  const handleEmail = () => {
    window.location.href = "mailto:support@bambinos.live";
  };

  const handleRaiseTicket = () => {
    navigate("/support/ticket");
  };

  const handleTicketClick = (ticketId: string) => {
    navigate(`/support/chat/${ticketId}`);
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "closed":
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />;
      case "open":
        return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "closed":
        return "bg-green-50 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "open":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const isNoDataError = (msg: string | null) => {
    if (!msg) return false;
    return (
      msg.toLowerCase().includes('no tickets found') ||
      msg.toLowerCase().includes('no data found')
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => {}} />

        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900">Support Center</h1>
                <p className="text-blue-700 text-sm sm:text-base">We're here to help you learn better - 24/7 support available</p>
              </div>
            </div>
          </div>

          {/* Quick Support Actions */}
          <Card className="p-3 sm:p-4 lg:p-8 rounded-xl sm:rounded-2xl bg-white border border-blue-100 shadow-xl mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">Quick Support</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <Card
                className="p-3 sm:p-4 lg:p-6 bg-green-50 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={handleCall}
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-800 mb-1 sm:mb-2">Whatsapp Support</h3>
                  <p className="text-xs sm:text-sm text-green-600 mb-2 sm:mb-4">Immediate assistance available</p>
                  <p className="text-xs text-green-600 font-mono">+91 9403890176</p>
                  <Button className="w-full mt-2 sm:mt-4 bg-green-600 hover:bg-green-700 text-white border-0 text-xs sm:text-sm">
                    Whatsapp Now
                  </Button>
                </div>
              </Card>

              <Card
                className="p-3 sm:p-4 lg:p-6 bg-blue-50 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={handleEmail}
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-blue-800 mb-1 sm:mb-2">Email Support</h3>
                  <p className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-4">Detailed assistance via email</p>
                  <p className="text-xs text-blue-600 font-mono">support@bambinos.live</p>
                  <Button className="w-full mt-2 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white border-0 text-xs sm:text-sm">
                    Send Email
                  </Button>
                </div>
              </Card>

              <Card
                className="p-3 sm:p-4 lg:p-6 bg-yellow-50 border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={handleRaiseTicket}
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <Ticket className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-yellow-800 mb-1 sm:mb-2">Raise Ticket</h3>
                  <p className="text-xs sm:text-sm text-yellow-600 mb-2 sm:mb-4">Create a support request</p>
                  <p className="text-xs text-yellow-600">Track your queries</p>
                  <Button className="w-full mt-2 sm:mt-4 bg-yellow-600 hover:bg-yellow-700 text-white border-0 text-xs sm:text-sm">
                    Create Ticket
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* FAQs */}
            <Card className="p-3 sm:p-4 lg:p-8 rounded-xl sm:rounded-2xl bg-white border border-blue-100 shadow-xl">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">Frequently Asked Questions</h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-blue-200">
                    <AccordionTrigger className="text-left text-blue-900 hover:text-blue-700 font-semibold text-xs sm:text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Ticket History */}
            <Card className="p-3 sm:p-4 lg:p-8 rounded-xl sm:rounded-2xl bg-white border border-blue-100 shadow-xl">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">Support Ticket History</h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {isLoading ? (
                  <div className="text-center py-6 sm:py-8 text-blue-600 text-sm sm:text-base">Loading tickets...</div>
                ) : error ? (
                  <div className="text-center py-6 sm:py-8 text-red-600 text-sm sm:text-base">{error}</div>
                ) : tickets.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">No tickets found.</div>
                ) : (
                  tickets.map((ticket) => (
                    <Card
                      key={ticket.id}
                      className="p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm cursor-pointer"
                      onClick={() => handleTicketClick(ticket.id.toString())}
                    >
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2 space-y-1 sm:space-y-0">
                            <span className="text-xs sm:text-sm font-bold text-blue-900">#{ticket.ticket_number}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)} w-fit`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(ticket.status)}
                                <span>{ticket.status ? ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1) : 'Unknown'}</span>
                              </div>
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)} w-fit`}>
                              {ticket.priority ? ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1) : 'Unknown'}
                            </span>
                          </div>
                          <h3 className="text-xs sm:text-sm font-semibold text-blue-900 mb-1 truncate">{ticket.subject}</h3>
                          <p className="text-xs text-blue-700 mb-2 line-clamp-2">{ticket.description}</p>
                          <p className="text-xs text-blue-600">{new Date(ticket.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              <Button
                onClick={handleRaiseTicket}
                className="w-full mt-4 sm:mt-6 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl py-2 sm:py-3 border-0 text-xs sm:text-sm"
              >
                <Ticket className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Raise New Ticket
              </Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;
