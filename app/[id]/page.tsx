import { PostPage } from '@/components/posts/post-page';
import { getPersonalNews, getNewsPageContent } from '@/utils/get-post-query';
import { notFound } from 'next/navigation';

interface Post {
  image: {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
  date: Date;
  source: string;
  content_type: string;
  url: string;
}

interface PersonalPost {
  image: {
    url: string;
  };
  title: string;
  description: string;
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const posts = await getNewsPageContent();
  const personalPosts = await getPersonalNews();

  const post = posts.find((post: Post, i: number) => {
    return `0${i}` === id;
  });

  const personalPost = personalPosts.find((post: PersonalPost, i: number) => {
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
