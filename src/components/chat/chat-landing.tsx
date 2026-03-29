"use client";

import { User, Code2, Wrench, BookOpen } from "lucide-react";
import { presetQuestions } from "@/lib/config";
import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  getPresentation: <User className="w-4 h-4" />,
  getProjects: <Code2 className="w-4 h-4" />,
  getSkills: <Wrench className="w-4 h-4" />,
  getBlogPosts: <BookOpen className="w-4 h-4" />,
};

interface Props {
  onSelect: (question: string) => void;
}

export function ChatLanding({ onSelect }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">
          Hi, I&apos;m <span className="text-accent">Kevin</span>.
        </h1>
        <p className="text-muted text-lg max-w-md">
          Software Engineer — Embedded Systems &amp; AI. Ask me anything about
          my work, or pick a question below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {presetQuestions.map((q) => (
          <button
            key={q.label}
            onClick={() => onSelect(q.label)}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-left hover:border-accent/50 hover:bg-surface/80 transition-colors group"
          >
            <span className="text-muted group-hover:text-accent transition-colors">
              {icons[q.tool] ?? <User className="w-4 h-4" />}
            </span>
            <span>{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
