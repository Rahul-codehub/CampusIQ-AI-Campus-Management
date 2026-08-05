import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

import type { AppRole } from "@/integrations/mongodb/types";

interface Props {
  selectedRole: AppRole;
  onChange: (role: AppRole) => void;
  disableAdminSignup?: boolean;
}

const roles = [
  {
    id: "student",
    title: "Student",
    icon: GraduationCap,
    color: "text-blue-500",
  },
  {
    id: "faculty",
    title: "Faculty",
    icon: Briefcase,
    color: "text-emerald-500",
  },
  {
    id: "admin",
    title: "Admin",
    icon: ShieldCheck,
    color: "text-violet-500",
  },
] as const;

export default function RoleCards({
  selectedRole,
  onChange,
  disableAdminSignup,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">

      {roles.map((role) => {

        const Icon = role.icon;

        const disabled =
          disableAdminSignup &&
          role.id === "admin";

        const active =
          selectedRole === role.id;

        return (

          <button
            key={role.id}
            type="button"
            disabled={disabled}
            onClick={() =>
              onChange(role.id)
            }
            className={`
              rounded-2xl
              border
              p-5
              transition-all
              duration-300

              ${
                active
                  ? "border-blue-500 bg-blue-500/10 shadow-lg scale-105"
                  : "border-slate-300 hover:border-blue-300 hover:-translate-y-1"
              }

              ${
                disabled
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }
            `}
          >

            <Icon
              className={`
                h-8
                w-8
                mx-auto
                mb-3
                ${role.color}
              `}
            />

            <p className="font-semibold">
              {role.title}
            </p>

          </button>

        );
      })}

    </div>
  );
}