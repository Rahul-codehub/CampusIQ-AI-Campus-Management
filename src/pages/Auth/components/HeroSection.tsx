import {
  GraduationCap,
  Bot,
  BarChart3,
  ClipboardCheck,
  Bell,
  FileText,
} from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Student Management",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
  },
  {
    icon: Bot,
    title: "AI Assistant",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
  },
  {
    icon: Bell,
    title: "Notice Board",
  },
  {
    icon: FileText,
    title: "Assignments",
  },
];

export default function HeroSection() {
  return (
    <div className="hidden lg:flex flex-col justify-center h-full text-white">

      <div className="mb-10">

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/15 backdrop-blur">

          <GraduationCap className="w-10 h-10" />

        </div>

        <h1 className="mt-8 text-5xl font-bold">
          CampusIQ
        </h1>

        <p className="mt-4 text-xl text-white/80 leading-relaxed max-w-lg">
          AI Powered Campus Management Platform
          for students, faculty and administrators.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5">

        {FEATURES.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5 transition hover:bg-white/20"
            >
              <Icon className="h-7 w-7 mb-3" />

              <p className="font-medium">
                {item.title}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}