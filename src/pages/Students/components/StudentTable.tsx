import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Tables } from "@/integrations/mongodb/types";

import { Button } from "@/components/ui/button";

import {
  SquarePen,
  Trash2,
} from "lucide-react";

import type { StudentTableProps } from "../types";


export default function StudentTable({
  students,
  getDepartmentName,
  onEdit,
  onDelete,
}: StudentTableProps) {
  return (
    <Table>

      <TableHeader>
        <TableRow>

          <TableHead>Student ID</TableHead>

          <TableHead>Name</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Mobile</TableHead>

          <TableHead>Department</TableHead>

          <TableHead>Semester</TableHead>

          <TableHead>Status</TableHead>

          <TableHead className="text-center">
            Action
          </TableHead>

        </TableRow>
      </TableHeader>

      <TableBody>

        {students.map((student) => (
          <TableRow key={student.id}>

            <TableCell className="font-mono text-sm">
              {student.student_id}
            </TableCell>

            <TableCell className="font-medium">
              {student.full_name}
            </TableCell>

            <TableCell>
              {student.email}
            </TableCell>

            <TableCell>
              {student.mobile}
            </TableCell>

            <TableCell>
              {getDepartmentName(student.department_id)}
            </TableCell>

            <TableCell>
              {student.semester}
            </TableCell>

            <TableCell>
              <Badge
                variant={
                  student.status === "active"
                    ? "default"
                    : "secondary"
                }
              >
                {student.status}
              </Badge>
            </TableCell>

            <div className="flex items-center justify-center gap-2">

    <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(student)}
    >
        <SquarePen className="h-4 w-4" />
    </Button>

    <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(student)}
    >
        <Trash2 className="h-4 w-4 text-red-600" />
    </Button>

</div>

          </TableRow>
        ))}

        {students.length === 0 && (
          <TableRow>

            <TableCell
              colSpan={8}
              className="py-8 text-center text-muted-foreground"
            >
              No students found.
            </TableCell>

          </TableRow>
        )}

      </TableBody>

    </Table>
  );
}