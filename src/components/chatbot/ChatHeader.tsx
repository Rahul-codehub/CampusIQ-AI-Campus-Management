import {
  Bot,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({
  onClose,
}: ChatHeaderProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        border-b

        bg-gradient-to-r
        from-blue-600
        via-indigo-600
        to-violet-600

        px-5
        py-4

        text-white
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            bg-white/20
            backdrop-blur
          "
        >
          <Bot className="h-7 w-7" />
        </div>

        <div>

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-semibold">
              CampusIQ AI
            </h2>

            <Sparkles className="h-4 w-4 text-yellow-300" />

          </div>

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-400" />

            <p className="text-xs text-white/80">
              Online • Ready to help
            </p>

          </div>

        </div>

      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={onClose}
        className="
          rounded-full
          text-white

          hover:bg-white/20
          hover:text-white
        "
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}