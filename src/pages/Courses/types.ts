import type { Tables } from "@/integrations/mongodb/types";

/* ================================
   TYPES
================================ */

export type Course = Tables<"courses">;
export type Department = Tables<"departments">;
export type Faculty = Tables<"faculty">;

/* ================================
   FORM
================================ */

export interface CourseForm {
  course_code: string;
  name: string;
  department_id: string;
  faculty_id: string;
  semester: string;
  credits: string;
  max_students: string;
}

/* ================================
   STATS
================================ */

export interface CourseStatsProps {
  totalCourses: number;
  activeCourses: number;
  inactiveCourses: number;
  totalDepartments: number;
}

/* ================================
   FILTERS
================================ */

export interface CourseFiltersProps {
  search: string;
  total: number;
  onSearchChange: (value: string) => void;
}

/* ================================
   TABLE
================================ */

export interface CourseTableProps {
  courses: Course[];

  getDepartmentName: (
    id: string | null
  ) => string;

  getFacultyName: (
    id: string | null
  ) => string;

  onEdit: (
    course: Course
  ) => void;

  onDelete: (
    course: Course
  ) => void;
}

/* ================================
   DIALOG
================================ */

export interface CourseDialogProps {
  open: boolean;

  setOpen: (
    open: boolean
  ) => void;

  form: CourseForm;

  setForm: React.Dispatch<
    React.SetStateAction<CourseForm>
  >;

  departments: Department[];

  faculty: Faculty[];

  onSubmit: (
    e: React.FormEvent
  ) => void;

  loading: boolean;

  title: string;

  submitText: string;
}

/* ================================
   DELETE DIALOG
================================ */

export interface DeleteCourseDialogProps {
  open: boolean;

  setOpen: (
    open: boolean
  ) => void;

  courseName?: string;

  onConfirm: () => void;
}