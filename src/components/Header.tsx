import { Bell, Sparkles, Play } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import ProfileDropdown from "./ProfileDropdown";
import LogoutButton from "./LogoutButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useChildren } from "@/hooks/useChildren";
import { Child } from "@/lib/types/children";

interface HeaderProps {
  onStartTour: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartTour }) => {

  const navigate = useNavigate();
  const { children, selectedChild, selectChild, isLoading } = useChildren();

  console.log('🔍 Header: children context state:', { children, selectedChild, isLoading });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };



  const handleChildChange = (childId: string) => {
    console.log('🔍 Header: handleChildChange called with:', childId);
    if (childId === "family") {
      selectChild(null);
    } else {
      const child = children.find(c => c.id.toString() === childId);
      selectChild(child || null);
    }
  };

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  const classesLeft = 8;

  // Get avatar emoji based on child's age
  const getChildAvatar = (child: Child) => {
    if (child.age <= 3) return "👶";
    if (child.age <= 6) return "🧒";
    if (child.age <= 12) return child.name.toLowerCase().includes('boy') ? "👦" : "👧";
    return "👨‍🎓";
  };

  // Get display name
  const getDisplayName = () => {
    if (!selectedChild) return "Family";
    return selectedChild.name;
  };

  // Get display avatar
  const getDisplayAvatar = () => {
    if (!selectedChild) return "👨‍👩‍👧‍👦";
    return getChildAvatar(selectedChild);
  };

  return (
    <div className="h-16 bg-white border-b-2 border-blue-200 px-6 flex items-center justify-between shadow-lg sticky top-0 z-40">
      <div className="flex items-center space-x-6">
        <div>
          <h1 className="text-xl font-semibold text-blue-800">
            {getGreeting()}, {getDisplayName()}! ☀️
          </h1>
          <p className="text-sm text-blue-600">{currentTime}</p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-blue-700 font-medium">View:</span>
          <Select
            value={selectedChild ? selectedChild.id.toString() : "family"}
            onValueChange={handleChildChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-44 bg-white border-2 border-blue-200 text-blue-800 font-medium shadow-sm">
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <span>{getDisplayAvatar()}</span>
                  <span className="text-gray-800 font-medium">
                    {isLoading ? "Loading..." : getDisplayName()}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-blue-200 shadow-xl z-50">
              {/* Family option */}
              <SelectItem value="family" className="hover:bg-blue-50 text-gray-800 font-medium">
                <div className="flex items-center space-x-2">
                  <span>👨‍👩‍👧‍👦</span>
                  <div>
                    <div className="font-semibold text-gray-800">Family</div>
                    <div className="text-xs text-blue-600">Family View</div>
                  </div>
                </div>
              </SelectItem>

              {/* Individual children */}
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id.toString()} className="hover:bg-blue-50 text-gray-800 font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{getChildAvatar(child)}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{child.name}</div>
                      <div className="text-xs text-blue-600">Grade {child.grade}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-4">

        {/* Tour Button */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl px-4 py-2 flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={onStartTour}>
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors">
              Get Tour
            </span>

          </div>
          
          <Button
            size="sm"
            className="header-tour-btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-0 group-hover:scale-105"
          >
            <Play className="w-3 h-3 mr-1" />
            GO
          </Button>
        </div> */}

        <NotificationPanel />
        <ProfileDropdown />
        <LogoutButton
          variant="outline"
          size="sm"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        />
      </div>
    </div>
  );
};

export default Header;
