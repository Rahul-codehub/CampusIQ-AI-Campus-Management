import { Bot, X } from "lucide-react";

import { motion } from "framer-motion";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatButton({
  isOpen,
  onClick,
}: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 3,
        },
      }}
      className="
        fixed
        bottom-6
        right-6
        z-[999]

        flex
        h-16
        w-16
        items-center
        justify-center

        rounded-full

        bg-gradient-to-br
        from-blue-600
        via-cyan-500
        to-indigo-700

        text-white

        shadow-[0_10px_35px_rgba(37,99,235,0.45)]
      "
    >
      {/* Glow */}

      <span
        className="
          absolute
          inset-0

          animate-ping

          rounded-full

          bg-blue-400/20
        "
      />

      {isOpen ? (
        <X className="relative h-7 w-7" />
      ) : (
        <Bot className="relative h-7 w-7" />
      )}
    </motion.button>
  );
}