import { PostPage } from '@/components/posts/post-page';
import { getPersonalNews, getNewsPageContent } from '@/utils/get-post-query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log({ id });
  const posts = await getNewsPageContent();
  const personalPosts = await getPersonalNews();

  const post = posts.find((post, i) => {
    return `0${i}` === id;
  });

  const personalPost = personalPosts.find((post, i) => {
    return post.title === `news${i + 1}`;
  });

  console.log('PERSONAL POSTS', { personalPosts });
  console.log('PERSONAL POST', { personalPost });

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
