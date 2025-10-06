import React from "react";

export interface Proverb {
  proverb: string;
  meaning: string;
}

const ProverbCard: React.FC<{ proverb: Proverb; onNext?: () => void }> = ({ proverb, onNext }) => (
  <div className="murata-card w-full max-w-md mx-auto flex flex-col items-center mb-6">
    <h3 className="text-lg font-semibold mb-2 text-primary">Motivational Proverb</h3>
    <div className="text-center mb-2">
      <div className="text-xl font-bold text-primary">“{proverb.proverb}”</div>
      <div className="text-sm text-gray-700 mt-1">{proverb.meaning}</div>
    </div>
    {onNext && (
      <button
        className="mt-2 px-4 py-2 murata-back border-primary text-primary"
        onClick={onNext}
      >
        Next proverb
      </button>
    )}
  </div>
);

export default ProverbCard;
