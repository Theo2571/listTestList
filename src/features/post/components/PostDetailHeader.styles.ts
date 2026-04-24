import { Dimensions, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { AVATAR_SIZE } from '../../../utils/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  coverImage: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.surfaceSecondary,
  },
  authorRow: {
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
  avatarFallback: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '700',
  },
  displayName: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
    flexShrink: 1,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
});
