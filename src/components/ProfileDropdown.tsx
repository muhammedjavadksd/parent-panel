import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, BarChart3, LogOut, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";
import { useHeader } from "@/hooks/useHeader";
import EditProfileModal from "./EditProfileModal";

const ProfileDropdown = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { selectedChild, isLoading: isChildLoading } = useChildren();
  const { headerData, loading: isHeaderLoading } = useHeader();

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
  const isLoading = isChildLoading || isHeaderLoading;

  // Avatar fallback: first letter of name or generic icon
  const avatarFallback = selectedChild?.name?.[0]?.toUpperCase() || "👤";

  // Extract progress data from headerData
  const progressOverview = headerData?.data?.progress_overview;

  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-yellow-100 dark:hover:bg-gray-700 transition-colors">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-yellow-300 dark:border-yellow-500 shadow-lg">
            <AvatarImage src="" alt={selectedChild?.name || "Child"} />
            <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm sm:text-lg">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 sm:w-80 p-3 sm:p-4 bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-gray-600 shadow-2xl rounded-xl sm:rounded-2xl z-50" align="end">
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-yellow-300 dark:border-yellow-500 shadow-lg">
              <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-lg sm:text-xl">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">{selectedChild?.name || (isLoading ? "Loading..." : "Family")}</p>
              {/* <p className="text-sm text-yellow-600 dark:text-yellow-400">{selectedChild?.grade || "-"}</p> */}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-yellow-200 dark:bg-gray-600" />

        <div className="py-2 sm:py-3">
          <h4 className="text-xs sm:text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-2 sm:mb-3">Progress Overview</h4>
          {isLoading ? (
            <div className="text-center text-gray-400 py-3 sm:py-4 text-sm">Loading...</div>
          ) : progressOverview ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <p className="text-blue-600 dark:text-blue-300 font-semibold">Classes</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">{progressOverview.total_classes}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <p className="text-green-600 dark:text-green-300 font-semibold">Streak</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">{progressOverview.streak ?? 0} days</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <p className="text-yellow-600 dark:text-yellow-300 font-semibold">Coins</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">{progressOverview.coins ?? 0}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <p className="text-purple-600 dark:text-purple-300 font-semibold">Rank</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold">#{progressOverview.rank ?? 'Not Available'}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-3 sm:py-4 text-sm">No data</div>
          )}
        </div>

        <DropdownMenuSeparator className="bg-yellow-200 dark:bg-gray-600" />

        <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg sm:rounded-xl p-2 sm:p-3">
          <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">View Profile</span>
        </DropdownMenuItem>

       

        <DropdownMenuSeparator className="bg-yellow-200 dark:bg-gray-600" />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg sm:rounded-xl p-2 sm:p-3">
          <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="font-medium text-sm">Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <EditProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
  </>;
};
export default ProfileDropdown;