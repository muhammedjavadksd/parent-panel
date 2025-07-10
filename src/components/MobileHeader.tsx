import { Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";
import { useChildren } from "@/hooks/useChildren";
import { Child } from "@/lib/types/children";

const MobileHeader = () => {
  const { children, selectedChild, selectChild, isLoading } = useChildren();
  const navigate = useNavigate();

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

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

  const handleChildChange = (childId: string) => {
    if (childId === "family") {
      selectChild(null);
    } else {
      const child = children.find(c => c.id.toString() === childId);
      selectChild(child || null);
    }
  };

  const currentValue = selectedChild ? selectedChild.id.toString() : "family";

  return (
    <div className="h-14 bg-white border-b border-blue-200/50 px-3 sm:px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 min-w-0 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
        <div className="min-w-0 flex-1">
          <h1 className="text-xs sm:text-sm font-semibold text-blue-800 truncate">
            Welcome back, {isLoading ? "Loading..." : getDisplayName()}! 👋
          </h1>
          <p className="text-xs text-blue-700 hidden sm:block">{currentTime}</p>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        <Select value={currentValue} onValueChange={handleChildChange} disabled={isLoading}>
          <SelectTrigger className="w-auto min-w-[80px] sm:min-w-[100px] h-8 border border-blue-300/50 text-xs min-h-[44px] sm:min-h-[32px] bg-white text-blue-700 px-2 shadow-lg hover:bg-blue-50/80 hover:border-blue-400/60 transition-all backdrop-blur-sm">
            <SelectValue>
              {isLoading ? "Loading..." : `${getDisplayAvatar()} ${getDisplayName()}`}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[60] bg-white border border-blue-200/50 shadow-2xl min-w-[200px] backdrop-blur-xl">
            {/* Family option */}
            <SelectItem
              value="family"
              className="text-xs sm:text-sm py-3 px-4 cursor-pointer hover:bg-yellow-100/80 text-blue-800 border-b border-blue-100/50 last:border-b-0 backdrop-blur-sm"
            >
              👨‍👩‍👧‍👦 Family
            </SelectItem>

            {/* Individual children */}
            {children.map((child) => (
              <SelectItem
                key={child.id}
                value={child.id.toString()}
                className="text-xs sm:text-sm py-3 px-4 cursor-pointer hover:bg-yellow-100/80 text-blue-800 border-b border-blue-100/50 last:border-b-0 backdrop-blur-sm"
              >
                {getChildAvatar(child)} {child.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="min-h-[44px] sm:min-h-[32px] flex items-center">
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
