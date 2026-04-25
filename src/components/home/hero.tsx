"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StatCell } from "./stat-cell";
import { RotatingTitle } from "./rotating-title";
import { HeroBackdrop } from "./hero-backdrop";

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
      <HeroBackdrop />
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-6xl w-full px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-40 h-40 md:w-52 md:h-52 flex-shrink-0 mx-auto md:mx-0"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/40">
                <Image
                  src="/avatarwithWinnie.jpg"
                  alt="Kevin Nguyen with Winnie"
                  fill
                  priority
                  sizes="(min-width: 768px) 208px, 160px"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-accent border-2 border-background" />
            </motion.div>
            <div className="space-y-5 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="small-caps text-sm md:text-base tracking-[0.22em] text-muted"
              >
                HI, I&apos;M{" "}
                <span className="text-foreground">KEVIN TRINH NGUYEN</span> —
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[0.95] min-h-[1.15em]"
              >
                <RotatingTitle />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="text-base md:text-lg text-muted max-w-2xl mx-auto md:mx-0"
              >
                Building AI-augmented systems with{" "}
                <span className="text-foreground">ICM</span> +{" "}
                <span className="text-foreground">MCP</span> +{" "}
                <span className="text-foreground">RAG</span>.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((s) => (
          <StatCell key={s.label} {...s} />
        ))}
      </motion.div>
    </section>
  );
}
