import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ComplaintFiltersProps {
    search: string;
    status: string;
    priority: string;
    total: number;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onPriorityChange: (value: string) => void;
}

export default function ComplaintFilters({
    search,
    status,
    priority,
    total,
    onSearchChange,
    onStatusChange,
    onPriorityChange,
}: ComplaintFiltersProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-1 flex-col gap-4 md:flex-row">

                <div className="relative w-full md:max-w-sm">

                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search complaints..."
                        value={search}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="pl-9"
                    />

                </div>

                <Select
                    value={status}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All Status
                        </SelectItem>

                        <SelectItem value="pending">
                            Pending
                        </SelectItem>

                        <SelectItem value="in_progress">
                            In Progress
                        </SelectItem>

                        <SelectItem value="resolved">
                            Resolved
                        </SelectItem>

                        <SelectItem value="rejected">
                            Rejected
                        </SelectItem>

                    </SelectContent>
                </Select>

                <Select
                    value={priority}
                    onValueChange={onPriorityChange}
                >
                    <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All Priorities
                        </SelectItem>

                        <SelectItem value="low">
                            Low
                        </SelectItem>

                        <SelectItem value="medium">
                            Medium
                        </SelectItem>

                        <SelectItem value="high">
                            High
                        </SelectItem>

                        <SelectItem value="urgent">
                            Urgent
                        </SelectItem>

                    </SelectContent>
                </Select>

            </div>
            <p className="text-sm text-muted-foreground whitespace-nowrap">
                {total} Complaint{total !== 1 ? "s" : ""}
            </p>
        </div>
    );
}