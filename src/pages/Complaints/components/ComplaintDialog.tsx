import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  Complaint,
  ComplaintFormData,
} from "../types";

interface ComplaintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  complaint?: Complaint;

  onSubmit: (
    data: ComplaintFormData
  ) => Promise<void>;
}

const defaultForm: ComplaintFormData = {
  title: "",
  description: "",
  category: "general",
  priority: "medium",
};

export default function ComplaintDialog({
  open,
  onOpenChange,
  complaint,
  onSubmit,
}: ComplaintDialogProps) {

  const [form, setForm] =
    useState<ComplaintFormData>(
      defaultForm
    );

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (complaint) {
      setForm({
        title: complaint.title,
        description:
          complaint.description,
        category: complaint.category,
        priority: complaint.priority,
      });
    } else {
      setForm(defaultForm);
    }
  }, [complaint, open]);

  const handleSubmit = async () => {

    if (!form.title.trim()) return;

    if (!form.description.trim())
      return;

    setSubmitting(true);

    try {
      await onSubmit(form);

      onOpenChange(false);

      setForm(defaultForm);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="sm:max-w-2xl">

        <DialogHeader>

          <DialogTitle>

            {complaint
              ? "Edit Complaint"
              : "Create Complaint"}

          </DialogTitle>

          <DialogDescription>

            {complaint
              ? "Update complaint information."
              : "Create a new complaint."}

          </DialogDescription>

        </DialogHeader>

        <div className="grid gap-5 py-4">

          <div className="space-y-2">

            <Label>
              Complaint Title
            </Label>

            <Input
              value={form.title}
              placeholder="Enter complaint title"
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Description
            </Label>

            <Textarea
              rows={5}
              value={
                form.description
              }
              placeholder="Describe the complaint..."
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">

              <Label>
                Category
              </Label>

              <Select
                value={
                  form.category
                }
                onValueChange={(
                  value
                ) =>
                  setForm({
                    ...form,
                    category:
                      value as ComplaintFormData["category"],
                  })
                }
              >

                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="academic">
                    Academic
                  </SelectItem>

                  <SelectItem value="faculty">
                    Faculty
                  </SelectItem>

                  <SelectItem value="hostel">
                    Hostel
                  </SelectItem>

                  <SelectItem value="infrastructure">
                    Infrastructure
                  </SelectItem>

                  <SelectItem value="general">
                    General
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

            <div className="space-y-2">

              <Label>
                Priority
              </Label>

              <Select
                value={
                  form.priority
                }
                onValueChange={(
                  value
                ) =>
                  setForm({
                    ...form,
                    priority:
                      value as ComplaintFormData["priority"],
                  })
                }
              >

                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="low">
                    Low
                  </SelectItem>

                  <SelectItem value="medium">
                    Medium
                  </SelectItem>

                  <SelectItem value="high">
                    High
                  </SelectItem>

                  <SelectItem value="urgent">
                    Urgent
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={submitting}
            onClick={
              handleSubmit
            }
          >
            {submitting
              ? "Saving..."
              : complaint
              ? "Update Complaint"
              : "Create Complaint"}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}