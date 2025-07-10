import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X, FileText } from 'lucide-react';
import { createTicketSchema, createTicketInitialValues } from '@/lib/schemas/supportSchemas';
import { TICKET_ISSUE_OPTIONS, TICKET_FORM_CONSTANTS } from '@/shared/constants/support';
import { CreateTicketRequest } from '@/lib/interface/support';

interface CreateTicketProps {
    onSubmit: (data: CreateTicketRequest) => Promise<any>;
    onCancel?: () => void;
    isLoading?: boolean;
    error?: string | null;
    success?: string | null;
}

export const CreateTicket: React.FC<CreateTicketProps> = ({
    onSubmit,
    onCancel,
    isLoading = false,
    error,
    success
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            const result = await onSubmit(values);
            if (result.payload?.status) {
                resetForm();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        } catch (err) {
            // Error handled by Redux
        } finally {
            setSubmitting(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Create Support Ticket
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={createTicketInitialValues}
                    validationSchema={createTicketSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, isSubmitting, errors, touched }) => (
                        <Form className="space-y-6">
                            {/* Error Alert */}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {/* Success Alert */}
                            {success && (
                                <Alert>
                                    <AlertDescription>{success}</AlertDescription>
                                </Alert>
                            )}

                            {/* Issue Type */}
                            <div className="space-y-2">
                                <Label htmlFor="issue">Issue Type *</Label>
                                <Field name="issue">
                                    {({ field, form }: any) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => form.setFieldValue(field.name, value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select issue type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TICKET_ISSUE_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </Field>
                                <ErrorMessage name="issue" component="div" className="text-sm text-red-600" />
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Field
                                    as={Input}
                                    id="title"
                                    name="title"
                                    placeholder="Brief description of your issue"
                                    maxLength={TICKET_FORM_CONSTANTS.MAX_TITLE_LENGTH}
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <ErrorMessage name="title" component="span" className="text-red-600" />
                                    <span>{values.title.length}/{TICKET_FORM_CONSTANTS.MAX_TITLE_LENGTH}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Field
                                    as={Textarea}
                                    id="description"
                                    name="description"
                                    placeholder="Please provide detailed information about your issue..."
                                    rows={4}
                                    maxLength={TICKET_FORM_CONSTANTS.MAX_DESCRIPTION_LENGTH}
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <ErrorMessage name="description" component="span" className="text-red-600" />
                                    <span>{values.description.length}/{TICKET_FORM_CONSTANTS.MAX_DESCRIPTION_LENGTH}</span>
                                </div>
                            </div>

                            {/* File Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="attachment">Attachment (Optional)</Label>
                                <div className="space-y-2">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="attachment"
                                        accept=".jpg,.jpeg,.png,.gif,.pdf,.txt"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            setFieldValue('attachment', file);
                                        }}
                                        className="hidden"
                                    />

                                    {!values.attachment ? (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Choose File
                                        </Button>
                                    ) : (
                                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                                <div>
                                                    <p className="text-sm font-medium">{values.attachment.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(values.attachment.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setFieldValue('attachment', undefined);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = '';
                                                    }
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}

                                    <p className="text-xs text-gray-500">
                                        Max file size: 5MB. Allowed types: JPEG, PNG, GIF, PDF, TXT
                                    </p>
                                    <ErrorMessage name="attachment" component="div" className="text-sm text-red-600" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className="flex-1"
                                >
                                    {isSubmitting || isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Create Ticket'
                                    )}
                                </Button>
                                {onCancel && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onCancel}
                                        disabled={isSubmitting || isLoading}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}; 