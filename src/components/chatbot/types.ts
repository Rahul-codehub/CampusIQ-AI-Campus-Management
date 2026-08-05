export interface ChatMessage {
  id: string;

  role: "user" | "assistant";

  content: string;

  timestamp: string;
}

export interface SuggestedPrompt {
  id: string;

  label: string;

  prompt: string;
}