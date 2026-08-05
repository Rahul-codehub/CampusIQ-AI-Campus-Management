export type EventStatus =
  | "Upcoming"
  | "Ongoing"
  | "Completed"
  | "Cancelled";

export interface Event {
  id: string;

  title: string;

  description: string;

  department_id: string | null;

  venue: string;

  organizer: string;

  event_date: string;

  start_time: string;

  end_time: string;

  max_participants: number;

  status: EventStatus;

  is_featured: boolean;

  created_by: string;

  created_at: string;

  updated_at: string;
}

export interface EventFormData {
  title: string;

  description: string;

  department_id: string;

  venue: string;

  organizer: string;

  event_date: string;

  start_time: string;

  end_time: string;

  max_participants: number;

  status: EventStatus;

  is_featured: boolean;
}

export interface EventFilters {
  search: string;

  status: string;

  department: string;
}

export interface EventStats {
  total: number;

  upcoming: number;

  ongoing: number;

  completed: number;

  cancelled: number;
}