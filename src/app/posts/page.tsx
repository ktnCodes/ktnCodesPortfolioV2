import type { Metadata } from "next";
import { getAllPostMeta } from "@/lib/posts";
import { PostCard } from "@/components/posts/post-card";
import { SectionEyebrow } from "@/components/home/section-eyebrow";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Articles on agentic engineering, embedded systems, and software development.",
};

export default function PostsPage() {
  const posts = getAllPostMeta();

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-16 overflow-y-auto">
      <div className="mb-12 space-y-3">
        <SectionEyebrow>POSTS</SectionEyebrow>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light tracking-tight">
          Notes from the workshop.
        </h1>
        <p className="text-sm text-muted leading-relaxed max-w-lg">
          Agentic engineering, embedded debugging war stories, and tooling writeups.
        </p>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="small-caps text-[11px] text-muted">No posts yet.</p>
      )}
    </div>
  );
}
