"use client";

import Image from "next/image";
import { User, Code2, Wrench, BookOpen } from "lucide-react";
import { presetQuestions } from "@/lib/config";
import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  getPresentation: <User className="w-4 h-4" />,
  getProjects: <Code2 className="w-4 h-4" />,
  getSkills: <Wrench className="w-4 h-4" />,
  getBlogPosts: <BookOpen className="w-4 h-4" />,
};

const pillars = ["Embedded Systems", "Agentic Engineering", "Production C++"];

interface Props {
  onSelect: (question: string) => void;
}

export function ChatLanding({ onSelect }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-8 relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[280px] rounded-full bg-accent/10 blur-3xl pointer-events-none animate-[glow-pulse_8s_ease-in-out_infinite]"
      />

      <div className="text-center space-y-4 relative">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-accent/30 flex-shrink-0">
            <Image
              src="/avatarwithWinnie.jpg"
              alt="Kevin Nguyen"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Hi, I&apos;m{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--accent) 0%, #67e8f9 100%)",
              }}
            >
              Kevin
            </span>
            .
          </h1>
        </div>
        <p className="text-muted text-lg max-w-md leading-relaxed">
          Software Engineer building production embedded systems and AI-powered
          developer tools.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {pillars.map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 text-xs rounded-full border border-accent/30 text-accent/80 bg-accent/5"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg relative">
        {presetQuestions.map((q) => (
          <button
            key={q.label}
            onClick={() => onSelect(q.label)}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-sm text-left hover:border-accent/50 hover:bg-surface/80 transition-all group"
          >
            <span className="p-2 rounded-lg bg-background border border-border text-muted group-hover:text-accent group-hover:border-accent/40 transition-colors flex-shrink-0">
              {icons[q.tool] ?? <User className="w-4 h-4" />}
            </span>
            <span className="font-medium">{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
