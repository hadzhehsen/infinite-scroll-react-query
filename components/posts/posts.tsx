"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import { getPosts } from "@/utils/get-post-query";
import { Post } from "./post";
import { useInView } from "react-intersection-observer";
import { NEWS_LIMIT } from "../../constants";
import Link from "next/link";

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
        return await getPosts(pageParam, NEWS_LIMIT);
      },
      getNextPageParam: (latest, pages) => {
        if (latest.length < NEWS_LIMIT) {
          return undefined;
        }

        return pages.length;
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
    <div className="container mx-auto py-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
        {data.pages.map((posts, i) => (
          <Fragment key={i}>
            {posts?.map((post) => {
              return (
                <Link href={`/news/${post.slug}`} key={post._uid}>
                  <Post
                    title={post.name}
                    image={post.content.image}
                    date={post.first_published_at}
                  />
                </Link>
              );
            })}
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
