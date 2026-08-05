import { useEffect, useState, type FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import {
    Event,
    EventFormData,
} from "../types";

interface EventDialogProps {
    open: boolean;

    event: Event | null;

    onOpenChange: (
        open: boolean
    ) => void;

    onSubmit: (
        data: EventFormData
    ) => Promise<void>;

    isLoading: boolean;
}
export default function EventDialog({
    open,
    event,
    onOpenChange,
    onSubmit,
    isLoading,
}: EventDialogProps) {

    const initialForm: EventFormData = {
        title: event?.title ?? "",

        description:
            event?.description ?? "",

        department_id:
            event?.department_id ?? "",

        venue:
            event?.venue ?? "",

        organizer:
            event?.organizer ?? "",

        event_date:
            event?.event_date ?? "",

        start_time:
            event?.start_time ?? "",

        end_time:
            event?.end_time ?? "",

        max_participants:
            event?.max_participants ?? 0,

        status:
            event?.status ??
            "Upcoming",

        is_featured:
            event?.is_featured ??
            false,
    };

    const [form, setForm] =
        useState(initialForm);

    const update = <
        K extends keyof EventFormData
    >(
        key: K,
        value: EventFormData[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    useEffect(() => {
        setForm({
            title: event?.title ?? "",
            description: event?.description ?? "",
            department_id: event?.department_id ?? "",
            venue: event?.venue ?? "",
            organizer: event?.organizer ?? "",
            event_date: event?.event_date ?? "",
            start_time: event?.start_time ?? "",
            end_time: event?.end_time ?? "",
            max_participants:
                event?.max_participants ?? 0,
            status:
                event?.status ?? "Upcoming",
            is_featured:
                event?.is_featured ?? false,
        });
    }, [event]);

    const handleSubmit = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        await onSubmit(form);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-2xl">

                <DialogHeader>

                    <DialogTitle>
                        {event
                            ? "Edit Event"
                            : "Add Event"}
                    </DialogTitle>

                    <DialogDescription>
                        Fill in the event details.
                    </DialogDescription>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="grid grid-cols-2 gap-4">

                        <div className="col-span-2">

                            <Label>
                                Event Title
                            </Label>

                            <Input
                                value={form.title}
                                onChange={(e) =>
                                    update(
                                        "title",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="col-span-2">

                            <Label>
                                Description
                            </Label>

                            <Textarea
                                rows={4}
                                value={form.description}
                                onChange={(e) =>
                                    update(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>
                                Venue
                            </Label>

                            <Input
                                value={form.venue}
                                onChange={(e) =>
                                    update(
                                        "venue",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>
                                Organizer
                            </Label>

                            <Input
                                value={form.organizer}
                                onChange={(e) =>
                                    update(
                                        "organizer",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>
                                Event Date
                            </Label>

                            <Input
                                type="date"
                                value={form.event_date}
                                onChange={(e) =>
                                    update(
                                        "event_date",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>
                                Maximum Participants
                            </Label>

                            <Input
                                type="number"
                                value={
                                    form.max_participants
                                }
                                onChange={(e) =>
                                    update(
                                        "max_participants",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>
                                Start Time
                            </Label>

                            <Input
                                type="time"
                                value={form.start_time}
                                onChange={(e) =>
                                    update(
                                        "start_time",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>
                                End Time
                            </Label>

                            <Input
                                type="time"
                                value={form.end_time}
                                onChange={(e) =>
                                    update(
                                        "end_time",
                                        e.target.value
                                    )
                                }
                            />

                        </div>
                        <div>

                            <Label>
                                Department
                            </Label>

                            <Input
                                placeholder="Department ID"
                                value={form.department_id}
                                onChange={(e) =>
                                    update(
                                        "department_id",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>
                                Status
                            </Label>

                            <Select
                                value={form.status}
                                onValueChange={(value) =>
                                    update(
                                        "status",
                                        value as EventFormData["status"]
                                    )
                                }
                            >

                                <SelectTrigger>

                                    <SelectValue />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="Upcoming">
                                        Upcoming
                                    </SelectItem>

                                    <SelectItem value="Ongoing">
                                        Ongoing
                                    </SelectItem>

                                    <SelectItem value="Completed">
                                        Completed
                                    </SelectItem>

                                    <SelectItem value="Cancelled">
                                        Cancelled
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                        <div className="col-span-2 flex items-center justify-between rounded-lg border p-4">

                            <div>

                                <Label>
                                    Featured Event
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Display this event prominently.
                                </p>

                            </div>

                            <Switch
                                checked={form.is_featured}
                                onCheckedChange={(checked) =>
                                    update(
                                        "is_featured",
                                        checked
                                    )
                                }
                            />

                        </div>

                    </div>

                    <DialogFooter>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Saving..."
                                : event
                                    ? "Update Event"
                                    : "Save Event"}
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    );
}