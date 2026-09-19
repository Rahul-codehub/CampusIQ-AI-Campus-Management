// // import { Input } from "@/components/ui/input";

// // import { Label } from "@/components/ui/label";

// import { Button } from "@/components/ui/button";

// import AuthInput from "./AuthInput";

// import {
//     Mail,
//     Lock,
// } from "lucide-react";
// import type {
//   SignupFormData,
// } from "../types";

// interface LoginFormProps {

//   form: SignupFormData;

//   loading: boolean;

//   updateField: <
//     K extends keyof SignupFormData
//   >(
//     key: K,
//     value: SignupFormData[K]
//   ) => void;

//   onForgotPassword: () => void;

// }

// export default function LoginForm({

//   form,

//   loading,

//   updateField,

//   onForgotPassword,

// }: LoginFormProps) {

//   return (

//     <div className="space-y-5">

//       {/* Email */}

//       <div className="space-y-2">

//       <AuthInput
//     label="Email"
//     placeholder="you@example.com"
//     value={form.email}
//     icon={Mail}
//     onChange={(value)=>
//         updateField("email", value)
//     }
// />

//       </div>

//       {/* Password */}

//       <div className="space-y-2">

//         <AuthInput
//     label="Password"
//     type="password"
//     placeholder="••••••••"
//     value={form.password}
//     icon={Lock}
//     onChange={(value)=>
//         updateField("password", value)
//     }
// />

//       </div>

//       {/* Forgot Password */}

//       <div className="flex justify-end mt-2 mb-5">

//   <button
//     type="button"
//     onClick={onForgotPassword}
//     className="
//       text-sm
//       font-medium
//       text-cyan-300
//       transition-all
//       duration-300
//       hover:text-white
//       hover:underline
//       hover:underline-offset-4
//       hover:scale-105
//     "
//   >
//     Forgot Password?
//   </button>

// </div>

//       {/* Login */}

//       <Button
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
//       Signing In...
//     </div>
//   ) : (
//     "Sign In"
//   )}
// </Button>

//     </div>

//   );

// }





// import { Button } from "@/components/ui/button";
// import AuthInput from "./AuthInput";

// import {
//   Mail,
//   Lock,
//   Rocket,
// } from "lucide-react";

// import type {
//   SignupFormData,
// } from "../types";

// interface LoginFormProps {
//   form: SignupFormData;

//   loading: boolean;

//   updateField: <
//     K extends keyof SignupFormData
//   >(
//     key: K,
//     value: SignupFormData[K]
//   ) => void;

//   onForgotPassword: () => void;

//   onExploreDemo?: () => void;
// }

// export default function LoginForm({
//   form,
//   loading,
//   updateField,
//   onForgotPassword,
//   onExploreDemo,
// }: LoginFormProps) {

//   return (
//     <div className="space-y-5">

//       {/* Email */}
//       <div className="space-y-2">
//         <AuthInput
//           label="Email"
//           placeholder="you@example.com"
//           value={form.email}
//           icon={Mail}
//           onChange={(value) =>
//             updateField("email", value)
//           }
//         />
//       </div>

//       {/* Password */}
//       <div className="space-y-2">
//         <AuthInput
//           label="Password"
//           type="password"
//           placeholder="••••••••"
//           value={form.password}
//           icon={Lock}
//           onChange={(value) =>
//             updateField("password", value)
//           }
//         />
//       </div>

//       {/* Forgot Password */}
//       <div className="flex justify-end mt-2 mb-5">
//         <button
//           type="button"
//           onClick={onForgotPassword}
//           className="
//             text-sm
//             font-medium
//             text-cyan-300
//             transition-all
//             duration-300
//             hover:text-white
//             hover:underline
//             hover:underline-offset-4
//             hover:scale-105
//           "
//         >
//           Forgot Password?
//         </button>
//       </div>

//       {/* Login */}
//       <Button
//         type="submit"
//         disabled={loading}
//         className="
//           mt-2
//           h-14
//           w-full
//           rounded-2xl
//           bg-gradient-to-r
//           from-blue-600
//           via-indigo-500
//           to-cyan-500
//           text-base
//           font-semibold
//           text-white
//           shadow-[0_12px_35px_rgba(37,99,235,0.45)]
//           transition-all
//           duration-300
//           hover:-translate-y-1
//           hover:scale-[1.02]
//           hover:shadow-[0_18px_45px_rgba(37,99,235,0.60)]
//           active:scale-[0.98]
//         "
//       >
//         {loading ? (
//           <div className="flex items-center gap-2">
//             <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//             Signing In...
//           </div>
//         ) : (
//           "Sign In"
//         )}
//       </Button>

