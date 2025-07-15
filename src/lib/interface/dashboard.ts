export interface ProgressOverview {
    total_classes: number;
    past_classes: number;
    streak: number;
    coins: number | null;
    rank: number | null;
}


//LEarning Progress

export interface LearningProgressData {
  classes: number;
  learning_time_hours: number;
  total_hours: number;
  achievements: string;
  streak: number;
  coins: number | null;
}




export interface UpcomingClass {
    id: number;
    parent_id: number;
    child_id: number;
    classschedule_id: number;
    class_date: string;
    start_time: string;
    end_time: string;
    class_id: number;
    admin_class_name: string;
}

export interface BookingForCalendar {
    id: number;
    classschedule_id: number;
    class_date: string;
    start_time: string;
    end_time: string;
    class_id: number;
    admin_class_name: string;
}

export interface DashboardHeaderStatsResponse {
    success: boolean;
    message: string;
    progress_overview: ProgressOverview;
    learning_progress: LearningProgressData | null;
    upcoming_class_parent_level: UpcomingClass;
    bookings_for_calendar: BookingForCalendar[];
}

export interface DashboardState {
    progressOverview: ProgressOverview | null;
    upcomingClass: UpcomingClass | null;
    bookingsForCalendar: BookingForCalendar[];
    isLoading: boolean;
    error: string | null;
}

export interface Booking {
    id: number;
    schedulebooking_id: number;
    parent_id: number;
    parent_name: string;
    child_id: number;
    child_name: string;
    classschedule_id: number;
    class_date: string;
    start_time: string;
    end_time: string;
    class_id: number;
    admin_class_name: string;
    is_cancelled: string;
    attended_class: string;
    confirmed: number;
    updated_by: string;
    cancellation_date: string | null;
    lead_timezone: string;
    points: string;
    seconds_diff: number;
    details_url: string;
    feedback_url: string;
    can_join?: boolean;
}

export interface BookingsResponse {
    success: boolean;
    message: string;
    bookings: {
        current_page: number;
        data: Booking[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}

export interface BookingFilters {
    type: 'upcoming' | 'past';
    search_child_id?: number | null;
    search_class_id?: number | null;
    class_date?: string | null;
    page?: number;
    limit?: number;
} 