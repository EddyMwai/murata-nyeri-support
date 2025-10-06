import React, { useState } from "react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
];

const MoodJournal = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const supportMessages: Record<string, string> = {
    "😊": "Keep shining! Your joy is contagious.",
    "😐": "Every day is a new chance. Stay steady!",
    "😔": "Even the longest night will end. Stay strong.",
    "😡": "Take a deep breath. You are in control.",
    "😴": "Rest is important. Take care of yourself.",
  };

  const handleMood = (emoji: string) => {
    setSelected(emoji);
    setMessage(supportMessages[emoji] || "Sending you good vibes!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2 text-purple-800">Mood Journal</h3>
      <div className="flex justify-between mb-2">
        {moods.map((mood) => (
          <button
            key={mood.emoji}
            className={`text-3xl p-2 rounded-full transition-transform duration-150 ${selected === mood.emoji ? "ring-2 ring-purple-400 scale-110" : "hover:bg-purple-50"}`}
            onClick={() => handleMood(mood.emoji)}
            aria-label={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {selected && (
        <div className="text-purple-700 text-sm mt-2 min-h-[24px]">{message}</div>
      )}
    </div>
  );
};

export default MoodJournal;
