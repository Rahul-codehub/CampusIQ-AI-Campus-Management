import { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Database,
  Download,
  Upload,
  Clock,
} from "lucide-react";

export default function BackupSettings() {
  const [lastBackup] = useState(
    new Date().toLocaleString()
  );

  const [autoBackup, setAutoBackup] =
    useState(true);

  function handleDownloadBackup() {
    alert(
      "Database backup download will be implemented."
    );
  }

  function handleRestoreBackup() {
    alert(
      "Restore backup will be implemented."
    );
  }

  function toggleAutoBackup() {
    setAutoBackup(!autoBackup);
  }

  return (
    <Card>
      <CardContent className="space-y-8 pt-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Database className="h-5 w-5 text-primary" />

            <div>

              <p className="font-medium">
                Last Backup
              </p>

              <p className="text-sm text-muted-foreground">
                {lastBackup}
              </p>

            </div>

          </div>

          <Badge>
            Successful
          </Badge>

        </div>

        <div className="flex items-center justify-between">

          <div>

            <p className="font-medium">
              Automatic Backup
            </p>

            <p className="text-sm text-muted-foreground">
              Daily backup of CampusIQ database
            </p>

          </div>

          <Button
            variant={
              autoBackup
                ? "default"
                : "outline"
            }
            onClick={toggleAutoBackup}
          >
            {autoBackup
              ? "Enabled"
              : "Disabled"}
          </Button>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <Button
            onClick={handleDownloadBackup}
          >
            <Download className="mr-2 h-4 w-4" />

            Download Backup
          </Button>

          <Button
            variant="outline"
            onClick={handleRestoreBackup}
          >
            <Upload className="mr-2 h-4 w-4" />

            Restore Backup
          </Button>

        </div>

        <div className="rounded-lg border bg-muted/30 p-4">

          <div className="flex items-center gap-2">

            <Clock className="h-4 w-4" />

            <span className="font-medium">
              Backup Schedule
            </span>

          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Automatic backups run every day
            at 02:00 AM.
          </p>

        </div>

      </CardContent>
    </Card>
  );
}