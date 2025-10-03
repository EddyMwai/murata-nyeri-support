import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const moods = [
  { label: "Great", emoji: "😃" },
  { label: "Okay", emoji: "🙂" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😠" },
  { label: "Tired", emoji: "😴" },
];

const wisdom = {
  proverb: "Mũkuũ ndaguĩte ũhoro ũgatigwo.",
  translation: "An old person has heard stories that were left behind.",
  meaning: "Wisdom from elders guides our healing journey."
};

export default function MurataChatbot() {
  const [streak, setStreak] = useState(7);
  const [checkin, setCheckin] = useState<null | boolean>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <Card className="w-full max-w-2xl bg-card/95 shadow-xl border-0 rounded-xl flex flex-col gap-8">
        <CardContent className="p-8 flex flex-col gap-8">
          {/* Streak Tracker */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-foreground">Alcohol-Free Streak</span>
              <span className="font-bold text-accent">{streak} days</span>
            </div>
            <Progress value={Math.min(streak, 30) * 100 / 30} className="h-3 bg-muted [&>div]:bg-accent rounded-full" />
          </div>

          {/* Daily Check-in */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <span className="font-semibold text-foreground mb-1">Did you drink alcohol today?</span>
              <div className="flex gap-3">
                <Button
                  variant={checkin === true ? "default" : "outline"}
                  className={`flex-1 py-2 ${checkin === true ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setCheckin(true)}
                >
                  Yes
                </Button>
                <Button
                  variant={checkin === false ? "default" : "outline"}
                  className={`flex-1 py-2 ${checkin === false ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setCheckin(false)}
                >
                  No
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <span className="font-semibold text-foreground mb-1">How do you feel today?</span>
              <div className="flex gap-2 flex-wrap">
                {moods.map((m) => (
                  <Button
                    key={m.label}
                    variant={mood === m.label ? "default" : "outline"}
                    className={`flex-1 min-w-[60px] py-2 text-lg ${mood === m.label ? "bg-secondary text-secondary-foreground" : ""}`}
                    onClick={() => setMood(m.label)}
                  >
                    <span className="mr-1">{m.emoji}</span> {m.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Wisdom */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="border border-accent rounded-lg p-4 bg-accent/10">
              <div className="text-lg font-semibold italic text-accent mb-1">“{wisdom.proverb}”</div>
              <div className="text-base text-muted-foreground mb-2">{wisdom.translation}</div>
              {showMeaning ? (
                <div className="text-sm text-foreground mt-2">{wisdom.meaning}</div>
              ) : (
                <Button
                  variant="outline"
                  className="mt-2 border-accent text-accent hover:bg-accent/20"
                  onClick={() => setShowMeaning(true)}
                >
                  Show Meaning
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
