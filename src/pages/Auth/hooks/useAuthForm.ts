// import { useEffect, useState } from "react";

// import { toast } from "sonner";

// import {
//   authApi,
//   dbApi,
// } from "@/integrations/mongodb/api";

// import {
//   useAuth,
// } from "@/contexts/AuthContext";

// import type {
//   AppRole,
//   Department,
// } from "@/integrations/mongodb/types";

// import {
//   ADMIN_EMAIL,
//   DEFAULT_FORM,
// } from "../constants";

// import type {
//   AuthMode,
//   SignupFormData,
// } from "../types";

// import {
//   hasRequiredFacultyFields,
//   hasRequiredStudentFields,
//   isValidEmail,
//   passwordsMatch,
// } from "../utils";

// import {
//   useCaptcha,
// } from "./useCaptcha";

// export function useAuthForm() {

//   const {
//     signIn,
//     signUp,
//   } = useAuth();

//   /* =========================================
//      MODE
//   ========================================= */

//   const [mode, setMode] =
//     useState<AuthMode>("login");

//   const isLogin =
//     mode === "login";

//   const isSignup =
//     mode === "signup";

//   const isForgot =
//     mode === "forgot";

//   /* =========================================
//      ROLE
//   ========================================= */

//   const [
//     selectedRole,
//     setSelectedRole,
//   ] =
//     useState<AppRole>("student");

//   /* =========================================
//      FORM
//   ========================================= */

//   const [
//     form,
//     setForm,
//   ] =
//     useState<SignupFormData>(
//       DEFAULT_FORM
//     );

//   /* =========================================
//      LOADING
//   ========================================= */

//   const [
//     loading,
//     setLoading,
//   ] =
//     useState(false);

//   /* =========================================
//      DEPARTMENTS
//   ========================================= */

//   const [
//     departments,
//     setDepartments,
//   ] =
//     useState<Department[]>([]);

//   /* =========================================
//      CAPTCHA
//   ========================================= */

//   const captcha =
//     useCaptcha();
//   /* =========================================
//      LOAD DEPARTMENTS
//   ========================================= */

//   useEffect(() => {

//     const loadDepartments =
//       async () => {

//         try {

//           const data =
//             await dbApi.list(
//               "departments"
//             );

//           setDepartments(
//             data
//           );

//         } catch (error) {

//           console.error(error);

//           toast.error(
//             "Unable to load departments."
//           );

//         }

//       };

//     loadDepartments();

//   }, []);

//   /* =========================================
//      ADMIN LOGIN ONLY
//   ========================================= */

//   useEffect(() => {

//     if (
//       selectedRole ===
//       "admin" &&
//       mode === "signup"
//     ) {

//       setMode("login");

//     }

//   }, [
//     selectedRole,
//     mode,
//   ]);
//   /* =========================================
//      UPDATE FIELD
//   ========================================= */

//   const updateField = <
//     K extends keyof SignupFormData
//   >(
//     key: K,
//     value: SignupFormData[K]
//   ) => {

//     setForm((previous) => ({
//       ...previous,
//       [key]: value,
//     }));

//   };

//   /* =========================================
//      RESET FORM
//   ========================================= */

//   const resetForm = () => {

//     setForm({
//       ...DEFAULT_FORM,
//       role: selectedRole,
//     });

//     captcha.refresh();

//   };

//   /* =========================================
//      SWITCH MODE
//   ========================================= */

//   const switchMode = (
//     nextMode: AuthMode
//   ) => {

//     resetForm();

//     setMode(nextMode);

//   };
//     /* =========================================
//      VALIDATE
//   ========================================= */

//   const validate = () => {

//     if (
//       !isValidEmail(
//         form.email
//       )
//     ) {

//       toast.error(
//         "Please enter a valid email."
//       );

//       return false;

//     }

//     if (
//       !passwordsMatch(
//         form
//       )
//     ) {

//       toast.error(
//         "Passwords do not match."
//       );

//       return false;

//     }

//     if (
//       !captcha.validate()
//     ) {

//       toast.error(
//         "Captcha is incorrect."
//       );

//       captcha.refresh();

//       return false;

//     }

//     if (
//       selectedRole ===
//       "student"
//     ) {

