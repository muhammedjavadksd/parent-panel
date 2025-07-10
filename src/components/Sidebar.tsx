
import { Home, BookOpen, Users, CreditCard, Trophy, HelpCircle, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home
  },
  {
    name: "Classes", 
    href: "/classes",
    icon: BookOpen
  },
  {
    name: "Events",
    href: "/events", 
    icon: Users
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: CreditCard
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy
  },
  {
    name: "Support",
    href: "/support",
    icon: HelpCircle
  }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-white h-screen fixed left-0 top-0 w-64 border-r-2 border-blue-200 shadow-xl z-40">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
            <img 
              src="/lovable-uploads/30afafae-05a4-4900-88a7-64c0e6f5f64d.png" 
              alt="Bambinos.live Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-xl font-bold text-blue-800">Bambinos.live</span>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 border-2",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg border-blue-600" 
                    : "text-blue-700 hover:text-blue-800 border-transparent hover:border-blue-200 hover:bg-blue-50"
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
