/* ==========================================================
   COMPLAINT STATUS
========================================================== */

export type ComplaintStatus =
  | "pending"
  | "in_progress"
  | "resolved"
  | "rejected";

/* ==========================================================
   PRIORITY
========================================================== */

export type ComplaintPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent";

/* ==========================================================
   CATEGORY
========================================================== */

export type ComplaintCategory =
  | "academic"
  | "faculty"
  | "hostel"
  | "infrastructure"
  | "general";

/* ==========================================================
   COMPLAINT
========================================================== */

export interface Complaint {
  id: string;

  user_id: string;

  title: string;

  description: string;

  category: ComplaintCategory;

  priority: ComplaintPriority;

  status: ComplaintStatus;

  response: string | null;

  created_at: string;

  updated_at: string;
}

/* ==========================================================
   CREATE / UPDATE FORM
========================================================== */

export interface ComplaintFormData {
  title: string;

  description: string;

  category: ComplaintCategory;

  priority: ComplaintPriority;
}