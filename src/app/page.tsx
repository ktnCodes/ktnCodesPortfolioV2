import { Hero } from "@/components/home/hero";
import { HowIThink } from "@/components/home/how-i-think";
import { WhatICanDo } from "@/components/home/what-i-can-do";
import { SkillsStack } from "@/components/home/skills-stack";
import { AskMeAnything } from "@/components/home/ask-me-anything";

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto">
      <Hero />
      <HowIThink />
      <WhatICanDo />
      <SkillsStack />
      <AskMeAnything />
    </div>
  );
}