//       if (
//         !hasRequiredStudentFields(
//           form
//         )
//       ) {

//         toast.error(
//           "Please complete all student details."
//         );

//         return false;

//       }

//     }

//     if (
//       selectedRole ===
//       "faculty"
//     ) {

//       if (
//         !hasRequiredFacultyFields(
//           form
//         )
//       ) {

//         toast.error(
//           "Please complete all faculty details."
//         );

//         return false;

//       }

//     }

//     return true;

//   };
//     /* =========================================
//      SUBMIT
//   ========================================= */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setLoading(true);

//     try {

//       /* =====================================
//          FORGOT PASSWORD
//       ===================================== */

//       if (isForgot) {

//         if (
//           !captcha.validate()
//         ) {

//           toast.error(
//             "Captcha is incorrect."
//           );

//           captcha.refresh();

//           return;

//         }

//         await authApi.resetPassword(

//           form.email,

//           form.password

//         );

//         toast.success(
//           "Password reset successfully."
//         );

//         switchMode(
//           "login"
//         );

//         return;

//       }

//       /* =====================================
//          LOGIN
//       ===================================== */

//       if (isLogin) {

//         if (

//           selectedRole ===
//             "admin" &&

//           form.email !==
//             ADMIN_EMAIL

//         ) {

//           toast.error(
//             "Only the authorized admin can login."
//           );

//           return;

//         }

//         await signIn(

//           form.email,

//           form.password,

//           selectedRole

//         );

//         toast.success(
//           "Welcome back!"
//         );

//         return;

//       }

//       /* =====================================
//          SIGNUP
//       ===================================== */

//       if (
//         !validate()
//       ) {

//         return;

//       }

//       await signUp({

//         email:
//           form.email,

//         password:
//           form.password,

//         fullName:
//           form.fullName,

//         role:
//           selectedRole,

//         studentId:
//           form.studentId,

//         facultyId:
//           form.facultyId,

//         departmentId:
//           form.departmentId,

//         semester:
//           Number(
//             form.semester
//           ),

//         enrollmentYear:
//           Number(
//             form.enrollmentYear
//           ),

//         designation:
//           form.designation,

//         mobile:
//           form.mobile,

//       });

//       toast.success(

//         "Registration request submitted successfully. Please wait for approval."

//       );

//       switchMode(
//         "login"
//       );

//     } catch (error: any) {

//       toast.error(

//         error.message ??

//         "Authentication failed."

//       );

//     } finally {

//       setLoading(false);

//     }

//   };
//     return {

//     mode,
//     setMode,

//     isLogin,
//     isSignup,
//     isForgot,

//     selectedRole,
//     setSelectedRole,

//     form,
//     updateField,

//     loading,

//     departments,

//     captcha,

//     switchMode,

//     handleSubmit,

//   };

// }






// import { useEffect, useState } from "react";

// import { toast } from "sonner";

// import {
//   authApi,
//   dbApi,
// } from "@/integrations/mongodb/api";

// import {
//   useAuth,
// } from "@/contexts/AuthContext";

// import type {
//   AppRole,
//   Department,
// } from "@/integrations/mongodb/types";

// import {
//   ADMIN_EMAIL,
//   DEFAULT_FORM,
// } from "../constants";

// import type {
//   AuthMode,
//   SignupFormData,
// } from "../types";

// import {
//   hasRequiredFacultyFields,
//   hasRequiredStudentFields,
//   isValidEmail,
//   passwordsMatch,
// } from "../utils";

// import {
//   useCaptcha,
// } from "./useCaptcha";

// export function useAuthForm() {

//   const {
//     signIn,
//     signUp,
//   } = useAuth();

//   /* =========================================
//      MODE
//   ========================================= */

//   const [mode, setMode] =
//     useState<AuthMode>("login");

//   const isLogin =
//     mode === "login";

//   const isSignup =
//     mode === "signup";

//   const isForgot =
//     mode === "forgot";

//   /* =========================================
//      ROLE
//   ========================================= */

//   const [
//     selectedRole,
//     setSelectedRole,
//   ] =
//     useState<AppRole>("student");

//   /* =========================================
//      FORM
//   ========================================= */

//   const [
//     form,
//     setForm,
//   ] =
//     useState<SignupFormData>(
//       DEFAULT_FORM
//     );

