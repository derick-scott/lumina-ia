import { useChat } from "../../hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

export const ChatWindow = () => {
  const { messages, sendMessage, loading } = useChat();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-neutral-500 mt-20">
            <h1 className="text-3xl font-semibold">Lumina AI</h1>
            <p className="mt-2">Start a new conversation</p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
};