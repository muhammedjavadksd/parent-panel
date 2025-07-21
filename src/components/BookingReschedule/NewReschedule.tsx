import { useEffect, useState, useMemo } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { User } from 'lucide-react'; // Assuming you're using lucide-react for icons

interface TimeSlot {
    start_time: string;
    end_time: string;
}

interface DailySlot {
    class_date: string;
    slots: TimeSlot[];
}

interface TeacherData {
    teacher: {
        faculty_id: number;
        first_name: string;
        last_name: string;
        photo?: string;
    };
    available_slots: DailySlot[];
}

// interface RescheduleBookingProps {
//   schedulebooking_id: number;
// }

interface RescheduleBookingProps {
    schedulebooking_id: number;
    onClose: () => void; // ✅ Add this line
}



const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

function RescheduleBooking({ schedulebooking_id, onClose }: RescheduleBookingProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const {
        loading,
        error,
        success,
        availableSlots,
        getAvailableSlots,
        handleRescheduleNew,
    } = useBooking();

    useEffect(() => {
        if (schedulebooking_id) getAvailableSlots(schedulebooking_id);
    }, [schedulebooking_id]);


        // ✅ ADD THIS EFFECT
    // This effect handles closing the modal on success
    useEffect(() => {
        if (success === 'Class rescheduled successfully.') {
            // Wait 2 seconds to allow the user to see the success message
            const timer = setTimeout(() => {
                onClose();
            }, 2000); 

            // Clean up the timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [success, onClose]);

    const selectedTeacherData = useMemo(() => {
        return availableSlots?.data?.find(t => t.teacher.faculty_id === selectedTeacherId);
    }, [availableSlots, selectedTeacherId]);

    const slotsForSelectedDate = useMemo(() => {
        if (!selectedTeacherData || !selectedDate) return [];
        return (
            selectedTeacherData.available_slots.find(s => s.class_date === selectedDate)?.slots || []
        );
    }, [selectedTeacherData, selectedDate]);

    const onConfirmReschedule = async () => {
        if (!selectedTeacherId || !selectedDate || !selectedSlot) {
            alert('Please select teacher, date, and time slot.');
            return;
        }
        const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
        const dates: [string, string, string][] = [[dayOfWeek, selectedDate, selectedSlot]];
        await handleRescheduleNew(selectedTeacherId, schedulebooking_id, dates);
    };

    return (
        <div className="fixed inset-0 z-[99] bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 "
            style={{ zIndex: 2000 }}>
            <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 animate-fade-in border border-blue-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-2xl text-slate-500 hover:text-slate-800"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Reschedule Class</h2>

                {/* Step 1 - Teacher */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">1. Select a Teacher</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {availableSlots?.data?.map((teacherData: TeacherData) => (
                            <div
                                key={teacherData.teacher.faculty_id}
                                onClick={() => {
                                    setSelectedTeacherId(teacherData.teacher.faculty_id);
                                    setSelectedDate(null);
                                    setSelectedSlot(null);
                                }}
                                className={`p-3 border rounded-xl text-center cursor-pointer transition-all duration-200
                                    ${selectedTeacherId === teacherData.teacher.faculty_id
                                        ? 'bg-blue-50 border-blue-500 shadow-sm'
                                        : 'hover:border-blue-300 border-slate-200'
                                    }`}
                            >
                                {teacherData.teacher.photo.includes("https") ? (
                                    <img
                                        src={teacherData.teacher.photo}
                                        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                                        alt={teacherData.teacher.first_name}
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                                        <User className="w-6 h-6 text-slate-500" />
                                    </div>
                                )}
                                <p className="font-medium text-sm text-slate-700">
                                    {teacherData.teacher.first_name} {teacherData.teacher.last_name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 2 - Date */}
                {selectedTeacherData && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-blue-700 mb-3">2. Select a Date</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedTeacherData.available_slots.map(slot => (
                                <button
                                    key={slot.class_date}
                                    onClick={() => setSelectedDate(slot.class_date)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                                        ${selectedDate === slot.class_date
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-100 text-slate-700 hover:bg-blue-100'
                                        }`}
                                >
                                    {formatDate(slot.class_date)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3 - Time Slot */}
                {selectedDate && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-blue-700 mb-3">3. Select a Time Slot</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {slotsForSelectedDate.length > 0 ? (
                                slotsForSelectedDate.map(slot => (
                                    <button
                                        key={slot.start_time}
                                        onClick={() => setSelectedSlot(slot.start_time)}
                                        className={`text-sm px-3 py-2 rounded-md border font-medium transition
                                            ${selectedSlot === slot.start_time
                                                ? 'bg-teal-600 text-white border-teal-600'
                                                : 'bg-white border-slate-300 text-teal-700 hover:bg-teal-50'
                                            }`}
                                    >
                                        {formatTime(slot.start_time)}
                                    </button>
                                ))
                            ) : (
                                <p className="col-span-full text-slate-500">No slots available for this date.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Submit */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                    {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
                    {success && <p className="text-lg text-green-600 mb-2">{success}</p>}
                    <div className="flex justify-end">
                        <button
                            onClick={onConfirmReschedule}
                            disabled={!selectedSlot || loading}
                            className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Confirm Reschedule'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default RescheduleBooking;
