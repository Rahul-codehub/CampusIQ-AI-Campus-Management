import type { AppRole } from "@/integrations/mongodb/types";
import {
  BriefcaseBusiness,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type {
  SignupFormData,
} from "./types";

/* =========================================
   ADMIN
========================================= */

export const ADMIN_EMAIL =
  "rahulyadavrasalpur@gmail.com";

/* =========================================
   ROLE OPTIONS
========================================= */

export const ROLE_OPTIONS: {
  role: AppRole;
  label: string;
  icon: typeof ShieldCheck;
}[] = [
  {
    role: "student",
    label: "Student",
    icon: UserRound,
  },

  {
    role: "faculty",
    label: "Faculty",
    icon: BriefcaseBusiness,
  },

  {
    role: "admin",
    label: "Admin",
    icon: ShieldCheck,
  },
];

/* =========================================
   DEFAULT FORM
========================================= */

export const DEFAULT_FORM: SignupFormData =
{
  fullName: "",

  email: "",

  password: "",

  confirmPassword: "",

  role: "student",

  studentId: "",

  semester: "1",

  enrollmentYear:
    String(
      new Date().getFullYear()
    ),

  facultyId: "",

  designation: "",

  mobile: "",

  departmentId: "",
};