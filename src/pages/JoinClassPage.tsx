import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, LogIn, Clock, Users, Video, Mic, Wifi, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useJoinClass } from '@/hooks/useJoinClass';
import { useBookings } from '@/hooks/useBookings';

const fallbackClass = {
  admin_class_name: 'Class Name',
  teacher_name: 'Teacher Name',
  class_date: '',
  start_time: '',
  end_time: '',
  duration: 45,
  students_joining: 1,
};

const warmup = {
  question: 'What is 15 × 8?',
  options: [
    { label: 'A.', value: '120' },
    { label: 'B.', value: '125' },
    { label: 'C.', value: '130' },
    { label: 'D.', value: '115' },
  ],
  answer: 0,
};

const JoinClassPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0); // seconds
  const [canJoin, setCanJoin] = useState(false);
  const [isLoadingClass, setIsLoadingClass] = useState(true);
  const [progress, setProgress] = useState(0); // 0-1
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { data: joinData, isLoading: isJoining, doJoinClass, clearError: clearJoinError, clearData: clearJoinData } = useJoinClass();
  const { bookings, loadUpcomingClasses } = useBookings();

  useEffect(() => {
    const loadClassDetails = async () => {
      if (!classId) return;
      try {
        await loadUpcomingClasses();
      } finally {
        setIsLoadingClass(false);
      }
    };
    loadClassDetails();
  }, [classId, loadUpcomingClasses]);

  useEffect(() => {
    if (bookings && classId) {
      const classItem = bookings.find(booking => booking.schedulebooking_id.toString() === classId);
      setClassDetails(classItem || null);
    }
  }, [bookings, classId]);

  useEffect(() => {
    if (!classDetails) return;
    const getTimeLeft = () => {
      const now = new Date();
      const classTime = new Date(`${classDetails.class_date}T${classDetails.start_time}`);
      const secondsToClass = Math.floor((classTime.getTime() - now.getTime()) / 1000);
      setTimeLeft(Math.max(0, secondsToClass));
      const total = 60 * 15;
      setProgress(Math.min(1, Math.max(0, 1 - secondsToClass / total)));
      setCanJoin(secondsToClass <= 15 * 60 && secondsToClass >= -60 * 60);
    };
    getTimeLeft();
    const interval = setInterval(getTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [classDetails]);

  const handleJoinClass = useCallback(() => {
    if (classId && canJoin) {
      clearJoinError();
      clearJoinData();
      doJoinClass(classId);
    }
  }, [classId, canJoin, doJoinClass, clearJoinError, clearJoinData]);

  useEffect(() => {
    if (joinData && joinData.join_url) {
      window.open(joinData.join_url, '_blank');
      clearJoinData();
    }
  }, [joinData, clearJoinData]);

  const handleGoBack = () => {
    navigate('/upcoming-classes');
  };

  const formatTime = (t: string) => t ? new Date(`2000-01-01T${t}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '--';
  const formatDuration = (start: string, end: string) => {
    if (!start || !end) return '--';
    const s = new Date(`2000-01-01T${start}`);
    const e = new Date(`2000-01-01T${end}`);
    return `${Math.round((e.getTime() - s.getTime()) / 60000)} minutes`;
  };
  const formatCountdown = (secs: number) => {
    if (secs <= 0) return '00:00:00:00';

    const days = Math.floor(secs / (24 * 3600));
    const hours = Math.floor((secs % (24 * 3600)) / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    return `${days.toString().padStart(2, '0')}:${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
  };


  const c = classDetails || fallbackClass;

  // Colors
  const gradientText = 'bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent';
  const glass = 'bg-white/80 backdrop-blur-md shadow-xl border border-blue-100';
  const iconCircle = 'rounded-full flex items-center justify-center w-8 h-8 md:w-9 md:h-9 shadow-md';
  const iconColors = ['bg-blue-100 text-blue-700', 'bg-blue-200 text-blue-700', 'bg-blue-300 text-blue-800'];

  if (isLoadingClass) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 md:px-8 lg:px-12 py-2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #eaf1fb 0%, #fafdff 100%)' }}>
      {/* Abstract blue shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-100/60 to-blue-200/30 rounded-full blur-2xl z-0 animate-pulse" style={{ filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tr from-blue-100/60 to-blue-200/40 rounded-full blur-2xl z-0 animate-pulse" style={{ filter: 'blur(60px)' }} />
      {/* Main scaled content */}
      <div className="w-full md:scale-90 md:origin-top mx-auto">
        {/* Header */}
        <div className="w-full max-w-4xl mx-auto text-center mb-2 z-10">
          <h1 className={`text-3xl md:text-4xl font-extrabold mb-1 tracking-tight drop-shadow-sm ${gradientText}`}>{c.admin_class_name}</h1>
          <div className="text-lg text-blue-500 italic font-medium mb-1">for {c.child_name}</div>
          <div className="w-16 h-1 mx-auto bg-gradient-to-r from-blue-400 to-blue-300 rounded-full opacity-60 mb-2" />
        </div>
        {/* Main content grid */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 min-h-[400px] z-10" style={{ height: '60vh' }}>
          {/* Left column: 3 stacked blocks */}
          <div className="flex flex-col gap-4 md:col-span-1">
            {/* Class Details */}
            <Card className={`p-4 flex flex-col gap-2 rounded-2xl ${glass}`}>
              <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1 text-base">
                <span className={`${iconCircle} ${iconColors[0]}`}><Video className="w-5 h-5" /></span> Class Details
              </div>
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <span className={`${iconCircle} ${iconColors[1]}`}><Clock className="w-4 h-4" /></span>
                <span>{formatTime(c.start_time)} • {formatDuration(c.start_time, c.end_time)}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <span className={`${iconCircle} ${iconColors[2]}`}><Users className="w-4 h-4" /></span>
                <span>{c.child_name}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <span className={`${iconCircle} bg-blue-200 text-blue-700`}><Users className="w-4 h-4" /></span>
                <span>{c.students_joining || 1} students joining</span>
              </div>
            </Card>
            {/* Countdown */}
            <Card className={`p-4 flex flex-col items-center gap-2 rounded-2xl ${glass}`}>
              <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1 text-base">
                <span className={`${iconCircle} bg-blue-200 text-blue-700`}><Clock className="w-5 h-5" /></span> Time Until Class
              </div>
              <div className="text-3xl font-mono font-extrabold text-blue-700 mb-1 tracking-widest drop-shadow-sm" style={{ letterSpacing: '0.1em' }}>{formatCountdown(timeLeft)}</div>
              <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden mb-1">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-300 animate-pulse transition-all duration-500" style={{ width: `${progress * 100}%` }}></div>
              </div>
              <span className={`px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow ${canJoin ? 'bg-blue-100 text-blue-700 animate-pulse' : 'bg-blue-50 text-blue-400 animate-pulse-slow'}`}>{canJoin ? 'Join Now' : 'Please Wait'}</span>
            </Card>
            {/* Tech Check */}
            <Card className={`p-4 flex flex-col gap-2 rounded-2xl ${glass}`}>
              <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1 text-base">
                <span className={`${iconCircle} bg-blue-200 text-blue-700`}><Video className="w-5 h-5" /></span> Tech Check
              </div>
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <span className={`${iconCircle} bg-blue-100 text-blue-700`}><Video className="w-4 h-4" /></span> Camera <span className="ml-auto transition-all duration-300">✔️</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <span className={`${iconCircle} bg-blue-100 text-blue-700`}><Mic className="w-4 h-4" /></span> Microphone <span className="ml-auto transition-all duration-300">✔️</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <span className={`${iconCircle} bg-blue-100 text-blue-700`}><Wifi className="w-4 h-4" /></span> Internet <span className="ml-auto transition-all duration-300">✔️</span>
              </div>
              <Button variant="outline" className="mt-1 h-8 px-4 py-1 text-sm font-semibold border-blue-200 hover:bg-blue-50 transition-all duration-200">Run Tech Check</Button>
            </Card>
          </div>
          {/* Right column: Game box */}
          <div className="md:col-span-2 flex flex-col h-full">
            <Card className={`flex-1 min-h-[320px] flex flex-col items-center justify-center bg-white/90 rounded-2xl shadow-2xl border border-blue-100 p-0 relative overflow-hidden ${glass}`}>
              <div className="w-full max-w-md mx-auto flex flex-col items-center p-4">
                <div className="flex flex-col items-center mb-2">
                  <div className="rounded-full bg-gradient-to-br from-blue-200 to-blue-400 p-3 mb-2 shadow-lg animate-pulse-slow"><span role="img" aria-label="brain" className="text-3xl">🧠</span></div>
                  <div className="font-extrabold text-xl text-blue-900 mb-1 tracking-tight drop-shadow-sm">Quick Math Warm-up</div>
                  <div className="text-base text-blue-700 mb-2 font-medium">{warmup.question}</div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  {warmup.options.map((opt, idx) => {
                    let state = '';
                    if (showResult) {
                      if (idx === warmup.answer) state = 'border-blue-500 bg-blue-50 text-blue-900';
                      else if (selected === idx) state = 'border-blue-200 bg-blue-50 text-blue-400';
                    } else if (selected === idx) {
                      state = 'border-blue-400 bg-blue-100 text-blue-900';
                    }
                    return (
                      <button
                        key={idx}
                        className={`w-full text-left rounded-xl border px-4 py-2 text-base font-semibold transition-all focus:outline-none shadow-sm flex items-center gap-2 hover:scale-[1.03] active:scale-100 duration-150 ${state || 'bg-white border-blue-100 hover:bg-blue-50'}`}
                        onClick={() => {
                          if (!showResult) {
                            setSelected(idx);
                            setShowResult(true);
                          }
                        }}
                        type="button"
                        disabled={showResult}
                      >
                        <span className="mr-2 font-bold text-lg">{opt.label}</span> {opt.value}
                        {showResult && idx === warmup.answer && <CheckCircle className="ml-auto w-5 h-5 text-blue-500 animate-bounce" />}
                        {showResult && selected === idx && idx !== warmup.answer && <XCircle className="ml-auto w-5 h-5 text-blue-300 animate-shake" />}
                      </button>
                    );
                  })}
                </div>
                {showResult && (
                  <div className="mt-4 text-center">
                    {selected === warmup.answer ? (
                      <span className="text-blue-700 font-bold text-lg flex items-center justify-center gap-2">Correct! <CheckCircle className="w-5 h-5" /></span>
                    ) : (
                      <span className="text-blue-400 font-bold text-lg flex items-center justify-center gap-2">Try again next time! <XCircle className="w-5 h-5" /></span>
                    )}
                  </div>
                )}
              </div>
              {/* Fixed button bar */}
              <div className="absolute left-0 right-0 bottom-0 w-full bg-white/80 border-t border-blue-100 flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center px-4 py-3 z-20">
                <Button
                  onClick={handleJoinClass}
                  disabled={!canJoin || isJoining}
                  size="lg"
                  className={`w-full md:w-auto px-8 py-3 rounded-2xl font-extrabold text-lg shadow-xl transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-blue-400 text-white border-0 ${canJoin ? 'animate-glow' : ''}`}
                  style={canJoin ? { boxShadow: '0 0 16px 2px #60a5fa, 0 0 32px 4px #3b82f6' } : {}}
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
                <Button onClick={handleGoBack} variant="outline" size="lg" className="w-full md:w-auto px-8 py-3 rounded-2xl font-bold text-lg border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Classes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-glow {
          animation: glowPulse 1.5s infinite alternate;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 16px 2px #60a5fa, 0 0 32px 4px #3b82f6; }
          100% { box-shadow: 0 0 32px 8px #93c5fd, 0 0 48px 12px #dbeafe; }
        }
        .animate-pulse-slow {
          animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};

export default JoinClassPage; 