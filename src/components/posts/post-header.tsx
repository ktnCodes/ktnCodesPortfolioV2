import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/types/posts";

export function PostHeader({ post }: { post: PostMeta }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-muted mb-4">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>&middot;</span>
        <span>{post.readingTime}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-2 py-0.5 text-xs rounded bg-surface border border-border text-muted hover:text-accent hover:border-accent/40 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </header>
  );
}
