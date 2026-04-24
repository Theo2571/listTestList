import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { styles } from './CommentSkeleton.styles';

const SkeletonItem: React.FC<{ opacity: Animated.Value }> = ({ opacity }) => (
  <View style={styles.container}>
    <Animated.View style={[styles.avatar, { opacity }]} />
    <View style={styles.content}>
      <Animated.View style={[styles.barName, { opacity }]} />
      <Animated.View style={[styles.barText, { opacity }]} />
      <Animated.View style={[styles.barTextShort, { opacity }]} />
    </View>
  </View>
);

export const CommentSkeleton: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <>
      <SkeletonItem opacity={opacity} />
      <SkeletonItem opacity={opacity} />
      <SkeletonItem opacity={opacity} />
    </>
  );
};
