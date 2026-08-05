// import { Input } from "@/components/ui/input";

// import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import AuthInput from "./AuthInput";

import {
    Mail,
    Lock,
} from "lucide-react";
import type {
  SignupFormData,
} from "../types";

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

}

export default function LoginForm({

  form,

  loading,

  updateField,

  onForgotPassword,

}: LoginFormProps) {

  return (

    <div className="space-y-5">

      {/* Email */}

      <div className="space-y-2">

      <AuthInput
    label="Email"
    placeholder="you@example.com"
    value={form.email}
    icon={Mail}
    onChange={(value)=>
        updateField("email", value)
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
    onChange={(value)=>
        updateField("password", value)
    }
/>

      </div>

      {/* Forgot Password */}

      <div className="flex justify-end mt-2 mb-5">

  <button
    type="button"
    onClick={onForgotPassword}
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

      {/* Login */}

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

    </div>

  );

}