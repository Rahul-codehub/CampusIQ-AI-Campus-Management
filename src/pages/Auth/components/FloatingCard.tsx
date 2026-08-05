import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  value: string;
}

export default function FloatingCard({
  icon: Icon,
  title,
  value,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/20
        bg-white/15
        backdrop-blur-xl
        p-5
        shadow-xl
        transition
        duration-300
        hover:-translate-y-2
      "
    >
      <Icon className="mb-4 h-7 w-7 text-white" />

      <p className="text-sm text-white/70">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}