import { useEffect, useState, useMemo } from 'react';
import { useBooking } from '@/hooks/useBooking';

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

interface AvailableSlotsResponse {
    data: TeacherData[];
}

// Props for the component
interface RescheduleBookingProps {
    schedulebooking_id: number;
    onClose?: () => void;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
};

const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

export function RescheduleBooking({ schedulebooking_id, onClose }: RescheduleBookingProps) {
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
        if (schedulebooking_id) {
            getAvailableSlots(schedulebooking_id);
        }
    }, [schedulebooking_id]);

    const selectedTeacherData = useMemo(() => {
        if (!availableSlots?.data || !selectedTeacherId) return null;
        return availableSlots.data.find(
            (t: TeacherData) => t.teacher.faculty_id === selectedTeacherId
        );
    }, [availableSlots, selectedTeacherId]);

    const slotsForSelectedDate = useMemo(() => {
        if (!selectedTeacherData || !selectedDate) return [];
        const dateData = selectedTeacherData.available_slots.find(
            (s: DailySlot) => s.class_date === selectedDate
        );
        return dateData ? dateData.slots : [];
    }, [selectedTeacherData, selectedDate]);

    const handleSelectTeacher = (teacherId: number) => {
        setSelectedTeacherId(teacherId);
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const handleSelectDate = (date: string) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleSelectSlot = (slot: string) => {
        setSelectedSlot(slot);
    };

    const onConfirmReschedule = async () => {
        if (!selectedTeacherId || !selectedDate || !selectedSlot) {
            alert('Please select a teacher, date, and time slot.');
            return;
        }

        const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
        });

        const dates: [string, string, string][] = [
            [dayOfWeek, selectedDate, selectedSlot]
        ];


        const result = await handleRescheduleNew(
            selectedTeacherId,
            schedulebooking_id,
            dates
        );

        // if (result?.status) {
        //   console.log('Reschedule successful');
        //   // Optional: onClose?.();
        // }
    };

    if (loading && !availableSlots) {
        return (
            <div className="flex justify-center items-center p-8">
                Loading available slots...
            </div>
        );
    }

    if (error && !availableSlots) {
        return (
            <div className="p-4 text-red-600 bg-red-100 border border-red-400 rounded-md">
                {error}
            </div>
        );
    }

    if (!availableSlots || !availableSlots.data || availableSlots.data.length === 0) {
        return (
            <div className="p-4 text-gray-600 bg-gray-100 border border-gray-300 rounded-md">
                No rescheduling slots are available at the moment.
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto font-sans">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Reschedule Class</h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-xl"
                    >
                        &times;
                    </button>
                )}
            </div>

            {/* Step 1: Select a Teacher */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">1. Select a Teacher</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {availableSlots.data.map((teacherData: TeacherData) => (
                        <div
                            key={teacherData.teacher.faculty_id}
                            onClick={() => handleSelectTeacher(teacherData.teacher.faculty_id)}
                            className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${selectedTeacherId === teacherData.teacher.faculty_id
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-gray-300 hover:border-blue-400 hover:shadow-sm'
                                }`}
                        >
                            <img
                                src={teacherData.teacher.photo || '/default-avatar.png'}
                                alt={`${teacherData.teacher.first_name}`}
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <p className="text-center font-medium text-gray-800">
                                {teacherData.teacher.first_name} {teacherData.teacher.last_name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 2: Select a Date */}
            {selectedTeacherData && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">2. Select a Date</h3>
                    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                        {selectedTeacherData.available_slots.map((dateSlot: DailySlot) => (
                            <button
                                key={dateSlot.class_date}
                                onClick={() => handleSelectDate(dateSlot.class_date)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedDate === dateSlot.class_date
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {formatDate(dateSlot.class_date)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Select a Time Slot */}
            {selectedDate && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">3. Select a Time Slot</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {slotsForSelectedDate.length > 0 ? (
                            slotsForSelectedDate.map((slot: TimeSlot) => (
                                <button
                                    key={slot.start_time}
                                    onClick={() => handleSelectSlot(slot.start_time)}
                                    className={`px-3 py-2 border rounded-md text-xs font-semibold transition-all ${selectedSlot === slot.start_time
                                            ? 'bg-green-500 text-white border-green-500'
                                            : 'bg-white text-green-700 border-gray-300 hover:bg-green-50'
                                        }`}
                                >
                                    {formatTime(slot.start_time)}
                                </button>
                            ))
                        ) : (
                            <p className="col-span-full text-gray-500">
                                No slots available for this date.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Final Action */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
                {success && <p className="text-sm text-green-600 mb-2">{success}</p>}
                <button
                    onClick={onConfirmReschedule}
                    disabled={!selectedSlot || loading}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-md transition-opacity hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Confirm Reschedule'}
                </button>
            </div>
        </div>
    );
}

export default RescheduleBooking;
