import type { Metadata } from "next";
import Image from "next/image";
import { getConfig } from "@/lib/config";
import { SectionEyebrow } from "@/components/home/section-eyebrow";
import { formatSkillCategory } from "./utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kevin Nguyen — Software Engineer specializing in embedded systems and AI/agentic engineering.",
};

export default function AboutPage() {
  const config = getConfig();
  const { personal, education, experience, skills, social } = config;

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-16 overflow-y-auto">
      {/* Header */}
      <section className="mb-16 space-y-6">
        <SectionEyebrow>ABOUT</SectionEyebrow>
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-accent/40 flex-shrink-0">
            <Image
              src="/avatarwithWinnie.jpg"
              alt="Kevin Nguyen"
              fill
              sizes="(min-width: 768px) 112px, 96px"
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="space-y-1 pt-1">
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light tracking-tight leading-[1.05]">
              {personal.name}
            </h1>
            <p className="text-accent text-sm md:text-base">{personal.title}</p>
            <p className="small-caps text-[11px] text-muted">{personal.location}</p>
          </div>
        </div>
        <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl">
          {personal.bio}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="small-caps text-[11px] text-foreground border border-[var(--hairline)] px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
          >
            GITHUB →
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="small-caps text-[11px] text-foreground border border-[var(--hairline)] px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
          >
            LINKEDIN →
          </a>
          <a
            href="/resume.pdf"
            className="small-caps text-[11px] text-foreground border border-[var(--hairline)] px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
          >
            RESUME (PDF) →
          </a>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16 space-y-8 border-t border-[var(--hairline)] pt-12">
        <SectionEyebrow>EXPERIENCE</SectionEyebrow>
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light tracking-tight">
          Where I&apos;ve built.
        </h2>
        <div className="space-y-10">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="relative pl-6 border-l border-[var(--hairline)]"
            >
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-light tracking-tight">
                {exp.link && exp.linkLabel ? (() => {
                  const idx = exp.position.indexOf(exp.linkLabel!);
                  if (idx === -1) return exp.position;
                  return (
                    <>
                      {exp.position.slice(0, idx)}
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 decoration-accent/60 hover:decoration-accent text-accent transition-colors"
                      >
                        {exp.linkLabel}
                      </a>
                      {exp.position.slice(idx + exp.linkLabel!.length)}
                    </>
                  );
                })() : exp.position}
              </h3>
              <div className="flex items-center gap-2 small-caps text-[11px] text-muted mt-2">
                <span className="text-foreground">{exp.company}</span>
                <span className="h-px w-4 bg-[var(--hairline)]" />
                <span>{exp.location}</span>
                <span className="h-px w-4 bg-[var(--hairline)]" />
                <span>{exp.duration}</span>
              </div>
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.highlights.map((h) => (
                    <span
                      key={h}
                      className="small-caps text-[10px] text-accent border border-accent/40 px-2 py-1"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-muted leading-relaxed mt-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="small-caps text-[10px] text-muted border border-[var(--hairline)] px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16 space-y-8 border-t border-[var(--hairline)] pt-12">
        <SectionEyebrow>SKILLS</SectionEyebrow>
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light tracking-tight">
          The toolkit I build with.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <div className="small-caps text-[11px] text-foreground">
                {formatSkillCategory(category)}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="small-caps text-[10px] text-foreground border border-[var(--hairline)] px-2 py-1 hover:border-accent hover:text-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-16 space-y-6 border-t border-[var(--hairline)] pt-12">
        <SectionEyebrow>EDUCATION</SectionEyebrow>
        <div className="space-y-2">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-light tracking-tight">
            {education.degree}
          </h3>
          <div className="flex items-center gap-2 small-caps text-[11px] text-muted">
            <span className="text-foreground">{education.institution}</span>
            <span className="h-px w-4 bg-[var(--hairline)]" />
            <span>{education.graduationDate}</span>
          </div>
          {education.highlights.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {education.highlights.map((h) => (
                <li key={h} className="text-sm text-muted flex items-baseline gap-3">
                  <span className="text-accent text-[10px]">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* What You'll Find Here */}
      <section className="space-y-6 border-t border-[var(--hairline)] pt-12">
        <SectionEyebrow>THE SITE</SectionEyebrow>
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light tracking-tight">
          What you&apos;ll find here.
        </h2>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-baseline gap-3">
            <span className="text-accent text-[10px]">▸</span>
            <span>Notes on agentic engineering and AI-assisted development</span>
          </li>
          <li className="flex items-baseline gap-3">
            <span className="text-accent text-[10px]">▸</span>
            <span>Technical deep dives and project write-ups</span>
          </li>
          <li className="flex items-baseline gap-3">
            <span className="text-accent text-[10px]">▸</span>
            <span>Learning logs and knowledge collected along the way</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
