import {
  Calendar,
  Pin,
  User,
  Building2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Notice } from "../types";
import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";

interface NoticeDetailsProps {
  open: boolean;

  notice?: Notice | null;

  onOpenChange: (open: boolean) => void;
}

export function NoticeDetails({
  open,
  notice,
  onOpenChange,
}: NoticeDetailsProps) {
  if (!notice) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">

        <DialogHeader>
          <DialogTitle>
            Notice Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          <div className="flex items-center gap-3">

            <h2 className="text-2xl font-bold">
              {notice.title}
            </h2>

            {notice.is_pinned && (
              <Badge
                variant="secondary"
                className="gap-1"
              >
                <Pin className="h-3 w-3" />
                Pinned
              </Badge>
            )}

          </div>

          <div className="flex flex-wrap gap-2">

            <PriorityBadge
              priority={notice.priority}
            />

            <StatusBadge
              status={notice.status}
            />

          </div>

          <div className="rounded-lg border p-4 whitespace-pre-wrap">
            {notice.description}
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />

              <span>
                {notice.department_id || "All Departments"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />

              <span>
                {notice.created_by_name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />

              <span>
                Publish:
                {" "}
                {new Date(
                  notice.publish_date
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />

              <span>
                Expiry:
                {" "}
                {notice.expiry_date
                  ? new Date(
                      notice.expiry_date
                    ).toLocaleDateString()
                  : "No Expiry"}
              </span>
            </div>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}