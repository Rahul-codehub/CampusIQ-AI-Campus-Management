import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

import type { Complaint } from "../types";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface ComplaintDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  complaint: Complaint | null;
}

export default function ComplaintDetails({
  open,
  onOpenChange,
  complaint,
}: ComplaintDetailsProps) {
  if (!complaint) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">

        <DialogHeader>

          <DialogTitle>
            Complaint Details
          </DialogTitle>

          <DialogDescription>
            View complaint information.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-6">

          <div>

            <h3 className="text-lg font-semibold">
              {complaint.title}
            </h3>

            <p className="mt-2 whitespace-pre-wrap text-muted-foreground">
              {complaint.description}
            </p>

          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                Category
              </p>

              <p className="font-medium capitalize">
                {complaint.category.replace(
                  "_",
                  " "
                )}
              </p>

            </div>

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                Priority
              </p>

              <PriorityBadge
                priority={complaint.priority}
              />

            </div>

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <StatusBadge
                status={complaint.status}
              />

            </div>

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                User ID
              </p>

              <p className="font-medium font-mono text-sm">
                {complaint.user_id}
              </p>

            </div>

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                Created
              </p>

              <p className="font-medium">
                {new Date(
                  complaint.created_at
                ).toLocaleString()}
              </p>

            </div>

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                Last Updated
              </p>

              <p className="font-medium">
                {new Date(
                  complaint.updated_at
                ).toLocaleString()}
              </p>

            </div>

          </div>

          <Separator />

          <div className="space-y-2">

            <p className="text-sm text-muted-foreground">
              Response
            </p>

            <div className="rounded-md border bg-muted p-4 min-h-[80px]">

              {complaint.response ? (
                <p className="whitespace-pre-wrap">
                  {complaint.response}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  No response yet.
                </p>
              )}

            </div>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}