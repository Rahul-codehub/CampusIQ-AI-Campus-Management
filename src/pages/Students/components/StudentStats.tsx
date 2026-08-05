import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Users,
  UserCheck,
  UserX,
  Building2,
} from "lucide-react";

interface StudentStatsProps {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  totalDepartments: number;
}

export default function StudentStats({
  totalStudents,
  activeStudents,
  inactiveStudents,
  totalDepartments,
}: StudentStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Students
            </p>

            <h2 className="text-3xl font-bold">
              {totalStudents}
            </h2>
          </div>

          <Users className="h-10 w-10 text-primary" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Active Students
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {activeStudents}
            </h2>
          </div>

          <UserCheck className="h-10 w-10 text-green-600" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Inactive Students
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {inactiveStudents}
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