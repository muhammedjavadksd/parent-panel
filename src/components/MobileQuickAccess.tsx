
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const quickAccessData = [
  {
    title: "Analytics",
    icon: "📊",
    color: "bg-blue-600",
    id: "analytics",
    route: "/mobile-analytics"
  },
  {
    title: "Family",
    icon: "👨‍👩‍👧‍👦",
    color: "bg-yellow-500",
    id: "family",
    route: "/mobile-family-dashboard"
  },
  {
    title: "Events",
    icon: "🎉",
    color: "bg-blue-700",
    id: "events",
    route: "/events"
  },
  {
    title: "Homework",
    icon: "📚",
    color: "bg-yellow-400",
    id: "homework",
    route: "/homework"
  },
  {
    title: "Stories",
    icon: "📖",
    color: "bg-blue-500",
    id: "stories",
    route: "/stories"
  },
  {
    title: "Support",
    icon: "💬",
    color: "bg-yellow-600",
    id: "support",
    route: "/support"
  }
];

const MobileQuickAccess = () => {
  const navigate = useNavigate();

  const handleItemClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg">⚡</span>
        <h2 className="text-lg font-bold text-blue-800">Quick Access</h2>
      </div>
      
      {/* 2x3 Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {quickAccessData.map((item, index) => (
          <Card 
            key={index} 
            className="p-4 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer bg-white border border-blue-200 shadow-lg"
            onClick={() => handleItemClick(item.route)}
          >
            <div className="text-center">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white text-xl mx-auto mb-3 shadow-lg border border-white/30`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-blue-800 leading-tight">{item.title}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MobileQuickAccess;
