import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, LogIn, Clock, Users, Video, Mic, Wifi, ArrowLeft, CheckCircle, XCircle, Laptop } from 'lucide-react';
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

// Quiz Games Data
const quizGames = {
  english: {
    title: 'English Quiz',
    description: 'Test your English knowledge',
    icon: '📚',
    questions: [
      {
        question: 'What is the past tense of "go"?',
        options: [
          { label: 'A.', value: 'goed' },
          { label: 'B.', value: 'went' },
          { label: 'C.', value: 'gone' },
          { label: 'D.', value: 'going' },
        ],
        answer: 1
      },
      {
        question: 'Which word is a synonym for "happy"?',
        options: [
          { label: 'A.', value: 'sad' },
          { label: 'B.', value: 'joyful' },
          { label: 'C.', value: 'angry' },
          { label: 'D.', value: 'tired' },
        ],
        answer: 1
      },
      {
        question: 'What is the plural form of "child"?',
        options: [
          { label: 'A.', value: 'childs' },
          { label: 'B.', value: 'children' },
          { label: 'C.', value: 'childes' },
          { label: 'D.', value: 'child' },
        ],
        answer: 1
      },
      {
        question: 'Which sentence is grammatically correct?',
        options: [
          { label: 'A.', value: 'Me and him went to the store.' },
          { label: 'B.', value: 'He and I went to the store.' },
          { label: 'C.', value: 'Him and me went to the store.' },
          { label: 'D.', value: 'I and he went to the store.' },
        ],
        answer: 1
      },
      {
        question: 'What is the opposite of "brave"?',
        options: [
          { label: 'A.', value: 'strong' },
          { label: 'B.', value: 'cowardly' },
          { label: 'C.', value: 'weak' },
          { label: 'D.', value: 'fearful' },
        ],
        answer: 1
      }
    ]
  },
  math: {
    title: 'Math Quiz',
    description: 'Solve mathematical problems',
    icon: '🧮',
    questions: [
      {
        question: 'What is 15 × 8?',
        options: [
          { label: 'A.', value: '120' },
          { label: 'B.', value: '125' },
          { label: 'C.', value: '130' },
          { label: 'D.', value: '115' },
        ],
        answer: 0
      },
      {
        question: 'What is 24 ÷ 6?',
        options: [
          { label: 'A.', value: '3' },
          { label: 'B.', value: '4' },
          { label: 'C.', value: '5' },
          { label: 'D.', value: '6' },
        ],
        answer: 1
      },
      {
        question: 'What is 7² (7 squared)?',
        options: [
          { label: 'A.', value: '14' },
          { label: 'B.', value: '49' },
          { label: 'C.', value: '64' },
          { label: 'D.', value: '56' },
        ],
        answer: 1
      },
      {
        question: 'What is 3/4 + 1/4?',
        options: [
          { label: 'A.', value: '1/2' },
          { label: 'B.', value: '1' },
          { label: 'C.', value: '4/8' },
          { label: 'D.', value: '2/4' },
        ],
        answer: 1
      },
      {
        question: 'What is 20% of 50?',
        options: [
          { label: 'A.', value: '5' },
          { label: 'B.', value: '10' },
          { label: 'C.', value: '15' },
          { label: 'D.', value: '25' },
        ],
        answer: 1
      }
    ]
  },
  gita: {
    title: 'Bhagwat Geeta Quiz',
    description: 'Learn spiritual wisdom',
    icon: '🕉️',
    questions: [
      {
        question: 'What does "Karma" mean in Bhagwat Geeta?',
        options: [
          { label: 'A.', value: 'Action' },
          { label: 'B.', value: 'Destiny' },
          { label: 'C.', value: 'Prayer' },
          { label: 'D.', value: 'Meditation' },
        ],
        answer: 0
      },
      {
        question: 'Who is the main teacher in Bhagwat Geeta?',
        options: [
          { label: 'A.', value: 'Lord Rama' },
          { label: 'B.', value: 'Lord Krishna' },
          { label: 'C.', value: 'Lord Shiva' },
          { label: 'D.', value: 'Lord Brahma' },
        ],
        answer: 1
      },
      {
        question: 'What is "Dharma" in Bhagwat Geeta?',
        options: [
          { label: 'A.', value: 'Religion' },
          { label: 'B.', value: 'Duty' },
          { label: 'C.', value: 'Prayer' },
          { label: 'D.', value: 'Meditation' },
        ],
        answer: 1
      },
      {
        question: 'What does "Moksha" mean?',
        options: [
          { label: 'A.', value: 'Wealth' },
          { label: 'B.', value: 'Liberation' },
          { label: 'C.', value: 'Knowledge' },
          { label: 'D.', value: 'Power' },
        ],
        answer: 1
      },
      {
        question: 'What is the main message of Bhagwat Geeta?',
        options: [
          { label: 'A.', value: 'To fight wars' },
          { label: 'B.', value: 'To perform duties without attachment' },
          { label: 'C.', value: 'To avoid all actions' },
          { label: 'D.', value: 'To seek material wealth' },
        ],
        answer: 1
      }
    ]
  }
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreCard, setShowScoreCard] = useState(false);

  const { data: joinData, isLoading: isJoining, doJoinClass, clearError: clearJoinError, clearData: clearJoinData } = useJoinClass();
  const { bookings, loadUpcomingClasses } = useBookings();

  // Determine quiz type based on class name
  const getQuizType = (className: string) => {
    const lowerClassName = className?.toLowerCase() || '';
    if (lowerClassName.includes('english')) return 'english';
    if (lowerClassName.includes('math')) return 'math';
    if (lowerClassName.includes('gita')) return 'gita';
    return 'math'; // default to math
  };

  const quizType = getQuizType(classDetails?.admin_class_name);
  const currentQuiz = quizGames[quizType];
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];

  // Debug logging
  console.log('Quiz Type:', quizType);
  console.log('Current Quiz:', currentQuiz);
  console.log('Current Question Index:', currentQuestionIndex);
  console.log('Show Score Card:', showScoreCard);
  console.log('Score:', score);

  const handleNextQuestion = () => {
    console.log('Next Question clicked. Current index:', currentQuestionIndex, 'Total questions:', currentQuiz?.questions.length);
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // Show score card when all questions are answered
      console.log('Showing score card');
      setShowScoreCard(true);
    }
  };

  const handleAnswerSelect = (selectedIndex: number) => {
    if (!showResult) {
      setSelected(selectedIndex);
      setShowResult(true);
      
      // Check if answer is correct and update score
      if (selectedIndex === currentQuestion.answer) {
        setScore(prev => prev + 1);
      }
      
      // If this is the last question, automatically show score card after a delay
      if (currentQuestionIndex === currentQuiz.questions.length - 1) {
        setTimeout(() => {
          setShowScoreCard(true);
        }, 2000); // Show score card after 2 seconds
      }
    }
  };

  const handlePlayMoreGames = () => {
    navigate('/games');
  };

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
      // console.log('Joining class', classDetails);
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

    return `${days.toString()}d ${hours
      .toString()
      .padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds
        .toString()
        .padStart(2, '0')}s`;
  };

  const c = classDetails || fallbackClass;

  console.log('classDetails', classDetails);

  // Professional Blue-White Theme Colors
  const gradientText = 'text-indigo-600';
  const glass = 'bg-white border border-slate-200 shadow-sm';
  const iconCircle = 'rounded-full flex items-center justify-center w-8 h-8 md:w-9 md:h-9';
  const iconColors = [
    'bg-indigo-600 text-white',
    'bg-blue-600 text-white', 
    'bg-slate-600 text-white'
  ];

  if (isLoadingClass) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 md:px-8 lg:px-12 py-2 relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-30 z-0" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-20 z-0" />
      
      {/* Main scaled content */}
      <div className="w-full md:scale-90 md:origin-top mx-auto relative z-10">
        {/* Header */}
        <div className="w-full max-w-4xl mx-auto text-center mb-2">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Laptop className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl md:text-4xl font-extrabold mb-1 tracking-tight ${gradientText}`}>{c.admin_class_name}</h1>
          <div className="text-lg text-slate-600 italic font-medium mb-1">for {c.child_name}</div>
          <div className="w-16 h-1 mx-auto bg-indigo-600 rounded-full mb-2" />
        </div>

        {/* Main content grid */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 min-h-[400px]" style={{ height: '60vh' }}>
          {/* Left column: 3 stacked blocks */}
          <div className="flex flex-col gap-4 md:col-span-1">
            {/* Class Details */}
            <Card className={`p-4 flex flex-col gap-2 rounded-lg ${glass}`}>
              <div className="flex items-center gap-2 text-slate-800 font-semibold mb-1 text-base">
                <span className={`${iconCircle} ${iconColors[0]}`}><Video className="w-5 h-5" /></span> Class Details
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <span className={`${iconCircle} bg-slate-100 text-slate-700 border border-slate-300`}><Clock className="w-4 h-4" /></span>
                <span>{formatTime(c.start_time)} • {formatDuration(c.start_time, c.end_time)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <span className={`${iconCircle} bg-slate-100 text-slate-700 border border-slate-300 `}><Users className="w-4 h-4" /></span>
                <span>{c.child_name}</span>
              </div>
              {/* <div className="flex items-center gap-2 text-slate-700 text-sm">
                <span className={`${iconCircle} bg-indigo-600 text-white`}><Users className="w-4 h-4" /></span>
                <span>{c.students_joining || 1} students joining</span>
              </div> */}
            </Card>

            {/* Countdown */}
            <Card className={`p-4 flex flex-col items-center gap-3 rounded-lg ${glass}`}>
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-base">
                <Clock className="w-5 h-5 text-indigo-600" />
                Time Until Class
              </div>
              <div className="text-2xl font-mono font-bold text-indigo-600 tracking-wide text-center bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200">
                {formatCountdown(timeLeft)}
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${canJoin ? 'bg-indigo-600 text-white shadow-md' : 'bg-orange-500 text-white shadow-md animate-pulse'}`}>
                {canJoin ? 'Ready to Join' : 'Please Wait'}
              </span>
            </Card>

            {/* Tech Check */}
            <Card className={`p-4 flex flex-col gap-2 rounded-lg ${glass}`}>
              <div className="flex items-center gap-2 text-slate-800 font-semibold mb-1 text-base">
                <span className={`${iconCircle} bg-blue-600 text-white`}><CheckCircle className="w-5 h-5" /></span> Tech Check
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <span className={`${iconCircle} bg-slate-100 text-slate-700 border border-slate-300`}><Video className="w-4 h-4" /></span> Camera <span className="ml-auto text-green-600">✔️</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <span className={`${iconCircle} bg-slate-100 text-slate-700 border border-slate-300`}><Mic className="w-4 h-4" /></span> Microphone <span className="ml-auto text-green-600">✔️</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <span className={`${iconCircle} bg-slate-100 text-slate-700 border border-slate-300`}><Wifi className="w-4 h-4" /></span> Internet <span className="ml-auto text-green-600">✔️</span>
              </div>
              <Button variant="outline" className="mt-1 h-8 px-4 py-1 text-sm font-semibold border-slate-300 hover:bg-slate-50 text-slate-700">
                Run Tech Check
              </Button>
            </Card>
          </div>

          {/* Right column: Game box */}
          <div className="md:col-span-2 flex flex-col h-full">
            <Card className={`flex-1 min-h-[320px] flex flex-col items-center justify-center bg-white rounded-lg shadow-md border border-slate-200 p-0 relative overflow-hidden`}>
              {!showScoreCard ? (
                <div className="w-full max-w-md mx-auto flex flex-col items-center p-4">
                  <div className="flex flex-col items-center mb-2">
                    <div className="rounded-full bg-indigo-600 p-3 mb-2 shadow-sm">
                      <span role="img" aria-label="brain" className="text-3xl">{currentQuiz?.icon}</span>
                    </div>
                    <div className="text-center mb-1">
                      <div className="font-extrabold text-xl text-slate-800 tracking-tight">{currentQuiz?.title}</div>
                      <div className="text-sm text-slate-500 mt-1">Question {currentQuestionIndex + 1} of {currentQuiz?.questions.length}</div>
                    </div>
                    <div className="text-base text-slate-600 mb-2 font-medium">{currentQuestion?.question}</div>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    {currentQuestion?.options.map((opt, idx) => {
                      let state = '';
                      if (showResult) {
                        if (idx === currentQuestion.answer) state = 'border-green-500 bg-green-50 text-green-800 border-2';
                        else if (selected === idx) state = 'border-red-500 bg-red-50 text-red-800 border-2';
                      } else if (selected === idx) {
                        state = 'border-indigo-500 bg-indigo-50 text-indigo-800 border-2';
                      }
                      return (
                        <button
                          key={idx}
                          className={`w-full text-left rounded-lg border px-4 py-2 text-base font-semibold transition-all focus:outline-none shadow-sm flex items-center gap-2 hover:shadow-md duration-150 ${state || 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700'}`}
                          onClick={() => handleAnswerSelect(idx)}
                          type="button"
                          disabled={showResult}
                        >
                          <span className="mr-2 font-bold text-lg">{opt.label}</span> {opt.value}
                          {showResult && idx === currentQuestion.answer && <CheckCircle className="ml-auto w-5 h-5 text-green-600" />}
                          {showResult && selected === idx && idx !== currentQuestion.answer && <XCircle className="ml-auto w-5 h-5 text-red-600" />}
                        </button>
                      );
                    })}
                  </div>
                  {showResult && (
                    <div className="mt-4 text-center w-full">
                      <div className="mb-3">
                        {/* {selected === currentQuestion.answer ? (
                          <span className="text-green-600 font-bold text-lg flex items-center justify-center gap-2">
                            Correct! <CheckCircle className="w-5 h-5" />
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold text-lg flex items-center justify-center gap-2">
                            Better luck next time! <XCircle className="w-5 h-5" />
                          </span>
                        )} */}
                      </div>
                        <Button
                          onClick={handleNextQuestion}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2"
                        >
                          {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                        </Button>
                    </div>
                  )}
                </div>
              ) : (
                // Score Card
                <div className="w-full max-w-md mx-auto flex flex-col items-center p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="rounded-full bg-indigo-600 p-4 mb-4 shadow-lg">
                      <span role="img" aria-label="trophy" className="text-4xl">🏆</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
                    <div className="text-lg text-slate-600 mb-4">Your Score</div>
                    
                    {/* Score Display */}
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full px-8 py-4 mb-6 shadow-lg">
                      <div className="text-4xl font-bold">{score}/{currentQuiz?.questions.length}</div>
                      <div className="text-sm opacity-90">
                        {score === currentQuiz?.questions.length ? 'Perfect Score! 🎉' : 
                         score >= currentQuiz?.questions.length * 0.8 ? 'Great Job! 👏' :
                         score >= currentQuiz?.questions.length * 0.6 ? 'Good Work! 👍' : 'Keep Practicing! 💪'}
                      </div>
                    </div>
                    
                    {/* Percentage */}
                    <div className="text-2xl font-bold text-indigo-600 mb-6">
                      {Math.round((score / currentQuiz?.questions.length) * 100)}%
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 w-full">
                    <Button
                      onClick={handlePlayMoreGames}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold"
                    >
                      🎮 Play More Games
                    </Button>
                    <Button
                      onClick={() => {
                        setShowScoreCard(false);
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setSelected(null);
                        setShowResult(false);
                      }}
                      variant="outline"
                      className="w-full border-slate-300 hover:bg-slate-50 text-slate-700 py-3 text-lg font-semibold"
                    >
                      🔄 Retake Quiz
                    </Button>
                  </div>
                </div>
              )}

              {/* Fixed button bar */}
              <div className="absolute left-0 right-0 bottom-0 w-full bg-white border-t border-slate-200 flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center px-4 py-3">
                <Button
                  onClick={handleJoinClass}
                  disabled={!canJoin || isJoining}
                  size="lg"
                  className={`w-full md:w-auto px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white ${canJoin ? 'hover:shadow-lg' : 'opacity-50'}`}
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
                <Button 
                  onClick={handleGoBack} 
                  variant="outline" 
                  size="lg" 
                  className="w-full md:w-auto px-8 py-3 rounded-lg font-bold text-lg border-slate-300 hover:bg-slate-50 text-slate-700 hover:border-slate-400"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Classes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinClassPage;