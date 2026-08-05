"use client";

import { motion } from "framer-motion";
import { Layers, ShieldCheck, Zap } from "lucide-react";
import { AnimatedBackground } from "./animated-background";
import { BrandMark } from "./brand-mark";

const FEATURES = [
  {
    icon: Zap,
    title: "Built for speed",
    description: "Every interaction responds in milliseconds, not seconds.",
  },
  {
    icon: Layers,
    title: "One workspace",
    description: "Your team, your tools, your data — all in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description: "Enterprise-grade encryption on every plan, always on.",
  },
] as const;

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared shell for /login and /signup. Left panel carries the brand
 * story and is hidden below lg; right panel centers the auth card.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBackground />

      <div className="relative z-10 flex min-h-screen w-full flex-col lg:flex-row">
        {/* Left — brand storytelling panel */}
        <div className="relative hidden w-full flex-col justify-between overflow-hidden px-16 py-14 lg:flex lg:w-[46%]">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <BrandMark />
          </motion.div>

          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#9DAFFF]"
            >
              Acme Platform
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
              className="mt-4 text-[2.5rem] font-semibold leading-[1.12] tracking-tight text-white"
            >
              The workspace that moves as fast as your team.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.26 }}
              className="mt-4 text-[15px] leading-relaxed text-[#98A2B8]"
            >
              Plan, ship, and track your best work — in a single, focused
              interface built for people who care about craft.
            </motion.p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.36 } },
              }}
              className="mt-10 space-y-5"
            >
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <motion.li
                  key={title}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex items-start gap-3.5"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-[#B7C2FF]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-white">{title}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[#8791A6]">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[12px] text-[#5C6577]"
          >
            © {new Date().getFullYear()} Acme, Inc. All rights reserved.
          </motion.p>
        </div>

        {/* Right — auth card */}
        <div className="flex w-full flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:w-[54%] lg:px-16">
          <div className="w-full max-w-[400px]">
            {/* brand mark visible only when the left panel is hidden */}
            <div className="mb-8 flex justify-center lg:hidden">
              <BrandMark />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}