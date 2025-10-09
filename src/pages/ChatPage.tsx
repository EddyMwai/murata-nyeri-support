
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setMessages(data || []);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !user) return;
    const newMsg = {
      user_id: user.id,
      sender: "user",
      message: input,
      created_at: new Date().toISOString(),
    };
    const { data: inserted } = await supabase.from("messages").insert(newMsg).select().single();
    setMessages((msgs) => [...msgs, inserted]);
    setInput("");
    // Simulate AI reply
    setTimeout(async () => {
      const aiMsg = {
        user_id: user.id,
        sender: "ai",
        message: `Echo: ${inserted.message}`,
        created_at: new Date().toISOString(),
      };
      const { data: aiInserted } = await supabase.from("messages").insert(aiMsg).select().single();
      setMessages((msgs) => [...msgs, aiInserted]);
    }, 900);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col">
      {/* Top nav bar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#7A4BFF] to-[#B768FF] shadow-murata">
        <button className="murata-back !border-white !text-white !bg-transparent hover:!bg-white hover:!text-primary" onClick={() => navigate("/landing")}>Back</button>
        <div className="flex gap-4">
          <button className="murata-back !border-white !text-white !bg-transparent hover:!bg-white hover:!text-primary" onClick={() => navigate("/landing")}>Home</button>
          <button className="murata-back !border-white !text-white !bg-transparent hover:!bg-white hover:!text-primary" onClick={() => navigate("/profile")}>Profile</button>
          <button className="murata-back !border-white !text-white !bg-transparent hover:!bg-white hover:!text-primary" onClick={() => navigate("/chat")}>Chat</button>
          <button className="murata-back !border-white !text-white !bg-transparent hover:!bg-white hover:!text-primary" onClick={() => { localStorage.clear(); window.location.href = "/auth"; }}>Log Out</button>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center px-2 w-full max-w-screen-md mx-auto py-4">
        <div className="murata-card w-full flex-1 overflow-y-auto mb-4 max-h-[70vh] min-h-[40vh]">
          {loading ? (
            <div className="text-center text-primary">Loading chat...</div>
          ) : (
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-xs break-words shadow transition-all
                        ${msg.sender === "user"
                          ? "bg-gradient-to-r from-[#7A4BFF] to-[#B768FF] text-white self-end"
                          : "bg-white border border-primary text-primary self-start"}
                      `}
                    >
                      {msg.message}
                    </div>
                    <span className="text-xs text-gray-400 mt-1 px-1">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="w-full flex gap-2 items-end">
          <textarea
            className="flex-1 rounded-2xl border border-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none min-h-[44px] max-h-32"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
          />
          <button type="submit" className="murata-back flex items-center gap-1 px-4 py-2 text-lg" aria-label="Send">
            <FiSend />
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChatPage;
