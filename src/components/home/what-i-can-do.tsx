"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/config";
import { SectionEyebrow } from "./section-eyebrow";

function Card({
  title,
  description,
  techStack,
  statLabel,
  statValue,
  href,
}: {
  title: string;
  description: string;
  techStack: string[];
  statLabel: string;
  statValue: string;
  href?: string;
}) {
  const inner = (
    <div className="group relative h-full border border-[var(--hairline)] bg-[var(--surface)] p-6 flex flex-col gap-6 transition-colors hover:border-accent">
      <div className="flex-1">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-light tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {techStack.slice(0, 6).map((t) => (
          <span
            key={t}
            className="small-caps text-[10px] text-muted border border-[var(--hairline)] px-2 py-1"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between border-t border-[var(--hairline)] pt-4">
        <div>
          <div className="font-mono text-lg text-foreground leading-none">
            {statValue}
          </div>
          <div className="small-caps text-[10px] text-muted mt-1">
            {statLabel}
          </div>
        </div>
        {href ? (
          <span className="small-caps text-[10px] text-accent">VIEW →</span>
        ) : (
          <span className="small-caps text-[10px] text-muted">INTERNAL</span>
        )}
      </div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {inner}
      </a>
    );
  }
  return <div className="h-full">{inner}</div>;
}

function deriveStat(title: string, techStack: string[]) {
  if (title === "AutoPath Guidance") {
    return { statValue: "4", statLabel: "PRODUCT LINES" };
  }
  if (title === "Team LLM Knowledge Base") {
    return { statValue: "0 -> DAILY", statLabel: "COPILOT ADOPTION" };
  }
  if (title === "YouTube Research Report Tool") {
    return { statValue: "FastMCP", statLabel: "MCP TOOL SERVER" };
  }
  if (title === "ICM Template") {
    return { statValue: "OSS", statLabel: "METHODOLOGY" };
  }
  return {
    statValue: techStack[0] ?? "-",
    statLabel: "STACK",
  };
}

export function WhatICanDo() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6 space-y-12">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="02">WHAT I CAN DO</SectionEyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            Shipped. Adopted. Maintained.
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featured.map((p) => {
            const href = p.links.live ?? p.links.github;
            const stat = deriveStat(p.title, p.techStack);
            return (
              <Card
                key={p.title}
                title={p.title}
                description={p.description}
                techStack={p.techStack}
                href={href}
                {...stat}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
