import { useEffect, useRef } from "react";

import WelcomeScreen from "./WelcomeScreen";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

import { useChatContext } from "./ChatContext";

export default function ChatMessages() {
  const {
    messages,
    isTyping,
  } = useChatContext();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  if (
    messages.length === 0 &&
    !isTyping
  ) {
    return <WelcomeScreen />;
  }

  return (
    <div
      className="
    flex-1
    overflow-y-auto

    px-5
    py-6

    space-y-5
  "
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      {isTyping && (
        <TypingIndicator />
      )}

      <div ref={bottomRef} />
    </div>
  );
}