import { useEffect, useState } from "react";
import { toast } from "sonner";

import AppLayout from "@/components/layout/AppLayout";

import StudentDialog from "./components/StudentDialog";
import StudentFilters from "./components/StudentFilters";
import StudentStats from "./components/StudentStats";
import StudentTable from "./components/StudentTable";

import { studentService } from "./services/studentService";
import { INITIAL_STUDENT_FORM } from "./constants";

import type { StudentForm } from "./types";
import type { Tables } from "@/integrations/mongodb/types";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

const Students = () => {
    /* =========================================
       STATES
    ========================================= */

    const [students, setStudents] = useState<Tables<"students">[]>([]);

    const [departments, setDepartments] = useState<Tables<"departments">[]>([]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [form, setForm] =
        useState<StudentForm>(INITIAL_STUDENT_FORM);

    const [editingStudent, setEditingStudent] =
        useState<Tables<"students"> | null>(null);

    const [loading, setLoading] = useState(false);

    /* =========================================
       FETCH DATA
    ========================================= */

    const fetchData = async () => {
        try {
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
        /* =========================================
           VALIDATION
        ========================================= */

        if (!form.student_id.trim()) {
            toast.error("Student ID is required.");
            return;
        }

        if (!form.full_name.trim()) {
            toast.error("Full name is required.");
            return;
        }

        if (!form.email.trim()) {
            toast.error("Email is required.");
            return;
        }

        if (!form.mobile.trim()) {
            toast.error("Mobile number is required.");
            return;
        }

        if (!form.department_id) {
            toast.error("Please select a department.");
            return;
        }

        if (!form.semester) {
            toast.error("Please select a semester.");
            return;
        }

        //validation done

        try {


            setLoading(true);


            const payload = {
                student_id: form.student_id,
                full_name: form.full_name,
                email: form.email,
                mobile: form.mobile,
                department_id: form.department_id || null,
                semester: Number(form.semester),
                status: "active",
            };

            if (editingStudent) {

                await studentService.updateStudent(

                    editingStudent.id,
                    payload
                );

                toast.success(
                    "Student updated successfully."
                );
            } else {
                await studentService.createStudent(
                    payload
                );

                toast.success(
                    "Student added successfully."
                );
            }

            setOpen(false);
            setEditingStudent(null);
            setForm(INITIAL_STUDENT_FORM);

            fetchData();
        } catch (error: any) {
            console.error(error);

            toast.error(
                error.message ??
                "Unable to add student."
            );
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (
        student: Tables<"students">
    ) => {
        setEditingStudent(student);

        setForm({
            student_id: student.student_id ?? "",
            full_name: student.full_name ?? "",
            email: student.email ?? "",
            mobile: student.mobile ?? "",
            department_id: student.department_id ?? "",
            semester: String(student.semester ?? "1"),
        });

        setOpen(true);
    };
    const handleDelete = async (
        student: Tables<"students">
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${student.full_name}"?`
        );

        if (!confirmed) return;

        try {
            await studentService.deleteStudent(student.id);

            toast.success(
                "Student deleted successfully."
            );

            fetchData();
        } catch (error: any) {
            console.error(error);

            toast.error(
                error.message ||
                "Unable to delete student."
            );
        }
    };
    /* =========================================
       FILTER STUDENTS
    ========================================= */

    const filteredStudents = students.filter((student) => {
        const keyword = search.toLowerCase();

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

    /* =========================================
       STATISTICS
    ========================================= */

    const totalStudents =
        students.length;

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

    const totalDepartments =
        new Set(
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

    const getDepartmentName = (
        id: string | null
    ) =>
        departments.find(
            (department) =>
                department.id === id
        )?.name || "—";

    /* =========================================
       UI
    ========================================= */

    return (
        <AppLayout>
            <div className="space-y-6">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Student Management
                        </h1>

                        <p className="text-muted-foreground">
                            Manage all enrolled students
                        </p>

                    </div>

                    <StudentDialog
                        open={open}
                        setOpen={setOpen}
                        form={form}
                        setForm={setForm}
                        departments={departments}
                        onSubmit={handleAdd}
                        loading={loading}
                        title={
                            editingStudent
                                ? "Edit Student"
                                : "Add Student"
                        }

                        submitText={
                            editingStudent
                                ? "Update Student"
                                : "Save Student"
                        }
                    />

                </div>

                {/* Statistics */}

                <StudentStats
                    totalStudents={totalStudents}
                    activeStudents={activeStudents}
                    inactiveStudents={inactiveStudents}
                    totalDepartments={totalDepartments}
                />

                {/* Table */}

                <Card>

                    <CardHeader>

                        <StudentFilters
                            search={search}
                            onSearchChange={setSearch}
                            total={filteredStudents.length}
                        />

                    </CardHeader>

                    <CardContent>

                        <StudentTable
                            students={filteredStudents}
                            getDepartmentName={getDepartmentName}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    </CardContent>

                </Card>

            </div>
        </AppLayout>
    );
};

export default Students;