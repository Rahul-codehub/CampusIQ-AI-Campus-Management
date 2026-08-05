import type { AppRole } from "@/integrations/mongodb/types";

export type AuthMode =
  | "login"
  | "signup"
  | "forgot";

export interface SignupFormData {
  fullName: string;

  email: string;

  password: string;

  confirmPassword: string;

  role: AppRole;

  /* Student */

  studentId: string;

  semester: string;

  enrollmentYear: string;

  /* Faculty */

  facultyId: string;

  designation: string;

  /* Common */

  mobile: string;

  departmentId: string;
}

export interface CaptchaState {
  question: string;
  answer: string;
}