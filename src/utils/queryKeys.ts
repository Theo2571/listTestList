import { PostTier } from '../types/post.types';

export const queryKeys = {
  posts: (tier?: PostTier) => ['posts', tier ?? 'all'] as const,
  post: (id: string) => ['post', id] as const,
  comments: (postId: string) => ['comments', postId] as const,
} as const;
