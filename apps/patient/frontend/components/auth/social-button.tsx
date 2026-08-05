"use client";

import { motion } from "framer-motion";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.6 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

interface SocialButtonProps {
  onClick?: () => void;
}

export function SocialButton({ onClick }: SocialButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.012, y: -1 }}
      whileTap={{ scale: 0.985, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="flex w-full items-center justify-center gap-2.5 rounded-[11px] border border-white/[0.08] bg-white/[0.03] py-2.5 text-[14px] font-medium text-[#E4E7ED] transition-colors duration-200 hover:bg-white/[0.06]"
    >
      <GoogleIcon />
      Continue with Google
    </motion.button>
  );
}