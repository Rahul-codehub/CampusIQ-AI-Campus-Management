import { useState } from "react";
import { v4 as uuid } from "uuid";

import { ChatMessage } from "./types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: uuid(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:4000/api/ai",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: uuid(),
        role: "assistant",
        content:
          data.reply ??
          "No response received.",
        timestamp:
          new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          role: "assistant",
          content:
            "Unable to connect to CampusIQ AI.",
          timestamp:
            new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
  };
}