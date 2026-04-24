import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const styles = StyleSheet.create({
  body: {
    ...typography.body,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    lineHeight: 24,
  },
  lockedContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 120,
    backgroundColor: colors.surfaceSecondary,
  },
});
