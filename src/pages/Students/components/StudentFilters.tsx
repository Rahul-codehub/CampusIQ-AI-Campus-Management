import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface StudentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  total: number;
}

export default function StudentFilters({
  search,
  onSearchChange,
  total,
}: StudentFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="relative w-full max-w-sm">

        <Search
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            h-4
            w-4
            text-muted-foreground
          "
        />

        <Input
          placeholder="Search students..."
          className="pl-9"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />

      </div>

      <div className="text-sm text-muted-foreground whitespace-nowrap">
        {total} Students
      </div>

    </div>
  );
}