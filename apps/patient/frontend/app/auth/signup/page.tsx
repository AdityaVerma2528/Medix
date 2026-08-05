"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

import { AuthLayout } from "@/components/auth/layout";
import { AuthCard } from "@/components/auth/card";
import { AuthHeader } from "@/components/auth/header";
import { AuthInput } from "@/components/auth/input";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { AuthCheckbox } from "@/components/auth/checkbox";
import { AuthButton } from "@/components/auth/button";
import { Divider } from "@/components/auth/divider";
import { SocialButton } from "@/components/auth/social-button";
import { AuthFooter } from "@/components/auth/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function SignupPage() {
  const router = useRouter(); 
  const backendUrl = "http://localhost:5000"; 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Enter your full name";
    if (!email) next.email = "Enter your email address";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address";
    if (!password) next.password = "Create a password";
    else if (password.length < 8) next.password = "Use at least 8 characters";
    if (confirmPassword !== password) next.confirmPassword = "Passwords don't match";
    if (!agreed) next.terms = "Accept the terms to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = {
        email,
        password,
        name
      }

      const response = await axios.post(`${backendUrl}/auth/signup`, data); 

      if (response.status === 200) { 
        toast.success("Account created");
        router.push("/login"); 
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create your account"
          subtitle="Start your workspace in under a minute."
        />

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.055 } } }}
          className="space-y-4"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
            <AuthInput
              label="Full name"
              icon={User}
              type="text"
              autoComplete="name"
              placeholder="Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
            <AuthInput
              label="Email"
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="space-y-2">
            <PasswordInput
              label="Password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <PasswordStrength password={password} />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
            <PasswordInput
              label="Confirm password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="pt-1">
            <AuthCheckbox
              checked={agreed}
              onChange={setAgreed}
              label={
                <>
                  I agree to the{" "}
                  <a href="/terms" className="text-[#8CA0FF] hover:text-[#A7B7FF]">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#8CA0FF] hover:text-[#A7B7FF]">
                    Privacy Policy
                  </a>
                </>
              }
            />
            {errors.terms && (
              <p role="alert" className="mt-1.5 text-[12.5px] text-red-400">
                {errors.terms}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="pt-1">
            <AuthButton loading={loading}>Create account</AuthButton>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
            <Divider />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
            <SocialButton />
          </motion.div>
        </motion.form>

        <AuthFooter
          text="Already have an account?"
          linkLabel="Sign in"
          href="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
}