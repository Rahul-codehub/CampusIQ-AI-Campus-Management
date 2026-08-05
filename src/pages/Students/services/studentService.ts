import { dbApi } from "@/integrations/mongodb/api";

export const studentService = {
  async getStudents() {
    return dbApi.list("students", {
      sort: "created_at:desc",
      
   
   });
   
  },

  async getDepartments() {
    return dbApi.list("departments");
  },

  async createStudent(payload: any) {
    return dbApi.insert("students", payload);
  },
  async updateStudent(
    id: string,
    payload: any
  ) {
    return dbApi.update(
      "students",
      id,
      payload
    );
  },
  
async deleteStudent(id: string) {
  return dbApi.delete("students", id);
},
  
};
