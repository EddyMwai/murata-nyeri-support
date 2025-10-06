import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    // Save user message
    const { data: userMsg } = await supabase.from("messages").insert({ user_id: user.id, input, output: null }).select().single();
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    // Simulate bot reply (replace with real AI call)
    setTimeout(async () => {
      const botReply = `Echo: ${userMsg.input}`;
      await supabase.from("messages").update({ output: botReply }).eq("id", userMsg.id);
      setMessages((msgs) => msgs.map(m => m.id === userMsg.id ? { ...m, output: botReply } : m));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col">
      <Header title="Murata Chatbot">
        <button className="murata-back" onClick={() => navigate("/landing")}>Back to Home</button>
      </Header>
      <main className="flex-1 flex flex-col items-center px-2 w-full max-w-screen-md mx-auto py-4">
        <div className="murata-card w-full flex-1 overflow-y-auto mb-4 max-h-[60vh]">
          {loading ? (
            <div className="text-center text-primary">Loading chat...</div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <div className="self-end bg-primary text-white rounded-xl px-4 py-2 max-w-xs mb-1">{msg.input}</div>
                  {msg.output && (
                    <div className="self-start bg-secondary text-white rounded-xl px-4 py-2 max-w-xs">{msg.output}</div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="w-full flex gap-2">
          <input
            className="flex-1 rounded-full border border-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className="murata-back">Send</button>
        </form>
      </main>
    </div>
  );
};

export default ChatPage;
