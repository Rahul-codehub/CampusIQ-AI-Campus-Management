import type {
  AppUser,
  Attendance,
  Complaint,
  Course,
  Department,
  Event,
  Faculty,
  Notice,
  Student,
} from "./types";

/*
 * CampusIQ Demo Data
 *
 * IMPORTANT:
 * These are fictional records created only for
 * the public CampusIQ demonstration.
 *
 * No real university/student data is used here.
 */

const DEMO_DATE = "2026-09-01T10:00:00.000Z";

export const DEMO_USERS: AppUser[] = [
  {
    id: "demo-user-student-001",

    email:
      "demo.student@campusiq.demo",

    roles: ["student"],

    status: "active",

    approved_by: "demo-admin-001",

    approved_at: DEMO_DATE,

    rejected_by: null,

    rejected_at: null,

    profile: {
      full_name:
        "Aarav Sharma",

      avatar_url: null,

      phone:
        "9000000001",

      student_id:
        "DEMO-STU-001",
    },
  },

  {
    id: "demo-user-faculty-001",

    email:
      "demo.faculty@campusiq.demo",

    roles: ["faculty"],

    status: "active",

    approved_by: "demo-admin-001",

    approved_at: DEMO_DATE,

    rejected_by: null,

    rejected_at: null,

    profile: {
      full_name:
        "Dr. Neha Verma",

      avatar_url: null,

      phone:
        "9000000002",
    },
  },

  {
    id: "demo-user-admin-001",

    email:
      "demo.admin@campusiq.demo",

    roles: ["admin"],

    status: "active",

    approved_by: null,

    approved_at: null,

    rejected_by: null,

    rejected_at: null,

    profile: {
      full_name:
        "CampusIQ Demo Administrator",

      avatar_url: null,

      phone:
        "9000000003",
    },
  },
];

/* =========================================
   DEPARTMENTS
========================================= */

export const DEMO_DEPARTMENTS: Department[] = [
  {
    id: "demo-dept-cse",

    name:
      "Computer Science & Engineering",

    code:
      "CSE",

    head_name:
      "Dr. Anil Mehta",

    created_at:
      DEMO_DATE,
  },

  {
    id: "demo-dept-ai",

    name:
      "Artificial Intelligence & Data Science",

    code:
      "AIDS",

    head_name:
      "Dr. Priya Kapoor",

    created_at:
      DEMO_DATE,
  },

  {
    id: "demo-dept-it",

    name:
      "Information Technology",

    code:
      "IT",

    head_name:
      "Dr. Rajiv Malhotra",

    created_at:
      DEMO_DATE,
  },
];

/* =========================================
   STUDENTS
========================================= */

export const DEMO_STUDENTS: Student[] = [
  {
    id:
      "demo-student-001",

    user_id:
      "demo-user-student-001",

    student_id:
      "DEMO-STU-001",

    full_name:
      "Aarav Sharma",

    email:
      "demo.student@campusiq.demo",

    mobile:
      "9000000001",

    department_id:
      "demo-dept-cse",

    semester:
      7,

    enrollment_year:
      2023,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-student-002",

    user_id:
      null,

    student_id:
      "DEMO-STU-002",

    full_name:
      "Priya Singh",

    email:
      "priya.demo@campusiq.demo",

    mobile:
      "9000000010",

    department_id:
      "demo-dept-cse",

    semester:
      7,

    enrollment_year:
      2023,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-student-003",

    user_id:
      null,

    student_id:
      "DEMO-STU-003",

    full_name:
      "Rohan Gupta",

    email:
      "rohan.demo@campusiq.demo",

    mobile:
      "9000000011",

    department_id:
      "demo-dept-cse",

    semester:
      7,

    enrollment_year:
      2023,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-student-004",

    user_id:
      null,

    student_id:
      "DEMO-STU-004",

    full_name:
      "Ananya Verma",

    email:
      "ananya.demo@campusiq.demo",

    mobile:
      "9000000012",

    department_id:
      "demo-dept-ai",

    semester:
      7,

    enrollment_year:
      2023,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-student-005",

    user_id:
      null,

    student_id:
      "DEMO-STU-005",

    full_name:
      "Karan Mehta",

    email:
      "karan.demo@campusiq.demo",

    mobile:
      "9000000013",

    department_id:
      "demo-dept-it",

    semester:
      5,

    enrollment_year:
      2024,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },
];

/* =========================================
   FACULTY
========================================= */