//   /* =========================================
//      LOADING
//   ========================================= */

//   const [
//     loading,
//     setLoading,
//   ] =
//     useState(false);

//   /* =========================================
//      DEPARTMENTS
//   ========================================= */

//   const [
//     departments,
//     setDepartments,
//   ] =
//     useState<Department[]>([]);

//   /* =========================================
//      CAPTCHA
//   ========================================= */

//   const captcha =
//     useCaptcha();

//   /* =========================================
//      LOAD DEPARTMENTS
//   ========================================= */

//   useEffect(() => {

//     const loadDepartments =
//       async () => {

//         try {

//           const data =
//             await dbApi.list(
//               "departments"
//             );

//           setDepartments(
//             data
//           );

//         } catch (error) {

//           console.error(error);

//           toast.error(
//             "Unable to load departments."
//           );

//         }

//       };

//     loadDepartments();

//   }, []);

//   /* =========================================
//      ADMIN LOGIN ONLY
//   ========================================= */

//   useEffect(() => {

//     if (
//       selectedRole ===
//       "admin" &&
//       mode === "signup"
//     ) {

//       setMode("login");

//     }

//   }, [
//     selectedRole,
//     mode,
//   ]);

//   /* =========================================
//      UPDATE FIELD
//   ========================================= */

//   const updateField = <
//     K extends keyof SignupFormData
//   >(
//     key: K,
//     value: SignupFormData[K]
//   ) => {

//     setForm((previous) => ({
//       ...previous,
//       [key]: value,
//     }));

//   };

//   /* =========================================
//      RESET FORM
//   ========================================= */

//   const resetForm = () => {

//     setForm({
//       ...DEFAULT_FORM,
//       role: selectedRole,
//     });

//     captcha.refresh();

//   };

//   /* =========================================
//      SWITCH MODE
//   ========================================= */

//   const switchMode = (
//     nextMode: AuthMode
//   ) => {

//     resetForm();

//     setMode(nextMode);

//   };

//   /* =========================================
//      DEMO LOGIN
//   ========================================= */

//   const handleExploreDemo = async () => {

//     if (loading) {
//       return;
//     }

//     setLoading(true);

//     try {

//       /*
//        * Demo credentials will be connected
//        * to dedicated CampusIQ demo accounts.
//        *
//        * We intentionally use the normal
//        * signIn() flow so demo users still
//        * pass through the same authentication
//        * and role-permission system.
//        */

//       const demoEmail =
//         "demo.student@campusiq.demo";

//       const demoPassword =
//         "CampusIQ@Demo2026";

//       await signIn(
//         demoEmail,
//         demoPassword,
//         "student"
//       );

//       toast.success(
//         "Welcome to the CampusIQ Demo!"
//       );

//     } catch (error: any) {

//       console.error(
//         "Demo login failed:",
//         error
//       );

//       toast.error(
//         error?.message ??
//         "CampusIQ Demo is currently unavailable."
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   /* =========================================
//      VALIDATE
//   ========================================= */

//   const validate = () => {

//     if (
//       !isValidEmail(
//         form.email
//       )
//     ) {

//       toast.error(
//         "Please enter a valid email."
//       );

//       return false;

//     }

//     if (
//       !passwordsMatch(
//         form
//       )
//     ) {

//       toast.error(
//         "Passwords do not match."
//       );

//       return false;

//     }

//     if (
//       !captcha.validate()
//     ) {

//       toast.error(
//         "Captcha is incorrect."
//       );

//       captcha.refresh();

//       return false;

//     }

//     if (
//       selectedRole ===
//       "student"
//     ) {

//       if (
//         !hasRequiredStudentFields(
//           form
//         )
//       ) {

//         toast.error(
//           "Please complete all student details."
//         );

//         return false;

//       }

//     }

//     if (
//       selectedRole ===
//       "faculty"
//     ) {

//       if (
//         !hasRequiredFacultyFields(
//           form
//         )
//       ) {

//         toast.error(
//           "Please complete all faculty details."
//         );

//         return false;

//       }

//     }

//     return true;

//   };

//   /* =========================================
//      SUBMIT
//   ========================================= */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setLoading(true);

//     try {

