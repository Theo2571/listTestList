import React, { useContext } from 'react';
import { PostStore } from './post.store';

export class RootStore {
  postStore = new PostStore();
}

export const rootStore = new RootStore();

export const StoreContext = React.createContext(rootStore);

export function useStore(): RootStore {
  return useContext(StoreContext);
}
