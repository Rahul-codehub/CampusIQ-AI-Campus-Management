import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { toast } from "sonner";

import { courseService } from "./services/courseService";

import CourseStats from "./components/CourseStats";
import CourseFilters from "./components/CourseFilters";
import CourseTable from "./components/CourseTable";
import CourseDialog from "./components/CourseDialog";
import DeleteCourseDialog from "./components/DeleteCourseDialog";

import {
  INITIAL_COURSE_FORM,
} from "./constants";

import type {
  Course,
  CourseForm,
  Department,
  Faculty,
} from "./types";

const Courses = () => {

  /* =========================================
      STATES
  ========================================= */

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [faculty, setFaculty] =
    useState<Faculty[]>([]);

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [editingCourse, setEditingCourse] =
    useState<Course | null>(null);

  const [deleteCourse, setDeleteCourse] =
    useState<Course | null>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [form, setForm] =
    useState<CourseForm>(
      INITIAL_COURSE_FORM
    );

  /* =========================================
      FETCH DATA
  ========================================= */

  const fetchData = async () => {
    try {

      const [
        courseData,
        departmentData,
        facultyData,
      ] = await Promise.all([
        courseService.getCourses(),
        courseService.getDepartments(),
        courseService.getFaculty(),
      ]);

      setCourses(courseData);

      setDepartments(departmentData);

      setFaculty(facultyData);

    } catch (error: any) {

      toast.error(
        error.message ||
          "Unable to load courses."
      );

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================================
      ADD / UPDATE
  ========================================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.course_code ||
      !form.name
    ) {
      toast.error(
        "Please fill all required fields."
      );
      return;
    }

    try {

      setLoading(true);

      const payload = {
        course_code:
          form.course_code,

        name:
          form.name,

        department_id:
          form.department_id ||
          null,

        faculty_id:
          form.faculty_id ||
          null,

        semester:
          Number(form.semester),

        credits:
          Number(form.credits),

        max_students:
          Number(form.max_students),
      };

      if (editingCourse) {

        await courseService.updateCourse(
          editingCourse.id,
          {
            ...payload,
            status:
              editingCourse.status,
          }
        );

        toast.success(
          "Course updated successfully."
        );

      } else {

        await courseService.createCourse({
          ...payload,
          status: "active",
        });

        toast.success(
          "Course added successfully."
        );

      }

      setOpen(false);

      setEditingCourse(null);

      setForm(
        INITIAL_COURSE_FORM
      );

      fetchData();

    } catch (error: any) {

      toast.error(
        error.message ||
          "Unable to save course."
      );

    } finally {

      setLoading(false);

    }
  };

    /* =========================================
      EDIT
  ========================================= */

  const handleEdit = (
    course: Course
  ) => {

    setEditingCourse(course);

    setForm({
      course_code:
        course.course_code,

      name:
        course.name,

      department_id:
        course.department_id || "",

      faculty_id:
        course.faculty_id || "",

      semester:
        String(course.semester),

      credits:
        String(course.credits),

      max_students:
        String(course.max_students),
    });

    setOpen(true);
  };

  /* =========================================
      DELETE
  ========================================= */

  const handleDelete = (
    course: Course
  ) => {
    setDeleteCourse(course);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {

    if (!deleteCourse) return;

    try {

      setLoading(true);

      await courseService.deleteCourse(
        deleteCourse.id
      );

      toast.success(
        "Course deleted successfully."
      );

      setDeleteOpen(false);

      setDeleteCourse(null);

      fetchData();

    } catch (error: any) {

      toast.error(
        error.message ||
          "Unable to delete course."
      );

    } finally {

      setLoading(false);

    }
  };

  /* =========================================
      SEARCH
  ========================================= */

  const filteredCourses =
    courses.filter(
      (course) =>
        course.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        course.course_code
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  /* =========================================
      STATISTICS
  ========================================= */

  const totalCourses =
    courses.length;

  const activeCourses =
    courses.filter(
      (course) =>
        course.status === "active"
    ).length;

  const inactiveCourses =
    courses.filter(
      (course) =>
        course.status === "inactive"
    ).length;

  const totalDepartments =
    new Set(
      courses
        .filter(
          (course) =>
            course.department_id
        )
        .map(
          (course) =>
            course.department_id
        )
    ).size;

  /* =========================================
      HELPERS
  ========================================= */

  const getDepartmentName = (
    id: string | null
  ) =>
    departments.find(
      (dept) => dept.id === id
    )?.name || "—";

  const getFacultyName = (
    id: string | null
  ) =>
    faculty.find(
      (member) => member.id === id
    )?.full_name || "—";

      /* =========================================
      RENDER
  ========================================= */

  return (
    <AppLayout>
      <div className="space-y-6">

        <CourseStats
          totalCourses={totalCourses}
          activeCourses={activeCourses}
          inactiveCourses={inactiveCourses}
          totalDepartments={totalDepartments}
        />

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Course Management
            </h1>

            <p className="text-muted-foreground">
              Manage all courses
            </p>
          </div>

          <CourseDialog
            open={open}
            setOpen={(value) => {
              setOpen(value);

              if (!value) {
                setEditingCourse(null);
                setForm(INITIAL_COURSE_FORM);
              }
            }}
            form={form}
            setForm={setForm}
            departments={departments}
            faculty={faculty}
            onSubmit={handleSubmit}
            loading={loading}
            title={
              editingCourse
                ? "Edit Course"
                : "Add Course"
            }
            submitText={
              editingCourse
                ? "Update Course"
                : "Save Course"
            }
          />

        </div>

        <Card>

          <CardHeader>

            <CourseFilters
              search={search}
              onSearchChange={setSearch}
              total={filteredCourses.length}
            />

          </CardHeader>

          <CardContent>

            <CourseTable
              courses={filteredCourses}
              getDepartmentName={
                getDepartmentName
              }
              getFacultyName={
                getFacultyName
              }
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </CardContent>

        </Card>

        <DeleteCourseDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          courseName={
            deleteCourse?.name
          }
          onConfirm={confirmDelete}
        />

      </div>
    </AppLayout>
  );
};

export default Courses;