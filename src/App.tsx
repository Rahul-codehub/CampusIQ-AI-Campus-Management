import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";

import { TooltipProvider } from "@/components/ui/tooltip";

import {
  AuthProvider,
  useAuth,
} from "@/contexts/AuthContext";

import type {
  AppRole,
} from "@/integrations/mongodb/types";

/* =========================================
   PAGES
========================================= */
import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";

import Students from "./pages/Students";

import Faculty from "./pages/Faculty";

import Courses from "./pages/Courses";

import Complaints from "./pages/Complaints";

import Notices from "./pages/Notices";

import Events from "./pages/Events/index";



import Analytics from "./pages/Analytics";



import Attendance from "./pages/Attendance";

import AttendanceAnalytics from "./pages/AttendanceAnalytics";

import FileUploadPage from "./pages/FileUploadPage";

import Settings from "./pages/Settings";

import ApprovalRequests from "./pages/RegistrationRequests";

import NotFound from "./pages/NotFound";

/* =========================================
   QUERY CLIENT
========================================= */
const queryClient = new QueryClient();

/* =========================================
   DEFAULT REDIRECT
========================================= */
const defaultPathForRoles = (
  roles: AppRole[]
) => {
  if (roles.includes("admin")) {
    return "/";
  }

  if (roles.includes("faculty")) {
    return "/students";
  }

  return "/complaints";
};

/* =========================================
   PROTECTED ROUTE
========================================= */
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;

  allowedRoles: AppRole[];
}) => {
  const {
    user,
    loading,
    roles,
  } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Loading...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    );
  }

  if (
    !allowedRoles.some((role) =>
      roles.includes(role)
    )
  ) {
    return (
      <Navigate
        to={defaultPathForRoles(
          roles
        )}
        replace
      />
    );
  }

  return <>{children}</>;
};

/* =========================================
   AUTH ROUTE
========================================= */
const AuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    user,
    loading,
    roles,
  } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Loading...
        </p>
      </div>
    );
  }

  if (user) {
    return (
      <Navigate
        to={defaultPathForRoles(
          roles
        )}
        replace
      />
    );
  }

  return <>{children}</>;
};

/* =========================================
   MAIN APP
========================================= */
const App = () => (
  <QueryClientProvider
    client={queryClient}
  >
    <TooltipProvider>
      <Toaster />

      <Sonner />

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* =========================================
                AUTH
            ========================================= */}
            <Route
              path="/auth"
              element={
                <AuthRoute>
                  <Auth />
                </AuthRoute>
              }
            />

            {/* =========================================
                DASHBOARD
            ========================================= */}
            <Route
              path="/"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                    "student",
                  ]}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                STUDENTS
            ========================================= */}
            <Route
              path="/students"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                  ]}
                >
                  <Students />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                FACULTY
            ========================================= */}
            <Route
              path="/faculty"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                  ]}
                >
                  <Faculty />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                COURSES
            ========================================= */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                  ]}
                >
                  <Courses />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                COMPLAINTS
            ========================================= */}
            <Route
              path="/complaints"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                    "student",
                  ]}
                >
                  <Complaints />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                NOTICES
            ========================================= */}
            <Route
              path="/notices"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                    "student",
                  ]}
                >
                  <Notices />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                EVENTS
            ========================================= */}
            <Route
              path="/events"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                    "student",
                  ]}
                >
                  <Events />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                ATTENDANCE
            ========================================= */}
            <Route
              path="/attendance"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                    "student",
                  ]}
                >
                  <Attendance />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                ATTENDANCE ANALYTICS
            ========================================= */}
            <Route
              path="/attendance-analytics"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                  ]}
                >
                  <AttendanceAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/file-upload"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                  ]}
                >
                  <FileUploadPage />
                </ProtectedRoute>
              }
            />
            
            {/* =========================================
                ANALYTICS
            ========================================= */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                  ]}
                >
                  <Analytics />
                </ProtectedRoute>
              }
            />

         
            {/* =========================================
                SETTINGS
            ========================================= */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                    "student",
                  ]}
                >
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                Approval Requests
            ========================================= */}

            <Route
              path="/approval-requests"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "faculty",
                  ]}
                >
                  <ApprovalRequests />
                </ProtectedRoute>
              }
            />

            {/* =========================================
                404
            ========================================= */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;