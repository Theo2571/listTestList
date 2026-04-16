import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { PostCardProps } from './PostCard.types';
import { styles } from './PostCard.styles';
import { AuthorInfo } from '../AuthorInfo';
import { PostStats } from '../PostStats';
import { PaidPostOverlay } from '../PaidPostOverlay';

const PREVIEW_MAX_LINES = 2;

export const PostCard: React.FC<PostCardProps> = React.memo(({ post }) => {
  const isPaid = post.tier === 'paid';
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  return (
    <View style={styles.container}>
      <AuthorInfo author={post.author} />

      <View style={styles.coverWrapper}>
        <Image
          source={{ uri: post.coverUrl }}
          style={styles.coverImage}
          contentFit="cover"
        />
        {isPaid && (
          <BlurView intensity={60} tint="dark" style={styles.blurOverlay}>
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
    </View>
  );
});

PostCard.displayName = 'PostCard';
