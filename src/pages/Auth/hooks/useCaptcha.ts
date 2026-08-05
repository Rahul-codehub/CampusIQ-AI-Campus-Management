import { useState } from "react";

import type {
  CaptchaState,
} from "../types";

import {
  createCaptcha,
  captchaMatches,
} from "../utils";

export function useCaptcha() {

  const [captcha, setCaptcha] =
    useState<CaptchaState>(
      createCaptcha()
    );

  const [answer, setAnswer] =
    useState("");

  const refresh = () => {

    setCaptcha(
      createCaptcha()
    );

    setAnswer("");

  };

  const validate = () => {

    return captchaMatches(
      captcha,
      answer
    );

  };

  return {

    captcha,

    answer,

    setAnswer,

    refresh,

    validate,

  };

}