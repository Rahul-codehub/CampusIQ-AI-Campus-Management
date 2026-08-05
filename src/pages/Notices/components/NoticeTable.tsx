import {
  Eye,
  Pencil,
  Trash2,
  Pin,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Notice } from "../types";
import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";

interface NoticeTableProps {
  notices: Notice[];

  onView: (notice: Notice) => void;

  onEdit: (notice: Notice) => void;

  onDelete: (notice: Notice) => void;
}

export function NoticeTable({
  notices,
  onView,
  onEdit,
  onDelete,
}: NoticeTableProps) {
 return (
  <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead className="w-16 text-center font-semibold">
            Pin
          </TableHead>

          <TableHead className="font-semibold">
            Notice
          </TableHead>

          <TableHead className="font-semibold">
            Department
          </TableHead>

          <TableHead className="font-semibold">
            Priority
          </TableHead>

          <TableHead className="font-semibold">
            Status
          </TableHead>

          <TableHead className="font-semibold">
            Publish Date
          </TableHead>

          <TableHead className="w-36 text-center font-semibold">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {notices.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="h-40 text-center"
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-lg font-medium">
                  No Notices Found
                </p>

                <p className="text-sm text-muted-foreground">
                  Create your first notice to get started.
                </p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          notices.map((notice) => (
            <TableRow
              key={notice.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell className="text-center">
                {notice.is_pinned ? (
                  <Pin className="mx-auto h-5 w-5 fill-orange-500 text-orange-500" />
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                <div className="space-y-1">

                  <div className="font-semibold">
                    {notice.title}
                  </div>

                  <p className="max-w-md truncate text-sm text-muted-foreground">
                    {notice.description}
                  </p>

                </div>
              </TableCell>

              <TableCell>
                {notice.department_id || "All"}
              </TableCell>

              <TableCell>
                <PriorityBadge
                  priority={notice.priority}
                />
              </TableCell>

              <TableCell>
                <StatusBadge
                  status={notice.status}
                />
              </TableCell>

              <TableCell>
                {new Date(
                  notice.publish_date
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>

                <div className="flex items-center justify-center gap-1">

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(notice)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(notice)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(notice)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

                </div>

              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);
}