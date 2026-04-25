import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/types/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative border border-[var(--hairline)] bg-[var(--surface)] p-6 transition-colors hover:border-accent">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 small-caps text-[11px] text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="h-px w-6 bg-[var(--hairline)]" />
          <span>{post.readingTime}</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] text-2xl font-light tracking-tight group-hover:text-accent transition-colors">
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        {post.summary && (
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {post.summary}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="relative z-10 small-caps text-[10px] text-muted border border-[var(--hairline)] px-2 py-1 hover:border-accent hover:text-accent transition-colors"
            >
              <Link href={`/tags/${tag}`}>{tag}</Link>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
