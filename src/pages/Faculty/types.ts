import type { Dispatch, SetStateAction } from "react";
import type { Tables } from "@/integrations/mongodb/types";

export type Faculty = Tables<"faculty">;
export type Department = Tables<"departments">;

export interface FacultyForm {
  faculty_id: string;
  full_name: string;
  email: string;
  mobile: string;
  department_id: string;
  designation: string;
}

export interface FacultyDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  form: FacultyForm;
  setForm: Dispatch<SetStateAction<FacultyForm>>;

  departments: Department[];

  onSubmit: (
    e: React.FormEvent
  ) => Promise<void>;

  loading: boolean;

  title: string;

  submitText: string;
}

export interface FacultyFiltersProps {
  search: string;

  onSearchChange: (
    value: string
  ) => void;

  total: number;
}

export interface FacultyStatsProps {
  totalFaculty: number;

  activeFaculty: number;

  inactiveFaculty: number;

  totalDepartments: number;
}

export interface FacultyTableProps {
  faculty: Faculty[];

  getDepartmentName: (
    id: string | null
  ) => string;

  onEdit: (
    faculty: Faculty
  ) => void;

  onDelete: (
    faculty: Faculty
  ) => void;
}