export const DEMO_FACULTY: Faculty[] = [
  {
    id:
      "demo-faculty-001",

    user_id:
      "demo-user-faculty-001",

    faculty_id:
      "DEMO-FAC-001",

    full_name:
      "Dr. Neha Verma",

    email:
      "demo.faculty@campusiq.demo",

    mobile:
      "9000000002",

    department_id:
      "demo-dept-cse",

    designation:
      "Assistant Professor",

    specialization:
      "Artificial Intelligence & Machine Learning",

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-faculty-002",

    user_id:
      null,

    faculty_id:
      "DEMO-FAC-002",

    full_name:
      "Dr. Amit Kumar",

    email:
      "amit.faculty@campusiq.demo",

    mobile:
      "9000000020",

    department_id:
      "demo-dept-cse",

    designation:
      "Associate Professor",

    specialization:
      "Computer Networks",

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-faculty-003",

    user_id:
      null,

    faculty_id:
      "DEMO-FAC-003",

    full_name:
      "Dr. Sneha Kapoor",

    email:
      "sneha.faculty@campusiq.demo",

    mobile:
      "9000000021",

    department_id:
      "demo-dept-ai",

    designation:
      "Assistant Professor",

    specialization:
      "Data Science",

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },
];

/* =========================================
   COURSES
========================================= */

export const DEMO_COURSES: Course[] = [
  {
    id:
      "demo-course-001",

    course_code:
      "CSE701",

    name:
      "Machine Learning",

    department_id:
      "demo-dept-cse",

    faculty_id:
      "demo-faculty-001",

    semester:
      7,

    credits:
      4,

    max_students:
      60,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-course-002",

    course_code:
      "CSE702",

    name:
      "Cloud Computing",

    department_id:
      "demo-dept-cse",

    faculty_id:
      "demo-faculty-002",

    semester:
      7,

    credits:
      4,

    max_students:
      60,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-course-003",

    course_code:
      "CSE703",

    name:
      "Artificial Intelligence",

    department_id:
      "demo-dept-cse",

    faculty_id:
      "demo-faculty-001",

    semester:
      7,

    credits:
      4,

    max_students:
      60,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-course-004",

    course_code:
      "CSE704",

    name:
      "Software Engineering",

    department_id:
      "demo-dept-cse",

    faculty_id:
      "demo-faculty-002",

    semester:
      7,

    credits:
      3,

    max_students:
      60,

    status:
      "active",

    created_at:
      DEMO_DATE,

    updated_at:
      DEMO_DATE,
  },
];

/* =========================================
   ATTENDANCE
========================================= */

export const DEMO_ATTENDANCE: Attendance[] = [
  {
    id:
      "demo-attendance-001",

    student_id:
      "demo-student-001",

    course_id:
      "demo-course-001",

    date:
      "2026-08-25",

    status:
      "present",

    marked_by:
      "demo-faculty-001",

    created_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-attendance-002",

    student_id:
      "demo-student-001",

    course_id:
      "demo-course-001",

    date:
      "2026-08-26",

    status:
      "present",

    marked_by:
      "demo-faculty-001",

    created_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-attendance-003",

    student_id:
      "demo-student-001",

    course_id:
      "demo-course-001",

    date:
      "2026-08-27",

    status:
      "absent",

    marked_by:
      "demo-faculty-001",

    created_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-attendance-004",

    student_id:
      "demo-student-001",

    course_id:
      "demo-course-002",

    date:
      "2026-08-25",

    status:
      "present",

    marked_by:
      "demo-faculty-002",

    created_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-attendance-005",

    student_id:
      "demo-student-001",

    course_id:
      "demo-course-002",

    date:
      "2026-08-26",

    status:
      "late",

    marked_by:
      "demo-faculty-002",

    created_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-attendance-006",

    student_id:
      "demo-student-001",

    course_id:
      "demo-course-003",

    date:
      "2026-08-27",

    status:
      "present",

    marked_by:
      "demo-faculty-001",

    created_at:
      DEMO_DATE,
  },
];

/* =========================================
   COMPLAINTS
========================================= */

