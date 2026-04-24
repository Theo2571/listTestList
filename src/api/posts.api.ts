import { apiClient } from './client';
import {
  ApiResponse,
  CommentCreatedData,
  CommentsPage,
  CommentsParams,
  LikeData,
  PostPage,
  PostsPage,
  PostsParams,
} from '../types/api.types';

export const postsApi = {
  getPosts: async (params: PostsParams = {}): Promise<ApiResponse<PostsPage>> => {
    const { data } = await apiClient.get<ApiResponse<PostsPage>>('/posts', {
      params: {
        limit: params.limit,
        cursor: params.cursor,
        tier: params.tier,
      },
    });
    return data;
  },

  getPost: async (id: string): Promise<ApiResponse<PostPage>> => {
    const { data } = await apiClient.get<ApiResponse<PostPage>>(`/posts/${id}`);
    return data;
  },

  toggleLike: async (id: string): Promise<ApiResponse<LikeData>> => {
    const { data } = await apiClient.post<ApiResponse<LikeData>>(`/posts/${id}/like`);
    return data;
  },

  getComments: async (
    id: string,
    params: CommentsParams = {},
  ): Promise<ApiResponse<CommentsPage>> => {
    const { data } = await apiClient.get<ApiResponse<CommentsPage>>(
      `/posts/${id}/comments`,
      { params: { limit: params.limit, cursor: params.cursor } },
    );
    return data;
  },

  addComment: async (
    id: string,
    text: string,
  ): Promise<ApiResponse<CommentCreatedData>> => {
    const { data } = await apiClient.post<ApiResponse<CommentCreatedData>>(
      `/posts/${id}/comments`,
      { text },
    );
    return data;
  },
};