//       {/* Demo Divider */}
//       <div className="relative py-2">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-white/20" />
//         </div>

//         <div className="relative flex justify-center">
//           <span className="bg-transparent px-4 text-xs font-medium uppercase tracking-wider text-white/50">
//             or explore
//           </span>
//         </div>
//       </div>

//       {/* Explore Demo */}
//       <Button
//         type="button"
//         variant="outline"
//         onClick={onExploreDemo}
//         disabled={loading}
//         className="
//           h-14
//           w-full
//           rounded-2xl
//           border
//           border-cyan-300/30
//           bg-white/5
//           text-base
//           font-semibold
//           text-cyan-100
//           backdrop-blur-md
//           transition-all
//           duration-300
//           hover:-translate-y-1
//           hover:border-cyan-300/60
//           hover:bg-cyan-400/10
//           hover:text-white
//           hover:shadow-[0_12px_35px_rgba(34,211,238,0.18)]
//           active:scale-[0.98]
//         "
//       >
//         <Rocket className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
//         Explore CampusIQ Demo
//       </Button>

//     </div>
//   );
// }











// import { useState } from "react";

// import { Button } from "@/components/ui/button";

// import AuthInput from "./AuthInput";

// import {
//   Mail,
//   Lock,
//   Rocket,
//   GraduationCap,
//   Users,
//   ShieldCheck,
//   ArrowLeft,
// } from "lucide-react";

// import type { SignupFormData } from "../types";

// type DemoRole =
//   | "student"
//   | "faculty"
//   | "admin";

// interface DemoCredentials {
//   email: string;
//   password: string;
// }

// interface LoginFormProps {
//   form: SignupFormData;
//   loading: boolean;

//   updateField: <
//     K extends keyof SignupFormData
//   >(
//     key: K,
//     value: SignupFormData[K]
//   ) => void;

//   onForgotPassword: () => void;

//   onExploreDemo?: (
//     role: DemoRole,
//     credentials: DemoCredentials
//   ) => void;
// }

// const DEMO_ACCOUNTS: Record<
//   DemoRole,
//   DemoCredentials
// > = {
//   student: {
//     email:
//       "demo.student@campusiq.demo",
//     password:
//       "CampusIQ@Demo2026",
//   },

//   faculty: {
//     email:
//       "demo.faculty@campusiq.demo",
//     password:
//       "CampusIQ@Demo2026",
//   },

//   admin: {
//     email:
//       "demo.admin@campusiq.demo",
//     password:
//       "CampusIQ@Demo2026",
//   },
// };

// const DEMO_ROLES = [
//   {
//     role: "student" as DemoRole,
//     title: "Student Demo",
//     description:
//       "Explore student features and workflows.",
//     icon: GraduationCap,
//   },

//   {
//     role: "faculty" as DemoRole,
//     title: "Faculty Demo",
//     description:
//       "Explore faculty management features.",
//     icon: Users,
//   },

//   {
//     role: "admin" as DemoRole,
//     title: "Admin Demo",
//     description:
//       "Explore administration and management.",
//     icon: ShieldCheck,
//   },
// ];

// export default function LoginForm({
//   form,
//   loading,
//   updateField,
//   onForgotPassword,
//   onExploreDemo,
// }: LoginFormProps) {

//   const [
//     demoOpen,
//     setDemoOpen,
//   ] = useState(false);

//   const [
//     demoStep,
//     setDemoStep,
//   ] = useState<
//     "role" | "credentials"
//   >("role");

//   const [
//     demoRole,
//     setDemoRole,
//   ] = useState<DemoRole | null>(
//     null
//   );

//   const [
//     demoEmail,
//     setDemoEmail,
//   ] = useState("");

//   const [
//     demoPassword,
//     setDemoPassword,
//   ] = useState("");

//   const openDemo = () => {
//     setDemoOpen(true);
//     setDemoStep("role");
//     setDemoRole(null);
//     setDemoEmail("");
//     setDemoPassword("");
//   };

