import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

export const ChatInput = ({ onSend, loading }: Props) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex gap-2">
      <input
        className="flex-1 bg-neutral-800 text-white p-3 rounded-xl outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Send a message..."
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded-xl font-medium disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
};