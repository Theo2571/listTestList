import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Comment } from '../../../types/post.types';
import { styles } from './CommentItem.styles';

interface CommentItemProps {
  comment: Comment;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'только что';
  if (diffMin < 60) return `${diffMin} мин. назад`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH} ч. назад`;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const isOptimistic = comment.id.startsWith('optimistic-');
  const initial = comment.author.displayName.charAt(0).toUpperCase();

  return (
    <View style={[styles.container, isOptimistic && styles.optimisticContainer]}>
      {comment.author.avatarUrl ? (
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: comment.author.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={150}
          />
        </View>
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>{initial}</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.displayName}>{comment.author.displayName}</Text>
          <Text style={styles.date}>{formatDate(comment.createdAt)}</Text>
        </View>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
    </View>
  );
};
