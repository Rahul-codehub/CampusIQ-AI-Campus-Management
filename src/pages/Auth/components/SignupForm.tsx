// // import { Input } from "@/components/ui/input";

// // import { Label } from "@/components/ui/label";

// import { Button } from "@/components/ui/button";
// import AuthInput from "./AuthInput";
// import { BadgeCheck } from "lucide-react";

// import {
//     Mail,
//     Lock,
// } from "lucide-react";

// import type {
//     Department,
// } from "@/integrations/mongodb/types";

// import type {
//     SignupFormData,
// } from "../types";

// import StudentFields from "./StudentFields";

// import FacultyFields from "./FacultyFields";

// import CaptchaField from "./CaptchaField";

// interface SignupFormProps {

//     form: SignupFormData;

//     updateField: <
//         K extends keyof SignupFormData
//     >(
//         key: K,
//         value: SignupFormData[K]
//     ) => void;

//     selectedRole:
//     "student" |
//     "faculty" |
//     "admin";

//     departments: Department[];

//     loading: boolean;

//     captcha: {

//         captcha: {
//             question: string;
//             answer: string;
//         };

//         answer: string;

//         setAnswer: (
//             value: string
//         ) => void;

//         refresh: () => void;

//     };

// }
// export default function SignupForm({

//     form,

//     updateField,

//     selectedRole,

//     departments,

//     loading,

//     captcha,

// }: SignupFormProps) {

//     return (

//         <div className="space-y-5">
//             <div className="space-y-2">

            


//             </div>
//             <div className="space-y-2">

//                 <AuthInput
//     label="Email"
//     icon={Mail}
//     value={form.email}
//     placeholder="abc@gmail.com"
//     onChange={(value)=>
//         updateField("email", value)
//     }
// />

//             </div>
//             <div className="grid grid-cols-2 gap-4">

//                 <div className="space-y-2">

//                     <AuthInput
//     label="Password"
//     type="password"
//     icon={Lock}
//     value={form.password}
//     onChange={(value)=>
//         updateField("password", value)
//     }
// />

//                 </div>

//                 <div className="space-y-2">

//                     <AuthInput
//     label="Password"
//     type="password"
//     icon={Lock}
//     value={form.password}
//     onChange={(value)=>
//         updateField("password", value)
//     }
// />

//                 </div>

//             </div>

//             {/* =========================================
//           ROLE SPECIFIC FIELDS
//       ========================================= */}

//             {selectedRole === "student" && (

//                 <StudentFields
//                     form={form}
//                     departments={departments}
//                     updateField={updateField}
//                 />

//             )}

//             {selectedRole === "faculty" && (

//                 <FacultyFields
//                     form={form}
//                     departments={departments}
//                     updateField={updateField}
//                 />

//             )}
//             {/* =========================================
//           CAPTCHA
//       ========================================= */}

//             <CaptchaField

//                 captcha={captcha.captcha}

//                 answer={captcha.answer}

//                 setAnswer={
//                     captcha.setAnswer
//                 }

//                 refresh={
//                     captcha.refresh
//                 }

//             />
//             {/* =========================================
//           REGISTER
//       ========================================= */}

//             <Button
//   type="submit"
//   disabled={loading}
//   className="
//     mt-2
//     h-14
//     w-full
//     rounded-2xl
//     bg-gradient-to-r
//     from-blue-600
//     via-indigo-500
//     to-cyan-500
//     text-base
//     font-semibold
//     text-white
//     shadow-[0_12px_35px_rgba(37,99,235,0.45)]
//     transition-all
//     duration-300
//     hover:-translate-y-1
//     hover:scale-[1.02]
//     hover:shadow-[0_18px_45px_rgba(37,99,235,0.60)]
//     active:scale-[0.98]
//   "
// >
//   {loading ? (
//     <div className="flex items-center gap-2">
//       <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//       Creating Account...
//     </div>
//   ) : (
//     "Create Account"
//   )}
// </Button>
//         </div>

//     );

// }


import { Button } from "@/components/ui/button";
import AuthInput from "./AuthInput";
import { BadgeCheck, Mail, Lock, User } from "lucide-react";

import type { Department } from "@/integrations/mongodb/types";
import type { SignupFormData } from "../types";

import StudentFields from "./StudentFields";
import FacultyFields from "./FacultyFields";
import CaptchaField from "./CaptchaField";

interface SignupFormProps {

    form: SignupFormData;

    updateField: <
        K extends keyof SignupFormData
    >(
        key: K,
        value: SignupFormData[K]
    ) => void;

    selectedRole:
    "student" |
    "faculty" |
    "admin";

    departments: Department[];

    loading: boolean;

    captcha: {

        captcha: {
            question: string;
            answer: string;
        };

        answer: string;

        setAnswer: (
            value: string
        ) => void;

        refresh: () => void;

    };

}
export default function SignupForm({

    form,

    updateField,

    selectedRole,

    departments,

    loading,

    captcha,

}: SignupFormProps) {
    return (
  <div className="space-y-5">

    {/* =========================================
        FULL NAME
    ========================================= */}
    <div className="space-y-2">
      <AuthInput
        label="Full Name"
        icon={User}
        value={form.fullName}
        placeholder="Enter your full name"
        onChange={(value) => updateField("fullName", value)}
      />
    </div>

    {/* =========================================
        EMAIL
    ========================================= */}
    <div className="space-y-2">
      <AuthInput
        label="Email"
        icon={Mail}
        value={form.email}
        placeholder="abc@gmail.com"
        onChange={(value) => updateField("email", value)}
      />
    </div>

    {/* =========================================
        PASSWORD
    ========================================= */}
    <div className="grid grid-cols-2 gap-4">

      <div className="space-y-2">
        <AuthInput
          label="Password"
          type="password"
          icon={Lock}
          value={form.password}
          placeholder="Enter password"
          onChange={(value) => updateField("password", value)}
        />
      </div>

      <div className="space-y-2">
        <AuthInput
          label="Confirm Password"
          type="password"
          icon={Lock}
          value={form.confirmPassword}
          placeholder="Confirm password"
          onChange={(value) =>
            updateField("confirmPassword", value)
          }
        />
      </div>

    </div>

    {/* =========================================
        ROLE SPECIFIC FIELDS
    ========================================= */}

    {selectedRole === "student" && (
      <StudentFields
        form={form}
        departments={departments}
        updateField={updateField}
      />
    )}

    {selectedRole === "faculty" && (
      <FacultyFields
        form={form}
        departments={departments}
        updateField={updateField}
      />
    )}

    {/* =========================================
        CAPTCHA
    ========================================= */}

    <CaptchaField
      captcha={captcha.captcha}
      answer={captcha.answer}
      setAnswer={captcha.setAnswer}
      refresh={captcha.refresh}
    />

    {/* =========================================
        REGISTER
    ========================================= */}

    <Button
      type="submit"
      disabled={loading}
      className="
        mt-2
        h-14
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        via-indigo-500
        to-cyan-500
        text-base
        font-semibold
        text-white
        shadow-[0_12px_35px_rgba(37,99,235,0.45)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-[0_18px_45px_rgba(37,99,235,0.60)]
        active:scale-[0.98]
      "
    >
      {loading ? "Creating Account..." : "Create Account"}
    </Button>

  </div>
);
}