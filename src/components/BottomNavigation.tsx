
import { Home, BookOpen, Trophy, User, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'learning', label: 'Learning', icon: BookOpen, path: '/learning' },
    { id: 'classes', label: 'Classes', icon: Calendar, path: '/classes', isCenter: true },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
  ];

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 px-1 py-1 z-50 safe-area-inset-bottom shadow-xl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center rounded-lg transition-all duration-200 min-h-[48px] min-w-[48px] shadow-sm ${
                item.isCenter 
                  ? 'bg-blue-600 text-white px-3 py-2 transform scale-105 min-h-[52px] min-w-[52px] border-2 border-blue-700' 
                  : isActive 
                    ? 'text-blue-700 bg-yellow-100 p-1.5 border-2 border-yellow-300' 
                    : 'text-blue-600 p-1.5 bg-white hover:bg-blue-50 hover:text-blue-700 border border-blue-200'
              }`}
            >
              <Icon className={`${item.isCenter ? 'w-4 h-4' : 'w-3.5 h-3.5'} mb-0.5`} />
              <span className={`text-[9px] font-medium ${item.isCenter ? 'text-[9px]' : 'text-[8px]'} leading-tight`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
