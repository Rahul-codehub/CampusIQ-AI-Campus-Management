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

import type { FacultyTableProps } from "../types";

export default function FacultyTable({
  faculty,
  getDepartmentName,
  onEdit,
  onDelete,
}: FacultyTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Faculty ID
          </TableHead>

          <TableHead>
            Name
          </TableHead>

          <TableHead>
            Email
          </TableHead>

          <TableHead>
            Mobile
          </TableHead>

          <TableHead>
            Department
          </TableHead>

          <TableHead>
            Designation
          </TableHead>

          <TableHead>Status</TableHead>

<TableHead className="text-center">
  Actions
</TableHead>

         
        </TableRow>
      </TableHeader>

      <TableBody>
        {faculty.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-mono text-sm">
              {member.faculty_id}
            </TableCell>

            <TableCell className="font-medium">
              {member.full_name}
            </TableCell>

            <TableCell>
              {member.email}
            </TableCell>

            <TableCell>
              {member.mobile}
            </TableCell>

            <TableCell>
              {getDepartmentName(
                member.department_id
              )}
            </TableCell>

            <TableCell>
              {member.designation}
            </TableCell>

            <TableCell>
              <Badge
                variant={
                  member.status === "active"
                    ? "default"
                    : "secondary"
                }
              >
                {member.status}
              </Badge>
            </TableCell>

            <TableCell>
  <div className="flex items-center justify-center gap-2">

    <Button
      variant="ghost"
      size="icon"
      onClick={() => onEdit(member)}
    >
      <SquarePen className="h-4 w-4 text-blue-600" />
    </Button>

    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDelete(member)}
    >
      <Trash2 className="h-4 w-4 text-red-600" />
    </Button>

  </div>
</TableCell>

            
          </TableRow>
        ))}

        {faculty.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={8}
              className="py-8 text-center text-muted-foreground"
            >
              No faculty found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}