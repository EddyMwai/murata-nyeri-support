
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import StreakTracker from "@/components/StreakTracker";
import ProverbCard from "@/components/ProverbCard";
import MoodSelector from "@/components/MoodSelector";

const mockProverbs = [
  { proverb: "Mûno ndûgîrîrwo ndûgîrîrwo na mûtî", meaning: "A person is supported by others, just as a tree is supported by the forest." },
  { proverb: "Gûtirî mûtî ûtarî mûthî", meaning: "There is no tree without roots (Everyone has an origin)." },
  { proverb: "Mûndû mûgîkûyû ndarîa na mûno", meaning: "A Kikuyu person does not eat alone (Community is important)." },
  { proverb: "Wîhîrîrîa ndîrîa", meaning: "He who perseveres eats (Patience pays off)." },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const [proverbIdx, setProverbIdx] = useState(0);
  const [mood, setMood] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Fetch streak from Supabase
    supabase.from("streaks").select("count").eq("user_id", user.id).single().then(({ data }) => {
      setStreak(data?.count || 0);
      setLoading(false);
    });
  }, [user]);

  const handleCheckin = async (drank: boolean, mood: string) => {
    if (!user) return;
    await supabase.from("checkins").insert({ user_id: user.id, drank, mood, date: new Date().toISOString() });
    if (!drank) setStreak((s) => s + 1);
    else setStreak(0);
    // Optionally update streak in Supabase
    await supabase.from("streaks").upsert({ user_id: user.id, count: !drank ? streak + 1 : 0 });
  };

  const handleMood = async (emoji: string) => {
    setMood(emoji);
    if (user) {
      await supabase.from("moods").insert({ user_id: user.id, mood: emoji, date: new Date().toISOString() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 flex flex-col">
      <Header title="Murata Dashboard" />
      <main className="max-w-screen-lg mx-auto py-8 px-4 w-full flex-1">
        <StreakTracker streak={streak} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Daily Check-in Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2 text-primary">Daily Check-in</h3>
            <div className="mb-2">Did you drink today?</div>
            <div className="flex gap-4 mb-2">
              <button className="murata-back px-6 py-2" onClick={() => handleCheckin(true, mood)}>Yes</button>
              <button className="murata-back px-6 py-2" onClick={() => handleCheckin(false, mood)}>No</button>
            </div>
            <div className="mb-2">How are you feeling today?</div>
            <MoodSelector selected={mood} onSelect={handleMood} />
          </div>

          {/* ProverbCard */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <ProverbCard proverb={mockProverbs[proverbIdx]} onNext={() => setProverbIdx((i) => (i + 1) % mockProverbs.length)} />
          </div>

          {/* Mini Game Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2 text-primary">Proverb Quiz</h3>
            <div className="text-gray-700 mb-2 text-center">Test your knowledge of Kikuyu proverbs! Guess the meaning and earn a streak.</div>
            <button className="murata-back w-full mt-2 text-lg py-3 transition transform hover:scale-105 hover:bg-purple-600 hover:text-white shadow-md" onClick={() => navigate("/game")}>Play Now</button>
          </div>

          {/* Chat Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2 text-primary">Chat</h3>
            <div className="text-gray-700 mb-2 text-center">Start a conversation with your AI counselor</div>
            <button className="murata-back w-full mt-2 text-lg py-3" onClick={() => navigate("/chat")}>Start Chat</button>
          </div>
        </div>
      </main>
      <footer className="w-full flex justify-center items-center py-4 bg-white/80 shadow-inner mt-4">
        <nav className="flex gap-8 text-primary font-medium">
          <button onClick={() => navigate("/checkins")} className="hover:text-purple-900">Check-in History</button>
          <button onClick={() => navigate("/support")} className="hover:text-purple-900">Support</button>
          <button onClick={() => navigate("/profile")} className="hover:text-purple-900">Profile</button>
        </nav>
      </footer>
    </div>
  );
};

export default Dashboard;