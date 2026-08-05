"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-8 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-9",
        className
      )}
    >
      {/* hairline top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[22px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </motion.div>
  );
}