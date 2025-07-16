import React from 'react';
import { Award, BookOpenCheck, FileText, MessageSquareQuote } from 'lucide-react';

// Data for the point-earning items
const pointItems = [
  {
    icon: <BookOpenCheck className="h-4 w-4 text-green-600" />,
    bgColor: 'bg-green-100/70',
    text: 'Complete a Lesson',
    points: '+5 Coins',
    pointsColor: 'text-green-600'
  },
  {
    icon: <FileText className="h-4 w-4 text-blue-600" />,
    bgColor: 'bg-blue-100/70',
    text: 'Submit Homework',
    points: '+5 Coins',
    pointsColor: 'text-blue-600'
  },
  {
    icon: <MessageSquareQuote className="h-4 w-4 text-purple-600" />,
    bgColor: 'bg-purple-100/70',
    text: 'In-Class Participation',
    points: 'Bonus!',
    pointsColor: 'text-purple-600'
  }
];

const LeaderboardGuideCard = () => {
  return (
    <div className="w-full">
      <div className="w-full rounded-xl p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-sky-50 via-rose-50 to-amber-50  border-2 border-blue-200 shadow-lg">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-block p-2 bg-white rounded-full shadow-sm mb-2">
            <Award className="h-5 w-5 text-indigo-500" strokeWidth={2.2} />
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-800">How the Leaderboard Works</h1>
          <p className="text-slate-500 mt-1 text-xs sm:text-sm">Your weekly rank is based on points earned.</p>
        </div>

        {/* Points */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3 text-center sm:text-left">
            Here's How You Earn Points
          </h2>
          <div className="space-y-2">
            {pointItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white/60 p-2.5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`flex-shrink-0 p-2 rounded-full ${item.bgColor}`}>
                  {item.icon}
                </div>
                <p className="ml-3 flex-1 text-slate-700 text-sm">{item.text}</p>
                <span className={`font-bold text-xs ${item.pointsColor}`}>{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardGuideCard;
