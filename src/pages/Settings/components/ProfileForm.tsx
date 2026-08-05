import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

interface ProfileFormProps {
  profile: {
    full_name: string;
    email: string;
    phone: string;
    role: string;
  };

  saving: boolean;

  updateField: (
    key: "full_name" | "phone",
    value: string
  ) => void;

  onSave: () => void;
}

export default function ProfileForm({
  profile,
  saving,
  updateField,
  onSave,
}: ProfileFormProps) {
  return (
    <div className="space-y-6">

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <Label>
            Full Name
          </Label>

          <Input
            value={profile.full_name}
            onChange={(e) =>
              updateField(
                "full_name",
                e.target.value
              )
            }
          />

        </div>

        <div>

          <Label>
            Email
          </Label>

          <Input
            disabled
            value={profile.email}
          />

        </div>

        <div>

          <Label>
            Phone
          </Label>

          <Input
            value={profile.phone}
            onChange={(e) =>
              updateField(
                "phone",
                e.target.value
              )
            }
          />

        </div>

        <div>

          <Label>
            Role
          </Label>

          <Input
            disabled
            value={profile.role}
          />

        </div>

      </div>

      <Button
        disabled={saving}
        onClick={onSave}
      >
        {saving
          ? "Saving..."
          : "Save Changes"}
      </Button>

    </div>
  );
}