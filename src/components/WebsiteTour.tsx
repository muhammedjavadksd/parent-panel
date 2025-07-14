// WebsiteTour.tsx
import React, { useEffect, useState } from 'react';
import Joyride, { CallBackProps, Step, STATUS } from 'react-joyride';
import { Sparkles, BookOpen, Calendar, Target, Users, BarChart3, Gamepad2 } from 'lucide-react';

const steps: Step[] = [
  {
    target: '.premium-hero-section',
    content: (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Welcome to Your Premium Dashboard! 🎉</h3>
        </div>
        {/* <p className="text-gray-600">
          This is your personalized learning hub where you can track your child's progress, manage classes, and access all learning resources.
        </p> */}
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

const WebsiteTour = () => {
  const [run, setRun] = useState(false);

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
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }

  };

  return (
    <Joyride
      steps={steps}
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
