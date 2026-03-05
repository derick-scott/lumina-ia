type Props = {
  children: React.ReactNode;
};

export function ChatLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex bg-black text-white overflow-hidden">
      {children}
    </div>
  );
}