import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({
  onClose,
}: ChatWindowProps) {
  return (
    <div
      className="
        flex
        h-[600px]
        max-h-[calc(100vh-120px)]
        w-[420px]
        max-w-[calc(100vw-32px)]
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-white
        shadow-2xl
      "
    >
      {/* Header */}
      <ChatHeader onClose={onClose} />

      {/* Body */}
      <div
        className="
          flex
          min-h-0
          flex-1
          overflow-hidden
          bg-slate-50
        "
      >
        <ChatMessages />
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}