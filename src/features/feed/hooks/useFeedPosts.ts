import { useState } from 'react';
import { PostTier } from '../../../types/post.types';
import { usePosts } from '../../../hooks/usePosts';

export type FeedTab = 'all' | PostTier;

export function useFeedPosts() {
  const [activeTab, setActiveTab] = useState<FeedTab>('all');
  const tier = activeTab === 'all' ? undefined : activeTab;
  const postsData = usePosts(tier);

  return {
    ...postsData,
    activeTab,
    setActiveTab,
  };
}
