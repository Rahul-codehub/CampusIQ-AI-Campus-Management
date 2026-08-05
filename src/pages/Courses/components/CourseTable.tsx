import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  SquarePen,
  Trash2,
} from "lucide-react";

import type {
  CourseTableProps,
} from "../types";

export default function CourseTable({
  courses,
  getDepartmentName,
  getFacultyName,
  onEdit,
  onDelete,
}: CourseTableProps) {
  return (
    <Table>

      <TableHeader>
        <TableRow>

          <TableHead>
            Course Code
          </TableHead>

          <TableHead>
            Course Name
          </TableHead>

          <TableHead>
            Department
          </TableHead>

          <TableHead>
            Faculty
          </TableHead>

          <TableHead>
            Semester
          </TableHead>

          <TableHead>
            Credits
          </TableHead>

          <TableHead>
            Status
          </TableHead>

          <TableHead className="text-center">
            Actions
          </TableHead>

        </TableRow>
      </TableHeader>

      <TableBody>

        {courses.map((course) => (
          <TableRow key={course.id}>

            <TableCell className="font-mono text-sm">
              {course.course_code}
            </TableCell>

            <TableCell className="font-medium">
              {course.name}
            </TableCell>

            <TableCell>
              {getDepartmentName(
                course.department_id
              )}
            </TableCell>

            <TableCell>
              {getFacultyName(
                course.faculty_id
              )}
            </TableCell>

            <TableCell>
              {course.semester}
            </TableCell>

            <TableCell>
              {course.credits}
            </TableCell>

            <TableCell>
              <Badge
                variant={
                  course.status === "active"
                    ? "default"
                    : "secondary"
                }
              >
                {course.status}
              </Badge>
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-center gap-2">

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onEdit(course)
                  }
                >
                  <SquarePen className="h-4 w-4 text-blue-600" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onDelete(course)
                  }
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>

              </div>
            </TableCell>

          </TableRow>
        ))}

        {courses.length === 0 && (
          <TableRow>

            <TableCell
              colSpan={8}
              className="py-8 text-center text-muted-foreground"
            >
              No courses found
            </TableCell>

          </TableRow>
        )}

      </TableBody>

    </Table>
  );
}