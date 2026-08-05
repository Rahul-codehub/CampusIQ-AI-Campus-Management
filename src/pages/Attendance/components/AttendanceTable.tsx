import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import type {
    AttendanceTableProps,
} from "../types";

export default function AttendanceTable({
    students,
    onStatusChange,
}: AttendanceTableProps) {
    const getBadgeVariant = (
        status: string
    ) => {
        switch (status) {
            case "present":
                return "default";

            case "absent":
                return "destructive";

            case "late":
                return "secondary";

            case "excused":
                return "outline";

            default:
                return "secondary";
        }
    };

    return (
        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>
                        Student ID
                    </TableHead>

                    <TableHead>
                        Student Name
                    </TableHead>

                    <TableHead>
                        Attendance
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {students.map((student) => (

                    <TableRow key={student.student_id}>

                        <TableCell className="font-mono">
                            {student.student_code}
                        </TableCell>

                        <TableCell className="font-medium">
                            {student.full_name}
                        </TableCell>

                        <TableCell>
                            <div className="flex gap-2 flex-wrap">

                                <Button
                                    type="button"
                                    size="sm"
                                    variant={student.status === "present" ? "default" : "outline"}
                                    className={
                                        student.status === "present"
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : ""
                                    }
                                    onClick={() =>
                                        onStatusChange(student.student_id, "present")
                                    }
                                >
                                    Present
                                </Button>

                                <Button
                                    type="button"
                                    size="sm"
                                    variant={student.status === "absent" ? "default" : "outline"}
                                    className={
                                        student.status === "absent"
                                            ? "bg-red-600 hover:bg-red-700 text-white"
                                            : ""
                                    }
                                    onClick={() =>
                                        onStatusChange(student.student_id, "absent")
                                    }
                                >
                                    Absent
                                </Button>

                                <Button
                                    type="button"
                                    size="sm"
                                    variant={student.status === "late" ? "default" : "outline"}
                                    className={
                                        student.status === "late"
                                            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                                            : ""
                                    }
                                    onClick={() =>
                                        onStatusChange(student.student_id, "late")
                                    }
                                >
                                    Late
                                </Button>

                                <Button
                                    type="button"
                                    size="sm"
                                    variant={student.status === "excused" ? "default" : "outline"}
                                    className={
                                        student.status === "excused"
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : ""
                                    }
                                    onClick={() =>
                                        onStatusChange(student.student_id, "excused")
                                    }
                                >
                                    Excused
                                </Button>

                            </div>
                        </TableCell>
                    </TableRow>

                ))}

                {students.length === 0 && (

                    <TableRow>

                        <TableCell
                            colSpan={3}
                            className="py-10 text-center text-muted-foreground"
                        >
                            No students loaded.
                            <br />
                            Select Department,
                            Semester, Course and
                            Date, then click
                            <strong>
                                {" "}
                                Load Students
                            </strong>
                            .
                        </TableCell>

                    </TableRow>

                )}

            </TableBody>

        </Table>
    );
}