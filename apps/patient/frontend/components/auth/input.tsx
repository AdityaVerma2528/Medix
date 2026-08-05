"use client";

import { forwardRef, useId, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon: Icon, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [focused, setFocused] = useState(false);

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-[13px] font-medium text-[#C4CBDA]"
        >
          {label}
        </label>

        <div className="relative">
          <Icon
            className={cn(
              "pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 transition-colors duration-200",
              error
                ? "text-red-400"
                : focused
                  ? "text-[#8CA0FF]"
                  : "text-[#5C6577]"
            )}
            strokeWidth={1.75}
          />

          <input
            ref={ref}
            id={inputId}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "w-full rounded-[11px] border bg-white/[0.03] py-2.5 pl-10 pr-3.5 text-[14px] text-white placeholder:text-[#5C6577] outline-none transition-all duration-200",
              "focus:bg-white/[0.05]",
              error
                ? "border-red-500/50 focus:border-red-400/70 focus:ring-[3px] focus:ring-red-500/10"
                : "border-white/[0.08] focus:border-[#6E8CFF]/60 focus:ring-[3px] focus:ring-[#6E8CFF]/[0.12]",
              className
            )}
            {...props}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              id={`${inputId}-error`}
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[12.5px] text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";