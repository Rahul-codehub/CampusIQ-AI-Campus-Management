import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import DashboardCards from "./components/DashboardCard";
import AttendanceChart from "./components/AttendanceChart";
import StudentDepartmentChart from "./components/StudentDepartmentChart";
import ComplaintChart from "./components/ComplaintChart";
import AIInsights from "./components/AIInsights";
import { getAnalytics } from "./services/analyticsService";
import ReportsPanel from "./components/ReportsPanel";

import { AnalyticsData } from "./types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Analytics() {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data =
          await getAnalytics();

        setAnalytics(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load analytics."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <p className="text-muted-foreground text-lg">
            Loading Analytics...
          </p>
        </div>
      </AppLayout>
    );
  }

  if (error || !analytics) {
    return (
      <AppLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <p className="text-red-500">
            {error}
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
     <div
  id="analytics-report"
  className="space-y-8"
>
        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Analytics & Reports
          </h1>

          <p className="text-muted-foreground">
            Campus performance insights and reporting dashboard.
          </p>
        </div>

        {/* KPI Cards */}

        <DashboardCards
          overview={analytics.overview}
        />

        {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">

    <AttendanceChart
        data={analytics.charts.attendance}
    />

    <StudentDepartmentChart
        data={
            analytics.charts.studentDepartments
        }
    />

     {/* Complaint Analytics */}

    <ComplaintChart
        data={
            analytics.charts.complaints
        }
    />

</div>

       

 
        {/* AI Insights */}

       <AIInsights
    attendance={
        analytics.overview.attendancePercentage
    }
    pendingComplaints={
        analytics.complaints.pending
    }
/>

        {/* Reports */}

       <ReportsPanel />

      </div>
    </AppLayout>
  );
}