"use client";

import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [visible, setVisible] = useState(false);
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
          <Lock
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
            type={visible ? "text" : "password"}
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
              "w-full rounded-[11px] border bg-white/[0.03] py-2.5 pl-10 pr-11 text-[14px] text-white placeholder:text-[#5C6577] outline-none transition-all duration-200",
              "focus:bg-white/[0.05]",
              error
                ? "border-red-500/50 focus:border-red-400/70 focus:ring-[3px] focus:ring-red-500/10"
                : "border-white/[0.08] focus:border-[#6E8CFF]/60 focus:ring-[3px] focus:ring-[#6E8CFF]/[0.12]",
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6577] transition-colors duration-200 hover:text-[#C4CBDA] focus:outline-none focus-visible:text-[#8CA0FF]"
          >
            {visible ? (
              <EyeOff className="h-[17px] w-[17px]" strokeWidth={1.75} />
            ) : (
              <Eye className="h-[17px] w-[17px]" strokeWidth={1.75} />
            )}
          </button>
        </div>

        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-[12.5px] text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";