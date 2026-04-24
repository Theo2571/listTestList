import { Comment, Post, PostTier } from './post.types';

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  error?: ApiError;
}

export interface PostsPage {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PostsParams {
  limit?: number;
  cursor?: string;
  tier?: PostTier;
}

export interface PostPage {
  post: Post;
}

export interface LikeData {
  isLiked: boolean;
  likesCount: number;
}

export interface CommentsPage {
  comments: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CommentsParams {
  limit?: number;
  cursor?: string;
}

export interface CommentCreatedData {
  comment: Comment;
}
