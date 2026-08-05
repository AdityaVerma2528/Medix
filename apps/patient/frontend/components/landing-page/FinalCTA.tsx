"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { PulseLineHorizontal } from "./PulseLine";

export function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow blur-3xl animate-pulse-glow" />
      </div>

      <div className="container-px mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card px-8 py-16 sm:px-16 sm:py-20 relative"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-primary max-w-2xl mx-auto">
            Your next refill is a tap away
          </h2>
          <p className="mt-4 text-ink-muted max-w-xl mx-auto">
            Log in to your account or place an order in minutes — no clinic
            visit required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover:shadow-glow-cyan transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Login
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl glass px-7 py-3.5 text-sm font-semibold text-ink-primary hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <ShoppingBag size={16} />
              Order Medicines
            </a>
          </div>

          <div className="mt-14 h-10 w-full max-w-md mx-auto opacity-50">
            <PulseLineHorizontal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
