import { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SystemSettings() {
  const [system, setSystem] = useState({
    campusName: "CampusIQ University",
    academicYear: "2026-2027",
    semester: "Odd Semester",
    timezone: "Asia/Kolkata",
  });

  function updateField(
    key: keyof typeof system,
    value: string
  ) {
    setSystem((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">

        <div>
          <Label>Campus Name</Label>
          <Input
            value={system.campusName}
            onChange={(e) =>
              updateField("campusName", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Academic Year</Label>
          <Input
            value={system.academicYear}
            onChange={(e) =>
              updateField("academicYear", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Current Semester</Label>
          <Input
            value={system.semester}
            onChange={(e) =>
              updateField("semester", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Time Zone</Label>
          <Input
            value={system.timezone}
            onChange={(e) =>
              updateField("timezone", e.target.value)
            }
          />
        </div>

        <Button>
          Save System Settings
        </Button>

      </CardContent>
    </Card>
  );
}