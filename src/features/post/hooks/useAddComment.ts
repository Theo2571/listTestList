import { InfiniteData, useMutation } from '@tanstack/react-query';
import { postsApi } from '../../../api/posts.api';
import { Comment } from '../../../types/post.types';
import { ApiResponse, CommentsPage, PostPage } from '../../../types/api.types';
import { queryClient } from '../../../providers/QueryProvider';
import { queryKeys } from '../../../utils/queryKeys';
import { WS_TOKEN } from '../../../utils/constants';

function buildOptimisticComment(postId: string, text: string): Comment {
  return {
    id: `optimistic-${Date.now()}`,
    postId,
    author: {
      id: WS_TOKEN,
      username: 'me',
      displayName: 'Вы',
      avatarUrl: '',
      bio: '',
      subscribersCount: 0,
      isVerified: false,
    },
    text,
    createdAt: new Date().toISOString(),
  };
}

export function useAddComment(postId: string) {
  const mutation = useMutation({
    mutationFn: (text: string) => postsApi.addComment(postId, text),

    onMutate: async (text: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.comments(postId) });
      const snapshot = queryClient.getQueryData<InfiniteData<ApiResponse<CommentsPage>>>(
        queryKeys.comments(postId),
      );

      const optimistic = buildOptimisticComment(postId, text);

      queryClient.setQueryData<InfiniteData<ApiResponse<CommentsPage>>>(
        queryKeys.comments(postId),
        (old) => {
          if (!old) return old;
          const firstPage = old.pages[0];
          if (!firstPage) return old;
          return {
            ...old,
            pages: [
              {
                ...firstPage,
                data: {
                  ...firstPage.data,
                  comments: [optimistic, ...firstPage.data.comments],
                },
              },
              ...old.pages.slice(1),
            ],
          };
        },
      );

      // Increment commentsCount optimistically
      queryClient.setQueryData<ApiResponse<PostPage>>(
        queryKeys.post(postId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              post: { ...old.data.post, commentsCount: old.data.post.commentsCount + 1 },
            },
          };
        },
      );

      return { snapshot };
    },

    onError: (_err, _text, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData(queryKeys.comments(postId), context.snapshot);
      }
      queryClient.setQueryData<ApiResponse<PostPage>>(
        queryKeys.post(postId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              post: { ...old.data.post, commentsCount: old.data.post.commentsCount - 1 },
            },
          };
        },
      );
    },

    onSuccess: (data) => {
      const realComment = data.data.comment;
      queryClient.setQueryData<InfiniteData<ApiResponse<CommentsPage>>>(
        queryKeys.comments(postId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, i) => {
              const withoutOptimistic = page.data.comments.filter(
                (c) => !c.id.startsWith('optimistic-'),
              );
              const alreadyHasReal = withoutOptimistic.some((c) => c.id === realComment.id);
              const comments =
                alreadyHasReal || i !== 0
                  ? withoutOptimistic
                  : [realComment, ...withoutOptimistic];
              return { ...page, data: { ...page.data, comments } };
            }),
          };
        },
      );
    },
  });

  const addComment = (text: string, callbacks: { onError: () => void }) => {
    mutation.mutate(text, { onError: callbacks.onError });
  };

  return {
    addComment,
    isSubmitting: mutation.isPending,
  };
}
