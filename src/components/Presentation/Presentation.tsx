import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, FileText } from 'lucide-react';
import { FileX } from 'lucide-react';

interface PresentationProps {
    data: { ppt_iframe_src: string } | null;
    isLoading: boolean;
    error: string | null;
    onRetry: () => void;
}

const Presentation: React.FC<PresentationProps> = ({ data, isLoading, error, onRetry }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-2" />
                <span className="text-blue-700 font-semibold">Loading presentation...</span>
            </div>
        );
    }

    if (error) {
        return (
    <div className="flex items-center justify-center min-h-64 py-10 px-4">
      <div className="w-full max-w-md rounded-2xl p-8 bg-white/30 backdrop-blur-lg border border-gray-200 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-red-100 text-red-500 shadow-md">
            <FileX className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No PPT Found</h2>
        <p className="text-gray-600 text-sm">
          The presentation for this class is not available.
        </p>
      </div>
    </div>
        );
    }

    if (!data || !data.ppt_iframe_src) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <FileText className="w-10 h-10 mb-2 text-gray-300" />
                <span className="font-semibold mb-2">No presentation available</span>
                <span className="text-sm">Presentation will appear here once available.</span>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg border border-blue-100 bg-white">
                <iframe
                    src={data.ppt_iframe_src}
                    title="Class Presentation"
                    className="w-full h-full min-h-[400px] rounded-lg border-0"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    );
};

export default Presentation; 