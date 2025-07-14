import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, LogIn, Clock, XCircle, Users, Sparkles, Loader, ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import { useJoinClass } from '@/hooks/useJoinClass';
import { useBookings } from '@/hooks/useBookings';

const JoinClassPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [canJoin, setCanJoin] = useState(false);
  const [isLoadingClass, setIsLoadingClass] = useState(true);

  const { data: joinData, isLoading: isJoining, isPolling, error: joinError, pollingMessage, doJoinClass, clearError: clearJoinError, clearData: clearJoinData, cancelPolling } = useJoinClass();
  const { bookings, loadUpcomingClasses } = useBookings();

  // Load class details
  useEffect(() => {
    const loadClassDetails = async () => {
      if (!classId) return;
      
      try {
        await loadUpcomingClasses();
      } catch (error) {
        console.error('Error loading class details:', error);
      } finally {
        setIsLoadingClass(false);
      }
    };

    loadClassDetails();
  }, [classId, loadUpcomingClasses]);

  // Find class details from bookings
  useEffect(() => {
    if (bookings && classId) {
      const classItem = bookings.find(booking => booking.schedulebooking_id.toString() === classId);
      if (classItem) {
        setClassDetails(classItem);
      }
    }
  }, [bookings, classId]);

  // Calculate time left and check if can join
  useEffect(() => {
    if (!classDetails) return;

    const updateTimeLeft = () => {
      const now = new Date();
      const classTime = new Date(`${classDetails.class_date}T${classDetails.start_time}`);
      const timeDiff = classTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        // Class has started or ended
        setTimeLeft('Class has started');
        setCanJoin(true);
      } else {
        const minutes = Math.floor(timeDiff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours > 0) {
          setTimeLeft(`${hours}h ${remainingMinutes}m until class`);
        } else {
          setTimeLeft(`${remainingMinutes}m until class`);
        }

        // Can join 15 minutes before class
        setCanJoin(minutes <= 15);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [classDetails]);

  // Handle join class
  const handleJoinClass = useCallback(() => {
    if (classId && canJoin) {
      clearJoinError();
      clearJoinData();
      doJoinClass(classId);
    }
  }, [classId, canJoin, doJoinClass, clearJoinError, clearJoinData]);

  // Handle successful join
  useEffect(() => {
    if (joinData && joinData.join_url) {
      window.open(joinData.join_url, '_blank');
      clearJoinData();
    }
  }, [joinData, clearJoinData]);

  // Handle go back
  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoadingClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading class details...</p>
        </div>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Class Not Found</h2>
          <p className="text-gray-600 mb-4">The class you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // If polling is active, show child-friendly polling UI
  if (isPolling) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border-4 border-blue-200 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Large animated teacher icon */}
            <div className="mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white">
                  <Users className="w-12 h-12 text-white" />
                </div>
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-ping opacity-30"></div>
              </div>
            </div>

            {/* Large loading spinner */}
            <div className="mb-6">
              <div className="relative">
                <Loader
                  className="w-16 h-16 text-blue-500 mx-auto"
                  style={{ animation: 'spin 3s linear infinite' }}
                />
                <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              </div>
            </div>

            {/* Child-friendly title */}
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Waiting for Teacher! 🎓
            </h2>

            {/* Clear, simple message for children */}
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-2 font-semibold">
                Your teacher hasn't joined the class yet
              </p>
            </div>

            {/* Fun animated elements */}
            <div className="flex justify-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>

            {/* Cancel button */}
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="px-6 py-3 rounded-2xl font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              I'll come back later
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // If there's an error, show error UI
  if (joinError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
          <XCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Unable to Join Class</h2>
          <p className="text-gray-700 mb-6 text-center text-lg">{joinError}</p>
          <div className="flex gap-4">
            <Button onClick={handleGoBack} variant="outline" className="px-6 py-3 rounded-2xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button onClick={handleJoinClass} className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={handleGoBack} 
            variant="ghost" 
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Classes
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Class</h1>
          <p className="text-gray-600">Get ready for your learning session!</p>
        </div>

        {/* Class Details Card */}
        <Card className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border-2 border-blue-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{classDetails.admin_class_name}</h2>
                <p className="text-gray-600">with {classDetails.teacher_name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-xl">
                <Users className="w-4 h-4" />
                <span className="font-semibold">{classDetails.child_name}</span>
              </div>
            </div>
          </div>

          {/* Class Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-800">
                  {new Date(classDetails.class_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
              <Clock className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold text-gray-800">
                  {new Date(`2000-01-01T${classDetails.start_time}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })} - {new Date(`2000-01-01T${classDetails.end_time}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-bold">{timeLeft}</span>
            </div>
          </div>

          {/* Join Button */}
          <div className="text-center">
            {canJoin ? (
              <Button
                onClick={handleJoinClass}
                disabled={isJoining}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {isJoining ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Joining Class...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Join Class Now
                  </>
                )}
              </Button>
            ) : (
              <div className="text-center">
                <Button
                  disabled
                  size="lg"
                  className="bg-gray-300 text-gray-500 px-8 py-4 rounded-2xl font-bold text-lg cursor-not-allowed"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Join Available 15 Minutes Before Class
                </Button>
                <p className="text-gray-600 mt-3 text-sm">
                  You can join this class 15 minutes before it starts
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Additional Info */}
        <Card className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
            What to Expect
          </h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Make sure you have a stable internet connection</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Find a quiet place for the best learning experience</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Have your learning materials ready</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JoinClassPage; 