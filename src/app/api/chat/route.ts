import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { streamText, stepCountIs, convertToModelMessages } from "ai";
import type { UIMessage } from "ai";
import { z } from "zod";
import { generateSystemPrompt } from "./prompt";
import { getConfig } from "@/lib/config";
import { getAllPostMeta, getPostBySlug } from "@/lib/posts";

// Persists for the lifetime of the server instance.
// Once Google hits its quota, all subsequent requests in this session use OpenAI.
let googleExhausted = false;

function isQuotaError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return msg.includes("quota") || msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED");
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const config = getConfig();
    const allPosts = getAllPostMeta();

    const sharedParams = {
      system: generateSystemPrompt(),
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(3),
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
          execute: async ({ topic }: { topic?: string }) => {
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
        getPostContent: {
          description:
            "Read the full content of one or more blog posts by slug. Use when someone asks about what Kevin wrote in a specific post, wants details from an article, or when you need to accurately answer a question using post content. Call getBlogPosts first to discover slugs, then call this to read the actual post bodies.",
          inputSchema: z.object({
            slugs: z
              .array(z.string())
              .describe("One or more post slugs to fetch full content for."),
          }),
          execute: async ({ slugs }: { slugs: string[] }) => {
            const results = slugs.map((slug: string) => {
              const post = getPostBySlug(slug);
              if (!post) return { slug, error: "Post not found" };
              return {
                slug: post.slug,
                title: post.title,
                date: post.date,
                tags: post.tags,
                summary: post.summary,
                content: post.content,
              };
            });
            return { posts: results };
          },
        },
      },
    };

    // Try Google first; if it throws synchronously (quota at connection level),
    // fall through and retry with OpenAI on the same request.
    if (!googleExhausted && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      try {
        const result = streamText({
          model: google("gemini-2.5-flash-lite"),
          ...sharedParams,
        });
        return result.toUIMessageStreamResponse({
          onError: (error) => {
            if (isQuotaError(error)) {
              googleExhausted = true;
            }
            return "error";
          },
        });
      } catch (error) {
        if (isQuotaError(error)) {
          googleExhausted = true;
          // Fall through to OpenAI below
        } else {
          throw error;
        }
      }
    }

    // OpenAI fallback
    const result = streamText({
      model: openai("gpt-4.1-nano"),
      ...sharedParams,
    });
    return result.toUIMessageStreamResponse({
      onError: () => "error",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
