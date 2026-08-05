import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

import type { FacultyDialogProps } from "../types";

export default function FacultyDialog({
  open,
  setOpen,
  form,
  setForm,
  departments,
  onSubmit,
  loading,
  title,
  submitText,
}: FacultyDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Faculty
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          {/* Faculty ID */}
          <div>
            <Label>Faculty ID</Label>

            <Input
              value={form.faculty_id}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  faculty_id: e.target.value,
                }))
              }
            />
          </div>

          {/* Full Name */}
          <div>
            <Label>Full Name</Label>

            <Input
              value={form.full_name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  full_name: e.target.value,
                }))
              }
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>

            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>

          {/* Mobile */}
          <div>
            <Label>Mobile</Label>

            <Input
              value={form.mobile}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  mobile: e.target.value,
                }))
              }
            />
          </div>

          {/* Department */}
          <div>
            <Label>Department</Label>

            <Select
              value={form.department_id}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  department_id: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>

              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem
                    key={dept.id}
                    value={dept.id}
                  >
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Designation */}
          <div>
            <Label>Designation</Label>

            <Select
              value={form.designation}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  designation: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Professor">
                  Professor
                </SelectItem>

                <SelectItem value="Associate Professor">
                  Associate Professor
                </SelectItem>

                <SelectItem value="Assistant Professor">
                  Assistant Professor
                </SelectItem>

                <SelectItem value="Lecturer">
                  Lecturer
                </SelectItem>

                <SelectItem value="HOD">
                  Head of Department
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Please wait..." : submitText}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}