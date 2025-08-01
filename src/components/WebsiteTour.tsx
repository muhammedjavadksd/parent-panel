// WebsiteTour.tsx
import React, { useEffect, useState } from 'react';
import Joyride, { CallBackProps, Step, STATUS } from 'react-joyride';
import { Sparkles, BookOpen, Calendar, Target, Users, BarChart3, Gamepad2, Trophy, Wallet, HelpCircle, Map, Zap, Brain, Award, FileText, Video, Star, TrendingUp, MessageSquare, Phone, Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Dashboard Tour Steps
const dashboardSteps: Step[] = [
  {
    target: '.premium-hero-section',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Welcome to Your Premium Dashboard! 🎉</h3>
        </div>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.upcoming-class-info',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Upcoming Classes</h3>
        </div>
        <p className="text-gray-600">
          Here you'll see your next scheduled class.
        </p>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            💡 <strong>Pro Tip:</strong> You can join classes 15 minutes before they start
          </p>
        </div>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '.mood-tracker',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">😊</div>
          <h3 className="text-lg font-bold text-gray-800">Mood Tracker</h3>
        </div>
        <p className="text-gray-600">
          Share how you're feeling today!
        </p>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 font-medium">
            🌟 <strong>Fun Fact:</strong> Happy learners perform 20% better!
          </p>
        </div>
      </div>
    ),
    placement: 'left',
  }
];

// Classes Tour Steps
const classesSteps: Step[] = [
  {
    target: 'h1',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Classes & Learning Hub 📚</h3>
        </div>
        <p className="text-gray-600">
          Your central hub for managing all learning activities and class bookings.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.grid.grid-cols-2',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Class Options</h3>
        </div>
        <p className="text-gray-600">
          Choose from different class types and access learning materials.
        </p>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            🎯 <strong>Quick Access:</strong> Book demos, view schedules, and access homework
          </p>
        </div>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'h2',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Learning Statistics</h3>
        </div>
        <p className="text-gray-600">
          Track your progress and performance across all subjects.
        </p>
      </div>
    ),
    placement: 'bottom',
  }
];

// Roadmap Tour Steps
const roadmapSteps: Step[] = [
  {
    target: 'h1',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Map className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Course Roadmap 🗺️</h3>
        </div>
        <p className="text-gray-600">
          Your personalized learning journey with structured modules and milestones.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.border-0.shadow-lg',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Learning Journey Map</h3>
        </div>
        <p className="text-gray-600">
          Visualize your progress through different learning modules and track completion.
        </p>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 font-medium">
            🎯 <strong>Pro Tip:</strong> Complete modules to unlock advanced content
          </p>
        </div>
      </div>
    ),
    placement: 'top',
  }
];

// Experience Tour Steps
const experienceSteps: Step[] = [
  {
    target: 'h1',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Experience Our Learning Programs ⚡</h3>
        </div>
        <p className="text-gray-600">
          Discover premium learning programs designed for academic excellence.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.relative.p-3',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-bold text-gray-800">Premium Programs</h3>
        </div>
        <p className="text-gray-600">
          Explore our flagship programs with free trial options.
        </p>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 font-medium">
            🎁 <strong>Free Trial:</strong> Start with a complimentary session
          </p>
        </div>
      </div>
    ),
    placement: 'top',
  }
];

// Analytics Tour Steps
const analyticsSteps: Step[] = [
  {
    target: 'h1',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Student Analytics 📊</h3>
        </div>
        <p className="text-gray-600">
          Comprehensive insights into your learning progress and performance.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.space-y-1.mb-2',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Performance Tracking</h3>
        </div>
        <p className="text-gray-600">
          Monitor your progress across subjects and identify areas for improvement.
        </p>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            📈 <strong>Insight:</strong> Track trends and set learning goals
          </p>
        </div>
      </div>
    ),
    placement: 'left',
  }
];

