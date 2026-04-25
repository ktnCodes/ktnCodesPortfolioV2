import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/types/posts";

export function PostHeader({ post }: { post: PostMeta }) {
  return (
    <header className="mb-10 space-y-4">
      <div className="flex items-center gap-3 small-caps text-[11px] text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="h-px w-6 bg-[var(--hairline)]" />
        <span>{post.readingTime}</span>
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
        {post.title}
      </h1>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="small-caps text-[10px] text-muted border border-[var(--hairline)] px-2 py-1 hover:border-accent hover:text-accent transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
