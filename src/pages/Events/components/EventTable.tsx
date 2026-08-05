import {
  Eye,
  Pencil,
  Trash2,
  Star,
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

import { Event } from "../types";
import StatusBadge from "./StatusBadge";

interface EventTableProps {
  events: Event[];

  onView: (event: Event) => void;

  onEdit: (event: Event) => void;

  onDelete: (event: Event) => void;
}

export default function EventTable({
  events,
  onView,
  onEdit,
  onDelete,
}: EventTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">

      <Table>

        <TableHeader>

          <TableRow className="bg-muted/40 hover:bg-muted/40">

            <TableHead className="w-14 text-center">
              ★
            </TableHead>

            <TableHead>
              Event
            </TableHead>

            <TableHead>
              Department
            </TableHead>

            <TableHead>
              Venue
            </TableHead>

            <TableHead>
              Date
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead className="text-center w-36">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {events.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={7}
                className="h-40 text-center"
              >

                <div className="flex flex-col items-center gap-2">

                  <p className="text-lg font-semibold">
                    No Events Found
                  </p>

                  <p className="text-muted-foreground text-sm">
                    Create your first event to get started.
                  </p>

                </div>

              </TableCell>

            </TableRow>

          ) : (

            events.map((event) => (

              <TableRow
                key={event.id}
                className="hover:bg-muted/30 transition-colors"
              >

                <TableCell className="text-center">

                  {event.is_featured ? (

                    <Star className="h-5 w-5 mx-auto fill-yellow-400 text-yellow-400" />

                  ) : (

                    "-"

                  )}

                </TableCell>

                <TableCell>

                  <div className="space-y-1">

                    <div className="font-semibold">
                      {event.title}
                    </div>

                    <div className="text-sm text-muted-foreground truncate max-w-sm">
                      {event.description}
                    </div>

                  </div>

                </TableCell>

                <TableCell>
                  {event.department_id || "All"}
                </TableCell>

                <TableCell>
                  {event.venue}
                </TableCell>

                <TableCell>

                  {event.event_date
                    ? new Date(
                        event.event_date
                      ).toLocaleDateString()
                    : "-"}

                </TableCell>

                <TableCell>

                  <StatusBadge
                    status={event.status}
                  />

                </TableCell>

                <TableCell>

                  <div className="flex items-center justify-center gap-1">

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onView(event)
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onEdit(event)
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onDelete(event)
                      }
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