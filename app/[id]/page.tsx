import { PostPage } from '@/components/posts/post-page';
import { getNewsPageContent } from '@/utils/get-post-query';
import { notFound } from 'next/navigation';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log({ id });
  const posts = await getNewsPageContent();

  const post = posts.find((post, i) => {
    return `0${i}` === id;
  });

  if (!post) {
    notFound();
  }

  return (
    <PostPage
      title={post?.title}
      description={post?.description}
      image={post?.image}
    />
  );
}
