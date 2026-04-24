import { Chat } from "@/components/chat/chat";
import { SectionEyebrow } from "./section-eyebrow";

export function AskMeAnything() {
  return (
    <section className="relative py-32 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="03">ASK KEVIN ANYTHING</SectionEyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            A chat, powered by my notes.
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-lg">
            Ask about projects, tools, embedded debugging war stories, or what I am reading this week.
          </p>
        </div>
        <div className="border border-[var(--hairline)] min-h-[420px] flex flex-col">
          <Chat />
        </div>
      </div>
    </section>
  );
}
