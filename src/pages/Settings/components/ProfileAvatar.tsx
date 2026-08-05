import { User, Upload, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface ProfileAvatarProps {
  fullName: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
}

export default function ProfileAvatar({
  fullName,
  email,
  role,
  avatarUrl,
}: ProfileAvatarProps) {
  return (
    <Card>

      <CardContent className="flex flex-col items-center gap-4 pt-6">

        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="h-28 w-28 rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">

            <User className="h-14 w-14 text-primary" />

          </div>
        )}

        <div className="text-center">

          <h2 className="text-xl font-semibold">
            {fullName}
          </h2>

          <p className="text-sm text-muted-foreground">
            {role}
          </p>

          <p className="text-sm text-muted-foreground">
            {email}
          </p>

        </div>

        <div className="flex w-full gap-2">

          <Button
            className="flex-1"
            variant="outline"
          >
            <Upload className="mr-2 h-4 w-4" />

            Upload
          </Button>

          <Button
            variant="destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}