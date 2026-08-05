import type { Tables } from "@/integrations/mongodb/types";

export type Student = Tables<"students">;

export type Department = Tables<"departments">;



export interface StudentForm {
  student_id: string;
  full_name: string;
  email: string;
  mobile: string;
  department_id: string;
  semester: string;
}

export interface StudentDialogProps {

  open: boolean;

  setOpen: (open: boolean) => void;

  form: StudentForm;

  setForm: React.Dispatch<
    React.SetStateAction<StudentForm>
  >;

  departments: Department[];

  onSubmit: (
    e: React.FormEvent
  ) => Promise<void>;

  loading: boolean;

  title: string;

  submitText: string;
}

export interface StudentTableProps {
  students: Student[];

  getDepartmentName: (
    id: string | null
  ) => string;

  onEdit: (
    student: Student
  ) => void;
}

export interface StudentTableProps {
    students: Student[];

    getDepartmentName: (
        id: string | null
    ) => string;

    onEdit: (
        student: Student
    ) => void;

    onDelete: (
        student: Student
    ) => void;
}