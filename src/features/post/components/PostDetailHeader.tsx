import React, { useState } from 'react';
import { Dimensions, LayoutAnimation, Text, View } from 'react-native';
import { Image, ImageLoadEventData } from 'expo-image';
import { Post } from '../../../types/post.types';
import { COVER_IMAGE_HEIGHT } from '../../../utils/constants';
import { styles } from './PostDetailHeader.styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface PostDetailHeaderProps {
  post: Post;
}

export const PostDetailHeader: React.FC<PostDetailHeaderProps> = ({ post }) => {
  const [imageHeight, setImageHeight] = useState(COVER_IMAGE_HEIGHT);

  const onLoad = (e: ImageLoadEventData) => {
    const { width, height } = e.source;
    if (width && height) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setImageHeight((SCREEN_WIDTH / width) * height);
    }
  };

  return (
  <>
    <Image
      source={{ uri: post.coverUrl }}
      style={[styles.coverImage, { height: imageHeight }]}
      contentFit="contain"
      transition={300}
      onLoad={onLoad}
    />
    <View style={styles.authorRow}>
      <View style={styles.avatarWrapper}>
        {post.author.avatarUrl ? (
          <Image
            source={{ uri: post.author.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarFallbackText}>
              {post.author.displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.displayName} numberOfLines={1}>
        {post.author.displayName}
      </Text>
    </View>
    <Text style={styles.title}>{post.title}</Text>
  </>
  );
};
