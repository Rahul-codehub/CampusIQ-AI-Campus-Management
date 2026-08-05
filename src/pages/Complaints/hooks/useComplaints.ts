import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { complaintService } from "../services/complaintService";

import type {
  Complaint,
  ComplaintFormData,
  ComplaintStatus,
} from "../types";

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  const loadComplaints = useCallback(async () => {
    setLoading(true);

    try {
      const data = await complaintService.getAll();
      setComplaints(data);
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to load complaints."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadComplaints();
  }, [loadComplaints]);

  /* ============================
     CREATE
  ============================ */

  const createComplaint = async (
    payload: ComplaintFormData & {
      user_id: string;
    }
  ) => {
    try {
      await complaintService.create(payload);

      toast.success(
        "Complaint submitted successfully."
      );

      await loadComplaints();
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to submit complaint."
      );
      throw error;
    }
  };

  /* ============================
     UPDATE
  ============================ */

  const updateComplaint = async (
    id: string,
    payload: Partial<Complaint>
  ) => {
    try {
      await complaintService.update(id, payload);

      toast.success(
        "Complaint updated successfully."
      );

      await loadComplaints();
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to update complaint."
      );
      throw error;
    }
  };

  /* ============================
     UPDATE STATUS
  ============================ */

  const updateStatus = async (
    id: string,
    status: ComplaintStatus,
    response?: string
  ) => {
    try {
      await complaintService.updateStatus(
        id,
        status,
        response
      );

      toast.success(
        "Complaint status updated."
      );

      await loadComplaints();
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to update status."
      );
      throw error;
    }
  };

  /* ============================
     DELETE
  ============================ */

  const deleteComplaint = async (
    id: string
  ) => {
    try {
      await complaintService.delete(id);

      toast.success(
        "Complaint deleted successfully."
      );

      await loadComplaints();
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to delete complaint."
      );
      throw error;
    }
  };

  return {
    complaints,
    loading,

    loadComplaints,

    createComplaint,

    updateComplaint,

    updateStatus,

    deleteComplaint,
  };
}