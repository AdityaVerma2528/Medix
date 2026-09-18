"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { isAxiosError } from "axios";

import {
  requestPasswordResetOtp,
  verifyPasswordResetOtp,
  resetPassword,
} from "@/lib/auth";

import { AuthLayout } from "@/components/auth/layout";
import { AuthCard } from "@/components/auth/card";
import { AuthHeader } from "@/components/auth/header";
import { AuthInput } from "@/components/auth/input";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthButton } from "@/components/auth/button";
import { AuthFooter } from "@/components/auth/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

type Step = "email" | "otp" | "password";

type FormErrors = {
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const [resetToken, setResetToken] = useState(""); 

  function validateEmail() {
    const next: FormErrors = {};

    if (!email.trim()) {
      next.email = "Enter your email address";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Enter a valid email address";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function validateOtp() {
    const next: FormErrors = {};

    if (!otp) {
      next.otp = "Enter the verification code";
    } else if (!/^\d{6}$/.test(otp)) {
      next.otp = "Enter a valid 6-digit code";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function validatePassword() {
    const next: FormErrors = {};

    if (!newPassword) {
      next.newPassword = "Enter a new password";
    } else if (newPassword.length < 8) {
      next.newPassword = "Use at least 8 characters";
    }

    if (!confirmPassword) {
      next.confirmPassword = "Confirm your new password";
    } else if (confirmPassword !== newPassword) {
      next.confirmPassword = "Passwords don't match";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  async function handleRequestOtp(e: FormEvent) {
    e.preventDefault();

    if (!validateEmail()) return;

    setLoading(true);

    try {
      await requestPasswordResetOtp({
        email,
      });

      toast.success("Verification code sent");

      setOtp("");
      setErrors({});
      setStep("otp");
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);

        toast.error(
          error.response?.data?.message ||
            "Unable to send verification code."
        );
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();

    if (!validateOtp()) return;

    setLoading(true);

    try {
      const response = await verifyPasswordResetOtp({
        email,
        otp,
      });

      if (!response?.resetToken) {
        throw new Error("Password reset token was not returned.");
      }

      setResetToken(response.resetToken); 

      toast.success("Code verified");

      setErrors({});
      setStep("password");
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);

        toast.error(
          error.response?.data?.message ||
            "Invalid or expired verification code."
        );
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();

    if (!validatePassword()) return;

    setLoading(true);

    try {
      await resetPassword({
        newPassword, 
      }, resetToken);

      toast.success("Password reset successfully");

      router.push("/login");
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);

        toast.error(
          error.response?.data?.message ||
            "Unable to reset your password."
        );
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setErrors({});

    if (step === "password") {
      setStep("otp");
      return;
    }

    if (step === "otp") {
      setStep("email");
      return;
    }

    router.push("/login");
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#8CA0FF] transition-colors duration-150 hover:text-[#A7B7FF]"
          >
            <ArrowLeft size={15} />
            Back
          </button>
        </div>

        {step === "email" && (
          <>
            <AuthHeader
              title="Forgot your password?"
              subtitle="Enter your email and we'll send you a verification code."
            />

            <motion.form
              onSubmit={handleRequestOtp}
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

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.35 }}
                className="pt-1"
              >
                <AuthButton loading={loading}>
                  Send verification code
                </AuthButton>
              </motion.div>
            </motion.form>
          </>
        )}

        {step === "otp" && (
          <>
            <AuthHeader
              title="Check your email"
              subtitle={`We sent a verification code to ${email}.`}
            />

            <motion.form
              onSubmit={handleVerifyOtp}
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
              >
                <AuthInput
                  label="Verification code"
                  icon={Mail}
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

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.35 }}
                className="pt-1"
              >
                <AuthButton loading={loading}>
                  Verify code
                </AuthButton>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setErrors({});
                  }}
                  className="text-[13px] font-medium text-[#8CA0FF] transition-colors hover:text-[#A7B7FF]"
                >
                  Use a different email
                </button>
              </motion.div>
            </motion.form>
          </>
        )}

        {step === "password" && (
          <>
            <AuthHeader
              title="Create a new password"
              subtitle="Choose a strong password for your account."
            />

            <motion.form
              onSubmit={handleResetPassword}
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
              >
                <PasswordInput
                  label="New password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);

                    if (errors.newPassword) {
                      setErrors((previous) => ({
                        ...previous,
                        newPassword: undefined,
                      }));
                    }
                  }}
                  error={errors.newPassword}
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.35 }}
              >
                <PasswordInput
                  label="Confirm password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);

                    if (errors.confirmPassword) {
                      setErrors((previous) => ({
                        ...previous,
                        confirmPassword: undefined,
                      }));
                    }
                  }}
                  error={errors.confirmPassword}
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.35 }}
                className="pt-1"
              >
                <AuthButton loading={loading}>
                  Reset password
                </AuthButton>
              </motion.div>
            </motion.form>
          </>
        )}

        <div className="mt-6">
          <AuthFooter
            text="Remember your password?"
            linkLabel="Sign in"
            href="/auth/login"
          />
        </div>
      </AuthCard>
    </AuthLayout>
  );
}