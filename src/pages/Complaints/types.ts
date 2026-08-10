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
   CREATOR ROLE
========================================================== */

export type ComplaintCreatorRole =
  | "student"
  | "faculty"
  | "admin";


/* ==========================================================
   COMPLAINT
========================================================== */

export interface Complaint {
  id: string;

  /* -----------------------------------------
     CREATOR
  ----------------------------------------- */

  user_id: string;

  creator_role: ComplaintCreatorRole;


  /* -----------------------------------------
     COMPLAINT INFORMATION
  ----------------------------------------- */

  title: string;

  description: string;

  category: ComplaintCategory;

  priority: ComplaintPriority;


  /* -----------------------------------------
     STATUS
  ----------------------------------------- */

  status: ComplaintStatus;


  /* -----------------------------------------
     RESPONSE
  ----------------------------------------- */

  response: string | null;


  /* -----------------------------------------
     RESOLUTION
  ----------------------------------------- */

  resolved_by: string | null;

  resolved_at: string | null;


  /* -----------------------------------------
     TIMESTAMPS
  ----------------------------------------- */

  created_at: string;

  updated_at: string;
}


/* ==========================================================
   CREATE COMPLAINT FORM
========================================================== */

export interface ComplaintFormData {
  title: string;

  description: string;

  category: ComplaintCategory;

  priority: ComplaintPriority;
}