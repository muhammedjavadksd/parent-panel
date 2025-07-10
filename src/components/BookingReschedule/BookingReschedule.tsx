import { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { bookingRescheduleSchema } from '@/lib/schemas/bookingSchemas';
import { BookingRescheduleFormValues } from '@/lib/interface/booking';

interface BookingRescheduleProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: BookingRescheduleFormValues, action: 'cancel' | 'shift') => void;
    loading: boolean;
    shiftingDate?: string | null;
    error?: string | null;
    success?: string | null;
    schedulebooking_id: number;
    mode: 'shift' | 'cancel';
}

export const BookingReschedule: FC<BookingRescheduleProps> = ({
    open,
    onClose,
    onSubmit,
    loading,
    shiftingDate,
    error,
    success,
    schedulebooking_id,
    mode,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-blue-800">
                    {mode === 'shift' ? 'Reschedule Class' : 'Cancel Class'}
                </h2>
                {mode === 'shift' && shiftingDate && (
                    <div
                        className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm"
                        dangerouslySetInnerHTML={{ __html: shiftingDate }}
                    />
                )}
                {error && (
                    <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                        {success}
                    </div>
                )}
                <Formik
                    initialValues={{ reason: '' }}
                    validationSchema={bookingRescheduleSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        onSubmit(values, mode);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason for {mode === 'shift' ? 'rescheduling' : 'cancelling'}
                                </label>
                                <Field
                                    as="textarea"
                                    id="reason"
                                    name="reason"
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder={mode === 'shift' ? 'Enter your reason for rescheduling...' : 'Enter your reason for cancelling...'}
                                />
                                <ErrorMessage name="reason" component="div" className="text-xs text-red-600 mt-1" />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center"
                                    disabled={isSubmitting || loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Submitting…</span>
                                    ) : (
                                        mode === 'shift' ? 'Reschedule' : 'Confirm Cancel'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 font-semibold hover:bg-gray-300 transition flex items-center justify-center"
                                    onClick={onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BookingReschedule; 