'use client';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect } from 'react';
import { getNewsPageContent } from '@/utils/get-post-query';
import { Post } from './post';
import { useInView } from 'react-intersection-observer';

interface Post {
  title: string;
  thumbnailUrl: string;
  id: number;
}

export const Posts = () => {
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Post[], unknown, InfiniteData<Post[]>, ['posts'], number>({
      queryKey: ['posts'],
      queryFn: async ({ pageParam }) => {
        console.log('queryFn', { pageParam });
        const response = await getNewsPageContent(pageParam, 10);
        console.log('queryFn', { response });
        return response;
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <div className="divide-y w-full flex flex-col">
      {data.pages.map((posts, i) => (
        <Fragment key={i}>
          {posts.map((post, idx) => (
            <div
              className="flex-1"
              key={`${i}-${idx}`}
            >
              <Post
                title={post.title}
                thumbnailUrl={post.thumbnailUrl}
                id={post.id}
              />
            </div>
          ))}
        </Fragment>
      ))}

      <div
        ref={ref}
        className="px-4 py-2 text-gray-500 text-2xl uppercase"
      >
        Loading more...
      </div>
    </div>
  );
};
