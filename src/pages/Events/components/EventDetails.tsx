import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Users,
  Star,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Event } from "../types";
import StatusBadge from "./StatusBadge";

interface EventDetailsProps {
  open: boolean;

  event: Event | null;

  onOpenChange: (
    open: boolean
  ) => void;
}

export default function EventDetails({
  open,
  event,
  onOpenChange,
}: EventDetailsProps) {

  if (!event) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">

        <DialogHeader>

          <DialogTitle>
            Event Details
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6">

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-bold">
                {event.title}
              </h2>

              {event.is_featured && (
                <Badge className="bg-yellow-100 text-yellow-700">
                  <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                  Featured
                </Badge>
              )}

            </div>

            <p className="mt-2 text-muted-foreground">
              {event.description}
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="flex items-center gap-3">

              <CalendarDays className="h-5 w-5 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Event Date
                </p>

                <p className="font-medium">
                  {event.event_date
                    ? new Date(
                        event.event_date
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Clock className="h-5 w-5 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Time
                </p>

                <p className="font-medium">
                  {event.start_time} - {event.end_time}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <MapPin className="h-5 w-5 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Venue
                </p>

                <p className="font-medium">
                  {event.venue}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <User className="h-5 w-5 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Organizer
                </p>

                <p className="font-medium">
                  {event.organizer}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Users className="h-5 w-5 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Participants
                </p>

                <p className="font-medium">
                  {event.max_participants}
                </p>

              </div>

            </div>

            <div>

              <p className="mb-2 text-sm text-muted-foreground">
                Status
              </p>

              <StatusBadge
                status={event.status}
              />

            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}