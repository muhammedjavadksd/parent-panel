import * as Yup from 'yup';
import { TICKET_FORM_CONSTANTS, TICKET_CHAT_CONSTANTS } from '@/shared/constants/support';

export const ticketFiltersSchema = Yup.object().shape({
    status: Yup.string().oneOf(['open', 'closed', 'pending', ''], 'Invalid status'),
    priority: Yup.string().oneOf(['low', 'medium', 'high', ''], 'Invalid priority'),
    page: Yup.number().min(1, 'Page must be at least 1'),
    limit: Yup.number().min(1, 'Limit must be at least 1').max(50, 'Limit cannot exceed 50'),
});

export const ticketFiltersInitialValues = {
    status: '',
    priority: '',
    page: 1,
    limit: 10,
};

export const createTicketSchema = Yup.object().shape({
    issue: Yup.string()
        .oneOf(['Booking Related', 'Account Related', 'Payment Related'], 'Please select a valid issue type')
        .required('Issue type is required'),
    title: Yup.string()
        .trim()
        .min(5, 'Title must be at least 5 characters')
        .max(TICKET_FORM_CONSTANTS.MAX_TITLE_LENGTH, `Title cannot exceed ${TICKET_FORM_CONSTANTS.MAX_TITLE_LENGTH} characters`)
        .required('Title is required'),
    description: Yup.string()
        .trim()
        .min(10, 'Description must be at least 10 characters')
        .max(TICKET_FORM_CONSTANTS.MAX_DESCRIPTION_LENGTH, `Description cannot exceed ${TICKET_FORM_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`)
        .required('Description is required'),
    attachment: Yup.mixed().nullable()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true; // Optional field
            return (value as File).size <= TICKET_FORM_CONSTANTS.MAX_FILE_SIZE;
        })
        .test('fileType', 'Invalid file type', (value) => {
            if (!value) return true; // Optional field
            return TICKET_FORM_CONSTANTS.ALLOWED_FILE_TYPES.includes((value as File).type as any);
        }),
});

export const createTicketInitialValues = {
    issue: '',
    title: '',
    description: '',
    attachment: undefined as File | undefined,
};

// Ticket Chat Schemas
export const sendMessageSchema = Yup.object().shape({
    message: Yup.string()
        .trim()
        .min(1, 'Message cannot be empty')
        .max(TICKET_CHAT_CONSTANTS.MAX_MESSAGE_LENGTH, `Message cannot exceed ${TICKET_CHAT_CONSTANTS.MAX_MESSAGE_LENGTH} characters`)
        .required('Message is required'),
    attachment: Yup.mixed()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true; // Optional field
            return (value as File).size <= TICKET_CHAT_CONSTANTS.MAX_ATTACHMENT_SIZE;
        })
        .test('fileType', 'Invalid file type', (value) => {
            if (!value) return true; // Optional field
            return TICKET_CHAT_CONSTANTS.ALLOWED_ATTACHMENT_TYPES.includes((value as File).type as any);
        }),
});

export const sendMessageInitialValues = {
    message: '',
    attachment: undefined as File | undefined,
}; 