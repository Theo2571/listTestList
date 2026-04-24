import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceSecondary,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  likeBtnActive: {
    backgroundColor: colors.liked,
  },
  countWrapper: {
    overflow: 'hidden',
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  countActive: {
    color: colors.white,
  },
});
