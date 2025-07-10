import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateTicket } from '@/components/CreateTicket/CreateTicket';
import { useSupport } from '@/hooks/useSupport';
import { CreateTicketRequest } from '@/lib/interface/support';
import { useToast } from '@/hooks/use-toast';

const CreateTicketPage: React.FC = () => {
    const navigate = useNavigate();
    const { createNewTicket, isLoading, error, clearError } = useSupport();
    const { toast } = useToast();
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (data: CreateTicketRequest) => {
        clearError();
        setSuccess(null);

        const result = await createNewTicket(data);

        if (result.payload && 'status' in result.payload && result.payload.status) {
            setSuccess('Ticket created successfully! You will receive a confirmation shortly.');
            toast({
                title: 'Success',
                description: 'Support ticket created successfully',
            });

            // Navigate back to support page after a short delay
            setTimeout(() => {
                navigate('/support');
            }, 2000);
        }

        return result;
    };

    const handleCancel = () => {
        navigate('/support');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create Support Ticket</h1>
                    <p className="text-gray-600 mt-2">
                        Please provide detailed information about your issue so we can assist you better.
                    </p>
                </div>

                <CreateTicket
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isLoading}
                    error={error}
                    success={success}
                />
            </div>
        </div>
    );
};

export default CreateTicketPage; 