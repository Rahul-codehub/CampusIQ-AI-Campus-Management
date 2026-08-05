import type { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  icon: LucideIcon;
  onChange: (value: string) => void;
}

export default function AuthInput({
  label,
  placeholder,
  type = "text",
  value,
  icon: Icon,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">

      <Label className="text-sm font-medium text-slate-200">
        {label}
      </Label>

      <div className="relative">

        <Icon
          className="
            absolute
            left-4
            top-1/2
            h-5
            w-5
            -translate-y-1/2
            text-slate-400
          "
        />

        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-12
            rounded-xl
            border-white/20
            bg-white/10
            pl-12
            text-white
            placeholder:text-slate-400
            focus:border-cyan-400
            focus:ring-cyan-400
          "
        />

      </div>

    </div>
  );
}