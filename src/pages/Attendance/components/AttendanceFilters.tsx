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

import type { AttendanceFiltersProps } from "../types";

export default function AttendanceFilters({
  departments,
  courses,
  form,
  setForm,
  onLoadStudents,
}: AttendanceFiltersProps) {
  return (
    <div className="space-y-6">

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {/* Department */}

        <div className="space-y-2">
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
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>

            <SelectContent>
              {departments.map((department) => (
                <SelectItem
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Semester */}

        <div className="space-y-2">
          <Label>Semester</Label>

          <Select
            value={form.semester}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                semester: value,
              }))
            }
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>

            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                <SelectItem
                  key={semester}
                  value={semester.toString()}
                >
                  Semester {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course */}

        <div className="space-y-2">
          <Label>Course</Label>

          <Select
            value={form.course_id}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                course_id: value,
              }))
            }
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>

            <SelectContent>
              {courses.map((course) => (
                <SelectItem
                  key={course.id}
                  value={course.id}
                >
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}

        <div className="space-y-2">
          <Label>Date</Label>

          <Input
            type="date"
            className="h-11"
            value={form.date}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
          />
        </div>

        {/* Load Students */}

        <div className="flex items-end">
          <Button
            className="w-full h-11"
            onClick={onLoadStudents}
          >
            Load Students
          </Button>
        </div>

      </div>

    </div>
  );
}