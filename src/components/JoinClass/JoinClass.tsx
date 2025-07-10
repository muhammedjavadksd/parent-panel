import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn } from 'lucide-react';

interface JoinClassProps {
    isLoading: boolean;
    error: string | null;
    onJoin: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    showModal: boolean;
}

const JoinClass: React.FC<JoinClassProps> = ({ isLoading, error, onJoin, onConfirm, onCancel, showModal }) => {
    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
                <LogIn className="w-10 h-10 text-blue-600 mb-2" />
                <h2 className="text-lg font-bold mb-2">Join Class</h2>
                <p className="text-gray-700 mb-4 text-center">Are you sure you want to join this class? You will be redirected to the meeting.</p>
                {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                <div className="flex gap-4 mt-2">
                    <Button onClick={onConfirm} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Yes, Join
                    </Button>
                    <Button onClick={onCancel} variant="outline" className="px-4 py-2 rounded-lg font-semibold">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JoinClass; 