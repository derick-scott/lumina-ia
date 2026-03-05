import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Conversation } from "../types/conversation";

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/conversations");
      setConversations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    activeId,
    setActiveId,
    refresh: fetchConversations,
  };
};