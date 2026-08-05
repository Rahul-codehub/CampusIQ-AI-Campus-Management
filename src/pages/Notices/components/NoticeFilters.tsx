import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { NoticeFilters as Filters } from "../types";

interface NoticeFiltersProps {
  filters: Filters;
  total: number;
  onChange: (filters: Filters) => void;
}

export function NoticeFilters({
  filters,
  total,
  onChange,
}: NoticeFiltersProps) {
  const update = (
    key: keyof Filters,
    value: string
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const reset = () => {
    onChange({
      search: "",
      status: "all",
      priority: "all",
      department: "",
    });
  };
return (
  <div className="space-y-5">

    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Left Section */}

      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}

        <div className="relative w-[420px]">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search notices..."
            value={filters.search}
            onChange={(e) =>
              update("search", e.target.value)
            }
            className="pl-10 h-11"
          />

        </div>

        {/* Status */}

        <Select
          value={filters.status}
          onValueChange={(value) =>
            update("status", value)
          }
        >
          <SelectTrigger className="w-[170px] h-11">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              All Status
            </SelectItem>

            <SelectItem value="Published">
              Published
            </SelectItem>

            <SelectItem value="Draft">
              Draft
            </SelectItem>

            <SelectItem value="Archived">
              Archived
            </SelectItem>

          </SelectContent>

        </Select>

        {/* Priority */}

        <Select
          value={filters.priority}
          onValueChange={(value) =>
            update("priority", value)
          }
        >
          <SelectTrigger className="w-[170px] h-11">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              All Priority
            </SelectItem>

            <SelectItem value="Low">
              Low
            </SelectItem>

            <SelectItem value="Medium">
              Medium
            </SelectItem>

            <SelectItem value="High">
              High
            </SelectItem>

            <SelectItem value="Urgent">
              Urgent
            </SelectItem>

          </SelectContent>

        </Select>

        {/* Department */}

        <Input
          className="w-[200px] h-11"
          placeholder="Department"
          value={filters.department}
          onChange={(e) =>
            update("department", e.target.value)
          }
        />

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-3">

        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {total} Notice{total !== 1 ? "s" : ""}
        </span>

        <Button
          variant="outline"
          onClick={reset}
          className="h-11"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

      </div>

    </div>

  </div>
);
}