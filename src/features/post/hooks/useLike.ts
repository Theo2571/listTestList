import { InfiniteData, useMutation } from '@tanstack/react-query';
import { postsApi } from '../../../api/posts.api';
import { Post } from '../../../types/post.types';
import { ApiResponse, PostPage, PostsPage } from '../../../types/api.types';
import { queryClient } from '../../../providers/QueryProvider';
import { queryKeys } from '../../../utils/queryKeys';

function updatePostLike(postId: string, isLiked: boolean, likesCount: number): void {
  queryClient.setQueryData<ApiResponse<PostPage>>(
    queryKeys.post(postId),
    (old) => {
      if (!old) return old;
      return { ...old, data: { post: { ...old.data.post, isLiked, likesCount } } };
    },
  );
  const allFeedQueries = queryClient.getQueriesData<InfiniteData<ApiResponse<PostsPage>>>(
    { queryKey: ['posts'] },
  );
  allFeedQueries.forEach(([key, data]) => {
    if (!data) return;
    queryClient.setQueryData<InfiniteData<ApiResponse<PostsPage>>>(key, {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          posts: page.data.posts.map((p: Post) =>
            p.id === postId ? { ...p, isLiked, likesCount } : p,
          ),
        },
      })),
    });
  });
}

export function useLike(postId: string) {
  const mutation = useMutation({
    mutationFn: () => postsApi.toggleLike(postId),

    onMutate: () => {
      const snapshot = queryClient.getQueryData<ApiResponse<PostPage>>(queryKeys.post(postId));
      const feedSnapshots = queryClient.getQueriesData<InfiniteData<ApiResponse<PostsPage>>>(
        { queryKey: ['posts'] },
      );
      const current = snapshot?.data.post;
      if (!current) return { snapshot, feedSnapshots };
      const optimisticLiked = !current.isLiked;
      const optimisticCount = current.likesCount + (optimisticLiked ? 1 : -1);
      updatePostLike(postId, optimisticLiked, optimisticCount);
      return { snapshot, feedSnapshots };
    },

    onSuccess: (response) => {
      const { isLiked, likesCount } = response.data;
      updatePostLike(postId, isLiked, likesCount);
    },

    onError: (_err, _vars, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData(queryKeys.post(postId), context.snapshot);
      }
      context?.feedSnapshots?.forEach(([key, data]) => {
        if (data) queryClient.setQueryData(key, data);
      });
    },
  });

  return {
    toggleLike: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
