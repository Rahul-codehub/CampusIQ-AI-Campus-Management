import { useChatContext } from "./ChatContext";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

export default function WelcomeScreen() {
  const { sendMessage } = useChatContext();
  const suggestions = [
  {
    icon: GraduationCap,
    title: "Find Student",
    subtitle: "Search student records",
    prompt: "Show all students in the campus.",
  },
  {
    icon: BarChart3,
    title: "Attendance Analytics",
    subtitle: "Generate attendance reports",
    prompt: "Generate attendance analytics.",
  },
  {
    icon: Bell,
    title: "Create Notice",
    subtitle: "Draft a campus notice",
    prompt: "Help me draft a campus notice.",
  },
  {
    icon: CalendarDays,
    title: "Upcoming Events",
    subtitle: "View scheduled events",
    prompt: "Show upcoming campus events.",
  },
  {
    icon: Users,
    title: "Faculty Details",
    subtitle: "Search faculty information",
    prompt: "Show all faculty members.",
  },
];
  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 py-8">

      {/* AI Avatar */}

      <div className="flex justify-center">

        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="relative"
        >

          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

          <div
            className="
              relative
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full

              bg-gradient-to-br
              from-blue-600
              via-cyan-500
              to-indigo-700

              shadow-xl
            "
          >
            <Bot className="h-12 w-12 text-white" />
          </div>

        </motion.div>

      </div>

      {/* Heading */}

      <div className="mt-6 text-center">

        <div className="flex items-center justify-center gap-2">

          <h2 className="text-3xl font-bold">
            CampusIQ AI
          </h2>

          <Sparkles className="h-5 w-5 text-yellow-500" />

        </div>

        <p className="mt-3 text-muted-foreground">
          Welcome 👋
        </p>

        <p className="mt-2 text-sm text-muted-foreground leading-6">
          Your intelligent campus assistant.
          Ask questions, generate reports,
          manage students, attendance,
          notices and events.
        </p>

      </div>

      {/* Quick Actions */}

      <div className="mt-10">

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick Actions
        </h3>

        <div className="space-y-3">

          {suggestions.map((item) => {

            const Icon = item.icon;

            return (

              <motion.button
    key={item.title}
    onClick={() => sendMessage(item.prompt)}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-between

                  rounded-2xl

                  border

                  bg-white

                  p-4

                  text-left

                  shadow-sm

                  transition-all

                  hover:border-blue-500
                  hover:shadow-md
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      rounded-xl

                      bg-blue-100

                      p-3
                    "
                  >
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {item.title}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>

                  </div>

                </div>

                <ArrowRight className="h-5 w-5 text-muted-foreground" />

              </motion.button>

            );

          })}

        </div>

      </div>

    </div>
  );
}