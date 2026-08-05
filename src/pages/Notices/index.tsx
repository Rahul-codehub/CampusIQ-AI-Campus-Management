import { useState } from "react";
import { Plus } from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useNotices } from "./hooks/useNotices";

import {
  Notice,
  NoticeFormData,
} from "./types";

import { NoticeStats } from "./components/NoticeStats";
import { NoticeTable } from "./components/NoticeTable";
import { NoticeDialog } from "./components/NoticeDialog";
import { NoticeDetails } from "./components/NoticeDetails";
import { DeleteNoticeDialog } from "./components/DeleteNoticeDialog";

export default function Notices() {

  /* =========================================
      DATA
  ========================================= */

  const {
    filteredNotices,
    stats,
    createNotice,
    updateNotice,
    deleteNotice,
  } = useNotices();

  /* =========================================
      STATES
  ========================================= */

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedNotice, setSelectedNotice] =
    useState<Notice | null>(null);

  /* =========================================
      HANDLERS
  ========================================= */

  const handleCreate = () => {
    setSelectedNotice(null);
    setDialogOpen(true);
  };

  const handleEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setDialogOpen(true);
  };

  const handleView = (notice: Notice) => {
    setSelectedNotice(notice);
    setDetailsOpen(true);
  };

  const handleDelete = (notice: Notice) => {
    setSelectedNotice(notice);
    setDeleteOpen(true);
  };

  const handleSubmit = async (
    data: NoticeFormData
  ) => {
    try {

      if (selectedNotice) {

        await updateNotice.mutateAsync({
          id: selectedNotice.id,
          data,
        });

      } else {

        await createNotice.mutateAsync(data);

      }

      setDialogOpen(false);
      setSelectedNotice(null);

    } catch (error) {

      console.error(error);

    }
  };

  const confirmDelete = async () => {

    if (!selectedNotice) return;

    try {

      await deleteNotice.mutateAsync(
        selectedNotice.id
      );

      setDeleteOpen(false);
      setSelectedNotice(null);

    } catch (error) {

      console.error(error);

    }
  };

  /* =========================================
      RENDER
  ========================================= */

  return (
    <AppLayout>

      <div className="space-y-6">

        <NoticeStats stats={stats} />

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Notice Management
            </h1>

            <p className="text-muted-foreground">
              Manage all notices
            </p>

          </div>

          <Button
            onClick={handleCreate}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Notice
          </Button>

        </div>

        <Card>

          <CardHeader>

            <div className="flex items-center justify-end">

              <span className="text-muted-foreground">

                {filteredNotices.length} Notice
                {filteredNotices.length !== 1
                  ? "s"
                  : ""}

              </span>

            </div>

          </CardHeader>

          <CardContent>

            <NoticeTable
              notices={filteredNotices}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </CardContent>

        </Card>

        <NoticeDialog
          open={dialogOpen}
          notice={selectedNotice}
          onOpenChange={(open) => {

            setDialogOpen(open);

            if (!open) {
              setSelectedNotice(null);
            }

          }}
          onSubmit={handleSubmit}
          isLoading={
            createNotice.isPending ||
            updateNotice.isPending
          }
        />

        <NoticeDetails
          open={detailsOpen}
          notice={selectedNotice}
          onOpenChange={(open) => {

            setDetailsOpen(open);

            if (!open) {
              setSelectedNotice(null);
            }

          }}
        />

        <DeleteNoticeDialog
          open={deleteOpen}
          notice={selectedNotice}
          onOpenChange={(open) => {

            setDeleteOpen(open);

            if (!open) {
              setSelectedNotice(null);
            }

          }}
          onConfirm={confirmDelete}
          isLoading={deleteNotice.isPending}
        />

      </div>

    </AppLayout>
  );
}