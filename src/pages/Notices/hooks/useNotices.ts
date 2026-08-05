import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { dbApi } from "@/integrations/mongodb/api";

import {
  Notice,
  NoticeFilters,
  NoticeFormData,
  NoticeStats,
} from "../types";

const COLLECTION = "notices";

export function useNotices() {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<NoticeFilters>({
    search: "",
    status: "",
    priority: "",
    department: "",
  });

  const noticesQuery = useQuery({
    queryKey: [COLLECTION],
    queryFn: () => dbApi.list(COLLECTION as any) as Promise<Notice[]>,
  });

  const notices = noticesQuery.data ?? [];

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const search =
        filters.search === "" ||
        notice.title
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        notice.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const status =
        filters.status === "" ||
        filters.status === "all" ||
        notice.status === filters.status;

      const priority =
        filters.priority === "" ||
        filters.priority === "all" ||
        notice.priority === filters.priority;

      const department =
        !filters.department ||
        notice.department_id === filters.department;

      return (
        search &&
        status &&
        priority &&
        department
      );
    });
  }, [notices, filters]);

  const stats: NoticeStats = useMemo(() => {
    return {
      total: notices.length,

      published: notices.filter(
        (n) => n.status === "Published"
      ).length,

      draft: notices.filter(
        (n) => n.status === "Draft"
      ).length,

      archived: notices.filter(
        (n) => n.status === "Archived"
      ).length,

      pinned: notices.filter(
        (n) => n.is_pinned
      ).length,
    };
  }, [notices]);

  const createNotice = useMutation<
    Notice,
    Error,
    NoticeFormData
  >({
    mutationFn: (data) =>
      dbApi.insert(
        COLLECTION as any,
        data
      ) as Promise<Notice>,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COLLECTION],
      });
    },
  });

  const updateNotice = useMutation<
    Notice,
    Error,
    {
      id: string;
      data: Partial<NoticeFormData>;
    }
  >({
    mutationFn: ({ id, data }) =>
      dbApi.update(
        COLLECTION as any,
        id,
        data
      ) as Promise<Notice>,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COLLECTION],
      });
    },
  });

  const deleteNotice = useMutation<
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
    notices,

    filteredNotices,

    filters,

    setFilters,

    stats,

    isLoading: noticesQuery.isLoading,

    error: noticesQuery.error,

    createNotice,

    updateNotice,

    deleteNotice,
  };
}