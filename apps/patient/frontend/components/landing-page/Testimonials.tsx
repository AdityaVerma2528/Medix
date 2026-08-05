"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section-y relative bg-base-surface2/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Patient stories</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-primary">
            What steady care sounds like
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className={idx < t.rating ? "fill-accent-cyan text-accent-cyan" : "text-white/10"}
                  />
                ))}
              </div>
              <blockquote className="text-sm text-ink-primary/90 leading-relaxed mb-6">
                &ldquo;{t.review}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan text-xs font-semibold text-white">
                  {initials(t.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-primary">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
