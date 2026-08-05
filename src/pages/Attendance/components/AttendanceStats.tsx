import {
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type {
  AttendanceStatsProps,
} from "../types";

export default function AttendanceStats({
  totalStudents,
  present,
  absent,
  late,
}: AttendanceStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {/* Total Students */}

      <Card>
        <CardContent className="flex items-center justify-between pt-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Total Students
            </p>

            <h2 className="text-3xl font-bold">
              {totalStudents}
            </h2>
          </div>

          <Users className="h-8 w-8 text-primary" />

        </CardContent>
      </Card>

      {/* Present */}

      <Card>
        <CardContent className="flex items-center justify-between pt-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Present
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {present}
            </h2>
          </div>

          <CheckCircle2 className="h-8 w-8 text-green-600" />

        </CardContent>
      </Card>

      {/* Absent */}

      <Card>
        <CardContent className="flex items-center justify-between pt-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Absent
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {absent}
            </h2>
          </div>

          <XCircle className="h-8 w-8 text-red-600" />

        </CardContent>
      </Card>

      {/* Late */}

      <Card>
        <CardContent className="flex items-center justify-between pt-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Late
            </p>

            <h2 className="text-3xl font-bold text-yellow-600">
              {late}
            </h2>
          </div>

          <Clock3 className="h-8 w-8 text-yellow-600" />

        </CardContent>
      </Card>

    </div>
  );
}