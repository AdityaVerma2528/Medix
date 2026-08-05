"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export function TrustedBy() {
  return (
    <section className="relative py-16 sm:py-20 border-y border-white/[0.06]">
      <div className="container-px mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-ink-faint mb-10"
        >
          Trusted by patients and pharmacies across the country
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-card p-6 text-center hover:bg-white/[0.06] hover:-translate-y-1"
            >
              <p className="font-display text-3xl sm:text-4xl font-semibold text-ink-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{stat.label}</p>
              <p className="mt-3 font-mono text-[10px] tracking-wider text-ink-faint/70">
                {stat.code}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
