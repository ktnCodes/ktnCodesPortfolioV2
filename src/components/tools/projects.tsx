import type { Project } from "@/types/portfolio";

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.title}
          className="rounded-lg border border-border bg-surface p-4"
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm">{project.title}</h4>
            <span className="text-xs px-1.5 py-0.5 rounded bg-background border border-border text-muted whitespace-nowrap">
              {project.status}
            </span>
          </div>
          <p className="text-xs text-accent mb-2">{project.category}</p>
          <p className="text-sm text-foreground/80 leading-relaxed mb-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 text-xs rounded bg-background border border-border text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          {(project.links.github || project.links.live) && (
            <div className="flex gap-3 text-xs">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  GitHub
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  Live
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
