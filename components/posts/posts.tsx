"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import { getNewsPageContent } from "@/utils/get-post-query";
import { Post } from "./post";
import { useInView } from "react-intersection-observer";
import { NEWS_LIMIT } from "../../constants";

interface Post {
  title: string;
  thumbnailUrl: string;
  id: number;
  image: {
    src: string;
  };
}

export const Posts = () => {
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Post[], unknown, InfiniteData<Post[]>, ["posts"], number>({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) => {
        return await getNewsPageContent(pageParam, NEWS_LIMIT);
      },
      getNextPageParam: (latest, pages) => {
        if (latest.length < NEWS_LIMIT) {
          return undefined;
        }

        return pages.length;
      },
      initialPageParam: 0,
    });

  console.log({ hasNextPage });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <div className="w-full flex flex-col gap-4">
        {data.pages.map((posts, i) => (
          <Fragment key={i}>
            {posts?.map((post, idx) => (
              <Fragment key={`${i}-${idx}`}>
                <Post title={post.title} image={post.image} />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div
          ref={ref}
          className="p-6 text-gray-700 text-center text-base uppercase"
        >
          Loading more...
        </div>
      )}
    </div>
  );
};
