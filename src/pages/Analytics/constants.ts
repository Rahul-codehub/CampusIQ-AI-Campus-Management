import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  Bell,
  CalendarDays,
  ClipboardList,
  BarChart3,
} from "lucide-react";

export const KPI_CARDS = [
  {
    key: "students",
    title: "Students",
    icon: GraduationCap,
    color: "text-blue-600",
  },
  {
    key: "faculty",
    title: "Faculty",
    icon: Users,
    color: "text-green-600",
  },
  {
    key: "courses",
    title: "Courses",
    icon: BookOpen,
    color: "text-orange-500",
  },
  {
    key: "departments",
    title: "Departments",
    icon: Building2,
    color: "text-purple-600",
  },
  {
    key: "attendancePercentage",
    title: "Attendance",
    icon: BarChart3,
    color: "text-cyan-600",
    suffix: "%",
  },
  {
    key: "complaints",
    title: "Complaints",
    icon: ClipboardList,
    color: "text-red-600",
  },
  {
    key: "events",
    title: "Events",
    icon: CalendarDays,
    color: "text-indigo-600",
  },
  {
    key: "notices",
    title: "Notices",
    icon: Bell,
    color: "text-yellow-500",
  },
];

export const CHART_COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export const REPORT_ACTIONS = [
  "Export PDF",
  "Export Excel",
  "Print Report",
  "AI Summary",
];