import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';
import { formatCount } from '../../../utils/formatCount';
import { styles } from './LikeButton.styles';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onPress: () => void;
  disabled?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  likesCount,
  commentsCount,
  onPress,
  disabled,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const countOpacity = useRef(new Animated.Value(1)).current;
  const countTranslateY = useRef(new Animated.Value(0)).current;
  const prevCountRef = useRef(likesCount);

  useEffect(() => {
    if (prevCountRef.current === likesCount) return;
    prevCountRef.current = likesCount;

    countOpacity.setValue(0);
    countTranslateY.setValue(8);

    Animated.parallel([
      Animated.timing(countOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(countTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [likesCount, countOpacity, countTranslateY]);

  const handlePress = () => {
    if (disabled) return;
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.35,
        useNativeDriver: true,
        speed: 40,
        bounciness: 8,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 4,
      }),
    ]).start();
    onPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Animated.View
          style={[
            styles.likeBtn,
            isLiked && styles.likeBtnActive,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={18}
            color={isLiked ? colors.white : colors.textSecondary}
          />
          <View style={styles.countWrapper}>
            <Animated.View
              style={{
                opacity: countOpacity,
                transform: [{ translateY: countTranslateY }],
              }}
            >
              <Text style={[styles.count, isLiked && styles.countActive]}>
                {formatCount(likesCount)}
              </Text>
            </Animated.View>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <View style={[styles.likeBtn]}>
        <Ionicons name="chatbubble" size={16} color={colors.textSecondary} />
        <Text style={styles.count}>{formatCount(commentsCount)}</Text>
      </View>
    </View>
  );
};
