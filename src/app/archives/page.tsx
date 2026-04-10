import type { Metadata } from "next";
import Link from "next/link";
import { getArchivesByYear } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Archives",
  description: "All posts by date.",
};

export default function ArchivesPage() {
  const archives = getArchivesByYear();

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-12 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Archives</h1>
      <div className="space-y-8">
        {archives.map(({ year, posts }) => (
          <section key={year}>
            <h2 className="text-xl font-bold text-accent mb-4">{year}</h2>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.slug} className="flex items-baseline gap-4">
                  <time
                    dateTime={post.date}
                    className="text-sm text-muted whitespace-nowrap min-w-[100px]"
                  >
                    {formatDate(post.date)}
                  </time>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-foreground/90 hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {archives.length === 0 && <p className="text-muted">No posts yet.</p>}
    </div>
  );
}
