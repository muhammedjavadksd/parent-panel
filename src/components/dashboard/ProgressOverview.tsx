import React from 'react';
import { Star } from 'lucide-react';
import type { ProgressOverview } from '@/lib/interface/dashboard';

interface ProgressOverviewProps {
    data: ProgressOverview | null;
    isLoading: boolean;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-32">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></span>
                <span>Loading...</span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <Star className="w-10 h-10 mb-2 text-gray-300" />
                <div className="text-lg font-semibold mb-1">No progress data found</div>
                <div className="text-sm">Progress data will appear here once available.</div>
            </div>
        );
    }

    const { total_classes, past_classes, streak, coins, rank } = data;
    const progress = total_classes > 0 ? (past_classes / total_classes) * 100 : 0;

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-xs text-gray-500">Classes</div>
                    <div className="font-bold text-lg">{past_classes}/{total_classes}</div>
                </div>
                <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-500">Streak</div>
                    <div className="font-bold text-lg">{streak}</div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-xs text-gray-500">Coins</div>
                    <div className="font-bold text-lg">{coins ?? 0}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500">Rank</div>
                    <div className="font-bold text-lg">{rank ?? 0}</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressOverview; 