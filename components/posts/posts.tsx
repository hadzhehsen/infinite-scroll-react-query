'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment } from 'react';
import { getNewsPageContent } from '@/utils/get-post-query';
import { Post } from './post';

export const Posts = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) => {
        console.log({ pageParam });

        return getNewsPageContent(pageParam, 10);
      },
      getNextPageParam: (_, pages) => {
        return pages.length;
      },
      initialPageParam: 0,
    });

  if (!data) return <div>Not found</div>;
  console.log({ data });

  return (
    <div className="divide-y">
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((post, idx) => (
            <div key={idx}>{post.title}</div>
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
