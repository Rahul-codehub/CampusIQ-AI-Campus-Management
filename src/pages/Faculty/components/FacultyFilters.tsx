import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import type { FacultyFiltersProps } from "../types";

export default function FacultyFilters({
  search,
  onSearchChange,
  total,
}: FacultyFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search faculty..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="pl-9"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {total} faculty
      </p>
    </div>
  );
}