import {
  Users,
  UserCheck,
  UserX,
  Building2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type { FacultyStatsProps } from "../types";

export default function FacultyStats({
  totalFaculty,
  activeFaculty,
  inactiveFaculty,
  totalDepartments,
}: FacultyStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Faculty
            </p>

            <h2 className="text-3xl font-bold">
              {totalFaculty}
            </h2>
          </div>

          <Users className="h-10 w-10 text-primary" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Active Faculty
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {activeFaculty}
            </h2>
          </div>

          <UserCheck className="h-10 w-10 text-green-600" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Inactive Faculty
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {inactiveFaculty}
            </h2>
          </div>

          <UserX className="h-10 w-10 text-red-600" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Departments
            </p>

            <h2 className="text-3xl font-bold">
              {totalDepartments}
            </h2>
          </div>

          <Building2 className="h-10 w-10 text-blue-600" />
        </CardContent>
      </Card>

    </div>
  );
}