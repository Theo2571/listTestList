import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Feed: undefined;
  PostDetail: { postId: string };
};

export type FeedScreenProps = NativeStackScreenProps<RootStackParamList, 'Feed'>;
export type PostDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;
