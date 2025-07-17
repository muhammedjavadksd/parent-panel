import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, FileText, BookOpen, Users, Star, Trophy, Gift, Zap, Brain, Sparkles, Award, Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { useDashboard } from '@/hooks/useDashboard';
import { useChildren } from '@/hooks/useChildren';
import { useClasses } from '@/hooks/useClasses';
import LearningProgress from '@/components/dashboard/LearningProgress';
import BookingPopup from '@/components/BookingPopup';
import React, { useState } from 'react';

const Classes = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { selectedChild } = useChildren();
  const { progressOverview, isLoading: isProgressLoading, loadProgressOverview } = useDashboard();
  const { classInfo, isLoading: isClassesLoading, error: classesError, loadClassesInfo } = useClasses();
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'demo' | 'masterclass'>('demo');

  // 👇 1. ADD THIS STATE VARIABLE
  const [period, setPeriod] = useState('month');

  // Fetch stats for selected child or family level
  // 👇 2. UPDATE THIS useEffect
  React.useEffect(() => {
    const childId = selectedChild?.id || null;

    // Create params object based on the current period
    const params = period === 'overall' ? { period: 'overall' } : {};

    console.log('🔍 Classes: Loading data for:', childId ? `child ${childId}` : 'family level', `with period: ${period}`);

    // Pass the params to the hook
    loadProgressOverview(childId, params);

    if (childId) {
      loadClassesInfo(childId.toString());
    }
  }, [selectedChild, period, loadProgressOverview, loadClassesInfo]); // ✅ Add 'period' to the dependency array


  // Debug logging for classInfo
  React.useEffect(() => {
    console.log('🔍 Classes: classInfo updated:', classInfo);
    if (classInfo) {
      console.log('🔍 Classes: Available URLs:', {
        demo_booking_url: classInfo.demo_booking_url,
        masterclass_booking_url: classInfo.masterclass_booking_url,
        hw_room_booking: classInfo.hw_room_booking
      });
    }
  }, [classInfo]);

  // Debug logging for errors
  React.useEffect(() => {
    if (classesError) {
      console.error('🔍 Classes: Error loading classes info:', classesError);
    }
  }, [classesError]);

  // Handle booking redirects
  const handleDemoBooking = () => {
    setBookingType('demo');
    setBookingPopupOpen(true);
  };

  const handleMasterClassBooking = () => {
    setBookingType('masterclass');
    setBookingPopupOpen(true);
  };

  const handleBookingComplete = (childId: number, bookingType: string) => {
    console.log('🔍 Classes: Booking completed for child:', childId, 'type:', bookingType);
    // The popup now handles opening the booking URL directly
    // This callback is mainly for logging and any additional classes-specific logic
  };

  const handleHomeworkRoom = () => {
    console.log('🔍 Classes: handleHomeworkRoom called, classInfo:', classInfo);
    if (classInfo?.hw_room_booking) {
      console.log('🔍 Classes: Opening homework room URL:', classInfo.hw_room_booking);
      window.open(classInfo.hw_room_booking, '_blank');
    } else {
      console.log('🔍 Classes: No homework room URL, navigating to /homework-room');
      navigate("/homework-room");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => { }} />

        <main className="flex-1 p-2 sm:p-3 lg:p-4 md:p-4 space-y-2 sm:space-y-3 lg:space-y-4 md:space-y-4 max-w-7xl mx-auto w-full pb-20 sm:pb-0">
          <div className="p-4 sm:p-6 lg:p-8 md:p-6 bg-white border-b border-blue-100">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl md:text-3xl font-bold text-blue-800 mb-2">
              Classes & Learning Hub
            </h1>
            <p className="text-blue-600 text-sm sm:text-base lg:text-lg md:text-base">Manage your learning journey with our comprehensive class management system</p>
          </div>

          <div className="p-2 sm:p-4 lg:p-8 md:p-6">
            {/* Loading State */}
            {isClassesLoading && (
              <Card className="p-6 sm:p-8 md:p-6 text-center mb-6">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 md:h-6 md:w-6 border-b-2 border-blue-600 mr-3"></div>
                  <span className="text-blue-600 text-sm sm:text-base md:text-sm">Loading class information...</span>
                </div>
              </Card>
            )}

            {/* Error State */}
            {classesError && (
              <Card className="p-4 sm:p-6 md:p-4 text-center mb-6 bg-red-50 border-red-200">
                <div className="text-red-600 mb-2">
                  <p className="font-semibold text-sm sm:text-base md:text-sm">Error loading class information</p>
                  <p className="text-xs sm:text-sm md:text-xs">{classesError}</p>
                </div>
                <Button
                  onClick={() => selectedChild?.id && loadClassesInfo(selectedChild.id.toString())}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm"
                >
                  Retry
                </Button>
              </Card>
            )}

            {/* Premium Book Demo Class Card - Responsive */}
            <Card className="relative p-3 sm:p-4 md:p-4 rounded-xl sm:rounded-2xl md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer overflow-hidden border-2 border-blue-200 bg-white mb-4 sm:mb-6 md:mb-4" onClick={handleDemoBooking}>
              {/* Premium badges */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-3 md:right-3 flex flex-col space-y-1 sm:space-y-2 md:space-y-1 z-20">
                <div className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-2 md:py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 hover:scale-105 transition-all duration-300">
                  <Gift className="w-3 h-3" />
                  <span className="hidden sm:inline md:hidden">FREE TRIAL</span>
                  <span className="sm:hidden md:inline">FREE</span>
                </div>
                <div className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-2 md:py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span className="hidden sm:inline md:hidden">BESTSELLER</span>
                  <span className="sm:hidden md:inline">BEST</span>
                </div>
              </div>

              <div className="relative z-10">
                {/* Main Header - Responsive */}
                <div className="text-center mb-4 sm:mb-6 md:mb-4">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-600 p-2 rounded-lg sm:rounded-xl md:rounded-lg shadow-lg">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                    </div>
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl md:text-xl font-bold text-blue-800 mb-1 sm:mb-2 leading-tight">
                    Experience Premium Learning
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xs text-blue-600">Transform your child's academic journey with our flagship programs</p>
                </div>

                {/* Program Cards - Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-3 mb-4 sm:mb-6 md:mb-4">
                  {/* Alpha Maths - Responsive */}
                  <div className="bg-blue-50 p-3 sm:p-4 md:p-3 rounded-lg sm:rounded-xl md:rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-center mb-2 sm:mb-3 md:mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg mr-2 sm:mr-3 md:mr-2">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-lg md:text-sm font-bold text-blue-800 mb-0">Alpha Maths</h3>
                        <p className="text-blue-600 font-semibold text-xs sm:text-sm md:text-xs">Smart Math Learning</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-2 sm:mb-3 md:mb-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Visual Math Concepts</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Interactive Problem Solving</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Adaptive Learning Path</span>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-blue-200 shadow-sm">
                      <p className="text-xs text-blue-700 font-semibold flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        Perfect for building strong math foundations
                      </p>
                    </div>
                  </div>

                  {/* Unbox English - Responsive */}
                  <div className="bg-yellow-50 p-3 sm:p-4 md:p-3 rounded-lg sm:rounded-xl md:rounded-lg border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-center mb-2 sm:mb-3 md:mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg mr-2 sm:mr-3 md:mr-2">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-lg md:text-sm font-bold text-blue-800 mb-0">Unbox English</h3>
                        <p className="text-blue-600 font-semibold text-xs sm:text-sm md:text-xs">Creative Language Arts</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-2 sm:mb-3 md:mb-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Creative Writing Skills</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Reading Comprehension</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Public Speaking Confidence</span>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-yellow-200 shadow-sm">
                      <p className="text-xs text-blue-700 font-semibold flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Unlock your child's communication potential
                      </p>
                    </div>
                  </div>

                  {/* Little Yogi - Responsive */}
                  <div className="bg-green-50 p-3 sm:p-4 md:p-3 rounded-lg sm:rounded-xl md:rounded-lg border-2 border-green-200 hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-center mb-2 sm:mb-3 md:mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg mr-2 sm:mr-3 md:mr-2">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-lg md:text-sm font-bold text-green-800 mb-0">Little Yogi</h3>
                        <p className="text-green-700 font-semibold text-xs sm:text-sm md:text-xs">Bhagavad Gita for Kids</p>
                      </div>
                    </div>

                    <div className="space-y-1 mb-2 sm:mb-3 md:mb-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-green-900 font-medium">Cultural Awareness & Moral Values</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-green-900 font-medium">Tackle Exam Stress & Peer Pressure</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-green-900 font-medium">Shloka Recitation & Real-Life Application</span>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-green-200 shadow-sm">
                      <p className="text-xs text-green-700 font-semibold flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Make Gita a way of life
                      </p>
                    </div>
                  </div>
                </div>

                {/* Premium Benefits Row - Responsive */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-2 mb-4 sm:mb-6 md:mb-4">
                  <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200">
                    <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">🆓</div>
                    <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">100% Free Trial</p>
                    <p className="text-xs text-blue-600 mt-1">No commitment needed</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-200">
                    <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">👨‍🏫</div>
                    <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">Expert Teachers</p>
                    <p className="text-xs text-blue-600 mt-1">IIT & IIM graduates</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200">
                    <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">🎯</div>
                    <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">Personalized Learning</p>
                    <p className="text-xs text-blue-600 mt-1">Adapted to your pace</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-200">
                    <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">⚡</div>
                    <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">Instant Results</p>
                    <p className="text-xs text-blue-600 mt-1">See progress immediately</p>
                  </div>
                </div>

                {/* Premium CTA Section - Responsive */}
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 md:py-3 px-6 sm:px-8 md:px-6 rounded-xl sm:rounded-2xl md:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-lg md:text-sm transform hover:scale-105 border-2 border-blue-600" onClick={handleDemoBooking}>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 mr-2 sm:mr-3 md:mr-2" />
                    Book Your FREE Trial Now!
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 ml-2 sm:ml-3 md:ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Other Four Options - Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-4 lg:gap-6 mb-6 sm:mb-8 md:mb-6">
              {/* Book Master Class */}
              <Card className="p-3 sm:p-6 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl md:rounded-lg lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-blue-200 hover:border-blue-300" onClick={handleMasterClassBooking}>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-blue-600 rounded-lg sm:rounded-xl md:rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-3 lg:mb-3 shadow-lg">
                    <Trophy className="w-5 h-5 sm:w-7 sm:h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-sm lg:text-lg font-bold text-blue-800 mb-1 sm:mb-2 md:mb-2 lg:mb-2">Book Master Class</h3>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm text-blue-600 mb-2 sm:mb-4 md:mb-3 lg:mb-4">Advanced Learning • 1:1 Attention</p>
                  <div className="space-y-1.5 text-xs text-blue-700 mb-3 sm:mb-4 md:mb-3 lg:mb-4">
                    <div className="md:text-sm lg:text-sm">• Advanced Content</div>
                    <div className="md:text-sm lg:text-sm">• 1:1 Attention</div>
                    <div className="md:text-sm lg:text-sm">• Certification</div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-xs sm:text-sm md:text-sm lg:text-sm py-2.5 md:py-2 lg:py-2" onClick={handleMasterClassBooking}>
                    Book Now
                  </Button>
                </div>
              </Card>

              {/* Upcoming Classes */}
              <Card className="p-3 sm:p-6 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl md:rounded-lg lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-yellow-200 hover:border-yellow-300" onClick={() => navigate("/upcoming-classes")}>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-yellow-500 rounded-lg sm:rounded-xl md:rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-3 lg:mb-3 shadow-lg">
                    <Calendar className="w-5 h-5 sm:w-7 sm:h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-sm lg:text-lg font-bold text-blue-800 mb-1 sm:mb-2 md:mb-2 lg:mb-2">Upcoming Classes</h3>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm text-blue-600 mb-2 sm:mb-4 md:mb-3 lg:mb-4">View and manage scheduled classes</p>
                  <div className="space-y-1.5 text-xs text-blue-700 mb-3 sm:mb-4 md:mb-3 lg:mb-4">
                    <div className="md:text-sm lg:text-sm">• Join Classes</div>
                    <div className="md:text-sm lg:text-sm">• Reschedule</div>
                    <div className="md:text-sm lg:text-sm">• Cancel Option</div>
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-lg shadow-md font-bold text-xs sm:text-sm md:text-sm lg:text-sm py-2.5 md:py-2 lg:py-2" onClick={() => navigate("/upcoming-classes")}>
                    View Classes
                  </Button>
                </div>
              </Card>

              {/* Past Classes */}
              <Card className="p-3 sm:p-6 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl md:rounded-lg lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-blue-200 hover:border-blue-300" onClick={() => navigate("/past-classes")}>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-blue-600 rounded-lg sm:rounded-xl md:rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-3 lg:mb-3 shadow-lg">
                    <Video className="w-5 h-5 sm:w-7 sm:h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-sm lg:text-lg font-bold text-blue-800 mb-1 sm:mb-2 md:mb-2 lg:mb-2">Past Classes</h3>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm text-blue-600 mb-2 sm:mb-4 md:mb-3 lg:mb-4">Access recordings and materials</p>
                  <div className="space-y-1.5 text-xs text-blue-700 mb-3 sm:mb-4 md:mb-3 lg:mb-4">
                    <div className="md:text-sm lg:text-sm">• Recordings</div>
                    <div className="md:text-sm lg:text-sm">• PPTs & Materials</div>
                    <div className="md:text-sm lg:text-sm">• Homework & Feedback</div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-xs sm:text-sm md:text-sm lg:text-sm py-2.5 md:py-2 lg:py-2" onClick={() => navigate("/past-classes")}>
                    Access Materials
                  </Button>
                </div>
              </Card>

              {/* Homework Room */}
              <Card className="p-3 sm:p-6 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl md:rounded-lg lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-yellow-200 hover:border-yellow-300" onClick={handleHomeworkRoom}>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-yellow-500 rounded-lg sm:rounded-xl md:rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-3 lg:mb-3 shadow-lg">
                    <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-sm lg:text-lg font-bold text-blue-800 mb-1 sm:mb-2 md:mb-2 lg:mb-2">Homework Room</h3>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm text-blue-600 mb-2 sm:mb-4 md:mb-3 lg:mb-4">Complete assignments and get help</p>
                  <div className="space-y-1.5 text-xs text-blue-700 mb-3 sm:mb-4 md:mb-3 lg:mb-4">
                    <div className="md:text-sm lg:text-sm">• Pending Tasks</div>
                    <div className="md:text-sm lg:text-sm">• Ask Doubts</div>
                    <div className="md:text-sm lg:text-sm">• Teacher Support</div>
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-lg shadow-md font-bold text-xs sm:text-sm md:text-sm lg:text-sm py-2.5 md:py-2 lg:py-2" onClick={handleHomeworkRoom}>
                    Open Homework
                  </Button>
                </div>
              </Card>
            </div>

            {/* Live Learning Statistics - Responsive */}
            <div className="mb-6 sm:mb-8 md:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl md:text-xl font-bold text-blue-800 mb-1 sm:mb-2">Your Learning Statistics</h2>
              <p className="text-blue-600 mb-3 sm:mb-4 md:mb-3 text-sm sm:text-base md:text-sm">Track your progress across all learning activities</p>
              <LearningProgress
                progressOverview={progressOverview ?? null}
                learningProgress={progressOverview?.learning_progress ?? null}
                isLoading={isProgressLoading}
                // 👇 3. PASS THESE PROPS DOWN
                period={period}
                onPeriodChange={setPeriod}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Booking Popup */}
      <BookingPopup
        isOpen={bookingPopupOpen}
        onClose={() => setBookingPopupOpen(false)}
        bookingType={bookingType}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};

export default Classes;
