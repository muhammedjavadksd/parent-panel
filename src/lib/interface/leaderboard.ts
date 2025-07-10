export interface TopStudent {
    child_id: number;
    total_points: number;
    total_points_this_week: number;
    child_name: string;
    position: number;
    country: string;
    mobile_number: string;
    child_age: number;
}

export interface ChildScore {
    id: number;
    parent_id: number;
    child_name: string;
    position: number;
    total_points: number;
    total_points_this_week: number;
    child_age: number;
}

export interface ChildPointsBreakup {
    reason: string;
    total_points: string;
    total_points_week: string;
    row_count: number;
    row_count_week: number;
}

export interface LeaderboardResponse {
    success: boolean;
    top_10: TopStudent[];
    child_score: ChildScore;
    child_points_breakup: ChildPointsBreakup[];
} 