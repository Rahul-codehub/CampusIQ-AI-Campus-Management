import {
  Bot,
  User,
} from "lucide-react";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChatMessage } from "./types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser =
    message.role === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[82%] gap-3 ${
          isUser
            ? "flex-row-reverse"
            : "flex-row"
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-700 text-white"
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>

        {/* Bubble */}

        <div className="space-y-1">

          {!isUser && (
            <p className="ml-1 text-xs font-medium text-muted-foreground">
              CampusIQ AI
            </p>
          )}

          <div
            className={`rounded-2xl px-4 py-3 shadow-sm ${
              isUser
                ? "rounded-br-md bg-primary text-primary-foreground"
                : "rounded-bl-md border bg-white"
            }`}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap text-sm leading-7">
                {message.content}
              </p>
            ) : (
              <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-headings:my-2 prose-strong:text-inherit">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <p
            className={`text-[11px] text-muted-foreground ${
              isUser
                ? "text-right"
                : "text-left"
            }`}
          >
            {new Date(
              message.timestamp
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

        </div>

      </div>
    </motion.div>
  );
}