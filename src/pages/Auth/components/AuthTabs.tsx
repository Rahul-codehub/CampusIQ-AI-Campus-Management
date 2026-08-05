// import { Button } from "@/components/ui/button";

// interface Props {
//   isLogin: boolean;
//   isSignup: boolean;
//   onLogin: () => void;
//   onSignup: () => void;
// }

// export default function AuthTabs({
//   isLogin,
//   isSignup,
//   onLogin,
//   onSignup,
// }: Props) {
//   return (
//     <div className="rounded-2xl bg-slate-100 p-1 grid grid-cols-2">

//       <Button
//         type="button"
//         onClick={onLogin}
//         className={`
//           h-12
//           rounded-xl
//           transition-all
//           ${
//             isLogin
//               ? ""
//               : "bg-transparent text-slate-600 hover:bg-slate-200"
//           }
//         `}
//       >
//         Login
//       </Button>

//       <Button
//         type="button"
//         onClick={onSignup}
//         className={`
//           h-12
//           rounded-xl
//           transition-all
//           ${
//             isSignup
//               ? ""
//               : "bg-transparent text-slate-600 hover:bg-slate-200"
//           }
//         `}
//       >
//         Register
//       </Button>

//     </div>
//   );
// }

import { Button } from "@/components/ui/button";

interface AuthTabsProps {
  isLogin: boolean;
  isSignup: boolean;
  selectedRole: "student" | "faculty" | "admin";
  switchMode: (mode: "login" | "signup") => void;
}

export default function AuthTabs({
  isLogin,
  isSignup,
  selectedRole,
  switchMode,
}: AuthTabsProps) {
  return (
    <div
      className="
        flex
        rounded-2xl
        border
        border-white/10
        bg-white/10
        p-1
        backdrop-blur-xl
        mb-8
      "
    >
      <Button
        type="button"
        onClick={() => switchMode("login")}
        className={`
          flex-1
          h-12
          rounded-xl
          font-semibold
          transition-all
          duration-300
          ${
            isLogin
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
              : "bg-transparent text-slate-300 hover:bg-white/10"
          }
        `}
      >
        Login
      </Button>

      <Button
        type="button"
        disabled={selectedRole === "admin"}
        onClick={() => switchMode("signup")}
        className={`
          flex-1
          h-12
          rounded-xl
          font-semibold
          transition-all
          duration-300
          ${
            isSignup
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
              : "bg-transparent text-slate-300 hover:bg-white/10"
          }
        `}
      >
        Register
      </Button>
    </div>
  );
}