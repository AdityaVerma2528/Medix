"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";

export function Features() {
  return (
    <section id="features" className="section-y relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow mb-4"
          >
            Everything in one place
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-primary"
          >
            Built for the way you actually manage care
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative glass-card p-6 overflow-hidden"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-blue/0 group-hover:bg-accent-blue/20 blur-2xl transition-all duration-500" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 text-accent-cyan mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="relative text-base font-semibold text-ink-primary mb-2">
                  {feature.title}
                </h3>
                <p className="relative text-sm text-ink-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
