'use client';

import { Post as PostType } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment } from 'react';
import { getPostsQuery } from '@/utils/get-post-query';
import { Post } from './post';

export const Posts = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: getPostsQuery,
      getNextPageParam: (_, pages) => pages.length + 1,
      initialPageParam: 1,
    });

  if (!data) return <div>Not found</div>;

  return (
    <div className="divide-y">
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((post) => (
            <Post
              key={post.id}
              post={post}
            />
          ))}
        </Fragment>
      ))}
      {isFetchingNextPage ? (
        <div>Loading more...</div>
      ) : hasNextPage ? (
        <button onClick={() => fetchNextPage()}>Load More</button>
      ) : null}
    </div>
  );
};
