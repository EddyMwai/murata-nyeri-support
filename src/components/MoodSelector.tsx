import React from "react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
];

const MoodSelector: React.FC<{ selected?: string; onSelect: (emoji: string) => void }> = ({ selected, onSelect }) => (
  <div className="flex justify-between mb-2 w-full max-w-xs mx-auto">
    {moods.map((mood) => (
      <button
        key={mood.emoji}
        className={`text-3xl p-2 rounded-full transition-transform duration-150 border-2 ${selected === mood.emoji ? "border-primary scale-110" : "border-transparent hover:bg-purple-50"}`}
        onClick={() => onSelect(mood.emoji)}
        aria-label={mood.label}
        type="button"
      >
        {mood.emoji}
      </button>
    ))}
  </div>
);

export default MoodSelector;
