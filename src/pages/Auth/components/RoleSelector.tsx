// import type { AppRole } from "@/integrations/mongodb/types";

// import { Button } from "@/components/ui/button";

// import { ROLE_OPTIONS } from "../constants";

// interface RoleSelectorProps {
//   selectedRole: AppRole;
//   onChange: (role: AppRole) => void;
//   disableAdminSignup?: boolean;
// }

// export default function RoleSelector({
//   selectedRole,
//   onChange,
//   disableAdminSignup = false,
// }: RoleSelectorProps) {

//   return (

//     <div className="space-y-2">

//       <h3 className="text-sm font-medium">
//         Login As
//       </h3>

//       <div className="grid grid-cols-3 gap-3">

//         {ROLE_OPTIONS.map((role) => {

//           const Icon = role.icon;

//           const selected =
//             selectedRole === role.role;

//           return (

//             <Button
//               key={role.role}
//               type="button"
//               variant={
//                 selected
//                   ? "default"
//                   : "outline"
//               }
//               disabled={
//                 disableAdminSignup &&
//                 role.role === "admin"
//               }
//               onClick={() =>
//                 onChange(role.role)
//               }
//               className="h-20 flex flex-col gap-2"
//             >

//               <Icon className="h-5 w-5" />

//               <span>
//                 {role.label}
//               </span>

//             </Button>

//           );

//         })}

//       </div>

//     </div>

//   );

// }