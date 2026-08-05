"use client";

import { motion } from "framer-motion";

/**
 * Shared ambient background for the auth split-layout.
 * Mirrors the landing page's dark canvas: soft radial glows,
 * a faint grid, and two slow-drifting blurred blobs.
 *
 * Purely decorative — aria-hidden, pointer-events disabled.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#06070C]"
    >
      {/* faint structural grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* base ambient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(78,127,255,0.16),transparent_60%)]" />

      {/* blue blob */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-[#4E7FFF]/25 blur-[120px]"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* purple blob */}
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] h-[480px] w-[480px] rounded-full bg-[#9B6BFF]/20 blur-[130px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* thin center glow line, echoes landing hero */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* vignette to keep edges quiet */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_55%,#06070C_100%)]" />
    </div>
  );
}