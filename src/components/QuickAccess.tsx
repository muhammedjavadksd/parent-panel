
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const quickAccessData = [
  {
    title: "Schedule Class",
    description: "Quickly book your next class",
    icon: "📅",
    color: "from-blue-400 to-blue-600",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    route: "/classes"
  },
  {
    title: "Learning Hub",
    description: "Access recordings & PPTs",
    icon: "📚",
    color: "from-green-400 to-green-600",
    buttonColor: "bg-green-500 hover:bg-green-600",
    route: "/classes?tab=recordings"
  },
  {
    title: "Homework Hub",
    description: "Access homeworks & assignments",
    icon: "📝",
    color: "from-orange-400 to-orange-600",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    route: "/classes?tab=homework"
  },
  {
    title: "Events Hub",
    description: "View upcoming & past events",
    icon: "🎉",
    color: "from-purple-400 to-purple-600",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    route: "/events"
  },
  {
    title: "Refer Friends",
    description: "Invite friends and earn rewards",
    icon: "👥",
    color: "from-pink-400 to-pink-600",
    buttonColor: "bg-pink-500 hover:bg-pink-600",
    route: "/refer"
  },
  {
    title: "Transactions",
    description: "View your payment history",
    icon: "💳",
    color: "from-indigo-400 to-indigo-600",
    buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    route: "/transactions"
  },
  {
    title: "Stories",
    description: "Read interactive stories",
    icon: "📖",
    color: "from-yellow-400 to-yellow-600",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    route: "/stories"
  },
  {
    title: "Support",
    description: "Get help when you need it",
    icon: "💬",
    color: "from-teal-400 to-teal-600",
    buttonColor: "bg-teal-500 hover:bg-teal-600",
    route: "/support"
  }
];

const QuickAccess = () => {
  const navigate = useNavigate();

  const handleItemClick = (route: string) => {
    console.log(`Navigating to: ${route}`);
    navigate(route);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-xl filter drop-shadow-sm">⚡</span>
        <h2 className="text-xl font-bold text-orange-800">Quick Access</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAccessData.map((item, index) => (
          <Card key={index} className="p-6 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white/90 backdrop-blur-xl border-orange-200 cursor-pointer" onClick={() => handleItemClick(item.route)}>
            <div className="text-center mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-3 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-orange-800 mb-1">{item.title}</h3>
              <p className="text-sm text-orange-600 mb-4">{item.description}</p>
            </div>
            
            <Button className={`w-full ${item.buttonColor} text-white rounded-lg transition-colors`} onClick={(e) => { e.stopPropagation(); handleItemClick(item.route); }}>
              Access Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
