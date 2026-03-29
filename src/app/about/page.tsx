import type { Metadata } from "next";
import { getConfig } from "@/lib/config";
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      {/* Header */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{personal.name}</h1>
        <p className="text-accent text-lg font-medium mb-2">{personal.title}</p>
        <p className="text-muted mb-1">{personal.location}</p>
        <p className="text-foreground/90 mt-4 leading-relaxed max-w-2xl">
          {personal.bio}
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            className="text-accent hover:text-accent-hover transition-colors text-sm"
          >
            Resume (PDF)
          </a>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-accent">Experience</h2>
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-border">
              <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent" />
              <h3 className="font-semibold text-lg">{exp.position}</h3>
              <p className="text-accent text-sm">
                {exp.company} &middot; {exp.location}
              </p>
              <p className="text-muted text-sm mb-2">{exp.duration}</p>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs rounded bg-surface border border-border text-muted"
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
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-accent">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-medium text-sm text-muted mb-2">
                {formatSkillCategory(category)}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs rounded bg-surface border border-border text-foreground/80"
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
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-accent">Education</h2>
        <div>
          <h3 className="font-semibold">{education.degree}</h3>
          <p className="text-accent text-sm">{education.institution}</p>
          <p className="text-muted text-sm">{education.graduationDate}</p>
          {education.highlights.length > 0 && (
            <ul className="mt-2 space-y-1">
              {education.highlights.map((h) => (
                <li key={h} className="text-sm text-foreground/80">
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* What You'll Find Here */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-accent">
          What You&apos;ll Find Here
        </h2>
        <ul className="space-y-2 text-foreground/80">
          <li>Notes on agentic engineering and AI-assisted development</li>
          <li>Technical deep dives and project write-ups</li>
          <li>Learning logs and knowledge collected along the way</li>
        </ul>
      </section>
    </div>
  );
}
