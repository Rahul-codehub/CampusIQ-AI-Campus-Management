import { Badge } from "@/components/ui/badge";

import type { ComplaintStatus } from "../types";

interface StatusBadgeProps {
  status: ComplaintStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        >
          Pending
        </Badge>
      );

    case "in_progress":
      return (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 hover:bg-blue-100"
        >
          In Progress
        </Badge>
      );

    case "resolved":
      return (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          Resolved
        </Badge>
      );

    case "rejected":
      return (
        <Badge
          variant="destructive"
        >
          Rejected
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