import { apiClient } from './client';
import { ApiResponse, PostsPage, PostsParams } from '../types/api.types';

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
};
