import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CoinProvider } from '@/contexts/CoinContext';
import { ChildrenProvider } from '@/contexts/ChildrenContext';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/AuthGuard';
import WebsiteTour from './components/WebsiteTour'; // ✅ Add this

// Pages
import Dashboard from '@/pages/Dashboard';
import Classes from '@/pages/Classes';
import Events from '@/pages/Events';
import Leaderboard from '@/pages/Leaderboard';
import Support from '@/pages/Support';
import RaiseTicket from '@/pages/RaiseTicket';
import TicketChat from '@/pages/TicketChat';
import Transactions from '@/pages/Transactions';
import Profile from '@/pages/Profile';
import MobileLearning from '@/pages/MobileLearning';
import ReferFriends from '@/pages/ReferFriends';
import Stories from '@/pages/Stories';
import StudentAnalytics from '@/pages/StudentAnalytics';
import StoriesPage from '@/pages/StoriesPage';
import ReferPage from '@/pages/ReferPage';
import FamilyDashboard from '@/pages/FamilyDashboard';
import UpcomingClasses from '@/pages/UpcomingClasses';
import PastClassesPage from '@/pages/PastClassesPage';
import HomeworkRoom from '@/pages/HomeworkRoom';
import FamilyAnalytics from '@/pages/FamilyAnalytics';
import GamesPage from '@/pages/GamesPage';
import Login from '@/pages/Login';
import MobileAnalytics from '@/pages/MobileAnalytics';
import MobileFamilyDashboard from '@/pages/MobileFamilyDashboard';
import ParentDashboard from '@/pages/ParentDashboard';
import ClassRecordingsPage from '@/pages/ClassRecordingsPage';
import ClassPresentationsPage from '@/pages/ClassPresentationsPage';
import ClassHomeworkPage from '@/pages/ClassHomeworkPage';
import ClassFeedbackPage from '@/pages/ClassFeedbackPage';
import JoinClassPage from '@/pages/JoinClassPage';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/classes" element={<AuthGuard><Classes /></AuthGuard>} />
      <Route path="/games" element={<AuthGuard><GamesPage /></AuthGuard>} />
      <Route path="/learning" element={<AuthGuard><MobileLearning /></AuthGuard>} />
      <Route path="/events" element={<AuthGuard><Events /></AuthGuard>} />
      <Route path="/leaderboard" element={<AuthGuard><Leaderboard /></AuthGuard>} />
      <Route path="/support" element={<AuthGuard><Support /></AuthGuard>} />
      <Route path="/transactions" element={<AuthGuard><Transactions /></AuthGuard>} />
      <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
      <Route path="/refer" element={<AuthGuard><ReferFriends /></AuthGuard>} />
      <Route path="/stories" element={<AuthGuard><Stories /></AuthGuard>} />
      <Route path="/analytics" element={<AuthGuard><StudentAnalytics /></AuthGuard>} />
      <Route path="/mobile-analytics" element={<AuthGuard><MobileAnalytics /></AuthGuard>} />
      <Route path="/family-dashboard" element={<AuthGuard><FamilyDashboard /></AuthGuard>} />
      <Route path="/mobile-family-dashboard" element={<AuthGuard><MobileFamilyDashboard /></AuthGuard>} />
      <Route path="/parent-dashboard" element={<AuthGuard><ParentDashboard /></AuthGuard>} />
      <Route path="/family-analytics" element={<AuthGuard><FamilyAnalytics /></AuthGuard>} />
      <Route path="/upcoming-classes" element={<AuthGuard><UpcomingClasses /></AuthGuard>} />
      <Route path="/past-classes" element={<AuthGuard><PastClassesPage /></AuthGuard>} />
      <Route path="/homework-room" element={<AuthGuard><HomeworkRoom /></AuthGuard>} />
      <Route path="/support/ticket" element={<AuthGuard><RaiseTicket /></AuthGuard>} />
      <Route path="/support/chat/:ticketId" element={<AuthGuard><TicketChat /></AuthGuard>} />
      <Route path="/class/:classId/recording" element={<AuthGuard><ClassRecordingsPage /></AuthGuard>} />
      <Route path="/class/:classId/presentations" element={<AuthGuard><ClassPresentationsPage /></AuthGuard>} />
      <Route path="/class/:classId/homework" element={<AuthGuard><ClassHomeworkPage /></AuthGuard>} />
      <Route path="/class/:classId/feedback" element={<AuthGuard><ClassFeedbackPage /></AuthGuard>} />
      <Route path="/join-class/:classId" element={<AuthGuard><JoinClassPage /></AuthGuard>} />
    </Routes>
  );
};

function App() {
  const [runTour, setRunTour] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      setShowPrompt(true);
    }
  }, []);

  const startTour = () => {
    setRunTour(true);
    localStorage.setItem('firstVisit', 'false');
    setShowPrompt(false);
  };

  const handleTourEnd = () => {
    setRunTour(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CoinProvider>
          <Router>
            <ChildrenProvider>
              <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-gray-900">



                <AppRoutes />
              </div>
            </ChildrenProvider>
          </Router>
        </CoinProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
