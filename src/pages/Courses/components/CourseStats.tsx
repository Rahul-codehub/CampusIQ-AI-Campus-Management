import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Building2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type {
  CourseStatsProps,
} from "../types";

export default function CourseStats({
  totalCourses,
  activeCourses,
  inactiveCourses,
  totalDepartments,
}: CourseStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Courses
            </p>

            <h2 className="text-3xl font-bold">
              {totalCourses}
            </h2>
          </div>

          <BookOpen className="h-8 w-8 text-primary" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Active Courses
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {activeCourses}
            </h2>
          </div>

          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Inactive Courses
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {inactiveCourses}
            </h2>
          </div>

          <XCircle className="h-8 w-8 text-red-600" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Departments
            </p>

            <h2 className="text-3xl font-bold">
              {totalDepartments}
            </h2>
          </div>

          <Building2 className="h-8 w-8 text-blue-600" />
        </CardContent>
      </Card>

    </div>
  );
}