import { Badge } from "@/components/ui/badge";

import { NoticeStatus } from "../types";

interface StatusBadgeProps {
  status: NoticeStatus;
}

const variants: Record<
  NoticeStatus,
  string
> = {
  Draft:
    "bg-yellow-100 text-yellow-800 border-yellow-200",

  Published:
    "bg-green-100 text-green-800 border-green-200",

  Archived:
    "bg-gray-100 text-gray-800 border-gray-200",
};

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={variants[status]}
    >
      {status}
    </Badge>
  );
}