//   const closeDemo = () => {
//     setDemoOpen(false);
//     setDemoStep("role");
//     setDemoRole(null);
//     setDemoEmail("");
//     setDemoPassword("");
//   };

//   const selectDemoRole = (
//     role: DemoRole
//   ) => {
//     const credentials =
//       DEMO_ACCOUNTS[role];

//     setDemoRole(role);

//     setDemoEmail(
//       credentials.email
//     );

//     setDemoPassword(
//       credentials.password
//     );

//     setDemoStep(
//       "credentials"
//     );
//   };

//   const handleDemoLogin = () => {

//     if (
//       !demoRole ||
//       !demoEmail.trim() ||
//       !demoPassword.trim()
//     ) {
//       return;
//     }

//     onExploreDemo?.(
//       demoRole,
//       {
//         email:
//           demoEmail.trim(),
//         password:
//           demoPassword,
//       }
//     );
//   };

//   return (
//     <div className="space-y-5">

//       {/* Email */}
//       <div className="space-y-2">
//         <AuthInput
//           label="Email"
//           placeholder="you@example.com"
//           value={form.email}
//           icon={Mail}
//           onChange={(value) =>
//             updateField(
//               "email",
//               value
//             )
//           }
//         />
//       </div>

//       {/* Password */}
//       <div className="space-y-2">
//         <AuthInput
//           label="Password"
//           type="password"
//           placeholder="••••••••"
//           value={form.password}
//           icon={Lock}
//           onChange={(value) =>
//             updateField(
//               "password",
//               value
//             )
//           }
//         />
//       </div>

//       {/* Forgot Password */}
//       <div className="flex justify-end mt-2 mb-5">
//         <button
//           type="button"
//           onClick={
//             onForgotPassword
//           }
//           className="
//             text-sm
//             font-medium
//             text-cyan-300
//             transition-all
//             duration-300
//             hover:text-white
//             hover:underline
//             hover:underline-offset-4
//             hover:scale-105
//           "
//         >
//           Forgot Password?
//         </button>
//       </div>

//       {/* Normal Login */}
//       <Button
//         type="submit"
//         disabled={loading}
//         className="
//           mt-2
//           h-14
//           w-full
//           rounded-2xl
//           bg-gradient-to-r
//           from-blue-600
//           via-indigo-500
//           to-cyan-500
//           text-base
//           font-semibold
//           text-white
//           shadow-[0_12px_35px_rgba(37,99,235,0.45)]
//           transition-all
//           duration-300
//           hover:-translate-y-1
//           hover:scale-[1.02]
//           hover:shadow-[0_18px_45px_rgba(37,99,235,0.60)]
//           active:scale-[0.98]
//         "
//       >
//         {loading ? (
//           <div className="flex items-center gap-2">
//             <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//             Signing In...
//           </div>
//         ) : (
//           "Sign In"
//         )}
//       </Button>

//       {/* Demo Divider */}
//       <div className="relative py-2">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-white/20" />
//         </div>

//         <div className="relative flex justify-center">
//           <span className="bg-transparent px-4 text-xs font-medium uppercase tracking-wider text-white/50">
//             or explore
//           </span>
//         </div>
//       </div>

//       {/* Demo Button */}
//       <Button
//         type="button"
//         variant="outline"
//         onClick={openDemo}
//         disabled={loading}
//         className="
//           group
//           h-14
//           w-full
//           rounded-2xl
//           border
//           border-cyan-300/30
//           bg-white/5
//           text-base
//           font-semibold
//           text-cyan-100
//           backdrop-blur-md
//           transition-all
//           duration-300
//           hover:-translate-y-1
//           hover:border-cyan-300/60
//           hover:bg-cyan-400/10
//           hover:text-white
//           hover:shadow-[0_12px_35px_rgba(34,211,238,0.18)]
//           active:scale-[0.98]
//         "
//       >
//         <Rocket
//           className="
//             mr-2
//             h-5
//             w-5
//             transition-transform
//             duration-300
//             group-hover:-translate-y-1
//           "
//         />

//         Explore CampusIQ Demo
//       </Button>

//       {/* =====================================
//           DEMO MODAL
//       ===================================== */}

