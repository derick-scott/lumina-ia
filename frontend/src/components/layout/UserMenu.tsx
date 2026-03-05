import { useState } from "react";

interface Props {
  collapsed: boolean;
}

export const UserMenu = ({ collapsed }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full"
        />
        {!collapsed && <span>Derick</span>}
      </div>

      {open && (
        <div className="absolute bottom-12 left-0 bg-neutral-800 rounded-lg p-2 w-40">
          <div className="hover:bg-neutral-700 p-2 rounded cursor-pointer">
            Settings
          </div>
          <div className="hover:bg-neutral-700 p-2 rounded cursor-pointer">
            Logout
          </div>
        </div>
      )}
    </div>
  );
};