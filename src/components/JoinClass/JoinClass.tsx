import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, Clock, CheckCircle, XCircle } from 'lucide-react';

interface JoinClassProps {
    isLoading: boolean;
    isPolling?: boolean;
    error: string | null;
    pollingMessage?: string;
    onJoin: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    onCancelPolling?: () => void;
    showModal: boolean;
}

const JoinClass: React.FC<JoinClassProps> = ({ 
    isLoading, 
    isPolling = false, 
    error, 
    pollingMessage = '', 
    onJoin, 
    onConfirm, 
    onCancel, 
    onCancelPolling,
    showModal 
}) => {
    if (!showModal) {
        return null;
    }

    // If polling is active, show polling UI
    if (isPolling) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
                    <div className="flex items-center justify-center mb-4">
                        <Clock className="w-10 h-10 text-blue-600 mr-3" />
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                    </div>
                    <h2 className="text-lg font-bold mb-2 text-center">Checking Class Availability</h2>
                    <p className="text-red-700 mb-4 text-center">{pollingMessage}</p>
                    <p className="text-sm text-gray-500 mb-4 text-center">
                        We'll check every 60 seconds.
                    </p>
                    
                    <div className="flex gap-4 mt-2">
                        <Button 
                            onClick={onCancelPolling} 
                            variant="outline" 
                            className="px-4 py-2 rounded-lg font-semibold"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // If there's an error, show error UI
    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
                    <XCircle className="w-10 h-10 text-red-600 mb-2" />
                    <h2 className="text-lg font-bold mb-2 text-center">Unable to Join Class</h2>
                    <p className="text-gray-700 mb-4 text-center">{error}</p>
                    <div className="flex gap-4 mt-2">
                        <Button onClick={onCancel} className="px-4 py-2 rounded-lg font-semibold">
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Default join confirmation UI
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
                <LogIn className="w-10 h-10 text-blue-600 mb-2" />
                <h2 className="text-lg font-bold mb-2">Join Class</h2>
                <p className="text-gray-700 mb-4 text-center">Are you sure you want to join this class? You will be redirected to the meeting.</p>
                <div className="flex gap-4 mt-2">
                    <Button 
                        onClick={onConfirm} 
                        disabled={isLoading} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Yes, Join
                    </Button>
                    <Button 
                        onClick={onCancel} 
                        variant="outline" 
                        className="px-4 py-2 rounded-lg font-semibold"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JoinClass; 