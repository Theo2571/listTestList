import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';
import { COMMENT_AVATAR_SIZE } from '../../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  avatar: {
    width: COMMENT_AVATAR_SIZE,
    height: COMMENT_AVATAR_SIZE,
    borderRadius: COMMENT_AVATAR_SIZE / 2,
    backgroundColor: colors.surfaceSecondary,
    flexShrink: 0,
    marginTop: 2,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  barName: {
    height: 12,
    width: '35%',
    borderRadius: 6,
    backgroundColor: colors.surfaceSecondary,
  },
  barText: {
    height: 12,
    width: '90%',
    borderRadius: 6,
    backgroundColor: colors.surfaceSecondary,
  },
  barTextShort: {
    height: 12,
    width: '65%',
    borderRadius: 6,
    backgroundColor: colors.surfaceSecondary,
  },
});
