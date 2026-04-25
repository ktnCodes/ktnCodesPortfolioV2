"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/config";
import { SectionEyebrow } from "./section-eyebrow";

const CATEGORY_LABELS: Record<string, string> = {
  ai_agentic: "AI / AGENTIC",
  embedded_systems: "EMBEDDED SYSTEMS",
  languages: "LANGUAGES",
  debugging_testing: "DEBUGGING + TESTING",
  web_cloud: "WEB / CLOUD",
  devops_tools: "DEVOPS + TOOLS",
};

const CATEGORY_ORDER = [
  "ai_agentic",
  "embedded_systems",
  "languages",
  "debugging_testing",
  "web_cloud",
  "devops_tools",
];

export function SkillsStack() {
  return (
    <section className="relative py-32 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-6xl px-6 space-y-14">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="03">SKILLS &amp; STACK</SectionEyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            The toolkit I build with.
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-lg">
            Picked for range and depth — embedded C++ down to the CAN bus, agent orchestration up at the prompt layer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {CATEGORY_ORDER.map((key, i) => {
            const items = skills[key];
            if (!items?.length) return null;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3 text-muted">
                  <span className="font-mono text-[10px] tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-[var(--hairline)] max-w-10" />
                  <span className="small-caps text-[11px] text-foreground">
                    {CATEGORY_LABELS[key] ?? key.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="small-caps text-[11px] text-foreground border border-[var(--hairline)] px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
