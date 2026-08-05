import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

import { attendanceService } from "../services/attendanceService";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { toast } from "sonner";

export default function StudentAttendance() {

  const { user } = useAuth();

  const [attendance, setAttendance] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);
    /* =========================================
   LOAD ATTENDANCE
========================================= */

useEffect(() => {

  if (!user) return;

  const loadAttendance =
    async () => {

      try {

        const data =
          await attendanceService.getStudentAttendance(
            user.id
          );

        setAttendance(data);

      } catch (error: any) {

        toast.error(
          error.message ||
          "Unable to load attendance."
        );

      } finally {

        setLoading(false);

      }

    };

  loadAttendance();

}, [user]);
/* =========================================
   ATTENDANCE STATISTICS
========================================= */

const total =
  attendance.length;

const present =
  attendance.filter(
    (record) =>
      record.status === "present"
  ).length;

const absent =
  attendance.filter(
    (record) =>
      record.status === "absent"
  ).length;

const late =
  attendance.filter(
    (record) =>
      record.status === "late"
  ).length;

const overall =
  total === 0
    ? 0
    : Math.round(
        ((present + late) / total) *
          100
      );
    /* =========================================
   RENDER
========================================= */

return (
  <div className="space-y-6">

    <Card>

      <CardHeader>

        <h2 className="text-2xl font-bold">
          My Attendance
        </h2>

      </CardHeader>

      <CardContent>

        {loading ? (

          <p>Loading attendance...</p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <Card>

              <CardContent className="p-6 text-center">

                <h3 className="text-lg font-semibold">
                  Overall
                </h3>

                <p className="text-4xl font-bold text-green-600 mt-4">
                  {overall}%
                </p>



              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6 text-center">

                <h3 className="text-lg font-semibold">
                  Present
                </h3>

                <p className="text-4xl font-bold text-green-600 mt-4">
                  {present}
                </p>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6 text-center">

                <h3 className="text-lg font-semibold">
                  Absent
                </h3>

                <p className="text-4xl font-bold text-red-600 mt-4">
                  {absent}
                </p>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-4 text-center">

                <h3 className="text-lg font-semibold">
                  Late
                </h3>

                <p className="text-4xl font-bold text-yellow-600 mt-4">
                  {late}
                </p>

              </CardContent>

            </Card>
        <Card>

  <CardHeader>

    <h3 className="text-xl font-semibold">
      Recent Attendance
    </h3>

  </CardHeader>

  <CardContent>

    {attendance.length === 0 ? (

      <p className="text-muted-foreground">
        No attendance records found.
      </p>

    ) : (

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Date
              </th>

              <th className="text-left py-3">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.map((record) => (

              <tr
                key={record.id}
                className="border-b"
              >

                <td className="py-3">
                  {record.date}
                </td>

                <td className="py-3">

                  {record.status === "present" && "✅ Present"}

                  {record.status === "absent" && "❌ Absent"}

                  {record.status === "late" && "🟡 Late"}

                  {record.status === "excused" && "🟢 Excused"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )}

  </CardContent>

</Card>

          </div>

        )}

      </CardContent>

    </Card>

  </div>
);
}