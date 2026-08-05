import {
  AlertTriangle,
} from "lucide-react";

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

import { Event } from "../types";

interface DeleteEventDialogProps {
  open: boolean;

  event: Event | null;

  onOpenChange: (
    open: boolean
  ) => void;

  onConfirm: () => Promise<void>;

  isLoading: boolean;
}

export default function DeleteEventDialog({
  open,
  event,
  onOpenChange,
  onConfirm,
  isLoading,
}: DeleteEventDialogProps) {

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle className="flex items-center gap-2">

            <AlertTriangle className="h-5 w-5 text-red-500" />

            Delete Event

          </AlertDialogTitle>

          <AlertDialogDescription>

            Are you sure you want to delete

            <span className="font-semibold">
              {" "}
              {event?.title}
            </span>

            ?

            <br />

            This action cannot be undone.

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading
              ? "Deleting..."
              : "Delete Event"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}