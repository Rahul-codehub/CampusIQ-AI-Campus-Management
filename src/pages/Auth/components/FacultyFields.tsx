import {
  BadgeCheck,
  Phone,
  Building2,
  Briefcase,
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

interface FacultyFieldsProps {
  form: SignupFormData;

  departments: Department[];

  updateField: <
    K extends keyof SignupFormData
  >(
    key: K,
    value: SignupFormData[K]
  ) => void;
}

export default function FacultyFields({
  form,
  departments,
  updateField,
}: FacultyFieldsProps) {
  return (
    <div className="space-y-6">

      {/* Faculty ID */}

      <AuthInput
        label="Faculty ID"
        icon={BadgeCheck}
        value={form.facultyId}
        placeholder="FAC001"
        onChange={(value) =>
          updateField(
            "facultyId",
            value
          )
        }
      />

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

        <Label className="flex items-center gap-2 text-slate-200">

          <Building2 className="h-4 w-4" />

          Department

        </Label>

        <Select
          value={form.departmentId}
          onValueChange={(value) =>
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

            {departments.map(
              (department) => (
                <SelectItem
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </SelectItem>
              )
            )}

          </SelectContent>

        </Select>

      </div>

      {/* Designation */}

      <AuthInput
        label="Designation"
        icon={Briefcase}
        value={form.designation}
        placeholder="Assistant Professor"
        onChange={(value) =>
          updateField(
            "designation",
            value
          )
        }
      />

    </div>
  );
}