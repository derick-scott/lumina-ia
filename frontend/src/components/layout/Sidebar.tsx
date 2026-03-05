import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

type Conversation = {
  id: string;
  title: string;
};

type Props = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
};


export function Sidebar({
  collapsed,
  setCollapsed,
  onSelectConversation,
  onNewConversation,
}: Props) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const res = await api.get("/conversations");
        setConversations(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadConversations();
  }, []);

  return (
    <aside
      className={`
        h-full bg-zinc-900 border-r border-zinc-800
        flex flex-col justify-between
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-zinc-800 transition"
          >
            <Menu size={18} />
          </button>

          {!collapsed && (
            <span className="font-semibold text-lg">Lumina</span>
          )}
        </div>

        {!collapsed && (
          <div className="px-4 mt-4 space-y-2">

            <button
              onClick={onNewConversation}
              className="w-full text-left text-sm bg-zinc-800 hover:bg-zinc-700 p-2 rounded"
            >
              + Nova conversa
            </button>

            <div className="text-xs text-zinc-500 mt-4">
              Conversas
            </div>

            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className="text-sm hover:bg-zinc-800 p-2 rounded cursor-pointer truncate"
              >
                {conv.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* perfil */}
      <div className="relative p-4 border-t border-zinc-800">
        <div
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          {!collapsed && <span>Derick</span>}
        </div>

        {profileOpen && !collapsed && (
          <div className="absolute bottom-14 left-4 bg-zinc-800 rounded shadow-lg p-2 w-40">
            <div className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm">
              Configurações
            </div>
            <div className="p-2 hover:bg-zinc-700 rounded cursor-pointer text-sm">
              Logout
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}