//       /* =====================================
//          FORGOT PASSWORD
//       ===================================== */

//       if (isForgot) {

//         if (
//           !captcha.validate()
//         ) {

//           toast.error(
//             "Captcha is incorrect."
//           );

//           captcha.refresh();

//           return;

//         }

//         await authApi.resetPassword(
//           form.email,
//           form.password
//         );

//         toast.success(
//           "Password reset successfully."
//         );

//         switchMode(
//           "login"
//         );

//         return;

//       }

//       /* =====================================
//          LOGIN
//       ===================================== */

//       if (isLogin) {

//         if (
//           selectedRole ===
//             "admin" &&
//           form.email !==
//             ADMIN_EMAIL
//         ) {

//           toast.error(
//             "Only the authorized admin can login."
//           );

//           return;

//         }

//         await signIn(
//           form.email,
//           form.password,
//           selectedRole
//         );

//         toast.success(
//           "Welcome back!"
//         );

//         return;

//       }

//       /* =====================================
//          SIGNUP
//       ===================================== */

//       if (
//         !validate()
//       ) {

//         return;

//       }

//       await signUp({

//         email:
//           form.email,

//         password:
//           form.password,

//         fullName:
//           form.fullName,

//         role:
//           selectedRole,

//         studentId:
//           form.studentId,

//         facultyId:
//           form.facultyId,

//         departmentId:
//           form.departmentId,

//         semester:
//           Number(
//             form.semester
//           ),

//         enrollmentYear:
//           Number(
//             form.enrollmentYear
//           ),

//         designation:
//           form.designation,

//         mobile:
//           form.mobile,

//       });

//       toast.success(
//         "Registration request submitted successfully. Please wait for approval."
//       );

//       switchMode(
//         "login"
//       );

//     } catch (error: any) {

//       toast.error(
//         error.message ??
//         "Authentication failed."
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   return {

//     mode,
//     setMode,

//     isLogin,
//     isSignup,
//     isForgot,

//     selectedRole,
//     setSelectedRole,

//     form,
//     updateField,

//     loading,

//     departments,

//     captcha,

//     switchMode,

//     handleSubmit,

//     handleExploreDemo,

//   };

// }










import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  authApi,
  dbApi,
} from "@/integrations/mongodb/api";

import {
  useAuth,
} from "@/contexts/AuthContext";

import type {
  AppRole,
  Department,
} from "@/integrations/mongodb/types";

import {
  ADMIN_EMAIL,
  DEFAULT_FORM,
} from "../constants";

import type {
  AuthMode,
  SignupFormData,
} from "../types";

import {
  hasRequiredFacultyFields,
  hasRequiredStudentFields,
  isValidEmail,
  passwordsMatch,
} from "../utils";

import {
  useCaptcha,
} from "./useCaptcha";

