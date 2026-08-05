import { useEffect, useRef, useState } from "react";

import {
  Mic,
  Paperclip,
  SendHorizonal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useChatContext } from "./ChatContext";

export default function ChatInput() {
  const [message, setMessage] =
    useState("");

  const { sendMessage } =
    useChatContext();

  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    await sendMessage(message);

    setMessage("");

    inputRef.current?.focus();
  };

  return (
    <div className="border-t bg-white p-4">

      <div
        className="
          flex
          items-center
          gap-2

          rounded-2xl
          border

          bg-background

          px-3
          py-2

          shadow-sm
        "
      >

        <Button
          size="icon"
          variant="ghost"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <Input
          ref={inputRef}
          value={message}
          placeholder="Ask CampusIQ anything..."
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              await handleSend();
            }
          }}
          className="
            border-0
            bg-transparent
            shadow-none

            focus-visible:ring-0
          "
        />

        <Button
          size="icon"
          variant="ghost"
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
          className="
            rounded-full

            bg-blue-600

            hover:bg-blue-700
          "
        >
          <SendHorizonal className="h-5 w-5" />
        </Button>

      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        CampusIQ AI may make mistakes. Verify important information.
      </p>

    </div>
  );
}