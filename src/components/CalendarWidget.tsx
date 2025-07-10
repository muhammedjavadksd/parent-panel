import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState, useMemo } from "react";
import { Clock, BookOpen, Star } from "lucide-react";

interface Booking {
  id: number;
  classschedule_id: number;
  class_date: string;
  start_time: string;
  end_time: string;
  class_id: number;
  admin_class_name: string;
}

interface UpcomingClass {
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

interface CalendarWidgetProps {
  bookings?: Booking[];
  upcomingClass?: UpcomingClass | null;
}

const CalendarWidget = ({ bookings = [], upcomingClass }: CalendarWidgetProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Convert class_date strings to Date objects for the calendar
  const scheduledDates = useMemo(() => {
    const toLocalNoon = (year: number, month: number, day: number) => {
      // Set to noon UTC to avoid timezone issues
      const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));
      return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    };
    const dates = bookings.map(b => {
      const [year, month, day] = b.class_date.split("-").map(Number);
      return toLocalNoon(year, month, day);
    });
    if (upcomingClass?.class_date) {
      const [y, m, d] = upcomingClass.class_date.split("-").map(Number);
      const upDate = toLocalNoon(y, m, d);
      if (!dates.some(dt => dt.getTime() === upDate.getTime())) {
        dates.push(upDate);
      }
    }
    return dates;
  }, [bookings, upcomingClass]);

  // Helper: Get today's date (no time)
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // Helper: Get week start (Sunday) and end (Saturday) for a given date
  const getWeekRange = (d: Date) => {
    const start = new Date(d);
    start.setDate(d.getDate() - d.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

  // Get bookings for the selected week
  const weekBookings = useMemo(() => {
    if (!date) return [];
    const { start, end } = getWeekRange(date);
    return bookings.filter(b => {
      const [year, month, day] = b.class_date.split("-").map(Number);
      const classDate = new Date(year, month - 1, day);
      return classDate >= start && classDate <= end;
    });
  }, [bookings, date]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-800">My Calendar</h3>
        <span className="text-sm text-blue-600 font-medium">
          {date?.toLocaleString("default", { month: "long" })} {date?.getFullYear()}
        </span>
      </div>
      <div className="flex-1 flex flex-col space-y-3">
        <div className="flex items-center justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full scale-95"
            modifiers={{
              scheduled: scheduledDates,
              today: [today],
            }}
            modifiersStyles={{
              scheduled: {
                backgroundColor: '#3B82F6',
                color: 'white',
                borderRadius: '50%',
              },
              today: {
                backgroundColor: '#facc15', // yellow-400
                color: '#1e293b', // slate-800
                borderRadius: '50%',
                fontWeight: 'bold',
                border: '2px solid #f59e42', // orange-400
              },
            }}
          />
        </div>
        {/* Legend */}
        <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
            <span className="text-xs text-blue-700 font-medium">Class scheduled</span>
            <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm ml-3"></div>
            <span className="text-xs text-yellow-700 font-medium">Today</span>
          </div>
        </div>
        {/* Upcoming Classes This Week */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-yellow-800 flex items-center">
            <Star className="w-3 h-3 mr-1" />
            This Week's Classes
          </h4>
          {weekBookings.length === 0 ? (
            <div className="text-xs text-gray-500 flex flex-col items-center py-4">
              <svg className="w-8 h-8 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M16 3v4M8 3v4M3 9h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <div className="font-semibold">No classes this week.</div>
              <div className="text-xs">Scheduled classes will appear here.</div>
            </div>
          ) : (
            weekBookings.map((b, idx) => (
              <div key={b.id} className="p-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md border border-blue-200 mb-1">
                <div className="flex items-start space-x-1.5">
                  <BookOpen className="w-3 h-3 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800">{b.admin_class_name}</p>
                    <p className="text-xs text-gray-600">
                      {b.class_date} &bull; {b.start_time} - {b.end_time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;

