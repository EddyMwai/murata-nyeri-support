import React, { useState } from "react";

const proverbs = [
  {
    proverb: "Mûno ndûgîrîrwo ndûgîrîrwo na mûtî",
    meaning: "A person is supported by others, just as a tree is supported by the forest.",
  },
  {
    proverb: "Gûtirî mûtî ûtarî mûthî",
    meaning: "There is no tree without roots (Everyone has an origin).",
  },
  {
    proverb: "Mûndû mûgîkûyû ndarîa na mûno",
    meaning: "A Kikuyu person does not eat alone (Community is important).",
  },
  {
    proverb: "Wîhîrîrîa ndîrîa",
    meaning: "He who perseveres eats (Patience pays off).",
  },
];

const MotivationalProverb = () => {
  const [index, setIndex] = useState(0);

  const nextProverb = () => {
    setIndex((prev) => (prev + 1) % proverbs.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 w-full max-w-md mx-auto flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2 text-purple-800">Motivational Proverb</h3>
      <div className="text-center mb-2">
        <div className="text-xl font-bold text-purple-700">“{proverbs[index].proverb}”</div>
        <div className="text-sm text-gray-700 mt-1">{proverbs[index].meaning}</div>
      </div>
      <button
        className="mt-2 px-4 py-2 bg-gradient-to-r from-[#7A4BFF] to-[#B768FF] text-white rounded-xl shadow hover:scale-105 transition-transform"
        onClick={nextProverb}
      >
        Next proverb
      </button>
    </div>
  );
};

export default MotivationalProverb;
