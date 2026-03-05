import type { Message } from "../../types/chat";

interface Props {
  message: Message;
}

export const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl px-4 py-2 rounded-2xl ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};