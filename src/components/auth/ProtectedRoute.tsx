import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import type { AppRole } from "@/integrations/mongodb/types";

interface Props {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: Props) => {
  const {
    user,
    loading,
    hasRole,
  } = useAuth();

  /* =========================================
     LOADING STATE
  ========================================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          Loading...
        </p>
      </div>
    );
  }

  /* =========================================
     NOT LOGGED IN
  ========================================= */
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  /* =========================================
     ROLE CHECK
  ========================================= */
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.some((role) =>
      hasRole(role)
    )
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Access Denied
          </h1>

          <p className="text-muted-foreground mt-2">
            You don't have permission
            to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;