//       {demoOpen && (
//         <div
//           className="
//             fixed
//             inset-0
//             z-[100]
//             flex
//             items-center
//             justify-center
//             bg-black/70
//             px-4
//             backdrop-blur-sm
//           "
//           onClick={closeDemo}
//         >
//           <div
//             className="
//               w-full
//               max-w-lg
//               rounded-3xl
//               border
//               border-white/20
//               bg-slate-950/95
//               p-7
//               text-white
//               shadow-[0_25px_100px_rgba(0,0,0,0.55)]
//               backdrop-blur-2xl
//             "
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >

//             {/* Header */}
//             <div className="mb-6">

//               <div className="mb-3 flex items-center gap-3">

//                 <div
//                   className="
//                     flex
//                     h-11
//                     w-11
//                     items-center
//                     justify-center
//                     rounded-2xl
//                     bg-cyan-400/10
//                     text-cyan-300
//                   "
//                 >
//                   <Rocket
//                     className="h-5 w-5"
//                   />
//                 </div>

//                 <div>
//                   <h2 className="text-xl font-bold">
//                     Explore CampusIQ
//                   </h2>

//                   <p className="text-sm text-white/50">
//                     Demo Mode
//                   </p>
//                 </div>

//               </div>

//               <p className="text-sm leading-6 text-white/60">
//                 Choose a role to explore CampusIQ
//                 from that user's perspective.
//               </p>

//             </div>

//             {/* ROLE SELECTION */}
//             {demoStep === "role" && (
//               <div className="space-y-3">

//                 {DEMO_ROLES.map(
//                   ({
//                     role,
//                     title,
//                     description,
//                     icon: Icon,
//                   }) => (
//                     <button
//                       key={role}
//                       type="button"
//                       onClick={() =>
//                         selectDemoRole(
//                           role
//                         )
//                       }
//                       className="
//                         group
//                         flex
//                         w-full
//                         items-center
//                         gap-4
//                         rounded-2xl
//                         border
//                         border-white/10
//                         bg-white/5
//                         p-4
//                         text-left
//                         transition-all
//                         duration-300
//                         hover:-translate-y-0.5
//                         hover:border-cyan-300/40
//                         hover:bg-cyan-400/10
//                       "
//                     >

//                       <div
//                         className="
//                           flex
//                           h-12
//                           w-12
//                           shrink-0
//                           items-center
//                           justify-center
//                           rounded-xl
//                           bg-indigo-500/15
//                           text-cyan-300
//                           transition-all
//                           group-hover:bg-cyan-400/15
//                         "
//                       >
//                         <Icon
//                           className="h-6 w-6"
//                         />
//                       </div>

//                       <div>
//                         <div className="font-semibold">
//                           {title}
//                         </div>

//                         <div className="mt-1 text-xs text-white/50">
//                           {description}
//                         </div>
//                       </div>

//                     </button>
//                   )
//                 )}

//               </div>
//             )}

//             {/* CREDENTIALS */}
//             {demoStep ===
//               "credentials" &&
//               demoRole && (
//                 <div className="space-y-5">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setDemoStep(
//                         "role"
//                       )
//                     }
//                     className="
//                       flex
//                       items-center
//                       gap-2
//                       text-sm
//                       text-cyan-300
//                       transition-colors
//                       hover:text-white
//                     "
//                   >
//                     <ArrowLeft
//                       className="h-4 w-4"
//                     />
//                     Change Role
//                   </button>

//                   <div
//                     className="
//                       rounded-2xl
//                       border
//                       border-cyan-300/20
//                       bg-cyan-400/5
//                       p-4
//                     "
//                   >
//                     <p className="text-xs uppercase tracking-wider text-cyan-300/70">
//                       Selected Demo
//                     </p>

//                     <p className="mt-1 text-lg font-semibold">
//                       {
//                         DEMO_ROLES.find(
//                           (item) =>
//                             item.role ===
//                             demoRole
//                         )?.title
//                       }
//                     </p>
//                   </div>

//                   <div className="space-y-4">

//                     <div>
//                       <label className="mb-2 block text-sm font-medium text-white/80">
//                         Demo Email
//                       </label>

