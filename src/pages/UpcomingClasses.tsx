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
import { useJoinClass } from '@/hooks/useJoinClass';
import JoinClass from '@/components/JoinClass/JoinClass';

const UpcomingClasses = () => {
  const navigate = useNavigate();
  const { bookings, isLoading, error, loadUpcomingClasses } = useBookings();
  const { selectedChild } = useChildren();
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'shift' | 'cancel'>('shift');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedClassForJoin, setSelectedClassForJoin] = useState<any>(null);

  const {
    loading,
    error: bookingError,
    success,
    shiftingDate,
    getShiftingDate,
    changeBooking,
    reset,
  } = useBooking();

  const { data: joinData, isLoading: isJoining, isPolling, error: joinError, pollingMessage, doJoinClass, clearError: clearJoinError, clearData: clearJoinData, cancelPolling } = useJoinClass();

  useEffect(() => {
    // Pass the selected child's ID if a specific child is selected, otherwise pass undefined for family view
    const childId = selectedChild?.id;
    loadUpcomingClasses(undefined, childId);
    // eslint-disable-next-line
  }, [selectedChild]); // Re-run when selectedChild changes

  // Effect: redirect to join_url on success
  useEffect(() => {
    if (joinData && joinData.join_url) {
      window.open(joinData.join_url, '_blank');
      setShowJoinModal(false);
      clearJoinData();
    }
  }, [joinData, clearJoinData]);

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
    setSelectedClassForJoin(classItem);
    setShowJoinModal(true);
    clearJoinError();
    clearJoinData();
  }, [clearJoinError, clearJoinData]);

  // Handle confirm join
  const handleConfirmJoin = useCallback(() => {
    if (selectedClassForJoin) {
      doJoinClass(String(selectedClassForJoin.schedulebooking_id));
    }
  }, [selectedClassForJoin, doJoinClass]);

  const handleRescheduleClick = async (schedulebooking_id: number) => {
    setSelectedBookingId(schedulebooking_id);
    setModalMode('shift');
    setRescheduleOpen(true);
    await getShiftingDate({ schedulebooking_id });
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
        <div className="ml-64 flex flex-col">
          <Header onStartTour={()=>{}}/>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-blue-600">Loading upcoming classes...</span>
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
        <div className="ml-64 flex flex-col">
          <Header onStartTour={()=>{}}/>
          <main className="flex-1 p-6">
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Video className="w-16 h-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No upcoming classes</h3>
              <p>You don't have any upcoming classes scheduled.</p>
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

      <div className="ml-64 flex flex-col">
        <Header onStartTour={()=>{}}/>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => navigate("/classes")}
              className="mb-4 border-yellow-300 text-blue-700 hover:bg-yellow-50 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Classes
            </Button>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Upcoming Classes
            </h1>
            <p className="text-blue-600">Manage your scheduled classes - Join, reschedule, or cancel as needed</p>
          </div>

          <div className="space-y-6">
            {bookings.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-500">
                  <Video className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming classes</h3>
                  <p>You don't have any upcoming classes scheduled.</p>
                </div>
              </Card>
            ) : (
              bookings.map((classItem) => (
                <Card key={classItem.id} className="p-6 rounded-2xl bg-white shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                          <Video className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-blue-800">{classItem.admin_class_name}</h3>
                          <p className="text-yellow-600 font-semibold text-lg">
                            {classItem.child_name} • {classItem.is_cancelled === "Yes" ? "Cancelled" : "Confirmed"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700 font-medium">{formatDate(classItem.class_date)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm text-gray-700 font-medium">
                            {classItem.start_time} - {classItem.end_time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700 font-medium">
                            {calculateDuration(classItem.start_time, classItem.end_time)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Child:</span> {classItem.child_name}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 ml-8">
                      {classItem.is_cancelled === "Yes" ? (
                        <div className="text-center">
                          <span className="text-red-600 font-semibold">Cancelled</span>
                          {classItem.cancellation_date && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(classItem.cancellation_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      ) : (
                        <>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-md border-0 transition-all duration-200"
                            onClick={() => handleJoinClick(classItem)}
                          >
                            Join Class
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-yellow-300 text-blue-700 hover:bg-yellow-50 px-6 py-2 shadow-sm"
                            onClick={() => handleRescheduleClick(classItem.schedulebooking_id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-red-300 text-red-600 hover:bg-red-50 px-6 py-2 shadow-sm"
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
        </main>
      </div>

      {/* Join Class Modal */}
      {showJoinModal && selectedClassForJoin && (
        <JoinClass
          isLoading={isJoining}
          isPolling={isPolling}
          error={joinError}
          pollingMessage={pollingMessage}
          onJoin={() => handleJoinClick(selectedClassForJoin)}
          onConfirm={handleConfirmJoin}
          onCancel={() => {
            setShowJoinModal(false);
            cancelPolling();
          }}
          onCancelPolling={() => {
            setShowJoinModal(false);
            cancelPolling();
          }}
          showModal={showJoinModal}
        />
      )}
    </div>
  );
};

export default UpcomingClasses;
