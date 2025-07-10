
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'streak' | 'goal' | 'new_content';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  childId?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'achievement',
      title: 'New Achievement!',
      message: 'Priya earned the Math Master badge!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      childId: 'priya'
    },
    {
      id: '2',
      type: 'streak',
      title: 'Streak Alert!',
      message: 'Arjun is on a 7-day learning streak!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      childId: 'arjun'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Class Reminder',
      message: 'Sara has a Yoga class in 30 minutes',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: true,
      childId: 'sara'
    }
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast(notification.title, {
      description: notification.message,
      action: {
        label: 'View',
        onClick: () => markAsRead(newNotification.id)
      }
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    clearNotification
  };
};
