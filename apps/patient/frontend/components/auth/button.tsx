"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ConflictingProps =
  | "children"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd";

interface AuthButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps> {
  children: React.ReactNode;
  loading?: boolean;
}

export function AuthButton({
  children,
  loading = false,
  disabled,
  className,
  ...props
}: AuthButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type="submit"
      whileHover={isDisabled ? undefined : { scale: 1.012, y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.985, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      disabled={isDisabled}
      className={cn(
        "relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[11px] bg-gradient-to-b from-[#6E8CFF] to-[#5B72FF] py-2.5 text-[14px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-8px_rgba(91,114,255,0.55)] transition-opacity duration-200",
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />}
      {loading ? "Please wait" : children}
    </motion.button>
  );
}