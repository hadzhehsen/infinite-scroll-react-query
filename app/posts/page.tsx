import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// import { getPostsQuery } from '@/utils/get-post-query';
import { getQueryClient } from '@/utils/get-query-client';
import { Posts } from '../../components/posts/posts';
import { getNewsPageContent } from '@/utils/get-post-query';

export default async function PostsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => {
      return getNewsPageContent(pageParam, 10);
    },
    initialPageParam: 0,
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
