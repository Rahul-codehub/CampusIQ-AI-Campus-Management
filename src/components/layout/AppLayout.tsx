// import { ReactNode } from "react";
// import AppSidebar from "./AppSidebar";
// import FloatingChatbot from "@/components/chatbot/FloatingChatbot";

// const AppLayout = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="flex min-h-screen bg-background">
//       <AppSidebar />
//       <FloatingChatbot />

//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AppLayout;


import { ReactNode } from "react";

import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";

import FloatingChatbot from "@/components/chatbot/FloatingChatbot";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <FloatingChatbot />

      <main className="flex min-h-screen flex-1 flex-col overflow-auto">
        <div className="flex-1 p-8">
          {children}
        </div>

        <AppFooter />
      </main>
    </div>
  );
};

export default AppLayout;