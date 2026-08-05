import { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
  });

  function updateSetting(
    key: keyof typeof settings
  ) {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">

        <div className="flex items-center justify-between">

          <div>

            <Label>Email Notifications</Label>

            <p className="text-sm text-muted-foreground">
              Receive important updates via email.
            </p>

          </div>

          <Switch
            checked={settings.email}
            onCheckedChange={() =>
              updateSetting("email")
            }
          />

        </div>

        <div className="flex items-center justify-between">

          <div>

            <Label>Push Notifications</Label>

            <p className="text-sm text-muted-foreground">
              Receive browser notifications.
            </p>

          </div>

          <Switch
            checked={settings.push}
            onCheckedChange={() =>
              updateSetting("push")
            }
          />

        </div>

        <div className="flex items-center justify-between">

          <div>

            <Label>SMS Notifications</Label>

            <p className="text-sm text-muted-foreground">
              Receive SMS alerts.
            </p>

          </div>

          <Switch
            checked={settings.sms}
            onCheckedChange={() =>
              updateSetting("sms")
            }
          />

        </div>

        <Button>
          Save Notification Settings
        </Button>

      </CardContent>
    </Card>
  );
}