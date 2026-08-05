"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function LoginPage() {
  const backendUrl = "http://localhost:5000"; 
  const router = useRouter(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!email) next.email = "Enter your email address";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address";
    if (!password) next.password = "Enter your password";
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
      }

      const response = await axios.post(`${backendUrl}/auth/login`, data, { 
        withCredentials: true,
      }); 

      if (response.status === 200) { 
        toast.success("Welcome back");
        router.push("/dashboard"); 
      }
    } catch(error: any) {
      console.error(error);

      if (isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);
      }
    
      toast.error("Something went wrong. Try again.");
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
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="space-y-4"
        >
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

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
            <PasswordInput
              label="Password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </motion.div>

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

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="pt-1">
            <AuthButton loading={loading}>Sign in</AuthButton>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
            <Divider />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.35 }}>
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