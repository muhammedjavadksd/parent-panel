
import { Home, BookOpen, Users, CreditCard, Trophy, HelpCircle, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
    name: "Roadmap",
    href: "/roadmap", 
    icon: Users
  },
  {
    name: "Experience",
    href: "/experience", 
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
  const isMobile = useIsMobile();

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 shadow-2xl z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center px-2 py-1.5 rounded-lg transition-all duration-200 min-w-0 flex-1",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                )}
              >
                <Icon size={18} className="mb-1" />
                <span className="text-xs font-medium text-center leading-tight truncate max-w-full">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Sidebar
  return (
    <div className="bg-white h-screen fixed left-0 top-0 w-16 sm:w-20 md:w-64 border-r-2 border-blue-200 shadow-xl z-40">
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex items-center space-x-2 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
            <img 
              src="/lovable-uploads/30afafae-05a4-4900-88a7-64c0e6f5f64d.png" 
              alt="Bambinos.live Logo" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          <span className="text-sm sm:text-lg md:text-xl font-bold text-blue-800 hidden md:block">Bambinos.live</span>
        </div>
        
        <nav className="space-y-1 sm:space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 border-2 group",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg border-blue-600" 
                    : "text-blue-700 hover:text-blue-800 border-transparent hover:border-blue-200 hover:bg-blue-50"
                )}
                title={item.name}
              >
                <Icon size={16} className="sm:w-5 sm:h-5 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm hidden md:block">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
