// src/components/ProgressDisplay.tsx

import React from 'react';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award, Sun } from 'lucide-react';

//================================================================//
//                 TYPE DEFINITIONS & PROPS                       //
//================================================================//

type ProgressViewType = 'adventure' | 'tree' | 'meter';

interface ProgressDisplayProps {
  /** The completion percentage (a number from 0 to 100). */
  progress: number;
  /** The initial view to display. Defaults to 'adventure'. */
  initialView?: ProgressViewType;
  /** Whether to show the view switcher buttons. Defaults to true. */
  showSwitcher?: boolean;
}


//================================================================//
//              INDIVIDUAL PROGRESS VIEW COMPONENTS               //
//================================================================//

// 1. Adventure Path Component 🗺️
const AdventurePath = ({ progress }: { progress: number }) => {
  const pathData = "M 20 80 C 80 80, 120 20, 180 20 S 260 80, 320 80";
  const pathLength = 310;
  const progressOffset = pathLength * (1 - progress / 100);
  const milestones = [
    { percent: 25, position: { cx: "148", cy: "35" } },
    { percent: 50, position: { cx: "200", cy: "20" } },
    { percent: 75, position: { cx: "252", cy: "35" } },
  ];

  return (
    <div className="p-4 bg-gradient-to-br from-green-50 to-cyan-50 rounded-2xl border border-green-200 shadow-lg flex flex-col items-center">
      <h3 className="text-xl font-bold text-blue-800 mb-2">Your Adventure!</h3>
      <div className="relative w-full flex justify-center">
        <svg viewBox="0 0 340 100" className="w-full max-w-sm">
          <path d={pathData} stroke="#dbeafe" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d={pathData} stroke="url(#progressGradient)" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray={pathLength} strokeDashoffset={progressOffset} style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
          <defs><linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
          {milestones.map(m => (<Star key={m.percent} x={m.position.cx} y={m.position.cy} className={`w-6 h-6 -translate-x-3 -translate-y-3 transition-all duration-500 ${progress >= m.percent ? 'fill-yellow-400 text-yellow-500 scale-110' : 'fill-gray-300 text-gray-400'}`} />))}
          <text x="315" y="70" fontSize="24">🏁</text>
        </svg>
      </div>
      <div className="mt-3 text-center">
        <p className="text-3xl font-bold text-blue-700">{progress}% Complete</p>
        <p className="text-blue-600 font-medium">Keep up the great work!</p>
      </div>
    </div>
  );
};

// 2. Growth Tree Component 🌱
const GrowthTree = ({ progress }: { progress: number }) => {
  const trunkHeight = 30 + progress * 0.6;
  return (
    <div className="p-4 bg-gradient-to-b from-sky-100 to-green-100 rounded-2xl flex flex-col items-center shadow-lg border border-sky-200">
      <h3 className="text-xl font-bold text-green-800 mb-2">Your Knowledge Tree</h3>
      <div className="relative w-full h-48 flex justify-center items-end">
        <Sun className="w-10 h-10 text-yellow-400 absolute top-2 right-4 opacity-70 animate-[spin_20s_linear_infinite]" />
        <svg viewBox="0 0 150 120" className="w-48 h-48 overflow-visible">
          <path d="M 0 115 L 150 115" stroke="#966919" strokeWidth="10" strokeLinecap="round" />
          <rect x="70" y={115 - trunkHeight} width="10" height={trunkHeight} fill="#885417" rx="3" style={{ transition: 'all 1s ease-out' }} />
          <circle cx="75" cy={115 - trunkHeight} r="15" fill="#65a30d" opacity={progress >= 20 ? 1 : 0} style={{ transition: 'all 1s ease-in' }} />
          <circle cx="60" cy={110 - trunkHeight} r="12" fill="#84cc16" opacity={progress >= 45 ? 1 : 0} style={{ transition: 'all 1s ease-in .2s' }} />
          <circle cx="90" cy={110 - trunkHeight} r="12" fill="#84cc16" opacity={progress >= 45 ? 1 : 0} style={{ transition: 'all 1s ease-in .2s' }} />
          <circle cx="78" cy={105 - trunkHeight} r="5" fill="#ef4444" opacity={progress >= 75 ? 1 : 0} style={{ transition: 'opacity 1s ease-in' }} />
          <circle cx="65" cy={98 - trunkHeight} r="5" fill="#ef4444" opacity={progress >= 85 ? 1 : 0} style={{ transition: 'opacity 1s ease-in' }} />
        </svg>
      </div>
      <div className="mt-2 text-center">
        <p className="text-3xl font-bold text-green-700">{progress}%</p>
        <p className="text-green-600 font-medium">You're growing strong!</p>
      </div>
    </div>
  );
};

// 3. Level-Up Meter Component 🏆
const LevelUpMeter = ({ progress }: { progress: number }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const size = 150;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress / 100);

  useEffect(() => {
    if (progress === 100) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex flex-col items-center shadow-lg border border-indigo-200">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <h3 className="text-xl font-bold text-indigo-800 mb-2">Level Meter</h3>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} stroke="#e0e7ff" strokeWidth={strokeWidth} fill="none" /><circle cx={size / 2} cy={size / 2} r={radius} stroke="#6366f1" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={progressOffset} style={{ transition: 'stroke-dashoffset 0.5s linear' }} /></svg>
        <div className="absolute flex flex-col items-center"><Award className="w-8 h-8 text-indigo-500" /><span className="text-3xl font-bold text-indigo-600">{progress}%</span></div>
      </div>
      <div className="mt-3 text-center"><p className="text-indigo-600 font-medium">Keep leveling up!</p></div>
    </div>
  );
};

//================================================================//
//                    MAIN EXPORTED COMPONENT                     //
//================================================================//

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  progress,
  initialView = 'adventure',
  showSwitcher = true,
}) => {
  const [currentView, setCurrentView] = useState<ProgressViewType>(initialView);

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg overflow-hidden p-2 bg-white/30">
        {currentView === 'adventure' && <AdventurePath progress={progress} />}
        {currentView === 'tree' && <GrowthTree progress={progress} />}
        {currentView === 'meter' && <LevelUpMeter progress={progress} />}
      </Card>

      {showSwitcher && (
        <Card className="p-2 rounded-xl bg-white/50 border-blue-200/50 shadow-md">
          <div className="flex justify-center items-center gap-2">
            <span className="text-xs font-bold text-blue-700">Change View:</span>
            <Button size="sm" variant={currentView === 'adventure' ? 'default' : 'outline'} className="rounded-full h-8" onClick={() => setCurrentView('adventure')}>🗺️ Path</Button>
            <Button size="sm" variant={currentView === 'tree' ? 'default' : 'outline'} className="rounded-full h-8" onClick={() => setCurrentView('tree')}>🌱 Tree</Button>
            <Button size="sm" variant={currentView === 'meter' ? 'default' : 'outline'} className="rounded-full h-8" onClick={() => setCurrentView('meter')}>🏆 Meter</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProgressDisplay;