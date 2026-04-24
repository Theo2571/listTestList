import { Post } from '../../../types/post.types';

export interface PostCardProps {
  post: Post;
  onPress?: () => void;
}
