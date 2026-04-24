import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Post } from '../../types/post.types';
import { useFeedPosts } from './hooks/useFeedPosts';
import { useRefresh } from '../../hooks/useRefresh';
import { FeedTabs } from './components/FeedTabs';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { PostCard } from '../../components/feed/PostCard/PostCard';
import { ON_END_REACHED_THRESHOLD } from '../../utils/constants';
import { colors } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './FeedScreen.styles';

type FeedNavProp = NativeStackNavigationProp<RootStackParamList, 'Feed'>;

const FeedFooter: React.FC<{ isFetchingNextPage: boolean; hasNextPage: boolean }> = ({
  isFetchingNextPage,
  hasNextPage,
}) => {
  if (isFetchingNextPage) {
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }
  if (!hasNextPage) {
    return (
      <View style={styles.footer}>
        <Text style={styles.endText}>Вы всё просмотрели</Text>
      </View>
    );
  }
  return null;
};

export const FeedScreen: React.FC = () => {
  const navigation = useNavigation<FeedNavProp>();
  const {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    activeTab,
    setActiveTab,
  } = useFeedPosts();

  const { refreshing, onRefresh } = useRefresh(refetch);

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => (
      <PostCard
        post={item}
        onPress={item.tier === 'paid' ? undefined : () => navigation.navigate('PostDetail', { postId: item.id })}
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorState message="Не удалось загрузить публикации" onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FeedTabs activeTab={activeTab} onTabPress={setActiveTab} />
      <View style={styles.container}>
        <FlatList<Post>
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState />}
          ListFooterComponent={
            <FeedFooter
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage ?? false}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.refreshTint}
              colors={[colors.refreshTint]}
            />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};
