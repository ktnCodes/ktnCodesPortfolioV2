"use client";

import { useEffect, useState } from "react";

const TITLES = [
  "Embedded Systems Engineer",
  "AI / Agentic Engineering",
  "AI Solutions Architect",
];

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1800;

type Phase = "typing" | "deleting";

export function RotatingTitle() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const full = TITLES[idx];
    if (phase === "typing") {
      if (text.length < full.length) {
        const t = setTimeout(() => setText(full.slice(0, text.length + 1)), TYPE_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (text.length > 0) {
      const t = setTimeout(() => setText(full.slice(0, text.length - 1)), DELETE_MS);
      return () => clearTimeout(t);
    }
    // Defer the rotation transition so the setState is in an async callback
    // (avoids react-hooks/set-state-in-effect; behavior is identical).
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % TITLES.length);
      setPhase("typing");
    }, 0);
    return () => clearTimeout(t);
  }, [text, phase, idx]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-foreground">{text}</span>
      <span
        aria-hidden
        className="ml-[2px] inline-block w-[3px] h-[0.85em] bg-accent animate-caret-blink translate-y-[3px]"
      />
    </span>
  );
}