//                       <input
//                         type="email"
//                         value={
//                           demoEmail
//                         }
//                         onChange={(event) =>
//                           setDemoEmail(
//                             event.target.value
//                           )
//                         }
//                         className="
//                           h-12
//                           w-full
//                           rounded-xl
//                           border
//                           border-white/10
//                           bg-white/5
//                           px-4
//                           text-sm
//                           text-white
//                           outline-none
//                           transition
//                           placeholder:text-white/30
//                           focus:border-cyan-300/50
//                           focus:bg-white/10
//                         "
//                         placeholder="Enter demo email"
//                       />
//                     </div>

//                     <div>
//                       <label className="mb-2 block text-sm font-medium text-white/80">
//                         Demo Password
//                       </label>

//                       <input
//                         type="password"
//                         value={
//                           demoPassword
//                         }
//                         onChange={(event) =>
//                           setDemoPassword(
//                             event.target.value
//                           )
//                         }
//                         className="
//                           h-12
//                           w-full
//                           rounded-xl
//                           border
//                           border-white/10
//                           bg-white/5
//                           px-4
//                           text-sm
//                           text-white
//                           outline-none
//                           transition
//                           placeholder:text-white/30
//                           focus:border-cyan-300/50
//                           focus:bg-white/10
//                         "
//                         placeholder="Enter demo password"
//                       />
//                     </div>

//                   </div>

//                   <Button
//                     type="button"
//                     disabled={
//                       loading ||
//                       !demoEmail.trim() ||
//                       !demoPassword.trim()
//                     }
//                     onClick={
//                       handleDemoLogin
//                     }
//                     className="
//                       h-13
//                       w-full
//                       rounded-2xl
//                       bg-gradient-to-r
//                       from-blue-600
//                       via-indigo-500
//                       to-cyan-500
//                       text-base
//                       font-semibold
//                       text-white
//                       shadow-[0_12px_35px_rgba(37,99,235,0.35)]
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1
//                       hover:shadow-[0_18px_45px_rgba(37,99,235,0.5)]
//                       active:scale-[0.98]
//                     "
//                   >
//                     {loading ? (
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                         Entering Demo...
//                       </div>
//                     ) : (
//                       <>
//                         <Rocket className="mr-2 h-5 w-5" />
//                         Enter Demo
//                       </>
//                     )}
//                   </Button>

//                   <p className="text-center text-xs leading-5 text-white/40">
//                     Demo accounts use sample CampusIQ
//                     data and do not affect real users.
//                   </p>

//                 </div>
//               )}

//             {/* Close */}
//             <button
//               type="button"
//               onClick={closeDemo}
//               className="
//                 mt-6
//                 w-full
//                 text-center
//                 text-xs
//                 text-white/40
//                 transition-colors
//                 hover:text-white/70
//               "
//             >
//               Cancel
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }






import { useState } from "react";

import { Button } from "@/components/ui/button";

import AuthInput from "./AuthInput";

