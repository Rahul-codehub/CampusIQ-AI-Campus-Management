import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Props {
  attendance: number;
  pendingComplaints: number;
}

export default function AIInsights({
  attendance,
  pendingComplaints,
}: Props) {
  const insights = [];

  if (attendance >= 90) {
    insights.push({
      icon: CheckCircle2,
      color: "text-green-600",
      title: "Excellent Attendance",
      description: `Overall attendance is ${attendance}% which is above the recommended level.`,
    });
  } else if (attendance >= 75) {
    insights.push({
      icon: TrendingUp,
      color: "text-yellow-600",
      title: "Attendance Needs Improvement",
      description: `Current attendance is ${attendance}%. Consider monitoring student participation.`,
    });
  } else {
    insights.push({
      icon: AlertTriangle,
      color: "text-red-600",
      title: "Low Attendance",
      description: `Attendance has dropped to ${attendance}%. Immediate action is recommended.`,
    });
  }

  if (pendingComplaints > 0) {
    insights.push({
      icon: AlertTriangle,
      color: "text-orange-600",
      title: "Pending Complaints",
      description: `${pendingComplaints} complaint(s) require attention.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          CampusIQ AI Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        {insights.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="flex gap-4 rounded-xl border p-4"
            >

              <Icon
                className={`h-6 w-6 ${item.color}`}
              />

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>

              </div>

            </div>

          );

        })}

      </CardContent>
    </Card>
  );
}