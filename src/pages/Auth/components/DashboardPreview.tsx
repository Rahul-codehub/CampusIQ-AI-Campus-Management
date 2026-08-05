import {
  GraduationCap,
  Users,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardPreview() {
  return (
    <div className="grid grid-cols-2 gap-5">

      <StatCard
        icon={GraduationCap}
        title="Students"
        value="1,254"
      />

      <StatCard
        icon={Users}
        title="Faculty"
        value="86"
      />

      <StatCard
        icon={ClipboardCheck}
        title="Attendance"
        value="96%"
      />

      <StatCard
        icon={BarChart3}
        title="Analytics"
        value="Live"
      />

    </div>
  );
}