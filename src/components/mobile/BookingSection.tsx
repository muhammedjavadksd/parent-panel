
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import BookingPopup from "@/components/BookingPopup";

interface Course {
  name: string;
  description: string;
  emoji: string;
  type: 'demo' | 'master';
}

interface BookingSectionProps {
  title: string;
  courses: Course[];
  onBookingComplete?: (childId: number, bookingType: string) => void;
}

const BookingSection = ({ title, courses, onBookingComplete }: BookingSectionProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'demo' | 'masterclass'>('demo');

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">{title}</h2>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <Card key={index} className="p-4 rounded-2xl bg-white border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="text-2xl mr-3 bg-blue-50 rounded-xl w-12 h-12 flex items-center justify-center border border-blue-100 shadow-sm">
                {course.emoji}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{course.name}</h3>
                <p className="text-xs text-slate-700">{course.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <Label htmlFor={`date-${index}`} className="text-xs text-slate-700 font-semibold">Date</Label>
                <Input
                  id={`date-${index}`}
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-xs border border-blue-100 rounded-xl bg-white shadow-sm focus:border-blue-300 transition-all duration-300 min-h-[44px]"
                />
              </div>
              <div>
                <Label htmlFor={`time-${index}`} className="text-xs text-slate-700 font-semibold">Time</Label>
                <Input
                  id={`time-${index}`}
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="text-xs border border-blue-100 rounded-xl bg-white shadow-sm focus:border-blue-300 transition-all duration-300 min-h-[44px]"
                />
              </div>
            </div>
            
            <Button 
              className={`w-full ${course.type === 'demo' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded-xl text-sm shadow-lg font-semibold transition-all duration-300 min-h-[48px]`}
              onClick={() => {
                setBookingType(course.type === 'demo' ? 'demo' : 'masterclass');
                setBookingPopupOpen(true);
              }}
            >
              {course.type === 'demo' ? 'Book Demo' : 'Book Master Class'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Booking Popup */}
      <BookingPopup
        isOpen={bookingPopupOpen}
        onClose={() => setBookingPopupOpen(false)}
        bookingType={bookingType}
        onBookingComplete={onBookingComplete}
      />
    </div>
  );
};

export default BookingSection;
