
import { Card } from "@/components/ui/card";
import { useState } from "react";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😴", label: "Sleepy", value: "sleepy" },
    { emoji: "🤔", label: "Curious", value: "curious" },
    { emoji: "😎", label: "Confident", value: "confident" },
    { emoji: "😅", label: "Nervous", value: "nervous" }
  ];

  return (
    <Card className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-100 border-orange-200 shadow-lg">
      <h3 className="text-xs sm:text-sm font-bold text-orange-800 mb-3 text-center">
        How are you feeling today?
      </h3>
      
      <div className="flex justify-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`p-2 sm:p-3 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0 shadow-sm ${
              selectedMood === mood.value
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 scale-110 shadow-lg text-white'
                : 'bg-white hover:bg-orange-50 hover:scale-105 active:scale-95 border border-orange-200'
            }`}
          >
            <div className="text-lg sm:text-xl">{mood.emoji}</div>
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <p className="text-xs text-center text-orange-700 mt-3 px-2 bg-orange-50 rounded-lg py-2 border border-orange-200 shadow-sm">
          Great! We'll tailor today's activities for your {moods.find(m => m.value === selectedMood)?.label.toLowerCase()} mood! ✨
        </p>
      )}
    </Card>
  );
};

export default MoodTracker;
