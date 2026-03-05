import { useState } from "react";
import type { Message } from "../types/chat";
import { api } from "../services/api";
import { v4 as uuidv4 } from "uuid";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await api.post("/chat", {
        conversation_id: conversationId,
        message: text,
      });

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response.data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (!conversationId) {
        setConversationId(response.data.conversation_id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (id: string) => {
    try {
      const res = await api.get(`/conversations/${id}`);

      const loadedMessages: Message[] = res.data.messages.map((m: any) => ({
        id: uuidv4(),
        role: m.role,
        content: m.content,
      }));

      setMessages(loadedMessages);
      setConversationId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const newConversation = () => {
    setMessages([]);
    setConversationId(null);
  };

  return {
    messages,
    sendMessage,
    loading,
    conversationId,
    loadConversation,
    newConversation,
  };
};