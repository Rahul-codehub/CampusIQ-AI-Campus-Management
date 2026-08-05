import { LucideIcon } from "lucide-react";

export type SettingsSection =
  | "profile"
  | "security"
  | "notifications"
  | "appearance"
  | "system"
  | "database"
  | "backup";

export interface SettingMenuItem {
  id: SettingsSection;
  title: string;
  description: string;
  icon: LucideIcon;
  adminOnly: boolean;
}

export interface ProfileSettings {
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
}