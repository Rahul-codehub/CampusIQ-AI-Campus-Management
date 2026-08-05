import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Complaint } from "../types";

interface DeleteComplaintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  complaint: Complaint | null;

  onDelete: () => Promise<void>;
}

export default function DeleteComplaintDialog({
  open,
  onOpenChange,
  complaint,
  onDelete,
}: DeleteComplaintDialogProps) {
  const handleDelete = async () => {
    if (!complaint) return;

    await onDelete();

    onOpenChange(false);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Complaint
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this complaint?

            <div className="mt-3 rounded-md border bg-muted p-3">

              <p className="font-medium">
                {complaint?.title}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                This action cannot be undone.
              </p>

            </div>

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete Complaint
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}