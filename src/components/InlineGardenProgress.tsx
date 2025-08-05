import React, { useMemo } from 'react';
import { Sprout, Flower, Mountain, Star, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChildren } from '@/hooks/useChildren';
import { Child } from '@/lib/types/children';

// Default steps remain the same
const defaultSteps = [
  { icon: <Leaf size={18} />, label: 'Beginning' },
  { icon: <Sprout size={18} />, label: 'Sprouting' },
  { icon: <Flower size={18} />, label: 'Growing' },
  { icon: <Mountain size={18} />, label: 'Mastery' },
  { icon: <Star size={18} />, label: 'Achieved' },
];

const CreativeGrowthPath = ({ progress, steps = defaultSteps }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const selectedChild = useChildren();


  // Memoize calculations to avoid re-computing on every render
  const activeStep = useMemo(() => {
    // Find the last step that has been surpassed by the progress
    let currentStepIndex = steps.findIndex(
      (_, index) => {
        const stepProgress = (index / (steps.length - 1)) * 100;
        return clampedProgress < stepProgress;
      }
    );
    // If no step is found, it means we are at or past the last step
    if (currentStepIndex === -1) {
      currentStepIndex = steps.length - 1;
    } else {
        // We want the label of the *current* step, not the *next* one
        currentStepIndex = Math.max(0, currentStepIndex -1)
    }

    // Special case for being exactly at 100%
    if (clampedProgress === 100) {
        currentStepIndex = steps.length -1;
    }

    return steps[currentStepIndex];
  }, [clampedProgress, steps]);

  return (
    // IMPROVEMENT: Increased padding and a softer shadow for a more modern feel
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-6">
        {/* IMPROVEMENT: Better typography for hierarchy */}
        <h3 className="text-xl font-bold text-gray-800">
          <span className="text-indigo-600">{selectedChild?.selectedChild?.name}'s </span>
          Creative Growth Journey 🌱</h3>
        <p className="text-base text-gray-500 mt-1">
          You are <span className="font-semibold text-purple-600">{clampedProgress}%</span> of the way there!
        </p>
      </div>

      <div className="relative w-full h-16 flex items-center">
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full" />

        {/* Animated Progress Fill using Framer Motion */}
        <motion.div
          className="absolute h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Steps */}
        <div className="relative w-full flex justify-between items-center">
          {steps.map((step, index) => {
            const stepPosition = (index / (steps.length - 1)) * 100;
            const isActive = clampedProgress >= stepPosition;

            return (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                // IMPROVEMENT: Hover effect for interactivity
                whileHover={{ scale: 1.1 }}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-300 z-10
                    ${isActive
                      ? 'bg-green-600 border-white text-white'
                      : 'bg-white border-gray-200 text-gray-400'
                    }
                  `}
                >
                  {/* IMPROVEMENT: Pop-in animation for active icons */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        {step.icon}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!isActive && step.icon}
                </div>
                {/* IMPROVEMENT: Better spacing and conditional text color */}
                <span className={`mt-3 text-sm font-medium transition-colors ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* IMPROVEMENT: Removed the redundant bottom progress bar and simplified the details section */}
      <div className="mt-8 pt-4 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          <span className='text-lg font-bold text-indigo-600'>{activeStep.label}</span>
        </p>
      </div>
    </div>
  );
};

export default CreativeGrowthPath;