import React from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "./ui/GradientButton";

const MiniGameCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 w-full max-w-md mx-auto flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2 text-purple-800">Proverb Quiz</h3>
      <div className="text-gray-700 mb-2 text-center">
        Test your knowledge of Kikuyu proverbs! Guess the meaning and earn a streak.
      </div>
      <button
        className="murata-back w-full mt-2 text-lg py-3 transition transform hover:scale-105 hover:bg-purple-600 hover:text-white shadow-md"
        onClick={() => navigate("/game")}
      >
        Play Now
      </button>
    </div>
  );
};

export default MiniGameCard;
