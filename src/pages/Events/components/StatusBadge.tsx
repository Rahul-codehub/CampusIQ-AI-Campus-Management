import { Badge } from "@/components/ui/badge";

import { EventStatus } from "../types";

interface StatusBadgeProps {
  status: EventStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  switch (status) {
    case "Upcoming":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          Upcoming
        </Badge>
      );

    case "Ongoing":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Ongoing
        </Badge>
      );

    case "Completed":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          Completed
        </Badge>
      );

    case "Cancelled":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          Cancelled
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          {status}
        </Badge>
      );
  }
}