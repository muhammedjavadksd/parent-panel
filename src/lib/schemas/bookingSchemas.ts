import * as Yup from 'yup';

export const bookingRescheduleSchema = Yup.object().shape({
    reason: Yup.string()
        .min(5, 'Reason must be at least 5 characters')
        .max(200, 'Reason must be at most 200 characters')
        .required('Reason is required'),
}); 