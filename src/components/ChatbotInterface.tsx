import React from "react";

export interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  role: "admin" | "counselor" | "user";
}

export interface ChatbotInterfaceProps {
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage?: (content: string) => void;
}

export const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({
  messages,
  currentUserId,
  onSendMessage,
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-purple-100 to-white rounded-lg shadow-lg p-4">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.user_id === currentUserId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm break-words ${
                msg.user_id === currentUserId
                  ? "bg-purple-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-purple-200 rounded-bl-none"
              }`}
            >
              {msg.content}
              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Input area (no logic) */}
      <div className="flex items-center gap-2 border-t pt-2">
        <input
          type="text"
          className="flex-1 rounded border border-purple-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Type your message..."
          disabled
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600 disabled:opacity-50"
          disabled
        >
          Send
        </button>
      </div>
    </div>
  );
};
