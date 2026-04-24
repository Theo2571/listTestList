import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { postsApi } from '../../../api/posts.api';
import { Comment } from '../../../types/post.types';
import { COMMENT_PAGE_SIZE } from '../../../utils/constants';
import { queryKeys } from '../../../utils/queryKeys';

export function useComments(postId: string) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.comments(postId),
    queryFn: ({ pageParam }) =>
      postsApi.getComments(postId, {
        limit: COMMENT_PAGE_SIZE,
        cursor: pageParam as string | undefined,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor ?? undefined : undefined,
    initialPageParam: undefined as string | undefined,
  });

  const comments: Comment[] = useMemo(
    () =>
      (query.data?.pages.flatMap((page) => page.data.comments) ?? [])
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [query.data],
  );

  return {
    comments,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
