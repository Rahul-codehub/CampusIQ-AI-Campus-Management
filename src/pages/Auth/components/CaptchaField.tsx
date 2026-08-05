import {
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import AuthInput from "./AuthInput";

import type {
  CaptchaState,
} from "../types";

interface CaptchaFieldProps {
  captcha: CaptchaState;

  answer: string;

  setAnswer: (
    value: string
  ) => void;

  refresh: () => void;
}

export default function CaptchaField({
  captcha,
  answer,
  setAnswer,
  refresh,
}: CaptchaFieldProps) {
  return (
    <div className="space-y-4">

      {/* Header */}

      <div className="flex items-center gap-2">

        <ShieldCheck className="h-5 w-5 text-cyan-300" />

        <h3 className="text-sm font-semibold text-slate-200">
          Security Verification
        </h3>

      </div>

      {/* Captcha Card */}

      <div
        className="
          rounded-2xl
          border
          border-white/20
          bg-white/10
          backdrop-blur-xl
          p-5
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-300">
              Solve the equation
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-widest text-white font-mono">
              {captcha.question} = ?
            </h2>

          </div>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={refresh}
            className="
              rounded-xl
              bg-white/10
              hover:bg-white/20
              border
              border-white/20
            "
          >
            <RefreshCw className="h-5 w-5 text-white" />
          </Button>

        </div>

      </div>

      {/* Answer */}

      <AuthInput
        label="Verification Answer"
        icon={ShieldCheck}
        value={answer}
        placeholder="Enter the answer"
        onChange={setAnswer}
      />

    </div>
  );
}