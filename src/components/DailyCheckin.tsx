import React, { useState } from "react";

const DailyCheckin = ({ onCheckin }: { onCheckin: (drank: boolean, mood: string) => void }) => {
  const [drank, setDrank] = useState<null | boolean>(null);
  const [mood, setMood] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const moods = ["😊", "😐", "😔", "😡", "😴"];

  const handleSubmit = () => {
    if (drank !== null && mood) {
      setSubmitted(true);
      onCheckin(drank, mood);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2 text-purple-800">Daily Check-in</h3>
      <div className="mb-2">
        <div className="mb-1">Did you drink today?</div>
        <div className="flex gap-4 mb-2">
          <button
            className={`px-4 py-2 rounded-xl font-medium shadow ${drank === true ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-purple-100"}`}
            onClick={() => setDrank(true)}
          >
            Yes
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-medium shadow ${drank === false ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-purple-100"}`}
            onClick={() => setDrank(false)}
          >
            No
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-1">How are you feeling today?</div>
        <div className="flex gap-2">
          {moods.map((m) => (
            <button
              key={m}
              className={`text-2xl p-2 rounded-full transition-transform duration-150 ${mood === m ? "ring-2 ring-purple-400 scale-110" : "hover:bg-purple-50"}`}
              onClick={() => setMood(m)}
              aria-label={m}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <button
        className="mt-3 w-full bg-gradient-to-r from-[#7A4BFF] to-[#B768FF] text-white rounded-xl py-2 font-semibold shadow hover:scale-105 transition-transform"
        onClick={handleSubmit}
        disabled={drank === null || !mood || submitted}
      >
        {submitted ? "Check-in Complete!" : "Submit Check-in"}
      </button>
    </div>
  );
};

export default DailyCheckin;
