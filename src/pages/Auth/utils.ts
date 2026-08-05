import type {
  CaptchaState,
  SignupFormData,
} from "./types";

/* =========================================
   CAPTCHA
========================================= */

export function createCaptcha(): CaptchaState {

  const left =
    Math.floor(Math.random() * 8) + 2;

  const right =
    Math.floor(Math.random() * 8) + 2;

  return {

    question:
      `${left} + ${right}`,

    answer:
      String(left + right),

  };

}

/* =========================================
   PASSWORD MATCH
========================================= */

export function passwordsMatch(
  form: SignupFormData
) {

  return (
    form.password ===
    form.confirmPassword
  );

}

/* =========================================
   CAPTCHA VALIDATION
========================================= */

export function captchaMatches(
  captcha: CaptchaState,
  answer: string
) {

  return (
    captcha.answer ===
    answer.trim()
  );

}

/* =========================================
   EMAIL VALIDATION
========================================= */

export function isValidEmail(
  email: string
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );

}

/* =========================================
   REQUIRED FIELDS
========================================= */

export function hasRequiredStudentFields(
  form: SignupFormData
) {

  return !!(

    form.fullName &&
    form.email &&
    form.password &&
    form.studentId &&
    form.mobile &&
    form.departmentId &&
    form.semester &&
    form.enrollmentYear

  );

}

export function hasRequiredFacultyFields(
  form: SignupFormData
) {

  return !!(

    form.fullName &&
    form.email &&
    form.password &&
    form.facultyId &&
    form.mobile &&
    form.departmentId &&
    form.designation

  );

}