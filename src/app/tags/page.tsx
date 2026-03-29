import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by topic.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-sm text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
          >
            {tag}
            <span className="ml-1.5 text-muted text-xs">({count})</span>
          </Link>
        ))}
      </div>
      {tags.length === 0 && <p className="text-muted">No tags yet.</p>}
    </div>
  );
}
