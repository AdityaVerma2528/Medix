"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Activity } from "lucide-react";
import { PulseLineHorizontal } from "./PulseLine";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-40 pb-28 sm:pt-48 sm:pb-36"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-base-bg" />
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl animate-pulse-glow" />
        <div className="absolute right-[8%] top-[20%] h-64 w-64 rounded-full bg-accent-cyan/20 blur-3xl animate-float" />
        <div className="absolute left-[6%] top-[35%] h-56 w-56 rounded-full bg-accent-vital/10 blur-3xl animate-float [animation-delay:-3s]" />
      </div>

      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-8"
          >
            <Activity size={14} className="text-accent-vital" />
            <span className="eyebrow">Care, continuously monitored</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            <span className="gradient-text">Healthcare that</span>
            <br />
            <span className="text-ink-primary">keeps up with you.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 text-lg sm:text-xl text-ink-muted max-w-xl mx-auto leading-relaxed"
          >
            Upload a prescription, order medicine, and talk to a licensed
            pharmacist — all from one secure account, without leaving home.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover:shadow-glow-cyan transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl glass px-7 py-3.5 text-sm font-semibold text-ink-primary hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <ShoppingBag size={16} />
              Order Medicines
            </a>
          </motion.div>
        </div>

        {/* Vitals trace divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 h-14 w-full max-w-4xl mx-auto opacity-70"
        >
          <PulseLineHorizontal />
        </motion.div>

        {/* Floating glass cards */}
        <div className="relative mt-4 h-[340px] sm:h-[380px] max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-0 w-[min(90vw,560px)] glass-card p-6 animate-float"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow">Order tracking</span>
              <span className="font-mono text-xs text-ink-faint">RX-284719</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-vital/10 text-accent-vital">
                <Truck size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-ink-primary font-medium">Out for delivery</p>
                <p className="text-xs text-ink-muted mt-0.5">Arriving today, 4:30 PM</p>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent-blue to-accent-vital" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[4%] sm:left-[8%] bottom-6 w-[min(80vw,280px)] glass-card p-5 animate-float [animation-delay:-2s]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm text-ink-primary font-medium">Prescription verified</p>
                <p className="text-xs text-ink-muted mt-0.5">By Dr. reviewed pharmacist</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[4%] sm:right-[8%] bottom-16 w-[min(80vw,240px)] glass-card p-5 animate-float [animation-delay:-4s]"
          >
            <p className="eyebrow mb-2">Next refill</p>
            <p className="text-2xl font-display font-semibold text-ink-primary">6 days</p>
            <p className="text-xs text-ink-muted mt-1">We&apos;ll remind you before it&apos;s due</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