export const DEMO_COMPLAINTS: Complaint[] = [
  {
    id:
      "demo-complaint-001",

    user_id:
      "demo-user-student-001",

    title:
      "Library Wi-Fi connectivity issue",

    description:
      "The Wi-Fi connection in the library reading area is unstable during peak hours.",

    category:
      "infrastructure",

    status:
      "in_progress",

    priority:
      "medium",

    response:
      "The technical team has been notified and is checking the access point.",

    created_at:
      "2026-08-28T09:30:00.000Z",

    updated_at:
      "2026-08-29T11:00:00.000Z",
  },

  {
    id:
      "demo-complaint-002",

    user_id:
      "demo-student-002",

    title:
      "Assignment submission clarification",

    description:
      "Request for clarification regarding the final submission deadline.",

    category:
      "academic",

    status:
      "resolved",

    priority:
      "low",

    response:
      "The submission deadline is available in the course notice.",

    created_at:
      "2026-08-25T08:30:00.000Z",

    updated_at:
      "2026-08-26T10:00:00.000Z",
  },

  {
    id:
      "demo-complaint-003",

    user_id:
      "demo-student-003",

    title:
      "Classroom projector issue",

    description:
      "The projector in the assigned classroom is not displaying the presentation correctly.",

    category:
      "infrastructure",

    status:
      "pending",

    priority:
      "high",

    response:
      null,

    created_at:
      "2026-09-01T07:45:00.000Z",

    updated_at:
      "2026-09-01T07:45:00.000Z",
  },
];

/* =========================================
   NOTICES
========================================= */

export const DEMO_NOTICES: Notice[] = [
  {
    id:
      "demo-notice-001",

    title:
      "Mid-Semester Examination Schedule",

    content:
      "The mid-semester examination schedule has been published. Students are requested to check the academic calendar.",

    category:
      "exam",

    posted_by:
      "CampusIQ Demo Administrator",

    is_pinned:
      true,

    expires_at:
      "2026-10-15T23:59:59.000Z",

    created_at:
      "2026-09-01T09:00:00.000Z",
  },

  {
    id:
      "demo-notice-002",

    title:
      "Campus Placement Drive",

    content:
      "A demo placement drive has been scheduled for eligible final-year students.",

    category:
      "event",

    posted_by:
      "CampusIQ Demo Administrator",

    is_pinned:
      true,

    expires_at:
      "2026-10-10T23:59:59.000Z",

    created_at:
      "2026-08-30T10:00:00.000Z",
  },

  {
    id:
      "demo-notice-003",

    title:
      "Library Timing Update",

    content:
      "The library will remain open until 8:00 PM on working days.",

    category:
      "general",

    posted_by:
      "CampusIQ Demo Administrator",

    is_pinned:
      false,

    expires_at:
      null,

    created_at:
      "2026-08-28T12:00:00.000Z",
  },
];

/* =========================================
   EVENTS
========================================= */

export const DEMO_EVENTS: Event[] = [
  {
    id:
      "demo-event-001",

    title:
      "AI & Future Technology Seminar",

    description:
      "A demonstration seminar covering artificial intelligence, emerging technologies and industry trends.",

    event_date:
      "2026-09-25T10:00:00.000Z",

    location:
      "Main Auditorium",

    category:
      "seminar",

    organizer:
      "Department of CSE",

    max_participants:
      150,

    created_by:
      "demo-user-admin-001",

    created_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-event-002",

    title:
      "Inter-Department Coding Workshop",

    description:
      "A practical coding workshop for students interested in competitive programming and software development.",

    event_date:
      "2026-09-28T11:00:00.000Z",

    location:
      "Computer Lab 2",

    category:
      "workshop",

    organizer:
      "Computer Science Club",

    max_participants:
      80,

    created_by:
      "demo-user-faculty-001",

    created_at:
      DEMO_DATE,
  },

  {
    id:
      "demo-event-003",

    title:
      "Campus Sports Meet",

    description:
      "Annual inter-department sports activities for students.",

    event_date:
      "2026-10-03T09:00:00.000Z",

    location:
      "University Sports Ground",

    category:
      "sports",

    organizer:
      "Student Activity Council",

    max_participants:
      200,

    created_by:
      "demo-user-admin-001",

    created_at:
      DEMO_DATE,
  },
];

/* =========================================
   DEMO COLLECTION MAP
========================================= */

export const DEMO_DATA = {
  users:
    DEMO_USERS,

  departments:
    DEMO_DEPARTMENTS,

  students:
    DEMO_STUDENTS,

  faculty:
    DEMO_FACULTY,

  courses:
    DEMO_COURSES,

  attendance:
    DEMO_ATTENDANCE,

  complaints:
    DEMO_COMPLAINTS,

  notices:
    DEMO_NOTICES,

  events:
    DEMO_EVENTS,

  registration_requests: [],

  chatbot_logs: [],
};