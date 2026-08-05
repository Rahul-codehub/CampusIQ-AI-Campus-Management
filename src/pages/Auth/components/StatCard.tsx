import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

export default function StatCard({
  icon: Icon,
  title,
  value,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/15
        bg-white/10
        backdrop-blur-xl
        p-5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:bg-white/15
      "
    >
      <Icon className="mb-4 h-8 w-8 text-cyan-300" />

      <p className="text-sm text-white/70">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}