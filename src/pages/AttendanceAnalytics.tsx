import {
  useEffect,
  useState,
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AppLayout from "@/components/layout/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { dbApi } from "@/integrations/mongodb/api";

import { toast } from "sonner";

const AttendanceAnalytics = () => {
  const [
    attendance,
    setAttendance,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* =========================================
     LOAD ATTENDANCE
  ========================================= */
  const fetchAttendance =
    async () => {
      try {
        const response =
          await dbApi.list(
            "attendance"
          );

        console.log(
          "Attendance Response:",
          response
        );

        setAttendance(
          response?.data || []
        );
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.message ||
            "Unable to load analytics."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAttendance();
  }, []);

  /* =========================================
     LOADING UI
  ========================================= */
  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-muted-foreground">
            Loading analytics...
          </p>
        </div>
      </AppLayout>
    );
  }

  /* =========================================
     SAFE ARRAY
  ========================================= */
  const safeAttendance =
    Array.isArray(attendance)
      ? attendance
      : [];

  /* =========================================
     CALCULATIONS
  ========================================= */
  const presentCount =
    safeAttendance.filter(
      (a) =>
        a?.status ===
        "present"
    ).length;

  const absentCount =
    safeAttendance.filter(
      (a) =>
        a?.status ===
        "absent"
    ).length;

  const total =
    presentCount +
    absentCount;

  const attendancePercentage =
    total > 0
      ? (
          (presentCount /
            total) *
          100
        ).toFixed(1)
      : "0";

  /* =========================================
     PIE DATA
  ========================================= */
  const pieData = [
    {
      name: "Present",
      value: presentCount,
    },
    {
      name: "Absent",
      value: absentCount,
    },
  ];

  /* =========================================
     STUDENT DATA
  ========================================= */
  const studentMap:
    Record<string, number> =
    {};

  safeAttendance.forEach(
    (a) => {
      if (
        a?.status ===
        "present"
      ) {
        const studentName =
          a?.student_name ||
          "Unknown";

        studentMap[
          studentName
        ] =
          (studentMap[
            studentName
          ] || 0) + 1;
      }
    }
  );

  const barData =
    Object.entries(
      studentMap
    ).map(
      ([name, value]) => ({
        name,
        attendance:
          value,
      })
    );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* =========================================
            HEADER
        ========================================= */}
        <div>
          <h1 className="text-3xl font-bold">
            Attendance Analytics
          </h1>

          <p className="text-muted-foreground">
            Attendance insights and statistics
          </p>
        </div>

        {/* =========================================
            SUMMARY CARDS
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* =========================================
              TOTAL RECORDS
          ========================================= */}
          <Card>
            <CardHeader>
              <CardTitle>
                Total Records
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {total}
              </p>
            </CardContent>
          </Card>

          {/* =========================================
              PRESENT %
          ========================================= */}
          <Card>
            <CardHeader>
              <CardTitle>
                Present %
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {
                  attendancePercentage
                }
                %
              </p>
            </CardContent>
          </Card>

          {/* =========================================
              ABSENT COUNT
          ========================================= */}
          <Card>
            <CardHeader>
              <CardTitle>
                Absent Count
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {
                  absentCount
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* =========================================
            CHARTS
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* =========================================
              PIE CHART
          ========================================= */}
          <Card>
            <CardHeader>
              <CardTitle>
                Attendance Overview
              </CardTitle>
            </CardHeader>

            <CardContent className="h-[350px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >
                    <Cell fill="#22c55e" />

                    <Cell fill="#ef4444" />
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* =========================================
              BAR CHART
          ========================================= */}
          <Card>
            <CardHeader>
              <CardTitle>
                Student Attendance
              </CardTitle>
            </CardHeader>

            <CardContent className="h-[350px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={barData}
                >
                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="attendance"
                    fill="#3b82f6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AttendanceAnalytics;