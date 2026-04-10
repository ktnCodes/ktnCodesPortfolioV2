import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostMeta, getPostBySlug } from "@/lib/posts";
import { PostHeader } from "@/components/posts/post-header";
import { MdxContent } from "@/components/posts/mdx-content";
import { ScrollProgress } from "@/components/posts/scroll-progress";

export async function generateStaticParams() {
  return getAllPostMeta().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <ScrollProgress />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <PostHeader post={post} />
        <MdxContent source={post.content} />
      </div>
    </>
  );
}
