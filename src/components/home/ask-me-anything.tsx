"use client";

import { presetQuestions } from "@/lib/config";
import { useChatContext } from "@/components/chat/chat-context";
import { SectionEyebrow } from "./section-eyebrow";

export function AskMeAnything() {
  const { openWith } = useChatContext();

  return (
    <section className="relative py-32 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="04">ASK KEVIN ANYTHING</SectionEyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            A chat, powered by my notes.
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-lg">
            Ask about projects, tools, embedded debugging war stories, or what I am reading this week. Pick a preset to deeplink straight into a streaming answer.
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {presetQuestions.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => openWith(q.label)}
                className="group border border-[var(--hairline)] bg-[var(--surface)] px-4 py-4 text-left small-caps text-xs tracking-widest text-muted hover:text-foreground hover:border-accent transition-colors flex items-center justify-between gap-3"
              >
                <span>{q.label}</span>
                <span aria-hidden className="text-accent opacity-60 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => openWith()}
            className="small-caps text-xs tracking-widest text-accent hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            OR ASK ANYTHING <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
