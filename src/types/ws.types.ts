import { Comment } from './post.types';

export interface WsPingEvent {
  type: 'ping';
}

export interface WsLikeUpdatedEvent {
  type: 'like_updated';
  postId: string;
  likesCount: number;
}

export interface WsCommentAddedEvent {
  type: 'comment_added';
  postId: string;
  comment: Comment;
}

export type WsEvent = WsPingEvent | WsLikeUpdatedEvent | WsCommentAddedEvent;
