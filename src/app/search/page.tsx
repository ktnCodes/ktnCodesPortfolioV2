"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { PostCard } from "@/components/posts/post-card";
import type { PostMeta } from "@/types/posts";

// Search page needs post data passed from a server component wrapper,
// but for simplicity we'll load it via an API-style approach.
// For now, we use a client component with static data loaded at build.

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [allPosts, setAllPosts] = useState<PostMeta[] | null>(null);

  // Fetch posts on first interaction
  const loadPosts = async () => {
    if (allPosts) return allPosts;
    const res = await fetch("/api/posts");
    const data = await res.json();
    setAllPosts(data);
    return data as PostMeta[];
  };

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setPosts([]);
      return;
    }
    const all = await loadPosts();
    const q = value.toLowerCase();
    const filtered = all.filter(
      (post: PostMeta) =>
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(q))
    );
    setPosts(filtered);
  };

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-12 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Search</h1>
      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      {query && (
        <p className="text-sm text-muted mb-6">
          {posts.length} result{posts.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
