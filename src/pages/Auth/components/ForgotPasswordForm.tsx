import {
  Mail,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import AuthInput from "./AuthInput";
import CaptchaField from "./CaptchaField";

import type {
  SignupFormData,
} from "../types";

interface ForgotPasswordFormProps {
  form: SignupFormData;

  loading: boolean;

  updateField: <
    K extends keyof SignupFormData
  >(
    key: K,
    value: SignupFormData[K]
  ) => void;

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

export default function ForgotPasswordForm({
  form,
  loading,
  updateField,
  captcha,
}: ForgotPasswordFormProps) {
  return (
    <div
      className="
        space-y-6
        animate-in
        fade-in-50
        slide-in-from-bottom-4
        duration-500
      "
    >
      {/* Email */}

      <AuthInput
        label="Email Address"
        icon={Mail}
        value={form.email}
        placeholder="Enter your email"
        onChange={(value) =>
          updateField(
            "email",
            value
          )
        }
      />

      {/* New Password */}

      <AuthInput
        label="New Password"
        type="password"
        icon={Lock}
        value={form.password}
        placeholder="Enter your new password"
        onChange={(value) =>
          updateField(
            "password",
            value
          )
        }
      />

      {/* Verification */}

      <CaptchaField
        captcha={
          captcha.captcha
        }
        answer={
          captcha.answer
        }
        setAnswer={
          captcha.setAnswer
        }
        refresh={
          captcha.refresh
        }
      />

      {/* Reset Button */}

      <Button
        type="submit"
        disabled={loading}
        className="
          h-12
          w-full
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          text-white
          shadow-xl
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:from-blue-500
          hover:to-cyan-400
        "
      >
        {loading
          ? "Resetting Password..."
          : "Reset Password"}
      </Button>

    </div>
  );
}