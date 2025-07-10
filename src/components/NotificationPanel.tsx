
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Check, Clock, Award, Target } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useState } from "react";

const NotificationPanel = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification, getUnreadCount } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'streak': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'goal': return <Target className="w-4 h-4 text-green-600" />;
      case 'reminder': return <Bell className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 hover:bg-purple-100 rounded-xl border-2 border-purple-200 bg-white shadow-md"
      >
        <Bell className="w-5 h-5 text-purple-600" />
        {getUnreadCount() > 0 && (
          <Badge className="absolute -top-2 -right-2 min-w-6 h-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
            {getUnreadCount()}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-14 w-80 max-h-96 overflow-y-auto z-50 p-4 shadow-2xl border-2 border-purple-200 rounded-2xl bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
            <div className="flex space-x-2">
              {getUnreadCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs p-2 h-8 hover:bg-green-100 text-green-600 rounded-lg"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2 h-8 hover:bg-red-100 text-red-600 rounded-lg"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 ${
                    notification.read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-full shadow">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {notification.title}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          className="p-1 h-6 w-6 opacity-50 hover:opacity-100 hover:bg-red-100 rounded-full"
                        >
                          <X className="w-3 h-3 text-red-600" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatTime(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default NotificationPanel;
