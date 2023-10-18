import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getPostsQuery } from '@/utils/get-post-query';
import { getQueryClient } from '@/utils/get-query-client';
import { Posts } from '../../components/posts/posts';

export default async function PostsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPostsQuery,
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  );
}
