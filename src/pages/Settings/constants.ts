import {
  User,
  Shield,
  Bell,
  Palette,
  Building2,
  Database,
  HardDrive,
} from "lucide-react";

import { SettingMenuItem } from "./types";

export const SETTINGS_MENU: SettingMenuItem[] = [
  {
    id: "profile",
    title: "Profile",
    description: "Manage profile information",
    icon: User,
    adminOnly: false,
  },
  {
    id: "security",
    title: "Security",
    description: "Password & authentication",
    icon: Shield,
    adminOnly: false,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Notification preferences",
    icon: Bell,
    adminOnly: false,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Theme & interface",
    icon: Palette,
    adminOnly: false,
  },
  
 {
  id: "system",
  title: "System",
  description: "Campus configuration",
  icon: Building2,
  adminOnly: true,
},
{
  id: "database",
  title: "Database",
  description: "Database information",
  icon: Database,
  adminOnly: true,
},
{
  id: "backup",
  title: "Backup",
  description: "Backup & restore",
  icon: HardDrive,
  adminOnly: true,
},
];