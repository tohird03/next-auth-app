import {postsStore} from './posts';

export const stores = {
  postsStore,
};

export const resetStores = () => {
  postsStore.reset();
};
