import { Bell } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import ProfileDropdown from "./ProfileDropdown";
import LogoutButton from "./LogoutButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useChildren } from "@/hooks/useChildren";
import { Child } from "@/lib/types/children";

const Header = () => {
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
        {/* Classes Left Banner */}
        {/* <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg px-4 py-2 flex items-center space-x-3 shadow-sm">
          <div className="text-blue-700">
            <span className="font-bold text-lg">{classesLeft}</span>
            <span className="text-sm ml-1">classes left</span>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md shadow-sm border-0"
            onClick={() => navigate("/classes")}
          >
            Renew Now
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
