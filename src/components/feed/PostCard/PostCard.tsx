import React, { useCallback, useState } from 'react';
import { Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Image, ImageLoadEventData } from 'expo-image';
import { BlurView } from 'expo-blur';
import { PostCardProps } from './PostCard.types';
import { styles } from './PostCard.styles';
import { AuthorInfo } from '../AuthorInfo';
import { PostStats } from '../PostStats';
import { PaidPostOverlay } from '../PaidPostOverlay';
import { FEED_COVER_HEIGHT } from '../../../utils/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAX_COVER_HEIGHT = 480;
const PREVIEW_MAX_LINES = 2;

export const PostCard: React.FC<PostCardProps> = React.memo(({ post, onPress }) => {
  const isPaid = post.tier === 'paid';
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const [imageHeight, setImageHeight] = useState(FEED_COVER_HEIGHT);

  const handleImageLoad = useCallback((e: ImageLoadEventData) => {
    const { width, height } = e.source;
    if (width > 0) {
      const ratio = height / width;
      setImageHeight(Math.min(Math.round(SCREEN_WIDTH * ratio), MAX_COVER_HEIGHT));
    }
  }, []);

  const coverHeight = isPaid ? { height: FEED_COVER_HEIGHT } : { height: imageHeight };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AuthorInfo author={post.author} />

      <View style={[styles.coverWrapper, coverHeight]}>
        <Image
          source={{ uri: post.coverUrl }}
          style={[styles.coverImage, coverHeight]}
          contentFit="cover"
          onLoad={isPaid ? undefined : handleImageLoad}
        />
        {isPaid && (
          <BlurView intensity={60} tint="dark" style={[styles.blurOverlay, coverHeight]}>
            <PaidPostOverlay />
          </BlurView>
        )}
      </View>

      {isPaid ? (
        <View style={styles.placeholderContainer}>
          <View style={styles.placeholderBarWide} />
          <View style={styles.placeholderBarMedium} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {post.title}
          </Text>

          {post.preview ? (
            <View style={styles.previewRow}>
              <Text
                style={styles.preview}
                numberOfLines={expanded ? undefined : PREVIEW_MAX_LINES}
                onTextLayout={(e) => {
                  if (!expanded) {
                    setTruncated(e.nativeEvent.lines.length >= PREVIEW_MAX_LINES);
                  }
                }}
              >
                {post.preview}
              </Text>
              {truncated && !expanded && (
                <TouchableOpacity onPress={() => setExpanded(true)} activeOpacity={0.7}>
                  <Text style={styles.showMore}> Показать ещё</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          <PostStats post={post} />
        </View>
      )}
    </Pressable>
  );
});

PostCard.displayName = 'PostCard';
