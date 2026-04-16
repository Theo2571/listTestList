import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  footer: {
    paddingVertical: spacing.xl,
    alignItems: 'center' as const,
  },
  endText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
