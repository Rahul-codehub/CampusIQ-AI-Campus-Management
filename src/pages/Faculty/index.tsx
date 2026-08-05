import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { toast } from "sonner";

import { facultyService } from "./services/facultyService";

import FacultyStats from "./components/FacultyStats";
import FacultyFilters from "./components/FacultyFilters";
import FacultyTable from "./components/FacultyTable";
import FacultyDialog from "./components/FacultyDialog";
import DeleteFacultyDialog from "./components/DeleteFacultyDialog";

import { INITIAL_FACULTY_FORM } from "./constants";

import type {
  Faculty,
  FacultyForm,
  Department,
} from "./types";

const FacultyPage = () => {
  /* ==========================
      STATES
  ========================== */

  const [faculty, setFaculty] = useState<Faculty[]>([]);

  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [editingFaculty, setEditingFaculty] =
    useState<Faculty | null>(null);

  const [deleteFaculty, setDeleteFaculty] =
    useState<Faculty | null>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [form, setForm] =
    useState<FacultyForm>(
      INITIAL_FACULTY_FORM
    );

  /* ==========================
      FETCH
  ========================== */

  const fetchData = async () => {
    try {
      const [facultyData, departmentData] =
        await Promise.all([
          facultyService.getFaculty(),
          facultyService.getDepartments(),
        ]);

      setFaculty(facultyData);

      setDepartments(departmentData);
    } catch (error: any) {
      toast.error(
        error.message ||
          "Unable to load faculty."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ==========================
      ADD / UPDATE
  ========================== */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.faculty_id ||
      !form.full_name ||
      !form.email
    ) {
      toast.error(
        "Please fill all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      if (editingFaculty) {
        await facultyService.updateFaculty(
          editingFaculty.id,
          {
            ...form,
            status:
              editingFaculty.status,
          }
        );

        toast.success(
          "Faculty updated successfully."
        );
      } else {
        await facultyService.createFaculty({
          ...form,
          status: "active",
        });

        toast.success(
          "Faculty added successfully."
        );
      }

      setOpen(false);

      setEditingFaculty(null);

      setForm(INITIAL_FACULTY_FORM);

      fetchData();
    } catch (error: any) {
      toast.error(
        error.message ||
          "Unable to save faculty."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================
      EDIT
  ========================== */

  const handleEdit = (
    member: Faculty
  ) => {
    setEditingFaculty(member);

    setForm({
      faculty_id: member.faculty_id,
      full_name: member.full_name,
      email: member.email,
      mobile: member.mobile ?? "",
      department_id:
        member.department_id ?? "",
      designation:
        member.designation,
    });

    setOpen(true);

  };

    /* ==========================
      DELETE
  ========================== */

  const handleDelete = (
    member: Faculty
  ) => {
    setDeleteFaculty(member);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteFaculty) return;

    try {
      setLoading(true);

      await facultyService.deleteFaculty(
        deleteFaculty.id
      );

      toast.success(
        "Faculty deleted successfully."
      );

      setDeleteOpen(false);

      setDeleteFaculty(null);

      fetchData();

    } catch (error: any) {

      toast.error(
        error.message ||
          "Unable to delete faculty."
      );

    } finally {

      setLoading(false);

    }
  };

  /* ==========================
      SEARCH
  ========================== */

  const filteredFaculty = faculty.filter(
    (member) =>
      member.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      member.faculty_id
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      member.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      member.mobile
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  /* ==========================
      STATISTICS
  ========================== */

  const totalFaculty = faculty.length;

  const activeFaculty = faculty.filter(
    (member) => member.status === "active"
  ).length;

  const inactiveFaculty = faculty.filter(
    (member) => member.status === "inactive"
  ).length;

  const totalDepartments = new Set(
    faculty
      .filter((member) => member.department_id)
      .map((member) => member.department_id)
  ).size;

  /* ==========================
      DEPARTMENT NAME
  ========================== */

  const getDepartmentName = (
    id: string | null
  ) =>
    departments.find(
      (dept) => dept.id === id
    )?.name || "—";

      /* ==========================
      RENDER
  ========================== */

  return (
    <AppLayout>
      <div className="space-y-6">

        <FacultyStats
          totalFaculty={totalFaculty}
          activeFaculty={activeFaculty}
          inactiveFaculty={inactiveFaculty}
          totalDepartments={totalDepartments}
        />

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Faculty Management
            </h1>

            <p className="text-muted-foreground">
              Manage all faculty members
            </p>
          </div>

          <FacultyDialog
            open={open}
            setOpen={(value) => {
              setOpen(value);

              if (!value) {
                setEditingFaculty(null);
                setForm(INITIAL_FACULTY_FORM);
              }
            }}
            form={form}
            setForm={setForm}
            departments={departments}
            onSubmit={handleSubmit}
            loading={loading}
            title={
              editingFaculty
                ? "Edit Faculty"
                : "Add Faculty"
            }
            submitText={
              editingFaculty
                ? "Update Faculty"
                : "Save Faculty"
            }
          />

        </div>

        <Card>

          <CardHeader>

            <FacultyFilters
              search={search}
              onSearchChange={setSearch}
              total={filteredFaculty.length}
            />

          </CardHeader>

          <CardContent>

            <FacultyTable
              faculty={filteredFaculty}
              getDepartmentName={
                getDepartmentName
              }
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </CardContent>

        </Card>

        <DeleteFacultyDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          facultyName={
            deleteFaculty?.full_name
          }
          onConfirm={confirmDelete}
        />

      </div>
    </AppLayout>
  );
};

export default FacultyPage;