import type { AttendanceForm } from "./types";

/* ================================
   INITIAL FORM
================================ */

export const INITIAL_ATTENDANCE_FORM: AttendanceForm = {
  department_id: "",
  semester: "1",
  course_id: "",
  date: new Date().toISOString().split("T")[0],
};

/* ================================
   ATTENDANCE STATUS
================================ */

export const ATTENDANCE_STATUS = [
  {
    label: "Present",
    value: "present",
  },
  {
    label: "Absent",
    value: "absent",
  },
  {
    label: "Late",
    value: "late",
  },
  {
    label: "Excused",
    value: "excused",
  },
] as const;