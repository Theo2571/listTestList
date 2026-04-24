import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { PostDetailScreenProps } from '../../navigation/types';
import { Comment } from '../../types/post.types';
import { usePost } from './hooks/usePost';
import { useComments } from './hooks/useComments';
import { useLike } from './hooks/useLike';
import { useAddComment } from './hooks/useAddComment';
import { useRefresh } from '../../hooks/useRefresh';
import { PostDetailHeader } from './components/PostDetailHeader';
import { PostBody } from './components/PostBody';
import { LikeButton } from './components/LikeButton';
import { CommentItem } from './components/CommentItem';
import { CommentInput } from './components/CommentInput';
import { CommentSkeleton } from './components/CommentSkeleton';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/ErrorState';
import { colors } from '../../theme';
import { ON_END_REACHED_THRESHOLD } from '../../utils/constants';
import { styles } from './PostDetailScreen.styles';

function pluralizeComments(n: number): string {
  const abs = Math.abs(n);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} комментарий`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} комментария`;
  return `${n} комментариев`;
}

export const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const headerHeight = useHeaderHeight();

  const { post, isLoading, isError, refetch: refetchPost } = usePost(postId);
  const {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useComments(postId);
  const { toggleLike, isLoading: likeLoading } = useLike(postId);
  const { addComment, isSubmitting } = useAddComment(postId);

  const { refreshing, onRefresh } = useRefresh(async () => {
    await Promise.all([refetchPost(), refetchComments()]);
  });

  const keyExtractor = useCallback((item: Comment) => item.id, []);

  const renderItem: ListRenderItem<Comment> = useCallback(
    ({ item }) => <CommentItem comment={item} />,
    [],
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const ListHeader = useMemo(() => {
    if (!post) return null;
    return (
      <>
        <PostDetailHeader post={post} />
        <PostBody post={post} />
        <LikeButton
          isLiked={post.isLiked}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          onPress={toggleLike}
          disabled={likeLoading}
        />
        <View style={styles.divider} />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{pluralizeComments(post.commentsCount)}</Text>
          <Text style={styles.sectionFilter}>Сначала новые</Text>
        </View>
      </>
    );
  }, [post, toggleLike, likeLoading]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !post) {
    return <ErrorState message="Не удалось загрузить публикацию" onRetry={refetchPost} />;
  }

  const ListFooter = isFetchingNextPage ? (
    <View style={styles.footer}>
      <ActivityIndicator color={colors.primary} />
    </View>
  ) : !hasNextPage && comments.length > 0 ? (
    <View style={styles.footer}>
      <Text style={styles.endText}>Все комментарии загружены</Text>
    </View>
  ) : null;

  const ListEmpty = commentsLoading ? (
    <CommentSkeleton />
  ) : (
    <View style={styles.emptyComments}>
      <Text style={styles.emptyCommentsText}>Будьте первым, кто оставит комментарий</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    >
      <FlatList<Comment>
        style={styles.flex}
        data={comments}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={ListEmpty}
        onEndReached={onEndReached}
        onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.refreshTint}
            colors={[colors.refreshTint]}
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        onScrollBeginDrag={Platform.OS === 'android' ? Keyboard.dismiss : undefined}
      />
      <CommentInput onSubmit={addComment} isLoading={isSubmitting} />
    </KeyboardAvoidingView>
  );
};
