import type { Metadata } from "next";
import { getAllPostMeta } from "@/lib/posts";
import { PostCard } from "@/components/posts/post-card";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Articles on agentic engineering, embedded systems, and software development.",
};

export default function PostsPage() {
  const posts = getAllPostMeta();

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-12 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-muted">No posts yet.</p>
      )}
    </div>
  );
}
