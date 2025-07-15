import { useState, useCallback, useEffect } from 'react';
import { leaderboardApiService } from '@/services/api/leaderboard';
import { LeaderboardResponse, TopStudent, ChildPointsBreakup, ChildScore } from '@/lib/interface/leaderboard';
import { useChildren } from '@/hooks/useChildren'; // assuming you use this for selected child

export function useLeaderboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [top3, setTop3] = useState<TopStudent[]>([]);
  const [allData, setAllData] = useState<TopStudent[]>([]);
  const [childData, setChildData] = useState<ChildPointsBreakup[]>([]);
  const [childScor, setChildScor] = useState<ChildScore | null>(null);

  const { selectedChild } = useChildren();

  const fetchTop3 = useCallback(async (child_id?: number | null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await leaderboardApiService.getLeaderboard(child_id ?? undefined); // pass nothing if null

      if (response.status && response.data) {
        const top10 = response.data.top_10 || [];
        setTop3(top10.slice(0, 3));
        setAllData(top10);
        setChildData(response?.data?.child_points_breakup || []);
        setChildScor(response?.data?.child_score || null);
      } else {
        setError(response.msg || 'Unknown error');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔁 Auto fetch on mount
  useEffect(() => {
    fetchTop3(selectedChild?.id ?? null);
  }, [fetchTop3, selectedChild]);

  return { loading, error, top3, allData, fetchTop3, childData, childScor };
}
