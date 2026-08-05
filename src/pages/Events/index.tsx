import { useState } from "react";
import { Plus } from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useEvents } from "./hooks/useEvents";

import {
  Event,
  EventFormData,
} from "./types";

import EventStats from "./components/EventStats";
import EventTable from "./components/EventTable";
import EventDialog from "./components/EventDialog";
import EventDetails from "./components/EventDetails";
import DeleteEventDialog from "./components/DeleteEventDialog";

export default function Events() {

  /* =========================================
      DATA
  ========================================= */

  const {
    filteredEvents,
    stats,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useEvents();

  /* =========================================
      STATES
  ========================================= */

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedEvent, setSelectedEvent] =
    useState<Event | null>(null);

  /* =========================================
      HANDLERS
  ========================================= */

  const handleCreate = () => {
    setSelectedEvent(null);
    setDialogOpen(true);
  };

  const handleEdit = (
    event: Event
  ) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleView = (
    event: Event
  ) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
  };

  const handleDelete = (
    event: Event
  ) => {
    setSelectedEvent(event);
    setDeleteOpen(true);
  };

  const handleSubmit = async (
    data: EventFormData
  ) => {

    try {

      if (selectedEvent) {

        await updateEvent.mutateAsync({
          id: selectedEvent.id,
          data,
        });

      } else {

        await createEvent.mutateAsync(data);

      }

      setDialogOpen(false);
      setSelectedEvent(null);

    } catch (error) {

      console.error(error);

    }

  };

  const confirmDelete =
    async () => {

      if (!selectedEvent) return;

      try {

        await deleteEvent.mutateAsync(
          selectedEvent.id
        );

        setDeleteOpen(false);
        setSelectedEvent(null);

      } catch (error) {

        console.error(error);

      }

    };
      /* =========================================
      RENDER
  ========================================= */

  return (
    <AppLayout>

      <div className="space-y-6">

        {/* Statistics */}

        <EventStats stats={stats} />

        {/* Header */}

        <div className="flex items-end justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Event Management
            </h1>

            <p className="text-muted-foreground">
              Manage all campus events
            </p>

          </div>

          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>

        </div>

        {/* Table */}

        <Card>

          <CardHeader>

            <div className="flex items-center justify-end">

              <span className="text-muted-foreground">

                {filteredEvents.length} Event
                {filteredEvents.length !== 1
                  ? "s"
                  : ""}

              </span>

            </div>

          </CardHeader>

          <CardContent>

            <EventTable
              events={filteredEvents}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </CardContent>

        </Card>

        {/* Create / Edit */}

        <EventDialog
          open={dialogOpen}
          event={selectedEvent}
          onOpenChange={(open) => {

            setDialogOpen(open);

            if (!open) {
              setSelectedEvent(null);
            }

          }}
          onSubmit={handleSubmit}
          isLoading={
            createEvent.isPending ||
            updateEvent.isPending
          }
        />

        {/* Details */}

        <EventDetails
          open={detailsOpen}
          event={selectedEvent}
          onOpenChange={(open) => {

            setDetailsOpen(open);

            if (!open) {
              setSelectedEvent(null);
            }

          }}
        />

        {/* Delete */}

        <DeleteEventDialog
          open={deleteOpen}
          event={selectedEvent}
          onOpenChange={(open) => {

            setDeleteOpen(open);

            if (!open) {
              setSelectedEvent(null);
            }

          }}
          onConfirm={confirmDelete}
          isLoading={deleteEvent.isPending}
        />

      </div>

    </AppLayout>
  );
}