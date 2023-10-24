import { PostPage } from "@/components/posts/post-page";
import { getPost } from "@/utils/get-post-query";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <PostPage
      title={post.name}
      image={post.content.image}
      content={post.content.content}
      date={post.first_published_at}
    />
  );
}
