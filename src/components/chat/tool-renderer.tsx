import { Presentation } from "@/components/tools/presentation";
import { Projects } from "@/components/tools/projects";
import { Skills } from "@/components/tools/skills";
import { Resume } from "@/components/tools/resume";
import { Contact } from "@/components/tools/contact";
import { BlogPosts } from "@/components/tools/blog-posts";

interface ToolPart {
  type: string;
  state: string;
  output?: Record<string, unknown>;
}

export function ToolRenderer({ part }: { part: ToolPart }) {
  if (part.state !== "output-available" || !part.output) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted py-2">
        <span className="inline-block w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  const data = part.output;
  // part.type is "tool-getPresentation", "tool-getProjects", etc.
  const toolName = part.type.replace(/^tool-/, "");

  switch (toolName) {
    case "getPresentation":
      return (
        <Presentation
          personal={data.personal as never}
          education={data.education as never}
        />
      );
    case "getProjects":
      return <Projects projects={data.projects as never} />;
    case "getSkills":
      return <Skills skills={data.skills as never} />;
    case "getResume":
      return (
        <Resume
          experience={data.experience as never}
          education={data.education as never}
          resumeUrl={data.resumeUrl as string}
        />
      );
    case "getContact":
      return (
        <Contact email={data.email as string} social={data.social as never} />
      );
    case "getBlogPosts":
      return (
        <BlogPosts
          posts={data.posts as never}
          query={data.query as string}
        />
      );
    default:
      return null;
  }
}
