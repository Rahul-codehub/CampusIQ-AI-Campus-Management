import { dbApi } from "@/integrations/mongodb/api";

import type { Tables } from "@/integrations/mongodb/types";

export const facultyService = {
  async getFaculty() {
    return dbApi.list("faculty", {
      sort: "created_at:desc",
    });
  },

  async getDepartments() {
    return dbApi.list("departments");
  },

  async createFaculty(
    payload: Partial<Tables<"faculty">>
  ) {
    return dbApi.insert(
      "faculty",
      payload
    );
  },

  async updateFaculty(
    id: string,
    payload: Partial<Tables<"faculty">>
  ) {
    return dbApi.update(
      "faculty",
      id,
      payload
    );
  },

  async deleteFaculty(id: string) {
    return dbApi.delete(
      "faculty",
      id
    );
  },
};