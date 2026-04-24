import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme';
import DollarsIcon from '../../../assets/dollars.svg';

export const PaidPostOverlay: React.FC = () => (
  <View style={styles.container}>
    <DollarsIcon width={56} height={56} />
    <Text style={styles.description}>
      {'Контент скрыт пользователем.\nДоступ откроется после доната'}
    </Text>
    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <Text style={styles.buttonText}>Отправить донат</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    gap: spacing.lg,
  },
  description: {
    ...typography.body,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'rgba(109,40,217,0.75)',
    paddingVertical: spacing.md,
    paddingHorizontal: 64,
    borderRadius: radii.md,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
});
