import { useAuth } from "@/contexts/AuthContext";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import AttendanceStats from "./components/AttendanceStats";
import AttendanceFilters from "./components/AttendanceFilters";
import AttendanceTable from "./components/AttendanceTable";
import StudentAttendance from "./components/StudentAttendance";

import {
  INITIAL_ATTENDANCE_FORM,
} from "./constants";

import { attendanceService } from "./services/attendanceService";

import type {
  AttendanceForm,
  StudentAttendance as StudentAttendanceType,
  Department,
  Course,
  Student,
} from "./types";

const AttendancePage = () => {

  const { hasRole } = useAuth();

  const isStudent = hasRole("student");
  

  /* =========================================
      STATES
  ========================================= */

  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [students, setStudents] =
    useState<Student[]>([]);

  const [attendanceStudents, setAttendanceStudents] =
    useState<StudentAttendanceType[]>([]);

  const [form, setForm] =
    useState<AttendanceForm>(
      INITIAL_ATTENDANCE_FORM
    );

  const [loading, setLoading] =
    useState(false);

  /* =========================================
      FETCH INITIAL DATA
  ========================================= */

  const fetchData = async () => {
    try {

      const [
        departmentData,
        courseData,
        studentData,
      ] = await Promise.all([
        attendanceService.getDepartments(),
        attendanceService.getCourses(),
        attendanceService.getStudents(),
      ]);

      setDepartments(
        departmentData
      );

      setCourses(
        courseData
      );

      setStudents(
        studentData
      );

    } catch (error: any) {

      toast.error(
        error.message ||
        "Unable to load attendance."
      );

    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  /* =========================================
    LOAD STUDENTS
========================================= */

  const handleLoadStudents = () => {

    if (
      !form.department_id ||
      !form.course_id
    ) {
      toast.error(
        "Please select Department and Course."
      );
      return;
    }

    const filteredStudents =
      students.filter(
        (student) =>
          student.department_id ===
          form.department_id &&
          student.semester ===
          Number(form.semester) &&
          student.status === "active"
      );

    setAttendanceStudents(
      filteredStudents.map(
        (student) => ({
          student_id: student.id,
          student_code:
            student.student_id,
          full_name:
            student.full_name,
          status: "present",
        })
      )
    );

    toast.success(
      `${filteredStudents.length} students loaded.`
    );
  };

  /* =========================================
      CHANGE STATUS
  ========================================= */

  const handleStatusChange = (
    studentId: string,
    status:
      | "present"
      | "absent"
      | "late"
      | "excused"
  ) => {

    setAttendanceStudents(
      (prev) =>
        prev.map((student) =>
          student.student_id ===
            studentId
            ? {
              ...student,
              status,
            }
            : student
        )
    );
  };

  /* =========================================
      SAVE ATTENDANCE
  ========================================= */

  const handleSaveAttendance =
    async () => {

      if (
        attendanceStudents.length === 0
      ) {
        toast.error(
          "No students loaded."
        );
        return;
      }

      try {

        setLoading(true);

        await Promise.all(
          attendanceStudents.map(
            (student) =>
              attendanceService.createAttendance({
                student_id:
                  student.student_id,

                course_id:
                  form.course_id,

                date:
                  form.date,

                status:
                  student.status,

                marked_by: null,
              })
          )
        );

        toast.success(
          "Attendance saved successfully."
        );

      } catch (error: any) {

        toast.error(
          error.message ||
          "Unable to save attendance."
        );

      } finally {

        setLoading(false);

      }
    };

  /* =========================================
      STATISTICS
  ========================================= */

  const totalStudents =
    attendanceStudents.length;

  const present =
    attendanceStudents.filter(
      (student) =>
        student.status ===
        "present"
    ).length;

  const absent =
    attendanceStudents.filter(
      (student) =>
        student.status ===
        "absent"
    ).length;

  const late =
    attendanceStudents.filter(
      (student) =>
        student.status ===
        "late"
    ).length;
  /* =========================================
  Student View
========================================= */
  if (isStudent) {
  return (
    <AppLayout>
      <StudentAttendance />
    </AppLayout>
  );
}
  return (
    <AppLayout>
      <div className="space-y-6">

        <AttendanceStats
          totalStudents={totalStudents}
          present={present}
          absent={absent}
          late={late}
        />

        <Card>

          <CardHeader>

            <AttendanceFilters
              departments={departments}
              courses={courses}
              form={form}
              setForm={setForm}
              onLoadStudents={
                handleLoadStudents
              }
            />

          </CardHeader>

          <CardContent className="space-y-6">

            <AttendanceTable
              students={
                attendanceStudents
              }
              onStatusChange={
                handleStatusChange
              }
            />

            <div className="flex justify-end">

              <Button
                onClick={
                  handleSaveAttendance
                }
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Attendance"}
              </Button>

            </div>

          </CardContent>

        </Card>

      </div>
    </AppLayout>
  );
};

export default AttendancePage;