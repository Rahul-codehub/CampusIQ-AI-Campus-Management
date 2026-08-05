import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { authApi } from "@/integrations/mongodb/api";

import type {
  AppRole,
  AppUser,
  Profile,
  Session,
} from "@/integrations/mongodb/types";

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  profile: Profile | null;

  signIn: (
    email: string,
    password: string,
    role: AppRole
  ) => Promise<void>;

  signUp: (payload: {
  email: string;
  password: string;
  fullName: string;
  role: AppRole;

  mobile?: string;

  studentId?: string;
  facultyId?: string;

  departmentId?: string;

  semester?: number;

  enrollmentYear?: number;

  designation?: string;
}) => Promise<void>;

  signOut: () => Promise<void>;

 updateProfile: (
  profile: {
    full_name: string;
    phone: string | null;
  }
) => Promise<AppUser>;

  hasRole: (role: AppRole) => boolean;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

/* =========================================
   SESSION STORAGE KEY
========================================= */
const STORAGE_KEY =
  "campus_ai_session";

/* =========================================
   AUTH PROVIDER
========================================= */
export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] =
    useState<AppUser | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [roles, setRoles] = useState<
    AppRole[]
  >([]);

  const [profile, setProfile] =
    useState<AuthContextType["profile"]>(
      null
    );

  /* =========================================
     APPLY SESSION
  ========================================= */
  const applySession = (
    nextSession: Session | null
  ) => {
    setSession(nextSession);

    setUser(nextSession?.user ?? null);

    setRoles(
      nextSession?.user.roles ?? []
    );

    setProfile(
      nextSession?.user.profile ?? null
    );

    /* =========================================
       SAVE TO SESSION STORAGE
       DIFFERENT FOR EACH TAB
    ========================================= */
    if (nextSession) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextSession)
      );
    } else {
      sessionStorage.removeItem(
        STORAGE_KEY
      );
    }
  };

  /* =========================================
     LOAD SESSION FROM TAB STORAGE
  ========================================= */
  useEffect(() => {
    try {
      const saved =
        sessionStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {
        const parsed =
          JSON.parse(saved);

        applySession(parsed);
      }
    } catch (error) {
      console.warn(
        "Unable to restore session",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================================
     SIGN IN
  ========================================= */
  const signIn = async (
    email: string,
    password: string,
    role: AppRole
  ) => {
    const newSession =
      await authApi.signIn(
        email,
        password,
        role
      );

    applySession(newSession);
  };

  /* =========================================
     SIGN UP
  ========================================= */
 const signUp = async (
  payload: {
    email: string;
    password: string;
    fullName: string;
    role: AppRole;

    mobile?: string;

    studentId?: string;

    facultyId?: string;

    departmentId?: string;

    semester?: number;

    enrollmentYear?: number;

    designation?: string;
  }
) => {

  await authApi.signUp(payload);

};

  /* =========================================
     SIGN OUT
  ========================================= */
  const signOut = async () => {
    try {
      await authApi.signOut();
    } catch (error) {
      console.warn(error);
    }

    applySession(null);
  };

  /* =========================================
     UPDATE PROFILE
  ========================================= */
  const updateProfile = async (
  nextProfile: {
    full_name: string;
    phone: string | null;
  }
): Promise<AppUser> => {

  const updatedUser =
    await authApi.updateProfile(
      nextProfile
    );

  const updatedSession =
    session
      ? {
          ...session,
          user: updatedUser,
        }
      : null;

  applySession(updatedSession);

  return updatedUser;
};

  /* =========================================
     ROLE CHECK
  ========================================= */
  const hasRole = (
    role: AppRole
  ) => {
    return roles.includes(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        roles,
        profile,
        signIn,
        signUp,
        signOut,
        updateProfile,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =========================================
   USE AUTH
========================================= */
export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};