import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, Clock, CheckCircle, XCircle, Users, Sparkles, Loader, LoaderCircle } from 'lucide-react';

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

    // If polling is active, show child-friendly polling UI
    if (isPolling) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border-4 border-blue-200 relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>

                    {/* Main content */}
                    <div className="relative z-10 text-center">
                        {/* Large animated teacher icon */}
                        <div className="mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white">
                                    <Users className="w-12 h-12 text-white" />
                                </div>
                                {/* Pulsing ring effect */}
                                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-ping opacity-30"></div>
                            </div>
                        </div>

                        {/* Large loading spinner */}
                        <div className="mb-6">
                            <div className="relative">
                                <Loader
                                    className="w-16 h-16 text-blue-500 mx-auto"
                                    style={{ animation: 'spin 3s linear infinite' }}
                                />

                                <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                            </div>
                        </div>

                        {/* Child-friendly title */}
                        <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Waiting for Teacher! 🎓
                        </h2>

                        {/* Clear, simple message for children */}
                        <div className="mb-6">
                            <p className="text-lg text-gray-700 mb-2 font-semibold">
                                Your teacher hasn't joined the class yet
                            </p>

                        </div>

                        {/* Fun animated elements */}
                        <div className="flex justify-center space-x-2 mb-6">
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>



                        {/* Fun fact or encouragement */}
                        {/* <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3 mb-6">
                            <div className="flex items-center justify-center space-x-2">
                                <Sparkles className="w-4 h-4 text-yellow-600" />
                                <span className="text-xs text-yellow-700 font-medium">
                                {pollingMessage || 'Checking if teacher is ready...'}
                                </span>
                            </div>
                        </div> */}

                        {/* Cancel button */}
                        <Button
                            onClick={onCancelPolling}
                            variant="outline"
                            className="px-6 py-3 rounded-2xl font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                        >
                            I'll come back later
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