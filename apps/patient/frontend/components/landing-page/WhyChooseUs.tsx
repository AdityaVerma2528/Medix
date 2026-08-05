"use client";

import { motion } from "framer-motion";
import { whyChooseUs } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <section className="section-y relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Why choose Vitalis</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-primary">
            Care you don&apos;t have to double-check
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 rounded-2xl p-6 border border-white/[0.06] hover:border-accent-cyan/30 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-vital/10 text-accent-vital">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
