import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';
import { styles } from './CommentInput.styles';

interface CommentInputProps {
  onSubmit: (text: string, callbacks: { onError: () => void }) => void;
  isLoading: boolean;
}

export const CommentInput: React.FC<CommentInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0 && !isLoading;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText('');
    onSubmit(trimmed, {
      onError: () => {
        setText(trimmed);
        Alert.alert('Ошибка', 'Не удалось отправить комментарий. Попробуйте ещё раз.');
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Написать комментарий..."
        placeholderTextColor={colors.textMuted}
        multiline
        maxLength={500}
        returnKeyType="default"
      />
      <TouchableOpacity
        style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
        onPress={handleSend}
        disabled={!canSend}
        activeOpacity={0.8}
      >
        <Ionicons
          name="send"
          size={16}
          color={canSend ? colors.white : colors.textMuted}
        />
      </TouchableOpacity>
    </View>
  );
};
