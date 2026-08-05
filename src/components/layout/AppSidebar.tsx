import { Link, useLocation } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import type {
  AppRole,
} from "@/integrations/mongodb/types";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  MessageSquareWarning,
  Megaphone,
  Calendar,
  BarChart3,
  FileText,
  Upload,
  Settings,
  LogOut,
  Bot,
  ClipboardCheck,
  UserCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* =========================================
   NAVIGATION ITEMS
========================================= */
const navItems: {
  path: string;

  label: string;

  icon: typeof LayoutDashboard;

  roles: AppRole[];
}[] = [
    /* =========================================
       DASHBOARD
    ========================================= */
    {
      path: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: [
        "admin",
        "faculty",
        "student",
      ],
    },

    /* =========================================
       STUDENTS
    ========================================= */
    {
      path: "/students",
      label: "Students",
      icon: GraduationCap,
      roles: [
        "admin",
        "faculty",
      ],
    },

    /* =========================================
       Approval Requests
    ========================================= */
    {
      path: "/approval-requests",
      label: "Approval Requests",
      icon: UserCheck,
      roles: [
        "admin",
        "faculty",
      ],
    },

    /* =========================================
       FACULTY
    ========================================= */
    {
      path: "/faculty",
      label: "Faculty",
      icon: Users,
      roles: ["admin"],
    },

    /* =========================================
       COURSES
    ========================================= */
    {
      path: "/courses",
      label: "Courses",
      icon: BookOpen,
      roles: [
        "admin",
        "faculty",
      ],
    },

    /* =========================================
       ATTENDANCE
    ========================================= */
    {
      path: "/attendance",
      label: "Attendance",
      icon: ClipboardCheck,
      roles: [
        "admin",
        "faculty",
        "student",
      ],
    },
    /* =========================================
       ATTENDANCE ANALYTICS
    ========================================= */
    {
      path: "/attendance-analytics",
      label: "Attendance Analytics",
      icon: BarChart3,
      roles: [
        "admin",
        "faculty",
      ],
    },

    /* =========================================
       FILE UPLOAD
    ========================================= */
    {
      path: "/file-upload",
      label: "File Upload",
      icon: Upload,
      roles: [
        "admin",
        "faculty",
      ],
    },
    /* =========================================
       COMPLAINTS
    ========================================= */
    {
      path: "/complaints",
      label: "Complaints",
      icon: MessageSquareWarning,
      roles: [
        "admin",
        "faculty",
        "student",
      ],
    },

    /* =========================================
       NOTICES
    ========================================= */
    {
      path: "/notices",
      label: "Notice Board",
      icon: Megaphone,
      roles: [
        "admin",
        "faculty",
        "student",
      ],
    },

    /* =========================================
       EVENTS
    ========================================= */
    {
      path: "/events",
      label: "Events",
      icon: Calendar,
      roles: [
        "admin",
        "faculty",
        "student",
      ],
    },

    
    /* =========================================
       ANALYTICS
    ========================================= */
    {
      path: "/analytics",
      label: "Analytics",
      icon: BarChart3,
      roles: ["admin"],
    },

 

    /* =========================================
       SETTINGS
    ========================================= */
    {
      path: "/settings",
      label: "Settings",
      icon: Settings,
      roles: [
        "admin",
        "faculty",
        "student",
      ],
    },
  ];

/* =========================================
   SIDEBAR COMPONENT
========================================= */
const AppSidebar = () => {
  const location =
    useLocation();

  const {
    signOut,
    profile,
    roles,
  } = useAuth();

  /* =========================================
     FILTER VISIBLE ITEMS
  ========================================= */
  const visibleNavItems =
    navItems.filter((item) =>
      item.roles.some((role) =>
        roles.includes(role)
      )
    );

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      {/* =========================================
          LOGO
      ========================================= */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>

          <div>
            <h1
              className="font-bold text-lg text-sidebar-primary-foreground"
              style={{
                fontFamily:
                  "'Space Grotesk', sans-serif",
              }}
            >
              CampusIQ
            </h1>

            <p className="text-xs text-sidebar-foreground/60">
              {roles?.[0]
                ? `${roles[0].toUpperCase()} PANEL`
                : "Management System"}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          NAVIGATION
      ========================================= */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {visibleNavItems.map(
          (item) => {
            const isActive =
              location.pathname ===
              item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",

                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-4.5 h-4.5" />

                {item.label}
              </Link>
            );
          }
        )}
      </nav>

      {/* =========================================
          FOOTER
      ========================================= */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
            {profile?.full_name?.[0]?.toUpperCase() ||
              "U"}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-sidebar-primary-foreground">
              {profile?.full_name ||
                "User"}
            </p>
          </div>
        </div>

        {/* =========================================
            SIGN OUT
        ========================================= */}
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />

          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;