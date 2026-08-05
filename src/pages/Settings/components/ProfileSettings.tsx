import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfileSettings() {
  const {
    user,
    updateProfile,
  } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [profile, setProfile] =
    useState({
      full_name: "",
      email: "",
      phone: "",
      role: "",
      avatar_url: "",
    });

  /* =========================================
     LOAD PROFILE FROM AUTH CONTEXT
  ========================================= */

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setProfile({
      full_name:
        user.profile?.full_name ?? "",
      email:
        user.email ?? "",
      phone:
        user.profile?.phone ?? "",
      role:
        user.roles?.join(", ") ?? "",
      avatar_url:
        user.profile?.avatar_url ?? "",
    });

    setLoading(false);
  }, [user]);

  /* =========================================
     UPDATE FORM FIELD
  ========================================= */

  function updateField(
    key: "full_name" | "phone",
    value: string
  ) {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  /* =========================================
     SAVE PROFILE
  ========================================= */

  async function handleSave() {
    try {
      setSaving(true);

      await updateProfile({
        full_name: profile.full_name,
        phone: profile.phone,
      });

      alert(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          Loading profile...
        </CardContent>
      </Card>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <Card>

      <CardContent className="pt-6">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Avatar */}

          <ProfileAvatar
            fullName={profile.full_name}
            email={profile.email}
            role={profile.role}
            avatarUrl={
              profile.avatar_url
            }
          />

          {/* Form */}

          <div className="lg:col-span-2">

            <ProfileForm
              profile={profile}
              saving={saving}
              updateField={updateField}
              onSave={handleSave}
            />

          </div>

        </div>

      </CardContent>

    </Card>
  );
}