import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  sectionFilter: {
    ...typography.body,
    color: colors.primary,
  },
  footer: {
    paddingVertical: spacing.lg,
    alignItems: 'center' as const,
  },
  endText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  emptyComments: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center' as const,
  },
  emptyCommentsText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
