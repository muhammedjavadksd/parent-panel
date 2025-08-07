// src/components/dashboard/ToggleViewSelector.tsx

import React from 'react'; // Removed useState
import { motion } from 'framer-motion';

// 1. DEFINE the props interface
interface RoadmapToggleViewSelectorProps {
    selectedSubject: string;
    onSubjectChange: (subject: 'English' | 'Maths' | 'Gita') => void;
}

const RoadmapToggleViewSelector = ({ selectedSubject, onSubjectChange }: RoadmapToggleViewSelectorProps) => {
    // 2. REMOVE the internal state
    // const [selected, setSelected] = useState<'month' | 'overall'>('month');

    const options: { key: 'English' | 'Maths' | 'Gita'; label: string }[] = [
        { key: 'English', label: 'English' },
        { key: 'Maths', label: 'Maths' },
        { key: 'Gita', label: 'Gita' },
    ];

    return (
        <div className="flex justify-center items-center ">
            <div className="relative bg-blue-100 rounded-full p-1 flex items-center gap-1 shadow-[inset_6px_6px_12px_#c5d1e0,inset_-6px_-6px_12px_#ffffff]">
                {options.map((option) => (
                    <button
                        key={option.key}
                        // 3. USE the onPeriodChange prop in the click handler
                        onClick={() => onSubjectChange(option.key)}
                        className={`relative px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none`}
                    >
                        <span
                            className={`relative z-10 transition-colors duration-300 ${
                                // USE the selectedPeriod prop for styling
                                selectedSubject === option.key
                                    ? 'text-white'
                                    : 'text-blue-800/60'
                            }`}
                        >
                            {option.label}
                        </span>

                        {/* USE the selectedSubject prop to conditionally render the motion div */}
                        {selectedSubject === option.key && (
                            <motion.div
                                layoutId="bubble"
                                className="absolute inset-0 z-0 rounded-full border border-white/30 bg-gradient-to-r from-blue-500 to-blue-600 shadow-[4px_4px_8px_#b8c3d1,-4px_-4px_8px_#ffffff]"
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RoadmapToggleViewSelector;