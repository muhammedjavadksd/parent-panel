import { FC } from 'react';
import { TopStudent } from '@/lib/interface/leaderboard';
import { Crown, Loader2 } from 'lucide-react';

interface LeaderboardProps {
    top3: TopStudent[];
    loading: boolean;
    error: string | null;
}

const medalColors = [
    'bg-yellow-100 border-yellow-300', // 1st
    'bg-gray-100 border-gray-300',    // 2nd
    'bg-orange-100 border-orange-300' // 3rd
];
const medalText = [
    'text-yellow-700',
    'text-gray-700',
    'text-orange-700'
];
const medalIconBg = [
    'bg-yellow-400',
    'bg-gray-300',
    'bg-orange-400'
];

export const Leaderboard: FC<LeaderboardProps> = ({ top3, loading, error }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
                <span className="ml-3 text-lg text-yellow-700 font-semibold">Loading…</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="text-red-600 text-lg font-semibold">{error}</span>
            </div>
        );
    }
    return (
        <div className="w-full ml-0 mr-0 bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-4 sm:p-6 lg:p-8 pb-12 sm:pb-16">
            <div className="text-center mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🏆</span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-1">Champions of the Week</h2>
                <p className="text-blue-600 text-sm sm:text-base">Our top 3 amazing learners!</p>
            </div>
            <div className="flex justify-center items-end gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8">
                {top3.length === 3 && (
                    <>
                        {/* 2nd */}
                        <div className={`flex-1 flex flex-col items-center justify-center text-center ${medalColors[1]} border-2 rounded-2xl py-4 sm:py-6 shadow-md relative`}>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl mb-2 ${medalIconBg[1]}`}>🥈</div>
                            <div className="text-xl sm:text-2xl">👧</div>
                            <div className={`font-bold text-base sm:text-lg mt-2 ${medalText[1]} text-center w-full`}>{top3[1].child_name}</div>
                            <div className="text-xs sm:text-sm text-gray-500 mb-1 text-center">Advanced Learner</div>
                            <div className="flex justify-center gap-1 text-base sm:text-lg mb-2">🏆 🎯 💎</div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-700">{top3[1].total_points}</div>
                            <div className="text-xs text-gray-400">points</div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold border-2 border-gray-300">2</div>
                            </div>
                        </div>
                        {/* 1st */}
                        <div className={`flex-1 flex flex-col items-center justify-center text-center z-10 scale-105 sm:scale-110 ${medalColors[0]} border-2 rounded-2xl py-6 sm:py-8 shadow-lg relative`}>
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-2 ${medalIconBg[0]}`}>🥇</div>
                            <div className="text-2xl sm:text-3xl">👦</div>
                            <div className={`font-bold text-lg sm:text-xl mt-2 ${medalText[0]} text-center w-full`}>{top3[0].child_name}</div>
                            <div className="text-xs sm:text-sm text-yellow-700 mb-1 text-center">Master Yogi</div>
                            <div className="flex justify-center gap-1 text-lg sm:text-xl mb-2">🏆 🔥 ⭐</div>
                            <div className="text-2xl sm:text-3xl font-bold text-yellow-700">{top3[0].total_points}</div>
                            <div className="text-xs text-gray-400">points</div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center text-2xl font-bold border-2 border-yellow-400"><Crown className="w-6 h-6 text-yellow-700" /></div>
                            </div>
                        </div>
                        {/* 3rd */}
                        <div className={`flex-1 flex flex-col items-center justify-center text-center ${medalColors[2]} border-2 rounded-2xl py-4 sm:py-6 shadow-md relative`}>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl mb-2 ${medalIconBg[2]}`}>🥉</div>
                            <div className="text-xl sm:text-2xl">👦</div>
                            <div className={`font-bold text-base sm:text-lg mt-2 ${medalText[2]} text-center w-full`}>{top3[2].child_name}</div>
                            <div className="text-xs sm:text-sm text-orange-700 mb-1 text-center">Advanced Learner</div>
                            <div className="flex justify-center gap-1 text-base sm:text-lg mb-2">🥉 ✨</div>
                            <div className="text-xl sm:text-2xl font-bold text-orange-700">{top3[2].total_points}</div>
                            <div className="text-xs text-gray-400">points</div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-lg font-bold border-2 border-orange-300">3</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Leaderboard; 