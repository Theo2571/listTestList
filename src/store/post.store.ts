import { makeAutoObservable } from 'mobx';

export class PostStore {
  likedPostIds: Set<string> = new Set();

  constructor() {
    makeAutoObservable(this);
  }

  toggleLike(postId: string, currentlyLiked: boolean): void {
    if (currentlyLiked) {
      this.likedPostIds.delete(postId);
    } else {
      this.likedPostIds.add(postId);
    }
  }

  isLiked(postId: string, serverLiked: boolean): boolean {
    if (this.likedPostIds.has(postId)) {
      return !serverLiked;
    }
    return serverLiked;
  }
}
