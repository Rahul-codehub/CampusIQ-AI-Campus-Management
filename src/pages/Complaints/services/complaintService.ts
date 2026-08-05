import { dbApi } from "@/integrations/mongodb/api";

import type {
  Complaint,
  ComplaintFormData,
  ComplaintStatus,
} from "../types";

const COLLECTION = "complaints" as const;

export const complaintService = {
  /* =========================================
     GET ALL COMPLAINTS
  ========================================= */

  async getAll(): Promise<Complaint[]> {
    return dbApi.list(COLLECTION);
  },

  /* =========================================
     GET COMPLAINT BY ID
  ========================================= */

  async getById(id: string): Promise<Complaint | null> {
    const complaints = await dbApi.list(COLLECTION, {
      filters: { id },
      limit: 1,
    });

    return complaints.length ? complaints[0] : null;
  },

  /* =========================================
     GET USER COMPLAINTS
  ========================================= */

  async getUserComplaints(user_id: string) {
    return dbApi.list(COLLECTION, {
      filters: {
        user_id,
      },
    });
  },

  /* =========================================
     CREATE COMPLAINT
  ========================================= */

  async create(
    payload: ComplaintFormData & {
      user_id: string;
    }
  ) {
    return dbApi.insert(COLLECTION, {
      ...payload,

      status: "pending",

      response: null,

      created_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    });
  },

  /* =========================================
     UPDATE COMPLAINT
  ========================================= */

  async update(
    id: string,
    payload: Partial<Complaint>
  ) {
    return dbApi.update(
      COLLECTION,
      id,
      {
        ...payload,
        updated_at: new Date().toISOString(),
      }
    );
  },

  /* =========================================
     UPDATE STATUS
  ========================================= */

  async updateStatus(
    id: string,
    status: ComplaintStatus,
    response?: string
  ) {
    return dbApi.update(
      COLLECTION,
      id,
      {
        status,
        response: response ?? null,
        updated_at: new Date().toISOString(),
      }
    );
  },

  /* =========================================
     DELETE COMPLAINT
  ========================================= */

  async delete(id: string) {
    return dbApi.delete(COLLECTION, id);
  },

  /* =========================================
     COUNT
  ========================================= */

  async count() {
    return dbApi.count(COLLECTION);
  },
};