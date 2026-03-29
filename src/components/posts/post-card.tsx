import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/types/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative rounded-lg border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        {post.summary && (
          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-2">
            {post.summary}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="relative z-10 px-2 py-0.5 text-xs rounded bg-background border border-border text-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <Link href={`/tags/${tag}`}>{tag}</Link>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
