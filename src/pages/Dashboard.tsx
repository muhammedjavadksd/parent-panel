import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React, { useMemo, useCallback, lazy, Suspense } from "react";
import UpcomingClasses from "@/components/UpcomingClasses";
import PastClasses from "@/components/PastClasses";
import MobileDashboard from "./MobileDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { BarChart3, Clock, Calendar, Users, Trophy, Target, BookOpen, Gamepad2, TrendingUp, Coins, Star, Sparkles, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCoins } from "@/contexts/CoinContext";
import { useDashboard } from '@/hooks/useDashboard';
import { useChildren } from '@/hooks/useChildren';
import { useBookings } from '@/hooks/useBookings';
import { useJoinClass } from '@/hooks/useJoinClass';
import JoinClass from '@/components/JoinClass/JoinClass';
import LearningProgress from '@/components/dashboard/LearningProgress';
import { useClasses } from "@/hooks/useClasses";

import BookingReschedule from '@/components/BookingReschedule/BookingReschedule';
import { useBooking } from '@/hooks/useBooking';
import WebsiteTour from '@/components/WebsiteTour';

const CalendarWidget = React.lazy(() => import("@/components/CalendarWidget"));
const DailyChallenges = React.lazy(() => import("@/components/DailyChallenges"));

const Dashboard = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    getTotalCoins
  } = useCoins();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { selectedChild } = useChildren();
  const { progressOverview, isLoading: isProgressLoading, loadProgressOverview, error, bookingsForCalendar, upcomingClass } = useDashboard();
  const { bookings, isLoading, error: bookingsError, loadAllBookings, loadUpcomingClasses, loadPastClasses, clearBookingData } = useBookings();
  const { getShiftingDate, changeBooking } = useBooking();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const { data: joinData, isLoading: isJoining, error: joinError, doJoinClass, clearError: clearJoinError, clearData: clearJoinData } = useJoinClass();


  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'shift' | 'cancel'>('shift');
  const { classInfo, isLoading: isClassesLoading, error: classesError, loadClassesInfo } = useClasses();

  useEffect(() => {
    loadAllBookings(); // fetch both upcoming and past
  }, []);



  // Handle booking redirects
  const handleDemoBooking = () => {
    console.log('🔍 Dashboard: handleDemoBooking called');
    console.log('🔍 Dashboard: classInfo:', classInfo);
    console.log('🔍 Dashboard: demo_booking_url:', classInfo?.demo_booking_url);
    if (classInfo?.demo_booking_url) {
      console.log('🔍 Dashboard: Opening demo booking URL:', classInfo.demo_booking_url);
      window.open(classInfo.demo_booking_url, '_blank');
    } else {
      console.log('🔍 Dashboard: No demo booking URL, navigating to /classes/?tab=demo');
      navigate("/classes/?tab=demo");
    }
  };

  // Debug logging for classInfo
  React.useEffect(() => {
    if (selectedChild?.id) {
      console.log('🔍 Classes: Loading data for child:', selectedChild.id);
      loadProgressOverview(selectedChild.id);
      loadClassesInfo(selectedChild.id.toString());
    }
  }, [selectedChild, loadProgressOverview, loadClassesInfo]);


  useEffect(() => {
    if (selectedChild?.id) {
      console.log('🔍 Dashboard: Loading classes info for child:', selectedChild.id);
      loadClassesInfo(selectedChild.id.toString());
    }
  }, [selectedChild, loadClassesInfo]);




  // Filter bookings by type for each tab
  // const upcomingBookings = bookings;
  const upcomingBookings = (!error && bookings?.length)
    ? bookings
      .filter(b => {
        // Combine class_date and start_time into full ISO string
        const dateTimeStr = `${b.class_date}T${b.start_time}:00`; // e.g., "2025-07-11T10:00:00"
        const bookingDate = new Date(dateTimeStr);
        const now = new Date();
        return bookingDate > now;
      })
      .sort((a, b) => {
        const aDate = new Date(`${a.class_date}T${a.start_time}:00`);
        const bDate = new Date(`${b.class_date}T${b.start_time}:00`);
        return aDate.getTime() - bDate.getTime();
      })
      .slice(0, 2)
    : [];

  console.log("---------Upcoming Bookings---------")
  console.log(upcomingBookings)


  // const pastBookings = bookings;
  const pastBookings = (!error && bookings?.length)
    ? bookings
      .filter(b => {
        const dateTimeStr = `${b.class_date}T${b.start_time}:00`;
        const bookingDate = new Date(dateTimeStr);
        const now = new Date();
        return bookingDate < now;
      })
      .sort((a, b) => {
        const aDate = new Date(`${a.class_date}T${a.start_time}:00`);
        const bDate = new Date(`${b.class_date}T${b.start_time}:00`);
        return bDate.getTime() - aDate.getTime(); // most recent past class first
      })
      .slice(0, 2)
    : [];

  console.log("---------Past Bookings---------")
  console.log(pastBookings)

  // Progress overview is now handled automatically by useDashboard hook




  useEffect(() => {
    console.log('Dashboard: Loading booking data for child:', selectedChild?.id);
    loadAllBookings(selectedChild?.id);
  }, [selectedChild, loadAllBookings]);


  // Log API response for debugging
  useEffect(() => {
    if (progressOverview) {
      console.log('Progress overview loaded:', progressOverview);
    }
  }, [progressOverview]);

  // Log errors for debugging
  useEffect(() => {
    if (bookingsError) {
      console.error('Dashboard error:', bookingsError);
    }
  }, [bookingsError]);

  // Handle join class button click
  const handleJoinClick = useCallback(() => {
    setShowJoinModal(true);
    clearJoinError();
    clearJoinData();
  }, [clearJoinError, clearJoinData]);

  // Get the latest upcoming and past class for the selected child
  const now = new Date();
  const filteredUpcoming = bookings
    .filter(
      c =>
        !/demo|trial/i.test(c.admin_class_name) &&
        new Date(`${c.class_date}T${c.start_time}`) > now
    )
    .sort((a, b) => new Date(`${a.class_date}T${a.start_time}`).getTime() - new Date(`${b.class_date}T${b.start_time}`).getTime());
  const filteredPast = bookings
    .filter(
      c =>
        !/demo|trial/i.test(c.admin_class_name) &&
        new Date(`${c.class_date}T${c.start_time}`) <= now
    )
    .sort((a, b) => new Date(`${b.class_date}T${b.start_time}`).getTime() - new Date(`${a.class_date}T${a.start_time}`).getTime());

  const latestUpcomingClass = filteredUpcoming[0] || null;
  const latestPastClass = filteredPast[0] || null;

  // Handle confirm join
  const handleConfirmJoin = useCallback(() => {
    if (latestUpcomingClass) {
      doJoinClass(String(latestUpcomingClass.schedulebooking_id));
    }
  }, [latestUpcomingClass, doJoinClass]);

  // Effect: redirect to join_url on success
  useEffect(() => {
    if (joinData && joinData.join_url) {
      window.open(joinData.join_url, '_blank');
      setShowJoinModal(false);
      clearJoinData();
    }
  }, [joinData, clearJoinData]);

  // Helper function to get emoji based on class name
  const getEmojiFromClassName = useCallback((className: string) => {
    if (className.toLowerCase().includes('english')) return "📚";
    if (className.toLowerCase().includes('math')) return "🔢";
    if (className.toLowerCase().includes('science')) return "🔬";
    if (className.toLowerCase().includes('yoga') || className.toLowerCase().includes('gita')) return "🧘‍♀️";
    if (className.toLowerCase().includes('art')) return "🎨";
    if (className.toLowerCase().includes('music')) return "🎵";
    if (className.toLowerCase().includes('history')) return "📜";
    if (className.toLowerCase().includes('geography')) return "🌍";
    return "📖";
  }, []);

  // Helper function to format date
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  }, []);

  // Helper function to calculate time until class starts
  const getTimeUntilClass = useCallback((classDate: string, startTime: string) => {
    const now = new Date();
    const classDateTime = new Date(`${classDate}T${startTime}`);
    const diffMs = classDateTime.getTime() - now.getTime();

    if (diffMs <= 0) {
      return "Starting now";
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
      return `Starts in ${diffHours}h ${diffMinutes}m`;
    } else {
      return `Starts in ${diffMinutes}m`;
    }
  }, []);

  // Helper function to format time
  const formatTime = useCallback((startTime: string) => {
    const [hours, minutes] = startTime.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }, []);

  console.log('Dashboard latestUpcomingClass:', latestUpcomingClass, 'latestPastClass:', latestPastClass, 'selectedChild:', selectedChild);

  // Premium Quick Actions data
  const quickActions = useMemo(() => ([
    { title: "Library", icon: BookOpen, route: "/classes?tab=recordings", gradient: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/25" },
    { title: "Schedule", icon: Calendar, route: "/classes", gradient: "from-yellow-500 to-yellow-600", shadow: "shadow-yellow-500/25" },
    { title: "Games", icon: Gamepad2, route: "/games", gradient: "from-green-500 to-green-600", shadow: "shadow-green-500/25" },
    { title: "Goals", icon: Target, route: "/analytics", gradient: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/25" },
    { title: "Home Work", icon: Users, route: "/homework-room", gradient: "from-pink-500 to-pink-600", shadow: "shadow-pink-500/25" },
    { title: "Support", icon: BarChart3, route: "/support", gradient: "from-indigo-500 to-indigo-600", shadow: "shadow-indigo-500/25" },
  ]), []);

  // Add render log
  console.log('Dashboard render:', { selectedChild, bookings });

  if (isMobile) {
    return <MobileDashboard />;
  }
  const currentUserName = user?.parent_name || "Friend";
  const moods = useMemo(() => ([
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😴", label: "Sleepy", value: "sleepy" },
    { emoji: "🤔", label: "Curious", value: "curious" },
    { emoji: "😎", label: "Confident", value: "confident" },
    { emoji: "😅", label: "Nervous", value: "nervous" },
  ]), []);

  const startTour = () => {
    // localStorage.setItem('hasSeenTour', 'true'); // optional: reset if needed
    window.dispatchEvent(new Event('startTour'));
  };


  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
    <Sidebar />

    <div className="ml-64 flex flex-col min-h-screen">
      {/* <Header /> */}
      <Header onStartTour={startTour} />


      <main className="flex-1 p-3 lg:p-4 space-y-3 lg:space-y-4 max-w-7xl mx-auto w-full">
        {/* 1. Premium Hero Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-4">
          {/*Next class banner or past classes banner */}

          <div className="xl:col-span-2">
            <Card className="premium-hero-section premium-card rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl border-0 h-full min-h-[180px] lg:min-h-[200px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl"></div>

              <div className="p-4 lg:p-5 relative z-10 h-full flex flex-col bg-blue-600">
                <div className="flex items-center justify-between h-full">
                  <div className="flex-1 flex flex-col justify-center">
                    {latestUpcomingClass ? (
                      <>
                        <div className="upcoming-class-info flex items-center space-x-3 mb-3">
                          <div className="bg-white/15 backdrop-blur-xl p-2.5 rounded-2xl border border-white/20 shadow-lg">
                            <span className="text-2xl filter drop-shadow-sm">{getEmojiFromClassName(latestUpcomingClass.admin_class_name)}</span>
                          </div>
                          <div>
                            <div className="mb-1">
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full mr-2">Upcoming Class</span>
                            </div>
                            <h2 className="text-xl lg:text-2xl font-bold text-white drop-shadow-lg tracking-tight">{latestUpcomingClass.admin_class_name}</h2>
                            <p className="text-sm lg:text-base text-white/90 font-medium">{latestUpcomingClass.child_name} • {formatDate(latestUpcomingClass.class_date)}, {formatTime(latestUpcomingClass.start_time)}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                          <Button
                            size="sm"
                            className="bg-white/95 text-blue-700 px-5 py-2.5 rounded-2xl font-bold shadow-xl border border-white/50 backdrop-blur-sm cursor-default opacity-90"
                            disabled
                          >
                            {getTimeUntilClass(latestUpcomingClass.class_date, latestUpcomingClass.start_time)}
                          </Button>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/20 shadow-lg">
                            <Calendar className="w-4 h-4 text-white/90" />
                            <span className="text-sm font-semibold text-white">{formatDate(latestUpcomingClass.class_date)}, {formatTime(latestUpcomingClass.start_time)}</span>
                          </div>
                        </div>

                        {latestUpcomingClass.can_join && (
                          <Button
                            size="sm"
                            className="bg-white/95 text-blue-700 hover:bg-white hover:text-blue-800 px-5 py-2.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-sm w-fit hover:scale-105 border border-white/50 backdrop-blur-sm"
                            onClick={handleJoinClick}
                            disabled={isJoining}
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            {isJoining ? 'Joining...' : 'Join Session'}
                          </Button>
                        )}
                      </>
                    ) : latestPastClass ? (
                      <>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-white/15 backdrop-blur-xl p-2.5 rounded-2xl border border-white/20 shadow-lg">
                            <span className="text-2xl filter drop-shadow-sm">{getEmojiFromClassName(latestPastClass.admin_class_name)}</span>
                          </div>
                          <div>
                            <div className="mb-1">
                              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded-full mr-2">Renew Classes</span>
                            </div>
                            <h2 className="text-xl lg:text-2xl font-bold text-white drop-shadow-lg tracking-tight">{latestPastClass.admin_class_name}</h2>
                            <p className="text-sm lg:text-base text-white/90 font-medium">{latestPastClass.child_name} • {formatDate(latestPastClass.class_date)}, {formatTime(latestPastClass.start_time)}</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/20 shadow-lg">
                            <Clock className="w-4 h-4 text-white/90" />
                            <span className="text-sm font-semibold text-white">Completed</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/20 shadow-lg">
                            <Calendar className="w-4 h-4 text-white/90" />
                            <span className="text-sm font-semibold text-white">{formatDate(latestPastClass.class_date)}, {formatTime(latestPastClass.start_time)}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-white/95 text-blue-700 hover:bg-white hover:text-blue-800 px-5 py-2.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-sm w-fit hover:scale-105 border border-white/50 backdrop-blur-sm mt-2"
                          // onClick={() => navigate('/classes?tab=past')}
                          onClick={() => window.open("https://bambinos.live/pricings", "_blank")}

                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Renew Classes
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-white/15 backdrop-blur-xl p-2.5 rounded-2xl border border-white/20 shadow-lg">
                            <span className="text-2xl filter drop-shadow-sm">📚</span>
                          </div>
                          <div>
                            <h2 className="text-xl lg:text-2xl font-bold text-white drop-shadow-lg tracking-tight">Book Demo Classes</h2>
                            <p className="text-sm lg:text-base text-white/90 font-medium">Transform your child with our flagship programs</p>
                          </div>
                        </div>

                        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/20 shadow-lg">
                            <BookOpen className="w-4 h-4 text-white/90" />
                            <span className="text-sm font-semibold text-white">Review Past Classes</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/20 shadow-lg">
                            <Target className="w-4 h-4 text-white/90" />
                            <span className="text-sm font-semibold text-white">Complete Homework</span>
                          </div>
                        </div> */}

                        <Button
                          size="sm"
                          className="bg-white/95 text-blue-700 hover:bg-white hover:text-blue-800 px-5 py-2.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-sm w-fit hover:scale-105 border border-white/50 backdrop-blur-sm"
                          onClick={handleDemoBooking}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Book Demo Classes
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Premium Mood Tracker */}
                  <div className="mood-tracker bg-white/10 backdrop-blur-2xl p-3 lg:p-4 rounded-3xl border border-white/20 ml-3 shadow-2xl hidden sm:block">
                    <h4 className="text-xs lg:text-sm font-bold text-white mb-3 text-center tracking-wide">
                      How are you feeling?
                    </h4>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {moods.slice(0, 3).map(mood => <button key={mood.value} onClick={() => setSelectedMood(mood.value)} className={`p-2.5 lg:p-3 rounded-2xl transition-all duration-300 min-h-[44px] lg:min-h-[48px] min-w-[44px] lg:min-w-[48px] flex items-center justify-center shadow-xl border ${selectedMood === mood.value ? 'bg-white/95 scale-110 shadow-2xl border-white/50' : 'bg-white/20 hover:bg-white/30 border-white/30 hover:scale-105 hover:shadow-xl'}`}>
                        <div className="text-lg lg:text-xl">{mood.emoji}</div>
                      </button>)}
                    </div>

                    {selectedMood && <div className="bg-white/15 backdrop-blur-xl rounded-2xl py-2 px-3 border border-white/30 shadow-lg">
                      <p className="text-xs text-center text-white font-semibold tracking-wide">
                        Perfect! ✨
                      </p>
                    </div>}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Premium Daily Challenges */}
          <div className="daily-challenges xl:col-span-1">
            <Suspense fallback={<div className="flex items-center justify-center h-full"><span>Loading daily challenges...</span></div>}>
              <DailyChallenges />
            </Suspense>
          </div>
        </div>


        {/* 2. Learning Progress Component */}
        {/* <LearningProgress progressOverview={progressOverview} isLoading={isProgressLoading} /> */}

        <div className="learning-progress">
          <LearningProgress
            progressOverview={progressOverview?.progress_overview ?? null}
            learningProgress={progressOverview?.learning_progress ?? null}
            isLoading={isProgressLoading}
          />
        </div>



        {/* 3. Premium Quick Actions */}
        <Card className="quick-actions premium-card p-4 lg:p-5 rounded-3xl glass-card bg-gradient-to-br from-white/95 to-slate-50/95 border-2 border-slate-200/50 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-2.5 rounded-2xl shadow-lg">
              <span className="text-lg text-white filter drop-shadow-sm">⚡</span>
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-slate-800 tracking-tight">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return <Card key={index} className="premium-card relative p-3 lg:p-4 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 glass-card bg-white/90 border-2 border-slate-200/50 cursor-pointer group overflow-hidden backdrop-blur-xl" onClick={() => navigate(action.route)}>
                {/* Premium Background Effects */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full opacity-30 group-hover:opacity-60 transition-all duration-300"></div>

                <div className="text-center relative z-10">
                  <div className={`relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-2 shadow-xl ${action.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 relative z-10" />
                  </div>
                  <h3 className="text-xs lg:text-sm font-bold text-slate-800 group-hover:text-blue-800 transition-colors tracking-tight">{action.title}</h3>
                </div>
              </Card>;
            })}
          </div>
        </Card>

        {/* 4. Premium Bottom Section - Classes + Calendar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-4">
          {/* Premium Classes Section with Tabs */}
          <div className="classes-tabs xl:col-span-2 relative">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span className="text-blue-700 font-semibold">Loading classes...</span>
                </div>
              </div>
            )}
            <Card className="premium-card p-4 lg:p-5 rounded-3xl glass-card bg-white/95 border-2 border-slate-200/50 shadow-2xl backdrop-blur-xl">
              <Tabs defaultValue="upcoming" className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <TabsList className="grid w-auto grid-cols-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-2xl shadow-lg backdrop-blur-sm">
                      <TabsTrigger value="upcoming" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl text-sm font-semibold transition-all duration-300">
                        Upcoming
                      </TabsTrigger>
                      <TabsTrigger value="past" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl text-sm font-semibold transition-all duration-300">
                        Past
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-bold tracking-tight flex items-center space-x-1" onClick={() => navigate('/classes/?tab=upcoming')}>
                    <span>See all</span>
                    <Star className="w-3 h-3" />
                  </button>
                </div>

                <TabsContent value="upcoming">
                  <UpcomingClasses
                    bookings={upcomingBookings}
                    isLoading={isLoading}
                    error={error}
                  />
                </TabsContent>

                <TabsContent value="past">
                  <PastClasses
                    bookings={pastBookings}
                    isLoading={isLoading}
                    error={error}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Premium Calendar Widget */}
          <div className="calendar-widget xl:col-span-1">
            <Card className="premium-card p-4 lg:p-5 rounded-3xl glass-card bg-white/95 border-2 border-slate-200/50 shadow-2xl backdrop-blur-xl">
              <Suspense fallback={<div className="flex items-center justify-center h-full"><span>Loading calendar...</span></div>}>
                <CalendarWidget bookings={bookingsForCalendar} upcomingClass={upcomingClass} />
              </Suspense>
            </Card>
          </div>
        </div>
      </main>
    </div>

    {/* Join Class Modal */}
    {showJoinModal && latestUpcomingClass && (
      <JoinClass
        isLoading={isJoining}
        error={joinError}
        onJoin={handleJoinClick}
        onConfirm={handleConfirmJoin}
        onCancel={() => setShowJoinModal(false)}
        showModal={showJoinModal}
      />
    )}

    {/* Website Tour */}
    <WebsiteTour />
  </div>;
};
export default Dashboard;