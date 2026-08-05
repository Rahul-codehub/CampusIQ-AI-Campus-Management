import { Badge } from "@/components/ui/badge";

import type { ComplaintPriority } from "../types";

interface PriorityBadgeProps {
  priority: ComplaintPriority;
}

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  switch (priority) {
    case "low":
      return (
        <Badge
          variant="outline"
          className="border-green-500 text-green-700"
        >
          Low
        </Badge>
      );

    case "medium":
      return (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 hover:bg-blue-100"
        >
          Medium
        </Badge>
      );

    case "high":
      return (
        <Badge
          variant="secondary"
          className="bg-orange-100 text-orange-800 hover:bg-orange-100"
        >
          High
        </Badge>
      );

    case "urgent":
      return (
        <Badge variant="destructive">
          Urgent
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          Unknown
        </Badge>
      );
  }
}