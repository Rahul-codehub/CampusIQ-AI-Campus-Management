import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import { SETTINGS_MENU } from "./constants";
import { SettingsSection } from "./types";

import { Card } from "@/components/ui/card";
import ProfileSettings from "./components/ProfileSettings";
import SecuritySettings from "./components/SecuritySettings";
import AppearanceSettings from "./components/AppearanceSettings";
import SystemSettings from "./components/SystemSettings";
import DatabaseSettings from "./components/DatabaseSettings";
import BackupSettings from "./components/BackupSettings";

export default function Settings() {
    const [selected, setSelected] =
        useState<SettingsSection>("profile");
    const { hasRole } = useAuth();

    return (
        <AppLayout>
            <div className="space-y-8">

                <div>
                    <h1 className="text-3xl font-bold">
                        Settings
                    </h1>

                    <p className="text-muted-foreground">
                        Configure CampusIQ preferences
                        and system settings.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-4">

                    {/* Sidebar */}

                    <Card className="p-3">

                        <div className="space-y-2">

                            {SETTINGS_MENU
                                .filter(
                                    (item) =>
                                        !item.adminOnly || hasRole("admin")
                                )
                                .map((item) => {

                                    const Icon = item.icon;

                                    return (

                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                setSelected(item.id)
                                            }
                                            className={`w-full rounded-lg p-3 text-left transition ${selected === item.id
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                                }`}
                                        >

                                            <div className="flex items-center gap-3">

                                                <Icon className="h-5 w-5" />

                                                <div>

                                                    <p className="font-medium">
                                                        {item.title}
                                                    </p>

                                                    <p className="text-xs opacity-80">
                                                        {item.description}
                                                    </p>

                                                </div>

                                            </div>

                                        </button>

                                    );

                                })}

                        </div>

                    </Card>

                    {/* Content */}

                    <Card className="p-6 lg:col-span-3">

                        <h2 className="mb-4 text-2xl font-semibold capitalize">
                            {selected}
                        </h2>

                        {selected === "profile" && (
                            <ProfileSettings />
                        )}

                        {selected === "security" && (
                            <SecuritySettings />
                        )}

                        {selected === "appearance" && (
                            <AppearanceSettings />
                        )}
                        {hasRole("admin") && selected === "system" && (
                            <SystemSettings />
                        )}

                        {hasRole("admin") && selected === "database" && (
                            <DatabaseSettings />
                        )}

                        {hasRole("admin") && selected === "backup" && (
                            <BackupSettings />
                        )}
                    </Card>

                </div>

            </div>
        </AppLayout>
    );
}