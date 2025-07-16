import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ToggleViewSelector = () => {
  const [selected, setSelected] = useState< 'month' | 'overall'>('month');

  const options: { key: 'month' | 'overall'; label: string }[] = [
    // { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'overall', label: 'Overall' },
  ];

  return (
    <div className="flex justify-center items-center ">
      {/* Main container styled as an inset "tub" */}
      <div className="relative bg-blue-100 rounded-full p-1 flex items-center gap-1 shadow-[inset_6px_6px_12px_#c5d1e0,inset_-6px_-6px_12px_#ffffff]">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => setSelected(option.key)}
            className={`relative px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none`}
          >
            {/* The text label needs a higher z-index to appear on top of the sliding bubble */}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                selected === option.key
                  ? 'text-white' // Bright text for contrast on the water drop
                  : 'text-blue-800/60' // Muted text for non-selected items in the "tub"
              }`}
            >
              {option.label}
            </span>

            {/* This is the sliding bubble, styled as a "water drop" */}
            {selected === option.key && (
              <motion.div
                layoutId="bubble"
                // Neumorphic "outset" shadow and glassy gradient for the water drop effect
                className="absolute inset-0 z-0 rounded-full border border-white/30 bg-gradient-to-br from-blue-400 to-indigo-500 shadow-[4px_4px_8px_#b8c3d1,-4px_-4px_8px_#ffffff]"
                // Updated transition for a slower, but still wobbly, effect
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleViewSelector;
