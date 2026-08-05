"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/data";
import { PulseLineVertical } from "./PulseLine";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-y relative bg-base-surface2/40">
      <div className="container-px mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-primary">
            Four steps, one steady rhythm
          </h2>
          <p className="mt-4 text-ink-muted">
            Each step feeds the next, the way a pulse carries through a
            single continuous line.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 h-full w-10 sm:-translate-x-1/2 opacity-60">
            <PulseLineVertical />
          </div>

          <ol className="relative flex flex-col gap-14 sm:gap-20">
            {steps.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-20 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 items-center"
                >
                  <span
                    className="absolute left-6 sm:left-1/2 top-1 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-base-bg border-2 border-accent-cyan text-accent-cyan font-mono text-xs font-semibold z-10 shadow-glow-cyan"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>

                  <div
                    className={
                      isEven ? "sm:col-start-2" : "sm:col-start-1 sm:text-right sm:row-start-1"
                    }
                  >
                    <div className={`glass-card p-6 inline-block w-full sm:w-auto sm:min-w-[320px] ${isEven ? "" : "sm:ml-auto"}`}>
                      <h3 className="font-display text-lg font-semibold text-ink-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
