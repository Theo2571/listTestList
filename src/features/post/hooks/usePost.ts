import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../../../api/posts.api';
import { Post } from '../../../types/post.types';
import { queryKeys } from '../../../utils/queryKeys';

export function usePost(id: string) {
  const query = useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => postsApi.getPost(id),
    staleTime: 1000 * 60 * 2,
  });

  const post: Post | undefined = query.data?.data.post;

  return {
    post,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
