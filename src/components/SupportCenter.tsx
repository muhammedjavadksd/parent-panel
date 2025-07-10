
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SupportCenterProps {
  onBack: () => void;
}

const SupportCenter = ({ onBack }: SupportCenterProps) => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50/80 to-white/90"
    },
    {
      icon: Phone,
      title: "Call Support",
      description: "Speak with an expert",
      color: "from-yellow-500 to-yellow-600", 
      bgColor: "from-yellow-50/80 to-white/90"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email",
      color: "from-blue-600 to-blue-700",
      bgColor: "from-blue-50/70 to-yellow-50/70"
    },
    {
      icon: FileText,
      title: "Help Articles",
      description: "Browse our knowledge base",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "from-yellow-50/80 to-blue-50/80"
    }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password' to reset your password.",
      category: "Account"
    },
    {
      question: "How do I track my child's progress?",
      answer: "Visit the Analytics section to view detailed progress reports and insights.",
      category: "Learning"
    },
    {
      question: "Can I add multiple children to my account?",
      answer: "Yes, you can add multiple children through the Family Dashboard.",
      category: "Family"
    },
    {
      question: "How do I contact my child's teacher?",
      answer: "Use the messaging feature in the Classes section to contact teachers directly.",
      category: "Classes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-yellow-50/40 p-4">
      {/* Header */}
      <div className="flex items-center mb-6 pt-16">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-3 p-3 bg-white/80 border-2 border-blue-200/60 hover:bg-blue-50/70 shadow-lg transition-all duration-300 rounded-xl backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 text-blue-600" />
        </Button>
        <h1 className="text-xl font-bold text-slate-800">Support Center</h1>
      </div>

      {/* Support Options */}
      <Card className="p-6 rounded-3xl mb-6 bg-white/95 backdrop-blur-xl border border-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
          <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
          Get Help
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className={`p-4 bg-gradient-to-r ${option.bgColor} rounded-2xl border border-blue-100/50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg backdrop-blur-sm cursor-pointer`}
            >
              <div className="text-center mb-3">
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-white/30 backdrop-blur-sm`}>
                  <option.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-sm text-slate-800 mb-1 text-center">
                {option.title}
              </h3>
              <p className="text-xs text-slate-600 text-center">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* FAQ Section */}
      <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-white/80 to-blue-50/50 rounded-2xl border border-blue-100/40 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-slate-800">{faq.question}</h3>
                <span className="text-xs bg-gradient-to-r from-yellow-100/80 to-blue-100/80 text-blue-700 px-3 py-1 rounded-xl border border-blue-200/50 shadow-md backdrop-blur-sm">
                  {faq.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6 rounded-3xl mt-6 bg-white/95 backdrop-blur-xl border border-yellow-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50/60 to-white/80 rounded-2xl border border-yellow-100/40 shadow-lg backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Phone Support</p>
              <p className="text-xs text-slate-600">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50/60 to-white/80 rounded-2xl border border-blue-100/40 shadow-lg backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Email Support</p>
              <p className="text-xs text-slate-600">support@learningapp.com</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupportCenter;
