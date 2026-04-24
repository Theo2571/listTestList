import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { COMMENT_AVATAR_SIZE } from '../../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  avatarWrapper: {
    width: COMMENT_AVATAR_SIZE,
    height: COMMENT_AVATAR_SIZE,
    borderRadius: COMMENT_AVATAR_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: colors.border,
    flexShrink: 0,
    marginTop: 2,
  },
  avatar: {
    width: COMMENT_AVATAR_SIZE,
    height: COMMENT_AVATAR_SIZE,
  },
  avatarPlaceholder: {
    width: COMMENT_AVATAR_SIZE,
    height: COMMENT_AVATAR_SIZE,
    borderRadius: COMMENT_AVATAR_SIZE / 2,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginBottom: 2,
  },
  displayName: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  date: {
    ...typography.small,
    color: colors.textMuted,
  },
  text: {
    ...typography.body,
    color: colors.text,
    lineHeight: 20,
  },
  optimisticContainer: {
    opacity: 0.6,
  },
});
