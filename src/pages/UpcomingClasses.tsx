import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Users, Video, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useBookings } from "@/hooks/useBookings";
import ApiTest from "@/components/ApiTest";
import BookingReschedule from '@/components/BookingReschedule/BookingReschedule';
import { useBooking } from '@/hooks/useBooking';
import { useChildren } from '@/hooks/useChildren';
// import { RescheduleBooking } from '@/components/BookingReschedule/NewReschedule';
import RescheduleBooking from '@/components/BookingReschedule/NewReschedule'; // Import the new component

const UpcomingClasses = () => {
  const navigate = useNavigate();
  const { bookings, isLoading, error, loadUpcomingClasses } = useBookings();
  const { selectedChild } = useChildren();
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'shift' | 'cancel'>('shift');
  const {
    loading,
    error: bookingError,
    success,
    shiftingDate,
    getShiftingDate,
    changeBooking,
    reset,
    getAvailableSlots, //new function to get available slots
    availableSlots,  // new state for available slots
    handleRescheduleNew  //new function to handle rescheduling to another slot
  } = useBooking();

  useEffect(() => {
    // Pass the selected child's ID if a specific child is selected, otherwise pass undefined for family view
    const childId = selectedChild?.id;
    loadUpcomingClasses(undefined, childId);
    // eslint-disable-next-line
  }, [selectedChild]); // Re-run when selectedChild changes



  console.log('🔍 UpcomingClasses: Current state - bookings:', bookings.length, 'isLoading:', isLoading, 'error:', error, 'selectedChild:', selectedChild);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Helper function to calculate duration
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    return `${diffMins} mins`;
  };

  // Handle join class button click
const handleJoinClick = useCallback((classItem: any) => {
  window.open(`/join-class/${classItem.schedulebooking_id}`, "_blank");
}, []);


  const handleRescheduleClick = async (schedulebooking_id: number) => {
    setSelectedBookingId(schedulebooking_id);
    setModalMode('shift');
    setRescheduleOpen(true);
    await getShiftingDate({ schedulebooking_id });
    await getAvailableSlots(schedulebooking_id);
  };

  const handleCancelClick = (schedulebooking_id: number) => {
    setSelectedBookingId(schedulebooking_id);
    setModalMode('cancel');
    setRescheduleOpen(true);
    // No shifting date fetch for cancel
  };

  const handleRescheduleSubmit = async (values, action) => {
    if (!selectedBookingId) return;
    await changeBooking({
      schedulebooking_id: selectedBookingId,
      reason: values.reason,
      action: modalMode,
    });
  };

  const handleModalClose = () => {
    setRescheduleOpen(false);
    setSelectedBookingId(null);
    reset();
  };

  const isNoDataError = (msg: string | null) => {
    if (!msg) return false;
    return (
      msg.toLowerCase().includes('no bookings found') ||
      msg.toLowerCase().includes('no classes found') ||
      msg.toLowerCase().includes('no data found')
    );
  };

  if (isLoading) {
    console.log('🔍 UpcomingClasses: Showing loading state');
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
          <Header onStartTour={()=>{}}/>
          <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
            <div className="flex items-center justify-center h-32 sm:h-48 lg:h-64">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-blue-600 text-sm sm:text-base">Loading upcoming classes...</span>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error && isNoDataError(error)) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
          <Header onStartTour={()=>{}}/>
          <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
            <div className="flex flex-col items-center justify-center h-32 sm:h-48 lg:h-64 text-gray-500">
              <Video className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 text-gray-300" />
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">No upcoming classes</h3>
              <p className="text-sm sm:text-base text-center">You don't have any upcoming classes scheduled.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  console.log('🔍 UpcomingClasses: Rendering with bookings:', bookings);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={()=>{}}/>

        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="outline"
              onClick={() => navigate("/classes")}
              className="mb-3 sm:mb-4 border-yellow-300 text-blue-700 hover:bg-yellow-50 shadow-sm text-sm sm:text-base"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Classes
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-1 sm:mb-2">
              Upcoming Classes
            </h1>
            <p className="text-blue-600 text-sm sm:text-base">Manage your scheduled classes - Join, reschedule, or cancel as needed</p>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {bookings.length === 0 ? (
              <Card className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="text-gray-500">
                  <Video className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">No upcoming classes</h3>
                  <p className="text-sm sm:text-base">You don't have any upcoming classes scheduled.</p>
                </div>
              </Card>
            ) : (
              bookings.map((classItem) => (
                <Card key={classItem.id} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4 mb-3 sm:mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md">
                          <Video className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-blue-800">{classItem.admin_class_name}</h3>
                          <p className="text-yellow-600 font-semibold text-sm sm:text-base lg:text-lg">
                            {classItem.child_name} • {classItem.is_cancelled === "Yes" ? "Cancelled" : "Confirmed"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">{formatDate(classItem.class_date)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">
                            {classItem.start_time} - {classItem.end_time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">
                            {calculateDuration(classItem.start_time, classItem.end_time)}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700">
                          <span className="font-semibold">Child:</span> {classItem.child_name}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 sm:space-y-3 lg:ml-4 xl:ml-8">
                      {classItem.is_cancelled === "Yes" ? (
                        <div className="text-center">
                          <span className="text-red-600 font-semibold text-sm sm:text-base">Cancelled</span>
                          {classItem.cancellation_date && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(classItem.cancellation_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      ) : (
                        <>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 shadow-md border-0 transition-all duration-200 text-xs sm:text-sm"
                            onClick={() => handleJoinClick(classItem)}
                          >
                            Join Class
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-yellow-300 text-blue-700 hover:bg-yellow-50 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleRescheduleClick(classItem.schedulebooking_id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-red-300 text-red-600 hover:bg-red-50 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 shadow-sm text-xs sm:text-sm"
                            onClick={() => handleCancelClick(classItem.schedulebooking_id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
          <BookingReschedule
            open={rescheduleOpen}
            onClose={handleModalClose}
            onSubmit={handleRescheduleSubmit}
            loading={loading}
            shiftingDate={modalMode === 'shift' ? shiftingDate : undefined}
            error={bookingError}
            success={success}
            schedulebooking_id={selectedBookingId || 0}
            mode={modalMode}
          />

          {/* <RescheduleBooking
          schedulebooking_id={selectedBookingId || 0}

          
          /> */}
        </main>
      </div>


    </div>
  );
};

export default UpcomingClasses;
