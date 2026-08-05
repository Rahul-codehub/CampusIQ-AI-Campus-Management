import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">

      {/* AI Avatar */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-gradient-to-br
          from-blue-600
          via-cyan-500
          to-indigo-700

          text-white

          shadow-md
        "
      >
        <Bot className="h-5 w-5" />
      </div>

      {/* Bubble */}

      <div
        className="
          rounded-2xl
          rounded-bl-md

          border

          bg-white

          px-4
          py-3

          shadow-sm
        "
      >
        <div className="flex items-center gap-1">

          {[0, 1, 2].map((dot) => (

            <motion.div
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: dot * 0.15,
              }}
              className="
                h-2.5
                w-2.5

                rounded-full

                bg-blue-600
              "
            />

          ))}

        </div>
      </div>

    </div>
  );
}