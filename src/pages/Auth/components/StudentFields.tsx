import {
  GraduationCap,
  Phone,
  Calendar,
  Building2,
} from "lucide-react";

import AuthInput from "./AuthInput";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  Department,
} from "@/integrations/mongodb/types";

import type {
  SignupFormData,
} from "../types";

interface StudentFieldsProps {
  form: SignupFormData;

  departments: Department[];

  updateField: <
    K extends keyof SignupFormData
  >(
    key: K,
    value: SignupFormData[K]
  ) => void;
}

export default function StudentFields({
  form,
  departments,
  updateField,
}: StudentFieldsProps) {
  return (
    <div className="space-y-6">

      {/* Student ID + Semester */}

      <div className="grid grid-cols-2 gap-4">

        <AuthInput
          label="Student ID"
          icon={GraduationCap}
          value={form.studentId}
          placeholder="CU23250001"
          onChange={(value) =>
            updateField(
              "studentId",
              value
            )
          }
        />

        <div className="space-y-2">

          <Label className="text-slate-200">
            Semester
          </Label>

          <Select
            value={form.semester}
            onValueChange={(value) =>
              updateField(
                "semester",
                value
              )
            }
          >

            <SelectTrigger
              className="
                h-12
                rounded-xl
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-md
              "
            >

              <SelectValue placeholder="Semester" />

            </SelectTrigger>

            <SelectContent
              className="
                bg-slate-900
                border-slate-700
                text-white
              "
            >

              {[1,2,3,4,5,6,7,8].map((semester)=>(
                <SelectItem
                  key={semester}
                  value={String(semester)}
                >
                  Semester {semester}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

      </div>

      {/* Mobile */}

      <AuthInput
        label="Mobile Number"
        icon={Phone}
        value={form.mobile}
        placeholder="9876543210"
        onChange={(value) =>
          updateField(
            "mobile",
            value
          )
        }
      />

      {/* Department */}

      <div className="space-y-2">

        <Label className="text-slate-200 flex items-center gap-2">

          <Building2 className="h-4 w-4" />

          Department

        </Label>

        <Select
          value={form.departmentId}
          onValueChange={(value)=>
            updateField(
              "departmentId",
              value
            )
          }
        >

          <SelectTrigger
            className="
              h-12
              rounded-xl
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-md
            "
          >

            <SelectValue placeholder="Select Department" />

          </SelectTrigger>

          <SelectContent
            className="
              bg-slate-900
              border-slate-700
              text-white
            "
          >

            {departments.map((department)=>(
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

      {/* Enrollment Year */}

      <AuthInput
        label="Enrollment Year"
        icon={Calendar}
        value={String(form.enrollmentYear)}
        placeholder="2026"
        onChange={(value)=>
          updateField(
            "enrollmentYear",
            value
          )
        }
      />

    </div>
  );
}