import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, FileText, BookOpen, Users, Star, Trophy, Gift, Zap, Brain, Sparkles, Award, Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { useDashboard } from '@/hooks/useDashboard';
import { useChildren } from '@/hooks/useChildren';
import { useClasses } from '@/hooks/useClasses';
import LearningProgress from '@/components/dashboard/LearningProgress';
import React from 'react';

const Classes = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { selectedChild } = useChildren();
  const { progressOverview, isLoading: isProgressLoading, loadProgressOverview } = useDashboard();
  const { classInfo, isLoading: isClassesLoading, error: classesError, loadClassesInfo } = useClasses();

  // Fetch stats for selected child
  React.useEffect(() => {
    if (selectedChild?.id) {
      console.log('🔍 Classes: Loading data for child:', selectedChild.id);
      loadProgressOverview(selectedChild.id);
      loadClassesInfo(selectedChild.id.toString());
    }
  }, [selectedChild, loadProgressOverview, loadClassesInfo]);

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
    console.log('🔍 Classes: handleDemoBooking called, classInfo:', classInfo);
    if (classInfo?.demo_booking_url) {
      console.log('🔍 Classes: Opening demo booking URL:', classInfo.demo_booking_url);
      window.open(classInfo.demo_booking_url, '_blank');
    } else {
      console.log('🔍 Classes: No demo booking URL, navigating to /book-demo');
      navigate("/book-demo");
    }
  };

  const handleMasterClassBooking = () => {
    console.log('🔍 Classes: handleMasterClassBooking called, classInfo:', classInfo);
    if (classInfo?.masterclass_booking_url) {
      console.log('🔍 Classes: Opening masterclass booking URL:', classInfo.masterclass_booking_url);
      window.open(classInfo.masterclass_booking_url, '_blank');
    } else {
      console.log('🔍 Classes: No masterclass booking URL, navigating to /book-master-class');
      navigate("/book-master-class");
    }
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

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <MobileHeader />

        <main className="pt-16 px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-800 mb-2">
              Classes & Learning Hub
            </h1>
            <p className="text-blue-700 text-sm">Manage your learning journey with our comprehensive class management system</p>
          </div>

          {/* Loading State */}
          {isClassesLoading && (
            <Card className="p-8 text-center mb-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-600">Loading class information...</span>
              </div>
            </Card>
          )}

          {/* Error State */}
          {classesError && (
            <Card className="p-6 text-center mb-6 bg-red-50 border-red-200">
              <div className="text-red-600 mb-2">
                <p className="font-semibold">Error loading class information</p>
                <p className="text-sm">{classesError}</p>
              </div>
              <Button
                onClick={() => selectedChild?.id && loadClassesInfo(selectedChild.id.toString())}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Retry
              </Button>
            </Card>
          )}

          {/* Premium Book Demo Class Card - Mobile Optimized */}
          <Card className="p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-blue-200 bg-white mb-6" onClick={handleDemoBooking}>
            {/* Premium badges - Mobile Optimized */}
            <div className="absolute top-2 right-2 flex flex-col space-y-1 z-20">
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md flex items-center space-x-1">
                <Gift className="w-3 h-3" />
                <span>FREE</span>
              </div>
              <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>BEST</span>
              </div>
            </div>

            <div className="relative z-10 p-2">
              {/* Main Header - Mobile Optimized */}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-2">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-blue-800 mb-1 leading-tight">
                  Experience Premium Learning
                </h2>
                <p className="text-sm text-blue-700 font-semibold mb-1">Alpha Maths & Unbox English</p>
                <p className="text-xs text-blue-600">Transform your child's academic journey</p>
              </div>

              {/* Program Cards - Mobile Optimized Stack */}
              <div className="space-y-3 mb-4">
                {/* Alpha Maths - Compact */}
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-blue-800">Alpha Maths</h3>
                      <p className="text-xs text-blue-600">Smart Math Learning</p>
                    </div>
                  </div>
                  <div className="text-xs text-blue-700 grid grid-cols-2 gap-1">
                    <div>• Visual Concepts</div>
                    <div>• Problem Solving</div>
                    <div>• Adaptive Path</div>
                    <div>• Quick Results</div>
                  </div>
                </div>

                {/* Unbox English - Compact */}
                <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-2">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-blue-800">Unbox English</h3>
                      <p className="text-xs text-blue-600">Creative Language Arts</p>
                    </div>
                  </div>
                  <div className="text-xs text-blue-700 grid grid-cols-2 gap-1">
                    <div>• Creative Writing</div>
                    <div>• Reading Skills</div>
                    <div>• Speaking Confidence</div>
                    <div>• Story Building</div>
                  </div>
                </div>
              </div>

              {/* Quick Benefits - Mobile Grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-blue-100">
                  <div className="text-sm mb-1">🆓</div>
                  <p className="text-xs font-medium text-blue-800">Free Trial</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-blue-100">
                  <div className="text-sm mb-1">👨‍🏫</div>
                  <p className="text-xs font-medium text-blue-800">Expert Teachers</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-blue-100">
                  <div className="text-sm mb-1">🎯</div>
                  <p className="text-xs font-medium text-blue-800">Personal</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-blue-100">
                  <div className="text-sm mb-1">⚡</div>
                  <p className="text-xs font-medium text-blue-800">Quick Results</p>
                </div>
              </div>

              {/* CTA Button - Mobile Optimized */}
              <div className="text-center">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg text-sm" onClick={handleDemoBooking}>
                  <Zap className="w-4 h-4 mr-2" />
                  Book Your FREE Trial Now!
                </Button>
                <p className="text-xs text-blue-600 mt-1">No credit card required</p>
                <div className="flex justify-center items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-green-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-xs font-medium">10K+ Students</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span className="text-xs font-medium">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Other Options - Mobile Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Book Master Class */}
            <Card className="p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-2 border-blue-200" onClick={handleMasterClassBooking}>
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-blue-800 mb-1">Master Class</h3>
                <p className="text-xs text-blue-600 mb-2">Advanced Learning</p>
                <Button className="w-full bg-blue-600 text-white text-xs py-2">
                  Book Now
                </Button>
              </div>
            </Card>

            {/* Upcoming Classes */}
            <Card className="p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-2 border-yellow-200" onClick={() => navigate("/upcoming-classes")}>
              <div className="text-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-blue-800 mb-1">Upcoming</h3>
                <p className="text-xs text-blue-600 mb-2">View Classes</p>
                <Button className="w-full bg-yellow-500 text-blue-800 text-xs py-2 font-bold">
                  View
                </Button>
              </div>
            </Card>

            {/* Past Classes */}
            <Card className="p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-2 border-blue-200" onClick={() => navigate("/past-classes")}>
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-blue-800 mb-1">Past Classes</h3>
                <p className="text-xs text-blue-600 mb-2">Recordings</p>
                <Button className="w-full bg-blue-600 text-white text-xs py-2">
                  Access
                </Button>
              </div>
            </Card>

            {/* Homework Room */}
            <Card className="p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-2 border-yellow-200" onClick={handleHomeworkRoom}>
              <div className="text-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-blue-800 mb-1">Homework</h3>
                <p className="text-xs text-blue-600 mb-2">Assignments</p>
                <Button className="w-full bg-yellow-500 text-blue-800 text-xs py-2 font-bold">
                  Open
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Learning Statistics - Mobile */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-1">Your Learning Statistics</h2>
            <p className="text-blue-600 text-sm mb-3">Track your progress across all learning activities</p>
            {/* <LearningProgress progressOverview={progressOverview} isLoading={isProgressLoading} /> */}
            <LearningProgress
              progressOverview={progressOverview?.progress_overview ?? null}
              learningProgress={progressOverview?.learning_progress ?? null}
              isLoading={isProgressLoading}
            />
          </div>

          {/* Class Information from API - Mobile */}
          {!isClassesLoading && classInfo && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-800 mb-3">Class Information</h2>
              <div className="grid grid-cols-2 gap-3">
                {/* Pending Homework */}
                <Card className="p-3 rounded-xl bg-red-50 border-2 border-red-200">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm font-bold text-red-800">{classInfo.pending_homework}</p>
                    <p className="text-xs text-red-600">Pending Homework</p>
                  </div>
                </Card>

                {/* Average Score */}
                <Card className="p-3 rounded-xl bg-green-50 border-2 border-green-200">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm font-bold text-green-800">{classInfo.average_score || 'N/A'}</p>
                    <p className="text-xs text-green-600">Average Score</p>
                  </div>
                </Card>
              </div>

              {/* Enrolled Categories */}
              {classInfo.enrolled_categories.length > 0 && (
                <Card className="p-3 rounded-xl bg-blue-50 border-2 border-blue-200 mt-3">
                  <h3 className="text-sm font-bold text-blue-800 mb-2">Enrolled Categories</h3>
                  <div className="flex flex-wrap gap-1">
                    {classInfo.enrolled_categories.map((category, index) => (
                      <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                        {typeof category === 'string' ? category : category.name || category.id || 'Unknown'}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </main>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-64 flex flex-col min-h-screen">
        <Header onStartTour={()=> {}}/>

        <main className="flex-1 p-0">
          <div className="p-8 bg-white border-b border-blue-100">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">
              Classes & Learning Hub
            </h1>
            <p className="text-blue-600 text-lg">Manage your learning journey with our comprehensive class management system</p>
          </div>

          <div className="p-8">
            {/* Loading State */}
            {isClassesLoading && (
              <Card className="p-8 text-center mb-6">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <span className="text-blue-600">Loading class information...</span>
                </div>
              </Card>
            )}

            {/* Error State */}
            {classesError && (
              <Card className="p-6 text-center mb-6 bg-red-50 border-red-200">
                <div className="text-red-600 mb-2">
                  <p className="font-semibold">Error loading class information</p>
                  <p className="text-sm">{classesError}</p>
                </div>
                <Button
                  onClick={() => selectedChild?.id && loadClassesInfo(selectedChild.id.toString())}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Retry
                </Button>
              </Card>
            )}

            {/* Premium Book Demo Class Card - Made Smaller */}
            <Card className="relative p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer overflow-hidden border-2 border-blue-200 bg-white mb-6" onClick={handleDemoBooking}>
              {/* Premium badges */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
                <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 hover:scale-105 transition-all duration-300">
                  <Gift className="w-3 h-3" />
                  <span>FREE TRIAL</span>
                </div>
                <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>BESTSELLER</span>
                </div>
              </div>

              <div className="relative z-10">
                {/* Main Header - Smaller */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-2 leading-tight">
                    Experience Premium Learning
                  </h2>
                  <p className="text-sm text-blue-600">Transform your child's academic journey with our flagship programs</p>
                </div>

                {/* Program Cards - Smaller */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Alpha Maths - Compact */}
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg mr-3">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blue-800 mb-0">Alpha Maths</h3>
                        <p className="text-blue-600 font-semibold text-sm">Smart Math Learning</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Visual Math Concepts</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Interactive Problem Solving</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
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

                  {/* Unbox English - Compact */}
                  <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg mr-3">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blue-800 mb-0">Unbox English</h3>
                        <p className="text-blue-600 font-semibold text-sm">Creative Language Arts</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Creative Writing Skills</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xs">✓</span>
                        </div>
                        <span className="text-blue-800 font-medium">Reading Comprehension</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm">
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
                {/* Little Yogi - Compact */}
                <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg mr-3">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-0">Little Yogi</h3>
                      <p className="text-green-700 font-semibold text-sm">Bhagavad Gita for Kids</p>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-xs">✓</span>
                      </div>
                      <span className="text-green-900 font-medium">Cultural Awareness & Moral Values</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-xs">✓</span>
                      </div>
                      <span className="text-green-900 font-medium">Tackle Exam Stress & Peer Pressure</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
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



                {/* Premium Benefits Row - Smaller */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="text-center p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200">
                    <div className="text-2xl mb-2">🆓</div>
                    <p className="text-sm font-bold text-blue-800">100% Free Trial</p>
                    <p className="text-xs text-blue-600 mt-1">No commitment needed</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-200">
                    <div className="text-2xl mb-2">👨‍🏫</div>
                    <p className="text-sm font-bold text-blue-800">Expert Teachers</p>
                    <p className="text-xs text-blue-600 mt-1">IIT & IIM graduates</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm font-bold text-blue-800">Personalized Learning</p>
                    <p className="text-xs text-blue-600 mt-1">Adapted to your pace</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-200">
                    <div className="text-2xl mb-2">⚡</div>
                    <p className="text-sm font-bold text-blue-800">Instant Results</p>
                    <p className="text-xs text-blue-600 mt-1">See progress immediately</p>
                  </div>
                </div>

                {/* Premium CTA Section - Smaller */}
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:scale-105 border-2 border-blue-600" onClick={handleDemoBooking}>
                    <Zap className="w-5 h-5 mr-3" />
                    Book Your FREE Trial Now!
                    <Sparkles className="w-5 h-5 ml-3" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Other Four Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {/* Book Master Class */}
              <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-blue-200 hover:border-blue-300" onClick={handleMasterClassBooking}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">Book Master Class</h3>
                  <p className="text-sm text-blue-600 mb-4">Advanced Learning • 1:1 Attention</p>
                  <div className="space-y-1 text-xs text-blue-700 mb-4">
                    <div>• Advanced Content</div>
                    <div>• 1:1 Attention</div>
                    <div>• Certification</div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md" onClick={handleMasterClassBooking}>
                    Book Now
                  </Button>
                </div>
              </Card>

              {/* Upcoming Classes */}
              <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-yellow-200 hover:border-yellow-300" onClick={() => navigate("/upcoming-classes")}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">Upcoming Classes</h3>
                  <p className="text-sm text-blue-600 mb-4">View and manage scheduled classes</p>
                  <div className="space-y-1 text-xs text-blue-700 mb-4">
                    <div>• Join Classes</div>
                    <div>• Reschedule</div>
                    <div>• Cancel Option</div>
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-lg shadow-md font-bold" onClick={() => navigate("/upcoming-classes")}>
                    View Classes
                  </Button>
                </div>
              </Card>

              {/* Past Classes */}
              <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-blue-200 hover:border-blue-300" onClick={() => navigate("/past-classes")}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">Past Classes</h3>
                  <p className="text-sm text-blue-600 mb-4">Access recordings and materials</p>
                  <div className="space-y-1 text-xs text-blue-700 mb-4">
                    <div>• Recordings</div>
                    <div>• PPTs & Materials</div>
                    <div>• Homework & Feedback</div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md" onClick={() => navigate("/past-classes")}>
                    Access Materials
                  </Button>
                </div>
              </Card>

              {/* Homework Room */}
              <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white border-2 border-yellow-200 hover:border-yellow-300" onClick={handleHomeworkRoom}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">Homework Room</h3>
                  <p className="text-sm text-blue-600 mb-4">Complete assignments and get help</p>
                  <div className="space-y-1 text-xs text-blue-700 mb-4">
                    <div>• Pending Tasks</div>
                    <div>• Ask Doubts</div>
                    <div>• Teacher Support</div>
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-lg shadow-md font-bold" onClick={handleHomeworkRoom}>
                    Open Homework
                  </Button>
                </div>
              </Card>
            </div>

            {/* Live Learning Statistics - Desktop */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Your Learning Statistics</h2>
              <p className="text-blue-600 mb-4">Track your progress across all learning activities</p>
              {/* <LearningProgress progressOverview={progressOverview} isLoading={isProgressLoading} /> */}
              <LearningProgress
                progressOverview={progressOverview?.progress_overview ?? null}
                learningProgress={progressOverview?.learning_progress ?? null}
                isLoading={isProgressLoading}
              />

            </div>

            {/* Class Information from API - Removed */}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Classes;
