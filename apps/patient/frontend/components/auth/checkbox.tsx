"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  id?: string;
  className?: string;
}

export function AuthCheckbox({
  checked,
  onChange,
  label,
  id,
  className,
}: AuthCheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <button
        type="button"
        role="checkbox"
        id={checkboxId}
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#6E8CFF]/30",
          checked
            ? "border-transparent bg-gradient-to-br from-[#5B8CFF] to-[#8B6BFF]"
            : "border-white/15 bg-white/[0.03] hover:border-white/25"
        )}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </button>
      <label
        htmlFor={checkboxId}
        className="cursor-pointer select-none text-[13px] leading-snug text-[#8791A6]"
      >
        {label}
      </label>
    </div>
  );
}