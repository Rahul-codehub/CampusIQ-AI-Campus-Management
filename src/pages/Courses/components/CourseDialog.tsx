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

import type { CourseDialogProps } from "../types";

export default function CourseDialog({
  open,
  setOpen,
  form,
  setForm,
  departments,
  faculty,
  onSubmit,
  loading,
  title,
  submitText,
}: CourseDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          {/* Course Code */}

          <div>
            <Label>
              Course Code
            </Label>

            <Input
              value={form.course_code}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  course_code:
                    e.target.value,
                }))
              }
            />
          </div>

          {/* Course Name */}

          <div>
            <Label>
              Course Name
            </Label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name:
                    e.target.value,
                }))
              }
            />
          </div>

          {/* Department */}

          <div>
            <Label>
              Department
            </Label>

            <Select
              value={form.department_id}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  department_id:
                    value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>

              <SelectContent>
                {departments.map(
                  (dept) => (
                    <SelectItem
                      key={dept.id}
                      value={dept.id}
                    >
                      {dept.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Faculty */}

          <div>
            <Label>
              Faculty
            </Label>

            <Select
              value={form.faculty_id}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  faculty_id:
                    value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Faculty" />
              </SelectTrigger>

              <SelectContent>
                {faculty.map(
                  (item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.full_name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Semester */}

          <div>
            <Label>
              Semester
            </Label>

            <Input
              type="number"
              min="1"
              max="8"
              value={form.semester}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  semester:
                    e.target.value,
                }))
              }
            />
          </div>

          {/* Credits */}

          <div>
            <Label>
              Credits
            </Label>

            <Input
              type="number"
              min="1"
              value={form.credits}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  credits:
                    e.target.value,
                }))
              }
            />
          </div>

          {/* Max Students */}

          <div>
            <Label>
              Max Students
            </Label>

            <Input
              type="number"
              min="1"
              value={form.max_students}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  max_students:
                    e.target.value,
                }))
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : submitText}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}