// Transactions Tour Steps
const transactionsSteps: Step[] = [
  {
    target: 'h1',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Transactions 💰</h3>
        </div>
        <p className="text-gray-600">
          Manage your payments, view transaction history, and handle your wallet.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.bg-gradient-to-r.from-blue-600',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5 text-white" />
          <h3 className="text-lg font-bold text-white">Account Balance</h3>
        </div>
        <p className="text-white/90">
          View your current balance and recent transaction activity.
        </p>
        <div className="bg-white/20 p-3 rounded-lg border border-white/30">
          <p className="text-sm text-white font-medium">
            💳 <strong>Quick Actions:</strong> Add money or download statements
          </p>
        </div>
      </div>
    ),
    placement: 'bottom',
  }
];

// Leaderboard Tour Steps
const leaderboardSteps: Step[] = [
  {
    target: 'h1',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">🏆 Leaderboard</h3>
        </div>
        <p className="text-gray-600">
          Celebrate achievements and compete with fellow learners in a friendly environment.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.space-y-4.sm\\:space-y-6',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-bold text-gray-800">Top Performers</h3>
        </div>
        <p className="text-gray-600">
          See who's leading the pack and get inspired to improve your ranking.
        </p>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 font-medium">
            🎯 <strong>Motivation:</strong> Compete and climb the leaderboard
          </p>
        </div>
      </div>
    ),
    placement: 'top',
  }
];

// Support Tour Steps
const supportSteps: Step[] = [
  {
    target: 'h1',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Support Center 🆘</h3>
        </div>
        <p className="text-gray-600">
          Get help, find answers, and connect with our support team.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.grid.grid-cols-1.md\\:grid-cols-3',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Contact Options</h3>
        </div>
        <p className="text-gray-600">
          Multiple ways to get support: call, email, or create a ticket.
        </p>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 font-medium">
            📞 <strong>Quick Help:</strong> Call or WhatsApp for immediate assistance
          </p>
        </div>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.space-y-4',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">FAQ & Tickets</h3>
        </div>
        <p className="text-gray-600">
          Find answers to common questions or create support tickets for specific issues.
        </p>
      </div>
    ),
    placement: 'top',
  }
];

// Get tour steps based on current page
const getTourSteps = (pathname: string): Step[] => {
  switch (pathname) {
    case '/':
      return dashboardSteps;
    case '/classes':
      return classesSteps;
    case '/roadmap':
      return roadmapSteps;
    case '/experience':
      return experienceSteps;
    case '/analytics':
      return analyticsSteps;
    case '/transactions':
      return transactionsSteps;
    case '/leaderboard':
      return leaderboardSteps;
    case '/support':
      return supportSteps;
    default:
      return dashboardSteps; // fallback to dashboard tour
  }
};

const WebsiteTour = () => {
  const [run, setRun] = useState(false);
  const location = useLocation();
  const currentSteps = getTourSteps(location.pathname);

  // Run tour on first-time visit
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      // Delay the tour start to ensure all elements are rendered
      const timer = setTimeout(() => {
        setRun(true);
        localStorage.setItem('hasSeenTour', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for manual "Get Tour" trigger
  useEffect(() => {
    const handleStart = () => {
      setRun(true);
    };
    window.addEventListener('startTour', handleStart);
    return () => window.removeEventListener('startTour', handleStart);
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }

  };

  return (
    <Joyride
      steps={currentSteps}
      run={run}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#3b82f6',
          backgroundColor: '#ffffff',
          textColor: '#374151',
          arrowColor: '#ffffff',
        },
        tooltip: {
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '2px solid #e5e7eb',
        },
        tooltipTitle: {
          fontSize: '18px',
          fontWeight: 'bold',
        },
        tooltipContent: {
          fontSize: '14px',
          lineHeight: '1.6',
        },
        buttonNext: {
          backgroundColor: '#3b82f6',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: '500',
        },
        buttonSkip: {
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: '500',
        },
        buttonClose: {
          display: 'none',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        spotlight: {
          backgroundColor: 'transparent',
        },
      }}
      locale={{
        back: '← Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next →',
        skip: 'Skip Tour',
      }}
    />
  );
};

export default WebsiteTour;
