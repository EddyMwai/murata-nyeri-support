import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import StreakTracker from "@/components/StreakTracker";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [streak, setStreak] = useState<number>(0);
  const [moods, setMoods] = useState<string[]>([]);
  const [moodLoading, setMoodLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    // Fetch streak from Supabase
    supabase
      .from("streaks")
      .select("count")
      .eq("user_id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setStreak(data.count || 0);
      });
    // Fetch last 5 moods
    supabase
      .from("moods")
      .select("mood")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(5)
      .then(({ data, error }) => {
        if (!error && data) setMoods(data.map((m: any) => m.mood));
        setMoodLoading(false);
      });
  }, [user]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await signOut();
    setLogoutLoading(false);
    navigate("/auth");
  };

  // Placeholder for preferences
  const [darkMode, setDarkMode] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-50">
        <div className="text-primary text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 flex flex-col">
      <main className="max-w-screen-lg mx-auto py-8 px-4 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <img
              src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=7A4BFF&color=fff`}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mb-2 shadow"
            />
            <h3 className="text-xl font-bold text-primary mb-1">{user.user_metadata?.full_name || profile?.full_name || "User"}</h3>
            <div className="text-gray-700 mb-1">{user.email}</div>
            <div className="text-gray-500 text-sm">Member since {new Date(user.created_at).toLocaleDateString()}</div>
          </div>

          {/* Progress Summary Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-primary mb-2">Progress Summary</h3>
            <StreakTracker streak={streak} />
            <div className="w-full mt-2">
              <div className="text-sm text-primary font-medium mb-1">Recent Moods</div>
              {moodLoading ? (
                <div className="text-gray-400">Loading moods...</div>
              ) : (
                <div className="flex gap-2 justify-center">
                  {moods.length === 0 ? (
                    <span className="text-gray-400">No moods yet</span>
                  ) : (
                    moods.map((mood, i) => (
                      <span key={i} className="text-2xl">{mood}</span>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preferences Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-primary mb-2">Preferences</h3>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Dark Mode</span>
                <button className={`murata-back px-4 py-1 ${darkMode ? "bg-purple-600 text-white" : ""}`} onClick={() => setDarkMode((d) => !d)}>
                  {darkMode ? "On" : "Off"}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Daily Reminder Time</span>
                <button className="murata-back px-4 py-1" disabled>Set (Coming Soon)</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Privacy</span>
                <button className={`murata-back px-4 py-1 ${privacy ? "bg-purple-600 text-white" : ""}`} onClick={() => setPrivacy((p) => !p)}>
                  {privacy ? "Private" : "Public"}
                </button>
              </div>
            </div>
          </div>

          {/* Account Management Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-primary mb-2">Account Management</h3>
            <div className="flex flex-col gap-3 w-full">
              <button className="murata-back w-full" onClick={() => navigate("/auth?tab=reset")}>Change Password</button>
              <button className="murata-back w-full" onClick={handleLogout} disabled={logoutLoading}>{logoutLoading ? "Logging out..." : "Logout"}</button>
              <button className="murata-back w-full" disabled>Delete Account (Coming Soon)</button>
            </div>
          </div>

          {/* Support Section Card */}
          <div className="murata-card rounded-xl shadow bg-white/90 p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-primary mb-2">Support</h3>
            <button className="murata-back w-full" onClick={() => navigate("/support")}>Need Help? Contact Murata Support</button>
          </div>
        </div>
      </main>
      {/* Footer Navigation */}
      <footer className="w-full flex justify-center items-center py-4 bg-white/80 shadow-inner mt-4">
        <nav className="flex gap-8 text-primary font-medium">
          <button onClick={() => navigate("/dashboard")} className="hover:text-purple-900">Dashboard</button>
          <button onClick={() => navigate("/checkins")} className="hover:text-purple-900">Check-in History</button>
          <button onClick={() => navigate("/support")} className="hover:text-purple-900">Support</button>
          <button className="text-purple-900 font-bold underline">Profile</button>
        </nav>
      </footer>
    </div>
  );
};

export default ProfilePage;