export function useAuthForm() {

  const {
    signIn,
    signUp,
  } = useAuth();

  /* =========================================
     MODE
  ========================================= */

  const [mode, setMode] =
    useState<AuthMode>("login");

  const isLogin =
    mode === "login";

  const isSignup =
    mode === "signup";

  const isForgot =
    mode === "forgot";

  /* =========================================
     ROLE
  ========================================= */

  const [
    selectedRole,
    setSelectedRole,
  ] =
    useState<AppRole>("student");

  /* =========================================
     FORM
  ========================================= */

  const [
    form,
    setForm,
  ] =
    useState<SignupFormData>(
      DEFAULT_FORM
    );

  /* =========================================
     LOADING
  ========================================= */

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  /* =========================================
     DEPARTMENTS
  ========================================= */

  const [
    departments,
    setDepartments,
  ] =
    useState<Department[]>([]);

  /* =========================================
     CAPTCHA
  ========================================= */

  const captcha =
    useCaptcha();

  /* =========================================
     LOAD DEPARTMENTS
  ========================================= */

  useEffect(() => {

    const loadDepartments =
      async () => {

        try {

          const data =
            await dbApi.list(
              "departments"
            );

          setDepartments(
            data
          );

        } catch (error) {

          console.error(error);

          toast.error(
            "Unable to load departments."
          );

        }

      };

    loadDepartments();

  }, []);

  /* =========================================
     ADMIN LOGIN ONLY
  ========================================= */

  useEffect(() => {

    if (
      selectedRole ===
      "admin" &&
      mode === "signup"
    ) {

      setMode("login");

    }

  }, [
    selectedRole,
    mode,
  ]);

  /* =========================================
     UPDATE FIELD
  ========================================= */

  const updateField = <
    K extends keyof SignupFormData
  >(
    key: K,
    value: SignupFormData[K]
  ) => {

    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));

  };

  /* =========================================
     RESET FORM
  ========================================= */

  const resetForm = () => {

    setForm({
      ...DEFAULT_FORM,
      role: selectedRole,
    });

    captcha.refresh();

  };

  /* =========================================
     SWITCH MODE
  ========================================= */

  const switchMode = (
    nextMode: AuthMode
  ) => {

    resetForm();

    setMode(nextMode);

  };

  /* =========================================
     DEMO LOGIN
  ========================================= */

  const handleExploreDemo = async (
    role: AppRole,
    credentials: {
      email: string;
      password: string;
    }
  ) => {

    if (loading) {
      return;
    }

    setLoading(true);

    try {

      await signIn(
        credentials.email,
        credentials.password,
        role
      );

      toast.success(
        `Welcome to the ${role} CampusIQ Demo!`
      );

    } catch (error: any) {

      console.error(
        "Demo login failed:",
        error
      );

      toast.error(
        error?.message ??
        "Unable to enter CampusIQ Demo."
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     VALIDATE
  ========================================= */

  const validate = () => {

    if (
      !isValidEmail(
        form.email
      )
    ) {

      toast.error(
        "Please enter a valid email."
      );

      return false;

    }

    if (
      !passwordsMatch(
        form
      )
    ) {

      toast.error(
        "Passwords do not match."
      );

      return false;

    }

    if (
      !captcha.validate()
    ) {

      toast.error(
        "Captcha is incorrect."
      );

      captcha.refresh();

      return false;

    }

    if (
      selectedRole ===
      "student"
    ) {

      if (
        !hasRequiredStudentFields(
          form
        )
      ) {

        toast.error(
          "Please complete all student details."
        );

        return false;

      }

    }

    if (
      selectedRole ===
      "faculty"
    ) {

      if (
        !hasRequiredFacultyFields(
          form
        )
      ) {

        toast.error(
          "Please complete all faculty details."
        );

        return false;

      }

    }

    return true;

  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      /* =====================================
         FORGOT PASSWORD
      ===================================== */

      if (isForgot) {

        if (
          !captcha.validate()
        ) {

          toast.error(
            "Captcha is incorrect."
          );

          captcha.refresh();

          return;

        }

        await authApi.resetPassword(
          form.email,
          form.password
        );

        toast.success(
          "Password reset successfully."
        );

        switchMode(
          "login"
        );

        return;

      }

      /* =====================================
         LOGIN
      ===================================== */

      if (isLogin) {

        if (
          selectedRole ===
            "admin" &&
          form.email !==
            ADMIN_EMAIL
        ) {

          toast.error(
            "Only the authorized admin can login."
          );

          return;

        }

        await signIn(
          form.email,
          form.password,
          selectedRole
        );

        toast.success(
          "Welcome back!"
        );

        return;

      }

      /* =====================================
         SIGNUP
      ===================================== */

      if (
        !validate()
      ) {

        return;

      }

      await signUp({

        email:
          form.email,

        password:
          form.password,

        fullName:
          form.fullName,

        role:
          selectedRole,

        studentId:
          form.studentId,

        facultyId:
          form.facultyId,

        departmentId:
          form.departmentId,

        semester:
          Number(
            form.semester
          ),

        enrollmentYear:
          Number(
            form.enrollmentYear
          ),

        designation:
          form.designation,

        mobile:
          form.mobile,

      });

      toast.success(
        "Registration request submitted successfully. Please wait for approval."
      );

      switchMode(
        "login"
      );

    } catch (error: any) {

      toast.error(
        error.message ??
        "Authentication failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return {

    mode,
    setMode,

    isLogin,
    isSignup,
    isForgot,

    selectedRole,
    setSelectedRole,

    form,
    updateField,

    loading,

    departments,

    captcha,

    switchMode,

    handleSubmit,

    handleExploreDemo,

  };

}