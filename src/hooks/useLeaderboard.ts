import { useState, useCallback } from 'react';
import { leaderboardApiService } from '@/services/api/leaderboard';
import { LeaderboardResponse, TopStudent } from '@/lib/interface/leaderboard';

export function useLeaderboard() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [top3, setTop3] = useState<TopStudent[]>([]);
    const [allData, setAllData] = useState<TopStudent[]>([]);

    const fetchTop3 = useCallback(async (child_id: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await leaderboardApiService.getLeaderboard(child_id);

            if (response.status && response.data) {
                const top10 = response.data.top_10 || [];
                setTop3(top10.slice(0, 3));
                setAllData(top10);
            } else {
                setError(response.msg);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch leaderboard');
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, top3, allData, fetchTop3 };
} 