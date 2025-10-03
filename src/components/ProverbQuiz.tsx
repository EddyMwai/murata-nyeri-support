import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quizData = [
  {
    proverb: "Mũtĩ ndũrũgagwo na kĩhoto kĩa mũruhí.",
    question: "What does this proverb teach us about recovery?",
    options: [
      "Don’t let your past struggles define your future.",
      "Always ask for help.",
      "Healing is quick and easy.",
      "Ignore your problems."
    ],
    answer: 0
  },
  {
    proverb: "Mũndũ ni mũndũ nĩ ũndũ wa andũ.",
    question: "What does this proverb teach us about recovery?",
    options: [
      "We heal together through community support.",
      "Stay isolated.",
      "Never trust anyone.",
      "Recovery is impossible."
    ],
    answer: 0
  },
  {
    proverb: "Kĩrĩa kĩmenyetwo nĩ kĩria kĩrekĩre.",
    question: "What does this proverb teach us about recovery?",
    options: [
      "Learn from the past but don’t live in it.",
      "Forget everything.",
      "The past is all that matters.",
      "Don’t seek wisdom."
    ],
    answer: 0
  }
];

export default function ProverbQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [showResult, setShowResult] = useState(false);

  const current = quizData[step];

  function handleSelect(idx: number) {
    setSelected(idx);
  }

  function handleNext() {
    if (selected === current.answer) setScore(score + 1);
    if (step < quizData.length - 1) {
      setStep(step + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  }

  function handleRestart() {
    setStep(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md bg-card/95 shadow-xl border-0 rounded-xl flex flex-col">
        <CardContent className="p-8 flex flex-col gap-6">
          {!showResult ? (
            <>
              <div className="text-lg font-semibold italic text-foreground text-center">
                “{current.proverb}”
              </div>
              <div className="text-base font-medium text-foreground text-center">
                {current.question}
              </div>
              <div className="flex flex-col gap-3 mt-2">
                {current.options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant={selected === idx ? "default" : "outline"}
                    className={`w-full py-3 text-base font-semibold transition-all ${selected === idx ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
                <span>Question {step + 1} of {quizData.length}</span>
                <span>Score: {score}</span>
              </div>
              <Button
                className="w-full mt-4 py-3 text-lg font-bold bg-primary text-primary-foreground"
                onClick={handleNext}
                disabled={selected === null}
              >
                {step === quizData.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-center text-primary mb-2">Quiz Complete!</div>
              <div className="text-lg text-center mb-4">Your Score: <span className="font-bold">{score} / {quizData.length}</span></div>
              <Button className="w-full mb-4 py-3 text-lg font-bold bg-primary text-primary-foreground" onClick={handleRestart}>
                Restart Quiz
              </Button>
              <Button className="w-full py-3 text-lg font-bold bg-gradient-primary text-primary-foreground" onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}>
                Start Chat with Murata
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
