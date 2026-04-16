import { Dimensions, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { COVER_IMAGE_HEIGHT } from '../../../utils/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    marginBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  coverWrapper: {
    width: SCREEN_WIDTH,
    height: COVER_IMAGE_HEIGHT,
    backgroundColor: colors.surfaceSecondary,
  },
  coverImage: {
    width: SCREEN_WIDTH,
    height: COVER_IMAGE_HEIGHT,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: COVER_IMAGE_HEIGHT,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  previewRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  preview: {
    ...typography.body,
    color: colors.textSecondary,
  },
  showMore: {
    ...typography.body,
    color: colors.primary,
  },
  placeholderContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  placeholderBarWide: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
    width: SCREEN_WIDTH * 0.7,
  },
  placeholderBarMedium: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
    width: SCREEN_WIDTH * 0.45,
  },
});
