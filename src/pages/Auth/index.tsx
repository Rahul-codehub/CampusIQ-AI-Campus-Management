import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import AuthHeader from "./components/AuthHeader";
// import RoleSelector from "./components/RoleSelector";
import RoleCards from "./components/RoleCards";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import HeroSection from "./components/HeroSection";
// import AuthHero from "./components/AuthHero";
import BackgroundBlobs from "./components/BackgroundBlobs";
import { useAuthForm } from "./hooks/useAuthForm";
import AuthTabs from "./components/AuthTabs";

export default function AuthPage() {

  const {
    isLogin,
    isSignup,
    isForgot,
    selectedRole,
    setSelectedRole,
    form,
    updateField,
    departments,
    loading,
    captcha,
    switchMode,
    handleSubmit,
  } = useAuthForm();

  const title =
    isLogin
      ? "Welcome Back"
      : isSignup
        ? "Create Account"
        : "Reset Password";

  const description =
    isLogin
      ? "Sign in to continue."
      : isSignup
        ? "Create your CampusIQ account."
        : "Reset your password.";

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">

      <BackgroundBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[90vh]">

          {/* LEFT */}
          <HeroSection />
          {/* <AuthHero /> */}

          {/* RIGHT */}

          <Card
            className="
    w-full
    max-w-xl
    mx-auto
    border
    border-white/20
    rounded-3xl
    bg-white/10
    backdrop-blur-2xl
    shadow-[0_20px_80px_rgba(0,0,0,0.35)]
"
          >

            <CardContent className="p-10 text-white">
              <AuthHeader
                title={title}
                description={description}
              />

              {/* ==========================
              LOGIN / REGISTER
          ========================== */}

              {/* <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 mb-6">

                <Button
                  className="h-11 rounded-xl"

                  type="button"

                  variant={
                    isLogin
                      ? "default"
                      : "outline"
                  }

                  onClick={() =>
                    switchMode("login")
                  }

                >

                  Login

                </Button>

                <Button
                  className="h-11 rounded-xl"

                  type="button"

                  variant={
                    isSignup
                      ? "default"
                      : "outline"
                  }

                  disabled={
                    selectedRole === "admin"
                  }

                  onClick={() =>
                    switchMode("signup")
                  }

                >

                  Register

                </Button>

              </div> */}
              <AuthTabs
  isLogin={isLogin}
  isSignup={isSignup}
  selectedRole={selectedRole}
  switchMode={switchMode}
/>
              <RoleCards
                // <RoleSelector

                selectedRole={
                  selectedRole
                }

                onChange={
                  setSelectedRole
                }

                disableAdminSignup={
                  isSignup
                }

              />

              <form
                onSubmit={
                  handleSubmit
                }
                className="mt-8"
              >
                {isLogin && (
                  <LoginForm
                    form={form}
                    loading={loading}
                    updateField={updateField}
                    onForgotPassword={() =>
                      switchMode("forgot")
                    }
                  />
                )}

                {isSignup && (
                  <SignupForm
                    form={form}
                    updateField={updateField}
                    selectedRole={selectedRole}
                    departments={departments}
                    loading={loading}
                    captcha={captcha}
                  />
                )}

                {isForgot && (
                  <ForgotPasswordForm
                    form={form}
                    loading={loading}
                    updateField={updateField}
                    captcha={captcha}
                  />
                )}

              </form>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>

  );

}