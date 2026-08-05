import { changePassword } from "../services/securityService";
import { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecuritySettings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function updateField(
    key: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleChangePassword() {
    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (
      form.newPassword !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await changePassword(
        form.currentPassword,
        form.newPassword
      );
 
      alert("Password updated successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      alert(
        error.message ||
        "Unable to change password."
      );
    }
  }

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">

        <div>
          <Label>Current Password</Label>
          <Input
            type="password"
            value={form.currentPassword}
            onChange={(e) =>
              updateField(
                "currentPassword",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              updateField(
                "newPassword",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              updateField(
                "confirmPassword",
                e.target.value
              )
            }
          />
        </div>

        <Button
          onClick={handleChangePassword}
        >
          Update Password
        </Button>

      </CardContent>
    </Card>
  );
}