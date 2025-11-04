
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type QuizProverb = {
  proverb: string;
  options: string[];
  answerIdx: number;
};

const quizProverbs: QuizProverb[] = [
  {
    proverb: "Mûno ndûgîrîrwo ndûgîrîrwo na mûtî",
    options: [
      "A person is supported by others, just as a tree is supported by the forest.",
      "Patience pays off.",
      "There is no tree without roots (Everyone has an origin).",
      "Community is important."
    ],
    answerIdx: 0
  },
  {
    proverb: "Gûtirî mûtî ûtarî mûthî",
    options: [
      "He who perseveres eats (Patience pays off).",
      "There is no tree without roots (Everyone has an origin).",
      "A Kikuyu person does not eat alone (Community is important).",
      "A person is supported by others, just as a tree is supported by the forest."
    ],
    answerIdx: 1
  },
  {
    proverb: "Mûndû mûgîkûyû ndarîa na mûno",
    options: [
      "Community is important.",
      "A Kikuyu person does not eat alone (Community is important).",
      "Patience pays off.",
      "There is no tree without roots (Everyone has an origin)."
    ],
    answerIdx: 1
  },
  {
    proverb: "Wîhîrîrîa ndîrîa",
    options: [
      "He who perseveres eats (Patience pays off).",
      "A person is supported by others, just as a tree is supported by the forest.",
      "There is no tree without roots (Everyone has an origin).",
      "A Kikuyu person does not eat alone (Community is important)."
    ],
    answerIdx: 0
  }
];


const ProverbQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const current = quizProverbs[idx];

  const handleSelect = (optionIdx: number) => {
    if (!showAnswer) {
      setSelected(optionIdx);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected === null) return;
    setShowAnswer(true);
    setAnswers([...answers, selected]);
    if (selected === current.answerIdx) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setIdx((i) => (i + 1) % quizProverbs.length);
    setSelected(null);
    setShowAnswer(false);
  };

  const handleQuit = () => {
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <div className="w-full flex justify-end mb-2">
          <button className="murata-back px-4 py-1 text-sm" onClick={handleQuit}>Quit Game</button>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-4">Proverb Quiz</h2>
        <div className="mb-4 text-xl font-semibold text-primary text-center">“{current.proverb}”</div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-4">
            {current.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={`w-full px-4 py-2 border rounded transition transform shadow-sm text-left
                  ${selected === i ? "border-purple-600 bg-purple-100" : "border-gray-300 bg-white"}
                  ${showAnswer && i === current.answerIdx ? "border-green-600 bg-green-100" : ""}
                  ${showAnswer && selected === i && selected !== current.answerIdx ? "border-red-600 bg-red-100" : ""}
                `}
                onClick={() => handleSelect(i)}
                disabled={showAnswer}
              >
                {opt}
              </button>
            ))}
          </div>
          {!showAnswer && (
            <button type="submit" className="murata-back w-full py-2 text-lg transition transform hover:scale-105 hover:bg-purple-600 hover:text-white shadow-md" disabled={selected === null}>
              Submit
            </button>
          )}
        </form>
        {showAnswer && (
          <div className="mt-4 w-full text-center">
            {selected === current.answerIdx ? (
              <div className="text-green-700 font-semibold mb-2">Correct!</div>
            ) : (
              <div className="text-red-700 font-semibold mb-2">Incorrect.</div>
            )}
            <div className="text-gray-800 mb-2">Correct meaning: {current.options[current.answerIdx]}</div>
            <button className="murata-back w-full py-2 text-lg transition transform hover:scale-105 hover:bg-purple-600 hover:text-white shadow-md" onClick={handleNext}>Next Proverb</button>
          </div>
        )}
        <div className="mt-6 text-primary font-bold">Score: {score} | Streak: {streak}</div>
      </div>
    </div>
  );
};

export default ProverbQuiz;
