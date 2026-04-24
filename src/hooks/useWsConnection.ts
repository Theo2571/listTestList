import { useEffect, useRef } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { queryClient } from '../providers/QueryProvider';
import { rootStore } from '../store/root.store';
import { Comment, Post } from '../types/post.types';
import { ApiResponse, CommentsPage, PostPage, PostsPage } from '../types/api.types';
import { WsEvent } from '../types/ws.types';
import {
  WS_INITIAL_BACKOFF_MS,
  WS_MAX_BACKOFF_MS,
  WS_PING_INTERVAL_MS,
  WS_TOKEN,
  WS_URL,
} from '../utils/constants';
import { queryKeys } from '../utils/queryKeys';

function handleLikeUpdated(postId: string, likesCount: number): void {
  // Update post detail cache
  queryClient.setQueryData<ApiResponse<PostPage>>(
    queryKeys.post(postId),
    (old) => {
      if (!old) return old;
      return { ...old, data: { post: { ...old.data.post, likesCount } } };
    },
  );

  // Update all feed caches (all tier variants)
  const allFeedQueries = queryClient.getQueriesData<InfiniteData<ApiResponse<PostsPage>>>({
    queryKey: ['posts'],
  });
  allFeedQueries.forEach(([key, data]) => {
    if (!data) return;
    queryClient.setQueryData<InfiniteData<ApiResponse<PostsPage>>>(key, {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          posts: page.data.posts.map((p: Post) =>
            p.id === postId ? { ...p, likesCount } : p,
          ),
        },
      })),
    });
  });
}

function handleCommentAdded(postId: string, comment: Comment): void {
  let wasAdded = false;
  queryClient.setQueryData<InfiniteData<ApiResponse<CommentsPage>>>(
    queryKeys.comments(postId),
    (old) => {
      if (!old) return old;
      const firstPage = old.pages[0];
      if (!firstPage) return old;

      // Already in cache (real ID) — skip
      const alreadyExists = firstPage.data.comments.some((c) => c.id === comment.id);
      if (alreadyExists) return old;

      // Optimistic comment exists → replace it (count already incremented by onMutate)
      const optimisticIndex = firstPage.data.comments.findIndex((c) =>
        c.id.startsWith('optimistic-'),
      );
      if (optimisticIndex !== -1) {
        const newComments = [...firstPage.data.comments];
        newComments[optimisticIndex] = comment;
        return {
          ...old,
          pages: [
            { ...firstPage, data: { ...firstPage.data, comments: newComments } },
            ...old.pages.slice(1),
          ],
        };
      }

      // No optimistic — genuinely new comment from another user
      wasAdded = true;
      return {
        ...old,
        pages: [
          {
            ...firstPage,
            data: { ...firstPage.data, comments: [comment, ...firstPage.data.comments] },
          },
          ...old.pages.slice(1),
        ],
      };
    },
  );

  if (!wasAdded) return;

  // Increment commentsCount in post detail
  queryClient.setQueryData<ApiResponse<PostPage>>(
    queryKeys.post(postId),
    (old) => {
      if (!old) return old;
      return {
        ...old,
        data: { post: { ...old.data.post, commentsCount: old.data.post.commentsCount + 1 } },
      };
    },
  );

  // Increment commentsCount in all feed caches
  const allFeedQueries = queryClient.getQueriesData<InfiniteData<ApiResponse<PostsPage>>>({
    queryKey: ['posts'],
  });
  allFeedQueries.forEach(([key, data]) => {
    if (!data) return;
    queryClient.setQueryData<InfiniteData<ApiResponse<PostsPage>>>(key, {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          posts: page.data.posts.map((p: Post) =>
            p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p,
          ),
        },
      })),
    });
  });
}

export function useWsConnection(): void {
  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef(WS_INITIAL_BACKOFF_MS);
  const pingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountedRef = useRef(false);

  useEffect(() => {
    unmountedRef.current = false;

    function clearPing(): void {
      if (pingTimerRef.current !== null) {
        clearInterval(pingTimerRef.current);
        pingTimerRef.current = null;
      }
    }

    function scheduleReconnect(): void {
      if (unmountedRef.current) return;
      reconnectTimerRef.current = setTimeout(() => {
        if (!unmountedRef.current) connect();
      }, backoffRef.current);
      backoffRef.current = Math.min(backoffRef.current * 2, WS_MAX_BACKOFF_MS);
    }

    function connect(): void {
      if (unmountedRef.current) return;
      const ws = new WebSocket(`${WS_URL}?token=${WS_TOKEN}`);
      wsRef.current = ws;

      ws.onopen = () => {
        rootStore.wsStore.setConnected(true);
        rootStore.wsStore.setLastError(null);
        backoffRef.current = WS_INITIAL_BACKOFF_MS;
        clearPing();
        pingTimerRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, WS_PING_INTERVAL_MS);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data as string) as WsEvent;
          if (msg.type === 'like_updated') {
            handleLikeUpdated(msg.postId, msg.likesCount);
          } else if (msg.type === 'comment_added') {
            handleCommentAdded(msg.postId, msg.comment);
          }
        } catch {
          // ignore malformed messages
        }
      };

      ws.onerror = () => {
        rootStore.wsStore.setLastError('WebSocket error');
      };

      ws.onclose = () => {
        rootStore.wsStore.setConnected(false);
        clearPing();
        scheduleReconnect();
      };
    }

    connect();

    return () => {
      unmountedRef.current = true;
      clearPing();
      if (reconnectTimerRef.current !== null) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.onclose = null; // prevent reconnect on intentional close
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);
}
