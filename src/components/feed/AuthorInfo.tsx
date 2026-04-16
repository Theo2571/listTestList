import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Author } from '../../types/post.types';
import { colors, spacing, typography } from '../../theme';
import { AVATAR_SIZE } from '../../utils/constants';

interface AuthorInfoProps {
  author: Author;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => (
  <View style={styles.container}>
    <View style={styles.avatarWrapper}>
      <Image
        source={{ uri: author.avatarUrl }}
        style={styles.avatar}
        contentFit="cover"
        transition={200}
      />
    </View>
    <Text style={styles.displayName} numberOfLines={1}>
      {author.displayName}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: colors.border,
    marginRight: spacing.sm,
    flexShrink: 0,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  displayName: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
    flexShrink: 1,
  },
});
