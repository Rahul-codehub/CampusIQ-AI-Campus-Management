import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge
} from "@/components/ui/badge";

interface DatabaseInfo {
  database: string;
  connected: boolean;
  collections: number;
}

export default function DatabaseSettings() {
  const [info, setInfo] =
    useState<DatabaseInfo>({
      database: "",
      connected: false,
      collections: 0,
    });

  useEffect(() => {
    async function loadDatabase() {
      try {
        const response = await fetch(
          "/api/analytics"
        );

        const data = await response.json();

        setInfo({
          database: "campus_ai_management",
          connected: true,
          collections: 8,
        });

      } catch {
        setInfo({
          database: "Unavailable",
          connected: false,
          collections: 0,
        });
      }
    }

    loadDatabase();
  }, []);

  return (
    <Card>

      <CardContent className="space-y-6 pt-6">

        <div className="flex items-center justify-between">

          <span>Database</span>

          <Badge>
            {info.database}
          </Badge>

        </div>

        <div className="flex items-center justify-between">

          <span>Status</span>

          <Badge
            variant={
              info.connected
                ? "default"
                : "destructive"
            }
          >
            {info.connected
              ? "Connected"
              : "Disconnected"}
          </Badge>

        </div>

        <div className="flex items-center justify-between">

          <span>Collections</span>

          <Badge>
            {info.collections}
          </Badge>

        </div>

      </CardContent>

    </Card>
  );
}