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

import { Switch } from "@/components/ui/switch";

import {
  Notice,
  NoticeFormData,
} from "../types";

interface NoticeDialogProps {
  open: boolean;

  notice?: Notice | null;

  onOpenChange: (open: boolean) => void;

  onSubmit: (data: NoticeFormData) => void;

  isLoading?: boolean;
}

const defaultForm: NoticeFormData = {
  title: "",
  description: "",
  department_id: "",
  priority: "Medium",
  status: "Draft",
  is_pinned: false,
  publish_date: "",
  expiry_date: "",
};

export function NoticeDialog({
  open,
  notice,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: NoticeDialogProps) {
  const [form, setForm] =
    useState<NoticeFormData>(defaultForm);

  useEffect(() => {
    if (notice) {
      setForm({
        title: notice.title,
        description: notice.description,
        department_id:
          notice.department_id || "",
        priority: notice.priority,
        status: notice.status,
        is_pinned: notice.is_pinned,
        publish_date: notice.publish_date,
        expiry_date:
          notice.expiry_date || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [notice, open]);

  const update = (
    key: keyof NoticeFormData,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.title.trim() ||
      !form.description.trim()
    ) {
      return;
    }

    onSubmit(form);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">

        <DialogHeader>
          <DialogTitle>
            {notice
              ? "Edit Notice"
              : "Create Notice"}
          </DialogTitle>

          <DialogDescription>
            Fill the notice details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">

          <div>
            <Label>
              Title
            </Label>

            <Input
              value={form.title}
              onChange={(e) =>
                update(
                  "title",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              Description
            </Label>

            <Textarea
              rows={5}
              value={form.description}
              onChange={(e) =>
                update(
                  "description",
                  e.target.value
                )
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label>
                Department
              </Label>

              <Input
                placeholder="Department ID"
                value={form.department_id}
                onChange={(e) =>
                  update(
                    "department_id",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label>
                Priority
              </Label>

              <Select
                value={form.priority}
                onValueChange={(v) =>
                  update(
                    "priority",
                    v
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Low">
                    Low
                  </SelectItem>

                  <SelectItem value="Medium">
                    Medium
                  </SelectItem>

                  <SelectItem value="High">
                    High
                  </SelectItem>

                  <SelectItem value="Urgent">
                    Urgent
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label>
                Status
              </Label>

              <Select
                value={form.status}
                onValueChange={(v) =>
                  update(
                    "status",
                    v
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="Draft">
                    Draft
                  </SelectItem>

                  <SelectItem value="Published">
                    Published
                  </SelectItem>

                  <SelectItem value="Archived">
                    Archived
                  </SelectItem>

                </SelectContent>

              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 mt-6">

              <Label>
                Pin Notice
              </Label>

              <Switch
                checked={form.is_pinned}
                onCheckedChange={(v) =>
                  update(
                    "is_pinned",
                    v
                  )
                }
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <Label>
                Publish Date
              </Label>

              <Input
                type="date"
                value={form.publish_date}
                onChange={(e) =>
                  update(
                    "publish_date",
                    e.target.value
                  )
                }
              />

            </div>

            <div>

              <Label>
                Expiry Date
              </Label>

              <Input
                type="date"
                value={form.expiry_date}
                onChange={(e) =>
                  update(
                    "expiry_date",
                    e.target.value
                  )
                }
              />

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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {notice
              ? "Update Notice"
              : "Create Notice"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}