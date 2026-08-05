import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import FloatingChatbot from "@/components/chatbot/FloatingChatbot";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <FloatingChatbot />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
