import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, BarChart3, LogOut, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";
import { useDashboard } from "@/hooks/useDashboard";
import EditProfileModal from "./EditProfileModal";

const ProfileDropdown = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { selectedChild, isLoading: isChildLoading } = useChildren();
  const { progressOverview, isLoading: isProgressLoading } = useDashboard();

  const handleViewProfile = () => {
    navigate("/profile");
  };
  const handleViewAnalytics = () => {
    navigate("/analytics");
  };
  const handleViewFamily = () => {
    navigate("/family-analytics");
  };
  const handleSettings = () => {
    navigate("/settings");
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Loading state
  const isLoading = isChildLoading || isProgressLoading;

  // Avatar fallback: first letter of name or generic icon
  const avatarFallback = selectedChild?.name?.[0]?.toUpperCase() || "👤";

  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-yellow-100 dark:hover:bg-gray-700 transition-colors">
          <Avatar className="h-10 w-10 border-2 border-yellow-300 dark:border-yellow-500 shadow-lg">
            <AvatarImage src="" alt={selectedChild?.name || "Child"} />
            <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-lg">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4 bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-gray-600 shadow-2xl rounded-2xl z-50" align="end">
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-12 w-12 border-2 border-yellow-300 dark:border-yellow-500 shadow-lg">
              <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xl">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{selectedChild?.name || (isLoading ? "Loading..." : "No Child Selected")}</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">{selectedChild?.grade || "-"}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-yellow-200 dark:bg-gray-600" />

        <div className="py-3">
          <h4 className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-3">Progress Overview</h4>
          {isLoading ? (
            <div className="text-center text-gray-400 py-4">Loading...</div>
          ) : progressOverview?.progress_overview ?(
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-3 rounded-xl">
                <p className="text-blue-600 dark:text-blue-300 font-semibold">Classes</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">{progressOverview.progress_overview.past_classes}/{progressOverview.progress_overview.total_classes}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-3 rounded-xl">
                <p className="text-green-600 dark:text-green-300 font-semibold">Streak</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">{progressOverview.progress_overview.streak} days</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-3 rounded-xl">
                <p className="text-yellow-600 dark:text-yellow-300 font-semibold">Coins</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">{progressOverview.progress_overview.coins ?? 0}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-3 rounded-xl">
                <p className="text-purple-600 dark:text-purple-300 font-semibold">Rank</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">{progressOverview.progress_overview.rank ? `#${progressOverview.progress_overview.rank}` : '-'}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">No data</div>
          )}
        </div>

        <DropdownMenuSeparator className="bg-yellow-200 dark:bg-gray-600" />

        <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-xl p-3">
          <User className="mr-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">View Profile</span>
        </DropdownMenuItem>

        {/* Remove Family Analytics option */}

        {/* <DropdownMenuItem onClick={handleViewFamily} className="cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-700 rounded-xl p-3">
          <Users className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">View Family Analytics</span>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator className="bg-yellow-200 dark:bg-gray-600" />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-xl p-3">
          <LogOut className="mr-2 h-4 w-4" />
          <span className="font-medium">Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <EditProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
  </>;
};
export default ProfileDropdown;