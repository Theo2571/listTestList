import { useInfiniteQuery } from '@tanstack/react-query';
import { postsApi } from '../api/posts.api';
import { Post } from '../types/post.types';
import { PAGE_SIZE } from '../utils/constants';

export function usePosts() {
  const query = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) =>
      postsApi.getPosts({ limit: PAGE_SIZE, cursor: pageParam as string | undefined }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor ?? undefined : undefined,
    initialPageParam: undefined as string | undefined,
  });

  const posts: Post[] = query.data?.pages.flatMap((page) => page.data.posts) ?? [];

  return {
    posts,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
