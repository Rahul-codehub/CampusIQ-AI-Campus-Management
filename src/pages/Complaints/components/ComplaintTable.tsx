
import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
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

import type { Complaint } from "../types";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface ComplaintTableProps {
  complaints: Complaint[];
  loading: boolean;

  canEdit: (
    complaint: Complaint
  ) => boolean;

  canDelete: (
    complaint: Complaint
  ) => boolean;

  canResolve: (
    complaint: Complaint
  ) => boolean;

  onView: (
    complaint: Complaint
  ) => void;

  onEdit: (
    complaint: Complaint
  ) => void;

  onDelete: (
    complaint: Complaint
  ) => void;

  onResolve: (
    complaint: Complaint
  ) => void;
}

export default function ComplaintTable({
  complaints,
  loading,
  canEdit,
  canDelete,
  canResolve,
  onView,
  onEdit,
  onDelete,
  onResolve,
}: ComplaintTableProps) {

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Loading complaints...
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        No complaints found.
      </div>
    );
  }

  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>
            Title
          </TableHead>

          <TableHead>
            Created By
          </TableHead>

          <TableHead>
            Category
          </TableHead>

          <TableHead>
            Priority
          </TableHead>

          <TableHead>
            Status
          </TableHead>

          <TableHead>
            Created
          </TableHead>

          <TableHead className="text-right">
            Actions
          </TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {complaints.map((complaint) => {

          const showEdit =
            canEdit(complaint);

          const showDelete =
            canDelete(complaint);

          const showResolve =
            canResolve(complaint) &&
            complaint.status !== "resolved";

          return (
            <TableRow
              key={complaint.id}
            >

              <TableCell>

                <div>

                  <div className="font-medium">
                    {complaint.title}
                  </div>

                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {complaint.description}
                  </div>

                </div>

              </TableCell>

              <TableCell>
                <span className="capitalize">
                  {complaint.creator_role}
                </span>
              </TableCell>

              <TableCell className="capitalize">
                {complaint.category.replace(
                  "_",
                  " "
                )}
              </TableCell>

              <TableCell>
                <PriorityBadge
                  priority={
                    complaint.priority
                  }
                />
              </TableCell>

              <TableCell>
                <StatusBadge
                  status={
                    complaint.status
                  }
                />
              </TableCell>

              <TableCell>
                {new Date(
                  complaint.created_at
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>

                <div className="flex justify-end gap-1">

                  {/* VIEW */}

                  <Button
                    variant="ghost"
                    size="icon"
                    title="View complaint"
                    onClick={() =>
                      onView(
                        complaint
                      )
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* RESOLVE */}

                  {showResolve && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Resolve complaint"
                      onClick={() =>
                        onResolve(
                          complaint
                        )
                      }
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </Button>
                  )}

                  {/* EDIT */}

                  {showEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Edit complaint"
                      onClick={() =>
                        onEdit(
                          complaint
                        )
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}

                  {/* DELETE */}

                  {showDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete complaint"
                      onClick={() =>
                        onDelete(
                          complaint
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}

                </div>

              </TableCell>

            </TableRow>
          );
        })}

      </TableBody>

    </Table>
  );
}