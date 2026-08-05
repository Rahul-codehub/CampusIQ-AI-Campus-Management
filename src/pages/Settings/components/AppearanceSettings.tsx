import { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState<
    "light" | "dark" | "system"
  >("system");

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">

        <h2 className="text-xl font-semibold">
          Appearance
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <Button
            variant={
              theme === "light"
                ? "default"
                : "outline"
            }
            onClick={() => setTheme("light")}
          >
            <Sun className="mr-2 h-5 w-5" />
            Light
          </Button>

          <Button
            variant={
              theme === "dark"
                ? "default"
                : "outline"
            }
            onClick={() => setTheme("dark")}
          >
            <Moon className="mr-2 h-5 w-5" />
            Dark
          </Button>

          <Button
            variant={
              theme === "system"
                ? "default"
                : "outline"
            }
            onClick={() => setTheme("system")}
          >
            <Monitor className="mr-2 h-5 w-5" />
            System
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}