import { useMemo, useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { dbApi } from "@/integrations/mongodb/api";

import {
  Event,
  EventFilters,
  EventFormData,
  EventStats,
} from "../types";

const COLLECTION = "events";

export function useEvents() {

  const queryClient =
    useQueryClient();

  const [filters, setFilters] =
    useState<EventFilters>({
      search: "",
      status: "",
      department: "",
    });

  /* =========================================
      FETCH EVENTS
  ========================================= */

  const eventsQuery = useQuery({
    queryKey: [COLLECTION],

    queryFn: () =>
      dbApi.list(
        COLLECTION as any
      ) as Promise<Event[]>,
  });

  const events =
    eventsQuery.data ?? [];

  /* =========================================
      FILTER EVENTS
  ========================================= */

  const filteredEvents =
    useMemo(() => {

      return events.filter(
        (event) => {

          const search =
            filters.search === "" ||

            event.title
              .toLowerCase()
              .includes(
                filters.search.toLowerCase()
              ) ||

            event.description
              .toLowerCase()
              .includes(
                filters.search.toLowerCase()
              );

          const status =
            filters.status === "" ||

            filters.status === "all" ||

            event.status ===
              filters.status;

          const department =
            filters.department === "" ||

            event.department_id ===
              filters.department;

          return (
            search &&
            status &&
            department
          );

        }
      );

    }, [events, filters]);

  /* =========================================
      STATISTICS
  ========================================= */

  const stats: EventStats =
    useMemo(() => {

      return {

        total:
          events.length,

        upcoming:
          events.filter(
            (event) =>
              event.status ===
              "Upcoming"
          ).length,

        ongoing:
          events.filter(
            (event) =>
              event.status ===
              "Ongoing"
          ).length,

        completed:
          events.filter(
            (event) =>
              event.status ===
              "Completed"
          ).length,

        cancelled:
          events.filter(
            (event) =>
              event.status ===
              "Cancelled"
          ).length,

      };

    }, [events]);

  /* =========================================
      CREATE
  ========================================= */

  const createEvent =
    useMutation<
      Event,
      Error,
      EventFormData
    >({

      mutationFn: (data) =>
        dbApi.insert(
          COLLECTION as any,
          data
        ) as Promise<Event>,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [COLLECTION],
        });

      },

    });

  /* =========================================
      UPDATE
  ========================================= */

  const updateEvent =
    useMutation<
      Event,
      Error,
      {
        id: string;
        data: Partial<EventFormData>;
      }
    >({

      mutationFn: ({
        id,
        data,
      }) =>
        dbApi.update(
          COLLECTION as any,
          id,
          data
        ) as Promise<Event>,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [COLLECTION],
        });

      },

    });

  /* =========================================
      DELETE
  ========================================= */

  const deleteEvent =
    useMutation<
      boolean,
      Error,
      string
    >({

      mutationFn: (id) =>
        dbApi.delete(
          COLLECTION as any,
          id
        ),

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [COLLECTION],
        });

      },

    });

  return {

    events,

    filteredEvents,

    filters,

    setFilters,

    stats,

    isLoading:
      eventsQuery.isLoading,

    error:
      eventsQuery.error,

    createEvent,

    updateEvent,

    deleteEvent,

  };

}