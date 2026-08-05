import {
  createContext,
  useContext,
} from "react";

import { useChat } from "./useChat";

type ChatContextType = ReturnType<
  typeof useChat
>;

const ChatContext =
  createContext<
    ChatContextType | undefined
  >(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({
  children,
}: ChatProviderProps) {
  const chat = useChat();

  return (
    <ChatContext.Provider
      value={chat}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context =
    useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used inside ChatProvider."
    );
  }

  return context;
}