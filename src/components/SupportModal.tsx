
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare, Phone, Mail, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: "How do I join a class?",
    answer: "Click the 'Join' button on any upcoming class card 5 minutes before the scheduled time."
  },
  {
    question: "Where can I find class recordings?",
    answer: "Go to the Classes tab and look for past classes. Click 'Recording' to access saved sessions."
  },
  {
    question: "How do I reschedule a class?",
    answer: "Click 'Edit' on any upcoming class and select a new time slot that works for you."
  },
  {
    question: "How are points calculated?",
    answer: "You earn points for attending classes, completing homework, and achieving learning milestones."
  }
];

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter your message",
        variant: "destructive",
      });
      return;
    }

    // Send message logic would go here
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours!",
    });
    
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-coral" />
            Help & Support
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Tab Buttons */}
          <div className="flex space-x-2">
            <Button
              variant={activeTab === "faq" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("faq")}
              className="flex-1 text-xs"
            >
              FAQs
            </Button>
            <Button
              variant={activeTab === "contact" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("contact")}
              className="flex-1 text-xs"
            >
              Contact Us
            </Button>
          </div>

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-3">
                  <h4 className="font-medium text-sm text-gray-800 mb-2">{faq.question}</h4>
                  <p className="text-xs text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Card className="p-3 flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Call Us</p>
                    <p className="text-xs text-gray-600">+91 98765 43210</p>
                  </div>
                </Card>
                
                <Card className="p-3 flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Email Us</p>
                    <p className="text-xs text-gray-600">support@bambinos.com</p>
                  </div>
                </Card>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send us a message
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  rows={4}
                  className="resize-none"
                />
              </div>
              
              <Button 
                onClick={handleSendMessage}
                className="w-full bg-coral hover:bg-coral/90"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;
