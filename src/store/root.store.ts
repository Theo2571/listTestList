import React, { useContext } from 'react';
import { PostStore } from './post.store';
import { WsStore } from './ws.store';

export class RootStore {
  postStore = new PostStore();
  wsStore = new WsStore();
}

export const rootStore = new RootStore();

export const StoreContext = React.createContext(rootStore);

export function useStore(): RootStore {
  return useContext(StoreContext);
}
