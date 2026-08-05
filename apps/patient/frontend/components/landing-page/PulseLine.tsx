"use client";

import { cn } from "@/lib/utils";

/**
 * The page's signature motif: a continuous vitals trace that runs
 * horizontally through the hero and vertically through the timeline.
 * A single flat line that breaks into a heartbeat at fixed intervals,
 * echoing a real ECG strip rather than a decorative squiggle.
 */
export function PulseLineHorizontal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 80"
      fill="none"
      preserveAspectRatio="none"
      className={cn("w-full h-full", className)}
      aria-hidden="true"
    >
      <path
        d="M0 40 H120 L145 40 L160 10 L180 70 L200 40 H340 L365 40 L380 10 L400 70 L420 40 H560 L585 40 L600 10 L620 70 L640 40 H780 L805 40 L820 10 L840 70 L860 40 H1000"
        stroke="url(#pulse-gradient-h)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 10"
        className="animate-dash-flow"
      />
      <defs>
        <linearGradient id="pulse-gradient-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
          <stop offset="15%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.9" />
          <stop offset="85%" stopColor="#34D399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PulseLineVertical({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 1000"
      fill="none"
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <path
        d="M40 0 V220 L40 245 L10 260 L70 280 L40 300 V520 L40 545 L10 560 L70 580 L40 600 V820 L40 845 L10 860 L70 880 L40 900 V1000"
        stroke="url(#pulse-gradient-v)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="pulse-gradient-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
