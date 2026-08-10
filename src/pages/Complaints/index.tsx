
import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Plus } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import { useComplaints } from "./hooks/useComplaints";

import type {
  Complaint,
  ComplaintFormData,
} from "./types";

import ComplaintStats from "./components/ComplaintStats";
import ComplaintFilters from "./components/ComplaintFilters";
import ComplaintTable from "./components/ComplaintTable";
import ComplaintDialog from "./components/ComplaintDialog";
import ComplaintDetails from "./components/ComplaintDetails";
import DeleteComplaintDialog from "./components/DeleteComplaintDialog";

export default function ComplaintsPage() {
  const {
    user,
    roles,
  } = useAuth();

  const {
    complaints,
    loading,
    createComplaint,
    updateComplaint,
    updateStatus,
    deleteComplaint,
  } = useComplaints();

  /* ==========================================
     ROLE
  ========================================== */

  const isAdmin = roles.includes("admin");
  const isFaculty = roles.includes("faculty");
  const isStudent = roles.includes("student");

  /* ==========================================
     SEARCH & FILTER
  ========================================== */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  /* ==========================================
     DIALOGS
  ========================================== */

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  /* ==========================================
     ROLE BASED PERMISSIONS
  ========================================== */

  const canEditComplaint = (
    complaint: Complaint
  ) => {
    if (isAdmin) return true;

    if (isFaculty) {
      return (
        complaint.creator_role === "faculty" &&
        complaint.user_id === user?.id
      );
    }

    return false;
  };

  const canDeleteComplaint = (
    complaint: Complaint
  ) => {
    if (isAdmin) return true;

    if (isFaculty) {
      return (
        complaint.creator_role === "faculty" &&
        complaint.user_id === user?.id
      );
    }

    return false;
  };

  const canResolveComplaint = (
    complaint: Complaint
  ) => {
    if (isAdmin) return true;

    if (isFaculty) {
      return (
        complaint.creator_role === "student"
      );
    }

    return false;
  };

  /* ==========================================
     FILTERED DATA
  ========================================== */

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        complaint.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        complaint.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        complaint.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    complaints,
    search,
    statusFilter,
    priorityFilter,
  ]);

  /* ==========================================
     CREATE
  ========================================== */

  const handleCreate = async (
    data: ComplaintFormData
  ) => {
    if (!user?.id) {
      return;
    }

    await createComplaint({
      ...data,
      user_id: user.id,
    });

    setDialogOpen(false);
  };

  /* ==========================================
     UPDATE
  ========================================== */

  const handleUpdate = async (
    data: ComplaintFormData
  ) => {
    if (!selectedComplaint) return;

    await updateComplaint(
      selectedComplaint.id,
      data
    );

    setSelectedComplaint(null);
    setDialogOpen(false);
  };

  /* ==========================================
     RESOLVE
  ========================================== */

  const handleResolve = async (
    complaint: Complaint
  ) => {
    if (!canResolveComplaint(complaint)) {
      return;
    }

    await updateStatus(
      complaint.id,
      "resolved",
      "Complaint reviewed and resolved."
    );
  };

  /* ==========================================
     DELETE
  ========================================== */

  const handleDelete = async () => {
    if (!selectedComplaint) return;

    await deleteComplaint(
      selectedComplaint.id
    );

    setSelectedComplaint(null);
    setDeleteOpen(false);
  };

  /* ==========================================
     PAGE TEXT
  ========================================== */

  const pageTitle =
    isStudent
      ? "My Complaints"
      : isFaculty
      ? "Campus Complaints"
      : "Complaint Management";

  const pageDescription =
    isStudent
      ? "Submit and track your complaints."
      : isFaculty
      ? "Review student complaints and manage your own complaints."
      : "Manage and monitor all campus complaints.";

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* ===========================
            PAGE HEADER
        ============================ */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              {pageTitle}
            </h1>

            <p className="text-muted-foreground">
              {pageDescription}
            </p>

          </div>

          <Button
            onClick={() => {
              setSelectedComplaint(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Complaint
          </Button>

        </div>

        {/* ===========================
            STATISTICS
        ============================ */}

        <ComplaintStats
          complaints={complaints}
        />

        {/* ===========================
            TABLE CARD
        ============================ */}

        <Card>

          <CardHeader>

            <ComplaintFilters
              search={search}
              status={statusFilter}
              priority={priorityFilter}
              total={filteredComplaints.length}
              onSearchChange={setSearch}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
            />

          </CardHeader>

          <CardContent>

            <ComplaintTable
              complaints={filteredComplaints}
              loading={loading}

              canEdit={canEditComplaint}
              canDelete={canDeleteComplaint}
              canResolve={canResolveComplaint}

              onView={(complaint) => {
                setSelectedComplaint(
                  complaint
                );

                setDetailsOpen(true);
              }}

              onEdit={(complaint) => {
                setSelectedComplaint(
                  complaint
                );

                setDialogOpen(true);
              }}

              onDelete={(complaint) => {
                setSelectedComplaint(
                  complaint
                );

                setDeleteOpen(true);
              }}

              onResolve={handleResolve}
            />

          </CardContent>

        </Card>

        {/* ===========================
            CREATE / EDIT DIALOG
        ============================ */}

        <ComplaintDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          complaint={
            selectedComplaint ?? undefined
          }
          onSubmit={
            selectedComplaint
              ? handleUpdate
              : handleCreate
          }
        />

        {/* ===========================
            DETAILS DIALOG
        ============================ */}

        <ComplaintDetails
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          complaint={selectedComplaint}
        />

        {/* ===========================
            DELETE DIALOG
        ============================ */}

        <DeleteComplaintDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          complaint={selectedComplaint}
          onDelete={handleDelete}
        />

      </div>
    </AppLayout>
  );
}