import {
  Mail,
  Lock,
  Rocket,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import type { SignupFormData } from "../types";

type DemoRole =
  | "student"
  | "faculty"
  | "admin";

interface DemoCredentials {
  email: string;
  password: string;
}

interface LoginFormProps {
  form: SignupFormData;
  loading: boolean;

  updateField: <
    K extends keyof SignupFormData
  >(
    key: K,
    value: SignupFormData[K]
  ) => void;

  onForgotPassword: () => void;

  onExploreDemo?: (
    role: DemoRole,
    credentials: DemoCredentials
  ) => void;
}

const DEMO_ACCOUNTS: Record<
  DemoRole,
  DemoCredentials
> = {
  student: {
    email:
      "demo.student@campusiq.demo",
    password:
      "CampusIQ@Demo2026",
  },

  faculty: {
    email:
      "demo.faculty@campusiq.demo",
    password:
      "CampusIQ@Demo2026",
  },

  admin: {
    email:
      "demo.admin@campusiq.demo",
    password:
      "CampusIQ@Demo2026",
  },
};

const DEMO_ROLES = [
  {
    role: "student" as DemoRole,
    title: "Student Demo",
    description:
      "Explore student features and workflows.",
    icon: GraduationCap,
  },
  {
    role: "faculty" as DemoRole,
    title: "Faculty Demo",
    description:
      "Explore faculty management features.",
    icon: Users,
  },
  {
    role: "admin" as DemoRole,
    title: "Admin Demo",
    description:
      "Explore administration and management.",
    icon: ShieldCheck,
  },
];

export default function LoginForm({
  form,
  loading,
  updateField,
  onForgotPassword,
  onExploreDemo,
}: LoginFormProps) {

  const [
    demoOpen,
    setDemoOpen,
  ] = useState(false);

  const [
    demoStep,
    setDemoStep,
  ] = useState<
    "role" | "credentials"
  >("role");

  const [
    demoRole,
    setDemoRole,
  ] = useState<DemoRole | null>(
    null
  );

  const [
    demoEmail,
    setDemoEmail,
  ] = useState("");

  const [
    demoPassword,
    setDemoPassword,
  ] = useState("");

  const [
    showDemoPassword,
    setShowDemoPassword,
  ] = useState(false);

  const openDemo = () => {
    setDemoOpen(true);
    setDemoStep("role");
    setDemoRole(null);
    setDemoEmail("");
    setDemoPassword("");
    setShowDemoPassword(false);
  };

  const closeDemo = () => {
    setDemoOpen(false);
    setDemoStep("role");
    setDemoRole(null);
    setDemoEmail("");
    setDemoPassword("");
    setShowDemoPassword(false);
  };

  const selectDemoRole = (
    role: DemoRole
  ) => {
    const credentials =
      DEMO_ACCOUNTS[role];

    setDemoRole(role);

    setDemoEmail(
      credentials.email
    );

    setDemoPassword(
      credentials.password
    );

    setShowDemoPassword(false);

    setDemoStep(
      "credentials"
    );
  };

  const handleDemoLogin = () => {

    if (
      !demoRole ||
      !demoEmail.trim() ||
      !demoPassword.trim()
    ) {
      return;
    }

    onExploreDemo?.(
      demoRole,
      {
        email:
          demoEmail.trim(),
        password:
          demoPassword,
      }
    );
  };

  return (
    <div className="space-y-5">

      {/* Email */}
      <div className="space-y-2">
        <AuthInput
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          icon={Mail}
          onChange={(value) =>
            updateField(
              "email",
              value
            )
          }
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          icon={Lock}
          onChange={(value) =>
            updateField(
              "password",
              value
            )
          }
        />
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end mt-2 mb-5">
        <button
          type="button"
          onClick={
            onForgotPassword
          }
          className="
            text-sm
            font-medium
            text-cyan-300
            transition-all
            duration-300
            hover:text-white
            hover:underline
            hover:underline-offset-4
            hover:scale-105
          "
        >
          Forgot Password?
        </button>
      </div>

      {/* Normal Login */}
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
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Demo Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-transparent px-4 text-xs font-medium uppercase tracking-wider text-white/50">
            or explore
          </span>
        </div>
      </div>

      {/* Demo Button */}
      <Button
        type="button"
        variant="outline"
        onClick={openDemo}
        disabled={loading}
        className="
          group
          h-14
          w-full
          rounded-2xl
          border
          border-cyan-300/30
          bg-white/5
          text-base
          font-semibold
          text-cyan-100
          backdrop-blur-md
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-300/60
          hover:bg-cyan-400/10
          hover:text-white
          hover:shadow-[0_12px_35px_rgba(34,211,238,0.18)]
          active:scale-[0.98]
        "
      >
        <Rocket
          className="
            mr-2
            h-5
            w-5
            transition-transform
            duration-300
            group-hover:-translate-y-1
          "
        />

        Explore CampusIQ Demo
      </Button>

      {/* =====================================
          DEMO MODAL
      ===================================== */}

      {demoOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            px-4
            backdrop-blur-sm
          "
          onClick={closeDemo}
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              border
              border-white/20
              bg-slate-950/95
              p-7
              text-white
              shadow-[0_25px_100px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Header */}
            <div className="mb-6">

              <div className="mb-3 flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-cyan-400/10
                    text-cyan-300
                  "
                >
                  <Rocket
                    className="h-5 w-5"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Explore CampusIQ
                  </h2>

                  <p className="text-sm text-white/50">
                    Demo Mode
                  </p>
                </div>

              </div>

              <p className="text-sm leading-6 text-white/60">
                Choose a role to explore CampusIQ
                from that user's perspective.
              </p>

            </div>

            {/* ROLE SELECTION */}
            {demoStep === "role" && (
              <div className="space-y-3">

                {DEMO_ROLES.map(
                  ({
                    role,
                    title,
                    description,
                    icon: Icon,
                  }) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        selectDemoRole(
                          role
                        )
                      }
                      className="
                        group
                        flex
                        w-full
                        items-center
                        gap-4
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        p-4
                        text-left
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-cyan-300/40
                        hover:bg-cyan-400/10
                      "
                    >

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-indigo-500/15
                          text-cyan-300
                          transition-all
                          group-hover:bg-cyan-400/15
                        "
                      >
                        <Icon
                          className="h-6 w-6"
                        />
                      </div>

                      <div>
                        <div className="font-semibold">
                          {title}
                        </div>

                        <div className="mt-1 text-xs text-white/50">
                          {description}
                        </div>
                      </div>

                    </button>
                  )
                )}

              </div>
            )}

            {/* CREDENTIALS */}
            {demoStep ===
              "credentials" &&
              demoRole && (
                <div className="space-y-5">

                  <button
                    type="button"
                    onClick={() =>
                      setDemoStep(
                        "role"
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-cyan-300
                      transition-colors
                      hover:text-white
                    "
                  >
                    <ArrowLeft
                      className="h-4 w-4"
                    />
                    Change Role
                  </button>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-cyan-300/20
                      bg-cyan-400/5
                      p-4
                    "
                  >
                    <p className="text-xs uppercase tracking-wider text-cyan-300/70">
                      Selected Demo
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      {
                        DEMO_ROLES.find(
                          (item) =>
                            item.role ===
                            demoRole
                        )?.title
                      }
                    </p>
                  </div>

                  <div className="space-y-4">

                    {/* Demo Email */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Demo Email
                      </label>

                      <input
                        type="email"
                        value={
                          demoEmail
                        }
                        onChange={(event) =>
                          setDemoEmail(
                            event.target.value
                          )
                        }
                        className="
                          h-12
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-white/5
                          px-4
                          text-sm
                          text-white
                          outline-none
                          transition
                          placeholder:text-white/30
                          focus:border-cyan-300/50
                          focus:bg-white/10
                        "
                        placeholder="Enter demo email"
                      />
                    </div>

                    {/* Demo Password */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Demo Password
                      </label>

                      <div className="relative">

                        <input
                          type={
                            showDemoPassword
                              ? "text"
                              : "password"
                          }
                          value={
                            demoPassword
                          }
                          onChange={(event) =>
                            setDemoPassword(
                              event.target.value
                            )
                          }
                          className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            pr-12
                            text-sm
                            text-white
                            outline-none
                            transition
                            placeholder:text-white/30
                            focus:border-cyan-300/50
                            focus:bg-white/10
                          "
                          placeholder="Enter demo password"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowDemoPassword(
                              (previous) =>
                                !previous
                            )
                          }
                          className="
                            absolute
                            right-2
                            top-1/2
                            flex
                            h-9
                            w-9
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-lg
                            text-white/50
                            transition-all
                            duration-200
                            hover:bg-white/10
                            hover:text-cyan-300
                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400/40
                          "
                          aria-label={
                            showDemoPassword
                              ? "Hide demo password"
                              : "Show demo password"
                          }
                        >
                          {showDemoPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>

                      </div>
                    </div>

                  </div>

                  <Button
                    type="button"
                    disabled={
                      loading ||
                      !demoEmail.trim() ||
                      !demoPassword.trim()
                    }
                    onClick={
                      handleDemoLogin
                    }
                    className="
                      h-13
                      w-full
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-600
                      via-indigo-500
                      to-cyan-500
                      text-base
                      font-semibold
                      text-white
                      shadow-[0_12px_35px_rgba(37,99,235,0.35)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-[0_18px_45px_rgba(37,99,235,0.5)]
                      active:scale-[0.98]
                    "
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Entering Demo...
                      </div>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-5 w-5" />
                        Enter Demo
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs leading-5 text-white/40">
                    Demo accounts use sample CampusIQ
                    data and do not affect real users.
                  </p>

                </div>
              )}

            {/* Close */}
            <button
              type="button"
              onClick={closeDemo}
              className="
                mt-6
                w-full
                text-center
                text-xs
                text-white/40
                transition-colors
                hover:text-white/70
              "
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}