"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./section-eyebrow";
import { EvidenceTrail } from "./schematics/evidence-trail";
import { IcmPipeline } from "./schematics/icm-pipeline";
import { WorkshopClock } from "./schematics/workshop-clock";

type Row = {
  number: string;
  eyebrow: string;
  caption: string;
  note: string;
  visual: React.ReactNode;
  reverse?: boolean;
};

const rows: Row[] = [
  {
    number: "01",
    eyebrow: "EVIDENCE TRAIL",
    caption: "Claims need citations. Every assertion needs file:line evidence.",
    note: "Bug investigations start with logs, not code. I build an event timeline, then chase each line to a file and a cause. No speculation shipped.",
    visual: <EvidenceTrail />,
  },
  {
    number: "02",
    eyebrow: "ICM PIPELINE",
    caption: "Vertical slices. Every stage leaves a trail.",
    note: "Interpretable Context Methodology: five stages, each with a named artifact. Intake -> Investigate -> Implement -> Verify -> Review. Every stage is inspectable by the next human or agent in the loop.",
    visual: <IcmPipeline />,
    reverse: true,
  },
  {
    number: "03",
    eyebrow: "WORKSHOP CLOCK",
    caption: "Two modes. Both ship.",
    note: "Office hours are execution: focused, meetings, pushes. Workshop hours 23:00-04:00 are tinkering: prototypes, experiments, the clicks that become tomorrow's features.",
    visual: <WorkshopClock />,
  },
];

export function HowIThink() {
  return (
    <section className="relative py-32 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-6xl px-6 space-y-24">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="01">HOW I THINK</SectionEyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            Pattern matcher first. Evidence-backed always.
          </h2>
        </div>
        {rows.map((r) => (
          <motion.div
            key={r.number}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 md:grid-cols-12 gap-10 items-center ${r.reverse ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="md:col-span-7 border border-[var(--hairline)] bg-[var(--surface)] p-6">
              {r.visual}
            </div>
            <div className="md:col-span-5 space-y-4">
              <SectionEyebrow number={r.number}>{r.eyebrow}</SectionEyebrow>
              <p className="text-xl md:text-2xl text-foreground leading-snug">
                {r.caption}
              </p>
              <p className="text-sm text-muted leading-relaxed">{r.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
