import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const PaidPostOverlay: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.lockCircle}>
      <Text style={styles.lockIcon}>🔒</Text>
    </View>
    <Text style={styles.title}>Контент скрыт пользователем.</Text>
    <Text style={styles.subtitle}>Доступ открывается после доната</Text>
    <TouchableOpacity style={styles.button} activeOpacity={0.85}>
      <Text style={styles.buttonText}>Отправить донат</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xs,
  },
  lockCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  lockIcon: {
    fontSize: 20,
  },
  title: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  subtitle: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.85,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xxl,
    borderRadius: 20,
    marginTop: spacing.xs,
  },
  buttonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
});
