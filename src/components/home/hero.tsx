"use client";

import { motion } from "framer-motion";
import { StatCell } from "./stat-cell";

const stats = [
  {
    value: "100+",
    label: "DEFECTS RESOLVED",
    caption: "C++ / Qt across Gen4OS 4060 + 4600",
  },
  {
    value: "0 -> DAILY",
    label: "COPILOT ADOPTION",
    caption: "Drove team-wide agentic uptake",
  },
  {
    value: "6",
    label: "AI SKILLS SHIPPED",
    caption: "Test gen, refactor safety, LLM diags",
  },
  {
    value: "4",
    label: "PRODUCT LINES",
    caption: "Boundaries, Rows, Zones, Pro",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden grain">
      <div className="flex-1 flex items-center">
        <div className="mx-auto max-w-6xl w-full px-6 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]"
          >
            KEVIN TRINH NGUYEN
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-base md:text-lg text-muted max-w-2xl"
          >
            I build agentic workflows, and debug the systems they break.
          </motion.p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mx-auto max-w-6xl w-full px-6 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((s) => (
          <StatCell key={s.label} {...s} />
        ))}
      </motion.div>
    </section>
  );
}
