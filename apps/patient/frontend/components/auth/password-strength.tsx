"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const LEVELS = [
  { label: "Weak", color: "#F87171" },
  { label: "Fair", color: "#FBBF24" },
  { label: "Good", color: "#60A5FA" },
  { label: "Strong", color: "#34D399" },
];

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password);
  if (!password) return null;

  const level = LEVELS[Math.max(strength - 1, 0)];

  return (
    <div className="space-y-1.5 pt-0.5">
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.06]"
          >
            <motion.div
              className="h-full rounded-full"
              initial={false}
              animate={{
                width: i < strength ? "100%" : "0%",
                backgroundColor: level.color,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>
      <p
        className={cn("text-[12px] font-medium transition-colors")}
        style={{ color: strength > 0 ? level.color : "#5C6577" }}
      >
        {strength > 0 ? level.label : "Too short"}
      </p>
    </div>
  );
}