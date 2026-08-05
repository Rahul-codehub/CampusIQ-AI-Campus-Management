export type AppRole = "admin" | "student" | "faculty";

export interface Profile {
  full_name: string;

  avatar_url: string | null;

  phone: string | null;

  student_id?: string;

  mobile?: string;
}
export interface AppUser {
  id: string;
  email: string;
  roles: AppRole[];

  status: "pending" | "active" | "rejected" | "blocked";

  approved_by?: string | null;
  approved_at?: string | null;

  rejected_by?: string | null;
  rejected_at?: string | null;

  profile: Profile;
}

export interface RegistrationRequest {
  id: string;

  full_name: string;

  email: string;

  password_hash: string;

  role: AppRole;

  status: "pending" | "approved" | "rejected";

  approved_by: string | null;
  approved_at: string | null;

  rejected_by: string | null;
  rejected_at: string | null;

  created_at: string;
}


export interface Session {
  access_token?: string;
  user: AppUser;
}


export interface Department {
  id: string;
  name: string;
  code: string;
  head_name: string | null;
  created_at: string;
}

export interface Student {
  id: string;
  user_id: string | null;
  student_id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  department_id: string | null;
  semester: number;
  enrollment_year: number;
  status: "active" | "inactive" | "graduated" | "suspended";
  created_at: string;
  updated_at: string;
}

export interface Faculty {
  id: string;
  user_id: string | null;
  faculty_id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  department_id: string | null;
  designation: string;
  specialization: string | null;
  status: "active" | "inactive" | "on_leave";
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  course_code: string;
  name: string;
  department_id: string | null;
  faculty_id: string | null;
  semester: number;
  credits: number;
  max_students: number;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  course_id: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  marked_by: string | null;
  created_at: string;
}

export interface Complaint {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: "academic" | "infrastructure" | "hostel" | "faculty" | "general";
  status: "pending" | "in_progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high" | "urgent";
  response: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: "academic" | "exam" | "event" | "holiday" | "general";
  posted_by: string;
  is_pinned: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  category: "academic" | "cultural" | "sports" | "workshop" | "seminar" | "general";
  organizer: string | null;
  max_participants: number | null;
  created_by: string | null;
  created_at: string;
}

export interface ChatbotLog {
  id: string;
  user_id: string;
  message: string;
  response: string;
  category: string | null;
  created_at: string;
}

export interface DatabaseTables {
  users: AppUser;
  registration_requests: RegistrationRequest;
  departments: Department;
  students: Student;
  faculty: Faculty;
  courses: Course;
  attendance: Attendance;
  complaints: Complaint;
  notices: Notice;
  events: Event;
  chatbot_logs: ChatbotLog;
}

export type CollectionName = keyof DatabaseTables;
export type Tables<T extends CollectionName> = DatabaseTables[T];
