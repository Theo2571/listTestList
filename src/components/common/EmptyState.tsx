import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import IllustrationSticker from '../../../assets/illustration_sticker.svg';

export const EmptyState: React.FC = () => (
  <View style={styles.container}>
    <IllustrationSticker width={120} height={120} />
    <Text style={styles.message}>По вашему запросу ничего не найдено</Text>
    <TouchableOpacity style={styles.button} activeOpacity={0.85}>
      <Text style={styles.buttonText}>На главную</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxxl * 2,
  },
  message: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
});
