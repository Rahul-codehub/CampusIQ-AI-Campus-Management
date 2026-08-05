import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import type {
  CourseFiltersProps,
} from "../types";

export default function CourseFilters({
  search,
  total,
  onSearchChange,
}: CourseFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          className="pl-9"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {total} Course
        {total !== 1 ? "s" : ""}
      </p>

    </div>
  );
}