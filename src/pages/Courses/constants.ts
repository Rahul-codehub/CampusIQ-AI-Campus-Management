import type { CourseForm } from "./types";

/* ================================
   INITIAL FORM
================================ */

export const INITIAL_COURSE_FORM: CourseForm = {
  course_code: "",
  name: "",
  department_id: "",
  faculty_id: "",
  semester: "1",
  credits: "3",
  max_students: "60",
};