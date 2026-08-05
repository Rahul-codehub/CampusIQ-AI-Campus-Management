import type { Tables } from "@/integrations/mongodb/types";

/* ================================
   TYPES
================================ */

export type Attendance = Tables<"attendance">;
export type Student = Tables<"students">;
export type Course = Tables<"courses">;
export type Department = Tables<"departments">;

/* ================================
   FORM
================================ */

export interface AttendanceForm {
  department_id: string;
  semester: string;
  course_id: string;
  date: string;
}

/* ================================
   MARKING
================================ */

export interface StudentAttendance {
  student_id: string;
  full_name: string;
  student_code: string;
  status:
    | "present"
    | "absent"
    | "late"
    | "excused";
}

/* ================================
   STATS
================================ */

export interface AttendanceStatsProps {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
}

/* ================================
   FILTERS
================================ */

export interface AttendanceFiltersProps {
  departments: Department[];
  courses: Course[];

  form: AttendanceForm;

  setForm: React.Dispatch<
    React.SetStateAction<AttendanceForm>
  >;

  onLoadStudents: () => void;
}

/* ================================
   TABLE
================================ */

export interface AttendanceTableProps {
  students: StudentAttendance[];

  onStatusChange: (
    studentId: string,
    status:
      | "present"
      | "absent"
      | "late"
      | "excused"
  ) => void;
}