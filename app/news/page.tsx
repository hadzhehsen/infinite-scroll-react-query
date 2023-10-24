import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/get-query-client";
import { getPosts } from "@/utils/get-post-query";
import { Posts } from "@/components/posts/posts";
import { NEWS_LIMIT } from "../../constants";

export default async function PostsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      return getPosts(pageParam, NEWS_LIMIT);
    },
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  );
}
