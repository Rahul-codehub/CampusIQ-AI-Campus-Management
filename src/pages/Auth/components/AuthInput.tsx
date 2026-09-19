// import type { LucideIcon } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface Props {
//   label: string;
//   placeholder?: string;
//   type?: string;
//   value: string;
//   icon: LucideIcon;
//   onChange: (value: string) => void;
// }

// export default function AuthInput({
//   label,
//   placeholder,
//   type = "text",
//   value,
//   icon: Icon,
//   onChange,
// }: Props) {
//   return (
//     <div className="space-y-2">

//       <Label className="text-sm font-medium text-slate-200">
//         {label}
//       </Label>

//       <div className="relative">

//         <Icon
//           className="
//             absolute
//             left-4
//             top-1/2
//             h-5
//             w-5
//             -translate-y-1/2
//             text-slate-400
//           "
//         />

//         <Input
//           type={type}
//           value={value}
//           placeholder={placeholder}
//           onChange={(e) => onChange(e.target.value)}
//           className="
//             h-12
//             rounded-xl
//             border-white/20
//             bg-white/10
//             pl-12
//             text-white
//             placeholder:text-slate-400
//             focus:border-cyan-400
//             focus:ring-cyan-400
//           "
//         />

//       </div>

//     </div>
//   );
// }




import { useState } from "react";

import type { LucideIcon } from "lucide-react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

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

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const isPassword =
    type === "password";

  const inputType =
    isPassword && showPassword
      ? "text"
      : type;

  return (
    <div className="space-y-2">

      <Label className="text-sm font-medium text-slate-200">
        {label}
      </Label>

      <div className="relative">

        {/* Input Icon */}
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
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className={`
            h-12
            rounded-xl
            border-white/20
            bg-white/10
            pl-12
            text-white
            placeholder:text-slate-400
            focus:border-cyan-400
            focus:ring-cyan-400
            ${isPassword ? "pr-12" : ""}
          `}
        />

        {/* Show / Hide Password */}
        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (previous) =>
                  !previous
              )
            }
            className="
              absolute
              right-3
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition-all
              duration-200
              hover:bg-white/10
              hover:text-cyan-300
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400/50
            "
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}

      </div>

    </div>
  );
}