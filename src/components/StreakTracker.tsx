import React from "react";

interface StreakTrackerProps {
  streak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ streak }) => (
  <div className="murata-card w-full max-w-md mx-auto mb-6">
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-medium text-primary">Alcohol-Free Streak</span>
      <span className="text-sm font-semibold text-primary">{streak} days</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="h-4 rounded-full bg-gradient-to-r from-[#7A4BFF] to-[#B768FF] transition-all duration-500"
        style={{ width: `${Math.min(streak, 30) * 100 / 30}%` }}
      ></div>
    </div>
  </div>
);

export default StreakTracker;
