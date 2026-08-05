import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { ChatProvider } from "./ChatContext";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 right-6 z-[998]"
          >
            <ChatProvider>
              <ChatWindow
                onClose={() => setIsOpen(false)}
              />
            </ChatProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}