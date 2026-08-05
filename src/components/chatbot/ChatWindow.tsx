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
    h-[760px]
    w-[500px]
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

      <ChatHeader
        onClose={onClose}
      />

      {/* Body */}

      <div
        className="
    flex
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