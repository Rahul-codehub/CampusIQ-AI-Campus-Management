import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Loader2,
  XCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { Complaint } from "../types";

interface ComplaintStatsProps {
  complaints: Complaint[];
}

export default function ComplaintStats({
  complaints,
}: ComplaintStatsProps) {
  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "in_progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "resolved"
  ).length;

  const rejected = complaints.filter(
    (c) => c.status === "rejected"
  ).length;

  const stats = [
    {
      title: "Total Complaints",
      value: total,
      icon: AlertTriangle,
      color: "text-primary",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "text-yellow-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Loader2,
      color: "text-blue-600",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {stat.value}
                </h2>
              </div>

              <Icon
                className={`h-8 w-8 ${stat.color}`}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}