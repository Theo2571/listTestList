import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { postsApi } from '../api/posts.api';
import { Post, PostTier } from '../types/post.types';
import { PAGE_SIZE } from '../utils/constants';
import { queryKeys } from '../utils/queryKeys';

export function usePosts(tier?: PostTier) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.posts(tier),
    queryFn: ({ pageParam }) =>
      postsApi.getPosts({ limit: PAGE_SIZE, cursor: pageParam as string | undefined, tier }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor ?? undefined : undefined,
    initialPageParam: undefined as string | undefined,
    placeholderData: keepPreviousData,
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
