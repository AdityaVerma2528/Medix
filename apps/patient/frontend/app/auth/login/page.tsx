"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";

import { AuthLayout } from "@/components/auth/layout";
import { AuthCard } from "@/components/auth/card";
import { AuthHeader } from "@/components/auth/header";
import { AuthInput } from "@/components/auth/input";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthCheckbox } from "@/components/auth/checkbox";
import { AuthButton } from "@/components/auth/button";
import { Divider } from "@/components/auth/divider";
import { SocialButton } from "@/components/auth/social-button";
import { AuthFooter } from "@/components/auth/footer";
import { loginWithPassword, requestLoginOtp, verifyLoginOtp } from "@/lib/auth";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

type LoginMethod = "PASSWORD" | "OTP";

interface FormErrors {
  email?: string;
  password?: string;
  otp?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [loginMethod, setLoginMethod] = useState<LoginMethod>("PASSWORD");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: FormErrors = {};

    if (!email) {
      next.email = "Enter your email address";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Enter a valid email address";
    }

    if (loginMethod === "PASSWORD") {
      if (!password) {
        next.password = "Enter your password";
      }
    }

    if (loginMethod === "OTP" && otpSent) {
      if (!otp) {
        next.otp = "Enter the OTP";
      } else if (!/^\d{6}$/.test(otp)) {
        next.otp = "OTP must be 6 digits";
      }
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function handleLoginMethodChange(method: LoginMethod) {
    setLoginMethod(method);

    setOtpSent(false);
    setOtp("");
    setErrors({});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (loginMethod === "PASSWORD") {
        const response = await loginWithPassword({
          email,
          password,
        });

        console.log("Password login response:", response);
        toast.success("Welcome back");
        router.push("/dashboard");
        return;
      }

      if (!otpSent) {
        const response = await requestLoginOtp({
          email,
        });

        console.log("OTP request response:", response);
        setOtpSent(true);
        toast.success("OTP sent to your email");

        return;
      }

      const response = await verifyLoginOtp({
        email,
        otp,
      });

      console.log("OTP verification response:", response);
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);

        toast.error(
          error.response?.data?.message ||
          "Something went wrong. Try again."
        );
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to pick up right where you left off."
        />

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          className="space-y-4"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 gap-1 rounded-lg bg-white/5 p-1"
          >
            <button
              type="button"
              onClick={() =>
                handleLoginMethodChange("PASSWORD")
              }
              className={`rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${loginMethod === "PASSWORD"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white"
                }`}
            >
              Password
            </button>

            <button
              type="button"
              onClick={() =>
                handleLoginMethodChange("OTP")
              }
              className={`rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${loginMethod === "OTP"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white"
                }`}
            >
              Email OTP
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
          >
            <AuthInput
              label="Email"
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (errors.email) {
                  setErrors((previous) => ({
                    ...previous,
                    email: undefined,
                  }));
                }
              }}
              error={errors.email}
            />
          </motion.div>

          {loginMethod === "PASSWORD" && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.35 }}
            >
              <PasswordInput
                label="Password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((previous) => ({
                      ...previous,
                      password: undefined,
                    }));
                  }
                }}
                error={errors.password}
              />
            </motion.div>
          )}

          {loginMethod === "OTP" && otpSent && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.35 }}
            >
              <AuthInput
                label="Verification code"
                icon={ShieldCheck}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                  setOtp(value);

                  if (errors.otp) {
                    setErrors((previous) => ({
                      ...previous,
                      otp: undefined,
                    }));
                  }
                }}
                error={errors.otp}
              />
            </motion.div>
          )}

          {loginMethod === "PASSWORD" && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-between pt-1"
            >
              <AuthCheckbox
                checked={remember}
                onChange={setRemember}
                label="Remember me"
              />

              <Link
                href="/forgot-password"
                className="text-[13px] font-medium text-[#8CA0FF] transition-colors duration-150 hover:text-[#A7B7FF]"
              >
                Forgot password?
              </Link>
            </motion.div>
          )}

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            className="pt-1"
          >
            <AuthButton loading={loading}>
              {loginMethod === "PASSWORD"
                ? "Sign in"
                : otpSent
                  ? "Verify OTP"
                  : "Send OTP"}
            </AuthButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
          >
            <Divider />
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
          >
            <SocialButton />
          </motion.div>
        </motion.form>

        <AuthFooter
          text="Don't have an account?"
          linkLabel="Create one"
          href="/signup"
        />
      </AuthCard>
    </AuthLayout>
  );
}