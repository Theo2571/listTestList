import React from 'react';
import { Text, View } from 'react-native';
import { Post } from '../../../types/post.types';
import { PaidPostOverlay } from '../../../components/feed/PaidPostOverlay';
import { styles } from './PostBody.styles';

interface PostBodyProps {
  post: Post;
}

export const PostBody: React.FC<PostBodyProps> = ({ post }) => {
  if (post.tier === 'paid') {
    return (
      <View style={styles.lockedContainer}>
        <PaidPostOverlay />
      </View>
    );
  }
  return <Text style={styles.body}>{post.body}</Text>;
};
