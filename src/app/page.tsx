"use client";

import { useEffect } from "react";
import { Hero } from "@/components/home/hero";
import { HowIThink } from "@/components/home/how-i-think";
import { WhatICanDo } from "@/components/home/what-i-can-do";
import { AskMeAnything } from "@/components/home/ask-me-anything";

export default function Home() {
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "mytra");
    return () => {
      if (prev) {
        document.documentElement.setAttribute("data-theme", prev);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      <Hero />
      <HowIThink />
      <WhatICanDo />
      <AskMeAnything />
    </div>
  );
}
