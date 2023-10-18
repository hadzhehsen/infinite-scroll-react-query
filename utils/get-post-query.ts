import { Post } from '@/types/types';
import { jsonPlaceholderAxios } from './json-placeholder-axios';

export async function getPostsQuery({ pageParam = 1 }): Promise<Post[]> {
  const res = await jsonPlaceholderAxios.get(`/posts`, {
    params: { _page: pageParam },
  });

  return res.data;
}
