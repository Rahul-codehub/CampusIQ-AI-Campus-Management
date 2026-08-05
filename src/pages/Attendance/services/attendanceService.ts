import { dbApi } from "@/integrations/mongodb/api";

import type { Tables } from "@/integrations/mongodb/types";

export const attendanceService = {
  /* ================================
     GET ATTENDANCE
  ================================ */

  async getAttendance() {
    return dbApi.list("attendance", {
      sort: "date:desc",
    });
  },
/* ================================
   GET STUDENT ATTENDANCE
================================ */

async getStudentAttendance(
  studentId: string
) {
  return dbApi.list("attendance", {
    sort: "date:desc",
    filters: {
      student_id: studentId,
    },
  });
},

  /* ================================
     GET STUDENTS
  ================================ */

  async getStudents() {
    return dbApi.list("students");
  },

  /* ================================
     GET COURSES
  ================================ */

  async getCourses() {
    return dbApi.list("courses");
  },

  /* ================================
     GET DEPARTMENTS
  ================================ */

  async getDepartments() {
    return dbApi.list("departments");
  },

  /* ================================
     CREATE ATTENDANCE
  ================================ */

  async createAttendance(
    payload: Partial<Tables<"attendance">>
  ) {
    return dbApi.insert(
      "attendance",
      payload
    );
  },

  /* ================================
     UPDATE ATTENDANCE
  ================================ */

  async updateAttendance(
    id: string,
    payload: Partial<Tables<"attendance">>
  ) {
    return dbApi.update(
      "attendance",
      id,
      payload
    );
  },

  /* ================================
     DELETE ATTENDANCE
  ================================ */

  async deleteAttendance(
    id: string
  ) {
    return dbApi.delete(
      "attendance",
      id
    );
  },
};