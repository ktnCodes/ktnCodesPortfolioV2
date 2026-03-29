import { google } from "@ai-sdk/google";
import { streamText, stepCountIs, convertToModelMessages } from "ai";
import type { UIMessage } from "ai";
import { z } from "zod";
import { generateSystemPrompt } from "./prompt";
import { getConfig } from "@/lib/config";
import { getAllPostMeta } from "@/lib/posts";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const config = getConfig();
    const allPosts = getAllPostMeta();

    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      system: generateSystemPrompt(),
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(2),
      tools: {
        getPresentation: {
          description:
            "Show Kevin's introduction, bio, education, and background. Use when someone asks 'tell me about yourself' or wants an overview.",
          inputSchema: z.object({}),
          execute: async () => ({
            personal: config.personal,
            education: config.education,
          }),
        },
        getProjects: {
          description:
            "Show Kevin's portfolio projects. Use when someone asks about projects, what he's built, or his work.",
          inputSchema: z.object({}),
          execute: async () => ({
            projects: config.projects,
          }),
        },
        getSkills: {
          description:
            "Show Kevin's technical skills by category. Use when someone asks about his tech stack, skills, or what technologies he uses.",
          inputSchema: z.object({}),
          execute: async () => ({
            skills: config.skills,
          }),
        },
        getResume: {
          description:
            "Show Kevin's work experience and resume download link. Use when someone asks about his experience, career, resume, or work history.",
          inputSchema: z.object({}),
          execute: async () => ({
            experience: config.experience,
            education: config.education,
            resumeUrl: "/resume.pdf",
          }),
        },
        getContact: {
          description:
            "Show Kevin's contact information and social links. Use when someone asks how to reach him or for contact info.",
          inputSchema: z.object({}),
          execute: async () => ({
            email: config.personal.email,
            social: config.social,
          }),
        },
        getBlogPosts: {
          description:
            "Search and show Kevin's blog posts by topic. Use when someone asks about topics he's written about, his blog, articles, or writing.",
          inputSchema: z.object({
            topic: z
              .string()
              .optional()
              .describe(
                "Optional topic to filter posts by. Matches against title, tags, and summary."
              ),
          }),
          execute: async ({ topic }) => {
            if (!topic) {
              return { posts: allPosts.slice(0, 5), query: "recent" };
            }
            const q = topic.toLowerCase();
            const matches = allPosts.filter(
              (post) =>
                post.title.toLowerCase().includes(q) ||
                post.summary.toLowerCase().includes(q) ||
                post.tags.some((tag) => tag.toLowerCase().includes(q))
            );
            return {
              posts: matches.length > 0 ? matches : allPosts.slice(0, 3),
              query: topic,
            };
          },
        },
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        const msg = error instanceof Error ? error.message : String(error);
        if (msg.includes("quota") || msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
          return "rate_limit";
        }
        return "error";
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    if (message.includes("quota") || message.includes("429")) {
      return new Response(
        JSON.stringify({
          error:
            "API quota exceeded. Try again in a moment or use the preset questions.",
        }),
        { status: 429 }
      );
    }
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
