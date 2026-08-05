import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { studentService } from "../services/studentService";
import { INITIAL_STUDENT_FORM } from "../constants";

import type {
  Student,
  Department,
  StudentForm,
} from "../types";

export default function useStudents() {
  /* =========================================
     STATES
  ========================================= */

  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [form, setForm] =
    useState<StudentForm>(INITIAL_STUDENT_FORM);

  /* =========================================
     FETCH DATA
  ========================================= */

  const fetchData = async () => {
    try {
      setLoading(true);

      const [studentsData, departmentsData] =
        await Promise.all([
          studentService.getStudents(),
          studentService.getDepartments(),
        ]);

      setStudents(studentsData);
      setDepartments(departmentsData);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.message ??
          "Unable to load students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================================
     ADD STUDENT
  ========================================= */

  const handleAdd = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await studentService.createStudent({
        student_id: form.student_id,

        full_name: form.full_name,

        email: form.email,

        mobile: form.mobile,

        department_id:
          form.department_id || null,

        semester: Number(form.semester),

        status: "active",
      });

      toast.success(
        "Student added successfully!"
      );

      setOpen(false);

      setForm(INITIAL_STUDENT_FORM);

      fetchData();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.message ??
          "Unable to add student."
      );
    }
  };

  /* =========================================
     FILTER STUDENTS
  ========================================= */

  const filteredStudents = useMemo(() => {
    const keyword = search.toLowerCase();

    return students.filter((student) => {
      return (
        student.full_name
          ?.toLowerCase()
          .includes(keyword) ||

        student.student_id
          ?.toLowerCase()
          .includes(keyword) ||

        student.email
          ?.toLowerCase()
          .includes(keyword) ||

        student.mobile
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [students, search]);

  /* =========================================
     STATISTICS
  ========================================= */

  const totalStudents = students.length;

  const activeStudents =
    students.filter(
      (student) =>
        student.status === "active"
    ).length;

  const inactiveStudents =
    students.filter(
      (student) =>
        student.status === "inactive"
    ).length;

  const totalDepartments = new Set(
    students
      .filter(
        (student) =>
          student.department_id
      )
      .map(
        (student) =>
          student.department_id
      )
  ).size;

  /* =========================================
     HELPERS
  ========================================= */

  const getDeptName = (
    id: string | null
  ) =>
    departments.find(
      (dept) => dept.id === id
    )?.name || "—";

  /* =========================================
     EXPORTS
  ========================================= */

  return {
    loading,

    students,
    departments,

    filteredStudents,

    search,
    setSearch,

    open,
    setOpen,

    form,
    setForm,

    totalStudents,
    activeStudents,
    inactiveStudents,
    totalDepartments,

    getDeptName,

    handleAdd,

    refresh: fetchData,
  };
}