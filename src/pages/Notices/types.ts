export type NoticePriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export type NoticeStatus =
  | "Draft"
  | "Published"
  | "Archived";

export interface Notice {
  id: string;

  title: string;

  description: string;

  department_id?: string;

  created_by: string;

  created_by_name: string;

  priority: NoticePriority;

  status: NoticeStatus;

  is_pinned: boolean;

  publish_date: string;

  expiry_date?: string;

  created_at: string;

  updated_at: string;
}

export interface NoticeFormData {
  title: string;

  description: string;

  department_id?: string;

  priority: NoticePriority;

  status: NoticeStatus;

  is_pinned: boolean;

  publish_date: string;

  expiry_date?: string;
}

export interface NoticeFilters {
  search: string;

  status: string;

  priority: string;

  department: string;
}

export interface NoticeStats {
  total: number;

  published: number;

  draft: number;

  archived: number;

  pinned: number;
}