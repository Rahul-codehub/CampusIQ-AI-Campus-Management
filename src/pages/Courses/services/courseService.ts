import { dbApi } from "@/integrations/mongodb/api";

import type { Tables } from "@/integrations/mongodb/types";

export const courseService = {
  /* ================================
     GET COURSES
  ================================ */

  async getCourses() {
    return dbApi.list("courses", {
      sort: "created_at:desc",
    });
  },

  /* ================================
     GET DEPARTMENTS
  ================================ */

  async getDepartments() {
    return dbApi.list("departments");
  },

  /* ================================
     GET FACULTY
  ================================ */

  async getFaculty() {
    return dbApi.list("faculty");
  },

  /* ================================
     CREATE COURSE
  ================================ */

  async createCourse(
    payload: Partial<Tables<"courses">>
  ) {
    return dbApi.insert(
      "courses",
      payload
    );
  },

  /* ================================
     UPDATE COURSE
  ================================ */

  async updateCourse(
    id: string,
    payload: Partial<Tables<"courses">>
  ) {
    return dbApi.update(
      "courses",
      id,
      payload
    );
  },

  /* ================================
     DELETE COURSE
  ================================ */

  async deleteCourse(
    id: string
  ) {
    return dbApi.delete(
      "courses",
      id
    );
  },
};