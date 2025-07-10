import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Video } from 'lucide-react';

interface RecordingProps {
    data: {
        recording_url: string;
        download_url: string;
        recording_note: string;
    } | null;
    isLoading: boolean;
    error: string | null;
    onDownload: () => void;
    onRetry: () => void;
    isDownloading: boolean;
}

const Recording: React.FC<RecordingProps> = ({ data, isLoading, error, onDownload, onRetry, isDownloading }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-2" />
                <span className="text-blue-700 font-semibold">Loading recording...</span>
            </div>
        );
    }

    if (error) {
        const lower = error.toLowerCase();
        const isNetworkOrGeneric = lower.includes('network') || lower.includes('failed to fetch recording') || lower.includes('timeout');
        if (!isNetworkOrGeneric) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <Video className="w-10 h-10 mb-2 text-gray-300" />
                    <span className="font-semibold mb-2">This class recording has expired and is no longer available.</span>
                    <span className="text-sm">If you believe this is a mistake, please contact support.</span>
                </div>
            );
        }
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-600">
                <Video className="w-10 h-10 mb-2 text-red-400" />
                <span className="font-semibold mb-2">{error}</span>
                <Button onClick={onRetry} className="mt-2" variant="outline">
                    Retry
                </Button>
            </div>
        );
    }

    if (!data || !data.recording_url) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Video className="w-10 h-10 mb-2 text-gray-300" />
                <span className="font-semibold mb-2">Recording is not available or has expired.</span>
                <span className="text-sm">If you believe this is a mistake, please contact support.</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
            <video
                src={data.recording_url}
                controls
                className="w-full rounded-lg shadow-lg border border-blue-100 bg-black"
                poster="/public/placeholder.svg"
            />
            <div className="flex flex-col items-center gap-2 w-full">
                <Button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md disabled:opacity-60"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Downloading...
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4 mr-2" />
                            Download Recording
                        </>
                    )}
                </Button>
                {data.recording_note && (
                    <div className="text-xs text-gray-600 mt-1 text-center">{data.recording_note}</div>
                )}
            </div>
        </div>
    );
};

export default Recording; 