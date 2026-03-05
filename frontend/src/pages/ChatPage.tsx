import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { useChat } from "../hooks/useChat";

export function ChatPage() {

  const {
    messages,
    sendMessage,
    loading,
    loadConversation,
    newConversation
  } = useChat();

  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  return (

    <div className="flex h-screen w-screen bg-zinc-950 text-white overflow-hidden">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onSelectConversation={loadConversation}
        onNewConversation={newConversation}
      />

      <div className="flex-1 flex flex-col">

        {/* mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h1 className="text-5xl font-light text-zinc-500">
                  Lumina AI
                </h1>
                <p className="text-zinc-600 mt-2">
                  Start a new conversation
                </p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`w-full ${
                msg.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-lg max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-white text-black"
                    : "bg-zinc-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-zinc-500 text-sm">
              Lumina is thinking...
            </div>
          )}

        </div>

        {/* input */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex gap-4">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Send a message..."
              className="flex-1 bg-zinc-800 rounded-lg px-4 py-3 outline-none"
            />

            <button
              onClick={handleSend}
              className="bg-white text-black px-6 rounded-lg font-medium"
            >
              Send
            </button>

          </div>
        </div>

      </div>

    </div>

  );
}