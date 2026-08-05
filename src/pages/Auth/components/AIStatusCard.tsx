import { Bot } from "lucide-react";

export default function AIStatusCard() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-3xl
        border
        border-cyan-400/20
        bg-cyan-500/10
        p-5
        backdrop-blur-xl
      "
    >
      <div>

        <p className="text-sm text-cyan-200">
          AI Assistant
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          Online
        </h3>

        <p className="mt-1 text-sm text-white/60">
          Ready to answer campus queries
        </p>

      </div>

      <div className="relative">

        <Bot className="h-14 w-14 text-cyan-300" />

        <span
          className="
            absolute
            right-0
            top-0
            h-3
            w-3
            rounded-full
            bg-green-400
            animate-ping
          "
        />

      </div>
    </div>
  );
}