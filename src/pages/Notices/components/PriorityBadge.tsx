import { Badge } from "@/components/ui/badge";

import { NoticePriority } from "../types";

interface PriorityBadgeProps {
  priority: NoticePriority;
}

const variants: Record<
  NoticePriority,
  string
> = {
  Low:
    "bg-green-100 text-green-800 border-green-200",

  Medium:
    "bg-blue-100 text-blue-800 border-blue-200",

  High:
    "bg-orange-100 text-orange-800 border-orange-200",

  Urgent:
    "bg-red-100 text-red-800 border-red-200",
};

export function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={variants[priority]}
    >
      {priority}
    </Badge>
  );
}