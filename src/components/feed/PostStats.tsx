import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../types/post.types';
import { colors, spacing, typography, radii } from '../../theme';
import { formatCount } from '../../utils/formatCount';

interface PostStatsProps {
  post: Post;
}

export const PostStats: React.FC<PostStatsProps> = ({ post }) => (
  <View style={styles.container}>
    <View style={[styles.pill, post.isLiked && styles.pillLiked]}>
      <Ionicons
        name={post.isLiked ? 'heart' : 'heart-outline'}
        size={16}
        color={post.isLiked ? colors.white : colors.textSecondary}
      />
      <Text style={[styles.count, post.isLiked && styles.countLiked]}>
        {formatCount(post.likesCount)}
      </Text>
    </View>

    <View style={styles.pill}>
      <Ionicons name="chatbubble" size={15} color={colors.textSecondary} />
      <Text style={styles.count}>{formatCount(post.commentsCount)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceSecondary,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  pillLiked: {
    backgroundColor: colors.liked,
  },
  countLiked: {
    color: colors.white,
  },
});
